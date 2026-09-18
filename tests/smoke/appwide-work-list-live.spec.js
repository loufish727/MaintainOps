const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const { createQa, nav, expandFor } = require('../helpers/appwide-qa');
test.setTimeout(150000);

test('work paging, person/type filters, search, location isolation and CSV download', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const work = await qa.api('admin', 'POST', 'work_orders', Array.from({ length: 14 }, (_, index) => ({
      company_id: qa.company, location_id: index === 13 ? qa.annex : qa.location,
      title: index === 13 ? 'QA Other Location Only' : `QA Main Order ${String(index).padStart(2, '0')}`,
      created_by: qa.sessions.admin.user.id, assigned_to: index < 2 ? qa.sessions.technician.user.id : null,
      type: index === 0 ? 'fabrication' : 'corrective', priority: 'medium', status: 'open',
    })));
    const page = await qa.open('admin', 'work');
    await expect(page.locator('.work-card')).toHaveCount(12);
    await page.locator('[data-work-page=next]').click();
    await expect(page.locator('.work-card')).toHaveCount(1);
    await page.locator('[data-work-assignee-filter]').selectOption(qa.sessions.technician.user.id);
    await expect(page.locator('.work-card')).toHaveCount(2);
    await page.locator('[data-work-type-filter]').selectOption('fabrication');
    await expect(page.locator('.work-card')).toHaveCount(1);
    await expect(page.locator('.work-card')).toContainText('QA Main Order 00');
    await page.locator('[data-clear-work-filters]').click();
    await expect(page.locator('.work-card')).toHaveCount(12);
    const search = page.locator('.workspace-search-input:visible');
    await search.pressSequentially('QA Main Order 07', { delay: 70 });
    await expect(search).toBeFocused();
    await expect(search).toHaveValue('QA Main Order 07');
    await expect(page.locator('#workspace-main')).toContainText('QA Main Order 07');
    await search.fill('');
    await page.qaSettle();
    await expandFor(page.locator('[data-command-action=export-csv]').last());
    const download = page.waitForEvent('download');
    await page.locator('[data-command-action=export-csv]:visible').click();
    const file = await download;
    const csv = fs.readFileSync(await file.path(), 'utf8');
    expect(csv).toContain('QA Main Order 00');
    expect(csv).toContain('QA Main Order 12');
    expect(csv).not.toContain('QA Other Location Only');
    const location = page.locator('select').filter({ has: page.locator(`option[value="${qa.annex}"]`) }).filter({ visible: true }).first();
    await location.selectOption(qa.annex);
    await expect(page.locator('.work-card')).toHaveCount(1);
    await expect(page.locator('.work-card')).toContainText('QA Other Location Only');
    const tech = await qa.open('technician', 'mywork', 390);
    await expect(tech.locator('.work-card')).toHaveCount(2);
    await nav(tech, 'team');
    const member = tech.locator('.member-card').filter({ hasText: 'QA technician' });
    await expandFor(member);
    await expect(member.locator('.chip.open')).toHaveText('2 New');
    await member.locator('[data-view-member-work]').click();
    await expect(tech.locator('.work-card')).toHaveCount(2);
    expect(work).toHaveLength(14);
    await qa.shot(tech, 'assigned-work-mobile');
  } finally { await qa.finish(); }
});

test('standard work creation retains a failed-save draft and Manager drilldown opens its exact order', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const page = await qa.open('admin', 'work');
    await expandFor(page.locator('[data-command-action=create-work-order]').last());
    await page.locator('[data-command-action=create-work-order]:visible').click();
    const form = page.locator('#create-work-order-form');
    await form.locator('[name=title]').fill('QA Draft Survives');
    await form.locator('[name=description]').fill('Do not erase these notes on a failed save.');
    await expandFor(form.locator('[name=assigned_to]'));
    await form.locator('[name=assigned_to]').selectOption(qa.sessions.technician.user.id);
    let blocked = false;
    await page.route('**/rest/v1/work_orders?**', async route => {
      if (!blocked && route.request().method() === 'POST') {
        blocked = true;
        return route.fulfill({ status: 503, contentType: 'application/json', body: '{"message":"QA offline save"}' });
      }
      return route.continue();
    });
    await form.locator('button[type=submit]').click();
    await expect(page.locator('#create-work-order-error')).toContainText('QA offline save');
    await expect(form.locator('[name=description]')).toHaveValue('Do not erase these notes on a failed save.');
    await expect(form.locator('button[type=submit]')).toBeEnabled();
    expect(await qa.api('admin', 'GET', `work_orders?company_id=eq.${qa.company}&select=id`)).toHaveLength(0);
    await form.locator('button[type=submit]').click();
    await expect(page.locator('#status-select')).toBeVisible();
    const work = (await qa.api('admin', 'GET', `work_orders?company_id=eq.${qa.company}&select=*`))[0];
    expect(work.assigned_to).toBe(qa.sessions.technician.user.id);
    await page.locator('#status-select').selectOption('blocked');
    await page.qaSettle();
    await nav(page, 'manager');
    const blockedMetric = page.locator(`[data-manager-drill-user="${qa.sessions.technician.user.id}"][data-manager-drill-metric=blocked]`);
    await expect(blockedMetric.locator('strong')).toHaveText('1');
    await page.setViewportSize({ width: 390, height: 844 });
    await blockedMetric.click();
    await expect(page.locator('[data-manager-drill-in]')).toContainText('QA Draft Survives');
    await page.locator(`[data-mini-work-order="${work.id}"]`).click();
    await expect(page.locator('#quick-update-work-order-form [name=title]')).toHaveValue('QA Draft Survives');
    await expect(page.locator('#status-select')).toHaveValue('blocked');
    await page.locator('#status-select').selectOption('in_progress');
    await expect.poll(async () => (await qa.api('admin', 'GET', `work_orders?id=eq.${work.id}&select=status`))[0].status).toBe('in_progress');
    await qa.shot(page, 'manager-exact-order-mobile');
  } finally { await qa.finish(); }
});
