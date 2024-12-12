import { test, expect, chromium } from '@playwright/test';
const fs = require('fs');
import { loginAndSaveAuthState, loginOnly } from '../../utils/loginHandler';
const path = require('path');
let url = 'https://webdev.mile.app/tasks/task';

test.beforeAll(async () => {
  // Ensure auth.json is created before tests
  // await loginAndSaveAuthState();
});

test.beforeEach(async ({ page, context }) => {
  // const authFilePath = path.resolve(__dirname, '../../auth.json'); // Path to the auth.json file

  // // Check if the auth.json exists before attempting to load it
  // if (fs.existsSync(authFilePath)) {
  //   const authState = JSON.parse(fs.readFileSync(authFilePath, 'utf8'));

  //   // Add cookies from auth.json into the context
  //   if (authState && authState.cookies && authState.cookies.length > 0) {
  //     await context.addCookies(authState.cookies);
  //     console.log('Cookies added successfully:', authState.cookies);
  //   } else {
  //     console.log('No cookies found in auth.json');
  //   }
  // } else {
  //   console.log('auth.json not found. Please ensure login is performed to save session.');
  //   await loginAndSaveAuthState(); // Perform login and save session
  // }

  // // Optionally, log cookies for debugging
  // const cookies = await context.cookies();
  // console.log('Current Cookies:', cookies);
});

test('task page has title', async ({ page }) => {
  // Navigate to the protected page
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Take a screenshot for debugging
  await page.screenshot({ path: 'debug-screenshot.png' });

  // Validate the page loaded correctly by checking for a logo
  const logo = await page.locator('img[src="/img/mileapp_logo.aff3c379.svg"]');
  await expect(logo).toBeVisible();

  // Take another screenshot after validating
  await page.screenshot({ path: 'debug-screenshot-after.png' });
});
