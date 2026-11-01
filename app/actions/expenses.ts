'use server';

import { prisma } from '@/lib/prisma';
import { generateVoucherNumber } from '@/lib/financial-engine';
import { revalidatePath } from 'next/cache';

export async function createExpenseVoucher(data: {
  categoryId: string;
  vendorName: string;
  amount: number;
  paymentMode: string;
  costCenter: string;
  description: string;
  preparedBy: string;
  receiptImageUrl?: string;
}) {
  const existingVouchersCount = await prisma.expenseVoucher.count();
  const voucherNo = generateVoucherNumber(existingVouchersCount + 16);

  // If amount > 25,000, requires Owner approval
  const requiresOwnerApproval = data.amount > 25000;
  const initialStatus = requiresOwnerApproval ? 'PENDING_APPROVAL' : 'APPROVED';

  const voucher = await prisma.expenseVoucher.create({
    data: {
      voucherNo,
      categoryId: data.categoryId,
      vendorName: data.vendorName,
      amount: data.amount,
      paymentMode: data.paymentMode,
      costCenter: data.costCenter,
      description: data.description,
      preparedBy: data.preparedBy,
      receiptImageUrl: data.receiptImageUrl || undefined,
      status: initialStatus,
      paidAt: initialStatus === 'APPROVED' ? new Date() : undefined,
    },
    include: {
      category: true,
    },
  });

  // Update category current spent
  await prisma.expenseCategory.update({
    where: { id: data.categoryId },
    data: {
      currentSpent: {
        increment: data.amount,
      },
    },
  });

  // If requires owner approval, automatically inject into Owner Approval Inbox
  if (requiresOwnerApproval) {
    await prisma.ownerApprovalItem.create({
      data: {
        title: `${voucher.category.name}: ${data.vendorName}`,
        type: 'EXPENSE_VOUCHER',
        referenceId: voucher.voucherNo,
        requestedBy: data.preparedBy,
        amount: data.amount,
        details: `${data.description} (Cost Center: ${data.costCenter})`,
        status: 'PENDING',
      },
    });
  }

  revalidatePath('/');
  return { success: true, voucher, requiresOwnerApproval };
}

export async function approveExpenseVoucher(voucherId: string, reviewerName = 'Mr. Sajid Hussain (Chairman)') {
  const voucher = await prisma.expenseVoucher.update({
    where: { id: voucherId },
    data: {
      status: 'APPROVED',
      approvedBy: reviewerName,
      paidAt: new Date(),
    },
  });

  // Also update approval item if exists
  await prisma.ownerApprovalItem.updateMany({
    where: { referenceId: voucher.voucherNo },
    data: {
      status: 'APPROVED',
      reviewedBy: reviewerName,
      reviewedAt: new Date(),
    },
  });

  revalidatePath('/');
  return { success: true, voucher };
}

export async function rejectExpenseVoucher(voucherId: string, notes?: string) {
  const voucher = await prisma.expenseVoucher.update({
    where: { id: voucherId },
    data: {
      status: 'REJECTED',
    },
  });

  await prisma.ownerApprovalItem.updateMany({
    where: { referenceId: voucher.voucherNo },
    data: {
      status: 'REJECTED',
      reviewNotes: notes || 'Rejected by Owner during review.',
      reviewedAt: new Date(),
    },
  });

  revalidatePath('/');
  return { success: true, voucher };
}
