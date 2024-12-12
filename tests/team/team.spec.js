import { test, expect } from '@playwright/test';
import { performLogin, loadSession } from '../../utils/auth';

let page;
let context;
const url = 'https://webdev.mile.app/setting/team';

test.beforeAll(async ({ browser }) => {
  // create a new browser context
  context = await browser.newContext();

  // load session if available
  const isSessionLoaded = await loadSession(context);

  if (!isSessionLoaded) {
    // create a new page for login
    page = await context.newPage();

    // perform login and save session
    await performLogin(page, context);

    await page.close();
  }
});

test.describe('Setting Team Test', () => {
  test.beforeEach(async () => {
    // open a new page for each test using the same context
    page = await context.newPage();
    await page.goto(url);
    await page.waitForURL(url);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Verify Team Page', async () => {
    // locate the team table and verify its visibility
    const tableTeam = page.locator('.main-scroll.std-virtual-tableeeee');
    await tableTeam.waitFor({ state: 'visible' });
    await expect(tableTeam).toBeVisible();
  });


  test('create team', async () => {
    // cocate the team table and verify its visibility
    const buttonNew = page.locator('button#baseButtonId:has-text("New")');
    await buttonNew.waitFor({ state: 'visible' });
    await buttonNew.click();

    await page.waitForTimeout(2000);

    const modalTeam = page.locator('#dialogTeam');
    await modalTeam.waitFor({ state: 'visible' });
    await expect(modalTeam).toBeVisible();


    const teamNameInput = modalTeam.locator('input[placeholder="Write team name"]');
    await teamNameInput.fill('Sasuke')

    await page.waitForTimeout(1000);

    const buttonSubmit = page.locator('button#baseButtonId:has-text("Submit")');
    await buttonSubmit.waitFor({ state: 'visible' });
    await buttonSubmit.click();

    await page.waitForTimeout(2000);
    await expect(modalTeam).toBeHidden();

    const table = page.locator('.main-scroll.std-virtual-table');
    const row = table.locator(`.items:has-text("Sasuke")`);
    await expect(row).toBeVisible();
  });


});

test.afterAll(async () => {
  // close the browser context after all tests
  await context.close();
});
