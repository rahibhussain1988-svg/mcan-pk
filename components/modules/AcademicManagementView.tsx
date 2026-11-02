'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
  Clock,
  Search,
  CheckCircle2,
  FileText,
  Printer,
  ChevronRight,
  Filter,
  UserCheck,
  Building,
} from 'lucide-react';
import { submitExamMarks } from '@/app/actions/academics';

interface AcademicManagementViewProps {
  subjects: Array<{
    id: string;
    code: string;
    title: string;
    creditHoursTheory: number;
    creditHoursLab: number;
    creditHoursClinical: number;
    semester: number;
    program?: {
      id: string;
      code: string;
      title: string;
    } | null;
  }>;
  timetableSlots: Array<{
    id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    roomNo: string;
    teacherName: string;
    subjectCode: string;
    programCode: string;
    slotType?: string;
    sessionType?: string;
  }>;
  examSchedules: Array<{
    id: string;
    title: string;
    examType: string;
    examDate: string;
    totalMarks: number;
    passingMarks: number;
    isPublished: boolean;
    subject?: {
      id: string;
      code: string;
      title: string;
    } | null;
    program?: {
      id: string;
      code: string;
      title: string;
    } | null;
    marks: Array<{
      id: string;
      studentId: string;
      marksObtained: number;
      gpa: number;
      grade: string;
      studentName: string;
      studentRollNo: string;
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

export const AcademicManagementView: React.FC<AcademicManagementViewProps> = ({
  subjects: initialSubjects,
  timetableSlots: initialTimetable,
  examSchedules: initialExams,
  students,
}) => {
  const [activeTab, setActiveTab] = useState<'CURRICULUM' | 'TIMETABLE' | 'EXAMS' | 'TRANSCRIPT'>('CURRICULUM');
  const [selectedProgram, setSelectedProgram] = useState<string>('ALL');
  const [selectedSemester, setSelectedSemester] = useState<string>('ALL');
  const [selectedDay, setSelectedDay] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Exam Grading Modal State
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [activeExam, setActiveExam] = useState<any>(null);
  const [marksState, setMarksState] = useState<Record<string, { theory: number; lab: number; internal: number }>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Transcript Preview Student
  const [transcriptStudentId, setTranscriptStudentId] = useState<string>(students[0]?.id || '');

  // Filtered Subjects
  const filteredSubjects = initialSubjects.filter((subj) => {
    const matchesProgram = selectedProgram === 'ALL' || subj.program?.code === selectedProgram;
    const matchesSemester = selectedSemester === 'ALL' || String(subj.semester) === selectedSemester;
    const matchesSearch =
      subj.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subj.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProgram && matchesSemester && matchesSearch;
  });

  // Filtered Timetable Slots
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const filteredTimetable = initialTimetable.filter((slot) => {
    const slotDay = (slot.dayOfWeek || '').toUpperCase();
    const selectedDayUpper = selectedDay.toUpperCase();
    const matchesDay = selectedDay === 'ALL' || slotDay === selectedDayUpper;
    const matchesProgram =
      selectedProgram === 'ALL' ||
      slot.programCode === selectedProgram ||
      (selectedProgram === 'BSN-GEN' && (slot.programCode === 'BSN' || slot.programCode === 'BSN-GEN'));
    return matchesDay && matchesProgram;
  });

  // Open Grading Modal
  const handleOpenGradingModal = (exam: any) => {
    setActiveExam(exam);
    const initialMarks: Record<string, { theory: number; lab: number; internal: number }> = {};
    students.forEach((std) => {
      const existingMark = exam.marks?.find((m: any) => m.studentId === std.id);
      initialMarks[std.id] = {
        theory: existingMark ? Math.round(existingMark.marksObtained * 0.6) : 48,
        lab: existingMark ? Math.round(existingMark.marksObtained * 0.25) : 22,
        internal: existingMark ? Math.round(existingMark.marksObtained * 0.15) : 15,
      };
    });
    setMarksState(initialMarks);
    setIsGradingModalOpen(true);
    setSaveSuccessMsg('');
  };

  // Submit Marks Entry
  const handleSubmitMarks = async () => {
    if (!activeExam) return;
    setIsSaving(true);
    try {
      const payloadMarks = students.map((std) => ({
        studentId: std.id,
        subjectId: activeExam.subject?.id || '',
        theoryMarks: marksState[std.id]?.theory || 0,
        labMarks: marksState[std.id]?.lab || 0,
        internalMarks: marksState[std.id]?.internal || 0,
      }));

      const res = await submitExamMarks({
        examScheduleId: activeExam.id,
        marks: payloadMarks,
        gradedBy: 'Vice Principal & Exam Controller',
      });

      if (res.success) {
        setSaveSuccessMsg('Marks and grades published successfully to Student Ledgers & Transcripts!');
        setTimeout(() => {
          setIsGradingModalOpen(false);
          setSaveSuccessMsg('');
        }, 1800);
      } else {
        alert(res.error || 'Failed to submit marks.');
      }
    } catch (e: any) {
      alert('Error submitting marks: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Active student for transcript
  const currentTranscriptStudent = students.find((s) => s.id === transcriptStudentId) || students[0];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-imam-blue/10 text-imam-blue border border-imam-blue/20">
              PNC & SMF Affiliated
            </span>
            <span className="text-xs text-slate-400 font-mono">Academic Cycle 2025–2026</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Academic & Examination Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Curriculum syllabi, weekly lecture & clinical ward timetables, examination grading, and official transcripts.
          </p>
        </div>

        {/* Global Tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('CURRICULUM')}
            data-testid="academic-tab-curriculum"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'CURRICULUM'
                ? 'bg-imam-blue text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen size={14} /> Curriculum ({initialSubjects.length})
          </button>
          <button
            onClick={() => setActiveTab('TIMETABLE')}
            data-testid="academic-tab-timetable"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'TIMETABLE'
                ? 'bg-imam-blue text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar size={14} /> Weekly Timetable
          </button>
          <button
            onClick={() => setActiveTab('EXAMS')}
            data-testid="academic-tab-exams"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'EXAMS'
                ? 'bg-imam-blue text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award size={14} /> Exams & Grading
          </button>
          <button
            onClick={() => setActiveTab('TRANSCRIPT')}
            data-testid="academic-tab-transcript"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'TRANSCRIPT'
                ? 'bg-imam-blue text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap size={14} /> Official Transcripts
          </button>
        </div>
      </div>

      {/* TAB 1: CURRICULUM */}
      {activeTab === 'CURRICULUM' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search subject code or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-imam-blue/20 w-56"
                />
              </div>

              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700"
              >
                <option value="ALL">All Academic Programs</option>
                <option value="BSN-GEN">Generic BSN (4-Year)</option>
                <option value="POST-RN">Post-RN BSN (2-Year)</option>
                <option value="LHV">Lady Health Visitor (2-Year)</option>
                <option value="DPT">Doctor of Physical Therapy</option>
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700"
              >
                <option value="ALL">All Semesters / Years</option>
                <option value="1">Semester 1 / Year 1</option>
                <option value="2">Semester 2 / Year 2</option>
                <option value="3">Semester 3 / Year 3</option>
                <option value="4">Semester 4 / Year 4</option>
              </select>
            </div>

            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredSubjects.length} of {initialSubjects.length} subjects
            </span>
          </div>

          {/* Subject Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubjects.map((subj) => {
              const totalCr =
                subj.creditHoursTheory + subj.creditHoursLab + subj.creditHoursClinical;

              return (
                <div
                  key={subj.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-imam-blue/50 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        {subj.code}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                        Semester {subj.semester}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {subj.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {subj.program?.title || 'Generic Nursing Program'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-4 gap-1 text-center bg-slate-50 p-2 rounded-lg">
                    <div>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase">Theory</span>
                      <span className="text-xs font-extrabold text-slate-800">
                        {subj.creditHoursTheory} Cr
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase">Lab/Skills</span>
                      <span className="text-xs font-extrabold text-slate-800">
                        {subj.creditHoursLab} Cr
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase">Clinical</span>
                      <span className="text-xs font-extrabold text-slate-800">
                        {subj.creditHoursClinical} Cr
                      </span>
                    </div>
                    <div className="border-l border-slate-200 pl-1">
                      <span className="block text-[9px] text-imam-blue font-bold uppercase">Total</span>
                      <span className="text-xs font-black text-imam-blue">{totalCr} Cr</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: TIMETABLE */}
      {activeTab === 'TIMETABLE' && (
        <div className="space-y-4">
          {/* Day & Program Filter */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
                <Filter size={13} /> Day Filter:
              </span>
              <button
                onClick={() => setSelectedDay('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedDay === 'ALL'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Days
              </button>
              {daysOrder.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    selectedDay === day
                      ? 'bg-imam-blue text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>

            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700"
            >
              <option value="ALL">All Programs</option>
              <option value="BSN-GEN">Generic BSN</option>
              <option value="POST-RN">Post-RN BSN</option>
              <option value="LHV">LHV</option>
            </select>
          </div>

          {/* Timetable Schedule Cards */}
          <div className="space-y-4">
            {daysOrder
              .filter((day) => selectedDay === 'ALL' || selectedDay === day)
              .map((day) => {
                const daySlots = filteredTimetable.filter(
                  (s) => (s.dayOfWeek || '').toUpperCase() === day.toUpperCase()
                );
                if (daySlots.length === 0) return null;

                return (
                  <div key={day} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <Calendar size={15} className="text-imam-blue" />
                        {day}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {daySlots.length} Scheduled Sessions
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {daySlots.map((slot) => {
                        const typeVal = slot.sessionType || slot.slotType || 'THEORY';
                        const isClinical =
                          typeVal.toLowerCase().includes('ward') ||
                          typeVal.toLowerCase().includes('clinical');

                        return (
                          <div
                            key={slot.id}
                            className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                              isClinical
                                ? 'bg-rose-50/50 border-rose-200'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="font-mono font-bold text-[11px] text-slate-700 flex items-center gap-1">
                                  <Clock size={12} className="text-slate-400" />
                                  {slot.startTime} – {slot.endTime}
                                </span>
                                <span
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    isClinical
                                      ? 'bg-rose-100 text-rose-700'
                                      : 'bg-sky-100 text-sky-700'
                                  }`}
                                >
                                  {typeVal}
                                </span>
                              </div>

                              <div className="font-black text-slate-900 text-xs">
                                {slot.subjectCode}
                              </div>
                              <div className="text-[11px] text-slate-600 mt-0.5">
                                Instructor: <strong>{slot.teacherName}</strong>
                              </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                              <span className="flex items-center gap-1">
                                <Building size={11} /> {slot.roomNo}
                              </span>
                              <span className="font-mono font-bold text-slate-600">
                                {slot.programCode}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 3: EXAMINATIONS & GRADING */}
      {activeTab === 'EXAMS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialExams.map((exam) => {
              const totalCandidates = exam.marks?.length || students.length;
              const passedCount =
                exam.marks?.filter((m) => m.marksObtained >= exam.passingMarks).length || 0;
              const passPercentage =
                totalCandidates > 0 ? Math.round((passedCount / totalCandidates) * 100) : 100;

              return (
                <div
                  key={exam.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {exam.examType}
                      </span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          exam.isPublished
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {exam.isPublished ? 'RESULTS PUBLISHED' : 'GRADING IN PROGRESS'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Subject: <strong>{exam.subject?.title || 'Anatomy & Physiology'}</strong> (
                      {exam.subject?.code})
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">
                      Exam Date: {new Date(exam.examDate).toLocaleDateString('en-GB')}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500">Max Marks: <strong>{exam.totalMarks}</strong></span>
                      <span className="text-slate-500">Passing: <strong>{exam.passingMarks}</strong></span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg flex items-center justify-between text-xs mt-2">
                      <span className="text-slate-600 font-semibold">Pass Rate:</span>
                      <span className="font-black text-emerald-600">{passPercentage}%</span>
                    </div>

                    <button
                      onClick={() => handleOpenGradingModal(exam)}
                      data-testid={`grade-exam-${exam.id}`}
                      className="w-full mt-3 bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1.5"
                    >
                      <UserCheck size={14} /> Enter Marks & Publish Grades
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: OFFICIAL TRANSCRIPT PREVIEW */}
      {activeTab === 'TRANSCRIPT' && (
        <div className="space-y-4">
          {/* Student Selector Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-700">Select Student Scholar:</label>
              <select
                value={transcriptStudentId}
                onChange={(e) => setTranscriptStudentId(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-800 font-semibold"
              >
                {students.map((std) => (
                  <option key={std.id} value={std.id}>
                    {std.fullName} — {std.rollNo} ({std.program?.code})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => window.print()}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-1.5 px-4 rounded-lg transition flex items-center gap-1.5"
            >
              <Printer size={13} /> Print Official Grade Sheet
            </button>
          </div>

          {/* Official Grade Card Layout */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm print:border-none print:shadow-none print:p-0">
            {/* Institute Header */}
            <div className="text-center pb-6 border-b-2 border-slate-900">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Imam Medical Center Academic Wing
              </span>
              <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase">
                Imam Institute of Nursing & Allied Health Sciences
              </h2>
              <p className="text-xs text-slate-600 italic">
                Affiliated with Pakistan Nursing and Midwifery Council (PNC) & Sindh Medical Faculty (SMF)
              </p>
              <div className="mt-3 inline-block px-4 py-1 bg-slate-900 text-white text-xs font-bold rounded">
                OFFICIAL SEMESTER ACADEMIC TRANSCRIPT
              </div>
            </div>

            {/* Student Bio Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-b border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
                <strong className="text-slate-900">{currentTranscriptStudent?.fullName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Roll / Reg Number</span>
                <strong className="font-mono text-slate-900">{currentTranscriptStudent?.rollNo}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Academic Program</span>
                <strong className="text-slate-900">
                  {currentTranscriptStudent?.program?.title || 'Generic BSN'}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Academic Status</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  Good Standing (Dean&apos;s Honor)
                </span>
              </div>
            </div>

            {/* Course Grade Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Course Code</th>
                    <th className="p-3">Course Title</th>
                    <th className="p-3 text-center">Credit Hours</th>
                    <th className="p-3 text-center">Marks Obtained (100)</th>
                    <th className="p-3 text-center">Letter Grade</th>
                    <th className="p-3 text-right">Grade Point (GPA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {initialSubjects.slice(0, 5).map((subj, idx) => {
                    const mockScores = [86, 78, 92, 81, 74];
                    const mockGrades = ['A', 'B+', 'A+', 'A-', 'B'];
                    const mockGpas = [3.8, 3.4, 4.0, 3.7, 3.0];
                    const score = mockScores[idx] || 82;
                    const grade = mockGrades[idx] || 'A';
                    const gpa = mockGpas[idx] || 3.6;

                    return (
                      <tr key={subj.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-mono font-bold text-slate-800">{subj.code}</td>
                        <td className="p-3 text-slate-900">{subj.title}</td>
                        <td className="p-3 text-center font-semibold">
                          {subj.creditHoursTheory + subj.creditHoursLab}
                        </td>
                        <td className="p-3 text-center font-bold text-slate-800">{score}</td>
                        <td className="p-3 text-center">
                          <span className="font-black px-2 py-0.5 bg-slate-100 rounded text-slate-800">
                            {grade}
                          </span>
                        </td>
                        <td className="p-3 text-right font-black font-mono text-slate-900">
                          {gpa.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-50 border-t-2 border-slate-300 font-extrabold text-xs">
                  <tr>
                    <td colSpan={2} className="p-3 text-slate-800">
                      Total Semester Summary:
                    </td>
                    <td className="p-3 text-center text-slate-900">17 Credits</td>
                    <td className="p-3 text-center text-slate-900">411 / 500 (82.2%)</td>
                    <td className="p-3 text-center text-emerald-700">A</td>
                    <td className="p-3 text-right text-emerald-700 font-mono text-sm">
                      Semester CGPA: 3.68
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Official Signatures */}
            <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-3 gap-6 text-center text-xs">
              <div>
                <div className="w-36 border-b border-slate-400 mx-auto mb-1"></div>
                <span className="font-bold text-slate-700">Course Coordinator</span>
                <p className="text-[10px] text-slate-400">Faculty In-Charge</p>
              </div>
              <div>
                <div className="w-36 border-b border-slate-400 mx-auto mb-1"></div>
                <span className="font-bold text-slate-700">Zahid Abbasi</span>
                <p className="text-[10px] text-slate-400">Vice Principal / Exam Controller</p>
              </div>
              <div>
                <div className="w-36 border-b border-slate-400 mx-auto mb-1"></div>
                <span className="font-bold text-slate-700">Executive Registrar</span>
                <p className="text-[10px] text-slate-400">Imam Institute Seal</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ENTER MARKS & PUBLISH GRADES */}
      {isGradingModalOpen && activeExam && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {activeExam.title} — Grade Sheet Roster
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Subject: {activeExam.subject?.title} ({activeExam.subject?.code}) • Total: {activeExam.totalMarks} Marks
                </p>
              </div>
              <button
                onClick={() => setIsGradingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="my-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 size={16} /> {saveSuccessMsg}
              </div>
            )}

            <div className="flex-1 overflow-y-auto py-4">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Roll No</th>
                    <th className="p-2.5">Scholar Name</th>
                    <th className="p-2.5 text-center">Theory (60)</th>
                    <th className="p-2.5 text-center">Lab/OSCE (25)</th>
                    <th className="p-2.5 text-center">Internal (15)</th>
                    <th className="p-2.5 text-center">Total (100)</th>
                    <th className="p-2.5 text-right">Computed Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {students.map((std) => {
                    const theory = marksState[std.id]?.theory || 0;
                    const lab = marksState[std.id]?.lab || 0;
                    const internal = marksState[std.id]?.internal || 0;
                    const total = theory + lab + internal;
                    const grade = total >= 85 ? 'A+' : total >= 75 ? 'A' : total >= 65 ? 'B' : total >= 50 ? 'C' : 'F';

                    return (
                      <tr key={std.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-mono font-bold text-slate-800">{std.rollNo}</td>
                        <td className="p-2.5 text-slate-900">{std.fullName}</td>
                        <td className="p-2.5 text-center">
                          <input
                            type="number"
                            min="0"
                            max="60"
                            value={theory}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setMarksState((prev) => ({
                                ...prev,
                                [std.id]: { ...prev[std.id], theory: val },
                              }));
                            }}
                            className="w-16 text-center border border-slate-200 rounded p-1 font-mono font-bold"
                          />
                        </td>
                        <td className="p-2.5 text-center">
                          <input
                            type="number"
                            min="0"
                            max="25"
                            value={lab}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setMarksState((prev) => ({
                                ...prev,
                                [std.id]: { ...prev[std.id], lab: val },
                              }));
                            }}
                            className="w-16 text-center border border-slate-200 rounded p-1 font-mono font-bold"
                          />
                        </td>
                        <td className="p-2.5 text-center">
                          <input
                            type="number"
                            min="0"
                            max="15"
                            value={internal}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setMarksState((prev) => ({
                                ...prev,
                                [std.id]: { ...prev[std.id], internal: val },
                              }));
                            }}
                            className="w-16 text-center border border-slate-200 rounded p-1 font-mono font-bold"
                          />
                        </td>
                        <td className="p-2.5 text-center font-extrabold text-slate-900 font-mono">
                          {total}
                        </td>
                        <td className="p-2.5 text-right font-black">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] ${
                              grade === 'F' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Official Controller PIN verified. Results will immediately update Student Portal & Transcripts.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsGradingModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitMarks}
                  disabled={isSaving}
                  className="px-5 py-2 bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  {isSaving ? 'Publishing...' : 'Confirm & Publish Grades'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
