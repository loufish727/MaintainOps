const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');

const QA_HOST = 'https://fsxqrngpaseqdxijggcm.supabase.co';
const QA_COMPANY = '0d6fd8f1-428d-4192-8176-48943e3ec119';
const LOCAL_ORIGIN = 'http://127.0.0.1:4203';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

test.describe.configure({ mode: 'serial', retries: 0 });
test.use({ trace: 'off', video: 'off', actionTimeout: 15000, navigationTimeout: 30000 });
test.setTimeout(600000);

async function fixture({ browser, request }, width) {
  // All guards precede authentication and fixture writes. Never substitute production credentials.
  expect(process.env.LFES_PM_LIFECYCLE_MUTATIONS).toBe('1');
  expect(process.env.LFES_SUPABASE_URL).toBe(QA_HOST);
  expect(process.env.LFES_QA_COMPANY_ID).toBe(QA_COMPANY);
  const base = new URL(process.env.MAINTAINOPS_BASE_URL);
  expect(base.origin).toBe(LOCAL_ORIGIN);
  expect(base.pathname).toBe('/');
  expect(base.search + base.hash + base.username + base.password).toBe('');
  const location = process.env.LFES_QA_LOCATION_ID;
  expect(UUID.test(location || '')).toBe(true);
  for (const name of ['LFES_SUPABASE_ANON_KEY', 'LFES_ADMIN_EMAIL', 'LFES_ADMIN_PASSWORD']) {
    expect(Boolean(process.env[name]), `${name} must be supplied by the isolated runner`).toBe(true);
  }
  const configResponse = await request.get(new URL('supabase-config.js', base).href, { maxRedirects: 0 });
  expect(configResponse.ok()).toBe(true);
  const config = await configResponse.text();
  expect(config.includes(QA_HOST), 'Local app must point to the allowlisted QA backend').toBe(true);
  expect(config.includes('lbphkzznvvumemdkqoay'), 'Production backend must never be configured').toBe(false);
  const key = process.env.LFES_SUPABASE_ANON_KEY;
  const auth = await request.post(`${QA_HOST}/auth/v1/token?grant_type=password`, {
    maxRedirects: 0,
    headers: { apikey: key },
    data: { email: process.env.LFES_ADMIN_EMAIL, password: process.env.LFES_ADMIN_PASSWORD },
  });
  expect(auth.ok(), `Isolated QA authentication status ${auth.status()}`).toBe(true);
  const session = await auth.json();
  expect(UUID.test(session.user?.id || '')).toBe(true);
  const prefix = `LFES PM ${randomUUID()}`;
  const ids = Object.fromEntries(['assets', 'procedure_templates', 'procedure_steps', 'preventive_schedules', 'work_orders']
    .map(table => [table, new Set()]));
  const names = { procedure_templates: new Set(), preventive_schedules: new Set() };
  const contexts = [], errors = [], suppressed = [];
  const readSettlers = new WeakMap();
  let failNextTable = '';
  const rows = data => Array.isArray(data) ? data : [data];
  const ownName = name => typeof name === 'string' && name.startsWith(prefix);
  const ownFilter = (url, column, owned) => {
    const filter = url.searchParams.get(column) || '';
    return filter.startsWith('eq.') && owned.has(filter.slice(3));
  };

  function allowedWrite(method, url, data) {
    const table = url.pathname.replace('/rest/v1/', '');
    if (table === 'rpc/generate_preventive_work_order') {
      return method === 'POST' && data?.p_company_id === QA_COMPANY
        && ids.preventive_schedules.has(data.p_schedule_id) && /^\d{4}-\d{2}-\d{2}$/.test(data.p_expected_due_at);
    }
    if (method === 'POST') return rows(data).every(row => {
      if (!row || row.company_id !== QA_COMPANY) return false;
      if (table === 'assets') return ids.assets.has(row.id) && ownName(row.name);
      if (table === 'procedure_templates') return names.procedure_templates.has(row.name);
      if (table === 'procedure_steps') return ids.procedure_templates.has(row.procedure_template_id) && ownName(row.prompt);
      if (table === 'preventive_schedules') return names.preventive_schedules.has(row.title) && ids.assets.has(row.asset_id)
        && (!row.procedure_template_id || ids.procedure_templates.has(row.procedure_template_id));
      if (table === 'work_orders') return ids.assets.has(row.asset_id) && ownName(row.title)
        && (!row.procedure_template_id || ids.procedure_templates.has(row.procedure_template_id));
      if (table === 'work_order_step_results') return ids.work_orders.has(row.work_order_id) && ids.procedure_steps.has(row.procedure_step_id);
      if (['work_order_events', 'work_order_comments'].includes(table)) return ids.work_orders.has(row.work_order_id);
      return false;
    });
    if (!['PATCH', 'DELETE'].includes(method) || url.searchParams.get('company_id') !== `eq.${QA_COMPANY}`) return false;
    if (ids[table]) return ownFilter(url, 'id', ids[table]);
    if (table === 'work_order_step_results') return method === 'PATCH'
      && ownFilter(url, 'work_order_id', ids.work_orders) && ownFilter(url, 'procedure_step_id', ids.procedure_steps);
    if (table === 'asset_financials') return method === 'DELETE'
      && (ownFilter(url, 'archived_asset_id', ids.assets) || ownFilter(url, 'asset_id', ids.assets));
    return false;
  }

  async function api(method, resource, data) {
    const url = new URL(`${QA_HOST}/rest/v1/${resource}`);
    if (!['GET', 'HEAD'].includes(method)) {
      expect(allowedWrite(method, url, data), `Refuse non-fixture ${method} ${url.pathname}`).toBe(true);
    } else {
      expect(url.searchParams.get('company_id'), 'Fixture reads must remain company-scoped').toBe(`eq.${QA_COMPANY}`);
    }
    const response = await request.fetch(url.href, { method, data, maxRedirects: 0,
      headers: { apikey: key, Authorization: `Bearer ${session.access_token}`, Prefer: 'return=representation' } });
    expect(response.ok(), `${method} ${url.pathname}: ${await response.text()}`).toBe(true);
    const body = await response.text();
    return body ? JSON.parse(body) : [];
  }
  const select = (table, filter, columns = '*') => api('GET', `${table}?company_id=eq.${QA_COMPANY}&${filter}&select=${columns}`);
  const byId = async (table, id) => (await select(table, `id=eq.${id}`))[0];
  const remove = (table, id) => api('DELETE', `${table}?company_id=eq.${QA_COMPANY}&id=eq.${id}`);
  async function named(table, name) {
    expect(names[table].has(name)).toBe(true);
    const found = await select(table, `${table === 'procedure_templates' ? 'name' : 'title'}=eq.${encodeURIComponent(name)}`);
    found.forEach(row => ids[table].add(row.id));
    return found;
  }
  async function seed(table, records) {
    for (const record of rows(records)) {
      if (ids[table] && record.id) ids[table].add(record.id);
      if (names[table]) names[table].add(record.name || record.title);
    }
    return api('POST', table, records);
  }
  async function generate(scheduleId, due) {
    const result = await api('POST', 'rpc/generate_preventive_work_order', {
      p_company_id: QA_COMPANY, p_schedule_id: scheduleId, p_expected_due_at: due,
    });
    expect(UUID.test(result.work_order_id || '')).toBe(true);
    expect(typeof result.reused).toBe('boolean');
    expect(result.next_due_at).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    ids.work_orders.add(result.work_order_id);
    return result;
  }

  expect(await select('locations', `id=eq.${location}`, 'id')).toHaveLength(1);
  const memberships = await select('company_members', `user_id=eq.${session.user.id}`, 'role');
  expect(memberships.some(row => row.role === 'admin'), 'Work-order deletion requires an existing QA admin').toBe(true);
  expect(await select('profiles', `user_id=eq.${session.user.id}`, 'user_id')).toHaveLength(1);

  async function open() {
    // Width is a CSS viewport, not proof of a physical mobile device, soft keyboard, or touch behavior.
    const context = await browser.newContext({ baseURL: base.href, viewport: { width, height: 900 }, serviceWorkers: 'block' });
    contexts.push(context);
    await context.route('**/*', async route => {
      const req = route.request(), url = new URL(req.url()), method = req.method();
      if (!url.hostname.endsWith('.supabase.co')) return route.continue();
      if (url.origin !== QA_HOST) {
        errors.push(`Blocked non-QA backend: ${url.hostname}`);
        return route.abort();
      }
      if (!url.pathname.startsWith('/rest/v1/') || ['GET', 'HEAD', 'OPTIONS'].includes(method)) return route.continue();
      const table = url.pathname.replace('/rest/v1/', '');
      if (['rpc/ensure_company_profile', 'rpc/accept_company_invites', 'rpc/record_app_performance_samples'].includes(table)) {
        // These housekeeping RPCs can alter pre-existing profile/invite/telemetry data.
        suppressed.push(table);
        return route.fulfill({ status: 200, contentType: 'application/json', body: 'null' });
      }
      if (['rpc/get_my_companies', 'rpc/get_storage_dashboard', 'rpc/get_procedure_link_counts', 'rpc/get_workspace_work_order_counts'].includes(table)) return route.continue();
      let data;
      try { data = req.postDataJSON(); } catch { data = null; }
      if (!allowedWrite(method, url, data)) {
        errors.push(`Blocked non-fixture ${method} ${url.pathname}`);
        return route.fulfill({ status: 403, contentType: 'application/json', body: '{"message":"Non-fixture write blocked by QA test"}' });
      }
      if (failNextTable === table) {
        failNextTable = '';
        return route.fulfill({ status: 503, contentType: 'application/json', body: '{"message":"QA save unavailable"}' });
      }
      const response = await route.fetch({ maxRedirects: 0 });
      if (response.ok()) {
        const body = await response.text();
        const result = body ? JSON.parse(body) : [];
        if (table === 'rpc/generate_preventive_work_order' && result.work_order_id) ids.work_orders.add(result.work_order_id);
        else if (ids[table]) rows(result).forEach(row => { if (row?.id) ids[table].add(row.id); });
      }
      await route.fulfill({ response });
    });
    await context.addInitScript(({ session, company, location }) => {
      localStorage.setItem('sb-fsxqrngpaseqdxijggcm-auth-token', JSON.stringify(session));
      localStorage.setItem('maintainops.activeCompanyId', company);
      localStorage.setItem(`maintainops.activeLocationId:v2:${session.user.id}:${company}`, location);
      if (!localStorage.getItem('maintainops.activeSection')) localStorage.setItem('maintainops.activeSection', 'procedures');
    }, { session, company: QA_COMPANY, location });
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(30000);
    const reads = new Set();
    let lastRead = 0;
    page.on('request', req => {
      if (req.url().startsWith(`${QA_HOST}/rest/v1/`) && ['GET', 'HEAD'].includes(req.method())) {
        reads.add(req); lastRead = Date.now();
      }
    });
    const finished = req => { if (reads.delete(req)) lastRead = Date.now(); };
    page.on('requestfinished', finished);
    page.on('requestfailed', finished);
    readSettlers.set(page, () => expect.poll(() => reads.size === 0 && Date.now() - lastRead >= 350,
      { timeout: 30000, message: 'Settle background reads before deliberate reload' }).toBe(true));
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base.href);
    await expect(page.locator('[data-section="procedures"]').first()).toBeVisible({ timeout: 45000 });
    return page;
  }

  async function cleanup() {
    const failures = [];
    const attempt = async operation => { try { await operation(); } catch (error) { failures.push(error.message); } };
    for (const context of contexts) await attempt(() => context.close());
    // Recover IDs even when a UI request committed just before an assertion or response failed.
    for (const id of ids.assets) {
      await attempt(async () => { (await select('work_orders', `asset_id=eq.${id}`, 'id')).forEach(row => ids.work_orders.add(row.id)); });
      await attempt(async () => { (await select('preventive_schedules', `asset_id=eq.${id}`, 'id')).forEach(row => ids.preventive_schedules.add(row.id)); });
    }
    for (const table of Object.keys(names)) for (const name of names[table]) await attempt(() => named(table, name));
    for (const table of ['work_orders', 'preventive_schedules', 'procedure_templates', 'assets']) {
      for (const id of ids[table]) await attempt(async () => {
        await remove(table, id);
        expect(await select(table, `id=eq.${id}`, 'id')).toEqual([]);
      });
    }
    for (const id of ids.work_orders) for (const table of ['work_order_step_results', 'work_order_events', 'work_order_comments']) {
      await attempt(async () => { expect(await select(table, `work_order_id=eq.${id}`, 'id')).toEqual([]); });
    }
    for (const id of ids.procedure_templates) await attempt(async () => {
      expect(await select('procedure_steps', `procedure_template_id=eq.${id}`, 'id')).toEqual([]);
    });
    for (const id of ids.assets) for (const column of ['asset_id', 'archived_asset_id']) await attempt(async () => {
      await api('DELETE', `asset_financials?company_id=eq.${QA_COMPANY}&${column}=eq.${id}`);
      expect(await select('asset_financials', `${column}=eq.${id}`, 'id')).toEqual([]);
    });
    expect(failures, 'Exact-fixture cleanup must complete; failures need manual follow-up before rerun').toEqual([]);
  }
  async function reload(page) {
    await readSettlers.get(page)();
    await page.reload();
  }
  return { prefix, location, session, ids, names, errors, suppressed, api, select, byId, named, seed, generate, open, cleanup, reload,
    failOnce: table => { failNextTable = table; } };
}

