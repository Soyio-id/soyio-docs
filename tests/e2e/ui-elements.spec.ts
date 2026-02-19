import { test, expect } from '@playwright/test';

test.describe('UI Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Verify hero section', async ({ page }) => {
    // Check for the main hero content instead of dynamic background
    await expect(
      page.getByRole('heading', {
        name: /El nuevo estándar de privacidad digital/,
      }),
    ).toBeVisible();
    await expect(
      page.getByText(/Construye productos privados que generan confianza/),
    ).toBeVisible();
  });

  test('Verify logo presence', async ({ page }) => {
    await expect(page.locator('.navbar__logo')).toBeVisible();
  });

  test('Verify footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });
});
