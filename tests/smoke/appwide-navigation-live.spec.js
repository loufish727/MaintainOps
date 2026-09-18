const { test, expect } = require('@playwright/test');
const { createQa, nav, roles } = require('../helpers/appwide-qa');
test.setTimeout(240000);

for (const role of roles) test(`${role}: every permitted tab opens at desktop and phone widths`, async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const common = ['mywork', 'work', 'planning', 'requests', 'assets', 'pm', 'procedures', 'parts', 'conversions', 'messages', 'team', 'performance'];
    qa.manifest.tabChecks = [];
      const page = await qa.open(role);
      // Role/navigation coverage uses Efficient mode on the software-rendered test host.
      // The separate Full Strict spatial tests exercise Auto and Ultra with pixel checks.
      await page.evaluate(() => localStorage.setItem('maintainops.performanceQuality', 'performance'));
      const expected = [...common];
      if (['admin', 'manager', 'accounting'].includes(role)) expected.push('financial');
      if (['admin', 'manager'].includes(role)) expected.push('setup', 'settings');
      if (role === 'admin') expected.push('manager');
      expect(await page.locator('nav [data-section]').evaluateAll(elements => elements.map(element => element.dataset.section).sort())).toEqual(expected.sort());
      for (const section of expected) {
        await nav(page, section);
        await expect(page.locator(`[data-section="${section}"]`)).toHaveAttribute('aria-current', 'page');
        await expect(page.locator('#workspace-main')).not.toBeEmpty();
        await expect(page.locator('[data-retry-feature]')).toHaveCount(0);
        if (section === 'performance') {
          await expect(page.locator('iframe')).toHaveCount(1);
          await expect(page.frameLocator('[data-platform-spatial-frame]').locator('html')).toHaveClass(/platform-spatial-ready/, { timeout: 45000 });
        }
        for (const width of [1440, 390]) {
          await page.setViewportSize({ width, height: width === 390 ? 844 : 960 });
          const dimensions = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: innerWidth }));
          expect(dimensions.content, `${role}/${section} horizontal overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 2);
          qa.manifest.tabChecks.push({ role, section, width, overflow: dimensions.content - dimensions.viewport });
          qa.save();
        }
        await page.setViewportSize({ width: 1440, height: 960 });
      }
      await page.close();
    expect(qa.manifest.httpErrors).toEqual([]);
  } finally { await qa.finish(); }
});
