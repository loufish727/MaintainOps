const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/features/equipmentArchive.mjs'), 'utf8').replaceAll('export ', '');
const css = ['styles.css','src/render/travelingStyles.css'].map(p => fs.readFileSync(path.join(root, p), 'utf8')).join('\n');
async function setup(page) {
  await page.route('http://archive.test/**', route => route.fulfill({contentType:'text/html',body:`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style><main class="panel" id="page"></main><script>${source}
    window.company='company';window.scope='user:company:assets:root';window.allowed=true;window.visible=false;window.calls=[];window.saved=[];window.notices=[];window.delayed=false;window.failed=false;window.blocked=false;window.archived=false;
    const nodes=[{id:'root',name:'Folder <One>',location_id:'north',status:'degraded'},...Array.from({length:13},(_,i)=>({id:'b'+i,name:'Branch '+i,parent_asset_id:'root',branch_id:'b'+i,status:'degraded',location_id:'north'}))];
    const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
    const client={rpc:(name,args)=>{calls.push({name,args});if(name==='equipment_archive_review')return Promise.resolve({data:{nodes:nodes.map(n=>({...n,archived_at:archived?'2026-09-24':null})),work:blocked?[{id:'w',asset_id:'root',title:'Open repair'}]:[],requests:[],schedules:[],token:'token',parent:{id:'parent',name:'Line <Parent>'}}});
      if(name==='list_archived_equipment')return Promise.resolve({data:{page:args.p_page,total:13,rows:Array.from({length:args.p_page===1?12:1},(_,i)=>({id:'row'+((args.p_page-1)*12+i),name:'Archived '+((args.p_page-1)*12+i),archive_reason:'delete',facility:'North',status:'degraded',archived_at:'2026-09-24'}))}});
      return new Promise(resolve=>{window.finish=()=>resolve(failed?{error:{message:'Equipment changed. Review again.'}}:{data:name==='restore_equipment'?{restored_ids:['root']}:{archived_ids:['root'],detached_ids:['b0']}});if(!delayed)finish();});}};
    window.draw=()=>{document.querySelector('#page').innerHTML=visible?archive.render():'<form id="edit-asset-form"><label>Name<input value="Folder"></label></form><button data-archive-equipment="root">Archive / Delete Equipment</button><button data-open-equipment-archive>Archived Equipment</button><button data-restore-equipment="root">Restore</button>';archive.bind();};
    window.archive=createEquipmentArchive({documentRef:document,escapeHtml:esc,client:()=>client,timeout:p=>p,getContext:()=>scope,getCompanyContext:()=>company,getCompanyId:()=>company,getLocations:()=>[{id:'north',name:'North'}],canManage:()=>allowed,getMemberName:()=> 'QA Manager',isVisible:()=>visible,enter:()=>{visible=true;},leave:()=>{visible=false;draw();},redraw:draw,onSaved:r=>{saved.push(r);return window.saveHook?.();},showNotice:s=>notices.push(s)});draw();</script>`}));
  await page.goto('http://archive.test/');
}
for (const width of [320,390,430,1440]) test(`archive review, retained wording and mobile layout at ${width}px`, async ({browser}, info) => {
  const context = await browser.newContext({viewport:{width,height:900},isMobile:width<500,hasTouch:width<500});
  const page = await context.newPage(), errors=[]; page.on('pageerror',e=>errors.push(e.message));
  try {
    await setup(page); const opener = page.locator('[data-archive-equipment]');
    if (width<500) await opener.tap(); else await opener.click();
    const dialog = page.locator('dialog'); await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Folder <One>'); await expect(dialog.locator('one,parent')).toHaveCount(0);
    await expect(dialog.locator('[data-archive-branch]')).toHaveCount(12);
    await expect(dialog.locator('[data-archive-branch]:checked')).toHaveCount(0);
    await expect(dialog.getByLabel('Reason').locator('option')).toHaveText(['Choose reason','Sold','Scrapped','Delete','Other']);
    await dialog.getByLabel('Reason').selectOption('delete'); await dialog.getByLabel('Notes').fill('Sold setup <safe>');
    await dialog.locator('[data-archive-branch=b0]').check(); await dialog.getByRole('button',{name:'Next',exact:true}).click();
    await expect(dialog.locator('[data-archive-branch]')).toHaveCount(1); await dialog.getByRole('button',{name:'Previous',exact:true}).click();
    await expect(dialog.locator('[data-archive-branch=b0]')).toBeChecked(); await expect(dialog.getByLabel('Notes')).toHaveValue('Sold setup <safe>');
    expect(await dialog.evaluate(n=>n.scrollWidth<=n.clientWidth+1)).toBe(true);
    for (const button of await dialog.locator('button:visible').all()) expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(48);
    await page.screenshot({path:info.outputPath(`archive-review-${width}.png`)});
    await dialog.getByRole('button',{name:'Review Removal'}).click(); await expect(dialog).toContainText('Remove 2 equipment records?');
    await expect(dialog).toContainText('does not permanently erase'); await expect(dialog.locator('safe')).toHaveCount(0);
    expect(await page.evaluate(()=>calls.some(c=>c.name==='archive_equipment'))).toBe(false);
    await page.screenshot({path:info.outputPath(`archive-confirm-${width}.png`)});
    await dialog.getByRole('button',{name:'Cancel',exact:true}).click(); await expect(opener).toBeFocused();
    expect(errors).toEqual([]);
  } finally { await context.close(); }
});
test('blockers, dirty fields, one submit, uncertain response, permission and late context', async ({page}) => {
  await setup(page);
  await page.getByLabel('Name',{exact:true}).fill('Unsaved'); await page.locator('[data-archive-equipment]').click();
  expect(await page.evaluate(()=>calls.length)).toBe(0); await expect(page.locator('dialog')).toHaveCount(0);
  await page.getByLabel('Name',{exact:true}).fill('Folder'); await page.evaluate(()=>blocked=true);
  const review=async()=>{await page.locator('[data-archive-equipment]').click();await page.getByLabel('Reason').selectOption('delete');await page.getByRole('button',{name:'Review Removal'}).click();};
  await review(); await expect(page.locator('[data-action-save]')).toBeDisabled(); await expect(page.locator('dialog')).toContainText('Open repair'); await page.getByRole('button',{name:'Cancel',exact:true}).click();
  await page.evaluate(()=>{blocked=false;delayed=true;failed=true;}); await review();
  await page.evaluate(()=>{document.querySelector('[data-action-save]').click();document.querySelector('[data-action-save]').click();});
  expect(await page.evaluate(()=>calls.filter(c=>c.name==='archive_equipment').length)).toBe(1);
  await page.evaluate(()=>finish()); await expect(page.locator('[data-action-error]')).toContainText('changed'); await expect(page.locator('[data-action-save]')).toBeDisabled();
  await page.getByRole('button',{name:'Review Again'}).click(); await page.getByRole('button',{name:'Review Removal'}).click();
  await page.evaluate(()=>failed=false); await page.locator('[data-action-save]').click();
  await page.evaluate(()=>{scope='other:company:assets';allowed=false;archive.bind();finish();});
  await expect(page.locator('dialog')).toHaveCount(0); expect(await page.evaluate(()=>saved.length)).toBe(0);
});
test('archive list pages twelve, explicit search and restore leaves PM paused', async ({page}) => {
  await setup(page); await page.locator('[data-open-equipment-archive]').click();
  await expect(page.locator('.archive-card')).toHaveCount(12); await page.getByRole('button',{name:'Next',exact:true}).click();
  await expect(page.locator('.archive-card')).toHaveCount(1); await expect(page.locator('.archive-card')).toContainText('Archived 12');
  await page.getByLabel('Search archived equipment').fill('part of a name');
  expect(await page.evaluate(()=>calls.filter(c=>c.name==='list_archived_equipment').length)).toBe(2);
  await page.getByRole('button',{name:'Filter',exact:true}).click();
  expect((await page.evaluate(()=>calls.filter(c=>c.name==='list_archived_equipment').at(-1))).args).toMatchObject({p_query:'part of a name',p_page:1});
  await page.getByRole('button',{name:'Back to Equipment',exact:true}).click(); await page.evaluate(()=>archived=true);
  await page.locator('[data-restore-equipment]').click(); await expect(page.locator('dialog')).toContainText('PM remains paused');
  await page.getByLabel('Restoration note').fill('Reviewed by manager'); await page.getByRole('button',{name:'Review Restoration'}).click();
  await page.locator('[data-action-save]').click(); await expect(page.locator('dialog')).toHaveCount(0);
  expect(await page.evaluate(()=>saved.length)).toBe(1);
});
test('company switch clears cached archive records before rendering', async ({page}) => {
  await setup(page); await page.locator('[data-open-equipment-archive]').click();
  await expect(page.locator('.archive-card')).toHaveCount(12);
  await page.evaluate(()=>{company='other';scope='user:other:assets';draw();});
  await expect(page.locator('.archive-card')).toHaveCount(0);
  await expect(page.locator('#page')).not.toContainText('Archived 0');
});

