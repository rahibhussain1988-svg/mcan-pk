'use client';

import React from 'react';
import Link from 'next/link';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import {
  GraduationCap,
  Stethoscope,
  HeartPulse,
  Award,
  Users,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

export default function DepartmentsPage() {
  const departments = [
    {
      id: 'nursing',
      name: 'Department of Nursing Sciences',
      head: 'Vinod Kumar (Principal & Professor of Nursing)',
      headTitle: 'MSN, BSN, RN',
      icon: GraduationCap,
      color: 'bg-blue-600',
      badge: 'PNMC & SMBBMU Accredited',
      description:
        'The premier academic division of Imam Institute, delivering the 4-Year Bachelor of Science in Nursing (Generic) with intensive hospital bedside training, pharmacology, medical-surgical nursing, and community health.',
      programs: [
        'BS Nursing (Generic) — 4-Year Professional Degree',
        'Post-RN BSN (2-Year Degree Pathway)',
        'Certified Nursing Assistant (CNA) — Upcoming',
        'Community Midwifery (CMW) — Upcoming',
      ],
      features: [
        'Recognized by Pakistan Nursing & Midwifery Council (PNMC)',
        'Degree awarded by SMBBMU Larkana',
        '1:6 clinical bedside instructor supervision ratio',
        'Full access to JIMS 133-bed and Imam Medical Center wards',
      ],
    },
    {
      id: 'paramedical',
      name: 'Department of Allied Paramedical Sciences',
      head: 'Dr. Hamid Hussain (Clinical Director)',
      headTitle: 'MBBS, FCPS-I',
      icon: Award,
      color: 'bg-rose-600',
      badge: 'Sindh Medical Faculty (SMF) & STEVTA',
      description:
        'Home to the flagship 100% Free Admissions Initiative, providing 9 hands-on paramedical diplomas across diagnostic imaging, cardiac monitoring, critical care assistance, and operative surgery support.',
      programs: [
        'X-Ray Technician (1-Year Diploma)',
        'ECG & Cardiac Technician (1-Year Diploma)',
        'ICU & Critical Care Technician (1-Year Diploma)',
        'Physiotherapy Technician (1-Year Diploma)',
        'Pediatric (PEADS) Technician (1-Year Diploma)',
        'Dental & Anesthesia Technicians (1-Year Diplomas)',
      ],
      features: [
        '100% Free Tuition & Admissions for Northern Sindh Youth',
        'Live Darkroom & Digital X-Ray Console Drills',
        'Direct Clinical Clerkship at JIMS and Civil Hospital',
        'STEVTA and Sindh Medical Faculty Certification',
      ],
    },
    {
      id: 'simulation',
      name: 'Department of Clinical Skills & Simulation',
      head: 'Mir Mansab (Assistant Professor)',
      headTitle: 'BSN, RN',
      icon: HeartPulse,
      color: 'bg-emerald-600',
      badge: 'Advanced Skills Center',
      description:
        'A state-of-the-art practical laboratory environment equipped with high-fidelity anatomical models, IV infusion simulators, catheterization trainers, and computerized patient vitals monitoring.',
      programs: [
        'Fundamentals of Nursing (FON) Clinical Practicums',
        'Aseptic Procedural Techniques & Suture Drills',
        'High-Fidelity CPR & Advanced Cardiac Life Support (ACLS)',
        'Objective Structured Clinical Examination (OSCE) Stations',
      ],
      features: [
        'Computerized telemetry vital sign simulators',
        'Anatomy Museum with authentic skeletal & organ casts',
        'Mandatory skill clearance before bedside hospital rotation',
        'Dedicated audiovisual lecture demonstration theater',
      ],
    },
    {
      id: 'community',
      name: 'Department of Public Health & Community Nursing',
      head: 'Ali Nawaz (Lecturer & Outreach Lead)',
      headTitle: 'BSN, Dip. Community Health',
      icon: Users,
      color: 'bg-amber-600',
      badge: 'Community Outreach',
      description:
        'Focuses on preventative medicine, rural epidemiological field visits, maternal-neonatal healthcare, and expanded program on immunization (EPI) campaigns across Jacobabad, Kashmore, and Shikarpur.',
      programs: [
        'Community Health Nursing (CHN) Field Clerkships',
        'Epidemiological Household Surveys & School Health',
        'Maternal & Neonatal Home Health Interventions',
        'Infectious Disease Triage & Water Sanitation Workshops',
      ],
      features: [
        'Direct collaboration with Jacobabad District Health Office',
        'Mobile health clinic rotations in rural union councils',
        'Field-based nutritional screening for infants and mothers',
        'Free medication distribution and community awareness drives',
      ],
    },
    {
      id: 'hospital-services',
      name: 'Hospital Clinical Services (Imam Medical Center)',
      head: 'Dr. Hamid Hussain (Medical Superintendent)',
      headTitle: 'MBBS, Clinical Director',
      icon: Stethoscope,
      color: 'bg-indigo-600',
      badge: 'Primary Clinical Base',
      description:
        'The on-campus sister medical facility providing continuous 24/7 healthcare services to the region and serving as the primary bedside laboratory for nursing and allied health students.',
      programs: [
        'Emergency Trauma & Rapid NEWS2/ESI Bedside Triage',
        'Inpatient Medical-Surgical Nursing Rotations',
        'Intensive Care Unit (ICU) Student Preceptorship',
        'Outpatient Diagnostics & Digital Radiology Rotations',
      ],
      features: [
        '50+ Operational Inpatient Hospital Beds',
        'Dedicated Preceptors assigned per ward cohort',
        'Zero barrier between classroom theory and real patient care',
        'Strict PNC clinical attendance guardrail enforcement',
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
              Academic Infrastructure
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Academic &amp; Clinical Departments
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Explore our structured academic divisions, expert departmental heads, program curricula, and practical simulation laboratories.
            </p>
          </div>
        </section>

        {/* Departments List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {departments.map((dept, idx) => {
            const Icon = dept.icon;

            return (
              <div
                key={dept.id}
                id={dept.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${dept.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-imam-blue block">
                        {dept.badge}
                      </span>
                      <h2 className="text-xl font-black text-slate-900 leading-snug">
                        {dept.name}
                      </h2>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Department Leadership</span>
                    <strong className="text-slate-800 text-sm block mt-0.5">{dept.head}</strong>
                    <span className="text-slate-500 font-medium">{dept.headTitle}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/admissions"
                      className="inline-flex items-center gap-2 text-xs font-bold text-imam-blue hover:text-imam-navy transition"
                    >
                      <span>Explore Department Admissions &amp; Eligibility</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Right Columns: Programs & Highlights */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
                  {/* Programs */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <BookOpen size={14} className="text-imam-blue" />
                      Academic Courses Offered
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {dept.programs.map((p, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-medium">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-imam-blue" />
                      Department Features
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {dept.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-imam-blue shrink-0 mt-1.5" />
                          <span className="font-medium leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </PublicWebsiteShell>
  );
}
