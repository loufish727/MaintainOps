const path = require('node:path');
const { test, expect } = require('@playwright/test');

async function mount(page, status) {
  await page.setContent('<html data-theme="dark"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><main style="max-width:640px;margin:auto;padding:12px"></main></body></html>');
  await page.addStyleTag({ path: path.resolve('styles.css') });
  for (const file of ['render/iconDisplay.js', 'render/workOrderDetailDisplay.js', 'utils/workSectionJumpEvents.js', 'utils/workspaceWorkOrderCompletionEvents.js', 'utils/workspaceWorkOrderStatusEvents.js']) {
    await page.addScriptTag({ path: path.resolve('src', file) });
  }
  await page.evaluate(status => {
    const escapeHtml = v => String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
    const work = { id: 'qa-order', title: 'Repair hydraulic leak', status, priority: 'high', type: 'corrective', asset_id: 'equipment', procedure_template_id: 'inspection', resolution_summary: 'Replaced hose', failure_cause: 'Worn hose', completion_notes: 'Saved notes', follow_up_needed: true, actual_minutes: 25 };
    const step = { id: 'guard', position: 1, prompt: 'Inspect guards', response_type: 'checkbox', required: true };
    const procedure = { id: 'inspection', name: 'Equipment inspection', procedure_steps: [step] };
    let inspected = false;
    const deps = {
      getActiveWorkOrderId: () => work.id, getWorkOrders: () => [work], getProcedureTemplates: () => [procedure],
      getCommentsByWorkOrder: () => ({}), getPhotosByWorkOrder: () => ({}), getEventsByWorkOrder: () => ({}), getPartsUsedByWorkOrder: () => ({}),
      getStepResultsByWorkOrder: () => ({}), getProfilesByUserId: () => ({}), getParts: () => [], getCommentsError: () => '',
      getWorkOrderActionWarningId: () => '', getWorkOrderActionWarning: () => '', getPendingDeleteWorkOrderId: () => '',
      escapeHtml, partUsageUnitCost: () => 0, buildActivityFeed: () => [], renderActivityItem: () => '',
      checklistProgress: () => ({ done: 0, total: 1 }), requiredChecklistProgress: () => ({ done: Number(inspected), total: 1 }),
      cleanWorkOrderDescription: v => v, renderRelationshipChips: () => '', renderWorkOrderCommandSummary: () => '<div id="commands">Work summary</div>',
      renderWorkOrderRecommendation: () => '', renderWorkOrderMessages: () => '', renderProductionActionDetail: () => '',
      canEditOperationalRecords: () => true, canDeleteWorkOrders: () => false, canAssignWorkOrderToMe: () => false,
      requiresSafetyDeviceCheck: () => true, hasCompletedSafetyDeviceCheck: () => false, hasOpenProductionAction: () => false,
      renderAssetOptions: () => '<option value="equipment" selected>Press</option>', renderProcedureOptions: () => '<option value="inspection" selected>Inspection</option>',
      assetLocationRoutingMessage: () => '', renderWorkOrderAssignmentField: () => '', statusLabel: s => s === 'completed' ? 'All Completed' : s,
      segmentIcon: window.MaintainOpsIconDisplay.segmentIcon, STATUS_OPTIONS: ['open', 'in_progress', 'blocked', 'completed'], TYPE_OPTIONS: ['corrective'],
    };
    document.querySelector('main').innerHTML = window.MaintainOpsWorkOrderDetailDisplay.createWorkOrderDetailDisplayHelpers(deps).renderWorkOrderDetail();
    document.querySelector('[data-step-result]').addEventListener('change', event => { inspected = event.target.checked; });
    window.completionWrites = [];
    window.MaintainOpsWorkSectionJumpEvents.bindWorkSectionJumpEvents();
    window.MaintainOpsWorkspaceWorkOrderCompletionEvents.createWorkspaceWorkOrderCompletionEvents({
      getActiveWorkOrderId: () => work.id, getWorkOrderById: () => work, getScope: () => 'qa-only', getProcedureById: () => procedure,
      blocksProcedureCompletion: () => inspected ? '' : 'Complete required checklist steps first (0/1).', requiredChecklistProgress: deps.requiredChecklistProgress,
      requiresSafetyDeviceCheck: deps.requiresSafetyDeviceCheck, hasCompletedSafetyDeviceCheck: deps.hasCompletedSafetyDeviceCheck,
      applySafetyRequirementPayload: payload => { payload.safety_check_required = true; }, applySafetyCheckPayload: (payload, checked) => { payload.safety_devices_checked = checked; },
      withOperationTimeout: promise => promise, updateWorkOrderSafely: async (payload, id) => { window.completionWrites.push({ payload, id }); return {}; },
      recordWorkOrderEvent: async () => ({}), showNotice: () => {}, setWorkOrderActionWarning: () => {}, render: async () => {},
    }).bindWorkspaceWorkOrderCompletionEvents();
  }, status);
}

