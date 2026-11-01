'use client';

import React, { useState } from 'react';
import {
  User,
  Shield,
  Smartphone,
  Save,
  Printer,
  Calendar,
  Languages,
  CheckCircle2,
  Clock,
  Award,
  CreditCard,
  Building,
  RefreshCw,
  Bell,
} from 'lucide-react';
import { updateUserProfile } from '@/app/actions/profile';
import { DigitalIDCardPrint } from '@/components/print/DigitalIDCardPrint';

interface ProfileProps {
  currentProfile: {
    id: string;
    userId: string;
    role: string;
    fullName: string;
    email: string;
    phone: string;
    cnic: string;
    designation: string;
    department?: string | null;
    emergencyContact?: string | null;
    address?: string | null;
    bloodGroup?: string | null;
    language: string;
    tableDensity: string;
    notificationsEnabled: boolean;
    pinCode: string;
  };
  sampleStudent?: any;
  onRoleSwitch?: (role: string) => void;
}

export const ProfileView: React.FC<ProfileProps> = ({
  currentProfile,
  sampleStudent,
  onRoleSwitch,
}) => {
  const [profile, setProfile] = useState(currentProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  React.useEffect(() => {
    setProfile(currentProfile);
  }, [currentProfile]);

  React.useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standalone);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updateUserProfile({
        userId: profile.userId,
        fullName: profile.fullName,
        phone: profile.phone,
        cnic: profile.cnic,
        emergencyContact: profile.emergencyContact || undefined,
        address: profile.address || undefined,
        language: profile.language,
        tableDensity: profile.tableDensity,
        notificationsEnabled: profile.notificationsEnabled,
      });
      if (res.success) {
        alert('Profile and preferences updated and saved to SQLite database successfully!');
      }
    } catch (err) {
      alert('Error updating profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <User className="text-imam-blue" /> Unified Profile &amp; Preferences Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Multi-role identity, PNC credentials, digital ID card, and native PWA controls
          </p>
        </div>

        {/* Quick Demo Role Switcher */}
        {onRoleSwitch && (
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <span className="text-[10px] text-slate-400 uppercase px-2">Switch Demo Role:</span>
            {['OWNER', 'PRINCIPAL', 'CASHIER', 'FACULTY', 'STUDENT'].map((r) => (
              <button
                key={r}
                onClick={() => onRoleSwitch(r)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  profile.role === r
                    ? 'bg-imam-blue text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Profile Identity Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-imam-navy text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-slate-100">
              {profile.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">{profile.fullName}</h2>
                <span className="bg-imam-blue/10 text-imam-blue text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  {profile.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{profile.designation}</p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{profile.email}</p>
            </div>
          </div>

          {/* If Student or Faculty, show Digital ID Card trigger */}
          {(profile.role === 'STUDENT' || profile.role === 'FACULTY') && sampleStudent && (
            <button
              onClick={() => setShowIdCardModal(true)}
              data-testid="view-digital-id-card-btn"
              className="bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95"
            >
              <Printer size={15} />
              Print Front/Back QR Digital ID Card
            </button>
          )}
        </div>

        {/* Role-Specific Credentials & Badges */}
        <div className="py-4 border-b border-slate-100">
          {profile.role === 'OWNER' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Institutional Governance:</span>
                <strong className="text-slate-800">Executive Management Board</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Approval Limit Threshold:</span>
                <strong className="text-slate-800 font-mono">&gt; PKR 25,000 (Owner Level)</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Affiliated Hospital:</span>
                <strong className="text-emerald-700">Imam Medical Center (100 Beds)</strong>
              </div>
            </div>
          )}

          {(profile.role === 'PRINCIPAL' || profile.role === 'VICE_PRINCIPAL') && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Academic Head:</span>
                <strong className="text-slate-800">College of Nursing &amp; Allied Health</strong>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-emerald-700 block text-[10px] uppercase font-bold">Regulatory Authority:</span>
                <strong className="text-emerald-900 font-bold">PNC &amp; SMF Authorized Signatory</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Faculty Supervision:</span>
                <strong className="text-slate-800">Active Roster &amp; Logbook Seal</strong>
              </div>
            </div>
          )}

          {profile.role === 'FACULTY' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">PNC License Number:</span>
                <strong className="text-slate-800 font-mono">PNC-RN-66421-S</strong>
              </div>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                <span className="text-rose-600 block text-[10px] uppercase font-bold flex items-center gap-1">
                  <Clock size={11} /> License Expiry Countdown:
                </span>
                <strong className="text-rose-800 font-bold">18 Days Remaining (Renewal Due)</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Preceptor Ward PIN:</span>
                <strong className="text-slate-800 font-mono">PIN: 9988 (Logbook Verified)</strong>
              </div>
            </div>
          )}

          {profile.role === 'ADMIN' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Campus Jurisdiction:</span>
                <strong className="text-slate-800">Operations &amp; Maintenance</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Procurement Authority:</span>
                <strong className="text-slate-800 font-mono">CPV Voucher Preparer</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Registry Status:</span>
                <strong className="text-emerald-700">General Campus Admin</strong>
              </div>
            </div>
          )}

          {profile.role === 'CASHIER' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Cash Desk Vault:</span>
                <strong className="text-emerald-700 font-mono">Main Campus Safe Register</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Challan Biller:</span>
                <strong className="text-slate-800 font-mono">HBL Collection A/C 0042</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Receipt Authority:</span>
                <strong className="text-slate-800">Sequential RCPT-2026</strong>
              </div>
            </div>
          )}

          {profile.role === 'SUPPORT' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Staff Role:</span>
                <strong className="text-slate-800">Peon / Campus Logistics</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Monthly Wage:</span>
                <strong className="text-emerald-700 font-mono">PKR 38,000 + Allowances</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Attendance Record:</span>
                <strong className="text-emerald-700">100% Present</strong>
              </div>
            </div>
          )}

          {profile.role === 'STUDENT' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">CGPA (Semester 4):</span>
                <strong className="text-slate-800 text-sm font-mono">3.84 / 4.00 (Merit Tier 1)</strong>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-emerald-700 block text-[10px] uppercase font-bold">Clinical Attendance %:</span>
                <strong className="text-emerald-900 text-sm font-mono">89.2% (&gt; 85% Mandatory)</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">PNC Registration No:</span>
                <strong className="text-slate-800 font-mono">PNC-REG-88219</strong>
              </div>
            </div>
          )}
        </div>

        {/* Editable Profile Information Form */}
        <form onSubmit={handleSave} className="mt-5 space-y-4 text-xs">
          <h3 className="font-bold text-slate-800 text-sm">Personal &amp; Contact Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Official Name:</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                data-testid="profile-fullname-input"
                className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">CNIC / Form-B:</label>
              <input
                type="text"
                value={profile.cnic}
                onChange={(e) => setProfile({ ...profile, cnic: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-imam-blue"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Phone / WhatsApp Number:</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-imam-blue"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Emergency Hospital Contact:</label>
              <input
                type="text"
                value={profile.emergencyContact || ''}
                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Residential Address (Sindh, Pakistan):</label>
            <input
              type="text"
              value={profile.address || ''}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
            />
          </div>

          {/* Preferences & PWA Experience Controls */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">App Experience &amp; Localization</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Default Interface &amp; Drafting Language:
                </label>
                <select
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                  data-testid="profile-language-select"
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue font-semibold"
                >
                  <option value="en">English (Default)</option>
                  <option value="ur">اردو (Urdu)</option>
                  <option value="sd">سنڌي (Sindhi)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Table Data Density:</label>
                <select
                  value={profile.tableDensity}
                  onChange={(e) => setProfile({ ...profile, tableDensity: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-imam-blue"
                >
                  <option value="comfortable">Comfortable (Mobile-Friendly)</option>
                  <option value="compact">Compact (High Information Density)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-imam-blue" />
                <span className="font-bold text-slate-800">Critical Campus Push Notifications</span>
              </div>
              <input
                type="checkbox"
                checked={profile.notificationsEnabled}
                onChange={(e) => setProfile({ ...profile, notificationsEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-imam-blue"
              />
            </div>
          </div>

          {/* PWA Installation Status Card */}
          <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="text-sky-400" size={24} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">PWA Mobile Native Engine</span>
                  {isStandalone ? (
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Installed as Native App
                    </span>
                  ) : (
                    <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                      Browser Shell Mode
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  ServiceWorker caching static assets, fonts &amp; offline read snapshots
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if ('caches' in window) {
                  caches.delete('imam-erp-v1').then(() => {
                    alert('Offline app-shell cache refreshed successfully!');
                    window.location.reload();
                  });
                }
              }}
              className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <RefreshCw size={13} /> Refresh Cache
            </button>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              data-testid="save-profile-btn"
              className="bg-imam-blue hover:bg-imam-navy text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95"
            >
              <Save size={16} />
              {isSaving ? 'Saving to Database...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Digital ID Card Modal */}
      {showIdCardModal && sampleStudent && (
        <DigitalIDCardPrint
          student={sampleStudent}
          onClose={() => setShowIdCardModal(false)}
        />
      )}
    </div>
  );
};
