'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Header } from '@/components/navigation/Header';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { CommandPalette } from '@/components/navigation/CommandPalette';
import { ImamAICopilotDrawer } from '@/components/navigation/ImamAICopilotDrawer';
import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt';

import { OwnerDashboardView } from '@/components/modules/OwnerDashboardView';
import { FeesCashierView } from '@/components/modules/FeesCashierView';
import { ExpensesView } from '@/components/modules/ExpensesView';
import { ClinicalTriageView } from '@/components/modules/ClinicalTriageView';
import { StudentPortalView } from '@/components/modules/StudentPortalView';
import { DraftingStudioView } from '@/components/modules/DraftingStudioView';
import { HRPayrollView } from '@/components/modules/HRPayrollView';
import { ProfileView } from '@/components/modules/ProfileView';
import { SupportStaffView } from '@/components/modules/SupportStaffView';

import { UserRole, ROLE_CONFIGS, hasTabAccess } from '@/lib/rbac';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface AppShellProps {
  initialTab?: string;
  initialRole?: string;
  initialData: {
    ownerMetrics: any;
    categories: any[];
    vouchers: any[];
    pettyCashBalance: number;
    challans: any[];
    cashierShift: any;
    triageCases: any[];
    students: any[];
    staffList: any[];
    monthlyPayrollTotal: number;
    documents: any[];
    allUsers: Array<{
      id: string;
      userId: string;
      fullName: string;
      designation: string;
      category: string;
      role: string;
      email: string;
      phone: string;
      cnic: string;
      department?: string | null;
      emergencyContact?: string | null;
      address?: string | null;
      bloodGroup?: string | null;
      language: string;
      tableDensity: string;
      notificationsEnabled: boolean;
      pinCode: string;
    }>;
  };
}

