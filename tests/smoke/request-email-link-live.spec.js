const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');
const { createQa, nav } = require('../helpers/appwide-qa');

test.setTimeout(360000);

test('email destination survives login, paging, conversion and facility scope', async ({ browser, request }, info) => {
  const qa = await createQa(browser, request, info);
  const link = id => `${process.env.MAINTAINOPS_BASE_URL}?request_id=${id}`;
  const focused = page => page.locator('[data-linked-request]');
  try {
    const work = await qa.seed('work_orders', { location_id: qa.location, title: 'QA Linked Work', status: 'open', type: 'corrective', priority: 'medium', created_by: qa.sessions.admin.user.id });
    const old = await qa.seed('maintenance_requests', { location_id: qa.location, title: 'QA Old Email Request', description: 'Old request with its own history', status: 'converted', converted_work_order_id: work.id, requested_by: qa.sessions.admin.user.id, created_at: '2025-01-01T00:00:00Z' });
    const active = await qa.seed('maintenance_requests', { location_id: qa.location, title: 'QA Active Email Request', description: 'Inspect fitting', status: 'submitted', requested_by: qa.sessions.admin.user.id, created_at: '2025-01-02T00:00:00Z' });
    const away = await qa.seed('maintenance_requests', { location_id: qa.annex, title: 'QA Annex Email Request', description: 'Other facility', status: 'submitted', requested_by: qa.sessions.admin.user.id });
    await qa.api('admin', 'POST', 'maintenance_requests', Array.from({ length: 13 }, (_, i) => ({ company_id: qa.company, location_id: qa.location, title: `QA Newer ${i}`, description: 'Paging fixture', status: 'submitted', requested_by: qa.sessions.admin.user.id })));

    const admin = await qa.open('admin', 'requests');
    await expect(admin.locator('.request-card')).toHaveCount(12);
    await expect(admin.locator('.request-card')).not.toContainText(['QA Old Email Request']);
    await admin.goto(link(old.id));
    await expect(focused(admin)).toContainText('QA Old Email Request', { timeout: 45000 });
    await expect(focused(admin).locator('.request-card')).toHaveCount(1);
    await expect(focused(admin)).toContainText('Converted to work order');
    await qa.shot(admin, 'email-request-desktop');
    await focused(admin).getByRole('button', { name: 'Open Work Order', exact: true }).click();
    await expect(admin.locator('#quick-update-work-order-form [name=title]')).toHaveValue('QA Linked Work');
    await expect(admin).not.toHaveURL(/request_id=/);
    await nav(admin, 'requests');
    await expect(admin.locator('.request-card')).toHaveCount(12);
    await admin.goto(link(active.id));
    await expect(focused(admin)).toContainText('QA Active Email Request', { timeout: 45000 });
    await admin.getByRole('button', { name: 'Back to Requests', exact: true }).click();
    await expect(focused(admin)).toHaveCount(0);
    await expect(admin.locator('.request-card')).toHaveCount(12);
    await expect(admin).not.toHaveURL(/request_id=/);
    await admin.goto(link(active.id));
    await expect(focused(admin)).toBeVisible({ timeout: 45000 });
    await nav(admin, 'requests');
    await expect(focused(admin)).toHaveCount(0);

    const manager = await qa.open('manager');
    await manager.goto(link(away.id));
    await expect(focused(manager)).toContainText('QA Annex Email Request', { timeout: 45000 });
    await expect(manager.locator('#location-select')).toHaveValue(qa.annex);

    const tech = await qa.open('technician', 'mywork', 390);
    await tech.goto(link(away.id));
    await expect(tech.locator('body')).toContainText('This request is in another facility', { timeout: 45000 });
    await expect(focused(tech)).toHaveCount(0);
    await expect(tech.locator('.request-card')).toHaveCount(0);
    await tech.goto(link(active.id));
    await expect(focused(tech)).toContainText('QA Active Email Request', { timeout: 45000 });
    await expect(focused(tech).getByRole('heading', { name: 'QA Active Email Request' })).toBeInViewport();
    await tech.evaluate(() => scrollTo(0, 0));
    await tech.qaSettle();
    expect(await tech.evaluate(() => scrollY)).toBe(0);
    await expect(focused(tech).locator('[data-convert-request]')).toBeVisible();
    expect(await tech.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await qa.shot(tech, 'email-request-mobile');
    await focused(tech).locator('[data-convert-request]').click();
    await expect(tech.locator('#quick-update-work-order-form [name=title]')).toHaveValue('QA Active Email Request');
    await tech.goto(link(active.id));
    await expect(focused(tech)).toContainText('Converted to work order', { timeout: 45000 });

    const accounting = await qa.open('accounting');
    await accounting.goto(link(old.id));
    await expect(focused(accounting)).toContainText('QA Old Email Request', { timeout: 45000 });
    await expect(focused(accounting).locator('[data-delete-request], [data-convert-request]')).toHaveCount(0);
    await accounting.goto(link(randomUUID()));
    await expect(accounting.locator('body')).toContainText('This request is unavailable or your account', { timeout: 45000 });
    await expect(focused(accounting)).toHaveCount(0);

    const signedOut = await qa.openPublic('');
    await signedOut.goto(link(old.id));
    await expect(signedOut.locator('#auth-form')).toBeVisible();
    await expect(signedOut).toHaveURL(new RegExp(`request_id=${old.id}`));
    await signedOut.locator('#auth-form [name=email]').fill(process.env.LFES_TECHNICIAN_EMAIL);
    await signedOut.locator('#auth-form [name=password]').fill(process.env.LFES_TECHNICIAN_PASSWORD);
    await signedOut.locator('#auth-form button[type=submit]').click();
    await expect(focused(signedOut)).toContainText('QA Old Email Request', { timeout: 45000 });
    await qa.shot(signedOut, 'email-request-after-login');
    expect(qa.manifest.httpErrors).toEqual([]);
  } finally { await qa.finish(); }
});
