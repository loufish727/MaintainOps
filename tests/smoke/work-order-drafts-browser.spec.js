const path = require('node:path');
const { test, expect } = require('@playwright/test');

async function mount(page) {
  await page.route('http://drafts.test/**', route => route.fulfill({ contentType: 'text/html', body: '<main></main>' }));
  await page.goto('http://drafts.test/');
  for (const file of ['utils/workOrderDrafts.js', 'utils/workspaceWorkOrderCompletionEvents.js', 'workflows/workOrderStatusWorkflow.js']) {
    await page.addScriptTag({ path: path.resolve('src', file) });
  }
  await page.evaluate(() => {
    window.scope = 'user:company:salem'; window.orderId = 'order-1'; window.blocked = true; window.failSave = false;
    window.payloads = []; window.notices = []; window.server = {};
    window.drafts = window.MaintainOpsWorkOrderDrafts.createWorkOrderDrafts({ getScope: () => window.scope });
    window.paint = () => {
      drafts.capture();
      document.querySelector('main').innerHTML = `<div data-work-order-editor="${orderId}">
        <form id="quick-update-work-order-form"><input name="title" value="Issue"><textarea name="resolution_summary"></textarea><input name="new_asset_name"><select name="priority"><option>high</option><option>low</option></select></form>
        <form id="complete-work-order-form"><textarea name="resolution_summary"></textarea><textarea name="failure_cause"></textarea><textarea name="completion_notes"></textarea><input name="actual_minutes" type="number" value="0"><input type="checkbox" name="follow_up_needed"><input type="checkbox" name="safety_devices_checked"><p id="completion-error" role="alert"></p><button type="submit">Complete Work Order</button></form>
        <form id="edit-work-order-form"><input name="title" value="Issue"><textarea name="description"></textarea><textarea name="resolution_summary"></textarea><textarea name="completion_notes"></textarea><textarea name="failure_cause"></textarea><input name="actual_minutes" type="number" value="0"><input type="checkbox" name="follow_up_needed"></form>
      </div>`;
      for (const field of document.querySelectorAll('[name]')) if (Object.hasOwn(server, field.name)) {
        if (field.type === 'checkbox') field.checked = server[field.name]; else field.value = server[field.name] ?? '';
      }
      drafts.restore(); events.bindWorkspaceWorkOrderCompletionEvents();
    };
    window.save = async (payload, id) => {
      if (payload.status === 'completed') payload = { ...drafts.completionFields(id), ...payload };
      const token = drafts.snapshot(id);
      if (window.delaySave) await new Promise(resolve => { window.releaseSave = resolve; });
      if (window.failSave) return { error: new Error('Offline') };
      window.payloads.push(payload); Object.assign(server, payload); drafts.acknowledge(token, payload); return {};
    };
    const work = { id: 'order-1', status: 'open' };
    window.events = window.MaintainOpsWorkspaceWorkOrderCompletionEvents.createWorkspaceWorkOrderCompletionEvents({
      getActiveWorkOrderId: () => orderId, getWorkOrderById: () => work, getScope: () => scope,
      blocksProcedureCompletion: () => blocked ? 'Complete the checklist first.' : '', getProcedureById: () => null,
      requiredChecklistProgress: () => ({ done: 0, total: 0 }), requiresSafetyDeviceCheck: () => false, hasCompletedSafetyDeviceCheck: () => false,
      applySafetyRequirementPayload: () => {}, applySafetyCheckPayload: () => {}, withOperationTimeout: promise => promise,
      updateWorkOrderSafely: save, recordWorkOrderEvent: async () => ({}), setWorkOrderActionWarning: () => {},
      friendlyWorkOrderSaveError: error => error.message, showNotice: (...args) => notices.push(args), render: async () => paint(),
    });
    window.statusWorkflow = window.MaintainOpsWorkOrderStatusWorkflow.createWorkOrderStatusWorkflow({
      getScope: () => scope, getWorkOrders: () => [work], blocksProcedureCompletion: () => blocked ? 'Complete the checklist first.' : '',
      setActiveWorkOrderId: () => {}, setWorkOrderActionWarning: () => {}, showNotice: (...args) => notices.push(args), render: async () => paint(),
      currentSafetyCheckboxCheckedForWorkOrder: () => false, hasCompletedSafetyDeviceCheck: () => false, requiresSafetyDeviceCheck: () => false,
      applySafetyRequirementPayload: () => {}, applySafetyCheckPayload: () => {}, updateWorkOrderSafely: save,
      withOperationTimeout: promise => promise, recordWorkOrderEvent: async () => ({}), statusLabel: value => value,
    });
    paint();
  });
}
const field = (page, form, name) => page.locator(`#${form}-work-order-form [name=${name}]`);

