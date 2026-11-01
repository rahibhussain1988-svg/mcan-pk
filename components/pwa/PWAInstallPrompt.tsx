'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Share2, PlusSquare, Smartphone, CheckCircle2 } from 'lucide-react';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(isStandaloneMode);
      return isStandaloneMode;
    };

    if (checkStandalone()) {
      return;
    }

    // Check localStorage snooze
    const snoozedUntil = localStorage.getItem('imam_pwa_snooze_until');
    if (snoozedUntil && new Date().getTime() < parseInt(snoozedUntil, 10)) {
      return;
    }
    setIsDismissed(false);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Handler for Android / Chrome / Edge
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait 3 seconds on mobile before sliding up prompt
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // For iOS Safari or if mobile browser after 3 seconds
    if (isIosDevice) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3500);
    } else {
      // In case beforeinstallprompt already fired or mobile fallback
      const timer = setTimeout(() => {
        const isMobileScreen = window.innerWidth <= 768;
        if (isMobileScreen && !checkStandalone()) {
          setShowPrompt(true);
        }
      }, 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setShowPrompt(false);
        setIsStandalone(true);
      }
      setDeferredPrompt(null);
    } else {
      // Direct instructions
      alert('To install, tap your browser menu (⋮ or Share) and select "Add to Home Screen" or "Install App".');
    }
  };

  const handleSnooze = () => {
    // Snooze for 24 hours
    const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem('imam_pwa_snooze_until', tomorrow.toString());
    setShowPrompt(false);
  };

  if (isStandalone || !showPrompt || isDismissed) {
    return null;
  }

  return (
    <div
      data-testid="pwa-install-banner"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 flex justify-center pointer-events-none animate-in slide-in-from-bottom duration-300"
    >
      <div className="w-full max-w-md bg-white border border-slate-200/80 shadow-2xl rounded-2xl p-4 sm:p-5 pointer-events-auto backdrop-blur-md bg-white/95">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-imam-navy/5 rounded-xl border border-imam-navy/10">
              <ImamCrestLogo size={46} showText={false} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm">Install Imam ERP App</span>
                <span className="bg-imam-blue/10 text-imam-blue text-[10px] font-bold px-1.5 py-0.5 rounded">
                  PWA Native
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                Fast bedside triage, cashier receipts &amp; offline ledger
              </p>
            </div>
          </div>
          <button
            onClick={handleSnooze}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
            aria-label="Dismiss banner"
          >
            <X size={18} />
          </button>
        </div>

        {isIOS ? (
          <div className="mt-3.5 bg-slate-50 rounded-xl p-3 border border-slate-200/60 text-xs text-slate-700 space-y-1.5">
            <div className="font-semibold text-imam-navy flex items-center gap-1.5">
              <Smartphone size={14} /> iOS Safari 2-Step Install:
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="bg-slate-200 text-slate-800 font-bold px-1.5 py-0.5 rounded text-[10px]">1</span>
              <span>Tap the <Share2 className="inline text-imam-blue mx-0.5" size={13} /> Share button in Safari toolbar.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="bg-slate-200 text-slate-800 font-bold px-1.5 py-0.5 rounded text-[10px]">2</span>
              <span>Scroll down and select <PlusSquare className="inline text-imam-navy mx-0.5" size={13} /> <strong>Add to Home Screen</strong>.</span>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              data-testid="pwa-install-btn"
              className="flex-1 bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
            >
              <Download size={15} />
              Install Imam ERP App
            </button>
            <button
              onClick={handleSnooze}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 py-2.5 px-3 rounded-xl hover:bg-slate-100 transition"
            >
              Remind Later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
