const { test, expect } = require('@playwright/test');
const { createQa, nav, expandFor } = require('../helpers/appwide-qa');

test.setTimeout(180000);

test('financial permission boundaries, operational edits and archived financial history', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const asset = await qa.seed('assets', { location_id: qa.location, name: 'QA Retained Press', asset_code: 'RET-01', created_by: qa.sessions.admin.user.id });
    const records = () => qa.api('admin', 'GET', `asset_financials?company_id=eq.${qa.company}&select=*`);
    const accounting = await qa.open('accounting', 'financial');
    await accounting.locator(`[data-open-financial-asset="${asset.id}"]`).click();
    const finance = accounting.locator('.financial-asset-form');
    await finance.locator('[name=asset_tag]').fill('FIXED-001');
    await finance.locator('[name=acquisition_cost]').fill('15000');
    await finance.locator('[name=acquisition_date]').fill('2020-01-02');
    await finance.locator('[name=current_book_value]').fill('4000');
    await finance.locator('[name=finance_notes]').fill('QA finance retention');
    await finance.locator('[name=needs_review]').uncheck();
    await finance.locator('button[type=submit]').click();
    await expect.poll(async () => (await records()).length).toBe(1);
    expect((await records())[0]).toMatchObject({ asset_id: asset.id, acquisition_cost: 15000, reviewed_by: qa.sessions.accounting.user.id });
    await expect(accounting.locator('[data-section=financial]')).toHaveAttribute('aria-current', 'page');
    await expect(accounting.locator('#edit-asset-form')).toHaveCount(0);

    const manager = await qa.open('manager', 'financial');
    await manager.locator(`[data-open-financial-asset="${asset.id}"]`).click();
    await expect(manager.locator('.financial-asset-form')).toHaveCount(0);
    await expect(manager.locator('#workspace-main')).toContainText('FIXED-001');
    const denied = await qa.raw('manager', 'PATCH', `asset_financials?id=eq.${(await records())[0].id}`, { acquisition_cost: 1 });
    expect(denied.ok() ? await denied.json() : []).toEqual([]);
    expect((await records())[0].acquisition_cost).toBe(15000);

    await nav(manager, 'assets');
    await manager.locator(`[data-asset-id="${asset.id}"]`).click();
    const edit = manager.locator('#edit-asset-form');
    await expandFor(edit);
    await edit.locator('[name=name]').fill('QA Renamed Press');
    await edit.locator('button[type=submit]').click();
    await expect.poll(async () => (await qa.api('admin', 'GET', `assets?id=eq.${asset.id}&select=name`))[0].name).toBe('QA Renamed Press');
    await accounting.reload();
    await nav(accounting, 'financial');
    await expect(accounting.locator('#workspace-main')).toContainText('QA Renamed Press');

    const del = manager.locator(`[data-delete-asset="${asset.id}"]`);
    await expandFor(del);
    await del.click();
    await manager.locator('[data-cancel-delete-asset]').click();
    expect(await qa.api('admin', 'GET', `assets?id=eq.${asset.id}&select=id`)).toHaveLength(1);
    await manager.locator(`[data-delete-asset="${asset.id}"]`).click();
    await manager.locator(`[data-confirm-delete-asset="${asset.id}"]`).click();
    await expect.poll(async () => (await qa.api('admin', 'GET', `assets?id=eq.${asset.id}&select=id`)).length).toBe(0);
    const retained = (await records())[0];
    expect(retained.asset_id).toBeNull();
    expect(retained.acquisition_cost).toBe(15000);
    await accounting.reload();
    await nav(accounting, 'financial');
    await expect(accounting.locator('.financial-asset-deleted')).toHaveCount(1);
    await accounting.locator('.financial-asset-deleted').click();
    await expect(accounting.locator('[data-open-financial-equipment]')).toHaveCount(0);
    await accounting.locator('.financial-asset-form [name=disposal_notes]').fill('Sold after operational retirement');
    await accounting.locator('.financial-asset-form button[type=submit]').click();
    await expect.poll(async () => (await records())[0].disposal_notes).toBe('Sold after operational retirement');
    await qa.shot(accounting, 'retained-financial');
    await accounting.setViewportSize({ width: 390, height: 844 });
    await expect(accounting.locator('.financial-asset-form')).toBeVisible();
    expect(await accounting.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2)).toBe(true);
    await qa.shot(accounting, 'retained-financial-mobile');
  } finally { await qa.finish(); }
});
