const assert = require('node:assert/strict');

// Local DOM and Supabase protocol doubles only: no browser session or network.
class Element {
  constructor(tag, ownerDocument) {
    Object.assign(this, { tagName: tag, ownerDocument, children: [], handlers: {}, disabled: false, hidden: false, open: false, value: '' });
  }
  get textContent() { return this.value + this.children.map(child => child.textContent).join(' '); }
  set textContent(value) { this.replaceChildren(); this.value = String(value); }
  get isConnected() { return this === this.ownerDocument.body || Boolean(this.parent?.isConnected); }
  append(child) { child.remove(); child.parent = this; this.children.push(child); }
  replaceChildren(...children) { for (const child of [...this.children]) child.remove(); this.value = ''; children.forEach(child => this.append(child)); }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter(child => child !== this); this.parent = null; }
  setAttribute(name, value) { this[name] = value; }
  addEventListener(name, handler) { (this.handlers[name] ||= []).push(handler); }
  dispatch(name) { const event = { preventDefault() { this.defaultPrevented = true; } }; for (const handler of this.handlers[name] || []) handler(event); return event; }
  showModal() { this.open = true; }
  close() { if (!this.open) return; this.open = false; this.dispatch('close'); }
  focus() { this.focused = true; }
  click() {
    if (this.disabled) return;
    if (this.tagName === 'a') this.ownerDocument.downloads.push({ href: this.href, download: this.download });
    return this.onclick?.();
  }
}

const walk = element => [element, ...element.children.flatMap(walk)];
const find = (root, tag, text) => walk(root).find(element => element.tagName === tag && (text === undefined || (text instanceof RegExp ? text.test(element.textContent) : element.textContent === text)));
const all = (root, tag) => walk(root).filter(element => element.tagName === tag);
const tick = () => new Promise(resolve => setImmediate(resolve));
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };
const pdf = (name = 'manual.pdf') => new File(['%PDF-1.4\nmanual'], name);
const photo = () => new File([new Uint8Array([255, 216, 255, 0])], 'photo.jpg');
const failure = (message = 'denied') => ({ data: null, error: { message, code: '42501' }, status: 403 });
const context = (extra = {}) => ({ scope: 'scope-1', kind: 'work', companyId: 'company-1', recordId: 'record-1', userId: 'user-1', ...extra });

function database() {
  const db = { tables: new Map(), objects: new Map(), calls: [], hooks: [] };
  db.rows = table => { if (!db.tables.has(table)) db.tables.set(table, []); return db.tables.get(table); };
  db.once = (match, run) => db.hooks.push({ match, run });
  db.perform = call => {
    db.calls.push(call);
    const execute = () => {
      if (call.action === 'upload') {
        const key = `${call.bucket}/${call.path}`;
        if (db.objects.has(key)) return { error: { statusCode: '409', message: 'already exists' } };
        db.objects.set(key, call.blob); return { error: null };
      }
      if (call.action === 'remove') { for (const path of call.paths) db.objects.delete(`${call.bucket}/${path}`); return { error: null }; }
      if (call.action === 'sign') return { data: { signedUrl: 'https://example.test/signed-file' }, error: null };
      const rows = db.rows(call.table);
      if (call.action === 'insert') {
        if (rows.some(row => row.id === call.row.id)) return { error: { code: '23505', message: 'duplicate key' }, status: 409 };
        rows.push({ ...call.row }); return { error: null };
      }
      const matching = rows.filter(row => call.filters.every(([key, value]) => row[key] === value));
      if (call.action === 'delete') { db.tables.set(call.table, rows.filter(row => !matching.includes(row))); return { data: matching.map(row => ({ id: row.id })), error: null }; }
      return { data: call.range ? matching.slice(call.range[0], call.range[1] + 1) : matching.map(row => ({ ...row })), count: matching.length, error: null };
    };
    const index = db.hooks.findIndex(hook => hook.match(call));
    return index < 0 ? execute() : db.hooks.splice(index, 1)[0].run(call, execute);
  };
  db.client = {
    from(table) {
      const call = { table, action: 'select', filters: [], orders: [] };
      const query = {
        select(columns, options) { call.columns = columns; call.options = options; return this; },
        insert(row) { call.action = 'insert'; call.row = row; return this; },
        delete() { call.action = 'delete'; return this; },
        eq(key, value) { call.filters.push([key, value]); return this; },
        order(key, options) { call.orders.push([key, options]); return this; },
        range(start, end) { call.range = [start, end]; return this; },
        then(resolve, reject) { return Promise.resolve().then(() => db.perform(call)).then(resolve, reject); },
      };
      return query;
    },
    storage: { from(bucket) { return {
      upload: (path, blob, options) => db.perform({ action: 'upload', bucket, path, blob, options }),
      remove: paths => db.perform({ action: 'remove', bucket, paths }),
      createSignedUrl: (path, seconds, options) => db.perform({ action: 'sign', bucket, path, seconds, options }),
    }; } },
  };
  return db;
}

