(function () {
  /*
   * Module contract: owns local Message Center UI event binding only.
   * Requires app.js-owned state access, storage, render callback, composer note helper,
   * and textarea auto-grow helper.
   * May update message filter/search state, clear local work-order composer link,
   * sync composer type UI, add quick-reply text, and navigate from a linked message
   * thread to Work Orders.
   * Must not mark threads read, send messages/replies, create threads, mutate business
   * records, touch Supabase/RLS, or own auth/company/location state.
   */
  function bindWorkspaceMessageUiEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;
    const renderWorkspace = options.renderWorkspace;
    const messageComposerScopeNote = options.messageComposerScopeNote;
    const autoGrowTextarea = options.autoGrowTextarea;

    if (!state || typeof renderWorkspace !== "function") return;

    const storage = options.storage || localStorage;
    doc.querySelectorAll("[data-message-compose]").forEach((button) => button.addEventListener("click", () => options.openComposer?.()));
    doc.querySelector("[data-message-close-compose]")?.addEventListener("click", () => options.closeComposer?.());
    doc.querySelector("[data-message-exit]")?.addEventListener("click", () => options.exitMessages?.());
    doc.querySelectorAll("[data-message-view]").forEach((button) => button.addEventListener("click", () => options.setMessageView?.(button.dataset.messageView)));
    doc.querySelectorAll("[data-quote-message]").forEach((button) => button.addEventListener("click", () => options.quoteMessage?.(button.dataset.quoteMessage)));
    doc.querySelector("[data-clear-message-quote]")?.addEventListener("click", () => options.quoteMessage?.(null));
    doc.querySelector("[data-message-new]")?.addEventListener("click", () => options.jumpToLatest?.());
    doc.querySelector(".message-list")?.addEventListener("scroll", () => options.onHistoryScroll?.(), { passive: true });
    doc.querySelector("[data-message-back]")?.addEventListener("click", () => options.backToMessages?.());
    doc.querySelectorAll("[data-retry-messages]").forEach((button) => button.addEventListener("click", () => options.retryMessages?.()));
    doc.querySelector("[data-message-older]")?.addEventListener("click", async (event) => {
      event.currentTarget.disabled = true;
      const button = event.currentTarget;
      try { await options.loadOlderMessages?.(); } finally { if (button.isConnected) button.disabled = false; }
    });

    doc.querySelectorAll("[data-message-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.messageFilter;
        state.setMessageThreadFilter(value);
        if (typeof state.resetMessageThreadsPage === "function") state.resetMessageThreadsPage();
        storage.setItem("maintainops.messageThreadFilter", value);
        storage.setItem("maintainops.messageThreadsPage", "1");
        renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-open-linked-work-order]").forEach((button) => {
      button.addEventListener("click", () => {
        if (options.openLinkedWorkOrder) {
          options.openLinkedWorkOrder(button.dataset.openLinkedWorkOrder);
          return;
        }
        state.setActiveWorkOrderId(button.dataset.openLinkedWorkOrder);
        state.setActiveAssetId(null);
        state.setActivePartId(null);
        state.setQuickFixMode(false);
        state.setCreateWorkOrderMode(false);
        state.setActiveSection("work");
        storage.setItem("maintainops.activeSection", "work");
        renderWorkspace();
      });
    });

    const clearMessageWorkLink = doc.querySelector("[data-clear-message-work-link]");
    if (clearMessageWorkLink) {
      clearMessageWorkLink.addEventListener("click", () => {
        const field = doc.querySelector('#message-thread-form [name="work_order_id"]');
        if (field) field.value = "";
        state.setMessageComposerWorkOrderId("");
        storage.setItem("maintainops.messageComposerWorkOrderId", "");
        renderWorkspace();
      });
    }

    const messageSearch = doc.querySelector("#message-search");
    if (messageSearch) {
      messageSearch.addEventListener("input", () => {
        const value = messageSearch.value;
        state.setMessageSearchQuery(value);
        if (typeof state.resetMessageThreadsPage === "function") state.resetMessageThreadsPage();
        storage.setItem("maintainops.messageSearchQuery", value);
        storage.setItem("maintainops.messageThreadsPage", "1");
        renderWorkspace();
        const nextSearch = doc.querySelector("#message-search");
        if (!nextSearch) return;
        nextSearch.focus({ preventScroll: true });
        if (nextSearch.selectionStart == null) return;
        nextSearch.setSelectionRange(messageSearch.selectionStart, messageSearch.selectionEnd);
      });
    }

    const messageThreadForm = doc.querySelector("#message-thread-form");
    if (messageThreadForm) {
      const typeSelect = messageThreadForm.querySelector("#message-thread-type");
      const directField = messageThreadForm.querySelector(".message-direct-field");
      const scopeNote = messageThreadForm.querySelector("#message-scope-note");
      if (typeSelect && directField && scopeNote && typeof messageComposerScopeNote === "function") {
        const syncMessageComposer = () => {
          const isDirect = typeSelect.value === "direct";
          directField.classList.toggle("hidden-section", !isDirect);
          const directSelect = directField.querySelector("select");
          if (directSelect) { directSelect.disabled = !isDirect; directSelect.required = isDirect; }
          const title = messageThreadForm.querySelector("[name='title']");
          if (title) title.required = !isDirect;
          scopeNote.textContent = messageComposerScopeNote(typeSelect.value);
          options.showExistingConversation?.(isDirect ? directSelect?.value : "");
        };
        typeSelect.addEventListener("change", syncMessageComposer);
        directField.querySelector("select")?.addEventListener("change", syncMessageComposer);
        syncMessageComposer();
      }
    }

    doc.querySelectorAll("[data-message-person]").forEach((button) => {
      button.addEventListener("click", () => {
        const form = doc.querySelector("#message-thread-form");
        if (!form) return;
        const details = form.querySelector("details");
        const typeSelect = form.querySelector("#message-thread-type");
        const directSelect = form.querySelector("select[name='direct_user_id']");
        const directField = form.querySelector(".message-direct-field");
        const scopeNote = form.querySelector("#message-scope-note");
        const subjectField = form.querySelector("input[name='title']");
        if (details) details.open = true;
        if (typeSelect) typeSelect.value = "direct";
        if (directSelect) {
          directSelect.value = button.dataset.messagePerson || "";
          directSelect.disabled = false;
        }
        if (directField) directField.classList.remove("hidden-section");
        if (scopeNote && typeof messageComposerScopeNote === "function") {
          scopeNote.textContent = messageComposerScopeNote("direct");
        }
        if (subjectField) subjectField.focus();
        directSelect?.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });

    doc.querySelectorAll("[data-quick-reply]").forEach((button) => {
      button.addEventListener("click", () => {
        const replyForm = doc.querySelector("#message-reply-form");
        const field = replyForm?.querySelector("textarea[name='body']");
        if (!field) return;
        const prefix = field.value.trim();
        field.value = prefix ? `${prefix}\n${button.dataset.quickReply}` : button.dataset.quickReply;
        field.dispatchEvent(new Event("input", { bubbles: true }));
        field.focus();
        if (typeof autoGrowTextarea === "function") autoGrowTextarea(field);
      });
    });
  }

  window.MaintainOpsWorkspaceMessageUiEvents = {
    bindWorkspaceMessageUiEvents,
  };
})();
