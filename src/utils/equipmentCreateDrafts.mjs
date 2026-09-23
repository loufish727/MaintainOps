const PREFIX = 'maintainops.equipmentCreateDraft.v1:';
const FIELDS = new Set(['name', 'asset_code', 'asset_tag', 'manufacturer', 'model', 'location_existing', 'location_new', 'asset_type', 'parent_asset_id', 'location_id', 'safety_devices_required']);

// Per-tab unfinished creation only. Equipment records are written by the existing save workflow.
export function createEquipmentCreateDrafts({ documentRef: doc = document, getScope, storage = () => sessionStorage, now = Date.now }) {
  const memory = new Map();
  let focus;
  const formNow = () => doc.querySelector('#create-asset-form');
  const controls = form => [...form.querySelectorAll('[name]')].filter(field => FIELDS.has(field.name) && !['file', 'hidden'].includes(field.type));
  const fields = form => controls(form).map(field => [field.name, field.type === 'checkbox' ? field.checked : field.value]);
  function remove(scope) {
    memory.delete(scope);
    try { storage().removeItem(PREFIX + scope); } catch { /* Storage may be disabled. */ }
  }
  function read(scope) {
    try {
      const raw = storage().getItem(PREFIX + scope);
      if (!memory.has(scope) && raw && raw.length < 100000) memory.set(scope, JSON.parse(raw));
    } catch { /* Keep memory-only drafts when browser storage is unavailable. */ }
    const saved = memory.get(scope);
    if (!saved || !Number.isFinite(saved.at) || saved.at > now() || now() - saved.at > 86400000
      || !Array.isArray(saved.fields) || !saved.fields.every(pair => Array.isArray(pair) && FIELDS.has(pair[0])
        && (pair[0] === 'safety_devices_required' ? typeof pair[1] === 'boolean' : typeof pair[1] === 'string'))) {
      remove(scope); return null;
    }
    return saved;
  }
  function save(form) {
    const scope = form?.dataset.equipmentScope;
    if (!scope || scope !== getScope()) return;
    const saved = { at: now(), fields: fields(form) };
    memory.set(scope, saved);
    try { storage().setItem(PREFIX + scope, JSON.stringify(saved)); } catch { /* Do not interrupt entry on quota/private-mode errors. */ }
    return { scope, fields: JSON.stringify(saved.fields) };
  }
  function capture() {
    const form = formNow(), active = doc.activeElement;
    if (form?.dataset.equipmentDirty) save(form);
    const rect = form?.contains(active) ? active.getBoundingClientRect() : null;
    // Do not refocus an input the user has scrolled away from.
    focus = rect && form.dataset.equipmentScope === getScope() && rect.bottom > 0 && rect.top < doc.defaultView.innerHeight
      ? { scope: getScope(), name: active.name, start: active.selectionStart, end: active.selectionEnd } : null;
  }
  function restore() {
    const form = formNow(), scope = getScope();
    if (!form || !scope) return;
    form.dataset.equipmentScope = scope;
    const saved = read(scope);
    if (saved) {
      for (const [name, value] of saved.fields) {
        const field = controls(form).find(item => item.name === name);
        if (!field) continue;
        if (field.type === 'checkbox') field.checked = value;
        else {
          field.value = value;
          if (field.tagName === 'SELECT' && ![...field.options].some(option => option.value === value)) {
            field.setCustomValidity('Choose an available option.');
          }
        }
      }
      form.dataset.equipmentDirty = 'true';
    }
    const field = focus?.scope === scope && controls(form).find(item => item.name === focus.name);
    if (field) {
      if (focus.start != null) field.setSelectionRange(focus.start, focus.end);
      field.focus({ preventScroll: true });
    }
    focus = null;
  }
  function clear(submitted) {
    if (!submitted || JSON.stringify(read(submitted.scope)?.fields) !== submitted.fields) return;
    const form = formNow();
    if (form?.dataset.equipmentScope === submitted.scope && JSON.stringify(fields(form)) !== submitted.fields) {
      save(form); return;
    }
    remove(submitted.scope);
    if (form?.dataset.equipmentScope === submitted.scope) form.reset();
  }
  function reset() {
    memory.clear(); focus = null;
    try {
      const store = storage();
      for (let i = store.length - 1; i >= 0; i--) if (store.key(i)?.startsWith(PREFIX)) store.removeItem(store.key(i));
    } catch { /* Sign-out must work even without browser storage. */ }
  }
  for (const name of ['input', 'change']) doc.addEventListener(name, event => {
    const form = event.target.form;
    if (form?.id !== 'create-asset-form' || !FIELDS.has(event.target.name)) return;
    event.target.setCustomValidity('');
    form.dataset.equipmentDirty = 'true'; save(form);
  });
  doc.addEventListener('reset', event => {
    const form = event.target;
    if (form.id !== 'create-asset-form' || form.dataset.equipmentScope !== getScope()) return;
    remove(form.dataset.equipmentScope); delete form.dataset.equipmentDirty;
    controls(form).forEach(field => field.setCustomValidity(''));
  });
  doc.defaultView.addEventListener('pagehide', capture);
  doc.addEventListener('visibilitychange', () => { if (doc.hidden) capture(); });
  return { capture, restore, snapshot: save, clear, reset };
}
