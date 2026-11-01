'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HeartPulse,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  Info,
} from 'lucide-react';

export const ClinicalTriageSimulator: React.FC = () => {
  // Simulator Vitals State
  const [heartRate, setHeartRate] = useState<number>(86);
  const [spo2, setSpo2] = useState<number>(97);
  const [respRate, setRespRate] = useState<number>(18);
  const [systolicBp, setSystolicBp] = useState<number>(122);
  const [temp, setTemp] = useState<number>(37.1);

  // NEWS2 Score Calculation
  let news2 = 0;

  // Resp Rate: <=8 (+3), 9-11 (+1), 12-20 (0), 21-24 (+2), >=25 (+3)
  if (respRate <= 8 || respRate >= 25) news2 += 3;
  else if (respRate >= 21) news2 += 2;
  else if (respRate <= 11) news2 += 1;

  // SpO2: <=91 (+3), 92-93 (+2), 94-95 (+1), >=96 (0)
  if (spo2 <= 91) news2 += 3;
  else if (spo2 <= 93) news2 += 2;
  else if (spo2 <= 95) news2 += 1;

  // Systolic BP: <=90 (+3), 91-100 (+2), 101-110 (+1), 111-219 (0), >=220 (+3)
  if (systolicBp <= 90 || systolicBp >= 220) news2 += 3;
  else if (systolicBp <= 100) news2 += 2;
  else if (systolicBp <= 110) news2 += 1;

  // Heart Rate: <=40 (+3), 41-50 (+1), 51-90 (0), 91-110 (+1), 111-130 (+2), >=131 (+3)
  if (heartRate <= 40 || heartRate >= 131) news2 += 3;
  else if (heartRate >= 111) news2 += 2;
  else if (heartRate <= 50 || heartRate >= 91) news2 += 1;

  // Temperature: <=35.0 (+3), 35.1-36.0 (+1), 36.1-38.0 (0), 38.1-39.0 (+1), >=39.1 (+2)
  if (temp <= 35.0) news2 += 3;
  else if (temp >= 39.1) news2 += 2;
  else if (temp <= 36.0 || temp >= 38.1) news2 += 1;

  // Clinical Risk Band & ESI
  let riskLevel = 'LOW';
  let riskColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
  let esiLevel = 4;
  let actionAdvice = 'Ward observation, standard 12-hourly nursing vitals check.';

  if (news2 >= 7 || spo2 <= 90 || systolicBp <= 85) {
    riskLevel = 'HIGH (CRITICAL ALERT)';
    riskColor = 'text-rose-400 bg-rose-950/60 border-rose-500/30';
    esiLevel = 1;
    actionAdvice = 'Immediate resuscitation & medical officer intervention at ICU/ER.';
  } else if (news2 >= 5) {
    riskLevel = 'MEDIUM (KEY ALERT)';
    riskColor = 'text-amber-400 bg-amber-950/60 border-amber-500/30';
    esiLevel = 2;
    actionAdvice = 'Urgent medical review within 30 minutes, continuous monitoring.';
  }

  return (
    <section id="triage-simulator" className="py-20 bg-slate-950 text-white relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-3">
            <HeartPulse size={14} className="animate-pulse" /> Bedside Clinical Training Module
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Interactive Clinical Triage Simulator
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Experience how our BS Nursing and ICU students are trained in rapid physiological sorting (NEWS2 &amp; ESI protocols) during live clinical rotations at Imam Medical Center and JIMS.
          </p>
        </div>

        {/* Telemetry Monitor Stage */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top Monitor Bar */}
          <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-xs font-black tracking-widest text-slate-300 uppercase">
                  Telemetry Channel 01 • Bedside Monitor
                </span>
                <div className="text-[10px] text-slate-500 font-mono">
                  Affiliated Site: Imam Medical Center Emergency Ward
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                Protocol: Royal College of Physicians NEWS2
              </span>
              <Link
                href="/triage"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-imam-blue hover:text-blue-400 transition"
              >
                <span>Launch Full Triage Engine in ERP</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Telemetry Sliders */}
            <div className="lg:col-span-7 space-y-5">
              {/* Heart Rate */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <HeartPulse size={15} className="text-rose-400" /> Pulse / Heart Rate
                  </span>
                  <span className="text-sm font-black text-rose-400 font-mono">
                    {heartRate} <span className="text-xs font-normal text-slate-500">BPM</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="150"
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full accent-rose-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* SpO2 */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <Activity size={15} className="text-cyan-400" /> Oxygen Saturation (SpO2)
                  </span>
                  <span className="text-sm font-black text-cyan-400 font-mono">
                    {spo2}%
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="100"
                  value={spo2}
                  onChange={(e) => setSpo2(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Respiratory Rate & Systolic BP (2 cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-slate-300">Respiratory Rate</span>
                    <span className="text-sm font-black text-emerald-400 font-mono">
                      {respRate} /min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="35"
                    value={respRate}
                    onChange={(e) => setRespRate(Number(e.target.value))}
                    className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-slate-300">Systolic Blood Pressure</span>
                    <span className="text-sm font-black text-yellow-400 font-mono">
                      {systolicBp} mmHg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="230"
                    value={systolicBp}
                    onChange={(e) => setSystolicBp(Number(e.target.value))}
                    className="w-full accent-yellow-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right: Live Clinical Triage Computation Result */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  National Early Warning Score
                </span>
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-black text-white font-mono">{news2}</div>
                  <div className="text-xs text-slate-400">Total NEWS2 Aggregate</div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border ${riskColor} space-y-1`}>
                <div className="text-[11px] font-bold uppercase tracking-wider">
                  Risk Category: {riskLevel}
                </div>
                <div className="text-xs text-slate-200">
                  {actionAdvice}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Emergency Severity Index</div>
                  <div className="text-lg font-black text-white font-mono">
                    ESI Level {esiLevel}
                  </div>
                </div>
                <span className="text-xs text-slate-400">Triage Queueing</span>
              </div>

              <Link
                href="/triage"
                className="w-full py-3 rounded-xl bg-imam-blue hover:bg-blue-600 text-white font-extrabold text-xs text-center transition flex items-center justify-center gap-2"
              >
                <span>Open Full Hospital Triage Engine in ERP →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
