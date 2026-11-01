'use client';

import React from 'react';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import { usePublicWebsite } from '@/components/public/PublicWebsiteContext';
import { CampusLabsShowcase } from '@/components/public/CampusLabsShowcase';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  Briefcase,
  Calendar,
  Sparkles,
  ArrowRight,
  Award,
  CheckCircle2,
  Building2,
  Users,
} from 'lucide-react';

function NewsCareersContent() {
  const { openJobDrawer, openApply } = usePublicWebsite();
  const announcements = INSTITUTIONAL_DATA.announcements;

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-3">
            Campus Highlights &amp; Opportunities
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            News, Seminars &amp; Careers
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Stay updated with official academic milestones, scientific conferences, and faculty recruitment at Imam Institute Jacobabad.
          </p>
        </div>
      </section>

      {/* Priority Careers Spotlight: Principal (MSN) */}
      <section id="careers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-imam-navy text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 flex items-center gap-1.5">
              <Briefcase size={14} /> Immediate Academic Opening 2026
            </span>
            <span className="text-xs font-bold text-slate-400">
              Main Campus, Jacobabad, Sindh
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {INSTITUTIONAL_DATA.careers.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {INSTITUTIONAL_DATA.careers.description}
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span><strong>Eligibility:</strong> {INSTITUTIONAL_DATA.careers.qualification}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span><strong>Experience:</strong> {INSTITUTIONAL_DATA.careers.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span><strong>Package:</strong> Attractive executive salary with housing and clinical allowances.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                  Application Route
                </span>
                <div className="text-xs font-bold text-white mt-1">
                  Direct Review by Executive Leadership
                </div>
              </div>

              <button
                onClick={() => openJobDrawer('Principal (MSN)')}
                className="w-full py-3.5 rounded-xl bg-imam-red hover:bg-[#C2040F] text-white font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Apply for Principal Position</span>
                <ArrowRight size={14} />
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                Applications forward directly to the Owner &amp; HR Dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements & Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-imam-blue">
            Academic Chronicle
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Announcements &amp; Scientific Seminars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-imam-blue bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {ann.badge}
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Calendar size={13} /> {ann.date}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">{ann.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {ann.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Campus Labs & Highlights Slider */}
      <CampusLabsShowcase />
    </div>
  );
}

export default function NewsCareersPage() {
  return (
    <PublicWebsiteShell>
      <NewsCareersContent />
    </PublicWebsiteShell>
  );
}
