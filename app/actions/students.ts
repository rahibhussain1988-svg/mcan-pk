'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function signOffCompetencyLog(logId: string, supervisorPin: string, feedback?: string) {
  // Preceptors have PIN '9988' or '1122'
  const validPins = ['9988', '1122', '7860'];
  if (!validPins.includes(supervisorPin)) {
    return { success: false, error: 'Invalid Preceptor Clinical Security PIN' };
  }

  const updated = await prisma.studentCompetencyLog.update({
    where: { id: logId },
    data: {
      status: 'SIGNED_OFF',
      supervisorPin,
      supervisorFeedback: feedback || 'Satisfactory aseptic clinical competency demonstrated.',
    },
  });

  revalidatePath('/');
  return { success: true, updated };
}

export async function addStudentCompetencyLog(data: {
  studentId: string;
  competencyCode: string;
  competencyTitle: string;
  patientAgeGender: string;
  supervisorName: string;
  selfReflection: string;
}) {
  const log = await prisma.studentCompetencyLog.create({
    data: {
      studentId: data.studentId,
      competencyCode: data.competencyCode,
      competencyTitle: data.competencyTitle,
      patientAgeGender: data.patientAgeGender,
      supervisorName: data.supervisorName,
      status: 'PENDING_APPROVAL',
      selfReflection: data.selfReflection,
    },
  });

  revalidatePath('/');
  return { success: true, log };
}