async function section(page, name) {
  await page.locator(`[data-section="${name}"]:visible`).first().click();
}
async function search(page, value) {
  const input = page.locator('input.workspace-search-input:visible').first();
  // Workspace search is global, not a per-list filter. Exercise its redraw and return
  // to the active section before inspecting forms or paginated section cards.
  for (const query of [value, '']) {
    if (await input.inputValue() === query) continue;
    const marker = randomUUID();
    await input.evaluate((node, value) => { node.dataset.pmSearchProbe = value; }, marker);
    await input.fill(query);
    await expect(input).not.toHaveAttribute('data-pm-search-probe', marker, { timeout: 30000 });
  }
}

async function findOnList(page, locator, kind) {
  const previous = page.locator(`[data-list-page="${kind}"][data-page-direction="prev"]`);
  while (await previous.count() && await previous.isEnabled()) await previous.click();
  const next = page.locator(`[data-list-page="${kind}"][data-page-direction="next"]`);
  while (!(await locator.count()) && await next.count() && await next.isEnabled()) await next.click();
  await expect(locator).toBeVisible();
}
async function redraw(page, form, value) {
  const marker = randomUUID();
  await form.evaluate((node, value) => { node.dataset.pmRedrawProbe = value; }, marker);
  if (await form.getAttribute('data-equipment-pm-form')) {
    const panel = page.locator('[data-asset-relationship-section="open-work"]');
    if (await panel.getAttribute('open') !== null) await panel.locator(':scope > summary').click();
    await expand(panel);
  } else {
    const input = page.locator('input.workspace-search-input:visible').first();
    await search(page, await input.inputValue() === value ? `${value} ` : value);
  }
  await expect(form).not.toHaveAttribute('data-pm-redraw-probe', marker);
}
async function fields(form, values) {
  for (const [name, value] of Object.entries(values)) await expect(form.locator(`[name="${name}"]`)).toHaveValue(value);
}
async function fill(form, values) {
  for (const [name, value] of Object.entries(values)) {
    const control = form.locator(`[name="${name}"]`);
    if (await control.evaluate(node => node.tagName === 'SELECT')) await control.selectOption(value);
    else await control.fill(value);
  }
}
async function expand(details) {
  if (await details.getAttribute('open') === null) await details.locator(':scope > summary').click();
}
async function equipment(page, h, id) {
  await section(page, 'assets');
  const input = page.locator('input.workspace-search-input:visible').first();
  await input.fill(h.prefix);
  await page.locator(`[data-search-asset="${id}"]`).click();
  await expect(page.locator('#edit-asset-form')).toBeVisible();
}
async function equipmentCounts(page, h, id, open, completed) {
  await equipment(page, h, id);
  await expect(page.locator(`[data-asset-work-count="${id}"][data-work-count-kind="open"]`).first()).toHaveText(String(open));
  await expect(page.locator(`[data-asset-work-count="${id}"][data-work-count-kind="completed"]`).first()).toHaveText(String(completed));
}
async function workOrder(page, h, assetId, id, status) {
  await equipment(page, h, assetId);
  const panel = page.locator(`[data-asset-relationship-section="${status === 'completed' ? 'completed-history' : 'open-work'}"]`);
  await expand(panel);
  await panel.locator(`[data-mini-work-order="${id}"]`).click();
  await expect(page.locator('#status-select')).toHaveValue(status);
}
async function pmHistory(page, h, scheduleId, workId, status) {
  await section(page, 'pm');
  await search(page, h.prefix);
  const history = page.locator(`[data-pm-history="${scheduleId}"]`);
  await findOnList(page, history, 'schedules');
  await expand(history);
  await expect(history.locator(`[data-pm-history-content] [data-mini-work-order="${workId}"]`)).toContainText(new RegExp(status, 'i'));
}
async function deleteSchedule(page, h, id) {
  await section(page, 'pm');
  await search(page, h.prefix);
  await findOnList(page, page.locator(`[data-delete-schedule="${id}"]`), 'schedules');
  await page.locator(`[data-delete-schedule="${id}"]`).click();
  await page.locator(`[data-confirm-delete-schedule="${id}"]`).click();
  await expect.poll(() => h.byId('preventive_schedules', id)).toBeUndefined();
}
async function deleteWorkOrder(page, h, assetId, id, status) {
  await workOrder(page, h, assetId, id, status);
  const button = page.locator(`[data-delete-work-order="${id}"]`);
  const details = button.locator('xpath=ancestor::details[1]');
  if (await details.count()) await expand(details);
  await button.click();
  await page.locator(`[data-confirm-delete-work-order="${id}"]`).click();
  await expect.poll(() => h.byId('work_orders', id)).toBeUndefined();
  for (const table of ['work_order_step_results', 'work_order_events', 'work_order_comments']) {
    expect(await h.select(table, `work_order_id=eq.${id}`, 'id')).toEqual([]);
  }
}

