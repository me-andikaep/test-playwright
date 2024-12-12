import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://webdev.mile.app/login');
});

test('login page has title', async ({ page }) => {

  await expect(page).toHaveTitle(/MileApp/);
});

test.describe('login page component', () => {
  test('has logo mileapp', async ({ page }) => {
    const logo = await page.locator('img.mini-img');
    await expect(logo).toBeVisible();
  });

  test('has login google', async ({ page }) => {
    const google = await page.locator('div.googleLogin');
    await expect(google).toBeVisible();
  });

  test('has form email', async ({ page }) => {
    const form = await page.locator('input#__BVID__19');
    await expect(form).toBeVisible();
  });

  test('has form password', async ({ page }) => {
    const form = await page.locator('input#__BVID__24');
    await expect(form).toBeVisible();
  });

  test('has forgot password', async ({ page }) => {
    const forgot = await page.locator('span.float-right.cursorPointer.fs-12.mb-3.text-primary');
    await expect(forgot).toBeVisible();
  });

  test('has btn login', async ({ page }) => {
    const btn = await page.locator('button#baseButtonId.btn.mt-2.mb-3.btn-default.btn-block.base-button');
    await expect(btn).toBeVisible();
  });

  test('has signup', async ({ page }) => {
    const signup = await page.locator('a.card-link');
    await expect(signup).toBeVisible();
  });
})