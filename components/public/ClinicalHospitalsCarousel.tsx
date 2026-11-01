'use client';

import React, { useState } from 'react';
import { INSTITUTIONAL_DATA, ClinicalPartner } from '@/lib/institutional-data';
import {
  Building2,
  BedDouble,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Stethoscope,
  Activity,
  Award,
  ArrowRight,
} from 'lucide-react';

interface ClinicalHospitalsCarouselProps {
  onOpenTriageSimulator?: () => void;
}

export const ClinicalHospitalsCarousel: React.FC<ClinicalHospitalsCarouselProps> = ({
  onOpenTriageSimulator,
}) => {
  const partners = INSTITUTIONAL_DATA.clinicalPartners;
  const [activeIdx, setActiveIdx] = useState(0);

  const activePartner = partners[activeIdx];

  return (
    <section id="clinical-training" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-imam-blue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-imam-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-3">
            <Stethoscope size={14} /> 4-Stage Clinical Rotation Network
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Learn Where Real Care Happens
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            From supervised on-campus drills at Imam Medical Center to tertiary ICU rounds at JIMS 133-bed hospital and graduate House Job postings at GMMMC Sukkur.
          </p>
        </div>

        {/* 4-Stage Connected Progress Pathway Header */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
            {partners.map((partner, index) => {
              const isActive = index === activeIdx;
              return (
                <button
                  key={partner.id}
                  onClick={() => setActiveIdx(index)}
                  className={`text-left p-3 rounded-2xl transition-all border relative cursor-pointer ${
                    isActive
                      ? 'bg-imam-blue text-white border-blue-400 shadow-lg shadow-blue-900/50 scale-[1.02]'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                    <span className="opacity-75">Stage 0{index + 1}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 font-mono">
                      {partner.beds}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold truncate">
                    {partner.shortName}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Feature Card Showcase */}
        <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Partner Visual and Key Metrics */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-700 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-900/40 px-3 py-1 rounded-md border border-blue-800">
                  {activePartner.badge}
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-blue-400 flex items-center justify-center">
                  <Building2 size={20} />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">{activePartner.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <MapPin size={13} className="text-imam-red" />
                  <span>{activePartner.city}, Sindh</span>
                  <span>•</span>
                  <span className="text-blue-300 font-semibold">{activePartner.type}</span>
                </div>
              </div>

              {/* Bed Capacity Metric */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Hospital Capacity</div>
                  <div className="text-xl font-black text-emerald-400 font-mono">
                    {activePartner.beds}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-950/60 text-emerald-400 flex items-center justify-center">
                  <BedDouble size={20} />
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Clinical Training Focus
                </div>
                {activePartner.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Rotation Role & Pathway Context */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  Rotation Specialty &amp; Academic Role
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {activePartner.role}
                </h4>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activePartner.description}
              </p>

              {/* Structured Pathway Step Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-300 mb-1">
                    <Activity size={14} /> Bedside OSPE &amp; Logbook
                  </div>
                  <div className="text-xs text-slate-400">
                    Every procedure signed off live by qualified clinical preceptors and registered faculty.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                    <Award size={14} /> Career Pathway
                  </div>
                  <div className="text-xs text-slate-400">
                    Graduates qualify for SMBBMU House Job placements and competitive hospital recruitment.
                  </div>
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('admissions-portal');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-imam-blue hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm transition flex items-center gap-2"
                >
                  <span>Apply for Next Rotation Batch</span>
                  <ArrowRight size={14} />
                </button>

                {onOpenTriageSimulator && (
                  <button
                    onClick={onOpenTriageSimulator}
                    className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2"
                  >
                    <span>Launch Clinical Triage Simulator</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
