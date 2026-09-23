const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.resolve(__dirname, '../../src/utils/equipmentCreateDrafts.mjs'), 'utf8').replaceAll('export function', 'function');

async function fixture(page) {
  await page.route('http://maintenance-drafts.test/**', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><main></main><script>${source}
    let scope = 'user:company:location', equipment = 'asset-a';
    const drafts = createMaintenanceCreateDrafts({ getScope: () => scope });
    const pmFields = '<input name="title"><select name="frequency"><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select><input name="next_due_at" type="date"><select name="procedure_template_id"><option value="">None</option><option value="template-a">A</option></select><button type="reset">Clear Form</button>';
    function render() {
      drafts.capture();
      document.querySelector('main').innerHTML = '<form id="create-pm-form" data-create-pm-form><select name="asset_id"><option value="">None</option><option value="asset-a">A</option></select>' + pmFields + '</form>'
        + '<form data-create-pm-form data-equipment-pm-form="' + equipment + '"><input type="hidden" name="asset_id" value="' + equipment + '">' + pmFields + '</form>'
        + '<form id="create-procedure-form"><input name="name"><textarea name="description"></textarea><button type="reset">Clear Form</button></form>'
        + ['template-a','template-b'].map(id => '<form data-add-step="' + id + '"><input name="prompt"><select name="response_type"><option value="checkbox">Checkbox</option><option value="number">Number</option></select><select name="required"><option value="true">Required</option><option value="false">Optional</option></select><button type="reset">Clear Form</button></form>').join('')
        + '<div style="height:2500px"></div>';
      drafts.restore();
    }
    window.draftTest = { render, switchScope(value) { scope = value; render(); }, switchEquipment(value) { equipment = value; render(); },
      submit(selector) { return drafts.snapshot(document.querySelector(selector)); }, saved(token) { drafts.clear(token); render(); }, signOut() { drafts.reset(); render(); } };
    render();
  </script>` }));
  await page.goto('http://maintenance-drafts.test/');
}

for (const width of [390, 1440]) test(`independent PM, procedure and step drafts survive redraw, scroll and reload at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await fixture(page);
  const pm = page.locator('#create-pm-form'), equipment = page.locator('[data-equipment-pm-form]');
  const procedure = page.locator('#create-procedure-form'), stepA = page.locator('[data-add-step="template-a"]'), stepB = page.locator('[data-add-step="template-b"]');
  await pm.locator('[name=title]').fill('Main PM draft');
  await pm.locator('[name=asset_id]').selectOption('asset-a');
  await pm.locator('[name=frequency]').selectOption('monthly');
  await pm.locator('[name=next_due_at]').fill('2027-01-31');
  await pm.locator('[name=procedure_template_id]').selectOption('template-a');
  await equipment.locator('[name=title]').fill('Equipment PM draft');
  await procedure.locator('[name=name]').fill('Procedure draft');
  await procedure.locator('[name=description]').fill('Keep <literal> text');
  await stepA.locator('[name=prompt]').fill('Read the pressure');
  await stepA.locator('[name=response_type]').selectOption('number');
  await stepA.locator('[name=required]').selectOption('false');
  await stepB.locator('[name=prompt]').fill('Different step draft');
  await page.evaluate(() => scrollTo(0, 1200));
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const before = await page.evaluate(() => scrollY);
  await page.evaluate(() => draftTest.render());
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await page.reload();
  await expect(pm.locator('[name=title]')).toHaveValue('Main PM draft');
  await expect(pm.locator('[name=asset_id]')).toHaveValue('asset-a');
  await expect(pm.locator('[name=frequency]')).toHaveValue('monthly');
  await expect(pm.locator('[name=next_due_at]')).toHaveValue('2027-01-31');
  await expect(pm.locator('[name=procedure_template_id]')).toHaveValue('template-a');
  await expect(equipment.locator('[name=title]')).toHaveValue('Equipment PM draft');
  await expect(procedure.locator('[name=name]')).toHaveValue('Procedure draft');
  await expect(procedure.locator('[name=description]')).toHaveValue('Keep <literal> text');
  await expect(stepA.locator('[name=prompt]')).toHaveValue('Read the pressure');
  await expect(stepA.locator('[name=response_type]')).toHaveValue('number');
  await expect(stepA.locator('[name=required]')).toHaveValue('false');
  await expect(stepB.locator('[name=prompt]')).toHaveValue('Different step draft');
  await stepA.getByRole('button', { name: 'Clear Form' }).click();
  await page.reload();
  await expect(stepA.locator('[name=prompt]')).toHaveValue('');
  await expect(stepB.locator('[name=prompt]')).toHaveValue('Different step draft');
  await expect(pm.locator('[name=title]')).toHaveValue('Main PM draft');
});

test('PM drafts preserve fixed equipment ownership and clear only the submitted version', async ({ page }) => {
  await fixture(page);
  const selector = '[data-equipment-pm-form]';
  await page.locator(`${selector} [name=title]`).fill('Asset A PM');
  const old = await page.evaluate(selector => draftTest.submit(selector), selector);
  await page.locator(`${selector} [name=title]`).fill('Newer A PM');
  await page.evaluate(token => draftTest.saved(token), old);
  await expect(page.locator(`${selector} [name=title]`)).toHaveValue('Newer A PM');
  const saved = await page.evaluate(selector => draftTest.submit(selector), selector);
  await page.evaluate(() => draftTest.switchEquipment('asset-b'));
  await expect(page.locator(`${selector} [name=title]`)).toHaveValue('');
  await expect(page.locator(`${selector} [name=asset_id]`)).toHaveValue('asset-b');
  await page.locator(`${selector} [name=title]`).fill('Asset B PM');
  await page.evaluate(token => draftTest.saved(token), saved);
  await expect(page.locator(`${selector} [name=title]`)).toHaveValue('Asset B PM');
  await page.evaluate(() => draftTest.switchScope('other:company:location'));
  await expect(page.locator(`${selector} [name=title]`)).toHaveValue('');
  await page.evaluate(() => draftTest.switchScope('user:company:location'));
  await expect(page.locator(`${selector} [name=title]`)).toHaveValue('Asset B PM');
  await page.evaluate(() => draftTest.switchEquipment('asset-a'));
  await expect(page.locator(`${selector} [name=title]`)).toHaveValue('');
  await page.evaluate(() => draftTest.signOut());
  expect(await page.evaluate(() => Object.keys(sessionStorage).filter(key => key.startsWith('maintainops.equipmentCreateDraft')))).toEqual([]);
});
