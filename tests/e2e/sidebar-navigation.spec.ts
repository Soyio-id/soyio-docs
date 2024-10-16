import { test, expect } from '@playwright/test';

test.describe('Sidebar Navigation', () => {
  test('Verify sidebar navigation in Integration Guides', async ({ page }) => {
    await page.goto('http://localhost:3000/docs/integration-guide/intro');
    await page.getByText('Conceptos').click();
    await page.getByText('Conceptos generales').click();
    await expect(page).toHaveURL(/\/docs\/integration-guide\/concepts\/general-concepts/);
  });

  test('Verify sidebar navigation in API Reference', async ({ page }) => {
    await page.goto('http://localhost:3000/docs/api/intro');
      await page.getByText('Recursos').click();
      await page.getByText('Introduction').click();
      await expect(page).toHaveURL(/\/docs\/api\/resources\/.+/);
  });
});
