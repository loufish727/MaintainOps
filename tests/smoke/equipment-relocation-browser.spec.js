const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root,'src/features/equipmentRelocation.mjs'),'utf8').replace('export function','function');
const css = ['styles.css','src/render/travelingStyles.css'].map(p=>fs.readFileSync(path.join(root,p),'utf8')).join('\n');
async function setup(page) {
  await page.route('http://relocation.test/**',r=>r.fulfill({contentType:'text/html',body:`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style>
    <main class="panel"><form id="edit-asset-form"><label>Name<input name="name" value="Folder"></label><select name="parent"><option value="">None</option><option value="parent">Line</option></select></form><button data-relocate-equipment="root">Relocate Equipment</button></main>
    <script>${source}
    window.scope='user:company:assets:root';window.allowed=true;window.calls=[];window.saved=[];window.notices=[];window.delay=false;window.fail=false;
    const nodes=[{id:'root',name:'Folder <One>',location_id:'north',status:'degraded',facility:'North'},...Array.from({length:13},(_,i)=>({id:'b'+i,name:'Branch '+String(i).padStart(2,'0'),parent_asset_id:'root',branch_id:'b'+i})),{id:'child',name:'Pump <Two>',parent_asset_id:'b0',branch_id:'b0'}];
    const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
    window.relocator=createEquipmentRelocation({documentRef:document,escapeHtml:esc,getContext:()=>scope,getCompanyId:()=> 'company',canRelocate:()=>allowed,getLocations:()=>[{id:'north',name:'North'},{id:'south',name:'South'}],
      client:()=>({rpc:(name,args)=>{calls.push({name,args});if(name==='equipment_relocation_review')return Promise.resolve({data:{nodes,parent:{id:'parent',name:'Line <Parent>'},token:'token'}});return new Promise(resolve=>{window.finish=()=>resolve(fail?{error:{message:'Equipment changed since this review.'}}:{data:{assets:[nodes[0]],events:[]}});if(!delay)finish();});}}),timeout:p=>p,onSaved:r=>saved.push(r),showNotice:s=>notices.push(s)});relocator.bind();</script>`}));
  await page.goto('http://relocation.test/');
}
for(const width of [320,390,430,1440]) test(`relocation review and confirmation at ${width}px`,async({browser},info)=>{
  const context=await browser.newContext({viewport:{width,height:900},isMobile:width<500,hasTouch:width<500});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  try {
    await setup(page);
    const open=page.locator('[data-relocate-equipment]');if(width<500)await open.tap();else await open.click();
    const dialog=page.locator('.relocation-dialog');await expect(dialog).toBeVisible();
    await expect(dialog.locator('[data-relocate-branch]')).toHaveCount(12);
    await expect(dialog).toContainText('Folder <One>');await expect(dialog.locator('one, two, parent')).toHaveCount(0);
    await dialog.getByLabel('New facility').selectOption('south');
    await dialog.locator('[data-relocate-branch=b0]').uncheck();
    await expect(dialog.locator('[data-relocate-impact]')).toHaveText('13 moving / 2 staying');
    await dialog.getByRole('button',{name:'Next',exact:true}).click();
    await expect(dialog.locator('[data-relocate-branch]')).toHaveCount(1);
    await dialog.getByRole('button',{name:'Previous',exact:true}).click();
    await expect(dialog.locator('[data-relocate-branch=b0]')).not.toBeChecked();
    await page.evaluate(()=>relocator.bind());await expect(dialog.getByLabel('New facility')).toHaveValue('south');
    for(const button of await dialog.locator('button:visible').all()) expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(48);
    expect(await dialog.evaluate(n=>n.scrollWidth<=n.clientWidth+1)).toBe(true);
    await page.screenshot({path:info.outputPath(`relocation-review-${width}.png`)});
    await dialog.getByRole('button',{name:'Review Relocation'}).click();
    await expect(dialog).toContainText('Staying (2)');await expect(dialog).toContainText('Branch 00 will be detached');
    await expect(dialog).toContainText('Folder <One> will be detached from Line <Parent>');
    expect(await page.evaluate(()=>calls.filter(c=>c.name==='relocate_equipment').length)).toBe(0);
    await page.screenshot({path:info.outputPath(`relocation-confirm-${width}.png`)});
    await dialog.getByRole('button',{name:'Cancel',exact:true}).click();
    await expect(dialog).toHaveCount(0);await expect(open).toBeFocused();
    expect(await page.evaluate(()=>saved.length)).toBe(0);expect(errors).toEqual([]);
  } finally {await context.close();}
});
test('draft protection, duplicate submit, stale review and late response isolation',async({browser})=>{
  const context=await browser.newContext();const page=await context.newPage();
  try {
    await setup(page);await page.getByLabel('Name',{exact:true}).fill('Unsaved');await page.locator('[data-relocate-equipment]').click();
    expect(await page.evaluate(()=>calls.length)).toBe(0);await expect(page.getByLabel('Name',{exact:true})).toHaveValue('Unsaved');
    expect(await page.evaluate(()=>notices)).toContain('Save equipment edits before relocating.');
    await page.getByLabel('Name',{exact:true}).fill('Folder');
    const open=async()=>{await page.locator('[data-relocate-equipment]').click();await page.getByLabel('New facility').selectOption('south');await page.getByRole('button',{name:'Review Relocation'}).click();};
    await open();await page.evaluate(()=>{delay=true;fail=true;document.querySelector('[data-relocate-save]').click();document.querySelector('[data-relocate-save]').click();});
    expect(await page.evaluate(()=>calls.filter(c=>c.name==='relocate_equipment').length)).toBe(1);
    await page.evaluate(()=>finish());await expect(page.locator('[data-relocate-error]')).toContainText('changed since');
    await expect(page.locator('[data-relocate-save]')).toBeDisabled();await expect(page.locator('[data-relocate-back]')).toBeDisabled();
    await page.getByRole('button',{name:'Review Again'}).click();await expect(page.getByLabel('New facility')).toHaveValue('');
    await page.getByLabel('New facility').selectOption('south');await page.getByRole('button',{name:'Review Relocation'}).click();
    await page.evaluate(()=>{fail=false;});await page.locator('[data-relocate-save]').click();
    await page.evaluate(()=>{scope='other:company:assets:root';allowed=false;relocator.bind();finish();});
    await expect(page.locator('.relocation-dialog')).toHaveCount(0);expect(await page.evaluate(()=>saved)).toEqual([]);
    await page.evaluate(()=>{allowed=true;delay=false;});await open();await page.locator('[data-relocate-save]').click();
    await expect(page.locator('.relocation-dialog')).toHaveCount(0);expect(await page.evaluate(()=>saved.length)).toBe(1);
  } finally {await context.close();}
});
