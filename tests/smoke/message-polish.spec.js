const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');

for (const width of [1440, 768, 390, 320]) {
  test(`message presentation, menus and private previews at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.setContent('<main id="message-workspace"></main>');
    for (const file of ['styles.css','src/render/messageStyles.css','src/render/messageTools.css']) await page.addStyleTag({ path: path.join(root,file) });
    for (const file of ['iconDisplay','messageDisplay','messageCenterDisplay','messageThreadButtonDisplay']) await page.addScriptTag({ path: path.join(root,`src/render/${file}.js`) });
    await page.addScriptTag({ content: fs.readFileSync(path.join(root,'src/workflows/messagePresentation.mjs'),'utf8').replace('export function','function') });
    await page.evaluate(() => {
      document.body.style.margin = '0';
      const escapeHtml = text => String(text).replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
      const names = { me: 'Alex Morgan', sam: 'Sam Rivera', jo: 'Jordan Lee' };
      const icon = window.MaintainOpsIconDisplay.segmentIcon;
      const threads = ['Shift handoff','Sam Rivera','Press brake inspection','Jordan Lee','Parts & supplies','Weekend coverage'].map((title,i) => ({
        id: String(i), title, thread_type: i === 1 || i === 3 ? 'direct' : 'location',
        latest_message: { body: ['Guard is back on. Ready for your check.','Thanks, I have the replacement seals.','Inspection report is attached.','I can cover the second shift.','Bearings should arrive tomorrow.','The schedule is ready.'][i],
          sender_id: i%2 ? 'sam':'jo', created_at: new Date().toISOString() },
      }));
      const rows = [
        { id:'a',sender_id:'sam',body:'Morning team. The line is isolated and ready for the seal replacement.' },
        { id:'b',sender_id:'me',body:'Thanks, Sam. I have the parts. I will check the guard before we bring it back online.' },
        { id:'c',sender_id:'jo',body:'Here is the inspection sheet from yesterday.',message_files:[{id:'pdf',file_name:'Press brake inspection.pdf',content_type:'application/pdf',byte_size:188000,object_path:'private/pdf'}] },
        { id:'d',sender_id:'sam',body:'Guard is back on. Ready for your check.',message_reactions:[{active:true,reaction:'acknowledged',user_id:'me'}] },
        { id:'e',sender_id:'me',body:'On my way. I will update the work order after the test run.',reply_to_id:'d',reply:{sender_id:'sam',body:'Guard is back on. Ready for your check.'} },
      ].map((row,i) => ({...row,created_at:new Date(Date.now()-(5-i)*60000).toISOString()}));
      const options = { escapeHtml, icon, getCurrentUserId:()=> 'me', teamMemberName:id=>names[id],
        formatMessageTime:()=> 'Today, 9:42 AM',formatMessageDay:()=> 'Today', getReplyCount:id=>id==='d'?2:0 };
      const bubbles = window.MaintainOpsMessageDisplay.createMessageDisplayHelpers(options);
      let active = '0', composing = false;
      const list = window.MaintainOpsMessageThreadButtonDisplay.createMessageThreadButtonDisplayHelpers({
        ...options, messageThreadScopeLabel:thread=>thread.thread_type==='direct'?'Direct message':'Salem / Maintenance',
        unreadMessageCount:id=>id==='1'?2:0, getMessagesByThreadId:()=>({}),getActiveMessageThreadId:()=>active,
      });
      const renderer = window.MaintainOpsMessageCenterDisplay.createMessageCenterDisplayHelpers({
        ...options,getMessagesReady:()=>true,getMessageThreads:()=>threads,getActiveMessageThreadId:()=>active,
        getMessageComposerOpen:()=>composing,getMessageHistory:()=>({0:{rows,hasOlder:false}}),getMessagesByThreadId:()=>({0:rows}),
        getWorkOrders:()=>[],getMessageComposerWorkOrderId:()=>'',getCompanyMembers:()=>[],getSession:()=>({user:{id:'me'}}),
        getMessageWorkOrderLinksReady:()=>true,getMessageSearchQuery:()=>'',getMessageThreadFilter:()=> 'all',getMessageThreadsPage:()=>1,
        LIST_ITEMS_PER_PAGE:12,filteredMessageThreads:()=>threads,totalUnreadMessages:()=>1, getWorkspaceLabel:()=> 'Salem / Taylor Metal',
        messageComposerScopeNote:()=> 'Direct message',recentMessageLinkWorkOrders:()=>[],statusLabel:String,
        messageThreadScopeLabel:()=> 'Salem / Maintenance',renderMessageThreadButton:list.renderMessageThreadButton,
        renderMessageList:bubbles.renderMessageList,renderListPagination:()=>'',getMessageConnection:()=> 'Live',
        renderMessageTools:()=>`<div class="message-attachments"><div class="message-media-tools"><button class="message-icon-button" type="button" aria-label="Attach files">${icon('attach')}</button><button class="message-voice-button" type="button">${icon('mic')}<span>Send voice message</span></button></div></div>`,
      });
      const proof = window.polish = { downloads:[], resolve:[], created:0, revoked:0 };
      const create = URL.createObjectURL.bind(URL), revoke = URL.revokeObjectURL.bind(URL);
      URL.createObjectURL = blob => { proof.created++; return create(blob); };
      URL.revokeObjectURL = url => { proof.revoked++; revoke(url); };
      const presentation = createMessagePresentation({documentRef:document,
        getFile:(id,messageId)=>rows.find(row=>row.id===messageId)?.message_files?.find(file=>file.id===id),
        download:path=>{proof.downloads.push(path);return new Promise(resolve=>proof.resolve.push(resolve));},
      });
      function render() {
        document.querySelector('#message-workspace').innerHTML = renderer.renderMessageCenter();
        document.querySelector('.message-center').style.height = '100dvh';
        document.querySelector('[data-message-back]')?.addEventListener('click',()=>{active='';render();});
        document.querySelectorAll('[data-message-thread]').forEach(button=>button.onclick=()=>{active='0';render();});
        document.querySelector('[data-message-compose]')?.addEventListener('click',()=>{composing=true;render();});
        presentation.hydrate();
      }
      proof.render=render; proof.reset=presentation.reset;
      proof.link=()=>{threads[0].work_order_id='order';threads[0].title='Press brake - exceptionally long work order subject for a narrow display';render();};
      proof.photo=()=>{ rows.push({id:'photo',sender_id:'sam',body:'Reference image',created_at:new Date().toISOString(),message_files:Array.from({length:3},(_,i)=>({id:'image'+i,file_name:'guard-'+i+'.png',content_type:'image/png',byte_size:200,object_path:'private/image'+i}))});render();document.querySelector('.message-list').scrollTop=99999; };
      proof.finish=()=>{const canvas=document.createElement('canvas');canvas.width=120;canvas.height=90;const ctx=canvas.getContext('2d');ctx.fillStyle='#7ec3ac';ctx.fillRect(0,0,120,90);canvas.toBlob(blob=>proof.resolve.splice(0).forEach(resolve=>resolve({data:blob})),'image/png');};
      render();
    });
    const history = page.locator('.message-list');
    await history.evaluate(node=>{node.scrollTop=node.scrollHeight;});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const reply = page.getByRole('textbox',{name:'Reply',exact:true});
    await expect(reply).toBeVisible();
    await reply.fill('Draft stays here');
    const actions=page.getByLabel('Message actions',{exact:true}).last();
    await actions.click();
    const menu=page.locator('.message-overflow[open] > .message-menu-items');
    await expect(menu).toBeVisible();
    await history.evaluate(node=>{node.scrollTop=Math.max(0,node.scrollTop-2);node.dispatchEvent(new Event('scroll'));});
    await expect(menu).toBeVisible();
    const box=await menu.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0); expect(box.x+box.width).toBeLessThanOrEqual(width);
    expect(box.y+box.height).toBeLessThanOrEqual(960);
    await page.getByLabel('React to message',{exact:true}).last().click();
    await expect(page.getByRole('button',{name:'Thanks',exact:true}).last()).toBeVisible();
    await page.keyboard.press('Escape'); await expect(menu).toHaveCount(0);
    await expect(reply).toHaveValue('Draft stays here');
    const composerBox=await page.locator('.message-reply-form').boundingBox();
    await page.locator('.message-quick-menu > summary').click();
    await expect(page.getByRole('button',{name:'On it',exact:true})).toBeVisible();
    expect((await page.locator('.message-reply-form').boundingBox()).height).toBe(composerBox.height);
    await page.keyboard.press('Escape');
    const evidence=path.join(root,'lfes-evidence'); fs.mkdirSync(evidence,{recursive:true});
    await page.screenshot({path:path.join(evidence,`messages-polish-${width}.png`)});
    await page.getByRole('button',{name:'Back to conversations'}).click();
    await expect(page.locator('.message-thread-button')).toHaveCount(6);
    await page.screenshot({path:path.join(evidence,`messages-inbox-${width}.png`)});
    await page.locator('[data-message-thread="0"]').click();
    await page.evaluate(()=>polish.link());
    await expect(page.getByRole('button',{name:'Open Work Order',exact:true})).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    // Images use private downloads only when visible, with a two-request ceiling.
    expect(await page.evaluate(()=>polish.downloads.length)).toBe(0);
    await page.evaluate(()=>polish.photo());
    await expect.poll(()=>page.evaluate(()=>polish.downloads.length)).toBeGreaterThan(0);
    expect(await page.evaluate(()=>polish.downloads.length)).toBeLessThanOrEqual(2);
    // Realtime replaces the history DOM while a download is pending.
    await page.evaluate(()=>{polish.render();document.querySelector('.message-list').scrollTop=99999;});
    await expect(page.locator('[data-message-photo]').last()).toBeInViewport();
    await page.evaluate(()=>polish.finish());
    await expect(page.locator('[data-message-photo] img:not([hidden])').first()).toBeVisible();
    const photoBox=await page.locator('[data-message-photo]').last().boundingBox();
    expect(Math.abs(photoBox.width / photoBox.height - 4/3)).toBeLessThan(.02);
    await page.evaluate(()=>polish.reset());
    await page.evaluate(()=>polish.finish());
    await expect.poll(()=>page.evaluate(()=>polish.created===polish.revoked)).toBe(true);
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.getByRole('button',{name:'Back to conversations'}).click();
    await page.getByRole('button',{name:'New message',exact:true}).first().click();
    await expect(page.locator('#message-thread-form')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
