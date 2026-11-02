'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import {
  Crown,
  Receipt,
  Stethoscope,
  HeartPulse,
  Package,
  BookOpen,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Building2,
  Users,
} from 'lucide-react';

export default function ErpLoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'owner' | 'faculty' | 'accounts' | 'triage'>('owner');
  const [targetTab, setTargetTab] = useState('owner');
  const [username, setUsername] = useState('chairman@imcan.pk');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);

  const staffProfiles = [
    {
      role: 'owner' as const,
      tab: 'owner',
      title: 'Executive Command & Chairman',
      user: 'Dr. Abid Hussain Soomro (CEO)',
      email: 'chairman@imcan.pk',
      icon: Crown,
      color: 'bg-indigo-600',
      badge: 'Owner Executive',
      desc: 'Institutional P&L, expense approvals, fee oversight, and bank ledger.',
    },
    {
      role: 'faculty' as const,
      tab: 'academics',
      title: 'Principal & Academic Dean',
      user: 'Prof. Farzana Begum (Academic Dean)',
      email: 'principal@imcan.pk',
      icon: BookOpen,
      color: 'bg-blue-600',
      badge: 'Academic Dean',
      desc: 'Timetable scheduler, curriculum syllabus, examination grading, and transcripts.',
    },
    {
      role: 'accounts' as const,
      tab: 'fees',
      title: 'Fast-Cashier & Accounts Desk',
      user: 'Ghulam Mustafa (Finance Controller)',
      email: 'accounts@imcan.pk',
      icon: Receipt,
      color: 'bg-amber-600',
      badge: 'Cashier & Finance',
      desc: 'Fee challan collections, thermal print receipts, double-entry vouchers, and balance sheet.',
    },
    {
      role: 'faculty' as const,
      tab: 'clinical-gov',
      title: 'Clinical Preceptor & Ward Supervisor',
      user: 'Sister Farzana / IMC Preceptor',
      email: 'clinical@imcan.pk',
      icon: Stethoscope,
      color: 'bg-emerald-600',
      badge: 'Clinical Governance',
      desc: 'Bedside case sign-offs (PIN 9988), 1:6 supervision ratio guardrails, and hospital rosters.',
    },
    {
      role: 'triage' as const,
      tab: 'triage',
      title: 'Imam Medical Center ER Triage',
      user: 'IMC Bedside Triage Nurse',
      email: 'triage@imcan.pk',
      icon: HeartPulse,
      color: 'bg-rose-600',
      badge: 'IMC Hospital ER',
      desc: 'NEWS2 & ESI clinical acuity scoring, emergency patient sorting, and telemetry queues.',
    },
    {
      role: 'accounts' as const,
      tab: 'inventory',
      title: 'Stores & Central Medical Inventory',
      user: 'Muhammad Aslam (Stores Officer)',
      email: 'stores@imcan.pk',
      icon: Package,
      color: 'bg-teal-600',
      badge: 'Stores & Supply',
      desc: 'Pharmacy stock, clinical consumables, reorder threshold alerts, and departmental GRN.',
    },
  ];

  const handleSelectProfile = (p: typeof staffProfiles[0]) => {
    setSelectedRole(p.role);
    setTargetTab(p.tab);
    setUsername(p.email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/erp?role=${selectedRole}&tab=${targetTab}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-imam-blue selection:text-white">
      {/* Top Bar */}
      <header className="w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <ImamCrestLogo size={38} showText={false} />
            <div>
              <div className="text-xs sm:text-sm font-black tracking-tight text-white group-hover:text-imam-blue transition">
                IMAM INSTITUTE &amp; MEDICAL CENTER
              </div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Institutional Management ERP
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition border border-slate-700"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Website</span>
            </Link>
            <Link
              href="/student-login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-bold transition border border-blue-500/30"
            >
              <span>Student Portal</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-3">
            <ShieldCheck size={15} />
            <span>Operational Institute Management System</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Administrative &amp; Faculty ERP Gateway
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Select your assigned institutional role or log in with verified enterprise credentials to manage finances, academic timetables, stores, and clinical wards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Role Selector Grid */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block px-1">
              Select Enterprise Department / Workstation:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {staffProfiles.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedRole === p.role && targetTab === p.tab;
                return (
                  <div
                    key={`${p.role}-${p.tab}`}
                    onClick={() => handleSelectProfile(p)}
                    className={`p-4 rounded-2xl cursor-pointer transition border text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-600/20 border-imam-blue shadow-lg shadow-blue-900/20 ring-1 ring-imam-blue'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl ${p.color} text-white flex items-center justify-center font-bold`}>
                          <Icon size={16} />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {p.badge}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-white leading-tight">
                        {p.title}
                      </h3>
                      <div className="text-[11px] font-semibold text-blue-400 mt-0.5">
                        {p.user}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 leading-snug">
                        {p.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-mono text-[10px]">{p.email}</span>
                      <span className={`font-bold ${isSelected ? 'text-blue-400' : 'text-slate-500'}`}>
                        {isSelected ? 'Selected ✓' : 'Select →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Direct Sign-In Form */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl sticky top-24">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-black text-white">Staff Authentication</h2>
                  <p className="text-xs text-slate-400">Target Role: <strong className="text-blue-400 uppercase">{selectedRole} ({targetTab})</strong></p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                  <Lock size={18} />
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Official Email / Staff ID
                  </label>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-imam-blue transition"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-300">
                      Security Passcode
                    </label>
                    <span className="text-[11px] text-slate-500">Demo Passcode: admin123</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-imam-blue transition"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>Audit Trail &amp; Regulatory Compliance</span>
                  </div>
                  <p>All institutional mutations, journal entries, grade postings, and clinical approvals are stamped with timestamp and user ID.</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-imam-blue to-blue-700 hover:from-blue-600 hover:to-imam-blue text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-900/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Launching Workstation...</span>
                  ) : (
                    <>
                      <span>Enter ERP System</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
                Authorized Personnel Only · Imam Institute Jacobabad
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Imam Institute of Nursing &amp; Allied Health Sciences · Enterprise ERP &amp; Clinical Governance
      </footer>
    </div>
  );
}
