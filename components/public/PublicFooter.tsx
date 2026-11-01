'use client';

import React from 'react';
import Link from 'next/link';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  Globe,
  ArrowRight,
  Heart,
} from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: INSTITUTIONAL_DATA.fullLegalName,
    alternateName: 'Imam Institute Jacobabad',
    url: 'https://www.imcan.pk',
    logo: 'https://www.imcan.pk/icons/icon.svg',
    telephone: INSTITUTIONAL_DATA.contact.phone,
    email: INSTITUTIONAL_DATA.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: INSTITUTIONAL_DATA.address.street,
      addressLocality: INSTITUTIONAL_DATA.address.city,
      addressRegion: INSTITUTIONAL_DATA.address.province,
      postalCode: INSTITUTIONAL_DATA.address.postalCode,
      addressCountry: 'PK',
    },
    foundingDate: '2019',
    alumni: '500+ Qualified Healthcare Graduates',
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800 relative">
      {/* JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Institutional Identity */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <ImamCrestLogo size={48} showText={false} />
              <div>
                <div className="text-sm font-black tracking-tight text-white uppercase">
                  IMAM INSTITUTE
                </div>
                <div className="text-[11px] font-extrabold text-blue-400 uppercase tracking-tight">
                  OF NURSING &amp; ALLIED HEALTH SCIENCES
                </div>
                <div className="text-[10px] text-slate-400">
                  And Paramedical · Established 2019
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Envisioning skilled healthcare human resource in nursing and allied health, preparing competent, caring clinicians for community and hospital service across Sindh.
            </p>

            {/* CEO Quote Pill */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
              <p className="text-[11px] text-slate-300 italic leading-relaxed">
                &ldquo;{INSTITUTIONAL_DATA.leadership.ceo.quote}&rdquo;
              </p>
              <div className="text-[10px] font-bold text-blue-400 mt-1">
                — {INSTITUTIONAL_DATA.leadership.ceo.name} (CEO)
              </div>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Academic Programs
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>
                <Link href="/programs#bsn" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-imam-blue">›</span>
                  <strong className="text-slate-200">BS Nursing (Generic)</strong> — 4 Years
                </Link>
              </li>
              <li>
                <Link href="/programs#xray" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-imam-red">›</span>
                  <span>X-Ray Technician (1-Year Diploma)</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#icu" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-imam-red">›</span>
                  <span>ICU Technician (1-Year Diploma)</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#ecg" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-imam-red">›</span>
                  <span>ECG Technician (1-Year Diploma)</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#paramedical" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-imam-red">›</span>
                  <span>Physiotherapy, Dental &amp; PEADS</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#upcoming" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-blue-400">›</span>
                  <span className="text-blue-300 font-semibold">CMW, LHV &amp; CNA Waitlist</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Affiliations */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Clinical Training
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>
                <Link href="/clinical-training" className="hover:text-white transition">
                  Imam Medical Center
                </Link>
              </li>
              <li>
                <Link href="/clinical-training" className="hover:text-white transition">
                  JIMS (133-Bed Hospital)
                </Link>
              </li>
              <li>
                <Link href="/clinical-training" className="hover:text-white transition">
                  Civil Hospital Jacobabad
                </Link>
              </li>
              <li>
                <Link href="/clinical-training" className="hover:text-white transition">
                  GMMMC Sukkur (House Job)
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-white transition"
                >
                  <Globe size={12} />
                  <span>Launch ERP Suite →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Campus Info */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Jacobabad Campus
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-imam-red shrink-0 mt-0.5" />
                <span>{INSTITUTIONAL_DATA.address.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400 shrink-0" />
                <a href={`tel:${INSTITUTIONAL_DATA.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {INSTITUTIONAL_DATA.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-400 shrink-0" />
                <a href={`mailto:${INSTITUTIONAL_DATA.contact.email}`} className="hover:text-white">
                  {INSTITUTIONAL_DATA.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-amber-400 shrink-0" />
                <span>{INSTITUTIONAL_DATA.contact.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accreditation & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Imam Institute of Nursing &amp; Allied Health Sciences. Approved by Govt of Sindh · Registered with PNMC · Affiliated with SMBBMU Larkana &amp; SMF Karachi.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admissions" className="hover:text-slate-400">
              Admissions Policy
            </Link>
            <span>•</span>
            <Link href="/news-careers" className="hover:text-slate-400">
              Careers (MSN Principal)
            </Link>
            <span>•</span>
            <Link href="/login" className="hover:text-slate-400 font-bold text-slate-300">
              Staff &amp; Student Portals
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
