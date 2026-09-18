const { test, expect } = require('@playwright/test');
const { createQa, nav, expandFor } = require('../helpers/appwide-qa');

test.setTimeout(240000);

async function rows(qa, table, extra = '') {
  return qa.api('admin', 'GET', `${table}?company_id=eq.${qa.company}&select=*${extra}`);
}

test('equipment, parts, procedure, PM, work order, completion and history persist together', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const page = await qa.open();
    await nav(page, 'assets');
    const equipment = page.locator('#create-asset-form');
    await equipment.locator('[name=name]').fill('QA Press');
    await equipment.locator('[name=asset_code]').fill('QA-SERIAL-01');
    await equipment.locator('[name=manufacturer]').fill('QA Manufacturer');
    await equipment.locator('[name=model]').fill('Model A');
    await equipment.locator('[name=location_new]').fill('Fabrication');
    await equipment.getByRole('button', { name: 'Add Equipment', exact: true }).click();
    await expect.poll(async () => (await rows(qa, 'assets')).length).toBe(1);
    const asset = (await rows(qa, 'assets'))[0];
    expect(asset).toMatchObject({ name: 'QA Press', created_by: qa.sessions.admin.user.id, location_id: qa.location, asset_code: 'QA-SERIAL-01' });

    await nav(page, 'parts');
    const partForm = page.locator('#create-part-form');
    await partForm.locator('[name=name]').fill('QA Belt');
    await partForm.locator('[name=quantity_on_hand]').fill('10');
    await partForm.locator('[name=unit_cost]').fill('12.50');
    await partForm.getByRole('button', { name: 'Add Part', exact: true }).click();
    await expect.poll(async () => (await rows(qa, 'parts')).length).toBe(1);
    const part = (await rows(qa, 'parts'))[0];
    const restock = page.locator(`[data-restock-part="${part.id}"]`);
    await expandFor(restock);
    await restock.locator('[name=quantity]').fill('5');
    await restock.locator('button[type=submit]').click();
    await expect.poll(async () => (await rows(qa, 'parts'))[0].quantity_on_hand).toBe(15);

    await nav(page, 'procedures');
    await page.locator('#create-procedure-form [name=name]').fill('QA Inspection');
    await page.locator('#create-procedure-form button[type=submit]').click();
    await expect.poll(async () => (await rows(qa, 'procedure_templates')).length).toBe(1);
    const procedure = (await rows(qa, 'procedure_templates'))[0];
    const addStep = page.locator(`[data-add-step="${procedure.id}"]`);
    await addStep.locator('[name=prompt]').fill('Inspect belt condition');
    await addStep.locator('button[type=submit]').click();
    await expect(page.locator('.checklist-step')).toContainText('Inspect belt condition');

    await nav(page, 'pm');
    const pm = page.locator('#create-pm-form');
    await pm.locator('[name=title]').fill('QA Monthly Press');
    await pm.locator('[name=asset_id]').selectOption(asset.id);
    await pm.locator('[name=procedure_template_id]').selectOption(procedure.id);
    await pm.locator('[name=frequency]').selectOption('monthly');
    await pm.locator('[name=next_due_at]').fill('2026-09-01');
    await pm.locator('button[type=submit]').click();
    await expect.poll(async () => (await rows(qa, 'preventive_schedules')).length).toBe(1);
    const schedule = (await rows(qa, 'preventive_schedules'))[0];
    await page.locator(`[data-generate-pm="${schedule.id}"]`).click();
    await expect.poll(async () => (await rows(qa, 'work_orders')).length).toBe(1);
    let work = (await rows(qa, 'work_orders'))[0];
    expect(work.asset_id).toBe(asset.id);
    expect(work.procedure_template_id).toBe(procedure.id);
    await expect.poll(async () => (await rows(qa, 'preventive_schedules'))[0].next_due_at).toBe('2026-10-01');
    await nav(page, 'work');
    await page.getByRole('heading', { name: 'QA Monthly Press', exact: true }).click();
    await expect(page.locator('#status-select')).toBeVisible();
    await page.locator(`[data-assign-me="${work.id}"]`).click();
    await expect.poll(async () => (await rows(qa, 'work_orders'))[0].assigned_to).toBe(qa.sessions.admin.user.id);
    await page.locator('#status-select').selectOption('in_progress');
    await expect.poll(async () => (await rows(qa, 'work_orders'))[0].status).toBe('in_progress');
    const edit = page.locator('#edit-work-order-form');
    await expandFor(edit);
    await edit.locator('[name=description]').fill('Verified equipment association survives editing.');
    await edit.locator('button[type=submit]').click();
    await expect.poll(async () => (await rows(qa, 'work_orders'))[0].description).toContain('association survives');
    expect((await rows(qa, 'work_orders'))[0].asset_id).toBe(asset.id);

    const used = page.locator('#parts-used-form');
    await expandFor(used);
    await used.locator('[name=part_id]').selectOption(part.id);
    await used.locator('[name=quantity_used]').fill('2');
    await used.locator('button[type=submit]').click();
    await expect.poll(async () => (await rows(qa, 'parts'))[0].quantity_on_hand).toBe(13);
    const comment = page.locator('#comment-form');
    await expandFor(comment);
    await comment.locator('[name=body]').fill('QA persistent comment <script>not code</script>');
    await comment.locator('button[type=submit]').click();
    await expect(page.locator('#work-order-comments-target')).toContainText('QA persistent comment <script>not code</script>');

    const step = page.locator('[data-step-result]').first();
    await expandFor(step);
    await step.check();
    const completion = page.locator('#complete-work-order-form');
    await expandFor(completion);
    await completion.locator('[name=resolution_summary]').fill('Replaced belt');
    await completion.locator('[name=actual_minutes]').fill('25');
    await completion.locator('[name=safety_devices_checked]').check();
    await expect(completion.locator('[name=safety_devices_checked]')).toBeChecked();
    await expect(completion.locator('[name=resolution_summary]')).toHaveValue('Replaced belt');
    await qa.shot(page, 'before-completion');
    await completion.locator('button[type=submit]').click();
    await page.qaSettle();
    await expect.poll(async () => (await rows(qa, 'work_orders'))[0].status).toBe('completed');
    work = (await rows(qa, 'work_orders'))[0];
    expect(work).toMatchObject({ asset_id: asset.id, actual_minutes: 25, resolution_summary: 'Replaced belt', safety_devices_checked: true });
    expect(work.completed_at).toBeTruthy();
    await page.reload();
    await nav(page, 'procedures');
    await expect(page.getByRole('button', { name: 'Kept For Traceability' })).toBeDisabled();
    await qa.shot(page, 'traceability');
  } finally { await qa.finish(); }
});

