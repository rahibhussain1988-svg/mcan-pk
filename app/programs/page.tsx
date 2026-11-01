'use client';

import React from 'react';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import { usePublicWebsite } from '@/components/public/PublicWebsiteContext';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  GraduationCap,
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

function ProgramsPageContent() {
  const { openApply, openWaitlist } = usePublicWebsite();

  const programs = INSTITUTIONAL_DATA.programs;
  const degreePrograms = programs.filter((p) => p.category === 'degree');
  const paramedicalPrograms = programs.filter((p) => p.category === 'paramedical');
  const upcomingPrograms = programs.filter((p) => p.category === 'upcoming');

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-3">
            Fall Intake 2026–27
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Academic Degree &amp; Diploma Programs
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Comprehensive professional healthcare education registered with the Pakistan Nursing &amp; Midwifery Council (PNMC) and affiliated with SMBBMU Larkana and SMF Karachi.
          </p>
        </div>
      </section>

      {/* BS Nursing Generic Section */}
      <section id="bsn" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-imam-blue uppercase tracking-wider mb-1">
            <GraduationCap size={15} /> Flagship University Degree
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            BS Nursing (Generic) — 4 Years
          </h2>
        </div>

        {degreePrograms.map((p) => (
          <div
            key={p.code}
            className="bg-white rounded-3xl border-2 border-imam-blue/30 p-6 sm:p-10 shadow-lg space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {p.description} Students receive intensive pre-clinical preparation in our Fundamentals of Nursing (FON) Museum and Anatomy Labs before rotating daily at Imam Medical Center, JIMS (133-bed) hospital, and Civil Hospital Jacobabad.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Curriculum Highlights:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={14} className="text-imam-blue shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">
                    Eligibility
                  </span>
                  <strong className="text-xs text-slate-900 block mt-0.5">
                    {p.eligibility}
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">
                    Degree Affiliation
                  </span>
                  <strong className="text-xs text-imam-blue block mt-0.5">
                    {p.affiliation}
                  </strong>
                </div>

                <button
                  onClick={() => openApply(p.code)}
                  className="w-full py-3 rounded-xl bg-imam-blue hover:bg-imam-navy text-white text-xs font-black transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Apply Online for BSN</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 9 Paramedical Diplomas Section */}
      <section id="paramedical" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-imam-red uppercase tracking-wider mb-1">
              <Award size={15} /> Imam Paramedical Institute
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              9 Paramedical Technician Diplomas (1-Year)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              100% Free Admissions Initiative · Certified by Sindh Medical Faculty (SMF) Karachi &amp; STEVTA
            </p>
          </div>

          <span className="text-xs font-black px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            Free Tuition Initiative Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paramedicalPrograms.map((p) => (
            <div
              key={p.code}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-imam-red/30 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Free Admission
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {p.duration}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.description}
                </p>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                  <strong>Eligibility:</strong> {p.eligibility}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">SMF Karachi</span>
                <button
                  onClick={() => openApply(p.code)}
                  className="px-4 py-2 bg-slate-900 hover:bg-imam-red text-white text-xs font-bold rounded-xl transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Enroll</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Pathways Section */}
      <section id="upcoming" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Priority Waitlist
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Upcoming Department of Nursing Pathways
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Register for early notification when CMW, LHV, and CNA seat allocations open.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {upcomingPrograms.map((p) => (
              <div
                key={p.code}
                className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-300 uppercase block mb-1">
                    {p.duration}
                  </span>
                  <h4 className="text-base font-extrabold text-white">{p.name}</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <button
                  onClick={() => openWaitlist(p.code)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-imam-blue hover:bg-blue-600 text-white text-xs font-bold transition text-center cursor-pointer"
                >
                  Join {p.code} Priority Alert
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <PublicWebsiteShell>
      <ProgramsPageContent />
    </PublicWebsiteShell>
  );
}
