export type UserRole =
  // Core Management & Leadership
  | 'CHAIRMAN'
  | 'OWNER' // Alias for CHAIRMAN
  | 'EXECUTIVE_MGMT'
  | 'PRINCIPAL'
  | 'VICE_PRINCIPAL'
  | 'REGISTRAR'
  | 'DEPT_HEAD'
  // Academic & Examination
  | 'EXAM_CONTROLLER'
  | 'FACULTY'
  | 'CLINICAL_INSTRUCTOR'
  | 'CLINICAL_PRECEPTOR'
  | 'LIBRARY_OFFICER'
  // Finance & Accounts
  | 'ACCOUNTANT'
  | 'CASHIER'
  // Operations, HR & Stores
  | 'HR_MANAGER'
  | 'HR_OFFICER'
  | 'ADMISSION_OFFICER'
  | 'STOREKEEPER'
  | 'IT_ADMIN'
  | 'ADMIN' // Alias for Campus Admin
  | 'SUPPORT'
  // Students & Audit
  | 'STUDENT'
  | 'AUDITOR';

export type UserCategory =
  | 'Management'
  | 'Teaching Staff'
  | 'Support Staff'
  | 'Student'
  | 'External / Regulatory';

export interface SystemUser {
  id: string;
  userId: string;
  fullName: string;
  designation: string;
  category: UserCategory;
  role: UserRole;
  email: string;
  phone: string;
  cnic: string;
  department: string;
  pinCode?: string;
  qualification?: string;
  pncLicenseNo?: string;
}