test('a delayed checklist save cannot close or erase an in-progress completion form', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  let release;
  try {
    const procedure = await qa.seed('procedure_templates', { name: 'QA Delayed Checklist', created_by: qa.sessions.admin.user.id });
    const step = (await qa.api('admin', 'POST', 'procedure_steps', { company_id: qa.company, procedure_template_id: procedure.id, position: 1, prompt: 'Check guard', response_type: 'checkbox', required: true }))[0];
    const work = await qa.seed('work_orders', { location_id: qa.location, title: 'QA Draft Preservation', status: 'in_progress', procedure_template_id: procedure.id, created_by: qa.sessions.admin.user.id });
    const page = await qa.open('admin', 'work');
    await page.getByRole('heading', { name: work.title, exact: true }).click();
    await page.qaSettle();
    const gate = new Promise(resolve => { release = resolve; });
    await page.route('**/rest/v1/work_order_step_results?**', async route => {
      if (route.request().method() === 'POST') { const response = await route.fetch(); await gate; await route.fulfill({ response }); }
      else await route.continue();
    });
    const field = page.locator(`[data-step-result="${step.id}"]`);
    await field.check();
    await expect(field).toBeDisabled();
    await page.locator('#work-order-complete-target > summary').click();
    const draft = page.locator('#complete-work-order-form [name=resolution_summary]');
    await draft.fill('Keep these unsaved notes while checklist finishes.');
    release();
    await expect(field).toBeEnabled({ timeout: 15000 });
    await expect(draft).toBeVisible();
    await expect(draft).toHaveValue('Keep these unsaved notes while checklist finishes.');
    await expect(page.locator('[data-checklist-summary]')).toContainText('1 of 1');
    await qa.shot(page, 'preserved-completion-draft');
  } finally { release?.(); await qa.finish(); }
});
