const { test, expect } = require('@playwright/test');
const { createQa } = require('../helpers/appwide-qa');
const host = 'https://fsxqrngpaseqdxijggcm.supabase.co';
const bucket = 'maintenance-request-photos';
const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j1ioAAAAASUVORK5CYII=', 'base64');

test('signed-in request photo recovers from real storage expiry and opens a fresh private link', async ({ browser, request }, info) => {
  test.setTimeout(180000);
  const qa = await createQa(browser, request, info);
  let row;
  let storagePath;
  const headers = role => ({ apikey: process.env.LFES_SUPABASE_ANON_KEY, Authorization: `Bearer ${qa.sessions[role].access_token}` });
  try {
    row = await qa.seed('maintenance_requests', { location_id: qa.location, title: `QA photo expiry ${qa.manifest.runId}`, description: 'Disposable expired-photo regression fixture.', requested_by: qa.sessions.admin.user.id });
    storagePath = `${row.id}/expiry-proof.png`;
    const upload = await request.post(`${host}/storage/v1/object/${bucket}/${storagePath}`, { headers: { ...headers('admin'), 'Content-Type': 'image/png' }, data: pixel });
    expect(upload.ok(), `QA image upload: ${upload.status()}`).toBe(true);
    await qa.api('admin', 'PATCH', `maintenance_requests?company_id=eq.${qa.company}&id=eq.${row.id}`, { photo_storage_path: storagePath, photo_file_name: 'expiry-proof.png', photo_content_type: 'image/png', photo_file_size_bytes: pixel.length });
    const page = await qa.open('technician', 'requests', 390);
    const button = page.locator(`[data-open-request-photo="${row.id}"]`);
    await expect(button).toBeVisible();
    const image = page.locator(`[data-request-photo-image="${row.id}"]`);
    await expect.poll(() => image.evaluate(img => img.naturalWidth)).toBe(1);
    const signed = await request.post(`${host}/storage/v1/object/sign/${bucket}/${storagePath}`, { headers: headers('technician'), data: { expiresIn: 1 } });
    expect(signed.ok(), `QA short-lived link: ${signed.status()}`).toBe(true);
    const value = (await signed.json()).signedURL;
    expect(value.startsWith(`/object/sign/${bucket}/`)).toBe(true);
    const expiredUrl = `${host}/storage/v1${value}`;
    await expect.poll(async () => (await request.get(expiredUrl)).status(), { timeout: 15000, intervals: [500] }).toBe(400);
    let signingCalls = 0;
    page.on('request', req => { if (req.method() === 'POST' && req.url().includes(`/storage/v1/object/sign/${bucket}/`)) signingCalls++; });
    const originalCard = await button.locator('xpath=ancestor::article').elementHandle();
    await image.evaluate((img, url) => { img.src = url; }, expiredUrl);
    await expect.poll(() => signingCalls).toBe(1);
    await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth)).toBe(1);
    expect(await image.getAttribute('src') === expiredUrl).toBe(false);
    expect(await originalCard.evaluate(card => card.isConnected)).toBe(true);
    const popupReady = page.waitForEvent('popup');
    await button.click();
    const popup = await popupReady;
    await expect.poll(() => popup.url().startsWith(`${host}/storage/v1/object/sign/${bucket}/`)).toBe(true);
    expect(await popup.evaluate(() => window.opener)).toBeNull();
    await expect.poll(() => popup.locator('img').evaluate(img => img.naturalWidth)).toBe(1);
    expect(signingCalls).toBe(2);
    await popup.close();
    await qa.shot(page, 'request-photo-expiry-recovered');
    const saved = (await qa.api('admin', 'GET', `maintenance_requests?company_id=eq.${qa.company}&id=eq.${row.id}&select=status,photo_storage_path`))[0];
    expect(saved).toEqual({ status: 'submitted', photo_storage_path: storagePath });
  } finally {
    try {
      if (storagePath) {
        expect(storagePath).toBe(`${row.id}/expiry-proof.png`);
        const removed = await request.delete(`${host}/storage/v1/object/${bucket}`, { headers: headers('admin'), data: { prefixes: [storagePath] } });
        expect(removed.ok(), 'Delete only this QA photo').toBe(true);
        qa.manifest.storageRemoved.push({ bucket, paths: [storagePath] });
      }
      if (row) await qa.api('admin', 'DELETE', `maintenance_requests?company_id=eq.${qa.company}&id=eq.${row.id}`);
    } finally { await qa.finish(); }
  }
});
