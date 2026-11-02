'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  DollarSign,
  Scale,
  FileSpreadsheet,
  PlusCircle,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  Layers,
  Printer,
} from 'lucide-react';
import { createJournalEntry, reverseJournalEntry } from '@/app/actions/finance-ledger';

interface DoubleEntryLedgerViewProps {
  chartOfAccounts: Array<{
    id: string;
    code: string;
    title: string;
    accountType: string;
    normalBalance: string;
    currentBalance: number;
  }>;
  journalEntries: Array<{
    id: string;
    voucherNo: string;
    voucherType: string;
    entryDate: string;
    description: string;
    referenceNo?: string | null;
    status: string;
    postedBy: string;
    totalAmount: number;
    lines: Array<{
      id: string;
      accountCode: string;
      accountTitle: string;
      debit: number;
      credit: number;
      costCenter?: string | null;
      narration?: string | null;
    }>;
  }>;
}

export const DoubleEntryLedgerView: React.FC<DoubleEntryLedgerViewProps> = ({
  chartOfAccounts: initialCOA,
  journalEntries: initialEntries,
}) => {
  const [activeTab, setActiveTab] = useState<'ENTRIES' | 'COA' | 'TRIAL_BALANCE' | 'STATEMENTS'>('ENTRIES');
  const [journalEntries, setJournalEntries] = useState(initialEntries);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccountFilter, setSelectedAccountFilter] = useState('ALL');

  // New Journal Voucher Modal
  const [showNewVoucherModal, setShowNewVoucherModal] = useState(false);
  const [voucherType, setVoucherType] = useState<'JOURNAL' | 'CASH_PAYMENT' | 'BANK_PAYMENT' | 'CASH_RECEIPT' | 'BANK_RECEIPT'>('JOURNAL');
  const [voucherDesc, setVoucherDesc] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [lines, setLines] = useState([
    { accountHeadId: initialCOA[0]?.id || '', debit: 0, credit: 0, narration: '' },
    { accountHeadId: initialCOA[1]?.id || '', debit: 0, credit: 0, narration: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reverse Voucher Modal
  const [voucherToReverse, setVoucherToReverse] = useState<string | null>(null);
  const [reversalReason, setReversalReason] = useState('');
  const [isReversing, setIsReversing] = useState(false);

  // Calculate totals for new entry form
  const totalDebit = lines.reduce((s, l) => s + (Number(l.debit) || 0), 0);
  const totalCredit = lines.reduce((s, l) => s + (Number(l.credit) || 0), 0);
  const isFormBalanced = Math.abs(totalDebit - totalCredit) < 0.001 && totalDebit > 0;

  // Filter journal entries
  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch =
      entry.voucherNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.referenceNo && entry.referenceNo.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAccount =
      selectedAccountFilter === 'ALL' ||
      entry.lines.some((l) => l.accountCode === selectedAccountFilter);

    return matchesSearch && matchesAccount;
  });

  // Calculate Trial Balance dynamically
  const trialBalanceRows = initialCOA.map((acc) => {
    let debits = 0;
    let credits = 0;
    for (const e of journalEntries.filter((je) => je.status === 'POSTED')) {
      for (const l of e.lines) {
        if (l.accountCode === acc.code) {
          debits += l.debit;
          credits += l.credit;
        }
      }
    }

    let netDebit = 0;
    let netCredit = 0;
    if (['ASSET', 'EXPENSE'].includes(acc.accountType)) {
      netDebit = Math.max(0, debits - credits);
      netCredit = debits < credits ? credits - debits : 0;
    } else {
      netCredit = Math.max(0, credits - debits);
      netDebit = credits < debits ? debits - credits : 0;
    }

    return {
      code: acc.code,
      title: acc.title,
      type: acc.accountType,
      debit: netDebit,
      credit: netCredit,
    };
  });

  const totalTrialDebit = trialBalanceRows.reduce((s, r) => s + r.debit, 0);
  const totalTrialCredit = trialBalanceRows.reduce((s, r) => s + r.credit, 0);
  const isTrialBalanced = Math.abs(totalTrialDebit - totalTrialCredit) < 0.01;

  // Financial statements
  const totalAssets = trialBalanceRows.filter((r) => r.type === 'ASSET').reduce((s, r) => s + r.debit - r.credit, 0);
  const totalLiabilities = trialBalanceRows.filter((r) => r.type === 'LIABILITY').reduce((s, r) => s + r.credit - r.debit, 0);
  const totalEquity = trialBalanceRows.filter((r) => r.type === 'EQUITY').reduce((s, r) => s + r.credit - r.debit, 0);
  const totalRevenue = trialBalanceRows.filter((r) => r.type === 'REVENUE').reduce((s, r) => s + r.credit - r.debit, 0);
  const totalExpenses = trialBalanceRows.filter((r) => r.type === 'EXPENSE').reduce((s, r) => s + r.debit - r.credit, 0);
  const netSurplus = totalRevenue - totalExpenses;

  const handleAddLine = () => {
    setLines([...lines, { accountHeadId: initialCOA[0]?.id || '', debit: 0, credit: 0, narration: '' }]);
  };

  const handleRemoveLine = (idx: number) => {
    if (lines.length <= 2) return;
    setLines(lines.filter((_, i) => i !== idx));
  };

  const handleCreateVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormBalanced) {
      alert(`Voucher is not balanced! Debits (PKR ${totalDebit}) must equal Credits (PKR ${totalCredit}).`);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createJournalEntry({
        voucherType,
        description: voucherDesc,
        referenceNo: referenceNo || undefined,
        postedBy: 'Mr. Sajid Hussain (Chairman / Controller)',
        lines,
      });

      if (res.success && res.entry) {
        const enrichedEntry = {
          ...res.entry,
          entryDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          lines: res.entry.lines.map((l: any) => {
            const acc = initialCOA.find((a) => a.id === l.accountHeadId);
            return {
              ...l,
              accountCode: acc?.code || '1001',
              accountTitle: acc?.title || 'Account',
            };
          }),
        };

        setJournalEntries([enrichedEntry as any, ...journalEntries]);
        setShowNewVoucherModal(false);
        setVoucherDesc('');
        setReferenceNo('');
        alert(`Double-entry voucher ${res.voucherNo} posted successfully to the General Ledger!`);
      } else {
        alert(res.error || 'Failed to post voucher.');
      }
    } catch (err: any) {
      alert('Error creating journal entry: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReverseVoucher = async () => {
    if (!voucherToReverse || !reversalReason.trim()) {
      alert('Please state a valid audit reason for reversal.');
      return;
    }

    setIsReversing(true);
    try {
      const res = await reverseJournalEntry(voucherToReverse, reversalReason, 'Chief Accountant / Chairman');
      if (res.success) {
        setJournalEntries(
          journalEntries.map((e) => (e.voucherNo === voucherToReverse ? { ...e, status: 'REVERSED' } : e))
        );
        setVoucherToReverse(null);
        setReversalReason('');
        alert(`Voucher reversed! Linked counter-entry ${res.reversalVoucherNo} posted to general ledger.`);
      } else {
        alert(res.error || 'Reversal failed');
      }
    } catch (e: any) {
      alert('Error reversing voucher: ' + e.message);
    } finally {
      setIsReversing(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-imam-navy via-[#004f91] to-imam-navy text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-emerald-400/30">
              Double-Entry Accounting System
            </span>
            <span className="text-xs font-mono text-sky-200">FY 2026-2027 • Cash &amp; Accrual</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black mt-1 tracking-tight flex items-center gap-2">
            <BookOpen className="text-emerald-400" /> General Ledger &amp; Financial Controller
          </h1>
          <p className="text-xs sm:text-sm text-sky-200">
            Strict double-entry bookkeeping, 5-tier Chart of Accounts, balanced vouchers &amp; real-time statements
          </p>
        </div>

        <button
          onClick={() => setShowNewVoucherModal(true)}
          data-testid="new-journal-entry-btn"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95 shrink-0"
        >
          <PlusCircle size={16} />
          Post New Voucher
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold w-full max-w-2xl">
        <button
          onClick={() => setActiveTab('ENTRIES')}
          data-testid="tab-journal-entries"
          className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center text-center ${
            activeTab === 'ENTRIES' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Journal Entries ({filteredEntries.length})
        </button>
        <button
          onClick={() => setActiveTab('COA')}
          data-testid="tab-chart-accounts"
          className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center text-center ${
            activeTab === 'COA' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Chart of Accounts ({initialCOA.length})
        </button>
        <button
          onClick={() => setActiveTab('TRIAL_BALANCE')}
          data-testid="tab-trial-balance"
          className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center text-center ${
            activeTab === 'TRIAL_BALANCE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Trial Balance
        </button>
        <button
          onClick={() => setActiveTab('STATEMENTS')}
          data-testid="tab-financial-statements"
          className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center text-center ${
            activeTab === 'STATEMENTS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          P&amp;L / Balance Sheet
        </button>
      </div>

      {/* TAB 1: JOURNAL ENTRIES & VOUCHERS */}
      {activeTab === 'ENTRIES' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search voucher #, description, or reference..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-imam-blue"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500">Filter Account:</label>
              <select
                value={selectedAccountFilter}
                onChange={(e) => setSelectedAccountFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="ALL">All Accounts</option>
                {initialCOA.map((a) => (
                  <option key={a.id} value={a.code}>
                    {a.code} - {a.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Vouchers List */}
          <div className="space-y-3">
            {filteredEntries.map((voucher) => (
              <div
                key={voucher.id}
                className={`bg-white rounded-2xl border p-5 shadow-sm transition ${
                  voucher.status === 'REVERSED'
                    ? 'border-rose-200 bg-rose-50/20 opacity-80'
                    : 'border-slate-200 hover:border-imam-blue/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {voucher.voucherNo}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        voucher.status === 'POSTED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {voucher.status}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(voucher.entryDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Total:</span>
                    <strong className="text-sm font-black text-slate-900 font-mono">
                      PKR {voucher.totalAmount.toLocaleString()}
                    </strong>
                    {voucher.status === 'POSTED' && (
                      <button
                        onClick={() => {
                          setVoucherToReverse(voucher.voucherNo);
                          setReversalReason('');
                        }}
                        className="text-[11px] font-bold text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-lg transition ml-2 border border-rose-200"
                      >
                        <RotateCcw size={12} className="inline mr-1" /> Reverse
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-700 font-medium mb-3">{voucher.description}</p>

                {/* Double Entry Lines Table */}
                <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 text-xs">
                  <div className="grid grid-cols-12 bg-slate-100/80 px-3 py-1.5 font-bold text-slate-500 text-[11px]">
                    <div className="col-span-3">Account Code &amp; Title</div>
                    <div className="col-span-5">Narration / Cost Center</div>
                    <div className="col-span-2 text-right">Debit (PKR)</div>
                    <div className="col-span-2 text-right">Credit (PKR)</div>
                  </div>
                  {voucher.lines.map((line, idx) => (
                    <div
                      key={line.id || idx}
                      className="grid grid-cols-12 px-3 py-2 border-t border-slate-200/60 font-mono text-xs items-center"
                    >
                      <div className="col-span-3 font-sans font-bold text-slate-800">
                        <span className="text-slate-400 mr-1.5">{line.accountCode}</span>
                        {line.accountTitle}
                      </div>
                      <div className="col-span-5 font-sans text-slate-500 truncate">
                        {line.narration || '—'}
                        {line.costCenter && (
                          <span className="ml-2 text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-sans">
                            {line.costCenter}
                          </span>
                        )}
                      </div>
                      <div className="col-span-2 text-right font-black text-slate-900">
                        {line.debit > 0 ? line.debit.toLocaleString() : '—'}
                      </div>
                      <div className="col-span-2 text-right font-black text-slate-900">
                        {line.credit > 0 ? line.credit.toLocaleString() : '—'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CHART OF ACCOUNTS (COA) */}
      {activeTab === 'COA' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">5-Tier Standard Chart of Accounts</h2>
              <p className="text-xs text-slate-500">Assets (1000), Liabilities (2000), Equity (3000), Revenue (4000), Expenses (5000)</p>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-700">
              {initialCOA.length} Active Heads
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {initialCOA.map((acc) => {
              const typeColors: Record<string, string> = {
                ASSET: 'border-blue-200 bg-blue-50/30 text-blue-900',
                LIABILITY: 'border-amber-200 bg-amber-50/30 text-amber-900',
                EQUITY: 'border-purple-200 bg-purple-50/30 text-purple-900',
                REVENUE: 'border-emerald-200 bg-emerald-50/30 text-emerald-900',
                EXPENSE: 'border-rose-200 bg-rose-50/30 text-rose-900',
              };

              return (
                <div
                  key={acc.id}
                  className={`p-4 rounded-xl border ${typeColors[acc.accountType] || 'border-slate-200'} space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-white shadow-2xs">
                      {acc.code}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {acc.accountType}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{acc.title}</h4>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-black/5">
                    <span className="text-slate-500">Normal: {acc.normalBalance}</span>
                    <span className="font-mono font-black text-slate-900">
                      PKR {acc.currentBalance.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: TRIAL BALANCE */}
      {activeTab === 'TRIAL_BALANCE' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Scale className="text-imam-blue" /> Institutional Trial Balance
              </h2>
              <p className="text-xs text-slate-500">
                Self-balancing arithmetic check of General Ledger posting debits and credits
              </p>
            </div>

            <div
              className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 ${
                isTrialBalanced
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-rose-50 border-rose-300 text-rose-800'
              }`}
            >
              {isTrialBalanced ? (
                <>
                  <CheckCircle2 size={16} /> Balanced Books (Debits = Credits)
                </>
              ) : (
                <>
                  <AlertTriangle size={16} /> Trial Balance Out of Balance
                </>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-slate-100 text-slate-600 uppercase text-[10px]">
                  <th className="p-3 font-bold">Code</th>
                  <th className="p-3 font-bold font-sans">Account Head Title</th>
                  <th className="p-3 font-bold font-sans">Category</th>
                  <th className="p-3 font-bold text-right">Debit Balance (PKR)</th>
                  <th className="p-3 font-bold text-right">Credit Balance (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trialBalanceRows.map((row) => (
                  <tr key={row.code} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-700">{row.code}</td>
                    <td className="p-3 font-sans font-bold text-slate-900">{row.title}</td>
                    <td className="p-3 font-sans text-slate-500">{row.type}</td>
                    <td className="p-3 text-right font-black text-slate-900">
                      {row.debit > 0 ? row.debit.toLocaleString() : '—'}
                    </td>
                    <td className="p-3 text-right font-black text-slate-900">
                      {row.credit > 0 ? row.credit.toLocaleString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-900 text-white font-black text-sm">
                  <td colSpan={3} className="p-3 font-sans">
                    TOTAL GENERAL LEDGER BALANCES:
                  </td>
                  <td className="p-3 text-right text-emerald-400">
                    PKR {totalTrialDebit.toLocaleString()}
                  </td>
                  <td className="p-3 text-right text-emerald-400">
                    PKR {totalTrialCredit.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: FINANCIAL STATEMENTS (P&L & BALANCE SHEET) */}
      {activeTab === 'STATEMENTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Statement of Income & Expenditure (P&L) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Statement of Operations
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">Income &amp; Expenditure Statement</h3>
              <p className="text-xs text-slate-500">For the period ended November 2026</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="font-bold text-slate-700 uppercase text-[11px] pb-1 border-b border-slate-100">
                Operating Revenue (4000)
              </div>
              {trialBalanceRows
                .filter((r) => r.type === 'REVENUE')
                .map((r) => (
                  <div key={r.code} className="flex justify-between items-center text-slate-600">
                    <span>{r.title}</span>
                    <span className="font-mono font-bold text-slate-900">PKR {r.credit.toLocaleString()}</span>
                  </div>
                ))}
              <div className="flex justify-between items-center font-black pt-2 border-t border-slate-200 text-sm">
                <span>TOTAL REVENUE:</span>
                <span className="text-emerald-700 font-mono">PKR {totalRevenue.toLocaleString()}</span>
              </div>

              <div className="font-bold text-slate-700 uppercase text-[11px] pt-4 pb-1 border-b border-slate-100">
                Operating Expenses (5000)
              </div>
              {trialBalanceRows
                .filter((r) => r.type === 'EXPENSE')
                .map((r) => (
                  <div key={r.code} className="flex justify-between items-center text-slate-600">
                    <span>{r.title}</span>
                    <span className="font-mono font-bold text-slate-900">PKR {r.debit.toLocaleString()}</span>
                  </div>
                ))}
              <div className="flex justify-between items-center font-black pt-2 border-t border-slate-200 text-sm">
                <span>TOTAL EXPENSES:</span>
                <span className="text-rose-700 font-mono">PKR {totalExpenses.toLocaleString()}</span>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 mt-4 flex justify-between items-center">
                <div>
                  <span className="block font-black text-sm text-emerald-950">NET OPERATING SURPLUS</span>
                  <span className="text-[11px] text-emerald-800">Transferred to Institutional Capital Reserve</span>
                </div>
                <strong className="text-lg font-black text-emerald-800 font-mono">
                  PKR {netSurplus.toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          {/* Balance Sheet */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Financial Position
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">Balance Sheet</h3>
              <p className="text-xs text-slate-500">As of November 2026 • Accounting Invariance</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="font-bold text-slate-700 uppercase text-[11px] pb-1 border-b border-slate-100">
                Assets (1000)
              </div>
              {trialBalanceRows
                .filter((r) => r.type === 'ASSET')
                .map((r) => (
                  <div key={r.code} className="flex justify-between items-center text-slate-600">
                    <span>{r.title}</span>
                    <span className="font-mono font-bold text-slate-900">PKR {r.debit.toLocaleString()}</span>
                  </div>
                ))}
              <div className="flex justify-between items-center font-black pt-2 border-t border-slate-200 text-sm text-blue-900">
                <span>TOTAL ASSETS:</span>
                <span className="font-mono">PKR {totalAssets.toLocaleString()}</span>
              </div>

              <div className="font-bold text-slate-700 uppercase text-[11px] pt-4 pb-1 border-b border-slate-100">
                Liabilities &amp; Equity (2000 &amp; 3000)
              </div>
              {trialBalanceRows
                .filter((r) => r.type === 'LIABILITY' || r.type === 'EQUITY')
                .map((r) => (
                  <div key={r.code} className="flex justify-between items-center text-slate-600">
                    <span>{r.title}</span>
                    <span className="font-mono font-bold text-slate-900">PKR {r.credit.toLocaleString()}</span>
                  </div>
                ))}
              <div className="flex justify-between items-center text-slate-600 font-bold">
                <span>Retained Operating Surplus (Current Year)</span>
                <span className="font-mono text-emerald-700">PKR {netSurplus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center font-black pt-2 border-t border-slate-200 text-sm text-blue-900">
                <span>TOTAL LIABILITIES &amp; EQUITY:</span>
                <span className="font-mono">
                  PKR {(totalLiabilities + totalEquity + netSurplus).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Post New Double-Entry Journal Voucher */}
      {showNewVoucherModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-5 sm:p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-black text-slate-900 text-lg mb-1">Post Double-Entry Journal Voucher</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enforces strict double-entry balance: Total Debits must exactly equal Total Credits before posting.
            </p>

            <form onSubmit={handleCreateVoucher} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Voucher Type:</label>
                  <select
                    value={voucherType}
                    onChange={(e: any) => setVoucherType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option value="JOURNAL">General Journal Voucher (JV)</option>
                    <option value="CASH_PAYMENT">Cash Payment Voucher (CPV)</option>
                    <option value="BANK_PAYMENT">Bank Payment Voucher (BPV)</option>
                    <option value="CASH_RECEIPT">Cash Receipt Voucher (CRV)</option>
                    <option value="BANK_RECEIPT">Bank Receipt Voucher (BRV)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reference / Cheque #:</label>
                  <input
                    type="text"
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    placeholder="e.g. CHQ-44910, HBL-FT-101"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Voucher Narration / Description:</label>
                <input
                  type="text"
                  value={voucherDesc}
                  onChange={(e) => setVoucherDesc(e.target.value)}
                  placeholder="State transaction purpose and supporting documents..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium"
                  required
                />
              </div>

              {/* Lines Entry */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-800">Double-Entry Account Lines:</span>
                  <button
                    type="button"
                    onClick={handleAddLine}
                    className="text-xs font-bold text-imam-blue hover:underline"
                  >
                    + Add Account Line
                  </button>
                </div>

                {lines.map((line, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 items-center">
                    <div className="col-span-5">
                      <select
                        value={line.accountHeadId}
                        onChange={(e) => {
                          const updated = [...lines];
                          updated[idx].accountHeadId = e.target.value;
                          setLines(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-bold"
                      >
                        {initialCOA.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.code} - {a.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-3">
                      <input
                        type="number"
                        placeholder="Debit"
                        value={line.debit || ''}
                        onChange={(e) => {
                          const updated = [...lines];
                          updated[idx].debit = parseFloat(e.target.value) || 0;
                          setLines(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-mono text-right text-xs"
                      />
                    </div>

                    <div className="col-span-3">
                      <input
                        type="number"
                        placeholder="Credit"
                        value={line.credit || ''}
                        onChange={(e) => {
                          const updated = [...lines];
                          updated[idx].credit = parseFloat(e.target.value) || 0;
                          setLines(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-mono text-right text-xs"
                      />
                    </div>

                    <div className="col-span-1 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveLine(idx)}
                        disabled={lines.length <= 2}
                        className="text-slate-400 hover:text-rose-600 disabled:opacity-30 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Balance Summary Pill */}
              <div
                className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono font-bold ${
                  isFormBalanced
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div>
                  Debits: PKR {totalDebit.toLocaleString()} • Credits: PKR {totalCredit.toLocaleString()}
                </div>
                <span>{isFormBalanced ? '✓ Balanced' : '✗ Out of Balance'}</span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewVoucherModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormBalanced}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold px-5 py-2 rounded-xl transition"
                >
                  {isSubmitting ? 'Posting...' : 'Post to General Ledger'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reverse Voucher */}
      {voucherToReverse && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">Authorize Voucher Reversal</h3>
            <p className="text-xs text-slate-500 mb-3">
              Reversing voucher <code className="font-bold text-slate-800">{voucherToReverse}</code> will generate a linked counter-entry in the General Ledger.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mandatory Audit Justification:</label>
                <textarea
                  rows={3}
                  value={reversalReason}
                  onChange={(e) => setReversalReason(e.target.value)}
                  placeholder="State discrepancy, duplicate entry, or authorized cancellation reason..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setVoucherToReverse(null)}
                  className="px-3 py-1.5 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReverseVoucher}
                  disabled={isReversing || !reversalReason.trim()}
                  className="bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-bold px-4 py-1.5 rounded-xl transition"
                >
                  {isReversing ? 'Reversing...' : 'Execute Reversal'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
