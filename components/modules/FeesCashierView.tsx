'use client';

import React, { useState } from 'react';
import {
  Banknote,
  Search,
  Printer,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Calendar,
  CreditCard,
  QrCode,
  FileSpreadsheet,
  Send,
  PlusCircle,
  Split,
} from 'lucide-react';
import { collectFeePayment } from '@/app/actions/fees';
import { BankChallanPrint } from '@/components/print/BankChallanPrint';
import { ThermalReceiptPrint } from '@/components/print/ThermalReceiptPrint';
import { generateWhatsAppReminder } from '@/lib/financial-engine';

interface ChallanWithStudent {
  id: string;
  challanNo: string;
  semester: number;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  lateFine: number;
  discountAmount: number;
  netPayable: number;
  paidAmount: number;
  status: string;
  student: {
    id: string;
    fullName: string;
    fatherName: string;
    rollNo: string;
    registrationNo: string;
    cnic: string;
    phone: string;
    fatherPhone: string;
    program: {
      name: string;
      code: string;
      baseTuitionFee: number;
      labFee: number;
      clinicalFee: number;
    };
  };
}

interface FeesCashierViewProps {
  challans: ChallanWithStudent[];
  cashierShift: {
    openingCash: number;
    totalCashCollected: number;
    totalOnlineCollected: number;
    expectedCashInHand: number;
  };
}

