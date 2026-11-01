'use client';

import React from 'react';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { Printer, X, AlertTriangle } from 'lucide-react';

interface TriageData {
  mrNumber: string;
  patientName: string;
  age: number;
  gender: string;
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
  bedNumber?: string | null;
  createdAt: string;
}

interface TriageSlipPrintProps {
  triage: TriageData;
  onClose: () => void;
}

export const TriageSlipPrint: React.FC<TriageSlipPrintProps> = ({ triage, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto">
      {/* Control bar */}
      <div className="print:hidden w-full max-w-sm bg-white rounded-xl shadow-lg p-3 mb-4 flex items-center justify-between border border-slate-200">
        <span className="font-bold text-slate-800 text-sm">Emergency Triage Slip</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            data-testid="print-triage-btn"
            className="bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <Printer size={15} />
            Print Triage Slip
          </button>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Printable Thermal Slip */}
      <div className="bg-white text-black w-full max-w-[340px] p-5 shadow-2xl rounded-lg border border-slate-300 font-mono text-xs print:border-none print:shadow-none print:p-2 print:m-0 print:w-[80mm] print:max-w-none">
        <div className="text-center pb-2 border-b-2 border-dashed border-slate-400">
          <div className="flex justify-center mb-1">
            <ImamCrestLogo size={42} showText={false} />
          </div>
          <h1 className="text-xs font-black uppercase text-slate-900">
            IMAM MEDICAL CENTER
          </h1>
          <p className="text-[9px] font-semibold text-slate-600 font-sans">
            Affiliated Teaching Hospital - Emergency Dept
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded text-white font-bold text-xs bg-slate-900">
            <span>ESI LEVEL {triage.esiLevel}</span>
            <span>•</span>
            <span>NEWS2: {triage.news2Score}</span>
          </div>
        </div>

        {/* Patient Identifiers */}
        <div className="py-2.5 border-b border-dashed border-slate-300 text-[11px] space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">MR Number:</span>
            <strong className="text-slate-900 text-xs">{triage.mrNumber}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Patient:</span>
            <strong className="text-slate-900">{triage.patientName}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Age / Gender:</span>
            <span>{triage.age}Y / {triage.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Bed / Bay:</span>
            <strong className="text-rose-700">{triage.bedNumber || 'ER Resus Bay'}</strong>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-500">Time:</span>
            <span>{new Date(triage.createdAt).toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Complaint */}
        <div className="py-2 border-b border-dashed border-slate-300">
          <span className="text-slate-500 block text-[10px] uppercase">Chief Complaint:</span>
          <p className="text-[11px] font-bold text-slate-800 leading-snug">
            {triage.chiefComplaint}
          </p>
          {triage.redFlags && triage.redFlags !== 'None detected' && (
            <div className="mt-1 flex items-start gap-1 text-[10px] text-rose-700 font-semibold bg-rose-50 p-1 rounded">
              <AlertTriangle size={12} className="shrink-0 mt-0.5" />
              <span>{triage.redFlags}</span>
            </div>
          )}
        </div>

        {/* Bedside Vitals Grid */}
        <div className="py-2.5 border-b border-dashed border-slate-300 text-[10.5px]">
          <span className="text-slate-500 block text-[10px] uppercase mb-1">Triage Vitals:</span>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <div>RR: <strong>{triage.respRate} /min</strong></div>
            <div>SpO2: <strong>{triage.spo2}% {triage.onOxygen ? '(+O2)' : ''}</strong></div>
            <div>BP: <strong>{triage.systolicBp}/{triage.diastolicBp}</strong></div>
            <div>HR: <strong>{triage.heartRate} bpm</strong></div>
            <div>Temp: <strong>{triage.temperature}°C</strong></div>
            <div>AVPU: <strong>{triage.avpuGcs}</strong></div>
            {triage.bloodSugar && <div>RBS: <strong>{triage.bloodSugar} mg/dL</strong></div>}
            <div>Pain: <strong>{triage.painScale}/10</strong></div>
          </div>
        </div>

        {/* Teaching Pairing */}
        <div className="py-2.5 border-b-2 border-dashed border-slate-400 bg-slate-50 p-2 rounded my-1 text-[10px]">
          <span className="text-slate-500 block uppercase font-bold text-[9px]">PNC Clinical Teaching Assignment:</span>
          <div className="mt-0.5">
            <span className="text-slate-600">Student Nurse: </span>
            <strong className="text-slate-900">{triage.pairedStudentName || 'Preceptor Direct'}</strong>
          </div>
          <div>
            <span className="text-slate-600">Procedure: </span>
            <strong className="text-imam-blue">{triage.requiredCompetency || 'Vital Signs'}</strong>
          </div>
          <div className="mt-0.5 text-slate-500">
            Supervisor: {triage.triageNurseName}
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-3 flex justify-between text-[8px] text-slate-500">
          <div>
            <div className="w-16 border-b border-slate-400 mb-0.5"></div>
            <span>Triage Nurse Sign</span>
          </div>
          <div>
            <div className="w-16 border-b border-slate-400 mb-0.5"></div>
            <span>ER Registrar Sign</span>
          </div>
        </div>
      </div>
    </div>
  );
};
