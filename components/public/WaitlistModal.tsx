'use client';

import React, { useState } from 'react';
import { submitWaitlistRegistration } from '@/app/actions/waitlist';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import {
  X,
  BellRing,
  CheckCircle2,
  Send,
  Sparkles,
} from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramCode?: string;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  defaultProgramCode = 'CMW',
}) => {
  const [programCode, setProgramCode] = useState(defaultProgramCode);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Jacobabad');
  const [notifyVia, setNotifyVia] = useState('WHATSAPP');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const programs = [
    { code: 'CMW', name: 'Community Midwifery (CMW) - 2 Years' },
    { code: 'LHV', name: 'Lady Health Visitor (LHV) - 2 Years' },
    { code: 'CNA', name: 'Certified Nursing Assistant (CNA) - 2 Years' },
  ];

  const selectedProgram = programs.find((p) => p.code === programCode) || programs[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitWaitlistRegistration({
        programCode,
        programName: selectedProgram.name,
        fullName,
        phone,
        email,
        city,
        notifyVia,
      });

      if (res.success) {
        setIsSuccess(true);
      } else {
        alert(res.error || 'Failed to submit registration');
      }
    } catch (e: any) {
      alert('Error saving registration: ' + e.message);
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
        className="bg-white rounded-3xl max-w-md w-full my-8 shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-imam-navy to-[#062B54] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImamCrestLogo size={36} showText={false} />
            <div>
              <h3 className="text-base font-extrabold text-white">
                Priority Alert Waitlist
              </h3>
              <p className="text-[11px] text-blue-200">
                Department of Nursing Upcoming Pathways
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-base font-black text-slate-900">
              You&apos;re On the Priority Alert List!
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              As soon as PNMC seat allocations open for <strong>{selectedProgram.name}</strong>, you will receive an instant notification via {notifyVia}.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-imam-navy text-white text-xs font-bold transition hover:bg-imam-blue"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-blue-900 text-xs flex items-center gap-2">
              <BellRing size={16} className="text-imam-blue shrink-0" />
              <span>
                Register for early notification when CMW, LHV, and CNA batches are officially launched.
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Target Pathway *
              </label>
              <select
                value={programCode}
                onChange={(e) => setProgramCode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
              >
                {programs.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Candidate Full Name"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Mobile / WhatsApp Number *
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  City / District
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Jacobabad"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Notify Me Via
                </label>
                <select
                  value={notifyVia}
                  onChange={(e) => setNotifyVia(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                >
                  <option value="WHATSAPP">WhatsApp</option>
                  <option value="SMS">SMS Message</option>
                  <option value="EMAIL">Email</option>
                </select>
              </div>
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
                className="px-5 py-2.5 rounded-xl bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <span>{isSubmitting ? 'Registering...' : 'Join Waitlist'}</span>
                <Send size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
