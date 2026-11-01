const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data and seeding system users from official list...');

  // 1. Clean out existing records to remove all other data
  await prisma.studentCompetencyLog.deleteMany({});
  await prisma.patientTriageCase.deleteMany({});
  await prisma.feePayment.deleteMany({});
  await prisma.feeChallan.deleteMany({});
  await prisma.studentAttendance.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.batch.deleteMany({});
  await prisma.feeStructure.deleteMany({});
  await prisma.program.deleteMany({});
  await prisma.expenseVoucher.deleteMany({});
  await prisma.expenseCategory.deleteMany({});
  await prisma.pettyCashLog.deleteMany({});
  await prisma.ownerApprovalItem.deleteMany({});
  await prisma.applicationDocument.deleteMany({});
  await prisma.payrollRecord.deleteMany({});
  await prisma.staffAttendance.deleteMany({});
  await prisma.clinicalShift.deleteMany({});
  await prisma.staff.deleteMany({});
  await prisma.userProfilePreference.deleteMany({});
  await prisma.competencyRequirement.deleteMany({});
  await prisma.cashierShiftClosing.deleteMany({});
  await prisma.admissionApplication.deleteMany({});
  await prisma.jobApplication.deleteMany({});
  await prisma.programWaitlist.deleteMany({});
  await prisma.publicInquiry.deleteMany({});

  // 2. Official Staff & Users List from Prompt
  // Management (5 Members)
  // Teaching Staff (4 Members)
  // Support Staff (4 Members)
  const officialUsers = [
    // --- MANAGEMENT ---
    {
      userId: 'usr-mgmt-abid',
      empId: 'MGMT-00',
      fullName: 'Dr. Abid Hussain Soomro',
      designation: 'Chief Executive Officer',
      category: 'Management',
      department: 'Executive Leadership & Board of Governors',
      role: 'OWNER',
      email: 'dr.abid@imaminstitute.edu.pk',
      phone: '+92 300 2320085',
      cnic: '41302-1234567-1',
      qualification: 'MBBS, MPH, Healthcare Leadership',
      basicSalary: 380000,
      clinicalAllowance: 40000,
      medicalAllowance: 30000,
      pinCode: '7865',
    },
    {
      userId: 'usr-mgmt-sajid',
      empId: 'MGMT-01',
      fullName: 'Mr. Sajid Hussain',
      designation: 'Chairman & Managing Director',
      category: 'Management',
      department: 'Executive Board of Management',
      role: 'OWNER',
      email: 'sajid.hussain@imaminstitute.edu.pk',
      phone: '+92 300 2145890',
      cnic: '41302-1122334-1',
      qualification: 'MBA Executive, Governance Specialist',
      basicSalary: 350000,
      clinicalAllowance: 0,
      medicalAllowance: 25000,
      pinCode: '7860',
    },
    {
      userId: 'usr-mgmt-hamid',
      empId: 'MGMT-02',
      fullName: 'Dr. Hamid Hussain',
      designation: 'Director & Medical Superintendent',
      category: 'Management',
      department: 'Executive Board / Imam Medical Center',
      role: 'OWNER',
      email: 'dr.hamid@imaminstitute.edu.pk',
      phone: '+92 301 3344556',
      cnic: '41302-2233445-2',
      qualification: 'MBBS, FCPS, Healthcare Administration',
      basicSalary: 320000,
      clinicalAllowance: 30000,
      medicalAllowance: 25000,
      pncLicenseNo: 'PMDC-66219-S',
      pncLicenseExpiry: new Date('2028-12-31'),
      pinCode: '7861',
    },
    {
      userId: 'usr-mgmt-majid',
      empId: 'MGMT-03',
      fullName: 'Mr. Majid Hussain',
      designation: 'Executive Director (Operations)',
      category: 'Management',
      department: 'Executive Board / Operations',
      role: 'OWNER',
      email: 'majid.hussain@imaminstitute.edu.pk',
      phone: '+92 302 4455667',
      cnic: '41302-3344556-3',
      qualification: 'M.Sc. Project Management',
      basicSalary: 280000,
      clinicalAllowance: 0,
      medicalAllowance: 20000,
      pinCode: '7862',
    },
    {
      userId: 'usr-mgmt-shahid',
      empId: 'MGMT-04',
      fullName: 'Mr. Shahid Hussain',
      designation: 'Director of Finance & Accounts',
      category: 'Management',
      department: 'Executive Board / Audit & Finance',
      role: 'OWNER',
      email: 'shahid.hussain@imaminstitute.edu.pk',
      phone: '+92 303 5566778',
      cnic: '41302-4455667-4',
      qualification: 'FCA, Chartered Accountant',
      basicSalary: 280000,
      clinicalAllowance: 0,
      medicalAllowance: 20000,
      pinCode: '7863',
    },
    {
      userId: 'usr-mgmt-saeeda',
      empId: 'MGMT-05',
      fullName: 'Miss Saeeda',
      designation: 'Director & Trustee',
      category: 'Management',
      department: 'Executive Board of Trustees',
      role: 'OWNER',
      email: 'saeeda@imaminstitute.edu.pk',
      phone: '+92 304 6677889',
      cnic: '41302-5566778-5',
      qualification: 'M.Phil Education & Policy',
      basicSalary: 260000,
      clinicalAllowance: 0,
      medicalAllowance: 20000,
      pinCode: '7864',
    },

    // --- TEACHING STAFF ---
    {
      userId: 'usr-teach-vinod',
      empId: 'FAC-01',
      fullName: 'Vinod Kumar',
      designation: 'Principal',
      category: 'Teaching Staff',
      department: 'Academic Administration & College of Nursing',
      role: 'PRINCIPAL',
      email: 'vinod.kumar@imaminstitute.edu.pk',
      phone: '+92 333 7788990',
      cnic: '41303-6677889-6',
      qualification: 'PhD Nursing Sciences, MSN, RN, RM',
      basicSalary: 230000,
      clinicalAllowance: 30000,
      medicalAllowance: 15000,
      pncLicenseNo: 'PNC-L-98412-N',
      pncLicenseExpiry: new Date('2028-06-30'),
      pinCode: '1122',
    },
    {
      userId: 'usr-teach-alinawaz',
      empId: 'FAC-02',
      fullName: 'Ali Nawaz',
      designation: 'Vice Principal (VP)',
      category: 'Teaching Staff',
      department: 'Department of Nursing & Allied Health',
      role: 'VICE_PRINCIPAL',
      email: 'ali.nawaz@imaminstitute.edu.pk',
      phone: '+92 334 8899001',
      cnic: '41301-7788990-7',
      qualification: 'MSN, BSN, Diploma in Critical Care Nursing',
      basicSalary: 175000,
      clinicalAllowance: 25000,
      medicalAllowance: 12000,
      pncLicenseNo: 'PNC-RN-77319-K',
      pncLicenseExpiry: new Date('2027-11-20'),
      pinCode: '2233',
    },
    {
      userId: 'usr-teach-zahid',
      empId: 'FAC-03',
      fullName: 'Zahid Abbasi',
      designation: 'Lecturer',
      category: 'Teaching Staff',
      department: 'Department of Clinical Nursing',
      role: 'FACULTY',
      email: 'zahid.abbasi@imaminstitute.edu.pk',
      phone: '+92 335 9900112',
      cnic: '41302-8899001-8',
      qualification: 'MSN, BSN, ACLS Instructor',
      basicSalary: 115000,
      clinicalAllowance: 20000,
      medicalAllowance: 10000,
      pncLicenseNo: 'PNC-RN-66421-S',
      // EXPIRING IN 18 DAYS! Demonstrates License Compliance Alert
      pncLicenseExpiry: new Date(Date.now() + 18 * 86400000),
      pinCode: '9988',
    },
    {
      userId: 'usr-teach-mirmansab',
      empId: 'FAC-04',
      fullName: 'Mir Mansab',
      designation: 'Lecturer',
      category: 'Teaching Staff',
      department: 'Department of Allied Health & Skills Lab',
      role: 'FACULTY',
      email: 'mir.mansab@imaminstitute.edu.pk',
      phone: '+92 336 1122334',
      cnic: '41303-9900112-9',
      qualification: 'M.Phil MLT, BS-MLT',
      basicSalary: 110000,
      clinicalAllowance: 18000,
      medicalAllowance: 10000,
      pncLicenseNo: 'SMF-MLT-44129',
      pncLicenseExpiry: new Date('2027-08-15'),
      pinCode: '7788',
    },

    // --- SUPPORT STAFF ---
    {
      userId: 'usr-supp-mumtaz',
      empId: 'ADM-01',
      fullName: 'Mumtaz Kanasro',
      designation: 'Admin',
      category: 'Support Staff',
      department: 'Campus General Administration & Logistics',
      role: 'ADMIN',
      email: 'mumtaz.kanasro@imaminstitute.edu.pk',
      phone: '+92 312 2233445',
      cnic: '41301-1199882-3',
      qualification: 'M.A. Public Administration',
      basicSalary: 95000,
      clinicalAllowance: 0,
      medicalAllowance: 10000,
      pinCode: '4455',
    },
    {
      userId: 'usr-supp-accountant',
      empId: 'ACT-01',
      fullName: 'Accountant / Clerk',
      designation: 'Accountant / Clerk',
      category: 'Support Staff',
      department: 'Finance, Accounts & Cashier Desk',
      role: 'CASHIER',
      email: 'accounts@imaminstitute.edu.pk',
      phone: '+92 313 3344556',
      cnic: '41302-3388771-4',
      qualification: 'M.Com, B.Com, PIPFA Certified',
      basicSalary: 80000,
      clinicalAllowance: 0,
      medicalAllowance: 8000,
      pinCode: '4321',
    },
    {
      userId: 'usr-supp-imtiaz',
      empId: 'SUP-01',
      fullName: 'Imtiaz Ali',
      designation: 'Peon',
      category: 'Support Staff',
      department: 'Campus Logistics & Support Services',
      role: 'SUPPORT',
      email: 'imtiaz.ali@staff.imaminstitute.edu.pk',
      phone: '+92 314 4455667',
      cnic: '41302-5544332-1',
      qualification: 'Matriculation',
      basicSalary: 38000,
      clinicalAllowance: 0,
      medicalAllowance: 5000,
      pinCode: '1234',
    },
    {
      userId: 'usr-supp-najaf',
      empId: 'SUP-02',
      fullName: 'Najaf Ali',
      designation: 'Peon',
      category: 'Support Staff',
      department: 'Hospital & Lab Support Services',
      role: 'SUPPORT',
      email: 'najaf.ali@staff.imaminstitute.edu.pk',
      phone: '+92 315 5566778',
      cnic: '41302-6655443-2',
      qualification: 'Matriculation',
      basicSalary: 38000,
      clinicalAllowance: 0,
      medicalAllowance: 5000,
      pinCode: '1234',
    },
  ];

  // Also include 1 demo student to maintain student portal, attendance, logbook and fee collection functionality
  const demoStudentUser = {
    userId: 'usr-stu-ayesha',
    fullName: 'Ayesha Noor',
    designation: 'Student Nurse (Semester 4)',
    category: 'Student',
    department: 'Generic BSN Program',
    role: 'STUDENT',
    email: 'ayesha.noor@student.imaminstitute.edu.pk',
    phone: '+92 345 1234567',
    cnic: '41302-9988112-4',
    pinCode: '2024',
  };

  // Seed UserProfilePreference for all
  for (const u of [...officialUsers, demoStudentUser]) {
    await prisma.userProfilePreference.create({
      data: {
        userId: u.userId,
        role: u.role,
        category: u.category,
        fullName: u.fullName,
        email: u.email,
        phone: u.phone,
        cnic: u.cnic,
        designation: u.designation,
        department: u.department,
        emergencyContact: '+92 300 2145890',
        address: 'Imam Institute Campus Enclave, Sindh, Pakistan',
        bloodGroup: 'B+',
        language: 'en',
        tableDensity: 'comfortable',
        notificationsEnabled: true,
        pinCode: u.pinCode || '1234',
      },
    });
  }

  // Seed Staff Table for all staff
  for (const s of officialUsers) {
    await prisma.staff.create({
      data: {
        empId: s.empId,
        fullName: s.fullName,
        designation: s.designation,
        category: s.category,
        department: s.department,
        role: s.role,
        cnic: s.cnic,
        phone: s.phone,
        email: s.email,
        qualification: s.qualification,
        pncLicenseNo: s.pncLicenseNo,
        pncLicenseExpiry: s.pncLicenseExpiry,
        basicSalary: s.basicSalary,
        clinicalAllowance: s.clinicalAllowance,
        medicalAllowance: s.medicalAllowance,
        overtimeRate: 600,
        status: 'ACTIVE',
        joinDate: new Date('2024-01-01'),
      },
    });
  }

  // 3. Academic Programs & Batches
  const progBSN = await prisma.program.create({
    data: {
      code: 'BSN',
      name: 'Generic BSN (Bachelor of Science in Nursing)',
      durationYears: 4,
      totalSemesters: 8,
      baseTuitionFee: 110000,
      labFee: 25000,
      clinicalFee: 35000,
    },
  });

  const progPostRN = await prisma.program.create({
    data: {
      code: 'POST_RN',
      name: 'Post-RN BSN Degree',
      durationYears: 2,
      totalSemesters: 4,
      baseTuitionFee: 85000,
      labFee: 15000,
      clinicalFee: 25000,
    },
  });

  const progLHV = await prisma.program.create({
    data: {
      code: 'LHV',
      name: 'Lady Health Visitor (LHV)',
      durationYears: 2,
      totalSemesters: 4,
      baseTuitionFee: 65000,
      labFee: 12000,
      clinicalFee: 18000,
    },
  });

  const progDPT = await prisma.program.create({
    data: {
      code: 'DPT',
      name: 'Doctor of Physical Therapy (DPT)',
      durationYears: 5,
      totalSemesters: 10,
      baseTuitionFee: 135000,
      labFee: 30000,
      clinicalFee: 40000,
    },
  });

  const batchBSN = await prisma.batch.create({
    data: {
      programId: progBSN.id,
      name: 'BSN Batch 2024-2028 (4th Semester)',
      currentSemester: 4,
      startDate: new Date('2024-01-15'),
    },
  });

  // 4. Students enrolled under Vinod Kumar (Principal) & Zahid Abbasi (Lecturer)
  const student1 = await prisma.student.create({
    data: {
      rollNo: 'BSN-2024-004',
      registrationNo: 'PNC-REG-88219',
      fullName: 'Ayesha Noor',
      fatherName: 'Noor Muhammad',
      cnic: '41302-9988112-4',
      phone: '+92 345 1234567',
      fatherPhone: '+92 300 9876543',
      email: 'ayesha.noor@student.imaminstitute.edu.pk',
      bloodGroup: 'O+',
      address: 'House #42, Qasimabad, Hyderabad, Sindh',
      programId: progBSN.id,
      batchId: batchBSN.id,
      currentSemester: 4,
      cgpa: 3.84,
      attendancePercent: 91.5,
      clinicalAttendancePercent: 89.2,
      meritTier: 1.0,
      status: 'ACTIVE',
    },
  });

  const student2 = await prisma.student.create({
    data: {
      rollNo: 'BSN-2024-008',
      registrationNo: 'PNC-REG-88223',
      fullName: 'Fatima Zehra',
      fatherName: 'Syed Ali Raza',
      cnic: '41302-7766554-2',
      phone: '+92 301 2345678',
      fatherPhone: '+92 302 8765432',
      email: 'fatima.zehra@student.imaminstitute.edu.pk',
      bloodGroup: 'B+',
      address: 'Near Old Campus, Sukkur, Sindh',
      programId: progBSN.id,
      batchId: batchBSN.id,
      currentSemester: 4,
      cgpa: 3.72,
      attendancePercent: 88.0,
      clinicalAttendancePercent: 86.5,
      meritTier: 1.0,
      status: 'ACTIVE',
    },
  });

  const student3 = await prisma.student.create({
    data: {
      rollNo: 'BSN-2024-012',
      registrationNo: 'PNC-REG-88227',
      fullName: 'Bilal Ahmed Mahar',
      fatherName: 'Ghulam Qadir Mahar',
      cnic: '41303-1234567-9',
      phone: '+92 312 3456789',
      fatherPhone: '+92 313 7654321',
      email: 'bilal.mahar@student.imaminstitute.edu.pk',
      bloodGroup: 'A+',
      address: 'Larkana Road, Khairpur, Sindh',
      programId: progBSN.id,
      batchId: batchBSN.id,
      currentSemester: 4,
      cgpa: 3.25,
      attendancePercent: 82.0, // Alert <85%
      clinicalAttendancePercent: 81.5,
      meritTier: 2.0,
      status: 'ACTIVE',
    },
  });

  // 5. Expense Categories & Vouchers
  const catUtil = await prisma.expenseCategory.create({
    data: {
      code: 'UTIL_POWER',
      name: 'Utilities (Electricity / Solar Hybrid / Genset Fuel)',
      monthlyBudget: 450000,
      currentSpent: 395000,
      icon: 'Zap',
      description: 'Campus 50KW Solar grid and diesel fuel backup',
    },
  });

  const catLab = await prisma.expenseCategory.create({
    data: {
      code: 'LAB_REAGENTS',
      name: 'Skill & Pathology Lab Consumables & Reagents',
      monthlyBudget: 350000,
      currentSpent: 325000, // 92.8% (>90% Budget Alert!)
      icon: 'FlaskConical',
      description: 'Lab reagents, blood chemistry kits, Vacutainers, anatomical manikins',
    },
  });

  const catMaint = await prisma.expenseCategory.create({
    data: {
      code: 'BUILD_MAINT',
      name: 'Building Infrastructure, Hostel & Campus Mess',
      monthlyBudget: 500000,
      currentSpent: 280000,
      icon: 'Building2',
      description: 'Campus maintenance, plumbing, electrical and mess groceries',
    },
  });

  // Vouchers prepared by Mumtaz Kanasro (Admin)
  await prisma.expenseVoucher.create({
    data: {
      voucherNo: 'CPV-2026-0012',
      categoryId: catUtil.id,
      vendorName: 'Indus Solar & Engineering Works Hyderabad',
      amount: 185000, // > 25,000 -> Routes to Owner
      paymentMode: 'Bank Transfer',
      costCenter: 'Campus Solar Energy System',
      description: 'Replacement of 2x 10kW Hybrid Inverters & Lithium Iron Battery Rack balancing service',
      status: 'PENDING_APPROVAL',
      preparedBy: 'Mumtaz Kanasro (Admin)',
      checkedBy: 'Accountant / Clerk',
    },
  });

  await prisma.expenseVoucher.create({
    data: {
      voucherNo: 'CPV-2026-0013',
      categoryId: catLab.id,
      vendorName: 'Sindh Bio-Diagnostic & Chemical Supplies',
      amount: 95000, // > 25,000 -> Routes to Owner
      paymentMode: 'Cheque',
      costCenter: 'Pathology & Skills Lab',
      description: 'Complete Automated Blood Chemistry reagent pack (Electrolytes, Troponin-I, CBC vials 2000 pcs)',
      status: 'PENDING_APPROVAL',
      preparedBy: 'Zahid Abbasi (Lecturer)',
      checkedBy: 'Accountant / Clerk',
    },
  });

  await prisma.expenseVoucher.create({
    data: {
      voucherNo: 'CPV-2026-0001',
      categoryId: catUtil.id,
      vendorName: 'Pakistan State Oil (PSO Dealer Latifabad)',
      amount: 65000,
      paymentMode: 'Bank Transfer',
      costCenter: '100KVA Diesel Genset',
      description: '500 Liters High-Speed Diesel for campus backup power during scheduled load shedding',
      status: 'PAID',
      preparedBy: 'Mumtaz Kanasro (Admin)',
      checkedBy: 'Accountant / Clerk',
      approvedBy: 'Mr. Sajid Hussain (Chairman)',
      paidAt: new Date(Date.now() - 5 * 86400000),
    },
  });

  // 6. Petty Cash
  await prisma.pettyCashLog.create({
    data: {
      openingFloat: 50000,
      totalSpent: 14500,
      remainingBalance: 35500,
      notes: 'Petty cash float managed by Accountant / Clerk. Reimbursed for office dispatch by Imtiaz Ali.',
      closedBy: 'Accountant / Clerk',
    },
  });

  // 7. Fee Challans & Payments
  const challan1 = await prisma.feeChallan.create({
    data: {
      challanNo: 'CHL-2026-00401',
      studentId: student1.id,
      semester: 4,
      dueDate: new Date('2026-10-25'),
      totalAmount: 170000,
      lateFine: 0,
      discountAmount: 15000,
      netPayable: 155000,
      paidAmount: 155000,
      status: 'PAID',
      barcode: '9211004012026',
    },
  });

  await prisma.feePayment.create({
    data: {
      receiptNo: 'RCPT-2026-00101',
      challanId: challan1.id,
      studentId: student1.id,
      amountPaid: 155000,
      paymentMethod: 'CASH_COUNTER',
      cashierId: 'usr-supp-accountant',
      cashierName: 'Accountant / Clerk',
      notes: 'Semester 4 full settlement collected at cashier desk',
    },
  });

  const challan2 = await prisma.feeChallan.create({
    data: {
      challanNo: 'CHL-2026-00402',
      studentId: student2.id,
      semester: 4,
      dueDate: new Date('2026-11-15'),
      totalAmount: 170000,
      lateFine: 0,
      discountAmount: 0,
      netPayable: 170000,
      paidAmount: 90000,
      status: 'PARTIAL',
      barcode: '9211004022026',
    },
  });

  await prisma.feePayment.create({
    data: {
      receiptNo: 'RCPT-2026-00102',
      challanId: challan2.id,
      studentId: student2.id,
      amountPaid: 90000,
      paymentMethod: 'IBFT',
      transactionRef: 'HBL-FT-998822019',
      cashierId: 'usr-supp-accountant',
      cashierName: 'Accountant / Clerk',
      notes: '1st Installment collected via IBFT',
    },
  });

  // Overdue Defaulter (Bilal Ahmed Mahar)
  await prisma.feeChallan.create({
    data: {
      challanNo: 'CHL-2026-00403',
      studentId: student3.id,
      semester: 4,
      dueDate: new Date('2026-10-10'),
      totalAmount: 170000,
      lateFine: 2100,
      discountAmount: 0,
      netPayable: 172100,
      paidAmount: 0,
      status: 'OVERDUE',
      barcode: '9211004032026',
    },
  });

  // 8. Cashier Shift Register (Today)
  await prisma.cashierShiftClosing.create({
    data: {
      id: 'closing-shift-today',
      cashierId: 'usr-supp-accountant',
      cashierName: 'Accountant / Clerk',
      shiftDate: new Date(),
      openingCash: 25000,
      totalCashCollected: 155000,
      totalOnlineCollected: 90000,
      expectedCashInHand: 180000,
      actualCashInHand: 180000,
      discrepancy: 0,
      status: 'OPEN',
      remarks: 'Shift opened by Accountant / Clerk. All cash verified.',
    },
  });

  // 9. Owner Approval Items
  await prisma.ownerApprovalItem.create({
    data: {
      title: 'Solar Grid 2x 10kW Inverter Replacement & Battery Rack',
      type: 'EXPENSE_VOUCHER',
      referenceId: 'CPV-2026-0012',
      requestedBy: 'Mumtaz Kanasro (Admin)',
      amount: 185000,
      details: 'Urgent replacement of burned MPPT circuit board in main administration building solar array.',
      status: 'PENDING',
    },
  });

  await prisma.ownerApprovalItem.create({
    data: {
      title: 'Pathology & Skills Lab Reagent Batch 10 Purchase',
      type: 'EXPENSE_VOUCHER',
      referenceId: 'CPV-2026-0013',
      requestedBy: 'Zahid Abbasi (Lecturer)',
      amount: 95000,
      details: 'Category Lab Consumables has exceeded 90% budget. Requires Chairman / Management sign-off.',
      status: 'PENDING',
    },
  });

  await prisma.ownerApprovalItem.create({
    data: {
      title: 'Monthly Staff Payroll Disbursement Batch (October 2026)',
      type: 'PAYROLL_BATCH',
      referenceId: 'PAYROLL-OCT-2026',
      requestedBy: 'Accountant / Clerk',
      amount: 2169000,
      details: 'Net salaries for all management, teaching and support staff as per official roster.',
      status: 'PENDING',
    },
  });

  // 10. Competency Requirements
  const competencies = [
    { code: 'IV_CANNULATION', title: 'Peripheral Intravenous (IV) Cannulation (18G–22G)', category: 'Clinical Nursing', minRequired: 25 },
    { code: 'FOLEY_CATHETER', title: 'Indwelling Foley Catheterization', category: 'Urinary Nursing', minRequired: 15 },
    { code: 'ECG_12_LEAD', title: '12-Lead Electrocardiogram (ECG) Recording', category: 'Cardiovascular Diagnostics', minRequired: 30 },
    { code: 'ABG_SAMPLING', title: 'Arterial Blood Gas (ABG) Radial Artery Sampling', category: 'Critical Care', minRequired: 10 },
    { code: 'WOUND_CARE', title: 'Aseptic Surgical Wound Dressing & Suture Care', category: 'Surgical Nursing', minRequired: 20 },
  ];

  for (const c of competencies) {
    await prisma.competencyRequirement.create({ data: c });
  }

  // 11. Student Competency Log (Signed off by Zahid Abbasi, Lecturer)
  await prisma.studentCompetencyLog.create({
    data: {
      studentId: student1.id,
      competencyCode: 'IV_CANNULATION',
      competencyTitle: 'Peripheral Intravenous (IV) Cannulation (18G–22G)',
      patientAgeGender: '48Y / Male (Post-Op Ward)',
      supervisorName: 'Zahid Abbasi (Lecturer)',
      supervisorPin: '9988',
      status: 'SIGNED_OFF',
      selfReflection: 'Successful 20G IV insertion on first attempt in left cephalic vein. Good aseptic control maintained.',
      supervisorFeedback: 'Excellent technique and patient reassurance. Verified in clinical Kardex.',
    },
  });

  // 12. Patient Triage Cases (Managed by Zahid Abbasi & Mir Mansab, Lecturers)
  await prisma.patientTriageCase.create({
    data: {
      mrNumber: 'IMC-MR-2026-1042',
      patientName: 'Khadim Hussain Memon',
      age: 62,
      gender: 'MALE',
      isPregnant: false,
      chiefComplaint: 'Severe breathlessness, wheezing, unable to speak in full sentences, cyanotic lips',
      respRate: 34,
      spo2: 84.0, // Critical Hypoxia
      onOxygen: false,
      systolicBp: 175,
      diastolicBp: 105,
      heartRate: 132,
      temperature: 37.8,
      bloodSugar: 145.0,
      painScale: 4,
      avpuGcs: 'VOICE',
      news2Score: 12, // HIGH RISK
      news2Risk: 'HIGH',
      esiLevel: 1, // IMMEDIATE CRIMSON
      redFlags: 'Critical Hypoxia (SpO2 < 85%), Severe Tachypnea (RR 34), Tachycardia > 130',
      triageCategory: 'IMMEDIATE',
      triageNurseId: 'usr-teach-zahid',
      triageNurseName: 'Zahid Abbasi (Lecturer)',
      pairedStudentId: student1.id,
      pairedStudentName: 'Ayesha Noor (BSN Sem 4)',
      requiredCompetency: 'ABG_SAMPLING',
      queueStatus: 'WAITING',
      waitTimeMinutes: 2,
      bedNumber: 'IMC-ER-BAY-01 (Resus)',
    },
  });

  await prisma.patientTriageCase.create({
    data: {
      mrNumber: 'IMC-MR-2026-1043',
      patientName: 'Parveen Bibi',
      age: 54,
      gender: 'FEMALE',
      isPregnant: false,
      chiefComplaint: 'Crushing retrosternal chest pain radiating to left shoulder, profuse diaphoresis',
      respRate: 24,
      spo2: 93.0,
      onOxygen: true,
      systolicBp: 160,
      diastolicBp: 95,
      heartRate: 108,
      temperature: 36.9,
      bloodSugar: 180.0,
      painScale: 9,
      avpuGcs: 'ALERT',
      news2Score: 7, // HIGH RISK
      news2Risk: 'HIGH',
      esiLevel: 2,
      redFlags: 'Suspected Acute Coronary Syndrome (ACS), High Pain Score (9/10)',
      triageCategory: 'VERY_URGENT',
      triageNurseId: 'usr-teach-zahid',
      triageNurseName: 'Zahid Abbasi (Lecturer)',
      pairedStudentId: student2.id,
      pairedStudentName: 'Fatima Zehra (BSN Sem 4)',
      requiredCompetency: 'ECG_12_LEAD',
      queueStatus: 'WAITING',
      waitTimeMinutes: 6,
      bedNumber: 'IMC-ER-BAY-02',
    },
  });

  // 13. Official Document issued by Vinod Kumar (Principal) & Approved by Mr. Sajid Hussain (Chairman)
  await prisma.applicationDocument.create({
    data: {
      documentNo: 'IINAHS/DOC/2026/0042',
      title: 'PNC Annual Institutional Compliance & Hospital Rotation Report',
      type: 'PNC_REGULATORY',
      applicantRole: 'PRINCIPAL',
      applicantId: 'usr-teach-vinod',
      applicantName: 'Vinod Kumar (Principal)',
      contentEn: 'To: The Registrar, Pakistan Nursing & Midwifery Council (PNC), Islamabad.\nSubject: Annual Faculty Roster & Affiliated Imam Medical Center Bedside Rotation Log for Generic BSN.\n\nRespected Sir/Madam,\nIt is certified that Imam Institute of Nursing maintains full faculty staffing under Principal Vinod Kumar and Vice Principal Ali Nawaz. All students have achieved over 85% attendance required under PNC statutory rules.',
      contentUr: 'بخدمت: رجسٹرار صاحب، پاکستان نرسنگ اینڈ مڈوائفری کونسل، اسلام آباد۔\nموضوع: پرنسپل ونود کمار اور وائس پرنسپل علی نواز کی زیر نگرانی سالانہ فیکلٹی روسٹر رپورٹ۔\nجناب عالی، تصدیق کی جاتی ہے کہ امام انسٹی ٹیوٹ آف نرسنگ میں تمام بی ایس این طلبا پی این سی کے 85 فیصد حاضری کے معیار پر پورا اترتے ہیں۔',
      contentSd: 'خدمت ۾: رجسٽرار صاحب، پاڪستان نرسنگ اينڊ مڊوائفري ڪائونسل، اسلام آباد.\nموضوع: پرنسپال ونود ڪمار ۽ وائيس پرنسپال علي نواز جي نظرداري هيٺ سالياني فئڪلٽي لسٽ رپورٽ.\nمحترم سائين، تصديق ڪجي ٿي ته امام انسٽيٽيوٽ آف نرسنگ ۾ سڀئي شاگرد پي اين سي جي 85 سيڪڙو حاضري واري قانون تي پورا لهن ٿا.',
      policyAlerts: 'Mandatory PNC 85% clinical threshold satisfied across BSN Batch 2024.',
      status: 'APPROVED',
      approvedBy: 'Mr. Sajid Hussain (Chairman)',
      issuedAt: new Date(),
      qrVerificationUrl: 'https://imaminstitute.edu.pk/verify/doc/IINAHS-DOC-2026-0042',
    },
  });

  // 12. Seed Public Website Bridge Data (Admissions, Job Applications, Waitlist)
  await prisma.admissionApplication.createMany({
    data: [
      {
        applicationNo: 'IMCAN-JCD-2026-10482',
        fullName: 'Zubair Ahmed Soomro',
        fatherName: 'Bashir Ahmed',
        cnic: '43102-8877665-1',
        phone: '+92 300 1234567',
        fatherPhone: '+92 301 2345678',
        email: 'zubair.ahmed@gmail.com',
        gender: 'MALE',
        dob: '2005-04-12',
        address: 'Muhalla Pathan, Jacobabad',
        domicileDistrict: 'Jacobabad',
        programCode: 'BSN',
        programName: 'BS Nursing (Generic) - 4 Years',
        matricMarks: 940,
        matricTotal: 1100,
        fscMarks: 910,
        fscTotal: 1100,
        calculatedMerit: 83.6,
        scholarshipCategory: 'PEEF',
        status: 'TEST_SCHEDULED',
        testDate: 'Sunday, 22 November 2026 at 10:00 AM',
        testCenter: 'Imam Institute Main Campus, Shah Ghazi Muhalla, Jacobabad',
        qrSlipData: 'IMCAN-VERIFIED:IMCAN-JCD-2026-10482|Zubair Ahmed Soomro|BSN|83.6%|22-NOV-2026',
        challanGenerated: true,
        challanNo: 'CHL-ADM-2026-10482',
      },
      {
        applicationNo: 'IMCAN-JCD-2026-10483',
        fullName: 'Kainat Fatima Brohi',
        fatherName: 'Ghulam Rasool',
        cnic: '43102-1122998-2',
        phone: '+92 305 9876543',
        fatherPhone: '+92 302 3456789',
        email: 'kainat.brohi@gmail.com',
        gender: 'FEMALE',
        dob: '2006-08-20',
        address: 'Station Road, Jacobabad',
        domicileDistrict: 'Jacobabad',
        programCode: 'XRAY',
        programName: 'X-Ray Technician (1-Year Diploma)',
        matricMarks: 820,
        matricTotal: 1100,
        fscMarks: 780,
        fscTotal: 1100,
        calculatedMerit: 72.7,
        scholarshipCategory: 'FREE_ADMISSION',
        status: 'SUBMITTED',
        testDate: 'Sunday, 22 November 2026 at 10:00 AM',
        testCenter: 'Imam Institute Main Campus, Shah Ghazi Muhalla, Jacobabad',
        qrSlipData: 'IMCAN-VERIFIED:IMCAN-JCD-2026-10483|Kainat Fatima Brohi|XRAY|72.7%|22-NOV-2026',
        challanGenerated: true,
        challanNo: 'CHL-ADM-2026-10483',
      },
      {
        applicationNo: 'IMCAN-JCD-2026-10484',
        fullName: 'Muhammad Usman Lashari',
        fatherName: 'Akhtar Ali',
        cnic: '43105-3344112-1',
        phone: '+92 306 4433221',
        email: 'usman.lashari@gmail.com',
        gender: 'MALE',
        dob: '2005-11-05',
        address: 'Bakhshapur Road, Kashmore',
        domicileDistrict: 'Kashmore',
        programCode: 'ICU',
        programName: 'ICU Technician (1-Year Diploma)',
        matricMarks: 860,
        matricTotal: 1100,
        fscMarks: 830,
        fscTotal: 1100,
        calculatedMerit: 76.8,
        scholarshipCategory: 'TCF_ALUMNI',
        status: 'MERIT_LISTED',
        testDate: 'Sunday, 22 November 2026 at 10:00 AM',
        testCenter: 'Imam Institute Main Campus, Shah Ghazi Muhalla, Jacobabad',
        qrSlipData: 'IMCAN-VERIFIED:IMCAN-JCD-2026-10484|Muhammad Usman Lashari|ICU|76.8%|22-NOV-2026',
        challanGenerated: true,
        challanNo: 'CHL-ADM-2026-10484',
      },
    ],
  });

  await prisma.jobApplication.createMany({
    data: [
      {
        applicationNo: 'JOB-2026-0811',
        position: 'Principal (MSN)',
        fullName: 'Dr. Farzana Parveen',
        gender: 'FEMALE',
        email: 'farzana.parveen.msn@gmail.com',
        phone: '+92 333 5544332',
        cnic: '42201-9988776-2',
        highestQualification: 'Master of Science in Nursing (MSN)',
        yearsExperience: 8,
        pncRegistrationNo: 'PNC-REG-77412-M',
        currentOrganization: 'Aga Khan University Hospital Outreach / Larkana',
        coverLetter: 'Passionate nursing educator and administrator with 8+ years experience in curriculum management and PNC compliance. Keen to lead Imam Institute towards excellence.',
        status: 'SHORTLISTED',
      },
    ],
  });

  await prisma.programWaitlist.createMany({
    data: [
      {
        programCode: 'CMW',
        programName: 'Community Midwifery (CMW)',
        fullName: 'Shaista Bano Khoso',
        phone: '+92 303 8877665',
        email: 'shaista.khoso@gmail.com',
        city: 'Jacobabad',
        notifyVia: 'WHATSAPP',
      },
      {
        programCode: 'LHV',
        programName: 'Lady Health Visitor (LHV)',
        fullName: 'Rashida Khatoon',
        phone: '+92 304 7766554',
        email: 'rashida.khatoon@gmail.com',
        city: 'Shikarpur',
        notifyVia: 'WHATSAPP',
      },
      {
        programCode: 'CNA',
        programName: 'Certified Nursing Assistant (CNA)',
        fullName: 'Naveed Jamali',
        phone: '+92 307 6655443',
        email: 'naveed.jamali@gmail.com',
        city: 'Jacobabad',
        notifyVia: 'WHATSAPP',
      },
    ],
  });

  // Also add an Owner Approval Item for the new online admission
  await prisma.ownerApprovalItem.create({
    data: {
      title: 'Online Admission: Zubair Ahmed Soomro (IMCAN-JCD-2026-10482) - BS Nursing Generic',
      type: 'ONLINE_ADMISSION',
      referenceId: 'IMCAN-JCD-2026-10482',
      requestedBy: 'Zubair Ahmed Soomro (Applicant)',
      amount: 45000,
      details: 'Merit: 83.6%, Matric: 940/1100, FSc: 910/1100. PEEF Scholarship Candidate. Ready for test scheduling & enrollment.',
      status: 'PENDING',
    },
  });

  console.log('Database successfully reset and seeded with official personnel and public website bridge data!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
