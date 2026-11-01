'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createApplicationDraft(data: {
  title: string;
  type: string;
  applicantRole: string;
  applicantId: string;
  applicantName: string;
  contentEn: string;
  contentUr?: string;
  contentSd?: string;
  policyAlerts?: string;
}) {
  const count = await prisma.applicationDocument.count();
  const documentNo = `IINAHS/DOC/2026/${String(count + 45).padStart(4, '0')}`;

  const doc = await prisma.applicationDocument.create({
    data: {
      documentNo,
      title: data.title,
      type: data.type,
      applicantRole: data.applicantRole,
      applicantId: data.applicantId,
      applicantName: data.applicantName,
      contentEn: data.contentEn,
      contentUr: data.contentUr,
      contentSd: data.contentSd,
      policyAlerts: data.policyAlerts,
      status: 'PENDING_PRINCIPAL',
      qrVerificationUrl: `https://imaminstitute.edu.pk/verify/doc/${documentNo.replace(/\//g, '-')}`,
    },
  });

  revalidatePath('/');
  return { success: true, doc };
}

export async function approveApplication(docId: string, approverName = 'Vinod Kumar (Principal)') {
  const doc = await prisma.applicationDocument.update({
    where: { id: docId },
    data: {
      status: 'APPROVED',
      approvedBy: approverName,
      issuedAt: new Date(),
    },
  });

  revalidatePath('/');
  return { success: true, doc };
}
