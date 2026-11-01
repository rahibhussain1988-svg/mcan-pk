'use client';

import React, { useState } from 'react';
import QRCode from 'qrcode';
import { verifyAdmitSlip } from '@/app/actions/admissions';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import {
  X,
  Search,
  CheckCircle2,
  AlertCircle,
  Printer,
  Calendar,
  MapPin,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

interface VerifyAdmitSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerifyAdmitSlipModal: React.FC<VerifyAdmitSlipModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  if (!isOpen) return null;

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setNotFoundMessage(null);
    setSearchResult(null);

    try {
      const res = await verifyAdmitSlip(query);
      if (res.success && res.found && res.application) {
        setSearchResult(res.application);
        // Generate QR Code data URL
        const qr = await QRCode.toDataURL(
          res.application.qrSlipData || res.application.applicationNo,
          { width: 130, margin: 1 }
        );
        setQrCodeUrl(qr);
      } else {
        setNotFoundMessage(res.message || 'No record found. Please verify your Application No or CNIC.');
      }
    } catch (err: any) {
      setNotFoundMessage('Error querying institutional records.');
    } finally {
      setIsSearching(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-imam-navy to-[#062B54] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImamCrestLogo size={38} showText={false} />
            <div>
              <h3 className="text-base font-extrabold text-white">
                Verify Entry Test Admit Slip
              </h3>
              <p className="text-[11px] text-blue-200">
                Official Institutional Verification Database · Fall 2026–27
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-100">
          <form onSubmit={handleVerify} className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              Enter Application Number or CNIC (with or without dashes):
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. IMCAN-JCD-2026-10482 or 43102-8877665-1"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-imam-blue"
                  autoFocus
                />
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSearching || !query.trim()}
                className="px-5 py-2.5 bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold rounded-xl transition disabled:opacity-50 flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>{isSearching ? 'Verifying...' : 'Verify'}</span>
                <ShieldCheck size={15} />
              </button>
            </div>
          </form>

          {/* Quick Demo Search helpers */}
          <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap">
            <span>Demo Numbers:</span>
            <button
              onClick={() => {
                setQuery('IMCAN-JCD-2026-10482');
              }}
              className="font-mono text-imam-blue underline hover:text-blue-800"
            >
              IMCAN-JCD-2026-10482
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setQuery('43102-1122998-2');
              }}
              className="font-mono text-imam-blue underline hover:text-blue-800"
            >
              43102-1122998-2 (X-Ray)
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="p-6">
          {notFoundMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
              <AlertCircle size={20} className="shrink-0 text-rose-600" />
              <span>{notFoundMessage}</span>
            </div>
          )}

          {searchResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Official Credential Verified &amp; Registered in ERP Database
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px]">
                  {searchResult.status}
                </span>
              </div>

              {/* Verified Slip Preview */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-slate-900 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Application Roll No
                    </span>
                    <strong className="text-base font-black font-mono text-imam-blue">
                      {searchResult.applicationNo}
                    </strong>
                  </div>

                  {qrCodeUrl && (
                    <img
                      src={qrCodeUrl}
                      alt="Verified QR"
                      className="w-14 h-14 border border-slate-300 rounded-lg p-0.5 bg-white"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Candidate Name</span>
                    <strong className="text-slate-900">{searchResult.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Father&apos;s Name</span>
                    <span className="text-slate-800">{searchResult.fatherName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Target Program</span>
                    <strong className="text-slate-900">{searchResult.programName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Merit Score</span>
                    <strong className="text-emerald-700 font-mono">
                      {searchResult.calculatedMerit}%
                    </strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Calendar size={13} className="text-imam-red" />
                    <span><strong>Test Date:</strong> {searchResult.testDate || 'Sunday, 22 November 2026 at 10:00 AM'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MapPin size={13} className="text-imam-blue" />
                    <span><strong>Test Center:</strong> {searchResult.testCenter || 'Main Campus, Shah Ghazi Muhalla, Jacobabad'}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-xl bg-imam-navy hover:bg-imam-blue text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Printer size={14} />
                  <span>Print Admit Slip</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {!searchResult && !notFoundMessage && (
            <div className="text-center py-6 text-slate-400 text-xs">
              <FileCheck size={28} className="mx-auto text-slate-300 mb-2" />
              <p>Search by your online admission application number or CNIC to retrieve and print your verified slip.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
