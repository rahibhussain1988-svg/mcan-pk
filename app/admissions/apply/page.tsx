'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import { PublicWebsiteShell } from '@/components/public/PublicWebsiteShell';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import { submitAdmissionApplication } from '@/app/actions/admissions';
import {
  FileText,
  User,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Printer,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function ApplyPage() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApplication, setSubmittedApplication] = useState<any | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [fatherPhone, setFatherPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('MALE');
  const [dob, setDob] = useState('');
  const [domicileDistrict, setDomicileDistrict] = useState('Jacobabad');
  const [address, setAddress] = useState('');

  const [programCode, setProgramCode] = useState('BSN');
  const [matricMarks, setMatricMarks] = useState<number>(850);
  const [fscMarks, setFscMarks] = useState<number>(820);
  const [scholarshipCategory, setScholarshipCategory] = useState('NONE');

  const programs = INSTITUTIONAL_DATA.programs.filter((p) => p.openAdmissions);
  const selectedProgram = programs.find((p) => p.code === programCode) || programs[0];

  const matricPct = (matricMarks / 1100) * 100;
  const fscPct = (fscMarks / 1100) * 100;
  const calculatedMerit = Math.round((matricPct * 0.4 + fscPct * 0.6) * 10) / 10;

  const handleNext = () => {
    if (step === 1) {
      if (!fullName.trim() || !fatherName.trim() || !cnic.trim() || !phone.trim()) {
        alert('Please fill in all required candidate information.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitAdmissionApplication({
        fullName,
        fatherName,
        cnic,
        phone,
        fatherPhone,
        email,
        gender,
        dob,
        domicileDistrict,
        address,
        programCode,
        programName: selectedProgram?.name || programCode,
        matricMarks,
        fscMarks,
        scholarshipCategory,
      });

      if (res.success && res.application) {
        setSubmittedApplication(res.application);
        // Generate QR Code data URL
        const qrData = `IMAM-ADMISSION:${res.application.applicationNo}|${fullName}|${programCode}|MERIT:${calculatedMerit}%|VERIFIED`;
        const url = await QRCode.toDataURL(qrData, { width: 140, margin: 1 });
        setQrCodeUrl(url);
        setStep(4);
      } else {
        alert(res.error || 'Failed to submit application. Please check your inputs.');
      }
    } catch (e: any) {
      alert('Error submitting application: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicWebsiteShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-imam-blue bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full inline-block mb-2">
            Admissions Session 2026–2027
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Official Online Admission Application
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
            4-Year BS Nursing (Generic) and 9 Free Paramedical Diplomas. Instant verified QR Admit Slip upon submission.
          </p>
        </div>

        {/* Multi-Step Stepper Header */}
        {step < 4 && (
          <div className="flex items-center justify-between max-w-md mx-auto mb-8 text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-imam-blue' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-imam-blue text-white' : 'bg-slate-200'}`}>
                1
              </div>
              <span>Candidate Bio</span>
            </div>
            <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-imam-blue' : 'bg-slate-200'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-imam-blue' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-imam-blue text-white' : 'bg-slate-200'}`}>
                2
              </div>
              <span>Academic Merit</span>
            </div>
            <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-imam-blue' : 'bg-slate-200'}`} />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-imam-blue' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-imam-blue text-white' : 'bg-slate-200'}`}>
                3
              </div>
              <span>Review &amp; Apply</span>
            </div>
          </div>
        )}

        {/* STEP 1: PERSONAL BIODATA */}
        {step === 1 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <User size={18} className="text-imam-blue" />
                Step 1: Personal &amp; Identification Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Ensure details match your Matriculation Certificate and CNIC / B-Form.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Applicant Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ayesha Noor / Tariq Aziz"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-imam-blue/20"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Father / Guardian Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ghulam Rasool"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-imam-blue/20"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  CNIC or B-Form Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="43102-XXXXXXX-X (13 digits)"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 font-mono focus:outline-none focus:ring-2 focus:ring-imam-blue/20"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="0300-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 font-mono focus:outline-none focus:ring-2 focus:ring-imam-blue/20"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Father / Guardian Contact Phone
                </label>
                <input
                  type="text"
                  placeholder="0300-7654321"
                  value={fatherPhone}
                  onChange={(e) => setFatherPhone(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 font-mono focus:outline-none focus:ring-2 focus:ring-imam-blue/20"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="candidate@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-imam-blue/20"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white"
                >
                  <option value="FEMALE">Female (Hostel Eligible)</option>
                  <option value="MALE">Male</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Domicile District</label>
                <select
                  value={domicileDistrict}
                  onChange={(e) => setDomicileDistrict(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white"
                >
                  <option value="Jacobabad">Jacobabad (Local Quota)</option>
                  <option value="Kashmore-Kandhkot">Kashmore / Kandhkot</option>
                  <option value="Shikarpur">Shikarpur</option>
                  <option value="Larkana">Larkana</option>
                  <option value="Sukkur">Sukkur</option>
                  <option value="Jaffarabad">Jaffarabad (Balochistan)</option>
                  <option value="Other">Other Sindh / Balochistan District</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Permanent Residential Address</label>
                <input
                  type="text"
                  placeholder="Muhalla, Street, Village/Town, District"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Academic Merit</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROGRAM & ACADEMIC MERIT */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <GraduationCap size={18} className="text-imam-blue" />
                Step 2: Program Choice &amp; Educational Record
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your desired discipline and enter your Matric and Intermediate marks.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Select Healthcare Program / Track
                </label>
                <select
                  value={programCode}
                  onChange={(e) => setProgramCode(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white font-bold text-slate-800"
                >
                  {programs.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name} ({p.duration}) — {p.freeInitiative ? '100% Free Admissions' : 'PNMC Registered'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs text-slate-700 space-y-1">
                <div className="font-extrabold text-imam-blue text-sm">
                  {selectedProgram.name}
                </div>
                <div className="text-slate-600">
                  <strong>Eligibility:</strong> {selectedProgram.eligibility}
                </div>
                <div className="text-slate-600">
                  <strong>Affiliation:</strong> {selectedProgram.affiliation}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Matric (Science) Obtained Marks (Out of 1100)
                  </label>
                  <input
                    type="number"
                    min="300"
                    max="1100"
                    value={matricMarks}
                    onChange={(e) => setMatricMarks(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-xl p-3 font-mono font-bold"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Matric Percentage: <strong>{matricPct.toFixed(1)}%</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    FSc (Pre-Medical) Obtained Marks (Out of 1100)
                  </label>
                  <input
                    type="number"
                    min="300"
                    max="1100"
                    value={fscMarks}
                    onChange={(e) => setFscMarks(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-xl p-3 font-mono font-bold"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    FSc Percentage: <strong>{fscPct.toFixed(1)}%</strong>
                  </span>
                </div>
              </div>

              {/* Dynamic Formula Computation Box */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Institutional Aggregate Formula (40% SSC + 60% HSSC)
                  </span>
                  <div className="text-lg font-black text-amber-300 mt-0.5">
                    Calculated Merit Aggregate: {calculatedMerit}%
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full font-bold">
                  {calculatedMerit >= 65 ? 'High Merit Candidate' : 'Eligible for Entry Test'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Review</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & SUBMISSION */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" />
                Step 3: Scholarship Category &amp; Final Confirmation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review your application details before registering your official entry test record.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Apply for Institutional Financial Assistance / Quota
                </label>
                <select
                  value={scholarshipCategory}
                  onChange={(e) => setScholarshipCategory(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white"
                >
                  <option value="NONE">Open Merit (Standard Admission)</option>
                  <option value="NEED_BASED">Need-Based Financial Assistance (Up to 50% Tuition)</option>
                  <option value="ORPHAN">Orphan / Shuhada Children 100% Scholarship</option>
                  <option value="TCF_ALUMNI">The Citizens Foundation (TCF) Alumni Reserved Seat</option>
                  <option value="PEEF">Punjab Educational Endowment Fund (PEEF) Nominee</option>
                </select>
              </div>

              {/* Summary Review Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="font-extrabold text-slate-900 pb-2 border-b border-slate-200 text-xs uppercase tracking-wider">
                  Application Summary
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">APPLICANT NAME</span>
                    <strong className="text-slate-800">{fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">FATHER NAME</span>
                    <strong className="text-slate-800">{fatherName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CNIC / B-FORM</span>
                    <strong className="font-mono text-slate-800">{cnic}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CONTACT PHONE</span>
                    <strong className="font-mono text-slate-800">{phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CHOSEN PROGRAM</span>
                    <strong className="text-imam-blue">{selectedProgram.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">MERIT AGGREGATE</span>
                    <strong className="font-mono text-emerald-600">{calculatedMerit}%</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                <strong>Solemn Declaration:</strong> I hereby solemnly affirm that the information submitted above is true and correct to the best of my knowledge. I understand that any false declaration will lead to immediate cancellation of admission.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition flex items-center gap-2 shadow-md cursor-pointer"
              >
                {isSubmitting ? 'Registering...' : 'Submit & Generate Official Admit Slip'}
                <CheckCircle2 size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: OFFICIAL ADMIT SLIP GENERATION */}
        {step === 4 && submittedApplication && (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span>
                  <strong>Admission Registered Successfully!</strong> Your application has been logged in the ERP Admission Office database.
                </span>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
              >
                <Printer size={13} /> Print Admit Slip
              </button>
            </div>

            {/* Printable Official Admit Slip Card */}
            <div className="bg-white rounded-3xl border-2 border-slate-900 p-6 sm:p-8 shadow-lg print:border-none print:shadow-none print:p-0">
              {/* Slip Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div className="flex items-center gap-3">
                  <ImamCrestLogo size={56} showText={false} />
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase">
                      Imam Institute of Nursing &amp; Allied Health Sciences
                    </h3>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Shah Ghazi Muhalla, Imam Baksh Road, Jacobabad, Sindh
                    </p>
                    <span className="text-[10px] font-black uppercase text-imam-blue">
                      OFFICIAL CAMPUS ENTRY TEST ADMIT SLIP — FALL 2026
                    </span>
                  </div>
                </div>

                {qrCodeUrl && (
                  <div className="text-center shrink-0">
                    <img src={qrCodeUrl} alt="Admit Slip QR Code" className="w-20 h-20 border border-slate-200 p-0.5 rounded" />
                    <span className="text-[9px] font-mono text-slate-400 block mt-0.5">Scannable QR</span>
                  </div>
                )}
              </div>

              {/* Candidate Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Roll / App Number</span>
                  <strong className="font-mono text-base font-black text-imam-blue">
                    {submittedApplication.applicationNo}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Applicant Name</span>
                  <strong className="text-slate-900 text-sm">{submittedApplication.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Father Name</span>
                  <strong className="text-slate-900">{submittedApplication.fatherName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">CNIC / B-Form</span>
                  <strong className="font-mono text-slate-800">{submittedApplication.cnic}</strong>
                </div>
              </div>

              {/* Test Schedule & Instructions */}
              <div className="py-4 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Test Date &amp; Time</span>
                    <strong className="text-slate-800 flex items-center gap-1 mt-0.5">
                      <Calendar size={13} className="text-imam-blue" />
                      Sunday, 22 November 2026 · 10:00 AM
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Examination Venue</span>
                    <strong className="text-slate-800 flex items-center gap-1 mt-0.5">
                      <MapPin size={13} className="text-imam-red" />
                      Auditorium Hall, Jacobabad Campus
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Reporting Time</span>
                    <strong className="text-slate-800 flex items-center gap-1 mt-0.5">
                      <Clock size={13} className="text-emerald-600" />
                      09:15 AM (Bring Original CNIC &amp; Slip)
                    </strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1">
                  <p><strong>Instructions for Candidates:</strong></p>
                  <p>1. Candidates must bring this printed admit slip along with original CNIC / B-Form and clipboard with black/blue ballpoint pen.</p>
                  <p>2. Electronic devices, calculators, smartwatches, and mobile phones are strictly prohibited inside the examination center.</p>
                </div>
              </div>

              {/* Signatures */}
              <div className="mt-8 pt-6 border-t border-slate-300 grid grid-cols-2 text-center text-xs">
                <div>
                  <div className="w-40 border-b border-slate-400 mx-auto mb-1"></div>
                  <span className="font-bold text-slate-700">Applicant Signature</span>
                </div>
                <div>
                  <div className="w-40 border-b border-slate-400 mx-auto mb-1"></div>
                  <span className="font-bold text-slate-700">Admission Controller / Registrar</span>
                  <p className="text-[10px] text-slate-400">Imam Institute of Nursing</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicWebsiteShell>
  );
}
