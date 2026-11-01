'use client';

import React from 'react';
import { PublicWebsiteProvider } from '@/components/public/PublicWebsiteContext';

export const PublicWebsiteShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <PublicWebsiteProvider>{children}</PublicWebsiteProvider>;
};
