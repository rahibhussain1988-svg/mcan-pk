'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Sparkles,
  Award,
  Building2,
  HeartPulse,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Users,
  Compass,
} from 'lucide-react';

interface HeroCinemaSlideshowProps {
  onOpenApply: (programCode?: string) => void;
  onOpenCalculator: () => void;
}

export const HeroCinemaSlideshow: React.FC<HeroCinemaSlideshowProps> = ({
  onOpenApply,
  onOpenCalculator,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const SLIDE_DURATION = 6500; // 6.5s

  const slides = [
    {
      id: 0,
      titlePill: 'Established 2019 · Jacobabad, Sindh',
      headlinePrefix: 'Shaping Compassionate',
      headlineAccent: 'Nurses Since 2019',
      headlineSuffix: 'for Sindh & Beyond',
      description:
        'Shaheed Mohtarma Benazir Bhutto Medical University (SMBBMU) Larkana Affiliated & Pakistan Nursing & Midwifery Council (PNMC) Registered 4-Year BS Nursing (Generic) degree with direct bedside clinical training.',
      ctaPrimary: 'Apply for BS Nursing',
      ctaAction: () => onOpenApply('BSN'),
      ctaSecondary: 'Check Merit Eligibility',
      ctaSecondaryAction: onOpenCalculator,
      badgeText: 'PNMC & SMBBMU Accredited Degree',
      themeColor: '#0062B1',
      bgGradient: 'from-[#031B38] via-[#062B54] to-[#0A3D73]',
      floatingCard: {
        badge: 'Flagship Degree Track',
        title: 'BS Nursing (Generic)',
        stat: '4 Years · 8 Semesters',
        metric: 'PNMC Registered',
        detail: 'Direct House Job Pathway at GMMMC Sukkur Teaching Hospital',
        icon: GraduationCap,
      },
    },
    {
      id: 1,
      titlePill: 'Free Admissions Initiative 2026–27',
      headlinePrefix: '9 Career-Ready',
      headlineAccent: 'Paramedical Diplomas',
      headlineSuffix: 'Admissions Open 100% Free',
      description:
        'Imam Paramedical Institute offers 1-Year SMF Karachi & STEVTA-certified diplomas in X-Ray, ECG, ICU, Physiotherapy, Pediatric Care, Dental, Anaesthesia, Ophthalmic & Blood Transfusion techniques.',
      ctaPrimary: 'Explore 9 Diplomas',
      ctaAction: () => onOpenApply('XRAY'),
      ctaSecondary: 'View Free Initiative',
      ctaSecondaryAction: () => onOpenApply('ECG'),
      badgeText: 'Sindh Medical Faculty (SMF) Certified',
      themeColor: '#E30613',
      bgGradient: 'from-[#2A060A] via-[#480E14] to-[#062B54]',
      floatingCard: {
        badge: 'Zero Tuition Barrier',
        title: '9 Paramedical Tracks',
        stat: '100% Free Admissions',
        metric: '1-Year Certification',
        detail: 'Hands-on clinical internships at JIMS (133-Bed) & Imam Medical Center',
        icon: Award,
      },
    },
    {
      id: 2,
      titlePill: 'Supervised Clinical Bedside Rotations',
      headlinePrefix: 'Learn Where Real',
      headlineAccent: 'Patient Care Happens',
      headlineSuffix: 'Across 4 Hospital Centers',
      description:
        'Rotate daily through Imam Medical Center, 133-bed Jacobabad Institute of Medical Sciences (JIMS), Civil Hospital Jacobabad, and advance to postgraduate House Job at GMMMC Sukkur.',
      ctaPrimary: 'Discover Clinical Rotations',
      ctaAction: () => {
        const el = document.getElementById('clinical-training');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      ctaSecondary: 'Clinical Triage Preview',
      ctaSecondaryAction: () => {
        const el = document.getElementById('triage-simulator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      badgeText: '133-Bed JIMS Clinical Partner',
      themeColor: '#008060',
      bgGradient: 'from-[#03231B] via-[#05382B] to-[#062B54]',
      floatingCard: {
        badge: 'Clinical Affiliation Network',
        title: '4 Major Hospitals',
        stat: '133+ Clinical Beds',
        metric: 'Bedside Logbooks',
        detail: 'Imam Medical Center, JIMS, Civil Hospital & GMMMC Sukkur',
        icon: Building2,
      },
    },
    {
      id: 3,
      titlePill: 'Skills Simulation & State-of-the-Art Facilities',
      headlinePrefix: 'Modern Anatomy Labs &',
      headlineAccent: 'FON Simulation Museum',
      headlineSuffix: 'Clinical Drills',
      description:
        'Train on advanced human anatomical mannequins, digital physiology instruments, modern computer lab workstations, and engage in high-impact national nursing seminars.',
      ctaPrimary: 'Tour Campus Facilities',
      ctaAction: () => {
        const el = document.getElementById('campus-facilities');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      ctaSecondary: 'Watch Seminar Highlights',
      ctaSecondaryAction: () => {
        const el = document.getElementById('campus-facilities');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      badgeText: 'Hands-On Clinical Simulation',
      themeColor: '#0062B1',
      bgGradient: 'from-[#062B54] via-[#0A417D] to-[#0C4E96]',
      floatingCard: {
        badge: 'World-Class Skills Training',
        title: 'FON Museum & Labs',
        stat: '6 Specialized Labs',
        metric: 'High-Fidelity Models',
        detail: 'Digital Classrooms, Science Lab, Central Library & 2nd Nursing Seminar',
        icon: Stethoscope,
      },
    },
    {
      id: 4,
      titlePill: 'Smart Campus Management & AI Tools',
      headlinePrefix: 'Next-Gen Student ERP &',
      headlineAccent: 'Live AI Counselor',
      headlineSuffix: '24/7 Digital Campus',
      description:
        'Instant online admission with auto QR admit slip generation, real-time merit & PEEF scholarship calculators, and one-click role-based portal access for students, preceptors, and management.',
      ctaPrimary: 'Apply Online Now',
      ctaAction: () => onOpenApply('BSN'),
      ctaSecondary: 'Launch Student ERP',
      ctaSecondaryAction: () => {
        window.location.href = '/erp?role=student';
      },
      badgeText: 'Live SQLite Database & PWA',
      themeColor: '#062B54',
      bgGradient: 'from-[#08182B] via-[#062B54] to-[#123E6E]',
      floatingCard: {
        badge: 'Live ERP Integration',
        title: 'Smart Student Portal',
        stat: 'Instant QR Admit Slip',
        metric: '500+ Active Students',
        detail: 'Biometric Attendance, 3-Copy Bank Challans & Bedside Triage App',
        icon: Sparkles,
      },
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  // Mouse tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (diff < -50) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
    touchStartX.current = null;
  };

  const current = slides[currentSlide];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className="relative min-h-[86vh] lg:min-h-[90vh] bg-slate-950 text-white overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Cinematic Gradient Stage with Parallax Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute inset-0 bg-gradient-to-br ${current.bgGradient} transition-colors duration-1000`}
        >
          {/* Subtle Dynamic Geometric / Blueprint Medical Grid */}
          <div
            className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
            style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}
          />

          {/* Animated Heartbeat ECG Wave Line across the stage */}
          <svg
            className="absolute bottom-24 left-0 w-full h-32 opacity-25 pointer-events-none"
            viewBox="0 0 1200 120"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 L200,60 L240,60 L255,20 L270,105 L285,45 L300,75 L315,60 L500,60 L540,60 L555,15 L570,110 L585,40 L600,75 L615,60 L800,60 L840,60 L855,20 L870,105 L885,45 L900,75 L915,60 L1200,60"
              stroke="#00E5FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-ecg"
            />
          </svg>

          {/* Ambient Lighting Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-imam-blue/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-imam-red/15 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Main Slide Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
          {/* Left Column: Kinetic Typography & Call-To-Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge with Live Pulse */}
            <motion.div
              key={`badge-${current.id}`}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{current.titlePill}</span>
            </motion.div>

            {/* Staggered Kinetic Headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`headline-${current.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-1"
              >
                <div className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-slate-300">
                  {current.headlinePrefix}
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-red-300">
                    {current.headlineAccent}
                  </span>{' '}
                  <span className="block text-2xl sm:text-4xl lg:text-5xl font-extrabold text-blue-100/90 mt-1">
                    {current.headlineSuffix}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Description Text */}
            <motion.p
              key={`desc-${current.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm sm:text-base text-slate-200/90 max-w-2xl leading-relaxed font-normal"
            >
              {current.description}
            </motion.p>

            {/* Dual CTAs with Magnetic Styling */}
            <motion.div
              key={`cta-${current.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <button
                onClick={current.ctaAction}
                className="px-6 py-3.5 rounded-xl bg-imam-red hover:bg-[#C2040F] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-red-900/40 hover:shadow-red-900/60 transition-all duration-200 flex items-center gap-2 group cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span>{current.ctaPrimary}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={current.ctaSecondaryAction}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base backdrop-blur-md transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span>{current.ctaSecondary}</span>
              </button>
            </motion.div>

            {/* Accreditation trust footer */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>{current.badgeText}</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1.5 font-semibold">
                <Building2 size={14} className="text-blue-300" />
                <span>Jacobabad Campus</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Mouse-Tilt Glassmorphic Status Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              key={`card-${current.id}`}
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              style={{
                transform: `perspective(1000px) rotateX(${-mousePos.y * 14}deg) rotateY(${mousePos.x * 14}deg)`,
              }}
              className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden transition-transform duration-200 group"
            >
              {/* Corner Glow Accent */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 bg-white/15 px-3 py-1 rounded-full border border-white/20">
                  {current.floatingCard.badge}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shadow-inner">
                  {React.createElement(current.floatingCard.icon, { size: 20 })}
                </div>
              </div>

              <div className="space-y-1 mb-5">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {current.floatingCard.title}
                </div>
                <div className="text-sm font-bold text-blue-300 font-mono">
                  {current.floatingCard.stat}
                </div>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-4 border border-white/10 mb-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Recognition Status:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={13} /> {current.floatingCard.metric}
                  </span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-white/10">
                  {current.floatingCard.detail}
                </div>
              </div>

              {/* Fast Apply / Verification Action inside Card */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <button
                  onClick={current.ctaAction}
                  className="text-white hover:text-blue-300 font-extrabold flex items-center gap-1.5 transition group-hover:translate-x-1"
                >
                  <span>Quick Registration</span>
                  <ChevronRight size={14} />
                </button>
                <span className="text-[10px] text-slate-400 font-mono">
                  Fall Batch 2026–27
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Segmented Progress Dock (5 Clickable Slide Pills with Animated Fill Timers) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/15 p-2 sm:p-3 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`text-left p-2.5 rounded-xl transition-all relative overflow-hidden group cursor-pointer ${
                    isActive
                      ? 'bg-white/15 border border-white/30 shadow-md'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {/* Real-time fill bar timer on active slide */}
                  {isActive && (
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: isPaused ? '100%' : '100%' }}
                      transition={{
                        duration: isPaused ? 0 : SLIDE_DURATION / 1000,
                        ease: 'linear',
                      }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-imam-blue to-imam-red rounded-full"
                    />
                  )}

                  <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>
                      0{index + 1}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </div>
                  <div
                    className={`text-xs font-bold truncate ${
                      isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {slide.headlineAccent}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate hidden sm:block">
                    {slide.titlePill}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Manual Slide Navigation Arrows */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-2">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:scale-105"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:scale-105"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
