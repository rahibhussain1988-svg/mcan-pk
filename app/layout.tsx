import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PWARegister } from '@/components/pwa/PWARegister';

export const metadata: Metadata = {
  title: 'Imam Institute Smart ERP & Clinical Triage PWA',
  description: 'Executive Command Suite, Fast-Cashier Fees Desk, Smart Expenses & Bedside Clinical Triage for Imam Institute of Nursing & Allied Health Sciences and Imam Medical Center',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icons/icon.svg',
    apple: '/icons/icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Imam ERP',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0062B1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans min-h-screen bg-slate-50 selection:bg-imam-blue selection:text-white">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
