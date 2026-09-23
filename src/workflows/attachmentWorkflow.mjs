import { prepareAttachments, ATTACHMENT_LIMITS } from '../services/attachmentFiles.mjs';

export function createAttachmentWorkflow(deps, media = {}) {
  const doc = deps.documentRef || document;
  const targets = {
    work: { table: 'work_order_documents', bucket: 'work-order-documents', key: 'work_order_id' },
    asset: { table: 'asset_documents', bucket: 'asset-documents', key: 'asset_id' },
    part: { table: 'part_documents', bucket: 'part-documents', key: 'part_id' },
  };
  let active = null;
  const suspended = new Map();
  const documentMounts = new WeakMap();
  const documentDeletes = new Map();
  const reviewKey = context => JSON.stringify([context.scope, context.kind, context.companyId, context.recordId, context.userId]);
  function element(tag, text, parent, className) {
    const el = doc.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    parent?.append(el);
    return el;
  }
  const bytes = value => value < 1024 ? `${value} B` : value < 1024 * 1024 ? `${(value / 1024).toFixed(1)} KB` : `${(value / 1024 / 1024).toFixed(2)} MB`;
  const current = scope => deps.getScope() === scope;
  const assertScope = scope => { if (!current(scope)) throw new Error('Workspace changed. Reopen attachments on the intended record.'); };
  const timed = (promise, label) => deps.withOperationTimeout(promise, `${label} timed out. Please retry.`, 30000);
  const errorOf = result => { if (!result) throw new Error('No response received.'); if (result.error) throw result.error; return result.data; };
  const messageOf = error => error?.message || String(error || 'The operation failed.');
  const duplicate = error => ['409', 'Duplicate', '23505'].includes(String(error?.statusCode || error?.code)) || /already exists|duplicate/i.test(error?.message || '');
  const rejected = result => {
    const status = Number(result?.status || result?.error?.statusCode);
    return (status >= 400 && status < 500 && status !== 408) || /^(22|23|28|42|44)\w{3}$/.test(result?.error?.code || '');
  };

  // Keep the actual request, not just the timeout race. A late commit must finish
  // before retry or cleanup can make a conflicting storage/database mutation.
  async function mutate(owner, key, start, label) {
    owner.operations ||= {};
    owner.uncertain ||= new Set();
    let operation = owner.operations[key];
    if (!operation || (operation.settled && operation.result.error)) {
      operation = { settled: false };
      owner.operations[key] = operation;
      operation.promise = Promise.resolve().then(() => {
        if (owner.scope !== undefined) assertScope(owner.scope);
        return start();
      }).catch(error => ({ error })).then(result => {
        operation.result = result || { error: new Error('No response received.') };
        operation.settled = true;
        if (!operation.result.error) owner.uncertain.delete(key);
        else if (!rejected(operation.result)) owner.uncertain.add(key);
        return operation.result;
      });
    }
    return timed(operation.promise, label);
  }

  async function settle(upload) {
    for (const operation of Object.values(upload.operations || {})) {
      if (!operation.settled) await timed(operation.promise, 'Previous attachment request');
    }
  }

  async function savedItem(item, context) {
    item.state = 'saved'; item.error = '';
    if (context.kind !== 'work' || !item.type.startsWith('image/')) return;
    try {
      assertScope(context.scope);
      const result = await mutate(item.upload, 'history', () => item.upload.client.from('work_order_events').insert({
        id: item.id, company_id: context.companyId, work_order_id: context.recordId, actor_id: context.userId,
        event_type: 'photo_uploaded', summary: `Photo uploaded: ${item.file.name}.`,
      }), 'Photo history');
      if (result.error && !duplicate(result.error)) throw result.error;
      item.warning = '';
    } catch { item.warning = 'Attached, but the photo history entry could not be confirmed.'; }
  }

  async function findSaved(item, context) {
    const { client, target, path } = item.upload;
    assertScope(context.scope);
    const rows = errorOf(await timed(client.from(target.table).select(`id,storage_path,${target.key}`).eq('company_id', context.companyId).eq('id', item.id), 'Attachment check'));
    assertScope(context.scope);
    if (!Array.isArray(rows)) throw new Error('Could not verify the attachment record.');
    if (rows.some(row => row.storage_path !== path || row[target.key] !== context.recordId)) throw new Error('Attachment ID conflict. Existing files were not changed.');
    return rows.length > 0;
  }

  async function saveItem(item, context) {
    const { scope, kind, recordId, companyId, userId } = context;
    assertScope(scope);
    if (!deps.canEdit(kind)) throw new Error('You do not have permission to attach files here.');
    if (item.upload) {
      await settle(item.upload);
      assertScope(scope);
      const cleanup = item.upload.operations?.cleanup;
      if (cleanup && !cleanup.result.error) delete item.upload;
      else if (item.upload.uncertain?.has('cleanup')) throw new Error('Unfinished cleanup is not confirmed. Try Cancel again before attaching.');
    }
    const photo = item.type.startsWith('image/');
    const target = kind === 'work' && photo ? { table: 'work_order_photos', bucket: 'work-order-photos', key: 'work_order_id' } : targets[kind];
    if (!item.upload) {
      const image = photo ? new File([item.file], item.file.name, { type: item.type, lastModified: item.file.lastModified }) : null;
      const optimized = photo ? await timed(deps.optimizePhoto(image, kind === 'work' ? {
        acceptAnyImage: true, targetBytes: 256 * 1024, passes: [{ maxDimension: 768, quality: 0.78 }, { maxDimension: 768, quality: 0.74 }, { maxDimension: 768, quality: 0.70 }],
      } : { acceptAnyImage: true }), 'Photo processing') : { blob: item.file, fileName: item.file.name, contentType: item.type };
      assertScope(scope);
      const limit = kind === 'work' && photo ? 5 * 1024 * 1024 : ATTACHMENT_LIMITS.file;
      if (optimized.blob.size > limit) throw new Error('File is still too large after processing.');
      const fileName = deps.safeFileName(optimized.fileName).slice(0, 190);
      const path = `${companyId}/${recordId}/${item.id}-${fileName}`;
      item.upload = { target, path, optimized, scope, client: deps.client(), row: {
        id: item.id, company_id: companyId, [target.key]: recordId, uploaded_by: userId,
        storage_path: path, file_name: fileName, content_type: optimized.contentType,
        file_size_bytes: optimized.blob.size, original_file_name: item.file.name, original_size_bytes: item.file.size,
        ...(kind !== 'work' ? { document_type: photo ? (kind === 'asset' ? 'machine_photo' : 'part_photo') : 'other' } : {}),
      } };
    }
    const { path, optimized, row } = item.upload;
    const client = item.upload.client;
    // Stable row IDs and paths let a retry reconcile an acknowledged or timed-out save.
    if (await findSaved(item, context)) { await savedItem(item, context); return; }
    assertScope(scope);
    if (!deps.canEdit(kind)) throw new Error('You do not have permission to attach files here.');
    const uploaded = await mutate(item.upload, 'upload', () => client.storage.from(target.bucket).upload(path, optimized.blob, { contentType: optimized.contentType, upsert: false }), 'Attachment upload');
    if (uploaded.error && !duplicate(uploaded.error)) throw uploaded.error;
    item.upload.uncertain?.delete('upload');
    assertScope(scope);
    if (!deps.canEdit(kind)) throw new Error('You do not have permission to attach files here.');
    const inserted = await mutate(item.upload, 'record', () => client.from(target.table).insert(row), 'Attachment record save');
    if (inserted.error && !await findSaved(item, context)) throw inserted.error;
    await savedItem(item, context);
  }

  async function open(context, files) {
    cancelStale();
    if (active) { active.dialog.focus(); return; }
    assertScope(context.scope);
    context = { ...context };
    const key = reviewKey(context);
    const previous = suspended.get(key);
    if (previous) {
      suspended.delete(key); active = previous; previous.hidden = false;
      doc.body.append(previous.dialog); previous.dialog.showModal();
      previous.redraw();
      deps.showNotice('Resumed the unfinished attachment review. New selections were not added.', 'warning');
      return;
    }
    if (!targets[context.kind] || !context.companyId || !context.recordId || !context.userId) throw new Error('Choose a record before attaching files.');
    if (!files.length) { deps.showNotice('Choose photos or files first.', 'warning'); return; }
    const dialog = element('dialog', undefined, doc.body, 'attachment-dialog');
    dialog.setAttribute('aria-labelledby', 'attachment-review-title');
    const heading = element('h2', 'Review attachments', dialog); heading.id = 'attachment-review-title';
    const status = element('p', 'Reading files...', dialog); status.setAttribute('role', 'status');
    const list = element('ul', undefined, dialog, 'attachment-review-list');
    const notes = element('div', undefined, dialog, 'attachment-review-notes');
    const actions = element('div', undefined, dialog, 'attachment-review-actions');
    const cancel = element('button', 'Cancel', actions, 'secondary-button'); cancel.type = 'button';
    const submit = element('button', 'Attach files', actions, 'primary-button'); submit.type = 'button'; submit.disabled = true;
    const later = element('button', 'Close for now', actions, 'secondary-button'); later.type = 'button'; later.hidden = true;
    const controller = new AbortController();
    const state = { dialog, context, controller, busy: false, preparing: true, items: [], issues: [], confirmedIssues: false, choices: [] };
    active = state;
    later.onclick = () => {
      if (state.busy) return;
      hide(state, true);
      deps.showNotice('Unfinished attachments are retained for this record. Reopen attachments to retry or clean up.', 'warning');
    };
    const close = async () => {
      if (state.busy) return;
      state.busy = true; controller.abort(); redraw();
      // A failed record save must not silently leave an unlinked storage object behind.
      // Reconcile first, since a timeout can occur after the database committed.
      try {
        for (const item of state.items.filter(item => item.upload)) {
          assertScope(context.scope);
          if (item.state === 'saved') { await savedItem(item, context); continue; }
          await settle(item.upload);
          assertScope(context.scope);
          const { target, path, client } = item.upload;
          if (await findSaved(item, context)) await savedItem(item, context);
          else {
            // A missing row is not proof of rollback after a lost response.
            if (item.upload.uncertain?.has('record') || item.upload.uncertain?.has('upload')) throw new Error('A previous save is still unconfirmed. Retry attaching before cleanup.');
            if (item.upload.operations?.record && !item.upload.operations.record.result.error) throw new Error('A saved attachment is no longer visible. Its file was preserved.');
            assertScope(context.scope);
            const uploadResult = item.upload.operations?.upload?.result;
            if (uploadResult && (!uploadResult.error || duplicate(uploadResult.error))) errorOf(await mutate(item.upload, 'cleanup', () => client.storage.from(target.bucket).remove([path]), 'Unfinished attachment cleanup'));
            delete item.upload;
          }
        }
      } catch (error) {
        state.busy = false; later.hidden = false; redraw();
        status.textContent = `Could not confirm unfinished attachment cleanup: ${messageOf(error)} Try Done or Cancel again.`;
        cancelStale();
        return;
      }
      state.busy = false; hide(state, false);
      if (state.items.some(item => item.state === 'saved') && current(context.scope)) {
        try { await deps.render(); }
        catch (error) { deps.showNotice(`Attachments saved, but the view could not refresh: ${messageOf(error)}`, 'warning'); }
      }
    };
    cancel.onclick = close;
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('close', () => {
      if (state.hidden || dialog.open) return;
      if (current(context.scope)) { dialog.showModal(); if (!state.busy) close(); }
      else hide(state, state.busy || state.items.some(item => item.upload));
    });
    const redraw = () => {
      list.replaceChildren();
      for (const item of state.items) {
        const row = element('li', undefined, list);
        element('strong', item.file.name, row);
        element('span', `${item.type.startsWith('image/') ? 'Photo' : item.type === 'application/zip' ? 'ZIP archive' : 'Document'} - ${bytes(item.file.size)}`, row);
        if (item.source) element('small', item.source, row);
        if (item.error || item.warning) element('small', item.error || item.warning, row, 'error-text');
        element('span', item.state === 'saved' ? 'Attached' : item.state === 'uploading' ? 'Uploading...' : 'Ready', row);
      }
      const remaining = state.items.filter(item => item.state !== 'saved').length;
      submit.textContent = remaining ? `Attach ${remaining} file${remaining === 1 ? '' : 's'}` : 'All attached';
      submit.disabled = state.busy || state.preparing || !remaining || !current(context.scope) || (state.issues.length > 0 && !state.confirmedIssues);
      cancel.disabled = state.busy; later.disabled = state.busy;
      for (const { input, archive } of state.choices) input.disabled = state.busy || Boolean(archive?.upload) || archive?.state === 'saved';
      cancel.textContent = state.items.some(item => item.state === 'saved') ? 'Done' : 'Cancel';
    };
    state.redraw = redraw;
    submit.onclick = async () => {
      if (state.busy || state.preparing || active !== state || !current(context.scope) || (state.issues.length && !state.confirmedIssues)) return;
      state.busy = true; cancel.disabled = true; redraw();
      try {
        for (const item of state.items.filter(item => item.state !== 'saved')) {
          assertScope(context.scope);
          item.state = 'uploading'; item.error = ''; status.textContent = `Uploading ${item.file.name}`; redraw();
          try { await saveItem(item, context); }
          catch (error) {
            if (item.state !== 'saved') item.state = 'ready';
            item.error = messageOf(error);
            if (current(context.scope)) {
              try { await media.reportUploadFailure?.(`${context.kind} attachment`, item.file, error); }
              catch { /* A reporting failure must not hide the original upload error. */ }
            }
          }
          redraw();
        }
        const saved = state.items.filter(item => item.state === 'saved').length;
        status.textContent = `${saved} of ${state.items.length} attached.${saved < state.items.length ? ' Retry to send only the remaining files.' : ''}`;
      } catch (error) { status.textContent = messageOf(error); }
      finally { state.busy = false; redraw(); cancelStale(); }
    };
    try {
      dialog.showModal();
      const timer = setTimeout(() => controller.abort(), 30000);
      let prepared;
      try { prepared = await prepareAttachments(files, { signal: controller.signal, onProgress: message => { status.textContent = message; } }); }
      finally { clearTimeout(timer); }
      if (active !== state) return;
      assertScope(context.scope);
      state.items = prepared.items; state.issues = prepared.issues; state.preparing = false;
      status.textContent = state.items.length ? `${state.items.length} attachment${state.items.length === 1 ? '' : 's'} ready.` : 'No files are ready to attach.';
      for (const issue of prepared.issues) element('p', issue, notes);
      for (const archive of prepared.archives) {
        const label = element('label', undefined, notes, 'check-row');
        const input = element('input', undefined, label); input.type = 'checkbox';
        state.choices.push({ input, archive });
        element('span', `Attach ${archive.file.name} as an original ZIP instead`, label);
        input.onchange = () => {
          const selected = state.items.includes(archive);
          if (state.busy || archive.upload || archive.state === 'saved' || !current(context.scope)) { input.checked = selected; return; }
          if (input.checked && !selected && state.items.length >= ATTACHMENT_LIMITS.files) {
            input.checked = false; status.textContent = 'A batch can contain up to 50 files.'; return;
          }
          state.items = state.items.filter(item => item.id !== archive.id);
          if (input.checked) state.items.push(archive);
          redraw();
        };
      }
      if (prepared.issues.length) {
        const label = element('label', undefined, notes, 'check-row');
        const input = element('input', undefined, label); input.type = 'checkbox';
        state.choices.push({ input });
        element('span', 'I reviewed the files that could not be unpacked or included.', label);
        input.onchange = () => { if (state.busy) { input.checked = state.confirmedIssues; return; } state.confirmedIssues = input.checked; redraw(); };
      }
      redraw();
    } catch (error) {
      state.preparing = false;
      if (active === state) { status.textContent = messageOf(error); redraw(); }
      if (!dialog.open && !state.hidden) hide(state, false);
      cancelStale();
    }
  }

  function hide(state, retain) {
    state.hidden = true;
    if (!retain) state.controller.abort();
    state.dialog.close(); state.dialog.remove();
    if (active === state) active = null;
    if (retain) suspended.set(reviewKey(state.context), state);
    else suspended.delete(reviewKey(state.context));
  }

  function cancelStale() {
    if (active && !current(active.context.scope)) {
      hide(active, active.busy || active.items.some(item => item.upload));
    }
  }

  async function mountDocuments(container, context) {
    const { scope, companyId, recordId } = context;
    const mount = {};
    documentMounts.set(container, mount);
    const connected = () => container.isConnected && current(scope) && documentMounts.get(container) === mount;
    const client = deps.client();
    let page = 0;
    let generation = 0;
    let loading = false;
    const load = async () => {
      if (!connected() || loading) return;
      loading = true;
      const request = ++generation;
      const visible = () => connected() && generation === request;
      const requestedPage = page;
      container.replaceChildren();
      const status = element('p', 'Loading files...', container); status.setAttribute('role', 'status');
      try {
        const result = await timed(client.from('work_order_documents').select('*', { count: 'exact' }).eq('company_id', companyId).eq('work_order_id', recordId).order('created_at', { ascending: false }).order('id').range(requestedPage * 12, requestedPage * 12 + 11), 'Work order files');
        errorOf(result);
        if (!visible()) return;
        if (!Array.isArray(result.data) || !Number.isFinite(result.count)) throw new Error('Incomplete document list response.');
        const lastPage = Math.max(0, Math.ceil(result.count / 12) - 1);
        if (page > lastPage) { page = lastPage; loading = false; await load(); return; }
        status.textContent = result.count ? `${result.count} document${result.count === 1 ? '' : 's'}` : 'No documents attached.';
        const rows = [...result.data];
        for (const job of documentDeletes.values()) {
          if (job.scope === scope && job.companyId === companyId && job.recordId === recordId && !rows.some(row => row.id === job.row.id)) rows.push(job.row);
        }
        for (const row of rows) {
          const deleteKey = JSON.stringify([scope, companyId, recordId, row.id]);
          let job = documentDeletes.get(deleteKey);
          const item = element('article', undefined, container, 'attachment-document-row');
          element('strong', row.original_file_name || row.file_name, item);
          element('small', `${bytes(row.file_size_bytes)} - ${deps.userName(row.uploaded_by)}`, item);
          if (job?.error) element('small', job.error, item, 'error-text');
          if (job) { job.refresh ||= new Set(); job.refresh.add(load); }
          const download = element('button', 'Download file', item, 'secondary-button'); download.type = 'button';
          download.disabled = Boolean(job);
          download.onclick = async () => {
            if (download.disabled || !visible() || documentDeletes.has(deleteKey)) return;
            download.disabled = true;
            try {
              assertScope(scope);
              const signed = errorOf(await timed(client.storage.from('work-order-documents').createSignedUrl(row.storage_path, 60, { download: row.file_name }), 'Download link'));
              if (!visible() || documentDeletes.has(deleteKey)) return;
              if (!signed?.signedUrl) throw new Error('The download link was not returned.');
              const link = element('a', undefined, doc.body);
              try { link.href = signed.signedUrl; link.download = row.file_name; link.rel = 'noopener noreferrer'; link.target = '_blank'; link.click(); }
              finally { link.remove(); }
            } catch (error) { if (visible()) status.textContent = messageOf(error); }
            finally { download.disabled = documentDeletes.has(deleteKey); }
          };
          if (deps.canDeleteDocument(row)) {
            const remove = element('button', job ? 'Retry deletion' : 'Delete file', item, 'text-button danger-link'); remove.type = 'button';
            remove.disabled = Boolean(job?.busy);
            remove.onclick = async () => {
              if (remove.disabled || !visible()) return;
              job = documentDeletes.get(deleteKey);
              if (job?.busy) return;
              remove.disabled = true; download.disabled = true;
              let finished = false;
              try {
                assertScope(scope);
                if (!deps.canDeleteDocument(row)) throw new Error('You do not have permission to delete this file.');
                if (!job && !deps.confirm(`Delete ${row.file_name}?`)) return;
                assertScope(scope);
                job ||= { row, scope, companyId, recordId, client };
                documentDeletes.set(deleteKey, job); job.busy = true; job.error = '';
                job.refresh ||= new Set(); job.refresh.add(load);
                // Never remove storage for a row whose delete was denied or merely
                // timed out. Preserve failed cleanup jobs even across a remount.
                const unconfirmed = job.uncertain?.has('record');
                const deleted = errorOf(await mutate(job, 'record', () => job.client.from('work_order_documents').delete().eq('company_id', companyId).eq('work_order_id', recordId).eq('id', row.id).eq('storage_path', row.storage_path).select('id'), 'File record removal'));
                if (deleted?.length !== 1 || deleted[0].id !== row.id) {
                  delete job.operations.record;
                  if (unconfirmed) job.uncertain.add('record');
                  if (!job.uncertain?.has('record')) documentDeletes.delete(deleteKey);
                  throw new Error('The file record removal was not confirmed. Its stored file was preserved.');
                }
                assertScope(scope);
                if (!deps.canDeleteDocument(row)) throw new Error('You do not have permission to delete this file.');
                errorOf(await mutate(job, 'cleanup', () => job.client.storage.from('work-order-documents').remove([row.storage_path]), 'File removal'));
                assertScope(scope);
                documentDeletes.delete(deleteKey);
                finished = true;
              } catch (error) {
                if (job) job.error = messageOf(error);
                if (job?.operations?.record?.settled && job.operations.record.result.error && !job.uncertain?.has('record')) documentDeletes.delete(deleteKey);
                if (visible()) status.textContent = `Could not finish deleting ${row.file_name}: ${messageOf(error)}`;
              } finally {
                if (job) job.busy = false;
                remove.disabled = false; download.disabled = documentDeletes.has(deleteKey);
                remove.textContent = documentDeletes.has(deleteKey) ? 'Retry deletion' : 'Delete file';
                for (const refresh of job?.refresh || []) {
                  if (finished || refresh !== load || !visible()) await refresh();
                }
                if (finished && connected()) {
                  try { await deps.render(); }
                  catch (error) { deps.showNotice(`File deleted, but the view could not refresh: ${messageOf(error)}`, 'warning'); }
                }
              }
            };
          }
        }
        if (result.count > 12) {
          const pager = element('div', undefined, container, 'attachment-review-actions');
          const prev = element('button', 'Previous', pager, 'secondary-button'); prev.type = 'button'; prev.disabled = page === 0; prev.onclick = () => { if (!visible() || loading || prev.disabled) return; page--; return load(); };
          element('span', `${page + 1} / ${Math.ceil(result.count / 12)}`, pager);
          const next = element('button', 'Next', pager, 'secondary-button'); next.type = 'button'; next.disabled = (page + 1) * 12 >= result.count; next.onclick = () => { if (!visible() || loading || next.disabled) return; page++; return load(); };
        }
      } catch (error) {
        if (!visible()) return;
        container.replaceChildren(status);
        status.textContent = `Could not load documents: ${messageOf(error)}`;
        const retry = element('button', 'Retry', container, 'secondary-button'); retry.type = 'button'; retry.onclick = load;
      } finally { loading = false; }
    };
    await load();
  }

  async function removeWorkDocuments(id, context) {
    const { scope, companyId } = context;
    assertScope(scope);
    const client = deps.client();
    const paths = [];
    for (let page = 0; ; page++) {
      assertScope(scope);
      const data = errorOf(await timed(client.from('work_order_documents').select('storage_path').eq('company_id', companyId).eq('work_order_id', id).order('id').range(page * 100, page * 100 + 99), 'Work order file listing'));
      assertScope(scope);
      if (!Array.isArray(data)) throw new Error('Could not verify the work order file list.');
      paths.push(...data.map(row => row.storage_path)); if (data.length < 100) break;
      if (page >= 100) throw new Error('Too many attachments to remove in one operation.');
    }
    // The caller invokes cleanup only after confirming the work-order row delete.
    // Snapshot paths first because its document rows may be cascade-deleted.
    return async () => {
      assertScope(scope);
      for (let start = 0; start < paths.length; start += 100) {
        assertScope(scope);
        errorOf(await timed(client.storage.from('work-order-documents').remove(paths.slice(start, start + 100)), 'Work order file cleanup'));
        assertScope(scope);
      }
    };
  }
  return { open, cancelStale, mountDocuments, removeWorkDocuments };
}
