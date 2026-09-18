const { test, expect } = require('@playwright/test');
const { createQa, nav, expandFor } = require('../helpers/appwide-qa');

test.setTimeout(180000);
test.describe.configure({ retries: 0 });

test('Accounting cannot record part usage while a technician can persist one stock deduction', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const part = await qa.seed('parts', {
      location_id: qa.location, name: 'QA RPC Boundary Belt', quantity_on_hand: 10, unit_cost: 12.5,
    });
    const work = await qa.seed('work_orders', {
      location_id: qa.location, title: 'QA RPC Boundary Work', status: 'open',
      type: 'corrective', priority: 'medium', created_by: qa.sessions.admin.user.id,
      safety_check_required: false, safety_devices_checked: false,
    });
    const stock = () => qa.api('admin', 'GET', `parts?company_id=eq.${qa.company}&id=eq.${part.id}&select=quantity_on_hand`);
    const usage = () => qa.api('admin', 'GET', `work_order_parts?company_id=eq.${qa.company}&work_order_id=eq.${work.id}&select=*`);
    const payload = {
      p_company_id: qa.company, p_work_order_id: work.id, p_part_id: part.id, p_quantity: 2,
    };
    expect(await stock()).toEqual([{ quantity_on_hand: 10 }]);
    expect(await usage()).toEqual([]);

    const denied = await qa.raw('accounting', 'POST', 'rpc/record_work_order_part_usage', payload);
    const deniedBody = await denied.text();
    // Continue to the positive control even if Accounting unexpectedly mutates stock.
    expect.soft([400, 403], `Accounting must receive an authorization rejection: ${deniedBody}`).toContain(denied.status());
    expect.soft(deniedBody, 'Missing RPCs, schema failures and expired sessions are not authorization proof').toMatch(
      /read.?only|accounting|permission denied|not (?:authorized|allowed)|cannot (?:record|use|edit)|operational editor/i
    );
    expect.soft(await stock(), 'Denied usage must leave stock unchanged').toEqual([{ quantity_on_hand: 10 }]);
    expect.soft(await usage(), 'Denied usage must not create a usage row').toEqual([]);

    await qa.api('technician', 'POST', 'rpc/record_work_order_part_usage', payload);
    expect(await stock()).toEqual([{ quantity_on_hand: 8 }]);
    const recorded = await usage();
    expect(recorded).toHaveLength(1);
    expect(recorded[0]).toMatchObject({
      company_id: qa.company, work_order_id: work.id, part_id: part.id,
      quantity_used: 2, created_by: qa.sessions.technician.user.id,
    });
  } finally { await qa.finish(); }
});

test('Equipment Linked Parts retains the exact note element while idle and saves one link', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const asset = await qa.seed('assets', {
      location_id: qa.location, name: 'QA Linked Parts Press', created_by: qa.sessions.admin.user.id,
    });
    const part = await qa.seed('parts', {
      location_id: qa.location, name: 'QA Linked Parts Belt', quantity_on_hand: 10,
    });
    const links = () => qa.api('admin', 'GET', `asset_parts?company_id=eq.${qa.company}&asset_id=eq.${asset.id}&select=*`);
    expect(await links()).toEqual([]);

    const page = await qa.open('admin', 'assets');
    await page.locator(`.asset-card[data-asset-id="${asset.id}"]`).click();
    await page.qaSettle();
    await page.locator('#asset-linked-parts-target > summary').click();
    const form = page.locator(`[data-attach-asset-part="${asset.id}"]`);
    await expect(form).toBeVisible();
    await form.locator('[name=part_id]').selectOption(part.id);
    await form.locator('[name=quantity_recommended]').fill('2');
    const noteText = 'Keep this exact linked-parts note while the disclosure is idle.';
    const note = await form.locator('[name=note]').elementHandle();
    expect(note).not.toBeNull();
    try {
      await note.fill(noteText);
      // Do not reacquire the element: a replacement with the same value must fail.
      await page.waitForTimeout(1200);
      expect(await note.evaluate(element => ({ connected: element.isConnected, value: element.value }))).toEqual({
        connected: true, value: noteText,
      });
      await expect(form.locator('[name=part_id]')).toHaveValue(part.id);
      await expect(form.locator('[name=quantity_recommended]')).toHaveValue('2');
      await form.locator('button[type=submit]').click();
    } finally { await note.dispose(); }

    await expect.poll(async () => (await links()).length).toBe(1);
    expect((await links())[0]).toMatchObject({
      company_id: qa.company, asset_id: asset.id, part_id: part.id,
      quantity_recommended: 2, note: noteText,
    });
    await page.qaSettle();
    await expect(page.locator('#asset-linked-parts-target')).toContainText(noteText);
    expect(await links()).toHaveLength(1);
    await qa.shot(page, 'linked-parts-stable-note');
  } finally { await qa.finish(); }
});

test('fresh Planning Open Original loads completed work outside the active Work Orders slice', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const asset = await qa.seed('assets', {
      location_id: qa.location, name: 'QA Planning Original Press',
      created_by: qa.sessions.admin.user.id, safety_devices_required: true,
    });
    const completedAt = new Date().toISOString();
    const completed = await qa.seed('work_orders', {
      location_id: qa.location, asset_id: asset.id, title: 'QA Uncached Completed Original',
      type: 'corrective', priority: 'medium', status: 'completed',
      created_by: qa.sessions.admin.user.id, completed_at: completedAt,
      resolution_summary: 'QA guard inspection completed; follow-up still needed.',
      follow_up_needed: true, actual_minutes: 15,
      safety_check_required: true, safety_devices_checked: true, safety_devices_checked_at: completedAt,
    });
    const open = await qa.seed('work_orders', {
      location_id: qa.location, title: 'QA Active Slice Only', status: 'open',
      type: 'corrective', priority: 'medium', created_by: qa.sessions.admin.user.id,
      safety_check_required: false, safety_devices_checked: false,
    });

    // A new context has never opened the completed order or a completed-work filter.
    const page = await qa.open('admin', 'work');
    await expect(page.locator('[data-work-status-filter]')).toHaveValue('active');
    await expect(page.locator('.work-card')).toHaveCount(1);
    await expect(page.locator(`.work-card[data-id="${open.id}"]`)).toBeVisible();
    await expect(page.locator(`.work-card[data-id="${completed.id}"]`)).toHaveCount(0);

    await nav(page, 'planning');
    const original = page.locator(`[data-planning-group="follow-up"] [data-mini-work-order="${completed.id}"]`);
    await expandFor(original);
    await expect(original).toHaveText('Open Original');
    await original.click();
    await expect(page.locator('[data-section=work]')).toHaveAttribute('aria-current', 'page');
    const detail = page.locator('#quick-update-work-order-form');
    await expect(detail.locator('[name=title]')).toHaveValue(completed.title);
    await expect(page.locator('#status-select')).toHaveValue('completed');
    await expect(detail.locator('[name=asset_id]')).toHaveValue(asset.id);
    await expect(detail.locator('[name=resolution_summary]')).toHaveValue(completed.resolution_summary);
    await expect(detail.locator('[name=safety_devices_checked]')).toBeChecked();
    await expect(page.locator(`[data-quick-status][data-id="${completed.id}"]`).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Work order not loaded', exact: true })).toHaveCount(0);
    await qa.shot(page, 'planning-uncached-original');
  } finally { await qa.finish(); }
});
