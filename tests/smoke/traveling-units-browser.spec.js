const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/features/travelingUnits.mjs'), 'utf8').replace('export function', 'function');
const css = ['styles.css','src/render/travelingStyles.css'].map(p=>fs.readFileSync(path.join(root,p),'utf8')).join('\n');
async function setup(page) {
  await page.route('http://travel-board.test/**',route=>route.fulfill({contentType:'text/html',body:`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style><main class="panel" id="fixture"></main><script>${source}
    window.ctx={companyId:'company',userId:'user'}; window.editable=true; window.visible=true;
    window.calls=[]; window.saved=[]; window.notifications=[]; window.delay=false;
    const unit={id:'unit',name:'150/200 Curving <Unit> #3',company_id:'company',location_id:'salem',status:'offline',traveling_revision:3};
    const row={asset:unit,current_facility:'Salem, OR',previous_facility:'Riverside, CA',moved_at:'2026-09-23T12:00:00Z',moved_by:'Tech <One>',open_work_count:1013};
    const escapeHtml=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
    function render(){document.getElementById('fixture').innerHTML=visible?board.render():'';board.bind();}
    window.board=createTravelingUnits({escapeHtml,documentRef:document,getContext:()=>ctx,getLocations:()=>[{id:'salem',name:'Salem, OR'},{id:'river',name:'Riverside, CA'}],canEdit:()=>editable,isVisible:()=>visible,
      client:()=>({rpc:(name,args)=>{calls.push({name,args}); if(name==='traveling_units_summary')return Promise.resolve({data:{total:1,page:1,units:[structuredClone(row)]}}); return new Promise(resolve=>{window.finish=()=>resolve({data:{...unit,status:args.p_status||unit.status,location_id:args.p_location_id||unit.location_id}});if(!delay)finish();});}}),
      timeout:p=>p,replaceAsset:a=>saved.push(a),renderWorkspace:render,showNotice:s=>notifications.push(s),openDetails:()=>{},closeBoard:()=>{visible=false;render();}});
    window.render=render;render();</script>`}));
  await page.goto('http://travel-board.test/');
  await expect(page.locator('.travel-unit')).toHaveCount(1);
}
for(const width of [320,390,430,1440]) test(`traveling board is legible and tap-safe at ${width}px`,async({browser},info)=>{
  const context=await browser.newContext({viewport:{width,height:900},isMobile:width<500,hasTouch:width<500});
  const page=await context.newPage(); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  try {
    await setup(page);
    await expect(page.locator('.travel-unit')).toContainText('Curving <Unit>');
    await expect(page.locator('.travel-unit')).toContainText('Tech <One>');
    await expect(page.locator('unit, one')).toHaveCount(0);
    await expect(page.locator('.travel-unit')).toContainText('1013');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const facility=page.locator('.travel-current dd');
    expect(await facility.evaluate(n=>getComputedStyle(n).color)).toBe('rgb(142, 203, 255)');
    expect(await facility.evaluate(n=>getComputedStyle(n).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
    for(const button of await page.locator('.travel-unit button').all()) expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(48);
    const update=page.getByRole('button',{name:'Update Location'});
    if(width<500) await update.tap();else await update.click();
    await expect(page.locator('.travel-dialog')).toBeVisible();
    await page.locator('.travel-dialog select').selectOption('river');
    // Workspace redraws must not discard an open update form.
    await page.evaluate(()=>render()); await expect(page.locator('.travel-dialog select')).toHaveValue('river');
    await page.screenshot({path:info.outputPath(`travel-dialog-${width}.png`)});
    await page.getByRole('button',{name:'Cancel',exact:true}).click();
    expect(await page.evaluate(()=>calls.filter(c=>c.name!=='traveling_units_summary').length)).toBe(0);
    await page.locator('[data-travel-condition]').click();
    await page.locator('.travel-dialog select').selectOption('watch');
    await page.getByRole('button',{name:'Save Condition'}).click();
    await expect(page.locator('.travel-dialog')).toHaveCount(0);
    expect(await page.evaluate(()=>calls.find(c=>c.name==='update_traveling_equipment_condition').args.p_expected_revision)).toBe(3);
    await page.screenshot({path:info.outputPath(`travel-board-${width}.png`),fullPage:true});
    expect(errors).toEqual([]);
  }finally{await context.close();}
});
test('late save cannot update another company; accounting has no edit controls',async({page})=>{
  await setup(page); await page.evaluate(()=>{delay=true;});
  await page.locator('[data-travel-location]').click(); await page.locator('.travel-dialog select').selectOption('river');
  await page.getByRole('button',{name:'Save Location'}).click();
  const initial=await page.evaluate(()=>saved.length);
  await page.evaluate(()=>{ctx={companyId:'other',userId:'other'};editable=false;visible=false;render();finish();});
  await expect(page.locator('.travel-dialog')).toHaveCount(0);
  expect(await page.evaluate(()=>saved.length)).toBe(initial);
  expect(await page.evaluate(()=>notifications)).toEqual([]);
  await page.evaluate(()=>{visible=true;render();});
  await expect(page.locator('.travel-unit')).toHaveCount(1);
  await expect(page.locator('[data-travel-condition], [data-travel-location]')).toHaveCount(0);
});
