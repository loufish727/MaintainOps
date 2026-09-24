const REASONS = { sold: 'Sold', scrapped: 'Scrapped', delete: 'Delete', other: 'Other' };
const SECTIONS = { work: 'Work History', events: 'Equipment History', files: 'Files', parts: 'Parts', pm: 'PM' };
const TABLES = {
  work: ['work_orders', 'id,title,status,completed_at,created_at', 'created_at'],
  events: ['asset_events', 'id,actor_id,summary,created_at', 'created_at'],
  files: ['asset_documents', 'id,file_name,storage_path,created_at', 'created_at'],
  parts: ['asset_parts', 'id,note,quantity_recommended,parts(name,sku),created_at', 'created_at'],
  pm: ['preventive_schedules', 'id,title,active,equipment_archive_paused,next_due_at,created_at', 'created_at'],
};

export async function loadEquipmentArchiveChanges(client, companyId, result, timeout) {
  const ids = [...new Set([...(result.archived_ids || []), ...(result.restored_ids || []), ...(result.detached_ids || [])])];
  const patch = { ids, assets: [], schedules: [], financials: [] };
  if (!ids.length) return patch;
  for (const [key, table, select, column] of [
    ['assets', 'assets', '*', 'id'], ['schedules', 'preventive_schedules', '*, assets(name, location_id, asset_type, archived_at)', 'asset_id'],
    ['financials', 'asset_financials', '*, assets(*)', 'asset_id'],
  ]) {
    const response = await timeout(window.MaintainOpsMaintenanceWorkspaceRows.loadCompleteWorkspaceRows('Retained equipment records',
      () => client.from(table).select(select, { count: 'exact' }).eq('company_id', companyId).in(column, ids).order('id')), 'Saved, but current records could not load. Reopen this screen.', 15000);
    if (response.error) throw response.error;
    patch[key] = response.data || [];
  }
  return patch;
}

