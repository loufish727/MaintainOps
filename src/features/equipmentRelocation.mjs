const CONDITIONS = { running: 'Running', watch: 'Watch', degraded: 'Degraded', offline: 'Offline / Down' };

export function createEquipmentRelocation(deps) {
  const doc = deps.documentRef, esc = deps.escapeHtml;
  let dialog, trigger, openedScope;
  function dispose() {
    if (dialog) { dialog.close(); dialog.remove(); dialog = null; }
    if (trigger?.isConnected) trigger.focus();
    trigger = null;
  }
  function dirty(form) {
    return [...(form?.elements || [])].some(e => !e.disabled && (e.type === 'checkbox' ? e.checked !== e.defaultChecked
      : e.tagName === 'SELECT' ? e.selectedIndex !== Math.max(0, [...e.options].findIndex(o => o.defaultSelected))
        : ['INPUT','TEXTAREA'].includes(e.tagName) && e.value !== e.defaultValue));
  }
  async function open(assetId, button) {
    if (!deps.canRelocate()) return;
    if (dirty(doc.querySelector('#edit-asset-form'))) {
      deps.showNotice('Save equipment edits before relocating.', 'warning'); return;
    }
    dispose(); trigger = button; openedScope = deps.getContext();
    const companyId = deps.getCompanyId(), scope = openedScope;
    dialog = doc.createElement('dialog'); dialog.className = 'travel-dialog relocation-dialog';
    dialog.setAttribute('aria-labelledby', 'relocation-heading');
    const active = dialog;
    let review, selected = new Set(), destination = '', page = 1, busy = false, uncertain = false;
    const current = () => dialog === active && scope === deps.getContext() && deps.canRelocate();
    const root = () => review.nodes.find(n => n.id === assetId);
    const branches = () => review.nodes.filter(n => n.parent_asset_id === assetId).sort((a,b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
    const moving = () => review.nodes.filter(n => n.id === assetId || selected.has(n.branch_id));
    const staying = () => review.nodes.filter(n => n.id !== assetId && !selected.has(n.branch_id));
    const heading = '<h2 id="relocation-heading">Relocate Equipment</h2>';
    const cancel = '<button type="button" class="secondary-button" data-relocate-cancel>Cancel</button>';
    const names = rows => `<ul class="relocation-names">${rows.map(n => `<li>${esc(n.name)}</li>`).join('')}</ul>`;
    function paint(markup) {
      active.innerHTML = `${heading}${markup}`;
      active.querySelector('[data-relocate-cancel]')?.addEventListener('click', () => { if (!busy) dispose(); });
    }
    function choices() {
      if (!current()) { dispose(); return; }
      const rows = branches(), pages = Math.max(1, Math.ceil(rows.length / 12)); page = Math.min(page, pages);
      const asset = root();
      paint(`<h3>${esc(asset.name)}</h3><p class="muted">Current facility: <strong class="asset-facility">${esc(asset.facility || 'Unassigned')}</strong> / ${esc(CONDITIONS[asset.status] || asset.status)}</p>
        <form data-relocate-form><label for="relocation-destination">New facility</label><select id="relocation-destination" required><option value="">Choose facility</option>${deps.getLocations().filter(l => l.id !== asset.location_id).map(l => `<option value="${esc(l.id)}" ${destination === l.id ? 'selected' : ''}>${esc(l.name)}</option>`).join('')}</select>
        <fieldset class="relocation-branches"><legend>Attached equipment to move</legend>${rows.length ? rows.slice((page-1)*12,page*12).map(branch => {
          const descendants = review.nodes.filter(n => n.branch_id === branch.id && n.id !== branch.id);
          return `<div class="relocation-branch"><label class="relocation-choice"><input type="checkbox" data-relocate-branch="${esc(branch.id)}" ${selected.has(branch.id) ? 'checked' : ''}><span>${esc(branch.name)}${descendants.length ? `<small>Plus ${descendants.length} attached record${descendants.length === 1 ? '' : 's'}</small>` : ''}</span></label>${descendants.length ? `<details><summary>Attached records</summary>${names(descendants)}</details>` : ''}</div>`;
        }).join('') : '<p class="muted">No attached equipment.</p>'}</fieldset>
        ${pages > 1 ? `<nav class="travel-pagination" aria-label="Attached equipment pages"><button type="button" class="secondary-button" data-relocate-page="-1" ${page === 1 ? 'disabled' : ''}>Previous</button><span>${page} / ${pages}</span><button type="button" class="secondary-button" data-relocate-page="1" ${page === pages ? 'disabled' : ''}>Next</button></nav>` : ''}
        <p class="relocation-impact" data-relocate-impact></p><p class="muted">Unchecked branches stay at their current facility and are detached from this equipment, with history recorded.</p>
        ${review.parent ? `<p class="relocation-impact">${esc(asset.name)} will be detached from ${esc(review.parent.name)}.</p>` : ''}
        <p class="muted">Condition, history, files, part links and financial records are retained. Existing work orders and stock keep their facilities. PM follows the equipment. Area / spot is cleared for moved equipment.</p>
        <div class="travel-dialog-actions">${cancel}<button type="submit" class="primary-button">Review Relocation</button></div></form>`);
      const impact = () => { active.querySelector('[data-relocate-impact]').textContent = `${moving().length} moving / ${staying().length} staying`; };
      impact();
      active.querySelector('#relocation-destination').onchange = e => { destination = e.target.value; };
      active.querySelectorAll('[data-relocate-branch]').forEach(input => { input.onchange = () => { input.checked ? selected.add(input.dataset.relocateBranch) : selected.delete(input.dataset.relocateBranch); impact(); }; });
      active.querySelectorAll('[data-relocate-page]').forEach(b => { b.onclick = () => { page += Number(b.dataset.relocatePage); choices(); }; });
      active.querySelector('form').onsubmit = e => { e.preventDefault(); if (current() && destination) confirmation(); };
      active.querySelector('#relocation-destination').focus();
    }
    function confirmation() {
      const target = deps.getLocations().find(l => l.id === destination);
      if (!target || !current()) return;
      paint(`<h3>${esc(root().name)}</h3><p>Relocate from <strong>${esc(root().facility || 'Unassigned')}</strong> to <strong class="asset-facility">${esc(target.name)}</strong>?</p>
        <section><h3>Moving (${moving().length})</h3>${names(moving())}</section>
        ${staying().length ? `<section><h3>Staying (${staying().length})</h3>${names(staying())}<p class="relocation-impact">${branches().filter(n => !selected.has(n.id)).map(n => esc(n.name)).join(', ')} will be detached from ${esc(root().name)}. Their own attached records stay linked.</p></section>` : ''}
        ${review.parent ? `<p class="relocation-impact">${esc(root().name)} will be detached from ${esc(review.parent.name)}.</p>` : ''}
        <p class="muted">These changes are recorded in equipment history. Existing work orders, stock and financial records will not be relocated. Condition is unchanged.</p>
        <p role="alert" data-relocate-error></p><div class="travel-dialog-actions">${cancel}<button type="button" class="secondary-button" data-relocate-back>Back</button><button type="button" class="primary-button" data-relocate-save>Relocate Equipment</button></div><button type="button" class="secondary-button" data-relocate-retry hidden>Review Again</button>`);
      active.querySelector('[data-relocate-back]').onclick = choices;
      active.querySelector('[data-relocate-retry]').onclick = loadReview;
      active.querySelector('[data-relocate-save]').onclick = save;
      active.querySelector('[data-relocate-back]').focus();
    }
    async function save() {
      if (busy || uncertain || !current()) return;
      busy = true;
      active.querySelectorAll('button').forEach(b => { b.disabled = true; });
      const errorNode = active.querySelector('[data-relocate-error]'); errorNode.textContent = 'Saving relocation...';
      try {
        const result = await deps.timeout(deps.client().rpc('relocate_equipment', {
          p_company_id: companyId, p_asset_id: assetId, p_location_id: destination, p_move_branch_ids: [...selected], p_review_token: review.token,
        }), 'The response timed out. Review again to check whether the relocation completed.', 15000);
        if (!current()) return;
        if (result.error) throw result.error;
        if (!Array.isArray(result.data?.assets) || !Array.isArray(result.data?.events)) throw Error('Could not verify the result. Review again before retrying.');
        busy = false; dispose(); deps.onSaved(result.data); deps.showNotice('Equipment relocated. History and linked records retained.');
      } catch (e) {
        if (!current()) return;
        uncertain = true; errorNode.textContent = e.message || 'Could not relocate equipment. Review again before retrying.';
        active.querySelector('[data-relocate-retry]').hidden = false;
      } finally {
        busy = false;
        if (current()) active.querySelectorAll('button').forEach(b => { b.disabled = b.hasAttribute('data-relocate-save') || b.hasAttribute('data-relocate-back'); });
      }
    }
    async function loadReview() {
      if (!current()) return;
      busy = false; uncertain = false; destination = ''; page = 1;
      paint(`<p role="status">Loading equipment and attached records...</p>${cancel}`);
      try {
        const result = await deps.timeout(deps.client().rpc('equipment_relocation_review', {p_company_id: companyId,p_asset_id: assetId}), 'Equipment review took too long. Try again.',15000);
        if (!current()) return;
        if (result.error) throw result.error;
        if (!Array.isArray(result.data?.nodes) || !result.data.nodes.some(n => n.id === assetId) || !result.data.token) throw Error('Could not verify the equipment hierarchy.');
        review = result.data; selected = new Set(branches().map(n => n.id)); choices();
      } catch (e) {
        if (!current()) return;
        paint(`<p role="alert">${esc(e.message || 'Equipment review failed.')}</p><div class="travel-dialog-actions">${cancel}<button type="button" class="secondary-button" data-relocate-retry>Review Again</button></div>`);
        active.querySelector('[data-relocate-retry]').onclick = loadReview;
      }
    }
    active.addEventListener('cancel', e => { e.preventDefault(); if (!busy) dispose(); });
    doc.body.append(active); active.showModal(); await loadReview();
  }
  function bind() {
    if (dialog && openedScope !== deps.getContext()) dispose();
    doc.querySelectorAll('[data-relocate-equipment]').forEach(button => { button.onclick = () => open(button.dataset.relocateEquipment,button); });
  }
  return { bind, dispose };
}
