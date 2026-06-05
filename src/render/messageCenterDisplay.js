(function () {
  /*
   * Module contract: renders Message Center markup and existing data-* contracts only.
   * Dependencies are injected from app.js so this module does not own app state,
   * bind events, mutate records, call Supabase, touch auth/session startup, storage,
   * public QR submit, SQL, or RLS.
   */
  function createMessageCenterDisplayHelpers(deps = {}) {
    const {
      filteredMessageThreads,
      totalUnreadMessages,
      teamMemberName,
      escapeHtml,
      messageComposerScopeNote,
      recentMessageLinkWorkOrders,
      statusLabel,
      renderMessageThreadButton,
      messageThreadScopeLabel,
      renderMessageList,
    } = deps;

    function personInitials(name) {
      const parts = String(name || "?")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      return (parts.length ? parts.map((part) => part[0]).join("") : "?")
        .slice(0, 2)
        .toUpperCase();
    }

    function renderMessageCenter() {
      const messagesReady = deps.getMessagesReady();
      if (!messagesReady) {
        return `<p class="muted">Run supabase/step-next-message-center.sql to enable company, location, and direct message threads.</p>`;
      }
      const messageThreads = deps.getMessageThreads();
      const activeMessageThreadId = deps.getActiveMessageThreadId();
      const messagesByThreadId = deps.getMessagesByThreadId();
      const workOrders = deps.getWorkOrders();
      const messageComposerWorkOrderId = deps.getMessageComposerWorkOrderId();
      const messageComposerOpen = deps.getMessageComposerOpen();
      const companyMembers = deps.getCompanyMembers();
      const session = deps.getSession();
      const messageWorkOrderLinksReady = deps.getMessageWorkOrderLinksReady();
      const messageSearchQuery = deps.getMessageSearchQuery();
      const messageThreadFilter = deps.getMessageThreadFilter();
      const messagePeople = companyMembers.filter((member) => member.user_id !== session.user.id);
    
      const activeThread = messageThreads.find((thread) => thread.id === activeMessageThreadId) || messageThreads[0];
      const threadMessages = activeThread ? (messagesByThreadId[activeThread.id] || []) : [];
      const visibleThreads = filteredMessageThreads();
      const linkedDraftWorkOrder = workOrders.find((workOrder) => workOrder.id === messageComposerWorkOrderId);
      const renderMessagePerson = (member) => {
        const personName = teamMemberName(member.user_id);
        return `
          <span class="message-person-card" title="${escapeHtml(personName)}">
            <span class="message-person-avatar" aria-hidden="true">${escapeHtml(personInitials(personName))}</span>
            <span class="message-person-name">${escapeHtml(personName)}</span>
          </span>
        `;
      };
    
      return `
        <section class="message-center">
          <div class="message-layout">
            <aside class="message-thread-rail">
              <div class="message-rail-header">
                <div>
                  <h3>Messages</h3>
                  <p>${totalUnreadMessages()} unread</p>
                </div>
              </div>
              <div class="message-people-strip" aria-label="Company message contacts">
                ${messagePeople.map(renderMessagePerson).join("") || `<span class="muted">No teammates added yet.</span>`}
              </div>
              <form class="message-thread-form" id="message-thread-form">
                <details ${messageComposerOpen || linkedDraftWorkOrder ? "open" : ""}>
                  <summary>New message</summary>
                  <div class="message-thread-fields">
                    <label>Send to
                      <select name="thread_type" id="message-thread-type">
                        <option value="location">Current location</option>
                        <option value="direct">Direct message</option>
                      </select>
                    </label>
                    <label class="message-direct-field">Person
                      <select name="direct_user_id">
                        ${companyMembers.filter((member) => member.user_id !== session.user.id).map((member) => `<option value="${member.user_id}">${escapeHtml(teamMemberName(member.user_id))}</option>`).join("") || `<option value="">No teammates yet</option>`}
                      </select>
                    </label>
                    <div class="message-scope-note" id="message-scope-note">${messageComposerScopeNote("location")}</div>
                    <label>Subject<input name="title" required placeholder="Thread subject" value="${linkedDraftWorkOrder ? `Work order: ${escapeHtml(linkedDraftWorkOrder.title)}` : ""}"></label>
                    ${linkedDraftWorkOrder ? `
                      <input name="work_order_id" type="hidden" value="${linkedDraftWorkOrder.id}">
                      <div class="message-linked-draft">
                        <span>Linked work order</span>
                        <strong>${escapeHtml(linkedDraftWorkOrder.title)}</strong>
                        <button class="text-button" data-clear-message-work-link type="button">Clear</button>
                      </div>
                    ` : `
                      <label>Recent work order
                        <select name="work_order_id" ${messageWorkOrderLinksReady ? "" : "disabled"}>
                          <option value="">No work order</option>
                          ${recentMessageLinkWorkOrders().map((workOrder) => `<option value="${workOrder.id}">${escapeHtml(workOrder.title)} - ${statusLabel(workOrder.status)}</option>`).join("")}
                        </select>
                      </label>
                    `}
                    <label>Message<textarea name="body" rows="3" required placeholder="Type the first message..."></textarea></label>
                    <p class="error-text" id="message-thread-error">${messageWorkOrderLinksReady ? "" : "Run supabase/step-next-message-work-order-links.sql before linking threads to work orders."}</p>
                    <button class="secondary-button message-action-button" type="submit">Start Thread</button>
                  </div>
                </details>
              </form>
              <label class="message-search">
                <input id="message-search" type="search" value="${escapeHtml(messageSearchQuery)}" placeholder="Search messages">
              </label>
              <div class="message-filter-bar" aria-label="Message thread filter">
                ${[
                  ["all", "All"],
                  ["unread", "Unread"],
                  ["company", "Company"],
                  ["location", "Location"],
                  ["direct", "Direct"],
                ].map(([id, label]) => `<button class="${messageThreadFilter === id ? "active" : ""}" data-message-filter="${id}" type="button">${label}</button>`).join("")}
              </div>
              <div class="message-thread-list">
                ${visibleThreads.map(renderMessageThreadButton).join("") || `<p class="muted">No threads match this filter.</p>`}
              </div>
            </aside>
            <section class="message-thread-detail">
              ${activeThread ? `
                <div class="message-chat-header">
                  <div>
                    <h3>${escapeHtml(activeThread.title)}</h3>
                    <p class="muted">${messageThreadScopeLabel(activeThread)}</p>
                  </div>
                  <div class="message-header-actions">
                    ${activeThread.work_order_id ? `<button class="secondary-button message-linked-work-button" data-open-linked-work-order="${activeThread.work_order_id}" type="button">Open Work Order</button>` : ""}
                    <span class="chip comment">${threadMessages.length} message${threadMessages.length === 1 ? "" : "s"}</span>
                    <button class="text-button danger-link" data-delete-message-thread="${escapeHtml(activeThread.id)}" type="button">Delete Thread</button>
                  </div>
                </div>
                <div class="message-list">
                  ${renderMessageList(threadMessages)}
                </div>
                <form class="message-reply-form" id="message-reply-form" data-thread-id="${activeThread.id}">
                  <div class="message-quick-replies">
                    ${["On it", "Need more info", "Waiting on parts", "Complete"].map((reply) => `<button data-quick-reply="${escapeHtml(reply)}" type="button">${escapeHtml(reply)}</button>`).join("")}
                  </div>
                  <textarea name="body" rows="2" required placeholder="Reply to this thread..."></textarea>
                  <p class="error-text" id="message-reply-error"></p>
                  <button class="secondary-button message-action-button" type="submit">Send Reply</button>
                </form>
              ` : `<p class="muted">Choose or start a thread.</p>`}
            </section>
          </div>
        </section>
      `;
    }

    return { renderMessageCenter };
  }

  window.MaintainOpsMessageCenterDisplay = {
    createMessageCenterDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createMessageCenterDisplayHelpers };
  }
})();
