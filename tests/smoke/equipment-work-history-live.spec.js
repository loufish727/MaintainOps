const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');

test.setTimeout(180000);
test('equipment counts are exact before expansion, preserve input and scroll, and paginate history', async ({ browser, request }) => {
  const host = 'https://fsxqrngpaseqdxijggcm.supabase.co';
  expect(process.env.LFES_EQUIPMENT_HISTORY_MUTATIONS).toBe('1');
  expect(process.env.LFES_SUPABASE_URL).toBe(host);
  const company = process.env.LFES_QA_COMPANY_ID, location = process.env.LFES_QA_LOCATION_ID;
  expect(company).toBe('0d6fd8f1-428d-4192-8176-48943e3ec119');
  const baseURL = process.env.MAINTAINOPS_BASE_URL;
  expect(new URL(baseURL).hostname).toBe('127.0.0.1');
  const config = await (await request.get(`${baseURL}supabase-config.js`)).text();
  expect(config).toContain(host); expect(config).not.toContain('lbphkzznvvumemdkqoay');
  const key = process.env.LFES_SUPABASE_ANON_KEY;
  const auth = await request.post(`${host}/auth/v1/token?grant_type=password`, {
    headers: { apikey: key }, data: { email: process.env.LFES_ADMIN_EMAIL, password: process.env.LFES_ADMIN_PASSWORD },
  });
  expect(auth.ok()).toBe(true);
  const session = await auth.json();
  async function api(method, resource, data) {
    const response = await request.fetch(`${host}/rest/v1/${resource}`, {
      method, data, headers: { apikey: key, Authorization: `Bearer ${session.access_token}`, Prefer: 'return=representation' },
    });
    expect(response.ok(), `${method} ${resource.split('?')[0]}: ${await response.text()}`).toBe(true);
    const text = await response.text(); return text ? JSON.parse(text) : [];
  }
  const assetId = randomUUID(), emptyId = randomUUID(), name = `LFES History ${randomUUID()}`;
  const contexts = [], errors = [];
  function completed(index) {
    return { company_id: company, location_id: location, asset_id: assetId, title: `${name} ${index}`,
      status: 'completed', type: 'corrective', priority: 'medium', created_by: session.user.id,
      completed_at: new Date().toISOString(), resolution_summary: 'Isolated history count test', actual_minutes: 5,
      safety_check_required: false, safety_devices_checked: false };
  }
  async function open(width) {
    const context = await browser.newContext({ baseURL, viewport: { width, height: 900 } }); contexts.push(context);
    await context.route('https://lbphkzznvvumemdkqoay.supabase.co/**', route => { errors.push('Production request'); return route.abort(); });
    await context.addInitScript(({ session, company, location }) => {
      localStorage.setItem('sb-fsxqrngpaseqdxijggcm-auth-token', JSON.stringify(session));
      localStorage.setItem('maintainops.activeCompanyId', company);
      localStorage.setItem(`maintainops.activeLocationId:v2:${session.user.id}:${company}`, location);
      localStorage.setItem('maintainops.activeSection', 'assets');
    }, { session, company, location });
    const page = await context.newPage(); page.on('pageerror', e => errors.push(e.message));
    await page.goto(baseURL);
    await expect(page.locator('[data-section=assets]')).toBeVisible({ timeout: 45000 });
    await page.locator('[data-section=assets]').click();
    return page;
  }
  const panel = page => page.locator('[data-asset-relationship-section="completed-history"]');
  const badge = page => panel(page).locator('summary [data-work-count-kind=completed]');
  async function select(page, id) {
    await page.locator('[data-section=assets]').click();
    await page.locator(`[data-asset-id="${id}"]`).first().click();
    await expect(page.locator('#edit-asset-form')).toBeVisible();
  }
  try {
    await api('POST', 'assets', [assetId, emptyId].map((id, index) => ({ id, company_id: company, location_id: location,
      name: `${name}${index ? ' Empty' : ''}`, asset_type: 'machine', created_by: session.user.id, safety_devices_required: false })));
    await api('POST', 'work_orders', [completed(1), completed(2)]);
    for (const width of [1440, 390]) {
      const page = await open(width);
      const reads = [];
      let releaseCounts;
      const waitCounts = new Promise(resolve => { releaseCounts = resolve; });
      await page.route(`${host}/rest/v1/work_orders?**`, async route => {
        const req = route.request(), url = new URL(req.url());
        if (url.searchParams.get('asset_id') === `eq.${assetId}`) {
          reads.push(req.method());
          if (req.method() === 'HEAD') await waitCounts;
        }
        await route.continue();
      });
      await select(page, assetId);
      await expect(badge(page)).toHaveText('Loading...');
      await expect.poll(() => reads.filter(method => method === 'HEAD').length).toBe(2);
      const input = page.locator('#edit-asset-form [name=name]');
      await input.fill(`${name} unsaved`);
      await input.evaluate(node => { node.dataset.countTest = 'same-node'; });
      const scroll = await page.evaluate(() => scrollY);
      releaseCounts();
      await expect(badge(page)).toHaveText('2');
      await expect(input).toHaveValue(`${name} unsaved`);
      await expect(input).toHaveAttribute('data-count-test', 'same-node');
      expect(Math.abs(await page.evaluate(() => scrollY) - scroll)).toBeLessThan(3);
      expect(reads.filter(method => method === 'GET')).toHaveLength(0);
      await input.fill(name);
      await panel(page).locator('summary').click();
      await expect(panel(page).locator('.mini-list article')).toHaveCount(2);
      await expect(badge(page)).toHaveText('2');
      expect(reads.filter(method => method === 'GET')).toHaveLength(1);
      await page.screenshot({ path: `lfes-evidence/equipment-history-${browser.browserType().name()}-${width}.png`, fullPage: true });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await select(page, emptyId);
      await expect(badge(page)).toHaveText('0');
      await panel(page).locator('summary').click();
      await expect(panel(page)).toContainText('No completed work yet.');
      await page.close();
    }
    await api('POST', 'work_orders', Array.from({ length: 11 }, (_, i) => completed(i + 3)));
    const page = await open(390);
    await page.route(`${host}/rest/v1/work_orders?**`, route => {
      const req = route.request();
      if (req.method() === 'HEAD' && new URL(req.url()).searchParams.get('asset_id') === `eq.${assetId}`) {
        return route.fulfill({ status: 503, body: '' });
      }
      return route.continue();
    });
    await select(page, assetId);
    await expect(badge(page)).toHaveText('Unavailable');
    await panel(page).locator('summary').click();
    await expect(badge(page)).toHaveText('13');
    await expect(panel(page).locator('.mini-list article')).toHaveCount(12);
    await expect(panel(page)).toContainText('Showing 1-12 of 13');
    await panel(page).locator('[data-asset-relation-page=next]').click();
    await expect(panel(page).locator('.mini-list article')).toHaveCount(1);
    await expect(panel(page)).toContainText('Showing 13-13 of 13');
    await panel(page).locator('[data-asset-relation-page=prev]').click();
    await expect(panel(page).locator('.mini-list article')).toHaveCount(12);
    expect(errors).toEqual([]);
  } finally {
    for (const context of contexts) await context.close();
    // Exact fixture UUIDs in the isolated QA company only; no existing records are touched.
    await api('DELETE', `work_orders?company_id=eq.${company}&asset_id=eq.${assetId}`);
    for (const id of [assetId, emptyId]) {
      await api('DELETE', `assets?company_id=eq.${company}&id=eq.${id}`);
      await api('DELETE', `asset_financials?company_id=eq.${company}&archived_asset_id=eq.${id}`);
      expect(await api('GET', `assets?company_id=eq.${company}&id=eq.${id}&select=id`)).toEqual([]);
    }
    expect(await api('GET', `work_orders?company_id=eq.${company}&asset_id=eq.${assetId}&select=id`)).toEqual([]);
  }
});
