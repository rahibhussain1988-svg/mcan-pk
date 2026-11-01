'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  GraduationCap,
  Crown,
  HeartPulse,
  Receipt,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Sparkles,
  Layers,
  ArrowUpRight,
  Server,
} from 'lucide-react';

export const CampusErpSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'owner' | 'student' | 'triage' | 'cashier' | 'faculty'>('owner');

  const portals = [
    {
      id: 'owner' as const,
      role: 'Management',
      title: 'Owner & Executive Command',
      badge: 'Mr. Sajid Hussain (Chairman)',
      icon: Crown,
      color: 'from-amber-500 to-amber-700',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description:
        "Daily cash-in-hand tracking, net operating surplus, multi-track P&L breakdown, and one-tap mobile expense voucher approvals.",
      href: '/erp?role=owner&tab=owner',
      features: [
        "Real-time Daily Cash & Bank Balance",
        "1-Tap Mobile Voucher Approvals",
        "Program-wise P&L (BSN vs Paramedical)",
        "Direct CEO Decision Engine",
      ],
    },
    {
      id: 'student' as const,
      role: 'Student Body',
      title: 'Student Self-Service Portal',
      badge: '500+ Students',
      icon: GraduationCap,
      color: 'from-blue-600 to-imam-navy',
      textColor: 'text-imam-blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description:
        "Instant downloadable 3-copy bank fee challans, digital student ID card with QR code, and clinical ward attendance records.",
      href: '/erp?role=student&tab=student',
      features: [
        "Downloadable 3-Copy Bank Challan",
        "Digital Student ID Card with QR",
        "Ward Rotation & Lecture Attendance",
        "Semester Examination Admit Slips",
      ],
    },
    {
      id: 'triage' as const,
      role: 'Imam Medical Center',
      title: 'Clinical Bedside Triage Engine',
      badge: 'JIMS & IMC Rotations',
      icon: HeartPulse,
      color: 'from-rose-500 to-rose-700',
      textColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      description:
        "High-risk patient vitals computation, National Early Warning Score (NEWS2), ESI acuity sorting, and student nurse pairings.",
      href: '/erp?role=triage&tab=triage',
      features: [
        "Live Bedside Telemetry Monitor",
        "NEWS2 & ESI Acuity Scoring",
        "Critical Vitals Risk Escalation",
        "Student Nurse Bedside Pairings",
      ],
    },
    {
      id: 'cashier' as const,
      role: 'Accounts & Finance',
      title: 'Fast-Cashier Fee Collection',
      badge: 'Thermal Receipt Printing',
      icon: Receipt,
      color: 'from-emerald-600 to-teal-800',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description:
        "Rapid roll number & challan barcode lookup, partial installment allocation, defaulter ledger, and 80mm thermal receipt printing.",
      href: '/erp?role=accounts&tab=fees',
      features: [
        "Challan Search by Roll No / CNIC",
        "Partial Fee Concession Allocations",
        "80mm Thermal Receipt Generator",
        "Real-Time Defaulter Ledger",
      ],
    },
    {
      id: 'faculty' as const,
      role: 'Academic Preceptors',
      title: 'Faculty & Preceptor Desk',
      badge: '15+ Faculty Members',
      icon: Stethoscope,
      color: 'from-indigo-600 to-indigo-800',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      description:
        "Clinical ward logbook verification, lecture attendance registers, practical OSCE scoring, and student rotation oversight.",
      href: '/erp?role=faculty&tab=support',
      features: [
        "Bedside Clinical Logbook Sign-offs",
        "Ward Duty Shift Rosters",
        "OSCE Practical Performance Scoring",
        "Student Competency Assessments",
      ],
    },
  ];

  const current = portals.find((p) => p.id === activeTab) || portals[0];

  return (
    <section id="campus-erp" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-imam-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-imam-red/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-300 text-xs font-bold mb-3 border border-white/15">
            <Globe size={14} className="text-emerald-400" />
            <span>Integrated Directly Within Website · Same Codebase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Campus Management ERP &amp; Portals
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Every institutional workflow—from executive P&amp;L oversight and fee cashiering to student self-service and Imam Medical Center clinical triage—is available within this website.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {portals.map((portal) => {
            const Icon = portal.icon;
            const isActive = activeTab === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => setActiveTab(portal.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-imam-blue text-white shadow-lg shadow-blue-900/50 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon size={15} />
                <span>{portal.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Portal Showcase Card */}
        <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700 p-6 sm:p-10 shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description & Features */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-800 px-3 py-1 rounded-full">
                  {current.role}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {current.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {current.description}
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {current.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href={current.href}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-imam-blue to-[#004B87] hover:from-blue-600 hover:to-imam-blue text-white font-extrabold text-xs transition flex items-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <span>Launch {current.title}</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/erp"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/15 flex items-center gap-1.5"
                >
                  <Server size={14} className="text-blue-300" />
                  <span>Open Full ERP App</span>
                </Link>
              </div>
            </div>

            {/* Right Live Preview Box */}
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl border border-slate-700/80 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  imcan.pk{current.href}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">Database Engine</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">SQLite + Prisma (Active)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">Offline PWA Service Worker</span>
                  <span className="text-xs font-mono font-bold text-blue-400">sw.js (Registered)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">Live Return Bridge</span>
                  <span className="text-xs font-mono font-bold text-yellow-300">← Public Website</span>
                </div>
              </div>

              <Link
                href="/login"
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 border border-white/10"
              >
                <span>Switch Portal User &amp; Role</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Fast Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
          <Link
            href="/owner"
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition group"
          >
            <Crown size={18} className="mx-auto text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Owner Portal</div>
            <div className="text-[10px] text-slate-400 mt-0.5">/owner</div>
          </Link>

          <Link
            href="/student-portal"
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition group"
          >
            <GraduationCap size={18} className="mx-auto text-blue-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Student Portal</div>
            <div className="text-[10px] text-slate-400 mt-0.5">/student-portal</div>
          </Link>

          <Link
            href="/triage"
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition group"
          >
            <HeartPulse size={18} className="mx-auto text-rose-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Bedside Triage</div>
            <div className="text-[10px] text-slate-400 mt-0.5">/triage</div>
          </Link>

          <Link
            href="/erp?role=accounts&tab=fees"
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition group"
          >
            <Receipt size={18} className="mx-auto text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Fee Cashier</div>
            <div className="text-[10px] text-slate-400 mt-0.5">/erp?tab=fees</div>
          </Link>

          <Link
            href="/login"
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition group col-span-2 sm:col-span-1"
          >
            <ShieldCheck size={18} className="mx-auto text-indigo-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Role Gateway</div>
            <div className="text-[10px] text-slate-400 mt-0.5">/login</div>
          </Link>
        </div>
      </div>
    </section>
  );
};
