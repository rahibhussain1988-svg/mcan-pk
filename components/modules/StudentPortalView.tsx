'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Sparkles,
  Bot,
  Stethoscope,
  Send,
  AlertTriangle,
} from 'lucide-react';
import { signOffCompetencyLog, addStudentCompetencyLog } from '@/app/actions/students';
import { generateVivaFeedback } from '@/lib/ai-assistant';
import { DigitalIDCardPrint } from '@/components/print/DigitalIDCardPrint';

interface StudentPortalProps {
  student: {
    id: string;
    rollNo: string;
    registrationNo: string;
    fullName: string;
    fatherName: string;
    cnic: string;
    phone: string;
    fatherPhone: string;
    bloodGroup?: string | null;
    address?: string | null;
    currentSemester: number;
    cgpa: number;
    attendancePercent: number;
    clinicalAttendancePercent: number;
    program: {
      name: string;
      code: string;
      baseTuitionFee: number;
      labFee: number;
      clinicalFee: number;
    };
    batch: {
      name: string;
    };
    competencyLogs: Array<{
      id: string;
      competencyCode: string;
      competencyTitle: string;
      date: string;
      patientAgeGender?: string | null;
      supervisorName: string;
      supervisorPin?: string | null;
      status: string;
      selfReflection?: string | null;
      supervisorFeedback?: string | null;
    }>;
  };
}

