'use client';

import React from 'react';
import Link from 'next/link';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import { usePublicWebsite } from '@/components/public/PublicWebsiteContext';
import { ClinicalHospitalsCarousel } from '@/components/public/ClinicalHospitalsCarousel';
import { ClinicalTriageSimulator } from '@/components/public/ClinicalTriageSimulator';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  Stethoscope,
  Building2,
  BedDouble,
  Activity,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';

function ClinicalTrainingContent() {
  const { openApply } = usePublicWebsite();
  const partners = INSTITUTIONAL_DATA.clinicalPartners;

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-3">
            Hands-on Bedside Experience
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Clinical Training &amp; Hospital Rotations
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Experience high-volume bedside nursing care across four premier teaching hospitals in Jacobabad and Sukkur.
          </p>
        </div>
      </section>

      {/* 4 Partners Carousel */}
      <ClinicalHospitalsCarousel />

      {/* Comprehensive 4 Hospitals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-imam-blue">
            Partner Facilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Detailed Hospital Profiles &amp; Capacity
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-lg transition space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-imam-blue bg-blue-50 px-3 py-1 rounded-md">
                  {p.badge}
                </span>
                <span className="text-sm font-black text-emerald-700 font-mono">
                  {p.beds}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">{p.name}</h3>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  {p.city}, Sindh · {p.type}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {p.description}
              </p>

              <div className="space-y-1.5 pt-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Training Specialties:
                </div>
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clinical Simulator */}
      <ClinicalTriageSimulator />

      {/* ERP Integration Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Real-Time Clinical Telemetry
            </span>
            <h3 className="text-2xl font-black text-white">
              Connected to Imam Medical Center Live Triage
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Our students and preceptors utilize the live Antigravity ERP Triage module inside emergency and inpatient wards for computerized NEWS2 calculation and OSPE logbook verification.
            </p>
          </div>

          <Link
            href="/triage"
            className="px-6 py-3.5 rounded-xl bg-imam-blue hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm transition flex items-center gap-2 shrink-0 shadow-md"
          >
            <span>Launch Triage in ERP</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function ClinicalTrainingPage() {
  return (
    <PublicWebsiteShell>
      <ClinicalTrainingContent />
    </PublicWebsiteShell>
  );
}
