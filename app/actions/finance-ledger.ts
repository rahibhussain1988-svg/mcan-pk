'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getChartOfAccounts() {
  try {
    const accounts = await prisma.accountHead.findMany({
      orderBy: [{ code: 'asc' }],
    });
    return { success: true, accounts };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getGeneralLedger(accountCode?: string, fromDate?: string, toDate?: string) {
  try {
    const whereClause: any = {
      journalEntry: {
        status: 'POSTED',
      },
    };

    if (accountCode) {
      whereClause.accountHead = { code: accountCode };
    }

    if (fromDate || toDate) {
      whereClause.journalEntry.entryDate = {};
      if (fromDate) whereClause.journalEntry.entryDate.gte = new Date(fromDate);
      if (toDate) whereClause.journalEntry.entryDate.lte = new Date(toDate);
    }

    const lines = await prisma.journalLine.findMany({
      where: whereClause,
      include: {
        journalEntry: true,
        accountHead: true,
      },
      orderBy: { journalEntry: { entryDate: 'asc' } },
    });

    return {
      success: true,
      lines: lines.map((l) => ({
        id: l.id,
        date: l.journalEntry.entryDate.toISOString(),
        voucherNo: l.journalEntry.voucherNo,
        voucherType: l.journalEntry.voucherType,
        accountCode: l.accountHead.code,
        accountTitle: l.accountHead.title,
        debit: l.debit,
        credit: l.credit,
        narration: l.narration || l.journalEntry.description,
        costCenter: l.costCenter || 'GENERAL',
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message, lines: [] };
  }
}

export async function getTrialBalance() {
  try {
    const accounts = await prisma.accountHead.findMany({
      include: {
        journalLines: {
          where: { journalEntry: { status: 'POSTED' } },
        },
      },
      orderBy: { code: 'asc' },
    });

    let totalDebit = 0;
    let totalCredit = 0;

    const rows = accounts.map((acc) => {
      const debitSum = acc.journalLines.reduce((sum, l) => sum + l.debit, 0);
      const creditSum = acc.journalLines.reduce((sum, l) => sum + l.credit, 0);

      let debitBalance = 0;
      let creditBalance = 0;

      if (['ASSET', 'EXPENSE'].includes(acc.accountType)) {
        debitBalance = Math.max(0, debitSum - creditSum);
        creditBalance = debitSum < creditSum ? creditSum - debitSum : 0;
      } else {
        creditBalance = Math.max(0, creditSum - debitSum);
        debitBalance = creditSum < debitSum ? debitSum - creditSum : 0;
      }

      totalDebit += debitBalance;
      totalCredit += creditBalance;

      return {
        id: acc.id,
        code: acc.code,
        title: acc.title,
        accountType: acc.accountType,
        debit: debitBalance,
        credit: creditBalance,
      };
    });

    return {
      success: true,
      rows,
      totals: {
        debit: totalDebit,
        credit: totalCredit,
        isBalanced: Math.abs(totalDebit - totalCredit) < 0.01,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message, rows: [], totals: { debit: 0, credit: 0, isBalanced: false } };
  }
}

export async function getFinancialStatements() {
  try {
    const accounts = await prisma.accountHead.findMany({
      include: {
        journalLines: {
          where: { journalEntry: { status: 'POSTED' } },
        },
      },
      orderBy: { code: 'asc' },
    });

    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalEquity = 0;
    let totalRevenue = 0;
    let totalExpenses = 0;

    const balanceSheet = {
      assets: [] as any[],
      liabilities: [] as any[],
      equity: [] as any[],
    };

    const incomeStatement = {
      revenue: [] as any[],
      expenses: [] as any[],
    };

    for (const acc of accounts) {
      const debitSum = acc.journalLines.reduce((sum, l) => sum + l.debit, 0);
      const creditSum = acc.journalLines.reduce((sum, l) => sum + l.credit, 0);

      if (acc.accountType === 'ASSET') {
        const net = debitSum - creditSum;
        totalAssets += net;
        balanceSheet.assets.push({ code: acc.code, title: acc.title, amount: net });
      } else if (acc.accountType === 'LIABILITY') {
        const net = creditSum - debitSum;
        totalLiabilities += net;
        balanceSheet.liabilities.push({ code: acc.code, title: acc.title, amount: net });
      } else if (acc.accountType === 'EQUITY') {
        const net = creditSum - debitSum;
        totalEquity += net;
        balanceSheet.equity.push({ code: acc.code, title: acc.title, amount: net });
      } else if (acc.accountType === 'REVENUE') {
        const net = creditSum - debitSum;
        totalRevenue += net;
        incomeStatement.revenue.push({ code: acc.code, title: acc.title, amount: net });
      } else if (acc.accountType === 'EXPENSE') {
        const net = debitSum - creditSum;
        totalExpenses += net;
        incomeStatement.expenses.push({ code: acc.code, title: acc.title, amount: net });
      }
    }

    const netOperatingSurplus = totalRevenue - totalExpenses;

    return {
      success: true,
      balanceSheet: {
        ...balanceSheet,
        totalAssets,
        totalLiabilities,
        totalEquity,
        retainedSurplus: netOperatingSurplus,
        isBalanced: Math.abs(totalAssets - (totalLiabilities + totalEquity + netOperatingSurplus)) < 0.01,
      },
      incomeStatement: {
        ...incomeStatement,
        totalRevenue,
        totalExpenses,
        netSurplus: netOperatingSurplus,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createJournalEntry(data: {
  voucherType: 'JOURNAL' | 'CASH_PAYMENT' | 'BANK_PAYMENT' | 'CASH_RECEIPT' | 'BANK_RECEIPT';
  description: string;
  referenceNo?: string;
  postedBy: string;
  lines: Array<{
    accountHeadId: string;
    debit: number;
    credit: number;
    costCenter?: string;
    narration?: string;
  }>;
}) {
  try {
    // 1. Strict Double-Entry Invariance Validation: sum(debit) MUST equal sum(credit)
    const totalDebit = data.lines.reduce((s, l) => s + (Number(l.debit) || 0), 0);
    const totalCredit = data.lines.reduce((s, l) => s + (Number(l.credit) || 0), 0);

    if (Math.abs(totalDebit - totalCredit) > 0.001) {
      return {
        success: false,
        error: `Double-entry unbalanced: Total Debits (PKR ${totalDebit.toLocaleString()}) do not equal Total Credits (PKR ${totalCredit.toLocaleString()})!`,
      };
    }

    if (totalDebit <= 0) {
      return { success: false, error: 'Transaction amount must be greater than zero.' };
    }

    // Generate Voucher Number
    const prefixes = {
      JOURNAL: 'JV',
      CASH_PAYMENT: 'CPV',
      BANK_PAYMENT: 'BPV',
      CASH_RECEIPT: 'CRV',
      BANK_RECEIPT: 'BRV',
    };
    const prefix = prefixes[data.voucherType] || 'JV';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const voucherNo = `${prefix}-2026-${randomSuffix}`;

    const entry = await prisma.journalEntry.create({
      data: {
        voucherNo,
        voucherType: data.voucherType,
        description: data.description,
        referenceNo: data.referenceNo,
        status: 'POSTED',
        postedBy: data.postedBy || 'Accountant / Clerk',
        totalAmount: totalDebit,
        lines: {
          create: data.lines.map((l) => ({
            accountHeadId: l.accountHeadId,
            debit: Number(l.debit) || 0,
            credit: Number(l.credit) || 0,
            costCenter: l.costCenter,
            narration: l.narration,
          })),
        },
      },
      include: { lines: true },
    });

    // Record Immutable Audit Log
    await prisma.auditLog.create({
      data: {
        userId: data.postedBy || 'usr-supp-accountant',
        userName: data.postedBy || 'Accountant / Clerk',
        userRole: 'ACCOUNTANT',
        action: 'POST',
        module: 'FINANCE',
        recordId: voucherNo,
        description: `Posted ${data.voucherType} voucher ${voucherNo}: PKR ${totalDebit.toLocaleString()} - ${data.description}`,
        newState: JSON.stringify({ totalAmount: totalDebit, linesCount: data.lines.length }),
      },
    });

    revalidatePath('/erp');
    return { success: true, entry, voucherNo };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function reverseJournalEntry(voucherNo: string, reason: string, reversedBy: string) {
  try {
    const existing = await prisma.journalEntry.findUnique({
      where: { voucherNo },
      include: { lines: true },
    });

    if (!existing) {
      return { success: false, error: 'Voucher not found.' };
    }

    if (existing.status === 'REVERSED') {
      return { success: false, error: 'This voucher has already been reversed.' };
    }

    // Create a linked reversal voucher with flipped debits and credits
    const reversalVoucherNo = `REV-${existing.voucherNo}`;

    const reversal = await prisma.journalEntry.create({
      data: {
        voucherNo: reversalVoucherNo,
        voucherType: existing.voucherType,
        description: `Reversal of ${existing.voucherNo}: ${reason}`,
        referenceNo: existing.voucherNo,
        status: 'POSTED',
        postedBy: reversedBy,
        totalAmount: existing.totalAmount,
        lines: {
          create: existing.lines.map((l) => ({
            accountHeadId: l.accountHeadId,
            debit: l.credit, // Invert debit/credit
            credit: l.debit,
            costCenter: l.costCenter,
            narration: `Reversal line: ${l.narration || ''}`,
          })),
        },
      },
    });

    // Mark original voucher as REVERSED
    await prisma.journalEntry.update({
      where: { voucherNo },
      data: {
        status: 'REVERSED',
        reversedAt: new Date(),
        reversedBy,
        reversalReason: reason,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: reversedBy,
        userName: reversedBy,
        userRole: 'ACCOUNTANT',
        action: 'REVERSE',
        module: 'FINANCE',
        recordId: voucherNo,
        description: `Reversed voucher ${voucherNo} with linked counter-entry ${reversalVoucherNo}. Reason: ${reason}`,
        previousState: 'STATUS: POSTED',
        newState: 'STATUS: REVERSED',
      },
    });

    revalidatePath('/erp');
    return { success: true, reversalVoucherNo };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getStudentLedger(studentId: string) {
  try {
    const entries = await prisma.studentLedger.findMany({
      where: { studentId },
      orderBy: { entryDate: 'asc' },
    });
    return { success: true, entries };
  } catch (error: any) {
    return { success: false, error: error.message, entries: [] };
  }
}
