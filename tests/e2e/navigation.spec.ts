import { test, expect } from '@playwright/test';

test.describe.parallel('Basic Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Visit the main page', async ({ page }) => {
    await expect(page.locator('.navbar__title').getByText('Soyio Docs')).toBeVisible();
  });

  test('Navigate to Integration Guides', async ({ page }) => {
    await page.locator('.navbar__item').getByText('Guías de Integración').click();
    await expect(page).toHaveURL(/\/docs\/integration-guide\/intro/);
    await expect(page.getByRole('heading', { name: 'Guías de integración' })).toBeVisible();
  });

  test('Navigate to API Reference', async ({ page }) => {
    await page.locator('.navbar__item').getByText('Referencia de la API').click();
    await expect(page).toHaveURL(/\/docs\/api\/intro/);
    await expect(page.getByText('Bienvenido a la API de Soyio')).toBeVisible();
  });

  test('Navigate to User Guides', async ({ page }) => {
    await page.locator('.navbar__item').getByText('Guías de Usuario').click();
    await expect(page).toHaveURL(/\/docs\/user-guide\/intro/);
    await expect(page.getByRole('heading', { name: 'Guías de Usuario' })).toBeVisible();
  });
});
