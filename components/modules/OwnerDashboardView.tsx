'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Building2,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Users,
  Wallet,
  Calendar,
  FileCheck2,
} from 'lucide-react';
import { approveItem, rejectItem } from '@/app/actions/approvals';
import { ExpensePaymentVoucherPrint } from '@/components/print/ExpensePaymentVoucherPrint';

interface OwnerDashboardProps {
  initialData: {
    todayCashInHand: number;
    bankDeposits: number;
    monthlyFeeCollection: number;
    monthlyCollectionTarget: number;
    monthlyExpenses: number;
    monthlyPayroll: number;
    netOperatingSurplus: number;
    totalReceivables: number;
    cashRunwayMonths: number;
    budgetAlertsCount: number;
    pendingApprovals: Array<{
      id: string;
      title: string;
      type: string;
      referenceId: string | null;
      requestedBy: string;
      amount: number | null;
      details: string;
      status: string;
      createdAt: string;
    }>;
    programPL: Array<{
      code: string;
      name: string;
      inflow: number;
      facultyPayroll: number;
      labConsumables: number;
      netMargin: number;
      studentCount: number;
    }>;
    aiBriefing: string;
    lang: 'en' | 'ur' | 'sd';
  };
}

export const OwnerDashboardView: React.FC<OwnerDashboardProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [selectedVoucherForPrint, setSelectedVoucherForPrint] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<'en' | 'ur' | 'sd'>(initialData.lang);
  const [aiBrief, setAiBrief] = useState(initialData.aiBriefing);

  const handleApprove = async (itemId: string) => {
    setIsProcessing(itemId);
    try {
      await approveItem(itemId);
      setData((prev) => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals.filter((item) => item.id !== itemId),
      }));
    } catch (e) {
      alert('Error approving item');
    } finally {
      setIsProcessing(null);
    }
  };

  const handleReject = async (itemId: string) => {
    const reason = prompt('Enter rejection reason:') || 'Rejected by Owner';
    setIsProcessing(itemId);
    try {
      await rejectItem(itemId, reason);
      setData((prev) => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals.filter((item) => item.id !== itemId),
      }));
    } catch (e) {
      alert('Error rejecting item');
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Owner Welcome & AI Morning Brief Card */}
      <div className="bg-gradient-to-r from-imam-navy via-[#004f91] to-imam-navy text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-white/10 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 inline-flex items-center gap-1.5">
                <Sparkles size={14} /> Chairman Executive Command Suite
              </span>
              <h1 className="text-xl sm:text-2xl font-black mt-2 tracking-tight">
                Mr. Sajid Hussain
              </h1>
              <p className="text-xs sm:text-sm text-sky-200">
                Chairman &amp; Managing Director • Executive Management Board
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-sky-200 font-medium">Brief Language:</span>
              <div className="bg-black/30 p-1 rounded-xl flex items-center border border-white/10">
                <button
                  onClick={() => setActiveLang('en')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                    activeLang === 'en' ? 'bg-imam-blue text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setActiveLang('ur')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition font-urdu ${
                    activeLang === 'ur' ? 'bg-imam-blue text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  اردو
                </button>
                <button
                  onClick={() => setActiveLang('sd')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition font-sindhi ${
                    activeLang === 'sd' ? 'bg-imam-blue text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  سنڌي
                </button>
              </div>
            </div>
          </div>

          {/* AI Executive Morning Brief */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-amber-300 mb-2">
              <Sparkles size={16} /> 30-Second AI Morning Briefing ({activeLang.toUpperCase()}):
            </div>
            <div
              className={`whitespace-pre-line text-sky-100 ${
                activeLang !== 'en' ? 'font-urdu text-right text-sm leading-loose' : ''
              }`}
            >
              {aiBrief}
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Financial Pulse Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Today's Cash in Hand */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Today's Cash in Hand</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <Wallet size={18} />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 font-mono">
            PKR {data.todayCashInHand.toLocaleString()}
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle size={13} /> Main Campus Safe Vault
          </div>
        </div>

        {/* Bank Deposits */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">HBL Bank Balance</span>
            <div className="p-2 bg-blue-50 text-imam-blue rounded-xl">
              <Building2 size={18} />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 font-mono">
            PKR {data.bankDeposits.toLocaleString()}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>A/C #...8821</span>
            <span className="font-bold text-slate-700">100% Reconciled</span>
          </div>
        </div>

        {/* Net Operating Surplus / Profit */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Net Operating Surplus</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-emerald-700 font-mono">
            PKR {data.netOperatingSurplus.toLocaleString()}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Revenue - Expenses</span>
            <span className="font-bold text-emerald-600">+22.4% MoM</span>
          </div>
        </div>

        {/* Total Receivables (Pending Student Dues) */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Pending Student Dues</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-amber-700 font-mono">
            PKR {data.totalReceivables.toLocaleString()}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Defaulter Radar Active</span>
            <span className="font-bold text-amber-700">2 Defaulters</span>
          </div>
        </div>
      </div>

      {/* Monthly Collection Target Progress & Cash Runway */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Monthly Fee Collection vs Target
              </h2>
              <p className="text-xs text-slate-500">
                Collected PKR {data.monthlyFeeCollection.toLocaleString()} of target PKR {data.monthlyCollectionTarget.toLocaleString()}
              </p>
            </div>
            <span className="text-base font-black text-imam-blue font-mono">
              {Math.round((data.monthlyFeeCollection / data.monthlyCollectionTarget) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-imam-blue h-3 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  (data.monthlyFeeCollection / data.monthlyCollectionTarget) * 100
                )}%`,
              }}
            ></div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Campus Expenses:</span>
              <strong className="text-slate-800 font-mono">PKR {data.monthlyExpenses.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Staff Payroll:</span>
              <strong className="text-slate-800 font-mono">PKR {data.monthlyPayroll.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Operational Runway:</span>
              <strong className="text-emerald-700 font-mono">{data.cashRunwayMonths.toFixed(1)} Months</strong>
            </div>
          </div>
        </div>

        {/* Budget Guardrail Alert Card */}
        <div className="bg-rose-50 rounded-2xl p-5 border border-rose-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wide">
              <ShieldAlert size={16} /> Budget Guardrail Alert
            </div>
            <h3 className="text-sm font-extrabold text-rose-950 mt-1">
              Lab Consumables &gt; 90% Allocated Budget
            </h3>
            <p className="text-xs text-rose-800 mt-1.5 leading-relaxed">
              Pathology &amp; Skills Lab spending has hit <strong>92.8%</strong> of its PKR 350,000 limit. Voucher CPV-2026-0013 requires Chairman approval.
            </p>
          </div>
          <div className="mt-3 text-[11px] font-bold text-rose-700 bg-white/70 py-1.5 px-3 rounded-lg border border-rose-200 text-center">
            Automatic Expense Lock Active
          </div>
        </div>
      </div>

      {/* Owner One-Tap Mobile Approval Inbox */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileCheck2 size={18} className="text-imam-blue" />
              Owner One-Tap Mobile Approval Inbox
            </h2>
            <p className="text-xs text-slate-500">
              High-value expense vouchers (&gt; PKR 25,000), fee concessions &amp; payroll sign-offs
            </p>
          </div>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
            {data.pendingApprovals.length} Pending
          </span>
        </div>

        {data.pendingApprovals.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <CheckCircle className="mx-auto text-emerald-600 mb-2" size={32} />
            <h3 className="text-sm font-bold text-slate-800">All Approvals Cleared!</h3>
            <p className="text-xs text-slate-500 mt-1">
              No pending high-value expenses or concessions requiring your review.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.pendingApprovals.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-imam-blue/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                      {item.type.replace(/_/g, ' ')}
                    </span>
                    {item.referenceId && (
                      <span className="text-xs font-mono font-bold text-imam-navy">
                        {item.referenceId}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{item.details}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                    <span>Requested by: <strong className="text-slate-600">{item.requestedBy}</strong></span>
                    <span>•</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
                  {item.amount && (
                    <div className="text-base font-black text-slate-900 font-mono">
                      PKR {item.amount.toLocaleString()}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(item.id)}
                      disabled={isProcessing === item.id}
                      className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition flex items-center gap-1 active:scale-95"
                    >
                      <XCircle size={14} />
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      disabled={isProcessing === item.id}
                      data-testid={`approve-btn-${item.id}`}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition flex items-center gap-1 active:scale-95"
                    >
                      <CheckCircle size={14} />
                      {isProcessing === item.id ? 'Approving...' : 'Approve'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Program-Wise Profitability & P&L Breakdown */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-extrabold text-slate-900">
            Program-Wise Departmental P&amp;L Breakdown
          </h2>
          <p className="text-xs text-slate-500">
            Tuition fee inflows vs faculty payroll &amp; clinical consumable costs per academic program
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Program</th>
                <th className="py-2.5 px-3 text-center">Active Enrolled</th>
                <th className="py-2.5 px-3 text-right">Fee Inflow (PKR)</th>
                <th className="py-2.5 px-3 text-right">Faculty Payroll</th>
                <th className="py-2.5 px-3 text-right">Consumables</th>
                <th className="py-2.5 px-3 text-right">Net Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {data.programPL.map((p) => (
                <tr key={p.code} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-sans font-bold text-slate-900">
                    {p.name}
                    <span className="block text-[10px] font-mono text-slate-400 font-normal">
                      Code: {p.code}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center text-slate-700">{p.studentCount}</td>
                  <td className="py-3 px-3 text-right text-emerald-700 font-semibold">
                    +{p.inflow.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600">
                    -{p.facultyPayroll.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600">
                    -{p.labConsumables.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        p.netMargin >= 0
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-rose-50 text-rose-800'
                      }`}
                    >
                      PKR {p.netMargin.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render modal if voucher selected for printing */}
      {selectedVoucherForPrint && (
        <ExpensePaymentVoucherPrint
          voucher={selectedVoucherForPrint}
          onClose={() => setSelectedVoucherForPrint(null)}
        />
      )}
    </div>
  );
};
