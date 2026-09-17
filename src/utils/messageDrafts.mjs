// Drafts are memory-only, scoped to the signed-in user/company and conversation.
export function createMessageDrafts() {
  let scope = "";
  const drafts = new Map();
  let view = null;
  function capture(doc, nextScope) {
    if (scope !== nextScope) { drafts.clear(); view = null; scope = nextScope; return; }
    const root = doc.querySelector(".message-center");
    if (!root) return;
    for (const form of root.querySelectorAll("form")) {
      const key = form.dataset.threadId || "composer";
      drafts.set(key, {
        fields: [...form.querySelectorAll("[name]")].filter((field) => field.type !== "hidden").map((field) => [field.name, field.value]),
        open: form.querySelector("details")?.open,
      });
    }
    const list = root.querySelector(".message-list");
    const focused = root.contains(doc.activeElement) ? doc.activeElement : null;
    view = { thread: root.dataset.threadId, top: list?.scrollTop, loading: list?.getAttribute("aria-busy") === "true",
      focusId: focused?.id, formId: focused?.form?.id, name: focused?.name,
      start: focused?.selectionStart, end: focused?.selectionEnd, y: doc.defaultView.scrollY };
  }
  function restore(doc) {
    const root = doc.querySelector(".message-center");
    if (!root) return;
    for (const form of root.querySelectorAll("form")) {
      const draft = drafts.get(form.dataset.threadId || "composer");
      if (!draft) continue;
      for (const [name, value] of draft.fields) {
        const field = [...form.querySelectorAll("[name]")].find((item) => item.name === name);
        if (field && field.type !== "hidden") field.value = value;
      }
      const details = form.querySelector("details");
      if (details) details.open = draft.open;
    }
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
  function clear(doc, key, submitted = {}) {
    const form = key === "composer" ? doc.querySelector("#message-thread-form") : doc.querySelector("#message-reply-form");
    const isCurrent = form && (key === "composer" || form.dataset.threadId === key);
    const fields = isCurrent ? [...form.querySelectorAll("[name]")].map((field) => [field.name, field.value]) : drafts.get(key)?.fields || [];
    const values = Object.fromEntries(fields);
    if (Object.entries(submitted).some(([name, value]) => values[name] != null && values[name].trim() !== value)) return;
    drafts.delete(key);
    if (isCurrent) {
      form.reset();
      const details = form.querySelector("details");
      if (details) details.open = false;
    }
    view = null;
  }
  return { capture, restore, clear };
}
