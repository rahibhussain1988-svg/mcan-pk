const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedEnterpriseData() {
  console.log('Seeding enterprise master data, double-entry ledger, academics, and clinical governance...');

  // 1. Institute Profile
  await prisma.instituteProfile.upsert({
    where: { id: 'imam-profile-01' },
    update: {},
    create: {
      id: 'imam-profile-01',
      name: 'Imam Institute of Nursing & Allied Health Sciences',
      tagline: 'Trust in Quality Education',
      logoUrl: '/icons/icon.svg',
      crestMotto: 'Trust in Quality Education',
      registrationNo: 'IINAHS-PNC-2019-JCD',
      pncAffiliationNo: 'PNC-AFF-4491-SN',
      address: 'Shah Ghazi Muhalla, Jacobabad, Sindh, Pakistan',
      phone: '+92 722 654321',
      email: 'info@imcan.pk',
      website: 'https://imcan.pk',
      chancellorName: 'Mr. Sajid Hussain',
      ceoName: 'Dr. Hamid Hussain',
      principalName: 'Vinod Kumar (Principal)',
      currency: 'PKR',
      timezone: 'Asia/Karachi',
      pncAttendanceThreshold: 85.0,
      passingPercentage: 50.0,
      lateFeePerDay: 100.0,
    },
  });

  // 2. Campus & Departments
  await prisma.campus.upsert({
    where: { code: 'MAIN_JCD' },
    update: {},
    create: {
      code: 'MAIN_JCD',
      name: 'Jacobabad Main Campus & Teaching Hospital',
      city: 'Jacobabad',
      address: 'Shah Ghazi Muhalla, Near Imam Medical Center, Jacobabad',
      phone: '+92 722 654321',
      email: 'campus.jcd@imcan.pk',
    },
  });

  const departments = [
    { code: 'NURSING', name: 'Department of Nursing Education', type: 'ACADEMIC', headName: 'Vinod Kumar' },
    { code: 'ALLIED_HEALTH', name: 'Department of Allied Health Sciences & DPT', type: 'ACADEMIC', headName: 'Ali Nawaz' },
    { code: 'PARAMEDICAL', name: 'Department of Paramedical Technologies', type: 'ACADEMIC', headName: 'Zahid Abbasi' },
    { code: 'ACCOUNTS', name: 'Finance & Accounts Directorate', type: 'ADMINISTRATIVE', headName: 'Accountant / Clerk' },
    { code: 'ADMIN', name: 'Campus Administration & Registrar Office', type: 'ADMINISTRATIVE', headName: 'Mumtaz Kanasro' },
    { code: 'CLINICAL', name: 'Imam Medical Center Clinical Training Directorate', type: 'CLINICAL', headName: 'Dr. Hamid Hussain' },
  ];

  for (const dep of departments) {
    await prisma.department.upsert({
      where: { code: dep.code },
      update: dep,
      create: dep,
    });
  }

  // 3. Classrooms & Skill Labs
  const classrooms = [
    { roomNo: 'LH-01', name: 'Florence Nightingale Lecture Auditorium', type: 'LECTURE_HALL', capacity: 80 },
    { roomNo: 'LH-02', name: 'Ibn Sina Lecture Hall', type: 'LECTURE_HALL', capacity: 60 },
    { roomNo: 'SKILL-LAB-1', name: 'Adult Health & Critical Care Skills Lab', type: 'SKILLS_LAB', capacity: 30 },
    { roomNo: 'SKILL-LAB-2', name: 'Maternal, Neonatal & Pediatric Simulation Lab', type: 'SKILLS_LAB', capacity: 25 },
    { roomNo: 'PATH-LAB', name: 'Biochemistry & Pathology Diagnostic Lab', type: 'ANATOMY_LAB', capacity: 35 },
    { roomNo: 'DIGITAL-LIB', name: 'Digital Library & Research Center', type: 'COMPUTER_LAB', capacity: 40 },
  ];

  for (const cr of classrooms) {
    await prisma.classroom.upsert({
      where: { roomNo: cr.roomNo },
      update: cr,
      create: cr,
    });
  }

  // 4. Academic Sessions
  await prisma.academicSession.upsert({
    where: { name: '2025-2026' },
    update: { isCurrent: false },
    create: {
      name: '2025-2026',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      isCurrent: false,
    },
  });

  await prisma.academicSession.upsert({
    where: { name: '2026-2027' },
    update: { isCurrent: true },
    create: {
      name: '2026-2027',
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31'),
      isCurrent: true,
    },
  });

  // 5. Grading Rules
  const gradeRules = [
    { grade: 'A+', minPercentage: 85, maxPercentage: 100, gpaPoints: 4.0, remarks: 'Exceptional (High Distinction)' },
    { grade: 'A', minPercentage: 80, maxPercentage: 84.99, gpaPoints: 3.7, remarks: 'Excellent (Distinction)' },
    { grade: 'B+', minPercentage: 75, maxPercentage: 79.99, gpaPoints: 3.3, remarks: 'Very Good' },
    { grade: 'B', minPercentage: 70, maxPercentage: 74.99, gpaPoints: 3.0, remarks: 'Good' },
    { grade: 'C', minPercentage: 50, maxPercentage: 69.99, gpaPoints: 2.0, remarks: 'Passing Standard' },
    { grade: 'F', minPercentage: 0, maxPercentage: 49.99, gpaPoints: 0.0, remarks: 'Fail / Needs Remediation' },
  ];

  for (const gr of gradeRules) {
    await prisma.gradeScaleRule.upsert({
      where: { grade: gr.grade },
      update: gr,
      create: gr,
    });
  }

  // 6. Curricula & Subjects for Academic Programs
  const bsnProg = await prisma.program.findUnique({ where: { code: 'BSN' } });
  const postRnProg = await prisma.program.findUnique({ where: { code: 'POST_RN' } });
  const lhvProg = await prisma.program.findUnique({ where: { code: 'LHV' } });
  const dptProg = await prisma.program.findUnique({ where: { code: 'DPT' } });

  const subjectsToSeed = [];

  if (bsnProg) {
    subjectsToSeed.push(
      { code: 'BSN-FON-101', name: 'Fundamentals of Nursing I', programId: bsnProg.id, semester: 1, creditHoursTheory: 3, creditHoursLab: 1, creditHoursClinical: 2 },
      { code: 'BSN-ANAT-102', name: 'Human Anatomy & Histology', programId: bsnProg.id, semester: 1, creditHoursTheory: 3, creditHoursLab: 1, creditHoursClinical: 0 },
      { code: 'BSN-PHYS-103', name: 'Human Physiology & Biophysics', programId: bsnProg.id, semester: 1, creditHoursTheory: 3, creditHoursLab: 1, creditHoursClinical: 0 },
      { code: 'BSN-CHN-201', name: 'Community Health Nursing I', programId: bsnProg.id, semester: 3, creditHoursTheory: 2, creditHoursLab: 1, creditHoursClinical: 2 },
      { code: 'BSN-AHN-202', name: 'Adult Health Nursing I (Medical-Surgical)', programId: bsnProg.id, semester: 4, creditHoursTheory: 4, creditHoursLab: 1, creditHoursClinical: 4 },
      { code: 'BSN-PHARM-203', name: 'Clinical Pharmacology & Drug Math', programId: bsnProg.id, semester: 4, creditHoursTheory: 3, creditHoursLab: 0, creditHoursClinical: 1 },
      { code: 'BSN-PATH-204', name: 'Clinical Pathophysiology', programId: bsnProg.id, semester: 4, creditHoursTheory: 3, creditHoursLab: 1, creditHoursClinical: 0 }
    );
  }

  if (postRnProg) {
    subjectsToSeed.push(
      { code: 'PRN-ADV-101', name: 'Advanced Clinical Concepts in Nursing', programId: postRnProg.id, semester: 1, creditHoursTheory: 3, creditHoursLab: 1, creditHoursClinical: 2 },
      { code: 'PRN-LEAD-102', name: 'Nursing Leadership & Ward Management', programId: postRnProg.id, semester: 2, creditHoursTheory: 3, creditHoursLab: 0, creditHoursClinical: 1 }
    );
  }

  if (lhvProg) {
    subjectsToSeed.push(
      { code: 'LHV-MID-101', name: 'Midwifery & Antenatal Care', programId: lhvProg.id, semester: 1, creditHoursTheory: 3, creditHoursLab: 1, creditHoursClinical: 3 },
      { code: 'LHV-PED-102', name: 'Pediatric Health & Immunization (EPI)', programId: lhvProg.id, semester: 2, creditHoursTheory: 2, creditHoursLab: 1, creditHoursClinical: 2 }
    );
  }

  if (dptProg) {
    subjectsToSeed.push(
      { code: 'DPT-KINE-101', name: 'Kinesiology & Biomechanics', programId: dptProg.id, semester: 1, creditHoursTheory: 3, creditHoursLab: 1, creditHoursClinical: 0 },
      { code: 'DPT-THER-201', name: 'Physical Agents & Electrotherapy', programId: dptProg.id, semester: 3, creditHoursTheory: 3, creditHoursLab: 1, creditHoursClinical: 2 }
    );
  }

  for (const s of subjectsToSeed) {
    await prisma.subject.upsert({
      where: { code: s.code },
      update: s,
      create: s,
    });
  }

  // 7. Weekly Timetable Slots
  const timetableSlots = [
    { programCode: 'BSN', batchName: 'Batch 2024-2028 (BSN Year 2)', semester: 4, subjectCode: 'BSN-AHN-202', subjectName: 'Adult Health Nursing I', teacherName: 'Zahid Abbasi (Lecturer)', roomNo: 'LH-01', dayOfWeek: 'MONDAY', startTime: '08:30', endTime: '10:00', slotType: 'THEORY' },
    { programCode: 'BSN', batchName: 'Batch 2024-2028 (BSN Year 2)', semester: 4, subjectCode: 'BSN-PHARM-203', subjectName: 'Clinical Pharmacology', teacherName: 'Vinod Kumar (Principal)', roomNo: 'LH-01', dayOfWeek: 'MONDAY', startTime: '10:30', endTime: '12:00', slotType: 'THEORY' },
    { programCode: 'BSN', batchName: 'Batch 2024-2028 (BSN Year 2)', semester: 4, subjectCode: 'BSN-AHN-202', subjectName: 'Adult Health Clinical Practicum', teacherName: 'Mir Mansab (Lecturer)', roomNo: 'SKILL-LAB-1', dayOfWeek: 'TUESDAY', startTime: '08:30', endTime: '11:30', slotType: 'LAB' },
    { programCode: 'BSN', batchName: 'Batch 2024-2028 (BSN Year 2)', semester: 4, subjectCode: 'BSN-PATH-204', subjectName: 'Clinical Pathophysiology', teacherName: 'Dr. Hamid Hussain', roomNo: 'PATH-LAB', dayOfWeek: 'WEDNESDAY', startTime: '09:00', endTime: '10:30', slotType: 'THEORY' },
    { programCode: 'BSN', batchName: 'Batch 2024-2028 (BSN Year 2)', semester: 4, subjectCode: 'BSN-CHN-201', subjectName: 'Community Health Nursing', teacherName: 'Ali Nawaz (Vice Principal)', roomNo: 'LH-01', dayOfWeek: 'THURSDAY', startTime: '08:30', endTime: '10:00', slotType: 'THEORY' },
    { programCode: 'BSN', batchName: 'Batch 2024-2028 (BSN Year 2)', semester: 4, subjectCode: 'BSN-AHN-202', subjectName: 'Hospital Emergency Clinical Ward Rotation', teacherName: 'Zahid Abbasi (Lecturer)', roomNo: 'IMC-ER', dayOfWeek: 'FRIDAY', startTime: '08:00', endTime: '12:00', slotType: 'CLINICAL' },
  ];

  await prisma.timetableSlot.deleteMany({});
  for (const slot of timetableSlots) {
    await prisma.timetableSlot.create({ data: slot });
  }

  // 8. Exam Schedules & Marks Entry
  if (bsnProg) {
    const ahnSubject = await prisma.subject.findUnique({ where: { code: 'BSN-AHN-202' } });
    const pharmSubject = await prisma.subject.findUnique({ where: { code: 'BSN-PHARM-203' } });

    if (ahnSubject) {
      const examSchedule = await prisma.examSchedule.create({
        data: {
          title: 'Semester 4 Midterm Examination (Theory & OSPE)',
          programId: bsnProg.id,
          semester: 4,
          subjectId: ahnSubject.id,
          examDate: new Date('2026-11-15T09:00:00Z'),
          startTime: '09:00 AM',
          roomNo: 'Florence Nightingale Auditorium (LH-01)',
          maxTheoryMarks: 60,
          maxLabMarks: 20,
          maxInternalMarks: 20,
          passingMarks: 50,
        },
      });

      // Seed real exam marks for enrolled students
      const students = await prisma.student.findMany({ where: { programId: bsnProg.id }, take: 6 });
      const marksData = [
        { theory: 52, lab: 18, internal: 18, grade: 'A', gpa: 3.7 },
        { theory: 48, lab: 17, internal: 16, grade: 'B+', gpa: 3.3 },
        { theory: 55, lab: 19, internal: 19, grade: 'A+', gpa: 4.0 },
        { theory: 42, lab: 15, internal: 14, grade: 'B', gpa: 3.0 },
        { theory: 38, lab: 14, internal: 13, grade: 'C', gpa: 2.0 },
        { theory: 54, lab: 18, internal: 18, grade: 'A', gpa: 3.8 },
      ];

      for (let i = 0; i < students.length; i++) {
        const s = students[i];
        const m = marksData[i % marksData.length];
        const total = m.theory + m.lab + m.internal;
        await prisma.examMark.create({
          data: {
            examScheduleId: examSchedule.id,
            studentId: s.id,
            subjectId: ahnSubject.id,
            theoryMarks: m.theory,
            labMarks: m.lab,
            internalMarks: m.internal,
            totalMarks: total,
            grade: m.grade,
            gpa: m.gpa,
            status: 'PUBLISHED',
            gradedBy: 'Zahid Abbasi (Lecturer)',
            approvedBy: 'Vinod Kumar (Principal)',
          },
        });
      }
    }
  }

  // 9. Standard Chart of Accounts (COA)
  const coaAccounts = [
    // 1000 ASSETS
    { code: '1001', title: 'Cash in Hand (Main Safe Vault)', accountType: 'ASSET', normalBalance: 'DEBIT', currentBalance: 180000 },
    { code: '1002', title: 'Petty Cash (Accounts Desk)', accountType: 'ASSET', normalBalance: 'DEBIT', currentBalance: 35500 },
    { code: '1010', title: 'Habib Bank Limited (HBL Main A/C #8821)', accountType: 'ASSET', normalBalance: 'DEBIT', currentBalance: 2450000 },
    { code: '1020', title: 'Student Tuition Fee Receivables', accountType: 'ASSET', normalBalance: 'DEBIT', currentBalance: 345000 },
    { code: '1030', title: 'Medical & Laboratory Inventory Assets', accountType: 'ASSET', normalBalance: 'DEBIT', currentBalance: 420000 },
    { code: '1050', title: 'Solar Energy & Campus Infrastructure Equipment', accountType: 'ASSET', normalBalance: 'DEBIT', currentBalance: 3200000 },

    // 2000 LIABILITIES
    { code: '2001', title: 'Accounts Payable / Vendor Invoices', accountType: 'LIABILITY', normalBalance: 'CREDIT', currentBalance: 85000 },
    { code: '2010', title: 'Accrued Staff Salaries Payable', accountType: 'LIABILITY', normalBalance: 'CREDIT', currentBalance: 280000 },
    { code: '2020', title: 'Income Tax Withholding Payable (FBR)', accountType: 'LIABILITY', normalBalance: 'CREDIT', currentBalance: 14500 },
    { code: '2030', title: 'EOBI Contribution Payable', accountType: 'LIABILITY', normalBalance: 'CREDIT', currentBalance: 19500 },
    { code: '2040', title: 'Student Security Caution Money (Refundable)', accountType: 'LIABILITY', normalBalance: 'CREDIT', currentBalance: 180000 },

    // 3000 EQUITY & FUNDS
    { code: '3001', title: 'Institute Endowment & Capital Fund', accountType: 'EQUITY', normalBalance: 'CREDIT', currentBalance: 5000000 },
    { code: '3002', title: 'Retained Operating Surplus', accountType: 'EQUITY', normalBalance: 'CREDIT', currentBalance: 1046500 },

    // 4000 REVENUE
    { code: '4001', title: 'Student Tuition Fee Revenue', accountType: 'REVENUE', normalBalance: 'CREDIT', currentBalance: 1250000 },
    { code: '4002', title: 'Hospital Clinical Rotation Fee Revenue', accountType: 'REVENUE', normalBalance: 'CREDIT', currentBalance: 320000 },
    { code: '4003', title: 'Admission & Prospectus Fee Revenue', accountType: 'REVENUE', normalBalance: 'CREDIT', currentBalance: 175000 },
    { code: '4004', title: 'PNC Examination & Licensing Fee Inflows', accountType: 'REVENUE', normalBalance: 'CREDIT', currentBalance: 90000 },

    // 5000 EXPENSES
    { code: '5001', title: 'Faculty & Administrative Salaries', accountType: 'EXPENSE', normalBalance: 'DEBIT', currentBalance: 480000 },
    { code: '5002', title: 'Hospital Clinical Training Allowances', accountType: 'EXPENSE', normalBalance: 'DEBIT', currentBalance: 65000 },
    { code: '5003', title: 'Medical Consumables & Lab Reagents', accountType: 'EXPENSE', normalBalance: 'DEBIT', currentBalance: 82000 },
    { code: '5004', title: 'Campus Electricity, Solar & Utilities', accountType: 'EXPENSE', normalBalance: 'DEBIT', currentBalance: 42000 },
    { code: '5005', title: 'Affiliated Imam Medical Center Bedside Charges', accountType: 'EXPENSE', normalBalance: 'DEBIT', currentBalance: 110000 },
    { code: '5006', title: 'Printing, Stationery & Examination Papers', accountType: 'EXPENSE', normalBalance: 'DEBIT', currentBalance: 24500 },
  ];

  await prisma.journalLine.deleteMany({});
  await prisma.journalEntry.deleteMany({});
  await prisma.accountHead.deleteMany({});

  const accountMap = {};
  for (const acc of coaAccounts) {
    const created = await prisma.accountHead.create({ data: acc });
    accountMap[acc.code] = created;
  }

  // 10. Financial Period
  await prisma.financialPeriod.upsert({
    where: { name: 'FY 2026-2027' },
    update: { isClosed: false },
    create: {
      name: 'FY 2026-2027',
      startDate: new Date('2026-07-01'),
      endDate: new Date('2027-06-30'),
      isClosed: false,
    },
  });

  // 11. Balanced Double-Entry Journal Entries
  // Transaction 1: Fee collection receipt (Cash Debit, Fee Revenue Credit)
  const jv1 = await prisma.journalEntry.create({
    data: {
      voucherNo: 'CRV-2026-0042',
      voucherType: 'CASH_RECEIPT',
      entryDate: new Date(),
      description: 'Cash fee collection from Semester 4 Generic BSN students (Challan batch)',
      referenceNo: 'RCPT-2026-1042',
      status: 'POSTED',
      postedBy: 'Accountant / Clerk',
      totalAmount: 155000,
      lines: {
        create: [
          { accountHeadId: accountMap['1001'].id, debit: 155000, credit: 0, narration: 'Cash deposited in campus vault' },
          { accountHeadId: accountMap['4001'].id, debit: 0, credit: 155000, narration: 'Tuition fee recovery credited to revenue', costCenter: 'BSN' },
        ],
      },
    },
  });

  // Transaction 2: Medical Consumables Expense Voucher (Expense Debit, Cash Credit)
  const jv2 = await prisma.journalEntry.create({
    data: {
      voucherNo: 'CPV-2026-0089',
      voucherType: 'CASH_PAYMENT',
      entryDate: new Date(),
      description: 'Payment for 500 units calibrated IV cannulas and blood sampling vacutainers',
      referenceNo: 'VCH-MED-441',
      status: 'POSTED',
      postedBy: 'Accountant / Clerk',
      totalAmount: 35000,
      lines: {
        create: [
          { accountHeadId: accountMap['5003'].id, debit: 35000, credit: 0, narration: 'Medical consumables purchased for Skills Lab', costCenter: 'SKILLS_LAB' },
          { accountHeadId: accountMap['1001'].id, debit: 0, credit: 35000, narration: 'Cash paid out from main safe vault' },
        ],
      },
    },
  });

  // Transaction 3: Monthly Faculty Payroll Bank Transfer (Salary Expense Debit, HBL Credit)
  const jv3 = await prisma.journalEntry.create({
    data: {
      voucherNo: 'BPV-2026-0018',
      voucherType: 'BANK_PAYMENT',
      entryDate: new Date(),
      description: 'Monthly payroll disbursement for Teaching & Support Staff (October 2026)',
      referenceNo: 'HBL-FT-99120',
      status: 'POSTED',
      postedBy: 'Mr. Sajid Hussain (Chairman)',
      totalAmount: 480000,
      lines: {
        create: [
          { accountHeadId: accountMap['5001'].id, debit: 480000, credit: 0, narration: 'Gross salary expense for staff roster' },
          { accountHeadId: accountMap['2020'].id, debit: 0, credit: 14500, narration: 'Income tax deducted at source' },
          { accountHeadId: accountMap['2030'].id, debit: 0, credit: 19500, narration: 'EOBI employee & employer share' },
          { accountHeadId: accountMap['1010'].id, debit: 0, credit: 446000, narration: 'Net salaries transferred via HBL corporate portal' },
        ],
      },
    },
  });

  // 12. Student Ledger Entries
  await prisma.studentLedger.deleteMany({});
  const allChallans = await prisma.feeChallan.findMany({ include: { payments: true } });
  for (const c of allChallans) {
    // Debit entry for Challan billing
    await prisma.studentLedger.create({
      data: {
        studentId: c.studentId,
        entryDate: c.issueDate,
        referenceNo: c.challanNo,
        voucherNo: `JV-CHL-${c.challanNo.slice(-4)}`,
        debit: c.netPayable,
        credit: 0,
        runningBalance: c.netPayable,
        description: `Semester ${c.semester} Tuition & Clinical Ward Fee Billed`,
      },
    });

    // Credit entry for Payments
    for (const p of c.payments) {
      await prisma.studentLedger.create({
        data: {
          studentId: c.studentId,
          entryDate: p.createdAt,
          referenceNo: p.receiptNo,
          voucherNo: `CRV-${p.receiptNo.slice(-4)}`,
          debit: 0,
          credit: p.amountPaid,
          runningBalance: Math.max(0, c.netPayable - p.amountPaid),
          description: `Fee Payment Received via ${p.paymentMethod}`,
        },
      });
    }
  }

  // 13. Inventory Items & Stock
  const inventoryItems = [
    { sku: 'MED-CAN-18G', name: 'IV Cannula 18G Green (B.Braun / Calibrated)', category: 'MEDICAL_CONSUMABLES', unit: 'PIECES', unitCost: 45, currentStock: 250, minReorderLevel: 50 },
    { sku: 'MED-CAN-20G', name: 'IV Cannula 20G Pink (B.Braun / Calibrated)', category: 'MEDICAL_CONSUMABLES', unit: 'PIECES', unitCost: 45, currentStock: 340, minReorderLevel: 60 },
    { sku: 'MED-CAN-22G', name: 'IV Cannula 22G Blue (Pediatric & Geriatric)', category: 'MEDICAL_CONSUMABLES', unit: 'PIECES', unitCost: 48, currentStock: 180, minReorderLevel: 40 },
    { sku: 'MED-NS-500', name: '0.9% Normal Saline 500ml IV Infusion', category: 'MEDICAL_CONSUMABLES', unit: 'BOTTLES', unitCost: 120, currentStock: 160, minReorderLevel: 30 },
    { sku: 'MED-RL-500', name: 'Ringer Lactate 500ml Resuscitation Infusion', category: 'MEDICAL_CONSUMABLES', unit: 'BOTTLES', unitCost: 135, currentStock: 120, minReorderLevel: 30 },
    { sku: 'MED-FOL-16', name: '2-Way Silicone Foley Catheter 16 Fr', category: 'MEDICAL_CONSUMABLES', unit: 'PIECES', unitCost: 220, currentStock: 85, minReorderLevel: 25 },
    { sku: 'MED-ECG-EL', name: '12-Lead ECG Disposable Adhesive Electrodes', category: 'LAB_CONSUMABLES', unit: 'PACKS', unitCost: 350, currentStock: 45, minReorderLevel: 15 },
    { sku: 'MED-TUB-EDTA', name: 'K2 EDTA Purple Top Blood Vacutainers 3ml', category: 'LAB_CONSUMABLES', unit: 'BOXES', unitCost: 650, currentStock: 28, minReorderLevel: 10 },
    { sku: 'STA-A4-PAP', name: 'Official Institutional A4 Crest Paper (80gsm)', category: 'STATIONERY', unit: 'REAMS', unitCost: 1450, currentStock: 35, minReorderLevel: 10 },
  ];

  await prisma.stockTransaction.deleteMany({});
  await prisma.inventoryItem.deleteMany({});

  for (const item of inventoryItems) {
    const createdItem = await prisma.inventoryItem.create({ data: item });

    // Initial stock receipt (GRN)
    await prisma.stockTransaction.create({
      data: {
        itemId: createdItem.id,
        transactionType: 'GRN',
        quantity: item.currentStock,
        unitCost: item.unitCost,
        totalValue: item.currentStock * item.unitCost,
        referenceNo: `GRN-2026-${item.sku.slice(4, 7)}`,
        costCenter: 'CENTRAL_STORE',
        department: 'Stores & Supplies',
        requestedBy: 'Storekeeper Najaf Ali',
        approvedBy: 'Mr. Majid Hussain (Director Finance)',
        notes: 'Initial verified stock consignment received from certified medical distributor.',
      },
    });
  }

  // 14. Clinical Departments & IMC Teaching Hospital Rotations
  const clinicalDepts = [
    { name: 'Emergency & Trauma Resuscitation', hospitalName: 'Imam Medical Center', bedCapacity: 25, preceptorRatioLimit: 6, contactPerson: 'Dr. Hamid Hussain (MS)' },
    { name: 'Intensive Care & Coronary Care (ICU/CCU)', hospitalName: 'Imam Medical Center', bedCapacity: 15, preceptorRatioLimit: 4, contactPerson: 'Preceptor Zahid Abbasi' },
    { name: 'Pediatrics & Neonatal Intensive Care (NICU)', hospitalName: 'Imam Medical Center', bedCapacity: 20, preceptorRatioLimit: 6, contactPerson: 'Preceptor Mir Mansab' },
    { name: 'General Surgery & Operation Theaters', hospitalName: 'Imam Medical Center', bedCapacity: 20, preceptorRatioLimit: 6, contactPerson: 'Dr. Hamid Hussain (MS)' },
    { name: 'Labor Room & Obstetrics/Gynecology', hospitalName: 'Imam Medical Center', bedCapacity: 20, preceptorRatioLimit: 6, contactPerson: 'Senior Midwife Shabana' },
  ];

  await prisma.clinicalEvaluation.deleteMany({});
  await prisma.clinicalRotationSchedule.deleteMany({});
  await prisma.clinicalDepartment.deleteMany({});

  for (const dept of clinicalDepts) {
    const createdDept = await prisma.clinicalDepartment.create({ data: dept });

    // Schedule active rotation
    await prisma.clinicalRotationSchedule.create({
      data: {
        departmentId: createdDept.id,
        programCode: 'BSN',
        batchName: 'Batch 2024-2028 (BSN Year 2)',
        startDate: new Date('2026-11-01'),
        endDate: new Date('2026-11-30'),
        shiftType: 'MORNING',
        preceptorId: 'usr-teach-zahid',
        preceptorName: 'Zahid Abbasi (Lecturer)',
        maxCapacity: 8,
        status: 'ACTIVE',
      },
    });
  }

  // 15. Audit Logs for Initial Enterprise Activity
  await prisma.auditLog.deleteMany({});
  const initialAuditLogs = [
    {
      userId: 'usr-mgmt-sajid',
      userName: 'Mr. Sajid Hussain',
      userRole: 'OWNER',
      action: 'APPROVE',
      module: 'FINANCE',
      recordId: 'BPV-2026-0018',
      description: 'Approved October 2026 Staff Payroll batch disbursement via HBL corporate banking portal',
      previousState: 'STATUS: DRAFT',
      newState: 'STATUS: POSTED',
      ipAddress: '192.168.1.10',
    },
    {
      userId: 'usr-teach-vinod',
      userName: 'Vinod Kumar (Principal)',
      userRole: 'PRINCIPAL',
      action: 'APPROVE',
      module: 'EXAMS',
      recordId: 'EXM-BSN-SEM4',
      description: 'Validated Semester 4 Midterm Examination results and authorized grade sheet publication',
      previousState: 'STATUS: SUBMITTED',
      newState: 'STATUS: PUBLISHED',
      ipAddress: '192.168.1.15',
    },
    {
      userId: 'usr-supp-accountant',
      userName: 'Accountant / Clerk',
      userRole: 'CASHIER',
      action: 'POST',
      module: 'FINANCE',
      recordId: 'CRV-2026-0042',
      description: 'Posted PKR 155,000 cash fee recovery into main safe vault ledger',
      previousState: 'UNPOSTED',
      newState: 'POSTED',
      ipAddress: '192.168.1.25',
    },
    {
      userId: 'usr-teach-zahid',
      userName: 'Zahid Abbasi (Lecturer)',
      userRole: 'FACULTY',
      action: 'APPROVE',
      module: 'CLINICAL',
      recordId: 'LOG-BSN-101',
      description: 'Verified bedside Arterial Blood Gas (ABG) procedure for Student Nurse Ayesha Noor (PIN: 9988)',
      previousState: 'PENDING_APPROVAL',
      newState: 'SIGNED_OFF',
      ipAddress: '192.168.1.40',
    },
  ];

  for (const log of initialAuditLogs) {
    await prisma.auditLog.create({ data: log });
  }

  // 16. Granular System Permissions for 20 Institutional Roles
  const roles = [
    'CHAIRMAN', 'EXECUTIVE_MGMT', 'PRINCIPAL', 'VICE_PRINCIPAL', 'REGISTRAR',
    'ADMISSION_OFFICER', 'EXAM_CONTROLLER', 'ACCOUNTANT', 'CASHIER', 'HR_MANAGER',
    'HR_OFFICER', 'DEPT_HEAD', 'FACULTY', 'CLINICAL_INSTRUCTOR', 'CLINICAL_PRECEPTOR',
    'LIBRARY_OFFICER', 'STOREKEEPER', 'IT_ADMIN', 'STUDENT', 'AUDITOR'
  ];

  await prisma.systemRolePermission.deleteMany({});
  for (const r of roles) {
    await prisma.systemRolePermission.create({
      data: {
        role: r,
        resource: 'INSTITUTE_ERP',
        canView: true,
        canCreate: ['CHAIRMAN', 'PRINCIPAL', 'ACCOUNTANT', 'ADMISSION_OFFICER', 'EXAM_CONTROLLER', 'HR_MANAGER', 'STOREKEEPER'].includes(r),
        canEdit: ['CHAIRMAN', 'PRINCIPAL', 'ACCOUNTANT', 'ADMISSION_OFFICER', 'EXAM_CONTROLLER', 'HR_MANAGER'].includes(r),
        canDelete: ['CHAIRMAN', 'IT_ADMIN'].includes(r),
        canApprove: ['CHAIRMAN', 'EXECUTIVE_MGMT', 'PRINCIPAL', 'VICE_PRINCIPAL', 'EXAM_CONTROLLER', 'HR_MANAGER', 'DEPT_HEAD', 'CLINICAL_PRECEPTOR'].includes(r),
        canPost: ['ACCOUNTANT', 'CASHIER', 'CHAIRMAN'].includes(r),
        canReverse: ['CHAIRMAN', 'ACCOUNTANT'].includes(r),
      },
    });
  }

  console.log('Enterprise seed successfully applied with Double-Entry COA, Timetables, Exam Marks, Clinical Rotations, and Audit Logs!');
}

module.exports = { seedEnterpriseData };

if (require.main === module) {
  seedEnterpriseData()
    .catch((e) => {
      console.error('Error seeding enterprise data:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