test('notes synchronize across completion paths and survive blocked completion redraws', async ({ page }) => {
  await mount(page);
  await field(page, 'quick-update', 'resolution_summary').fill('Replaced hose and checked guards.');
  await field(page, 'complete', 'completion_notes').fill('Monitor tomorrow.');
  await field(page, 'edit', 'description').fill('Keep this separate unfinished edit.');
  await expect(field(page, 'complete', 'resolution_summary')).toHaveValue('Replaced hose and checked guards.');
  await expect(field(page, 'edit', 'completion_notes')).toHaveValue('Monitor tomorrow.');
  await page.evaluate(() => statusWorkflow.setWorkOrderStatus(orderId, 'completed'));
  for (const form of ['quick-update', 'complete', 'edit']) await expect(field(page, form, 'resolution_summary')).toHaveValue('Replaced hose and checked guards.');
  await expect(field(page, 'complete', 'completion_notes')).toHaveValue('Monitor tomorrow.');
  await page.getByRole('button', { name: 'Complete Work Order', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('checklist');
  expect(await page.evaluate(() => payloads.length)).toBe(0);
});

test('failed save keeps every outcome field; retry persists notes and clears only submitted edits', async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { blocked = false; failSave = true; });
  await field(page, 'quick-update', 'resolution_summary').fill('Resolved from Quick Update');
  await field(page, 'complete', 'completion_notes').fill('Private <img src=x onerror=alert(1)> notes');
  await field(page, 'complete', 'failure_cause').fill('Worn hose');
  await field(page, 'complete', 'actual_minutes').fill('35');
  await field(page, 'complete', 'follow_up_needed').check();
  await field(page, 'edit', 'description').fill('Unsubmitted description');
  const complete = page.getByRole('button', { name: 'Complete Work Order', exact: true });
  await complete.click();
  await expect(page.getByRole('alert')).toContainText('Offline');
  await page.evaluate(() => paint());
  await expect(field(page, 'complete', 'resolution_summary')).toHaveValue('Resolved from Quick Update');
  await expect(field(page, 'complete', 'actual_minutes')).toHaveValue('35');
  await expect(field(page, 'complete', 'follow_up_needed')).toBeChecked();
  await expect(page.locator('img')).toHaveCount(0);
  await page.evaluate(() => { failSave = false; });
  await complete.click();
  await expect.poll(() => page.evaluate(() => payloads.length)).toBe(1);
  expect(await page.evaluate(() => payloads[0])).toMatchObject({ resolution_summary: 'Resolved from Quick Update', completion_notes: 'Private <img src=x onerror=alert(1)> notes', failure_cause: 'Worn hose', actual_minutes: 35, follow_up_needed: true });
  expect(await page.evaluate(() => Object.keys(drafts.snapshot(orderId).fields))).toEqual(['description']);
  await expect(field(page, 'edit', 'description')).toHaveValue('Unsubmitted description');
});

test('status completion includes outcome drafts instead of saving status alone', async ({ page }) => {
  await mount(page);
  await field(page, 'quick-update', 'resolution_summary').fill('Status path resolution');
  await field(page, 'complete', 'completion_notes').fill('Status path notes');
  await page.evaluate(() => { blocked = false; return statusWorkflow.setWorkOrderStatus(orderId, 'completed'); });
  expect(await page.evaluate(() => payloads[0])).toMatchObject({ status: 'completed', resolution_summary: 'Status path resolution', completion_notes: 'Status path notes' });
  expect(await page.evaluate(() => Object.keys(drafts.snapshot(orderId).fields))).toEqual([]);
});

