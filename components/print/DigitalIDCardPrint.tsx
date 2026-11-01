'use client';

import React from 'react';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { Printer, X, ShieldCheck } from 'lucide-react';

interface StudentData {
  rollNo: string;
  registrationNo: string;
  fullName: string;
  fatherName: string;
  cnic: string;
  phone: string;
  fatherPhone: string;
  bloodGroup?: string | null;
  address?: string | null;
  currentSemester: number;
  program: {
    name: string;
    code: string;
  };
  batch: {
    name: string;
  };
}

interface DigitalIDCardPrintProps {
  student: StudentData;
  onClose: () => void;
}

export const DigitalIDCardPrint: React.FC<DigitalIDCardPrintProps> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto">
      {/* Control bar */}
      <div className="print:hidden w-full max-w-xl bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-4 flex items-center justify-between border border-slate-200">
        <div>
          <span className="font-bold text-slate-800 text-sm sm:text-base">
            Official PVC Digital ID Card ({student.rollNo})
          </span>
          <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-imam-blue">
            CR80 Standard
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            data-testid="print-id-card-btn"
            className="bg-imam-blue hover:bg-imam-navy text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-sm transition active:scale-95"
          >
            <Printer size={16} />
            Print ID Card
          </button>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Front and Back ID Card Layout */}
      <div className="flex flex-col md:flex-row print:flex-row gap-6 items-center justify-center">
        {/* FRONT SIDE (CR80 Dimension: 3.370 × 2.125 inches approx) */}
        <div className="w-[320px] h-[480px] bg-gradient-to-b from-[#062B54] via-[#0062B1] to-[#062B54] text-white rounded-2xl shadow-2xl p-4 flex flex-col justify-between relative overflow-hidden border-2 border-white/20 print:shadow-none">
          {/* Subtle watermark background */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
            <ImamCrestLogo size={240} showText={false} />
          </div>

          {/* Top Crest & Institute Title */}
          <div className="text-center relative z-10">
            <div className="flex justify-center mb-1">
              <div className="p-1.5 bg-white rounded-full shadow">
                <ImamCrestLogo size={48} showText={false} />
              </div>
            </div>
            <h1 className="text-sm font-black uppercase tracking-wider text-white">
              IMAM INSTITUTE
            </h1>
            <p className="text-[9px] font-semibold text-sky-200 uppercase tracking-tight">
              Nursing &amp; Allied Health Sciences
            </p>
            <p className="text-[8px] text-sky-300">
              Affiliated: Imam Medical Center
            </p>
          </div>

          {/* Student Photo & Particulars */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-28 rounded-xl bg-slate-200 border-2 border-white shadow-md overflow-hidden flex items-center justify-center relative mb-2">
              <div className="text-slate-400 font-bold text-center text-xs">
                STUDENT PHOTO
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-imam-red text-[8px] font-bold text-white text-center py-0.5">
                {student.bloodGroup || 'O+'}
              </div>
            </div>

            <h2 className="text-base font-extrabold text-white text-center tracking-tight leading-tight">
              {student.fullName}
            </h2>
            <span className="text-xs font-bold text-amber-300 bg-black/30 px-3 py-0.5 rounded-full mt-1 border border-amber-300/30">
              {student.program.code} (Semester {student.currentSemester})
            </span>
          </div>

          {/* Bottom Badges */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/20 text-[10px] space-y-1 font-mono">
            <div className="flex justify-between">
              <span className="text-sky-200">Roll No:</span>
              <strong className="text-white">{student.rollNo}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-sky-200">Reg No:</span>
              <span className="text-white">{student.registrationNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sky-200">Valid Till:</span>
              <span className="text-emerald-300 font-bold">DEC 2028</span>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="w-[320px] h-[480px] bg-slate-50 text-slate-800 rounded-2xl shadow-2xl p-4 flex flex-col justify-between border-2 border-slate-300 print:shadow-none">
          {/* Top Security Banner */}
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-2">
              <div className="flex items-center gap-1.5 text-imam-navy font-bold text-xs">
                <ShieldCheck size={16} className="text-imam-blue" />
                <span>OFFICIAL STUDENT PASS</span>
              </div>
              <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                PNC COMPLIANT
              </span>
            </div>

            <div className="text-[9.5px] space-y-1.5 text-slate-600">
              <div>
                <span className="text-slate-400 block text-[8px] uppercase">Father's Name:</span>
                <strong className="text-slate-800">{student.fatherName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[8px] uppercase">CNIC / Form-B:</span>
                <span className="font-mono text-slate-800">{student.cnic}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[8px] uppercase">Campus Address:</span>
                <span className="line-clamp-2 text-[9px]">{student.address || 'Hyderabad / Sukkur Campus, Sindh'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[8px] uppercase">Emergency Hospital Contact:</span>
                <strong className="text-rose-700 font-mono">{student.fatherPhone}</strong>
              </div>
            </div>
          </div>

          {/* QR Verification & Barcode */}
          <div className="py-2 text-center border-t border-b border-slate-200">
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-16 bg-white border border-slate-300 rounded p-1 flex items-center justify-center text-[8px] font-mono text-slate-400">
                [QR CODE VERIFY]
              </div>
              <div className="text-left text-[8.5px] text-slate-500">
                <strong className="text-slate-800 block">Scan to Verify Enrollment</strong>
                <span>PNC Clinical Pass: #88219</span>
                <span className="block text-emerald-700 font-semibold mt-0.5">Verified Active</span>
              </div>
            </div>
            <div className="tracking-[5px] font-mono text-xs py-1 text-slate-800">
              *{student.rollNo.replace(/-/g, '')}*
            </div>
          </div>

          {/* Terms & Principal Signature */}
          <div className="space-y-2">
            <p className="text-[7.5px] text-slate-500 leading-tight">
              1. This card is non-transferable and property of Imam Institute.<br />
              2. Mandatory for admission to Imam Medical Center clinical wards.<br />
              3. If found, please return to Admin Office or call +92 300 2145890.
            </p>
            <div className="flex justify-between items-end pt-1">
              <div className="text-center text-[7.5px] text-slate-500">
                <span>Issuing Authority</span>
              </div>
              <div className="text-center text-[7.5px] text-slate-800">
                <div className="w-20 border-b border-slate-400 mb-0.5"></div>
                <strong>Principal &amp; Dean</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
