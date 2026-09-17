const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');

for (const formType of ['message-thread-form', 'message-reply-form', 'message-discussion-form']) {
  test(`voice confirmation protects ${formType}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.route('https://messaging.test/', route => route.fulfill({ contentType: 'text/html', body: `<main class="message-center"><form id="${formType}" class="${formType}"><textarea name="body" required aria-label="Message">Draft text</textarea><button type="submit">Send draft</button><div class="message-attachments" data-attachment-key="test"></div></form></main>` }));
    await page.goto('https://messaging.test/');
    await page.clock.install();
    for (const file of ['styles.css', 'src/render/messageStyles.css', 'src/render/messageTools.css']) await page.addStyleTag({ path: path.join(root, file) });
    await page.addScriptTag({ content: fs.readFileSync(path.join(root, 'src/services/messageMedia.mjs'), 'utf8').replace(/export /g, '') });
    await page.addScriptTag({ content: fs.readFileSync(path.join(root, 'src/workflows/messagePresentation.mjs'), 'utf8').replace('export function', 'function') });
    await page.addScriptTag({ content: fs.readFileSync(path.join(root, 'src/workflows/messageAudioPlayer.mjs'), 'utf8').replace('export function', 'function') });
    await page.addScriptTag({ content: fs.readFileSync(path.join(root, 'src/workflows/messageExperience.mjs'), 'utf8').replace(/^import .*\r?\n/gm, '').replace('export function', 'function') });
    await page.evaluate(() => {
      window.voiceProof = { writes: 0, company: 'one', notices: [], created: 0, revoked: 0, micStops: 0, starts: 0, permission: [] };
      Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: { getUserMedia: () => new Promise((resolve, reject) => voiceProof.permission.push({
        allow: () => resolve({ getTracks: () => [{ stop: () => voiceProof.micStops++ }] }), deny: () => reject(new Error('Permission denied')),
      })) } });
      window.MediaRecorder = class {
        static isTypeSupported() { return true; }
        constructor() { this.mimeType = 'audio/wav'; this.state = 'inactive'; }
        start() { this.state = 'recording'; voiceProof.starts++; }
        stop() { this.state = 'inactive'; this.ondataavailable({ data: new Blob(['QA recording'], { type: 'audio/wav' }) }); this.onstop(); }
      };
      const create = URL.createObjectURL.bind(URL), revoke = URL.revokeObjectURL.bind(URL);
      URL.createObjectURL = blob => { voiceProof.created++; return create(blob); };
      URL.revokeObjectURL = url => { voiceProof.revoked++; return revoke(url); };
      const query = { select() { return this; }, eq() { return this; }, is() { return this; }, lt() { return this; }, async limit() { return { data: [] }; } };
      const experience = createMessageExperience({ documentRef: document, escapeHtml: text => String(text).replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`), icon: () => '',
        getUserId: () => 'me', getCompanyId: () => voiceProof.company, canEdit: () => true, getActiveSection: () => 'messages',
        client: () => ({ from: () => query }), notice: text => voiceProof.notices.push(text) });
      voiceProof.reset = () => experience.reset();
      voiceProof.hydrate = () => experience.hydrate();
      document.querySelector('form').addEventListener('submit', event => { event.preventDefault(); voiceProof.writes++; });
      experience.hydrate();
    });
    const record = page.getByRole('button', { name: 'Send voice message', exact: true });
    await expect(record).toBeVisible();
    expect((await record.boundingBox()).height).toBeGreaterThanOrEqual(48);
    const send = page.getByRole('button', { name: 'Send draft', exact: true });
    await record.click();
    await expect(page.locator('.message-record-state')).toHaveText('Waiting for microphone...');
    await expect(send).toBeDisabled();
    await expect(record).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Attach files' })).toHaveCount(0);
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    await expect(send).toBeEnabled();
    await page.evaluate(() => voiceProof.permission[0].allow());
    expect(await page.evaluate(() => voiceProof.micStops)).toBe(1);
    expect(await page.evaluate(() => voiceProof.starts)).toBe(0);
    await record.click();
    await page.evaluate(() => voiceProof.permission[1].allow());
    await expect(page.getByRole('button', { name: 'Stop', exact: true })).toBeVisible();
    await page.clock.fastForward(2200);
    await expect(page.locator('[data-record-time]')).toHaveText('0:02');
    await page.evaluate(() => voiceProof.hydrate());
    await expect(page.locator('[data-record-time]')).toHaveText('0:02');
    const evidence = path.join(root, 'lfes-evidence'); fs.mkdirSync(evidence, { recursive: true });
    if (formType === 'message-reply-form') await page.screenshot({ path: path.join(evidence, 'voice-recording-320.png') });
    // Switching conversations must not leave an invisible microphone running.
    await page.evaluate(() => { document.querySelector('.message-attachments').dataset.attachmentKey = 'another'; voiceProof.hydrate(); });
    expect(await page.evaluate(() => voiceProof.micStops)).toBe(2);
    await expect(send).toBeEnabled(); await expect(record).toBeVisible();
    await page.evaluate(() => { document.querySelector('.message-attachments').dataset.attachmentKey = 'test'; voiceProof.hydrate(); });
    // A late permission failure from a canceled attempt must not cancel the next recording.
    await record.click(); await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    await record.click(); await page.evaluate(() => voiceProof.permission[2].deny());
    await expect(page.locator('.message-record-state')).toHaveText('Waiting for microphone...');
    await page.evaluate(() => voiceProof.permission[3].allow());
    await page.getByRole('button', { name: 'Stop', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Review voice message', exact: true })).toBeVisible();
    await expect(record).toHaveCount(0); await expect(send).toBeEnabled();
    await page.getByRole('button', { name: 'Remove Voice message.wav', exact: true }).click();
    await expect(record).toBeVisible();
    await send.click();
    expect(await page.evaluate(() => voiceProof.writes)).toBe(1);
    await page.locator('[data-message-files]').setInputFiles({ name: 'Voice message.wav', mimeType: 'audio/wav', buffer: Buffer.from('test-only audio') });
    await expect(page.locator('.message-pending-file')).toHaveCount(1);
    await expect(record).toHaveCount(0);
    const confirm = page.getByRole('dialog', { name: 'Send voice message?', exact: true });
    await send.press('Enter');
    await expect(confirm).toBeVisible();
    expect(await confirm.evaluate(node => ({background:getComputedStyle(node).backgroundColor,scheme:getComputedStyle(node).colorScheme})))
      .toEqual({background:'rgb(243, 243, 238)',scheme:'light'});
    expect(await confirm.locator('[data-confirm-voice-send]').evaluate(node => getComputedStyle(node).color)).toBe('rgb(255, 255, 255)');
    await expect(confirm.locator('audio')).toHaveCount(1);
    expect(await page.evaluate(() => voiceProof.writes)).toBe(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (formType === 'message-reply-form') await page.screenshot({ path: path.join(evidence, 'voice-confirmation-320.png') });
    await confirm.getByRole('button', { name: 'Keep editing' }).click();
    await expect(page.getByRole('textbox', { name: 'Message' })).toHaveValue('Draft text');
    await expect(page.locator('.message-pending-file')).toHaveCount(1);
    await page.getByRole('button', { name: 'Review voice message', exact: true }).click(); await page.keyboard.press('Escape'); await expect(confirm).toHaveCount(0);
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