export const FeesCashierView: React.FC<FeesCashierViewProps> = ({
  challans: initialChallans,
  cashierShift,
}) => {
  const [challans, setChallans] = useState<ChallanWithStudent[]>(initialChallans);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'OVERDUE' | 'PAID' | 'PARTIAL'>('ALL');
  const [selectedChallanForCollection, setSelectedChallanForCollection] = useState<ChallanWithStudent | null>(null);
  const [selectedChallanForPrint, setSelectedChallanForPrint] = useState<ChallanWithStudent | null>(null);
  const [recentReceiptForPrint, setRecentReceiptForPrint] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Collection modal state
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH_COUNTER');
  const [transactionRef, setTransactionRef] = useState('');
  const [cashierNotes, setCashierNotes] = useState('');

  // Search filter
  const filteredChallans = challans.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.challanNo.toLowerCase().includes(q) ||
      c.student.fullName.toLowerCase().includes(q) ||
      c.student.rollNo.toLowerCase().includes(q) ||
      c.student.cnic.includes(q) ||
      c.student.phone.includes(q) ||
      c.student.fatherPhone.includes(q);

    if (activeTab === 'OVERDUE') return matchesSearch && c.status === 'OVERDUE';
    if (activeTab === 'PAID') return matchesSearch && c.status === 'PAID';
    if (activeTab === 'PARTIAL') return matchesSearch && c.status === 'PARTIAL';
    return matchesSearch;
  });

  const handleOpenCollection = (c: ChallanWithStudent) => {
    setSelectedChallanForCollection(c);
    const balance = c.netPayable - c.paidAmount;
    setPaymentAmount(balance.toString());
    setPaymentMethod('CASH_COUNTER');
    setTransactionRef('');
    setCashierNotes(`Fee collection for ${c.student.rollNo} Sem ${c.semester}`);
  };

  const handleConfirmCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallanForCollection) return;

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await collectFeePayment({
        challanId: selectedChallanForCollection.id,
        studentId: selectedChallanForCollection.student.id,
        amountPaid: amount,
        paymentMethod,
        transactionRef,
        cashierId: 'usr-supp-accountant',
        cashierName: 'Accountant / Clerk',
        notes: cashierNotes,
      });

      if (res.success) {
        // Update local challan state
        setChallans((prev) =>
          prev.map((item) =>
            item.id === selectedChallanForCollection.id
              ? {
                  ...item,
                  paidAmount: item.paidAmount + amount,
                  status: res.newStatus,
                }
              : item
          )
        );

        // Prepare thermal receipt
        setRecentReceiptForPrint({
          receiptNo: res.receiptNo,
          challanNo: selectedChallanForCollection.challanNo,
          studentName: selectedChallanForCollection.student.fullName,
          rollNo: selectedChallanForCollection.student.rollNo,
          programName: selectedChallanForCollection.student.program.name,
          semester: selectedChallanForCollection.semester,
          amountPaid: amount,
          paymentMethod,
          transactionRef,
          cashierName: 'Accountant / Clerk',
          date: new Date().toISOString(),
          notes: cashierNotes,
        });

        setSelectedChallanForCollection(null);
      }
    } catch (err) {
      alert('Error collecting fee payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Cash Register Snapshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Banknote className="text-imam-blue" /> Fast-Cashier Fees Collection Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            1-second student lookup, split-installment engine &amp; 3-copy bank challans
          </p>
        </div>

        {/* Live Cashier Drawer Pill */}
        <div className="bg-slate-900 text-white px-4 py-2 rounded-2xl flex items-center gap-4 text-xs font-mono shadow-sm">
          <div>
            <span className="text-slate-400 block text-[9px] uppercase">Cash Drawer (Vault):</span>
            <strong className="text-emerald-400 text-sm">
              PKR {cashierShift.expectedCashInHand.toLocaleString()}
            </strong>
          </div>
          <div className="border-l border-slate-700 pl-4">
            <span className="text-slate-400 block text-[9px] uppercase">Online/IBFT:</span>
            <strong className="text-sky-300 text-sm">
              PKR {cashierShift.totalOnlineCollected.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>

      {/* 1-Second Cashier Search Terminal & Quick Filter Tabs */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by Roll No (e.g. BSN-2024-004), Student Name, CNIC, Phone, or Barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="cashier-search-input"
            className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:border-imam-blue font-sans shadow-inner"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Challans ({challans.length})
            </button>
            <button
              onClick={() => setActiveTab('OVERDUE')}
              data-testid="filter-overdue-btn"
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'OVERDUE'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              Defaulter Radar (Overdue)
            </button>
            <button
              onClick={() => setActiveTab('PARTIAL')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'PARTIAL'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              Partial Installments
            </button>
            <button
              onClick={() => setActiveTab('PAID')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'PAID'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Cleared / Paid
            </button>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Showing {filteredChallans.length} records
          </span>
        </div>
      </div>

      {/* Challans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallans.map((c) => {
          const balance = c.netPayable - c.paidAmount;
          const isOverdue = c.status === 'OVERDUE';

          return (
            <div
              key={c.id}
              className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-sm transition hover:shadow-md flex flex-col justify-between ${
                isOverdue
                  ? 'border-rose-300 bg-rose-50/20'
                  : c.status === 'PAID'
                  ? 'border-emerald-200'
                  : 'border-slate-200/80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black text-imam-navy bg-slate-100 px-2 py-0.5 rounded">
                        {c.challanNo}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : c.status === 'PARTIAL'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">
                      {c.student.fullName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Father: {c.student.fatherName} • Roll No:{' '}
                      <strong className="text-slate-800 font-mono">{c.student.rollNo}</strong>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Net Payable</span>
                    <span className="text-base font-black text-slate-900 font-mono">
                      PKR {c.netPayable.toLocaleString()}
                    </span>
                    {balance > 0 && (
                      <span className="text-xs font-bold text-rose-700 block font-mono">
                        Due: PKR {balance.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Program & Fee Details */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-xs space-y-1 mb-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Program:</span>
                    <strong className="text-slate-900">{c.student.program.name}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Semester:</span>
                    <span>Semester {c.semester}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Due Date:</span>
                    <span className={isOverdue ? 'font-bold text-rose-700' : ''}>
                      {new Date(c.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  {c.lateFine > 0 && (
                    <div className="flex justify-between text-rose-700 font-semibold text-[11px]">
                      <span>Late Fine (PKR 100/day):</span>
                      <span>+PKR {c.lateFine.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedChallanForPrint(c)}
                    data-testid={`print-challan-${c.challanNo}`}
                    className="p-2 text-slate-600 hover:text-imam-blue hover:bg-slate-100 rounded-xl transition text-xs font-semibold flex items-center gap-1"
                    title="Print 3-Copy Bank Challan"
                  >
                    <Printer size={15} />
                    <span>3-Copy Challan</span>
                  </button>

                  {/* Trilingual WhatsApp Defaulter Reminder */}
                  {balance > 0 && (
                    <div className="flex items-center gap-1">
                      <a
                        href={generateWhatsAppReminder({
                          studentName: c.student.fullName,
                          fatherName: c.student.fatherName,
                          rollNo: c.student.rollNo,
                          phone: c.student.fatherPhone,
                          challanNo: c.challanNo,
                          dueAmount: balance,
                          dueDate: new Date(c.dueDate).toLocaleDateString(),
                          lang: 'en',
                        })}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center gap-0.5"
                        title="Send WhatsApp Reminder (English)"
                      >
                        <MessageCircle size={14} /> EN
                      </a>
                      <a
                        href={generateWhatsAppReminder({
                          studentName: c.student.fullName,
                          fatherName: c.student.fatherName,
                          rollNo: c.student.rollNo,
                          phone: c.student.fatherPhone,
                          challanNo: c.challanNo,
                          dueAmount: balance,
                          dueDate: new Date(c.dueDate).toLocaleDateString(),
                          lang: 'ur',
                        })}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-bold font-urdu"
                        title="Send WhatsApp Reminder (Urdu)"
                      >
                        اردو
                      </a>
                      <a
                        href={generateWhatsAppReminder({
                          studentName: c.student.fullName,
                          fatherName: c.student.fatherName,
                          rollNo: c.student.rollNo,
                          phone: c.student.fatherPhone,
                          challanNo: c.challanNo,
                          dueAmount: balance,
                          dueDate: new Date(c.dueDate).toLocaleDateString(),
                          lang: 'sd',
                        })}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-bold font-sindhi"
                        title="Send WhatsApp Reminder (Sindhi)"
                      >
                        سنڌي
                      </a>
                    </div>
                  )}
                </div>

                {balance > 0 ? (
                  <button
                    onClick={() => handleOpenCollection(c)}
                    data-testid={`collect-btn-${c.challanNo}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-sm transition flex items-center gap-1.5 active:scale-95"
                  >
                    <Banknote size={15} />
                    Collect Fee
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl flex items-center gap-1">
                    <CheckCircle2 size={14} /> Exam Slip Unlocked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Fast Fee Collection Desk */}
      {selectedChallanForCollection && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 sm:p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Collect Fee Payment
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {selectedChallanForCollection.challanNo} • {selectedChallanForCollection.student.rollNo}
                </p>
              </div>
              <button
                onClick={() => setSelectedChallanForCollection(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmCollection} className="mt-4 space-y-3.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-slate-700">
                <div className="flex justify-between">
                  <span>Student:</span>
                  <strong className="text-slate-900">
                    {selectedChallanForCollection.student.fullName}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Net Payable:</span>
                  <span className="font-mono">
                    PKR {selectedChallanForCollection.netPayable.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Already Paid:</span>
                  <span className="font-mono text-emerald-700">
                    PKR {selectedChallanForCollection.paidAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1">
                  <span>Remaining Dues:</span>
                  <span className="font-mono text-rose-700 text-sm">
                    PKR {(selectedChallanForCollection.netPayable - selectedChallanForCollection.paidAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Amount to Collect (PKR):
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  data-testid="collect-amount-input"
                  className="w-full border-2 border-slate-300 rounded-xl p-2.5 font-mono text-base font-bold text-slate-900 focus:outline-none focus:border-imam-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Payment Method:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                >
                  <option value="CASH_COUNTER">Cash Counter (Physical Cash)</option>
                  <option value="BANK_CHALLAN">Bank Challan Deposit (HBL)</option>
                  <option value="IBFT">IBFT / Online Bank Transfer</option>
                  <option value="JAZZCASH">JazzCash Merchant</option>
                  <option value="EASYPAISA">Easypaisa Wallet</option>
                </select>
              </div>

              {paymentMethod !== 'CASH_COUNTER' && (
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Bank / Wallet Transaction Ref #:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HBL-FT-88991204 / TID-992144"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-bold mb-1">Cashier Remarks:</label>
                <input
                  type="text"
                  value={cashierNotes}
                  onChange={(e) => setCashierNotes(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedChallanForCollection(null)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="confirm-collect-btn"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm transition active:scale-95"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm & Issue Receipt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3-Copy Bank Challan Print Modal */}
      {selectedChallanForPrint && (
        <BankChallanPrint
          challan={selectedChallanForPrint}
          onClose={() => setSelectedChallanForPrint(null)}
        />
      )}

      {/* Instant Thermal Receipt Print Modal */}
      {recentReceiptForPrint && (
        <ThermalReceiptPrint
          receipt={recentReceiptForPrint}
          onClose={() => setRecentReceiptForPrint(null)}
        />
      )}
    </div>
  );
};
