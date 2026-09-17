const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
test.use({actionTimeout:15000});

test('message tools: search, organization, discussions, private files and voice drafts',async({browser,request})=>{
  test.skip(process.env.LFES_MESSAGING_MUTATIONS!=='1','Isolated QA opt-in required');
  test.setTimeout(240000);
  const url=process.env.LFES_SUPABASE_URL,key=process.env.LFES_SUPABASE_ANON_KEY,company=process.env.LFES_QA_COMPANY_ID;
  expect(new URL(url).hostname).toBe('fsxqrngpaseqdxijggcm.supabase.co');
  expect(company).toBe('0d6fd8f1-428d-4192-8176-48943e3ec119');
  async function login(role){const r=await request.post(`${url}/auth/v1/token?grant_type=password`,{headers:{apikey:key},data:{email:process.env[`${role}_EMAIL`],password:process.env[`${role}_PASSWORD`]}});expect(r.ok()).toBeTruthy();return r.json();}
  const admin=await login('LFES_ADMIN'),tech=await login('LFES_TECHNICIAN'),accounting=await login('LFES_ACCOUNTING'),manager=await login('LFES_MANAGER');
  const headers=s=>({apikey:key,Authorization:`Bearer ${s.access_token}`});
  async function api(s,method,table,data){const r=await request.fetch(`${url}/rest/v1/${table}`,{method,headers:{...headers(s),Prefer:method==='POST'?'return=minimal':'return=representation'},data});expect(r.ok(),`${table.split('?')[0]} ${await r.text()}`).toBeTruthy();return [201,204].includes(r.status())?null:r.json();}
  const thread=randomUUID(),root=randomUUID(),prefix=`LFES Tools ${randomUUID()}`,objects=[];
  const evidence=path.resolve('lfes-evidence');fs.mkdirSync(evidence,{recursive:true});
  fs.writeFileSync(path.join(evidence,'message-tools-fixtures.json'),JSON.stringify({company,prefix,threadIds:[thread]},null,2));
  await api(admin,'POST','message_threads',{id:thread,company_id:company,created_by:admin.user.id,title:prefix,thread_type:'direct'});
  await api(admin,'POST','message_thread_members',[admin,tech].map(s=>({company_id:company,thread_id:thread,user_id:s.user.id})));
  await api(admin,'POST','messages',{id:root,company_id:company,thread_id:thread,sender_id:admin.user.id,body:'Hydraulic instructions',created_at:new Date(Date.now()-900000).toISOString()});
  await api(admin,'POST','messages',Array.from({length:51},(_,i)=>({company_id:company,thread_id:thread,sender_id:admin.user.id,parent_message_id:root,body:`Hydraulic reply ${i}`,created_at:new Date(Date.now()-(100-i)*1000).toISOString()})));
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await context.addInitScript(({session,company})=>{
    localStorage.setItem('sb-fsxqrngpaseqdxijggcm-auth-token',JSON.stringify(session));
    localStorage.setItem('maintainops.activeCompanyId',company);localStorage.setItem('maintainops.activeSection','messages');
    // Deterministic microphone double, not a claim of physical-device capture verification.
    window.__micCalls=0;window.__micStops=0;
    Object.defineProperty(navigator,'mediaDevices',{configurable:true,value:{getUserMedia:async()=>{window.__micCalls++;return {getTracks:()=>[{stop:()=>window.__micStops++}]};}}});
    window.MediaRecorder=class {
      static isTypeSupported(type){return type==='audio/mp4';}
      constructor(){this.mimeType='audio/wav';this.state='inactive';}
      start(){this.state='recording';}
      stop(){this.state='inactive';const bytes=new Uint8Array(16044),view=new DataView(bytes.buffer);const text=(n,s)=>[...s].forEach((c,i)=>bytes[n+i]=c.charCodeAt(0));text(0,'RIFF');view.setUint32(4,16036,true);text(8,'WAVEfmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,8000,true);view.setUint32(28,16000,true);view.setUint16(32,2,true);view.setUint16(34,16,true);text(36,'data');view.setUint32(40,16000,true);this.ondataavailable({data:new Blob([bytes],{type:'audio/wav'})});this.onstop();}
    };
  },{session:tech,company});
  try {
    await page.goto(process.env.MAINTAINOPS_BASE_URL);
    await expect(page.locator('#message-search')).toBeVisible({timeout:45000});
    await page.locator('#message-search').fill(prefix);await page.locator(`[data-message-thread="${thread}"]`).click();
    await expect(page.locator('.message-bubble')).toHaveCount(1);await expect(page.getByRole('button',{name:'51 replies',exact:true})).toBeVisible();
    await page.getByLabel('Conversation options',{exact:true}).click();await page.getByRole('button',{name:'Add to favorites',exact:true}).click();
    await expect.poll(async()=> (await api(tech,'GET',`message_thread_members?thread_id=eq.${thread}&user_id=eq.${tech.user.id}&select=favorite`))[0].favorite).toBe(true);
    await page.getByLabel('Conversation options',{exact:true}).click();await page.locator('[data-message-section-name]').fill('Shop floor');await page.getByRole('button',{name:'Save section',exact:true}).click();
    await expect(page.locator('[data-message-section-filter] option')).toHaveCount(2);
    await page.locator('[data-message-filter="favorites"]').click();await expect(page.locator(`[data-message-thread="${thread}"]`)).toBeVisible();
    await page.getByRole('button',{name:'Search this conversation',exact:true}).click();
    await page.locator('.message-search-form [name="query"]').fill('hydraulic');await expect(page.locator('.message-search-result')).toHaveCount(12);
    await page.getByRole('button',{name:'Next',exact:true}).click();await expect(page.locator('.message-search-pages')).toContainText('Page 2');
    await page.locator('.message-search-result').first().click();await expect(page.locator('.message-discussion-history .message-bubble')).toHaveCount(51);
    await page.getByRole('button',{name:'Earlier replies',exact:true}).click();await expect(page.locator('.message-discussion-history .message-bubble')).toHaveCount(2);
    await page.getByRole('textbox',{name:'Thread reply',exact:true}).fill('A saved draft');await page.getByRole('button',{name:'Close',exact:true}).click();
    await page.getByRole('button',{name:'51 replies',exact:true}).click();await expect(page.getByRole('textbox',{name:'Thread reply',exact:true})).toHaveValue('A saved draft');
    await page.getByRole('textbox',{name:'Thread reply',exact:true}).fill('Thread answer from technician');await page.getByRole('button',{name:'Send thread reply',exact:true}).click();
    await expect(page.locator('.message-discussion-history')).toContainText('Thread answer from technician');
    await page.getByRole('button',{name:'Close',exact:true}).click();await expect(page.getByRole('button',{name:'52 replies',exact:true})).toBeVisible();
    expect(await page.evaluate(()=>window.__micCalls)).toBe(0);
    await page.getByRole('button',{name:'Send voice message',exact:true}).click();await expect.poll(()=>page.evaluate(()=>window.__micCalls)).toBe(1);
    await expect(page.getByRole('button',{name:'Send reply',exact:true})).toBeDisabled();
    await expect(page.getByRole('button',{name:'Attach files',exact:true})).toHaveCount(0);
    await page.getByRole('button',{name:'Cancel',exact:true}).click();expect(await page.evaluate(()=>window.__micStops)).toBe(1);await expect(page.locator('.message-pending-file')).toHaveCount(0);
    await page.getByRole('button',{name:'Send voice message',exact:true}).click();await page.getByRole('button',{name:'Stop',exact:true}).click();await expect(page.locator('.message-pending-file')).toContainText('Voice message.wav');
    await expect(page.getByRole('button',{name:'Review voice message',exact:true})).toBeVisible();
    await expect(page.getByRole('button',{name:'Send voice message',exact:true})).toHaveCount(0);
    await page.locator('[data-message-files]').setInputFiles({name:'manual.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.4\nQA attachment\n%%EOF')});
    await expect(page.locator('.message-pending-file')).toHaveCount(2);
    const photo=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=2048;c.height=1024;const x=c.getContext('2d');x.fillStyle='#eac234';x.fillRect(0,0,c.width,c.height);return c.toDataURL('image/png').split(',')[1];});
    await page.locator('[data-message-files]').setInputFiles({name:'equipment-reference.png',mimeType:'image/png',buffer:Buffer.from(photo,'base64')});
    await expect(page.locator('.message-pending-file')).toHaveCount(3);
    await page.getByRole('textbox',{name:'Reply',exact:true}).fill('Files for the job');
    let blocked=true;
    await page.route('**/rest/v1/rpc/send_message_with_files',async route=>{if(blocked){blocked=false;await route.fulfill({status:503,contentType:'application/json',body:'{"message":"Injected commit failure"}'});}else await route.continue();});
    await page.getByRole('button',{name:'Review voice message',exact:true}).click();
    const confirmation=page.getByRole('dialog',{name:'Send voice message?',exact:true});
    await expect(confirmation.locator('audio')).toHaveCount(1);
    await confirmation.getByRole('button',{name:'Keep editing',exact:true}).click();
    expect(await api(tech,'GET',`message_files?thread_id=eq.${thread}&select=id`)).toEqual([]);
    await expect(page.getByRole('textbox',{name:'Reply',exact:true})).toHaveValue('Files for the job');
    await expect(page.locator('.message-pending-file')).toHaveCount(3);
    await page.getByRole('button',{name:'Send reply',exact:true}).click();
    await confirmation.getByRole('button',{name:'Send voice message',exact:true}).click();
    await expect(page.locator('#message-reply-error')).toContainText('Injected commit failure');
    await expect(page.locator('.message-pending-file')).toHaveCount(3);await expect(page.getByRole('textbox',{name:'Reply',exact:true})).toHaveValue('Files for the job');
    await page.getByRole('button',{name:'Send reply',exact:true}).click();
    await confirmation.getByRole('button',{name:'Send voice message',exact:true}).click();
    await expect(page.locator('.message-file')).toHaveCount(3,{timeout:30000});await expect(page.locator('.message-pending-file')).toHaveCount(0);
    objects.push(...await api(tech,'GET',`message_files?thread_id=eq.${thread}&select=id,message_id,object_path`));
    expect(objects).toHaveLength(3);
    expect(await api(accounting,'GET',`message_files?thread_id=eq.${thread}&select=id`)).toEqual([]);
    for(const file of objects){expect((await request.get(`${url}/storage/v1/object/authenticated/message-files/${file.object_path}`,{headers:headers(accounting)})).ok()).toBe(false);expect((await request.get(`${url}/storage/v1/object/authenticated/message-files/${file.object_path}`,{headers:headers(admin)})).ok()).toBe(true);}
    const storage=await api(manager,'POST','rpc/get_storage_dashboard',{target_company_id:company});
    expect(storage.bucket_totals.find(bucket=>bucket.bucket_id==='message-files').file_count).toBeGreaterThanOrEqual(3);
    for(const row of storage.top_files.filter(file=>file.bucket_id==='message-files')) {
      expect(row.file_name).toBe('Private message attachment');expect(row.object_path).toBe('');expect(row.linked_record_id).toBeNull();
    }
    await page.getByRole('button',{name:/Voice message.wav/}).click();await expect(page.locator('.message-media-dialog audio')).toHaveCount(1);
    await expect.poll(()=>page.locator('.message-media-dialog audio').evaluate(audio=>audio.readyState>0||Boolean(audio.error))).toBe(true);
    const audioEvidence=await page.locator('.message-media-dialog audio').evaluate(audio=>({readyState:audio.readyState,errorCode:audio.error?.code||null,error:audio.error?.message||null,supported:audio.canPlayType('audio/wav')}));
    fs.writeFileSync(path.join(evidence,'message-audio-decoder.json'),JSON.stringify(audioEvidence,null,2));
    if(audioEvidence.errorCode) await expect(page.locator('.message-media-dialog')).toContainText('Download the file to listen');
    else await expect(page.locator('.message-media-dialog audio:not([hidden]),.message-media-dialog .message-audio-player').first()).toBeVisible();
    await page.getByRole('button',{name:'Close',exact:true}).click();
    await page.locator('[data-message-photo]').scrollIntoViewIfNeeded();
    await expect.poll(()=>page.locator('[data-message-photo] img').evaluate(img=>img.naturalWidth)).toBe(768);
    await page.getByRole('button',{name:/equipment-reference/}).click();await expect.poll(()=>page.locator('.message-media-dialog img').evaluate(img=>img.naturalWidth)).toBe(768);await page.getByRole('button',{name:'Close',exact:true}).click();
    await page.screenshot({path:path.join(evidence,'message-tools-desktop.png')});
    for(const width of [390,320]) {
      await page.setViewportSize({width,height:844});
      const geometry = () => page.evaluate(()=>({width:innerWidth,height:innerHeight,scroll:document.documentElement.scrollHeight,viewport:visualViewport.height,root:document.querySelector('.message-center').getBoundingClientRect().toJSON(),configured:getComputedStyle(document.documentElement).getPropertyValue('--message-viewport-height')}));
      const before = await geometry();
      await expect(page.locator('.message-center')).toHaveCSS('height','844px');
      fs.writeFileSync(path.join(evidence,`message-tools-geometry-${width}.json`),JSON.stringify({before,settled:await geometry()},null,2));
      await page.screenshot({path:path.join(evidence,`message-tools-mobile-${width}.png`)});
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      expect(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1)).toBe(true);
      const box=await page.locator('.message-chat-header').boundingBox();expect(box.height).toBeLessThan(110);
      await expect(page.getByRole('button',{name:'Send reply',exact:true})).toBeInViewport();
    }
    expect(errors).toEqual([]);
  } finally {
    const uploaded=await api(tech,'GET',`message_files?thread_id=eq.${thread}&select=message_id,object_path`);
    for(const id of new Set(uploaded.map(row=>row.message_id).filter(Boolean))) await api(tech,'POST','rpc/soft_delete_own_message',{target_message_id:id});
    if(uploaded.length){const removed=await request.delete(`${url}/storage/v1/object/message-files`,{headers:headers(tech),data:{prefixes:uploaded.map(row=>row.object_path)}});expect(removed.ok(),await removed.text()).toBe(true);expect(await removed.json()).toHaveLength(uploaded.length);}
    await context.close();
  }
});
