'use client';

import React from 'react';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import { usePublicWebsite } from '@/components/public/PublicWebsiteContext';
import { MeritScholarshipCalculator } from '@/components/public/MeritScholarshipCalculator';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  FileText,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Users,
} from 'lucide-react';

function AdmissionsPageContent() {
  const { openApply, openVerifySlip } = usePublicWebsite();

  const steps = [
    {
      num: '01',
      title: 'Online Application',
      description: 'Submit your personal details, CNIC/B-Form, and Matric/FSc marks through our 4-step wizard.',
    },
    {
      num: '02',
      title: 'Admit Slip & QR Code',
      description: 'Receive an instant official QR Admit Slip with your application roll number and scheduled test venue.',
    },
    {
      num: '03',
      title: 'Campus Entry Test',
      description: 'Appear at the Jacobabad Main Campus on Sunday, 22 November 2026 at 10:00 AM.',
    },
    {
      num: '04',
      title: 'Merit List & Enrollment',
      description: 'Merit list announcement, scholarship interviews, and 3-copy fee challan issuance via ERP cashier desk.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-3">
            Fall 2026–27 Registration Open
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Online Admissions &amp; Merit Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Step-by-step admission procedure for 4-Year BS Nursing (Generic) and 9 Free-Admission Paramedical Diplomas at Imam Institute Jacobabad.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openApply('BSN')}
              className="px-6 py-3 rounded-xl bg-imam-red hover:bg-[#C2040F] text-white font-extrabold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              Start Online Application
            </button>
            <button
              onClick={openVerifySlip}
              className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck2 size={15} />
              <span>Verify Existing Admit Slip</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4-Step Process Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-imam-blue">
            Admission Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            How to Apply in 4 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition space-y-2 relative"
            >
              <div className="text-3xl font-black text-imam-blue/30 font-mono">
                {s.num}
              </div>
              <h3 className="text-sm font-black text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Merit Calculator Section */}
      <MeritScholarshipCalculator onOpenApply={openApply} />

      {/* Key Dates & Requirements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-imam-blue uppercase tracking-wide">
              <Calendar size={16} /> Important Admission Dates
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Online Applications Open:</span>
                <strong className="text-slate-900">Active Now (Fall 2026)</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Entry Test Date:</span>
                <strong className="text-imam-red">Sunday, 22 November 2026</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Entry Test Venue:</span>
                <strong className="text-slate-900">Main Campus, Jacobabad</strong>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Commencement of Classes:</span>
                <strong className="text-emerald-700">December 2026</strong>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wide">
              <ShieldCheck size={16} /> Required Documents at Test Center
            </div>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                <span>Printed Official QR Entry Test Admit Slip</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                <span>Original CNIC or NADRA B-Form</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                <span>Matriculation &amp; Intermediate Marks Certificates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                <span>Two recent passport-sized photographs (blue background)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AdmissionsPage() {
  return (
    <PublicWebsiteShell>
      <AdmissionsPageContent />
    </PublicWebsiteShell>
  );
}
