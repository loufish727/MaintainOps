const {test,expect}=require('@playwright/test');
const {randomUUID}=require('node:crypto');
const fs=require('node:fs');

test('isolated QA archive/restore: real UI, storage retention, roles and competing writes',async({browser,request},info)=>{
  test.skip(process.env.LFES_ARCHIVE_CLEANUP==='1','Explicit storage cleanup run');
  test.setTimeout(240000);
  const host='https://fsxqrngpaseqdxijggcm.supabase.co',company=process.env.LFES_QA_COMPANY_ID;
  expect(process.env.LFES_ARCHIVE_MUTATIONS).toBe('1');expect(process.env.LFES_SUPABASE_URL).toBe(host);
  expect(company).toBe('0d6fd8f1-428d-4192-8176-48943e3ec119');
  const baseURL=process.env.MAINTAINOPS_BASE_URL,key=process.env.LFES_SUPABASE_ANON_KEY;
  expect(new URL(baseURL).hostname).toBe('127.0.0.1');
  const config=await(await request.get(baseURL+'supabase-config.js')).text();expect(config).toContain(host);expect(config).not.toContain('lbphkzznvvumemdkqoay');
  const sessions={};
  for(const role of ['ADMIN','MANAGER','TECHNICIAN','PRODUCTION','ACCOUNTING']){
    const r=await request.post(host+'/auth/v1/token?grant_type=password',{headers:{apikey:key},data:{email:process.env[`LFES_${role}_EMAIL`],password:process.env[`LFES_${role}_PASSWORD`]}});
    expect(r.ok()).toBe(true);sessions[role]=await r.json();
  }
  const {ADMIN:admin,MANAGER:manager,TECHNICIAN:tech,ACCOUNTING:accounting}=sessions;
  const headers=session=>({apikey:key,Authorization:`Bearer ${session.access_token}`,Prefer:'return=representation'});
  const raw=(method,resource,data,session=admin)=>request.fetch(host+'/rest/v1/'+resource,{method,data,timeout:30000,headers:headers(session)});
  async function api(method,resource,data,session=admin){const r=await raw(method,resource,data,session);const body=await r.text();expect(r.ok(),`${method} ${resource}: ${body}`).toBe(true);return body?JSON.parse(body):null;}
  const locations=await api('GET',`locations?company_id=eq.${company}&select=id,name&order=name`),site=locations[0];
  const ids=Array.from({length:5},()=>randomUUID()),[root,child,stay,race,travel]=ids;
  if(fs.existsSync('LFES/private/archive-live-fixture.json')){
    const previous=JSON.parse(fs.readFileSync('LFES/private/archive-live-fixture.json','utf8'));
    expect(previous.company).toBe(company);
    expect(await api('GET',`assets?company_id=eq.${company}&id=in.(${previous.assets.join(',')})&select=id`),'Clean the exact previous QA fixture before another run').toEqual([]);
  }
  const work=randomUUID(),schedule=randomUUID(),part=randomUUID(),name='000LFES Archive '+randomUUID();
  const assetFile=`${company}/${root}/${randomUUID()}-proof.png`,workFile=`${company}/${work}/${randomUUID()}-proof.png`;
  fs.writeFileSync('LFES/private/archive-live-fixture.json',JSON.stringify({company,name,assets:ids,work,schedule,part,assetFile,workFile},null,2));
  const contexts=[],errors=[];
  const review=async(id=root)=>api('POST','rpc/equipment_archive_review',{p_company_id:company,p_asset_id:id},manager);
  const args=(r,id=root)=>({p_company_id:company,p_asset_id:id,p_branch_ids:[],p_reason:'delete',p_notes:'Isolated proof',p_review_token:r.token});
  async function open(session,section='assets',width=390){
    const context=await browser.newContext({baseURL,viewport:{width,height:900},isMobile:width<500,hasTouch:width<500});contexts.push(context);
    await context.route('https://lbphkzznvvumemdkqoay.supabase.co/**',r=>{errors.push('Production request');return r.abort();});
    await context.addInitScript(({session,company,location,section})=>{
      localStorage.setItem('sb-fsxqrngpaseqdxijggcm-auth-token',JSON.stringify(session));localStorage.setItem('maintainops.activeCompanyId',company);
      localStorage.setItem(`maintainops.activeLocationId:v2:${session.user.id}:${company}`,location);localStorage.setItem('maintainops.activeSection',section);
    },{session,company,location:site.id,section});
    const page=await context.newPage();page.setDefaultTimeout(20000);page.on('pageerror',e=>errors.push(e.message));
    await page.goto(baseURL);await expect(page.locator('[data-section=assets]')).toBeVisible({timeout:45000});return page;
  }
  try {
    for(const [i,id] of ids.entries()) await api('POST','assets',{id,company_id:company,location_id:site.id,name:`${name} ${i}`,asset_type:i===4?'traveling_machine':i===1||i===2?'component':'machine',
      parent_asset_id:i===1||i===2?root:null,status:'degraded',safety_devices_required:false,created_by:admin.user.id});
    await api('POST','work_orders',{id:work,company_id:company,location_id:site.id,asset_id:root,title:name,created_by:admin.user.id,assigned_to:tech.user.id,status:'completed',completed_at:new Date().toISOString(),resolution_summary:'Retained completion'});
    await api('POST','preventive_schedules',{id:schedule,company_id:company,location_id:site.id,asset_id:root,title:name,frequency:'monthly',next_due_at:'2099-01-01',created_by:admin.user.id});
    await api('POST','parts',{id:part,company_id:company,location_id:site.id,name,quantity_on_hand:9});
    await api('POST','asset_parts',{company_id:company,asset_id:root,part_id:part,quantity_recommended:2,note:'Retained part link'});
    await api('POST','asset_financials',{company_id:company,asset_id:root,acquisition_cost:1250});
    const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a9ZkAAAAASUVORK5CYII=','base64');
    for(const [bucket,file] of [['asset-documents',assetFile],['work-order-photos',workFile]]){
      const response=await request.post(`${host}/storage/v1/object/${bucket}/${file}`,{headers:{...headers(admin),'content-type':'image/png'},data:png});expect(response.ok(),await response.text()).toBe(true);
    }
    await api('POST','asset_documents',{company_id:company,asset_id:root,uploaded_by:admin.user.id,storage_path:assetFile,file_name:'proof.png',content_type:'image/png',document_type:'machine_photo',file_size_bytes:png.length});
    await api('POST','work_order_photos',{company_id:company,work_order_id:work,uploaded_by:admin.user.id,storage_path:workFile,file_name:'proof.png',content_type:'image/png',file_size_bytes:png.length});
    const originalWork=await api('GET',`work_orders?id=eq.${work}&select=*`);
    const page=await open(manager);await page.locator(`.asset-card[data-asset-id="${root}"]`).click();await expect(page.locator('#edit-asset-form')).toBeVisible();
    await page.locator('[data-archive-equipment]').click();const dialog=page.locator('.equipment-archive-dialog');await expect(dialog).toBeVisible();
    await dialog.getByLabel('Reason').selectOption('delete');await dialog.getByLabel('Notes').fill('Remove from workflow; retain history');
    await dialog.locator(`[data-archive-branch="${child}"]`).check();await dialog.getByRole('button',{name:'Review Removal'}).click();
    await expect(dialog).toContainText('Remove 2 equipment records?');await page.screenshot({path:info.outputPath('archive-live-confirm.png')});
    let bootstraps=0;page.on('request',r=>{if(r.url().includes('/rpc/get_my_companies'))bootstraps++;});
    await dialog.locator('[data-action-save]').click();await expect(dialog).toHaveCount(0,{timeout:30000});
    const rows=await api('GET',`assets?company_id=eq.${company}&id=in.(${ids.join(',')})&select=*`);
    expect(rows.find(r=>r.id===root).archived_at).toBeTruthy();expect(rows.find(r=>r.id===child).archived_at).toBeTruthy();
    expect(rows.find(r=>r.id===stay).parent_asset_id).toBeNull();expect(rows.find(r=>r.id===stay).archived_at).toBeNull();
    expect(await api('GET',`work_orders?id=eq.${work}&select=*`)).toEqual(originalWork);
    expect((await api('GET',`preventive_schedules?id=eq.${schedule}&select=active,equipment_archive_paused`))[0]).toEqual({active:false,equipment_archive_paused:true});
    expect((await api('GET',`parts?id=eq.${part}&select=quantity_on_hand`))[0].quantity_on_hand).toBe(9);expect(bootstraps).toBe(0);
    await expect(page.locator(`.asset-card[data-asset-id="${root}"]`)).toHaveCount(0);
    await page.locator('[data-open-equipment-archive]').click();await page.locator(`[data-archive-record="${root}"]`).click();
    await expect(page.locator(`[data-archive-work="${work}"]`)).toBeVisible();
    for(const [section,expected] of [['events','Removed from workflow'],['files','proof.png'],['parts','Retained part link'],['pm','Paused by equipment archive']]){
      await page.locator(`[data-archive-section="${section}"]`).click();await expect(page.locator('.archive-history')).toContainText(expected);
    }
    expect(await page.locator('.equipment-archive').evaluate(n=>n.scrollWidth<=n.clientWidth+1)).toBe(true);
    await page.screenshot({path:info.outputPath('archive-live-history.png')});
    await page.locator('[data-archive-work]').count();
    await page.locator('[data-archive-section=work]').click();await page.locator(`[data-archive-work="${work}"]`).click();
    await expect(page.getByText('Archived equipment. Work history is retained and read-only until the equipment is restored.')).toBeVisible();
    await expect(page.locator('#photo-form,#comment-form,#parts-used-form')).toHaveCount(0);
    for(const role of ['TECHNICIAN','PRODUCTION','ACCOUNTING']){
      const session=sessions[role];expect((await raw('POST','rpc/equipment_archive_review',{p_company_id:company,p_asset_id:root},session)).status()).toBe(403);
      const restricted=await open(session);await expect(restricted.locator('[data-open-equipment-archive]')).toHaveCount(0);
    }
    expect((await raw('DELETE',`assets?id=eq.${root}&company_id=eq.${company}`,undefined,manager)).status()).toBe(403);
    expect((await raw('PATCH',`work_orders?id=eq.${work}`,{status:'open',completed_at:null},tech)).ok()).toBe(false);
    expect((await raw('POST','work_orders',{company_id:company,asset_id:root,title:name+' forbidden',created_by:tech.user.id},tech)).ok()).toBe(false);
    for(const [bucket,file] of [['asset-documents',assetFile],['work-order-photos',workFile]]){
      await request.delete(`${host}/storage/v1/object/${bucket}`,{headers:headers(admin),data:{prefixes:[file]}});
      const retained=await request.get(`${host}/storage/v1/object/authenticated/${bucket}/${file}`,{headers:headers(admin)});
      expect(retained.ok(),`${bucket} retained after stale delete`).toBe(true);expect((await retained.body()).equals(png)).toBe(true);
    }
    expect((await api('PATCH',`asset_financials?asset_id=eq.${root}`,{finance_notes:'Manager forbidden'},manager))).toEqual([]);
    expect((await api('PATCH',`asset_financials?asset_id=eq.${root}`,{finance_notes:'Retained accounting update'},accounting))).toHaveLength(1);
    const financePage=await open(accounting,'financial',1440);await financePage.locator(`[data-open-financial-asset="${root}"]`).click();
    await expect(financePage.getByText(/Equipment archived \/ delete/).first()).toBeVisible();
    await expect(financePage.locator('[data-open-financial-equipment]')).toHaveCount(0);
    await page.locator('[data-section=assets]').click();await page.locator('[data-open-equipment-archive]').click();
    await page.locator(`[data-restore-equipment="${root}"]`).click();await page.getByLabel('Restoration note').fill('Inspected, same condition');
    await page.getByRole('button',{name:'Review Restoration'}).click();await page.locator('[data-action-save]').click();await expect(page.locator('dialog')).toHaveCount(0,{timeout:30000});
    const restored=await api('GET',`assets?id=eq.${root}&select=archived_at,status,location_id`);expect(restored[0]).toEqual({archived_at:null,status:'degraded',location_id:site.id});
    await page.locator('[data-section=pm]').click();await page.locator(`[data-resume-equipment-pm="${schedule}"]`).click();
    await page.getByLabel('Reviewed next due date').fill('2099-02-01');await page.getByRole('button',{name:'Resume PM',exact:true}).click();await expect(page.locator('dialog')).toHaveCount(0,{timeout:30000});
    expect((await api('GET',`preventive_schedules?id=eq.${schedule}&select=active,next_due_at`))[0]).toEqual({active:true,next_due_at:'2099-02-01'});
    const r=await review(race);const raced=await Promise.all([raw('POST','rpc/archive_equipment',args(r,race),manager),raw('POST','rpc/archive_equipment',args(r,race),manager)]);
    expect(raced.map(r=>r.status()).sort()).toEqual([200,409]);
    expect((await api('GET',`asset_events?asset_id=eq.${race}&event_type=eq.archived&select=id`))).toHaveLength(1);
    const before=await api('POST','rpc/traveling_units_summary',{p_company_id:company});await api('POST','rpc/archive_equipment',args(await review(travel),travel),manager);
    const after=await api('POST','rpc/traveling_units_summary',{p_company_id:company});expect(after.total).toBe(before.total-1);
    expect(errors).toEqual([]);
    console.log('QA archive/restore, retained bytes and links, role denials, financial edit, PM resume, traveling exclusion and duplicate-request race passed.');
  } finally {
    // API hard deletion is intentionally unavailable. The runner keeps the exact fixture manifest
    // for privileged, company/name-verified cleanup outside the application permission boundary.
    for(const context of contexts) await context.close();
  }
});

