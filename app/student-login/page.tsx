'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import {
  GraduationCap,
  ShieldCheck,
  Lock,
  ArrowRight,
  User,
  CheckCircle2,
  FileCheck2,
  Receipt,
  BookOpen,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';

export default function StudentLoginPage() {
  const router = useRouter();
  const [studentId, setStudentId] = useState('STU-2024-BSN-042');
  const [pin, setPin] = useState('1234');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const quickStudents = [
    {
      id: 'STU-2024-BSN-042',
      name: 'Sumaira Bano',
      program: 'BS Nursing (Generic) · Semester 4',
      badge: 'Active Scholar',
    },
    {
      id: 'STU-2024-BSN-018',
      name: 'Bilal Ahmed Brohi',
      program: 'BS Nursing (Generic) · Semester 4',
      badge: 'Active Scholar',
    },
    {
      id: 'STU-2025-XRAY-007',
      name: 'Farhan Ali Soomro',
      program: 'Diploma in X-Ray Technician · Batch 2025',
      badge: 'Paramedical',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) {
      setError('Please enter your Student ID or Roll Number.');
      return;
    }
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Direct navigation to student portal with selected student
      router.push(`/erp?role=student&tab=student&studentId=${encodeURIComponent(studentId)}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-imam-blue selection:text-white">
      {/* Top Banner */}
      <header className="w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <ImamCrestLogo size={38} showText={false} />
            <div>
              <div className="text-xs sm:text-sm font-black tracking-tight text-white group-hover:text-imam-blue transition">
                IMAM INSTITUTE
              </div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Student Self-Service Portal
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
              href="/erp-login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-bold transition border border-blue-500/30"
            >
              <span>Faculty/ERP Login</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Information & Student Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
              <GraduationCap size={15} />
              <span>Official Student Digital Desk</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Access Your Academic &amp; Clinical Records
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Login to view real-time PNC attendance eligibility, download 3-copy semester fee challans, view exam DMC results, and track bedside clinical competencies.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">PNC 85% Attendance Compliance</h4>
                  <p className="text-[11px] text-slate-400">Live lecture and clinical rotation tracking with statutory clearance indicators.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <Receipt size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Digital Fee Challans &amp; Receipts</h4>
                  <p className="text-[11px] text-slate-400">Printable 3-copy HBL bank challans, verified payment status, and ledger records.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <BookOpen size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Clinical E-Logbook &amp; Ward DMC</h4>
                  <p className="text-[11px] text-slate-400">Bedside case submissions, supervisor preceptor PIN approvals, and OSPE grading.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Login Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-black text-white">Student Sign In</h2>
                  <p className="text-xs text-slate-400">Enter your official institutional credentials</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                  <ShieldCheck size={20} />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Student ID or Roll Number
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. STU-2024-BSN-042"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-imam-blue transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-300">
                      Security PIN / Password
                    </label>
                    <span className="text-[11px] text-slate-500">Default PIN: 1234</span>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="Enter 4-digit PIN"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-imam-blue transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-imam-blue to-blue-700 hover:from-blue-600 hover:to-imam-blue text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-900/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Authenticating Student Record...</span>
                  ) : (
                    <>
                      <span>Sign In to Student Portal</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* Fast One-Tap Profile Selectors */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Quick Demo Student Selectors:
                </span>
                <div className="space-y-2">
                  {quickStudents.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStudentId(s.id)}
                      className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between border ${
                        studentId === s.id
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold flex items-center gap-2">
                          <span>{s.name}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400">
                            {s.id}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{s.program}</div>
                      </div>
                      <ChevronRight size={14} className="text-slate-500" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <Link href="/admissions/apply" className="hover:text-blue-400 transition">
                  Need Admission? Apply Here
                </Link>
                <Link href="/contact" className="hover:text-blue-400 transition">
                  Forgot Credentials?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Imam Institute of Nursing &amp; Allied Health Sciences · Student Information System
      </footer>
    </div>
  );
}
