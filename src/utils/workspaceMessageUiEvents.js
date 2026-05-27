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

    doc.querySelectorAll("[data-message-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.messageFilter;
        state.setMessageThreadFilter(value);
        storage.setItem("maintainops.messageThreadFilter", value);
        renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-open-linked-work-order]").forEach((button) => {
      button.addEventListener("click", () => {
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
        storage.setItem("maintainops.messageSearchQuery", value);
        renderWorkspace();
        const nextSearch = doc.querySelector("#message-search");
        if (!nextSearch) return;
        nextSearch.focus();
        nextSearch.setSelectionRange(value.length, value.length);
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
          if (directSelect) directSelect.disabled = !isDirect;
          scopeNote.textContent = messageComposerScopeNote(typeSelect.value);
        };
        typeSelect.addEventListener("change", syncMessageComposer);
        syncMessageComposer();
      }
    }

    doc.querySelectorAll("[data-quick-reply]").forEach((button) => {
      button.addEventListener("click", () => {
        const replyForm = doc.querySelector("#message-reply-form");
        const field = replyForm?.querySelector("textarea[name='body']");
        if (!field) return;
        const prefix = field.value.trim();
        field.value = prefix ? `${prefix}\n${button.dataset.quickReply}` : button.dataset.quickReply;
        field.focus();
        if (typeof autoGrowTextarea === "function") autoGrowTextarea(field);
      });
    });
  }

  window.MaintainOpsWorkspaceMessageUiEvents = {
    bindWorkspaceMessageUiEvents,
  };
})();
