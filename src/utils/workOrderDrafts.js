(function () {
  const PREFIX = 'maintainops.workOrderDraft.v1:';
  const FORMS = '#quick-update-work-order-form, #complete-work-order-form, #edit-work-order-form, #comment-form';
  const NAMES = new Set(['title', 'description', 'resolution_summary', 'failure_cause', 'completion_notes', 'actual_minutes', 'follow_up_needed', 'due_at', 'priority', 'type', 'assigned_to', 'procedure_template_id', 'asset_id', 'new_asset_name', 'equipment_choice_mode', 'machine_down', 'body']);
  const OUTCOME = ['resolution_summary', 'failure_cause', 'completion_notes', 'actual_minutes', 'follow_up_needed'];

  // Unsubmitted edits only, isolated per tab, account, facility and order. Never write business data here.
  function createWorkOrderDrafts({ documentRef: doc = document, getScope, storage = () => sessionStorage, now = Date.now }) {
    const memory = new Map();
    const observed = new WeakMap();
    let revision = 0, epoch = 0, focus, expanded;
    const root = () => doc.querySelector('[data-work-order-editor]');
    const key = id => getScope() && id ? `${getScope()}:${id}` : '';
    const current = node => node?.isConnected && node.dataset.workDraftScope && node.dataset.workDraftScope === key(node.dataset.workOrderEditor);
    const controls = node => [...(node?.querySelectorAll(FORMS) || [])].flatMap(form => [...form.elements]).filter(field => NAMES.has(field.name));
    const value = field => field.type === 'checkbox' ? field.checked : field.value;
    function showDraftState(node, draft) {
      for (const form of node?.querySelectorAll(FORMS) || []) {
        const dirty = [...form.elements].some(field => draft.fields[field.name]);
        let notice = form.querySelector('[data-work-draft-notice]');
        if (dirty && !notice) {
          notice = doc.createElement('p'); notice.className = 'muted'; notice.dataset.workDraftNotice = '';
          notice.textContent = 'Unsaved changes retained';
          form.insertBefore(notice, form.querySelector('button[type="submit"]'));
        }
        if (notice) notice.hidden = !dirty;
      }
    }
    function write(scope, draft) {
      if (!Object.keys(draft.fields).length) {
        memory.delete(scope);
        try { storage().removeItem(PREFIX + scope); } catch { /* Memory remains usable. */ }
        return;
      }
      memory.set(scope, draft);
      try { storage().setItem(PREFIX + scope, JSON.stringify(draft)); } catch { /* Private mode/quota must not interrupt typing. */ }
    }
    function read(scope) {
      if (!scope) return { fields: {} };
      let draft = memory.get(scope);
      if (!draft) try {
        const raw = storage().getItem(PREFIX + scope);
        if (raw && raw.length < 100000) draft = JSON.parse(raw);
      } catch { /* Ignore invalid or unavailable storage. */ }
      if (!draft || !Number.isFinite(draft.at) || draft.at > now() || now() - draft.at > 86400000
        || !draft.fields || typeof draft.fields !== 'object' || Array.isArray(draft.fields)
        || !Object.entries(draft.fields).every(([name, entry]) => NAMES.has(name) && entry
          && typeof entry.value === (['follow_up_needed', 'machine_down'].includes(name) ? 'boolean' : 'string')
          && Number.isFinite(entry.revision))) {
        write(scope, { fields: {} }); return { fields: {} };
      }
      memory.set(scope, draft);
      return draft;
    }
    function apply(field, entry) {
      if (field.type === 'checkbox') field.checked = entry.value;
      else if (field.type === 'radio') field.checked = field.value === entry.value;
      else if (field.tagName !== 'SELECT' || [...field.options].some(option => option.value === entry.value)) field.value = entry.value;
      else field.setCustomValidity('Previous selection is no longer available. Choose again.');
      observed.set(field, value(field));
    }
    function save(field) {
      const node = field?.closest('[data-work-order-editor]');
      if (!current(node) || !field.form?.matches(FORMS) || !NAMES.has(field.name) || field.type === 'radio' && !field.checked) return;
      const scope = node.dataset.workDraftScope;
      const draft = read(scope);
      if (observed.get(field) === value(field) && (!draft.fields[field.name] || draft.fields[field.name].value === value(field))) return;
      field.setCustomValidity('');
      draft.at = now();
      draft.fields[field.name] = { value: value(field), revision: ++revision };
      for (const sibling of controls(node).filter(item => item.name === field.name)) apply(sibling, draft.fields[field.name]);
      write(scope, draft);
      showDraftState(node, draft);
    }
    function capture() {
      const node = root();
      if (!current(node)) { focus = null; return; }
      for (const field of controls(node)) if (observed.has(field) && observed.get(field) !== value(field)) save(field);
      expanded = { scope: node.dataset.workDraftScope, forms: [...node.querySelectorAll(FORMS)].filter(form => form.closest('details')?.open).map(form => form.id), options: Boolean(node.querySelector('.completion-options')?.open) };
      const active = doc.activeElement;
      const rect = node.contains(active) && active.name ? active.getBoundingClientRect() : null;
      focus = rect && rect.bottom > 0 && rect.top < doc.defaultView.innerHeight
        ? { scope: node.dataset.workDraftScope, form: active.form?.id, name: active.name, start: active.selectionStart, end: active.selectionEnd } : null;
    }
    function restore() {
      const node = root();
      if (!node) return;
      const scope = key(node.dataset.workOrderEditor);
      node.dataset.workDraftScope = scope;
      const draft = read(scope);
      for (const field of controls(node)) {
        observed.set(field, value(field));
        if (draft.fields[field.name]) apply(field, draft.fields[field.name]);
      }
      showDraftState(node, draft);
      if (expanded?.scope === scope) {
        for (const form of node.querySelectorAll(FORMS)) if (expanded.forms.includes(form.id) && form.closest('details')) form.closest('details').open = true;
        if (expanded.options && node.querySelector('.completion-options')) node.querySelector('.completion-options').open = true;
      }
      if (!node.querySelector('#complete-work-order-form') && OUTCOME.some(name => draft.fields[name])) {
        const panel = node.querySelector('#edit-work-order-form')?.closest('details');
        if (panel) panel.open = true;
      }
      const active = focus?.scope === scope && controls(node).find(field => field.form.id === focus.form && field.name === focus.name);
      if (active) {
        if (focus.start != null) active.setSelectionRange(focus.start, focus.end);
        active.focus({ preventScroll: true });
      }
      focus = null;
    }
    function snapshot(id) {
      capture();
      const scope = key(id);
      return { scope, epoch, fields: { ...read(scope).fields } };
    }
    function completionFields(id) {
      const draft = snapshot(id).fields;
      return Object.fromEntries(OUTCOME.filter(name => draft[name]).map(name => [name,
        name === 'actual_minutes' ? Number(draft[name].value) || 0 : name === 'follow_up_needed' ? draft[name].value : draft[name].value || null]));
    }
    function acknowledge(token, payload) {
      if (!token.scope || token.epoch !== epoch) return;
      const draft = read(token.scope);
      for (const [name, entry] of Object.entries(token.fields)) {
        if (!Object.hasOwn(payload, name) || draft.fields[name]?.revision !== entry.revision) continue;
        const saved = name === 'actual_minutes' ? String(Number(entry.value) || 0) : name === 'body' ? entry.value.trim() : String(entry.value ?? '');
        if (saved === String(payload[name] ?? '')) delete draft.fields[name];
      }
      write(token.scope, draft);
    }
    function reset() {
      memory.clear(); focus = null; expanded = null; epoch++;
      try {
        const store = storage();
        for (let i = store.length - 1; i >= 0; i--) if (store.key(i)?.startsWith(PREFIX)) store.removeItem(store.key(i));
      } catch { /* Sign-out must work without storage. */ }
    }
    for (const name of ['input', 'change']) doc.addEventListener(name, event => save(event.target));
    doc.defaultView.addEventListener('pagehide', capture);
    doc.addEventListener('visibilitychange', () => { if (doc.hidden) capture(); });
    return { capture, restore, snapshot, completionFields, acknowledge, reset };
  }
  window.MaintainOpsWorkOrderDrafts = { createWorkOrderDrafts };
})();
