'use client';

import React from 'react';
import Link from 'next/link';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { Search, User, Shield, ChevronDown, Globe, ArrowLeft, Sparkles, HeartPulse, GraduationCap, LayoutDashboard, Receipt } from 'lucide-react';
import { UserRole, ROLE_CONFIGS } from '@/lib/rbac';

interface HeaderProps {
  currentUserId: string;
  currentRole: UserRole;
  allUsers: Array<{
    userId: string;
    fullName: string;
    designation: string;
    category: string;
    role: string;
  }>;
  onSwitchUser: (userId: string) => void;
  onOpenCommandPalette: () => void;
  onSelectTab: (tabId: string) => void;
  onOpenCopilot: () => void;
  currentLang?: 'en' | 'ur' | 'sd';
  onSelectLang?: (lang: 'en' | 'ur' | 'sd') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUserId,
  currentRole,
  allUsers,
  onSwitchUser,
  onOpenCommandPalette,
  onSelectTab,
  onOpenCopilot,
  currentLang = 'en',
  onSelectLang,
}) => {
  const activeUser = allUsers.find((u) => u.userId === currentUserId) || allUsers[0];
  const roleConfig = ROLE_CONFIGS[currentRole] || ROLE_CONFIGS.OWNER;

  // Group users by category
  const managementUsers = allUsers.filter((u) => u.category === 'Management');
  const teachingUsers = allUsers.filter((u) => u.category === 'Teaching Staff');
  const supportUsers = allUsers.filter((u) => u.category === 'Support Staff');
  const studentUsers = allUsers.filter((u) => u.category === 'Student');

  // Find direct users for quick role shortcuts
  const adminUser = managementUsers[0] || allUsers[0];
  const triageUser = teachingUsers.find((u) => u.role === 'FACULTY') || teachingUsers[0];
  const studentUser = studentUsers[0];
  const cashierUser = supportUsers.find((u) => u.role === 'CASHIER');

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
      {/* Left Brand and Mobile Crest + Public Return Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-imam-navy hover:text-white text-slate-700 rounded-xl text-xs font-bold transition border border-slate-200 shadow-2xs group shrink-0"
          title="Return to Official Public Website (imcan.pk)"
        >
          <Globe size={13} className="text-imam-blue group-hover:text-white shrink-0" />
          <span className="hidden sm:inline">← Public Website</span>
          <span className="sm:hidden">← Site</span>
        </Link>

        <div className="md:hidden flex items-center gap-2">
          <ImamCrestLogo size={32} showText={false} />
          <div>
            <span className="font-black text-slate-900 text-xs uppercase tracking-tight block leading-tight">
              IMAM ERP
            </span>
            <span className="text-[9px] font-semibold text-imam-blue block leading-tight">
              {roleConfig.badge}
            </span>
          </div>
        </div>

        {/* Quick Role Switcher Pills (Requested in Section 6) */}
        <div className="hidden xl:flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 text-[11px] font-bold">
          <button
            data-testid="role-pill-admin"
            onClick={() => {
              if (adminUser) onSwitchUser(adminUser.userId);
              onSelectTab('owner');
            }}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 ${
              currentRole === 'OWNER'
                ? 'bg-imam-navy text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <LayoutDashboard size={12} />
            <span>Admin ERP</span>
          </button>

          <button
            data-testid="role-pill-triage"
            onClick={() => {
              if (triageUser) onSwitchUser(triageUser.userId);
              onSelectTab('triage');
            }}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 ${
              currentRole === 'FACULTY'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <HeartPulse size={12} />
            <span>Triage Command</span>
          </button>

          <button
            data-testid="role-pill-student"
            onClick={() => {
              if (studentUser) onSwitchUser(studentUser.userId);
              onSelectTab('student');
            }}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 ${
              currentRole === 'STUDENT'
                ? 'bg-imam-blue text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <GraduationCap size={12} />
            <span>Student Portal</span>
          </button>

          {cashierUser && (
            <button
              data-testid="role-pill-cashier"
              onClick={() => {
                onSwitchUser(cashierUser.userId);
                onSelectTab('fees');
              }}
              className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 ${
                currentRole === 'CASHIER'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Receipt size={12} />
              <span>Cashier Desk</span>
            </button>
          )}
        </div>

        {/* Desktop Quick Command Search */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-500 rounded-xl text-xs transition border border-slate-200/60 font-sans"
        >
          <Search size={14} className="text-slate-400" />
          <span className="hidden lg:inline">Quick command search...</span>
          <span className="lg:hidden">Search...</span>
          <kbd className="bg-white text-slate-600 font-mono text-[10px] px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Copilot AI, Language Toggle, Personnel Switcher & Avatar */}
      <div className="flex items-center gap-2">
        {/* Slide-Over Imam AI Copilot Button */}
        <button
          onClick={onOpenCopilot}
          data-testid="open-copilot-btn"
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition active:scale-95"
          title="Open Imam AI Executive Copilot (Ctrl+I)"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span className="hidden sm:inline">AI Copilot</span>
          <kbd className="hidden lg:inline-block bg-slate-900/20 text-slate-950 font-mono text-[9px] px-1 py-0.2 rounded">
            Ctrl+I
          </kbd>
        </button>

        {/* Trilingual Language Selector */}
        {onSelectLang && (
          <div className="hidden sm:flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 text-xs font-bold">
            <button
              onClick={() => onSelectLang('en')}
              className={`px-2 py-1 rounded-lg transition ${currentLang === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}`}
            >
              EN
            </button>
            <button
              onClick={() => onSelectLang('ur')}
              className={`px-2 py-1 rounded-lg transition font-urdu ${currentLang === 'ur' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}`}
            >
              اردو
            </button>
            <button
              onClick={() => onSelectLang('sd')}
              className={`px-2 py-1 rounded-lg transition font-sindhi ${currentLang === 'sd' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}`}
            >
              سنڌي
            </button>
          </div>
        )}

        {/* Institutional Personnel Switcher (Dropdown) */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200/80">
          <Shield size={14} className="text-imam-blue ml-1.5 hidden sm:inline-block" />
          <select
            value={currentUserId}
            onChange={(e) => onSwitchUser(e.target.value)}
            data-testid="role-switcher-select"
            className="bg-white text-slate-900 rounded-lg px-2.5 py-1 text-xs font-bold border border-slate-200 shadow-sm focus:outline-none cursor-pointer max-w-[170px] sm:max-w-[260px] truncate"
          >
            {managementUsers.length > 0 && (
              <optgroup label="Management (Executive Board)">
                {managementUsers.map((u) => (
                  <option key={u.userId} value={u.userId}>
                    {u.fullName} — {u.designation}
                  </option>
                ))}
              </optgroup>
            )}

            {teachingUsers.length > 0 && (
              <optgroup label="Teaching Staff">
                {teachingUsers.map((u) => (
                  <option key={u.userId} value={u.userId}>
                    {u.fullName} — {u.designation}
                  </option>
                ))}
              </optgroup>
            )}

            {supportUsers.length > 0 && (
              <optgroup label="Support Staff">
                {supportUsers.map((u) => (
                  <option key={u.userId} value={u.userId}>
                    {u.fullName} — {u.designation}
                  </option>
                ))}
              </optgroup>
            )}

            {studentUsers.length > 0 && (
              <optgroup label="Student Body">
                {studentUsers.map((u) => (
                  <option key={u.userId} value={u.userId}>
                    {u.fullName} — {u.designation}
                  </option>
                ))}
              </optgroup>
            )}
          </select>

          <span
            className={`hidden 2xl:inline-block text-[10px] font-black px-2 py-0.5 rounded-md ${roleConfig.badgeColor}`}
          >
            {roleConfig.badge}
          </span>
        </div>

        {/* Profile Avatar Button */}
        <button
          onClick={() => onSelectTab('profile')}
          className="w-8 h-8 rounded-xl bg-imam-navy text-white font-bold text-xs flex items-center justify-center border border-slate-200 shadow-sm hover:scale-105 transition shrink-0"
          title={`Active User: ${activeUser?.fullName} (${activeUser?.designation})`}
        >
          {activeUser?.fullName.charAt(0) || 'U'}
        </button>
      </div>
    </header>
  );
};
