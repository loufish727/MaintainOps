const PREFIX = "maintainops.checklistResponseDraft.v1:";
const SELECTOR = "[data-step-result][data-work-order-id]";
const TTL = 24 * 60 * 60 * 1000;
const instances = new WeakMap();

// UI-only, per-tab pending answers. Only the save workflow may acknowledge success.
// getScope identifies user/company/location and must stay stable across workspace renders.
export function createChecklistResponseDrafts({ documentRef: doc = document, getScope, storage = () => sessionStorage, now = Date.now }) {
  if (instances.has(doc)) return instances.get(doc);
  const memory = new Map(), tracked = new WeakMap(), decorations = new Map(), retryFields = new WeakMap();
  let revision = 0, epoch = 0;
  const scopeNow = () => String(getScope() || "");
  const kindOf = field => field.type === "checkbox" ? "checkbox" : "value";
  const valueOf = field => field.type === "checkbox" ? field.checked : field.value;
  const isControl = field => field?.matches?.(SELECTOR) && ["INPUT", "TEXTAREA", "SELECT"].includes(field.tagName)
    && !["hidden", "file", "password", "button", "submit", "reset"].includes(field.type)
    && field.dataset.workOrderId && field.dataset.stepResult;
  const controls = () => [...doc.querySelectorAll(SELECTOR)].filter(isControl);
  const keyFor = (scope, workOrderId, stepId) => PREFIX + JSON.stringify([scope, workOrderId, stepId]);

  function remove(key) {
    memory.delete(key);
    try { storage().removeItem(key); } catch { /* Storage may be disabled. */ }
    for (const [field, item] of decorations) if (item.key === key) {
      item.node.remove(); decorations.delete(field);
    }
  }
  function read(key) {
    if (!memory.has(key)) {
      try {
        const raw = storage().getItem(key);
        if (raw && raw.length <= 1000000) memory.set(key, JSON.parse(raw));
      } catch { /* Memory-only drafts also work in private mode or after quota errors. */ }
    }
    const saved = memory.get(key), time = now();
    if (!saved || !Number.isFinite(saved.at) || saved.at > time || time - saved.at >= TTL
      || !Number.isSafeInteger(saved.revision) || saved.revision < 1
      || !(saved.kind === "checkbox" ? typeof saved.value === "boolean" : saved.kind === "value" && typeof saved.value === "string")) {
      remove(key); return null;
    }
    revision = Math.max(revision, saved.revision);
    return saved;
  }
  function defaultValue(field) {
    if (field.type === "checkbox") return field.defaultChecked;
    if (field.tagName === "SELECT") return [...field.options].find(option => option.defaultSelected)?.value || field.options[0]?.value || "";
    return field.defaultValue;
  }
  function identify(field, restoring = false) {
    if (!isControl(field) || !field.isConnected) return null;
    const scope = scopeNow();
    if (!scope) return null;
    let info = tracked.get(field);
    const key = keyFor(scope, field.dataset.workOrderId, field.dataset.stepResult);
    // Old DOM can still be present while navigation/sign-out changes the current scope.
    if (info && (info.key !== key || info.epoch !== epoch)) return null;
    if (!info) {
      info = { key, scope, epoch, baseline: restoring ? valueOf(field) : defaultValue(field) };
      tracked.set(field, info);
    }
    return info;
  }
  function prune() {
    for (const [field, item] of decorations) if (!field.isConnected) {
      item.node.remove(); decorations.delete(field);
    }
  }
  function decorate(field, info) {
    const existing = decorations.get(field);
    if (existing?.node.isConnected) return existing.button;
    const node = doc.createElement("span");
    node.dataset.checklistResponseDraft = "";
    const label = doc.createElement("small");
    label.className = "muted";
    label.textContent = "Unsaved answer";
    const button = doc.createElement("button");
    button.type = "button";
    button.className = "secondary-button small";
    button.dataset.checklistDraftRetry = "";
    button.textContent = "Save answer";
    node.append(label, doc.createTextNode(" "), button);
    (field.closest("label") || field).insertAdjacentElement("afterend", node);
    retryFields.set(button, field);
    decorations.set(field, { key: info.key, node, button });
    return button;
  }
  function save(field, force = false) {
    const info = identify(field);
    if (!info) return null;
    const value = valueOf(field), previous = read(info.key), kind = kindOf(field);
    if (!previous && !force && value === info.baseline) return null;
    let saved = previous;
    if (!saved || saved.value !== value || saved.kind !== kind) {
      saved = { at: now(), revision: ++revision, kind, value };
      memory.set(info.key, saved);
      try { storage().setItem(info.key, JSON.stringify(saved)); } catch { /* Never interrupt answer entry. */ }
    }
    decorate(field, info);
    return Object.freeze({ key: info.key, revision: saved.revision, epoch });
  }
  function capture() {
    prune();
    for (const field of controls()) save(field);
  }
  function restore() {
    prune();
    const buttons = [];
    for (const field of controls()) {
      const info = identify(field, true);
      if (!info) continue;
      const saved = read(info.key);
      if (!saved) continue;
      if (saved.kind !== kindOf(field)) { remove(info.key); continue; }
      if (saved.kind === "checkbox") field.checked = saved.value;
      else field.value = saved.value;
      buttons.push(decorate(field, info));
    }
    return buttons;
  }
  function clear(token) {
    if (!token || token.epoch !== epoch) return false;
    // Capture any newer edit, including a value changed programmatically before navigation.
    for (const field of controls()) if (tracked.get(field)?.key === token.key) save(field);
    const saved = read(token.key);
    if (!saved || saved.revision !== token.revision) return false;
    for (const field of controls()) {
      const info = tracked.get(field);
      if (info?.key === token.key && info.epoch === epoch) info.baseline = saved.value;
    }
    remove(token.key);
    return true;
  }
  function keys() {
    const result = new Set(memory.keys());
    try {
      const store = storage();
      for (let i = 0; i < store.length; i++) if (store.key(i)?.startsWith(PREFIX)) result.add(store.key(i));
    } catch { /* The memory cache remains authoritative when storage cannot be read. */ }
    return result;
  }
  function hasDraft(workOrderId) {
    const scope = scopeNow();
    if (!scope) return false;
    for (const key of keys()) {
      let identity;
      try { identity = JSON.parse(key.slice(PREFIX.length)); } catch { remove(key); continue; }
      if (Array.isArray(identity) && identity[0] === scope && identity[1] === workOrderId && read(key)) return true;
    }
    return false;
  }
  function reset() {
    epoch++;
    for (const key of keys()) remove(key);
    memory.clear();
    for (const item of decorations.values()) item.node.remove();
    decorations.clear();
  }
  // Capture phase precedes the existing control-level change/save handler.
  for (const name of ["input", "change"]) doc.addEventListener(name, event => {
    if (isControl(event.target) && !event.target.disabled) save(event.target);
  }, true);
  doc.addEventListener("click", event => {
    const button = event.target.closest?.("[data-checklist-draft-retry]");
    const field = button && retryFields.get(button);
    if (!field) return;
    event.preventDefault();
    if (field.disabled || !identify(field)) return;
    field.dispatchEvent(new doc.defaultView.Event("change", { bubbles: true }));
  });
  doc.defaultView?.addEventListener("pagehide", capture);
  doc.addEventListener("visibilitychange", () => { if (doc.hidden) capture(); });
  const api = { capture, restore, snapshot: field => save(field, true), clear, reset, hasDraft };
  instances.set(doc, api);
  return api;
}
