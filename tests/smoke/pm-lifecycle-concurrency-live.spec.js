const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');

const QA_HOST = 'https://fsxqrngpaseqdxijggcm.supabase.co';
const QA_COMPANY = '0d6fd8f1-428d-4192-8176-48943e3ec119';
const LOCAL_ORIGIN = 'http://127.0.0.1:4203';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DUE = '2031-01-15';
const NEXT_DUE = '2031-01-22';

test.describe.configure({ mode: 'serial', retries: 0 });
test.use({ trace: 'off', video: 'off' });
test.setTimeout(240000);

async function fixture(request) {
  // No network request, including local configuration or authentication, precedes these guards.
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
    expect(Boolean(process.env[name]), `${name} must come from the isolated QA runner`).toBe(true);
  }
  const key = process.env.LFES_SUPABASE_ANON_KEY;
  if (key.startsWith('eyJ')) {
    const claims = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString());
    expect(claims.role, 'Use the QA public anon key, never a service-role key').toBe('anon');
    expect(claims.ref).toBe('fsxqrngpaseqdxijggcm');
  } else {
    expect(key.startsWith('sb_publishable_'), 'Only a public API key is allowed').toBe(true);
  }
  const configResponse = await request.get(new URL('supabase-config.js', base).href, { maxRedirects: 0, timeout: 15000 });
  expect(configResponse.ok(), 'Local QA configuration must be readable').toBe(true);
  const config = await configResponse.text();
  expect(config.includes(QA_HOST), 'Local app must use the allowlisted QA backend').toBe(true);
  expect(config.includes('lbphkzznvvumemdkqoay'), 'Production must not be configured').toBe(false);
  const auth = await request.post(`${QA_HOST}/auth/v1/token?grant_type=password`, {
    maxRedirects: 0, timeout: 15000, headers: { apikey: key },
    data: { email: process.env.LFES_ADMIN_EMAIL, password: process.env.LFES_ADMIN_PASSWORD },
  });
  expect(auth.ok(), `Isolated QA authentication status ${auth.status()}`).toBe(true);
  const session = await auth.json();
  const userId = session.user?.id;
  expect(UUID.test(userId || '')).toBe(true);
  expect(Boolean(session.access_token)).toBe(true);

  const prefix = `LFES PM concurrency ${randomUUID()}`;
  const ids = Object.fromEntries(['assets', 'procedure_templates', 'procedure_steps', 'preventive_schedules', 'work_order_step_results']
    .map(table => [table, randomUUID()]));
  const workIds = new Set();
  let ownsAsset = false;
  const ownName = value => typeof value === 'string' && value.startsWith(`${prefix} `);
  const only = (filters, column, value) => Object.keys(filters).length === 1 && filters[column] === value;
  const ownedWork = filters => only(filters, 'id', filters.id) && workIds.has(filters.id);

  function ownsSeed(table, row) {
    if (!row || row.id !== ids[table] || row.company_id !== QA_COMPANY) return false;
    if (table === 'assets') return row.location_id === location && ownName(row.name) && row.created_by === userId;
    if (table === 'procedure_templates') return ownName(row.name) && row.created_by === userId;
    if (table === 'procedure_steps') return row.procedure_template_id === ids.procedure_templates && ownName(row.prompt);
    if (table === 'preventive_schedules') return row.asset_id === ids.assets && row.location_id === location
      && row.procedure_template_id === ids.procedure_templates && ownName(row.title) && row.created_by === userId;
    if (table === 'work_order_step_results') return workIds.has(row.work_order_id) && row.procedure_step_id === ids.procedure_steps;
    return false;
  }

  function allowed(method, table, filters, data) {
    if (table === 'rpc/generate_preventive_work_order') return method === 'POST' && Object.keys(filters).length === 0
      && data?.p_company_id === QA_COMPANY && data.p_schedule_id === ids.preventive_schedules && data.p_expected_due_at === DUE;
    if (method === 'GET') {
      if (table === 'locations') return only(filters, 'id', location);
      if (['company_members', 'profiles'].includes(table)) return only(filters, 'user_id', userId);
      if (ids[table] && only(filters, 'id', ids[table])) return true;
      if (table === 'work_orders') return ownedWork(filters) || only(filters, 'asset_id', ids.assets);
      if (['work_order_step_results', 'work_order_events', 'work_order_comments'].includes(table)) {
        return only(filters, 'work_order_id', filters.work_order_id) && workIds.has(filters.work_order_id);
      }
      if (table === 'procedure_steps') return only(filters, 'procedure_template_id', ids.procedure_templates);
    }
    if (table === 'asset_financials' && ['GET', 'DELETE'].includes(method)) {
      return ownsAsset && ['asset_id', 'archived_asset_id'].some(column => only(filters, column, ids.assets));
    }
    if (method === 'POST') return Object.keys(filters).length === 0 && ownsSeed(table, data);
    if (method === 'PATCH' && table === 'work_orders') return ownedWork(filters)
      && Object.keys(data).every(column => ['status', 'completed_at', 'safety_devices_checked', 'resolution_summary'].includes(column))
      && ['open', 'completed'].includes(data.status) && ownName(data.resolution_summary);
    if (method === 'PATCH' && table === 'work_order_step_results') return only(filters, 'id', ids.work_order_step_results)
      && Object.keys(data).every(column => ['value', 'completed_by', 'completed_at'].includes(column))
      && ['checked', ''].includes(data.value) && [null, userId].includes(data.completed_by);
    if (method === 'DELETE') return table === 'work_orders' ? ownedWork(filters)
      : ['assets', 'procedure_templates', 'preventive_schedules'].includes(table) && only(filters, 'id', ids[table]);
    return false;
  }

  async function raw(method, table, filters = {}, data, client = request, columns = '*') {
    expect(allowed(method, table, filters, data), `Refuse non-fixture ${method} ${table}`).toBe(true);
    const url = new URL(`${QA_HOST}/rest/v1/${table}`);
    expect(url.origin).toBe(QA_HOST);
    if (!table.startsWith('rpc/')) {
      url.searchParams.set('company_id', `eq.${QA_COMPANY}`);
      for (const [column, value] of Object.entries(filters)) url.searchParams.set(column, `eq.${value}`);
      if (method === 'GET') url.searchParams.set('select', columns);
    }
    const response = await client.fetch(url.href, {
      method, data, maxRedirects: 0, maxRetries: 0, timeout: 15000,
      headers: { apikey: key, Authorization: `Bearer ${session.access_token}`, Prefer: 'return=representation,count=exact' },
    });
    const text = await response.text();
    return { ok: response.ok(), status: response.status(), body: text ? JSON.parse(text) : null,
      count: response.headers()['content-range']?.split('/').at(-1) };
  }
  async function api(method, table, filters = {}, data) {
    const response = await raw(method, table, filters, data);
    expect(response.ok, `${method} ${table}: ${JSON.stringify(response.body)}`).toBe(true);
    return response.body;
  }
  async function select(table, filters, columns = '*') {
    const response = await raw('GET', table, filters, undefined, request, columns);
    expect(response.ok, `Read ${table}: ${JSON.stringify(response.body)}`).toBe(true);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.count, `Exact count missing for ${table}`).toMatch(/^\d+$/);
    expect(response.body.length, `Incomplete fixture read for ${table}`).toBe(Number(response.count));
    return response.body;
  }
  async function recoverWork() {
    const rows = await select('work_orders', { asset_id: ids.assets });
    for (const row of rows) {
      expect(UUID.test(row.id || '')).toBe(true);
      expect(row.company_id).toBe(QA_COMPANY);
      expect(row.asset_id).toBe(ids.assets);
      expect(row.created_by).toBe(userId);
      expect(ownName(row.title), 'Only run-named fixture work orders may be mutated').toBe(true);
      workIds.add(row.id);
    }
    return rows;
  }

  // Existing QA identity and location are read-only. Never create profiles or memberships.
  expect(await select('locations', { id: location }, 'id')).toHaveLength(1);
  const memberships = await select('company_members', { user_id: userId }, 'role');
  expect(memberships.some(row => row.role === 'admin'), 'Use an existing QA company admin').toBe(true);
  expect(await select('profiles', { user_id: userId }, 'user_id')).toHaveLength(1);

  async function seed() {
    const records = [
      ['assets', { id: ids.assets, location_id: location, name: `${prefix} Equipment`, asset_type: 'machine',
        created_by: userId, safety_devices_required: false }],
      ['procedure_templates', { id: ids.procedure_templates, name: `${prefix} Procedure`, created_by: userId }],
      ['procedure_steps', { id: ids.procedure_steps, procedure_template_id: ids.procedure_templates,
        position: 1, prompt: `${prefix} Required check`, response_type: 'checkbox', required: true }],
      ['preventive_schedules', { id: ids.preventive_schedules, asset_id: ids.assets, location_id: location,
        procedure_template_id: ids.procedure_templates, title: `${prefix} Schedule`, frequency: 'weekly',
        next_due_at: DUE, active: true, created_by: userId }],
    ];
    for (const [table, record] of records) {
      expect(await select(table, { id: record.id }, 'id'), 'Fixture UUID must not already exist').toEqual([]);
      const inserted = await api('POST', table, {}, { company_id: QA_COMPANY, ...record });
      expect(inserted).toHaveLength(1);
      expect(inserted[0].id).toBe(record.id);
      expect(ownsSeed(table, inserted[0])).toBe(true);
      if (table === 'assets') ownsAsset = true;
    }
  }

  async function cleanup() {
    const failures = [];
    const attempt = async (label, run) => { try { await run(); } catch (error) { failures.push(`${label}: ${error.message}`); } };
    // Recover committed RPC writes even if an HTTP response/assertion failed; never delete by a name prefix.
    await attempt('recover generated work', recoverWork);
    for (const id of workIds) await attempt(`work order ${id}`, async () => {
      await api('DELETE', 'work_orders', { id });
      expect(await select('work_orders', { id }, 'id')).toEqual([]);
      for (const table of ['work_order_step_results', 'work_order_events', 'work_order_comments']) {
        expect(await select(table, { work_order_id: id }, 'id')).toEqual([]);
      }
    });
    for (const table of ['preventive_schedules', 'procedure_templates', 'assets']) await attempt(table, async () => {
      const rows = await select(table, { id: ids[table] });
      for (const row of rows) {
        expect(ownsSeed(table, row), `Refuse cleanup of an unowned ${table} row`).toBe(true);
        if (table === 'assets') ownsAsset = true;
        await api('DELETE', table, { id: row.id });
      }
      expect(await select(table, { id: ids[table] }, 'id')).toEqual([]);
    });
    await attempt('procedure steps', async () => {
      expect(await select('procedure_steps', { procedure_template_id: ids.procedure_templates }, 'id')).toEqual([]);
    });
    for (const column of ownsAsset ? ['asset_id', 'archived_asset_id'] : []) await attempt(`retained financials ${column}`, async () => {
      await api('DELETE', 'asset_financials', { [column]: ids.assets });
      expect(await select('asset_financials', { [column]: ids.assets }, 'id')).toEqual([]);
    });
    expect(failures, `Exact-fixture cleanup failed for ${prefix}; inspect before rerunning`).toEqual([]);
  }
  return { prefix, ids, userId, seed, raw, api, select, recoverWork, cleanup };
}

