'use client';

import React, { createContext, useContext, useState } from 'react';
import { TwoTierHeader } from '@/components/public/TwoTierHeader';
import { PublicFooter } from '@/components/public/PublicFooter';
import { OnlineAdmissionModal } from '@/components/public/OnlineAdmissionModal';
import { VerifyAdmitSlipModal } from '@/components/public/VerifyAdmitSlipModal';
import { TrilingualCounselorModal } from '@/components/public/TrilingualCounselorModal';
import { JobApplicationDrawer } from '@/components/public/JobApplicationDrawer';
import { WaitlistModal } from '@/components/public/WaitlistModal';

interface PublicWebsiteContextType {
  openApply: (programCode?: string) => void;
  openVerifySlip: () => void;
  openCounselor: () => void;
  openJobDrawer: (pos?: string) => void;
  openWaitlist: (programCode?: string) => void;
}

const PublicWebsiteContext = createContext<PublicWebsiteContextType | undefined>(undefined);

export const usePublicWebsite = () => {
  const context = useContext(PublicWebsiteContext);
  if (!context) {
    throw new Error('usePublicWebsite must be used within a PublicWebsiteProvider');
  }
  return context;
};

export const PublicWebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [applyProgramCode, setApplyProgramCode] = useState('BSN');

  const [isVerifySlipOpen, setIsVerifySlipOpen] = useState(false);
  const [isCounselorOpen, setIsCounselorOpen] = useState(false);

  const [isJobDrawerOpen, setIsJobDrawerOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState('Principal (MSN)');

  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistProgramCode, setWaitlistProgramCode] = useState('CMW');

  const openApply = (programCode: string = 'BSN') => {
    setApplyProgramCode(programCode);
    setIsApplyOpen(true);
  };

  const openVerifySlip = () => setIsVerifySlipOpen(true);
  const openCounselor = () => setIsCounselorOpen(true);

  const openJobDrawer = (pos: string = 'Principal (MSN)') => {
    setJobPosition(pos);
    setIsJobDrawerOpen(true);
  };

  const openWaitlist = (programCode: string = 'CMW') => {
    setWaitlistProgramCode(programCode);
    setIsWaitlistOpen(true);
  };

  return (
    <PublicWebsiteContext.Provider
      value={{
        openApply,
        openVerifySlip,
        openCounselor,
        openJobDrawer,
        openWaitlist,
      }}
    >
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-imam-blue selection:text-white">
        <TwoTierHeader
          onOpenApply={openApply}
          onOpenVerifySlip={openVerifySlip}
          onOpenCounselor={openCounselor}
          onOpenJobDrawer={openJobDrawer}
          onOpenWaitlist={openWaitlist}
        />

        <main className="flex-1">{children}</main>

        <PublicFooter />

        {/* Global Modals */}
        <OnlineAdmissionModal
          isOpen={isApplyOpen}
          onClose={() => setIsApplyOpen(false)}
          defaultProgramCode={applyProgramCode}
        />

        <VerifyAdmitSlipModal
          isOpen={isVerifySlipOpen}
          onClose={() => setIsVerifySlipOpen(false)}
        />

        <TrilingualCounselorModal
          isOpen={isCounselorOpen}
          onClose={() => setIsCounselorOpen(false)}
          onOpenApply={openApply}
        />

        <JobApplicationDrawer
          isOpen={isJobDrawerOpen}
          onClose={() => setIsJobDrawerOpen(false)}
          defaultPosition={jobPosition}
        />

        <WaitlistModal
          isOpen={isWaitlistOpen}
          onClose={() => setIsWaitlistOpen(false)}
          defaultProgramCode={waitlistProgramCode}
        />
      </div>
    </PublicWebsiteContext.Provider>
  );
};
