const CONDITIONS = { running: 'Running', watch: 'Watch', degraded: 'Degraded', offline: 'Offline / Down' };
const CONDITION_NOTES = { running: 'Operating normally.', watch: 'Monitor for a possible issue.', degraded: 'Known issue, still usable.', offline: 'Do not count on this equipment.' };
const PAGE_SIZE = 12;

export function createTravelingUnits(deps) {
  const { escapeHtml: esc, documentRef: doc } = deps;
  let scope = '', page = 1, total = null, key = '', pending = null, error = '', rows = [], generation = 0;
  let dialog = null, returnFocus = null;
  const context = () => `${deps.getContext().userId || ''}:${deps.getContext().companyId || ''}`;
  function closeDialog() {
    if (dialog) { dialog.close(); dialog.remove(); dialog = null; }
    returnFocus?.isConnected && returnFocus.focus();
    returnFocus = null;
  }
  function invalidate() { generation++; key = ''; pending = null; error = ''; }
  function syncScope() {
    if (scope === context()) return;
    closeDialog(); scope = context(); page = 1; total = null; rows = []; invalidate();
  }
  const selectionKey = () => `${scope}:${page}`;
  const date = value => value ? new Date(value).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : '';
  function render() {
    syncScope();
    const ready = key === selectionKey() && !pending && !error;
    return `<div class="travel-board" data-travel-board>
      <div class="travel-heading"><div><h2>Traveling Units</h2><p class="muted">All company facilities${total === null ? '' : ` / ${total} units`}</p></div>
        <button type="button" class="secondary-button back-action-button" data-travel-back>Back to Equipment</button></div>
      ${error ? `<p role="alert">${esc(error)} <button type="button" class="secondary-button" data-travel-retry>Try again</button></p>` : ''}
      <div class="travel-grid" aria-busy="${!ready}">${ready ? rows.map(row => {
        const a = row.asset, status = Object.hasOwn(CONDITIONS, a.status) ? a.status : 'watch';
        const facility = row?.current_facility || deps.getLocations().find(l => l.id === a.location_id)?.name || 'Facility unavailable';
        return `<article class="travel-unit travel-${status}" data-travel-unit="${esc(a.id)}">
          <header><span class="chip asset-${status}">${CONDITIONS[status]}</span><h3>${esc(a.name)}</h3></header>
          <dl><div class="travel-current"><dt>Current facility</dt><dd>${esc(facility)}</dd></div>
            <div><dt>Previous facility</dt><dd>${row ? esc(row.previous_facility || (row.moved_at ? 'See equipment history' : 'No move recorded')) : 'Loading...'}</dd></div>
            <div><dt>Last moved</dt><dd>${row ? row.moved_at ? `${esc(date(row.moved_at))}<small>${esc(row.moved_by || 'Former team member')}</small>` : 'No move recorded' : 'Loading...'}</dd></div>
            <div><dt>Open work orders</dt><dd>${row ? Number(row.open_work_count) : 'Loading...'}</dd></div></dl>
          <p class="travel-condition-note">${CONDITION_NOTES[status]}</p>
          <footer>${deps.canEdit() ? `<button type="button" class="secondary-button" data-travel-location="${esc(a.id)}" ${!row ? 'disabled' : ''}>Update Location</button>
            <button type="button" class="secondary-button" data-travel-condition="${esc(a.id)}" ${!row ? 'disabled' : ''}>Update Condition</button>` : ''}
            <button type="button" class="text-button" data-travel-details="${esc(a.id)}">Equipment Details</button></footer>
        </article>`;
      }).join('') || '<p class="muted">No traveling units in this company.</p>' : error ? '' : '<p role="status">Loading traveling units...</p>'}</div>
      ${ready && total > PAGE_SIZE ? `<nav class="travel-pagination" aria-label="Traveling units pages"><button type="button" class="secondary-button" data-travel-page="prev" ${page === 1 ? 'disabled' : ''}>Previous</button><span>Page ${page} of ${Math.ceil(total / PAGE_SIZE)}</span><button type="button" class="secondary-button" data-travel-page="next" ${page * PAGE_SIZE >= total ? 'disabled' : ''}>Next</button></nav>` : ''}
    </div>`;
  }
  async function load() {
    syncScope();
    const requestedKey = selectionKey();
    if (pending || key === requestedKey) return;
    const ticket = ++generation, expectedScope = scope;
    key = requestedKey; error = '';
    pending = deps.client().rpc('traveling_units_summary', { p_company_id: deps.getContext().companyId, p_page: page });
    try {
      const result = await deps.timeout(pending, 'Traveling units took too long to load.', 15000);
      if (ticket !== generation || expectedScope !== context() || !deps.isVisible()) return;
      if (result.error) throw result.error;
      if (!Array.isArray(result.data?.units) || !Number.isSafeInteger(result.data.total) || !Number.isSafeInteger(result.data.page)) throw new Error('Invalid traveling units response.');
      rows = result.data.units; total = result.data.total; page = result.data.page; key = selectionKey();
      rows.forEach(row => deps.replaceAsset(row.asset));
    } catch (e) {
      if (ticket !== generation || expectedScope !== context() || !deps.isVisible()) return;
      error = `Could not load traveling unit details: ${e.message || 'Please try again.'}`;
    } finally {
      if (ticket === generation) {
        pending = null;
        if (expectedScope === context() && deps.isVisible()) deps.renderWorkspace();
      }
    }
  }
  function openUpdate(assetId, mode, trigger) {
    if (!deps.canEdit()) return;
    const row = rows.find(r => r.asset.id === assetId);
    if (!row || error || pending || key !== selectionKey()) return;
    closeDialog(); returnFocus = trigger;
    const a = row.asset, expectedScope = scope, companyId = deps.getContext().companyId;
    const location = mode === 'location';
    const choices = location ? deps.getLocations().map(l => [l.id, l.name]) : Object.entries(CONDITIONS);
    const current = location ? a.location_id : a.status;
    dialog = doc.createElement('dialog');
    dialog.className = 'travel-dialog'; dialog.setAttribute('aria-labelledby', 'travel-update-title');
    dialog.innerHTML = `<form class="travel-update"><h2 id="travel-update-title">${location ? 'Update Location' : 'Update Condition'}</h2><h3>${esc(a.name)}</h3>
      <p class="asset-facility">Current facility: ${esc(row.current_facility || 'Unavailable')}</p>
      <label for="travel-value">${location ? 'Facility' : 'Condition'}</label><select id="travel-value" name="value" required>${choices.map(([id, label]) => `<option value="${esc(id)}" ${id === current ? 'selected' : ''}>${esc(label)}</option>`).join('')}</select>
      <p class="muted">${location ? 'History stays with this unit. Existing work orders keep their facility and assignee. Stock stays at its facility. Condition will not change.' : 'Location and existing work orders will not change.'}</p>
      <p role="alert" data-travel-error></p><div class="travel-dialog-actions"><button type="button" class="secondary-button" data-travel-cancel>Cancel</button><button type="submit" class="primary-button">Save ${location ? 'Location' : 'Condition'}</button></div>
      <button type="button" class="secondary-button" data-travel-recheck hidden>Reload latest unit</button></form>`;
    const activeDialog = dialog, form = dialog.querySelector('form'), message = dialog.querySelector('[data-travel-error]');
    let submitting = false;
    const currentContext = () => context() === expectedScope && deps.isVisible() && dialog === activeDialog;
    dialog.addEventListener('cancel', event => { event.preventDefault(); if (!submitting) closeDialog(); });
    dialog.querySelector('[data-travel-cancel]').onclick = () => { if (!submitting) closeDialog(); };
    dialog.querySelector('[data-travel-recheck]').onclick = () => { closeDialog(); invalidate(); deps.renderWorkspace(); };
    form.onsubmit = async event => {
      event.preventDefault();
      if (submitting || !currentContext() || !deps.canEdit()) return;
      const value = form.elements.value.value;
      if (value === current) { closeDialog(); return; }
      submitting = true;
      form.querySelectorAll('button,select').forEach(node => { node.disabled = true; });
      message.textContent = 'Saving...';
      try {
        const response = await deps.timeout(deps.client().rpc(location ? 'update_traveling_equipment_location' : 'update_traveling_equipment_condition', location ? {
          p_company_id: companyId, p_asset_id: a.id, p_location_id: value, p_expected_location_id: a.location_id, p_expected_revision: a.traveling_revision,
        } : { p_company_id: companyId, p_asset_id: a.id, p_status: value, p_expected_status: a.status, p_expected_location_id: a.location_id, p_expected_revision: a.traveling_revision }), 'The save timed out.', 15000);
        if (!currentContext()) return;
        if (response.error) throw response.error;
        if (!response.data?.id) throw new Error('No saved equipment record was returned.');
        deps.replaceAsset(response.data);
        closeDialog(); invalidate(); deps.renderWorkspace();
        deps.showNotice(`${location ? 'Location' : 'Condition'} updated.`, 'success');
      } catch (e) {
        if (!currentContext()) return;
        message.textContent = `Could not confirm the update: ${e.message || 'Connection unavailable.'} Check the latest unit before trying again.`;
        form.querySelector('[data-travel-cancel]').disabled = false;
        const recheck = form.querySelector('[data-travel-recheck]'); recheck.hidden = false; recheck.disabled = false;
      } finally { submitting = false; }
    };
    doc.body.append(dialog); dialog.showModal();
  }
  function bind() {
    syncScope();
    if (!deps.isVisible() || !doc.querySelector('[data-travel-board]')) { closeDialog(); invalidate(); return; }
    doc.querySelector('[data-travel-back]').onclick = () => { closeDialog(); invalidate(); deps.closeBoard(); };
    doc.querySelector('[data-travel-retry]')?.addEventListener('click', () => { invalidate(); deps.renderWorkspace(); });
    doc.querySelectorAll('[data-travel-page]').forEach(button => { button.onclick = () => { page += button.dataset.travelPage === 'next' ? 1 : -1; invalidate(); deps.renderWorkspace(); }; });
    doc.querySelectorAll('[data-travel-details]').forEach(button => { button.onclick = () => deps.openDetails(button.dataset.travelDetails); });
    for (const mode of ['location', 'condition']) doc.querySelectorAll(`[data-travel-${mode}]`).forEach(button => {
      button.onclick = () => openUpdate(button.getAttribute(`data-travel-${mode}`), mode, button);
    });
    void load();
  }
  return { render, bind, invalidate, dispose: () => { closeDialog(); invalidate(); rows = []; total = null; } };
}
