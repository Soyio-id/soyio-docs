import { test, expect } from '@playwright/test';

test.describe('UI Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Verify dynamic background', async ({ page }) => {
    await expect(page.locator('canvas')).toBeVisible();
  });

  test('Verify logo presence', async ({ page }) => {
    await expect(page.locator('.navbar__logo')).toBeVisible();
  });

  test('Verify footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });
});
