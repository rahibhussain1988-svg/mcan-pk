'use client';

import React from 'react';
import Link from 'next/link';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { Search, User, Shield, ChevronDown, Globe, ArrowLeft } from 'lucide-react';
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
}

export const Header: React.FC<HeaderProps> = ({
  currentUserId,
  currentRole,
  allUsers,
  onSwitchUser,
  onOpenCommandPalette,
  onSelectTab,
}) => {
  const activeUser = allUsers.find((u) => u.userId === currentUserId) || allUsers[0];
  const roleConfig = ROLE_CONFIGS[currentRole] || ROLE_CONFIGS.OWNER;

  // Group users by category
  const managementUsers = allUsers.filter((u) => u.category === 'Management');
  const teachingUsers = allUsers.filter((u) => u.category === 'Teaching Staff');
  const supportUsers = allUsers.filter((u) => u.category === 'Support Staff');
  const studentUsers = allUsers.filter((u) => u.category === 'Student');

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 py-2.5 flex items-center justify-between">
      {/* Left Brand and Mobile Crest + Public Return Button */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-imam-navy hover:text-white text-slate-700 rounded-xl text-xs font-bold transition border border-slate-200 shadow-2xs group"
          title="Return to Official Public Website (imcan.pk)"
        >
          <Globe size={13} className="text-imam-blue group-hover:text-white shrink-0" />
          <span className="hidden sm:inline">← Public Website</span>
          <span className="sm:hidden">← Site</span>
        </Link>

        <div className="md:hidden flex items-center gap-2">
          <ImamCrestLogo size={32} showText={false} />
          <div>
            <span className="font-black text-slate-900 text-xs sm:text-sm uppercase tracking-tight block leading-tight">
              IMAM INSTITUTE
            </span>
            <span className="text-[9px] font-semibold text-imam-blue block leading-tight">
              Smart ERP • {roleConfig.badge}
            </span>
          </div>
        </div>

        {/* Desktop Quick Command Search */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-500 rounded-xl text-xs transition border border-slate-200/60 font-sans"
        >
          <Search size={14} className="text-slate-400" />
          <span>Quick command search...</span>
          <kbd className="bg-white text-slate-600 font-mono text-[10px] px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Institutional Personnel Switcher (Role-Based Access) */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200/80">
          <Shield size={14} className="text-imam-blue ml-1.5 hidden sm:inline-block" />
          <select
            value={currentUserId}
            onChange={(e) => onSwitchUser(e.target.value)}
            data-testid="role-switcher-select"
            className="bg-white text-slate-900 rounded-lg px-2.5 py-1 text-xs font-bold border border-slate-200 shadow-sm focus:outline-none cursor-pointer max-w-[220px] sm:max-w-[320px] truncate"
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
            className={`hidden lg:inline-block text-[10px] font-black px-2 py-0.5 rounded-md ${roleConfig.badgeColor}`}
          >
            {roleConfig.badge}
          </span>
        </div>

        {/* Profile Avatar Button */}
        <button
          onClick={() => onSelectTab('profile')}
          className="w-8 h-8 rounded-xl bg-imam-navy text-white font-bold text-xs flex items-center justify-center border border-slate-200 shadow-sm hover:scale-105 transition"
          title={`Active User: ${activeUser?.fullName} (${activeUser?.designation})`}
        >
          {activeUser?.fullName.charAt(0) || 'U'}
        </button>
      </div>
    </header>
  );
};
