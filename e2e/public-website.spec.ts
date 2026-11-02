import { test, expect } from '@playwright/test';

test.describe('Imam Institute Official Public Website (imcan.pk) & ERP Bridge Suite', () => {
  test('Two-Tier Header Zero Text Wrapping, Mega-Dropdown & ERP Bridge Handoff', async ({ page }) => {
    await page.goto('/');

    // 1. Verify page title and crest branding
    await expect(page).toHaveTitle(/Imam Institute/);

    // 2. Verify Zero Horizontal Scroll Overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    // 3. Verify Tier 1 Top Bar
    await expect(page.locator('text=Est. 2019 · Jacobabad').first()).toBeVisible();
    await expect(page.locator('text=+92 300 2320085').first()).toBeVisible();

    const viewport = page.viewportSize();
    if (viewport && viewport.width > 768) {
      // 4. Test Programs Mega-Dropdown
      const programsLink = page.locator('header nav a:has-text("Programs")');
      await programsLink.hover();
      await page.waitForTimeout(300);
      await expect(page.locator('text=Flagship Degree').first()).toBeVisible();
      await expect(page.locator('text=9 Paramedical Diplomas').first()).toBeVisible();
      await expect(page.locator('text=Upcoming Pathways').first()).toBeVisible();

      // 5. Test ERP & Portals Launcher Dropdown
      const erpBtn = page.locator('header button:has-text("ERP & Portals")');
      await erpBtn.click();
      await expect(page.locator('text=Institutional Portal Gateways')).toBeVisible();
      await expect(page.locator('text=Student Self-Service Portal').first()).toBeVisible();
      await expect(page.locator('text=Imam Medical Center Triage').first()).toBeVisible();
      await expect(page.locator('text=Owner & Executive Command').first()).toBeVisible();

      // Click Owner & Executive Command to test bridge handoff
      await page.locator('a:has-text("Owner & Executive Command")').first().click();
      await page.waitForURL('**/erp?role=owner&tab=owner');
      await expect(page.locator('text=Today\'s Cash in Hand')).toBeVisible();

      // Test "← Public Website" return button inside ERP header
      const returnBtn = page.locator('a:has-text("Public Website")');
      await expect(returnBtn).toBeVisible();
      await returnBtn.click();
      await page.waitForURL('**/');
      await expect(page.locator('text=Nurses Since 2019').first()).toBeVisible();
    }
  });

  test('Hero Cinema Slideshow Kinetic Slides, Pill Timers & 3D Tilt Card', async ({ page }) => {
    await page.goto('/');

    // 1. Initial slide check
    await expect(page.locator('text=Nurses Since 2019').first()).toBeVisible();

    // 2. Click Slide 02 Pill (Free Paramedical Initiative)
    const slide2Btn = page.locator('button:has-text("02")').first();
    await slide2Btn.click();
    await page.waitForTimeout(600);

    await expect(page.locator('text=Paramedical Diplomas').first()).toBeVisible();

    // 3. Click Slide 03 Pill (Clinical Rotations)
    const slide3Btn = page.locator('button:has-text("03")').first();
    await slide3Btn.click();
    await page.waitForTimeout(600);

    await expect(page.locator('text=Patient Care Happens').first()).toBeVisible();

    // 4. Click Slide 05 Pill (Smart Student ERP)
    const slide5Btn = page.locator('button:has-text("05")').first();
    await slide5Btn.click();
    await page.waitForTimeout(600);

    await expect(page.locator('text=Next-Gen Student ERP &').first()).toBeVisible();
  });

  test('Accreditation Marquee Authority Verification Modal', async ({ page }) => {
    await page.goto('/');

    // Find marquee accreditation seal and dispatch click
    const pnmcButton = page.locator('[data-testid="accreditation-pnmc"]').first();
    await pnmcButton.dispatchEvent('click');

    // Popover modal verification
    await expect(page.locator('text=Regulatory Council')).toBeVisible();
    await expect(page.locator('text=Verified Active & Good Standing')).toBeVisible();

    // Close modal
    await page.locator('button:has-text("Close")').click();
  });

  test('Smart Merit & Scholarship Calculator Real-Time Evaluation', async ({ page }) => {
    await page.goto('/');

    // Scroll to merit calculator
    const calcSection = page.locator('#merit-calculator');
    await calcSection.scrollIntoViewIfNeeded();

    await expect(page.locator('text=Calculate Your Merit & Scholarship Tier')).toBeVisible();

    // Check default composite merit rendering
    await expect(page.locator('text=Overall Composite')).toBeVisible();
    await expect(page.locator('text=BS Nursing (Generic)').first()).toBeVisible();
    await expect(page.locator('text=9 Paramedical Diplomas').first()).toBeVisible();

    // Toggle TCF Alumni checkbox
    const tcfCheckbox = page.locator('#merit-calculator input[type="checkbox"]').first();
    await tcfCheckbox.check({ force: true });

    await expect(page.locator('text=TCF Alumni Priority Quota')).toBeVisible();
  });

  test('Clinical Triage Bedside Mini-Simulator Protocol Computation', async ({ page }) => {
    await page.goto('/');

    const triageSection = page.locator('#triage-simulator');
    await triageSection.scrollIntoViewIfNeeded();

    await expect(page.locator('text=Interactive Clinical Triage Simulator')).toBeVisible();
    await expect(page.locator('text=National Early Warning Score')).toBeVisible();
    await expect(page.locator('text=Emergency Severity Index')).toBeVisible();
    await expect(page.locator('text=Launch Full Triage Engine in ERP')).toBeVisible();
  });

  test('Integrated Campus Management ERP & Portals Hub on Index Page', async ({ page }) => {
    await page.goto('/');

    const erpSection = page.locator('#campus-erp');
    await erpSection.scrollIntoViewIfNeeded();

    await expect(page.locator('text=Campus Management ERP & Portals')).toBeVisible();
    await expect(page.locator('text=Integrated Directly Within Website · Same Codebase')).toBeVisible();

    // Verify Tab Switching
    const studentTabBtn = erpSection.getByRole('button', { name: 'Student Self-Service Portal' });
    await studentTabBtn.click();
    await expect(erpSection.locator('text=Downloadable 3-Copy Bank Challan')).toBeVisible();

    const triageTabBtn = erpSection.getByRole('button', { name: 'Clinical Bedside Triage Engine' });
    await triageTabBtn.click();
    await expect(erpSection.locator('text=NEWS2 & ESI Acuity Scoring')).toBeVisible();

    // Verify Fast Links
    await expect(erpSection.locator('a[href="/owner"]')).toBeVisible();
    await expect(erpSection.locator('a[href="/student-portal"]')).toBeVisible();
    await expect(erpSection.locator('a[href="/triage"]')).toBeVisible();
  });

  test('Trilingual AI Admissions Counselor (English, Urdu, Sindhi)', async ({ page }) => {
    await page.goto('/');

    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) {
      // Mobile: open via drawer
      await page.locator('button[aria-label="Toggle Navigation Drawer"]').click();
      await page.locator('button:has-text("Ask Imam AI Admissions Counselor")').click();
    } else {
      // Desktop: header CTA
      await page.locator('button:has-text("Ask AI")').first().click();
    }

    // Modal appears
    await expect(page.locator('text=Imam AI Admissions Counselor')).toBeVisible();

    // Test English quick question
    const engQuestion = page.locator('button:has-text("What are the eligibility criteria for BS Nursing?")');
    await engQuestion.click();

    // Expect reply containing PNMC and SMBBMU inside counselor modal
    await expect(page.locator('.fixed').getByText('SMBBMU Larkana')).toBeVisible({ timeout: 5000 });

    // Switch to Urdu (اردو)
    await page.locator('.fixed').getByRole('button', { name: 'اردو' }).click();
    await expect(page.locator('button:has-text("کیا 9 پیرامیڈیکل ڈپلومے واقعی 100 فیصد مفت ہیں؟")')).toBeVisible();

    // Switch to Sindhi (سنڌي)
    await page.locator('.fixed').getByRole('button', { name: 'سنڌي' }).click();
    await expect(page.locator('button:has-text("ڇا 9 پيراميڊيڪل ڊپلوما واقعي 100 سيڪڙو مفت آهن؟")')).toBeVisible();

    // Close modal
    await page.locator('button[aria-label="Close counselor"]').click();
  });

  test('End-to-End Online Admission Submission, Printable QR Admit Slip & Live ERP Verification', async ({ page }) => {
    await page.goto('/');

    // Click "Apply Online"
    await page.locator('button:has-text("Apply Online")').first().click();

    // Step 1: Personal Details
    await expect(page.locator('text=Applicant Personal & Contact Details')).toBeVisible();
    await page.fill('input[placeholder="e.g. Zubair Ahmed Soomro"]', 'Aftab Ali Solangi');
    await page.fill('input[placeholder="e.g. Bashir Ahmed"]', 'Manzoor Ali');
    await page.fill('input[placeholder="43102-XXXXXXX-X"]', '43102-5544332-1');
    await page.fill('input[placeholder="+92 300 XXXXXXX"]', '+92 302 7766554');
    await page.locator('button:has-text("Continue")').click();

    // Step 2: Program Choice
    await expect(page.locator('text=Select Desired Academic Program')).toBeVisible();
    await page.locator('button:has-text("Continue")').click();

    // Step 3: Academic Marks
    await expect(page.locator('text=Academic Scores & Auto-Merit Computation')).toBeVisible();
    await page.locator('button:has-text("Continue")').click();

    // Step 4: Review & Submit
    await expect(page.locator('text=Review Your Application Details')).toBeVisible();
    await expect(page.locator('text=Aftab Ali Solangi')).toBeVisible();

    // Submit Application to SQLite DB
    await page.locator('button:has-text("Submit Admission & Generate Slip")').click();

    // Step 5: Official Printable Admit Slip Generated
    await expect(page.locator('text=Admission Application Submitted Successfully!')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#printable-admit-slip')).toBeVisible();
    await expect(page.locator('text=Official Entry Test Admit Slip')).toBeVisible();
    await expect(page.locator('img[alt="Official Verification QR"]')).toBeVisible();

    // Grab generated Application Roll No
    const appRollNo = await page.locator('#printable-admit-slip strong.font-mono').first().innerText();
    expect(appRollNo).toContain('IMCAN-JCD-2026-');

    // Close admission modal
    await page.locator('button:has-text("Done")').click();

    // 6. Verify via "Verify Admit Slip" Modal Lookup
    const viewport = page.viewportSize();
    if (viewport && viewport.width > 768) {
      await page.locator('header button:has-text("Verify Admit Slip")').click();
    } else {
      await page.goto('/admissions');
      await page.locator('button:has-text("Verify Existing Admit Slip")').click();
    }

    await expect(page.locator('text=Verify Entry Test Admit Slip')).toBeVisible();
    await page.fill('input[placeholder*="IMCAN-JCD-2026"]', appRollNo);
    await page.locator('.fixed').getByRole('button', { name: 'Verify', exact: true }).click();

    // Expect verified result
    await expect(page.locator('text=Official Credential Verified & Registered in ERP Database')).toBeVisible();
    await expect(page.locator(`text=${appRollNo}`).first()).toBeVisible();
    await expect(page.locator('text=Aftab Ali Solangi')).toBeVisible();

    // Close verify modal
    await page.locator('.fixed button[aria-label="Close modal"]').click();

    // 7. Verify Live ERP Bridge Persistence: Check Owner Dashboard
    await page.goto('/erp?role=owner&tab=owner');
    await expect(page.locator('text=Owner One-Tap Mobile Approval Inbox')).toBeVisible();
    // Newly submitted online admission item should be visible in pending approvals!
    await expect(page.locator(`text=Online Admission: Aftab Ali Solangi (${appRollNo})`).first()).toBeVisible();
  });

  test('Public Subpages (/about, /programs, /clinical-training, /admissions, /news-careers, /contact)', async ({ page }) => {
    // /about
    await page.goto('/about');
    await expect(page.locator('text=About Imam Institute')).toBeVisible();
    await expect(page.locator('text=Dr. Abid Hussain Soomro').first()).toBeVisible();

    // /programs
    await page.goto('/programs');
    await expect(page.locator('text=Academic Degree & Diploma Programs')).toBeVisible();
    await expect(page.locator('text=BS Nursing (Generic) — 4 Years').first()).toBeVisible();

    // /clinical-training
    await page.goto('/clinical-training');
    await expect(page.locator('text=Clinical Training & Hospital Rotations')).toBeVisible();
    await expect(page.locator('text=Jacobabad Institute of Medical Sciences (JIMS)').first()).toBeVisible();

    // /admissions
    await page.goto('/admissions');
    await expect(page.locator('text=Online Admissions & Merit Portal')).toBeVisible();

    // /news-careers
    await page.goto('/news-careers');
    await expect(page.locator('text=News, Seminars & Careers')).toBeVisible();
    await expect(page.locator('text=Hiring: Principal (Male / Female)')).toBeVisible();

    // /contact
    await page.goto('/contact');
    await expect(page.locator('text=Contact & Visit Campus')).toBeVisible();
    await expect(page.locator('text=Shah Ghazi Muhalla, Imam Baksh Road').first()).toBeVisible();
  });

  test('Public Institutional Pages (/faculty, /departments, /facilities, /gallery, /news)', async ({ page }) => {
    // 1. /faculty & /faculty-management
    await page.goto('/faculty');
    await expect(page.locator('text=Faculty & Executive Management')).toBeVisible();
    await expect(page.locator('text=Dr. Abid Hussain Soomro').first()).toBeVisible();
    await expect(page.locator('text=Vinod Kumar').first()).toBeVisible();

    // Test Search filter in faculty roster
    const facultySearch = page.locator('input[placeholder*="Search faculty name"]');
    await facultySearch.fill('Vinod');
    await expect(page.locator('text=Vinod Kumar').first()).toBeVisible();

    // Verify alias /faculty-management works
    await page.goto('/faculty-management');
    await expect(page.locator('text=Faculty & Executive Management')).toBeVisible();

    // 2. /departments
    await page.goto('/departments');
    await expect(page.locator('text=Academic & Clinical Departments')).toBeVisible();
    await expect(page.locator('text=Department of Nursing Sciences').first()).toBeVisible();
    await expect(page.locator('text=Department of Clinical Skills & Simulation').first()).toBeVisible();
    await expect(page.locator('text=Hospital Clinical Services').first()).toBeVisible();

    // 3. /facilities
    await page.goto('/facilities');
    await expect(page.locator('text=State-of-the-Art Facilities & Labs')).toBeVisible();
    await expect(page.locator('text=High-Fidelity Nursing Skills & Simulation Lab')).toBeVisible();
    await expect(page.locator('text=Dedicated Student Transport Fleet')).toBeVisible();

    // 4. /gallery
    await page.goto('/gallery');
    await expect(page.locator('text=Institutional Photo Gallery')).toBeVisible();
    await expect(page.locator('text=Nursing Scholars White Coat & Capping Ceremony').first()).toBeVisible();

    // Test gallery category filter
    const clinicalTab = page.locator('button:has-text("Hospital Clinical Training")').first();
    await clinicalTab.click();
    await page.waitForTimeout(300);
    await expect(page.locator('text=Bedside Emergency Triage Simulation at IMC').first()).toBeVisible();

    // Test gallery lightbox modal
    const firstImgCard = page.locator('text=View High-Res').first();
    await firstImgCard.click();
    await expect(page.locator('button:has-text("Close Preview")')).toBeVisible();
    await page.locator('button:has-text("Close Preview")').click();

    // 5. /news
    await page.goto('/news');
    await expect(page.locator('text=News, Notifications & Announcements')).toBeVisible();
    await expect(page.locator('text=Fall 2026 Admissions Open').first()).toBeVisible();
    await expect(page.locator('text=SMBBMU Larkana Semester Examination Date Sheet').first()).toBeVisible();

    // Test search filter on news
    const newsSearch = page.locator('input[placeholder*="Search circulars"]');
    await newsSearch.fill('Examination');
    await expect(page.locator('text=SMBBMU Larkana Semester Examination Date Sheet').first()).toBeVisible();
  });

  test('Dedicated Online Application Route (/admissions/apply & /apply)', async ({ page }) => {
    // Test alias route /apply
    await page.goto('/apply');
    await expect(page.locator('text=Official Online Admission Application')).toBeVisible();
    await expect(page.locator('text=Step 1: Personal & Identification Details')).toBeVisible();

    // Fill Step 1
    await page.fill('input[placeholder*="Ayesha Noor"]', 'Kashif Ali Soomro');
    await page.fill('input[placeholder*="Ghulam Rasool"]', 'Ghulam Rasool Soomro');
    await page.fill('input[placeholder*="43102-"]', '42401-9988776-5');
    await page.fill('input[placeholder*="0300-1234567"]', '0300-9876543');
    await page.fill('input[placeholder*="0300-7654321"]', '0301-8765432');
    await page.fill('input[placeholder*="candidate@gmail.com"]', 'kashif.soomro@example.com');
    await page.fill('input[placeholder*="Muhalla, Street"]', 'Mohalla Soomra, Jacobabad, Sindh');

    await page.locator('button:has-text("Continue to Academic Merit")').click();

    // Step 2: Program Choice & Academic Scores
    await expect(page.locator('text=Step 2: Program Choice & Educational Record')).toBeVisible();
    await page.locator('button:has-text("Continue to Review")').click();

    // Step 3: Review and Submit
    await expect(page.locator('text=Step 3: Scholarship Category & Final Confirmation')).toBeVisible();
    await expect(page.locator('text=Kashif Ali Soomro')).toBeVisible();

    // Submit
    await page.locator('button:has-text("Submit & Generate Official Admit Slip")').click();

    // Verify Generated Slip
    await expect(page.locator('text=Admission Registered Successfully!')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=OFFICIAL CAMPUS ENTRY TEST ADMIT SLIP')).toBeVisible();
    await expect(page.locator('text=Kashif Ali Soomro').first()).toBeVisible();
    await expect(page.locator('img[alt="Admit Slip QR Code"]')).toBeVisible();
  });

  test('Dedicated Portal Login Gateways (/student-login & /erp-login)', async ({ page }) => {
    // 1. /student-login
    await page.goto('/student-login');
    await expect(page.locator('text=Student Self-Service Portal').first()).toBeVisible();
    await expect(page.locator('text=Access Your Academic & Clinical Records')).toBeVisible();

    // Test quick demo student selector
    const studentFarhan = page.locator('button:has-text("Farhan Ali Soomro")');
    await studentFarhan.click();
    await expect(page.locator('input[value="STU-2025-XRAY-007"]')).toBeVisible();

    // Click Sign In
    await page.locator('button:has-text("Sign In to Student Portal")').click();
    await page.waitForURL('**/erp?role=student&tab=student&studentId=STU-2025-XRAY-007', { timeout: 10000 });
    await expect(page.locator('text=Digital QR ID Pass')).toBeVisible();

    // 2. /erp-login
    await page.goto('/erp-login');
    await expect(page.locator('text=Administrative & Faculty ERP Gateway')).toBeVisible();
    await expect(page.locator('text=Executive Command & Chairman')).toBeVisible();
    await expect(page.locator('text=Fast-Cashier & Accounts Desk')).toBeVisible();
    await expect(page.locator('text=Clinical Preceptor & Ward Supervisor')).toBeVisible();

    // Click Cashier Desk Profile
    const cashierCard = page.locator('h3:has-text("Fast-Cashier & Accounts Desk")');
    await cashierCard.click();
    await expect(page.locator('input[value="accounts@imcan.pk"]')).toBeVisible();

    // Click Enter ERP System
    await page.locator('button:has-text("Enter ERP System")').click();
    await page.waitForURL('**/erp?role=accounts&tab=fees', { timeout: 10000 });
    await expect(page.locator('text=Fast-Cashier Fees Collection Desk')).toBeVisible();
  });
});
