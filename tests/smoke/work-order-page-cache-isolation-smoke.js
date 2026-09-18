const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.resolve(__dirname, '../../app.js'), 'utf8').replace(/\r\n/g, '\n');
function definition(name) {
  const start = source.indexOf(`function ${name}(`);
  if (start < 0) return '';
  const end = source.indexOf('\n}', start);
  assert.ok(end > start);
  return source.slice(start, end + 2);
}
const visibleExpression = source.match(/const visibleWorkOrders = ([^;]+);/)[1];
const context = vm.createContext({
  workOrders: [], workOrderPageIds: [], workOrderServerTotal: 0,
  workOrderQueueLoadRevision: 2, isWorkArea: true, showGlobalSearch: false,
  workOrderDashboardCounts: {}, myWorkDashboardCounts: {},
});
vm.runInContext([
  definition('commitLoadedWorkOrderSlice'), definition('mergeWorkOrdersById'),
  definition('loadedWorkOrderPage'),
  `function visibleRows() { return ${visibleExpression}; }`,
].join('\n'), context);
const pageRows = Array.from({ length: 12 }, (_, i) => ({ id: `page-${i}`, title: `Row ${i}` }));
context.commitLoadedWorkOrderSlice({ data: pageRows, count: 25 }, {}, {}, { revision: 2 });
const ids = () => Array.from(context.visibleRows(), row => row.id);
assert.deepEqual(ids(), pageRows.map(row => row.id));

// Detail/history loads may include completed, differently assigned, or next-page work.
context.mergeWorkOrdersById([{ id: 'completed-detail', status: 'completed' }, { id: 'next-page', status: 'open' }]);
assert.equal(context.workOrders.length, 14, 'Detail records remain available in the cache');
assert.deepEqual(ids(), pageRows.map(row => row.id), 'Only the 12 server-page members belong on the board');
assert.equal(context.workOrderServerTotal, 25);

context.mergeWorkOrdersById([{ id: 'page-3', title: 'Updated detail' }]);
assert.equal(context.visibleRows()[3].title, 'Updated detail', 'Current page uses the latest cached values without changing order');
context.workOrders.unshift({ id: 'notification-detail' });
assert.deepEqual(ids(), pageRows.map(row => row.id));
assert.equal(context.commitLoadedWorkOrderSlice({ data: [{ id: 'stale' }], count: 1 }, {}, {}, { revision: 1 }), false);
assert.deepEqual(ids(), pageRows.map(row => row.id), 'Stale responses cannot replace page membership');

context.workOrderQueueLoadRevision = 3;
context.commitLoadedWorkOrderSlice({ data: [{ id: 'next-page' }], count: 25 }, {}, {}, { revision: 3 });
assert.deepEqual(ids(), ['next-page'], 'Next page replaces, rather than merges, the previous membership');
context.workOrders = [];
assert.deepEqual(ids(), [], 'Reset cache does not expose missing records');
context.commitLoadedWorkOrderSlice({ data: [], count: 0 }, {}, {}, { revision: 3 });
assert.deepEqual(Array.from(context.workOrderPageIds), []);
context.showGlobalSearch = true;
assert.deepEqual(ids(), []);
console.log('Work-order server page stays isolated from detail/history/notification cache');
