import { prepareMessageFile, sendMessageFiles, removePendingFile, createVoiceRecorder } from '../services/messageMedia.mjs';

const SELECT = 'id,company_id,thread_id,sender_id,body,created_at,deleted_at,reply_to_id,parent_message_id,message_reactions(*),message_files(id,file_name,content_type,byte_size,object_path)';

export function createMessageExperience(deps) {
  const doc = deps.documentRef, escape = deps.escapeHtml, icon = deps.icon;
  const files = new Map(), busy = new Set(), drafts = new Map();
  let scope = '', section = '', dialog, discussion, search = { text: '', sender: '', since: '', thread: '', page: 0 }, searchVersion = 0, searchTimer, discussionVersion = 0, record, recordKey, lastFocus;
  let refreshTimer, refreshing = false, cleanedScope = '';
  const previews = new Set();
  const scopeNow = () => `${deps.getUserId()}:${deps.getCompanyId()}`;
  const current = saved => saved === scopeNow();
  const client = () => deps.client();
  const fileList = key => files.get(key) || [];
  const errorText = error => error?.message || 'Could not complete this action. Try again.';
  // Every caller supplies our own escaped builders, never server-provided HTML.
  function html(node, markup) { if (node) node.innerHTML = markup; }

  function closeDialog() {
    if (discussion) drafts.set(discussion.root, dialog?.querySelector('[name="body"]')?.value || '');
    if (recordKey?.startsWith('discussion:')) { record?.cancel(); record = null; recordKey = null; }
    searchVersion++; discussionVersion++; discussion = null;
    dialog?.close(); dialog?.remove(); dialog = null;
    if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
  }
  function makeDialog(title, content) {
    closeDialog(); lastFocus = doc.activeElement;
    dialog = doc.createElement('dialog'); dialog.className = 'message-tool-dialog';
    html(dialog, `<header><h2>${escape(title)}</h2><button class="message-icon-button" data-close-message-dialog type="button" aria-label="Close" title="Close">${icon('close')}</button></header>${content}`);
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(); });
    doc.body.append(dialog); dialog.showModal();
    return dialog;
  }
  function reset() {
    scope = scopeNow(); section = ''; files.clear(); busy.clear(); record?.cancel(); record = null; recordKey = null;
    closeDialog(); clearTimeout(searchTimer); clearTimeout(refreshTimer);
    drafts.clear(); cleanedScope = '';
    for (const preview of previews) { URL.revokeObjectURL(preview.url); preview.node.remove(); }
    previews.clear();
  }
  function renderTools(key) {
    if (!deps.canEdit()) return '';
    return `<div class="message-attachments" data-attachment-key="${escape(key)}"></div>`;
  }
  function hydrate() {
    if (scope !== scopeNow()) reset();
    if (deps.getActiveSection() !== 'messages') { closeDialog(); record?.cancel(); record = null; recordKey = null; return; }
    if (cleanedScope !== scope && deps.canEdit()) { cleanedScope = scope; void cleanupPendingUploads().catch(() => {}); }
    doc.querySelectorAll('.message-attachments').forEach(node => {
      const key = node.dataset.attachmentKey;
      html(node, `<div class="message-attachment-tray">${fileList(key).map(file => `<span class="message-pending-file"><span>${escape(file.name)} <small>${Math.ceil(file.blob.size / 1024)} KB</small></span><button data-remove-pending-file="${file.id}" data-file-key="${escape(key)}" type="button" aria-label="Remove ${escape(file.name)}" title="Remove attachment" ${busy.has(key) ? 'disabled' : ''}>${icon('close')}</button></span>`).join('')}</div>
        <div class="message-media-tools"><button class="message-icon-button" data-choose-message-files type="button" aria-label="Attach files" title="Attach photos or files" ${busy.has(key) ? 'disabled' : ''}>${icon('attach')}</button><input data-message-files type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,audio/*" hidden>
        <button class="message-icon-button" data-record-message type="button" aria-label="Record voice message" title="Record voice message" ${record || busy.has(key) ? 'disabled' : ''}>${icon('mic')}</button>
        ${recordKey === key ? `<span class="message-record-state" role="status">Recording <span data-record-time>0:00</span></span><button data-stop-recording type="button">Stop</button><button data-cancel-recording type="button">Cancel</button>` : ''}</div>`);
      const form = node.closest('form');
      if (form?.querySelector('[name="body"]')) form.querySelector('[name="body"]').required = !fileList(key).length;
    });
  }
  async function addFiles(key, inputFiles) {
    const saved = scopeNow();
    if (fileList(key).length + inputFiles.length > 20) throw new Error('A message can have up to 20 attachments.');
    for (const file of inputFiles) {
      const prepared = await prepareMessageFile(file, deps.optimizePhoto);
      if (!current(saved)) return;
      files.set(key, [...fileList(key), prepared]); hydrate();
    }
  }
  async function recordVoice(key) {
    if (record || !deps.canEdit()) return;
    const saved = scopeNow(); recordKey = key;
    record = createVoiceRecorder({
      onTime: seconds => { const el = doc.querySelector('[data-record-time]'); if (el) el.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2,'0')}`; },
      onComplete: file => { record = null; recordKey = null; if (current(saved)) void addFiles(key,[file]).catch(error => deps.notice(errorText(error),'warning')); hydrate(); },
      onError: error => { record?.cancel(); record = null; recordKey = null; hydrate(); deps.notice(errorText(error),'warning'); },
    });
    hydrate();
    try { await record.start(); } catch (error) { record = null; recordKey = null; hydrate(); throw error; }
  }
  async function sendAttachments({ key, messageId, threadId, body, quoteId, parentId }) {
    const selected = [...fileList(key)], saved = scopeNow();
    if (!selected.length) return false;
    busy.add(key); hydrate();
    try {
      await sendMessageFiles({ client: client(), companyId: deps.getCompanyId(), userId: deps.getUserId(), threadId, messageId, body, quoteId, parentId, files: selected,
        current: () => current(saved), progress: text => { doc.querySelectorAll('.message-send-state').forEach(node => { node.textContent = text; }); } });
      if (current(saved)) { files.set(key, fileList(key).filter(file => !selected.includes(file))); hydrate(); }
      return true;
    } finally { busy.delete(key); hydrate(); }
  }
  async function cleanupPendingUploads() {
    const saved = scopeNow(), company = deps.getCompanyId(), user = deps.getUserId();
    const { data, error } = await client().from('message_files').select('id,object_path').eq('company_id', company).eq('user_id', user).is('message_id',null)
      .lt('created_at',new Date(Date.now()-86400000).toISOString()).limit(30);
    if (error || !current(saved)) return;
    for (const row of data || []) { if (!current(saved)) return; await removePendingFile(client(), { id: row.id, path: row.object_path, saved: true }).catch(() => {}); }
  }

  function openSearch(threadId = '') {
    search.thread = threadId; search.page = 0;
    makeDialog('Search messages', `<form class="message-search-form"><label>Search<input name="query" type="search" maxlength="300" value="${escape(search.text)}" placeholder="Words in a message" autofocus></label>
      <div class="message-search-filters"><label>Conversation<select name="thread"><option value="">All conversations</option>${deps.getThreads().map(t => `<option value="${t.id}" ${t.id === search.thread ? 'selected' : ''}>${escape(deps.threadTitle(t))}</option>`).join('')}</select></label><label>From<select name="sender"><option value="">Anyone</option>${deps.getMembers().map(m => `<option value="${m.user_id}" ${m.user_id === search.sender ? 'selected' : ''}>${escape(deps.name(m.user_id))}</option>`).join('')}</select></label><label>Since<input name="since" type="date" value="${escape(search.since)}"></label></div>
      <button type="submit">Search</button></form><div class="message-search-results" aria-live="polite"></div>`);
    if (search.text) void runSearch().catch(error => deps.notice(errorText(error),'warning'));
  }
  async function runSearch() {
    const form = dialog?.querySelector('.message-search-form');
    if (!form) return;
    search = { ...search, text: form.elements.query.value.trim(), sender: form.elements.sender.value, since: form.elements.since.value, thread: form.elements.thread.value };
    const results = dialog.querySelector('.message-search-results'), version = ++searchVersion, saved = scopeNow();
    if (!search.text) { html(results, '<p>Enter words to search messages.</p>'); return; }
    results.textContent = 'Searching...';
    const { data, error } = await client().rpc('search_company_messages', { target_company: deps.getCompanyId(), search_text: search.text, page_offset: search.page * 12,
      target_thread: search.thread || null, target_sender: search.sender || null, since_date: search.since ? `${search.since}T00:00:00` : null });
    if (version !== searchVersion || !current(saved) || !results.isConnected) return;
    if (error) { results.textContent = errorText(error); return; }
    html(results, (data?.length ? data.slice(0,12).map(row => `<button class="message-search-result" data-search-message="${row.id}" data-parent-id="${row.parent_message_id || ''}" data-thread-id="${row.thread_id}" type="button"><strong>${escape(row.title)}</strong><span>${escape(row.body)}</span><small>${escape(deps.name(row.sender_id))} / ${escape(deps.time(row.created_at))}</small></button>`).join('') : '<p>No matching messages.</p>') +
      `<nav class="message-search-pages" aria-label="Search result pages"><button data-search-page="${search.page-1}" type="button" ${search.page ? '' : 'disabled'}>Previous</button><span>Page ${search.page+1}</span><button data-search-page="${search.page+1}" type="button" ${data?.length>12 ? '' : 'disabled'}>Next</button></nav>`);
  }

  async function openDiscussion(messageId, threadId, highlight = '', fromSearch = false) {
    const source = deps.getMessage(messageId);
    threadId = threadId || source?.thread_id;
    if (!threadId) return;
    const children = deps.getMetadata(threadId).filter(row => row.parent_message_id === messageId).sort((a,b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id));
    const position = children.findIndex(row => row.id === highlight);
    makeDialog('Message thread', `${fromSearch ? '<button class="text-button" data-back-message-search type="button">Back to search results</button>' : ''}<div class="message-discussion-history" tabindex="0" aria-label="Thread replies" role="region"></div><div class="message-discussion-paging"></div>
      ${deps.canEdit() ? `<form class="message-discussion-form" data-attachment-key="discussion:${messageId}"><label class="sr-only" for="discussion-body">Thread reply</label><div class="message-compose-line"><textarea id="discussion-body" name="body" maxlength="12000" placeholder="Reply in this thread..." required></textarea><button class="message-icon-button message-send-button" type="submit" aria-label="Send thread reply" title="Send thread reply">${icon('send')}</button></div>${renderTools(`discussion:${messageId}`)}<span class="message-send-state" role="status"></span><p class="error-text" role="alert"></p></form>` : ''}`);
    discussion = { root: messageId, thread: threadId, page: Math.max(0,Math.floor(position / 50)), rows: [], highlight, fromSearch };
    const body = dialog.querySelector('[name="body"]');
    if (body) body.value = drafts.get(messageId) || '';
    dialog.querySelector('header')?.insertAdjacentElement('beforeend', Object.assign(doc.createElement('button'), { type: 'button', textContent: 'Open conversation', onclick: () => { const id = discussion.thread; closeDialog(); void deps.openConversation(id); } }));
    hydrate(); await loadDiscussion();
  }
  async function loadDiscussion(preserve = false) {
    if (!discussion || !dialog) return;
    const state = discussion, version = ++discussionVersion, saved = scopeNow();
    const list = dialog.querySelector('.message-discussion-history');
    const top = list.scrollTop, bottom = list.scrollHeight - list.clientHeight - top < 60;
    const rootResult = await client().from('messages').select(SELECT).eq('company_id',deps.getCompanyId()).eq('thread_id',state.thread).eq('id',state.root).maybeSingle();
    const result = await client().from('messages').select(SELECT).eq('company_id',deps.getCompanyId()).eq('thread_id',state.thread).eq('parent_message_id',state.root).is('deleted_at',null)
      .order('created_at',{ ascending:false }).order('id',{ascending:false}).range(state.page*50,state.page*50+50);
    if (!current(saved) || version !== discussionVersion || discussion !== state || !list.isConnected) return;
    if (rootResult.error || result.error) { list.textContent = errorText(rootResult.error || result.error); return; }
    state.rows = [rootResult.data, ...(result.data || []).slice(0,50).reverse()].filter(Boolean);
    html(list, state.rows.map((row,index) => row.deleted_at ? '<p>Original message unavailable.</p>' : deps.renderBubble(row, index>1 && state.rows[index-1]?.sender_id===row.sender_id, true)).join('') || '<p>Message unavailable.</p>');
    html(dialog.querySelector('.message-discussion-paging'), `<button data-discussion-page="${state.page+1}" type="button" ${result.data?.length>50 ? '' : 'disabled'}>Earlier replies</button><span>Page ${state.page+1}</span><button data-discussion-page="${state.page-1}" type="button" ${state.page ? '' : 'disabled'}>Later replies</button>`);
    const form = dialog.querySelector('.message-discussion-form');
    if (form) form.hidden = !rootResult.data || Boolean(rootResult.data.deleted_at);
    deps.bindWorkflow(list);
    if (state.highlight) { list.querySelector(`[data-message-id="${CSS.escape(state.highlight)}"]`)?.scrollIntoView({ block:'center' }); state.highlight = ''; }
    else list.scrollTop = preserve && !bottom ? top : list.scrollHeight;
    if (!doc.hidden && (!preserve || bottom)) await deps.markRead(state.thread, state.rows.at(-1)?.created_at);
  }
  async function sendDiscussion(form) {
    if (!discussion || busy.has('discussion')) return;
    const state = discussion, saved = scopeNow(), body = form.elements.body.value.trim(), key = `discussion:${state.root}`;
    if (!body && !fileList(key).length) return;
    busy.add('discussion'); const button = form.querySelector('[type="submit"]'); button.disabled = true;
    const signature = JSON.stringify([body,fileList(key).map(file=>file.id)]);
    if (state.sendSignature !== signature) { state.sendSignature = signature; state.sendId = crypto.randomUUID(); }
    try {
      if (!await sendAttachments({ key, messageId: state.sendId, threadId: state.thread, body, parentId: state.root })) {
        const result = await client().from('messages').insert({ id: state.sendId, company_id:deps.getCompanyId(), thread_id:state.thread, sender_id:deps.getUserId(), body, parent_message_id:state.root });
        if (result.error?.code === '23505') {
          const prior = await client().from('messages').select('sender_id,body,parent_message_id').eq('id',state.sendId).eq('company_id',deps.getCompanyId()).eq('thread_id',state.thread).single();
          if (prior.error || prior.data.sender_id !== deps.getUserId() || prior.data.body !== body || prior.data.parent_message_id !== state.root) throw result.error;
        } else if (result.error) throw result.error;
      }
      if (!current(saved)) return;
      state.sendId = null; state.sendSignature = '';
      if (form.elements.body.value.trim() === body) form.elements.body.value = '';
      await deps.reload();
      if (state === discussion) { state.page=0; await loadDiscussion(); }
    } catch (error) { form.querySelector('.error-text').textContent = errorText(error); }
    finally { busy.delete('discussion'); if (button.isConnected) button.disabled = false; }
  }
  async function openFile(id, messageId) {
    const row = deps.getMessage(messageId) || discussion?.rows.find(row => row.id === messageId);
    const file = row?.message_files?.find(file => file.id === id);
    if (!file) return;
    const saved = scopeNow();
    const node = doc.createElement('dialog'); node.className = 'message-tool-dialog message-media-dialog';
    const heading = doc.createElement('h2'); heading.textContent = file.file_name;
    const close = doc.createElement('button'); close.type='button'; close.textContent='Close';
    const status = doc.createElement('p'); status.textContent='Loading attachment...'; node.append(heading,close,status); doc.body.append(node); node.showModal();
    const preview = { node, url:null }; previews.add(preview);
    const cleanup = () => { URL.revokeObjectURL(preview.url); previews.delete(preview); node.remove(); };
    close.onclick=cleanup; node.addEventListener('cancel',event=>{event.preventDefault();cleanup();});
    const { data,error } = await client().storage.from('message-files').download(file.object_path);
    if (!current(saved) || !node.isConnected) return;
    if (error) { status.textContent=errorText(error); return; }
    preview.url=URL.createObjectURL(data); status.remove();
    if (file.content_type.startsWith('image/')) { const img=doc.createElement('img'); img.src=preview.url; img.alt=file.file_name; node.append(img); }
    else if (file.content_type.startsWith('audio/')) {
      const audio=doc.createElement('audio'); audio.controls=true; audio.preload='metadata'; audio.src=preview.url;
      audio.addEventListener('error',()=>{ status.textContent='Audio preview unavailable in this browser. Download the file to listen.'; node.append(status); });
      node.append(audio); audio.load();
    }
    const download=doc.createElement('a'); download.href=preview.url; download.download=file.file_name; download.textContent='Download file'; node.append(download);
  }
  async function organize(threadId, favorite, label) {
    if (busy.has('organization')) return;
    busy.add('organization');
    const actions = doc.querySelector('.message-header-actions');
    actions?.querySelector('details')?.removeAttribute('open');
    if (actions) actions.inert = true;
    const saved=scopeNow();
    try {
      const {error}=await client().rpc('organize_my_conversation',{target_thread:threadId,is_favorite:favorite,section_label:label||null});
      if(error) throw error;
      if(current(saved)) { await deps.reload(); deps.render(); }
    } finally { busy.delete('organization'); if (actions) actions.inert = false; }
  }
  function liveUpdate() {
    if (!discussion) return;
    clearTimeout(refreshTimer); refreshTimer=setTimeout(async()=>{ if(refreshing) return; refreshing=true; try { await loadDiscussion(true); } catch {} finally { refreshing=false; } },180);
  }
  doc.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button || button.disabled) return;
    const run=async()=>{
      if(button.hasAttribute('data-search-messages')) openSearch(button.dataset.searchMessages);
      if(button.hasAttribute('data-close-message-dialog')) closeDialog();
      if(button.hasAttribute('data-back-message-search')) openSearch(search.thread);
      if(button.hasAttribute('data-search-page')) { clearTimeout(searchTimer); search.page=Number(button.dataset.searchPage); await runSearch(); }
      if(button.hasAttribute('data-search-message')) await openDiscussion(button.dataset.parentId||button.dataset.searchMessage,button.dataset.threadId,button.dataset.searchMessage,true);
      if(button.hasAttribute('data-open-message-discussion')) await openDiscussion(button.dataset.openMessageDiscussion);
      if(button.hasAttribute('data-discussion-page') && discussion) { discussion.page=Number(button.dataset.discussionPage); await loadDiscussion(); }
      if(button.hasAttribute('data-open-message-file')) await openFile(button.dataset.openMessageFile,button.dataset.messageId);
      if(button.hasAttribute('data-choose-message-files')) button.closest('.message-attachments').querySelector('input[type="file"]').click();
      if(button.hasAttribute('data-record-message')) await recordVoice(button.closest('.message-attachments').dataset.attachmentKey);
      if(button.hasAttribute('data-stop-recording')) record?.stop();
      if(button.hasAttribute('data-cancel-recording')) {record?.cancel();record=null;recordKey=null;hydrate();}
      if(button.hasAttribute('data-remove-pending-file')) { const key=button.dataset.fileKey; if(busy.has(key))return; const file=fileList(key).find(file=>file.id===button.dataset.removePendingFile); if(file){await removePendingFile(client(),file);files.set(key,fileList(key).filter(item=>item!==file));hydrate();} }
      if(button.hasAttribute('data-favorite-conversation')) { const thread=deps.getThreads().find(t=>t.id===button.dataset.favoriteConversation); if(thread)await organize(thread.id,!thread.preferences?.favorite,thread.preferences?.section_name); }
      if(button.hasAttribute('data-save-message-section')) { const thread=deps.getThreads().find(t=>t.id===button.dataset.saveMessageSection); if(thread)await organize(thread.id,null,button.closest('.message-menu-items').querySelector('[data-message-section-name]').value); }
    };
    void run().catch(error=>deps.notice(errorText(error),'warning'));
  });
  doc.addEventListener('change',event=>{
    const input=event.target;
    if(input.matches('[data-message-files]')) { const key=input.closest('.message-attachments').dataset.attachmentKey; void addFiles(key,[...input.files]).catch(error=>deps.notice(errorText(error),'warning')); }
    if(input.matches('[data-message-section-filter]')) {section=input.value;deps.render();}
    if(input.matches('.message-search-form select,.message-search-form [name="since"]')) {search.page=0;void runSearch().catch(error=>deps.notice(errorText(error),'warning'));}
  });
  doc.addEventListener('input',event=>{if(event.target.matches('.message-search-form [name="query"]')) {clearTimeout(searchTimer);search.page=0;searchTimer=setTimeout(()=>void runSearch().catch(error=>deps.notice(errorText(error),'warning')),300);}});
  doc.addEventListener('submit',event=>{
    if(event.target.matches('.message-search-form')) {event.preventDefault();search.page=0;void runSearch().catch(error=>deps.notice(errorText(error),'warning'));}
    if(event.target.matches('.message-discussion-form')) {event.preventDefault();void sendDiscussion(event.target);}
  });
  function findDirectConversation(userId) {
    const members = deps.getThreadMembers();
    return deps.getThreads().find(thread => thread.thread_type === 'direct' && thread.title === 'Direct message' && !thread.work_order_id
      && members.filter(member => member.thread_id === thread.id).length === 2
      && members.some(member => member.thread_id === thread.id && member.user_id === userId));
  }
  return { hydrate, reset, renderTools, sendAttachments, fileList, getSection:()=>section, cleanupPendingUploads, liveUpdate, findDirectConversation,
    getMessage: id => discussion?.rows.find(row=>row.id===id), closeDialog };
}