test('edits typed during save, including changes back to the submitted value, are never cleared', async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { blocked = false; delaySave = true; });
  await field(page, 'complete', 'completion_notes').fill('First notes');
  await page.getByRole('button', { name: 'Complete Work Order', exact: true }).click();
  await field(page, 'complete', 'completion_notes').fill('Later notes');
  await field(page, 'complete', 'resolution_summary').fill('Added while saving');
  await field(page, 'complete', 'completion_notes').fill('First notes');
  await page.evaluate(() => releaseSave());
  await expect.poll(() => page.evaluate(() => payloads.length)).toBe(1);
  await expect(field(page, 'complete', 'resolution_summary')).toHaveValue('Added while saving');
  expect(await page.evaluate(() => drafts.snapshot(orderId).fields.completion_notes.value)).toBe('First notes');
});

test('drafts isolate account, company, facility and order, and clear on sign out', async ({ page }) => {
  await mount(page);
  await field(page, 'quick-update', 'resolution_summary').fill('Only Salem order 1');
  for (const scope of ['other:company:salem', 'user:other:salem', 'user:company:auburn']) {
    await page.evaluate(scope => { window.scope = scope; paint(); }, scope);
    await expect(field(page, 'quick-update', 'resolution_summary')).toHaveValue('');
  }
  await page.evaluate(() => { scope = 'user:company:salem'; orderId = 'order-2'; paint(); });
  await expect(field(page, 'quick-update', 'resolution_summary')).toHaveValue('');
  await page.evaluate(() => { orderId = 'order-1'; paint(); });
  await expect(field(page, 'quick-update', 'resolution_summary')).toHaveValue('Only Salem order 1');
  await page.evaluate(() => { drafts.reset(); paint(); });
  await expect(field(page, 'quick-update', 'resolution_summary')).toHaveValue('');
  expect(await page.evaluate(() => sessionStorage.length)).toBe(0);
});

test('drafts survive browser reload without restoring safety attestations', async ({ page }) => {
  await mount(page);
  await field(page, 'quick-update', 'resolution_summary').fill('Reload draft');
  await field(page, 'complete', 'follow_up_needed').check();
  await field(page, 'complete', 'safety_devices_checked').check();
  await mount(page);
  await expect(field(page, 'complete', 'resolution_summary')).toHaveValue('Reload draft');
  await expect(field(page, 'complete', 'follow_up_needed')).toBeChecked();
  await expect(field(page, 'complete', 'safety_devices_checked')).not.toBeChecked();
});

test('unavailable storage retains in-memory drafts and old save responses cannot clear a new session', async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error('Quota exceeded'); }; });
  await field(page, 'quick-update', 'resolution_summary').fill('Memory fallback');
  await page.evaluate(() => paint());
  await expect(field(page, 'quick-update', 'resolution_summary')).toHaveValue('Memory fallback');
  await page.evaluate(() => { window.old = drafts.snapshot(orderId); drafts.reset(); paint(); });
  await field(page, 'quick-update', 'resolution_summary').fill('Memory fallback');
  await page.evaluate(() => { drafts.acknowledge(old, { resolution_summary: 'Memory fallback' }); paint(); });
  await expect(field(page, 'quick-update', 'resolution_summary')).toHaveValue('Memory fallback');
});

test('invalid and expired stored drafts cannot overwrite a record', async ({ page }) => {
  await mount(page);
  for (const value of ['{', JSON.stringify({ at: 0, fields: { resolution_summary: { value: 'Expired', revision: 1 } } }), JSON.stringify({ at: Date.now(), fields: { resolution_summary: { value: {}, revision: 1 } } })]) {
    await page.evaluate(value => sessionStorage.setItem('maintainops.workOrderDraft.v1:user:company:salem:order-1', value), value);
    await mount(page);
    await expect(field(page, 'quick-update', 'resolution_summary')).toHaveValue('');
  }
});

test('a detached form and duplicate blur changes cannot resurrect acknowledged drafts', async ({ page }) => {
  await mount(page);
  await field(page, 'complete', 'completion_notes').fill('Saved notes');
  await page.evaluate(() => {
    const old = document.querySelector('#complete-work-order-form [name=completion_notes]');
    const token = drafts.snapshot(orderId);
    drafts.acknowledge(token, { completion_notes: 'Saved notes' });
    old.dispatchEvent(new Event('change', { bubbles: true }));
    paint();
    old.value = 'Detached notes'; old.dispatchEvent(new Event('input', { bubbles: true }));
  });
  expect(await page.evaluate(() => Object.keys(drafts.snapshot(orderId).fields))).toEqual([]);
});
