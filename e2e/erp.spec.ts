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
    await page.goto('/');

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
    await page.goto('/');

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
    await page.goto('/');

    // Switch to Fees tab
    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) {
      await page.locator('[data-testid="mobile-tab-fees"]').click();
    } else {
      await page.locator('[data-testid="desktop-nav-fees"]').click();
    }

    await expect(page.locator('text=Fast-Cashier Fees Collection Desk')).toBeVisible();

    // Search for a student
    const searchInput = page.locator('[data-testid="cashier-search-input"]');
    await searchInput.fill('BSN-2024-008'); // Fatima Zehra (Partial)

    // Click Collect Fee button
    const collectBtn = page.locator('button:has-text("Collect Fee")').first();
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
    await page.goto('/');

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
    await page.goto('/');

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
    await page.goto('/');

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
    await page.goto('/');

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
    await expect(page.locator('text=Campus Support Staff')).toBeVisible();
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
});