async function concurrently(jobs) {
  // Start both HTTP requests before awaiting either; settle both before assertions or cleanup.
  const results = await Promise.allSettled(jobs.map(job => job()));
  const errors = results.filter(result => result.status === 'rejected').map(result => String(result.reason));
  expect(errors, 'Both independent HTTP requests must finish').toEqual([]);
  return results.map(result => result.value);
}

test('PM generation and required-response completion races remain atomic', async ({ request, playwright }, testInfo) => {
  const h = await fixture(request);
  const clients = [];
  try {
    // Independent HTTP contexts avoid a single browser/tab or client mutation queue serializing the race.
    clients.push(await playwright.request.newContext());
    clients.push(await playwright.request.newContext());
    await h.seed();
    const args = { p_company_id: QA_COMPANY, p_schedule_id: h.ids.preventive_schedules, p_expected_due_at: DUE };
    const generated = await concurrently(clients.map(client => () => h.raw('POST', 'rpc/generate_preventive_work_order', {}, args, client)));
    const work = await h.recoverWork();
    for (const response of generated) {
      expect(response.ok, `Generation returned ${response.status}: ${JSON.stringify(response.body)}`).toBe(true);
      expect(UUID.test(response.body.work_order_id || '')).toBe(true);
      expect(response.body.next_due_at).toBe(NEXT_DUE);
    }
    expect(generated.map(response => response.body.reused).sort()).toEqual([false, true]);
    expect(generated[0].body.work_order_id).toBe(generated[1].body.work_order_id);
    expect(work).toHaveLength(1);
    const workId = work[0].id;
    expect(workId).toBe(generated[0].body.work_order_id);
    expect(work[0]).toMatchObject({ status: 'open', asset_id: h.ids.assets, procedure_template_id: h.ids.procedure_templates,
      preventive_schedule_id: h.ids.preventive_schedules, preventive_source_id: h.ids.preventive_schedules,
      preventive_source_title: `${h.prefix} Schedule`, preventive_due_at: DUE, due_at: DUE, safety_check_required: false });
    const schedule = await h.select('preventive_schedules', { id: h.ids.preventive_schedules });
    expect(schedule).toHaveLength(1);
    expect(schedule[0].next_due_at).toBe(NEXT_DUE);
    const history = await h.select('work_order_events', { work_order_id: workId });
    expect(history).toHaveLength(1);
    expect(history[0]).toMatchObject({ work_order_id: workId, event_type: 'created', actor_id: h.userId });
    expect(history[0].summary).toContain(`${h.prefix} Schedule`);
    expect(history[0].summary).toContain(DUE);

    const resultId = h.ids.work_order_step_results;
    const inserted = await h.api('POST', 'work_order_step_results', {}, { id: resultId, company_id: QA_COMPANY,
      work_order_id: workId, procedure_step_id: h.ids.procedure_steps, value: 'checked', completed_by: h.userId,
      completed_at: new Date().toISOString() });
    expect(inserted).toHaveLength(1);
    expect(inserted[0].id).toBe(resultId);

    for (const [iteration, first] of ['clear', 'complete', 'clear', 'complete'].entries()) {
      const label = `${first}-first iteration ${iteration + 1}`;
      const reopened = await h.api('PATCH', 'work_orders', { id: workId }, { status: 'open', completed_at: null,
        safety_devices_checked: false, resolution_summary: `${h.prefix} Reset ${iteration + 1}` });
      expect(reopened).toHaveLength(1);
      expect(reopened[0].status).toBe('open');
      const restored = await h.api('PATCH', 'work_order_step_results', { id: resultId }, {
        value: 'checked', completed_by: h.userId, completed_at: new Date().toISOString(),
      });
      expect(restored).toHaveLength(1);
      expect(restored[0].value).toBe('checked');
      const operations = {
        clear: () => h.raw('PATCH', 'work_order_step_results', { id: resultId }, {
          value: '', completed_by: null, completed_at: null,
        }, clients[0]),
        complete: () => h.raw('PATCH', 'work_orders', { id: workId }, {
          status: 'completed', completed_at: new Date().toISOString(), safety_devices_checked: false,
          resolution_summary: `${h.prefix} Race ${iteration + 1}`,
        }, clients[1]),
      };
      const order = first === 'clear' ? ['clear', 'complete'] : ['complete', 'clear'];
      const responses = await concurrently(order.map(name => operations[name]));
      const byOperation = Object.fromEntries(order.map((name, index) => [name, responses[index]]));
      const [current] = await h.select('work_orders', { id: workId });
      const results = await h.select('work_order_step_results', { work_order_id: workId });
      expect(current, label).toBeDefined();
      expect(results, label).toHaveLength(1);
      expect(results[0]).toMatchObject({ id: resultId, procedure_step_id: h.ids.procedure_steps });
      expect(current.status === 'completed' ? results[0].value === 'checked'
        : current.status === 'open' && results[0].value === '', `${label}: completed requires an answer; otherwise open and cleared`).toBe(true);
      expect(responses.filter(response => response.ok), `${label}: exactly one conflicting write may succeed`).toHaveLength(1);
      for (const [name, response] of Object.entries(byOperation)) {
        if (response.ok) {
          expect(response.body, `${label}: ${name} must update a row, not silently match zero`).toHaveLength(1);
          expect(response.body[0].id).toBe(name === 'clear' ? resultId : workId);
        } else {
          expect(['23514', '40001', '40P01'], `${label}: fail only for a lifecycle/serialization conflict, not auth or transport`).toContain(response.body?.code);
        }
      }
      expect(current.status).toBe(byOperation.complete.ok ? 'completed' : 'open');
      expect(results[0].value).toBe(byOperation.clear.ok ? '' : 'checked');
    }
    expect((await h.select('preventive_schedules', { id: h.ids.preventive_schedules }))[0].next_due_at).toBe(NEXT_DUE);
    expect(await h.select('work_order_events', { work_order_id: workId })).toHaveLength(1);
  } finally {
    testInfo.setTimeout(330000);
    try { await h.cleanup(); }
    finally { for (const client of clients) await client.dispose(); }
  }
});
