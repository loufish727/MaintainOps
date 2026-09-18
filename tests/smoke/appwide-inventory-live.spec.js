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
