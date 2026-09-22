// Text only: per-tab recovery, never a shared-device or server-side message cache.
const PREFIX = "maintainops.messageDrafts.v1:";
const MAX_AGE = 24 * 60 * 60 * 1000;
const FORMS = "#message-thread-form,#message-reply-form,.message-discussion-form";
const FIELDS = /* @__PURE__ */ new Set(["thread_type", "direct_user_id", "title", "body", "work_order_id", "reply_to_id"]);
export function clearStoredMessageDrafts(storage = () => globalThis.sessionStorage) {
  try {
    const store = storage();
    for (let i = (store?.length || 0) - 1; i >= 0; i--) {
      const key = store.key(i);
      if (key?.startsWith(PREFIX)) store.removeItem(key);
    }
  } catch { /* Storage can be unavailable. */ }
}
export function createMessageDrafts({ storage = () => globalThis.sessionStorage, now = Date.now } = {}) {
  let scope = "";
  const drafts = new Map();
  const inboxPositions = new Map();
  let view = null;
  let composerOpen = false;
  let getScope;
  const keyFor = form => form.id === "message-thread-form" ? "composer" : form.dataset.attachmentKey || form.dataset.threadId;
  function persist() {
    if (!scope) return;
    while (drafts.size > 30) drafts.delete(drafts.keys().next().value);
    try {
      if (!drafts.size) storage()?.removeItem(PREFIX + scope);
      else storage()?.setItem(PREFIX + scope, JSON.stringify({ at: now(), composerOpen, drafts: [...drafts] }));
    } catch { /* Private mode/quota: retain the in-memory draft without breaking the form. */ }
  }
  function activate(nextScope) {
    scope = nextScope; drafts.clear(); inboxPositions.clear(); view = null; composerOpen = false;
    try {
      const raw = storage()?.getItem(PREFIX + scope);
      if (!raw || raw.length > 500000) return;
      const saved = JSON.parse(raw);
      if (!Number.isFinite(saved.at) || saved.at > now() || now() - saved.at > MAX_AGE || !Array.isArray(saved.drafts)) {
        storage()?.removeItem(PREFIX + scope); return;
      }
      for (const entry of saved.drafts.slice(-30)) {
        if (!Array.isArray(entry) || typeof entry[0] !== "string" || entry[0].length > 100 || !Array.isArray(entry[1]?.fields)) continue;
        const fields = entry[1].fields.filter(pair => Array.isArray(pair) && FIELDS.has(pair[0]) && typeof pair[1] === "string" && pair[1].length <= 12000);
        if (fields.length) drafts.set(entry[0], { fields, open: entry[1].open === true });
      }
      composerOpen = saved.composerOpen === true && drafts.has("composer");
    } catch { /* Malformed storage is not a reason to block sign-in. */ }
    return { composerOpen, workOrderId: Object.fromEntries(drafts.get("composer")?.fields || []).work_order_id || "",
      quotes: [...drafts].map(([thread, draft]) => [thread, Object.fromEntries(draft.fields).reply_to_id]).filter(([, id]) => id) };
  }
  function saveForm(form) {
    if (!scope || (getScope && getScope() !== scope) || form?.dataset.draftScope !== scope) return;
    const key = keyFor(form);
    if (!key) return;
    const fields = [...form.querySelectorAll("[name]")].filter(field => FIELDS.has(field.name) && field.type !== "file")
      .map(field => [field.name, field.value.slice(0, 12000)]);
    // Do not resurrect a blank form after a successful send.
    if (fields.some(([name, value]) => value && !["thread_type", "reply_to_id"].includes(name))) {
      drafts.delete(key);
      drafts.set(key, { fields, open: form.querySelector("details")?.open });
    } else drafts.delete(key);
    persist();
  }
  function save(doc) {
    if (getScope && getScope() !== scope) return;
    const root = doc.querySelector(".message-center");
    if (root?.dataset.draftScope === scope) composerOpen = root.classList.contains("has-composer");
    doc.querySelectorAll(FORMS).forEach(saveForm);
  }
  function bind(doc, scopeProvider) {
    getScope = scopeProvider;
    const changed = event => {
      const form = event.target?.closest?.(FORMS);
      if (form) saveForm(form);
    };
    doc.addEventListener("input", changed);
    doc.addEventListener("change", changed);
    doc.addEventListener("visibilitychange", () => { if (doc.hidden) save(doc); });
    doc.defaultView.addEventListener("pagehide", () => save(doc));
  }
  function capture(doc, nextScope) {
    if (scope !== nextScope) return activate(nextScope);
    const root = doc.querySelector(".message-center");
    if (!root) return;
    const rail = root.querySelector(".message-thread-list");
    if (rail?.clientHeight) inboxPositions.set(root.dataset.inboxView, rail.scrollTop);
    save(doc);
    const list = root.querySelector(".message-list");
    const focused = root.contains(doc.activeElement) ? doc.activeElement : null;
    view = { thread: root.dataset.threadId, top: list?.scrollTop, loading: list?.getAttribute("aria-busy") === "true",
      focusId: focused?.id, formId: focused?.form?.id, name: focused?.name,
      start: focused?.selectionStart, end: focused?.selectionEnd, y: doc.defaultView.scrollY };
  }
  function restoreForm(form) {
    form.dataset.draftScope = scope;
    const draft = drafts.get(keyFor(form));
    if (!draft) return;
    for (const [name, value] of draft.fields) {
      const field = [...form.querySelectorAll("[name]")].find(item => item.name === name);
      // Hidden relationships belong to the validated app state, not browser storage.
      if (!field || ["hidden", "file"].includes(field.type)) continue;
      if (field.tagName === "SELECT" && ![...field.options].some(option => option.value === value)) {
        field.value = ""; continue;
      }
      field.value = value;
    }
    const details = form.querySelector("details");
    if (details) details.open = draft.open;
  }
  function restore(doc) {
    const root = doc.querySelector(".message-center");
    if (!root) return;
    root.dataset.draftScope = scope;
    composerOpen = root.classList.contains("has-composer");
    const rail = root.querySelector(".message-thread-list");
    if (rail) rail.scrollTop = inboxPositions.get(root.dataset.inboxView) || 0;
    root.querySelectorAll(FORMS).forEach(restoreForm);
    persist();
    root.querySelector("#message-thread-type")?.dispatchEvent(new Event("change"));
    const list = root.querySelector(".message-list");
    if (list) list.scrollTop = view?.thread === root.dataset.threadId && !view.loading ? (view.top || 0) : list.scrollHeight;
    if (view?.thread !== root.dataset.threadId) return;
    const focused = view.focusId ? doc.getElementById(view.focusId)
      : [...(doc.getElementById(view.formId)?.querySelectorAll("[name]") || [])].find((field) => field.name === view.name);
    if (focused) {
      focused.focus({ preventScroll: true });
      if (view.start != null) try { focused.setSelectionRange(view.start, view.end); } catch { /* Non-text inputs have no caret. */ }
      doc.defaultView.scrollTo(0, view.y);
    }
  }
  function clear(doc, key, submitted = {}, expectedScope = scope) {
    if (expectedScope !== scope || (getScope && getScope() !== scope)) return;
    const form = [...doc.querySelectorAll(FORMS)].find(item => keyFor(item) === key);
    const isCurrent = form?.dataset.draftScope === scope;
    const fields = isCurrent ? [...form.querySelectorAll("[name]")].map((field) => [field.name, field.value]) : drafts.get(key)?.fields || [];
    const values = Object.fromEntries(fields);
    if (Object.entries(submitted).some(([name, value]) => values[name] != null && values[name].trim() !== value)) return;
    drafts.delete(key);
    if (isCurrent) {
      form.reset();
      // Linked-order subjects can have a nonempty defaultValue; reset alone revives them.
      form.querySelectorAll("[name]").forEach(field => {
        if (FIELDS.has(field.name) && field.name !== "thread_type") field.value = "";
      });
      const details = form.querySelector("details");
      if (details) details.open = false;
    }
    view = null;
    persist();
  }
  function reset() {
    scope = ""; drafts.clear(); inboxPositions.clear(); view = null; composerOpen = false;
    clearStoredMessageDrafts(storage);
  }
  return { capture, restore, clear, bind, save, saveForm, restoreForm, reset };
}
