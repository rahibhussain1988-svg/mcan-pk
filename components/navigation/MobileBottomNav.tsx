'use client';

import React from 'react';
import {
  LayoutDashboard,
  Banknote,
  Receipt,
  FileCheck2,
  User,
  HeartPulse,
  Calendar,
  Stethoscope,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { UserRole } from '@/lib/rbac';

interface MobileBottomNavProps {
  currentRole: UserRole;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  pendingApprovalsCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRole,
  activeTab,
  onSelectTab,
  pendingApprovalsCount = 0,
}) => {
  // Role-aware 5-tab configuration
  let tabs = [
    { id: 'owner', label: 'Overview', icon: LayoutDashboard },
    { id: 'fees', label: 'Fees', icon: Banknote },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'approvals', label: 'Approvals', icon: FileCheck2, badge: pendingApprovalsCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (currentRole === 'PRINCIPAL' || currentRole === 'VICE_PRINCIPAL') {
    tabs = [
      { id: 'drafting', label: 'Drafting', icon: FileCheck2 },
      { id: 'triage', label: 'Triage', icon: HeartPulse },
      { id: 'student', label: 'Students', icon: Stethoscope },
      { id: 'hr', label: 'Faculty', icon: Users },
      { id: 'profile', label: 'Profile', icon: User },
    ];
  } else if (currentRole === 'FACULTY') {
    tabs = [
      { id: 'triage', label: 'Triage', icon: HeartPulse },
      { id: 'student', label: 'Logbook', icon: Stethoscope },
      { id: 'drafting', label: 'Drafting', icon: FileCheck2 },
      { id: 'hr', label: 'Roster', icon: Calendar },
      { id: 'profile', label: 'Profile', icon: User },
    ];
  } else if (currentRole === 'ADMIN') {
    tabs = [
      { id: 'expenses', label: 'Expenses', icon: Receipt },
      { id: 'drafting', label: 'Registry', icon: FileCheck2 },
      { id: 'hr', label: 'Staff', icon: Users },
      { id: 'fees', label: 'Accounts', icon: Banknote },
      { id: 'profile', label: 'Profile', icon: User },
    ];
  } else if (currentRole === 'CASHIER') {
    tabs = [
      { id: 'fees', label: 'Collect Fee', icon: Banknote },
      { id: 'expenses', label: 'Expenses', icon: Receipt },
      { id: 'owner', label: 'Register', icon: LayoutDashboard },
      { id: 'drafting', label: 'Challans', icon: FileCheck2 },
      { id: 'profile', label: 'Profile', icon: User },
    ];
  } else if (currentRole === 'SUPPORT') {
    tabs = [
      { id: 'support', label: 'Duties', icon: Calendar },
      { id: 'profile', label: 'Attendance', icon: ShieldCheck },
      { id: 'support', label: 'Salary Slip', icon: Banknote },
      { id: 'profile', label: 'ID Pass', icon: User },
      { id: 'profile', label: 'Profile', icon: User },
    ];
  } else if (currentRole === 'STUDENT') {
    tabs = [
      { id: 'student', label: 'Home', icon: LayoutDashboard },
      { id: 'attendance', label: 'Attendance', icon: ShieldCheck },
      { id: 'logbook', label: 'Logbook', icon: Stethoscope },
      { id: 'fees', label: 'Fees', icon: Banknote },
      { id: 'profile', label: 'Profile', icon: User },
    ];
  }

  return (
    <nav
      data-testid="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive =
            activeTab === tab.id ||
            (tab.id === 'approvals' && activeTab === 'owner') ||
            (tab.id === 'attendance' && activeTab === 'student') ||
            (tab.id === 'logbook' && activeTab === 'student');

          return (
            <button
              key={`${tab.id}-${idx}`}
              onClick={() => {
                const targetTab =
                  tab.id === 'approvals'
                    ? 'owner'
                    : tab.id === 'attendance' || tab.id === 'logbook'
                    ? 'student'
                    : tab.id;
                onSelectTab(targetTab);
                if ('vibrate' in navigator) navigator.vibrate(10);
              }}
              data-testid={`mobile-tab-${tab.id}`}
              className={`flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all select-none relative ${
                isActive
                  ? 'text-imam-blue font-black'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 leading-none tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-5 h-0.5 bg-imam-blue rounded-full absolute bottom-1"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
