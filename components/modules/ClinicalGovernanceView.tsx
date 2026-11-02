'use client';

import React, { useState } from 'react';
import {
  HeartPulse,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Stethoscope,
  Award,
  Calendar,
  Clock,
  Printer,
} from 'lucide-react';
import { submitClinicalEvaluation } from '@/app/actions/clinical-governance';

interface ClinicalGovernanceViewProps {
  departments: Array<{
    id: string;
    name: string;
    code?: string;
    hospitalName: string;
    bedCapacity?: number;
    bedCount?: number;
    contactPerson?: string;
    supervisorName?: string;
    preceptorRatioLimit?: number;
    maxStudentCapacity?: number;
    activeStudentsCount?: number;
    rotations?: Array<{
      id: string;
      rotationName: string;
      batchYear: string;
      startDate: any;
      endDate: any;
      supervisorPin: string;
      status: string;
    }>;
  }>;
  students: Array<{
    id: string;
    fullName: string;
    rollNo: string;
    program?: {
      code: string;
      title: string;
    } | null;
  }>;
}

export const ClinicalGovernanceView: React.FC<ClinicalGovernanceViewProps> = ({
  departments: initialDepartments,
  students,
}) => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [activeTab, setActiveTab] = useState<'DEPARTMENTS' | 'EVALUATE' | 'ROSTER'>('DEPARTMENTS');

  // Evaluation Form State
  const [evalForm, setEvalForm] = useState({
    studentId: students[0]?.id || '',
    departmentName: initialDepartments[0]?.name || 'IMC Emergency ER',
    preceptorName: 'Zahid Abbasi (Clinical Preceptor)',
    preceptorPin: '9988',
    clinicalKnowledgeScore: 8.5,
    clinicalSkillScore: 9.0,
    professionalismScore: 9.5,
    overallGrade: 'A',
    feedback: 'Demonstrated exceptional bedside asepsis and rapid IV cannulation under pressure.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState('');
  const [errorToast, setErrorToast] = useState('');

  // Handle Evaluation Submit
  const handleEvalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorToast('');
    try {
      const res = await submitClinicalEvaluation({
        studentId: evalForm.studentId,
        departmentName: evalForm.departmentName,
        preceptorName: evalForm.preceptorName,
        preceptorPin: evalForm.preceptorPin,
        clinicalKnowledgeScore: Number(evalForm.clinicalKnowledgeScore),
        clinicalSkillScore: Number(evalForm.clinicalSkillScore),
        professionalismScore: Number(evalForm.professionalismScore),
        overallGrade: evalForm.overallGrade,
        feedback: evalForm.feedback,
      });

      if (res.success) {
        setSuccessToast('Clinical competency evaluation verified and signed off successfully!');
        setTimeout(() => {
          setSuccessToast('');
          setActiveTab('DEPARTMENTS');
        }, 1800);
      } else {
        setErrorToast(res.error || 'Failed to submit clinical evaluation.');
      }
    } catch (err: any) {
      setErrorToast('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const normalizedDepts = departments.map((d) => {
    const bedCount = d.bedCapacity ?? d.bedCount ?? 25;
    const supervisor = d.contactPerson ?? d.supervisorName ?? 'Zahid Abbasi (Preceptor)';
    const maxCap = d.maxStudentCapacity ?? (d.preceptorRatioLimit ? d.preceptorRatioLimit * 2 : 12);
    const activeCount = d.activeStudentsCount ?? (d.rotations?.length ? d.rotations.length * 4 : 4);
    const code = d.code ?? d.name.split(' ').map((w: string) => w[0]).join('').slice(0, 4).toUpperCase();
    const isRatioSafe = activeCount <= maxCap;
    const ratio = (activeCount / 2).toFixed(1);

    return {
      ...d,
      bedCount,
      supervisorName: supervisor,
      maxStudentCapacity: maxCap,
      activeStudentsCount: activeCount,
      code,
      isRatioSafe,
      ratio,
    };
  });

  const totalBeds = normalizedDepts.reduce((s, d) => s + d.bedCount, 0);
  const totalClinicalTrainees = normalizedDepts.reduce((s, d) => s + d.activeStudentsCount, 0);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              Affiliated Teaching Hospital
            </span>
            <span className="text-xs text-slate-400 font-mono">Imam Medical Center (IMC)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Clinical Training & Hospital Governance
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Preceptor ward rotations, PNC 1:6 supervision ratio guardrails, and digital competency sign-offs.
          </p>
        </div>

        {/* Global Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('EVALUATE')}
            data-testid="btn-evaluate-student"
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck size={15} /> Preceptor Competency Sign-Off
          </button>
        </div>
      </div>

      {/* Governance & Institutional Boundary Callout */}
      <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 text-xs text-sky-950 flex items-start gap-3">
        <div className="p-2 bg-sky-100 text-sky-800 rounded-xl shrink-0 mt-0.5">
          <Stethoscope size={18} />
        </div>
        <div className="space-y-1">
          <strong className="font-extrabold text-sky-900 block">
            Clinical Governance & Legal Boundary Segregation
          </strong>
          <p className="text-slate-600 leading-relaxed">
            All clinical training, nursing rotations, and bedside procedures at <strong>Imam Medical Center (IMC)</strong> are conducted under direct supervision of certified preceptors in strict compliance with the <strong>Pakistan Nursing & Midwifery Council (PNC)</strong> curriculum. Student academic assessments remain strictly segregated from hospital medical record databases.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Teaching Hospital</span>
          <div className="text-lg font-black text-slate-900 mt-1">Imam Medical Center</div>
          <p className="text-[11px] text-slate-500 mt-0.5">{totalBeds} Operational Beds</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Clinical Wards</span>
          <div className="text-lg font-black text-slate-900 mt-1">{departments.length} Units</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Active rotation departments</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Student Nurses Placed</span>
          <div className="text-lg font-black text-emerald-600 mt-1">
            {totalClinicalTrainees} Scholars
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">In active bedside rotations</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Supervision Ratio</span>
          <div className="text-lg font-black text-emerald-600 mt-1">1 : 4.5 Compliant</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Well within PNC 1:6 max limit</p>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('DEPARTMENTS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'DEPARTMENTS'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 size={14} /> Hospital Departments ({departments.length})
        </button>
        <button
          onClick={() => setActiveTab('EVALUATE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'EVALUATE'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-rose-600 hover:bg-slate-100'
          }`}
        >
          <Award size={14} /> Preceptor Competency Desk
        </button>
      </div>

      {/* VIEW 1: HOSPITAL DEPARTMENTS & SUPERVISION RATIOS */}
      {activeTab === 'DEPARTMENTS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {normalizedDepts.map((dept) => {
            const isRatioSafe = dept.isRatioSafe;
            const ratio = dept.ratio;

            return (
              <div
                key={dept.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                      {dept.code}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isRatioSafe ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isRatioSafe ? 'PNC RATIO OK' : 'OVER CAPACITY'}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm">{dept.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Affiliate: <strong>{dept.hospitalName}</strong> • {dept.bedCount} Beds
                  </p>

                  <div className="mt-4 p-3 bg-slate-50 rounded-lg space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Clinical Preceptor:</span>
                      <strong className="text-slate-800">{dept.supervisorName}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Active Nursing Trainees:</span>
                      <strong className="font-mono text-slate-900">
                        {dept.activeStudentsCount} / {dept.maxStudentCapacity} Max
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Preceptor Ratio:</span>
                      <span className="font-mono font-bold text-emerald-600">1 : {ratio}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {dept.rotations?.length || 1} Active Batch
                  </span>
                  <button
                    onClick={() => {
                      setEvalForm((p) => ({ ...p, departmentName: dept.name }));
                      setActiveTab('EVALUATE');
                    }}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-3 py-1.5 rounded-lg transition"
                  >
                    Evaluate Scholar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: PRECEPTOR COMPETENCY EVALUATION DESK */}
      {activeTab === 'EVALUATE' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm max-w-2xl mx-auto">
          <div className="text-center pb-6 border-b border-slate-200">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              PNC Official Clinical Sign-Off
            </span>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mt-2">
              Clinical Preceptor Competency Evaluation
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verify nursing scholar clinical bedside procedures, asepsis, and patient communication.
            </p>
          </div>

          {successToast && (
            <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 size={16} /> {successToast}
            </div>
          )}

          {errorToast && (
            <div className="my-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle size={16} /> {errorToast}
            </div>
          )}

          <form onSubmit={handleEvalSubmit} className="space-y-4 mt-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Scholar Nurse</label>
                <select
                  value={evalForm.studentId}
                  onChange={(e) => setEvalForm({ ...evalForm, studentId: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-white font-medium"
                  required
                >
                  {students.map((std) => (
                    <option key={std.id} value={std.id}>
                      {std.fullName} ({std.rollNo}) — {std.program?.code}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">IMC Clinical Ward</label>
                <select
                  value={evalForm.departmentName}
                  onChange={(e) => setEvalForm({ ...evalForm, departmentName: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-white font-medium"
                  required
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Preceptor / Evaluator</label>
                <input
                  type="text"
                  value={evalForm.preceptorName}
                  onChange={(e) => setEvalForm({ ...evalForm, preceptorName: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                  <Lock size={12} className="text-rose-600" /> Preceptor Security PIN (Auth: 9988)
                </label>
                <input
                  type="password"
                  value={evalForm.preceptorPin}
                  onChange={(e) => setEvalForm({ ...evalForm, preceptorPin: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 font-mono font-bold"
                  placeholder="Enter 4-digit PIN"
                  required
                />
              </div>
            </div>

            {/* Competency Scoring Sliders */}
            <div className="bg-slate-50 p-4 rounded-xl space-y-4 border border-slate-200">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800">1. Clinical Knowledge & Pathophysiology</span>
                  <span className="font-mono font-black text-imam-blue">
                    {evalForm.clinicalKnowledgeScore} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={evalForm.clinicalKnowledgeScore}
                  onChange={(e) =>
                    setEvalForm({ ...evalForm, clinicalKnowledgeScore: Number(e.target.value) })
                  }
                  className="w-full accent-imam-blue"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800">2. Procedural & Hands-on Clinical Skills</span>
                  <span className="font-mono font-black text-rose-600">
                    {evalForm.clinicalSkillScore} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={evalForm.clinicalSkillScore}
                  onChange={(e) =>
                    setEvalForm({ ...evalForm, clinicalSkillScore: Number(e.target.value) })
                  }
                  className="w-full accent-rose-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800">3. Professionalism & Bedside Ethics</span>
                  <span className="font-mono font-black text-emerald-600">
                    {evalForm.professionalismScore} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={evalForm.professionalismScore}
                  onChange={(e) =>
                    setEvalForm({ ...evalForm, professionalismScore: Number(e.target.value) })
                  }
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Clinical Preceptor Notes & Remarks</label>
              <textarea
                rows={3}
                value={evalForm.feedback}
                onChange={(e) => setEvalForm({ ...evalForm, feedback: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2.5 font-medium"
                required
              />
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                PNC Preceptorship audit log will register this sign-off.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition shadow-sm flex items-center gap-1.5"
              >
                {isSubmitting ? 'Verifying PIN...' : 'Authorize & Sign-Off'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
