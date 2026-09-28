const { test, expect } = require('@playwright/test');
const { createQa, nav } = require('../helpers/appwide-qa');

for (const width of [1440, 390]) test(`navigation preserves an unfinished equipment form at ${width}px`, async ({ browser, request }, testInfo) => {
  test.setTimeout(120000);
  const qa = await createQa(browser, request, testInfo);
  try {
    const page = await qa.open('admin', 'assets', width);
    const form = page.locator('#create-asset-form');
    const values = { name: 'Unsubmitted QA draft', manufacturer: 'Draft maker', model: 'Draft model', asset_code: 'SN-123' };
    for (const [field, value] of Object.entries(values)) await form.locator(`[name=${field}]`).fill(value);
    const original = await form.locator('[name=name]').elementHandle();
    const requests = [];
    page.on('request', request => requests.push(request.url()));
    for (const group of ['work', 'team', 'settings', 'assets']) {
      await page.locator(`[data-nav-group="${group}"] > summary`).click();
      await expect(page.locator(`[data-nav-group="${group}"] > summary`)).toHaveAttribute('aria-expanded', 'true');
      for (const [field, value] of Object.entries(values)) await expect(form.locator(`[name=${field}]`)).toHaveValue(value);
      expect(await original.evaluate(node => node === document.querySelector('#create-asset-form [name=name]'))).toBe(true);
      await expect(page.locator('body')).toHaveAttribute('data-ui-section', 'assets');
    }
    expect(requests.filter(url => url.includes('/rest/v1/'))).toEqual([]);
    await nav(page, 'mywork');
    await nav(page, 'assets');
    for (const [field, value] of Object.entries(values)) await expect(form.locator(`[name=${field}]`)).toHaveValue(value);
    await page.reload();
    for (const [field, value] of Object.entries(values)) await expect(form.locator(`[name=${field}]`)).toHaveValue(value);
    expect(await qa.api('admin', 'GET', `assets?company_id=eq.${qa.company}&select=id`)).toEqual([]);
    await qa.shot(page, 'draft-intact');
  } finally { await qa.finish(); }
});