test('explicit isolated QA storage cleanup uses the Storage API',async({request})=>{
  test.skip(process.env.LFES_ARCHIVE_CLEANUP!=='1','Run only after privileged QA fixture validation');
  expect(process.env.LFES_ARCHIVE_MUTATIONS).toBe('1');
  const host='https://fsxqrngpaseqdxijggcm.supabase.co',company='0d6fd8f1-428d-4192-8176-48943e3ec119';
  expect(process.env.LFES_SUPABASE_URL).toBe(host);expect(process.env.LFES_QA_COMPANY_ID).toBe(company);
  const fixture=JSON.parse(fs.readFileSync('LFES/private/archive-live-fixture.json','utf8'));
  expect(fixture.company).toBe(company);expect(fixture.assets).toHaveLength(5);expect(fixture.name).toMatch(/^000LFES Archive [a-f0-9-]{36}$/);
  const key=process.env.LFES_SUPABASE_ANON_KEY;
  const auth=await request.post(host+'/auth/v1/token?grant_type=password',{headers:{apikey:key},data:{email:process.env.LFES_ADMIN_EMAIL,password:process.env.LFES_ADMIN_PASSWORD}});
  expect(auth.ok()).toBe(true);const session=await auth.json(),headers={apikey:key,Authorization:`Bearer ${session.access_token}`};
  const rows=await request.get(`${host}/rest/v1/assets?company_id=eq.${company}&id=in.(${fixture.assets.join(',')})&select=id,name,archived_at`,{headers});
  expect(rows.ok()).toBe(true);const assets=await rows.json();expect(assets).toHaveLength(5);
  for(const [i,id] of fixture.assets.entries())expect(assets.find(a=>a.id===id)).toMatchObject({name:`${fixture.name} ${i}`,archived_at:null});
  for(const [bucket,file,parent] of [['asset-documents',fixture.assetFile,fixture.assets[0]],['work-order-photos',fixture.workFile,fixture.work]]){
    expect(file.startsWith(`${company}/${parent}/`)).toBe(true);
    const removed=await request.delete(`${host}/storage/v1/object/${bucket}`,{headers,data:{prefixes:[file]}});expect(removed.ok(),await removed.text()).toBe(true);
    const missing=await request.get(`${host}/storage/v1/object/authenticated/${bucket}/${file}`,{headers});expect(missing.ok()).toBe(false);
    const body=await missing.json();expect(`${body.statusCode} ${body.error} ${body.message}`).toMatch(/404|not found/i);
  }
  console.log('Only the two manifest-owned QA storage objects were removed through Storage API.');
});
