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
  MapPin,
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsErpDropdownOpen(false);
        setIsProgramsMenuOpen(false);
        setIsAboutMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const programs = INSTITUTIONAL_DATA.programs;
  const degreePrograms = programs.filter((p) => p.category === 'degree');
  const paramedicalPrograms = programs.filter((p) => p.category === 'paramedical');
  const upcomingPrograms = programs.filter((p) => p.category === 'upcoming');

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      {/* Tier 1 Slim Utility Top Bar (36px, #062B54) */}
      <div className="bg-imam-navy text-white text-[11px] font-medium border-b border-white/10 h-9 flex items-center px-3 sm:px-6 lg:px-8 relative z-50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Left utility facts */}
          <div className="flex items-center gap-2 sm:gap-3 text-slate-300 min-w-0 text-[11px]">
            <span className="font-bold text-white flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Est. 2019 · Jacobabad
            </span>
            <span className="text-white/20">•</span>
            <a
              href={`tel:${INSTITUTIONAL_DATA.contact.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 hover:text-white transition font-medium truncate"
            >
              <Phone size={11} className="text-emerald-400 shrink-0" />
              <span>{INSTITUTIONAL_DATA.contact.phone}</span>
            </a>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock size={12} className="text-blue-300" />
              <span>8:00 AM – 4:00 PM</span>
            </span>
            <span className="hidden lg:inline text-white/20">•</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 font-bold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Admissions Open 2026–27</span>
            </span>
          </div>

          {/* Right utility actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
                  aria-label={`Switch language to ${l}`}
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
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-gradient-to-r from-imam-blue to-[#004B87] hover:from-blue-600 hover:to-imam-blue text-white font-extrabold shadow-sm transition border border-white/20 cursor-pointer text-[10px] sm:text-[11px]"
                aria-expanded={isErpDropdownOpen}
                aria-label="Toggle ERP & Portals Gateway Menu"
              >
                <Globe size={11} className="shrink-0" />
                <span>ERP &amp; Portals</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${isErpDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Role-Based ERP Gateway Dropdown Popover */}
              {isErpDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/20"
                    onClick={() => setIsErpDropdownOpen(false)}
                  />
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2 Sticky Main Navbar (h-16 mobile / h-20 desktop) */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-slate-200'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
          {/* Left Brand Lockup */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0">
            <ImamCrestLogo size={42} showText={false} className="shrink-0 w-9 h-9 sm:w-11 sm:h-11" />
            <div className="min-w-0">
              <div className="text-[12px] sm:text-sm font-black tracking-tight text-slate-900 uppercase leading-none group-hover:text-imam-blue transition">
                IMAM INSTITUTE
              </div>
              <div className="text-[9px] sm:text-xs font-extrabold text-imam-blue uppercase tracking-tight mt-0.5 leading-tight truncate">
                OF NURSING &amp; ALLIED HEALTH SCIENCES
              </div>
              <div className="text-[9px] font-medium text-slate-500 hidden md:block">
                Approved by Govt of Sindh · PNMC · SMBBMU Larkana
              </div>
            </div>
          </Link>

          {/* Center Desktop Navigation Links (Visible on lg 1024px and up) */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 font-bold text-[11px] xl:text-xs text-slate-700">
            <Link
              href="/"
              className="px-2.5 xl:px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
            >
              Home
            </Link>

            {/* About Dropdown with seamless hover bridge */}
            <div
              className="relative"
              onMouseEnter={() => setIsAboutMenuOpen(true)}
              onMouseLeave={() => setIsAboutMenuOpen(false)}
            >
              <Link
                href="/about"
                className="flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
              >
                <span>About</span>
                <ChevronDown size={11} className={`transition-transform duration-150 ${isAboutMenuOpen ? 'rotate-180' : ''}`} />
              </Link>

              {isAboutMenuOpen && (
                <div className="absolute left-0 top-full pt-1.5 z-50">
                  <div className="w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 animate-in fade-in duration-150">
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
                </div>
              )}
            </div>

            {/* Programs 3-Column Mega-Menu with hover bridge and viewport centering */}
            <div
              className="relative"
              onMouseEnter={() => setIsProgramsMenuOpen(true)}
              onMouseLeave={() => setIsProgramsMenuOpen(false)}
            >
              <Link
                href="/programs"
                className="flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
              >
                <span>Programs</span>
                <ChevronDown size={11} className={`transition-transform duration-150 ${isProgramsMenuOpen ? 'rotate-180' : ''}`} />
              </Link>

              {isProgramsMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 z-50">
                  <div className="w-[700px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 grid grid-cols-3 gap-6 animate-in fade-in duration-150">
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
                </div>
              )}
            </div>

            <Link
              href="/clinical-training"
              className="px-2.5 xl:px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
            >
              Clinical Hospitals
            </Link>

            <Link
              href="/admissions"
              className="px-2.5 xl:px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
            >
              Admissions
            </Link>

            <Link
              href="/news"
              className="px-2.5 xl:px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
            >
              News &amp; Events
            </Link>

            <Link
              href="/contact"
              className="px-2.5 xl:px-3 py-2 rounded-xl hover:text-imam-blue hover:bg-slate-50 transition"
            >
              Contact
            </Link>

            <Link
              href="/erp"
              className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-imam-blue bg-blue-50/80 hover:bg-imam-blue hover:text-white transition border border-blue-200 font-extrabold shadow-2xs group shrink-0"
              title="Launch Campus ERP Management Suite"
            >
              <Globe size={13} className="text-imam-blue group-hover:text-white transition" />
              <span>ERP Portal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </Link>
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={onOpenCounselor}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold transition cursor-pointer border border-slate-200 shrink-0"
            >
              <Sparkles size={13} className="text-imam-blue" />
              <span>Ask AI</span>
            </button>

            <button
              onClick={() => onOpenApply('BSN')}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-imam-blue to-imam-navy hover:from-blue-600 hover:to-imam-blue text-white text-[11px] sm:text-xs font-extrabold shadow-md shadow-blue-900/20 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-95 shrink-0"
            >
              Apply Online
            </button>

            {/* Mobile Drawer Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition min-w-[38px] min-h-[38px] flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Toggle Navigation Drawer"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Modern Slide-Over Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Blur */}
          <div
            className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-Over Drawer Content */}
          <div
            className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[88%] max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/90 shrink-0">
              <div className="flex items-center gap-2.5">
                <ImamCrestLogo size={34} showText={false} />
                <div>
                  <div className="text-xs font-black uppercase text-slate-900 leading-none">
                    IMAM INSTITUTE
                  </div>
                  <div className="text-[10px] font-bold text-imam-blue mt-0.5">
                    Campus Navigation
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition shadow-2xs border border-slate-200 cursor-pointer"
                aria-label="Close Navigation Drawer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Nav Items */}
            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {/* Quick Campus Pulse */}
              <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Jacobabad Campus</span>
                </div>
                <a
                  href={`tel:${INSTITUTIONAL_DATA.contact.phone.replace(/\s+/g, '')}`}
                  className="text-imam-blue font-extrabold flex items-center gap-1 hover:underline"
                >
                  <Phone size={12} />
                  <span>Call Us</span>
                </a>
              </div>

              {/* Section 1: Main Campus Pages */}
              <div className="space-y-1">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Campus &amp; Academics
                </div>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>Home</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>About Institute &amp; CEO Message</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
                <Link
                  href="/faculty"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>Faculty &amp; Leadership</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
                <Link
                  href="/departments"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>Academic Departments</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
                <Link
                  href="/facilities"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>Campus Facilities &amp; Labs</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
                <Link
                  href="/gallery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>Photo Gallery &amp; Campus Life</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
              </div>

              {/* Section 2: Programs & Clinical */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Programs &amp; Clinical Training
                </div>
                <Link
                  href="/programs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>All Programs (BSN &amp; Diplomas)</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
                <Link
                  href="/clinical-training"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>Clinical Hospitals (JIMS &amp; IMC)</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
              </div>

              {/* Section 3: Admissions & Contacts */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Admissions &amp; Information
                </div>
                <Link
                  href="/admissions/apply"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition border border-emerald-200"
                >
                  <span>Apply Online (2026–27 Form)</span>
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                    Open
                  </span>
                </Link>
                <Link
                  href="/admissions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>Merit &amp; Eligibility Calculator</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
                <Link
                  href="/news"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>News, Circulars &amp; Careers</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>Contact &amp; Campus Map</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </Link>
              </div>

              {/* Section 4: Institutional Portals */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Institutional Portals
                </div>
                <Link
                  href="/student-login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50/90 border border-blue-200"
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap size={15} />
                    <span>Student Portal Login</span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-600">Enter →</span>
                </Link>
                <Link
                  href="/erp-login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={15} />
                    <span>Faculty &amp; Staff ERP Login</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-600">Enter →</span>
                </Link>
                <Link
                  href="/erp"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-imam-blue bg-blue-50 border border-blue-200/80"
                >
                  <span className="flex items-center gap-2">
                    <Globe size={15} />
                    <span>Smart Campus ERP Suite</span>
                  </span>
                  <span className="text-[10px] uppercase font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Live System
                  </span>
                </Link>
              </div>
            </div>

            {/* Quick Actions in Mobile Drawer Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2 shrink-0">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenVerifySlip();
                }}
                className="w-full py-2.5 rounded-xl bg-white text-slate-800 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 shadow-2xs cursor-pointer active:scale-98 transition"
              >
                <FileCheck2 size={15} className="text-yellow-600" />
                <span>Verify Entry Test Admit Slip</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCounselor();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-imam-blue to-imam-navy text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 transition"
              >
                <Sparkles size={15} className="text-yellow-300" />
                <span>Ask Imam AI Admissions Counselor</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
