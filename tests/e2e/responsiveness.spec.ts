import { test, expect } from '@playwright/test';

test.describe('Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Verify responsive design on mobile', async ({ page }) => {
    // Use a very small viewport to ensure mobile behavior
    await page.setViewportSize({ width: 320, height: 568 });

    // Check if mobile menu toggle is visible
    const menuToggle = page.locator('.navbar__toggle');
    await expect(menuToggle).toBeVisible();

    // Click the menu toggle to open the sidebar
    await menuToggle.click();

    // Check if the sidebar is now visible
    const sidebar = page.locator('.navbar-sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('Verify responsive design on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    // On tablet, left navbar items should be visible
    await expect(page.locator('.theme-layout-navbar-left.navbar__items')).toBeVisible();
  });
});
