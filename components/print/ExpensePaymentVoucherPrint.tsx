'use client';

import React from 'react';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { Printer, X } from 'lucide-react';

interface VoucherData {
  voucherNo: string;
  categoryName: string;
  vendorName: string;
  amount: number;
  paymentMode: string;
  costCenter: string;
  description: string;
  status: string;
  preparedBy: string;
  checkedBy?: string | null;
  approvedBy?: string | null;
  createdAt: string;
}

interface ExpensePaymentVoucherPrintProps {
  voucher: VoucherData;
  onClose: () => void;
}

export const ExpensePaymentVoucherPrint: React.FC<ExpensePaymentVoucherPrintProps> = ({
  voucher,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto">
      {/* Action Header */}
      <div className="print:hidden w-full max-w-2xl bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-4 flex items-center justify-between border border-slate-200">
        <div>
          <span className="font-bold text-slate-800 text-sm sm:text-base">
            Payment Voucher ({voucher.voucherNo})
          </span>
          <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            {voucher.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            data-testid="print-voucher-btn"
            className="bg-imam-blue hover:bg-imam-navy text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-sm transition active:scale-95"
          >
            <Printer size={16} />
            Print Voucher (A5)
          </button>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Official A5 Payment Voucher Document */}
      <div className="bg-white text-black w-full max-w-2xl p-6 sm:p-8 shadow-2xl rounded-lg border border-slate-300 font-sans print:border-none print:shadow-none print:p-4 print:m-0 print:w-full print:max-w-none">
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <ImamCrestLogo size={56} showText={false} />
            <div>
              <h1 className="text-base sm:text-lg font-black uppercase text-slate-900 tracking-tight">
                IMAM INSTITUTE
              </h1>
              <p className="text-xs font-bold text-imam-blue uppercase">
                Nursing &amp; Allied Health Sciences
              </p>
              <p className="text-[10px] text-slate-500">
                Finance, Budget &amp; Campus Accounts Branch
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider block text-imam-navy bg-slate-100 px-3 py-1 rounded border border-slate-300">
              {voucher.paymentMode.toUpperCase()} PAYMENT VOUCHER
            </span>
            <span className="text-xs font-mono font-bold text-slate-900 block mt-1">
              {voucher.voucherNo}
            </span>
            <span className="text-[10px] text-slate-500 block">
              Date: {new Date(voucher.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Voucher Fields */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-4 p-3 bg-slate-50 rounded border border-slate-200">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Payee / Vendor Name:</span>
            <strong className="text-slate-900 text-sm">{voucher.vendorName}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Cost Center / Program:</span>
            <strong className="text-slate-900">{voucher.costCenter}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Expense Category:</span>
            <span className="text-slate-800">{voucher.categoryName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Payment Mode:</span>
            <span className="text-slate-800 font-bold">{voucher.paymentMode}</span>
          </div>
        </div>

        {/* Description & Amount */}
        <div className="border border-slate-300 rounded overflow-hidden mb-6">
          <div className="bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 flex justify-between border-b border-slate-300">
            <span>Description / Particulars of Expenditure</span>
            <span>Amount (PKR)</span>
          </div>
          <div className="p-3 text-xs flex justify-between items-start min-h-[80px]">
            <p className="text-slate-800 max-w-[80%] leading-relaxed font-serif">
              {voucher.description}
            </p>
            <span className="font-mono font-bold text-sm text-slate-900">
              PKR {voucher.amount.toLocaleString()}
            </span>
          </div>
          <div className="bg-slate-50 px-3 py-2 text-xs font-bold flex justify-between border-t border-slate-300">
            <span className="uppercase text-slate-700">Total Net Disbursed:</span>
            <span className="font-mono text-base font-black text-slate-900">
              PKR {voucher.amount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 4 Official Signature Blocks */}
        <div className="grid grid-cols-4 gap-2 pt-6 border-t border-slate-300 text-center text-[10px] text-slate-700">
          <div>
            <div className="h-10 flex items-end justify-center font-serif text-[11px] text-slate-800 italic">
              {voucher.preparedBy}
            </div>
            <div className="border-t border-slate-400 pt-1 font-semibold">Prepared By</div>
            <span className="text-[9px] text-slate-400">(Admin / Requisitioner)</span>
          </div>

          <div>
            <div className="h-10 flex items-end justify-center font-serif text-[11px] text-slate-800 italic">
              {voucher.checkedBy || 'Muhammad Asif'}
            </div>
            <div className="border-t border-slate-400 pt-1 font-semibold">Checked By</div>
            <span className="text-[9px] text-slate-400">(Accounts Section)</span>
          </div>

          <div>
            <div className="h-10 flex items-end justify-center font-serif text-[11px] text-slate-900 font-bold">
              {voucher.approvedBy || (voucher.status === 'APPROVED' ? 'Dr. Ghulam Hussain' : 'Pending')}
            </div>
            <div className="border-t border-slate-400 pt-1 font-semibold text-imam-navy">Approved By</div>
            <span className="text-[9px] text-slate-400">(Chairman / Owner)</span>
          </div>

          <div>
            <div className="h-10 flex items-end justify-center font-serif text-[11px] text-slate-400 italic">
              Sign &amp; Stamp
            </div>
            <div className="border-t border-slate-400 pt-1 font-semibold">Receiver Sign</div>
            <span className="text-[9px] text-slate-400">(Vendor / Payee)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
