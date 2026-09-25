const { test, expect } = require('@playwright/test');
const { createQa, nav } = require('../helpers/appwide-qa');

test.setTimeout(180000);
test('isolated QA QR replacement records the actor and supports protected paged history', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    await qa.api('admin', 'POST', 'rpc/ensure_location_request_link', { target_location_id: qa.location });
    const links = () => qa.api('admin', 'GET', `public_request_links?company_id=eq.${qa.company}&select=id,token,location_id,created_by`);
    const original = (await links())[0];
    const events = () => qa.api('admin', 'GET', `qr_replacement_history?company_id=eq.${qa.company}&link_id=eq.${original.id}&order=replaced_at.desc,id.desc`);
    expect(await events()).toEqual([]);
    const page = await qa.open('admin', 'settings', 390);
    const card = page.locator('.public-request-link-card').filter({ has: page.locator(`[data-qr-history="${original.id}"]`) });
    const last = card.locator('[data-qr-last-replaced]');
    await expect(last).toHaveText('No replacements recorded. Earlier changes are not tracked.');
    await card.getByRole('button', { name: 'Regenerate/Replace QR Code', exact: true }).click();
    await page.getByRole('alertdialog').getByRole('button', { name: 'Cancel', exact: true }).click();
    expect((await links())[0].token).toBe(original.token);
    expect(await events()).toEqual([]);
    await card.getByRole('button', { name: 'Regenerate/Replace QR Code', exact: true }).click();
    await page.getByRole('alertdialog').getByRole('button', { name: 'Replace QR Code', exact: true }).click();
    await expect.poll(async () => (await events()).length).toBe(1);
    const first = (await events())[0];
    expect(first.actor_id).toBe(qa.sessions.admin.user.id);
    expect(first.actor_name).toBe('QA admin');
    expect(first.location_id).toBe(qa.location);
    expect(JSON.stringify(first)).not.toContain(original.token);
    expect(first).not.toHaveProperty('token');
    await expect(last).toContainText('Last replaced by QA admin on');

    await qa.api('admin', 'PATCH', `profiles?company_id=eq.${qa.company}&user_id=eq.${qa.sessions.admin.user.id}`, { full_name: 'QA Renamed Admin' });
    for (let i = 0; i < 12; i++) await qa.api('admin', 'PATCH', `public_request_links?company_id=eq.${qa.company}&id=eq.${original.id}`, { token: `qa-${qa.manifest.runId}-${i}` });
    expect(await events()).toHaveLength(13);
    expect((await events()).at(-1).actor_name).toBe('QA admin');
    await card.getByRole('button', { name: 'Replacement History', exact: true }).click();
    const history = page.getByRole('dialog', { name: 'QR Replacement History' });
    await expect(history.locator('.qr-history-row')).toHaveCount(12);
    await expect(last).toContainText('Last replaced by QA Renamed Admin on');
    await history.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(history.locator('.qr-history-row')).toHaveCount(1);
    await expect(history.locator('.qr-history-row')).toContainText('QA admin');
    await qa.shot(page, 'qr-history-page-two');
    await history.getByRole('button', { name: 'Close', exact: true }).click();
    await nav(page, 'mywork');
    await nav(page, 'settings');
    await expect(last).toContainText('Last replaced by QA Renamed Admin on');
    await qa.shot(page, 'qr-history-summary');

    const manager = await qa.open('manager', 'settings', 390);
    await expect(manager.locator(`[data-qr-last-replaced="${original.id}"]`)).toContainText('QA Renamed Admin');
    await expect(manager.getByRole('button', { name: 'Regenerate/Replace QR Code', exact: true })).toHaveCount(0);
    for (const role of ['admin', 'manager', 'technician', 'production', 'accounting']) {
      const data = await qa.api(role, 'GET', `qr_replacement_history?company_id=eq.${qa.company}&select=id`);
      expect(data.length).toBe(['admin', 'manager'].includes(role) ? 13 : 0);
      const attempt = await qa.raw(role, 'PATCH', `qr_replacement_history?company_id=eq.${qa.company}`, { actor_name: 'Forged' });
      expect(attempt.ok()).toBe(false);
    }
    expect((await links())[0].created_by).toBe(original.created_by);
  } finally { await qa.finish(); }
});
