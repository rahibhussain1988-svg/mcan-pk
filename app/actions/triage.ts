'use server';

import { prisma } from '@/lib/prisma';
import { calculateNEWS2, calculateESI, matchStudentCompetency, VitalsInput } from '@/lib/clinical-engine';
import { revalidatePath } from 'next/cache';

export async function createTriageCase(data: {
  patientName: string;
  age: number;
  gender: string;
  isPregnant: boolean;
  chiefComplaint: string;
  respRate: number;
  spo2: number;
  onOxygen: boolean;
  systolicBp: number;
  diastolicBp: number;
  heartRate: number;
  temperature: number;
  bloodSugar?: number;
  painScale: number;
  avpuGcs: 'ALERT' | 'VOICE' | 'PAIN' | 'UNRESPONSIVE';
  bedNumber?: string;
  triageNurseId?: string;
  triageNurseName?: string;
}) {
  const vitals: VitalsInput = {
    respRate: data.respRate,
    spo2: data.spo2,
    onOxygen: data.onOxygen,
    systolicBp: data.systolicBp,
    diastolicBp: data.diastolicBp,
    heartRate: data.heartRate,
    temperature: data.temperature,
    bloodSugar: data.bloodSugar,
    painScale: data.painScale,
    avpuGcs: data.avpuGcs,
  };

  const news2 = calculateNEWS2(vitals);
  const esi = calculateESI(vitals, data.chiefComplaint);
  const competency = matchStudentCompetency(esi.level, data.chiefComplaint);

  // Auto-pair with an active nursing student
  const availableStudent = await prisma.student.findFirst({
    where: {
      program: { code: 'BSN' },
      status: 'ACTIVE',
    },
    orderBy: {
      clinicalAttendancePercent: 'asc', // prioritize students needing clinical hours
    },
  });

  const count = await prisma.patientTriageCase.count();
  const mrNumber = `IMC-MR-2026-${String(count + 1050).padStart(4, '0')}`;

  const triageCase = await prisma.patientTriageCase.create({
    data: {
      mrNumber,
      patientName: data.patientName,
      age: data.age,
      gender: data.gender,
      isPregnant: data.isPregnant,
      chiefComplaint: data.chiefComplaint,
      respRate: data.respRate,
      spo2: data.spo2,
      onOxygen: data.onOxygen,
      systolicBp: data.systolicBp,
      diastolicBp: data.diastolicBp,
      heartRate: data.heartRate,
      temperature: data.temperature,
      bloodSugar: data.bloodSugar,
      painScale: data.painScale,
      avpuGcs: data.avpuGcs,
      news2Score: news2.score,
      news2Risk: news2.risk,
      esiLevel: esi.level,
      redFlags: esi.redFlags.length > 0 ? esi.redFlags.join(', ') : 'None detected',
      triageCategory: esi.categoryName.toUpperCase().replace(/\s+/g, '_'),
      triageNurseId: data.triageNurseId || 'usr-teach-zahid',
      triageNurseName: data.triageNurseName || 'Zahid Abbasi (Lecturer)',
      pairedStudentId: availableStudent?.id || null,
      pairedStudentName: availableStudent ? `${availableStudent.fullName} (${availableStudent.rollNo})` : null,
      requiredCompetency: competency.code,
      queueStatus: 'WAITING',
      waitTimeMinutes: 0,
      bedNumber: data.bedNumber || (esi.level <= 2 ? 'IMC-ER-BAY-01 (Resus)' : 'IMC-Triage-Bed'),
    },
  });

  // If paired with a student, auto-generate a pending competency logbook entry
  if (availableStudent) {
    await prisma.studentCompetencyLog.create({
      data: {
        studentId: availableStudent.id,
        patientCaseId: triageCase.id,
        competencyCode: competency.code,
        competencyTitle: competency.title,
        patientAgeGender: `${data.age}Y / ${data.gender} (${triageCase.mrNumber})`,
        supervisorName: data.triageNurseName || 'Zahid Abbasi (Lecturer)',
        status: 'PENDING_APPROVAL',
        selfReflection: `Supervised clinical pairing for ESI Level ${esi.level} intake: ${data.chiefComplaint}. Procedure indicated: ${competency.title}.`,
      },
    });
  }

  revalidatePath('/');
  return { success: true, triageCase, news2, esi, competency };
}

export async function updateTriageStatus(caseId: string, status: string, bedNumber?: string) {
  const updated = await prisma.patientTriageCase.update({
    where: { id: caseId },
    data: {
      queueStatus: status,
      bedNumber: bedNumber || undefined,
    },
  });

  revalidatePath('/');
  return { success: true, updated };
}
