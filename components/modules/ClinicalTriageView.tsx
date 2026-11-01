'use client';

import React, { useState } from 'react';
import {
  HeartPulse,
  PlusCircle,
  AlertTriangle,
  UserPlus,
  Clock,
  Printer,
  ShieldAlert,
  Flame,
  CheckCircle,
  Stethoscope,
  Activity,
  Bed,
} from 'lucide-react';
import { createTriageCase, updateTriageStatus } from '@/app/actions/triage';
import { calculateNEWS2, calculateESI, VitalsInput } from '@/lib/clinical-engine';
import { TriageSlipPrint } from '@/components/print/TriageSlipPrint';

interface TriageCase {
  id: string;
  mrNumber: string;
  patientName: string;
  age: number;
  gender: string;
  isPregnant: boolean;
  chiefComplaint: string;
  respRate: number;
  spo2: number;
  onOxygen: boolean;
  systolicBp: number;
  diastolicBp: number;
  heartRate: number;
  temperature: number;
  bloodSugar?: number | null;
  painScale: number;
  avpuGcs: string;
  news2Score: number;
  news2Risk: string;
  esiLevel: number;
  redFlags?: string | null;
  triageCategory: string;
  triageNurseName: string;
  pairedStudentName?: string | null;
  requiredCompetency?: string | null;
  queueStatus: string;
  waitTimeMinutes: number;
  bedNumber?: string | null;
  createdAt: string;
}

interface ClinicalTriageViewProps {
  initialCases: TriageCase[];
  students: Array<{ id: string; fullName: string; rollNo: string; clinicalAttendancePercent: number }>;
}