test('saved changes keep the modal busy, ignore another company and report PM refresh failure', async ({page}) => {
  await setup(page);
  await page.evaluate(()=>{window.saveHook=()=>new Promise(resolve=>{window.finishRefresh=resolve;});});
  await page.locator('[data-archive-equipment]').click();
  await page.getByLabel('Reason').selectOption('delete'); await page.getByRole('button',{name:'Review Removal'}).click();
  await page.locator('[data-action-save]').click();
  await expect(page.locator('[data-archive-cancel]')).toBeDisabled();
  await page.keyboard.press('Escape'); await expect(page.locator('dialog')).toBeVisible();
  await page.evaluate(()=>{company='other';scope='user:other:assets';draw();finishRefresh();});
  await expect(page.locator('dialog')).toHaveCount(0);
  expect(await page.evaluate(()=>notices)).toEqual([]);
  await page.evaluate(()=>{
    window.saveHook=()=>Promise.reject(Error('Reopen to load current records.'));
    const b=document.createElement('button');b.dataset.resumeEquipmentPm='schedule';b.textContent='Review / Resume PM';document.querySelector('#page').append(b);archive.bind();
  });
  await page.getByRole('button',{name:'Review / Resume PM'}).click();
  await page.getByLabel('Reviewed next due date').fill('2026-10-01');
  await page.getByRole('button',{name:'Resume PM',exact:true}).click();
  await expect(page.locator('dialog')).toHaveCount(0);
  expect(await page.evaluate(()=>notices)).toEqual(['PM saved. Reopen to load current records.']);
});
