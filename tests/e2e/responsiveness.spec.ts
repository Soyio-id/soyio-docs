import { test, expect } from '@playwright/test';

test.describe('Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Verify responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuToggle = page.locator('.navbar__toggle');
    await expect(menuToggle).toBeVisible();

    const mainNavbarItems = page.locator('.navbar-sidebar__items').first();
    await expect(mainNavbarItems).not.toBeVisible();

    await menuToggle.click();
    await expect(mainNavbarItems).toBeVisible();
  });

  test('Verify responsive design on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.navbar__items').first()).toBeVisible();
  });
});
