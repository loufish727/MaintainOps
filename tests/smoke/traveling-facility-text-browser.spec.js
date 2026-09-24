const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const renderer = fs.readFileSync(path.join(root, 'src/render/assetCardDisplay.js'), 'utf8');

for (const width of [320, 390, 430, 1440]) test(`traveling facility text is highlighted without a badge at ${width}px`, async ({ browser }, testInfo) => {
  const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 500, hasTouch: width < 500 });
  const page = await context.newPage();
  try {
    await page.route('http://facility-badge.test/**', route => route.fulfill({contentType:'text/html',body:`<!doctype html>
      <meta name="viewport" content="width=device-width,initial-scale=1"><style>${styles}</style><main class="panel"><div class="asset-list"></div></main>
      <script>${renderer}
      const locations = [{id:'sacramento',name:'Sacramento, CA'},{id:'long',name:'NortheasternManufacturingAndDistributionCenter <Annex>'}];
      const {renderAssetCard} = MaintainOpsAssetCardDisplay.createAssetCardDisplayHelpers({
        escapeHtml:value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'),
        assetTypeLabel:()=> 'Traveling Primary',getWorkOrders:()=>[],getActiveAssetId:()=>'',getLocations:()=>locations,
        parentAssetFor:()=>null,childAssetsFor:()=>[]
      });
      document.querySelector('.asset-list').innerHTML = ['sacramento','long','missing'].map((location_id,i)=>renderAssetCard({
        id:String(i),name:'150/200 Curving Unit #'+(i+1),asset_type:'traveling_machine',status:'running',location_id
      })).join('');
      window.cardOpened = '';
      document.querySelectorAll('.asset-card').forEach(card=>card.addEventListener('click',()=>window.cardOpened=card.dataset.assetId));
      </script>`}));
    await page.goto('http://facility-badge.test/');
    const badges = page.locator('.asset-facility');
    await expect(badges).toHaveCount(3);
    await expect(badges.first()).toHaveText('Current facility: Sacramento, CA');
    await expect(badges.nth(1)).toContainText('<Annex>');
    await expect(badges.nth(2)).toContainText('Location unavailable');
    await expect(page.locator('annex')).toHaveCount(0);
    for (const badge of await badges.all()) {
      const metrics = await badge.evaluate(node=>{
        const style=getComputedStyle(node), rect=node.getBoundingClientRect(), parent=node.closest('.asset-card').getBoundingClientRect();
        const luminance=color=>color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
        // The text is transparent; composite its ancestors' backgrounds for contrast.
        let background=[0,0,0];
        const ancestors=[];
        for(let item=node;item;item=item.parentElement) ancestors.unshift(item);
        for(const item of ancestors) {
          const rgba=getComputedStyle(item).backgroundColor.match(/[\d.]+/g).map(Number), alpha=rgba[3]??1;
          background=background.map((v,i)=>rgba[i]*alpha+v*(1-alpha));
        }
        const a=luminance(style.color), b=luminance('rgb('+background.join(',')+')');
        return {contrast:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),contained:rect.left>=parent.left&&rect.right<=parent.right,
          color:style.color,weight:Number(style.fontWeight),background:style.backgroundColor,border:style.borderWidth,padding:style.padding};
      });
      expect(metrics.contrast).toBeGreaterThanOrEqual(4.5);
      expect(metrics.contained).toBe(true);
      expect(metrics.color).toBe('rgb(142, 203, 255)'); expect(metrics.weight).toBeGreaterThanOrEqual(600);
      expect(metrics.background).toBe('rgba(0, 0, 0, 0)'); expect(metrics.border).toBe('0px'); expect(metrics.padding).toBe('0px');
    }
    if (width < 500) await badges.first().tap(); else await badges.first().click();
    expect(await page.evaluate(()=>cardOpened)).toBe('0');
    await page.screenshot({path:testInfo.outputPath(`facility-text-${width}.png`),fullPage:true});
  } finally { await context.close(); }
});
