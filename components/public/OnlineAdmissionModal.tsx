'use client';

import React, { useState } from 'react';
import QRCode from 'qrcode';
import { submitAdmissionApplication } from '@/app/actions/admissions';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  X,
  CheckCircle2,
  Printer,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  FileText,
  User,
  GraduationCap,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

interface OnlineAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramCode?: string;
}

export const OnlineAdmissionModal: React.FC<OnlineAdmissionModalProps> = ({
  isOpen,
  onClose,
  defaultProgramCode = 'BSN',
}) => {
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

  const [programCode, setProgramCode] = useState(defaultProgramCode);
  const [matricMarks, setMatricMarks] = useState<number>(850);
  const [fscMarks, setFscMarks] = useState<number>(820);
  const [scholarshipCategory, setScholarshipCategory] = useState('NONE');

  if (!isOpen) return null;

  const programs = INSTITUTIONAL_DATA.programs.filter((p) => p.openAdmissions);
  const selectedProgram = programs.find((p) => p.code === programCode) || programs[0];

  const matricPct = (matricMarks / 1100) * 100;
  const fscPct = (fscMarks / 1100) * 100;
  const calculatedMerit = Math.round((matricPct * 0.4 + fscPct * 0.6) * 10) / 10;

  const handleNext = () => {
    if (step === 1) {
      if (!fullName.trim() || !fatherName.trim() || !cnic.trim() || !phone.trim()) {
        alert('Please fill in all required applicant details.');
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
        programCode: selectedProgram.code,
        programName: selectedProgram.name,
        matricMarks,
        matricTotal: 1100,
        fscMarks,
        fscTotal: 1100,
        scholarshipCategory,
      });

      if (res.success && res.application) {
        setSubmittedApplication(res.application);
        // Generate QR code data URL
        const qr = await QRCode.toDataURL(res.application.qrSlipData || res.application.applicationNo, {
          width: 140,
          margin: 1,
        });
        setQrCodeUrl(qr);
        setStep(5); // Success step
      } else {
        alert(res.error || 'Failed to submit application');
      }
    } catch (e: any) {
      alert('Error saving application: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-imam-navy to-[#062B54] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImamCrestLogo size={42} showText={false} />
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Online Admission Application 2026–27
              </h2>
              <p className="text-[11px] text-blue-200">
                Imam Institute of Nursing &amp; Allied Health Sciences · Jacobabad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Wizard Steps Indicator (Only before step 5) */}
        {step < 5 && (
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500">
            <span className={step >= 1 ? 'text-imam-blue' : ''}>1. Personal Info</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-imam-blue' : ''}>2. Program Choice</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-imam-blue' : ''}>3. Academic Marks</span>
            <span>→</span>
            <span className={step >= 4 ? 'text-imam-blue' : ''}>4. Review &amp; Submit</span>
          </div>
        )}

        {/* Wizard Step 1: Personal Details */}
        {step === 1 && (
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <User size={16} className="text-imam-blue" />
              Applicant Personal &amp; Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name (as per Matric Certificate) *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Zubair Ahmed Soomro"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-imam-blue"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Father&apos;s Name *
                </label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="e.g. Bashir Ahmed"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-imam-blue"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  CNIC / B-Form Number *
                </label>
                <input
                  type="text"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  placeholder="43102-XXXXXXX-X"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-imam-blue"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-imam-blue"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Gender &amp; Date of Birth
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-900"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Domicile District
                </label>
                <select
                  value={domicileDistrict}
                  onChange={(e) => setDomicileDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900"
                >
                  <option value="Jacobabad">Jacobabad</option>
                  <option value="Kashmore">Kashmore / Kandhkot</option>
                  <option value="Shikarpur">Shikarpur</option>
                  <option value="Larkana">Larkana</option>
                  <option value="Sukkur">Sukkur</option>
                  <option value="Other">Other Sindh District</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Residential Postal Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Street, Muhalla, City"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-imam-blue"
              />
            </div>
          </div>
        )}

        {/* Wizard Step 2: Program Choice */}
        {step === 2 && (
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <GraduationCap size={16} className="text-imam-blue" />
              Select Desired Academic Program
            </h3>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {programs.map((p) => {
                const isSelected = p.code === programCode;
                return (
                  <div
                    key={p.code}
                    onClick={() => setProgramCode(p.code)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-imam-blue bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-900">
                          {p.name}
                        </span>
                        {p.freeInitiative && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            100% Free Admission
                          </span>
                        )}
                        {p.code === 'BSN' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-imam-blue">
                            PNMC &amp; SMBBMU Degree
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {p.duration} · {p.affiliation}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-imam-blue bg-imam-blue text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Step 3: Academic Marks */}
        {step === 3 && (
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles size={16} className="text-imam-blue" />
              Academic Scores &amp; Auto-Merit Computation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Matric (Science) Marks
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={matricMarks}
                    onChange={(e) => setMatricMarks(Number(e.target.value))}
                    max={1100}
                    min={400}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
                  />
                  <span className="text-xs text-slate-500 font-mono">/ 1100</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Matric Percentage: {matricPct.toFixed(1)}%
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Intermediate (FSc Pre-Medical) Marks
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={fscMarks}
                    onChange={(e) => setFscMarks(Number(e.target.value))}
                    max={1100}
                    min={400}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
                  />
                  <span className="text-xs text-slate-500 font-mono">/ 1100</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  FSc Percentage: {fscPct.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Calculated Composite Merit Score */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-imam-navy to-imam-blue text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">
                  Computed Composite Merit
                </span>
                <div className="text-2xl font-black font-mono mt-0.5">
                  {calculatedMerit}%
                </div>
              </div>
              <div className="text-right text-xs text-blue-100">
                <span>Weightage Applied:</span>
                <div className="font-semibold text-white">40% Matric + 60% FSc</div>
              </div>
            </div>

            {/* Scholarship Category Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Scholarship Category (if applicable)
              </label>
              <select
                value={scholarshipCategory}
                onChange={(e) => setScholarshipCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900"
              >
                <option value="NONE">General Merit Admission</option>
                <option value="FREE_ADMISSION">Paramedical Free Admission Initiative</option>
                <option value="PEEF">Punjab Educational Endowment Fund (PEEF) Sindh</option>
                <option value="NEED_BASED">Institutional Need-Based Financial Assistance</option>
                <option value="TCF_ALUMNI">The Citizens Foundation (TCF) Alumni Pathway</option>
              </select>
            </div>
          </div>
        )}

        {/* Wizard Step 4: Review & Submit */}
        {step === 4 && (
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <FileText size={16} className="text-imam-blue" />
              Review Your Application Details
            </h3>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Applicant:</span>
                <strong className="text-slate-900">{fullName} s/o {fatherName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">CNIC / Phone:</span>
                <span className="font-mono text-slate-800">{cnic} · {phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Applied Program:</span>
                <strong className="text-imam-blue">{selectedProgram.name}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Calculated Merit:</span>
                <strong className="text-emerald-700 font-mono">{calculatedMerit}%</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Scholarship:</span>
                <span className="text-slate-700">{scholarshipCategory}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-relaxed flex items-start gap-2">
              <ShieldCheck size={16} className="shrink-0 text-imam-blue mt-0.5" />
              <span>
                By submitting this form, you confirm the veracity of your academic credentials and consent to appear for the official entry test at Imam Institute Jacobabad campus.
              </span>
            </div>
          </div>
        )}

        {/* Wizard Step 5: Official Printable Admit Slip */}
        {step === 5 && submittedApplication && (
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Admission Application Submitted Successfully!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your entry test admit slip has been officially issued and synced directly with our ERP campus registry.
              </p>
            </div>

            {/* Official Entry Test Admit Slip Box */}
            <div
              id="printable-admit-slip"
              className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-300 relative text-slate-900"
            >
              {/* Slip Watermark Crest */}
              <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
                <ImamCrestLogo size={120} showText={false} />
              </div>

              {/* Slip Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-300">
                <div className="flex items-center gap-3">
                  <ImamCrestLogo size={40} showText={false} />
                  <div>
                    <h4 className="text-xs font-black uppercase text-imam-navy">
                      IMAM INSTITUTE OF NURSING &amp; ALLIED HEALTH SCIENCES
                    </h4>
                    <div className="text-[10px] text-slate-600 font-semibold">
                      Official Entry Test Admit Slip · Fall Session 2026–27
                    </div>
                  </div>
                </div>

                {qrCodeUrl && (
                  <img
                    src={qrCodeUrl}
                    alt="Official Verification QR"
                    className="w-16 h-16 border border-slate-300 rounded-lg p-0.5 bg-white"
                  />
                )}
              </div>

              {/* Slip Content Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Application Roll No</span>
                  <strong className="font-mono text-imam-blue text-sm">
                    {submittedApplication.applicationNo}
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Applicant Name</span>
                  <strong className="text-slate-900">{submittedApplication.fullName}</strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Father&apos;s Name</span>
                  <span className="text-slate-800">{submittedApplication.fatherName}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">CNIC / B-Form</span>
                  <span className="font-mono text-slate-800">{submittedApplication.cnic}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Target Program</span>
                  <strong className="text-slate-900">{submittedApplication.programName}</strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Merit Score</span>
                  <strong className="text-emerald-700 font-mono">
                    {submittedApplication.calculatedMerit}%
                  </strong>
                </div>
              </div>

              {/* Test Venue and Date */}
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Calendar size={13} className="text-imam-red" />
                  <strong>Test Date &amp; Time:</strong> Sunday, 22 November 2026 at 10:00 AM
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <MapPin size={13} className="text-imam-blue" />
                  <strong>Test Center:</strong> Main Campus, Shah Ghazi Muhalla, Jacobabad
                </div>
              </div>
            </div>

            {/* Print & Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-imam-navy hover:bg-imam-blue text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Printer size={15} />
                <span>Print Official Admit Slip</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Wizard Bottom Nav Buttons (Steps 1 to 4) */}
        {step < 5 && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-imam-blue hover:bg-blue-600 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-imam-red hover:bg-[#C2040F] text-white text-xs font-black transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Registering in ERP...' : 'Submit Admission & Generate Slip'}</span>
                <CheckCircle2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
