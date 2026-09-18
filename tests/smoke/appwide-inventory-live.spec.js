const { test, expect } = require('@playwright/test');
const { createQa, expandFor } = require('../helpers/appwide-qa');
test.setTimeout(90000);

test('stale inventory screens cannot silently overwrite another user stock changes', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const part = await qa.seed('parts', { location_id: qa.location, name: 'QA Concurrent Belt', quantity_on_hand: 10 });
    const first = await qa.open('admin', 'parts');
    const second = await qa.open('technician', 'parts');
    for (const page of [first, second]) {
      await page.locator(`[data-open-part="${part.id}"]`).click();
      const form = page.locator(`[data-restock-part="${part.id}"]`);
      await expandFor(form);
      await form.locator('[name=quantity]').fill('1');
    }
    const quantity = async () => (await qa.api('admin', 'GET', `parts?id=eq.${part.id}&select=quantity_on_hand`))[0].quantity_on_hand;
    await first.locator('[data-restock-part] button[type=submit]').click();
    await expect.poll(quantity).toBe(11);
    await second.locator('[data-restock-part] button[type=submit]').click();
    await second.qaSettle();
    await expect(second.locator('.app-notice')).toContainText(/Inventory changed/i);
    expect(await quantity()).toBe(11);
    await expect(second.locator('[data-restock-part] [name=quantity]')).toHaveValue('1');
    await second.locator('[data-close-part-detail]').first().click();
    await second.locator(`[data-open-part="${part.id}"]`).click();
    await expect(second.locator('[data-edit-part] [name=quantity_on_hand]')).toHaveValue('11');
    await second.locator('[data-restock-part] [name=quantity]').fill('1');
    await second.locator('[data-restock-part] button[type=submit]').click();
    await expect.poll(quantity).toBe(12);
  } finally { await qa.finish(); }
});

test('obsolete part reads cannot replace an edit snapshot; Edit and Use reject conflicts', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  let release;
  try {
    const part = await qa.seed('parts', { location_id: qa.location, name: 'QA Delayed Part', quantity_on_hand: 10 });
    const page = await qa.open('admin', 'parts');
    const gate = new Promise(resolve => { release = resolve; });
    let held = false;
    await page.route('**/rest/v1/parts?**', async route => {
      const url = new URL(route.request().url());
      if (route.request().method() === 'GET' && url.searchParams.get('id') === `eq.${part.id}` && !held) {
        held = true;
        await gate;
      }
      await route.continue();
    });
    const card = page.locator(`[data-open-part="${part.id}"]`);
    await card.click();
    await expect.poll(() => held).toBe(true);
    await card.click();
    await expect(page.locator('[data-edit-part] [name=quantity_on_hand]')).toHaveValue('10');
    await qa.api('technician', 'PATCH', `parts?id=eq.${part.id}&company_id=eq.${qa.company}`, { quantity_on_hand: 11 });
    release();
    await page.qaSettle();
    const stored = async () => (await qa.api('admin', 'GET', `parts?id=eq.${part.id}&select=name,quantity_on_hand`))[0];
    const edit = page.locator('[data-edit-part]');
    await edit.locator('[name=name]').fill('QA Kept Draft');
    await edit.locator('button[type=submit]').click();
    await expect(page.locator('[data-part-edit-error]')).toContainText('Inventory changed');
    expect(await stored()).toEqual({ name: part.name, quantity_on_hand: 11 });
    await expect(edit.locator('[name=name]')).toHaveValue('QA Kept Draft');
    await page.locator('[data-use-part] button[type=submit]').click();
    await expect(page.locator('.app-notice')).toContainText(/Inventory changed/i);
    expect((await stored()).quantity_on_hand).toBe(11);
    await page.locator('[data-close-part-detail]').first().click();
    await page.locator(`[data-open-part="${part.id}"]`).click();
    await expect(page.locator('[data-edit-part] [name=quantity_on_hand]')).toHaveValue('11');
    await page.locator('[data-use-part] button[type=submit]').click();
    await expect.poll(async () => (await stored()).quantity_on_hand).toBe(10);
    await page.qaSettle();
    await page.locator('[data-edit-part] [name=name]').fill('QA Saved Name');
    await page.locator('[data-edit-part] button[type=submit]').click();
    await expect.poll(stored).toEqual({ name: 'QA Saved Name', quantity_on_hand: 10 });
  } finally { release?.(); await qa.finish(); }
});
