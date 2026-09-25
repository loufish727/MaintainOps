const { test, expect } = require('@playwright/test');
const { createQa, nav, expandFor } = require('../helpers/appwide-qa');
test.setTimeout(180000);

test('team roles, profile, password validation, invites, company settings and QR link controls', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const page = await qa.open('admin', 'team');
    const roleForm = page.locator(`[data-member-role="${qa.sessions.technician.user.id}"]`);
    await expandFor(roleForm);
    await roleForm.locator('[name=role]').selectOption('manager');
    await roleForm.locator('button[type=submit]').click();
    await page.qaSettle();
    const membership = () => qa.api('admin', 'GET', `company_members?company_id=eq.${qa.company}&user_id=eq.${qa.sessions.technician.user.id}&select=role`);
    await expect.poll(async () => (await membership())[0].role).toBe('manager');
    await page.qaSettle();
    await roleForm.locator('[name=role]').selectOption('technician');
    await roleForm.locator('button[type=submit]').click();
    await expect.poll(async () => (await membership())[0].role).toBe('technician');

    const profile = page.locator('#profile-form');
    await expandFor(profile);
    await profile.locator('[name=full_name]').fill('QA Appwide Admin');
    await profile.locator('[name=mobile_tech]').check();
    await profile.locator('button[type=submit]').click();
    await expect.poll(async () => (await qa.api('admin', 'GET', `profiles?company_id=eq.${qa.company}&user_id=eq.${qa.sessions.admin.user.id}&select=full_name`))[0].full_name).toBe('QA Appwide Admin');
    const password = page.locator('#password-change-form');
    await expandFor(password);
    await password.locator('[name=password]').fill('NotAnActualPasswordChange1');
    await password.locator('[name=confirmPassword]').fill('DifferentPassword2');
    await password.locator('button[type=submit]').click();
    await expect(page.locator('#password-change-error')).toContainText('match');
    await password.locator('[name=password]').fill('');
    await password.locator('[name=confirmPassword]').fill('');

    const invite = page.locator('#team-invite-form');
    await expandFor(invite);
    await invite.locator('[name=email]').fill('appwide-do-not-send@example.invalid');
    await invite.locator('button[type=submit]').click();
    const invites = () => qa.api('admin', 'GET', `company_invites?company_id=eq.${qa.company}&select=*`);
    await expect.poll(async () => (await invites()).length).toBe(1);
    const invitation = (await invites())[0];
    await expandFor(page.locator(`[data-cancel-invite="${invitation.id}"]`));
    await page.locator(`[data-cancel-invite="${invitation.id}"]`).click();
    await page.locator(`[data-confirm-cancel-invite="${invitation.id}"]`).click();
    await expect.poll(async () => (await invites()).length).toBe(0);
    const link = page.locator('#team-invite-link-form');
    await expandFor(link);
    await link.locator('button[type=submit]').click();
    await expect(page.locator('[data-revoke-invite-link]')).toHaveCount(1);
    await expandFor(page.locator('[data-revoke-invite-link]'));
    await page.locator('[data-revoke-invite-link]').click();
    await page.locator('[data-confirm-revoke-invite-link]').click();
    await expect(page.locator('[data-revoke-invite-link]')).toHaveCount(0);

    await nav(page, 'settings');
    const name = `${qa.manifest.name} verified`;
    await page.locator('#company-settings-form [name=name]').fill(name);
    await page.locator('#company-settings-form button[type=submit]').click();
    await expect.poll(async () => (await qa.api('admin', 'GET', `companies?id=eq.${qa.company}&select=name`))[0].name).toBe(name);
    qa.manifest.name = name; qa.save();
    await page.qaSettle();
    await page.locator('#location-form [name=name]').fill('QA Warehouse');
    await page.locator('#location-form button[type=submit]').click();
    await expect.poll(async () => (await qa.api('admin', 'GET', `locations?company_id=eq.${qa.company}&select=id`)).length).toBe(3);
    await page.qaSettle();
    await page.locator(`[data-create-public-request-link="${qa.location}"]`).click();
    const qrLinks = () => qa.api('admin', 'GET', `public_request_links?company_id=eq.${qa.company}&location_id=eq.${qa.location}&select=*`);
    await expect.poll(async () => (await qrLinks()).length).toBe(1);
    const qr = (await qrLinks())[0];
    const qrCard = page.locator('.public-request-link-card').filter({ has: page.locator(`[data-regenerate-public-request-link="${qr.id}"]`) });
    await expect(qrCard.getByRole('link', { name: 'See Request Form', exact: true })).toHaveAttribute('href', new RegExp(`request=${qr.token}`));
    await expect(qrCard.locator('[data-copy-public-request-link], [data-disable-public-request-link]')).toHaveCount(0);
    await qrCard.getByRole('button', { name: 'Regenerate/Replace QR Code', exact: true }).click();
    await page.getByRole('alertdialog').getByRole('button', { name: 'Replace QR Code', exact: true }).click();
    await expect.poll(async () => (await qrLinks())[0].token).not.toBe(qr.token);
    const replaced = (await qrLinks())[0];
    expect(replaced.is_active).toBe(true);

    // Seed an older disabled link to retain coverage of same-code recovery.
    await qa.api('admin', 'PATCH', `public_request_links?company_id=eq.${qa.company}&id=eq.${qr.id}`, { is_active: false });
    const disabledQrPage = await qa.open('admin', 'settings');
    await disabledQrPage.locator(`[data-enable-public-request-link="${qr.id}"]`).click();
    await expect.poll(async () => (await qrLinks())[0].is_active).toBe(true);
    expect((await qrLinks())[0].token).toBe(replaced.token);
    await expect(disabledQrPage.locator(`[data-regenerate-public-request-link="${qr.id}"]`)).toBeVisible();
    await nav(page, 'setup');
    await expect(page.getByRole('heading', { name: 'Admin Setup', exact: true })).toBeVisible();
    await expect(page.locator('.setup-list')).not.toBeEmpty();
    await nav(page, 'manager');
    await expect(page.getByRole('heading', { name: 'Manager', exact: true })).toBeVisible();
    await qa.shot(page, 'manager');
  } finally { await qa.finish(); }
});

test('conversion controls calculate and swap standard values without loading shop charts', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const page = await qa.open('accounting', 'conversions', 390);
    const length = page.locator('[data-conversion-group=length]');
    await length.locator('summary').click();
    await length.locator('[data-conversion-input]').fill('1');
    await length.locator('[data-conversion-from]').selectOption('in');
    await length.locator('[data-conversion-to]').selectOption('mm');
    await expect(length.locator('output')).toContainText('25.4');
    await length.locator('[data-conversion-swap]').click();
    await expect(length.locator('[data-conversion-from]')).toHaveValue('mm');
    await expect(length.locator('[data-conversion-to]')).toHaveValue('in');
    await length.locator('[data-conversion-input]').fill('25.4');
    await expect(length.locator('output')).toHaveText('1 Inches');
    const temp = page.locator('[data-conversion-group=temperature]');
    await temp.locator('summary').click();
    await temp.locator('[data-conversion-input]').fill('32');
    await expect(temp.locator('output')).toHaveText('0 Celsius');
    await temp.locator('[data-conversion-input]').fill('-40');
    await expect(temp.locator('output')).toHaveText('-40 Celsius');
    await expect(page.getByRole('heading', { name: 'Shop Reference Charts', exact: true })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2)).toBe(true);
    await qa.shot(page, 'conversions-mobile');
  } finally { await qa.finish(); }
});
