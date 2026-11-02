'use client';

import React from 'react';
import Link from 'next/link';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import {
  Building2,
  Stethoscope,
  HeartPulse,
  Laptop,
  BookOpen,
  Bus,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  Sparkles,
} from 'lucide-react';

export default function FacilitiesPage() {
  const facilities = [
    {
      id: 'skills-lab',
      title: 'High-Fidelity Nursing Skills & Simulation Lab',
      category: 'Clinical Practical Training',
      badge: 'PNC Standard Approved',
      icon: HeartPulse,
      color: 'bg-rose-600',
      description:
        'Equipped with full-body adult and pediatric simulation manikins, computerized vital sign telemetry, IV cannulation practice arms, and crash-cart resuscitation stations. Students master aseptic techniques before entering live hospital wards.',
      specs: [
        'Advanced CPR & ACLS training manikins with compression feedback',
        'Multi-station IV infusion, intramuscular injection & blood sampling arms',
        'Foley catheterization, nasogastric tube insertion & wound dressing models',
        'Authentic hospital electric beds with oxygen and suction wall consoles',
      ],
    },
    {
      id: 'anatomy-museum',
      title: 'Human Anatomy & Histology Museum',
      category: 'Basic Medical Sciences',
      badge: 'SMBBMU Affiliated',
      icon: Stethoscope,
      color: 'bg-blue-600',
      description:
        'A comprehensive collection of anatomical organ casts, 3D articulated human skeletons, and high-resolution histology microscopes. Essential for Year-1 Anatomy & Physiology curricula across BSN and paramedical disciplines.',
      specs: [
        'Full-scale adult human skeletal models with muscular origin/insertion markings',
        'Sectional neuroanatomy, cardiovascular, and respiratory 3D models',
        'Binocular compound microscopes with digital specimen cameras',
        'Extensive histology slide library for tissue and organ morphology study',
      ],
    },
    {
      id: 'computer-library',
      title: 'Digital Computer Center & HEC E-Library',
      category: 'Digital Learning & Research',
      badge: 'Online Resource Hub',
      icon: Laptop,
      color: 'bg-indigo-600',
      description:
        'Features 40+ modern networked computer terminals with high-speed fiber-optic internet, direct access to the Higher Education Commission (HEC) National Digital Library, and simulated NCLEX / PNC examination software.',
      specs: [
        '40+ modern PC workstations with dedicated fiber-optic broadband',
        'Online access to PubMed, ScienceDirect, and international nursing journals',
        'Digital question bank for PNC licensing and University semester exams',
        'Spacious reading tables with individual power outlets and Wi-Fi access',
      ],
    },
    {
      id: 'lecture-halls',
      title: 'Multimedia Tiered Lecture Theaters',
      category: 'Academic Classrooms',
      badge: 'Climate-Controlled',
      icon: Building2,
      color: 'bg-amber-600',
      badgeText: 'Smart Audiovisual',
      description:
        'Air-conditioned lecture halls (LH-01, LH-02, LH-03) designed with stepped acoustic seating, high-lumen digital ceiling projectors, smart interactive screens, and wireless presentation systems for interactive clinical case presentations.',
      specs: [
        'Stepped amphitheater seating accommodating up to 75 students per hall',
        'Interactive smart digital whiteboards and dual-display ceiling projectors',
        'Acoustically treated walls with wireless lapel microphones for professors',
        'Backup solar and generator power ensuring uninterrupted academic sessions',
      ],
    },
    {
      id: 'imc-hospital',
      title: 'Imam Medical Center (Sister Teaching Hospital)',
      category: 'On-Site Clinical Base',
      badge: '50+ Inpatient Beds',
      icon: Stethoscope,
      color: 'bg-emerald-600',
      description:
        'Our affiliated hospital located in Jacobabad, delivering round-the-clock emergency care, inpatient medical-surgical nursing, maternal deliveries, and outpatient consultations under senior preceptor guidance.',
      specs: [
        '24/7 Emergency trauma resuscitation and triage department',
        'Fully equipped 4-bed Intensive Care Unit (ICU) with mechanical ventilators',
        'Sterile major and minor operating theater complex',
        'Digital X-Ray radiography suite and computerized clinical lab',
      ],
    },
    {
      id: 'jims-hospital',
      title: 'Jacobabad Institute of Medical Sciences (JIMS)',
      category: 'Tertiary Clinical Partner',
      badge: '133-Bed Hospital',
      icon: Building2,
      color: 'bg-sky-700',
      description:
        'A modern 133-bed tertiary hospital partnered with Imam Institute to provide extensive ward rotations in pediatric medicine, surgical interventions, advanced radiology, and clinical pathology.',
      specs: [
        '133 functional inpatient beds across surgical, medical, and pediatric wings',
        'High-volume outpatient clinics exposing students to diverse medical cases',
        'Dedicated clinical preceptors coordinating daily bedside patient assignments',
        'PNC mandatory 85% clinical ward attendance tracking',
      ],
    },
    {
      id: 'hostel',
      title: 'Female Nursing Hostel & Secure Campus',
      category: 'Student Accommodation',
      badge: '24/7 Biometric Security',
      icon: ShieldCheck,
      color: 'bg-purple-600',
      description:
        'Safe, furnished, on-campus residential facility for female nursing scholars from across Sindh and Balochistan, offering full-time female warden supervision, hygienic dining, study lounges, and biometric security.',
      specs: [
        'Furnished dormitories with individual study desks and storage lockers',
        'Hygienic institutional mess serving freshly prepared nutritious meals',
        '24/7 female warden in residence, CCTV surveillance, and boundary wall security',
        'Recreational indoor hall, prayer room, and dedicated study commons',
      ],
    },
    {
      id: 'transport',
      title: 'Dedicated Student Transport Fleet',
      category: 'Campus Logistics',
      badge: 'Regional Routes',
      icon: Bus,
      color: 'bg-teal-600',
      description:
        'Fleet of reliable institute buses and vans providing safe, punctual commuting for students between residence, Jacobabad campus, and external clinical training hospitals across Jacobabad and neighboring districts.',
      specs: [
        'Scheduled morning, afternoon, and clinical night shift pick-and-drop service',
        'Covering Jacobabad, Shikarpur, Thul, and Kandhkot catchment areas',
        'Professional licensed drivers with live mobile fleet tracking',
        'Heavily subsidized transport pass for all registered nursing students',
      ],
    },
  ];

  return (
    <PublicWebsiteShell>
      <div className="space-y-16 pb-20">
        {/* Header Hero */}
        <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-3">
              Campus Infrastructure
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              State-of-the-Art Facilities &amp; Labs
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Explore our modern simulation laboratories, anatomy museum, multimedia lecture halls, affiliated teaching hospitals, and secure female hostel accommodation.
            </p>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((f) => {
              const Icon = f.icon;

              return (
                <div
                  key={f.id}
                  id={f.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl ${f.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                            {f.category}
                          </span>
                          <span className="text-xs font-extrabold text-imam-blue">
                            {f.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h2 className="text-xl font-black text-slate-900 leading-snug">
                      {f.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {f.description}
                    </p>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 mt-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Facility Specifications &amp; Features:
                      </span>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {f.specs.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Location: Jacobabad Main Campus
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-imam-blue hover:text-imam-navy"
                    >
                      <span>Book a Campus Tour</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PublicWebsiteShell>
  );
}
