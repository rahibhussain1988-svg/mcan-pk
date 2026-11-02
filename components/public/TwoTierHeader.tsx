'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  Phone,
  Clock,
  Sparkles,
  ChevronDown,
  Globe,
  FileCheck2,
  GraduationCap,
  Award,
  Stethoscope,
  HeartPulse,
  Receipt,
  Crown,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Building2,
  ExternalLink,
  BookOpen,
  Calendar,
  Briefcase,
  Users,
} from 'lucide-react';

interface TwoTierHeaderProps {
  onOpenApply: (programCode?: string) => void;
  onOpenVerifySlip: () => void;
  onOpenCounselor: () => void;
  onOpenJobDrawer?: () => void;
  onOpenWaitlist?: (programCode?: string) => void;
}

export const TwoTierHeader: React.FC<TwoTierHeaderProps> = ({
  onOpenApply,
  onOpenVerifySlip,
  onOpenCounselor,
  onOpenJobDrawer,
  onOpenWaitlist,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isErpDropdownOpen, setIsErpDropdownOpen] = useState(false);
  const [isProgramsMenuOpen, setIsProgramsMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'EN' | 'UR' | 'SD'>('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const programs = INSTITUTIONAL_DATA.programs;
  const degreePrograms = programs.filter((p) => p.category === 'degree');
  const paramedicalPrograms = programs.filter((p) => p.category === 'paramedical');
  const upcomingPrograms = programs.filter((p) => p.category === 'upcoming');

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      {/* Tier 1 Slim Utility Top Bar (36px, #062B54) */}
      <div className="bg-imam-navy text-white text-[11px] font-medium border-b border-white/10 h-9 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between whitespace-nowrap overflow-x-auto no-scrollbar">
          {/* Left utility facts */}
          <div className="flex items-center gap-3 sm:gap-4 text-slate-300">
            <span className="font-bold text-white">
              Est. 2019 · Jacobabad
            </span>
            <span className="text-white/20">•</span>
            <a
              href={`tel:${INSTITUTIONAL_DATA.contact.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <Phone size={12} className="text-emerald-400" />
              <span>{INSTITUTIONAL_DATA.contact.phone}</span>
            </a>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock size={12} className="text-blue-300" />
              <span>8:00 AM – 4:00 PM</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 font-bold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Admissions Open 2026–27</span>
            </span>
          </div>

          {/* Right utility actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/10 rounded-md p-0.5 text-[10px] font-bold">
              {(['EN', 'UR', 'SD'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setActiveLang(l);
                    if (l !== 'EN') onOpenCounselor();
                  }}
                  className={`px-1.5 py-0.5 rounded transition ${
                    activeLang === l
                      ? 'bg-imam-blue text-white shadow-2xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {l === 'UR' ? 'اردو' : l === 'SD' ? 'سنڌي' : 'EN'}
                </button>
              ))}
            </div>

            {/* Verify Admit Slip Modal Trigger */}
            <button
              onClick={onOpenVerifySlip}
              className="hidden sm:flex items-center gap-1.5 text-blue-200 hover:text-white font-bold transition px-2 py-1 rounded hover:bg-white/10 cursor-pointer"
            >
              <FileCheck2 size={13} className="text-yellow-400" />
              <span>Verify Admit Slip</span>
            </button>

            {/* High-Visibility ERP & Portals Quick-Launch Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsErpDropdownOpen(!isErpDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-imam-blue to-[#004B87] hover:from-blue-600 hover:to-imam-blue text-white font-extrabold shadow-sm transition border border-white/20 cursor-pointer"
              >
                <Globe size={12} />
                <span>ERP &amp; Portals</span>
                <ChevronDown size={11} className={`transition-transform ${isErpDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Role-Based ERP Gateway Dropdown Popover */}
              {isErpDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setIsErpDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-imam-blue block">
                        Live Management System
                      </span>
                      <h4 className="text-xs font-black text-slate-900">
                        Institutional Portal Gateways
                      </h4>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Same App
                    </span>
                  </div>

                  <div className="py-2 space-y-1">
                    <Link
                      href="/erp?role=student&tab=student"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 transition group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <GraduationCap size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-imam-blue">
                          Student Self-Service Portal
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          Attendance, Fee Challans &amp; Clinical DMC
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/erp?role=faculty&tab=support"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 transition group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Stethoscope size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                          Faculty &amp; Preceptor Desk
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          Ward Rosters &amp; Bedside Logbook Sign-offs
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/erp?role=triage&tab=triage"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 transition group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                        <HeartPulse size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-rose-700">
                          Imam Medical Center Triage
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          NEWS2 &amp; ESI Bedside Patient Sorting
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/erp?role=accounts&tab=fees"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 transition group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Receipt size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                          Cashier &amp; Fee Collection Desk
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          3-Copy Challans &amp; Thermal Receipts
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/erp?role=owner&tab=owner"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 transition group text-left border-t border-slate-100 mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                        <Crown size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                          Owner &amp; Executive Command
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          CEO Dr. Abid Hussain Soomro &amp; Chairman
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2 Sticky Main Navbar (h-20 desktop / h-16 mobile) */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-slate-200'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left Brand Lockup */}
          <Link href="/" className="flex items-center gap-3 group">
            <ImamCrestLogo size={48} showText={false} />
            <div>
              <div className="text-xs sm:text-sm font-black tracking-tight text-slate-900 uppercase leading-none group-hover:text-imam-blue transition">
                IMAM INSTITUTE
              </div>
              <div className="text-[10px] sm:text-xs font-extrabold text-imam-blue uppercase tracking-tight mt-0.5 leading-tight">
                OF NURSING &amp; ALLIED HEALTH SCIENCES
              </div>
              <div className="text-[9px] font-medium text-slate-500 hidden sm:block">
                Approved by Govt of Sindh · PNMC · SMBBMU Larkana
              </div>
            </div>
          </Link>

          {/* Center Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 font-bold text-xs text-slate-700">
            <Link
              href="/"
              className="px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsAboutMenuOpen(true)}
              onMouseLeave={() => setIsAboutMenuOpen(false)}
            >
              <Link
                href="/about"
                className="flex items-center gap-1 px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
              >
                <span>About</span>
                <ChevronDown size={12} />
              </Link>

              {isAboutMenuOpen && (
                <div className="absolute left-0 top-full w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150">
                  <Link
                    href="/about#story"
                    className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-imam-blue"
                  >
                    Our Story (Since 2019)
                  </Link>
                  <Link
                    href="/about#ceo-message"
                    className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-imam-blue"
                  >
                    Dr. Abid Hussain Soomro (CEO Message)
                  </Link>
                  <Link
                    href="/faculty"
                    className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-imam-blue"
                  >
                    Faculty &amp; Leadership
                  </Link>
                  <Link
                    href="/departments"
                    className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-imam-blue"
                  >
                    Academic Departments
                  </Link>
                  <Link
                    href="/facilities"
                    className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-imam-blue"
                  >
                    Infrastructure &amp; Campus Facilities
                  </Link>
                  <Link
                    href="/gallery"
                    className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-imam-blue"
                  >
                    Photo Gallery &amp; Campus Life
                  </Link>
                  <Link
                    href="/about#accreditations"
                    className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-imam-blue"
                  >
                    6 Statutory Accreditations
                  </Link>
                  <Link
                    href="/about#board"
                    className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-imam-blue"
                  >
                    Executive Board of Management
                  </Link>
                </div>
              )}
            </div>

            {/* Programs 3-Column Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsProgramsMenuOpen(true)}
              onMouseLeave={() => setIsProgramsMenuOpen(false)}
            >
              <Link
                href="/programs"
                className="flex items-center gap-1 px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
              >
                <span>Programs</span>
                <ChevronDown size={12} />
              </Link>

              {isProgramsMenuOpen && (
                <div className="absolute -left-32 top-full w-[720px] bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-50 grid grid-cols-3 gap-6 animate-in fade-in duration-150">
                  {/* Col 1: Flagship Degree */}
                  <div className="space-y-3 border-r border-slate-100 pr-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase text-imam-blue">
                      <GraduationCap size={15} /> Flagship Degree
                    </div>
                    {degreePrograms.map((p) => (
                      <div
                        key={p.code}
                        onClick={() => {
                          setIsProgramsMenuOpen(false);
                          onOpenApply(p.code);
                        }}
                        className="p-3 rounded-2xl bg-blue-50/60 hover:bg-blue-50 border border-blue-100 transition cursor-pointer"
                      >
                        <h4 className="text-xs font-extrabold text-slate-900">{p.name}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{p.duration}</p>
                        <span className="mt-2 inline-block text-[10px] font-bold text-imam-blue">
                          PNMC &amp; SMBBMU Larkana →
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Col 2: 9 Free Paramedical Diplomas */}
                  <div className="space-y-2 border-r border-slate-100 pr-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase text-imam-red">
                      <Award size={15} /> 9 Paramedical Diplomas
                    </div>
                    <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                      100% Free Admissions Initiative
                    </div>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                      {paramedicalPrograms.map((p) => (
                        <div
                          key={p.code}
                          onClick={() => {
                            setIsProgramsMenuOpen(false);
                            onOpenApply(p.code);
                          }}
                          className="px-2 py-1.5 rounded-lg hover:bg-slate-100 text-[11px] font-bold text-slate-700 hover:text-imam-blue cursor-pointer flex items-center justify-between"
                        >
                          <span>{p.name}</span>
                          <span className="text-[9px] text-slate-400">1 Yr</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Col 3: Upcoming Pathways */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-800">
                      <Clock size={15} /> Upcoming Pathways
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Department of Nursing expansion. Register for priority alerts.
                    </p>
                    <div className="space-y-1.5 pt-1">
                      {upcomingPrograms.map((p) => (
                        <div
                          key={p.code}
                          onClick={() => {
                            setIsProgramsMenuOpen(false);
                            if (onOpenWaitlist) onOpenWaitlist(p.code);
                          }}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 cursor-pointer"
                        >
                          <div className="text-[11px] font-bold text-slate-800">{p.name}</div>
                          <span className="text-[9px] font-bold text-blue-600">
                            Join Waitlist →
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/clinical-training"
              className="px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
            >
              Clinical Hospitals
            </Link>

            <Link
              href="/admissions"
              className="px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
            >
              Admissions
            </Link>

            <Link
              href="/news"
              className="px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
            >
              News &amp; Events
            </Link>

            <Link
              href="/contact"
              className="px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
            >
              Contact
            </Link>

            <Link
              href="/erp"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-imam-blue bg-blue-50/80 hover:bg-imam-blue hover:text-white transition border border-blue-200 font-extrabold shadow-2xs group"
              title="Launch Campus ERP Management Suite"
            >
              <Globe size={13} className="text-imam-blue group-hover:text-white transition" />
              <span>ERP Portal</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </Link>
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenCounselor}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold transition cursor-pointer border border-slate-200"
            >
              <Sparkles size={14} className="text-imam-blue" />
              <span>Ask AI</span>
            </button>

            <button
              onClick={() => onOpenApply('BSN')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-imam-blue to-imam-navy hover:from-blue-600 hover:to-imam-blue text-white text-xs font-extrabold shadow-md shadow-blue-900/20 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
            >
              Apply Online
            </button>

            {/* Mobile Drawer Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
              aria-label="Toggle Navigation Drawer"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 top-[100px] z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-start"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl space-y-4 border-b border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                About Institute &amp; CEO Message
              </Link>
              <Link
                href="/faculty"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                Faculty &amp; Leadership
              </Link>
              <Link
                href="/departments"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                Academic Departments
              </Link>
              <Link
                href="/facilities"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                Campus Facilities &amp; Labs
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                Photo Gallery &amp; Campus Life
              </Link>
              <Link
                href="/programs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                All Programs (BSN &amp; Paramedical)
              </Link>
              <Link
                href="/clinical-training"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                Clinical Training Hospitals (JIMS &amp; IMC)
              </Link>
              <Link
                href="/admissions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                Merit Calculator &amp; Admissions
              </Link>
              <Link
                href="/admissions/apply"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100"
              >
                Apply Online (Admission Form)
              </Link>
              <Link
                href="/news"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                News, Circulars &amp; Careers
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                Contact &amp; Jacobabad Campus
              </Link>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <Link
                  href="/student-login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-blue-700 bg-blue-50/90 border border-blue-200"
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap size={16} />
                    <span>Student Portal Login</span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-600">Enter →</span>
                </Link>
                <Link
                  href="/erp-login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={16} />
                    <span>Faculty &amp; Staff ERP Login</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-600">Enter →</span>
                </Link>
                <Link
                  href="/erp"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-imam-blue bg-blue-50 border border-blue-200/80"
                >
                  <span className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>Smart Campus ERP &amp; Portals</span>
                  </span>
                  <span className="text-[10px] uppercase font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Live System
                  </span>
                </Link>
              </div>
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenVerifySlip();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-2"
              >
                <FileCheck2 size={16} className="text-yellow-600" />
                <span>Verify Entry Test Admit Slip</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCounselor();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Sparkles size={16} className="text-imam-blue" />
                <span>Ask Imam AI Admissions Counselor</span>
              </button>

              <Link
                href="/login"
                className="w-full py-2.5 rounded-xl bg-imam-navy text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <Globe size={16} />
                <span>Launch ERP &amp; Student Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