function harness(createAttachmentWorkflow, overrides = {}) {
  const db = database();
  const documentRef = { downloads: [], createElement(tag) { return new Element(tag, this); } };
  documentRef.body = documentRef.createElement('body');
  const h = { db, doc: documentRef, scope: 'scope-1', notices: [], reports: [], renders: 0, editable: true, deletable: true };
  h.deps = {
    documentRef, getScope: () => h.scope, client: () => db.client,
    canEdit: () => h.editable, canDeleteDocument: () => h.deletable, confirm: () => true,
    safeFileName: name => name, userName: () => 'Team member',
    optimizePhoto: async file => ({ blob: file, fileName: file.name, contentType: 'image/jpeg' }),
    withOperationTimeout: (promise, message) => {
      let timer;
      return Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), 25); })]).finally(() => clearTimeout(timer));
    },
    showNotice: (...args) => h.notices.push(args), render: async () => { h.renders++; }, ...overrides,
  };
  h.workflow = createAttachmentWorkflow(h.deps, { reportUploadFailure: async (...args) => h.reports.push(args) });
  h.open = async (files = [pdf()], ctx = context()) => { await h.workflow.open(ctx, files); return find(documentRef.body, 'dialog'); };
  h.submit = () => find(documentRef.body, 'button', /^Attach \d/).click();
  h.close = () => find(documentRef.body, 'button', /^(Done|Cancel)$/).click();
  h.container = () => { const el = documentRef.createElement('section'); documentRef.body.append(el); return el; };
  return h;
}

function seed(h, count, ctx = context()) {
  for (let i = 0; i < count; i++) {
    const row = { id: `doc-${i}`, company_id: ctx.companyId, work_order_id: ctx.recordId, uploaded_by: ctx.userId, file_name: `doc-${i}.pdf`, file_size_bytes: 12, storage_path: `${ctx.companyId}/${ctx.recordId}/doc-${i}.pdf` };
    h.db.rows('work_order_documents').push(row);
    h.db.objects.set(`work-order-documents/${row.storage_path}`, pdf());
  }
}

