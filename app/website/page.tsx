'use client';

import React from 'react';
import Link from 'next/link';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import { usePublicWebsite } from '@/components/public/PublicWebsiteContext';
import { HeroCinemaSlideshow } from '@/components/public/HeroCinemaSlideshow';
import { AccreditationMarquee } from '@/components/public/AccreditationMarquee';
import { ClinicalHospitalsCarousel } from '@/components/public/ClinicalHospitalsCarousel';
import { CampusLabsShowcase } from '@/components/public/CampusLabsShowcase';
import { MeritScholarshipCalculator } from '@/components/public/MeritScholarshipCalculator';
import { ClinicalTriageSimulator } from '@/components/public/ClinicalTriageSimulator';
import { CampusErpSection } from '@/components/public/CampusErpSection';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  GraduationCap,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Users,
  Briefcase,
  HelpCircle,
  FileCheck2,
  Stethoscope,
  HeartPulse,
} from 'lucide-react';

function HomePageContent() {
  const { openApply, openVerifySlip, openCounselor, openJobDrawer, openWaitlist } =
    usePublicWebsite();

  const programs = INSTITUTIONAL_DATA.programs;
  const degreePrograms = programs.filter((p) => p.category === 'degree');
  const paramedicalPrograms = programs.filter((p) => p.category === 'paramedical');
  const upcomingPrograms = programs.filter((p) => p.category === 'upcoming');

  return (
    <>
      {/* 1. Masterpiece Full-Viewport Hero Cinema Slideshow (5 Story-Driven Slides) */}
      <HeroCinemaSlideshow
        onOpenApply={openApply}
        onOpenCalculator={() => {
          const el = document.getElementById('merit-calculator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Infinite Dual-Ribbon Accreditation Marquee */}
      <AccreditationMarquee />

      {/* 3. High-Impact Institutional Metrics & Campus Pulse */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-imam-blue/30 transition">
              <div className="text-3xl sm:text-4xl font-black text-imam-blue font-mono">
                {INSTITUTIONAL_DATA.metrics.studentsEnrolled}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wide">
                Students Enrolled
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Across Degree &amp; Paramedical Tracks
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-imam-blue/30 transition">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                {INSTITUTIONAL_DATA.metrics.yearsExcellence}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wide">
                Years of Excellence
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Founded 2019 in Jacobabad, Sindh
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-imam-blue/30 transition">
              <div className="text-3xl sm:text-4xl font-black text-imam-red font-mono">
                {INSTITUTIONAL_DATA.metrics.qualifiedFaculty}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wide">
                Qualified Faculty
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                MSN, MBBS &amp; Certified Preceptors
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-imam-blue/30 transition">
              <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">
                {INSTITUTIONAL_DATA.metrics.clinicalBeds}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wide">
                Hospital Beds
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                JIMS (133-Bed) &amp; Imam Medical Center
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Academic Programs Showcase Section */}
      <section id="academic-programs" className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-imam-blue text-xs font-bold mb-3">
              <GraduationCap size={14} /> Admissions Fall Session 2026–27
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Academic Degree &amp; Paramedical Programs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Choose between our university-affiliated 4-Year BS Nursing degree or 9 career-ready paramedical technician diplomas with zero tuition fee under our Free Admissions Initiative.
            </p>
          </div>

          {/* Flagship BS Nursing Hero Card */}
          {degreePrograms.map((program) => (
            <div
              key={program.code}
              className="bg-white rounded-3xl border-2 border-imam-blue/30 p-6 sm:p-10 shadow-xl mb-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-l from-imam-blue to-transparent w-48 h-12 pointer-events-none opacity-10" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-imam-blue bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                  Flagship University Degree · Most Enrolled
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Admissions Open 2026–27</span>
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {program.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-semibold">
                    <span className="text-imam-blue font-bold">{program.duration}</span>
                    <span>•</span>
                    <span>{program.affiliation}</span>
                    <span>•</span>
                    <span>Direct House Job at GMMMC Sukkur</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {program.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 size={15} className="text-imam-blue shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                      Eligibility Requirement
                    </span>
                    <div className="text-xs font-bold text-slate-800 mt-1">
                      {program.eligibility}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                      Affiliation &amp; Recognition
                    </span>
                    <div className="text-xs font-bold text-imam-navy mt-1">
                      PNMC Registered · SMBBMU Larkana
                    </div>
                  </div>

                  <button
                    onClick={() => openApply(program.code)}
                    className="w-full py-3 rounded-xl bg-imam-blue hover:bg-imam-navy text-white font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Apply Online for BS Nursing</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* 9 Paramedical Diplomas Grid with Free Admissions Badge */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Award size={22} className="text-imam-red" />
                  9 One-Year Paramedical Technician Diplomas
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Certified by Sindh Medical Faculty (SMF) Karachi &amp; STEVTA
                </p>
              </div>
              <span className="hidden sm:inline-block text-xs font-black px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                100% Free Admissions Initiative
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paramedicalPrograms.map((p) => (
                <div
                  key={p.code}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-imam-red/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Free Admission
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        {p.duration}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900">{p.name}</h4>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="text-[11px] font-medium text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg">
                      Eligibility: {p.eligibility}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-imam-red">
                      SMF Karachi
                    </span>
                    <button
                      onClick={() => openApply(p.code)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-imam-red hover:text-white text-slate-800 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Apply</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Nursing Pathways Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-[#062B54] text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  Upcoming Department of Nursing Pathways
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  Community Midwifery (CMW) · Lady Health Visitor (LHV) · CNA
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Expanding access to specialized maternal, neonatal, and primary community care across Jacobabad and northern Sindh. Register to receive priority alerts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {upcomingPrograms.map((p) => (
                  <button
                    key={p.code}
                    onClick={() => openWaitlist(p.code)}
                    className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold transition cursor-pointer"
                  >
                    {p.code} Alert
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-Stage Clinical Training Carousel */}
      <ClinicalHospitalsCarousel
        onOpenTriageSimulator={() => {
          const el = document.getElementById('triage-simulator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. Campus Labs & Simulation Museum Showcase */}
      <CampusLabsShowcase />

      {/* 7. Smart Merit & Scholarship Calculator */}
      <MeritScholarshipCalculator onOpenApply={openApply} />

      {/* 8. Clinical Triage Bedside Mini-Simulator */}
      <ClinicalTriageSimulator />

      {/* 9. Integrated Campus Management ERP & Portals Hub */}
      <CampusErpSection />

      {/* 9. Leadership & CEO Spotlight (Dr. Abid Hussain Soomro) */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 text-center lg:text-left space-y-4">
                <div className="w-24 h-24 rounded-2xl bg-imam-navy text-white flex items-center justify-center font-black text-3xl mx-auto lg:mx-0 shadow-lg">
                  AS
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {INSTITUTIONAL_DATA.leadership.ceo.name}
                  </h3>
                  <div className="text-xs font-extrabold text-imam-blue mt-0.5">
                    {INSTITUTIONAL_DATA.leadership.ceo.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {INSTITUTIONAL_DATA.leadership.ceo.credentials}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Executive Message from Leadership
                </div>
                <blockquote className="text-base sm:text-lg text-slate-800 font-medium italic leading-relaxed">
                  &ldquo;{INSTITUTIONAL_DATA.leadership.ceo.quote} At Imam Institute of Nursing &amp; Allied Health Sciences, our mandate extends beyond textbooks. We are dedicated to cultivating compassionate bedside clinicians, equipping them with rigorous clinical training at Imam Medical Center and JIMS 133-bed hospital, and transforming healthcare outcomes across Sindh.&rdquo;
                </blockquote>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                  <span className="font-bold text-slate-700">Campus Administration:</span>
                  <span className="text-slate-500">Established 2019 · Jacobabad</span>
                  <span>•</span>
                  <span className="text-slate-500">Admissions Helpline: {INSTITUTIONAL_DATA.contact.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Careers Spotlight: Hiring Principal (MSN) */}
      <section className="py-12 bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Briefcase size={14} /> Immediate Academic Leadership Vacancy
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {INSTITUTIONAL_DATA.careers.title}
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {INSTITUTIONAL_DATA.careers.qualification}. {INSTITUTIONAL_DATA.careers.experience}. Main Campus Jacobabad, Sindh.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openJobDrawer('Principal (MSN)')}
                className="px-6 py-3 rounded-xl bg-imam-red hover:bg-[#C2040F] text-white font-extrabold text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                Apply for Principal
              </button>
              <Link
                href="/news-careers"
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition"
              >
                All Vacancies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function PublicHomePage() {
  return (
    <PublicWebsiteShell>
      <HomePageContent />
    </PublicWebsiteShell>
  );
}
