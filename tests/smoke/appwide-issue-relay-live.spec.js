const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');
const { createQa, nav, expandFor } = require('../helpers/appwide-qa');

test.setTimeout(240000);

for (const width of [1440, 390]) test(`issue relay and ordinary replies at ${width}px`, async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    await qa.api('admin', 'POST', 'rpc/set_app_issue_message_recipient', {
      target_company_id: qa.company, target_recipient_id: qa.sessions.admin.user.id,
    });
    const inbox = await qa.open('admin', 'mywork', width);
    await nav(inbox, 'messages');
    const reporter = await qa.open('technician', 'mywork', width);
    let lostResponse = false, reportId;
    await reporter.route('**/rest/v1/app_issue_reports*', async route => {
      if (route.request().method() !== 'POST' || lostResponse) return route.continue();
      reportId = route.request().postDataJSON().id;
      const actual = await route.fetch();
      expect(actual.ok()).toBe(true);
      lostResponse = true;
      return route.fulfill({ status: 503, contentType: 'application/json', body: '{"message":"QA simulated lost response"}' });
    });
    const more = reporter.locator('.topbar-more:visible > summary');
    if (!await reporter.locator('[data-command-action="report-issue"]:visible').count()) await more.click();
    await reporter.locator('[data-command-action="report-issue"]:visible').click();
    const form = reporter.locator('#app-issue-report-form');
    await form.locator('[name=title]').fill('QA report relay');
    await form.locator('[name=details]').fill('Slit 1 upload failed. <img src=x onerror="window.qaUnsafe=true"> Please help.');
    await form.getByRole('button', { name: 'Send Report', exact: true }).click();
    await expect(reporter.locator('#app-issue-report-error')).toContainText('QA simulated lost response');
    const reports = () => qa.api('admin', 'GET', `app_issue_reports?company_id=eq.${qa.company}&select=id,title,status`);
    const messages = () => qa.api('admin', 'GET', `messages?company_id=eq.${qa.company}&select=id,thread_id,sender_id,body`);
    expect(await reports()).toHaveLength(1);
    const first = (await messages())[0];
    expect(first.id).toBe(reportId);
    expect(first.sender_id).toBe(qa.sessions.technician.user.id);
    expect(first.body).toContain('Automatically sent from an issue report.');
    expect(first.body).not.toContain('http://');
    await expect(inbox.locator(`[data-message-thread="${first.thread_id}"].unread`)).toBeVisible({ timeout: 30000 });
    await form.getByRole('button', { name: 'Send Report', exact: true }).click();
    await expect(form).toHaveCount(0);
    expect(await reports()).toHaveLength(1);
    expect(await messages()).toHaveLength(1);
    await inbox.locator(`[data-message-thread="${first.thread_id}"]`).click();
    await expect(inbox.locator(`article[data-message-id="${reportId}"]`)).toContainText('Slit 1 upload failed.');
    expect(await inbox.evaluate(() => Boolean(window.qaUnsafe))).toBe(false);
    await inbox.getByRole('textbox', { name: 'Reply', exact: true }).fill('Which file were you trying to attach?');
    await inbox.getByRole('button', { name: 'Send reply', exact: true }).click();
    await nav(reporter, 'messages');
    await reporter.locator(`[data-message-thread="${first.thread_id}"]`).click();
    await expect(reporter.locator('.message-list')).toContainText('Which file were you trying to attach?');
    await reporter.getByRole('textbox', { name: 'Reply', exact: true }).fill('It was the mandrel slides ZIP.');
    await reporter.getByRole('button', { name: 'Send reply', exact: true }).click();
    await expect(inbox.locator('.message-list')).toContainText('It was the mandrel slides ZIP.', { timeout: 30000 });
    await qa.shot(inbox, `recipient-reply-${width}`);
    await qa.shot(reporter, `reporter-reply-${width}`);
    expect(await inbox.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    expect(await reporter.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

    await inbox.getByLabel('Conversation options', { exact: true }).click();
    await inbox.locator(`[data-archive-message-thread="${first.thread_id}"]`).click();
    await expect(inbox.locator(`[data-message-thread="${first.thread_id}"]`)).toHaveCount(0);
    await inbox.qaSettle();
    const secondId = randomUUID();
    await qa.api('technician', 'POST', 'app_issue_reports', {
      id: secondId, company_id: qa.company, location_id: qa.annex, reporter_id: qa.sessions.technician.user.id,
      title: 'QA another location', details: 'The next report reuses the same general conversation.', severity: 'minor', screen: 'work',
    });
    await expect(inbox.locator(`[data-message-thread="${first.thread_id}"]`)).toBeVisible({ timeout: 30000 });
    const second = (await messages()).find(row => row.id === secondId);
    expect(second.thread_id).toBe(first.thread_id);
    expect(second.body).toContain('Location: Annex');
    await qa.api('admin', 'PATCH', `app_issue_reports?id=eq.${reportId}&company_id=eq.${qa.company}`, { status: 'resolved' });
    await qa.api('admin', 'DELETE', `app_issue_reports?id=eq.${reportId}&company_id=eq.${qa.company}`);
    expect((await messages()).find(row => row.id === reportId).body).toBe(first.body);
    expect(await qa.api('manager', 'GET', `messages?company_id=eq.${qa.company}&thread_id=eq.${first.thread_id}&select=id`)).toEqual([]);
    expect((await qa.raw('technician', 'POST', 'rpc/set_app_issue_message_recipient', {
      target_company_id: qa.company, target_recipient_id: qa.sessions.technician.user.id,
    })).ok()).toBe(false);

    // A previously unconnected pair reporting concurrently must create one DM.
    const simultaneous = Array.from({ length: 4 }, (_, i) => ({
      id: randomUUID(), company_id: qa.company, location_id: qa.location, reporter_id: qa.sessions.production.user.id,
      title: `QA simultaneous ${i}`, details: 'Concurrent report relay', severity: 'normal', screen: 'mywork',
    }));
    await Promise.all(simultaneous.map(value => qa.api('production', 'POST', 'app_issue_reports', value)));
    const concurrentMessages = (await messages()).filter(row => simultaneous.some(value => value.id === row.id));
    expect(concurrentMessages).toHaveLength(4);
    expect(new Set(concurrentMessages.map(row => row.thread_id)).size).toBe(1);
    expect(await qa.api('admin', 'GET', `message_thread_members?thread_id=eq.${concurrentMessages[0].thread_id}&select=user_id`)).toHaveLength(2);

    const work = await qa.seed('work_orders', { location_id: qa.location, title: 'QA automatic issue relay', created_by: qa.sessions.admin.user.id });
    const uploader = await qa.open('technician', 'work', width);
    await uploader.getByRole('heading', { name: work.title, exact: true }).click();
    const attachment = uploader.locator('#photo-form');
    await expandFor(attachment);
    await uploader.route('**/storage/v1/object/work-order-documents/**', route => route.request().method() === 'POST'
      ? route.fulfill({ status: 503, contentType: 'application/json', body: '{"message":"QA relay upload failure"}' }) : route.continue());
    await attachment.locator('[name=photo]').setInputFiles({ name: 'slides.txt', mimeType: 'text/plain', buffer: Buffer.from('QA mandrel notes') });
    await attachment.locator('button[type=submit]').click();
    await uploader.getByRole('button', { name: 'Attach 1 file', exact: true }).click();
    await expect(uploader.getByRole('dialog').getByRole('status')).toContainText('0 of 1 attached.', { timeout: 30000 });
    await expect.poll(async () => (await reports()).filter(row => row.title.startsWith('Upload failed:')).length).toBe(1);
    const uploadReport = (await reports()).find(row => row.title.startsWith('Upload failed:'));
    const automatic = (await messages()).find(row => row.id === uploadReport.id);
    expect(automatic.thread_id).toBe(first.thread_id);
    expect(automatic.body).toContain('slides.txt');
    expect(automatic.body).toContain('QA relay upload failure');
    await qa.shot(uploader, `automatic-upload-report-${width}`);
    qa.manifest.relay = { reportId, firstThread: first.thread_id, simultaneous: simultaneous.map(row => row.id), uploadReport: uploadReport.id };
    qa.save();
  } finally { await qa.finish(); }
});
