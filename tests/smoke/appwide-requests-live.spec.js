const { test, expect } = require('@playwright/test');
const { createQa, nav, expandFor } = require('../helpers/appwide-qa');
test.setTimeout(180000);

test('request conversion, Quick Fix and 12-item planning pages preserve links and dates', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    await qa.api('admin', 'POST', 'rpc/ensure_location_request_link', { target_location_id: qa.location });
    const link = (await qa.api('admin', 'GET', `public_request_links?company_id=eq.${qa.company}&location_id=eq.${qa.location}&select=token`))[0];
    const intake = await qa.openPublic(link.token);
    const form = intake.locator('#public-request-form');
    await form.locator('[name=title]').fill('QA Air leak');
    await form.locator('[name=requester_name]').fill('QA Operator');
    await form.locator('[name=equipment_note]').fill('Packing aisle');
    await form.locator('[name=description]').fill('Air leaks when idle.');
    await expect(form.locator('[name=photo]')).not.toHaveAttribute('capture');
    await form.locator('button[type=submit]').click();
    const requests = () => qa.api('admin', 'GET', `maintenance_requests?company_id=eq.${qa.company}&select=*`);
    await expect.poll(async () => (await requests()).length).toBe(1);
    const source = (await requests())[0];
    const page = await qa.open('technician', 'requests');
    await page.locator(`[data-convert-request="${source.id}"]`).click();
    await expect.poll(async () => (await requests())[0].status).toBe('converted');
    const converted = (await requests())[0];
    expect(converted.reviewed_by).toBe(qa.sessions.technician.user.id);
    expect(converted.converted_work_order_id).toBeTruthy();
    await expect(page.locator('#quick-update-work-order-form [name=title]')).toHaveValue('QA Air leak');
    await nav(page, 'requests');
    await page.locator('[data-request-filter=converted]').click();
    await expect(page.locator('#workspace-main')).toContainText('QA technician');
    await expect(page.locator('[data-convert-request]')).toHaveCount(0);

    await page.locator('[data-command-action=quick-fix]:visible').click();
    const quick = page.locator('#quick-fix-form');
    await quick.locator('[name=title]').fill('QA Quick Fix');
    await quick.locator('[name=mark_completed]').check();
    await expandFor(quick.locator('[name=resolution_summary]'));
    await quick.locator('[name=resolution_summary]').fill('Secured fitting');
    await quick.locator('[name=follow_up_needed]').check();
    await quick.locator('button[type=submit]').click();
    const work = () => qa.api('admin', 'GET', `work_orders?company_id=eq.${qa.company}&select=*`);
    await expect.poll(async () => (await work()).length).toBe(2);
    const fixed = (await work()).find(row => row.title === 'QA Quick Fix');
    expect(fixed.status).toBe('completed');
    expect(fixed.follow_up_needed).toBe(true);

    await qa.api('admin', 'POST', 'work_orders', Array.from({ length: 13 }, (_, i) => ({ company_id: qa.company, location_id: qa.location, title: `QA Unscheduled ${i}`, status: 'open', type: 'corrective', priority: 'medium', created_by: qa.sessions.admin.user.id })));
    await nav(page, 'planning');
    const group = page.locator('[data-planning-group=no-due]');
    await expect(group.locator('.planning-no-due-item')).toHaveCount(12);
    await group.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(group.locator('.planning-no-due-item')).toHaveCount(2);
    const due = group.locator('[data-planning-due-form]').first();
    const workId = await due.getAttribute('data-planning-due-form');
    await due.locator('[name=planning_due_at]').fill('2026-10-15');
    await due.locator('button[type=submit]').click();
    await expect.poll(async () => (await work()).find(row => row.id === workId).due_at).toBe('2026-10-15');
    await expect(page.locator(`[data-planning-due-form="${workId}"]`)).toHaveCount(0);
    const follow = page.locator('[data-planning-group=follow-up]');
    await expandFor(follow.locator('[data-create-follow-up]'));
    await follow.locator(`[data-mini-work-order="${fixed.id}"]`).click();
    await expect(page.locator('#quick-update-work-order-form [name=title]')).toHaveValue('QA Quick Fix');
    await nav(page, 'planning');
    await expandFor(follow.locator('[data-create-follow-up]'));
    await follow.locator(`[data-create-follow-up="${fixed.id}"]`).click();
    await expect.poll(async () => (await work()).length).toBe(16);
    await qa.shot(page, 'planning-follow-up');
  } finally { await qa.finish(); }
});

test('lost conversion response and retry do not create duplicate work orders', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const source = await qa.seed('maintenance_requests', { location_id: qa.location, requested_by: qa.sessions.admin.user.id, title: 'QA Retry Conversion', description: 'Network fault test', status: 'submitted' });
    const page = await qa.open('technician', 'requests');
    let failed = false;
    await page.route('**/rest/v1/rpc/convert_maintenance_request', async route => {
      if (!failed && route.request().method() === 'POST') {
        failed = true;
        const committed = await route.fetch();
        expect(committed.ok()).toBe(true);
        await route.fulfill({ status: 503, contentType: 'application/json', body: '{"message":"QA injected link failure"}' });
      } else await route.continue();
    });
    const button = page.locator(`[data-convert-request="${source.id}"]`);
    await button.click();
    await expect(page.locator('body')).toContainText('QA injected link failure');
    await expect(button).toBeEnabled();
    await button.click();
    await expect.poll(async () => (await qa.api('admin', 'GET', `maintenance_requests?id=eq.${source.id}&select=status`))[0].status).toBe('converted');
    await expect(page.locator('#quick-update-work-order-form [name=title]')).toHaveValue('QA Retry Conversion');
    expect(await qa.api('admin', 'GET', `work_orders?company_id=eq.${qa.company}&select=id`), 'A request must never create a second work order when retrying an uncertain response').toHaveLength(1);
  } finally { await qa.finish(); }
});