for (const width of [320, 390, 1280]) {
  for (const status of ['open', 'in_progress']) {
    test(`completion is prominent and guarded: ${status} at ${width}px`, async ({ page }, info) => {
      await page.setViewportSize({ width, height: 844 });
      await mount(page, status);
      const panel = page.locator('#work-order-complete-target');
      const heading = panel.locator(':scope > summary');
      await expect(heading).toBeInViewport();
      const bounds = await heading.boundingBox();
      expect(bounds.height).toBeGreaterThanOrEqual(48);
      await page.screenshot({ path: info.outputPath('completion-closed.png') });
      await heading.focus();
      await page.keyboard.press('Enter');
      const form = panel.locator('form');
      await expect(form.locator('[name=resolution_summary]')).toHaveValue('Replaced hose');
      await expect(form.locator('[name=failure_cause]')).toBeHidden();
      const complete = form.getByRole('button', { name: 'Complete Work Order', exact: true });
      await page.screenshot({ path: info.outputPath('completion-open.png') });
      await complete.click();
      expect(await page.evaluate(() => window.completionWrites.length)).toBe(0);
      await form.locator('[name=safety_devices_checked]').check();
      await complete.click();
      await expect(form.getByRole('alert')).toContainText('Complete required checklist');
      expect(await page.evaluate(() => window.completionWrites.length)).toBe(0);
      await form.getByRole('button', { name: 'Review checklist' }).click();
      await page.locator('[data-step-result]').check();
      await complete.click();
      await expect.poll(() => page.evaluate(() => window.completionWrites.length)).toBe(1);
      expect(await page.evaluate(() => window.completionWrites[0])).toMatchObject({ id: 'qa-order', payload: { status: 'completed', safety_devices_checked: true, resolution_summary: 'Replaced hose', failure_cause: 'Worn hose', completion_notes: 'Saved notes', follow_up_needed: true, actual_minutes: 25 } });
      await form.locator('.completion-options > summary').click();
      await expect(form.locator('[name=failure_cause]')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await heading.scrollIntoViewIfNeeded();
      await page.screenshot({ path: info.outputPath('completion.png') });
    });
  }
}

test('a blocked card completion opens only that order completion panel', async ({ page }) => {
  await mount(page, 'open');
  await page.evaluate(() => {
    const button = document.createElement('button');
    button.textContent = 'Complete from card'; button.dataset.quickStatus = 'completed'; button.dataset.id = 'other-order';
    document.querySelector('main').prepend(button);
    window.MaintainOpsWorkspaceWorkOrderStatusEvents.bindWorkspaceWorkOrderStatusEvents({ setWorkOrderStatus: async () => false, showNotice: () => {} });
  });
  const cardButton = page.getByRole('button', { name: 'Complete from card' });
  await cardButton.click();
  await expect(page.locator('#work-order-complete-target')).not.toHaveAttribute('open', '');
  await cardButton.evaluate(node => { node.dataset.id = 'qa-order'; });
  await cardButton.click();
  await expect(page.locator('#work-order-complete-target')).toHaveAttribute('open', '');
  await expect(page.locator('#work-order-complete-target > summary')).toBeFocused();
});

test('completion preparation cannot submit after navigation or leave its button stuck', async ({ page }) => {
  await mount(page, 'open');
  await page.evaluate(() => {
    const button = document.createElement('button');
    button.textContent = 'Complete from card'; button.dataset.quickStatus = 'completed'; button.dataset.id = 'qa-order';
    document.querySelector('main').prepend(button);
    window.completionScope = 'initial'; window.statusSaves = 0;
    window.MaintainOpsWorkspaceWorkOrderStatusEvents.bindWorkspaceWorkOrderStatusEvents({
      getScope: () => window.completionScope,
      prepareCompletion: () => new Promise(resolve => { window.releaseCompletion = resolve; }),
      setWorkOrderStatus: async () => { window.statusSaves++; return false; }, showNotice: () => {},
    });
  });
  const button = page.getByRole('button', { name: 'Complete from card' });
  await button.click();
  await expect(page.getByRole('button', { name: 'Saving...', exact: true })).toBeDisabled();
  await page.evaluate(() => { window.completionScope = 'other-workspace'; window.releaseCompletion(); });
  await expect(button).toBeEnabled();
  expect(await page.evaluate(() => window.statusSaves)).toBe(0);
  await button.click();
  await page.evaluate(() => window.releaseCompletion());
  await expect(button).toBeEnabled();
  expect(await page.evaluate(() => window.statusSaves)).toBe(1);
});
