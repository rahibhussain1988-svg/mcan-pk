import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Imam Institute Smart ERP & Clinical Triage',
    short_name: 'Imam ERP',
    description: 'Smart ERP, Owner Financial Suite & Clinical Triage System for Imam Institute of Nursing & Allied Health Sciences and Imam Medical Center',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#062B54',
    theme_color: '#0062B1',
    scope: '/',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Owner Dashboard',
        short_name: 'Owner P&L',
        description: 'View real-time financial pulse & net operating surplus',
        url: '/?tab=owner',
        icons: [{ src: '/icons/icon.svg', sizes: '192x192' }],
      },
      {
        name: 'Collect Fee Desk',
        short_name: 'Collect Fee',
        description: 'Fast cashier receipt issuance & challan search',
        url: '/?tab=fees',
        icons: [{ src: '/icons/icon.svg', sizes: '192x192' }],
      },
      {
        name: 'Record Campus Expense',
        short_name: 'New Expense',
        description: 'Record expense voucher & petty cash entry',
        url: '/?tab=expenses',
        icons: [{ src: '/icons/icon.svg', sizes: '192x192' }],
      },
      {
        name: 'Emergency Patient Triage',
        short_name: 'Triage Intake',
        description: 'NEWS2 & ESI intake with student nurse pairing',
        url: '/?tab=triage',
        icons: [{ src: '/icons/icon.svg', sizes: '192x192' }],
      },
    ],
  };
}