export function createEquipmentArchive(deps) {
  const doc = deps.documentRef, esc = deps.escapeHtml;
  let dialog, trigger, dialogScope, revision = 0, focusSection = false;
  let owner = `${deps.getCompanyContext?.() || deps.getCompanyId()}`;
  let state = { page: 1, query: '', location: '', data: null, record: null, section: 'work', relatedPage: 1, related: null, loading: false, error: '' };
  const facility = id => deps.getLocations().find(l => l.id === id)?.name || 'Unassigned';
  const date = value => value ? new Date(value).toLocaleDateString() : '';
  async function saved(result) {
    if (deps.onSaved) return deps.onSaved(result);
    const companyId = deps.getCompanyId(), scope = deps.getCompanyContext(), navigation = deps.getContext();
    const removed = new Set(result.archived_ids || []);
    const previous = deps.getData();
    deps.setData({ ...previous, assets: previous.assets.filter(a => !removed.has(a.id)),
      workOrders: previous.workOrders.map(w => removed.has(w.asset_id) ? { ...w, assets: { ...w.assets, archived_at: new Date().toISOString() } } : w),
      preventiveSchedules: previous.preventiveSchedules.filter(s => !removed.has(s.asset_id)) });
    let patch;
    try { patch = await loadEquipmentArchiveChanges(deps.client(), companyId, result, deps.timeout); }
    catch (error) { if (scope === deps.getCompanyContext() && navigation === deps.getContext()) deps.onChanged(removed); throw error; }
    if (scope !== deps.getCompanyContext()) return;
    const data = deps.getData(), changed = new Set(patch.ids), byId = new Map(patch.assets.map(a => [a.id, a]));
    deps.setData({
      assets: [...data.assets.filter(a => !changed.has(a.id)), ...patch.assets.filter(a => !a.archived_at)],
      workOrders: data.workOrders.map(w => byId.has(w.asset_id) ? { ...w, assets: { ...w.assets, name: byId.get(w.asset_id).name, archived_at: byId.get(w.asset_id).archived_at } } : w),
      preventiveSchedules: [...data.preventiveSchedules.filter(s => !changed.has(s.asset_id)), ...patch.schedules.filter(s => !s.assets?.archived_at)]
        .map(s => s.id === result.resumed_schedule?.id ? { ...s, ...result.resumed_schedule } : s),
      assetFinancials: [...data.assetFinancials.filter(f => !changed.has(f.asset_id)), ...patch.financials],
    });
    if (navigation === deps.getContext()) deps.onChanged(removed);
  }
  const rpc = async (name, args) => {
    const result = await deps.timeout(deps.client().rpc(name, { p_company_id: deps.getCompanyId(), ...args }), 'The response timed out. Review again before retrying.', 15000);
    if (result.error) throw result.error;
    return result.data;
  };
  function dispose() {
    revision++;
    if (dialog) { dialog.close(); dialog.remove(); dialog = null; }
    if (trigger?.isConnected) trigger.focus();
    trigger = null;
  }
  function reset() { dispose(); state = { page: 1, query: '', location: '', data: null, record: null, section: 'work', relatedPage: 1, related: null, loading: false, error: '' }; }
  function syncOwner() {
    const next = `${deps.getCompanyContext?.() || deps.getCompanyId()}`;
    if (next !== owner) { reset(); owner = next; }
  }
  async function loadList() {
    if (!deps.canManage()) return;
    const ticket = ++revision, scope = deps.getContext();
    state.loading = true; state.error = ''; deps.redraw();
    try {
      const data = await rpc('list_archived_equipment', { p_page: state.page, p_query: state.query, p_location_id: state.location || null });
      if (ticket !== revision || scope !== deps.getContext() || !deps.isVisible()) return;
      if (!Array.isArray(data?.rows) || !Number.isSafeInteger(data.total)) throw Error('Could not verify archived equipment.');
      state.data = data; state.page = data.page;
    } catch (error) { if (ticket === revision) state.error = error.message || 'Could not load archived equipment.'; }
    finally { if (ticket === revision) { state.loading = false; deps.redraw(); } }
  }
  async function openList() {
    syncOwner();
    if (!deps.canManage()) return;
    deps.enter(); state.record = null; state.related = null;
    await loadList();
  }
  async function openRecord(id) {
    syncOwner();
    if (!deps.canManage()) return;
    deps.enter();
    const ticket = ++revision, scope = deps.getContext();
    state.loading = true; state.error = ''; deps.redraw();
    try {
      const response = await deps.timeout(deps.client().from('assets').select('*').eq('company_id', deps.getCompanyId()).eq('id', id).not('archived_at', 'is', null).single(), 'Equipment took too long to load.', 15000);
      if (ticket !== revision || scope !== deps.getContext() || !deps.isVisible()) return;
      if (response.error) throw response.error;
      state.record = response.data; state.section = 'work'; state.relatedPage = 1;
      await loadRelated();
    } catch (error) { if (ticket === revision) { state.error = error.message; state.loading = false; deps.redraw(); } }
  }
  async function loadRelated() {
    const ticket = ++revision, scope = deps.getContext(), record = state.record;
    if (!record || !deps.canManage()) return;
    state.loading = true; state.related = null; state.error = ''; deps.redraw();
    try {
      const [table, select, order] = TABLES[state.section];
      const response = await deps.timeout(deps.client().from(table).select(select, { count: 'exact' }).eq('company_id', deps.getCompanyId()).eq('asset_id', record.id)
        .order(order, { ascending: false }).order('id').range((state.relatedPage - 1) * 12, state.relatedPage * 12 - 1), 'History took too long to load.', 15000);
      if (response.error) throw response.error;
      if (!Number.isSafeInteger(response.count)) throw Error('Could not verify the history count.');
      if (state.section === 'files' && response.data.length) {
        const signed = await deps.timeout(deps.client().storage.from('asset-documents').createSignedUrls(response.data.map(r => r.storage_path), 300), 'File links took too long to load.', 15000);
        if (signed.error) throw signed.error;
        for (const row of response.data) row.url = signed.data.find(s => s.path === row.storage_path)?.signedUrl;
      }
      if (ticket !== revision || scope !== deps.getContext() || !deps.isVisible()) return;
      state.related = { rows: response.data, total: response.count };
    } catch (error) { if (ticket === revision) state.error = error.message || 'Could not load history.'; }
    finally { if (ticket === revision) { state.loading = false; deps.redraw(); } }
  }
  const paging = (page, total, kind) => total > 12 ? `<nav class="travel-pagination" aria-label="${kind === 'list' ? 'Archived equipment' : 'History'} pages"><button class="secondary-button" data-archive-page="${kind}:-1" ${page <= 1 ? 'disabled' : ''}>Previous</button><span>${page} / ${Math.max(1, Math.ceil(total / 12))}</span><button class="secondary-button" data-archive-page="${kind}:1" ${page * 12 >= total ? 'disabled' : ''}>Next</button></nav>` : '';
  function renderRow(row) {
    if (state.section === 'work') return `<button class="secondary-button archive-history-link" data-archive-work="${esc(row.id)}"><strong>${esc(row.title)}</strong><span>${esc(row.status)} ${esc(date(row.completed_at))}</span></button>`;
    if (state.section === 'files') return row.url && /^https:\/\//.test(row.url) ? `<a class="archive-history-link" href="${esc(row.url)}" target="_blank" rel="noopener noreferrer">${esc(row.file_name)}</a>` : `<p>${esc(row.file_name)} (link unavailable)</p>`;
    if (state.section === 'events') return `<div class="archive-history-row"><strong>${esc(deps.getMemberName(row.actor_id))}</strong><time>${esc(date(row.created_at))}</time><p>${esc(row.summary)}</p></div>`;
    if (state.section === 'parts') return `<div class="archive-history-row"><strong>${esc(row.parts?.name || 'Part')}</strong><span>${esc(row.parts?.sku || '')} / Recommended ${esc(row.quantity_recommended)}</span><p>${esc(row.note || '')}</p></div>`;
    return `<div class="archive-history-row"><strong>${esc(row.title)}</strong><span>${row.equipment_archive_paused ? 'Paused by equipment archive' : 'Inactive'} / Last scheduled due ${esc(row.next_due_at)}</span></div>`;
  }
  function render() {
    syncOwner();
    if (!deps.canManage()) return '';
    const record = state.record;
    return `<div class="equipment-archive"><div class="panel-header"><h2>${record ? esc(record.name) : 'Archived Equipment'}</h2><button class="secondary-button" data-archive-back>${record ? 'Back to Archived Equipment' : 'Back to Equipment'}</button></div>
      ${record ? `<div class="archive-retained-banner"><strong>Archived / ${esc(REASONS[record.archive_reason] || record.archive_reason)}</strong><span>${esc(date(record.archived_at))} / ${esc(facility(record.location_id))} / ${esc(record.status)}</span><p>${esc(record.archive_notes || '')}</p></div>
        <div class="button-row"><button class="primary-button" data-restore-equipment="${esc(record.id)}">Restore Equipment</button><button class="secondary-button" data-archive-financial="${esc(record.id)}">Financial Record</button></div>
        <dl class="archive-metadata"><div><dt>Serial number</dt><dd>${esc(record.asset_code || 'Not set')}</dd></div><div><dt>Asset tag</dt><dd>${esc(record.asset_tag || 'Not set')}</dd></div><div><dt>Manufacturer / model</dt><dd>${esc([record.manufacturer,record.model].filter(Boolean).join(' / ') || 'Not set')}</dd></div></dl>
        <div class="button-row archive-sections" role="tablist" aria-label="Retained equipment records">${Object.entries(SECTIONS).map(([key,label]) => `<button class="secondary-button" role="tab" aria-selected="${state.section === key}" data-archive-section="${key}">${label}</button>`).join('')}</div>` : `
        <form class="archive-filters"><label>Search archived equipment<input name="query" maxlength="200" value="${esc(state.query)}" type="search"></label><label>Facility<select name="location"><option value="">All facilities</option>${deps.getLocations().map(l => `<option value="${esc(l.id)}" ${l.id === state.location ? 'selected' : ''}>${esc(l.name)}</option>`).join('')}</select></label><button class="secondary-button" type="submit">Filter</button></form>`}
      ${state.error ? `<p role="alert">${esc(state.error)}</p><button class="secondary-button" data-archive-retry>Retry</button>` : state.loading ? '<p role="status">Loading retained records...</p>' : record ? `
        <div class="archive-history">${state.related?.rows.map(renderRow).join('') || '<p class="muted">No records.</p>'}</div>${paging(state.relatedPage, state.related?.total || 0, 'related')}` : `
        <p class="muted">${state.data?.total || 0} archived equipment records</p><div class="archive-list">${state.data?.rows.map(row => `<article class="archive-card"><div class="archive-retained-banner">Archived / ${esc(REASONS[row.archive_reason] || row.archive_reason)}</div><h3>${esc(row.name)}</h3><p class="asset-facility">${esc(row.facility || 'Unassigned')}</p><p>${esc(row.status)} / ${esc(date(row.archived_at))}</p><div class="button-row"><button class="secondary-button" data-archive-record="${esc(row.id)}">View Record</button><button class="primary-button" data-restore-equipment="${esc(row.id)}">Restore</button></div></article>`).join('') || '<p class="muted">No archived equipment.</p>'}</div>${paging(state.page, state.data?.total || 0, 'list')}`}
    </div>`;
  }
  function dirty() {
    return [...(doc.querySelector('#edit-asset-form')?.elements || [])].some(e => !e.disabled && (e.type === 'checkbox' ? e.checked !== e.defaultChecked : e.tagName === 'SELECT' ? e.selectedIndex !== Math.max(0, [...e.options].findIndex(o => o.defaultSelected)) : ['INPUT','TEXTAREA'].includes(e.tagName) && e.value !== e.defaultValue));
  }
  async function openAction(id, restore = false, button) {
    syncOwner();
    if (!deps.canManage()) return;
    if (dirty()) { deps.showNotice('Save equipment edits before removing it.', 'warning'); return; }
    dispose(); trigger = button; dialogScope = deps.getContext();
    const scope = dialogScope, companyScope = owner;
    dialog = doc.createElement('dialog'); dialog.className = 'travel-dialog relocation-dialog equipment-archive-dialog';
    dialog.setAttribute('aria-labelledby', 'equipment-archive-title');
    const active = dialog;
    let review, busy = false, selected = new Set(), reason = '', notes = '', page = 1;
    const current = () => dialog === active && scope === deps.getContext() && deps.canManage();
    const close = '<button class="secondary-button" type="button" data-archive-cancel>Cancel</button>';
    const root = () => review.nodes.find(n => n.id === id);
    const chosen = () => review.nodes.filter(n => restore || n.id === id || selected.has(n.branch_id));
    const names = rows => `<ul class="relocation-names">${rows.map(n => `<li>${esc(n.name || n.title)}</li>`).join('')}</ul>`;
    function paint(markup) {
      active.innerHTML = `<h2 id="equipment-archive-title">${restore ? 'Restore Equipment' : 'Archive / Delete Equipment'}</h2>${markup}`;
      active.querySelector('[data-archive-cancel]')?.addEventListener('click', () => { if (!busy) dispose(); });
    }
    function choices() {
      const branches = review.nodes.filter(n => n.parent_asset_id === id);
      paint(`<h3>${esc(root().name)}</h3><p><strong class="asset-facility">${esc(facility(root().location_id))}</strong> / ${esc(root().status)}</p><form data-archive-action-form>
        ${restore ? `<p>Restore ${review.nodes.length} record${review.nodes.length === 1 ? '' : 's'} to workflow. Condition and facility stay unchanged. PM remains paused until its next due date is reviewed.</p>${names(review.nodes)}` : `
          <label>Reason<select name="reason" required><option value="">Choose reason</option>${Object.entries(REASONS).map(([key,label]) => `<option value="${key}" ${reason === key ? 'selected' : ''}>${label}</option>`).join('')}</select></label>
          ${branches.length ? `<fieldset class="relocation-branches"><legend>Also archive attached equipment</legend>${branches.slice((page-1)*12,page*12).map(n => `<label class="relocation-choice"><input type="checkbox" data-archive-branch="${esc(n.id)}" ${selected.has(n.id) ? 'checked' : ''}><span>${esc(n.name)}<small>${review.nodes.filter(c => c.branch_id === n.id).length} record(s), including attached equipment</small></span></label>`).join('')}</fieldset>${branches.length > 12 ? `<div class="button-row"><button type="button" data-branch-page="-1" ${page === 1 ? 'disabled' : ''}>Previous</button><span>${page} / ${Math.ceil(branches.length/12)}</span><button type="button" data-branch-page="1" ${page * 12 >= branches.length ? 'disabled' : ''}>Next</button></div>` : ''}<p>Unchecked branches stay active and detach from this equipment. Each separation is recorded in history.</p>` : ''}
          ${review.parent ? `<p>This equipment will detach from ${esc(review.parent.name)}. Restoration will not automatically reattach it.</p>` : ''}
          <p>Removed equipment leaves normal workflow. Its history, files, part links and financial record stay intact. PM is paused. A manager or admin can restore it.</p>`}
        <label>${restore ? 'Restoration note' : 'Notes'}<textarea name="notes" maxlength="2000" rows="3" ${restore || reason === 'other' ? 'required' : ''}>${esc(notes)}</textarea></label>
        <div class="travel-dialog-actions">${close}<button class="primary-button" type="submit">Review ${restore ? 'Restoration' : 'Removal'}</button></div></form>`);
      const form = active.querySelector('form');
      form.oninput = () => { reason = form.elements.reason?.value || ''; notes = form.elements.notes.value; form.elements.notes.required = restore || reason === 'other'; };
      active.querySelectorAll('[data-archive-branch]').forEach(input => { input.onchange = () => input.checked ? selected.add(input.dataset.archiveBranch) : selected.delete(input.dataset.archiveBranch); });
      active.querySelectorAll('[data-branch-page]').forEach(b => { b.onclick = () => { page += Number(b.dataset.branchPage); choices(); }; });
      form.onsubmit = event => { event.preventDefault(); reason = form.elements.reason?.value || ''; notes = form.elements.notes.value; if (current()) confirm(); };
      form.querySelector('select,textarea').focus();
    }
    function confirm() {
      const rows = chosen(), ids = new Set(rows.map(n => n.id));
      const blockers = [...review.work, ...review.requests].filter(w => ids.has(w.asset_id));
      paint(`<h3>${restore ? 'Restore' : 'Remove'} ${rows.length} equipment record${rows.length === 1 ? '' : 's'}?</h3>${names(rows)}
        ${!restore ? `<p>Reason: <strong>${esc(REASONS[reason])}</strong></p>` : ''}<p>${esc(notes)}</p>
        ${!restore && blockers.length ? `<p role="alert">Resolve these work orders, production actions, follow-ups or requests before removal.</p>${names(blockers)}` : `<p>${restore ? 'PM stays paused. Condition and facility are unchanged.' : 'History stays intact. This is reversible; it does not permanently erase equipment.'}</p>`}
        <p role="alert" data-action-error></p><div class="travel-dialog-actions">${close}<button class="secondary-button" data-action-back>Back</button><button class="${restore ? 'primary-button' : 'danger-action-button'}" data-action-save ${!restore && blockers.length ? 'disabled' : ''}>${restore ? 'Restore Equipment' : 'Archive / Delete Equipment'}</button></div><button class="secondary-button" data-action-retry hidden>Review Again</button>`);
      active.querySelector('[data-action-back]').onclick = choices;
      active.querySelector('[data-action-retry]').onclick = loadReview;
      active.querySelector('[data-action-save]').onclick = save;
      active.querySelector('[data-action-back]').focus();
    }
    async function save() {
      if (busy || !current()) return;
      busy = true; active.querySelectorAll('button').forEach(b => { b.disabled = true; });
      try {
        const result = await rpc(restore ? 'restore_equipment' : 'archive_equipment', { p_asset_id: id, p_review_token: review.token, p_notes: notes,
          ...(!restore ? { p_branch_ids: [...selected], p_reason: reason } : {}) });
        if (!current()) return;
        if (!Array.isArray(result?.[restore ? 'restored_ids' : 'archived_ids'])) throw Error('Could not verify the result. Review again.');
        try { await saved(result); }
        catch (error) {
          if (companyScope !== `${deps.getCompanyContext?.() || deps.getCompanyId()}` || (dialog && dialog !== active)) return;
          busy = false; dispose(); deps.showNotice(`Change saved. ${error.message || 'Reopen equipment to load its current state.'}`, 'warning'); return;
        }
        if (companyScope !== `${deps.getCompanyContext?.() || deps.getCompanyId()}` || (dialog && dialog !== active)) return;
        busy = false; dispose();
        deps.showNotice(restore ? 'Equipment restored. Review paused PM before resuming it.' : 'Equipment removed from workflow. History is retained in Archived Equipment.');
        if (deps.isVisible()) { state.record = null; await loadList(); }
      } catch (error) {
        if (!current()) return;
        active.querySelector('[data-action-error]').textContent = error.message || 'Could not verify the change. Review again.';
        active.querySelector('[data-action-retry]').hidden = false;
        active.querySelector('[data-action-retry]').disabled = false;
        active.querySelector('[data-archive-cancel]').disabled = false;
      } finally { busy = false; }
    }
    async function loadReview() {
      paint(`<p role="status">Checking equipment and connected records...</p>${close}`);
      try {
        const result = await rpc('equipment_archive_review', { p_asset_id: id });
        if (!current()) return;
        if (!Array.isArray(result?.nodes) || !result.nodes.some(n => n.id === id) || !result.token) throw Error('Could not verify the equipment hierarchy.');
        review = result;
        if (Boolean(root().archived_at) !== restore) throw Error(restore ? 'This equipment is already active.' : 'This equipment is already archived.');
        selected = new Set(); page = 1; choices();
      } catch (error) { if (current()) paint(`<p role="alert">${esc(error.message || 'Could not review equipment.')}</p>${close}`); }
    }
    active.addEventListener('cancel', event => { event.preventDefault(); if (!busy) dispose(); });
    doc.body.append(active); active.showModal(); await loadReview();
  }
  async function resume(id, button) {
    syncOwner();
    if (!deps.canManage()) return;
    dispose(); trigger = button; dialogScope = deps.getContext();
    const scope = dialogScope, companyScope = owner;
    dialog = doc.createElement('dialog'); dialog.className = 'travel-dialog equipment-archive-dialog';
    const active = dialog;
    active.innerHTML = '<h2>Resume PM</h2><form><label>Reviewed next due date<input type="date" name="due" required></label><p role="alert"></p><div class="travel-dialog-actions"><button type="button" class="secondary-button" data-cancel>Cancel</button><button class="primary-button" type="submit">Resume PM</button></div></form>';
    active.querySelector('[data-cancel]').onclick = dispose;
    let busy = false;
    active.addEventListener('cancel', event => { event.preventDefault(); if (!busy) dispose(); });
    active.querySelector('form').onsubmit = async event => {
      event.preventDefault(); if (busy || scope !== deps.getContext()) return;
      busy = true; active.querySelectorAll('button').forEach(b => { b.disabled = true; });
      try {
        const row = await rpc('resume_equipment_pm', { p_schedule_id: id, p_next_due_at: active.querySelector('input').value });
        if (dialog !== active || scope !== deps.getContext()) return;
        try { await saved({ resumed_schedule: row }); }
        catch (error) {
          if (companyScope !== `${deps.getCompanyContext?.() || deps.getCompanyId()}` || (dialog && dialog !== active)) return;
          dispose(); deps.showNotice(`PM saved. ${error.message || 'Reopen PM to load its current state.'}`, 'warning'); return;
        }
        if (companyScope !== `${deps.getCompanyContext?.() || deps.getCompanyId()}` || (dialog && dialog !== active)) return;
        dispose(); deps.showNotice('PM resumed with the reviewed due date.');
      } catch (error) { if (dialog === active) { active.querySelector('[role="alert"]').textContent = `${error.message} Close this review and check PM before retrying.`; active.querySelector('[data-cancel]').disabled = false; } }
      finally { busy = false; }
    };
    doc.body.append(active); active.showModal(); active.querySelector('input').focus();
  }
  function bind() {
    syncOwner();
    if (dialog && dialogScope !== deps.getContext()) dispose();
    doc.querySelectorAll('[data-open-equipment-archive]').forEach(b => { b.onclick = openList; });
    doc.querySelectorAll('[data-archive-equipment]').forEach(b => { b.onclick = () => openAction(b.dataset.archiveEquipment, false, b); });
    doc.querySelectorAll('[data-restore-equipment]').forEach(b => { b.onclick = () => openAction(b.dataset.restoreEquipment, true, b); });
    doc.querySelectorAll('[data-resume-equipment-pm]').forEach(b => { b.onclick = () => resume(b.dataset.resumeEquipmentPm, b); });
    doc.querySelectorAll('[data-archive-record]').forEach(b => { b.onclick = () => openRecord(b.dataset.archiveRecord); });
    doc.querySelectorAll('[data-archive-work]').forEach(b => { b.onclick = () => deps.openWork(b.dataset.archiveWork); });
    doc.querySelectorAll('[data-archive-financial]').forEach(b => { b.onclick = () => deps.openFinancial(b.dataset.archiveFinancial); });
    doc.querySelector('[data-archive-back]')?.addEventListener('click', () => state.record ? openList() : deps.leave());
    doc.querySelector('[data-archive-retry]')?.addEventListener('click', () => state.record ? loadRelated() : loadList());
    doc.querySelector('.archive-filters')?.addEventListener('submit', event => { event.preventDefault(); state.query = event.target.elements.query.value.trim(); state.location = event.target.elements.location.value; state.page = 1; loadList(); });
    doc.querySelectorAll('[data-archive-section]').forEach(b => { b.onclick = () => { state.section = b.dataset.archiveSection; state.relatedPage = 1; loadRelated(); }; });
    const tabs = [...doc.querySelectorAll('[data-archive-section]')];
    tabs.forEach((tab, index) => {
      tab.tabIndex = tab.dataset.archiveSection === state.section ? 0 : -1;
      tab.onkeydown = event => {
        const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
        if (next < 0) return;
        event.preventDefault(); focusSection = true; tabs[next].click();
      };
    });
    if (focusSection) { tabs.find(tab => tab.dataset.archiveSection === state.section)?.focus(); if (!state.loading) focusSection = false; }
    doc.querySelectorAll('[data-archive-page]').forEach(b => { b.onclick = () => { const [kind, delta] = b.dataset.archivePage.split(':'); if (kind === 'list') { state.page += Number(delta); loadList(); } else { state.relatedPage += Number(delta); loadRelated(); } }; });
  }
  return { render, bind, dispose, reset, openList, openRecord, openAction };
}