for (const width of [1440, 390]) test(`PM drafts, generation and full lifecycle remain connected at ${width}px`, async ({ browser, request }, testInfo) => {
  const h = await fixture({ browser, request }, width);
  const assetId = randomUUID(), equipmentAssetId = randomUUID();
  const procedureName = `${h.prefix} Procedure`;
  h.names.procedure_templates.add(procedureName);
  try {
    await h.seed('assets', [assetId, equipmentAssetId].map((id, index) => ({
      id, company_id: QA_COMPANY, location_id: h.location, name: `${h.prefix} Equipment ${index + 1}`,
      asset_type: 'machine', created_by: h.session.user.id, safety_devices_required: false,
    })));
    const page = await h.open();
    await section(page, 'procedures');
    const procedureForm = page.locator('#create-procedure-form');
    const procedureValues = { name: procedureName, description: `${h.prefix} preserved procedure draft` };
    await fill(procedureForm, procedureValues);
    await redraw(page, procedureForm, h.prefix);
    await fields(procedureForm, procedureValues);
    await section(page, 'pm');
    await section(page, 'procedures');
    await fields(procedureForm, procedureValues);
    await h.reload(page);
    await fields(procedureForm, procedureValues);
    await procedureForm.getByRole('button', { name: 'Add Checklist', exact: true }).click();
    await expect.poll(async () => (await h.named('procedure_templates', procedureName)).length).toBe(1);
    const procedure = (await h.named('procedure_templates', procedureName))[0];
    await expect(procedureForm.locator('[name="name"]')).toHaveValue('');
    await h.reload(page);
    await expect(procedureForm.locator('[name="name"]')).toHaveValue('');
    await expect(procedureForm.locator('[name="description"]')).toHaveValue('');
    await search(page, h.prefix);

    const steps = {};
    for (const type of ['checkbox', 'number', 'text', 'pass_fail']) {
      const form = page.locator(`[data-add-step="${procedure.id}"]`);
      const values = { prompt: `${h.prefix} ${type}`, response_type: type, required: type === 'pass_fail' ? 'false' : 'true' };
      await fill(form, values);
      await redraw(page, form, `${h.prefix} `);
      await fields(form, values);
      await section(page, 'pm');
      await section(page, 'procedures');
      await fields(form, values);
      await h.reload(page);
      await search(page, h.prefix);
      await fields(form, values);
      await form.getByRole('button', { name: 'Add Step', exact: true }).click();
      await expect.poll(async () => (await h.select('procedure_steps', `procedure_template_id=eq.${procedure.id}&prompt=eq.${encodeURIComponent(values.prompt)}`)).length).toBe(1);
      const step = (await h.select('procedure_steps', `procedure_template_id=eq.${procedure.id}&prompt=eq.${encodeURIComponent(values.prompt)}`))[0];
      expect(step).toMatchObject({ response_type: type, required: type !== 'pass_fail' });
      h.ids.procedure_steps.add(step.id);
      steps[type] = step.id;
      await expect(form.locator('[name="prompt"]')).toHaveValue('');
      await h.reload(page);
      await search(page, h.prefix);
      await expect(form.locator('[name="prompt"]')).toHaveValue('');
      await expect(form.locator('[name="response_type"]')).toHaveValue('checkbox');
      await expect(form.locator('[name="required"]')).toHaveValue('true');
    }

    const schedules = [];
    for (const [fromEquipment, targetAsset, due] of [[false, assetId, '2031-01-15'], [true, equipmentAssetId, '2031-02-10']]) {
      if (fromEquipment) await equipment(page, h, targetAsset);
      else await section(page, 'pm');
      const form = page.locator(fromEquipment ? `[data-equipment-pm-form="${targetAsset}"]` : '#create-pm-form');
      const title = `${h.prefix} ${fromEquipment ? 'Equipment' : 'Menu'} PM`;
      h.names.preventive_schedules.add(title);
      const values = { title, frequency: 'monthly', procedure_template_id: procedure.id, next_due_at: due };
      await fill(form, values);
      if (!fromEquipment) await form.locator('[name="asset_id"]').selectOption(targetAsset);
      const expected = { ...values, asset_id: targetAsset };
      await redraw(page, form, `${h.prefix} `);
      await fields(form, expected);
      await section(page, 'procedures');
      if (fromEquipment) await equipment(page, h, targetAsset);
      else await section(page, 'pm');
      await fields(form, expected);
      await h.reload(page);
      if (fromEquipment) await equipment(page, h, targetAsset);
      await fields(form, expected);
      expect(await h.named('preventive_schedules', title)).toEqual([]);
      h.failOnce('preventive_schedules');
      await form.getByRole('button', { name: 'Add Schedule', exact: true }).click();
      await expect(form.locator('[data-pm-error], #pm-error')).toContainText('QA save unavailable');
      await fields(form, expected);
      expect(await h.named('preventive_schedules', title)).toEqual([]);
      await form.getByRole('button', { name: 'Add Schedule', exact: true }).click();
      await expect.poll(async () => (await h.named('preventive_schedules', title)).length).toBe(1);
      const schedule = (await h.named('preventive_schedules', title))[0];
      expect(schedule).toMatchObject({ title, asset_id: targetAsset, procedure_template_id: procedure.id, next_due_at: due });
      schedules.push(schedule);
      await expect(form.locator('[name="title"]')).toHaveValue('');
      await h.reload(page);
      if (fromEquipment) await equipment(page, h, targetAsset);
      await expect(form.locator('[name="title"]')).toHaveValue('');
      await expect(form.locator('[name="procedure_template_id"]')).toHaveValue('');
    }

    const work = [];
    for (const schedule of schedules) {
      await section(page, 'pm');
      await search(page, h.prefix);
      const generatedResponse = page.waitForResponse(response => response.url() === `${QA_HOST}/rest/v1/rpc/generate_preventive_work_order`
        && response.request().method() === 'POST');
      await page.locator(`[data-generate-pm="${schedule.id}"]`).click();
      const response = await generatedResponse;
      expect(response.ok()).toBe(true);
      expect(response.request().postDataJSON()).toEqual({ p_company_id: QA_COMPANY, p_schedule_id: schedule.id, p_expected_due_at: schedule.next_due_at });
      const result = await response.json();
      expect(result.reused).toBe(false);
      h.ids.work_orders.add(result.work_order_id);
      const order = await h.byId('work_orders', result.work_order_id);
      expect(order).toMatchObject({ company_id: QA_COMPANY, asset_id: schedule.asset_id, location_id: h.location,
        procedure_template_id: procedure.id, due_at: schedule.next_due_at, status: 'open', type: 'preventive',
        preventive_schedule_id: schedule.id, preventive_source_id: schedule.id, preventive_source_title: schedule.title, preventive_due_at: schedule.next_due_at });
      expect((await h.byId('preventive_schedules', schedule.id)).next_due_at).toBe(result.next_due_at);
      expect(result.next_due_at > schedule.next_due_at).toBe(true);
      const replay = await h.generate(schedule.id, schedule.next_due_at);
      expect(replay).toEqual({ work_order_id: order.id, next_due_at: result.next_due_at, reused: true });
      expect(await h.select('work_orders', `preventive_source_id=eq.${schedule.id}`, 'id')).toHaveLength(1);
      work.push(order);
    }
    const order = work[0];
    await section(page, 'procedures');
    await search(page, h.prefix);
    await expect(page.locator(`[data-procedure-links="${procedure.id}"]`)).toHaveText('2 linked work orders');
    const procedureCard = page.locator('.procedure-card').filter({ has: page.locator(`[data-add-step="${procedure.id}"]`) });
    const deleteProcedure = procedureCard.locator(`[data-delete-procedure="${procedure.id}"]`);
    if (await deleteProcedure.isVisible() && await deleteProcedure.isEnabled()) {
      await deleteProcedure.click();
      await expect(procedureCard.locator('[data-procedure-delete-error]')).toContainText(/linked|work order|schedule|traceability/i);
    } else await expect(procedureCard).toContainText(/Kept For Traceability|linked work orders/i);
    await expect(procedureCard.locator('[data-confirm-delete-procedure]')).toHaveCount(0);
    expect(await h.byId('procedure_templates', procedure.id)).toBeTruthy();

    await equipmentCounts(page, h, assetId, 1, 0);
    await workOrder(page, h, assetId, order.id, 'open');
    const responseField = type => page.locator(`[data-work-order-id="${order.id}"][data-step-result="${steps[type]}"]`);
    const saved = type => h.select('work_order_step_results', `work_order_id=eq.${order.id}&procedure_step_id=eq.${steps[type]}`);
    async function responseValue(type, value) {
      const field = responseField(type);
      if (type === 'checkbox') await field.setChecked(value);
      else { await field.fill(value); await field.blur(); }
      await expect.poll(async () => (await saved(type))[0]?.value).toBe(type === 'checkbox' ? value ? 'checked' : '' : value.trim());
      await expect(field).toBeEnabled();
    }
    async function blockedCompletion() {
      await expand(page.locator('#work-order-complete-target'));
      const submit = page.locator('#complete-work-order-form button[type="submit"]');
      if (await submit.isEnabled()) {
        await submit.click();
        await expect(page.locator('#completion-error')).toContainText(/required|checklist/i);
      } else await expect(submit).toBeDisabled();
      expect((await h.byId('work_orders', order.id)).status).toBe('open');
    }
    await responseValue('checkbox', true);
    await responseValue('checkbox', false);
    await responseValue('number', '0');
    await responseValue('text', '   ');
    await blockedCompletion();
    expect((await saved('number'))[0]).toMatchObject({ value: '0', completed_by: h.session.user.id });
    expect((await saved('number'))[0].completed_at).toBeTruthy();
    expect((await saved('checkbox'))[0]).toMatchObject({ value: '', completed_by: null, completed_at: null });

    const draftNote = `${h.prefix} unsaved checklist response`;
    h.failOnce('work_order_step_results');
    await responseField('text').fill(draftNote);
    await responseField('text').blur();
    await expect(page.locator('.app-notice')).toContainText('QA save unavailable');
    await section(page, 'procedures');
    await workOrder(page, h, assetId, order.id, 'open');
    await expect(responseField('text')).toHaveValue(draftNote);
    await h.reload(page);
    await workOrder(page, h, assetId, order.id, 'open');
    await expect(responseField('text')).toHaveValue(draftNote);
    await page.getByRole('button', { name: 'Save answer', exact: true }).click();
    await expect.poll(async () => (await saved('text'))[0]?.value).toBe(draftNote);
    await expect(page.getByRole('button', { name: 'Save answer', exact: true })).toHaveCount(0);
    await responseValue('text', `${h.prefix} saved checklist response`);
    // A saved draft must not mask a later authoritative response on reload.
    const refreshedNote = `${h.prefix} later authoritative response`;
    await h.api('PATCH', `work_order_step_results?company_id=eq.${QA_COMPANY}&work_order_id=eq.${order.id}&procedure_step_id=eq.${steps.text}`, {
      value: refreshedNote, completed_by: h.session.user.id, completed_at: new Date().toISOString(),
    });
    await h.reload(page);
    await workOrder(page, h, assetId, order.id, 'open');
    await expect(responseField('text')).toHaveValue(refreshedNote);
    await blockedCompletion();
    await responseValue('checkbox', true);
    expect(await h.select('work_order_step_results', `work_order_id=eq.${work[1].id}`, 'id')).toEqual([]);
    const responses = () => h.select('work_order_step_results', `work_order_id=eq.${order.id}&order=procedure_step_id`, 'procedure_step_id,value,completed_by,completed_at');
    const snapshot = await responses();
    async function complete(label) {
      await expand(page.locator('#work-order-complete-target'));
      await page.locator('#complete-work-order-form [name="resolution_summary"]').fill(`${h.prefix} ${label}`);
      await page.locator('#complete-work-order-form').getByRole('button', { name: 'Complete Work Order', exact: true }).click();
      await expect.poll(async () => (await h.byId('work_orders', order.id)).status).toBe('completed');
      await expect(page.locator('#status-select')).toHaveValue('completed');
      expect(await responses()).toEqual(snapshot);
    }
    await complete('first completion');
    const firstCompletion = (await h.byId('work_orders', order.id)).completed_at;
    await equipmentCounts(page, h, assetId, 0, 1);
    await pmHistory(page, h, schedules[0].id, order.id, 'completed');
    await workOrder(page, h, assetId, order.id, 'completed');
    await page.locator('#status-select').selectOption('open');
    await expect.poll(async () => (await h.byId('work_orders', order.id)).status).toBe('open');
    expect((await h.byId('work_orders', order.id)).completed_at).toBeNull();
    expect(await responses()).toEqual(snapshot);
    await equipmentCounts(page, h, assetId, 1, 0);
    await pmHistory(page, h, schedules[0].id, order.id, 'open');
    await workOrder(page, h, assetId, order.id, 'open');
    await expect(responseField('number')).toHaveValue('0');
    await expect(responseField('checkbox')).toBeChecked();
    await complete('second completion');
    expect((await h.byId('work_orders', order.id)).completed_at >= firstCompletion).toBe(true);
    await equipmentCounts(page, h, assetId, 0, 1);
    await pmHistory(page, h, schedules[0].id, order.id, 'completed');
    await workOrder(page, h, assetId, order.id, 'completed');
    await expand(page.locator('#work-order-history-target'));
    await expect(page.locator('#work-order-history-target')).toContainText(`${h.prefix} first completion`);
    await expect(page.locator('#work-order-history-target')).toContainText(`${h.prefix} second completion`);
    expect((await h.select('work_order_events', `work_order_id=eq.${order.id}&event_type=eq.completed`, 'id')).length).toBeGreaterThanOrEqual(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`pm-lifecycle-${width}.png`), fullPage: true });

    await deleteSchedule(page, h, schedules[0].id);
    expect(await h.byId('work_orders', order.id)).toMatchObject({ preventive_schedule_id: null,
      preventive_source_id: schedules[0].id, preventive_source_title: schedules[0].title, preventive_due_at: schedules[0].next_due_at });
    expect(await responses()).toEqual(snapshot);
    await equipmentCounts(page, h, assetId, 0, 1);
    await deleteSchedule(page, h, schedules[1].id);
    await deleteWorkOrder(page, h, assetId, order.id, 'completed');
    await equipmentCounts(page, h, assetId, 0, 0);
    await deleteWorkOrder(page, h, equipmentAssetId, work[1].id, 'open');
    await section(page, 'procedures');
    await search(page, h.prefix);
    await expect(page.locator(`[data-procedure-links="${procedure.id}"]`)).toHaveText('0 linked work orders');
    await page.locator(`[data-delete-procedure="${procedure.id}"]`).click();
    await page.locator(`[data-confirm-delete-procedure="${procedure.id}"]`).click();
    await expect.poll(() => h.byId('procedure_templates', procedure.id)).toBeUndefined();
    expect(await h.select('procedure_steps', `procedure_template_id=eq.${procedure.id}`, 'id')).toEqual([]);
    expect(h.errors).toEqual([]);
    testInfo.annotations.push({ type: 'scope', description: 'Isolated fixtures only; profile/invite/telemetry housekeeping RPCs were no-oped.' });
  } finally {
    await h.cleanup();
  }
});

