const fs = require('fs/promises');

const loginURL = 'https://webdev.mile.app/login';
const storageFile = 'storageState.json';

/**
 * Logs in to the application and saves session data.
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {import('@playwright/test').BrowserContext} context - Playwright context
 */
async function performLogin(page, context) {
  await page.goto(loginURL);


  await page.goto('https://webdev.mile.app/login');

  await page.fill('input#__BVID__20', 'andika@mile.app');

  await page.fill('input#__BVID__26', 'password'); 

  await page.waitForTimeout(2000);

  const loginButton = page.locator('button#baseButtonId');
  await loginButton.waitFor({ state: 'visible' });
  await loginButton.click({ force: true });
  

  await page.waitForURL('https://webdev.mile.app/tasks/task');

  const storageState = await context.storageState();
  await fs.writeFile(storageFile, JSON.stringify(storageState, null, 2));
}

/**
 * Loads session from storage file and applies it to the context.
 * @param {import('@playwright/test').BrowserContext} context - Playwright context
 * @returns {Promise<boolean>} - Returns true if session is loaded, false otherwise
 */
async function loadSession(context) {
    try {
        const storageState = JSON.parse(await fs.readFile(storageFile, 'utf-8'));
        await context.addCookies(storageState.cookies);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { performLogin, loadSession };
