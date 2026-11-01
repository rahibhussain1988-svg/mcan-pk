'use client';

import React, { useState } from 'react';
import {
  Calculator,
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';

interface MeritScholarshipCalculatorProps {
  onOpenApply?: (programCode: string) => void;
}

export const MeritScholarshipCalculator: React.FC<MeritScholarshipCalculatorProps> = ({
  onOpenApply,
}) => {
  const [matricMarks, setMatricMarks] = useState<number>(880);
  const [matricTotal, setMatricTotal] = useState<number>(1100);
  const [fscMarks, setFscMarks] = useState<number>(850);
  const [fscTotal, setFscTotal] = useState<number>(1100);
  const [isTcfAlumni, setIsTcfAlumni] = useState<boolean>(false);
  const [familyIncome, setFamilyIncome] = useState<string>('under-50k'); // under-35k, under-50k, 50k-100k, over-100k

  // Formula: 40% Matric + 60% FSc Pre-Medical
  const matricPercentage = (matricMarks / (matricTotal || 1100)) * 100;
  const fscPercentage = (fscMarks / (fscTotal || 1100)) * 100;
  const aggregateScore = Math.round((matricPercentage * 0.4 + fscPercentage * 0.6) * 10) / 10;

  // Eligibility Checks
  const isBsnEligible = fscPercentage >= 50.0;
  const isParamedicalEligible = matricPercentage >= 45.0;

  // Scholarship Tier Evaluation
  const isPeefCandidate = aggregateScore >= 75.0 && familyIncome !== 'over-100k';
  const isNeedAidCandidate = familyIncome === 'under-35k' || familyIncome === 'under-50k';

  return (
    <section id="merit-calculator" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Calculator size={14} /> Official Sindh Merit &amp; Scholarship Engine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Calculate Your Merit &amp; Scholarship Tier
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Instant evaluation based on official PNMC, SMBBMU Larkana, and SMF Karachi criteria (40% Matric + 60% FSc Pre-Medical formula).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Input Sliders & Selectors */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            {/* Matric Marks Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Matriculation (Science) Marks
                </label>
                <span className="text-sm font-black text-imam-blue font-mono">
                  {matricMarks} / {matricTotal} ({matricPercentage.toFixed(1)}%)
                </span>
              </div>
              <input
                type="range"
                min="450"
                max={matricTotal}
                value={matricMarks}
                onChange={(e) => setMatricMarks(Number(e.target.value))}
                className="w-full accent-imam-blue h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Passing (45%)</span>
                <span>First Division (60%)</span>
                <span>Distinction (80%+)</span>
              </div>
            </div>

            {/* FSc Pre-Medical Marks Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Intermediate (FSc Pre-Medical) Marks
                </label>
                <span className="text-sm font-black text-imam-red font-mono">
                  {fscMarks} / {fscTotal} ({fscPercentage.toFixed(1)}%)
                </span>
              </div>
              <input
                type="range"
                min="450"
                max={fscTotal}
                value={fscMarks}
                onChange={(e) => setFscMarks(Number(e.target.value))}
                className="w-full accent-imam-red h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>BSN Min (50%)</span>
                <span>Competitive (65%)</span>
                <span>Top Merit (80%+)</span>
              </div>
            </div>

            {/* Scholarship Category Toggles */}
            <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Monthly Household Income
                </label>
                <select
                  value={familyIncome}
                  onChange={(e) => setFamilyIncome(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-imam-blue"
                >
                  <option value="under-35k">Under PKR 35,000 / month (High Need)</option>
                  <option value="under-50k">PKR 35,000 – 50,000 / month (Moderate Need)</option>
                  <option value="50k-100k">PKR 50,000 – 100,000 / month</option>
                  <option value="over-100k">Above PKR 100,000 / month</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Education Background
                </label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-300 cursor-pointer text-xs font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={isTcfAlumni}
                    onChange={(e) => setIsTcfAlumni(e.target.checked)}
                    className="w-4 h-4 text-imam-blue rounded accent-imam-blue"
                  />
                  <span>The Citizens Foundation (TCF) Alumni</span>
                </label>
              </div>
            </div>

            {/* Live Formula Note */}
            <div className="text-[11px] text-slate-500 bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <span>Standard Weightage Formula:</span>
              <strong className="font-mono text-slate-800">
                (Matric % × 0.40) + (FSc % × 0.60)
              </strong>
            </div>
          </div>

          {/* Right: Live Result Card & Scholarships */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#062B54] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                Calculated Aggregate
              </span>
              <Sparkles size={18} className="text-yellow-400" />
            </div>

            <div className="flex items-baseline gap-2">
              <div className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tight">
                {aggregateScore}%
              </div>
              <span className="text-xs text-blue-300 font-semibold">Overall Composite</span>
            </div>

            {/* Program Eligibility Indicators */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/10">
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-blue-300" />
                  <span className="text-xs font-bold text-white">BS Nursing (Generic)</span>
                </div>
                {isBsnEligible ? (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 flex items-center gap-1 border border-emerald-500/30">
                    <CheckCircle2 size={12} /> Eligible
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 flex items-center gap-1 border border-rose-500/30">
                    <AlertCircle size={12} /> Min 50% FSc Req
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/10">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-yellow-400" />
                  <span className="text-xs font-bold text-white">9 Paramedical Diplomas</span>
                </div>
                {isParamedicalEligible ? (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 flex items-center gap-1 border border-emerald-500/30">
                    <CheckCircle2 size={12} /> Free Admission Open
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 flex items-center gap-1 border border-rose-500/30">
                    <AlertCircle size={12} /> Min 45% Matric Req
                  </span>
                )}
              </div>
            </div>

            {/* Scholarship Matches */}
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-white/10 space-y-2">
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wide">
                Scholarship Opportunities:
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {isTcfAlumni && (
                  <li className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 size={13} /> TCF Alumni Priority Quota &amp; Fee Waiver
                  </li>
                )}
                {isPeefCandidate && (
                  <li className="flex items-center gap-1.5 text-yellow-300 font-semibold">
                    <CheckCircle2 size={13} /> PEEF Sindh Merit Endowment Qualified
                  </li>
                )}
                {isNeedAidCandidate && (
                  <li className="flex items-center gap-1.5 text-blue-300">
                    <CheckCircle2 size={13} /> Institutional Need-Based Concession Eligible
                  </li>
                )}
                <li className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 size={13} /> Paramedical: 100% Free Tuition Initiative
                </li>
              </ul>
            </div>

            {/* AI Entry Test Roadmap Box */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-blue-200 flex items-center gap-1.5">
                <BookOpen size={14} /> AI Entry Test Preparation Roadmap:
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Focus on Biology (40%), Chemistry (25%), English Comprehension (20%), and Physics (15%). Review Sindh Textbook Board syllabus.
              </p>
            </div>

            {/* Fast Apply CTA */}
            <button
              onClick={() => {
                if (onOpenApply) onOpenApply(isBsnEligible ? 'BSN' : 'XRAY');
              }}
              className="w-full py-3.5 rounded-xl bg-imam-red hover:bg-[#C2040F] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-900/40 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Admission with this Merit Score</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
