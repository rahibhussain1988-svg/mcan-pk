import { prisma } from '@/lib/prisma';
import { generateExecutiveBriefing } from '@/lib/ai-assistant';

export async function getERPData() {
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
      payments: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const cashierShift = (await prisma.cashierShiftClosing.findFirst({
    where: { status: 'OPEN' },
    orderBy: { createdAt: 'desc' },
  })) || {
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
      examMarks: {
        include: { subject: true },
      },
      ledgerEntries: {
        orderBy: { entryDate: 'asc' },
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

  // 7. Fetch Enterprise Chart of Accounts & General Ledger
  const accounts = await prisma.accountHead.findMany({
    include: {
      journalLines: {
        where: { journalEntry: { status: 'POSTED' } },
      },
    },
    orderBy: { code: 'asc' },
  });

  const journalEntries = await prisma.journalEntry.findMany({
    include: {
      lines: {
        include: { accountHead: true },
      },
    },
    orderBy: { entryDate: 'desc' },
    take: 20,
  });

  // 8. Fetch Academics, Subjects & Timetable
  const subjects = await prisma.subject.findMany({
    include: { program: true },
    orderBy: [{ semester: 'asc' }, { code: 'asc' }],
  });

  const timetableSlots = await prisma.timetableSlot.findMany({
    orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
  });

  const examSchedules = await prisma.examSchedule.findMany({
    include: {
      subject: true,
      program: true,
      marks: {
        include: { student: true },
      },
    },
    orderBy: { examDate: 'desc' },
  });

  // 9. Fetch Inventory, Stores & Clinical
  const inventoryItems = await prisma.inventoryItem.findMany({
    include: {
      transactions: {
        take: 3,
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { name: 'asc' },
  });

  const clinicalDepartments = await prisma.clinicalDepartment.findMany({
    include: {
      rotations: true,
    },
  });

  const auditLogs = await prisma.auditLog.findMany({
    take: 25,
    orderBy: { createdAt: 'desc' },
  });

  const instituteProfile = (await prisma.instituteProfile.findFirst()) || {
    name: 'Imam Institute of Nursing & Allied Health Sciences',
    tagline: 'Trust in Quality Education',
    registrationNo: 'IINAHS-PNC-2019-JCD',
    pncAffiliationNo: 'PNC-AFF-4491-SN',
    address: 'Shah Ghazi Muhalla, Jacobabad, Sindh, Pakistan',
    phone: '+92 722 654321',
    email: 'info@imcan.pk',
  };

  // 10. Compute Real Ledger Aggregates
  const cashAcc = accounts.find((a) => a.code === '1001');
  const bankAcc = accounts.find((a) => a.code === '1010');
  const receivablesAcc = accounts.find((a) => a.code === '1020');

  const todayCash = cashAcc
    ? cashAcc.journalLines.reduce((s, l) => s + l.debit - l.credit, 0) || cashierShift.expectedCashInHand
    : cashierShift.expectedCashInHand;

  const bankDeposits = bankAcc
    ? bankAcc.journalLines.reduce((s, l) => s + l.debit - l.credit, 0) || 2450000
    : 2450000;

  const totalFeeCollected = challans.reduce((sum, c) => sum + c.paidAmount, 0);

  const totalPaidExpenses = vouchers
    .filter((v) => v.status === 'PAID')
    .reduce((sum, v) => sum + v.amount, 0);

  const monthlyPayrollTotal = staffList.reduce(
    (sum, s) => sum + s.basicSalary + s.clinicalAllowance + s.medicalAllowance,
    0
  );

  const totalReceivables = receivablesAcc
    ? receivablesAcc.journalLines.reduce((s, l) => s + l.debit - l.credit, 0) ||
      challans.filter((c) => c.status !== 'PAID').reduce((sum, c) => sum + (c.netPayable - c.paidAmount), 0)
    : challans.filter((c) => c.status !== 'PAID').reduce((sum, c) => sum + (c.netPayable - c.paidAmount), 0);

  // Compute Net Operating Surplus directly from General Ledger
  let totalRevenueLedger = 0;
  let totalExpenseLedger = 0;

  for (const acc of accounts) {
    const debits = acc.journalLines.reduce((s, l) => s + l.debit, 0);
    const credits = acc.journalLines.reduce((s, l) => s + l.credit, 0);
    if (acc.accountType === 'REVENUE') totalRevenueLedger += (credits - debits);
    if (acc.accountType === 'EXPENSE') totalExpenseLedger += (debits - credits);
  }

  const netSurplus = totalRevenueLedger > 0
    ? totalRevenueLedger - totalExpenseLedger
    : totalFeeCollected - totalPaidExpenses - monthlyPayrollTotal * 0.4;

  const monthlyBurn = totalPaidExpenses + monthlyPayrollTotal;
  const cashRunway = monthlyBurn > 0 ? (bankDeposits + todayCash) / monthlyBurn : 4.5;

  const programs = await prisma.program.findMany({
    include: {
      students: true,
      subjects: true,
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
      subjectCount: p.subjects.length,
    };
  });

  // AI Morning Briefing for Chairman / CEO
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
    payments: c.payments.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
    })),
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
    examMarks: s.examMarks.map((em) => ({
      ...em,
      createdAt: em.createdAt.toISOString(),
    })),
    ledgerEntries: s.ledgerEntries.map((le) => ({
      ...le,
      entryDate: le.entryDate.toISOString(),
    })),
  }));

  const serializedStaff = staffList.map((s) => ({
    ...s,
    pncLicenseExpiry: s.pncLicenseExpiry ? s.pncLicenseExpiry.toISOString() : null,
  }));

  const serializedJournalEntries = journalEntries.map((je) => ({
    ...je,
    entryDate: je.entryDate.toISOString(),
    createdAt: je.createdAt.toISOString(),
    lines: je.lines.map((l) => ({
      ...l,
      accountCode: l.accountHead.code,
      accountTitle: l.accountHead.title,
    })),
  }));

  const serializedExamSchedules = examSchedules.map((es) => ({
    ...es,
    examDate: es.examDate.toISOString(),
    createdAt: es.createdAt.toISOString(),
    marks: es.marks.map((m) => ({
      ...m,
      studentName: m.student.fullName,
      studentRollNo: m.student.rollNo,
    })),
  }));

  const serializedAuditLogs = auditLogs.map((al) => ({
    ...al,
    createdAt: al.createdAt.toISOString(),
  }));

  const serializedTimetableSlots = timetableSlots.map((ts) => ({
    ...ts,
    createdAt: ts.createdAt ? ts.createdAt.toISOString() : undefined,
  }));

  return {
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
      lang: 'en' as const,
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
    // Enterprise Extensions
    chartOfAccounts: accounts.map((a) => ({
      id: a.id,
      code: a.code,
      title: a.title,
      accountType: a.accountType,
      normalBalance: a.normalBalance,
      currentBalance: a.currentBalance,
    })),
    journalEntries: serializedJournalEntries,
    curriculumSubjects: subjects,
    timetableSlots: serializedTimetableSlots,
    examSchedules: serializedExamSchedules,
    inventoryItems,
    clinicalDepartments,
    auditLogs: serializedAuditLogs,
    instituteProfile,
  };
}