(async () => {
  const { createAttachmentWorkflow } = await import('../../src/workflows/attachmentWorkflow.mjs');
  const tests = [];
  const test = (name, run) => tests.push({ name, run });
  const create = overrides => harness(createAttachmentWorkflow, overrides);

  test('mixed files preserve photo history and automatic equipment/part types', async () => {
    for (const [kind, table, type] of [['work', 'work_order_photos', undefined], ['asset', 'asset_documents', 'machine_photo'], ['part', 'part_documents', 'part_photo']]) {
      const h = create(); await h.open([photo(), pdf()], context({ kind })); await h.submit();
      const rows = h.db.rows(table);
      assert.equal(rows[0].document_type, type);
      assert.equal(rows[0].original_file_name, 'photo.jpg');
      assert.equal(h.db.rows(kind === 'work' ? 'work_order_documents' : table).at(-1).document_type, kind === 'work' ? undefined : 'other');
      assert.equal(h.db.rows('work_order_events').length, kind === 'work' ? 1 : 0);
      await h.close(); assert.equal(find(h.doc.body, 'dialog'), undefined); assert.equal(h.renders, 1);
      assert.equal(h.db.objects.size, 2);
    }
  });

  test('retry sends only failed files with the same ID and path', async () => {
    const h = create(); h.db.once(call => call.action === 'insert' && call.row.file_name === 'two.pdf', () => failure());
    await h.open([pdf('one.pdf'), pdf('two.pdf')]); await h.submit(); await h.submit();
    assert.equal(h.db.rows('work_order_documents').length, 2);
    const attempts = h.db.calls.filter(call => call.action === 'insert' && call.row.file_name === 'two.pdf');
    assert.equal(attempts.length, 2); assert.deepEqual(attempts[0].row, attempts[1].row);
    assert.equal(h.db.calls.filter(call => call.action === 'upload').length, 2);
    assert.equal(h.reports.length, 1);
    assert.equal(h.reports[0][1].name, 'two.pdf');
    await h.close(); assert.equal(h.db.objects.size, 2);
  });

  test('generic-MIME photos and GIFs reach the optimizer as detected images', async () => {
    const calls = [];
    const h = create({ optimizePhoto: async (file, options) => {
      calls.push({ type: file.type, options });
      return { blob: file, fileName: file.name, contentType: 'image/jpeg' };
    } });
    await h.open([new File([new Uint8Array([255,216,255,0])], 'photo.jpg', {type:'application/octet-stream'}), new File(['GIF89a'], 'diagram.gif')]);
    await h.submit();
    assert.deepEqual(calls.map(call => call.type), ['image/jpeg', 'image/gif']);
    assert.ok(calls.every(call => call.options.acceptAnyImage && call.options.passes[0].maxDimension === 768));
    await h.close();
  });

  test('timed-out upload blocks retry and cleanup until the actual request settles', async () => {
    const h = create(), gate = deferred(); let commit;
    h.db.once(call => call.action === 'upload', (_call, execute) => { commit = execute; return gate.promise; });
    await h.open(); await h.submit(); await h.submit(); await h.close();
    assert.equal(h.db.calls.filter(call => call.action === 'upload').length, 1);
    assert.equal(h.db.calls.some(call => call.action === 'remove'), false);
    assert.ok(find(h.doc.body, 'button', 'Close for now'));
    gate.resolve(commit()); await tick(); await h.close();
    assert.equal(h.db.objects.size, 0); assert.equal(find(h.doc.body, 'dialog'), undefined);
  });

  test('timed-out insert can commit after Cancel without losing its file or photo history', async () => {
    const h = create(), gate = deferred(); let commit;
    h.db.once(call => call.action === 'insert' && call.table === 'work_order_photos', (_call, execute) => { commit = execute; return gate.promise; });
    await h.open([photo()]); await h.submit(); await h.close();
    assert.equal(h.db.calls.some(call => call.action === 'remove'), false);
    gate.resolve(commit()); await tick(); await h.submit(); await h.close();
    assert.equal(h.db.rows('work_order_photos').length, 1); assert.equal(h.db.objects.size, 1);
    assert.equal(h.db.rows('work_order_events').length, 1);
    assert.equal(h.db.rows('work_order_events')[0].id, h.db.rows('work_order_photos')[0].id);
  });

  test('lost insert response is not treated as rollback; retry reconciles late commit', async () => {
    const h = create(); let commit;
    h.db.once(call => call.action === 'insert' && call.table === 'work_order_documents', (_call, execute) => { commit = execute; return Promise.reject(new Error('network lost')); });
    await h.open(); await h.submit(); await h.close();
    assert.equal(h.db.objects.size, 1); assert.equal(h.db.calls.some(call => call.action === 'remove'), false);
    await find(h.doc.body, 'button', 'Close for now').click(); assert.equal(find(h.doc.body, 'dialog'), undefined);
    commit(); await h.open([pdf('new-selection.pdf')]); await h.submit(); await h.close();
    assert.equal(h.db.rows('work_order_documents').length, 1); assert.equal(h.db.objects.size, 1);
    assert.match(h.notices.at(-1)[0], /Resumed/);
  });

  test('lost upload response is preserved until retry resolves its stable path', async () => {
    const h = create(); let commit;
    h.db.once(call => call.action === 'upload', (_call, execute) => { commit = execute; return Promise.reject(new Error('connection lost')); });
    await h.open(); await h.submit(); await h.close();
    assert.equal(h.db.calls.some(call => call.action === 'remove'), false);
    commit(); await h.submit(); await h.close();
    assert.equal(h.db.objects.size, 1); assert.equal(h.db.rows('work_order_documents').length, 1);
  });

  test('partial cleanup failure can retry attachment without pointing at a removed file', async () => {
    const h = create();
    for (let i = 0; i < 2; i++) h.db.once(call => call.action === 'insert' && call.table === 'work_order_documents', () => failure());
    h.db.once(call => call.action === 'remove' && call.paths[0].endsWith('two.pdf'), () => failure('cleanup denied'));
    await h.open([pdf('one.pdf'), pdf('two.pdf')]); await h.submit(); await h.close();
    assert.equal(h.db.objects.size, 1); await h.submit(); await h.close();
    assert.equal(h.db.rows('work_order_documents').length, 2); assert.equal(h.db.objects.size, 2);
  });

  test('late cleanup finishes before a retry reuploads the same path', async () => {
    const h = create(), gate = deferred(); let remove;
    h.db.once(call => call.action === 'insert' && call.table === 'work_order_documents', () => failure());
    h.db.once(call => call.action === 'remove', (_call, execute) => { remove = execute; return gate.promise; });
    await h.open(); await h.submit(); await h.close(); await h.submit();
    assert.equal(h.db.calls.filter(call => call.action === 'upload').length, 1);
    gate.resolve(remove()); await tick(); await h.submit(); await h.close();
    assert.equal(h.db.calls.filter(call => call.action === 'upload').length, 2);
    assert.equal(h.db.objects.size, 1);
  });

  test('scope changes hide busy reviews and prevent continuation against another scope', async () => {
    const h = create(), gate = deferred(); let upload;
    h.db.once(call => call.action === 'upload', (_call, execute) => { upload = execute; return gate.promise; });
    const dialog = await h.open(); const saving = h.submit(); await tick();
    h.scope = 'scope-2'; h.workflow.cancelStale(); assert.equal(dialog.isConnected, false);
    gate.resolve(upload()); await saving;
    assert.equal(h.db.calls.some(call => call.action === 'insert'), false);
    await h.open([pdf('other.pdf')], context({ scope: 'scope-2', companyId: 'company-2' })); await h.close();
    h.scope = 'scope-1'; await h.open(); await h.submit(); await h.close();
    assert.equal(h.db.rows('work_order_documents').length, 1);
    assert.equal(h.db.rows('work_order_documents')[0].company_id, 'company-1');
  });

  test('scope changes after a cleanup read do not issue a stale delete', async () => {
    const h = create(), gate = deferred();
    h.db.once(call => call.action === 'insert', () => failure());
    await h.open(); await h.submit();
    h.db.once(call => call.action === 'select', () => gate.promise);
    const closing = h.close(); await tick(); h.scope = 'scope-2'; gate.resolve({ data: [], error: null }); await closing;
    assert.equal(h.db.calls.some(call => call.action === 'remove'), false);
    assert.equal(find(h.doc.body, 'dialog'), undefined);
    h.scope = 'scope-1'; await h.open(); await h.close(); assert.equal(h.db.objects.size, 0);
  });

  test('scope change after record commit never writes photo history in a different scope', async () => {
    const h = create();
    h.db.once(call => call.action === 'insert' && call.table === 'work_order_photos', (_call, execute) => { const result = execute(); h.scope = 'scope-2'; return result; });
    await h.open([photo()]); await h.submit();
    assert.equal(h.db.rows('work_order_events').length, 0); assert.equal(h.db.objects.size, 1);
    h.scope = 'scope-1'; await h.open(); await h.close(); assert.equal(h.db.rows('work_order_events').length, 1);
  });

  test('busy submit/cancel/native close and ZIP changes cannot lose an upload', async () => {
    const h = create(), gate = deferred(); let upload;
    const { ZipWriter, BlobWriter, TextReader } = await import('@zip.js/zip.js');
    const writer = new ZipWriter(new BlobWriter('application/zip'), { useWebWorkers: false });
    await writer.add('secret.txt', new TextReader('service notes'), { password: 'test-password' });
    const dialog = await h.open([new File([await writer.close()], 'archive.zip')]);
    const choices = all(dialog, 'input');
    choices[0].checked = true; choices[0].onchange(); choices[1].checked = true; choices[1].onchange();
    h.db.once(call => call.action === 'upload', (_call, execute) => { upload = execute; return gate.promise; });
    const submit = find(dialog, 'button', /^Attach \d/); const saving = submit.click(); await tick();
    await submit.onclick(); assert.equal(dialog.dispatch('cancel').defaultPrevented, true); dialog.close(); assert.equal(dialog.open, true);
    choices[0].checked = false; choices[0].onchange(); assert.equal(choices[0].checked, true); assert.equal(choices[0].disabled, true);
    gate.resolve(upload()); await saving;
    assert.equal(h.db.calls.filter(call => call.action === 'upload').length, 1);
    choices[0].checked = false; choices[0].onchange(); assert.equal(choices[0].checked, true);
    await h.close(); assert.equal(h.db.objects.size, 1);
  });

  test('cancel during preparation leaves no modal or later mutations', async () => {
    const h = create(), gate = deferred();
    const file = pdf(); file.slice = () => ({ arrayBuffer: () => gate.promise });
    const opening = h.open([file]); await h.close();
    gate.resolve(new TextEncoder().encode('%PDF-1.4').buffer); await opening;
    assert.equal(find(h.doc.body, 'dialog'), undefined); assert.equal(h.db.calls.length, 0);
  });

  test('photo history failures do not mark a saved attachment unsaved', async () => {
    const h = create(); h.db.once(call => call.table === 'work_order_events', () => failure('history denied'));
    await h.open([photo()]); await h.submit();
    assert.match(find(h.doc.body, 'dialog').textContent, /Attached, but/);
    await h.close(); assert.equal(h.db.rows('work_order_events').length, 1); assert.equal(h.db.objects.size, 1);
  });

  test('history timeouts do not duplicate events on Done', async () => {
    const h = create(), gate = deferred(); let commit;
    h.db.once(call => call.table === 'work_order_events', (_call, execute) => { commit = execute; return gate.promise; });
    await h.open([photo()]); await h.submit(); gate.resolve(commit()); await tick(); await h.close();
    assert.equal(h.db.calls.filter(call => call.table === 'work_order_events').length, 1);
  });

  test('permission changes after upload preserve the object for explicit cleanup', async () => {
    const h = create(); h.db.once(call => call.action === 'upload', (_call, execute) => { h.editable = false; return execute(); });
    await h.open(); await h.submit(); assert.equal(h.db.rows('work_order_documents').length, 0);
    await h.close(); assert.equal(h.db.objects.size, 0);
  });

  test('a rejected upload can be cancelled without attempting storage deletion', async () => {
    const h = create(); h.db.once(call => call.action === 'upload', () => failure());
    await h.open(); await h.submit(); await h.close();
    assert.equal(h.db.calls.some(call => call.action === 'remove'), false);
    assert.equal(find(h.doc.body, 'dialog'), undefined);
  });

  test('existing conflicting rows are never overwritten or removed', async () => {
    const h = create(); h.db.once(call => call.action === 'select', call => ({ data: [{ id: call.filters.at(-1)[1], storage_path: 'different/path', work_order_id: 'record-1' }], error: null }));
    await h.open(); await h.submit(); assert.match(find(h.doc.body, 'dialog').textContent, /ID conflict/);
    assert.equal(h.db.calls.some(call => ['insert', 'upload', 'remove'].includes(call.action)), false);
    await h.close();
  });

  test('render errors are reported after closing without orphaning active modal state', async () => {
    const h = create({ render: async () => { throw new Error('refresh failed'); } });
    await h.open(); await h.submit(); await h.close();
    assert.equal(find(h.doc.body, 'dialog'), undefined); assert.match(h.notices[0][0], /could not refresh/);
    await h.open(); await h.close();
  });

  test('documents load only when mounted with stable 12-row pagination', async () => {
    const h = create(); seed(h, 13); assert.equal(h.db.calls.length, 0);
    const container = h.container(); await h.workflow.mountDocuments(container, context());
    assert.equal(all(container, 'article').length, 12);
    const oldNext = find(container, 'button', 'Next'); await oldNext.click(); await oldNext.onclick();
    assert.equal(all(container, 'article').length, 1); assert.deepEqual(h.db.calls.filter(call => call.range).map(call => call.range), [[0, 11], [12, 23]]);
    await find(container, 'button', 'Previous').click(); assert.equal(all(container, 'article').length, 12);
    assert.deepEqual(h.db.calls[0].orders, [['created_at', { ascending: false }], ['id', undefined]]);
  });

  test('remount ignores old list responses and old row actions', async () => {
    const h = create(), gate = deferred(); seed(h, 1); const container = h.container();
    h.db.once(call => call.action === 'select', () => gate.promise);
    const first = h.workflow.mountDocuments(container, context()); await tick();
    await h.workflow.mountDocuments(container, context({ recordId: 'another-record' }));
    gate.resolve({ data: h.db.rows('work_order_documents'), count: 1, error: null }); await first;
    assert.equal(all(container, 'article').length, 0); assert.match(container.textContent, /No documents/);
    await h.workflow.mountDocuments(container, context()); const oldDelete = find(container, 'button', 'Delete file');
    await h.workflow.mountDocuments(container, context({ recordId: 'another-record' })); await oldDelete.click();
    assert.equal(h.db.calls.some(call => call.action === 'delete'), false);
  });

  test('download failures recover; stale or disconnected responses never open a link', async () => {
    const h = create(), gate = deferred(); seed(h, 1); const container = h.container();
    await h.workflow.mountDocuments(container, context()); const download = find(container, 'button', 'Download file');
    h.db.once(call => call.action === 'sign', () => failure('link denied')); await download.click(); assert.equal(download.disabled, false);
    await download.click(); assert.equal(h.doc.downloads.length, 1); assert.equal(all(h.doc.body, 'a').length, 0);
    h.db.once(call => call.action === 'sign', () => gate.promise); const pending = download.click(); await tick();
    container.remove(); gate.resolve({ data: { signedUrl: 'https://example.test/stale' }, error: null }); await pending;
    assert.equal(h.doc.downloads.length, 1);
  });

  test('delete denial or zero rows never removes storage; permission is rechecked', async () => {
    const h = create(); seed(h, 1); const container = h.container(); await h.workflow.mountDocuments(container, context());
    const remove = find(container, 'button', 'Delete file'); h.deletable = false; await remove.click(); assert.equal(h.db.calls.some(call => call.action === 'delete'), false);
    h.deletable = true; h.db.once(call => call.action === 'delete', () => failure()); await remove.click();
    h.db.once(call => call.action === 'delete', () => ({ data: [], error: null })); await remove.click();
    assert.equal(h.db.calls.some(call => call.action === 'remove'), false); assert.equal(h.db.objects.size, 1);
    assert.equal(find(container, 'button', 'Download file').disabled, false);
    await remove.click(); assert.equal(h.db.objects.size, 0);
  });

  test('timed-out delete remains single-flight and preserves storage until confirmed', async () => {
    const h = create(), gate = deferred(); let commit; seed(h, 1); const container = h.container();
    h.db.once(call => call.action === 'delete', (_call, execute) => { commit = execute; return gate.promise; });
    await h.workflow.mountDocuments(container, context()); const remove = find(container, 'button', 'Delete file');
    const pending = remove.click(); await tick(); await remove.onclick(); await pending;
    await remove.click(); assert.equal(h.db.calls.filter(call => call.action === 'delete').length, 1); assert.equal(h.db.objects.size, 1);
    gate.resolve(commit()); await tick(); await remove.click();
    assert.equal(h.db.objects.size, 0); assert.equal(h.db.rows('work_order_documents').length, 0);
  });

  test('remount during deletion updates the new busy controls after failure or success', async () => {
    for (const fail of [true, false]) {
      const h = create(), gate = deferred(); let commit; seed(h, 1); const container = h.container();
      await h.workflow.mountDocuments(container, context());
      h.db.once(call => call.action === 'delete', (_call, execute) => { commit = execute; return gate.promise; });
      const deleting = find(container, 'button', 'Delete file').click(); await tick();
      await h.workflow.mountDocuments(container, context()); assert.equal(find(container, 'button', 'Retry deletion').disabled, true);
      gate.resolve(fail ? failure() : commit()); await deleting;
      if (fail) { assert.equal(find(container, 'button', 'Delete file').disabled, false); assert.equal(h.db.objects.size, 1); }
      else { assert.equal(all(container, 'article').length, 0); assert.equal(h.db.objects.size, 0); }
    }
  });

  test('lost delete response plus a zero-row retry retains the unresolved cleanup job', async () => {
    const h = create(); seed(h, 1); const container = h.container();
    await h.workflow.mountDocuments(container, context());
    h.db.once(call => call.action === 'delete', (_call, execute) => { execute(); return Promise.reject(new Error('lost response')); });
    await find(container, 'button', 'Delete file').click(); await find(container, 'button', 'Retry deletion').click();
    await h.workflow.mountDocuments(container, context());
    assert.ok(find(container, 'button', 'Retry deletion')); assert.equal(h.db.objects.size, 1);
    assert.equal(h.db.calls.some(call => call.action === 'remove'), false);
  });

  test('cleanup failure stays retryable across remounts and last-page deletion clamps page', async () => {
    const h = create(); seed(h, 13); const container = h.container();
    await h.workflow.mountDocuments(container, context()); await find(container, 'button', 'Next').click();
    h.db.once(call => call.action === 'remove', () => failure('storage denied'));
    await find(container, 'button', 'Delete file').click(); assert.equal(h.db.rows('work_order_documents').length, 12); assert.equal(h.db.objects.size, 13);
    const remove = find(container, 'button', 'Retry deletion'); await remove.click();
    assert.equal(all(container, 'article').length, 12); assert.equal(h.db.objects.size, 12);
    h.db.once(call => call.action === 'remove', () => failure('storage denied'));
    await find(container, 'button', 'Delete file').click();
    await h.workflow.mountDocuments(container, context()); assert.ok(find(container, 'button', 'Retry deletion'));
    await find(container, 'button', 'Retry deletion').click(); assert.equal(h.db.objects.size, 11);
  });

  test('scope change during row deletion retains cleanup without changing another workspace', async () => {
    const h = create(), gate = deferred(); let commit; seed(h, 1); const container = h.container();
    await h.workflow.mountDocuments(container, context());
    h.db.once(call => call.action === 'delete', (_call, execute) => { commit = execute; return gate.promise; });
    const deleting = find(container, 'button', 'Delete file').click(); await tick(); h.scope = 'scope-2'; gate.resolve(commit()); await deleting;
    assert.equal(h.db.objects.size, 1); assert.equal(h.db.calls.some(call => call.action === 'remove'), false);
    h.scope = 'scope-1'; await h.workflow.mountDocuments(container, context()); await find(container, 'button', 'Retry deletion').click(); assert.equal(h.db.objects.size, 0);
  });

  test('list errors offer retry; empty pages clamp after an external delete', async () => {
    const h = create(); seed(h, 13); const container = h.container();
    h.db.once(call => call.action === 'select', () => failure('list failed'));
    await h.workflow.mountDocuments(container, context()); await find(container, 'button', 'Retry').click();
    h.db.rows('work_order_documents').pop(); await find(container, 'button', 'Next').click();
    assert.equal(all(container, 'article').length, 12); assert.equal(find(container, 'button', 'Previous'), undefined);
  });

  test('bulk preparation is read-only and returns scoped cleanup of snapshotted paths', async () => {
    const h = create(); seed(h, 205);
    seed(h, 1, context({ companyId: 'company-2', recordId: 'record-2' }));
    const ctx = context();
    const cleanup = await h.workflow.removeWorkDocuments('record-1', ctx);
    assert.equal(typeof cleanup, 'function');
    assert.deepEqual(h.db.calls.filter(call => call.range).map(call => call.range), [[0, 99], [100, 199], [200, 299]]);
    assert.equal(h.db.calls.every(call => call.action === 'select'), true);
    assert.equal(h.db.objects.size, 206); assert.equal(h.db.rows('work_order_documents').length, 206);
    assert.equal(h.db.calls.every(call => call.filters.some(([key, value]) => key === 'company_id' && value === 'company-1') && call.filters.some(([key, value]) => key === 'work_order_id' && value === 'record-1')), true);
    // Model the parent's confirmed work-order deletion cascading document rows.
    h.db.tables.set('work_order_documents', h.db.rows('work_order_documents').filter(row => row.company_id !== 'company-1'));
    ctx.companyId = 'company-2'; ctx.scope = 'scope-2';
    await cleanup();
    assert.deepEqual(h.db.calls.filter(call => call.action === 'remove').map(call => call.paths.length), [100, 100, 5]);
    assert.equal(h.db.objects.size, 1); assert.equal(h.db.rows('work_order_documents').length, 1);
    assert.equal(h.db.calls.filter(call => call.action === 'select').length, 3);
  });

  test('bulk preparation and deferred cleanup stop on errors or scope changes', async () => {
    const stale = create(); seed(stale, 1);
    stale.db.once(call => call.action === 'select', (_call, execute) => { stale.scope = 'scope-2'; return execute(); });
    await assert.rejects(stale.workflow.removeWorkDocuments('record-1', context()), /Workspace changed/);
    assert.equal(stale.db.calls.some(call => call.action === 'remove'), false);
    const unreadable = create(); seed(unreadable, 205);
    unreadable.db.once(call => call.action === 'select' && call.range[0] === 100, () => failure('listing failed'));
    await assert.rejects(unreadable.workflow.removeWorkDocuments('record-1', context()), error => error.message === 'listing failed');
    assert.equal(unreadable.db.calls.some(call => call.action === 'remove'), false);
    const switched = create(); seed(switched, 205);
    const switchedCleanup = await switched.workflow.removeWorkDocuments('record-1', context());
    switched.scope = 'scope-2'; await assert.rejects(switchedCleanup(), /Workspace changed/);
    assert.equal(switched.db.calls.some(call => call.action === 'remove'), false);
    switched.scope = 'scope-1';
    switched.db.once(call => call.action === 'remove', (_call, execute) => { switched.scope = 'scope-2'; return execute(); });
    await assert.rejects(switchedCleanup(), /Workspace changed/);
    assert.equal(switched.db.calls.filter(call => call.action === 'remove').length, 1);
    const denied = create(); seed(denied, 205); denied.db.once(call => call.action === 'remove', () => failure('cleanup failed'));
    const deniedCleanup = await denied.workflow.removeWorkDocuments('record-1', context());
    assert.equal(denied.db.calls.some(call => call.action === 'remove'), false);
    await assert.rejects(deniedCleanup(), error => error.message === 'cleanup failed');
    assert.equal(denied.db.calls.filter(call => call.action === 'remove').length, 1);
  });

  for (const { name, run } of tests) { await run(); console.log(`PASS ${name}`); }
  console.log(`attachment workflow smoke passed: ${tests.length} local DOM/backend-mock regressions`);
})().catch(error => { console.error(error); process.exitCode = 1; });
