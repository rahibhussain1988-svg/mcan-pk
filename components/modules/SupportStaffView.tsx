'use client';

import React from 'react';
import { Calendar, Clock, DollarSign, CheckCircle2, Building, Printer, User } from 'lucide-react';

interface SupportStaffViewProps {
  user: {
    fullName: string;
    designation: string;
    department?: string | null;
    phone: string;
    cnic: string;
  };
}

export const SupportStaffView: React.FC<SupportStaffViewProps> = ({ user }) => {
  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-zinc-700 text-zinc-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-white/10">
              Campus Support Staff
            </span>
            <span className="text-xs font-mono text-zinc-400">Designation: {user.designation}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black mt-1 tracking-tight">
            {user.fullName}
          </h1>
          <p className="text-xs text-zinc-300">
            {user.department || 'Campus Logistics & Support Services'}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 border border-white/20 shadow-sm transition active:scale-95"
        >
          <Printer size={15} /> Print Monthly Salary Slip
        </button>
      </div>

      {/* Duty Roster & Attendance Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Duty Shift</span>
          <strong className="text-lg font-black text-slate-900">Morning Shift</strong>
          <span className="block text-[11px] text-slate-500 mt-1">07:30 AM — 03:30 PM</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Monthly Attendance</span>
          <strong className="text-lg font-black text-emerald-700">100% Present</strong>
          <span className="block text-[11px] text-emerald-600 mt-1">✓ 26 / 26 Working Days</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Disbursed Salary</span>
          <strong className="text-lg font-black text-slate-900 font-mono">PKR 41,500</strong>
          <span className="block text-[11px] text-emerald-700 mt-1">✓ Credited via Bank</span>
        </div>
      </div>

      {/* Today's Support Duty Tasks */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Calendar size={16} className="text-imam-blue" />
          Today's Campus &amp; Hospital Assigned Duties
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <strong className="text-slate-800 block">08:00 AM — Campus Smart Lecture Halls Opening &amp; Preparation</strong>
              <span className="text-slate-500">Hall 1 &amp; 2 ready for BSN theory classes</span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
              Completed
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <strong className="text-slate-800 block">11:30 AM — Official Dispatch to Imam Medical Center ER Ward</strong>
              <span className="text-slate-500">Deliver clinical student logbook register to preceptor</span>
            </div>
            <span className="bg-blue-100 text-imam-blue font-bold px-2 py-0.5 rounded text-[10px]">
              In Progress
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <strong className="text-slate-800 block">02:30 PM — Pathology Lab Consumables Inward Receiving</strong>
              <span className="text-slate-500">Supervised by Mumtaz Kanasro (Admin)</span>
            </div>
            <span className="bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded text-[10px]">
              Upcoming
            </span>
          </div>
        </div>
      </div>

      {/* Itemized Salary Slip Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-sans">
          <h3 className="font-extrabold text-slate-900 text-sm">
            October 2026 Salary Slip • {user.fullName}
          </h3>
          <span className="text-xs text-slate-400 font-mono">Imam Institute</span>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between">
            <span className="font-sans text-slate-600">Basic Monthly Wage:</span>
            <span className="text-slate-900 font-bold">PKR 38,000</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-slate-600">Medical / Conveyance Allowance:</span>
            <span className="text-slate-900 font-bold">PKR 5,000</span>
          </div>
          <div className="flex justify-between text-rose-700">
            <span className="font-sans text-slate-600">EOBI Employee Deduction:</span>
            <span>- PKR 1,500</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 font-sans font-bold text-sm text-emerald-800 bg-emerald-50/50 p-2 rounded-lg">
            <span>Net Paid Salary:</span>
            <span className="font-mono font-black text-base">PKR 41,500</span>
          </div>
        </div>
      </div>
    </div>
  );
};
