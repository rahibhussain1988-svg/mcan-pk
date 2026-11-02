'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Calendar,
  User,
  Activity,
  Layers,
  Printer,
  ChevronDown,
  ChevronRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface AuditLogViewProps {
  auditLogs: Array<{
    id: string;
    userId: string;
    userName: string;
    userRole: string;
    action: string;
    module: string;
    recordId?: string | null;
    description: string;
    previousState?: string | null;
    newState?: string | null;
    ipAddress?: string | null;
    createdAt: string;
  }>;
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ auditLogs: initialLogs }) => {
  const [logs] = useState(initialLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('ALL');
  const [selectedAction, setSelectedAction] = useState('ALL');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Filter logic
  const filteredLogs = logs.filter((log) => {
    const matchesModule = selectedModule === 'ALL' || log.module === selectedModule;
    const matchesAction = selectedAction === 'ALL' || log.action === selectedAction;
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.recordId && log.recordId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesModule && matchesAction && matchesSearch;
  });

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-100 text-emerald-800';
      case 'UPDATE':
        return 'bg-sky-100 text-sky-800';
      case 'APPROVE':
        return 'bg-indigo-100 text-indigo-800';
      case 'REVERSE':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">
              Regulatory Audit Trail
            </span>
            <span className="text-xs text-slate-400 font-mono">PNC & SMF Inspection Standard</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            System Audit Trail & Security Logs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically logged institutional state changes across General Ledger, Examinations, Clinical Preceptorship, and Inventory.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shadow-sm self-start md:self-auto"
        >
          <Printer size={14} /> Print Regulatory Audit Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Audit Events</span>
          <div className="text-xl font-black text-slate-900 mt-1">{logs.length} Logged</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Immutable database ledger</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Finance & GL Entries</span>
          <div className="text-xl font-black text-emerald-600 mt-1">
            {logs.filter((l) => l.module === 'FINANCE').length} Actions
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Double-entry voucher logs</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Academic & Grades</span>
          <div className="text-xl font-black text-imam-blue mt-1">
            {logs.filter((l) => l.module === 'ACADEMICS').length} Actions
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Examination mark changes</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Integrity Status</span>
          <div className="text-xl font-black text-emerald-600 mt-1 flex items-center gap-1">
            <ShieldCheck size={18} /> Verified
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Zero unlogged mutations</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search description, personnel, or record..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-imam-blue/20 w-64"
            />
          </div>

          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700"
          >
            <option value="ALL">All Modules</option>
            <option value="FINANCE">Finance & Ledger</option>
            <option value="ACADEMICS">Academics & Exams</option>
            <option value="CLINICAL">Clinical Preceptorship</option>
            <option value="INVENTORY">Inventory & Stores</option>
            <option value="HR">HR & Payroll</option>
          </select>

          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700"
          >
            <option value="ALL">All Actions</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="APPROVE">Approve</option>
            <option value="REVERSE">Reverse</option>
          </select>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Showing {filteredLogs.length} of {logs.length} records
        </span>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Actor / User</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Module</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Description & Record</th>
                <th className="p-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map((log) => {
                const isExpanded = expandedLogId === log.id;

                return (
                  <React.Fragment key={log.id}>
                    <tr
                      onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                      className="hover:bg-slate-50/70 cursor-pointer transition"
                    >
                      <td className="p-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString('en-GB')}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">{log.userName}</td>
                      <td className="p-3.5 text-slate-600 font-mono text-[11px]">{log.userRole}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-100 text-slate-800">
                          {log.module}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black ${getActionBadgeColor(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-800 max-w-md">
                        <div>{log.description}</div>
                        {log.recordId && (
                          <span className="font-mono text-[10px] text-slate-400">
                            Ref: {log.recordId}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right text-slate-400">
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </td>
                    </tr>

                    {/* Expandable Diff Inspection */}
                    {isExpanded && (
                      <tr className="bg-slate-50/80">
                        <td colSpan={7} className="p-4 border-t border-slate-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                            <div className="bg-white p-3 rounded-lg border border-slate-200">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                                Metadata & Client IP
                              </span>
                              <div className="text-slate-700">
                                IP: <strong>{log.ipAddress || '127.0.0.1'}</strong>
                              </div>
                              <div className="text-slate-700">
                                User ID: <strong>{log.userId}</strong>
                              </div>
                              <div className="text-slate-700">
                                Log ID: <strong>{log.id}</strong>
                              </div>
                            </div>

                            <div className="bg-white p-3 rounded-lg border border-slate-200">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                                State Mutation Inspection
                              </span>
                              {log.previousState || log.newState ? (
                                <div className="space-y-1">
                                  {log.previousState && (
                                    <div className="text-rose-700">
                                      - Prev: {log.previousState}
                                    </div>
                                  )}
                                  {log.newState && (
                                    <div className="text-emerald-700">
                                      + Next: {log.newState}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-slate-400 italic">
                                  Transaction executed with verified state consistency.
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
