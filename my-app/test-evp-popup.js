const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Opening app...');
  await page.goto('http://localhost:5184/');
  await page.waitForLoadState('networkidle');

  // Take initial screenshot
  console.log('Taking initial screenshot...');
  await page.screenshot({ path: 'test-screenshots/initial.png' });

  // Click the "Create EVP" button
  console.log('Clicking Create EVP button...');
  const createEVPBtn = await page.locator('button:has-text("Create EVP")');
  await createEVPBtn.click();
  await page.waitForTimeout(300);

  // Take screenshot showing the popup
  console.log('Taking popup screenshot...');
  await page.screenshot({ path: 'test-screenshots/popup-visible.png' });

  // Check if modal is visible
  const modal = await page.locator('.modal-overlay');
  const isVisible = await modal.isVisible();
  console.log('Modal visible:', isVisible);

  // Try to interact with the popup
  console.log('Testing form inputs...');

  // Select department
  const deptSelect = await page.locator('select[name="department"]');
  await deptSelect.selectOption('sales');
  console.log('Department selected');

  // Fill email
  const emailInput = await page.locator('input[name="email"]');
  await emailInput.fill('test@example.com');
  console.log('Email filled');

  // Take screenshot with form filled
  await page.screenshot({ path: 'test-screenshots/popup-filled.png' });

  // Test close button
  console.log('Testing close button...');
  const closeBtn = await page.locator('button.modal-close-btn');
  await closeBtn.click();
  await page.waitForTimeout(300);

  // Take screenshot after close
  await page.screenshot({ path: 'test-screenshots/popup-closed.png' });

  // Check if modal is gone
  const modalAfterClose = await page.locator('.modal-overlay');
  const isVisibleAfterClose = await modalAfterClose.isVisible({ timeout: 1000 }).catch(() => false);
  console.log('Modal visible after close:', isVisibleAfterClose);

  // Open popup again to test Cancel button
  console.log('Opening popup again to test Cancel button...');
  await createEVPBtn.click();
  await page.waitForTimeout(300);

  // Click Cancel button
  const cancelBtn = await page.locator('button.modal-cancel-btn');
  await cancelBtn.click();
  await page.waitForTimeout(300);

  // Take screenshot after cancel
  await page.screenshot({ path: 'test-screenshots/popup-canceled.png' });

  console.log('All tests completed!');

  await browser.close();
})();
