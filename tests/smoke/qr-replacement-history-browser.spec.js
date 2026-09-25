const { test, expect } = require('@playwright/test');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');

async function mount(page) {
  await page.setContent('<section class="public-request-links"><input aria-label="Unsaved setting"><span data-qr-last-replaced="link-1">Loading replacement history...</span><button data-qr-history="link-1" data-location-name="QA Facility">Replacement History</button></section>');
  await page.addStyleTag({ path: path.join(root, 'styles.css') });
  await page.addScriptTag({ path: path.join(root, 'src/features/qrReplacementHistory.js') });
  await page.evaluate(() => {
    const state = window.historyState = { company: 'company-1', scope: 'user-1:company-1:settings', allowed: true, queries: [], rpcCalls: 0, fail: false, count: 13, summaryDeferred: false, deferred: false };
    state.rows = Array.from({ length: 13 }, (_, index) => ({ id: index, link_id: 'link-1', company_id: 'company-1', actor_name: index ? `Admin ${index}` : 'Taylor <img src=x onerror=alert(1)> Administrator', facility_name: 'QA Facility', replaced_at: `2026-09-${String(25 - index).padStart(2, '0')}T12:34:00Z` }));
    const client = {
      async rpc(name, args) {
        state.rpcCalls++;
        if (state.summaryDeferred) await new Promise(resolve => { window.finishSummary = resolve; });
        return { data: state.fail ? null : state.rows.slice(0, 1), error: state.fail ? { message: 'Offline' } : null };
      },
      from(table) {
        const call = { table, filters: [], order: [] };
        state.queries.push(call);
        return {
          select(fields, options) { call.fields = fields; call.options = options; return this; },
          eq(key, value) { call.filters.push([key, value]); return this; },
          order(key, value) { call.order.push([key, value]); return this; },
          async range(start, end) {
            call.range = [start, end];
            if (state.deferred) await new Promise(resolve => { window.finishPage = resolve; });
            return { data: state.rows.slice(start, end + 1), count: state.count, error: state.fail ? { message: 'Offline' } : null };
          },
        };
      },
    };
    window.bindHistory = () => window.MaintainOpsQrHistory.bindQrHistory(document.querySelector('.public-request-links'), {
      client: () => client, getCompanyId: () => state.company, getScope: () => state.scope,
      canRead: () => state.allowed, withTimeout: value => value, showNotice: () => {},
    });
  });
}

for (const width of [320, 390, 1440]) {
  test(`QR history is read-only, escaped, paged and scrollable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 740 });
    await mount(page);
    await page.getByLabel('Unsaved setting').fill('Keep this setting');
    await page.evaluate(() => { window.bindHistory(); window.bindHistory(); });
    await expect(page.locator('[data-qr-last-replaced]')).toContainText('Last replaced by Taylor <img');
    await expect(page.locator('img')).toHaveCount(0);
    await expect(page.getByLabel('Unsaved setting')).toHaveValue('Keep this setting');
    expect(await page.evaluate(() => window.historyState.rpcCalls)).toBe(1);
    expect(await page.evaluate(() => window.historyState.queries)).toHaveLength(0);
    const trigger = page.getByRole('button', { name: 'Replacement History', exact: true });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'QR Replacement History' });
    await expect(dialog.getByRole('button', { name: 'Close' })).toBeFocused();
    await expect(dialog.locator('.qr-history-row')).toHaveCount(12);
    await expect(dialog.getByRole('status')).toHaveText('Page 1 of 2 - 13 replacements');
    expect(await dialog.evaluate(element => {
      const box = element.getBoundingClientRect();
      return box.left >= 0 && box.right <= innerWidth && element.scrollWidth <= element.clientWidth;
    })).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`qr-history-${width}.png`) });
    await dialog.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(dialog.locator('.qr-history-row')).toHaveCount(1);
    await expect(dialog.getByRole('status')).toHaveText('Page 2 of 2 - 13 replacements');
    await expect(dialog.getByRole('button', { name: 'Next', exact: true })).toBeDisabled();
    await dialog.getByRole('button', { name: 'Previous', exact: true }).click();
    await expect(dialog.locator('.qr-history-row')).toHaveCount(12);
    const calls = await page.evaluate(() => window.historyState.queries);
    expect(calls.map(call => call.range)).toEqual([[0, 11], [12, 23], [0, 11]]);
    for (const call of calls) {
      expect(call.filters).toEqual([['company_id', 'company-1'], ['link_id', 'link-1']]);
      expect(call.options).toEqual({ count: 'exact' });
      expect(call.fields).not.toContain('token');
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(page.getByLabel('Unsaved setting')).toHaveValue('Keep this setting');
  });
}

test('QR history distinguishes unavailable from empty and supports retry', async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { window.historyState.fail = true; window.bindHistory(); });
  await expect(page.locator('[data-qr-last-replaced]')).toContainText('unavailable');
  await page.getByRole('button', { name: 'Replacement History' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('status')).toContainText('unavailable');
  await page.evaluate(() => { window.historyState.fail = false; window.historyState.rows = []; window.historyState.count = 0; });
  await dialog.getByRole('button', { name: 'Retry' }).click();
  await expect(dialog.getByRole('status')).toHaveText('No replacements recorded. Earlier changes are not tracked.');
  await expect(page.locator('[data-qr-last-replaced]')).toHaveText('No replacements recorded. Earlier changes are not tracked.');
  await expect(dialog.getByRole('button', { name: 'Next' })).toHaveCount(0);
});

for (const change of ['company', 'scope', 'allowed', 'detached']) {
  test(`QR history discards responses after ${change} changes`, async ({ page }) => {
    await mount(page);
    await page.evaluate(() => { window.historyState.deferred = true; window.bindHistory(); });
    await page.getByRole('button', { name: 'Replacement History' }).click();
    await page.evaluate(key => {
      if (key === 'detached') document.querySelector('.public-request-links').remove();
      else window.historyState[key] = key === 'allowed' ? false : 'different';
      window.finishPage();
    }, change);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('.qr-history-row')).toHaveCount(0);
  });
}

test('QR history rejects incomplete counts or foreign rows instead of presenting them as evidence', async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { window.bindHistory(); window.historyState.count = null; });
  await page.getByRole('button', { name: 'Replacement History' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('status')).toContainText('unavailable');
  await page.evaluate(() => { window.historyState.count = 13; window.historyState.rows[0].company_id = 'foreign'; });
  await dialog.getByRole('button', { name: 'Retry' }).click();
  await expect(dialog.getByRole('status')).toContainText('unavailable');
  await expect(dialog.locator('.qr-history-row')).toHaveCount(0);
});

test('QR history is not requested for a non-manager and old summaries cannot overwrite fresh history', async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { window.historyState.allowed = false; window.bindHistory(); });
  expect(await page.evaluate(() => window.historyState.rpcCalls)).toBe(0);
  await page.evaluate(() => { window.historyState.allowed = true; window.historyState.summaryDeferred = true; window.bindHistory(); });
  await page.getByRole('button', { name: 'Replacement History' }).click();
  await expect(page.getByRole('dialog').locator('.qr-history-row')).toHaveCount(12);
  await page.evaluate(() => { window.historyState.rows[0].actor_name = 'Old summary'; window.finishSummary(); });
  await expect(page.locator('[data-qr-last-replaced]')).toContainText('Last replaced by Taylor <img');
});
