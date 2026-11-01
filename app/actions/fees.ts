'use server';

import { prisma } from '@/lib/prisma';
import { generateReceiptNumber } from '@/lib/financial-engine';
import { revalidatePath } from 'next/cache';

export async function collectFeePayment(formData: {
  challanId: string;
  studentId: string;
  amountPaid: number;
  paymentMethod: string;
  transactionRef?: string;
  cashierId: string;
  cashierName: string;
  notes?: string;
}) {
  const challan = await prisma.feeChallan.findUnique({
    where: { id: formData.challanId },
    include: { student: true },
  });

  if (!challan) {
    throw new Error('Fee Challan not found');
  }

  const existingPaymentsCount = await prisma.feePayment.count();
  const receiptNo = generateReceiptNumber(existingPaymentsCount + 101);

  // Create payment record
  const payment = await prisma.feePayment.create({
    data: {
      receiptNo,
      challanId: formData.challanId,
      studentId: formData.studentId,
      amountPaid: formData.amountPaid,
      paymentMethod: formData.paymentMethod,
      transactionRef: formData.transactionRef || undefined,
      cashierId: formData.cashierId,
      cashierName: formData.cashierName,
      notes: formData.notes || undefined,
    },
  });

  // Update challan
  const updatedPaidAmount = challan.paidAmount + formData.amountPaid;
  const isFullyPaid = updatedPaidAmount >= challan.netPayable;
  const newStatus = isFullyPaid ? 'PAID' : 'PARTIAL';

  await prisma.feeChallan.update({
    where: { id: formData.challanId },
    data: {
      paidAmount: updatedPaidAmount,
      status: newStatus,
    },
  });

  // Update or record in Cashier Shift Closing
  const openShift = await prisma.cashierShiftClosing.findFirst({
    where: { status: 'OPEN' },
    orderBy: { createdAt: 'desc' },
  });

  if (openShift) {
    const isCash = formData.paymentMethod === 'CASH_COUNTER';
    await prisma.cashierShiftClosing.update({
      where: { id: openShift.id },
      data: {
        totalCashCollected: isCash
          ? openShift.totalCashCollected + formData.amountPaid
          : openShift.totalCashCollected,
        totalOnlineCollected: !isCash
          ? openShift.totalOnlineCollected + formData.amountPaid
          : openShift.totalOnlineCollected,
        expectedCashInHand: isCash
          ? openShift.expectedCashInHand + formData.amountPaid
          : openShift.expectedCashInHand,
        actualCashInHand: isCash
          ? openShift.actualCashInHand + formData.amountPaid
          : openShift.actualCashInHand,
      },
    });
  }

  revalidatePath('/');
  return { success: true, receiptNo, payment, newStatus };
}
