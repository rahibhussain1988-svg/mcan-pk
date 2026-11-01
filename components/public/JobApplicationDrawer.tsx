'use client';

import React, { useState } from 'react';
import { submitJobApplication } from '@/app/actions/careers';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import {
  X,
  Briefcase,
  CheckCircle2,
  Send,
  Building2,
  FileText,
  User,
  GraduationCap,
} from 'lucide-react';

interface JobApplicationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPosition?: string;
}

export const JobApplicationDrawer: React.FC<JobApplicationDrawerProps> = ({
  isOpen,
  onClose,
  defaultPosition = 'Principal (MSN)',
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('FEMALE');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [highestQualification, setHighestQualification] = useState('Master of Science in Nursing (MSN)');
  const [yearsExperience, setYearsExperience] = useState<number>(6);
  const [pncRegistrationNo, setPncRegistrationNo] = useState('');
  const [currentOrganization, setCurrentOrganization] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppNo, setSubmittedAppNo] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !cnic.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitJobApplication({
        position,
        fullName,
        gender,
        email,
        phone,
        cnic,
        highestQualification,
        yearsExperience,
        pncRegistrationNo,
        currentOrganization,
        coverLetter,
      });

      if (res.success && res.applicationNo) {
        setSubmittedAppNo(res.applicationNo);
      } else {
        alert(res.error || 'Failed to submit application');
      }
    } catch (e: any) {
      alert('Error submitting job application: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-imam-navy to-[#062B54] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImamCrestLogo size={36} showText={false} />
            <div>
              <h3 className="text-base font-extrabold text-white">
                Faculty &amp; Leadership Careers Portal
              </h3>
              <p className="text-[11px] text-blue-200">
                Imam Institute of Nursing &amp; Allied Health Sciences · Jacobabad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {submittedAppNo ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-lg font-black text-slate-900">
              Application Dispatched to HR Desk!
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your application for <strong>{position}</strong> has been assigned reference{' '}
              <strong className="text-imam-blue font-mono">{submittedAppNo}</strong> and forwarded directly into the Owner / Executive HR Review Inbox.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-imam-navy hover:bg-imam-blue text-white text-xs font-bold transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <Briefcase size={16} className="text-amber-700 shrink-0" />
              <span>
                <strong>Priority Opening:</strong> Principal (Male/Female) with MSN &amp; clinical administrative experience recognized by PNMC.
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Applying For Position *
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-imam-blue"
              >
                <option value="Principal (MSN)">Principal — College of Nursing (MSN Required)</option>
                <option value="Vice Principal / Senior Nursing Lecturer">Vice Principal / Senior Nursing Lecturer</option>
                <option value="Clinical Instructor (Generic BSN)">Clinical Instructor (Generic BSN)</option>
                <option value="Radiology / Diagnostic Instructor">Radiology / Diagnostic Instructor</option>
                <option value="ICU / Critical Care Preceptor">ICU / Critical Care Preceptor</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Farzana Parveen"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  CNIC Number *
                </label>
                <input
                  type="text"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  placeholder="42201-XXXXXXX-X"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile / WhatsApp *
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 XXXXXXX"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Highest Degree *
                </label>
                <input
                  type="text"
                  value={highestQualification}
                  onChange={(e) => setHighestQualification(e.target.value)}
                  placeholder="e.g. MSN / PhD Nursing / Post-RN"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(Number(e.target.value))}
                  min="0"
                  max="40"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  PNC Registration Number
                </label>
                <input
                  type="text"
                  value={pncRegistrationNo}
                  onChange={(e) => setPncRegistrationNo(e.target.value)}
                  placeholder="e.g. PNC-REG-77412-M"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Current / Previous Organization
                </label>
                <input
                  type="text"
                  value={currentOrganization}
                  onChange={(e) => setCurrentOrganization(e.target.value)}
                  placeholder="Hospital or College Name"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Cover Note / Key Achievements
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={3}
                placeholder="Briefly state your academic philosophy and leadership background..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-imam-blue"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-imam-blue hover:bg-imam-navy text-white text-xs font-black transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <span>{isSubmitting ? 'Submitting to HR...' : 'Submit Application'}</span>
                <Send size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
