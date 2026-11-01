'use client';

import React, { useState } from 'react';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import { usePublicWebsite } from '@/components/public/PublicWebsiteContext';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import { submitContactInquiry } from '@/app/actions/inquiries';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

function ContactPageContent() {
  const { openCounselor } = usePublicWebsite();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Admission Inquiry Fall 2026');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !message.trim()) {
      alert('Please fill in your name, phone, and inquiry message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitContactInquiry({
        fullName,
        phone,
        email,
        subject,
        message,
      });

      if (res.success) {
        setIsSubmitted(true);
      } else {
        alert(res.error || 'Failed to submit inquiry');
      }
    } catch (e: any) {
      alert('Error submitting inquiry: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-imam-navy via-[#07366B] to-imam-navy text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-3">
            Campus Location &amp; Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact &amp; Visit Campus
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Connect directly with our admissions office, academic counselors, or visit our main campus in Shah Ghazi Muhalla, Jacobabad.
          </p>
        </div>
      </section>

      {/* Contact Details & Inquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Campus Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-imam-blue">
                Campus Address
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Jacobabad Main Campus
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <MapPin size={20} className="text-imam-red shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block text-sm">Physical Address:</strong>
                  <span className="text-slate-600 leading-relaxed block mt-1">
                    {INSTITUTIONAL_DATA.address.full}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Phone size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block text-sm">Helpline &amp; WhatsApp:</strong>
                  <a
                    href={`tel:${INSTITUTIONAL_DATA.contact.phone.replace(/\s+/g, '')}`}
                    className="text-imam-blue font-bold text-sm block mt-1 hover:underline"
                  >
                    {INSTITUTIONAL_DATA.contact.phone}
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Mail size={20} className="text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block text-sm">Official Email:</strong>
                  <a
                    href={`mailto:${INSTITUTIONAL_DATA.contact.email}`}
                    className="text-slate-700 block mt-1 hover:text-imam-blue"
                  >
                    {INSTITUTIONAL_DATA.contact.email}
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Clock size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block text-sm">Office &amp; Campus Hours:</strong>
                  <span className="text-slate-600 block mt-1">
                    {INSTITUTIONAL_DATA.contact.hours}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Counselor Banner */}
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Need Immediate Answers?</h4>
                <p className="text-[11px] text-slate-600">
                  Our trilingual AI counselor answers in English, Urdu, and Sindhi.
                </p>
              </div>
              <button
                onClick={openCounselor}
                className="px-3.5 py-1.5 rounded-xl bg-imam-blue text-white text-xs font-bold shrink-0 hover:bg-imam-navy transition"
              >
                Ask AI
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Inquiry Dispatched to Admissions Desk!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Imam Institute. Our campus admissions team will reach back via phone or WhatsApp at <strong>{phone}</strong> during working hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-imam-navy text-white text-xs font-bold transition hover:bg-imam-blue"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <MessageSquare size={18} className="text-imam-blue" />
                    Send an Official Campus Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Inquiries are recorded directly in our admissions database.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-imam-blue"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-imam-blue"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-imam-blue"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Subject / Topic
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-imam-blue"
                    >
                      <option value="Admission Inquiry Fall 2026">BS Nursing Admission Inquiry</option>
                      <option value="Paramedical Free Admission">Paramedical Free Admission</option>
                      <option value="PEEF Scholarship Inquiry">PEEF / Need-Based Scholarship</option>
                      <option value="Clinical Rotations at JIMS / IMC">Clinical Rotations Inquiry</option>
                      <option value="Job / Principal Hiring">Job / Faculty Recruitment</option>
                      <option value="Other Campus Inquiry">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Inquiry Message *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Write your question or request..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-imam-blue"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-imam-blue hover:bg-imam-navy text-white text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Dispatching Message...' : 'Send Inquiry Message'}</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <PublicWebsiteShell>
      <ContactPageContent />
    </PublicWebsiteShell>
  );
}

