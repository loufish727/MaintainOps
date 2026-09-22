const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');

test.setTimeout(180000);

test('equipment tag persists independently through create, edit, clear, search, export and financial retention', async ({ browser, request }) => {
  const host = 'https://fsxqrngpaseqdxijggcm.supabase.co';
  expect(process.env.LFES_EQUIPMENT_TAG_MUTATIONS, 'Explicit isolated QA opt-in').toBe('1');
  expect(process.env.LFES_SUPABASE_URL).toBe(host);
  const company = process.env.LFES_QA_COMPANY_ID;
  expect(company).toBe('0d6fd8f1-428d-4192-8176-48943e3ec119');
  const baseURL = process.env.MAINTAINOPS_BASE_URL;
  expect(new URL(baseURL).hostname).toBe('127.0.0.1');
  const config = await (await request.get(`${baseURL}supabase-config.js`)).text();
  expect(config).toContain(host);
  expect(config).not.toContain('lbphkzznvvumemdkqoay');
  const key = process.env.LFES_SUPABASE_ANON_KEY;
  const sessions = {}, contexts = [], errors = [];
  for (const role of ['admin', 'technician', 'accounting']) {
    const response = await request.post(`${host}/auth/v1/token?grant_type=password`, {
      headers: { apikey: key }, data: { email: process.env[`LFES_${role.toUpperCase()}_EMAIL`], password: process.env[`LFES_${role.toUpperCase()}_PASSWORD`] },
    });
    expect(response.ok(), `${role} QA sign-in`).toBe(true);
    sessions[role] = await response.json();
  }
  async function api(role, method, table, data) {
    const response = await request.fetch(`${host}/rest/v1/${table}`, {
      method, data, headers: { apikey: key, Authorization: `Bearer ${sessions[role].access_token}`, Prefer: 'return=representation' },
    });
    expect(response.ok(), `${method} ${table}: ${await response.text()}`).toBe(true);
    return response.json();
  }
  async function open(role, width) {
    const context = await browser.newContext({ baseURL, viewport: { width, height: 900 }, acceptDownloads: true });
    contexts.push(context);
    await context.route('https://lbphkzznvvumemdkqoay.supabase.co/**', route => { errors.push('Production request'); return route.abort(); });
    await context.addInitScript(({ session, company, location }) => {
      localStorage.setItem('sb-fsxqrngpaseqdxijggcm-auth-token', JSON.stringify(session));
      localStorage.setItem('maintainops.activeCompanyId', company);
      localStorage.setItem(`maintainops.activeLocationId:v2:${session.user.id}:${company}`, location);
      localStorage.setItem('maintainops.activeSection', 'assets');
    }, { session: sessions[role], company, location: process.env.LFES_QA_LOCATION_ID });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(baseURL);
    await expect(page.locator('[data-section=assets]')).toBeVisible({ timeout: 45000 });
    await page.locator('[data-section=assets]').click();
    return page;
  }
  async function noOverflow(page) {
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    const tag = page.locator('[name=asset_tag]').first();
    if (await tag.isVisible()) {
      const rect = await tag.boundingBox();
      expect(rect.x).toBeGreaterThanOrEqual(0);
      expect(rect.x + rect.width).toBeLessThanOrEqual(page.viewportSize().width + 1);
    }
  }
  const name = `LFES Equipment Tag ${randomUUID()}`;
  const tag = `0007-${randomUUID()}`;
  let assetId;
  const assets = () => api('admin', 'GET', `assets?company_id=eq.${company}&name=eq.${encodeURIComponent(name)}&select=*`);
  try {
    const page = await open('admin', 1440);
    const create = page.locator('#create-asset-form');
    await create.locator('[name=name]').fill(name);
    await create.locator('[name=asset_code]').fill('SERIAL-0001');
    await create.getByRole('textbox', { name: 'Asset tag', exact: true }).fill(`  ${tag}  `);
    await noOverflow(page);
    await create.getByRole('button', { name: 'Add Equipment', exact: true }).click();
    await expect.poll(async () => (await assets()).length).toBe(1);
    const asset = (await assets())[0]; assetId = asset.id;
    expect(asset).toMatchObject({ asset_tag: tag, asset_code: 'SERIAL-0001' });
    await expect(page.locator(`[data-asset-id="${assetId}"]`)).toContainText(`Asset tag: ${tag}`);
    await page.screenshot({ path: `lfes-evidence/equipment-tag-${browser.browserType().name()}-desktop.png`, fullPage: true });
    await api('admin', 'POST', 'asset_financials', { company_id: company, asset_id: assetId, asset_tag: 'FIXED-99' });

    const mobile = await open('technician', 390);
    await mobile.locator(`[data-asset-id="${assetId}"]`).click();
    const edit = mobile.locator('#edit-asset-form');
    await expect(edit.locator('[name=asset_tag]')).toHaveValue(tag);
    const revised = `${tag}-B`;
    await edit.locator('[name=asset_tag]').fill(revised);
    await edit.getByRole('button', { name: 'Save Equipment', exact: true }).click();
    await expect.poll(async () => (await assets())[0].asset_tag).toBe(revised);
    await mobile.reload();
    if (!await edit.isVisible()) await mobile.locator(`[data-asset-id="${assetId}"]`).click();
    await expect(edit.locator('[name=asset_tag]')).toHaveValue(revised);
    await noOverflow(mobile);
    await mobile.screenshot({ path: `lfes-evidence/equipment-tag-${browser.browserType().name()}-mobile.png`, fullPage: true });
    await edit.locator('[name=asset_tag]').fill('   ');
    await edit.getByRole('button', { name: 'Save Equipment', exact: true }).click();
    await expect.poll(async () => (await assets())[0].asset_tag).toBe(null);
    await expect(edit.locator('[name=asset_tag]')).toHaveValue('');
    await edit.locator('[name=asset_tag]').fill(revised);
    await edit.getByRole('button', { name: 'Save Equipment', exact: true }).click();
    await expect.poll(async () => (await assets())[0].asset_tag).toBe(revised);
    expect((await assets())[0].asset_code).toBe('SERIAL-0001');
    const events = await api('admin', 'GET', `asset_events?asset_id=eq.${assetId}&company_id=eq.${company}&select=summary`);
    expect(events.filter(event => event.summary.includes('asset tag')).length).toBe(3);

    await page.reload();
    await page.locator('.workspace-search-input:visible').fill(revised);
    await expect(page.locator('[data-search-asset]')).toHaveCount(1);
    await expect(page.locator(`[data-search-asset="${assetId}"]`)).toContainText(name);
    await expect(page.locator(`[data-search-asset="${assetId}"]`)).toContainText(revised);
    await page.locator('.workspace-search-input:visible').fill('');
    await expect(page.locator('.global-search-panel')).toHaveCount(0);
    const exportButton = page.locator('[data-command-action=export-csv]').filter({ visible: true });
    if (!await exportButton.count()) await page.locator('.topbar-more:visible > summary').click();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('[data-command-action=export-csv]:visible').click();
    const stream = await (await downloadPromise).createReadStream();
    const chunks = []; for await (const chunk of stream) chunks.push(chunk);
    const csv = Buffer.concat(chunks).toString('utf8');
    expect(csv).toContain('serial_number,asset_tag,manufacturer');
    expect(csv).toContain(revised);

    const accounting = await open('accounting', 1440);
    await accounting.locator(`[data-asset-id="${assetId}"]`).click();
    await expect(accounting.locator('#edit-asset-form')).toHaveCount(0);
    await expect(accounting.locator('#workspace-main')).toContainText(`Asset tag: ${revised}`);
    expect(await api('accounting', 'PATCH', `assets?id=eq.${assetId}&company_id=eq.${company}`, { asset_tag: 'DENIED' })).toEqual([]);
    await api('admin', 'DELETE', `assets?id=eq.${assetId}&company_id=eq.${company}`);
    const finance = (await api('admin', 'GET', `asset_financials?archived_asset_id=eq.${assetId}&company_id=eq.${company}&select=*`))[0];
    expect(finance).toMatchObject({ asset_id: null, archived_asset_tag: revised, archived_asset_code: 'SERIAL-0001', asset_tag: 'FIXED-99' });
    await accounting.reload();
    await accounting.locator('[data-section=financial]').click();
    await expect(accounting.locator('[data-open-financial-asset]').first()).toBeVisible();
    const retained = accounting.locator(`[data-open-financial-asset="financial:${finance.id}"]`);
    for (let i = 0; i < 20 && !await retained.count(); i++) {
      const next = accounting.locator('[data-financial-page=next]');
      if (!await next.count() || !await next.isEnabled()) break;
      await next.click();
    }
    await expect(retained).toContainText(`Equipment asset tag: ${revised}`);
    expect(errors).toEqual([]);
  } finally {
    for (const context of contexts) await context.close();
    // Only this run's uniquely named fixture and its retained financial row.
    for (const asset of await assets()) {
      assetId = asset.id;
      await api('admin', 'DELETE', `assets?id=eq.${asset.id}&company_id=eq.${company}`);
    }
    if (assetId) {
      await api('admin', 'DELETE', `asset_financials?archived_asset_id=eq.${assetId}&company_id=eq.${company}`);
      expect(await api('admin', 'GET', `asset_financials?archived_asset_id=eq.${assetId}&company_id=eq.${company}&select=id`)).toEqual([]);
    }
    expect(await assets()).toEqual([]);
  }
});
