'use client';

import React from 'react';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { Printer, X, CheckCircle } from 'lucide-react';

interface DocumentData {
  documentNo: string;
  title: string;
  type: string;
  applicantRole: string;
  applicantName: string;
  contentEn: string;
  contentUr?: string | null;
  contentSd?: string | null;
  policyAlerts?: string | null;
  status: string;
  approvedBy?: string | null;
  issuedAt?: string | null;
  createdAt: string;
}

interface CrestLetterheadPrintProps {
  document: DocumentData;
  activeLang: 'en' | 'ur' | 'sd';
  onClose: () => void;
}

export const CrestLetterheadPrint: React.FC<CrestLetterheadPrintProps> = ({
  document,
  activeLang,
  onClose,
}) => {
  const isRtl = activeLang === 'ur' || activeLang === 'sd';
  const displayContent =
    activeLang === 'ur' && document.contentUr
      ? document.contentUr
      : activeLang === 'sd' && document.contentSd
      ? document.contentSd
      : document.contentEn;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto">
      {/* Control Toolbar */}
      <div className="print:hidden w-full max-w-3xl bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-4 flex items-center justify-between border border-slate-200">
        <div>
          <span className="font-bold text-slate-800 text-sm sm:text-base">
            Official Letterhead ({document.documentNo})
          </span>
          <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
            {document.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            data-testid="print-letterhead-btn"
            className="bg-imam-blue hover:bg-imam-navy text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-sm transition active:scale-95"
          >
            <Printer size={16} />
            Print Letterhead (A4)
          </button>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Official A4 Letterhead Sheet */}
      <div className="bg-white text-black w-full max-w-3xl p-8 sm:p-12 shadow-2xl rounded-lg border border-slate-300 font-serif print:border-none print:shadow-none print:p-6 print:m-0 print:w-full print:max-w-none min-h-[900px] flex flex-col justify-between">
        {/* Top Official Letterhead Header */}
        <div>
          <div className="flex items-center justify-between border-b-2 border-imam-navy pb-4 mb-6">
            <ImamCrestLogo size={75} showText={false} />
            <div className="text-center flex-1 px-4">
              <h1 className="text-lg sm:text-xl font-black uppercase text-imam-navy tracking-tight font-sans">
                IMAM INSTITUTE
              </h1>
              <h2 className="text-xs sm:text-sm font-extrabold uppercase text-imam-blue tracking-wide font-sans">
                Of Nursing &amp; Allied Health Sciences and Paramedical
              </h2>
              <p className="text-[10px] text-slate-600 font-sans mt-0.5">
                Affiliated Teaching Hospital: <strong>Imam Medical Center</strong> | Recognized by PNC &amp; SMF
              </p>
              <p className="text-[9px] text-slate-500 font-sans">
                Campus Enclave, Sindh, Pakistan | Phone: +92 300 2145890 | registrar@imaminstitute.edu.pk
              </p>
            </div>
            <div className="w-16 h-16 border border-slate-300 rounded p-1 flex items-center justify-center text-[8px] font-mono text-slate-400">
              [QR VERIFY]
            </div>
          </div>

          {/* Reference & Date Bar */}
          <div className="flex justify-between items-center text-xs text-slate-700 font-sans border-b border-slate-200 pb-2 mb-6">
            <div>
              <span className="text-slate-500">Ref: </span>
              <strong className="text-slate-900 font-mono">{document.documentNo}</strong>
            </div>
            <div>
              <span className="text-slate-500">Date: </span>
              <span className="font-mono">{new Date(document.issuedAt || document.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center mb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 uppercase underline underline-offset-4 decoration-imam-blue">
              {document.title}
            </h3>
            {document.policyAlerts && (
              <div className="inline-block mt-2 bg-emerald-50 text-emerald-800 text-xs px-3 py-1 rounded-full border border-emerald-200 font-sans">
                ✓ {document.policyAlerts}
              </div>
            )}
          </div>

          {/* Document Content */}
          <div
            className={`text-sm text-slate-800 leading-relaxed whitespace-pre-line ${
              isRtl ? 'font-urdu text-right text-base leading-loose' : 'text-justify'
            }`}
          >
            {displayContent}
          </div>
        </div>

        {/* Footer & Signature Blocks */}
        <div className="pt-12 border-t border-slate-300 font-sans">
          <div className="flex justify-between items-end text-xs text-slate-700">
            <div>
              <div className="h-12 flex items-end font-serif italic text-sm text-slate-800">
                {document.applicantName}
              </div>
              <div className="border-t border-slate-400 pt-1 font-semibold">Applicant Signature</div>
              <span className="text-[10px] text-slate-500">({document.applicantRole})</span>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 mb-1">
                <CheckCircle size={13} /> Official Seal Verified
              </div>
              <span className="text-[9px] text-slate-400">PNC Regulatory Document</span>
            </div>

            <div className="text-right">
              <div className="h-12 flex items-end justify-end font-serif font-bold text-sm text-imam-navy">
                {document.approvedBy || 'Prof. Dr. Nargis Bano'}
              </div>
              <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
                Principal &amp; Academic Dean
              </div>
              <span className="text-[10px] text-slate-500">Imam Institute of Nursing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
