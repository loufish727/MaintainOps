const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');

for (const formType of ['message-thread-form', 'message-reply-form', 'message-discussion-form']) {
  test(`voice confirmation protects ${formType}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.route('https://messaging.test/', route => route.fulfill({ contentType: 'text/html', body: `<main class="message-center"><form id="${formType}" class="${formType}"><textarea name="body" required aria-label="Message">Draft text</textarea><button type="submit">Send draft</button><div class="message-attachments" data-attachment-key="test"></div></form></main>` }));
    await page.goto('https://messaging.test/');
    for (const file of ['styles.css', 'src/render/messageStyles.css', 'src/render/messageTools.css']) await page.addStyleTag({ path: path.join(root, file) });
    await page.addScriptTag({ content: fs.readFileSync(path.join(root, 'src/services/messageMedia.mjs'), 'utf8').replace(/export /g, '') });
    await page.addScriptTag({ content: fs.readFileSync(path.join(root, 'src/workflows/messageExperience.mjs'), 'utf8').replace(/^import .*\r?\n/, '').replace('export function', 'function') });
    await page.evaluate(() => {
      window.voiceProof = { writes: 0, company: 'one', notices: [], created: 0, revoked: 0 };
      const create = URL.createObjectURL.bind(URL), revoke = URL.revokeObjectURL.bind(URL);
      URL.createObjectURL = blob => { voiceProof.created++; return create(blob); };
      URL.revokeObjectURL = url => { voiceProof.revoked++; return revoke(url); };
      const query = { select() { return this; }, eq() { return this; }, is() { return this; }, lt() { return this; }, async limit() { return { data: [] }; } };
      const experience = createMessageExperience({ documentRef: document, escapeHtml: text => String(text).replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`), icon: () => '',
        getUserId: () => 'me', getCompanyId: () => voiceProof.company, canEdit: () => true, getActiveSection: () => 'messages',
        client: () => ({ from: () => query }), notice: text => voiceProof.notices.push(text) });
      voiceProof.reset = () => experience.reset();
      document.querySelector('form').addEventListener('submit', event => { event.preventDefault(); voiceProof.writes++; });
      experience.hydrate();
    });
    const record = page.getByRole('button', { name: 'Send voice message', exact: true });
    await expect(record).toBeVisible();
    expect((await record.boundingBox()).height).toBeGreaterThanOrEqual(48);
    const send = page.getByRole('button', { name: 'Send draft', exact: true });
    await send.click();
    expect(await page.evaluate(() => voiceProof.writes)).toBe(1);
    await page.locator('[data-message-files]').setInputFiles({ name: 'Voice message.wav', mimeType: 'audio/wav', buffer: Buffer.from('test-only audio') });
    await expect(page.locator('.message-pending-file')).toHaveCount(1);
    const confirm = page.getByRole('dialog', { name: 'Send voice message?', exact: true });
    await send.press('Enter');
    await expect(confirm).toBeVisible();
    await expect(confirm.locator('audio')).toHaveCount(1);
    expect(await page.evaluate(() => voiceProof.writes)).toBe(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await confirm.getByRole('button', { name: 'Keep editing' }).click();
    await expect(page.getByRole('textbox', { name: 'Message' })).toHaveValue('Draft text');
    await expect(page.locator('.message-pending-file')).toHaveCount(1);
    await send.click(); await page.keyboard.press('Escape'); await expect(confirm).toHaveCount(0);
    expect(await page.evaluate(() => voiceProof.writes)).toBe(1);
    await send.click();
    await page.evaluate(() => { document.querySelector('textarea').value = 'Changed while reviewing'; });
    await confirm.getByRole('button', { name: 'Send voice message' }).click();
    expect(await page.evaluate(() => voiceProof.writes)).toBe(1);
    expect(await page.evaluate(() => voiceProof.notices.at(-1))).toContain('draft changed');
    await page.getByRole('textbox', { name: 'Message' }).fill('');
    await send.click(); await confirm.getByRole('button', { name: 'Send voice message' }).click();
    expect(await page.evaluate(() => voiceProof.writes)).toBe(2);
    await send.click(); await expect(confirm).toBeVisible();
    await page.evaluate(() => { voiceProof.company = 'two'; voiceProof.reset(); });
    await expect(confirm).toHaveCount(0);
    expect(await page.evaluate(() => voiceProof.writes)).toBe(2);
    expect(await page.evaluate(() => voiceProof.created === voiceProof.revoked)).toBe(true);
  });
}
