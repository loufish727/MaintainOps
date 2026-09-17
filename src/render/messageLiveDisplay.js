(function () {
  function createMessageLiveDisplay(deps) {
    const document = deps.documentRef;
    const { updateMessageNavBadges, totalUnreadMessages, isConversationArchived, filteredMessageThreads, LIST_ITEMS_PER_PAGE, workspaceUiState, renderMessageThreadButton, bindWorkspaceMessageThreadEvents, showNotice, setActiveMessageThreadIdState, setMessageComposerOpenState, loadActiveMessageThreadMessages, markMessageThreadRead, renderWorkspace, renderListPagination, bindWorkspaceFilterPaginationEvents, renderMessageList, bindMessageWorkflowEvents, setMessageQuote, unreadMessageCount, acknowledgeVisibleMessages } = deps;
    function renderLiveMessages() {
      const { activeMessageThreadId, messageThreads, messageHistory, messageQuotes, messageComposerOpen, messageView, messagesByThreadId } = deps.getState();
      updateMessageNavBadges();
      const root = document.querySelector(".message-center");
      if (!root) return;
      const count = root.querySelector(".message-inbox-count");
      const unread = totalUnreadMessages();
      if (count) count.textContent = `${unread} unread conversation${unread === 1 ? "" : "s"}`;
      const active = messageThreads.find((thread) => thread.id === activeMessageThreadId);
      if (active) {
        const archived = isConversationArchived(active);
        const archive = root.querySelector("[data-archive-message-thread]");
        if (archive) { archive.dataset.archive = String(!archived); archive.textContent = archived ? "Move to inbox" : "Archive conversation"; }
        const mute = root.querySelector("[data-mute-message-thread]");
        if (mute) { mute.dataset.mute = String(!active.preferences?.muted); mute.textContent = active.preferences?.muted ? "Unmute conversation" : "Mute conversation"; }
        const note = root.querySelector(".message-archive-note");
        if (note) note.hidden = !archived;
        const quote = messageQuotes[active.id];
        if (quote && !(messagesByThreadId[active.id] || []).some((row) => row.id === quote.id)) {
          delete messageQuotes[active.id];
          root.querySelector(".message-reply-context")?.remove();
          const field = root.querySelector('[name="reply_to_id"]');
          if (field) field.value = "";
        }
      }
      const railList = root.querySelector(".message-thread-list");
      if (railList) {
        const filtered = filteredMessageThreads();
        const pages = Math.max(1, Math.ceil(filtered.length / LIST_ITEMS_PER_PAGE));
        const page = Math.min(Math.max(workspaceUiState.getMessageThreadsPage(), 1), pages);
        workspaceUiState.setMessageThreadsPage(page);
        const top = railList.scrollTop;
        railList.innerHTML = filtered.slice((page - 1) * LIST_ITEMS_PER_PAGE, page * LIST_ITEMS_PER_PAGE).map(renderMessageThreadButton).join("") || '<p class="message-empty">No conversations match this view.</p>';
        railList.scrollTop = top;
        bindWorkspaceMessageThreadEvents({ documentRef: railList, getActiveThreadId: deps.getActiveThreadId,
          getActiveSection: deps.getActiveSection, showNotice,
          state: { setActiveMessageThreadId: setActiveMessageThreadIdState, setMessageComposerOpen: setMessageComposerOpenState },
          loadActiveMessageThreadMessages, markMessageThreadRead, renderWorkspace });
        const pagination = root.querySelector("[data-message-pagination]");
        if (pagination) {
          pagination.innerHTML = renderListPagination("messages", filtered.length, page, pages);
          bindWorkspaceFilterPaginationEvents({ documentRef: pagination, state: workspaceUiState, renderWorkspace });
        }
      }
      // Never replace the composer, search input or app shell during an incoming update.
      const list = root.querySelector(".message-list");
      const history = messageHistory[activeMessageThreadId];
      if (!list || !history || messageComposerOpen || messageView !== "conversations") return;
      if (list.getAttribute("aria-busy") === "true") { renderWorkspace(); return; }
      const atBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 70;
      const top = list.scrollTop;
      const openMenus = [...list.querySelectorAll(".message-bubble details[open]")].map((menu) => ({
        message: menu.closest("[data-message-id]").dataset.messageId,
        label: menu.querySelector("summary").getAttribute("aria-label"),
      }));
      const focused = list.contains(document.activeElement) ? document.activeElement : null;
      const focusMessage = focused?.closest("[data-message-id]")?.dataset.messageId;
      const focusLabel = focused?.getAttribute("aria-label");
      const older = list.querySelector("[data-message-older]");
      if (older) older.remove();
      list.innerHTML = renderMessageList(history.rows);
      for (const bubble of list.querySelectorAll(".message-bubble")) {
        for (const menu of bubble.querySelectorAll("details")) {
          if (openMenus.some((item) => item.message === bubble.dataset.messageId && item.label === menu.querySelector("summary").getAttribute("aria-label"))) menu.open = true;
        }
        if (focusMessage === bubble.dataset.messageId && focusLabel) {
          [...bubble.querySelectorAll("[aria-label]")].find((node) => node.getAttribute("aria-label") === focusLabel)?.focus({ preventScroll: true });
        }
      }
      if (history.hasOlder && older) list.prepend(older);
      list.scrollTop = atBottom ? list.scrollHeight : top;
      const counter = root.querySelector(".message-history-count");
      if (counter) counter.textContent = `${(messagesByThreadId[activeMessageThreadId] || []).length} messages`;
      bindMessageWorkflowEvents(list);
      list.querySelectorAll("[data-quote-message]").forEach((button) => button.addEventListener("click", () => setMessageQuote(button.dataset.quoteMessage)));
      const indicator = root.querySelector("[data-message-new]");
      if (indicator) indicator.hidden = atBottom || unreadMessageCount(activeMessageThreadId) === 0;
      const announcement = root.querySelector("[data-message-announcement]");
      if (announcement && unreadMessageCount(activeMessageThreadId)) announcement.textContent = "New message received.";
      if (atBottom && !document.hidden && unreadMessageCount(activeMessageThreadId)) acknowledgeVisibleMessages();
    }
    return { renderLiveMessages };
  }
  window.MaintainOpsMessageLiveDisplay = { createMessageLiveDisplay };
})();
