const { test, expect } = require('@playwright/test');
const { createQa, nav, expandFor } = require('../helpers/appwide-qa');
test.setTimeout(180000);

test('work photos resize, display and delete with history; equipment files and history remain usable', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const asset = await qa.seed('assets', { location_id: qa.location, name: 'QA Photo Press', created_by: qa.sessions.admin.user.id });
    await qa.api('admin', 'POST', 'asset_events', Array.from({ length: 13 }, (_, i) => ({ company_id: qa.company, asset_id: asset.id, actor_id: qa.sessions.admin.user.id, event_type: 'updated', summary: `QA history ${i}` })));
    const work = await qa.seed('work_orders', { location_id: qa.location, asset_id: asset.id, title: 'QA Photo Work', status: 'open', created_by: qa.sessions.admin.user.id });
    const page = await qa.open('admin', 'work', 390);
    await page.getByRole('heading', { name: work.title, exact: true }).click();
    const photo = page.locator('#photo-form');
    await expandFor(photo);
    const generated = await page.evaluate(() => {
      const canvas = document.createElement('canvas'); canvas.width = 2048; canvas.height = 1024;
      const context = canvas.getContext('2d'); context.fillStyle = '#238761'; context.fillRect(0, 0, 2048, 1024);
      context.fillStyle = 'white'; context.font = '120px sans-serif'; context.fillText('LFES QA PHOTO', 120, 512);
      return canvas.toDataURL('image/png').split(',')[1];
    });
    await photo.locator('[name=photo]').setInputFiles({ name: 'qa-photo.png', mimeType: 'image/png', buffer: Buffer.from(generated, 'base64') });
    await photo.locator('button[type=submit]').click();
    const photos = () => qa.api('admin', 'GET', `work_order_photos?company_id=eq.${qa.company}&work_order_id=eq.${work.id}&select=*`);
    await expect.poll(async () => (await photos()).length).toBe(1);
    const uploaded = (await photos())[0];
    expect(uploaded.file_size_bytes).toBeLessThan(256 * 1024);
    await expandFor(page.locator('[data-delete-work-order-photo]'));
    const img = page.locator('#work-order-photos-target img').first();
    await expect.poll(async () => img.evaluate(el => el.complete && el.naturalWidth)).toBe(768);
    expect(await img.evaluate(el => el.naturalHeight)).toBe(384);
    await page.locator('[data-delete-work-order-photo]').click();
    await expect.poll(async () => (await photos()).length).toBe(0);
    await expect.poll(async () => (await qa.api('admin', 'GET', `work_order_events?company_id=eq.${qa.company}&work_order_id=eq.${work.id}&select=event_type`)).some(event => event.event_type.includes('photo') && event.event_type.includes('delet'))).toBe(true);

    await nav(page, 'assets');
    await page.locator(`[data-asset-id="${asset.id}"]`).click();
    const document = page.locator(`[data-asset-document="${asset.id}"]`);
    await expandFor(document);
    await document.locator('[name=document]').setInputFiles({ name: 'qa-manual.txt', mimeType: 'text/plain', buffer: Buffer.from('QA maintenance manual. Not production equipment.') });
    await document.locator('button[type=submit]').click();
    const files = () => qa.api('admin', 'GET', `asset_documents?company_id=eq.${qa.company}&asset_id=eq.${asset.id}&select=*`);
    await expect.poll(async () => (await files()).length).toBe(1);
    await expandFor(page.locator('[data-delete-asset-document]'));
    await page.locator('[data-delete-asset-document]').click();
    await expect.poll(async () => (await files()).length).toBe(0);
    await expandFor(page.locator(`[data-open-asset-history="${asset.id}"]`));
    await page.locator(`[data-open-asset-history="${asset.id}"]`).click();
    await expect(page.getByRole('heading', { name: 'Equipment History', exact: true })).toBeVisible();
    await expect(page.locator('[data-asset-history-page=next]')).toBeEnabled();
    await page.locator('[data-asset-history-page=next]').click();
    await expect(page.locator('[data-asset-history-page=prev]')).toBeEnabled();
    await page.locator(`[data-back-asset-history="${asset.id}"]`).click();
    await expect(page.locator('#edit-asset-form [name=name]')).toHaveValue(asset.name);
    await qa.shot(page, 'equipment-mobile');
  } finally { await qa.finish(); }
});
