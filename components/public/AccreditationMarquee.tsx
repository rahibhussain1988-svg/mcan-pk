'use client';

import React, { useState } from 'react';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import { ShieldCheck, Award, X, ExternalLink, CheckCircle2 } from 'lucide-react';

export const AccreditationMarquee: React.FC = () => {
  const [selectedAccreditation, setSelectedAccreditation] = useState<any | null>(null);

  const accreditations = INSTITUTIONAL_DATA.accreditations;

  return (
    <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-6 border-y border-white/10 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-200 font-bold">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>Statutory Recognitions, University Affiliations &amp; Scholarship Partners</span>
        </div>
        <span className="text-[11px] text-blue-300 hidden sm:inline-block">
          Click any seal for official verification details
        </span>
      </div>

      {/* Marquee Scroller */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex w-max animate-marquee space-x-4 hover:[animation-play-state:paused]">
          {[...accreditations, ...accreditations].map((acc, idx) => (
            <button
              key={`${acc.id}-${idx}`}
              onClick={() => setSelectedAccreditation(acc)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all duration-200 text-left shrink-0 cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-blue-200 shrink-0">
                <Award size={18} className="text-yellow-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white whitespace-nowrap">
                  {acc.name}
                </div>
                <div className="text-[10px] text-blue-200 whitespace-nowrap flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{acc.badge}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Verification Popover Modal */}
      {selectedAccreditation && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedAccreditation(null)}
        >
          <div
            className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAccreditation(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-imam-blue flex items-center justify-center">
                <Award size={26} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-imam-blue bg-blue-50 px-2 py-0.5 rounded">
                  {selectedAccreditation.category}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  {selectedAccreditation.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {selectedAccreditation.description}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                <CheckCircle2 size={16} />
                <span>Verified Active &amp; Good Standing</span>
              </div>
              <button
                onClick={() => setSelectedAccreditation(null)}
                className="px-4 py-2 bg-imam-navy hover:bg-imam-blue text-white rounded-xl text-xs font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