test('PM, procedure and source/equipment history lists paginate at twelve', async ({ browser, request }, testInfo) => {
  const h = await fixture({ browser, request }, 390);
  const assetId = randomUUID();
  try {
    await h.seed('assets', { id: assetId, company_id: QA_COMPANY, location_id: h.location, name: `${h.prefix} Pagination equipment`,
      asset_type: 'machine', created_by: h.session.user.id, safety_devices_required: false });
    const templates = Array.from({ length: 13 }, (_, index) => ({ id: randomUUID(), company_id: QA_COMPANY,
      name: `${h.prefix} Procedure ${String(index + 1).padStart(2, '0')}`, created_by: h.session.user.id }));
    await h.seed('procedure_templates', templates);
    const schedules = templates.map((template, index) => ({ id: randomUUID(), company_id: QA_COMPANY, location_id: h.location,
      asset_id: assetId, procedure_template_id: template.id, title: `${h.prefix} Schedule ${String(index + 1).padStart(2, '0')}`,
      frequency: 'weekly', next_due_at: '2031-01-15', created_by: h.session.user.id }));
    await h.seed('preventive_schedules', schedules);
    let due = schedules[0].next_due_at;
    for (let index = 0; index < 13; index += 1) {
      const generated = await h.generate(schedules[0].id, due);
      due = generated.next_due_at;
      await h.api('PATCH', `work_orders?company_id=eq.${QA_COMPANY}&id=eq.${generated.work_order_id}`, {
        status: 'completed', completed_at: new Date().toISOString(), resolution_summary: `${h.prefix} history ${index + 1}`,
      });
    }
    const page = await h.open();
    for (const [name, kind, card] of [['pm', 'schedules', '.pm-list > .pm-card'], ['procedures', 'procedures', '.procedure-list > .procedure-card']]) {
      await section(page, name);
      await search(page, h.prefix);
      const all = await h.select(name === 'pm' ? 'preventive_schedules' : 'procedure_templates', name === 'pm' ? `location_id=eq.${h.location}` : 'order=id', 'id');
      const total = all.length;
      await expect(page.locator(card)).toHaveCount(Math.min(12, total));
      const next = page.locator(`[data-list-page="${kind}"][data-page-direction="next"]`);
      await expect(next.locator('..')).toContainText(`Showing 1-12 of ${total}`);
      await next.click();
      await expect(page.locator(card)).toHaveCount(Math.min(12, total - 12));
      await expect(next.locator('..')).toContainText(`Showing 13-${Math.min(24, total)} of ${total}`);
      await page.locator(`[data-list-page="${kind}"][data-page-direction="prev"]`).click();
      await expect(page.locator(card)).toHaveCount(12);
    }
    await findOnList(page, page.locator(`[data-procedure-links="${templates[0].id}"]`), 'procedures');
    await expect(page.locator(`[data-procedure-links="${templates[0].id}"]`)).toHaveText('13 linked work orders');
    await section(page, 'pm');
    await search(page, schedules[0].title);
    const history = page.locator(`[data-pm-history="${schedules[0].id}"]`);
    await findOnList(page, history, 'schedules');
    await expand(history);
    await expect(history.locator('[data-pm-history-content] [data-mini-work-order]')).toHaveCount(12);
    await expect(history).toContainText('Showing 1-12 of 13');
    await history.locator('[data-pm-history-page="next"]').click();
    await expect(history.locator('[data-pm-history-content] [data-mini-work-order]')).toHaveCount(1);
    await expect(history).toContainText('Showing 13-13 of 13');
    await history.locator('[data-pm-history-page="prev"]').click();
    await expect(history.locator('[data-pm-history-content] [data-mini-work-order]')).toHaveCount(12);
    await equipmentCounts(page, h, assetId, 0, 13);
    const equipmentPm = page.locator(`[data-asset-pm-schedules="${assetId}"]`);
    await expect(equipmentPm.locator('.mini-list > article')).toHaveCount(12);
    await equipmentPm.locator('[data-asset-relation-page="next"]').click();
    await expect(equipmentPm.locator('.mini-list > article')).toHaveCount(1);
    await equipmentPm.locator('[data-asset-relation-page="prev"]').click();
    await expect(equipmentPm.locator('.mini-list > article')).toHaveCount(12);
    const completed = page.locator('[data-asset-relationship-section="completed-history"]');
    await expand(completed);
    await expect(completed.locator('[data-mini-work-order]')).toHaveCount(12);
    await completed.locator('[data-asset-relation-page="next"]').click();
    await expect(completed.locator('[data-mini-work-order]')).toHaveCount(1);
    await expect(completed).toContainText('Showing 13-13 of 13');
    await completed.locator('[data-asset-relation-page="prev"]').click();
    await expect(completed.locator('[data-mini-work-order]')).toHaveCount(12);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath('pm-history-pagination-390.png'), fullPage: true });
    expect(h.errors).toEqual([]);
  } finally {
    await h.cleanup();
  }
});
