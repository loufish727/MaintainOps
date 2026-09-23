const assert = require('node:assert/strict');
global.window = {};
require('../../src/utils/workspaceWorkOrderDeleteEvents.js');
const { createWorkspaceWorkOrderDeleteEvents } = window.MaintainOpsWorkspaceWorkOrderDeleteEvents;

function fixture(result = { data: [{ id: 'wo-1' }], error: null }, cleanupError = null) {
  const calls = [];
  const api = createWorkspaceWorkOrderDeleteEvents({
    documentRef: {}, canDeleteWorkOrders: () => true,
    removeWorkOrderDocuments: async () => { calls.push('prepare'); return async () => { calls.push('documents'); if (cleanupError) throw cleanupError; }; },
    getPhotoPathsByWorkOrder: () => ['company/wo/photo.jpg'],
    deleteWorkOrderRecord: async () => { calls.push('delete'); if (result instanceof Error) throw result; return result; },
    removeWorkOrderPhotoStorage: async () => { calls.push('photos'); return { error: null }; },
    withOperationTimeout: async promise => promise,
    setActiveWorkOrderId() {}, setActiveAssetId() {}, setPendingDeleteWorkOrderId() {},
    friendlyWorkOrderSaveError: error => error.message,
    alertRef: message => calls.push(['alert', message]), warnRef: () => calls.push('warning'),
    showNotice: (message, tone) => calls.push(['notice', message, tone]), render: async () => calls.push('render'),
  });
  return { calls, api };
}

(async () => {
  const normal = fixture();
  await Promise.all([normal.api.deleteWorkOrder('wo-1'), normal.api.deleteWorkOrder('wo-1')]);
  assert.deepEqual(normal.calls.slice(0, 4), ['prepare', 'delete', 'documents', 'photos']);
  assert.equal(normal.calls.filter(call => call === 'delete').length, 1);
  for (const result of [{ error: { message: 'denied' } }, { data: [] }, new Error('timeout')]) {
    const failed = fixture(result);
    await failed.api.deleteWorkOrder('wo-1');
    assert.equal(failed.calls.includes('documents'), false);
    assert.equal(failed.calls.includes('photos'), false);
    assert.equal(failed.calls.some(call => call[0] === 'alert'), true);
  }
  const cleanup = fixture(undefined, new Error('storage unavailable'));
  await cleanup.api.deleteWorkOrder('wo-1');
  assert.equal(cleanup.calls.find(call => call[0] === 'notice')[2], 'warning');
  assert.equal(cleanup.calls.at(-1), 'render');
  console.log('work order attachment deletion ordering smoke passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
