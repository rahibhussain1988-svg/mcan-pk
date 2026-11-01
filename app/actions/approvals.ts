'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveItem(itemId: string, reviewerName = 'Mr. Sajid Hussain (Chairman)') {
  const item = await prisma.ownerApprovalItem.findUnique({
    where: { id: itemId },
  });

  if (!item) throw new Error('Approval item not found');

  const updated = await prisma.ownerApprovalItem.update({
    where: { id: itemId },
    data: {
      status: 'APPROVED',
      reviewedBy: reviewerName,
      reviewedAt: new Date(),
    },
  });

  // If this item is an expense voucher, sync status with ExpenseVoucher table
  if (item.type === 'EXPENSE_VOUCHER' && item.referenceId) {
    await prisma.expenseVoucher.updateMany({
      where: { voucherNo: item.referenceId },
      data: {
        status: 'APPROVED',
        approvedBy: reviewerName,
        paidAt: new Date(),
      },
    });
  }

  // If this item is an official letter, update ApplicationDocument table
  if (item.type === 'OFFICIAL_LETTER' && item.referenceId) {
    await prisma.applicationDocument.updateMany({
      where: { documentNo: item.referenceId },
      data: {
        status: 'APPROVED',
        approvedBy: reviewerName,
        issuedAt: new Date(),
      },
    });
  }

  revalidatePath('/');
  return { success: true, item: updated };
}

export async function rejectItem(itemId: string, notes?: string, reviewerName = 'Mr. Sajid Hussain (Chairman)') {
  const item = await prisma.ownerApprovalItem.findUnique({
    where: { id: itemId },
  });

  if (!item) throw new Error('Approval item not found');

  const updated = await prisma.ownerApprovalItem.update({
    where: { id: itemId },
    data: {
      status: 'REJECTED',
      reviewedBy: reviewerName,
      reviewedAt: new Date(),
      reviewNotes: notes || 'Rejected by Owner during review',
    },
  });

  if (item.type === 'EXPENSE_VOUCHER' && item.referenceId) {
    await prisma.expenseVoucher.updateMany({
      where: { voucherNo: item.referenceId },
      data: {
        status: 'REJECTED',
      },
    });
  }

  revalidatePath('/');
  return { success: true, item: updated };
}
