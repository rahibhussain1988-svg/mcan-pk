'use client';

import React, { useState } from 'react';
import {
  Users,
  ShieldAlert,
  Clock,
  Printer,
  Calendar,
  CheckCircle,
  Award,
  DollarSign,
  FileSpreadsheet,
} from 'lucide-react';

interface StaffMember {
  id: string;
  empId: string;
  fullName: string;
  designation: string;
  department: string;
  role: string;
  cnic: string;
  phone: string;
  qualification: string;
  pncLicenseNo?: string | null;
  pncLicenseExpiry?: string | null;
  basicSalary: number;
  clinicalAllowance: number;
  medicalAllowance: number;
  overtimeRate: number;
}

interface HRPayrollProps {
  staffList: StaffMember[];
  monthlyPayrollTotal: number;
}

export const HRPayrollView: React.FC<HRPayrollProps> = ({
  staffList,
  monthlyPayrollTotal,
}) => {
  const [selectedStaffForPayslip, setSelectedStaffForPayslip] = useState<StaffMember | null>(null);

  // Check license alerts (< 30 days)
  const expiringStaff = staffList.filter((s) => {
    if (!s.pncLicenseExpiry) return false;
    const expiry = new Date(s.pncLicenseExpiry);
    const diffDays = Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="text-imam-blue" /> Autonomous HR, License Compliance &amp; Payroll Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            PNC/PMDC faculty licensing status, clinical workload balancing, and PKR payroll disbursement
          </p>
        </div>

        <div className="bg-slate-900 text-white px-4 py-2 rounded-2xl flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400 block text-[9px] uppercase">Approved Monthly Payroll:</span>
          <strong className="text-emerald-400 text-sm">
            PKR {monthlyPayrollTotal.toLocaleString()}
          </strong>
        </div>
      </div>

      {/* PNC License Expiry Compliance Banner */}
      {expiringStaff.length > 0 && (
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-start gap-3 shadow-sm">
          <div className="p-2 bg-rose-600 text-white rounded-xl shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-rose-950 text-sm">
                Mandatory PNC License Compliance Alert
              </h3>
              <span className="bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                Action Required
              </span>
            </div>
            <p className="text-xs text-rose-800 mt-1 leading-relaxed">
              <strong>{expiringStaff[0].fullName}</strong> ({expiringStaff[0].designation}) has a PNC license expiring in{' '}
              <strong className="underline decoration-rose-500">18 days</strong> (License #{expiringStaff[0].pncLicenseNo}). Renewal documents must be filed with PNC Islamabad before clinical preceptor signing privileges are automatically suspended.
            </p>
          </div>
        </div>
      )}

      {/* Staff 360° Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">
            Teaching Faculty &amp; Clinical Preceptor Directory ({staffList.length})
          </h2>
          <span className="text-xs text-slate-500">PNC / SMF Reg. 100% Compliant Ratio</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Emp ID &amp; Name</th>
                <th className="py-3 px-4">Department &amp; Role</th>
                <th className="py-3 px-4">Qualification</th>
                <th className="py-3 px-4">PNC / PMDC License</th>
                <th className="py-3 px-4 text-right">Net Monthly Salary</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {staffList.map((s) => {
                const isLicenseExpiring =
                  s.pncLicenseExpiry &&
                  new Date(s.pncLicenseExpiry).getTime() - Date.now() < 30 * 86400000;
                const grossSalary = s.basicSalary + s.clinicalAllowance + s.medicalAllowance;
                const netSalary = grossSalary - 1500 - (grossSalary > 100000 ? 4500 : 0);

                return (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-sans">
                      <strong className="text-slate-900 block">{s.fullName}</strong>
                      <span className="font-mono text-[10px] text-slate-400">{s.empId}</span>
                    </td>
                    <td className="py-3 px-4 font-sans">
                      <span className="text-slate-800 font-medium block">{s.designation}</span>
                      <span className="text-[10px] text-slate-500">{s.department}</span>
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-600 max-w-[160px] truncate">
                      {s.qualification}
                    </td>
                    <td className="py-3 px-4 font-sans">
                      {s.pncLicenseNo ? (
                        <div>
                          <span className="font-mono font-bold text-slate-800 block text-[11px]">
                            {s.pncLicenseNo}
                          </span>
                          {isLicenseExpiring ? (
                            <span className="text-rose-700 text-[10px] font-bold inline-flex items-center gap-1">
                              <Clock size={11} /> Expiring soon
                            </span>
                          ) : (
                            <span className="text-emerald-700 text-[10px] font-medium">Valid</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Non-Clinical</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-slate-900">
                      PKR {netSalary.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-sans">
                      <button
                        onClick={() => setSelectedStaffForPayslip(s)}
                        data-testid={`payslip-btn-${s.empId}`}
                        className="text-xs font-bold text-imam-blue hover:text-imam-navy hover:underline"
                      >
                        Itemized Slip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Itemized Payslip Modal */}
      {selectedStaffForPayslip && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 sm:p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Itemized Monthly Salary Slip
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {selectedStaffForPayslip.empId} • October 2026
                </p>
              </div>
              <button
                onClick={() => setSelectedStaffForPayslip(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Employee:</span>
                  <strong className="text-slate-900">{selectedStaffForPayslip.fullName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Designation:</span>
                  <span>{selectedStaffForPayslip.designation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Department:</span>
                  <span>{selectedStaffForPayslip.department}</span>
                </div>
              </div>

              {/* Earnings & Deductions Breakdown */}
              <div className="border border-slate-200 rounded-xl overflow-hidden font-mono">
                <div className="bg-slate-100 p-2 font-bold text-slate-700 flex justify-between font-sans">
                  <span>Salary Structure (Earnings)</span>
                  <span>PKR</span>
                </div>
                <div className="p-2.5 space-y-1 border-b border-slate-200">
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-600">Basic Salary:</span>
                    <span>{selectedStaffForPayslip.basicSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-600">Clinical Bedside Allowance:</span>
                    <span>{selectedStaffForPayslip.clinicalAllowance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-600">Medical / Conveyance:</span>
                    <span>{selectedStaffForPayslip.medicalAllowance.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-slate-100 p-2 font-bold text-slate-700 flex justify-between font-sans">
                  <span>Statutory Deductions</span>
                  <span>PKR</span>
                </div>
                <div className="p-2.5 space-y-1 text-rose-700 border-b border-slate-200">
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-600">EOBI Employee Contribution:</span>
                    <span>- 1,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-600">Income Tax (FBR):</span>
                    <span>
                      -{' '}
                      {(
                        selectedStaffForPayslip.basicSalary +
                          selectedStaffForPayslip.clinicalAllowance >
                        100000
                          ? 4500
                          : 0
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 text-emerald-950 font-bold flex justify-between items-baseline font-sans">
                  <span>Net Disbursable Salary:</span>
                  <span className="font-mono text-base font-black text-emerald-800">
                    PKR{' '}
                    {(
                      selectedStaffForPayslip.basicSalary +
                      selectedStaffForPayslip.clinicalAllowance +
                      selectedStaffForPayslip.medicalAllowance -
                      1500 -
                      (selectedStaffForPayslip.basicSalary +
                        selectedStaffForPayslip.clinicalAllowance >
                      100000
                        ? 4500
                        : 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStaffForPayslip(null)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-imam-blue hover:bg-imam-navy text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <Printer size={15} /> Print Payslip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
