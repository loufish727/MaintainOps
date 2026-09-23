const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');

test('dark message controls and secondary states keep readable contrast', async ({ page }) => {
  await page.setContent(`<section class="message-center"><div class="message-tool-dialog">
    <div class="message-work-context"><span class="message-context-status" data-status="blocked" data-check>Blocked</span></div>
    <p class="message-archive-note" data-check>Archived conversation</p>
    <p class="message-record-state" data-check>Recording 0:12</p>
    <p class="error-text" data-check>Upload could not be completed</p>
    <div class="message-menu-items"><button class="danger-link" data-check>Delete message</button></div>
    <button class="message-search-result"><strong data-check>Shift handoff</strong><small data-check>Yesterday</small></button>
    <div class="message-pending-file"><span data-check>Inspection.pdf</span><small data-check>184 KB</small></div>
    <div class="message-record-controls"><button data-check>Cancel recording</button></div>
    <div class="message-quick-replies"><button data-check>On it</button></div>
    <div class="message-voice-confirm-actions"><button data-confirm-voice-send data-check>Send voice message</button></div>
    <div class="message-activity"><button class="work-notification-item unread"><span data-check>Production action complete</span></button></div>
    <label>Recipient<select><option>Sam Rivera</option></select></label>
    <textarea placeholder="Write a reply"></textarea>
    ${Array.from({length:6},(_,tone)=>`<span class="message-thread-avatar" data-tone="${tone}" data-check>SR</span>`).join('')}
  </div></section>`);
  for (const file of ['styles.css','src/render/messageStyles.css','src/render/messageTools.css']) await page.addStyleTag({path:path.join(root,file)});
  const proof = await page.evaluate(() => {
    const lum = color => color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
    const ratio = (a,b) => (Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
    const background = node => {
      while (node) {
        const value=getComputedStyle(node).backgroundColor;
        if (value.startsWith('rgb(')) return value;
        node=node.parentElement;
      }
      throw new Error('Missing opaque test surface');
    };
    const field = document.querySelector('textarea'), css=getComputedStyle(field);
    const scheme=getComputedStyle(document.querySelector('select')).colorScheme;
    return { scheme, text:[...document.querySelectorAll('[data-check]')].map(node=>({text:node.textContent,ratio:ratio(getComputedStyle(node).color,background(node))})),
      placeholder:ratio(getComputedStyle(field,'::placeholder').color,css.backgroundColor),
      border:ratio(css.borderTopColor,css.backgroundColor) };
  });
  expect(proof.scheme).toBe('dark');
  for (const item of proof.text) expect(item.ratio,item.text).toBeGreaterThanOrEqual(4.5);
  expect(proof.placeholder).toBeGreaterThanOrEqual(4.5);
  expect(proof.border).toBeGreaterThanOrEqual(3);
});

for (const width of [1440, 768, 390, 320]) {
  test(`message presentation, menus and private previews at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.setContent('<main id="message-workspace"></main>');
    for (const file of ['styles.css','src/render/messageStyles.css','src/render/messageTools.css']) await page.addStyleTag({ path: path.join(root,file) });
    for (const file of ['iconDisplay','messageDisplay','messageCenterDisplay','messageThreadButtonDisplay']) await page.addScriptTag({ path: path.join(root,`src/render/${file}.js`) });
    await page.addScriptTag({ content: fs.readFileSync(path.join(root,'src/workflows/messagePresentation.mjs'),'utf8').replace('export function','function') });
    await page.evaluate(() => {
      document.body.style.margin = '0';
      document.body.classList.add('messages-active');
      const escapeHtml = text => String(text).replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
      const names = { me: 'Alex Morgan', sam: 'Sam Rivera', jo: 'Jordan Lee' };
      const icon = window.MaintainOpsIconDisplay.segmentIcon;
      const threads = ['Shift handoff','Sam Rivera','Press brake inspection','Jordan Lee','Parts & supplies','Weekend coverage'].map((title,i) => ({
        id: String(i), title, thread_type: i === 1 || i === 3 ? 'direct' : 'location',
        latest_message: { body: ['Guard is back on. Ready for your check.','Thanks, I have the replacement seals.','Inspection report is attached.','I can cover the second shift.','Bearings should arrive tomorrow.','The schedule is ready.'][i],
          sender_id: i%2 ? 'sam':'jo', created_at: new Date().toISOString() },
      }));
      threads[0].work_order_id = 'order';
      const orders = [{id:'order',title:'Replace hydraulic seal',status:'in_progress',assets:{name:'Press brake 02'}}];
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
        navIcon: window.MaintainOpsIconDisplay.navIcon,
        ...options,getMessagesReady:()=>true,getMessageThreads:()=>threads,getActiveMessageThreadId:()=>active,
        getMessageComposerOpen:()=>composing,getMessageHistory:()=>({0:{rows,hasOlder:false}}),getMessagesByThreadId:()=>({0:rows}),
        getWorkOrders:()=>orders,getMessageComposerWorkOrderId:()=>'',getCompanyMembers:()=>[],getSession:()=>({user:{id:'me'}}),
        getMessageWorkOrderLinksReady:()=>true,getMessageSearchQuery:()=>'',getMessageThreadFilter:()=> 'all',getMessageThreadsPage:()=>1,
        LIST_ITEMS_PER_PAGE:12,filteredMessageThreads:()=>threads,totalUnreadMessages:()=>1, getWorkspaceLabel:()=> 'Salem / Taylor Metal',
        messageComposerScopeNote:()=> 'Direct message',recentMessageLinkWorkOrders:()=>[],statusLabel:()=> 'In progress',
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
    expect(await page.locator('.message-heading-icon').innerHTML()).toBe(
      await page.evaluate(() => window.MaintainOpsIconDisplay.navIcon('messages')));
    if (width > 920) {
      const headingIcon = page.locator('.message-heading-icon > svg');
      await expect(headingIcon).toBeVisible();
      const dimensions = await headingIcon.boundingBox();
      expect(dimensions.width).toBe(17);
      expect(dimensions.height).toBe(17);
    }
    const history = page.locator('.message-list');
    const palette = await page.evaluate(() => {
      const css = selector => getComputedStyle(document.querySelector(selector));
      const luminance = color => {
        const [r,g,b] = color.match(/[\d.]+/g).slice(0,3).map(value => {
          const channel = Number(value)/255; return channel <= .04045 ? channel/12.92 : ((channel+.055)/1.055)**2.4;
        });
        return .2126*r+.7152*g+.0722*b;
      };
      const contrast = (foreground,background) => {
        const a=luminance(foreground),b=luminance(background);
        return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
      };
      const pairs = [
        ['.message-bubble-meta strong','.message-thread-detail'],
        ['.message-bubble:not(.mine) p','.message-thread-detail'],
        ['.message-bubble.mine p','.message-bubble.mine'],
        ['.message-bubble.mine .message-stamp','.message-bubble.mine'],
        ['.message-quote span','.message-quote'],
        ['.message-compose-line textarea','.message-compose-line textarea'],
        ['.message-thread-avatar','.message-thread-avatar'],
        ['.message-row-heading strong','.message-thread-button.active'],
        ['.message-row-preview small','.message-thread-rail'],
        ['.message-chat-header h3','.message-chat-header'],
        ['.message-chat-header p','.message-chat-header'],
        ['.message-context-status','.message-context-status'],
        ['.message-file-caption strong','.message-file'],
        ['.message-file small','.message-file'],
        ['.message-voice-button','.message-voice-button'],
        ['.message-send-button','.message-send-button'],
      ];
      return { surface:css('.message-thread-detail').backgroundColor, scheme:css('.message-center').colorScheme,
        ratios:pairs.map(([fg,bg])=>({selector:fg,ratio:contrast(css(fg).color,css(bg).backgroundColor)})) };
    });
    expect(palette.surface).toBe('rgb(24, 28, 32)');
    expect(palette.scheme).toBe('dark');
    for (const check of palette.ratios) expect(check.ratio,`${check.selector} contrast`).toBeGreaterThanOrEqual(4.5);
    await history.evaluate(node=>{node.scrollTop=node.scrollHeight;});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if(width<=920) expect(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1)).toBe(true);
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
    if(width<=420) {
      const mediaBox=await page.locator('.message-media-tools').boundingBox();
      expect(mediaBox.height).toBeLessThanOrEqual(50);
      await expect(page.locator('.message-voice-button')).toContainText('Send voice message');
    }
    await page.locator('.message-quick-menu > summary').click();
    await expect(page.getByRole('button',{name:'On it',exact:true})).toBeVisible();
    expect((await page.locator('.message-reply-form').boundingBox()).height).toBe(composerBox.height);
    await page.keyboard.press('Escape');
    const evidence=path.join(root,'lfes-evidence'); fs.mkdirSync(evidence,{recursive:true});
    await expect(page.locator('.message-work-context')).toContainText('Press brake 02');
    await reply.fill('');
    await reply.blur();
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