export const ClinicalTriageView: React.FC<ClinicalTriageViewProps> = ({
  initialCases,
  students,
}) => {
  const [cases, setCases] = useState<TriageCase[]>(initialCases);
  const [showNewIntakeModal, setShowNewIntakeModal] = useState(false);
  const [selectedCaseForPrint, setSelectedCaseForPrint] = useState<TriageCase | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Intake Form State
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'MALE',
    isPregnant: false,
    chiefComplaint: '',
    respRate: '20',
    spo2: '97',
    onOxygen: false,
    systolicBp: '120',
    diastolicBp: '80',
    heartRate: '80',
    temperature: '37.0',
    bloodSugar: '110',
    painScale: '3',
    avpuGcs: 'ALERT' as 'ALERT' | 'VOICE' | 'PAIN' | 'UNRESPONSIVE',
    bedNumber: 'IMC-ER-BAY-03',
  });

  // Dynamic preview of NEWS2 and ESI as nurse types
  const liveVitals: VitalsInput = {
    respRate: parseInt(formData.respRate || '20', 10),
    spo2: parseFloat(formData.spo2 || '97'),
    onOxygen: formData.onOxygen,
    systolicBp: parseInt(formData.systolicBp || '120', 10),
    diastolicBp: parseInt(formData.diastolicBp || '80', 10),
    heartRate: parseInt(formData.heartRate || '80', 10),
    temperature: parseFloat(formData.temperature || '37.0'),
    bloodSugar: formData.bloodSugar ? parseFloat(formData.bloodSugar) : undefined,
    painScale: parseInt(formData.painScale || '0', 10),
    avpuGcs: formData.avpuGcs,
  };

  const previewNEWS2 = calculateNEWS2(liveVitals);
  const previewESI = calculateESI(liveVitals, formData.chiefComplaint || 'Routine check');

  const handleQuickComplaint = (chip: string) => {
    setFormData((prev) => ({
      ...prev,
      chiefComplaint: prev.chiefComplaint ? `${prev.chiefComplaint}, ${chip}` : chip,
    }));
  };

  const handleSubmitIntake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.age || !formData.chiefComplaint) {
      alert('Please fill in patient name, age, and chief complaint');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createTriageCase({
        patientName: formData.patientName,
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        isPregnant: formData.isPregnant,
        chiefComplaint: formData.chiefComplaint,
        respRate: liveVitals.respRate,
        spo2: liveVitals.spo2,
        onOxygen: liveVitals.onOxygen,
        systolicBp: liveVitals.systolicBp,
        diastolicBp: liveVitals.diastolicBp || 80,
        heartRate: liveVitals.heartRate,
        temperature: liveVitals.temperature,
        bloodSugar: liveVitals.bloodSugar,
        painScale: liveVitals.painScale,
        avpuGcs: liveVitals.avpuGcs,
        bedNumber: formData.bedNumber,
      });

      if (res.success && res.triageCase) {
        setCases([res.triageCase as any, ...cases]);
        setShowNewIntakeModal(false);
        // Show auto-pairing notification
        alert(
          `Patient ${res.triageCase.mrNumber} triaged at ESI Level ${res.esi.level} (NEWS2: ${res.news2.score}). Auto-paired with ${res.triageCase.pairedStudentName} for PNC Logbook competency: ${res.competency.title}.`
        );
      }
    } catch (err) {
      alert('Error creating triage intake record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusTransition = async (caseId: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === 'WAITING' ? 'UNDER_CARE' : currentStatus === 'UNDER_CARE' ? 'DISCHARGED' : 'ADMITTED';
    try {
      await updateTriageStatus(caseId, nextStatus);
      setCases((prev) =>
        prev.map((c) => (c.id === caseId ? { ...c, queueStatus: nextStatus } : c))
      );
    } catch (e) {
      alert('Error updating status');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header & New Triage Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HeartPulse className="text-imam-red" /> Intelligent Bedside Triage &amp; PNC Student Pairing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Imam Medical Center Emergency Dept • Exact NEWS2 (0-20), ESI Levels 1-5 &amp; Logbook Sync
          </p>
        </div>

        <button
          onClick={() => setShowNewIntakeModal(true)}
          data-testid="new-triage-btn"
          className="bg-imam-red hover:bg-rose-700 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
        >
          <PlusCircle size={16} />
          New Patient Triage Intake
        </button>
      </div>

      {/* Live Hospital Triage Queue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((item) => {
          const isEsi1 = item.esiLevel === 1;
          const isEsi2 = item.esiLevel === 2;
          const isHighAcuity = isEsi1 || isEsi2;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-sm transition hover:shadow-md flex flex-col justify-between ${
                isEsi1
                  ? 'border-imam-red bg-rose-50/30 ring-2 ring-imam-red/30'
                  : isEsi2
                  ? 'border-rose-300'
                  : item.esiLevel === 3
                  ? 'border-amber-200'
                  : 'border-slate-200/80'
              }`}
            >
              <div>
                {/* Acuity Badge & Time */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider text-white ${
                        isEsi1
                          ? 'bg-imam-red animate-pulse'
                          : isEsi2
                          ? 'bg-rose-600'
                          : item.esiLevel === 3
                          ? 'bg-amber-600'
                          : 'bg-emerald-600'
                      }`}
                    >
                      ESI Level {item.esiLevel}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      NEWS2: {item.news2Score}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock size={13} /> {item.waitTimeMinutes}m wait
                  </span>
                </div>

                {/* Patient Name & MR# */}
                <div className="mb-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                      {item.patientName}
                    </h3>
                    <span className="text-xs font-bold font-mono text-slate-500">
                      {item.mrNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {item.age} Y • {item.gender} • Bed: <strong className="text-slate-800">{item.bedNumber}</strong>
                  </p>
                </div>

                {/* Chief Complaint & Red Flags */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-xs mb-3">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Chief Complaint:</span>
                  <p className="text-slate-800 font-semibold line-clamp-2 mt-0.5">
                    {item.chiefComplaint}
                  </p>
                  {item.redFlags && item.redFlags !== 'None detected' && (
                    <div className="mt-1 text-[10px] text-rose-700 font-bold flex items-center gap-1">
                      <AlertTriangle size={12} className="shrink-0" />
                      <span className="truncate">{item.redFlags}</span>
                    </div>
                  )}
                </div>

                {/* Vitals Quick Grid */}
                <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-mono bg-slate-100/60 p-2 rounded-xl mb-3">
                  <div>
                    <span className="text-slate-400 block text-[8px]">RR</span>
                    <strong className="text-slate-800">{item.respRate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[8px]">SpO2</span>
                    <strong className={item.spo2 < 92 ? 'text-rose-700 font-black' : 'text-slate-800'}>
                      {item.spo2}%
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[8px]">BP</span>
                    <strong className="text-slate-800">{item.systolicBp}/{item.diastolicBp}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[8px]">HR</span>
                    <strong className="text-slate-800">{item.heartRate}</strong>
                  </div>
                </div>

                {/* PNC Student Clinical Pairing Assignment */}
                <div className="bg-blue-50/70 p-2.5 rounded-xl border border-blue-200/60 text-xs mb-2">
                  <span className="text-imam-blue font-bold text-[10px] uppercase block flex items-center gap-1">
                    <Stethoscope size={13} /> PNC Clinical Pairing:
                  </span>
                  <div className="mt-1">
                    <span className="text-slate-600">Student Nurse: </span>
                    <strong className="text-slate-900">{item.pairedStudentName || 'Preceptor Assist'}</strong>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Competency: <strong className="text-imam-navy">{item.requiredCompetency}</strong>
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleStatusTransition(item.id, item.queueStatus)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                    item.queueStatus === 'WAITING'
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      : item.queueStatus === 'UNDER_CARE'
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {item.queueStatus === 'WAITING'
                    ? 'Start Care →'
                    : item.queueStatus === 'UNDER_CARE'
                    ? 'Discharge / Admit →'
                    : 'Discharged'}
                </button>

                <button
                  onClick={() => setSelectedCaseForPrint(item)}
                  data-testid={`print-triage-${item.mrNumber}`}
                  className="p-1.5 text-slate-500 hover:text-imam-blue hover:bg-slate-100 rounded-lg transition"
                  title="Print Triage Slip (80mm)"
                >
                  <Printer size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: New Patient Triage Intake */}
      {showNewIntakeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-5 sm:p-6 border border-slate-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <HeartPulse className="text-imam-red" size={20} />
                  Emergency Bedside Triage Intake
                </h3>
                <p className="text-xs text-slate-500">
                  Imam Medical Center • Dual NEWS2 &amp; ESI Score Evaluation
                </p>
              </div>
              <button
                onClick={() => setShowNewIntakeModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* Live Clinical Acuity Preview Pill */}
            <div className="my-3 p-3 rounded-xl border flex items-center justify-between bg-slate-900 text-white">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Live Calculated Acuity:</span>
                <span className="text-sm font-black text-rose-400">
                  ESI Level {previewESI.level} ({previewESI.categoryName})
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">NEWS2 Score:</span>
                <span className="text-base font-black text-amber-300 font-mono">
                  {previewNEWS2.score} ({previewNEWS2.risk} Risk)
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmitIntake} className="space-y-3.5 text-xs">
              {/* Patient Basics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">Patient Full Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Ghulam Rasool"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Age (Years):</label>
                  <input
                    type="number"
                    placeholder="45"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-imam-blue"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Gender:</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Assigned Bay/Bed:</label>
                  <input
                    type="text"
                    value={formData.bedNumber}
                    onChange={(e) => setFormData({ ...formData, bedNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.isPregnant}
                      onChange={(e) => setFormData({ ...formData, isPregnant: e.target.checked })}
                      className="rounded text-imam-blue"
                    />
                    Pregnant
                  </label>
                </div>
              </div>

              {/* Chief Complaint Chips */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Chief Complaint:</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {[
                    'Severe breathlessness & wheezing',
                    'Crushing retrosternal chest pain',
                    'High fever & continuous vomiting',
                    'Deep bleeding laceration',
                    'Diabetic hyperglycemia',
                    'Urinary retention',
                  ].map((chip) => (
                    <button
                      type="button"
                      key={chip}
                      onClick={() => handleQuickComplaint(chip)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-lg transition"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
                <textarea
                  rows={2}
                  placeholder="Describe acute symptoms, onset and clinical history..."
                  value={formData.chiefComplaint}
                  onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  required
                />
              </div>

              {/* Objective Vitals Grid */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-2">
                  Bedside Vitals Intake:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">Resp Rate (/min):</label>
                    <input
                      type="number"
                      value={formData.respRate}
                      onChange={(e) => setFormData({ ...formData, respRate: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">SpO2 (%):</label>
                    <input
                      type="number"
                      value={formData.spo2}
                      onChange={(e) => setFormData({ ...formData, spo2: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">Systolic BP:</label>
                    <input
                      type="number"
                      value={formData.systolicBp}
                      onChange={(e) => setFormData({ ...formData, systolicBp: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">Heart Rate (bpm):</label>
                    <input
                      type="number"
                      value={formData.heartRate}
                      onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">Temp (°C):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.temperature}
                      onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">Blood Sugar (RBS):</label>
                    <input
                      type="number"
                      value={formData.bloodSugar}
                      onChange={(e) => setFormData({ ...formData, bloodSugar: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">Pain (0-10):</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={formData.painScale}
                      onChange={(e) => setFormData({ ...formData, painScale: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">AVPU / GCS:</label>
                    <select
                      value={formData.avpuGcs}
                      onChange={(e) => setFormData({ ...formData, avpuGcs: e.target.value as any })}
                      className="w-full border border-slate-300 rounded-lg p-1.5 text-xs font-sans"
                    >
                      <option value="ALERT">Alert</option>
                      <option value="VOICE">Voice</option>
                      <option value="PAIN">Pain</option>
                      <option value="UNRESPONSIVE">Unresponsive</option>
                    </select>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.onOxygen}
                      onChange={(e) => setFormData({ ...formData, onOxygen: e.target.checked })}
                      className="rounded text-imam-blue"
                    />
                    Patient on Supplemental Oxygen (+2 NEWS2)
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewIntakeModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="submit-triage-btn"
                  className="bg-imam-red hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm transition active:scale-95"
                >
                  {isSubmitting ? 'Calculating & Pairing...' : 'Submit Triage & Auto-Pair Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Triage Slip Modal */}
      {selectedCaseForPrint && (
        <TriageSlipPrint
          triage={selectedCaseForPrint}
          onClose={() => setSelectedCaseForPrint(null)}
        />
      )}
    </div>
  );
};
