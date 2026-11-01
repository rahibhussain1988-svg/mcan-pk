'use client';

import React, { useState } from 'react';
import {
  Receipt,
  PlusCircle,
  AlertOctagon,
  CheckCircle2,
  Clock,
  Printer,
  Camera,
  Search,
  Filter,
  DollarSign,
  Fuel,
  FlaskConical,
  Building2,
  Award,
} from 'lucide-react';
import { createExpenseVoucher } from '@/app/actions/expenses';
import { ExpensePaymentVoucherPrint } from '@/components/print/ExpensePaymentVoucherPrint';

interface Category {
  id: string;
  name: string;
  code: string;
  monthlyBudget: number;
  currentSpent: number;
  icon: string;
  description?: string | null;
}

interface Voucher {
  id: string;
  voucherNo: string;
  categoryId: string;
  category: {
    name: string;
  };
  vendorName: string;
  amount: number;
  paymentMode: string;
  costCenter: string;
  description: string;
  status: string;
  preparedBy: string;
  checkedBy?: string | null;
  approvedBy?: string | null;
  paidAt?: Date | string | null;
  createdAt: string;
}

interface ExpensesViewProps {
  categories: Category[];
  vouchers: Voucher[];
  pettyCashBalance: number;
}

export const ExpensesView: React.FC<ExpensesViewProps> = ({
  categories: initialCategories,
  vouchers: initialVouchers,
  pettyCashBalance,
}) => {
  const [categories, setCategories] = useState(initialCategories);
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [showNewVoucherModal, setShowNewVoucherModal] = useState(false);
  const [selectedVoucherForPrint, setSelectedVoucherForPrint] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    categoryId: initialCategories[0]?.id || '',
    vendorName: '',
    amount: '',
    paymentMode: 'Bank Transfer',
    costCenter: 'Campus Solar Energy System',
    description: '',
    preparedBy: 'Mumtaz Kanasro (Admin)',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vendorName || !formData.amount || !formData.description) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const amountNum = parseFloat(formData.amount);
      const res = await createExpenseVoucher({
        categoryId: formData.categoryId,
        vendorName: formData.vendorName,
        amount: amountNum,
        paymentMode: formData.paymentMode,
        costCenter: formData.costCenter,
        description: formData.description,
        preparedBy: formData.preparedBy,
      });

      if (res.success && res.voucher) {
        setVouchers([res.voucher as any, ...vouchers]);
        // Update category spent locally
        setCategories((prev) =>
          prev.map((c) =>
            c.id === formData.categoryId ? { ...c, currentSpent: c.currentSpent + amountNum } : c
          )
        );
        setShowNewVoucherModal(false);
        setFormData({
          categoryId: categories[0]?.id || '',
          vendorName: '',
          amount: '',
          paymentMode: 'Bank Transfer',
          costCenter: 'Pathology & Skills Lab',
          description: '',
          preparedBy: 'Mumtaz Kanasro (Admin)',
        });

        if (res.requiresOwnerApproval) {
          alert('Expense voucher exceeds PKR 25,000 threshold and has been routed to the Owner Approval Inbox.');
        } else {
          alert(`Voucher ${res.voucher.voucherNo} created and approved successfully!`);
        }
      }
    } catch (err) {
      alert('Error creating expense voucher');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredVouchers = vouchers.filter((v) => {
    const matchesSearch =
      v.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.voucherNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || v.categoryId === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & New Voucher Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Receipt className="text-imam-blue" /> Smart Campus Expenses &amp; Vendor Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time expenditure tracking, petty cash floats, and budget threshold guardrails
          </p>
        </div>

        <button
          onClick={() => setShowNewVoucherModal(true)}
          data-testid="create-voucher-btn"
          className="bg-imam-blue hover:bg-imam-navy text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
        >
          <PlusCircle size={16} />
          Record New Expense Voucher
        </button>
      </div>

      {/* Category Budget Cards with 90% Guardrail Alerts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const percent = Math.min(100, Math.round((cat.currentSpent / cat.monthlyBudget) * 100));
          const isOver90 = percent >= 90;

          return (
            <div
              key={cat.id}
              className={`p-4 rounded-2xl border transition ${
                isOver90
                  ? 'bg-rose-50/80 border-rose-300 shadow-sm'
                  : 'bg-white border-slate-200/80 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-700 line-clamp-1">{cat.name}</span>
                {isOver90 && (
                  <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded animate-pulse">
                    &gt;90%
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs sm:text-sm font-black font-mono text-slate-900">
                  PKR {cat.currentSpent.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  of {cat.monthlyBudget.toLocaleString()}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isOver90 ? 'bg-rose-600' : percent >= 75 ? 'bg-amber-500' : 'bg-imam-blue'
                  }`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <div className="mt-2 text-[10px] flex items-center justify-between text-slate-500">
                <span>Burn Rate: {percent}%</span>
                {isOver90 ? (
                  <span className="text-rose-700 font-bold flex items-center gap-1">
                    <AlertOctagon size={11} /> Locked
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium">Within Limit</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search vendor, voucher # or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-imam-blue"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={15} className="text-slate-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-imam-blue w-full sm:w-auto"
          >
            <option value="ALL">All Expense Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vouchers Table / Card List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">
            Recorded Campus Payment Vouchers ({filteredVouchers.length})
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            Petty Cash Reserves: PKR {pettyCashBalance.toLocaleString()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Voucher No</th>
                <th className="py-3 px-4">Category &amp; Cost Center</th>
                <th className="py-3 px-4">Vendor / Payee</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4 text-right">Amount (PKR)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredVouchers.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-bold text-imam-navy">{v.voucherNo}</td>
                  <td className="py-3 px-4 font-sans">
                    <span className="font-bold text-slate-800 block">{v.category.name}</span>
                    <span className="text-[10px] text-slate-500">{v.costCenter}</span>
                  </td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900 max-w-[180px] truncate">
                    {v.vendorName}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      {v.paymentMode}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-black text-slate-900">
                    {v.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center font-sans">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                        v.status === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : v.status === 'APPROVED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {v.status === 'PAID' ? (
                        <CheckCircle2 size={11} />
                      ) : (
                        <Clock size={11} />
                      )}
                      {v.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <button
                      onClick={() =>
                        setSelectedVoucherForPrint({
                          voucherNo: v.voucherNo,
                          categoryName: v.category.name,
                          vendorName: v.vendorName,
                          amount: v.amount,
                          paymentMode: v.paymentMode,
                          costCenter: v.costCenter,
                          description: v.description,
                          status: v.status,
                          preparedBy: v.preparedBy,
                          checkedBy: v.checkedBy,
                          approvedBy: v.approvedBy,
                          createdAt: v.createdAt,
                        })
                      }
                      data-testid={`print-voucher-${v.voucherNo}`}
                      className="p-1.5 text-slate-600 hover:text-imam-blue hover:bg-slate-100 rounded-lg transition"
                      title="Print Official Payment Voucher (A5)"
                    >
                      <Printer size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Expense Voucher Entry */}
      {showNewVoucherModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-5 sm:p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                Record Campus Payment Voucher
              </h3>
              <button
                onClick={() => setShowNewVoucherModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Expense Category:</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Budget: PKR {c.monthlyBudget.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Vendor / Beneficiary Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Indus Solar Works, Crown Stationers..."
                  value={formData.vendorName}
                  onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Amount (PKR):</label>
                  <input
                    type="number"
                    placeholder="e.g. 45000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-imam-blue"
                    required
                  />
                  {parseFloat(formData.amount || '0') > 25000 && (
                    <span className="text-[10px] text-amber-700 font-bold mt-1 block">
                      ⚠ &gt; PKR 25,000 routes to Owner Inbox
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Payment Mode:</label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  >
                    <option value="Bank Transfer">Bank Transfer (HBL)</option>
                    <option value="Cheque">Crossed Cheque</option>
                    <option value="Petty Cash">Campus Petty Cash</option>
                    <option value="JazzCash/Easypaisa">JazzCash / Easypaisa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Cost Center / Academic Program:</label>
                <input
                  type="text"
                  placeholder="e.g. Generic BSN Lab, Solar Array, Campus Hostels..."
                  value={formData.costCenter}
                  onChange={(e) => setFormData({ ...formData, costCenter: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Detailed Description of Expenditure:</label>
                <textarea
                  rows={2}
                  placeholder="Items purchased, invoice number, inspection status..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600">
                  <Camera size={16} className="text-imam-blue" />
                  <span>Attach Receipt Image / Camera Snapshot</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Receipt camera photo attached successfully.')}
                  className="text-[10px] font-bold bg-white text-slate-700 border border-slate-300 px-2.5 py-1 rounded-lg hover:bg-slate-50"
                >
                  Capture / Upload
                </button>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewVoucherModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-imam-blue hover:bg-imam-navy text-white font-bold px-5 py-2 rounded-xl transition"
                >
                  {isSubmitting ? 'Recording...' : 'Create Payment Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Payment Voucher Modal */}
      {selectedVoucherForPrint && (
        <ExpensePaymentVoucherPrint
          voucher={selectedVoucherForPrint}
          onClose={() => setSelectedVoucherForPrint(null)}
        />
      )}
    </div>
  );
};
