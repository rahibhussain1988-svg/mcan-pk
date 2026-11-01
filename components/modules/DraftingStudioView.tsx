'use client';

import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Send,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Languages,
} from 'lucide-react';
import { createApplicationDraft } from '@/app/actions/applications';
import { CrestLetterheadPrint } from '@/components/print/CrestLetterheadPrint';

interface DocumentRecord {
  id: string;
  documentNo: string;
  title: string;
  type: string;
  applicantRole: string;
  applicantName: string;
  contentEn: string;
  contentUr?: string | null;
  contentSd?: string | null;
  policyAlerts?: string | null;
  status: string;
  approvedBy?: string | null;
  issuedAt?: string | null;
  createdAt: string;
}

interface DraftingStudioProps {
  documents: DocumentRecord[];
  activeStudent: {
    fullName: string;
    rollNo: string;
    clinicalAttendancePercent: number;
    cgpa: number;
  };
}

export const DraftingStudioView: React.FC<DraftingStudioProps> = ({
  documents: initialDocs,
  activeStudent,
}) => {
  const [documents, setDocuments] = useState<DocumentRecord[]>(initialDocs);
  const [selectedDocForPrint, setSelectedDocForPrint] = useState<DocumentRecord | null>(null);
  const [activeLang, setActiveLang] = useState<'en' | 'ur' | 'sd'>('en');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Template Form State
  const [templateType, setTemplateType] = useState('LEAVE_APPLICATION');
  const [title, setTitle] = useState('Application for 2-Day Clinical Ward Sick Leave');
  const [contentEn, setContentEn] = useState(
    `To: The Clinical Coordinator & Principal, Imam Institute of Nursing.
Subject: Request for 2-Day Sick Leave from Emergency Ward Clinical Shift.

Respected Madam,
I am currently experiencing severe viral fever and gastroenteritis. I respectfully request 2 days medical leave from my clinical rotation at Imam Medical Center. My current clinical attendance stands at ${activeStudent.clinicalAttendancePercent}%, and I will make up the missed ward hours during the upcoming weekend shift.

Yours obediently,
${activeStudent.fullName} (Roll No: ${activeStudent.rollNo})`
  );
  const [contentUr, setContentUr] = useState(
    `بخدمت: کلینیکل کوآرڈینیٹر صاحبہ و پرنسپل، امام انسٹی ٹیوٹ آف نرسنگ۔
موضوع: ایمرجنسی وارڈ ڈیوٹی سے دو روزہ طبی رخصت کی درخواست۔

محترمہ،
گزارش ہے کہ ناساز طبع اور وائرل بخار کے باعث میں امام میڈیکل سینٹر میں وارڈ روٹیشن سے دو روز کے لیے حاضر ہونے سے قاصر ہوں۔ میری موجودہ کلینیکل حاضری ${activeStudent.clinicalAttendancePercent} فیصد ہے۔ میں یہ ڈیوٹی آنے والے ویک اینڈ پر مکمل کر لوں گا۔

طالب علم: ${activeStudent.fullName} (رول نمبر: ${activeStudent.rollNo})`
  );
  const [contentSd, setContentSd] = useState(
    `خدمت ۾: ڪلينيڪل ڪوآرڊينيٽر صاحبه ۽ پرنسپال، امام انسٽيٽيوٽ آف نرسنگ.
موضوع: ايمرجنسي وارڊ ڊيوٽي مان ٻه ڏينهن طبي موڪل جي درخواست.

محترمه،
گذارش آهي ته وائرل بخار سبب مان امام ميڊيڪل سينٽر ۾ ڪلينيڪل روٽيشن تي حاضر نه ٿي سگهنديس. منهنجي هاڻوڪي حاضري ${activeStudent.clinicalAttendancePercent} سيڪڙو آهي. مان اهي ڪلاڪ ايندڙ هفتي ۾ پورا ڪنديس.

شاگرد: ${activeStudent.fullName} (رول نمبر: ${activeStudent.rollNo})`
  );

  // Check PNC 85% policy guardrail
  const leavesDropBelow85 = activeStudent.clinicalAttendancePercent - 3.5 < 85;

  const handleTemplateChange = (type: string) => {
    setTemplateType(type);
    if (type === 'FEE_CONCESSION') {
      setTitle('Application for Need-Based 50% Tuition Fee Concession');
      setContentEn(
        `To: The Chairman & Academic Board, Imam Institute of Nursing.
Subject: Application for Need-Based Tuition Concession for Academic Year 2026.

Respected Chairman,
I am a dedicated 4th-semester Generic BSN student maintaining a CGPA of ${activeStudent.cgpa}. Due to sudden financial hardship in my family, I respectfully request a 50% tuition concession. All supporting documentation from the District Welfare Department has been attached.

Yours sincerely,
${activeStudent.fullName} (${activeStudent.rollNo})`
      );
    } else if (type === 'BONAFIDE_CERTIFICATE') {
      setTitle('Request for Bonafide Student Enrollment Certificate');
      setContentEn(
        `To Whom It May Concern:
This is to certify that ${activeStudent.fullName}, daughter/son of registered guardian, is a bona fide regular student of Generic BSN (4-Year Degree Program) at Imam Institute of Nursing & Allied Health Sciences. Her conduct and clinical discipline have been exemplary.`
      );
    } else if (type === 'PNC_REGULATORY') {
      setTitle('Official Regulatory Letter: PNC Annual Inspection Roster');
      setContentEn(
        `To: The Registrar, Pakistan Nursing & Midwifery Council (PNC), Islamabad.
Subject: Annual Faculty Roster & 100-Bed Affiliated Imam Medical Center Bedside Rotation Log for Generic BSN.

Respected Sir/Madam,
It is certified that Imam Institute maintains a compliant faculty-to-student ratio of 1:10 for clinical rotations at Imam Medical Center. All students have achieved over 85% attendance required under PNC statutory rules.`
      );
    }
  };

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createApplicationDraft({
        title,
        type: templateType,
        applicantRole: 'STUDENT',
        applicantId: activeStudent.rollNo,
        applicantName: activeStudent.fullName,
        contentEn,
        contentUr,
        contentSd,
        policyAlerts: leavesDropBelow85
          ? 'Warning: Absences may push clinical attendance near 85% PNC threshold.'
          : 'PNC 85% attendance threshold fully compliant.',
      });

      if (res.success && res.doc) {
        setDocuments([res.doc as any, ...documents]);
        alert(
          `Document ${res.doc.documentNo} drafted and routed to Principal & Academic Office for seal and issuance!`
        );
      }
    } catch (err) {
      alert('Error creating document draft');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="text-imam-blue" /> Official Correspondence &amp; Drafting Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Trilingual official letterhead drafting (English | اردو | سنڌي) with PNC policy compliance guardrails
          </p>
        </div>

        {/* Language Preview Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <span className="text-[10px] text-slate-400 uppercase px-1">Language:</span>
          {(['en', 'ur', 'sd'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setActiveLang(l)}
              className={`px-2.5 py-1 rounded-lg transition ${
                activeLang === l ? 'bg-imam-blue text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {l === 'en' ? 'English' : l === 'ur' ? 'اردو' : 'سنڌي'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Composer Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles size={16} className="text-imam-blue" />
              New Official Correspondence Draft
            </h2>
            <span className="text-xs font-mono text-slate-400">PNC Form Generator</span>
          </div>

          {/* Template Chips */}
          <div>
            <label className="block text-slate-700 font-bold text-xs mb-1.5">
              Select Institutional Template:
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { type: 'LEAVE_APPLICATION', label: 'Clinical Ward Sick Leave' },
                { type: 'FEE_CONCESSION', label: 'Need-Based Fee Concession' },
                { type: 'BONAFIDE_CERTIFICATE', label: 'Bonafide Student Certificate' },
                { type: 'PNC_REGULATORY', label: 'PNC Regulatory Compliance Cover' },
              ].map((t) => (
                <button
                  type="button"
                  key={t.type}
                  onClick={() => handleTemplateChange(t.type)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                    templateType === t.type
                      ? 'bg-imam-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live DB Policy Guard Banner */}
          <div
            className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
              leavesDropBelow85
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            {leavesDropBelow85 ? (
              <AlertTriangle className="shrink-0 text-amber-600 mt-0.5" size={16} />
            ) : (
              <ShieldCheck className="shrink-0 text-emerald-600 mt-0.5" size={16} />
            )}
            <div>
              <strong className="block font-bold">
                Live PNC Clinical Guardrail Evaluation:
              </strong>
              <span>
                Applicant attendance: <strong>{activeStudent.clinicalAttendancePercent}%</strong>.
                {leavesDropBelow85
                  ? ' Warning: Taking additional leave will drop attendance close to the 85% PNC statutory threshold!'
                  : ' Fully satisfies PNC 85% attendance requirement for exam clearance.'}
              </span>
            </div>
          </div>

          <form onSubmit={handleCreateDocument} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Subject / Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue font-bold text-slate-900"
                required
              />
            </div>

            {/* Content Tabs (EN / UR / SD) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-700 font-bold">Document Body:</label>
                <div className="flex gap-1 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveLang('en')}
                    className={`px-2 py-0.5 rounded ${activeLang === 'en' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang('ur')}
                    className={`px-2 py-0.5 rounded font-urdu ${activeLang === 'ur' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}
                  >
                    اردو
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang('sd')}
                    className={`px-2 py-0.5 rounded font-sindhi ${activeLang === 'sd' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}
                  >
                    سنڌي
                  </button>
                </div>
              </div>

              {activeLang === 'en' && (
                <textarea
                  rows={6}
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-imam-blue font-serif text-xs leading-relaxed"
                  required
                />
              )}

              {activeLang === 'ur' && (
                <textarea
                  rows={6}
                  value={contentUr}
                  onChange={(e) => setContentUr(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-imam-blue font-urdu text-sm leading-loose text-right"
                />
              )}

              {activeLang === 'sd' && (
                <textarea
                  rows={6}
                  value={contentSd}
                  onChange={(e) => setContentSd(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-imam-blue font-sindhi text-sm leading-loose text-right"
                />
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="submit-draft-btn"
                className="bg-imam-blue hover:bg-imam-navy text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95"
              >
                <Send size={15} />
                {isSubmitting ? 'Submitting...' : 'Submit Draft for Principal Approval'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Issued Documents History */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">
            Institutional Registry Documents ({documents.length})
          </h2>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-imam-blue/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-imam-navy bg-white px-2 py-0.5 rounded border border-slate-200">
                      {doc.documentNo}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        doc.status === 'APPROVED' || doc.status === 'ISSUED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug mt-1">
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 font-serif">
                    {doc.contentEn}
                  </p>
                </div>

                <div className="pt-2.5 mt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    By: {doc.applicantName}
                  </span>
                  <button
                    onClick={() => setSelectedDocForPrint(doc)}
                    data-testid={`print-doc-${doc.documentNo.replace(/\//g, '-')}`}
                    className="text-xs font-bold text-imam-blue hover:text-imam-navy flex items-center gap-1"
                  >
                    <Printer size={13} /> Official Letterhead
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Crest Letterhead Print Modal */}
      {selectedDocForPrint && (
        <CrestLetterheadPrint
          document={selectedDocForPrint}
          activeLang={activeLang}
          onClose={() => setSelectedDocForPrint(null)}
        />
      )}
    </div>
  );
};
