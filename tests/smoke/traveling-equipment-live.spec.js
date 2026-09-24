const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');

for (const width of [1440,390,430]) test(`traveling equipment moves safely and remains discoverable at ${width}px`, async ({ browser, request }, testInfo) => {
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
    const page=await context.newPage(); page.setDefaultTimeout(15000); page.on('pageerror',error=>{errors.push(error.message);console.log('Browser error:',error.message);});
    await page.goto(baseURL); await expect(page.locator('[data-asset-type-filter=traveling_machine]')).toBeVisible({timeout:45000});
    const filter = page.locator('[data-asset-type-filter=traveling_machine]');
    if (width < 500) {
      let selected = false;
      for (const target of ['span', 'strong', 'small', 'top-left', 'bottom-right', 'center', 'span']) {
        await filter.scrollIntoViewIfNeeded();
        const box = await filter.boundingBox();
        const child = ['span','strong','small'].includes(target) ? await filter.locator(target).boundingBox() : null;
        const point = child ? {x:child.x+child.width/2,y:child.y+child.height/2}
          : target === 'top-left' ? {x:box.x+8,y:box.y+8}
          : target === 'bottom-right' ? {x:box.x+box.width-8,y:box.y+box.height-8}
          : {x:box.x+box.width/2,y:box.y+box.height/2};
        expect(await filter.evaluate(node => getComputedStyle(node).transform)).toBe('none');
        expect(await filter.evaluate((node, point) => document.elementFromPoint(point.x,point.y) === node, point)).toBe(true);
        await page.touchscreen.tap(point.x,point.y);
        selected = !selected;
        await expect(filter, `Touch ${target}`).toHaveAttribute('aria-pressed',String(selected));
      }
    } else await filter.click();
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
    expect(await page.locator('script[src*="travelingFeature."]').count()).toBe(0);
    let bootstraps=0;
    page.on('request',r=>{if(r.url().includes('/rpc/get_my_companies')) bootstraps++;});
    await page.locator('[data-traveling-units]:visible').click();
    await expect(page.locator('.travel-unit')).toHaveCount(12);
    const unit=page.locator(`[data-travel-unit="${assetIds[0]}"]`);
    await expect(unit).toContainText(from.name);
    await expect(unit).toContainText('No move recorded');
    await expect(unit.locator('dl > div').last()).toContainText('1');
    expect(await page.locator('[data-travel-board]').evaluate(node=>node.scrollWidth<=node.clientWidth+1)).toBe(true);
    await page.locator('[data-travel-page=next]').click(); await expect(page.locator('.travel-unit')).toHaveCount(1);
    await page.locator('[data-travel-page=prev]').click(); await expect(page.locator('.travel-unit')).toHaveCount(12);
    await unit.getByRole('button',{name:'Update Condition'}).click();
    const dialog=page.locator('.travel-dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByLabel('Condition',{exact:true}).selectOption('offline');
    await dialog.getByRole('button',{name:'Save Condition'}).click();
    await expect(dialog).toHaveCount(0); await expect(unit).toContainText('Offline / Down');
    expect((await api('GET',`assets?id=eq.${assetIds[0]}&select=location_id`))[0].location_id).toBe(from.id);
    await unit.getByRole('button',{name:'Update Location'}).click();
    await dialog.getByLabel('Facility',{exact:true}).selectOption(to.id);
    await dialog.getByRole('button',{name:'Cancel'}).click();
    expect((await api('GET',`assets?id=eq.${assetIds[0]}&select=location_id`))[0].location_id).toBe(from.id);
    await unit.getByRole('button',{name:'Update Location'}).click();
    await dialog.getByLabel('Facility',{exact:true}).selectOption(to.id);
    await dialog.getByRole('button',{name:'Save Location'}).click();
    await expect(unit.locator('.travel-current')).toContainText(to.name);
    await expect(unit.locator('dl > div').nth(1)).toContainText(from.name);
    await expect(unit).toContainText('Offline / Down');
    const actor=(await api('GET',`profiles?company_id=eq.${company}&user_id=eq.${tech.user.id}&select=full_name`))[0].full_name;
    await expect(unit).toContainText(actor);
    expect(await api('GET',`work_orders?id=eq.${workId}&select=*`)).toEqual(originalWork);
    await page.locator('[data-section=pm]').click();
    await expect(page.locator('.pm-card').filter({hasText:name})).toHaveCount(0);
    await page.locator('[data-traveling-units]:visible').click();
    await expect(unit).toContainText('Offline / Down');
    await page.locator('[data-travel-board]').screenshot({path:testInfo.outputPath(`travel-board-${width}.png`)});
    // A second writer changes condition while this dialog is open.
    await unit.getByRole('button',{name:'Update Condition'}).click();
    await dialog.getByLabel('Condition',{exact:true}).selectOption('degraded');
    await api('PATCH',`assets?id=eq.${assetIds[0]}&company_id=eq.${company}`,{status:'watch'});
    await dialog.getByRole('button',{name:'Save Condition'}).click();
    await expect(dialog.locator('[role=alert]')).toContainText('changed since',{timeout:20000});
    await dialog.getByRole('button',{name:'Reload latest unit'}).click();
    await expect(unit.locator('.chip')).toHaveText('Watch');
    await unit.getByRole('button',{name:'Update Location'}).click();
    await dialog.getByLabel('Facility',{exact:true}).selectOption(from.id);
    await dialog.getByRole('button',{name:'Save Location'}).click();
    await expect(unit.locator('.travel-current')).toContainText(from.name);
    await unit.getByRole('button',{name:'Equipment Details'}).click();
    await page.getByRole('button',{name:'Back to Traveling Equipment',exact:true}).click();
    await expect(page.locator('.travel-unit')).toHaveCount(12);
    await page.getByRole('button',{name:'Back to Equipment',exact:true}).click();
    expect(bootstraps).toBe(0);
    await page.locator('.asset-master-summary').screenshot({path:testInfo.outputPath(`travel-filters-${width}.png`)});
    console.log('Travel proof: technician loaded');
    await expect(page.locator('.asset-list .asset-card')).toHaveCount(12);
    await expect(page.locator(`.asset-card[data-asset-id="${assetIds[1]}"]`)).toContainText(to.name);
    await page.locator('[data-assets-page=next]').click();
    await expect(page.locator('.asset-list .asset-card')).toHaveCount(1);
    await page.locator('[data-assets-page=prev]').click();
    await page.locator(`.asset-card[data-asset-id="${assetIds[0]}"]`).click();
    const form=page.locator('#move-traveling-asset-form');
    await expect(form).toBeVisible();
    await expect(form).toContainText('All work history, part links, files and financials stay with this machine.');
    await expect(form).toContainText('Existing orders keep their original facility and assigned person.');
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
    expect(events).toHaveLength(3); expect(events.every(e=>e.actor_id===tech.user.id)).toBe(true);
    await page.locator('#edit-asset-form [name=asset_tag]').fill('TRAVEL-01');
    await page.locator('#edit-asset-form').getByRole('button',{name:'Save Equipment',exact:true}).click();
    await expect(form).toContainText(`Currently at ${to.name}`);
    await expect.poll(async()=> (await api('GET',`assets?id=eq.${assetIds[0]}&select=asset_tag`))[0].asset_tag).toBe('TRAVEL-01');
    await page.locator('#asset-open-work-target summary').click();
    await expect(page.locator('#asset-open-work-target')).toContainText(name,{timeout:20000});
    await page.locator(`[data-open-asset-history="${assetIds[0]}"]`).click();
    await expect(page.getByText(new RegExp(`Moved from ${from.name} to ${to.name}`)).first()).toBeVisible();
    await page.screenshot({path:testInfo.outputPath(`travel-history-${width}.png`),fullPage:true});
    console.log('Travel proof: history verified');
    const accountPage=await open(accounting);
    await accountPage.locator('[data-traveling-units]:visible').click();
    await expect(accountPage.locator('.travel-unit')).toHaveCount(12);
    await expect(accountPage.locator('[data-travel-location], [data-travel-condition]')).toHaveCount(0);
    await accountPage.getByRole('button',{name:'Back to Equipment',exact:true}).click();
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
    const current=(await api('GET',`assets?id=eq.${assetIds[0]}&select=*`))[0];
    const choices=['running','offline','degraded'].filter(status=>status!==current.status).slice(0,2);
    const concurrent=await Promise.all(choices.map(p_status=>request.post(`${host}/rest/v1/rpc/update_traveling_equipment_condition`,{
      headers:{apikey:key,Authorization:`Bearer ${tech.access_token}`},
      data:{p_company_id:company,p_asset_id:current.id,p_status,p_expected_status:current.status,p_expected_location_id:current.location_id,p_expected_revision:current.traveling_revision}
    })));
    expect(concurrent.map(r=>r.status()).sort()).toEqual([200,409]);
    const denied=await request.post(`${host}/rest/v1/rpc/update_traveling_equipment_condition`,{
      headers:{apikey:key,Authorization:`Bearer ${accounting.access_token}`},
      data:{p_company_id:company,p_asset_id:current.id,p_status:'running',p_expected_status:current.status,p_expected_location_id:current.location_id,p_expected_revision:current.traveling_revision}
    });
    expect(denied.status()).toBe(403);
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