export const StudentPortalView: React.FC<StudentPortalProps> = ({ student: initialStudent }) => {
  const [student, setStudent] = useState(initialStudent);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ATTENDANCE' | 'LOGBOOK' | 'AI_COACH'>('OVERVIEW');

  // Interactive Attendance Guardrail Simulator
  const [simulatedMissedShifts, setSimulatedMissedShifts] = useState(0);

  // Calculate simulated attendance
  // Base total shifts = 40. Completed = 40 * (clinicalAttendancePercent/100) = ~35.6
  const totalShifts = 40;
  const attendedShifts = Math.round((student.clinicalAttendancePercent / 100) * totalShifts);
  const simulatedAttendance = Math.max(
    0,
    ((attendedShifts - simulatedMissedShifts) / totalShifts) * 100
  );
  const isSimulatedAtRisk = simulatedAttendance < 85;

  // New Competency Entry Modal
  const [showNewLogModal, setShowNewLogModal] = useState(false);
  const [logCompetencyCode, setLogCompetencyCode] = useState('IV_CANNULATION');
  const [logPatientAgeGender, setLogPatientAgeGender] = useState('52Y / Female (Ward 4)');
  const [logSupervisorName, setLogSupervisorName] = useState('Zahid Abbasi (Lecturer)');
  const [logReflection, setLogReflection] = useState('Successfully cannulated left basilic vein with 20G IV cannula.');
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);

  // Preceptor Sign-Off PIN modal
  const [selectedLogInNeedOfPin, setSelectedLogInNeedOfPin] = useState<string | null>(null);
  const [supervisorPinInput, setSupervisorPinInput] = useState('');
  const [isSigningOff, setIsSigningOff] = useState(false);

  // AI Viva & OSPE Coach State
  const [vivaQuestion, setVivaQuestion] = useState(
    'What are the 5 critical landmarks and antiseptic precautions for Radial Artery ABG Sampling?'
  );
  const [vivaAnswer, setVivaAnswer] = useState('');
  const [vivaFeedback, setVivaFeedback] = useState<string | null>(null);
  const [isAiEvaluating, setIsAiEvaluating] = useState(false);

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLog(true);
    try {
      const titles: Record<string, string> = {
        IV_CANNULATION: 'Peripheral Intravenous (IV) Cannulation (18G–22G)',
        FOLEY_CATHETER: 'Indwelling Foley Catheterization',
        ECG_12_LEAD: '12-Lead Electrocardiogram (ECG) Recording',
        ABG_SAMPLING: 'Arterial Blood Gas (ABG) Radial Artery Sampling',
        WOUND_CARE: 'Aseptic Surgical Wound Dressing & Suture Care',
      };

      const res = await addStudentCompetencyLog({
        studentId: student.id,
        competencyCode: logCompetencyCode,
        competencyTitle: titles[logCompetencyCode] || logCompetencyCode,
        patientAgeGender: logPatientAgeGender,
        supervisorName: logSupervisorName,
        selfReflection: logReflection,
      });

      if (res.success && res.log) {
        setStudent((prev) => ({
          ...prev,
          competencyLogs: [res.log as any, ...prev.competencyLogs],
        }));
        setShowNewLogModal(false);
        alert('Bedside procedure logged! Pending Preceptor PIN sign-off.');
      }
    } catch (e) {
      alert('Error recording competency log');
    } finally {
      setIsSubmittingLog(false);
    }
  };

  const handlePinSignOff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLogInNeedOfPin) return;

    setIsSigningOff(true);
    try {
      const res = await signOffCompetencyLog(selectedLogInNeedOfPin, supervisorPinInput);
      if (res.success) {
        setStudent((prev) => ({
          ...prev,
          competencyLogs: prev.competencyLogs.map((l) =>
            l.id === selectedLogInNeedOfPin
              ? { ...l, status: 'SIGNED_OFF', supervisorPin: supervisorPinInput }
              : l
          ),
        }));
        setSelectedLogInNeedOfPin(null);
        setSupervisorPinInput('');
        alert('Preceptor PIN verified! Competency officially signed off in PNC Logbook.');
      } else {
        alert(res.error || 'Invalid Preceptor PIN');
      }
    } catch (err) {
      alert('Error verifying PIN');
    } finally {
      setIsSigningOff(false);
    }
  };

  const handleEvaluateViva = async () => {
    if (!vivaAnswer.trim()) {
      alert('Please enter your response to the viva question');
      return;
    }
    setIsAiEvaluating(true);
    try {
      const feedback = await generateVivaFeedback(vivaQuestion, vivaAnswer);
      setVivaFeedback(feedback);
    } catch (e) {
      alert('Error getting feedback');
    } finally {
      setIsAiEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-imam-navy via-[#004f91] to-imam-navy text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-sky-400/20 text-sky-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-sky-400/30">
              {student.program.code} • Semester {student.currentSemester}
            </span>
            <span className="text-xs font-mono text-sky-200">Roll No: {student.rollNo}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black mt-1 tracking-tight">
            {student.fullName}
          </h1>
          <p className="text-xs text-sky-200">
            {student.program.name} • {student.batch.name}
          </p>
        </div>

        <button
          onClick={() => setShowIdCardModal(true)}
          data-testid="student-print-id-btn"
          className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 border border-white/20 shadow-sm transition active:scale-95"
        >
          <Printer size={15} />
          Digital QR ID Pass
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold w-full max-w-2xl">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center text-center ${
            activeTab === 'OVERVIEW' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('ATTENDANCE')}
          data-testid="tab-attendance-btn"
          className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center text-center ${
            activeTab === 'ATTENDANCE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          85% Guardrail
        </button>
        <button
          onClick={() => setActiveTab('LOGBOOK')}
          data-testid="tab-logbook-btn"
          className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center text-center ${
            activeTab === 'LOGBOOK' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          PNC Logbook ({student.competencyLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('AI_COACH')}
          data-testid="tab-ai-coach-btn"
          className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 text-center ${
            activeTab === 'AI_COACH' ? 'bg-imam-blue text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles size={13} className="shrink-0" />
          <span>AI Viva Coach</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Academic CGPA</span>
              <strong className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                {student.cgpa}
              </strong>
              <span className="block text-[11px] text-emerald-700 font-semibold mt-1">
                ✓ Merit Tier 1
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Theory Attendance</span>
              <strong className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                {student.attendancePercent}%
              </strong>
              <span className="block text-[11px] text-emerald-700 font-semibold mt-1">
                ✓ Eligible for Midterms
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Clinical Ward %</span>
              <strong className="text-xl sm:text-2xl font-black text-imam-blue font-mono">
                {student.clinicalAttendancePercent}%
              </strong>
              <span className="block text-[11px] text-emerald-700 font-semibold mt-1">
                ✓ Mandatory &gt;85% Met
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">PNC Logbook Signed</span>
              <strong className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                {student.competencyLogs.filter((l) => l.status === 'SIGNED_OFF').length}
              </strong>
              <span className="block text-[11px] text-slate-500 mt-1">
                of {student.competencyLogs.length} logged
              </span>
            </div>
          </div>

          {/* Today's Schedule Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <h3 className="font-extrabold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Calendar size={16} className="text-imam-blue" /> Today's Lecture &amp; Hospital Clinical Roster
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">08:30 AM - 10:30 AM • Adult Health Nursing II (Theory)</span>
                  <span className="text-slate-500">Smart Lecture Hall 2 • Zahid Abbasi (Lecturer)</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Attended
                </span>
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">11:00 AM - 03:00 PM • Imam Medical Center (ER / ICU Rotation)</span>
                  <span className="text-slate-500">Preceptor: Mir Mansab (Lecturer) • Focus: IV &amp; ABG Sampling</span>
                </div>
                <span className="bg-imam-blue text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                  Active Ward Shift
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 85% ATTENDANCE GUARDRAIL SIMULATOR */}
      {activeTab === 'ATTENDANCE' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="text-emerald-600" /> PNC Mandatory 85% Clinical Attendance Guardrail
            </h2>
            <p className="text-xs text-slate-500">
              Under Pakistan Nursing &amp; Midwifery Council rules, students with &lt;85% bedside hours are barred from university examinations.
            </p>
          </div>

          {/* Interactive Slider */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700">Simulate Upcoming Missed Ward Shifts:</label>
              <span className="font-mono font-black text-slate-900 text-sm">
                {simulatedMissedShifts} Shift(s) Missed
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={simulatedMissedShifts}
              onChange={(e) => setSimulatedMissedShifts(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-imam-blue"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 Missed (Current)</span>
              <span>1 Shift</span>
              <span>2 Shifts</span>
              <span>3 Shifts</span>
              <span>4 Shifts</span>
              <span>5 Shifts</span>
            </div>
          </div>

          {/* Simulated Outcome Banner */}
          <div
            className={`p-4 rounded-xl border ${
              isSimulatedAtRisk
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                {isSimulatedAtRisk ? (
                  <AlertTriangle className="text-rose-600" size={18} />
                ) : (
                  <CheckCircle2 className="text-emerald-600" size={18} />
                )}
                <span>Simulated Clinical Attendance: {simulatedAttendance.toFixed(1)}%</span>
              </div>
              <span
                className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                  isSimulatedAtRisk ? 'bg-rose-600 text-white' : 'bg-emerald-700 text-white'
                }`}
              >
                {isSimulatedAtRisk ? 'EXAM DISQUALIFIED' : 'PNC ELIGIBLE'}
              </span>
            </div>
            <p className="text-xs mt-2 leading-relaxed">
              {isSimulatedAtRisk ? (
                <>
                  Missing <strong>{simulatedMissedShifts} shifts</strong> drops your clinical attendance to{' '}
                  <strong>{simulatedAttendance.toFixed(1)}%</strong>, below the mandatory 85% rule.{' '}
                  <strong>Recovery Prescription:</strong> You must attend the next 4 consecutive ward shifts without absence to restore eligibility!
                </>
              ) : (
                <>
                  Your current standing of <strong>{simulatedAttendance.toFixed(1)}%</strong> safely meets the PNC 85% statutory threshold. You remain fully eligible for semester examination roll number slip release.
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: PNC LOGBOOK */}
      {activeTab === 'LOGBOOK' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Stethoscope size={16} className="text-imam-blue" />
                Digital Clinical Competency Logbook
              </h2>
              <p className="text-xs text-slate-500">
                PNC recognized bedside procedures verified via Preceptor PIN / QR sign-off
              </p>
            </div>

            <button
              onClick={() => setShowNewLogModal(true)}
              data-testid="log-procedure-btn"
              className="bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
            >
              + Log Procedure
            </button>
          </div>

          <div className="space-y-3">
            {student.competencyLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {log.competencyCode}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        log.status === 'SIGNED_OFF'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {log.status === 'SIGNED_OFF' ? '✓ Verified Signed-Off' : 'Pending Preceptor PIN'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{log.competencyTitle}</h4>
                  <p className="text-xs text-slate-500 italic mt-0.5">{log.selfReflection}</p>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                    <span>Patient: {log.patientAgeGender || 'Adult Ward'}</span>
                    <span>•</span>
                    <span>Preceptor: {log.supervisorName}</span>
                  </div>
                </div>

                {log.status !== 'SIGNED_OFF' && (
                  <button
                    onClick={() => {
                      setSelectedLogInNeedOfPin(log.id);
                      setSupervisorPinInput('');
                    }}
                    data-testid={`signoff-btn-${log.id}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-sm transition flex items-center gap-1.5 shrink-0"
                  >
                    <CheckCircle2 size={14} /> Preceptor PIN Sign-Off
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AI NCLEX / PNC VIVA COACH */}
      {activeTab === 'AI_COACH' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Bot className="text-imam-blue" /> Semester-Aware AI NCLEX / PNC Viva &amp; OSPE Coach
              </h2>
              <p className="text-xs text-slate-500">
                Practice clinical rationales, drug calculations, and OSPE oral examinations with instant AI grading
              </p>
            </div>
            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles size={12} /> Gemini 2.5 Flash
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              PNC Official Examiner Question:
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
              "{vivaQuestion}"
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'What are the 5 critical landmarks and antiseptic precautions for Radial Artery ABG Sampling?',
                'Explain NEWS2 scoring rules for a patient with SpO2 88% and RR 32 /min.',
                'Describe the exact procedure for Female Foley Catheterization balloon inflation volume.',
              ].map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => {
                    setVivaQuestion(q);
                    setVivaFeedback(null);
                  }}
                  className="text-[10px] bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 px-2 py-1 rounded-lg transition"
                >
                  Change Question
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold text-xs mb-1">
              Your Clinical Answer (Viva Response):
            </label>
            <textarea
              rows={4}
              placeholder="State aseptic protocol, anatomical landmarks, patient verification, and monitoring steps..."
              value={vivaAnswer}
              onChange={(e) => setVivaAnswer(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-imam-blue"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleEvaluateViva}
              disabled={isAiEvaluating}
              data-testid="evaluate-viva-btn"
              className="bg-imam-blue hover:bg-imam-navy text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95"
            >
              <Sparkles size={15} />
              {isAiEvaluating ? 'Examiner Grading in Progress...' : 'Submit to AI Examiner'}
            </button>
          </div>

          {vivaFeedback && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-slate-800 space-y-2 leading-relaxed">
              <div className="whitespace-pre-line font-sans font-medium">{vivaFeedback}</div>
            </div>
          )}
        </div>
      )}

      {/* Modal: Preceptor PIN Sign-Off */}
      {selectedLogInNeedOfPin && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              Preceptor PIN Clinical Sign-Off
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your 4-digit Clinical Preceptor Security PIN (Zahid Abbasi PIN: <strong>9988</strong>)
            </p>

            <form onSubmit={handlePinSignOff} className="space-y-3">
              <input
                type="password"
                maxLength={4}
                placeholder="4-Digit PIN"
                value={supervisorPinInput}
                onChange={(e) => setSupervisorPinInput(e.target.value)}
                data-testid="supervisor-pin-input"
                className="w-full text-center text-2xl font-mono tracking-[8px] border-2 border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-imam-blue"
                required
                autoFocus
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLogInNeedOfPin(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSigningOff}
                  data-testid="confirm-pin-btn"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  {isSigningOff ? 'Verifying...' : 'Sign Off Procedure'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Competency Procedure */}
      {showNewLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 sm:p-6 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              Log Bedside Clinical Procedure
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Record patient encounter for PNC clinical competency fulfillment
            </p>

            <form onSubmit={handleAddLog} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Competency Code:</label>
                <select
                  value={logCompetencyCode}
                  onChange={(e) => setLogCompetencyCode(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                >
                  <option value="IV_CANNULATION">Peripheral IV Cannulation (18G-22G)</option>
                  <option value="FOLEY_CATHETER">Indwelling Foley Catheterization</option>
                  <option value="ECG_12_LEAD">12-Lead ECG Recording</option>
                  <option value="ABG_SAMPLING">Arterial Blood Gas (ABG) Sampling</option>
                  <option value="WOUND_CARE">Aseptic Surgical Wound Dressing</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Patient Age / Gender / Ward:</label>
                <input
                  type="text"
                  value={logPatientAgeGender}
                  onChange={(e) => setLogPatientAgeGender(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Attending Clinical Preceptor:</label>
                <input
                  type="text"
                  value={logSupervisorName}
                  onChange={(e) => setLogSupervisorName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Clinical Self-Reflection:</label>
                <textarea
                  rows={2}
                  value={logReflection}
                  onChange={(e) => setLogReflection(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewLogModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLog}
                  className="bg-imam-blue hover:bg-imam-navy text-white font-bold px-4 py-2 rounded-xl transition"
                >
                  {isSubmittingLog ? 'Logging...' : 'Save to PNC Logbook'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital ID Card Modal */}
      {showIdCardModal && (
        <DigitalIDCardPrint
          student={student}
          onClose={() => setShowIdCardModal(false)}
        />
      )}
    </div>
  );
};
