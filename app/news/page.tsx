'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import { usePublicWebsite } from '@/components/public/PublicWebsiteContext';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  Bell,
  Calendar,
  FileText,
  Briefcase,
  GraduationCap,
  Stethoscope,
  Award,
  ChevronRight,
  ExternalLink,
  Download,
  Search,
  Filter,
  Building2,
  Sparkles,
} from 'lucide-react';

function NewsAnnouncementsContent() {
  const { openApply, openJobDrawer } = usePublicWebsite();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const announcements = [
    {
      id: 'news-01',
      title: 'Fall 2026 Admissions Open: BS Nursing Generic (4 Years) & 9 Paramedical Diplomas',
      category: 'ADMISSIONS',
      date: 'October 28, 2026',
      badge: 'High Priority',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      summary: 'Applications are formally invited for eligible male and female candidates for BS Nursing (Generic) affiliated with SMBBMU Larkana and recognized by Pakistan Nursing & Midwifery Council (PNMC). Paramedical diplomas offered under the 100% Free Admissions Initiative.',
      cta: 'Apply Online',
      ctaAction: () => openApply('BSN'),
      details: [
        'BSN Eligibility: F.Sc Pre-Medical (Minimum 50% Marks)',
        'Age Limit: 17 to 35 Years',
        'Entry Test Date: Sunday, 15th November 2026',
        'Admit Slip verification active on web portal',
      ],
    },
    {
      id: 'news-02',
      title: 'Academic Notice: SMBBMU Larkana Semester Examination Date Sheet Announced',
      category: 'ACADEMICS',
      date: 'October 24, 2026',
      badge: 'Academic Circular',
      badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      summary: 'Shaheed Mohtarma Benazir Bhutto Medical University (SMBBMU) Larkana has released the tentative schedule for BSN Generic Semester II & IV final theory and OSPE clinical examinations.',
      cta: 'View Timetable & DMC',
      link: '/erp?role=student&tab=student',
      details: [
        'Theory Examinations commence at Main Exam Hall LH-01',
        'Clinical OSPE to be conducted at JIMS & IMC Skills Labs',
        'Mandatory 85% attendance compliance required for admit card release',
      ],
    },
    {
      id: 'news-03',
      title: 'Career Opportunity: Academic Principal / Professor of Nursing (MSN Required)',
      category: 'CAREERS',
      date: 'October 20, 2026',
      badge: 'Urgent Hiring',
      badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      summary: 'Imam Institute of Nursing & Allied Health Sciences invites applications from visionary nursing educationists for the executive post of Principal (Professor of Nursing) for our Jacobabad campus.',
      cta: 'View Job Details & Apply',
      ctaAction: () => openJobDrawer && openJobDrawer(),
      details: [
        'Qualification: Master of Science in Nursing (MSN) or Ph.D. in Nursing',
        'Experience: Minimum 5 to 7 years in nursing academic administration',
        'Attractive executive compensation with clinical allowance and campus residence',
      ],
    },
    {
      id: 'news-04',
      title: 'Clinical Affiliation Update: IMC Emergency & JIMS 133-Bed Hospital Ward Postings',
      category: 'CLINICAL',
      date: 'October 15, 2026',
      badge: 'Clinical Notice',
      badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
      summary: 'Batch 2024 Semester 4 clinical ward rotation schedule for Pediatric, ICU, and Emergency Triage units has been finalized. Preceptor Sister Farzana to oversee bedside skills sign-offs.',
      cta: 'Clinical Governance Desk',
      link: '/clinical-training',
      details: [
        'Strict 1:6 Clinical Preceptor to Student supervision ratio enforced',
        'Digital case logbook entries must be recorded within 24 hours of bedside rounds',
        'Mandatory PPE and hospital ID badges required in IMC triage corridors',
      ],
    },
    {
      id: 'news-05',
      title: 'Sindh Medical Faculty (SMF) Inspection: Paramedical Training Labs Certified',
      category: 'STATUTORY',
      date: 'October 10, 2026',
      badge: 'Accreditation',
      badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      summary: 'Delegation from Sindh Medical Faculty Karachi visited the campus facilities including Pathology, X-Ray, ICU, and Dental labs, expressing high satisfaction with training infrastructure.',
      cta: 'View Accreditations',
      link: '/about#accreditations',
      details: [
        'All 9 paramedical diploma curricula verified under official SMF syllabus',
        '100% Free Admissions seat quota re-confirmed for underprivileged youth of Northern Sindh',
      ],
    },
  ];

  const categories = [
    { id: 'ALL', label: 'All News & Circulars' },
    { id: 'ADMISSIONS', label: 'Admissions' },
    { id: 'ACADEMICS', label: 'Academics & Exams' },
    { id: 'CAREERS', label: 'Careers' },
    { id: 'CLINICAL', label: 'Clinical Hospital' },
    { id: 'STATUTORY', label: 'Regulatory & SMF' },
  ];

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-flex items-center gap-2 mb-3">
            <Bell size={13} className="text-amber-400" />
            <span>Official Institutional Circulars &amp; Press Desk</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            News, Notifications &amp; Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed max-w-2xl mx-auto">
            Stay informed with verified notifications from the Academic Dean, Controller of Examinations, Clinical Affiliation Directorates, and Executive Leadership.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filter Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search circulars, exams, admissions..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-imam-blue transition"
              />
            </div>

            <div className="text-xs font-bold text-slate-500">
              Showing <strong>{filteredAnnouncements.length}</strong> official circulars
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-imam-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition group"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                    <Calendar size={13} />
                    {item.date}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Ref: II-CIRCULAR-{item.id}</span>
              </div>

              <h2 className="text-base sm:text-xl font-black text-slate-900 group-hover:text-imam-blue transition">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                {item.summary}
              </p>

              {/* Specific Bullet Points */}
              {item.details && (
                <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  {item.details.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-imam-blue font-bold">›</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                {item.link ? (
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-imam-blue hover:text-white text-slate-800 text-xs font-bold transition"
                  >
                    <span>{item.cta}</span>
                    <ChevronRight size={14} />
                  </Link>
                ) : item.ctaAction ? (
                  <button
                    onClick={item.ctaAction}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-imam-blue text-white hover:bg-blue-600 text-xs font-bold transition cursor-pointer shadow-sm"
                  >
                    <span>{item.cta}</span>
                    <ChevronRight size={14} />
                  </button>
                ) : null}

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Building2 size={13} /> Main Campus Jacobabad
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <p className="text-sm font-bold text-slate-600">No circulars matched your search criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-bold text-imam-blue underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <PublicWebsiteShell>
      <NewsAnnouncementsContent />
    </PublicWebsiteShell>
  );
}
