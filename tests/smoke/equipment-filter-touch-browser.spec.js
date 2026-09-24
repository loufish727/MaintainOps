const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const scripts = ['src/render/assetInventoryDisplay.js', 'src/utils/workspaceInventoryFilterEvents.js']
  .map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');

for (const width of [390, 430, 768, 1440]) test(`equipment filter activates across its full surface at ${width}px`, async ({ browser }, testInfo) => {
  const touch = width < 1000;
  const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: touch, isMobile: touch });
  const page = await context.newPage();
  try {
    await page.route('http://equipment-filter.test/**', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html>
      <meta name="viewport" content="width=device-width,initial-scale=1"><style>${styles}</style><main class="panel" id="fixture"></main>
      <script>${scripts}
      let type = 'all', status = 'all', area = 'all', resets = 0;
      const state = { getAssetTypeFilter: () => type, setAssetTypeFilter: value => type = value,
        getAssetStatusFilter: () => status, setAssetStatusFilter: value => status = value,
        getAssetAreaFilter: () => area, setAssetAreaFilter: value => area = value };
      function render() {
        document.querySelector('#fixture').innerHTML = MaintainOpsAssetInventoryDisplay.renderAssetInventoryControls({
          assets: [{asset_type:'traveling_machine', status:'running'}], matchesActiveLocation: () => true,
          workspaceUiState: state, ASSET_TYPE_OPTIONS: ['machine','traveling_machine'], escapeHtml: value => String(value)
        });
        MaintainOpsWorkspaceInventoryFilterEvents.bindWorkspaceInventoryFilterEvents({state, renderWorkspace:render,
          resetAssetsPage: () => resets++, resetPartsPage: () => {}});
      }
      window.filterTest = { values: () => ({type,status,resets}) };
      render();</script>` }));
    await page.goto('http://equipment-filter.test/');
    if (width < 500) expect(await page.locator('.asset-master-summary').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length)).toBe(width <= 420 ? 1 : 2);
    const button = page.locator('[data-asset-type-filter=traveling_machine]');
    let expected = false, resets = 0;
    for (const target of ['span', 'strong', 'small', 'top-left', 'bottom-right', 'center']) {
      await button.scrollIntoViewIfNeeded();
      const box = await button.boundingBox();
      const child = ['span','strong','small'].includes(target) ? await button.locator(target).boundingBox() : null;
      const point = child ? {x:child.x+child.width/2, y:child.y+child.height/2}
        : target === 'top-left' ? {x:box.x+8,y:box.y+8}
        : target === 'bottom-right' ? {x:box.x+box.width-8,y:box.y+box.height-8}
        : {x:box.x+box.width/2,y:box.y+box.height/2};
      expect(await button.evaluate((node, point) => document.elementFromPoint(point.x, point.y) === node, point), `${target} uses the full button hit target`).toBe(true);
      if (touch) expect(await button.evaluate(node => getComputedStyle(node).transform)).toBe('none');
      if (touch) await page.touchscreen.tap(point.x, point.y);
      else await page.mouse.click(point.x, point.y);
      expected = !expected; resets++;
      await expect(button, target).toHaveAttribute('aria-pressed', String(expected));
      expect(await page.evaluate(() => filterTest.values())).toEqual({type:expected?'traveling_machine':'all',status:'all',resets});
    }
    await button.focus();
    for (const key of ['Enter', 'Space']) {
      await page.keyboard.press(key);
      expected = !expected; resets++;
      await expect(button).toHaveAttribute('aria-pressed', String(expected));
      expect(await page.evaluate(() => filterTest.values())).toEqual({type:expected?'traveling_machine':'all',status:'all',resets});
      await button.focus();
    }
    await page.screenshot({path:testInfo.outputPath(`equipment-filters-${width}.png`)});
  } finally { await context.close(); }
});
