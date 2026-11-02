'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  GraduationCap,
  Award,
  Stethoscope,
  ShieldCheck,
  Mail,
  Phone,
  Search,
  Filter,
  CheckCircle2,
  Building,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  category: 'EXECUTIVE' | 'NURSING' | 'PARAMEDICAL' | 'CLINICAL';
  qualification: string;
  pncLicenseNo?: string;
  experience: string;
  department: string;
  specialization: string;
  bio: string;
}

const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'abid',
    name: 'Dr. Abid Hussain Soomro',
    designation: 'Chief Executive Officer',
    category: 'EXECUTIVE',
    qualification: 'MBBS, MPH — Healthcare Leadership & Health Systems',
    experience: '22+ Years in Medical Education & Hospital Governance',
    department: 'Executive Board',
    specialization: 'Public Health, Health Systems Management, Institutional Governance',
    bio: 'Dedicated medical educator and healthcare executive driving nursing workforce expansion and quality clinical accreditation across Northern Sindh.',
  },
  {
    id: 'sajid',
    name: 'Mr. Sajid Hussain',
    designation: 'Chairman & Managing Director',
    category: 'EXECUTIVE',
    qualification: 'BBA (Hons), MBA (Executive)',
    experience: '18+ Years Enterprise Education Management',
    department: 'Board of Governors',
    specialization: 'Strategic Institutional Expansion, Fiscal Planning & Scholarships',
    bio: 'Pioneered the 100% Free Paramedical Admissions Initiative and oversaw statutory affiliations with PNMC and SMBBMU Larkana.',
  },
  {
    id: 'hamid',
    name: 'Dr. Hamid Hussain',
    designation: 'Medical Superintendent & Clinical Director',
    category: 'CLINICAL',
    qualification: 'MBBS, FCPS (Surgery Part-1), Dip. Hospital Administration',
    experience: '16+ Years Clinical Practice & Hospital Operations',
    department: 'Imam Medical Center (IMC)',
    specialization: 'Emergency Trauma Triage, Clinical Preceptorship, Acute Care',
    bio: 'Oversees bedside clinical clerkships and ensures strict 1:6 student nurse-to-preceptor bedside supervision ratios at Imam Medical Center.',
  },
  {
    id: 'vinod',
    name: 'Vinod Kumar',
    designation: 'Principal & Professor of Nursing',
    category: 'NURSING',
    qualification: 'MSN (Master of Science in Nursing), BSN, RN',
    pncLicenseNo: 'PNC-RN-88421-SN (Active)',
    experience: '14+ Years Higher Nursing Education & Research',
    department: 'Department of Nursing Sciences',
    specialization: 'Adult Health Nursing, Nursing Pedagogy, PNC Curriculum Standards',
    bio: 'Executive academic lead authoring semester timetables, faculty peer review, and University examination coordination with SMBBMU Larkana.',
  },
  {
    id: 'zahid',
    name: 'Zahid Abbasi',
    designation: 'Vice Principal & Senior Clinical Preceptor',
    category: 'NURSING',
    qualification: 'BSN (Post-RN), RN, RM, Critical Care Specialist',
    pncLicenseNo: 'PNC-RN-77319-SN (Active)',
    experience: '11+ Years Critical Care Nursing & Skills Lab Training',
    department: 'Department of Nursing & Skills Lab',
    specialization: 'Critical Care, Medical-Surgical Nursing, Bedside OSCE Evaluation',
    bio: 'Head of Clinical Examination Board and certified preceptor verifying student competency logbooks and procedural bedside asepsis.',
  },
  {
    id: 'mansab',
    name: 'Mir Mansab',
    designation: 'Assistant Professor & Lab Lead',
    category: 'NURSING',
    qualification: 'BSN (Generic), Diploma in Healthcare Administration',
    pncLicenseNo: 'PNC-RN-99214-SN (Active)',
    experience: '8+ Years Anatomy & Skills Lab Pedagogy',
    department: 'Department of Nursing Sciences',
    specialization: 'Fundamentals of Nursing (FON), Anatomy & Physiology, Pathophysiology',
    bio: 'Directs the Anatomy Museum, high-fidelity mannequin simulators, and initial clinical skill drills prior to hospital ward placement.',
  },
  {
    id: 'alinawaz',
    name: 'Ali Nawaz',
    designation: 'Nursing Lecturer & Community Health Lead',
    category: 'NURSING',
    qualification: 'BSN (Generic), Diploma in Community Health',
    pncLicenseNo: 'PNC-RN-10492-SN (Active)',
    experience: '7+ Years Primary Healthcare & Epidemiology',
    department: 'Department of Nursing Sciences',
    specialization: 'Community Health Nursing (CHN), EPI Immunization, Preventive Medicine',
    bio: 'Coordinates rural community outreach clinics and school health camps in Jacobabad and surrounding districts.',
  },
  {
    id: 'shahzadi',
    name: 'Shahzadi Begum',
    designation: 'Senior Midwifery Instructor',
    category: 'NURSING',
    qualification: 'Diploma in Midwifery (RM), Post-Basic Maternal & Neonatal Health',
    pncLicenseNo: 'PNC-RM-66281-SN (Active)',
    experience: '12+ Years Labor Room & Antenatal Care',
    department: 'Maternal & Neonatal Healthcare',
    specialization: 'Midwifery, Normal & Complicated Deliveries, Antenatal Triage',
    bio: 'Specialist preceptor supervising obstetrics and neonatal clinical clerkships at Civil Hospital Jacobabad and Imam Medical Center.',
  },
  {
    id: 'sultana',
    name: 'Dr. Farhana Sultana',
    designation: 'Visiting Professor of Pathology & Biochemistry',
    category: 'PARAMEDICAL',
    qualification: 'MBBS, M.Phil (Pathology)',
    experience: '10+ Years Diagnostic Pathology & Lab Sciences',
    department: 'Allied Paramedical Sciences',
    specialization: 'Hematology, Blood Banking, Clinical Biochemistry',
    bio: 'Teaches laboratory technology, safe blood transfusion protocols, and clinical microbiology for nursing and paramedical students.',
  },
  {
    id: 'kamran',
    name: 'Engr. Kamran Ali',
    designation: 'Senior Radiography Lecturer',
    category: 'PARAMEDICAL',
    qualification: 'BS Radiography & Imaging Technology',
    experience: '9+ Years Medical Diagnostic Imaging',
    department: 'Allied Paramedical Sciences',
    specialization: 'Digital X-Ray Radiography, Radiation Safety, CT Protocols',
    bio: 'Conducts digital X-ray workshops, darkroom film processing drills, and radiation protection coursework.',
  },
];

