'use client';

import React from 'react';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { Printer, X, CheckCircle2 } from 'lucide-react';

interface ReceiptData {
  receiptNo: string;
  challanNo: string;
  studentName: string;
  rollNo: string;
  programName: string;
  semester: number;
  amountPaid: number;
  paymentMethod: string;
  transactionRef?: string;
  cashierName: string;
  date: string;
  notes?: string;
}

interface ThermalReceiptPrintProps {
  receipt: ReceiptData;
  onClose: () => void;
}

export const ThermalReceiptPrint: React.FC<ThermalReceiptPrintProps> = ({ receipt, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto">
      {/* Control bar */}
      <div className="print:hidden w-full max-w-sm bg-white rounded-xl shadow-lg p-3 mb-4 flex items-center justify-between border border-slate-200">
        <span className="font-bold text-slate-800 text-sm">80mm Thermal Receipt</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            data-testid="print-receipt-btn"
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <Printer size={15} />
            Print Receipt
          </button>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* 80mm Standard Thermal Slip container */}
      <div className="bg-white text-black w-full max-w-[340px] p-5 shadow-2xl rounded-lg border border-slate-300 font-mono text-xs print:border-none print:shadow-none print:p-2 print:m-0 print:w-[80mm] print:max-w-none">
        <div className="text-center pb-3 border-b-2 border-dashed border-slate-400">
          <div className="flex justify-center mb-1">
            <ImamCrestLogo size={48} showText={false} />
          </div>
          <h1 className="text-sm font-black uppercase text-slate-900 tracking-tight">
            IMAM INSTITUTE
          </h1>
          <p className="text-[10px] text-slate-600 font-sans font-semibold">
            Nursing &amp; Allied Health Sciences
          </p>
          <p className="text-[9px] text-slate-500">
            Affiliated: Imam Medical Center
          </p>
          <div className="mt-2 inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold">
            <CheckCircle2 size={12} className="text-emerald-600" /> OFFICIAL FEE RECEIPT
          </div>
        </div>

        {/* Receipt Details */}
        <div className="py-3 border-b border-dashed border-slate-300 space-y-1.5 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Receipt No:</span>
            <strong className="text-slate-900">{receipt.receiptNo}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Challan Ref:</span>
            <span>{receipt.challanNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date/Time:</span>
            <span>{new Date(receipt.date).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Cashier:</span>
            <span>{receipt.cashierName}</span>
          </div>
        </div>

        {/* Student particulars */}
        <div className="py-3 border-b border-dashed border-slate-300 space-y-1 text-[11px]">
          <div className="truncate">
            <span className="text-slate-500">Student: </span>
            <strong className="text-slate-900">{receipt.studentName}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Roll No:</span>
            <strong>{receipt.rollNo}</strong>
          </div>
          <div className="truncate">
            <span className="text-slate-500">Program: </span>
            <span>{receipt.programName} (Sem {receipt.semester})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payment Mode:</span>
            <span className="font-bold uppercase text-slate-800">{receipt.paymentMethod}</span>
          </div>
          {receipt.transactionRef && (
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-500">Trx Ref:</span>
              <span className="truncate max-w-[160px]">{receipt.transactionRef}</span>
            </div>
          )}
        </div>

        {/* Paid Amount */}
        <div className="py-3 border-b-2 border-dashed border-slate-400">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-slate-700">AMOUNT RECEIVED:</span>
            <span className="text-base font-black text-slate-900">
              PKR {receipt.amountPaid.toLocaleString()}
            </span>
          </div>
          {receipt.notes && (
            <p className="text-[10px] text-slate-500 mt-1 italic leading-tight">
              Note: {receipt.notes}
            </p>
          )}
        </div>

        {/* Footer Barcode Simulation & Verification */}
        <div className="pt-3 text-center text-[9px] text-slate-500 space-y-1">
          <div className="tracking-[4px] font-mono text-slate-800 text-xs py-1">
            *||| | |||| ||| || | ||||*
          </div>
          <p>Electronically generated verified receipt.</p>
          <p className="text-[8px] text-slate-400">
            For online fee verification: imaminstitute.edu.pk/verify
          </p>
        </div>
      </div>
    </div>
  );
};
