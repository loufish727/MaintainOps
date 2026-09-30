const path = require('node:path');
const { test, expect } = require('@playwright/test');
const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j1ioAAAAASUVORK5CYII=', 'base64');

async function mount(page, options = {}) {
  await page.context().route('https://photo.example/**', route => {
    const expired = (options.expired && route.request().url().includes('/old.jpg')) || options.broken;
    return route.fulfill(expired
      ? { status: 400, contentType: 'application/json', body: '{"error":"InvalidJWT","message":"exp claim timestamp check failed"}' }
      : { status: 200, contentType: 'image/png', body: pixel });
  });
  await page.setContent('<html data-theme="dark"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><main style="max-width:600px;margin:auto;padding:16px"><label>Draft notes<textarea id="draft"></textarea></label><section id="photo"></section></main></body></html>');
  await page.addStyleTag({ path: path.resolve('styles.css') });
  for (const file of ['render/requestPhotoDisplay.js', 'utils/requestPhotoEvents.js']) {
    await page.addScriptTag({ path: path.resolve('src', file) });
  }
  await page.evaluate(options => {
    const escapeHtml = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
    window.row = { id: 'request-1', photo_storage_path: 'request-1/photo.jpg', photo_file_name: 'Photo.jpg', photo_content_type: 'image/jpeg', photoSignedUrl: options.noUrl ? '' : 'https://photo.example/old.jpg?token=expired-after-10-minutes' };
    window.scope = 'user-1:company-1:salem';
    window.signMode = options.mode || 'success';
    window.signCalls = [];
    window.timeouts = [];
    window.opens = 0;
    window.photoEvents = window.MaintainOpsRequestPhotoEvents.createRequestPhotoEvents({
      documentRef: document,
      windowRef: { open: (...args) => { window.opens++; return options.popupBlocked ? null : window.open(...args); } },
      getScope: () => window.scope,
      getRequest: id => id === window.row.id ? window.row : null,
      client: () => ({ storage: { from: bucket => ({ createSignedUrl: (storagePath, seconds) => {
        window.signCalls.push({ bucket, storagePath, seconds });
        const result = { data: { signedUrl: `https://photo.example/fresh-${window.signCalls.length}.jpg` }, error: null };
        if (window.signMode === 'failure') return Promise.resolve({ error: { message: 'permission denied' } });
        if (window.signMode === 'throw') throw new Error('network failure');
        if (window.signMode === 'unsafe') return Promise.resolve({ data: { signedUrl: 'javascript:alert(1)' } });
        if (window.signMode === 'deferred' || window.signMode === 'hang') return new Promise(resolve => { window.finishSign = () => resolve(result); });
        return Promise.resolve(result);
      } }) } }),
      withOperationTimeout: (promise, message, timeout) => {
        window.timeouts.push(timeout);
        if (window.signMode !== 'hang') return promise;
        return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error(message)), 100))]);
      },
    });
    document.querySelector('#photo').innerHTML = window.MaintainOpsRequestPhotoDisplay.createRequestPhotoDisplayHelpers({ escapeHtml, requestPhotoMetaText: () => '79 KB' }).renderMaintenanceRequestPhoto(window.row);
    window.photoEvents.bind();
    window.photoEvents.bind();
  }, options);
  await page.locator('#draft').fill('Keep these unsaved notes');
}

