import { prisma } from '@/lib/prisma';
import { AppShell } from '@/components/AppShell';
import { generateExecutiveBriefing } from '@/lib/ai-assistant';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // 1. Fetch Categories & Vouchers
  const categories = await prisma.expenseCategory.findMany({
    orderBy: { currentSpent: 'desc' },
  });

  const vouchers = await prisma.expenseVoucher.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  const pettyCashRecord = await prisma.pettyCashLog.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  // 2. Fetch Challans & Cashier Register
  const challans = await prisma.feeChallan.findMany({
    include: {
      student: {
        include: {
          program: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const cashierShift = await prisma.cashierShiftClosing.findFirst({
    where: { status: 'OPEN' },
    orderBy: { createdAt: 'desc' },
  }) || {
    openingCash: 25000,
    totalCashCollected: 155000,
    totalOnlineCollected: 90000,
    expectedCashInHand: 180000,
  };

  // 3. Fetch Triage Cases
  const triageCases = await prisma.patientTriageCase.findMany({
    orderBy: [{ esiLevel: 'asc' }, { news2Score: 'desc' }, { createdAt: 'desc' }],
  });

  // 4. Fetch Students & Staff
  const students = await prisma.student.findMany({
    include: {
      program: true,
      batch: true,
      competencyLogs: {
        orderBy: { date: 'desc' },
      },
    },
  });

  const staffList = await prisma.staff.findMany({
    orderBy: { basicSalary: 'desc' },
  });

  // 5. Fetch Approvals & Documents
  const pendingApprovals = await prisma.ownerApprovalItem.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'desc' },
  });

  const documents = await prisma.applicationDocument.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // 6. Fetch all institutional users
  const allUsers = await prisma.userProfilePreference.findMany({
    orderBy: [{ createdAt: 'asc' }],
  });

  // 7. Compute Financial Aggregates
  const totalFeeCollected = challans.reduce((sum, c) => sum + c.paidAmount, 0);
  const totalPaidExpenses = vouchers
    .filter((v) => v.status === 'PAID')
    .reduce((sum, v) => sum + v.amount, 0);

  const monthlyPayrollTotal = staffList.reduce(
    (sum, s) => sum + s.basicSalary + s.clinicalAllowance + s.medicalAllowance,
    0
  );

  const totalReceivables = challans
    .filter((c) => c.status !== 'PAID')
    .reduce((sum, c) => sum + (c.netPayable - c.paidAmount), 0);

  const todayCash = cashierShift.expectedCashInHand;
  const bankDeposits = 2450000;
  const netSurplus = totalFeeCollected - totalPaidExpenses - (monthlyPayrollTotal * 0.4);
  const monthlyBurn = totalPaidExpenses + monthlyPayrollTotal;
  const cashRunway = monthlyBurn > 0 ? (bankDeposits + todayCash) / monthlyBurn : 4.5;

  // Program-wise P&L breakdown
  const programs = await prisma.program.findMany({
    include: {
      students: true,
    },
  });

  const programPL = programs.map((p) => {
    const studentCount = p.students.length;
    const baseInflow = studentCount * (p.baseTuitionFee + p.labFee + p.clinicalFee);
    const facultyPayroll = studentCount > 0 ? 180000 : 0;
    const labConsumables = studentCount > 0 ? 45000 : 0;
    const netMargin = baseInflow - facultyPayroll - labConsumables;

    return {
      code: p.code,
      name: p.name,
      inflow: baseInflow,
      facultyPayroll,
      labConsumables,
      netMargin,
      studentCount,
    };
  });

  // AI Morning Briefing for Chairman
  const aiBriefing = await generateExecutiveBriefing({
    todayCash,
    bankTotal: bankDeposits,
    monthlyFee: totalFeeCollected,
    monthlyExpenses: totalPaidExpenses,
    netSurplus,
    pendingApprovalsCount: pendingApprovals.length,
    highRiskTriageCount: triageCases.filter((c) => c.esiLevel <= 2).length,
    expiringLicensesCount: 1,
    lang: 'en',
  });

  const serializedVouchers = vouchers.map((v) => ({
    ...v,
    createdAt: v.createdAt.toISOString(),
    paidAt: v.paidAt ? v.paidAt.toISOString() : null,
  }));

  const serializedChallans = challans.map((c) => ({
    ...c,
    issueDate: c.issueDate.toISOString(),
    dueDate: c.dueDate.toISOString(),
  }));

  const serializedTriage = triageCases.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
  }));

  const serializedApprovals = pendingApprovals.map((a) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
  }));

  const serializedDocs = documents.map((d) => ({
    ...d,
    createdAt: d.createdAt.toISOString(),
    issuedAt: d.issuedAt ? d.issuedAt.toISOString() : null,
  }));

  const serializedStudents = students.map((s) => ({
    ...s,
    competencyLogs: s.competencyLogs.map((l) => ({
      ...l,
      date: l.date.toISOString(),
    })),
  }));

  const serializedStaff = staffList.map((s) => ({
    ...s,
    pncLicenseExpiry: s.pncLicenseExpiry ? s.pncLicenseExpiry.toISOString() : null,
  }));

  return (
    <AppShell
      initialData={{
        ownerMetrics: {
          todayCashInHand: todayCash,
          bankDeposits,
          monthlyFeeCollection: totalFeeCollected,
          monthlyCollectionTarget: 1800000,
          collectionTargetPercent: Math.round((totalFeeCollected / 1800000) * 100),
          monthlyExpenses: totalPaidExpenses,
          monthlyPayroll: monthlyPayrollTotal,
          netOperatingSurplus: netSurplus,
          totalReceivables,
          cashRunwayMonths: cashRunway,
          budgetAlertsCount: 1,
          pendingApprovals: serializedApprovals,
          programPL,
          aiBriefing,
          lang: 'en',
        },
        categories,
        vouchers: serializedVouchers,
        pettyCashBalance: pettyCashRecord?.remainingBalance || 35500,
        challans: serializedChallans,
        cashierShift,
        triageCases: serializedTriage,
        students: serializedStudents,
        staffList: serializedStaff,
        monthlyPayrollTotal,
        documents: serializedDocs,
        allUsers,
      }}
    />
  );
}
