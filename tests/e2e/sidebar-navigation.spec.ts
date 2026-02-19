import { test, expect } from '@playwright/test';

test.describe('Sidebar Navigation', () => {
  test('Verify sidebar navigation in Integration Guides', async ({ page }) => {
    await page.goto('/docs/integration-guide/intro');
    await page.waitForSelector('.theme-doc-sidebar-menu');
    await page.getByRole('link', { name: 'Trazabilidad y auditoría' }).click();
    await expect(page).toHaveURL(
      /\/docs\/integration-guide\/evidence-traceability/,
    );
  });

  test('Verify sidebar navigation in API Reference', async ({ page }) => {
    await page.goto('/docs/api/intro');
    await page.waitForSelector('.theme-doc-sidebar-menu');
    await page.getByRole('button', { name: 'Disclosure requests' }).click();
    await page
      .getByRole('link', { name: 'El objeto DisclosureRequest' })
      .click();
    await expect(page).toHaveURL(
      /\/docs\/api\/resources\/schemas\/disclosurerequest/,
    );
  });
});
