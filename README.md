# Imam Institute of Nursing & Allied Health Sciences and Paramedical
### Smart ERP, Native-Feel PWA, Owner Financial Suite & Bedside Clinical Triage System
**Affiliated Teaching Hospital:** Imam Medical Center (IMC)  
**Official Portal Slug:** `mcan-pk` | **Web:** [imcan.pk](https://imcan.pk)

---

## Overview
A full-stack, installable Progressive Web App (PWA) and ERP platform built for the **Imam Institute of Nursing & Allied Health Sciences and Paramedical**. Features true native mobile ergonomics (Android & iOS standalone display mode, safe-area padding, bottom navigation, smart PWA install sheet), role-based access control (RBAC), fast cashier 3-copy PKR bank challan engine, smart expense vouchers, bedside patient triage with NEWS2/ESI scoring, supervised clinical nurse pairing, and PNC 85% attendance guardrails.

## Tech Stack
- **Framework:** Next.js 14 (App Router, TypeScript, Server Actions)
- **Database & ORM:** Prisma ORM + SQLite (WAL mode, auto-migrates to `/tmp/dev.db` on serverless)
- **Styling & Icons:** Tailwind CSS, Lucide Icons, Official Institute Crest Logo
- **PWA Engine:** Dynamic Web Manifest, Service Worker caching (`/sw.js`), Offline indicators
- **Clinical & Business Intelligence:** Hybrid Deterministic Engine + Gemini AI (with local fallback)
- **Testing:** Playwright E2E Suite (16/16 tests passing across Desktop and Mobile viewports)

## Roles & Access Control (RBAC)
- **Executive Management (`OWNER`):** Full executive control, P&L Net Operating Surplus, high-value expense approvals (`> PKR 25,000`), cash vault reconciliation.
- **Academic Leadership (`PRINCIPAL` & `VICE_PRINCIPAL`):** Official correspondence seal, PNC compliance, clinical logbook sign-offs.
- **Teaching Faculty (`FACULTY`):** Bedside triage intake, student nurse ward pairings, 4-digit PIN verification for clinical logbooks.
- **Campus Admin (`ADMIN`):** Campus expense vouchers (`CPV-2026-XXXX`), facilities maintenance.
- **Finance Desk (`CASHIER`):** 1-second fee search & collection counter, 80mm thermal receipts, 3-copy bank challans, shift closing register.
- **Support Staff (`SUPPORT`):** Dedicated Support Staff Portal with shift duty rosters, attendance logs, and itemized wage slips.
- **Student Body (`STUDENT`):** 85% attendance simulator, bedside competency logbook, exam roll slip unlock.

## Local Development
```bash
# Install dependencies
npm install

# Push database schema & seed official personnel roster
npm run db:push
npm run db:seed

# Start development server on fixed port 3000
npm run dev

# Or build and run production server on fixed port 3000
npm run build
npm run start
```

## E2E Testing
```bash
npm run test:e2e
```
