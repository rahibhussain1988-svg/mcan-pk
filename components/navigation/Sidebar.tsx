'use client';

import React from 'react';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import {
  LayoutDashboard,
  Banknote,
  Receipt,
  HeartPulse,
  User,
  FileText,
  Users,
  Settings,
  ShieldCheck,
  Calendar,
  Lock,
} from 'lucide-react';
import { UserRole, ROLE_CONFIGS, hasTabAccess } from '@/lib/rbac';

interface SidebarProps {
  currentRole: UserRole;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  pendingApprovalsCount?: number;
  expiringLicensesCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeTab,
  onSelectTab,
  pendingApprovalsCount = 0,
  expiringLicensesCount = 0,
}) => {
  const roleConfig = ROLE_CONFIGS[currentRole] || ROLE_CONFIGS.OWNER;

  const allNavItems = [
    {
      id: 'owner',
      label: 'Owner Executive Suite',
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} new` : undefined,
      badgeColor: 'bg-amber-500 text-slate-950 font-black',
      icon: LayoutDashboard,
    },
    {
      id: 'fees',
      label: 'Fast-Cashier Fees Desk',
      icon: Banknote,
    },
    {
      id: 'expenses',
      label: 'Smart Expenses & Ledger',
      icon: Receipt,
    },
    {
      id: 'triage',
      label: 'Emergency Bedside Triage',
      badge: 'IMC ER',
      badgeColor: 'bg-rose-600 text-white',
      icon: HeartPulse,
    },
    {
      id: 'student',
      label: 'Student Portal & Logbook',
      badge: 'PNC 85%',
      badgeColor: 'bg-emerald-600 text-white',
      icon: User,
    },
    {
      id: 'drafting',
      label: 'Official Drafting Studio',
      icon: FileText,
    },
    {
      id: 'hr',
      label: 'HR & Payroll Engine',
      badge: expiringLicensesCount > 0 ? 'PNC Alert' : undefined,
      badgeColor: 'bg-rose-500 text-white',
      icon: Users,
    },
    {
      id: 'support',
      label: 'Support Duty & Slip',
      icon: Calendar,
    },
    {
      id: 'profile',
      label: 'Profile & Security',
      icon: Settings,
    },
  ];

  // Filter items by active user role permissions
  const authorizedItems = allNavItems.filter((item) =>
    hasTabAccess(currentRole, item.id)
  );

  return (
    <aside className="hidden md:flex flex-col w-64 bg-imam-navy text-white min-h-screen border-r border-white/10 shrink-0 select-none">
      {/* Top Institute Brand */}
      <div className="p-4 border-b border-white/10">
        <ImamCrestLogo
          size={46}
          showText={true}
          className="[&_span]:text-white [&_span.text-slate-500]:text-sky-300"
        />
        <div className="mt-2.5 px-2 py-1 bg-white/10 rounded-lg flex items-center justify-between text-[10px]">
          <span className="text-sky-300 font-bold">Access Scope:</span>
          <span className={`font-black px-1.5 py-0.5 rounded text-[9px] ${roleConfig.badgeColor}`}>
            {roleConfig.badge}
          </span>
        </div>
      </div>

      {/* Nav Menu Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase font-mono font-bold text-sky-300/60 px-3 py-2 tracking-wider">
          Authorized Modules
        </div>

        {authorizedItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              data-testid={`desktop-nav-${item.id}`}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition group ${
                isActive
                  ? 'bg-imam-blue text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  size={17}
                  className={isActive ? 'text-white' : 'text-sky-300/80 group-hover:text-white'}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                    item.badgeColor || 'bg-white/20 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3.5 border-t border-white/10 bg-black/20 text-[11px] text-sky-200">
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold flex items-center gap-1">
            <ShieldCheck size={13} className="text-emerald-400" /> Imam Medical Center
          </span>
          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
            RBAC Active
          </span>
        </div>
        <p className="text-[10px] text-slate-400 truncate">
          {roleConfig.label}
        </p>
      </div>
    </aside>
  );
};
