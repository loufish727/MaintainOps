const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');

for (const width of [1440, 390]) test(`unfinished equipment survives scrolling, redraws and reloads at ${width}px`, async ({ browser, request }) => {
  test.setTimeout(120000);
  const host = 'https://fsxqrngpaseqdxijggcm.supabase.co', company = process.env.LFES_QA_COMPANY_ID;
  expect(process.env.LFES_EQUIPMENT_DRAFT_MUTATIONS).toBe('1');
  expect(process.env.LFES_SUPABASE_URL).toBe(host);
  expect(company).toBe('0d6fd8f1-428d-4192-8176-48943e3ec119');
  const baseURL = process.env.MAINTAINOPS_BASE_URL, key = process.env.LFES_SUPABASE_ANON_KEY;
  expect(new URL(baseURL).hostname).toBe('127.0.0.1');
  const config = await (await request.get(`${baseURL}supabase-config.js`)).text();
  expect(config).toContain(host); expect(config).not.toContain('lbphkzznvvumemdkqoay');
  const auth = await request.post(`${host}/auth/v1/token?grant_type=password`, {
    headers: { apikey: key }, data: { email: process.env.LFES_ADMIN_EMAIL, password: process.env.LFES_ADMIN_PASSWORD },
  });
  expect(auth.ok()).toBe(true);
  const session = await auth.json(), name = `LFES Equipment Draft ${randomUUID()}`;
  async function api(method, resource) {
    const response = await request.fetch(`${host}/rest/v1/${resource}`, { method,
      headers: { apikey: key, Authorization: `Bearer ${session.access_token}`, Prefer: 'return=representation' } });
    expect(response.ok(), `${method}: ${await response.text()}`).toBe(true);
    return response.json();
  }
  const assets = () => api('GET', `assets?company_id=eq.${company}&name=eq.${encodeURIComponent(name)}&select=*`);
  const context = await browser.newContext({ baseURL, viewport: { width, height: 900 }, hasTouch: width < 500, isMobile: width < 500 });
  const errors = [], writes = [];
  await context.route('https://lbphkzznvvumemdkqoay.supabase.co/**', route => { errors.push('Production request'); return route.abort(); });
  await context.addInitScript(({ session, company, location }) => {
    localStorage.setItem('sb-fsxqrngpaseqdxijggcm-auth-token', JSON.stringify(session));
    localStorage.setItem('maintainops.activeCompanyId', company);
    localStorage.setItem(`maintainops.activeLocationId:v2:${session.user.id}:${company}`, location);
    localStorage.setItem('maintainops.activeSection', 'assets');
  }, { session, company, location: process.env.LFES_QA_LOCATION_ID });
  const page = await context.newPage(); page.on('pageerror', error => errors.push(error.message));
  page.on('request', req => { if (req.method() === 'POST' && new URL(req.url()).pathname === '/rest/v1/assets') writes.push(req.url()); });
  const form = page.locator('#create-asset-form');
  const values = { name, asset_code: 'SERIAL-0007', asset_tag: '0007-<tag>', manufacturer: 'Draft Maker', model: 'DX-9', location_new: 'QA Draft Bay' };
  async function fieldsIntact() {
    for (const [field, value] of Object.entries(values)) await expect(form.locator(`[name=${field}]`)).toHaveValue(value);
    await expect(form.locator('[name=asset_type]')).toHaveValue('shop_item');
    await expect(form.locator('[name=safety_devices_required]')).not.toBeChecked();
  }
  try {
    await page.goto(baseURL);
    await expect(form).toBeVisible({ timeout: 45000 });
    for (const [field, value] of Object.entries(values)) await form.locator(`[name=${field}]`).fill(value);
    await form.locator('[name=asset_type]').selectOption('shop_item');
    await form.locator('[name=safety_devices_required]').uncheck();
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await page.evaluate(() => scrollTo(0, 0));
    await fieldsIntact();
    // Inventory filtering rebuilds the same equipment page without submitting its form.
    await page.locator('[data-asset-status-filter]').first().click();
    await fieldsIntact();
    await page.locator('[data-section=mywork]').click();
    await page.locator('[data-section=assets]').click();
    await fieldsIntact();
    await page.reload();
    await fieldsIntact();
    expect(writes).toHaveLength(0);
    await page.screenshot({ path: `lfes-evidence/equipment-draft-${browser.browserType().name()}-${width}.png`, fullPage: true });

    await page.route(`${host}/rest/v1/assets?**`, route => route.request().method() === 'POST'
      ? route.fulfill({ status: 503, contentType: 'application/json', body: '{"message":"QA save unavailable"}' }) : route.continue());
    await form.getByRole('button', { name: 'Add Equipment', exact: true }).click();
    await expect(page.locator('#asset-create-error')).toContainText('QA save unavailable');
    await fieldsIntact();
    expect(await assets()).toEqual([]);
    await page.unroute(`${host}/rest/v1/assets?**`);
    await page.reload();
    await fieldsIntact();
    await form.getByRole('button', { name: 'Add Equipment', exact: true }).click();
    await expect.poll(async () => (await assets()).length).toBe(1);
    expect((await assets())[0]).toMatchObject({ asset_code: values.asset_code, asset_tag: values.asset_tag,
      manufacturer: values.manufacturer, model: values.model, location: values.location_new, asset_type: 'shop_item', safety_devices_required: false });
    await expect(form.locator('[name=name]')).toHaveValue('');
    await page.reload();
    await expect(form.locator('[name=name]')).toHaveValue('');
    await form.locator('[name=name]').fill('Discard this unsaved draft');
    await form.getByRole('button', { name: 'Clear Form', exact: true }).click();
    await page.reload();
    await expect(form.locator('[name=name]')).toHaveValue('');
    await form.locator('[name=name]').fill(name);
    await form.locator('[name=manufacturer]').fill('Save and continue');
    await form.getByRole('button', { name: 'Save Equipment and Continue', exact: true }).click();
    await expect(page.locator('#edit-asset-form [name=manufacturer]')).toHaveValue('Save and continue');
    expect(await assets()).toHaveLength(2);
    await page.locator('#back-to-equipment').click();
    await expect(form.locator('[name=name]')).toHaveValue('');
    expect(errors).toEqual([]);
  } finally {
    await context.close();
    for (const asset of await assets()) {
      await api('DELETE', `assets?company_id=eq.${company}&id=eq.${asset.id}`);
      await api('DELETE', `asset_financials?company_id=eq.${company}&archived_asset_id=eq.${asset.id}`);
    }
    expect(await assets()).toEqual([]);
  }
});
