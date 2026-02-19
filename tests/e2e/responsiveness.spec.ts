import { test, expect } from '@playwright/test';

test.describe('Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
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

  test('Keep homepage hero content inside mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const hero = page.locator('header[class*="heroBanner"]');
    await expect(hero).toBeVisible();

    const heroContent = hero.locator('[class*="content"]').first();
    const heroTitle = hero.getByRole('heading', { level: 1 });
    await expect(heroContent).toBeVisible();
    await expect(heroTitle).toBeVisible();

    const viewport = page.viewportSize();
    const heroContentBounds = await heroContent.boundingBox();
    const heroTitleBounds = await heroTitle.boundingBox();

    expect(viewport).not.toBeNull();
    expect(heroContentBounds).not.toBeNull();
    expect(heroTitleBounds).not.toBeNull();

    if (!(viewport && heroContentBounds && heroTitleBounds)) {
      return;
    }

    expect(heroContentBounds.x).toBeGreaterThanOrEqual(0);
    expect(heroContentBounds.x + heroContentBounds.width).toBeLessThanOrEqual(
      viewport.width,
    );
    expect(heroTitleBounds.x).toBeGreaterThanOrEqual(0);
    expect(heroTitleBounds.x + heroTitleBounds.width).toBeLessThanOrEqual(
      viewport.width,
    );
  });

  test('Verify responsive design on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    // On tablet, left navbar items should be visible
    await expect(
      page.locator('.theme-layout-navbar-left.navbar__items'),
    ).toBeVisible();
  });
});