export interface RoleConfig {
  label: string;
  badge: string;
  badgeColor: string;
  allowedTabs: string[];
  defaultTab: string;
  canApproveVouchers: boolean;
  canCollectFees: boolean;
  canRecordExpenses: boolean;
  canSignOffLogbooks: boolean;
  canTriagePatients: boolean;
  canDraftOfficialLetters: boolean;
  canViewFinancialPL: boolean;
  canPostLedger: boolean;
  canReverseVouchers: boolean;
  canGradeExams: boolean;
  canManageInventory: boolean;
  description: string;
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  CHAIRMAN: {
    label: 'Chairman & Managing Director',
    badge: 'Executive Board',
    badgeColor: 'bg-amber-500 text-slate-950',
    allowedTabs: ['owner', 'academics', 'finance', 'fees', 'expenses', 'inventory', 'clinical', 'triage', 'hr', 'drafting', 'student', 'audit', 'settings', 'profile'],
    defaultTab: 'owner',
    canApproveVouchers: true,
    canCollectFees: true,
    canRecordExpenses: true,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: true,
    canPostLedger: true,
    canReverseVouchers: true,
    canGradeExams: true,
    canManageInventory: true,
    description: 'Supreme executive authority: financial approvals, general ledger sign-off, capital investments, strategic compliance, and institutional governance.',
  },
  OWNER: {
    label: 'Management / Executive Owner',
    badge: 'Executive Board',
    badgeColor: 'bg-amber-500 text-slate-950',
    allowedTabs: ['owner', 'academics', 'finance', 'fees', 'expenses', 'inventory', 'clinical', 'triage', 'hr', 'drafting', 'student', 'audit', 'settings', 'profile'],
    defaultTab: 'owner',
    canApproveVouchers: true,
    canCollectFees: true,
    canRecordExpenses: true,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: true,
    canPostLedger: true,
    canReverseVouchers: true,
    canGradeExams: true,
    canManageInventory: true,
    description: 'Unrestricted executive oversight: P&L financial pulse, high-value voucher approvals, cash vault reconciliation, and institutional governance.',
  },
  EXECUTIVE_MGMT: {
    label: 'Executive Director / Management Board',
    badge: 'Executive Management',
    badgeColor: 'bg-amber-600 text-white',
    allowedTabs: ['owner', 'academics', 'finance', 'fees', 'expenses', 'clinical', 'hr', 'drafting', 'audit', 'profile'],
    defaultTab: 'owner',
    canApproveVouchers: true,
    canCollectFees: false,
    canRecordExpenses: true,
    canSignOffLogbooks: false,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: true,
    canPostLedger: true,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'High-level institutional administration, capital budgeting, hospital affiliation governance, and strategic management.',
  },
  PRINCIPAL: {
    label: 'Principal & Academic Dean',
    badge: 'Academic Leadership',
    badgeColor: 'bg-sky-600 text-white',
    allowedTabs: ['drafting', 'academics', 'clinical', 'triage', 'student', 'hr', 'fees', 'expenses', 'inventory', 'audit', 'profile'],
    defaultTab: 'academics',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: true,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: true,
    canManageInventory: false,
    description: 'Academic administration, official correspondence seal & issuance, PNC regulatory compliance, clinical logbook oversight, and faculty supervision.',
  },
  VICE_PRINCIPAL: {
    label: 'Vice Principal & Academic Coordinator',
    badge: 'Academic Management',
    badgeColor: 'bg-indigo-600 text-white',
    allowedTabs: ['academics', 'clinical', 'triage', 'student', 'hr', 'drafting', 'profile'],
    defaultTab: 'academics',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: true,
    canManageInventory: false,
    description: 'Curriculum delivery, timetable management, clinical rotation oversight, preceptor coordination, and examination moderation.',
  },
  REGISTRAR: {
    label: 'Registrar',
    badge: 'Registrar Office',
    badgeColor: 'bg-purple-700 text-white',
    allowedTabs: ['academics', 'student', 'drafting', 'audit', 'profile'],
    defaultTab: 'academics',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Official student enrollment records, registration numbers, degree verification, migration certificates, and statutory correspondence.',
  },
  ADMISSION_OFFICER: {
    label: 'Admission Officer',
    badge: 'Admissions Desk',
    badgeColor: 'bg-emerald-700 text-white',
    allowedTabs: ['student', 'fees', 'drafting', 'profile'],
    defaultTab: 'student',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Processing online/manual admissions, merit calculations, document verification, interview scheduling, and enrollment registration.',
  },
  EXAM_CONTROLLER: {
    label: 'Controller of Examinations',
    badge: 'Exams Directorate',
    badgeColor: 'bg-red-700 text-white',
    allowedTabs: ['academics', 'student', 'drafting', 'audit', 'profile'],
    defaultTab: 'academics',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: true,
    canManageInventory: false,
    description: 'Examination scheduling, theory & practical marks verification, grade sheet approval, GPA calculation, and transcript issuance.',
  },
  ACCOUNTANT: {
    label: 'Chief Accountant & Financial Controller',
    badge: 'Finance Directorate',
    badgeColor: 'bg-emerald-800 text-white',
    allowedTabs: ['finance', 'fees', 'expenses', 'inventory', 'hr', 'audit', 'profile'],
    defaultTab: 'finance',
    canApproveVouchers: true,
    canCollectFees: true,
    canRecordExpenses: true,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: true,
    canViewFinancialPL: true,
    canPostLedger: true,
    canReverseVouchers: true,
    canGradeExams: false,
    canManageInventory: true,
    description: 'Double-entry general ledger, chart of accounts, bank reconciliation, trial balance, financial statements, and voucher posting/reversal.',
  },
  CASHIER: {
    label: 'Accounts Clerk & Fee Cashier',
    badge: 'Cashier Desk',
    badgeColor: 'bg-emerald-600 text-white',
    allowedTabs: ['fees', 'expenses', 'profile'],
    defaultTab: 'fees',
    canApproveVouchers: false,
    canCollectFees: true,
    canRecordExpenses: true,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: false,
    canViewFinancialPL: false,
    canPostLedger: true,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Fast-cashier fee collection desk, 3-copy bank challans, instant thermal receipts, shift closing cash register, defaulter recovery radar, and petty cash float.',
  },
  HR_MANAGER: {
    label: 'Human Resources Manager',
    badge: 'HR Directorate',
    badgeColor: 'bg-blue-800 text-white',
    allowedTabs: ['hr', 'drafting', 'audit', 'profile'],
    defaultTab: 'hr',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: true,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Employee master files, recruitment, monthly payroll preparation, staff leave management, and PNC license renewals.',
  },
  HR_OFFICER: {
    label: 'HR & Attendance Officer',
    badge: 'HR Desk',
    badgeColor: 'bg-blue-700 text-white',
    allowedTabs: ['hr', 'profile'],
    defaultTab: 'hr',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: false,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Daily biometric attendance logging, leave application preliminary processing, and staff duty rosters.',
  },
  DEPT_HEAD: {
    label: 'Academic Department Head (HOD)',
    badge: 'Department Head',
    badgeColor: 'bg-indigo-700 text-white',
    allowedTabs: ['academics', 'clinical', 'student', 'drafting', 'profile'],
    defaultTab: 'academics',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: true,
    canManageInventory: false,
    description: 'Departmental faculty workload management, clinical rotation schedules, subject curriculum, and student performance oversight.',
  },
  FACULTY: {
    label: 'Teaching Faculty / Senior Lecturer',
    badge: 'Teaching Faculty',
    badgeColor: 'bg-blue-600 text-white',
    allowedTabs: ['academics', 'clinical', 'triage', 'student', 'drafting', 'profile'],
    defaultTab: 'academics',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: true,
    canManageInventory: false,
    description: 'Curriculum delivery, theory & lab classes, student attendance, clinical supervision, and exam marks grading.',
  },
  CLINICAL_INSTRUCTOR: {
    label: 'Clinical Nursing Instructor',
    badge: 'Clinical Training',
    badgeColor: 'bg-teal-700 text-white',
    allowedTabs: ['clinical', 'triage', 'student', 'profile'],
    defaultTab: 'clinical',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: false,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Hospital bedside clinical instruction at Imam Medical Center, skills demonstration, procedure verification, and student evaluations.',
  },
  CLINICAL_PRECEPTOR: {
    label: 'Hospital Clinical Preceptor',
    badge: 'Hospital Preceptor',
    badgeColor: 'bg-rose-700 text-white',
    allowedTabs: ['clinical', 'triage', 'student', 'profile'],
    defaultTab: 'clinical',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: false,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Direct clinical ward supervision, emergency intake procedure verification (PIN sign-off), and clinical safety compliance.',
  },
  LIBRARY_OFFICER: {
    label: 'Library & Learning Resource Officer',
    badge: 'Library Services',
    badgeColor: 'bg-amber-700 text-white',
    allowedTabs: ['academics', 'profile'],
    defaultTab: 'academics',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: false,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Medical textbook cataloging, digital e-library subscriptions, student book borrowing, and research resources.',
  },
  STOREKEEPER: {
    label: 'Storekeeper & Inventory Manager',
    badge: 'Central Stores',
    badgeColor: 'bg-zinc-700 text-white',
    allowedTabs: ['inventory', 'expenses', 'profile'],
    defaultTab: 'inventory',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: true,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: false,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: true,
    description: 'Medical/lab consumable receipts (GRN), store issues to hospital/lab, minimum stock reorder tracking, and physical inventory audits.',
  },
  IT_ADMIN: {
    label: 'IT Administrator & Systems Engineer',
    badge: 'Systems IT',
    badgeColor: 'bg-slate-900 text-white',
    allowedTabs: ['settings', 'audit', 'profile'],
    defaultTab: 'settings',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: false,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'System configurations, user account credentials, database backups, audit trail inspection, and network security.',
  },
  ADMIN: {
    label: 'General Campus Administrator',
    badge: 'Campus Admin',
    badgeColor: 'bg-slate-700 text-white',
    allowedTabs: ['expenses', 'inventory', 'hr', 'drafting', 'profile'],
    defaultTab: 'expenses',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: true,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: true,
    description: 'Campus facilities maintenance, general procurement requests, logistics, and campus operational support.',
  },
  SUPPORT: {
    label: 'Campus Support Staff',
    badge: 'Support Staff',
    badgeColor: 'bg-zinc-600 text-white',
    allowedTabs: ['support', 'profile'],
    defaultTab: 'support',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: false,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Campus logistics, hospital dispatch duties, personal attendance logs, and itemized monthly salary slip access.',
  },
  STUDENT: {
    label: 'Student Nurse / Scholar',
    badge: 'Nursing Scholar',
    badgeColor: 'bg-teal-600 text-white',
    allowedTabs: ['student', 'academics', 'fees', 'drafting', 'profile'],
    defaultTab: 'student',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Student portal, class timetable, semester exam results, PNC clinical attendance guardrail, digital logbook, fee challans, and digital ID card.',
  },
  AUDITOR: {
    label: 'External Regulatory Auditor / Inspector',
    badge: 'Regulatory Audit',
    badgeColor: 'bg-rose-900 text-white',
    allowedTabs: ['audit', 'academics', 'clinical', 'finance', 'profile'],
    defaultTab: 'audit',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: false,
    canViewFinancialPL: true,
    canPostLedger: false,
    canReverseVouchers: false,
    canGradeExams: false,
    canManageInventory: false,
    description: 'Read-only regulatory compliance inspection for Pakistan Nursing & Midwifery Council (PNC) and Sindh Medical Faculty (SMF).',
  },
};

export function hasTabAccess(role: UserRole, tabId: string): boolean {
  const config = ROLE_CONFIGS[role];
  if (!config) return false;
  return config.allowedTabs.includes(tabId);
}
