'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import {
  Camera,
  Filter,
  Maximize2,
  X,
  Calendar,
  MapPin,
  Tag,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'CLINICAL' | 'LABS' | 'CAMPUS' | 'CEREMONY' | 'COMMUNITY';
  date: string;
  location: string;
  caption: string;
  badge: string;
  gradient: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Nursing Scholars White Coat & Capping Ceremony',
    category: 'CEREMONY',
    date: '14 October 2026',
    location: 'Main Auditorium, Jacobabad Campus',
    caption: 'Generic BSN students reciting the Florence Nightingale pledge during the formal annual White Coat induction.',
    badge: 'Annual Milestone',
    gradient: 'from-blue-600 via-indigo-700 to-slate-900',
  },
  {
    id: 'g-2',
    title: 'Bedside Emergency Triage Simulation at IMC',
    category: 'CLINICAL',
    date: '28 September 2026',
    location: 'Emergency Trauma Room, Imam Medical Center',
    caption: 'Student nurses executing rapid NEWS2 score sorting and telemetry monitor attachment under preceptor supervision.',
    badge: 'Clinical Drill',
    gradient: 'from-rose-600 via-red-700 to-slate-900',
  },
  {
    id: 'g-3',
    title: 'Fundamentals of Nursing IV Cannulation Practicum',
    category: 'LABS',
    date: '12 September 2026',
    location: 'High-Fidelity Nursing Skills Lab',
    caption: 'Semester-2 nursing scholars mastering aseptic skin prep and catheter advancement on vein simulator arms.',
    badge: 'Skills Training',
    gradient: 'from-emerald-600 via-teal-700 to-slate-900',
  },
  {
    id: 'g-4',
    title: 'Rural Community Health Camp in Jacobabad District',
    category: 'COMMUNITY',
    date: '05 August 2026',
    location: 'Union Council Mubarakpur, Jacobabad',
    caption: 'Free pediatric health screening, maternal nutritional counseling, and clean water awareness drive.',
    badge: 'Outreach Clinic',
    gradient: 'from-amber-600 via-orange-700 to-slate-900',
  },
  {
    id: 'g-5',
    title: 'Anatomy Museum Histology Slide Examination',
    category: 'LABS',
    date: '20 July 2026',
    location: 'Human Anatomy & Pathology Museum',
    caption: 'First-year BSN students analyzing cellular pathology slides under high-magnification binocular microscopes.',
    badge: 'Academic Science',
    gradient: 'from-cyan-600 via-blue-700 to-slate-900',
  },
  {
    id: 'g-6',
    title: 'Intensive Care Unit (ICU) Ward Rotations at JIMS',
    category: 'CLINICAL',
    date: '18 June 2026',
    location: 'JIMS 133-Bed Tertiary Hospital',
    caption: 'Senior BSN scholars monitoring mechanical ventilator circuits and arterial blood pressure telemetry.',
    badge: 'High-Acuity Care',
    gradient: 'from-purple-600 via-indigo-800 to-slate-900',
  },
  {
    id: 'g-7',
    title: 'Digital NCLEX / PNC Mock Examination in E-Library',
    category: 'CAMPUS',
    date: '02 June 2026',
    location: 'Digital Simulation Computer Lab',
    caption: 'Students practicing timed, computer-adaptive multiple choice simulations preparing for licensing exams.',
    badge: 'E-Learning',
    gradient: 'from-slate-700 via-slate-800 to-slate-950',
  },
  {
    id: 'g-8',
    title: 'Free Admissions Paramedical Orientation Day',
    category: 'CEREMONY',
    date: '15 May 2026',
    location: 'Campus Courtyard & Lecture Theaters',
    caption: 'Welcoming 200+ selected candidates for the 9 Free Paramedical Diplomas sponsored by institute management.',
    badge: 'Youth Empowerment',
    gradient: 'from-teal-600 via-emerald-700 to-slate-900',
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    return activeCategory === 'ALL' || item.category === activeCategory;
  });

  return (
    <PublicWebsiteShell>
      <div className="space-y-16 pb-20">
        {/* Header Hero */}
        <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-3">
              Campus Life &amp; Clinical Drills
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Institutional Photo Gallery
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Explore snapshots of student nurse training, bedside hospital ward rounds, high-fidelity simulation drills, and annual academic ceremonies.
            </p>
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeCategory === 'ALL'
                  ? 'bg-imam-blue text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Moments ({GALLERY_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveCategory('CLINICAL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeCategory === 'CLINICAL'
                  ? 'bg-imam-blue text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Hospital Clinical Training
            </button>
            <button
              onClick={() => setActiveCategory('LABS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeCategory === 'LABS'
                  ? 'bg-imam-blue text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Skills &amp; Anatomy Labs
            </button>
            <button
              onClick={() => setActiveCategory('CEREMONY')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeCategory === 'CEREMONY'
                  ? 'bg-imam-blue text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Ceremonies &amp; Convocations
            </button>
            <button
              onClick={() => setActiveCategory('COMMUNITY')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeCategory === 'COMMUNITY'
                  ? 'bg-imam-blue text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Community Outreach Clinics
            </button>
            <button
              onClick={() => setActiveCategory('CAMPUS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeCategory === 'CAMPUS'
                  ? 'bg-imam-blue text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Campus &amp; E-Library
            </button>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Visual Artwork Placeholder with Category Gradient */}
                  <div className={`h-48 bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between text-white relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                        {item.badge}
                      </span>
                      <Maximize2 size={16} className="text-white/70 group-hover:text-white transition" />
                    </div>

                    <div className="flex items-center gap-2">
                      <Camera size={20} className="text-white/80" />
                      <span className="text-[11px] font-bold text-white/90">View High-Res</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <Calendar size={12} />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-imam-blue transition leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1.5 mt-2">
                  <MapPin size={12} className="text-imam-red shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal Lightbox Preview */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-64 sm:h-80 bg-gradient-to-br ${selectedItem.gradient} p-6 flex flex-col justify-between text-white relative`}>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="self-end p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition"
                >
                  <X size={18} />
                </button>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full border border-white/30 inline-block mb-2">
                    {selectedItem.badge}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {selectedItem.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-imam-blue" />
                    <strong>Date:</strong> {selectedItem.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-imam-red" />
                    <strong>Venue:</strong> {selectedItem.location}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedItem.caption}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicWebsiteShell>
  );
}
