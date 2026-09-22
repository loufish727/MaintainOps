const { expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const host = 'https://fsxqrngpaseqdxijggcm.supabase.co';
const directory = path.resolve('lfes-evidence/appwide');
const roles = ['admin', 'manager', 'technician', 'accounting', 'production'];

async function createQa(browser, request, testInfo) {
  if (process.env.LFES_APPWIDE_MUTATIONS !== '1') throw new Error('Explicit isolated app-wide QA opt-in is required.');
  expect(process.env.LFES_SUPABASE_URL).toBe(host);
  const baseURL = process.env.MAINTAINOPS_BASE_URL;
  expect(new URL(baseURL).hostname).toBe('127.0.0.1');
  const served = await request.get(`${baseURL}supabase-config.js`);
  const config = await served.text();
  expect(config).toContain(host);
  expect(config).not.toContain('lbphkzznvvumemdkqoay');
  const key = process.env.LFES_SUPABASE_ANON_KEY;
  const sessions = {};
  for (const role of roles) {
    const prefix = `LFES_${role.toUpperCase()}`;
    const response = await request.post(`${host}/auth/v1/token?grant_type=password`, {
      headers: { apikey: key }, data: { email: process.env[`${prefix}_EMAIL`], password: process.env[`${prefix}_PASSWORD`] },
    });
    expect(response.ok(), `${role} QA sign-in: HTTP ${response.status()}`).toBe(true);
    sessions[role] = await response.json();
  }
  const headers = role => ({ apikey: key, Authorization: `Bearer ${sessions[role].access_token}` });
  async function raw(role, method, resource, data) {
    return request.fetch(`${host}/rest/v1/${resource}`, {
      method, headers: { ...headers(role), Prefer: 'return=representation' }, data,
    });
  }
  async function api(role, method, resource, data) {
    const response = await raw(role, method, resource, data);
    expect(response.ok(), `${method} ${resource.split('?')[0]}: ${await response.text()}`).toBe(true);
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }
  const runId = randomUUID();
  const name = `LFES Appwide ${runId}`;
  const company = await api('admin', 'POST', 'rpc/create_company', { company_name: name });
  expect(company).toMatch(/^[0-9a-f-]{36}$/);
  fs.mkdirSync(directory, { recursive: true });
  const manifest = { runId, company, name, createdBy: sessions.admin.user.id, test: testInfo.title, browser: browser.browserType().name(), cleanup: 'REQUIRED', storageRemoved: [] };
  const manifestPath = path.join(directory, `${runId}.json`);
  const privateDirectory = path.resolve('LFES/private/appwide-fixtures');
  fs.mkdirSync(privateDirectory, { recursive: true });
  const save = () => {
    const contents = JSON.stringify(manifest, null, 2);
    fs.writeFileSync(manifestPath, contents);
    fs.writeFileSync(path.join(privateDirectory, `${runId}.json`), contents);
  };
  save();
  const contexts = [], errors = [];
  manifest.httpErrors = [];
  manifest.writes = [];
  const location = (await api('admin', 'GET', `locations?company_id=eq.${company}&select=id,name`))[0].id;
  const annex = (await api('admin', 'POST', 'locations', { company_id: company, name: 'Annex' }))[0].id;
  await api('admin', 'POST', 'company_members', roles.filter(r => r !== 'admin').map(role => ({ company_id: company, user_id: sessions[role].user.id, role, default_location_id: location })));
  for (const role of roles) {
    await api(role, 'POST', 'rpc/ensure_company_profile', { target_company_id: company });
    await api(role, 'PATCH', `profiles?company_id=eq.${company}&user_id=eq.${sessions[role].user.id}`, { full_name: `QA ${role}` });
  }
  expect(await api('admin', 'GET', `request_notification_recipients?company_id=eq.${company}&select=id`)).toEqual([]);
  async function open(role = 'admin', section = 'mywork', width = 1440) {
    const context = await browser.newContext({ baseURL, viewport: { width, height: 960 }, acceptDownloads: true });
    context.setDefaultTimeout(15000);
    contexts.push(context);
    // Explicit screenshots capture results without continuous 3D screencast overhead.
    await context.tracing.start({ screenshots: false, snapshots: true });
    await context.route('**/*', async route => {
      const url = route.request().url();
      if (url.includes('lbphkzznvvumemdkqoay')) { errors.push('Blocked production request'); await route.abort(); return; }
      // Delivery infrastructure is explicitly outside this isolated UI/mutation proof.
      if (url.includes('/functions/v1/')) { await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"sent":0,"qa_delivery_suppressed":true}' }); return; }
      await route.continue();
    });
    await context.addInitScript(({ session, company, location, section }) => {
      localStorage.setItem('sb-fsxqrngpaseqdxijggcm-auth-token', JSON.stringify(session));
      localStorage.setItem('maintainops.activeCompanyId', company);
      localStorage.setItem('maintainops.activeLocationId', location);
      localStorage.setItem(`maintainops.activeLocationId:v2:${session.user.id}:${company}`, location);
      localStorage.setItem('maintainops.activeSection', section);
    }, { session: sessions[role], company, location, section });
    const page = await context.newPage();
    page.on('request', req => {
      if (req.url().startsWith(host) && !['GET', 'HEAD', 'OPTIONS'].includes(req.method())) {
        manifest.writes.push({ role, method: req.method(), path: new URL(req.url()).pathname });
      }
    });
    page.on('response', async response => {
      if (response.url().startsWith(host) && response.status() >= 400) {
        manifest.httpErrors.push({ role, status: response.status(), path: new URL(response.url()).pathname, body: await response.text().catch(() => '') });
      }
    });
    let pending = 0, changed = Date.now();
    page.on('request', () => { pending++; changed = Date.now(); });
    const finished = () => { pending = Math.max(0, pending - 1); changed = Date.now(); };
    page.on('requestfinished', finished);
    page.on('requestfailed', finished);
    page.qaSettle = () => {
      const started = Date.now();
      return expect.poll(() => pending === 0 && Date.now() - Math.max(changed, started) >= 400, { timeout: 20000 }).toBe(true);
    };
    page.on('pageerror', error => errors.push(error.message));
    page.on('dialog', dialog => dialog.accept());
    await page.goto(baseURL);
    await expect(page.locator('[data-section="mywork"]')).toBeVisible({ timeout: 45000 });
    await page.qaSettle();
    if (section !== 'mywork') await nav(page, section);
    return page;
  }
  async function seed(table, values) {
    return (await api('admin', 'POST', table, { company_id: company, ...values }))[0];
  }
  async function openPublic(token) {
    const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 } });
    context.setDefaultTimeout(15000);
    contexts.push(context);
    await context.route('**/*', async route => {
      const url = route.request().url();
      if (url.includes('lbphkzznvvumemdkqoay')) { errors.push('Blocked production request'); return route.abort(); }
      if (url.includes('/functions/v1/')) return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"sent":0}' });
      return route.continue();
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${baseURL}?request=${encodeURIComponent(token)}`);
    return page;
  }
  async function shot(page, label) { await page.screenshot({ path: path.join(directory, `${runId}-${label}.png`), fullPage: true }); }
  async function finish() {
    for (const [index, context] of contexts.entries()) {
      for (const page of context.pages()) {
        if (!page.isClosed()) await shot(page, `final-${index}`).catch(() => {});
      }
      await context.tracing.stop({ path: path.join(directory, `${runId}-${index}-trace.zip`) }).catch(() => {});
      await context.close().catch(() => {});
    }
    for (const bucket of ['work-order-photos', 'asset-documents', 'part-documents', 'maintenance-request-photos', 'company-logos']) {
      const pending = [company];
      let visited = 0;
      while (pending.length) {
        if (++visited > 100) throw new Error('QA storage cleanup exceeded bounded directory count');
        const prefix = pending.shift();
        expect(prefix === company || prefix.startsWith(`${company}/`)).toBe(true);
        const response = await request.post(`${host}/storage/v1/object/list/${bucket}`, { headers: headers('admin'), data: { prefix, limit: 100, offset: 0 } });
        expect(response.ok(), `QA storage listing ${bucket}: HTTP ${response.status()}`).toBe(true);
        const rows = await response.json();
        expect(rows.length).toBeLessThan(100);
        const files = [];
        for (const row of rows) { if (row.id) files.push(`${prefix}/${row.name}`); else pending.push(`${prefix}/${row.name}`); }
        if (files.length) {
          const removed = await request.delete(`${host}/storage/v1/object/${bucket}`, { headers: headers('admin'), data: { prefixes: files } });
          expect(removed.ok(), `Remove only ${bucket}/${company} QA files`).toBe(true);
          expect(await removed.json()).toHaveLength(files.length);
          manifest.storageRemoved.push({ bucket, paths: files });
        }
      }
    }
    manifest.errors = errors;
    manifest.result = 'Cleanup inspected; use Playwright result for test outcome';
    save();
    expect(errors, 'Unexpected application errors or production requests').toEqual([]);
  }
  return { api, raw, open, openPublic, seed, shot, finish, company, location, annex, sessions, manifest, save };
}

async function nav(page, section) {
  await page.qaSettle();
  const spatial = page.locator('[data-platform-spatial-frame]');
  if (await spatial.count()) {
    await page.frameLocator('[data-platform-spatial-frame]').locator('[data-performance-exit]').click({ timeout: 45000 });
    await expect(spatial).toHaveCount(0);
  }
  await page.locator(`[data-section="${section}"]`).click();
  await expect(page.locator('#workspace-main')).toBeVisible();
  await page.qaSettle();
}

async function expandFor(locator) {
  await locator.page().qaSettle();
  const parents = locator.locator('xpath=ancestor::details');
  for (let index = 0; index < await parents.count(); index++) {
    const parent = parents.nth(index);
    if (!await parent.getAttribute('open').then(value => value !== null)) await parent.locator(':scope > summary').click();
  }
}

module.exports = { createQa, nav, expandFor, roles };
