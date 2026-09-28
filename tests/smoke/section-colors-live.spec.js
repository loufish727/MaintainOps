const { navigateSection } = require('../helpers/workspace-navigation');
const { test, expect } = require('@playwright/test');

test('isolated QA: section colors follow real navigation, details and phone layouts', async ({ page, request }, testInfo) => {
  test.setTimeout(240000);
  page.setDefaultTimeout(15000);
  const host = 'https://fsxqrngpaseqdxijggcm.supabase.co';
  expect(process.env.LFES_SUPABASE_URL, 'Testing platform only').toBe(host);
  expect(new URL(process.env.MAINTAINOPS_BASE_URL).hostname).toBe('127.0.0.1');
  for (const key of ['LFES_ADMIN_EMAIL', 'LFES_ADMIN_PASSWORD', 'LFES_QA_COMPANY_ID']) expect(Boolean(process.env[key]), `${key} required`).toBe(true);
  const config = await (await request.get('/supabase-config.js')).text();
  expect(config).toContain(host);
  expect(config).not.toContain('lbphkzznvvumemdkqoay');
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => {
    if (route.request().url().includes('lbphkzznvvumemdkqoay')) {
      errors.push('Production connection blocked');
      return route.abort();
    }
    return route.continue();
  });
  await page.addInitScript(company => {
    localStorage.setItem('maintainops.activeCompanyId', company);
    localStorage.setItem('maintainops.performanceQuality', 'performance');
  }, process.env.LFES_QA_COMPANY_ID);
  await page.goto('/');
  await page.getByLabel('Email', { exact: true }).fill(process.env.LFES_ADMIN_EMAIL);
  await page.getByLabel('Password', { exact: true }).fill(process.env.LFES_ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Log In', exact: true }).click();
  await expect(page.locator('nav [data-section="mywork"]')).toBeVisible({ timeout: 45000 });
  const sections = await page.locator('.section-nav [data-section]').evaluateAll(nodes => nodes.map(node => node.dataset.section));
  expect(sections).toHaveLength(16);
  for (const section of sections) {
    await navigateSection(page, `${section}`);
    await expect(page.locator('body')).toHaveAttribute('data-ui-section', section);
    await expect(page.locator(`.section-nav [data-section="${section}"]`)).toHaveAttribute('aria-current', 'page');
    if (section === 'performance') {
      await expect(page.frameLocator('[data-platform-spatial-frame]').locator('html')).toHaveClass(/platform-spatial-ready/, { timeout: 60000 });
    } else {
      await expect(page.locator('[data-retry-feature]')).toHaveCount(0);
      await expect(page.locator('[data-traveling-units]').first()).toHaveCSS('color', 'rgb(119, 215, 255)');
      await expect(page.locator('.report-issue-button').first()).toHaveCSS('color', 'rgb(193, 203, 210)');
      await expect(page.locator('.topbar-location-switcher select').first()).toHaveCSS('color-scheme', 'dark');
      const heading = page.locator('#workspace-main .panel-header h2').first();
      if (await heading.count()) {
        const values = await heading.evaluate(node => {
          const active = document.querySelector('.section-nav .active .nav-icon');
          return [getComputedStyle(node).color, getComputedStyle(active).color];
        });
        expect(values[0], `${section} heading and menu accent`).toBe(values[1]);
      }
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${section} at ${width}px`).toBe(true);
      await page.screenshot({ path: testInfo.outputPath(`${section}-${width}.png`), fullPage: true });
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    if (section === 'performance') {
      await page.frameLocator('[data-platform-spatial-frame]').locator('[data-performance-exit]').click();
      await expect(page.locator('body')).toHaveAttribute('data-ui-section', 'mywork');
    }
  }
  await navigateSection(page, 'financial');
  await page.locator('[data-open-financial-asset]').first().click();
  await expect(page.locator('.financial-asset-form')).toBeVisible();
  const financialColors = await page.locator('.financial-action-button').evaluate(node => ({
    button: getComputedStyle(node).color, nav: getComputedStyle(document.querySelector('.nav-financial .nav-icon')).color,
  }));
  expect(financialColors.button).toBe(financialColors.nav);
  await page.screenshot({ path: testInfo.outputPath('financial-detail.png'), fullPage: true });
  await navigateSection(page, 'assets');
  await page.locator('.asset-card[data-asset-id]').first().click();
  await expect(page.locator('#back-to-equipment')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('equipment-detail.png'), fullPage: true });
  expect(errors).toEqual([]);
});
