const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database and seeding comprehensive enterprise state for Imam Institute...');

  // 1. Clean out existing records
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

  // 2. Official Staff & Management Roster
  const officialUsers = [
    // --- MANAGEMENT (Executive Board) ---
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
      // EXPIRING IN 18 DAYS! Triggers Proactive AI Compliance Radar
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

  // Primary Student User for Self-Service Portal
  const studentUser = {
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
  for (const u of [...officialUsers, studentUser]) {
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
        address: 'Imam Institute Campus Enclave, Jacobabad / Hyderabad, Sindh',
        bloodGroup: 'B+',
        language: 'en',
        tableDensity: 'comfortable',
        notificationsEnabled: true,
        pinCode: u.pinCode || '1234',
      },
    });
  }

  // Seed Staff records
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

  // 3. Academic Programs (6 Programs: BSN, POST_RN, LHV, CNA, DPT, BS_MLT, OT_TECH)
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

  const progCNA = await prisma.program.create({
    data: {
      code: 'CNA',
      name: 'Certified Nursing Assistant (CNA)',
      durationYears: 2,
      totalSemesters: 4,
      baseTuitionFee: 55000,
      labFee: 10000,
      clinicalFee: 15000,
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

  const progMLT = await prisma.program.create({
    data: {
      code: 'BS_MLT',
      name: 'BS Medical Laboratory Technology (BS-MLT)',
      durationYears: 4,
      totalSemesters: 8,
      baseTuitionFee: 95000,
      labFee: 35000,
      clinicalFee: 20000,
    },
  });

  // Batches
  const batchBSN = await prisma.batch.create({
    data: {
      programId: progBSN.id,
      name: 'BSN Batch 2024-2028 (4th Semester)',
      currentSemester: 4,
      startDate: new Date('2024-01-15'),
    },
  });

  const batchPostRN = await prisma.batch.create({
    data: {
      programId: progPostRN.id,
      name: 'Post-RN Batch 2025-2027 (2nd Semester)',
      currentSemester: 2,
      startDate: new Date('2025-01-10'),
    },
  });

  const batchLHV = await prisma.batch.create({
    data: {
      programId: progLHV.id,
      name: 'LHV Batch 2025-2027 (2nd Semester)',
      currentSemester: 2,
      startDate: new Date('2025-01-10'),
    },
  });

  const batchCNA = await prisma.batch.create({
    data: {
      programId: progCNA.id,
      name: 'CNA Batch 2025-2027 (2nd Semester)',
      currentSemester: 2,
      startDate: new Date('2025-01-10'),
    },
  });

  const batchDPT = await prisma.batch.create({
    data: {
      programId: progDPT.id,
      name: 'DPT Batch 2023-2028 (6th Semester)',
      currentSemester: 6,
      startDate: new Date('2023-01-15'),
    },
  });

  const batchMLT = await prisma.batch.create({
    data: {
      programId: progMLT.id,
      name: 'BS-MLT Batch 2024-2028 (4th Semester)',
      currentSemester: 4,
      startDate: new Date('2024-01-15'),
    },
  });

  // 4. Seed 18+ Realistic Students across Sindh/Pakistan Programs
  const studentSeeds = [
    // Generic BSN (Batch 4)
    {
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
    {
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
    {
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
      attendancePercent: 82.0, // Alert: <85% Barred Warning!
      clinicalAttendancePercent: 81.5,
      meritTier: 2.0,
      status: 'ACTIVE',
    },
    {
      rollNo: 'IINAHS-BSN-26-004',
      registrationNo: 'PNC-REG-88231',
      fullName: 'Zainab Tariq Memon',
      fatherName: 'Tariq Mehmood Memon',
      cnic: '41302-6655443-3',
      phone: '+92 303 1122334',
      fatherPhone: '+92 303 9988776',
      email: 'zainab.tariq@student.imaminstitute.edu.pk',
      bloodGroup: 'AB+',
      address: 'Station Road, Jacobabad, Sindh',
      programId: progBSN.id,
      batchId: batchBSN.id,
      currentSemester: 4,
      cgpa: 3.92,
      attendancePercent: 96.0,
      clinicalAttendancePercent: 95.0,
      meritTier: 1.0,
      status: 'ACTIVE',
    },
    {
      rollNo: 'IINAHS-BSN-26-005',
      registrationNo: 'PNC-REG-88235',
      fullName: 'Muhammad Hamza Brohi',
      fatherName: 'Ghulam Rasool Brohi',
      cnic: '43102-4455667-1',
      phone: '+92 304 2233445',
      fatherPhone: '+92 304 8877665',
      email: 'hamza.brohi@student.imaminstitute.edu.pk',
      bloodGroup: 'B-',
      address: 'Near Civil Hospital, Shikarpur, Sindh',
      programId: progBSN.id,
      batchId: batchBSN.id,
      currentSemester: 4,
      cgpa: 3.42,
      attendancePercent: 85.8, // 85-87% Danger Radar Zone
      clinicalAttendancePercent: 85.2,
      meritTier: 2.0,
      status: 'ACTIVE',
    },
    {
      rollNo: 'IINAHS-BSN-26-006',
      registrationNo: 'PNC-REG-88239',
      fullName: 'Sanam Naz Khoso',
      fatherName: 'Manzoor Ahmed Khoso',
      cnic: '43102-3322119-2',
      phone: '+92 305 3344556',
      fatherPhone: '+92 305 7766554',
      email: 'sanam.khoso@student.imaminstitute.edu.pk',
      bloodGroup: 'O-',
      address: 'Shah Ghazi Muhalla, Jacobabad, Sindh',
      programId: progBSN.id,
      batchId: batchBSN.id,
      currentSemester: 4,
      cgpa: 3.58,
      attendancePercent: 86.4, // 85-87% Danger Radar Zone
      clinicalAttendancePercent: 85.9,
      meritTier: 2.0,
      status: 'ACTIVE',
    },

    // Post-RN BSN
    {
      rollNo: 'IINAHS-POSTRN-26-007',
      registrationNo: 'PNC-RN-99412',
      fullName: 'Tariq Aziz Soomro',
      fatherName: 'Abdul Aziz Soomro',
      cnic: '43101-7788991-3',
      phone: '+92 306 4455667',
      fatherPhone: '+92 306 6655443',
      email: 'tariq.soomro@student.imaminstitute.edu.pk',
      bloodGroup: 'A-',
      address: 'Military Road, Sukkur, Sindh',
      programId: progPostRN.id,
      batchId: batchPostRN.id,
      currentSemester: 2,
      cgpa: 3.68,
      attendancePercent: 92.0,
      clinicalAttendancePercent: 93.5,
      meritTier: 1.0,
      status: 'ACTIVE',
    },
    {
      rollNo: 'IINAHS-POSTRN-26-008',
      registrationNo: 'PNC-RN-99418',
      fullName: 'Razia Sultana Jamali',
      fatherName: 'Allah Bux Jamali',
      cnic: '43102-5566778-4',
      phone: '+92 307 5566778',
      fatherPhone: '+92 307 5544332',
      email: 'razia.jamali@student.imaminstitute.edu.pk',
      bloodGroup: 'B+',
      address: 'Pathan Colony, Jacobabad, Sindh',
      programId: progPostRN.id,
      batchId: batchPostRN.id,
      currentSemester: 2,
      cgpa: 3.76,
      attendancePercent: 89.0,
      clinicalAttendancePercent: 88.0,
      meritTier: 1.0,
      status: 'ACTIVE',
    },

    // Lady Health Visitor (LHV)
    {
      rollNo: 'IINAHS-LHV-26-009',
      registrationNo: 'SMF-LHV-33102',
      fullName: 'Dua Batool Shah',
      fatherName: 'Syed Mazhar Ali Shah',
      cnic: '41302-8877665-2',
      phone: '+92 308 6677889',
      fatherPhone: '+92 308 4433221',
      email: 'dua.shah@student.imaminstitute.edu.pk',
      bloodGroup: 'O+',
      address: 'Main Bazaar, Thul, Jacobabad, Sindh',
      programId: progLHV.id,
      batchId: batchLHV.id,
      currentSemester: 2,
      cgpa: 3.64,
      attendancePercent: 86.1, // 85-87% Danger Zone
      clinicalAttendancePercent: 85.4,
      meritTier: 2.0,
      status: 'ACTIVE',
    },
    {
      rollNo: 'IINAHS-LHV-26-010',
      registrationNo: 'SMF-LHV-33108',
      fullName: 'Saira Bano Buriro',
      fatherName: 'Ghulam Nabi Buriro',
      cnic: '41302-9988776-3',
      phone: '+92 309 7788990',
      fatherPhone: '+92 309 3322110',
      email: 'saira.buriro@student.imaminstitute.edu.pk',
      bloodGroup: 'A+',
      address: 'Old Anaj Mandi, Shikarpur, Sindh',
      programId: progLHV.id,
      batchId: batchLHV.id,
      currentSemester: 2,
      cgpa: 3.86,
      attendancePercent: 94.0,
      clinicalAttendancePercent: 92.5,
      meritTier: 1.0,
      status: 'ACTIVE',
    },

    // Certified Nursing Assistant (CNA)
    {
      rollNo: 'IINAHS-CNA-26-011',
      registrationNo: 'SMF-CNA-22419',
      fullName: 'Kamran Ali Lashari',
      fatherName: 'Akhtar Ali Lashari',
      cnic: '43105-1122334-5',
      phone: '+92 310 8899001',
      fatherPhone: '+92 310 2211009',
      email: 'kamran.lashari@student.imaminstitute.edu.pk',
      bloodGroup: 'B+',
      address: 'Bakhshapur Road, Kashmore, Sindh',
      programId: progCNA.id,
      batchId: batchCNA.id,
      currentSemester: 2,
      cgpa: 3.32,
      attendancePercent: 84.5, // Alert: <85% Barred Warning!
      clinicalAttendancePercent: 84.0,
      meritTier: 3.0,
      status: 'ACTIVE',
    },
    {
      rollNo: 'IINAHS-CNA-26-012',
      registrationNo: 'SMF-CNA-22425',
      fullName: 'Mehwish Gul Pathan',
      fatherName: 'Gul Muhammad Pathan',
      cnic: '43102-2233445-6',
      phone: '+92 311 9900112',
      fatherPhone: '+92 311 1100998',
      email: 'mehwish.pathan@student.imaminstitute.edu.pk',
      bloodGroup: 'AB-',
      address: 'Dasti Muhalla, Jacobabad, Sindh',
      programId: progCNA.id,
      batchId: batchCNA.id,
      currentSemester: 2,
      cgpa: 3.52,
      attendancePercent: 89.5,
      clinicalAttendancePercent: 88.5,
      meritTier: 2.0,
      status: 'ACTIVE',
    },

    // Doctor of Physical Therapy (DPT)
    {
      rollNo: 'IINAHS-DPT-26-013',
      registrationNo: 'AHPC-DPT-11029',
      fullName: 'Asadullah Shaikh',
      fatherName: 'Farooq Ahmed Shaikh',
      cnic: '41302-3344556-7',
      phone: '+92 312 0011223',
      fatherPhone: '+92 312 0099887',
      email: 'asad.shaikh@student.imaminstitute.edu.pk',
      bloodGroup: 'O+',
      address: 'Latifabad Unit #7, Hyderabad, Sindh',
      programId: progDPT.id,
      batchId: batchDPT.id,
      currentSemester: 6,
      cgpa: 3.89,
      attendancePercent: 95.0,
      clinicalAttendancePercent: 94.0,
      meritTier: 1.0,
      status: 'ACTIVE',
    },
    {
      rollNo: 'IINAHS-DPT-26-014',
      registrationNo: 'AHPC-DPT-11035',
      fullName: 'Fariha Naz Baloch',
      fatherName: 'Sardar Khan Baloch',
      cnic: '41303-4455667-8',
      phone: '+92 313 1122334',
      fatherPhone: '+92 313 9988776',
      email: 'fariha.baloch@student.imaminstitute.edu.pk',
      bloodGroup: 'A+',
      address: 'Airport Road, Sukkur, Sindh',
      programId: progDPT.id,
      batchId: batchDPT.id,
      currentSemester: 6,
      cgpa: 3.48,
      attendancePercent: 86.8, // 85-87% Danger Zone
      clinicalAttendancePercent: 85.5,
      meritTier: 2.0,
      status: 'ACTIVE',
    },

    // BS Medical Laboratory Technology (BS-MLT)
    {
      rollNo: 'IINAHS-MLT-26-015',
      registrationNo: 'SMF-MLT-55102',
      fullName: 'Zeeshan Haider Abbasi',
      fatherName: 'Haider Bux Abbasi',
      cnic: '41302-5566778-9',
      phone: '+92 314 2233445',
      fatherPhone: '+92 314 8877665',
      email: 'zeeshan.abbasi@student.imaminstitute.edu.pk',
      bloodGroup: 'B+',
      address: 'Wapda Colony, Larkana, Sindh',
      programId: progMLT.id,
      batchId: batchMLT.id,
      currentSemester: 4,
      cgpa: 3.74,
      attendancePercent: 91.5,
      clinicalAttendancePercent: 90.0,
      meritTier: 1.0,
      status: 'ACTIVE',
    },
    {
      rollNo: 'IINAHS-MLT-26-016',
      registrationNo: 'SMF-MLT-55108',
      fullName: 'Bakhtawar Rehman',
      fatherName: 'Abdul Rehman Solangi',
      cnic: '41302-6677889-0',
      phone: '+92 315 3344556',
      fatherPhone: '+92 315 7766554',
      email: 'bakhtawar.rehman@student.imaminstitute.edu.pk',
      bloodGroup: 'O-',
      address: 'Civil Lines, Jacobabad, Sindh',
      programId: progMLT.id,
      batchId: batchMLT.id,
      currentSemester: 4,
      cgpa: 3.38,
      attendancePercent: 85.3, // 85-87% Danger Zone
      clinicalAttendancePercent: 84.8,
      meritTier: 2.0,
      status: 'ACTIVE',
    },

    // Additional BSN & Paramedical
    {
      rollNo: 'IINAHS-BSN-26-017',
      registrationNo: 'PNC-REG-88243',
      fullName: 'Mansoor Ahmed Chandio',
      fatherName: 'Ali Gohar Chandio',
      cnic: '43102-7788990-1',
      phone: '+92 316 4455667',
      fatherPhone: '+92 316 6655443',
      email: 'mansoor.chandio@student.imaminstitute.edu.pk',
      bloodGroup: 'A-',
      address: 'Garhi Khairo, Jacobabad, Sindh',
      programId: progBSN.id,
      batchId: batchBSN.id,
      currentSemester: 4,
      cgpa: 3.62,
      attendancePercent: 88.5,
      clinicalAttendancePercent: 87.5,
      meritTier: 1.0,
      status: 'ACTIVE',
    },
    {
      rollNo: 'IINAHS-BSN-26-018',
      registrationNo: 'PNC-REG-88247',
      fullName: 'Nimra Kashif Bhatti',
      fatherName: 'Kashif Mehmood Bhatti',
      cnic: '41302-8899001-2',
      phone: '+92 317 5566778',
      fatherPhone: '+92 317 5544332',
      email: 'nimra.bhatti@student.imaminstitute.edu.pk',
      bloodGroup: 'B+',
      address: 'Cantt Area, Hyderabad, Sindh',
      programId: progBSN.id,
      batchId: batchBSN.id,
      currentSemester: 4,
      cgpa: 3.96, // Top Merit Scholar
      attendancePercent: 97.5,
      clinicalAttendancePercent: 96.8,
      meritTier: 1.0,
      status: 'ACTIVE',
    },
  ];

  const createdStudents = [];
  for (const st of studentSeeds) {
    const s = await prisma.student.create({ data: st });
    createdStudents.push(s);
  }

  const studentAyesha = createdStudents[0];
  const studentFatima = createdStudents[1];
  const studentBilal = createdStudents[2];
  const studentNimra = createdStudents[17];

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

  // 6. Petty Cash Float
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
      studentId: studentAyesha.id,
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
      studentId: studentAyesha.id,
      amountPaid: 155000,
      paymentMethod: 'CASH_COUNTER',
      cashierId: 'usr-supp-accountant',
      cashierName: 'Accountant / Clerk',
      notes: 'Semester 4 full settlement collected at cashier counter',
    },
  });

  const challan2 = await prisma.feeChallan.create({
    data: {
      challanNo: 'CHL-2026-00402',
      studentId: studentFatima.id,
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
      studentId: studentFatima.id,
      amountPaid: 90000,
      paymentMethod: 'IBFT',
      transactionRef: 'HBL-FT-998822019',
      cashierId: 'usr-supp-accountant',
      cashierName: 'Accountant / Clerk',
      notes: '1st Installment collected via Online IBFT',
    },
  });

  // Overdue Defaulter (Bilal Ahmed Mahar)
  await prisma.feeChallan.create({
    data: {
      challanNo: 'CHL-2026-00403',
      studentId: studentBilal.id,
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

  // Merit Scholarship (Nimra Kashif Bhatti: 50% discount)
  await prisma.feeChallan.create({
    data: {
      challanNo: 'CHL-2026-00418',
      studentId: studentNimra.id,
      semester: 4,
      dueDate: new Date('2026-11-20'),
      totalAmount: 170000,
      lateFine: 0,
      discountAmount: 85000, // 50% Merit Tier 1 Discount
      netPayable: 85000,
      paidAmount: 85000,
      status: 'PAID',
      barcode: '9211004182026',
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
      remarks: 'Shift opened by Accountant / Clerk. All cash verified against physical safe.',
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
    { code: 'VITAL_MONITORING', title: 'Comprehensive Bedside NEWS2 Vital Signs Monitoring', category: 'Bedside Nursing', minRequired: 40 },
    { code: 'NEBULIZATION_THERAPY', title: 'Aerosol Nebulization & Peak Flow Assessment', category: 'Respiratory Care', minRequired: 15 },
  ];

  for (const c of competencies) {
    await prisma.competencyRequirement.create({ data: c });
  }

  // 11. Student Competency Log (Signed off by Zahid Abbasi, Lecturer with PIN: 9988)
  await prisma.studentCompetencyLog.create({
    data: {
      studentId: studentAyesha.id,
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

  // 12. Active Clinical Triage Patients (8+ Cases across ESI Levels 1 to 5)
  const triageSeedCases = [
    // Case 1: ESI Level 1 (Immediate Resuscitation)
    {
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
      pairedStudentId: studentAyesha.id,
      pairedStudentName: 'Ayesha Noor (BSN Sem 4)',
      requiredCompetency: 'ABG_SAMPLING',
      queueStatus: 'WAITING',
      waitTimeMinutes: 2,
      bedNumber: 'IMC-ER-BAY-01 (Resus)',
    },
    // Case 2: ESI Level 1 (Severe Anaphylactic Shock)
    {
      mrNumber: 'IMC-MR-2026-1044',
      patientName: 'Sikandar Ali Chandio',
      age: 45,
      gender: 'MALE',
      isPregnant: false,
      chiefComplaint: 'Sudden collapse, profound angioedema, stridor post-antibiotic IV injection at home',
      respRate: 36,
      spo2: 78.0,
      onOxygen: true,
      systolicBp: 70,
      diastolicBp: 40,
      heartRate: 142,
      temperature: 36.4,
      bloodSugar: 98.0,
      painScale: 2,
      avpuGcs: 'PAIN',
      news2Score: 14,
      news2Risk: 'HIGH',
      esiLevel: 1,
      redFlags: 'Anaphylactic Shock (BP 70/40), Severe Hypoxia (SpO2 78%), Airway Compromise',
      triageCategory: 'IMMEDIATE',
      triageNurseId: 'usr-teach-zahid',
      triageNurseName: 'Zahid Abbasi (Lecturer)',
      pairedStudentId: studentAyesha.id,
      pairedStudentName: 'Ayesha Noor (BSN Sem 4)',
      requiredCompetency: 'IV_CANNULATION',
      queueStatus: 'WAITING',
      waitTimeMinutes: 1,
      bedNumber: 'IMC-ER-BAY-02 (Resus)',
    },
    // Case 3: ESI Level 2 (Acute Coronary Syndrome)
    {
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
      news2Score: 7,
      news2Risk: 'HIGH',
      esiLevel: 2,
      redFlags: 'Suspected Acute Coronary Syndrome (ACS), High Pain Score (9/10)',
      triageCategory: 'VERY_URGENT',
      triageNurseId: 'usr-teach-zahid',
      triageNurseName: 'Zahid Abbasi (Lecturer)',
      pairedStudentId: studentFatima.id,
      pairedStudentName: 'Fatima Zehra (BSN Sem 4)',
      requiredCompetency: 'ECG_12_LEAD',
      queueStatus: 'WAITING',
      waitTimeMinutes: 6,
      bedNumber: 'IMC-ER-BAY-03 (Cardiac)',
    },
    // Case 4: ESI Level 2 (Severe Pre-Eclampsia in Maternal Patient)
    {
      mrNumber: 'IMC-MR-2026-1045',
      patientName: 'Nasreen Akhtar',
      age: 28,
      gender: 'FEMALE',
      isPregnant: true,
      chiefComplaint: '34 weeks gestation with blinding headache, blurred vision, epigastric pain & facial edema',
      respRate: 22,
      spo2: 96.0,
      onOxygen: false,
      systolicBp: 185,
      diastolicBp: 115,
      heartRate: 104,
      temperature: 37.1,
      bloodSugar: 112.0,
      painScale: 8,
      avpuGcs: 'ALERT',
      news2Score: 6,
      news2Risk: 'MEDIUM',
      esiLevel: 2,
      redFlags: 'Severe Gestational Hypertensive Crisis (BP 185/115), Threatening Eclampsia',
      triageCategory: 'VERY_URGENT',
      triageNurseId: 'usr-teach-zahid',
      triageNurseName: 'Zahid Abbasi (Lecturer)',
      pairedStudentId: studentFatima.id,
      pairedStudentName: 'Fatima Zehra (BSN Sem 4)',
      requiredCompetency: 'FOLEY_CATHETER',
      queueStatus: 'WAITING',
      waitTimeMinutes: 8,
      bedNumber: 'IMC-MATERNAL-HD01',
    },
    // Case 5: ESI Level 3 (Diabetic Ketoacidosis)
    {
      mrNumber: 'IMC-MR-2026-1046',
      patientName: 'Ghulam Shabbir Kalhoro',
      age: 50,
      gender: 'MALE',
      isPregnant: false,
      chiefComplaint: 'Persistent vomiting for 24h, deep Kussmaul respirations, fruity breath odor, lethargy',
      respRate: 26,
      spo2: 95.0,
      onOxygen: false,
      systolicBp: 105,
      diastolicBp: 65,
      heartRate: 110,
      temperature: 37.5,
      bloodSugar: 435.0,
      painScale: 6,
      avpuGcs: 'ALERT',
      news2Score: 6,
      news2Risk: 'MEDIUM',
      esiLevel: 3,
      redFlags: 'Severe Hyperglycemia (RBS 435 mg/dL), Kussmaul Breathing (RR 26)',
      triageCategory: 'URGENT',
      triageNurseId: 'usr-teach-mirmansab',
      triageNurseName: 'Mir Mansab (Lecturer)',
      pairedStudentId: studentAyesha.id,
      pairedStudentName: 'Ayesha Noor (BSN Sem 4)',
      requiredCompetency: 'IV_CANNULATION',
      queueStatus: 'WAITING',
      waitTimeMinutes: 14,
      bedNumber: 'IMC-ER-MED-04',
    },
    // Case 6: ESI Level 3 with Wait-Time Escalation (>35 mins)
    {
      mrNumber: 'IMC-MR-2026-1047',
      patientName: 'Zulfiqar Ali Mangi',
      age: 38,
      gender: 'MALE',
      isPregnant: false,
      chiefComplaint: 'Acute bronchial asthma exacerbation, tight chest, expiratory wheezing bilaterally',
      respRate: 24,
      spo2: 94.0,
      onOxygen: false,
      systolicBp: 130,
      diastolicBp: 85,
      heartRate: 98,
      temperature: 36.8,
      bloodSugar: 105.0,
      painScale: 5,
      avpuGcs: 'ALERT',
      news2Score: 4,
      news2Risk: 'LOW-MEDIUM',
      esiLevel: 3,
      redFlags: 'Prolonged Wait Alert: 38 Minutes Without Reassessment (Visual Escalation Active)',
      triageCategory: 'URGENT',
      triageNurseId: 'usr-teach-mirmansab',
      triageNurseName: 'Mir Mansab (Lecturer)',
      pairedStudentId: studentFatima.id,
      pairedStudentName: 'Fatima Zehra (BSN Sem 4)',
      requiredCompetency: 'NEBULIZATION_THERAPY',
      queueStatus: 'WAITING',
      waitTimeMinutes: 38, // >30m triggers escalation
      bedNumber: 'IMC-ER-MED-05',
    },
    // Case 7: ESI Level 4 (Minor Trauma / Procedure)
    {
      mrNumber: 'IMC-MR-2026-1048',
      patientName: 'Farhan Ali Soomro',
      age: 22,
      gender: 'MALE',
      isPregnant: false,
      chiefComplaint: 'Deep glass cut on right dorsal forearm at workshop, bleeding controlled by pressure bandage',
      respRate: 18,
      spo2: 99.0,
      onOxygen: false,
      systolicBp: 122,
      diastolicBp: 78,
      heartRate: 76,
      temperature: 36.7,
      bloodSugar: 95.0,
      painScale: 4,
      avpuGcs: 'ALERT',
      news2Score: 0,
      news2Risk: 'LOW',
      esiLevel: 4,
      redFlags: 'Requires Wound Irrigation, Suturing & Tetanus Toxoid Booster',
      triageCategory: 'STANDARD',
      triageNurseId: 'usr-teach-zahid',
      triageNurseName: 'Zahid Abbasi (Lecturer)',
      pairedStudentId: studentBilal.id,
      pairedStudentName: 'Bilal Ahmed Mahar (BSN Sem 4)',
      requiredCompetency: 'WOUND_CARE',
      queueStatus: 'WAITING',
      waitTimeMinutes: 18,
      bedNumber: 'IMC-TRAUMA-PROC-01',
    },
    // Case 8: ESI Level 4 (Pediatric Gastroenteritis)
    {
      mrNumber: 'IMC-MR-2026-1049',
      patientName: 'Baby Arsalan',
      age: 4,
      gender: 'MALE',
      isPregnant: false,
      chiefComplaint: 'Fever 38.8°C for 2 days with loose watery stools, mildly dry oral mucosa',
      respRate: 26,
      spo2: 98.0,
      onOxygen: false,
      systolicBp: 95,
      diastolicBp: 60,
      heartRate: 118,
      temperature: 38.8,
      bloodSugar: 88.0,
      painScale: 3,
      avpuGcs: 'ALERT',
      news2Score: 2,
      news2Risk: 'LOW',
      esiLevel: 4,
      redFlags: 'Pediatric Moderate Dehydration, Oral Rehydration Protocol Indicated',
      triageCategory: 'STANDARD',
      triageNurseId: 'usr-teach-mirmansab',
      triageNurseName: 'Mir Mansab (Lecturer)',
      pairedStudentId: studentAyesha.id,
      pairedStudentName: 'Ayesha Noor (BSN Sem 4)',
      requiredCompetency: 'VITAL_MONITORING',
      queueStatus: 'WAITING',
      waitTimeMinutes: 12,
      bedNumber: 'IMC-PEDS-03',
    },
    // Case 9: ESI Level 5 (Non-Urgent / OPD Fast-Track)
    {
      mrNumber: 'IMC-MR-2026-1050',
      patientName: 'Haji Muhammad Bux',
      age: 68,
      gender: 'MALE',
      isPregnant: false,
      chiefComplaint: 'Post-op Day 12 suture removal for excised dorsal sebaceous cyst, wound clean',
      respRate: 16,
      spo2: 98.0,
      onOxygen: false,
      systolicBp: 135,
      diastolicBp: 82,
      heartRate: 72,
      temperature: 36.6,
      bloodSugar: 128.0,
      painScale: 1,
      avpuGcs: 'ALERT',
      news2Score: 0,
      news2Risk: 'LOW',
      esiLevel: 5,
      redFlags: 'Routine OPD Dressing & Suture Removal Only',
      triageCategory: 'NON_URGENT',
      triageNurseId: 'usr-teach-zahid',
      triageNurseName: 'Zahid Abbasi (Lecturer)',
      pairedStudentId: studentFatima.id,
      pairedStudentName: 'Fatima Zehra (BSN Sem 4)',
      requiredCompetency: 'WOUND_CARE',
      queueStatus: 'WAITING',
      waitTimeMinutes: 22,
      bedNumber: 'IMC-OPD-FAST-02',
    },
  ];

  for (const tc of triageSeedCases) {
    await prisma.patientTriageCase.create({ data: tc });
  }

  // 13. Rich Trilingual Official Applications & Regulatory Letters (6 Documents)
  const officialDocuments = [
    {
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
      issuedAt: new Date(Date.now() - 3 * 86400000),
      qrVerificationUrl: 'https://imaminstitute.edu.pk/verify/doc/IINAHS-DOC-2026-0042',
    },
    {
      documentNo: 'IINAHS/DOC/2026/0043',
      title: 'Application for 2-Day Clinical Ward Sick Leave with Duty Make-Up',
      type: 'LEAVE_APPLICATION',
      applicantRole: 'STUDENT',
      applicantId: studentAyesha.id,
      applicantName: 'Ayesha Noor (BSN Sem 4)',
      contentEn: 'To: The Clinical Coordinator & Principal, Imam Institute of Nursing.\nSubject: Request for 2-Day Sick Leave from Emergency Ward Clinical Shift.\n\nRespected Sir,\nI am currently suffering from severe acute gastroenteritis. I respectfully request 2 days medical leave from my clinical rotation at Imam Medical Center. My current clinical attendance stands at 89.2%, and I will make up the missed ward hours during the upcoming weekend shift.',
      contentUr: 'بخدمت: کلینیکل کوآرڈینیٹر و پرنسپل، امام انسٹی ٹیوٹ آف نرسنگ۔\nموضوع: ایمرجنسی وارڈ ڈیوٹی سے دو روزہ طبی رخصت کی درخواست۔\n\nمحترم جناب،\nگزارش ہے کہ ناساز طبع اور شدید بخار کے باعث میں امام میڈیکل سینٹر میں وارڈ روٹیشن سے دو روز کے لیے حاضر ہونے سے قاصر ہوں۔ میری موجودہ کلینیکل حاضری 89.2 فیصد ہے۔ میں یہ ڈیوٹی آنے والے ویک اینڈ پر مکمل کر لوں گی۔',
      contentSd: 'خدمت ۾: ڪلينيڪل ڪوآرڊينيٽر ۽ پرنسپال، امام انسٽيٽيوٽ آف نرسنگ.\nموضوع: ايمرجنسي وارڊ ڊيوٽي مان ٻه ڏينهن طبي موڪل جي درخواست.\n\nمحترم سائين،\nگذارش آهي ته وائرل بخار سبب مان امام ميڊيڪل سينٽر ۾ ڪلينيڪل روٽيشن تي حاضر نه ٿي سگهنديس. منهنجي هاڻوڪي حاضري 89.2 سيڪڙو آهي. مان اهي ڪلاڪ ايندڙ هفتي ۾ پورا ڪنديس.',
      policyAlerts: 'Attendance Policy Safe: Projected attendance after leave is 85.7% (> 85% PNC threshold).',
      status: 'PENDING_HOD',
      qrVerificationUrl: 'https://imaminstitute.edu.pk/verify/doc/IINAHS-DOC-2026-0043',
    },
    {
      documentNo: 'IINAHS/DOC/2026/0044',
      title: 'Clinical Ward Night Shift Mutual Swap Agreement',
      type: 'SHIFT_SWAP',
      applicantRole: 'STUDENT',
      applicantId: studentFatima.id,
      applicantName: 'Fatima Zehra (BSN Sem 4)',
      contentEn: 'To: Vice Principal & Ward Rotation Supervisor, Imam Institute of Nursing.\nSubject: Mutual Clinical Shift Swap between ER and Pediatric Ward.\n\nRespected Sir,\nI have mutually agreed with student nurse Ayesha Noor to exchange my Sunday night shift (11:00 PM - 07:00 AM) in ER with her Monday morning shift in Pediatric Unit. Preceptor Zahid Abbasi has been notified.',
      contentUr: 'بخدمت: وائس پرنسپل و وارڈ سپروائزر، امام انسٹی ٹیوٹ آف نرسنگ۔\nموضوع: ایمرجنسی اور پیڈیاٹرک وارڈ کے درمیان نائٹ شفٹ کے باہمی تبادلے کی درخواست۔\n\nمحترم جناب،\nطالبہ فاطمہ زہرا اور عائشہ نور کے مابین اتوار کی رات کی ایمرجنسی شفٹ اور پیر کی صبح کی پیڈیاٹرک شفٹ کا باہمی تبادلہ طے پایا ہے۔ برائے مہربانی منظوری دی جائے۔',
      contentSd: 'خدمت ۾: وائيس پرنسپال ۽ وارڊ سپروائيزر، امام انسٽيٽيوٽ آف نرسنگ.\nموضوع: ايمرجنسي ۽ ٻارن جي وارڊ ۾ نائيٽ شفٽ جي باهمي مٽاسٽا جي درخواست.\n\nمحترم سائين،\nطالبه فاطمه زهرا ۽ عائشه نور پنهنجي آچر رات واري شفٽ جو سومر صبح سان باهمي تبادلو ڪن ٿيون. مهرباني ڪري مڃتا ڏني وڃي.',
      policyAlerts: 'Preceptor-to-Student Ratio verified within 1:8 standard in both units.',
      status: 'APPROVED',
      approvedBy: 'Vinod Kumar (Principal)',
      issuedAt: new Date(Date.now() - 1 * 86400000),
      qrVerificationUrl: 'https://imaminstitute.edu.pk/verify/doc/IINAHS-DOC-2026-0044',
    },
    {
      documentNo: 'IINAHS/DOC/2026/0045',
      title: 'Merit Scholarship & 50% Tuition Fee Concession Appeal',
      type: 'FEE_CONCESSION',
      applicantRole: 'STUDENT',
      applicantId: studentNimra.id,
      applicantName: 'Nimra Kashif Bhatti (BSN Sem 4)',
      contentEn: 'To: The Chairman & Board of Management, Imam Institute of Nursing.\nSubject: Merit Scholarship Award for Top Academic Standing in Generic BSN Semester 3 (CGPA 3.96).\n\nRespected Chairman,\nHaving secured 1st position across Sindh affiliation with a CGPA of 3.96 and 97.5% attendance, I respectfully apply for the Institute Merit Tier 1 Tuition Scholarship of 50% concession as per institutional policy.',
      contentUr: 'بخدمت: چیئرمین و بورڈ آف مینجمنٹ، امام انسٹی ٹیوٹ آف نرسنگ۔\nموضوع: بی ایس این سمسٹر 3 میں ٹاپ پوزیشن پر 50 فیصد میرٹ اسکالرشپ کی درخواست۔\n\nمحترم چیئرمین صاحب،\nسمسٹر 3 میں 3.96 سی جی پی اے اور 97.5 فیصد حاضری کے ساتھ پہلی پوزیشن حاصل کرنے پر ادارے کے ضوابط کے تحت 50 فیصد فیس رعایت کی درخواست ہے۔',
      contentSd: 'خدمت ۾: چيئرمين ۽ بورڊ آف مئنيجمينٽ، امام انسٽيٽيوٽ آف نرسنگ.\nموضوع: بي ايس اين ٽئين سمسٽر ۾ پهرين پوزيشن تي 50 سيڪڙو ميرٽ اسڪالرشپ جي اپيل.\n\nمحترم چيئرمين صاحب،\n3.96 سي جي پي اي ۽ 97.5 سيڪڙو حاضريءَ سان ٽاپ پوزيشن تي هجڻ سبب اداري جي پاليسي مطابق 50 سيڪڙو فيس معافي جي درخواست آهي.',
      policyAlerts: 'Merit Tier 1 Verified: CGPA 3.96 qualifies for 50% tuition reduction.',
      status: 'PENDING_PRINCIPAL',
      qrVerificationUrl: 'https://imaminstitute.edu.pk/verify/doc/IINAHS-DOC-2026-0045',
    },
    {
      documentNo: 'IINAHS/DOC/2026/0046',
      title: 'Teaching Hospital Clinical Rotation Deployment Order (Batch 2024)',
      type: 'APPOINTMENT_LETTER',
      applicantRole: 'PRINCIPAL',
      applicantId: 'usr-teach-vinod',
      applicantName: 'Vinod Kumar (Principal)',
      contentEn: 'OFFICIAL ORDER:\nThe students of Generic BSN Batch 2024 (Semester 4) are hereby deployed to Imam Medical Center for mandatory clinical ward rotations across ER, CCU, Labor Ward, and General Surgery under Preceptors Zahid Abbasi and Mir Mansab starting November 01, 2026.',
      contentUr: 'حکم نامہ:\nبی ایس این بیچ 2024 (سمسٹر 4) کے تمام طلبا کو یکم نومبر 2026 سے امام میڈیکل سینٹر کے آئی سی یو، سی سی یو، لیبر روم اور ایمرجنسی وارڈز میں کلینیکل ٹریننگ کے لیے پریسیپٹر زاہد عباسی کی نگرانی میں تعینات کیا جاتا ہے۔',
      contentSd: 'سرڪاري حڪم نامو:\nبي ايس اين بئچ 2024 (سمسٽر 4) جي سمورن شاگردن کي پهرين نومبر 2026 کان امام ميڊيڪل سينٽر جي ايمرجنسي، سي سي يو ۽ آپريشن ٿيٽر ۾ ڪلينيڪل ڊيوٽي لاءِ زاهد عباسي ۽ مير منصب جي نگراني ۾ مقرر ڪجي ٿو.',
      policyAlerts: 'Teaching Hospital Affiliation Bed Ratio: 1:3 compliant under PNC criteria.',
      status: 'ISSUED',
      approvedBy: 'Vinod Kumar (Principal)',
      issuedAt: new Date(),
      qrVerificationUrl: 'https://imaminstitute.edu.pk/verify/doc/IINAHS-DOC-2026-0046',
    },
    {
      documentNo: 'IINAHS/DOC/2026/0047',
      title: 'Attendance Show-Cause & Final Warning Notice (PNC 85% Rule)',
      type: 'SHOW_CAUSE',
      applicantRole: 'VICE_PRINCIPAL',
      applicantId: 'usr-teach-alinawaz',
      applicantName: 'Ali Nawaz (Vice Principal)',
      contentEn: 'To: Student Bilal Ahmed Mahar (Roll No: BSN-2024-012).\nSubject: Show-Cause Notice for Clinical Attendance Deficit (81.5%).\n\nYou are hereby notified that your current clinical ward attendance has fallen to 81.5%, which is below the mandatory 85% requirement stipulated by the Pakistan Nursing & Midwifery Council. You are required to submit an explanation and complete 6 remedial weekend shifts before the final semester examination roll number slip issuance.',
      contentUr: 'بنام: طالب علم بلال احمد مہر (رول نمبر: BSN-2024-012)۔\nموضوع: کلینیکل حاضری میں 81.5 فیصد کمی پر شوکاز نوٹس۔\n\nآپ کو مطلع کیا جاتا ہے کہ آپ کی کلینیکل حاضری پی این سی کے لازمی 85 فیصد معیار سے کم ہو کر 81.5 فیصد رہ گئی ہے۔ اگر آپ نے آئندہ 15 روز میں اضافی شفٹوں کے ذریعے کمی پوری نہ کی تو امتحانی سلپ روک لی جائے گی۔',
      contentSd: 'ڏانهن: شاگرد بلال احمد مهر (رول نمبر: BSN-2024-012).\nموضوع: ڪلينيڪل حاضري 81.5 سيڪڙو تي پهچڻ تي شوڪاز نوٽيس.\n\nتوهان کي خبردار ڪجي ٿو ته توهان جي حاضري پي اين سي جي 85 سيڪڙو لازمي قانون کان گهٽجي وئي آهي. فوري طور تي اڳيان 6 وڌيڪ وارڊ شِفٽون مڪمل ڪريو نه ته امتحان ۾ ويهڻ نه ڏنو ويندو.',
      policyAlerts: 'Attendance Deficit: Student currently barred from Final Examination Slip unlock.',
      status: 'ISSUED',
      approvedBy: 'Ali Nawaz (Vice Principal)',
      issuedAt: new Date(Date.now() - 2 * 86400000),
      qrVerificationUrl: 'https://imaminstitute.edu.pk/verify/doc/IINAHS-DOC-2026-0047',
    },
  ];

  for (const doc of officialDocuments) {
    await prisma.applicationDocument.create({ data: doc });
  }

  console.log(`Database successfully seeded with 18+ students, 8+ ESI triage cases, 6 trilingual documents, and full official staff roster!`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
