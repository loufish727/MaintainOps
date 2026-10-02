const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { transformSync } = require('esbuild');
const vm = require('node:vm');

(async () => {
  const { createRequestEmailLink, fetchLinkedRequest } = await import('../../src/appShell/requestEmailLink.mjs');
  const id = 'b7b09d44-6518-47de-9d7b-ed5a7ee8b269';
  const row = { id, company_id: 'company', location_id: 'salem' };
  function browser(query = `?request_id=${id}&keep=yes#anchor`) {
    const win = { location: { href: `https://example.test/MaintainOps/${query}` }, history: { state: { marker: 1 } } };
    win.history.replaceState = (state, _, href) => { assert.deepEqual(state, { marker: 1 }); win.location.href = href; };
    return win;
  }
  function client(responses) {
    const calls = [];
    return { calls, from(table) {
      const call = { table, filters: [] }; calls.push(call);
      const query = { select(columns) { call.columns = columns; return query; }, eq(...args) { call.filters.push(args); return query; },
        maybeSingle() { return Promise.resolve(responses.shift()); } };
      return query;
    } };
  }
  const args = db => ({ client: db, userId: 'user', companies: [{ id: 'company', role: 'technician', default_location_id: 'salem' }], readStoredLocation: () => '', isCurrent: () => true });
  const win = browser(), link = createRequestEmailLink(win), db = client([{ data: row }]);
  assert.equal(await link.prepare({ ...args(db), userId: '' }), null, 'wait for sign-in');
  assert.equal(db.calls.length, 0);
  const target = await link.prepare(args(db));
  assert.deepEqual(target, { id, companyId: 'company', locationId: 'salem', userId: 'user' });
  assert.equal(await link.prepare(args(db)), target, 'same session render must not repeat lookup');
  assert.equal(db.calls.length, 1);
  assert.equal(link.forWorkspace('user', 'company', 'salem'), target);
  assert.equal(link.takeLanding('user', 'company', 'other'), false);
  assert.equal(link.takeLanding('user', 'company', 'salem'), true);
  assert.equal(link.takeLanding('user', 'company', 'salem'), false, 'no repeated scroll on render');
  for (const scope of [['other', 'company', 'salem'], ['user', 'other', 'salem'], ['user', 'company', 'other']]) assert.equal(link.forWorkspace(...scope), null);
  link.clear();
  assert.equal(win.location.href, 'https://example.test/MaintainOps/?keep=yes#anchor');
  assert.equal(await link.prepare(args(db)), null);
  for (const query of ['', '?request=public-token', '?public_request=token', '?qr=token']) {
    const unused = client([]);
    assert.equal(await createRequestEmailLink(browser(query)).prepare(args(unused)), null);
    assert.equal(unused.calls.length, 0, 'ordinary/public startup adds no data calls');
  }
  await assert.rejects(() => createRequestEmailLink(browser('?request_id=bad')).prepare(args(client([]))), /invalid/);
  for (const response of [{ data: null }, { data: { ...row, company_id: 'foreign' } }]) {
    await assert.rejects(() => createRequestEmailLink(browser()).prepare(args(client([response]))), /unavailable or your account/);
  }
  await assert.rejects(() => createRequestEmailLink(browser()).prepare(args(client([{ error: { message: 'network' } }]))), /try the email link again/);
  for (const role of ['technician', 'production', 'accounting']) {
    const restricted = { ...args(client([{ data: row }, { data: { mobile_tech: false } }])), companies: [{ id: 'company', role, default_location_id: 'riverside' }] };
    await assert.rejects(() => createRequestEmailLink(browser()).prepare(restricted), /another facility/);
  }
  for (const role of ['admin', 'manager']) {
    const allowed = { ...args(client([{ data: row }])), companies: [{ id: 'company', role, default_location_id: 'riverside' }] };
    assert.equal((await createRequestEmailLink(browser()).prepare(allowed)).locationId, 'salem');
  }
  const mobile = { ...args(client([{ data: row }, { data: { mobile_tech: true } }])), readStoredLocation: () => 'riverside' };
  assert.equal((await createRequestEmailLink(browser()).prepare(mobile)).locationId, 'salem');
  assert.equal(await createRequestEmailLink(browser()).prepare({ ...args(client([{ data: row }])), isCurrent: () => false }), null);
  const canceled = createRequestEmailLink(browser());
  const pending = canceled.prepare(args(client([{ data: row }])));
  canceled.clear();
  assert.equal(await pending, null, 'late responses cannot reopen a dismissed route');
  const switched = createRequestEmailLink(browser());
  await switched.prepare(args(client([{ data: row }])));
  await assert.rejects(() => switched.prepare({ ...args(client([{ data: null }])), userId: 'other' }), /unavailable/);
  assert.equal(switched.forCompany('other', 'company'), null, 'never reuse another login access');

  const byId = client([{ data: { ...row, status: 'converted' } }]);
  const result = await fetchLinkedRequest(byId, target, ['relations', '*'], () => false);
  assert.equal(result.count, 1);
  assert.deepEqual(byId.calls[0].filters, [['company_id', 'company'], ['id', id], ['location_id', 'salem']]);
  assert.equal(result.data[0].status, 'converted', 'no active-only filter or page limit');
  const fallback = client([{ error: { code: 'schema' } }, { data: row }]);
  assert.equal((await fetchLinkedRequest(fallback, target, ['relations', '*'], e => e.code === 'schema')).count, 1);
  const denied = client([{ error: { code: '42501' } }]);
  assert.equal((await fetchLinkedRequest(denied, target, ['relations', '*'], () => false)).error.code, '42501');
  assert.equal(denied.calls.length, 1);
  assert.equal((await fetchLinkedRequest(client([{ data: null }]), target, ['*'], () => false)).count, 0);

  // Execute the real email template without importing the server or sending email.
  const source = readFileSync('supabase/functions/request-emailer/index.ts', 'utf8');
  const pure = source.slice(source.indexOf('function cleanText'), source.indexOf('async function sendEmail'));
  const context = vm.createContext({});
  vm.runInContext(transformSync(pure, { loader: 'ts' }).code, context);
  const email = context.emailBody({ request_id: id, request_title: '<Unsafe title>', request_description: 'Details here' }, 'https://loufish727.github.io/MaintainOps/');
  assert.match(email.text, new RegExp(`Open request: https://loufish727.github.io/MaintainOps/\\?request_id=${id}`));
  assert.match(email.html, />Open request<\/a>/);
  assert.match(email.html, /&lt;Unsafe title&gt;/);
  assert.doesNotMatch(email.html, /<Unsafe title>/);
  const app = readFileSync('app.js', 'utf8');
  assert.match(app, /data-back-to-requests/);
  assert.match(app, /data-linked-request/);
  console.log('request email link smoke passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
