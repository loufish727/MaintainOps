const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.resolve(__dirname, '../../src/utils/equipmentCreateDrafts.mjs'), 'utf8').replaceAll('export function', 'function');
const key = 'maintainops.equipmentCreateDraft.v1:person:company:north';

async function fixture(page, storageFault = false) {
  await page.route('http://equipment-drafts.test/**', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><main></main><script>${source}
    let scope = 'person:company:north';
    const drafts = createEquipmentCreateDrafts({ getScope: () => scope, ${storageFault ? 'storage: () => { throw Error("disabled"); },' : ''} });
    function render() {
      drafts.capture();
      document.querySelector('main').innerHTML = '<form id="create-asset-form"><input name="name"><input name="asset_code"><input name="asset_tag"><input name="manufacturer"><input name="model"><input name="location_new"><select name="location_existing"><option value="">Unset</option><option value="Bay A">Bay A</option></select><select name="asset_type"><option value="machine">Primary</option><option value="component">Component</option></select><select name="parent_asset_id"><option value="">Top level</option><option value="parent">Parent</option></select><select name="location_id"><option value="north">North</option><option value="south">South</option></select><input name="safety_devices_required" type="checkbox" checked><input name="password" type="password"><input name="company_id" type="hidden" value="validated"><input name="photo" type="file"><button type="reset">Clear Form</button></form><div style="height:2500px"></div>';
      drafts.restore();
    }
    window.draftTest = { render, submit: () => drafts.snapshot(document.querySelector('form')), saved: token => { drafts.clear(token); render(); },
      switchScope(next) { scope = next; render(); }, signOut() { drafts.reset(); document.querySelector('main').replaceChildren(); },
      unavailable() { drafts.capture(); document.querySelector('[value="parent"]').remove(); drafts.restore(); }
    };
    render();
  </script>` }));
  await page.goto('http://equipment-drafts.test/');
}

for (const width of [390, 1440]) test(`equipment creation preserves controls, caret and scrolling at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await fixture(page);
  const text = { name: 'Press <not markup>', asset_code: 'SERIAL', asset_tag: '0007', manufacturer: 'Maker', model: 'D-1', location_new: 'New Bay' };
  for (const [name, value] of Object.entries(text)) await page.locator(`[name=${name}]`).fill(value);
  const selected = { location_existing: 'Bay A', asset_type: 'component', parent_asset_id: 'parent', location_id: 'south' };
  for (const [name, value] of Object.entries(selected)) await page.locator(`[name=${name}]`).selectOption(value);
  await page.locator('[name=safety_devices_required]').uncheck();
  await page.locator('[name=name]').focus();
  await page.locator('[name=name]').evaluate(field => field.setSelectionRange(2, 5));
  await page.evaluate(() => draftTest.render());
  expect(await page.locator('[name=name]').evaluate(field => [document.activeElement === field, field.selectionStart, field.selectionEnd])).toEqual([true, 2, 5]);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.evaluate(() => scrollTo(0, 1100));
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const y = await page.evaluate(() => scrollY);
  await page.evaluate(() => draftTest.render());
  expect(await page.evaluate(() => scrollY)).toBe(y);
  expect(await page.locator('[name=name]').evaluate(field => document.activeElement === field)).toBe(false);
  await page.reload();
  for (const [name, value] of Object.entries({ ...text, ...selected })) await expect(page.locator(`[name=${name}]`)).toHaveValue(value);
  await expect(page.locator('[name=safety_devices_required]')).not.toBeChecked();
  await page.getByRole('button', { name: 'Clear Form' }).click();
  await page.reload();
  await expect(page.locator('[name=name]')).toHaveValue('');
  await expect(page.locator('[name=safety_devices_required]')).toBeChecked();
});

test('equipment drafts stay scoped, omit unrelated fields and clear on sign-out', async ({ page }) => {
  await fixture(page);
  await page.locator('[name=name]').fill('North equipment');
  await page.locator('[name=password]').fill('not-a-draft-field');
  await page.locator('[name=asset_tag]').fill('0008');
  const stored = await page.evaluate(key => sessionStorage.getItem(key), key);
  expect(stored).not.toContain('not-a-draft-field'); expect(stored).not.toContain('company_id'); expect(stored).not.toContain('photo');
  for (const scope of ['person:company:south', 'person:other-company:north', 'other-person:company:north']) {
    await page.evaluate(scope => draftTest.switchScope(scope), scope);
    await expect(page.locator('[name=name]')).toHaveValue('');
  }
  await page.evaluate(() => draftTest.switchScope('person:company:north'));
  await expect(page.locator('[name=name]')).toHaveValue('North equipment');
  await page.evaluate(() => draftTest.signOut());
  expect(await page.evaluate(() => Object.keys(sessionStorage).filter(key => key.startsWith('maintainops.equipmentCreateDraft')))).toEqual([]);
  await page.reload();
  await expect(page.locator('[name=name]')).toHaveValue('');
});

test('successful saves clear only the submitted draft, not newer edits or another workspace', async ({ page }) => {
  await fixture(page);
  await page.locator('[name=name]').fill('Original');
  const old = await page.evaluate(() => draftTest.submit());
  await page.locator('[name=name]').fill('Newer edit');
  await page.evaluate(token => draftTest.saved(token), old);
  await page.reload();
  await expect(page.locator('[name=name]')).toHaveValue('Newer edit');
  const current = await page.evaluate(() => draftTest.submit());
  await page.evaluate(() => draftTest.switchScope('person:company:south'));
  await page.locator('[name=name]').fill('South draft');
  await page.evaluate(token => draftTest.saved(token), current);
  await expect(page.locator('[name=name]')).toHaveValue('South draft');
  await page.evaluate(() => draftTest.switchScope('person:company:north'));
  await expect(page.locator('[name=name]')).toHaveValue('');
});

test('invalid, expired and unavailable storage do not erase in-memory edits; stale selections require review', async ({ page }) => {
  await fixture(page);
  for (const value of ['{broken', JSON.stringify({ at: 0, fields: [['name', 'expired']] }), JSON.stringify({ at: Date.now(), fields: [null] })]) {
    await page.evaluate(({ key, value }) => sessionStorage.setItem(key, value), { key, value });
    await page.reload();
    await expect(page.locator('[name=name]')).toHaveValue('');
  }
  await page.locator('[name=parent_asset_id]').selectOption('parent');
  await page.evaluate(() => draftTest.unavailable());
  expect(await page.locator('[name=parent_asset_id]').evaluate(field => field.checkValidity())).toBe(false);
  await page.locator('[name=parent_asset_id]').selectOption('');
  expect(await page.locator('[name=parent_asset_id]').evaluate(field => field.checkValidity())).toBe(true);
  await page.unroute('http://equipment-drafts.test/**');
  await fixture(page, true);
  await page.locator('[name=name]').fill('Memory only');
  await page.evaluate(() => draftTest.render());
  await expect(page.locator('[name=name]')).toHaveValue('Memory only');
});