export const AppShell: React.FC<AppShellProps> = ({ initialData, initialTab, initialRole }) => {
  // If initialRole is passed, select a matching user
  const matchingUser = initialRole
    ? initialData.allUsers.find(
        (u) =>
          u.role.toLowerCase() === initialRole.toLowerCase() ||
          (initialRole.toLowerCase() === 'triage' && u.role === 'FACULTY') ||
          (initialRole.toLowerCase() === 'accounts' && u.role === 'CASHIER')
      )
    : null;

  const [currentUserId, setCurrentUserId] = useState<string>(
    matchingUser?.userId || initialData.allUsers[0]?.userId || 'usr-mgmt-abid'
  );

  const activeUser =
    initialData.allUsers.find((u) => u.userId === currentUserId) || initialData.allUsers[0];

  const currentRole: UserRole = (activeUser?.role as UserRole) || 'OWNER';
  const roleConfig = ROLE_CONFIGS[currentRole] || ROLE_CONFIGS.OWNER;

  const [activeTab, setActiveTab] = useState<string>(
    initialTab || (initialRole === 'triage' ? 'triage' : roleConfig.defaultTab)
  );
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [globalLang, setGlobalLang] = useState<'en' | 'ur' | 'sd'>('en');

  // Keyboard shortcut listener for Ctrl+I (Imam Copilot)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setIsCopilotOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Switch institutional user
  const handleSwitchUser = (userId: string) => {
    const targetUser = initialData.allUsers.find((u) => u.userId === userId);
    if (!targetUser) return;

    setCurrentUserId(userId);
    const targetRole: UserRole = (targetUser.role as UserRole) || 'OWNER';
    const targetConfig = ROLE_CONFIGS[targetRole] || ROLE_CONFIGS.OWNER;

    // If current tab is not allowed in new role, jump to default tab
    if (!hasTabAccess(targetRole, activeTab)) {
      setActiveTab(targetConfig.defaultTab);
    }
  };

  const sampleStudent = initialData.students[0];
  const isAuthorized = hasTabAccess(currentRole, activeTab);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Navy Sidebar with RBAC Filtering */}
      <Sidebar
        currentRole={currentRole}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        pendingApprovalsCount={initialData.ownerMetrics.pendingApprovals.length}
        expiringLicensesCount={1}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky App Header with Institutional Personnel Switcher */}
        <Header
          currentUserId={currentUserId}
          currentRole={currentRole}
          allUsers={initialData.allUsers}
          onSwitchUser={handleSwitchUser}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onSelectTab={setActiveTab}
          onOpenCopilot={() => setIsCopilotOpen(true)}
          currentLang={globalLang}
          onSelectLang={setGlobalLang}
        />

        {/* Scrollable Main Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* If tab is not authorized for current role, render Access Restricted banner */}
            {!isAuthorized ? (
              <div className="bg-white rounded-2xl border border-rose-200 p-8 shadow-sm text-center max-w-lg mx-auto my-12">
                <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ShieldAlert size={26} />
                </div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Role-Based Access Restricted
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  The requested module is restricted under your active institutional role:
                  <strong className="block text-slate-800 mt-1 font-mono">
                    {activeUser.fullName} ({activeUser.designation} — {roleConfig.label})
                  </strong>
                </p>
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-left">
                  <strong className="text-slate-700 block mb-1">Your Authorized Permissions:</strong>
                  <span>{roleConfig.description}</span>
                </div>
                <button
                  onClick={() => setActiveTab(roleConfig.defaultTab)}
                  className="mt-5 bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold py-2.5 px-5 rounded-xl transition inline-flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Return to Your Authorized Dashboard
                </button>
              </div>
            ) : (
              <>
                {activeTab === 'owner' && (
                  <OwnerDashboardView initialData={initialData.ownerMetrics} />
                )}

                {activeTab === 'fees' && (
                  <FeesCashierView
                    challans={initialData.challans}
                    cashierShift={initialData.cashierShift}
                  />
                )}

                {activeTab === 'expenses' && (
                  <ExpensesView
                    categories={initialData.categories}
                    vouchers={initialData.vouchers}
                    pettyCashBalance={initialData.pettyCashBalance}
                  />
                )}

                {activeTab === 'triage' && (
                  <ClinicalTriageView
                    initialCases={initialData.triageCases}
                    students={initialData.students}
                  />
                )}

                {activeTab === 'student' && sampleStudent && (
                  <StudentPortalView student={sampleStudent} />
                )}

                {activeTab === 'drafting' && sampleStudent && (
                  <DraftingStudioView
                    documents={initialData.documents}
                    activeStudent={sampleStudent}
                  />
                )}

                {activeTab === 'hr' && (
                  <HRPayrollView
                    staffList={initialData.staffList}
                    monthlyPayrollTotal={initialData.monthlyPayrollTotal}
                  />
                )}

                {activeTab === 'support' && (
                  <SupportStaffView user={activeUser} />
                )}

                {activeTab === 'profile' && (
                  <ProfileView
                    currentProfile={activeUser}
                    sampleStudent={sampleStudent}
                    onRoleSwitch={(newRole) => {
                      // Find first user with that role
                      const matchedUser = initialData.allUsers.find((u) => u.role === newRole);
                      if (matchedUser) handleSwitchUser(matchedUser.userId);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </main>

        {/* Role-Aware Mobile Bottom Nav */}
        <MobileBottomNav
          currentRole={currentRole}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          pendingApprovalsCount={initialData.ownerMetrics.pendingApprovals.length}
        />

        {/* Quick Command Palette (Ctrl+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onSelectTab={setActiveTab}
        />

        {/* Slide-Over Imam AI Copilot Drawer (Ctrl+I) */}
        <ImamAICopilotDrawer
          isOpen={isCopilotOpen}
          onClose={() => setIsCopilotOpen(false)}
          currentLang={globalLang}
        />

        {/* PWA Mobile Slide-Up Install Sheet */}
        <PWAInstallPrompt />
      </div>
    </div>
  );
};
