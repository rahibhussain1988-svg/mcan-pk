export type UserRole =
  | 'OWNER'
  | 'PRINCIPAL'
  | 'VICE_PRINCIPAL'
  | 'FACULTY'
  | 'ADMIN'
  | 'CASHIER'
  | 'SUPPORT'
  | 'STUDENT';

export type UserCategory = 'Management' | 'Teaching Staff' | 'Support Staff' | 'Student';

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
  description: string;
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  OWNER: {
    label: 'Management / Executive Owner',
    badge: 'Executive Board',
    badgeColor: 'bg-amber-500 text-slate-950',
    allowedTabs: ['owner', 'fees', 'expenses', 'triage', 'drafting', 'hr', 'student', 'profile'],
    defaultTab: 'owner',
    canApproveVouchers: true,
    canCollectFees: true,
    canRecordExpenses: true,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: true,
    description: 'Unrestricted executive oversight: P&L financial pulse, high-value voucher approvals, cash vault reconciliation, and institutional governance.',
  },
  PRINCIPAL: {
    label: 'Principal & Dean',
    badge: 'Academic Leadership',
    badgeColor: 'bg-sky-600 text-white',
    allowedTabs: ['drafting', 'triage', 'student', 'hr', 'fees', 'expenses', 'profile'],
    defaultTab: 'drafting',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: true,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    description: 'Academic administration, official correspondence seal & issuance, PNC regulatory compliance, clinical logbook oversight, and faculty supervision.',
  },
  VICE_PRINCIPAL: {
    label: 'Vice Principal (VP)',
    badge: 'Academic Management',
    badgeColor: 'bg-indigo-600 text-white',
    allowedTabs: ['drafting', 'triage', 'student', 'hr', 'fees', 'profile'],
    defaultTab: 'drafting',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    description: 'Curriculum coordination, hospital clinical ward rotations, preceptor verification, and student academic discipline.',
  },
  FACULTY: {
    label: 'Teaching Faculty / Lecturer',
    badge: 'Clinical Teaching',
    badgeColor: 'bg-blue-600 text-white',
    allowedTabs: ['triage', 'student', 'drafting', 'profile'],
    defaultTab: 'triage',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: true,
    canTriagePatients: true,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    description: 'Emergency bedside patient triage (NEWS2/ESI), supervised student nurse clinical pairing, PNC competency logbook PIN sign-off, and AI OSPE/viva coach.',
  },
  ADMIN: {
    label: 'General Campus Admin',
    badge: 'Campus Admin',
    badgeColor: 'bg-slate-700 text-white',
    allowedTabs: ['expenses', 'drafting', 'hr', 'profile'],
    defaultTab: 'expenses',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: true,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    description: 'Campus operations, vendor expense vouchers recording (CPV-2026-XXXX), facilities maintenance, logistic supplies, and staff attendance.',
  },
  CASHIER: {
    label: 'Accountant / Accounts Clerk',
    badge: 'Finance Desk',
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
    description: 'Fast-cashier fee collection desk, 3-copy bank challans, instant thermal receipts, shift closing cash register, defaulter recovery radar, and petty cash float.',
  },
  SUPPORT: {
    label: 'Support Staff / Peon',
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
    description: 'Campus logistics, hospital dispatch duties, personal attendance logs, and itemized monthly salary slip access.',
  },
  STUDENT: {
    label: 'Student Nurse',
    badge: 'Nursing Scholar',
    badgeColor: 'bg-teal-600 text-white',
    allowedTabs: ['student', 'fees', 'drafting', 'profile'],
    defaultTab: 'student',
    canApproveVouchers: false,
    canCollectFees: false,
    canRecordExpenses: false,
    canSignOffLogbooks: false,
    canTriagePatients: false,
    canDraftOfficialLetters: true,
    canViewFinancialPL: false,
    description: 'Student portal, interactive 85% PNC clinical attendance guardrail simulator, bedside competency logbook, AI viva practice coach, and digital QR ID card.',
  },
};

export function hasTabAccess(role: UserRole, tabId: string): boolean {
  const config = ROLE_CONFIGS[role];
  if (!config) return false;
  return config.allowedTabs.includes(tabId);
}
