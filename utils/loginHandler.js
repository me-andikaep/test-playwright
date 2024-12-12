const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function loginAndSaveAuthState(url) {
  const authFilePath = path.resolve(__dirname, '../auth.json'); // Ensure absolute path

  if (!fs.existsSync(authFilePath)) {
    const browser = await chromium.launch({ headless: true }); // Headless mode can be set to false for debugging
    const context = await browser.newContext();
    const page = await context.newPage();

    // Perform the login process
    await page.goto('https://webdev.mile.app/login');

    // Wait for the email input and fill it
    await page.fill('input#__BVID__19', 'andika@mile.app'); // Replace with your email

    // Wait for the password input and fill it
    await page.fill('input#__BVID__24', 'password'); // Replace with your password

    // Wait for the login button to be visible and clickable
    const loginButton = await page.locator('button#baseButtonId.btn.mt-2.mb-3.btn-default.btn-block.base-button');
    await loginButton.waitFor({ state: 'visible' }); // Ensure the button is visible
    await loginButton.click();

    // Wait for navigation after login
    // await page.waitForURL('https://webdev.mile.app/');

    // Save the authentication state to a file
    await context.storageState({ path: authFilePath });
    console.log('Authentication state saved to auth.json');
    await browser.close();
  } else {
    console.log('auth.json already exists. Skipping login.');
  }
}


module.exports = { loginAndSaveAuthState };
