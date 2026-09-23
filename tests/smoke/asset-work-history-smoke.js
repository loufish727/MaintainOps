const assert = require('node:assert/strict');
global.window = {};
require('../../src/services/workOrdersService.js');
const { fetchAssetWorkOrderCounts, fetchWorkOrdersByAsset } = window.MaintainOpsWorkOrdersService;

function clientFor(respond) {
  const calls = [];
  return {
    calls,
    from(table) {
      const call = { table, filters: [], orders: [] }; calls.push(call);
      return {
        select(columns, options) { Object.assign(call, { columns, options }); return this; },
        eq(key, value) { call.filters.push(['eq', key, value]); return this; },
        neq(key, value) { call.filters.push(['neq', key, value]); return this; },
        order(key, options) { call.orders.push([key, options]); return this; },
        range(start, end) { call.range = [start, end]; return this; },
        then(resolve, reject) { return Promise.resolve().then(() => respond(call, calls.length)).then(resolve, reject); },
      };
    },
  };
}
const deferred = () => { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; };

async function main() {
  const countsClient = clientFor(call => ({ count: call.filters.some(f => f[0] === 'neq') ? 0 : 2 }));
  assert.deepEqual((await fetchAssetWorkOrderCounts(countsClient, 'company', 'asset')).data, { open: 0, completed: 2 });
  assert.equal(countsClient.calls.length, 2);
  for (const call of countsClient.calls) {
    assert.equal(call.table, 'work_orders');
    assert.deepEqual(call.options, { count: 'exact', head: true });
    assert.deepEqual(call.filters.slice(0, 2), [['eq', 'company_id', 'company'], ['eq', 'asset_id', 'asset']]);
  }
  for (const response of [{ count: null }, { count: -1 }, { error: new Error('denied') }]) {
    const result = await fetchAssetWorkOrderCounts(clientFor(() => response), 'company', 'asset');
    assert.ok(result.error); assert.equal(result.data, undefined);
  }

  const rows = Array.from({ length: 1203 }, (_, index) => ({ id: String(index), status: 'completed' }));
  for (const cap of [1000, 500]) {
    const client = clientFor(call => ({ data: rows.slice(call.range[0], Math.min(call.range[1] + 1, call.range[0] + cap)), count: rows.length }));
    assert.deepEqual((await fetchWorkOrdersByAsset(client, 'company', 'asset', '*')).data, rows);
    assert.equal(client.calls.length, Math.ceil(rows.length / cap));
    client.calls.forEach((call, index) => {
      assert.deepEqual(call.range, [index * cap, index * cap + 999]);
      assert.deepEqual(call.filters, [['eq', 'company_id', 'company'], ['eq', 'asset_id', 'asset']]);
      assert.deepEqual(call.orders.map(order => order[0]), ['completed_at', 'created_at', 'id']);
    });
  }
  const failedPage = clientFor(call => call.range[0] ? { error: new Error('offline') } : { data: rows.slice(0, 1000), count: rows.length });
  const failed = await fetchWorkOrdersByAsset(failedPage, 'company', 'asset', '*');
  assert.ok(failed.error); assert.equal(failed.data, undefined, 'Do not report partial history as complete');

  const { createAssetWorkHistoryState } = await import('../../src/services/assetWorkHistoryState.mjs');
  let scope = 'session:company:location:1', countCalls = 0, historyCalls = 0;
  let countRequest = deferred(), historyRequest = deferred();
  const changed = [];
  const state = createAssetWorkHistoryState({
    getContext: () => ({ key: scope, companyId: 'company' }),
    fetchCounts: () => { countCalls++; return countRequest.promise; },
    fetchHistory: () => { historyCalls++; return historyRequest.promise; },
    onChange: (id, snapshot) => changed.push([id, snapshot]),
  });
  assert.equal(state.get('asset').countsStatus, 'idle');
  assert.equal(countCalls + historyCalls, 0, 'Reading state must not load data');
  const pending = state.ensureCounts('asset');
  assert.equal(state.ensureCounts('asset'), pending, 'Deduplicate count requests');
  assert.equal(state.get('asset').countsStatus, 'loading');
  assert.equal(state.get('asset').counts, undefined, 'Unknown is not zero');
  countRequest.resolve({ data: { open: 0, completed: 2 } }); await pending;
  assert.deepEqual(state.get('asset').counts, { open: 0, completed: 2 });
  await state.ensureCounts('asset');
  assert.equal(countCalls, 1); assert.equal(historyCalls, 0, 'Count must keep history lazy');
  const historyPending = state.loadHistory('asset');
  assert.equal(state.loadHistory('asset'), historyPending);
  historyRequest.resolve({ data: rows.slice(0, 2) }); await historyPending;
  assert.equal(state.get('asset').rows.length, 2); assert.equal(historyCalls, 1);

  state.invalidate('asset'); countRequest = deferred(); historyRequest = deferred();
  const oldCounts = state.ensureCounts('asset');
  const newerHistory = state.loadHistory('asset');
  historyRequest.resolve({ data: rows.slice(0, 3) }); await newerHistory;
  countRequest.resolve({ data: { open: 0, completed: 1 } });
  assert.equal(await oldCounts, null);
  assert.equal(state.get('asset').counts.completed, 3, 'Late counts cannot overwrite complete history');

  state.invalidate('asset'); countRequest = deferred(); historyRequest = deferred();
  const staleCount = state.ensureCounts('asset'), staleHistory = state.loadHistory('asset');
  scope = 'other-session:other-company:other-location:2';
  assert.equal(state.get('asset').countsStatus, 'idle');
  const changesBefore = changed.length;
  countRequest.resolve({ data: { open: 99, completed: 99 } }); historyRequest.resolve({ data: rows });
  assert.equal(await staleCount, null); assert.equal(await staleHistory, null);
  assert.equal(changed.length, changesBefore); assert.equal(state.get('asset').rows.length, 0);

  countRequest = deferred();
  const errorCount = state.ensureCounts('asset'); countRequest.resolve({ error: new Error('offline') }); await errorCount;
  assert.equal(state.get('asset').countsStatus, 'error'); assert.equal(state.get('asset').counts, undefined);
  const before = countCalls; await state.ensureCounts('asset'); assert.equal(countCalls, before, 'No automatic retry loop');
  historyRequest = deferred();
  const badHistory = state.loadHistory('asset'); historyRequest.resolve({ error: new Error('offline') }); await badHistory;
  assert.equal(state.get('asset').historyStatus, 'error');
  historyRequest = deferred();
  const retry = state.loadHistory('asset'); historyRequest.resolve({ data: [] }); await retry;
  assert.deepEqual(state.get('asset').counts, { open: 0, completed: 0 }, 'Successful empty response is a real zero');
  assert.equal(state.get('asset').historyStatus, 'ready');
  console.log('asset work history smoke passed (exact counts, pagination, lazy cache, races, failures)');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
