import { test, expect } from '@playwright/test';

test.describe('Imam Institute Smart ERP & Clinical Triage PWA E2E Suite', () => {
  test('PWA Manifest & Service Worker Validation', async ({ request }) => {
    // 1. Verify /manifest.webmanifest
    const manifestRes = await request.get('/manifest.webmanifest');
    expect(manifestRes.ok()).toBeTruthy();
    const manifest = await manifestRes.json();
    expect(manifest.display).toBe('standalone');
    expect(manifest.theme_color).toBe('#0062B1');
    expect(manifest.short_name).toBe('Imam ERP');
    expect(manifest.icons.length).toBeGreaterThan(0);
    expect(manifest.shortcuts.length).toBeGreaterThan(0);

    // 2. Verify /sw.js
    const swRes = await request.get('/sw.js');
    expect(swRes.ok()).toBeTruthy();
    const swText = await swRes.text();
    expect(swText).toContain('imam-erp-v1');
    expect(swText).toContain('addEventListener');
  });

  test('Desktop & Mobile Responsive Navigation and Zero Horizontal Overflow', async ({ page }) => {
    await page.goto('/erp');

    // Check page title and crest branding
    await expect(page).toHaveTitle(/Imam Institute/);

    // Verify zero horizontal scroll overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    // If mobile viewport (Pixel 7: width <= 768), check bottom nav and PWA banner
    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) {
      const bottomNav = page.locator('[data-testid="mobile-bottom-nav"]');
      await expect(bottomNav).toBeVisible();

      // Check 5 bottom tabs exist
      const tabs = bottomNav.locator('button');
      await expect(tabs).toHaveCount(5);

      // Verify PWA install banner appears after delay
      const pwaBanner = page.locator('[data-testid="pwa-install-banner"]');
      await expect(pwaBanner).toBeVisible({ timeout: 6000 });
      await expect(pwaBanner).toContainText('Install Imam ERP App');
    } else {
      // Desktop: sidebar should be visible
      const desktopNav = page.locator('[data-testid="desktop-nav-owner"]');
      await expect(desktopNav).toBeVisible();
    }
  });

  test('Owner Dashboard Pulse, Approvals, and P&L Verification', async ({ page }) => {
    await page.goto('/erp');

    // Verify Financial Pulse Cards are rendered
    await expect(page.locator('text=Today\'s Cash in Hand')).toBeVisible();
    await expect(page.locator('span:text-is("Net Operating Surplus")').first()).toBeVisible();
    await expect(page.locator('text=Monthly Fee Collection vs Target')).toBeVisible();

    // Verify Owner Approval Inbox has items
    await expect(page.locator('text=Owner One-Tap Mobile Approval Inbox')).toBeVisible();

    // Check for an approval button
    const approveBtn = page.locator('button:has-text("Approve")').first();
    if (await approveBtn.isVisible()) {
      await approveBtn.click();
      await page.waitForTimeout(1000);
    }
  });

  test('Fast Cashier Fee Collection & Thermal Receipt Flow', async ({ page }) => {
    await page.goto('/erp');

    // Switch to Fees tab
    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) {
      await page.locator('[data-testid="mobile-tab-fees"]').click();
    } else {
      await page.locator('[data-testid="desktop-nav-fees"]').click();
    }

    await expect(page.locator('text=Fast-Cashier Fees Collection Desk')).toBeVisible();

    // Search for an unpaid student
    const searchInput = page.locator('[data-testid="cashier-search-input"]');
    await searchInput.fill('Bilal Ahmed Mahar');
    await page.waitForTimeout(300);

    let collectBtn = page.locator('button:has-text("Collect Fee")').first();
    if (!await collectBtn.isVisible()) {
      await searchInput.fill('Fatima');
      await page.waitForTimeout(300);
      collectBtn = page.locator('button:has-text("Collect Fee")').first();
    }
    await expect(collectBtn).toBeVisible();
    await collectBtn.click();

    // Verify modal appears
    await expect(page.locator('text=Collect Fee Payment')).toBeVisible();
    const amountInput = page.locator('[data-testid="collect-amount-input"]');
    await amountInput.fill('20000');

    // Confirm collection
    await page.locator('[data-testid="confirm-collect-btn"]').click();

    // Verify thermal receipt print modal pops up
    await expect(page.locator('text=80mm Thermal Receipt')).toBeVisible();
    await expect(page.locator('text=OFFICIAL FEE RECEIPT')).toBeVisible();
    await expect(page.locator('[data-testid="print-receipt-btn"]')).toBeVisible();
  });

  test('Smart Expenses Voucher Entry & Budget Guardrail Alert', async ({ page }) => {
    await page.goto('/erp');

    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) {
      await page.locator('[data-testid="mobile-tab-expenses"]').click();
    } else {
      await page.locator('[data-testid="desktop-nav-expenses"]').click();
    }

    await expect(page.locator('text=Smart Campus Expenses & Vendor Ledger')).toBeVisible();

    // Verify >90% budget alert is visible for Lab Consumables
    await expect(page.locator('text=>90%').first()).toBeVisible();

    // Click Record New Expense Voucher
    await page.locator('[data-testid="create-voucher-btn"]').click();
    await expect(page.locator('text=Record Campus Payment Voucher')).toBeVisible();

    // Fill form
    await page.fill('input[placeholder*="Indus Solar"]', 'Hyderabad Medical Diagnostic Center');
    await page.fill('input[placeholder="e.g. 45000"]', '35000');
    await page.fill('textarea[placeholder*="Items purchased"]', 'Urgent replacement of calibrated blood gas electrodes batch 4');

    // Handle alert dialog
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.locator('button:has-text("Create Payment Voucher")').click();
    await page.waitForTimeout(1000);
  });

  test('Patient Bedside Triage Intake & Student Nurse Pairing Flow', async ({ page }) => {
    await page.goto('/erp');

    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) {
      // Switch to Faculty Lecturer (Zahid Abbasi)
      await page.locator('[data-testid="role-switcher-select"]').selectOption('usr-teach-zahid');
      await page.locator('[data-testid="mobile-tab-triage"]').click();
    } else {
      // On desktop, switch to Zahid Abbasi as well
      await page.locator('[data-testid="role-switcher-select"]').selectOption('usr-teach-zahid');
      await page.locator('[data-testid="desktop-nav-triage"]').click();
    }

    await expect(page.locator('text=Intelligent Bedside Triage & PNC Student Pairing')).toBeVisible();

    // Click New Patient Triage Intake
    await page.locator('[data-testid="new-triage-btn"]').click();
    await expect(page.locator('text=Emergency Bedside Triage Intake')).toBeVisible();

    // Fill patient with high-risk vitals
    await page.fill('input[placeholder="e.g. Ghulam Rasool"]', 'Muhammad Bachal Brohi');
    await page.fill('input[placeholder="45"]', '58');
    await page.fill('textarea[placeholder*="Describe acute symptoms"]', 'Acute crushing chest pain, dyspneic, cyanosis');

    // Submit intake
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.locator('[data-testid="submit-triage-btn"]').click();
    await page.waitForTimeout(1000);
  });

  test('Profile & Digital ID Card Persistence Flow', async ({ page }) => {
    await page.goto('/erp');

    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) {
      await page.locator('[data-testid="mobile-tab-profile"]').click();
    } else {
      await page.locator('[data-testid="desktop-nav-profile"]').click();
    }

    await expect(page.locator('text=Unified Profile & Preferences Center')).toBeVisible();

    // Update phone number and save
    const phoneInput = page.locator('input[value*="+92"]').first();
    await phoneInput.fill('+92 300 9999888');

    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.locator('[data-testid="save-profile-btn"]').click();
    await page.waitForTimeout(1000);

    // Reload page to confirm database persistence
    await page.reload();

    // Navigate back to profile tab
    if (viewport && viewport.width <= 768) {
      await page.locator('[data-testid="mobile-tab-profile"]').click();
    } else {
      await page.locator('[data-testid="desktop-nav-profile"]').click();
    }

    await expect(page.locator('input[value*="+92"]').first()).toHaveValue('+92 300 9999888');
  });

  test('Official Personnel Roster & Dynamic RBAC Enforcement', async ({ page }) => {
    await page.goto('/erp');

    const userSwitcher = page.locator('[data-testid="role-switcher-select"]');
    await expect(userSwitcher).toBeVisible();

    // 1. Verify official staff and management appear in dropdown options
    const dropdownText = await userSwitcher.innerText();
    expect(dropdownText).toContain('Mr. Sajid Hussain');
    expect(dropdownText).toContain('Dr. Hamid Hussain');
    expect(dropdownText).toContain('Mr. Majid Hussain');
    expect(dropdownText).toContain('Mr. Shahid Hussain');
    expect(dropdownText).toContain('Miss Saeeda');
    expect(dropdownText).toContain('Vinod Kumar');
    expect(dropdownText).toContain('Ali Nawaz');
    expect(dropdownText).toContain('Zahid Abbasi');
    expect(dropdownText).toContain('Mir Mansab');
    expect(dropdownText).toContain('Mumtaz Kanasro');
    expect(dropdownText).toContain('Accountant / Clerk');
    expect(dropdownText).toContain('Imtiaz Ali');
    expect(dropdownText).toContain('Najaf Ali');

    // 2. Switch to Support Staff: Imtiaz Ali (Peon)
    await userSwitcher.selectOption('usr-supp-imtiaz');
    await page.waitForTimeout(500);

    // Support staff portal should be displayed automatically
    await expect(page.locator('main').locator('text=Campus Support Staff')).toBeVisible();
    await expect(page.locator("text=Today's Campus & Hospital Assigned Duties")).toBeVisible();
    await expect(page.locator('text=October 2026 Salary Slip')).toBeVisible();

    // Verify Owner Dashboard is NOT available in navigation
    const viewport = page.viewportSize();
    if (viewport && viewport.width > 768) {
      await expect(page.locator('[data-testid="desktop-nav-owner"]')).not.toBeVisible();
    }

    // 3. Switch to Accountant / Clerk (Cashier)
    await userSwitcher.selectOption('usr-supp-accountant');
    await page.waitForTimeout(500);

    if (viewport && viewport.width > 768) {
      // Cashier has fees desk in sidebar, but not Owner financial suite
      await expect(page.locator('[data-testid="desktop-nav-fees"]')).toBeVisible();
      await expect(page.locator('[data-testid="desktop-nav-owner"]')).not.toBeVisible();
    }

    // 4. Switch to Principal: Vinod Kumar
    await userSwitcher.selectOption('usr-teach-vinod');
    await page.waitForTimeout(500);

    // Principal has academic leadership, triage, letters, student portal, and profile
    if (viewport && viewport.width > 768) {
      await expect(page.locator('[data-testid="desktop-nav-triage"]')).toBeVisible();
      await expect(page.locator('[data-testid="desktop-nav-owner"]')).not.toBeVisible();
    }
  });

  test('Proactive AI Anomaly Radar & Regulatory Compliance Engine', async ({ page }) => {
    await page.goto('/erp');

    // Ensure we are in Owner view
    const radarHeader = page.locator('text=Proactive AI Anomaly & Compliance Radar');
    await expect(radarHeader).toBeVisible();

    // 1. PNC 85%-87% Attendance Danger Zone Card
    await expect(page.locator('text=Attendance Danger Radar')).toBeVisible();
    await expect(page.locator('text=85.0%–87.0%')).toBeVisible();

    // 2. Faculty License Countdown Card (Zahid Abbasi: 18 days left)
    await expect(page.locator('text=Faculty License Expiry')).toBeVisible();
    await expect(page.locator('strong:has-text("Zahid Abbasi")')).toBeVisible();
    await expect(page.locator('text=18 Days Left')).toBeVisible();

    // 3. Clinical Ward Preceptor Ratio Card (1:6)
    await expect(page.locator('text=Preceptor Ward Ratio')).toBeVisible();
    await expect(page.locator('main').locator('text=1:6 Ratio')).toBeVisible();

    // 4. Defaulter Exam Lockout Risk Card
    await expect(page.locator('text=Defaulter Exam Lockout')).toBeVisible();
    await expect(page.locator('strong:has-text("Bilal Ahmed Mahar")')).toBeVisible();
  });

  test('Slide-Over Imam AI Copilot Drawer Real-time Query Flow', async ({ page }) => {
    await page.goto('/erp');

    // Open Copilot via button
    const copilotBtn = page.locator('[data-testid="open-copilot-btn"]');
    await expect(copilotBtn).toBeVisible();
    await copilotBtn.click();

    // Verify slide-over drawer is open
    const drawer = page.locator('[data-testid="imam-copilot-drawer"]');
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('heading', { name: 'Imam AI Copilot' })).toBeVisible();
    await expect(drawer.locator('text=Live DB')).toBeVisible();

    // Query database via Copilot input
    const input = page.locator('[data-testid="copilot-input"]');
    await input.fill('List all students in danger zone');
    await page.locator('[data-testid="copilot-send-btn"]').click();

    // Verify response arrives with grounded information
    await expect(
      drawer.locator('text=PNC 85% Attendance Anomaly').or(drawer.locator('text=Danger Zone'))
    ).toBeVisible({ timeout: 10000 });
  });

  test('Student Self-Service Portal & Preceptor PIN Sign-Off Flow', async ({ page }) => {
    await page.goto('/erp');

    // Switch to Student Role via role-switcher
    const userSwitcher = page.locator('[data-testid="role-switcher-select"]');
    await userSwitcher.selectOption('usr-stu-ayesha');
    await page.waitForTimeout(600);

    // Verify Student Portal loads
    await expect(page.locator('h1:has-text("Ayesha Noor")')).toBeVisible();
    await expect(page.locator('text=Digital QR ID Pass')).toBeVisible();

    // Check 85% Guardrail Tab
    await page.locator('[data-testid="tab-attendance-btn"]').click();
    await expect(page.locator('text=PNC Mandatory 85% Clinical Attendance Guardrail')).toBeVisible();

    // Check PNC Logbook Tab
    await page.locator('[data-testid="tab-logbook-btn"]').click();
    await expect(page.locator('text=Digital Clinical Competency Logbook')).toBeVisible();

    // Look for an unsigned log entry with PIN sign-off button
    const signOffBtn = page.locator('button:has-text("Preceptor PIN Sign-Off")').first();
    if (await signOffBtn.isVisible()) {
      await signOffBtn.click();
      await expect(page.locator('text=Preceptor PIN Clinical Sign-Off')).toBeVisible();

      // Enter valid Preceptor PIN 9988
      await page.fill('[data-testid="supervisor-pin-input"]', '9988');

      page.once('dialog', async (dialog) => {
        await dialog.accept();
      });
      await page.locator('[data-testid="confirm-pin-btn"]').click();
      await page.waitForTimeout(1000);
    }

    // Check AI Viva Coach Tab
    await page.locator('[data-testid="tab-ai-coach-btn"]').click();
    await expect(page.locator('text=Semester-Aware AI NCLEX / PNC Viva & OSPE Coach')).toBeVisible();
    await page.fill('textarea[placeholder*="State aseptic protocol"]', '1. Confirm patient identity. 2. Palpate radial artery and perform Modified Allen Test to ensure collateral ulnar circulation. 3. Cleanse area with chlorhexidine/alcohol using circular technique. 4. Insert 22G heparinized syringe at 45 degree angle. 5. Apply firm pressure for 5 minutes post-punction.');
    
    await page.locator('[data-testid="evaluate-viva-btn"]').click();
    // Verify AI Feedback renders
    await expect(page.locator('text=Score:').or(page.locator('text=Feedback'))).toBeVisible({ timeout: 12000 });
  });

  test('Official Trilingual Correspondence & PNC Letterhead Drafting Flow', async ({ page }) => {
    await page.goto('/erp');

    // Switch to Principal: Vinod Kumar for full drafting studio access
    const userSwitcher = page.locator('[data-testid="role-switcher-select"]');
    await userSwitcher.selectOption('usr-teach-vinod');
    await page.waitForTimeout(500);

    // Switch to Drafting Studio tab
    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) {
      await page.locator('[data-testid="mobile-tab-drafting"]').click();
    } else {
      await page.locator('[data-testid="desktop-nav-drafting"]').click();
    }

    await expect(page.locator('text=Official Correspondence & Drafting Studio')).toBeVisible();

    // Verify template chips
    await expect(page.locator('button:has-text("Clinical Ward Sick Leave")')).toBeVisible();
    await expect(page.locator('button:has-text("Need-Based Fee Concession")')).toBeVisible();

    // Verify live PNC evaluation banner is visible
    await expect(page.locator('text=Live PNC Clinical Guardrail Evaluation:')).toBeVisible();

    // Click Need-Based Fee Concession template
    await page.locator('button:has-text("Need-Based Fee Concession")').click();
    await expect(page.locator('input[value*="Need-Based 50% Tuition Fee Concession"]')).toBeVisible();

    // Submit new application
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.locator('button:has-text("Submit Draft for Principal Approval")').click();
    await page.waitForTimeout(1000);

    // Verify print modal trigger
    const printDocBtn = page.locator('button:has-text("Official Letterhead")').first();
    if (await printDocBtn.isVisible()) {
      await printDocBtn.click();
      await expect(page.locator('[data-testid="print-letterhead-btn"]')).toBeVisible();
      await expect(page.locator('text=Print Letterhead (A4)')).toBeVisible();
    }
  });

  test('Double-Entry General Ledger, Chart of Accounts & Self-Balancing Trial Balance', async ({ page }) => {
    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) return; // Desktop focused test

    await page.goto('/erp');

    // Navigate to Double-Entry Ledger tab
    await page.locator('[data-testid="desktop-nav-finance"]').click();
    await expect(page.locator('text=General Ledger & Financial Controller')).toBeVisible();

    // Verify 4 Accounting Tabs
    await expect(page.locator('[data-testid="tab-journal-entries"]')).toBeVisible();
    await expect(page.locator('[data-testid="tab-chart-accounts"]')).toBeVisible();
    await expect(page.locator('[data-testid="tab-trial-balance"]')).toBeVisible();
    await expect(page.locator('[data-testid="tab-financial-statements"]')).toBeVisible();

    // 1. Trial Balance Tab
    await page.locator('[data-testid="tab-trial-balance"]').click();
    await expect(page.locator('text=Institutional Trial Balance')).toBeVisible();
    await expect(page.locator('text=Balanced Books (Debits = Credits)')).toBeVisible();

    // 2. Chart of Accounts Tab
    await page.locator('[data-testid="tab-chart-accounts"]').click();
    await expect(page.locator('text=5-Tier Standard Chart of Accounts')).toBeVisible();

    // 3. Financial Statements Tab
    await page.locator('[data-testid="tab-financial-statements"]').click();
    await expect(page.locator('text=Income & Expenditure Statement')).toBeVisible();

    // 4. Return to Journal Vouchers
    await page.locator('[data-testid="tab-journal-entries"]').click();
    await expect(page.locator('[data-testid="new-journal-entry-btn"]')).toBeVisible();
  });

  test('Academic Management, Weekly Timetable & Examination Grading Desk', async ({ page }) => {
    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) return; // Desktop focused test

    await page.goto('/erp');

    // Navigate to Academics tab
    await page.locator('[data-testid="desktop-nav-academics"]').click();
    await expect(page.locator('text=Academic & Examination Management')).toBeVisible();

    // Verify Curriculum tab
    await expect(page.locator('[data-testid="academic-tab-curriculum"]')).toBeVisible();
    await expect(page.locator('text=Showing').and(page.locator('text=subjects'))).toBeVisible();

    // Weekly Timetable tab
    await page.locator('[data-testid="academic-tab-timetable"]').click();
    await expect(page.locator('text=Day Filter:')).toBeVisible();
    await expect(page.locator('text=Scheduled Sessions').first()).toBeVisible();

    // Exams & Grading tab
    await page.locator('[data-testid="academic-tab-exams"]').click();
    await expect(page.locator('text=RESULTS PUBLISHED').or(page.locator('text=GRADING IN PROGRESS')).first()).toBeVisible();
    await expect(page.locator('button:has-text("Enter Marks & Publish Grades")').first()).toBeVisible();

    // Official Transcript Preview
    await page.locator('[data-testid="academic-tab-transcript"]').click();
    await expect(page.locator('text=OFFICIAL SEMESTER ACADEMIC TRANSCRIPT')).toBeVisible();
    await expect(page.locator('text=Pakistan Nursing and Midwifery Council')).toBeVisible();
  });

  test('Central Stores & Medical Inventory with GRN and Department Issue', async ({ page }) => {
    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) return; // Desktop focused test

    await page.goto('/erp');

    // Navigate to Inventory tab
    await page.locator('[data-testid="desktop-nav-inventory"]').click();
    await expect(page.locator('text=Central Stores & Medical Inventory')).toBeVisible();

    // Verify KPIs
    await expect(page.locator('text=Total Valuation').first()).toBeVisible();
    await expect(page.locator('text=Active SKUs')).toBeVisible();
    await expect(page.locator('text=Reorder Radar').first()).toBeVisible();

    // Verify GRN and Issue action buttons
    await expect(page.locator('[data-testid="btn-grn-receipt"]')).toBeVisible();
    await expect(page.locator('[data-testid="btn-issue-dept"]')).toBeVisible();

    // Switch to Reorder Radar
    await page.locator('button:has-text("Reorder Radar")').click();
    await expect(page.locator('text=Urgent Procurement Attention:').or(page.locator('text=Safe Reorder Level'))).toBeVisible();
  });

  test('Clinical Hospital Governance & Preceptor Sign-Off Desk', async ({ page }) => {
    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) return; // Desktop focused test

    await page.goto('/erp');

    // Navigate to Clinical Governance tab
    await page.locator('[data-testid="desktop-nav-clinical"]').click();
    await expect(page.locator('text=Clinical Training & Hospital Governance')).toBeVisible();
    await expect(page.locator('text=Clinical Governance & Legal Boundary Segregation')).toBeVisible();

    // Verify Hospital Ward Cards & Ratio Checks
    await expect(page.locator('text=Imam Medical Center').first()).toBeVisible();
    await expect(page.locator('text=PNC RATIO OK').first()).toBeVisible();

    // Click Preceptor Competency Sign-Off button
    await page.locator('[data-testid="btn-evaluate-student"]').click();
    await expect(page.locator('text=Clinical Preceptor Competency Evaluation')).toBeVisible();
    await expect(page.locator('text=Preceptor Security PIN (Auth: 9988)')).toBeVisible();
  });

  test('Regulatory Audit Trail & Compliance Inspection', async ({ page }) => {
    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) return; // Desktop focused test

    await page.goto('/erp');

    // Navigate to Audit tab
    await page.locator('[data-testid="desktop-nav-audit"]').click();
    await expect(page.locator('text=System Audit Trail & Security Logs')).toBeVisible();
    await expect(page.locator('text=PNC & SMF Inspection Standard')).toBeVisible();
    await expect(page.locator('text=Total Audit Events')).toBeVisible();
    await expect(page.locator('text=Verified').first()).toBeVisible();
  });
});
