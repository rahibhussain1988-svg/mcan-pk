'use server';

import { prisma } from '@/lib/prisma';
import { queryImamCopilot, CopilotContext } from '@/lib/ai-assistant';

export async function askImamCopilot(query: string, lang: 'en' | 'ur' | 'sd' = 'en') {
  try {
    // 1. Gather live SQLite DB state
    const todayShift = await prisma.cashierShiftClosing.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    const payments = await prisma.feePayment.findMany({ select: { amountPaid: true } });
    const monthlyFee = payments.reduce((sum, p) => sum + p.amountPaid, 0);

    const unpaidChallans = await prisma.feeChallan.findMany({
      where: { status: { in: ['UNPAID', 'PARTIAL', 'OVERDUE'] } },
      select: { netPayable: true, paidAmount: true },
    });
    const totalReceivables = unpaidChallans.reduce(
      (sum, c) => sum + (c.netPayable - c.paidAmount),
      0
    );

    const allStudents = await prisma.student.findMany({
      select: {
        fullName: true,
        rollNo: true,
        clinicalAttendancePercent: true,
      },
    });

    const dangerAttendanceStudents = allStudents
      .filter((s) => s.clinicalAttendancePercent >= 85 && s.clinicalAttendancePercent < 87.5)
      .map((s) => ({
        name: s.fullName,
        rollNo: s.rollNo,
        percent: s.clinicalAttendancePercent,
      }));

    const barredStudents = allStudents
      .filter((s) => s.clinicalAttendancePercent < 85)
      .map((s) => ({
        name: s.fullName,
        rollNo: s.rollNo,
        percent: s.clinicalAttendancePercent,
      }));

    const now = new Date();
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 86400000);
    const allStaff = await prisma.staff.findMany({
      select: {
        fullName: true,
        designation: true,
        pncLicenseNo: true,
        pncLicenseExpiry: true,
      },
    });

    const expiringStaff = allStaff
      .filter((s) => s.pncLicenseExpiry && s.pncLicenseExpiry <= thirtyDaysFromNow && s.pncLicenseExpiry >= now)
      .map((s) => {
        const diffMs = s.pncLicenseExpiry!.getTime() - now.getTime();
        const daysLeft = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
        return {
          name: s.fullName,
          designation: s.designation,
          daysLeft,
          licenseNo: s.pncLicenseNo || 'Pending',
        };
      });

    const triageCases = await prisma.patientTriageCase.findMany({
      where: { queueStatus: 'WAITING' },
      select: { esiLevel: true, waitTimeMinutes: true },
    });

    const triageSummary = {
      totalWaiting: triageCases.length,
      esi1: triageCases.filter((c) => c.esiLevel === 1).length,
      esi2: triageCases.filter((c) => c.esiLevel === 2).length,
      esi3: triageCases.filter((c) => c.esiLevel === 3).length,
      escalatedCount: triageCases.filter((c) => c.waitTimeMinutes > 30).length,
    };

    const context: CopilotContext = {
      todayCash: todayShift?.actualCashInHand || 180000,
      monthlyFee,
      totalReceivables,
      dangerAttendanceStudents,
      barredStudents,
      expiringStaff,
      triageSummary,
      activeStaffCount: allStaff.length,
      lang,
    };

    const result = await queryImamCopilot(query, context);
    return { success: true, text: result.text, source: result.source };
  } catch (error: any) {
    console.error('Error in askImamCopilot action:', error);
    return {
      success: false,
      text: 'Error processing your query. Please check database connectivity.',
      source: 'deterministic' as const,
    };
  }
}
