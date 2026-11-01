import React from 'react';
import Link from 'next/link';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import {
  GraduationCap,
  Stethoscope,
  HeartPulse,
  Receipt,
  Crown,
  ArrowRight,
  Globe,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export const metadata = {
  title: 'ERP & Institutional Portals Gateway | Imam Institute',
  description: 'Role-based access gateway for students, faculty, triage nurses, accounts desk, and executive leadership.',
};

export default function LoginPage() {
  const portalRoles = [
    {
      title: 'Student Self-Service Portal',
      description: 'Course registration, semester attendance, fee challans, digital DMC, and clinical e-logbook.',
      role: 'student',
      href: '/erp?role=student&tab=student',
      icon: GraduationCap,
      color: 'bg-blue-600',
      badge: 'Student Body',
    },
    {
      title: 'Faculty & Preceptor Desk',
      description: 'Ward rosters, OSPE clinical grading, competency sign-offs, and attendance registers.',
      role: 'faculty',
      href: '/erp?role=faculty&tab=support',
      icon: Stethoscope,
      color: 'bg-emerald-600',
      badge: 'Academic & Clinical',
    },
    {
      title: 'Imam Medical Center Triage',
      description: 'Bedside emergency NEWS2 & ESI patient sorting, telemetry vitals, and queue triage.',
      role: 'triage',
      href: '/erp?role=triage&tab=triage',
      icon: HeartPulse,
      color: 'bg-rose-600',
      badge: 'Clinical Triage',
    },
    {
      title: 'Cashier & Expense Desk',
      description: 'Fast fee collection, 3-copy bank challans, thermal receipt printing, and voucher records.',
      role: 'accounts',
      href: '/erp?role=accounts&tab=fees',
      icon: Receipt,
      color: 'bg-amber-600',
      badge: 'Finance & Accounts',
    },
    {
      title: 'Owner & Executive Command',
      description: 'Strategic P&L, live financial pulse, budget guardrails, and one-tap executive approvals.',
      role: 'owner',
      href: '/erp?role=owner&tab=owner',
      icon: Crown,
      color: 'bg-indigo-600',
      badge: 'Executive Board',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Navbar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-800">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <ImamCrestLogo size={42} showText={false} />
          <div>
            <div className="text-sm font-black tracking-tight text-white group-hover:text-imam-blue transition">
              IMAM INSTITUTE OF NURSING
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Smart ERP &amp; Clinical Management
            </div>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
        >
          <Globe size={14} className="text-imam-blue" />
          <span>← Back to Public Website</span>
        </Link>
      </header>

      {/* Main Grid */}
      <main className="max-w-5xl w-full mx-auto my-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-3">
            <ShieldCheck size={14} /> Institutional Role-Based Access
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Select Your Portal Gateway
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Secure unified management suite connecting student services, clinical triage at Imam Medical Center, cashier desks, and executive administration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portalRoles.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.role}
                href={portal.href}
                className="group relative bg-slate-800/80 hover:bg-slate-800 rounded-2xl p-6 border border-slate-700/80 hover:border-imam-blue transition-all duration-200 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${portal.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-700 text-slate-300">
                      {portal.badge}
                    </span>
                  </div>
                  <h2 className="text-base font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    {portal.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {portal.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-imam-blue group-hover:text-blue-400">
                  <span>Enter Portal</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}

          {/* Quick Direct Campus Link */}
          <div className="bg-gradient-to-br from-imam-navy to-slate-900 rounded-2xl p-6 border border-imam-blue/30 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                <Building2 size={24} />
              </div>
              <h2 className="text-base font-extrabold text-white">Main Campus Jacobabad</h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Shah Ghazi Muhalla, Imam Baksh Road, Jacobabad, Sindh. Open 8:00 AM – 4:00 PM. Admissions helpline: +92 300 2320085.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-white"
            >
              <span>View Location &amp; Directions</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Imam Institute of Nursing &amp; Allied Health Sciences. Approved by Govt. of Sindh · PNMC Registered · SMBBMU Affiliated.
      </footer>
    </div>
  );
}
