'use client';

import React from 'react';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import { usePublicWebsite } from '@/components/public/PublicWebsiteContext';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  ShieldCheck,
  Building2,
  Award,
  Users,
  Compass,
  CheckCircle2,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

function AboutPageContent() {
  const { openApply, openJobDrawer } = usePublicWebsite();

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-3">
            Established 2019 · Jacobabad, Sindh
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            About Imam Institute
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Dedicated to academic rigor, clinical excellence, and socio-economic empowerment through career-ready nursing and allied health education.
          </p>
        </div>
      </section>

      {/* Institutional Story & Vision/Mission */}
      <section id="story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-imam-blue uppercase tracking-wider">
              <Compass size={14} /> Our History &amp; Legacy
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Five Years of Transforming Healthcare Education
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Established in 2019 in Shah Ghazi Muhalla, Jacobabad, Imam Institute of Nursing &amp; Allied Health Sciences was founded to bridge the critical shortage of certified clinical nurses and diagnostic technologists across upper Sindh and adjacent regions.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              With over 500 graduates and active students, 15+ specialized faculty members, and daily bedside rotations at Imam Medical Center and JIMS 133-bed hospital, we provide an unbroken continuum from foundational simulation labs to graduate House Job postings.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div id="vision-mission" className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-imam-blue uppercase tracking-wide">
                <Sparkles size={16} /> Institutional Vision
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;{INSTITUTIONAL_DATA.vision}&rdquo;
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-imam-navy uppercase tracking-wide">
                <GraduationCap size={16} /> Institutional Mission
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;{INSTITUTIONAL_DATA.mission}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO & Leadership Message */}
      <section id="ceo-message" className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-imam-navy text-white flex items-center justify-center font-black text-2xl shrink-0">
                AS
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {INSTITUTIONAL_DATA.leadership.ceo.name}
                </h3>
                <div className="text-xs font-bold text-imam-blue mt-0.5">
                  {INSTITUTIONAL_DATA.leadership.ceo.title}
                </div>
                <div className="text-[11px] text-slate-500">
                  {INSTITUTIONAL_DATA.leadership.ceo.credentials}
                </div>
              </div>
            </div>

            <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed italic border-l-4 border-imam-blue pl-4 py-1">
              &ldquo;{INSTITUTIONAL_DATA.leadership.ceo.quote} We founded Imam Institute in Jacobabad with a steadfast belief: no aspiring student in our region should be denied a career in healthcare due to geographic or financial barriers. Through our Free Admissions Initiative in paramedical sciences, and our SMBBMU-affiliated BS Nursing Generic program, we are building a skilled healthcare workforce that saves lives every single day.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Statutory Accreditations */}
      <section id="accreditations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-imam-blue">
            Regulatory Compliance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Official Statutory Recognitions &amp; Affiliations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INSTITUTIONAL_DATA.accreditations.map((acc) => (
            <div
              key={acc.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-imam-blue/40 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-imam-blue">
                  {acc.category}
                </span>
                <ShieldCheck size={16} className="text-emerald-600" />
              </div>
              <h4 className="text-xs font-black text-slate-900">{acc.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{acc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-imam-navy to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-black">Begin Your Healthcare Career Today</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Join our 2026–27 intake in Jacobabad. Online admissions and merit calculation take less than two minutes.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openApply('BSN')}
              className="px-6 py-3 rounded-xl bg-imam-red hover:bg-[#C2040F] text-white font-extrabold text-xs transition cursor-pointer"
            >
              Apply for BS Nursing
            </button>
            <button
              onClick={() => openJobDrawer('Principal (MSN)')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition"
            >
              View Career Openings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AboutPage() {
  return (
    <PublicWebsiteShell>
      <AboutPageContent />
    </PublicWebsiteShell>
  );
}
