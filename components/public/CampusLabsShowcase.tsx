'use client';

import React, { useState } from 'react';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  Sparkles,
  BookOpen,
  Monitor,
  Microscope,
  Stethoscope,
  X,
  Calendar,
  Award,
  Maximize2,
} from 'lucide-react';

export const CampusLabsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<any | null>(null);

  const categories = [
    { id: 'all', label: 'All Campus Life & Facilities' },
    { id: 'labs', label: 'Clinical & Science Labs' },
    { id: 'digital', label: 'Digital Classrooms & Library' },
    { id: 'events', label: 'Seminars & Ceremonies' },
  ];

  const items = [
    {
      id: 'fon-museum',
      title: 'Fundamentals of Nursing (FON) Museum',
      subtitle: 'Clinical Skills Simulator & History',
      category: 'labs',
      tag: 'Clinical Simulator',
      description:
        'A comprehensive simulation hospital environment featuring high-fidelity adult and pediatric anatomical mannequins, medication delivery stations, and sterile procedure trays where nursing students master foundational care before stepping onto hospital wards.',
      icon: Stethoscope,
      accentColor: 'from-blue-600 to-indigo-800',
    },
    {
      id: 'anatomy-lab',
      title: 'Anatomy & Physiology Lab',
      subtitle: 'Human Structural Exploration',
      category: 'labs',
      tag: 'Pre-Clinical Science',
      description:
        'Equipped with full articulated human skeletons, organ dissections, cardiovascular circulatory models, and histology microscopes enabling deep physiological comprehension required under PNMC curricula.',
      icon: Microscope,
      accentColor: 'from-emerald-600 to-teal-800',
    },
    {
      id: 'digital-classrooms',
      title: 'Smart Digital Classrooms',
      subtitle: 'Interactive Multimedia Learning',
      category: 'digital',
      tag: 'Smart Classrooms',
      description:
        'Acoustically treated lecture halls fitted with HD projection systems, high-speed campus Wi-Fi, and interactive lecture recording for hybrid clinical case review.',
      icon: Monitor,
      accentColor: 'from-blue-700 to-cyan-900',
    },
    {
      id: 'computer-lab',
      title: 'Modern Central Computer Lab',
      subtitle: 'E-Health & Medical Research',
      category: 'digital',
      tag: 'Digital Learning',
      description:
        'Workstations connected to digital health libraries, SMBBMU examination portals, biometric attendance logs, and high-speed research databases.',
      icon: BookOpen,
      accentColor: 'from-indigo-600 to-slate-900',
    },
    {
      id: 'white-coat',
      title: 'White Coat Ceremony & Batch Orientation',
      subtitle: 'Clinical Induction Tradition',
      category: 'events',
      tag: 'Annual Tradition',
      description:
        'An esteemed institutional milestone where incoming nursing and paramedical students don their clinical white coats, take the Florence Nightingale pledge, and commit to compassionate healthcare ethics.',
      icon: Award,
      accentColor: 'from-rose-600 to-red-900',
    },
    {
      id: 'smbbmu-seminar',
      title: '2nd Nursing Seminar & International Dialogue',
      subtitle: 'SMBBMU Larkana Collaboration',
      category: 'events',
      tag: 'Academic Research',
      description:
        'Faculty and student research presentations addressing hospital-acquired infections, critical care patient safety protocols, and maternal mortality reduction across upper Sindh.',
      icon: Calendar,
      accentColor: 'from-amber-600 to-orange-900',
    },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="campus-facilities" className="py-20 bg-slate-50 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-imam-blue text-xs font-bold mb-3">
            <Sparkles size={14} /> Modern Infrastructure &amp; Campus Culture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Campus Labs, Museum &amp; Academic Life
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Take a visual tour through our pre-clinical simulation facilities, digital research labs, and milestone academic ceremonies in Jacobabad.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-imam-navy text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Lab & Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-imam-blue/40 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accentColor} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-imam-blue transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-500 mt-0.5 mb-2">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-imam-blue group-hover:text-imam-navy">
                  <span>View Details &amp; Highlights</span>
                  <Maximize2 size={13} className="group-hover:scale-110 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeLightbox.accentColor} text-white flex items-center justify-center shadow-md`}>
                {React.createElement(activeLightbox.icon, { size: 24 })}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-imam-blue bg-blue-50 px-2 py-0.5 rounded">
                  {activeLightbox.tag}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                  {activeLightbox.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
              {activeLightbox.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                Imam Institute Campus · Jacobabad
              </span>
              <button
                onClick={() => setActiveLightbox(null)}
                className="px-5 py-2 bg-imam-navy hover:bg-imam-blue text-white rounded-xl text-xs font-bold transition"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
