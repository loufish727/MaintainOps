const {test,expect}=require('@playwright/test');
const {randomUUID}=require('node:crypto');

test('isolated QA relocation: signed-in UI, retained links, permissions and concurrent writers',async({browser,request},info)=>{
  test.setTimeout(180000);
  const host='https://fsxqrngpaseqdxijggcm.supabase.co',company=process.env.LFES_QA_COMPANY_ID;
  expect(process.env.LFES_TRAVEL_MUTATIONS).toBe('1');expect(process.env.LFES_SUPABASE_URL).toBe(host);
  expect(company).toBe('0d6fd8f1-428d-4192-8176-48943e3ec119');
  const baseURL=process.env.MAINTAINOPS_BASE_URL,key=process.env.LFES_SUPABASE_ANON_KEY;
  expect(new URL(baseURL).hostname).toBe('127.0.0.1');
  const config=await(await request.get(baseURL+'supabase-config.js')).text();expect(config).toContain(host);expect(config).not.toContain('lbphkzznvvumemdkqoay');
  async function login(role){const r=await request.post(host+'/auth/v1/token?grant_type=password',{headers:{apikey:key},data:{email:process.env[`LFES_${role}_EMAIL`],password:process.env[`LFES_${role}_PASSWORD`]}});expect(r.ok()).toBe(true);return r.json();}
  const admin=await login('ADMIN'),manager=await login('MANAGER'),tech=await login('TECHNICIAN'),accounting=await login('ACCOUNTING');
  async function raw(method,resource,data,session=admin){return request.fetch(host+'/rest/v1/'+resource,{method,data,timeout:20000,headers:{apikey:key,Authorization:`Bearer ${session.access_token}`,Prefer:'return=representation'}});}
  async function api(method,resource,data,session=admin){const r=await raw(method,resource,data,session);const body=await r.text();expect(r.ok(),`${method} ${resource}: ${body}`).toBe(true);return body?JSON.parse(body):null;}
  const locations=await api('GET',`locations?company_id=eq.${company}&select=id,name&order=name`),[from,to]=locations;
  const ids=Array.from({length:9},()=>randomUUID()),[parent,machine,moving,pump,stay,motor,a,b,c]=ids;
  const name='000LFES Relocate '+randomUUID(),work=randomUUID(),schedule=randomUUID();const contexts=[],errors=[];
  require('node:fs').writeFileSync(info.outputPath('fixture.json'),JSON.stringify({company,name,assets:ids,work,schedule},null,2));
  const review=async(id=machine)=>(await api('POST','rpc/equipment_relocation_review',{p_company_id:company,p_asset_id:id}));
  const args=(r,id=machine,dest=to.id,branches=[moving])=>({p_company_id:company,p_asset_id:id,p_location_id:dest,p_move_branch_ids:branches,p_review_token:r.token});
  const rows=async()=>api('GET',`assets?company_id=eq.${company}&id=in.(${ids.join(',')})&select=*&order=id`);
  async function open(session,width=390,section='assets'){
    const context=await browser.newContext({baseURL,viewport:{width,height:900},isMobile:width<500,hasTouch:width<500});contexts.push(context);
    await context.route('https://lbphkzznvvumemdkqoay.supabase.co/**',r=>{errors.push('Production request');return r.abort();});
    await context.addInitScript(({session,company,location,section})=>{
      localStorage.setItem('sb-fsxqrngpaseqdxijggcm-auth-token',JSON.stringify(session));localStorage.setItem('maintainops.activeCompanyId',company);
      localStorage.setItem(`maintainops.activeLocationId:v2:${session.user.id}:${company}`,location);localStorage.setItem('maintainops.activeSection',section);
    },{session,company,location:from.id,section});
    const page=await context.newPage();page.setDefaultTimeout(20000);page.on('pageerror',e=>errors.push(e.message));
    await page.goto(baseURL);await expect(page.locator('[data-section=assets]')).toBeVisible({timeout:45000});return page;
  }
  try{
    for(const [i,id] of ids.entries())await api('POST','assets',{id,company_id:company,location_id:from.id,name:`${name} ${i}`,asset_type:i<2?'machine':'secondary_machine',
      parent_asset_id:({[machine]:parent,[moving]:machine,[pump]:moving,[stay]:machine,[motor]:stay})[id]||null,status:'degraded',location:'Bay 1',safety_devices_required:false,created_by:admin.user.id});
    await api('POST','work_orders',{id:work,company_id:company,location_id:from.id,asset_id:machine,title:name,created_by:admin.user.id,assigned_to:tech.user.id});
    await api('POST','preventive_schedules',{id:schedule,company_id:company,location_id:from.id,asset_id:machine,title:name,frequency:'monthly',next_due_at:'2099-01-01',created_by:admin.user.id});
    await api('POST','asset_financials',{company_id:company,asset_id:machine,acquisition_cost:1250});
    expect((await raw('POST','rpc/qa_cleanup_equipment_fixture',{p_ids:ids,p_prefix:name},manager)).status()).toBe(403);
    const prematureCleanup=await raw('POST','rpc/qa_cleanup_equipment_fixture',{p_ids:ids,p_prefix:name});
    expect(prematureCleanup.ok()).toBe(false);expect(await prematureCleanup.text()).toContain('connected records');
    expect((await raw('POST','rpc/qa_cleanup_equipment_fixture',{p_ids:ids,p_prefix:'Not a test fixture'})).ok()).toBe(false);
    expect(await rows()).toHaveLength(9);
    const originalWork=await api('GET',`work_orders?id=eq.${work}&select=*`),originalPm=await api('GET',`preventive_schedules?id=eq.${schedule}&select=*`);
    const page=await open(manager);await page.locator(`.asset-card[data-asset-id="${machine}"]`).click();
    await expect(page.locator('#edit-asset-form')).toBeVisible();await expect(page.locator('#edit-asset-form [name=location_id]')).toBeDisabled();
    await page.locator('.equipment-actions summary').click();
    await page.locator('#edit-asset-form [name=asset_tag]').fill('UNSAVED');await page.locator('[data-relocate-equipment]').click();
    await expect(page.locator('.relocation-dialog')).toHaveCount(0);await expect(page.locator('#edit-asset-form [name=asset_tag]')).toHaveValue('UNSAVED');
    await page.locator('#edit-asset-form [name=asset_tag]').fill('');await page.locator('[data-relocate-equipment]').click();
    const dialog=page.locator('.relocation-dialog');await expect(dialog).toBeVisible();await dialog.getByLabel('New facility').selectOption(to.id);
    await dialog.locator(`[data-relocate-branch="${stay}"]`).uncheck();await dialog.getByRole('button',{name:'Review Relocation'}).click();
    await expect(dialog).toContainText('Moving (3)');await expect(dialog).toContainText('Staying (2)');
    await page.screenshot({path:info.outputPath('relocation-live-confirmation.png')});
    let bootstraps=0;page.on('request',r=>{if(r.url().includes('/rpc/get_my_companies'))bootstraps++;});
    await dialog.getByRole('button',{name:'Relocate Equipment',exact:true}).click();await expect(dialog).toHaveCount(0,{timeout:25000});
    const after=await rows();for(const id of [machine,moving,pump]){const row=after.find(r=>r.id===id);expect(row.location_id).toBe(to.id);expect(row.status).toBe('degraded');expect(row.location).toBeNull();}
    expect(after.find(r=>r.id===stay).parent_asset_id).toBeNull();expect(after.find(r=>r.id===motor).parent_asset_id).toBe(stay);expect(after.find(r=>r.id===motor).location_id).toBe(from.id);
    expect(after.find(r=>r.id===machine).parent_asset_id).toBeNull();expect(bootstraps).toBe(0);
    expect(await api('GET',`work_orders?id=eq.${work}&select=*`)).toEqual(originalWork);expect(await api('GET',`preventive_schedules?id=eq.${schedule}&select=*`)).toEqual(originalPm);
    expect((await api('GET',`asset_financials?asset_id=eq.${machine}&select=acquisition_cost`))[0].acquisition_cost).toBe(1250);
    const events=await api('GET',`asset_events?company_id=eq.${company}&asset_id=in.(${ids.join(',')})&select=*`);
    expect(events.filter(e=>e.event_type==='hierarchy_changed')).toHaveLength(4);expect(events.filter(e=>e.event_type==='location_changed')).toHaveLength(3);
    expect(events.every(e=>e.actor_id===manager.user.id)).toBe(true);
    await page.locator(`[data-open-asset-history="${machine}"]`).click();await expect(page.getByText(/Relocated from/).first()).toBeVisible();await expect(page.getByText(/Unlinked from/).first()).toBeVisible();
    const generation=await api('POST','rpc/generate_preventive_work_order',{p_company_id:company,p_schedule_id:schedule,p_expected_due_at:'2099-01-01'});
    expect((await api('GET',`work_orders?id=eq.${generation.work_order_id}&select=location_id`))[0].location_id).toBe(to.id);
    for(const session of [tech,accounting]){
      const restricted=await open(session,1440);await restricted.locator(`.asset-card[data-asset-id="${stay}"]`).click();
      await expect(restricted.locator('[data-open-asset-history]')).toBeVisible();await expect(restricted.locator('[data-relocate-equipment]')).toHaveCount(0);
      const denied=await raw('POST','rpc/equipment_relocation_review',{p_company_id:company,p_asset_id:stay},session);expect(denied.status()).toBe(403);
    }
    // Cold workspace search -> equipment must load the newly lazy detail renderer.
    const cold=await open(tech,390,'work');await expect(cold.locator(`.work-card[data-id="${work}"]`)).toBeVisible();
    expect(await cold.locator('script[src*="maintenanceFeature."]').count()).toBe(0);
    await cold.locator('.workspace-search-input:visible').first().fill(`${name} 4`);
    await cold.locator(`[data-search-asset="${stay}"]`).click();await expect(cold.locator('#edit-asset-form')).toBeVisible();
    // Two independent HTTP transactions try the same reviewed move.
    const r=await review(a);const responses=await Promise.all([raw('POST','rpc/relocate_equipment',args(r,a,to.id,[])),raw('POST','rpc/relocate_equipment',args(r,a,to.id,[]))]);
    expect(responses.map(r=>r.status()).sort()).toEqual([200,409]);
    const retained = await rows();
    const staleForm = await raw('PATCH',`assets?id=eq.${a}&company_id=eq.${company}`,{location_id:from.id},manager);
    expect(staleForm.status()).toBe(409); expect(await staleForm.text()).toContain('Relocate Equipment');
    expect(await rows()).toEqual(retained);
    if(process.env.LFES_RELOCATION_CONCURRENCY==='1'){
      const hold=(id,mode,parentId=null,reviewToken=null,location=null,branches=[])=>raw('POST','rpc/qa_relocation_hold',{p_id:id,p_mode:mode,p_parent:parentId,p_token:reviewToken,p_location:location,p_branches:branches});
      const busy=()=>api('POST','rpc/qa_relocation_busy',{});
      // Holding A -> B, another valid B -> C edit must reject promptly, then work after retry.
      const first=hold(b,'parent',c);await expect.poll(busy).toBe(true);
      const conflict=await raw('PATCH',`assets?id=eq.${c}`,{parent_asset_id:stay});expect(conflict.status()).toBe(409);
      expect((await first).ok()).toBe(true);await api('PATCH',`assets?id=eq.${c}`,{parent_asset_id:stay});
      // The second half of a potential cycle is rejected after the first commit.
      const cycle=await raw('PATCH',`assets?id=eq.${stay}`,{parent_asset_id:b});expect(cycle.ok()).toBe(false);expect(await cycle.text()).toContain('own ancestor');
      const branchReview=await review(stay);const movingBranches=branchReview.nodes.filter(n=>n.parent_asset_id===stay).map(n=>n.id);
      const held=hold(stay,'relocate',null,branchReview.token,to.id,movingBranches);await expect.poll(busy).toBe(true);
      const phantom=randomUUID();ids.push(phantom);
      const insert=await raw('POST','assets',{id:phantom,company_id:company,location_id:from.id,parent_asset_id:stay,name:name+' phantom',asset_type:'component',safety_devices_required:false});
      expect((await held).ok()).toBe(true);expect(insert.ok()).toBe(false);expect(await insert.text()).toContain('share a facility');
      console.log('Native controlled transactions: valid edit contention/retry, cycle refusal, queued child insertion refusal passed.');
    }
    expect(errors).toEqual([]);
    console.log('Signed-in relocation: manager/admin, technician/accounting denials, partial move, detach history, retained WO/PM/financial, future PM destination, cold equipment link and competing relocation passed.');
  }finally{
    try {
    await api('DELETE',`work_orders?company_id=eq.${company}&asset_id=in.(${ids.join(',')})`);
    await api('DELETE',`preventive_schedules?company_id=eq.${company}&id=eq.${schedule}`);
    await api('POST','rpc/qa_cleanup_equipment_fixture',{p_ids:ids,p_prefix:name});
    expect(await api('GET',`assets?company_id=eq.${company}&id=in.(${ids.join(',')})&select=id`)).toEqual([]);
    } finally { for(const c of contexts)await c.close(); }
  }
});
