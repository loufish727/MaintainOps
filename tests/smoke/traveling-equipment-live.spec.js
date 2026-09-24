const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');

for (const width of [1440,390]) test(`traveling equipment moves safely and remains discoverable at ${width}px`, async ({ browser, request }, testInfo) => {
  test.setTimeout(180000);
  const host='https://fsxqrngpaseqdxijggcm.supabase.co', company=process.env.LFES_QA_COMPANY_ID;
  expect(process.env.LFES_TRAVEL_MUTATIONS).toBe('1');
  expect(process.env.LFES_SUPABASE_URL).toBe(host);
  expect(company).toBe('0d6fd8f1-428d-4192-8176-48943e3ec119');
  const baseURL=process.env.MAINTAINOPS_BASE_URL, key=process.env.LFES_SUPABASE_ANON_KEY;
  expect(new URL(baseURL).hostname).toBe('127.0.0.1');
  const config=await (await request.get(`${baseURL}supabase-config.js`)).text();
  expect(config).toContain(host); expect(config).not.toContain('lbphkzznvvumemdkqoay');
  async function login(role) {
    const response=await request.post(`${host}/auth/v1/token?grant_type=password`,{
      headers:{apikey:key},data:{email:process.env[`LFES_${role}_EMAIL`],password:process.env[`LFES_${role}_PASSWORD`]}});
    expect(response.ok()).toBe(true); return response.json();
  }
  const admin=await login('ADMIN'), tech=await login('TECHNICIAN'), accounting=await login('ACCOUNTING');
  async function api(method,resource,data,session=admin) {
    const response=await request.fetch(`${host}/rest/v1/${resource}`,{method,data,timeout:15000,
      headers:{apikey:key,Authorization:`Bearer ${session.access_token}`,Prefer:'return=representation'}});
    expect(response.ok(),`${method} ${resource}: ${await response.text()}`).toBe(true);
    const body=await response.text(); return body ? JSON.parse(body) : null;
  }
  const locations=await api('GET',`locations?company_id=eq.${company}&select=id,name&order=name`);
  expect(locations.length).toBeGreaterThan(1);
  const [from,to]=locations, token=randomUUID(), name=`000LFES Travel ${token}`;
  const assetIds=Array.from({length:13},()=>randomUUID()), workId=randomUUID(), scheduleId=randomUUID();
  const contexts=[], errors=[];
  async function open(session) {
    const context=await browser.newContext({baseURL,viewport:{width,height:900},isMobile:width<500,hasTouch:width<500});
    contexts.push(context);
    await context.route('https://lbphkzznvvumemdkqoay.supabase.co/**',route=>{errors.push('Production request'); return route.abort();});
    await context.addInitScript(({session,company,location})=>{
      localStorage.setItem('sb-fsxqrngpaseqdxijggcm-auth-token',JSON.stringify(session));
      localStorage.setItem('maintainops.activeCompanyId',company);
      localStorage.setItem(`maintainops.activeLocationId:v2:${session.user.id}:${company}`,location);
      localStorage.setItem('maintainops.activeSection','assets');
    },{session,company,location:from.id});
    const page=await context.newPage(); page.setDefaultTimeout(15000); page.on('pageerror',error=>errors.push(error.message));
    await page.goto(baseURL); await expect(page.locator('[data-asset-type-filter=traveling_machine]')).toBeVisible({timeout:45000});
    await page.locator('[data-asset-type-filter=traveling_machine]').click();
    return page;
  }
  try {
    await api('POST','assets',assetIds.map((id,i)=>({id,company_id:company,location_id:i===1?to.id:from.id,
      name:`${name} ${String(i+1).padStart(2,'0')}`,asset_type:'traveling_machine',created_by:admin.user.id,safety_devices_required:false})));
    await api('POST','work_orders',{id:workId,company_id:company,location_id:from.id,asset_id:assetIds[0],title:name,
      assigned_to:tech.user.id,created_by:admin.user.id});
    await api('POST','preventive_schedules',{id:scheduleId,company_id:company,location_id:from.id,asset_id:assetIds[0],
      title:name,frequency:'monthly',next_due_at:'2099-01-01',created_by:admin.user.id});
    await api('POST','asset_financials',{company_id:company,asset_id:assetIds[0],acquisition_cost:1234});
    const originalWork=await api('GET',`work_orders?id=eq.${workId}&select=*`);
    const page=await open(tech);
    console.log('Travel proof: technician loaded');
    await expect(page.locator('.asset-list .asset-card')).toHaveCount(12);
    await expect(page.locator(`.asset-card[data-asset-id="${assetIds[1]}"]`)).toContainText(to.name);
    await page.locator('[data-assets-page=next]').click();
    await expect(page.locator('.asset-list .asset-card')).toHaveCount(1);
    await page.locator('[data-assets-page=prev]').click();
    await page.locator(`.asset-card[data-asset-id="${assetIds[0]}"]`).click();
    const form=page.locator('#move-traveling-asset-form');
    await expect(form).toBeVisible();
    await form.screenshot({path:testInfo.outputPath(`travel-form-${width}.png`)});
    await expect(page.locator('#edit-asset-form [name=location_id]')).toBeDisabled();
    await expect(page.locator('#edit-asset-form [name=parent_asset_id]')).toBeDisabled();
    expect(await form.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
    await form.getByLabel('New facility').selectOption(to.id);
    page.once('dialog',dialog=>dialog.dismiss());
    await form.getByRole('button',{name:'Change location',exact:true}).click();
    expect((await api('GET',`assets?id=eq.${assetIds[0]}&select=location_id`))[0].location_id).toBe(from.id);
    page.once('dialog',dialog=>dialog.accept());
    await form.getByRole('button',{name:'Change location',exact:true}).click();
    await expect(form).toContainText(`Currently at ${to.name}`,{timeout:30000});
    console.log('Travel proof: move completed');
    expect(await api('GET',`work_orders?id=eq.${workId}&select=*`)).toEqual(originalWork);
    const events=await api('GET',`asset_events?asset_id=eq.${assetIds[0]}&event_type=eq.location_changed&select=*`);
    expect(events).toHaveLength(1); expect(events[0].actor_id).toBe(tech.user.id);
    await page.locator('#edit-asset-form [name=asset_tag]').fill('TRAVEL-01');
    await page.locator('#edit-asset-form').getByRole('button',{name:'Save Equipment',exact:true}).click();
    await expect(form).toContainText(`Currently at ${to.name}`);
    await expect.poll(async()=> (await api('GET',`assets?id=eq.${assetIds[0]}&select=asset_tag`))[0].asset_tag).toBe('TRAVEL-01');
    await page.locator('#asset-open-work-target summary').click();
    await expect(page.locator('#asset-open-work-target')).toContainText(name,{timeout:20000});
    await page.locator(`[data-open-asset-history="${assetIds[0]}"]`).click();
    await expect(page.getByText(new RegExp(`Moved from ${from.name} to ${to.name}`))).toBeVisible();
    await page.screenshot({path:testInfo.outputPath(`travel-history-${width}.png`),fullPage:true});
    console.log('Travel proof: history verified');
    const accountPage=await open(accounting);
    console.log('Travel proof: accounting loaded');
    await accountPage.locator(`.asset-card[data-asset-id="${assetIds[0]}"]`).click();
    await expect(accountPage.locator('#move-traveling-asset-form')).toHaveCount(0);
    await expect(accountPage.locator('#edit-asset-form')).toHaveCount(0);
    await accountPage.locator('[data-section=financial]').click();
    // Financial reads the same asset, never a second copy.
    expect((await api('GET',`asset_financials?asset_id=eq.${assetIds[0]}&select=acquisition_cost`,undefined,accounting))[0].acquisition_cost).toBe(1234);
    const adminPage=await open(admin);
    console.log('Travel proof: admin loaded');
    await adminPage.locator('#location-select:visible, [data-location-select]:visible').first().selectOption(to.id);
    await adminPage.locator('[data-section=pm]').click();
    await expect(adminPage.locator('.pm-card').filter({hasText:name})).toBeVisible({timeout:30000});
    const generation=await api('POST','rpc/generate_preventive_work_order',{p_company_id:company,p_schedule_id:scheduleId,p_expected_due_at:'2099-01-01'});
    expect((await api('GET',`work_orders?id=eq.${generation.work_order_id}&select=asset_id,location_id`))[0]).toEqual({asset_id:assetIds[0],location_id:to.id});
    expect(errors).toEqual([]);
  } finally {
    await api('DELETE',`work_orders?company_id=eq.${company}&asset_id=in.(${assetIds.join(',')})`);
    await api('DELETE',`preventive_schedules?company_id=eq.${company}&id=eq.${scheduleId}`);
    await api('DELETE',`assets?company_id=eq.${company}&id=in.(${assetIds.join(',')})`);
    await api('DELETE',`asset_financials?company_id=eq.${company}&archived_asset_id=in.(${assetIds.join(',')})`);
    expect(await api('GET',`assets?company_id=eq.${company}&id=in.(${assetIds.join(',')})&select=id`)).toEqual([]);
    for(const context of contexts) await context.close().catch(()=>{});
  }
});