export default function FacultyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaculty = FACULTY_MEMBERS.filter((f) => {
    const matchesCategory = selectedCategory === 'ALL' || f.category === selectedCategory;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PublicWebsiteShell>
      <div className="space-y-16 pb-20">
        {/* Header Hero */}
        <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-3">
              Distinguished Academic Leadership
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Faculty &amp; Executive Management
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Meet our team of licensed nursing educators, clinical preceptors, physician consultants, and academic administrators dedicated to healthcare training in Sindh.
            </p>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'ALL'
                    ? 'bg-imam-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Faculty ({FACULTY_MEMBERS.length})
              </button>
              <button
                onClick={() => setSelectedCategory('EXECUTIVE')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'EXECUTIVE'
                    ? 'bg-imam-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Executive Board
              </button>
              <button
                onClick={() => setSelectedCategory('NURSING')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'NURSING'
                    ? 'bg-imam-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Nursing Educators (BSN)
              </button>
              <button
                onClick={() => setSelectedCategory('CLINICAL')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'CLINICAL'
                    ? 'bg-imam-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Clinical Preceptors
              </button>
              <button
                onClick={() => setSelectedCategory('PARAMEDICAL')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'PARAMEDICAL'
                    ? 'bg-imam-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Paramedical Faculty
              </button>
            </div>

            <div className="relative w-full md:w-64">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search faculty name, specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-imam-blue/20"
              />
            </div>
          </div>

          {/* Faculty Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredFaculty.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-imam-blue/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {member.department}
                    </span>
                    {member.pncLicenseNo && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck size={11} /> PNC Verified
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs font-extrabold text-imam-blue mt-0.5">
                    {member.designation}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                    <strong>Qualification:</strong> {member.qualification}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">
                        Experience &amp; Track Record
                      </span>
                      <span>{member.experience}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">
                        Clinical Domain / Specialization
                      </span>
                      <span className="text-slate-800 font-medium">{member.specialization}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                    &ldquo;{member.bio}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Building size={12} className="text-slate-400" /> Jacobabad Campus
                  </span>
                  <Link
                    href="/contact"
                    className="text-imam-blue hover:text-imam-navy font-bold flex items-center gap-1 text-[11px]"
                  >
                    Office Hours →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicWebsiteShell>
  );
}
