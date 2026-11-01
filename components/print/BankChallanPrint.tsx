'use client';

import React from 'react';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { Printer, X } from 'lucide-react';

interface ChallanData {
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
    fullName: string;
    fatherName: string;
    rollNo: string;
    registrationNo: string;
    cnic: string;
    phone: string;
    program: {
      name: string;
      code: string;
      baseTuitionFee: number;
      labFee: number;
      clinicalFee: number;
    };
  };
}

interface BankChallanPrintProps {
  challan: ChallanData;
  onClose: () => void;
}

export const BankChallanPrint: React.FC<BankChallanPrintProps> = ({ challan, onClose }) => {
  const copies = [
    { title: 'BANK COPY', subtitle: 'To be retained by receiving HBL branch' },
    { title: 'ACCOUNTS COPY', subtitle: 'To be submitted at Institute Cashier Desk' },
    { title: 'STUDENT COPY', subtitle: 'To be kept by student for exam slip release' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-start p-2 sm:p-6 overflow-y-auto">
      {/* Floating Control Toolbar (Hidden during print) */}
      <div className="print:hidden w-full max-w-5xl bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-4 flex items-center justify-between border border-slate-200">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-800 text-sm sm:text-base">
            Official 3-Copy Bank Challan ({challan.challanNo})
          </span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
            challan.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {challan.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            data-testid="trigger-print-btn"
            className="bg-imam-blue hover:bg-imam-navy text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-sm transition active:scale-95"
          >
            <Printer size={16} />
            Print Landscape A4
          </button>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Printable Landscape A4 Sheet (3 Equal Columns) */}
      <div className="bg-white text-black w-full max-w-5xl p-4 sm:p-6 shadow-2xl rounded-lg border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 print:w-full print:max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-4 print:gap-3 divide-y md:divide-y-0 md:divide-x print:divide-y-0 print:divide-x divide-dashed divide-slate-400">
          {copies.map((copy, idx) => (
            <div key={idx} className={`p-2 flex flex-col justify-between ${idx > 0 ? 'md:pl-3 print:pl-3 pt-4 md:pt-2' : ''}`}>
              {/* Header */}
              <div>
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <ImamCrestLogo size={42} showText={false} />
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-wider block text-imam-blue">
                      {copy.title}
                    </span>
                    <span className="text-[7.5px] text-slate-500 block leading-tight">
                      {copy.subtitle}
                    </span>
                  </div>
                </div>

                <div className="text-center mb-2">
                  <h1 className="text-xs font-black text-slate-900 uppercase tracking-tight">
                    IMAM INSTITUTE
                  </h1>
                  <p className="text-[8px] font-semibold text-slate-600">
                    Nursing &amp; Allied Health Sciences
                  </p>
                  <p className="text-[7px] text-slate-500">
                    HBL Collection A/C: <strong className="text-slate-900">0042-79018821-03</strong>
                  </p>
                </div>

                {/* Challan & Student Metadata */}
                <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[8.5px] space-y-1 mb-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Challan No:</span>
                    <strong className="text-slate-900">{challan.challanNo}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Issue Date:</span>
                    <span>{new Date(challan.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Due Date:</span>
                    <strong className="text-rose-700">{new Date(challan.dueDate).toLocaleDateString()}</strong>
                  </div>
                  <div className="border-t border-slate-200 pt-1"></div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Roll No:</span>
                    <strong className="text-slate-900">{challan.student.rollNo}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Reg No:</span>
                    <span>{challan.student.registrationNo}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-slate-600">Name: </span>
                    <strong className="text-slate-900">{challan.student.fullName}</strong>
                  </div>
                  <div className="truncate">
                    <span className="text-slate-600">Father: </span>
                    <span>{challan.student.fatherName}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-slate-600">Program: </span>
                    <span>{challan.student.program.code} - Sem {challan.semester}</span>
                  </div>
                </div>

                {/* Itemized Fee Breakdown */}
                <table className="w-full text-[8.5px] border-collapse mb-2">
                  <thead>
                    <tr className="border-b border-t border-slate-300 bg-slate-100">
                      <th className="py-1 text-left font-bold text-slate-700">Particulars</th>
                      <th className="py-1 text-right font-bold text-slate-700">PKR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-0.5 text-slate-700">Tuition Fee (Semester {challan.semester})</td>
                      <td className="py-0.5 text-right font-mono">{challan.student.program.baseTuitionFee.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-0.5 text-slate-700">Skills &amp; Anatomy Lab Fee</td>
                      <td className="py-0.5 text-right font-mono">{challan.student.program.labFee.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-0.5 text-slate-700">Hospital Bedside Rotation Fee</td>
                      <td className="py-0.5 text-right font-mono">{challan.student.program.clinicalFee.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-0.5 text-slate-700">PNC / SMF Regulatory Exam Fee</td>
                      <td className="py-0.5 text-right font-mono">5,000</td>
                    </tr>
                    {challan.discountAmount > 0 && (
                      <tr className="text-emerald-700">
                        <td className="py-0.5 font-medium">Merit / Need Concession</td>
                        <td className="py-0.5 text-right font-mono">- {challan.discountAmount.toLocaleString()}</td>
                      </tr>
                    )}
                    {challan.lateFine > 0 && (
                      <tr className="text-rose-700">
                        <td className="py-0.5 font-medium">Late Fine (Rs. 100/day)</td>
                        <td className="py-0.5 text-right font-mono">+ {challan.lateFine.toLocaleString()}</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-900 bg-slate-100 font-bold">
                      <td className="py-1 text-slate-900">Total Net Payable:</td>
                      <td className="py-1 text-right font-mono text-slate-900">
                        PKR {challan.netPayable.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="text-[7.5px] text-slate-500">
                      <td colSpan={2} className="py-0.5 text-center italic">
                        After Due Date: PKR {(challan.netPayable + 2000).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Instructions and Signatures */}
              <div className="pt-2">
                <div className="bg-amber-50 p-1.5 rounded border border-amber-200 text-[7px] text-amber-900 mb-4 leading-tight">
                  • Deposit in cash or online via 1Link/IBFT quoting challan number.<br />
                  • Fee once paid is non-refundable and non-transferable under PNC bylaws.
                </div>

                <div className="flex justify-between items-end text-[7.5px] text-slate-600 font-mono pt-3 border-t border-slate-300">
                  <div className="text-center">
                    <div className="w-16 border-b border-slate-400 mb-0.5"></div>
                    <span>Depositor Sign</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 border-b border-slate-400 mb-0.5"></div>
                    <span>Bank Officer &amp; Stamp</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
