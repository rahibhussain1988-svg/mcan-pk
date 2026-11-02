'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getAcademicCurriculum(programCode?: string, semester?: number) {
  try {
    const where: any = {};
    if (programCode) where.program = { code: programCode };
    if (semester) where.semester = semester;

    const subjects = await prisma.subject.findMany({
      where,
      include: {
        program: true,
      },
      orderBy: [{ semester: 'asc' }, { code: 'asc' }],
    });

    return { success: true, subjects };
  } catch (error: any) {
    return { success: false, error: error.message, subjects: [] };
  }
}

export async function getClassTimetable(programCode?: string, semester?: number) {
  try {
    const where: any = {};
    if (programCode) where.programCode = programCode;
    if (semester) where.semester = semester;

    const slots = await prisma.timetableSlot.findMany({
      where,
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    return { success: true, slots };
  } catch (error: any) {
    return { success: false, error: error.message, slots: [] };
  }
}

export async function getExamSchedules(programCode?: string) {
  try {
    const where: any = {};
    if (programCode) where.program = { code: programCode };

    const schedules = await prisma.examSchedule.findMany({
      where,
      include: {
        program: true,
        subject: true,
        marks: {
          include: { student: true },
        },
      },
      orderBy: { examDate: 'desc' },
    });

    return { success: true, schedules };
  } catch (error: any) {
    return { success: false, error: error.message, schedules: [] };
  }
}

export async function getStudentResults(studentId: string) {
  try {
    const marks = await prisma.examMark.findMany({
      where: { studentId },
      include: {
        subject: true,
        examSchedule: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate dynamic GPA
    const totalCredits = marks.reduce((sum, m) => sum + (m.subject.creditHoursTheory + m.subject.creditHoursLab), 0);
    const weightedPoints = marks.reduce(
      (sum, m) => sum + m.gpa * (m.subject.creditHoursTheory + m.subject.creditHoursLab),
      0
    );
    const calculatedCgpa = totalCredits > 0 ? Number((weightedPoints / totalCredits).toFixed(2)) : 3.5;

    return { success: true, marks, calculatedCgpa, totalCredits };
  } catch (error: any) {
    return { success: false, error: error.message, marks: [], calculatedCgpa: 0, totalCredits: 0 };
  }
}

export async function submitExamMarks(data: {
  examScheduleId: string;
  marks: Array<{
    studentId: string;
    subjectId: string;
    theoryMarks: number;
    labMarks: number;
    internalMarks: number;
  }>;
  gradedBy: string;
}) {
  try {
    const gradeRules = await prisma.gradeScaleRule.findMany({
      orderBy: { minPercentage: 'desc' },
    });

    const results = [];
    for (const m of data.marks) {
      const theory = Number(m.theoryMarks) || 0;
      const lab = Number(m.labMarks) || 0;
      const internal = Number(m.internalMarks) || 0;
      const total = theory + lab + internal; // Out of 100

      // Match grade rule
      let matchedGrade = 'F';
      let matchedGpa = 0.0;

      for (const rule of gradeRules) {
        if (total >= rule.minPercentage) {
          matchedGrade = rule.grade;
          matchedGpa = rule.gpaPoints;
          break;
        }
      }

      const markRecord = await prisma.examMark.upsert({
        where: {
          id: `${data.examScheduleId}-${m.studentId}`,
        },
        update: {
          theoryMarks: theory,
          labMarks: lab,
          internalMarks: internal,
          totalMarks: total,
          grade: matchedGrade,
          gpa: matchedGpa,
          status: 'PUBLISHED',
          gradedBy: data.gradedBy,
          updatedAt: new Date(),
        },
        create: {
          id: `${data.examScheduleId}-${m.studentId}`,
          examScheduleId: data.examScheduleId,
          studentId: m.studentId,
          subjectId: m.subjectId,
          theoryMarks: theory,
          labMarks: lab,
          internalMarks: internal,
          totalMarks: total,
          grade: matchedGrade,
          gpa: matchedGpa,
          status: 'PUBLISHED',
          gradedBy: data.gradedBy,
        },
      });

      results.push(markRecord);
    }

    // Log Audit
    await prisma.auditLog.create({
      data: {
        userId: data.gradedBy,
        userName: data.gradedBy,
        userRole: 'EXAM_CONTROLLER',
        action: 'APPROVE',
        module: 'EXAMS',
        recordId: data.examScheduleId,
        description: `Published examination marks for ${data.marks.length} students.`,
      },
    });

    revalidatePath('/erp');
    return { success: true, count: results.length };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