for (const width of [320, 390, 1280]) {
  test(`opens a fresh photo link without reload or draft loss at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 844 });
    await mount(page);
    expect(await page.evaluate(() => window.signCalls.length)).toBe(0);
    // The old href would now fail, but opening never navigates to it.
    await page.context().route('**/old.jpg?**', route => route.fulfill({ status: 400, body: 'InvalidJWT' }));
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Open photo', exact: true }).click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL('https://photo.example/fresh-1.jpg');
    expect(await popup.evaluate(() => window.opener)).toBeNull();
    expect(await page.evaluate(() => window.signCalls)).toEqual([{ bucket: 'maintenance-request-photos', storagePath: 'request-1/photo.jpg', seconds: 600 }]);
    await expect(page.locator('#draft')).toHaveValue('Keep these unsaved notes');
    await expect(page.locator('[data-request-photo-image]')).toHaveAttribute('src', 'https://photo.example/fresh-1.jpg');
    await popup.close();
    const nextPopup = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Open photo', exact: true }).focus();
    await page.keyboard.press('Enter');
    const next = await nextPopup;
    await expect(next).toHaveURL('https://photo.example/fresh-2.jpg');
    await next.close();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath('request-photo.png') });
  });
}

test('expired thumbnail retries once without a page reload', async ({ page }) => {
  await mount(page, { expired: true });
  await expect.poll(() => page.evaluate(() => window.signCalls.length)).toBe(1);
  await expect.poll(() => page.locator('img').evaluate(img => img.naturalWidth)).toBe(1);
  await expect(page.locator('#draft')).toHaveValue('Keep these unsaved notes');
});

test('bad replacement image cannot cause a signing loop', async ({ page }) => {
  await mount(page, { broken: true });
  await expect(page.getByRole('status')).toContainText('Preview unavailable');
  expect(await page.evaluate(() => window.signCalls.length)).toBe(1);
  await page.locator('img').dispatchEvent('error');
  expect(await page.evaluate(() => window.signCalls.length)).toBe(1);
});

for (const mode of ['failure', 'throw', 'hang', 'unsafe']) {
  test(`${mode} closes the placeholder tab and allows a retry`, async ({ page }) => {
    await mount(page, { noUrl: true, mode });
    const failedPopup = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Open photo', exact: true }).click();
    const failed = await failedPopup;
    await expect(page.getByRole('status')).toContainText('Could not open photo');
    await expect.poll(() => failed.isClosed()).toBe(true);
    await expect(page.getByRole('button', { name: 'Open photo', exact: true })).toBeEnabled();
    await page.evaluate(() => { window.signMode = 'success'; });
    const retry = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Open photo', exact: true }).click();
    const popup = await retry;
    await expect(popup).toHaveURL('https://photo.example/fresh-2.jpg');
    if (mode === 'hang') await page.evaluate(() => window.finishSign());
    await expect(popup).toHaveURL('https://photo.example/fresh-2.jpg');
    await popup.close();
    await expect(page.locator('#draft')).toHaveValue('Keep these unsaved notes');
  });
}

test('blocked popups show a retry message without navigating away', async ({ page }) => {
  await mount(page, { noUrl: true, popupBlocked: true });
  await page.getByRole('button', { name: 'Open photo', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Allow pop-ups');
  expect(await page.evaluate(() => window.signCalls.length)).toBe(0);
  await expect(page.locator('#draft')).toHaveValue('Keep these unsaved notes');
});

for (const missing of ['session', 'request', 'photo']) {
  test(`refuses to sign when ${missing} is absent`, async ({ page }) => {
    await mount(page, { noUrl: true });
    await page.evaluate(missing => {
      if (missing === 'session') window.scope = '';
      if (missing === 'request') window.row = { ...window.row, id: 'other-request' };
      if (missing === 'photo') window.row.photo_storage_path = '';
    }, missing);
    await page.getByRole('button', { name: 'Open photo', exact: true }).click();
    expect(await page.evaluate(() => [window.opens, window.signCalls.length])).toEqual([0, 0]);
  });
}

for (const change of ['scope', 'row', 'path', 'detached']) {
  test(`does not open or update stale photo after ${change} changes`, async ({ page }) => {
    await mount(page, { noUrl: true, mode: 'deferred' });
    const opened = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Open photo', exact: true }).click();
    const popup = await opened;
    await expect.poll(() => page.evaluate(() => window.signCalls.length)).toBe(1);
    await page.evaluate(change => {
      if (change === 'scope') window.scope = 'other-user:other-company:other-location';
      if (change === 'row') window.row = { ...window.row };
      if (change === 'path') window.row.photo_storage_path = 'replacement/photo.jpg';
      if (change === 'detached') document.querySelector('#photo').replaceChildren();
      window.finishSign();
    }, change);
    await expect.poll(() => popup.isClosed()).toBe(true);
    expect(await page.evaluate(() => window.row.photoSignedUrl)).toBe('');
    await expect(page.locator('#draft')).toHaveValue('Keep these unsaved notes');
  });
}

test('thumbnail recovery and repeated clicks share only the pending signing request', async ({ page }) => {
  await mount(page, { expired: true, mode: 'deferred' });
  await expect.poll(() => page.evaluate(() => window.signCalls.length)).toBe(1);
  const popupPromise = page.waitForEvent('popup');
  const button = page.getByRole('button', { name: 'Open photo', exact: true });
  await button.click();
  const popup = await popupPromise;
  await button.dispatchEvent('click');
  expect(await page.evaluate(() => [window.opens, window.signCalls.length])).toEqual([1, 1]);
  await page.evaluate(() => window.finishSign());
  await expect(popup).toHaveURL('https://photo.example/fresh-1.jpg');
  await popup.close();
  await expect(button).toBeEnabled();
});
