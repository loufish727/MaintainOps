(function () {
  function createMessageCenterDisplayHelpers(deps = {}) {
    const escape = deps.escapeHtml;
    const icon = (name) => deps.icon?.(name) || "";
    const canEdit = deps.canEditOperationalRecords || (() => true);
    function renderMessageCenter() {
      if (!deps.getMessagesReady()) return '<p class="error-text" role="alert">Messages are unavailable.</p><button data-retry-messages type="button">Try again</button>';
      const threads = deps.getMessageThreads();
      const active = threads.find((thread) => thread.id === deps.getActiveMessageThreadId());
      const composing = canEdit() && deps.getMessageComposerOpen();
      const view = deps.getMessageView?.() || "conversations";
      const history = deps.getMessageHistory?.()[active?.id];
      const loading = Boolean(active && deps.getMessageHistory && !history);
      const rows = active ? (history?.rows || deps.getMessagesByThreadId()[active.id] || []).filter((row) => !row.deleted_at) : [];
      const count = active ? (deps.getMessagesByThreadId()[active.id] || []).filter((row) => !row.deleted_at).length : 0;
      const filtered = deps.filteredMessageThreads();
      const pages = Math.max(1, Math.ceil(filtered.length / deps.LIST_ITEMS_PER_PAGE));
      const page = Math.min(Math.max(deps.getMessageThreadsPage(), 1), pages);
      const people = deps.getCompanyMembers().filter((member) => member.user_id !== deps.getSession().user.id)
        .sort((a, b) => deps.teamMemberName(a.user_id).localeCompare(deps.teamMemberName(b.user_id)));
      const linked = deps.getWorkOrders().find((order) => order.id === deps.getMessageComposerWorkOrderId());
      const conversationWork = active?.work_order_id ? deps.getWorkOrders().find(order => order.id === active.work_order_id) : null;
      const quote = deps.getReplyQuote?.(active?.id);
      const archived = active && deps.isConversationArchived?.(active);
      const title = active ? (deps.threadTitle?.(active) || active.title) : "";
      const avatar = String(title).trim().split(/\s+/).slice(0, 2).map(word => Array.from(word)[0]).join("").toUpperCase();
      const tone = Math.abs([...String(title)].reduce((sum, c) => (sum * 31 + c.charCodeAt(0)) | 0, 0)) % 6;
      const unread = deps.totalUnreadMessages();
      const sections = [...new Set(threads.map(thread => thread.preferences?.section_name).filter(Boolean))].sort();
      return `<section class="message-center ${active && !composing && view === "conversations" ? "has-active-thread" : ""} ${composing && view === "conversations" ? "has-composer" : ""}" data-inbox-view="${escape(`${deps.getMessageThreadFilter()}:${deps.getMessageSearchQuery()}:${page}`)}" data-thread-id="${escape(composing ? "" : active?.id || "")}">
        <header class="message-toolbar">
          <button class="message-mobile-exit" data-message-exit type="button" aria-label="Back to My Work" title="Back to My Work">${icon("back")}</button>
          <div class="message-toolbar-title"><span class="message-heading-icon" aria-hidden="true">${icon("reply")}</span><div><h2>Messages</h2><div class="message-workspace-label">${escape(deps.getWorkspaceLabel?.() || "")}<span class="message-inbox-count">${unread} unread</span></div></div></div>
          <div class="message-toolbar-actions"><span class="message-connection" data-message-connection role="status">${escape(deps.getMessageConnection?.() || "")}</span>
          <button class="message-icon-button" data-search-messages="" type="button" aria-label="Search message content" title="Search message content">${icon("search")}</button>
          <button class="message-connection-retry" data-retry-messages type="button" ${["Live updates unavailable", "Update failed"].includes(deps.getMessageConnection?.()) ? "" : "hidden"}>Retry connection</button>
          ${canEdit() ? `<button class="message-icon-button message-compose-button" data-message-compose type="button" aria-label="New message" title="New message">${icon("compose")}</button>` : ""}</div>
        </header>
        ${deps.getMessageLoadError?.() ? `<p class="error-text" role="alert">${escape(deps.getMessageLoadError())} <button data-retry-messages type="button">Try again</button></p>` : ""}
        <div class="message-view-tabs" aria-label="Message views">
          <button data-message-view="conversations" type="button" aria-pressed="${view === "conversations"}">Conversations</button>
          <button data-message-view="activity" type="button" aria-pressed="${view === "activity"}">Activity${deps.getActivityCount?.() ? ` <span class="message-unread-pill">${deps.getActivityCount()}</span>` : ""}</button>
        </div>
        ${view === "activity" ? `<section class="message-activity">${deps.renderWorkOrderNotifications?.() || '<p class="message-empty">No work notifications.</p>'}</section>` : `
        <div class="message-layout">
          <aside class="message-thread-rail" aria-label="Conversations">
            <label class="message-search">${icon("search")}<input id="message-search" type="search" aria-label="Search subjects or people" value="${escape(deps.getMessageSearchQuery())}" placeholder="Search conversations"></label>
            <div class="message-filter-bar" aria-label="Message thread filter">
              ${[["all", "All"], ["unread", "Unread"], ["favorites", "Favorites"], ["direct", "Direct"], ["location", "Team"], ["archived", "Archived"]].map(([id, label]) => `<button data-message-filter="${id}" type="button" aria-pressed="${deps.getMessageThreadFilter() === id}" class="${deps.getMessageThreadFilter() === id ? "active" : ""}">${label}</button>`).join("")}
            </div>
            ${sections.length ? `<label class="message-section-filter">Section<select data-message-section-filter><option value="">All sections</option>${sections.map(name => `<option value="${escape(name)}" ${deps.getMessageSection?.() === name ? 'selected' : ''}>${escape(name)}</option>`).join('')}</select></label>` : ''}
            <div class="message-thread-list">${filtered.slice((page - 1) * deps.LIST_ITEMS_PER_PAGE, page * deps.LIST_ITEMS_PER_PAGE).map(deps.renderMessageThreadButton).join("") || '<p class="message-empty">No conversations match this view.</p>'}</div>
            <div data-message-pagination>${deps.renderListPagination("messages", filtered.length, page, pages)}</div>
          </aside>
          <section class="message-thread-detail" aria-label="${composing ? "New message" : "Conversation"}">
            ${composing ? `
              <header class="message-chat-header"><div class="message-chat-title"><button class="message-icon-button" data-message-close-compose type="button" aria-label="Cancel new message" title="Cancel new message">${icon("back")}</button><h3>New message</h3></div></header>
              <form class="message-thread-form" id="message-thread-form">
                <label>Audience<select name="thread_type" id="message-thread-type"><option value="direct">Direct message</option><option value="location">Company team / location topic</option></select></label>
                <label class="message-direct-field">To<select name="direct_user_id" required><option value="">Choose a teammate</option>${people.map((person) => `<option value="${escape(person.user_id)}">${escape(deps.teamMemberName(person.user_id))}</option>`).join("")}</select></label>
                <p class="message-scope-note" id="message-scope-note">${escape(deps.messageComposerScopeNote("direct"))}</p>
                <div data-existing-conversation></div>
                <label>Subject <span class="muted">(optional for direct messages)</span><input name="title" maxlength="180" placeholder="Subject" value="${linked ? escape(linked.title) : ""}"></label>
                ${linked ? `<input name="work_order_id" type="hidden" value="${escape(linked.id)}"><div class="message-linked-draft"><span>Work order</span><strong>${escape(linked.title)}</strong><button class="text-button" data-clear-message-work-link type="button">Remove link</button></div>` : `<label>Work order <span class="muted">(optional)</span><select name="work_order_id" ${deps.getMessageWorkOrderLinksReady() ? "" : "disabled"}><option value="">No work order</option>${deps.recentMessageLinkWorkOrders().map((order) => `<option value="${escape(order.id)}">${escape(order.title)} - ${escape(deps.statusLabel(order.status))}</option>`).join("")}</select></label>`}
                <label>Message<textarea name="body" rows="4" maxlength="12000" required placeholder="Write a message..."></textarea></label>
                ${deps.renderMessageTools?.("composer") || ""}
                <p class="error-text" id="message-thread-error" role="alert"></p>
                <button class="message-send-button" type="submit">${icon("send")}<span>Send message</span></button>
              </form>
            ` : active ? `
              <header class="message-chat-header">
                <div class="message-chat-title"><button class="message-icon-button" data-message-back type="button" title="Back to conversations" aria-label="Back to conversations">${icon("back")}</button><span class="message-thread-avatar" data-tone="${tone}" aria-hidden="true">${active.thread_type === "direct" ? escape(avatar) : "#"}</span><div><h3>${escape(title)}</h3><p>${escape(deps.messageThreadScopeLabel(active))}</p></div></div>
                <div class="message-header-actions">
                  <button class="message-icon-button" data-search-messages="${escape(active.id)}" type="button" aria-label="Search this conversation" title="Search this conversation">${icon("search")}</button>
                  ${active.work_order_id ? `<button class="message-linked-work-button" data-open-linked-work-order="${escape(active.work_order_id)}" type="button" title="Open Work Order" aria-label="Open Work Order">${icon("open")}<span>Open Work Order</span></button>` : ""}
                  <span class="message-history-count">${count} message${count === 1 ? "" : "s"}</span>
                  ${canEdit() ? `<details class="message-action-menu"><summary title="Conversation options" aria-label="Conversation options">${icon("more")}</summary><div class="message-menu-items">
                    <button data-favorite-conversation="${escape(active.id)}" aria-pressed="${Boolean(active.preferences?.favorite)}" type="button">${icon("star")}${active.preferences?.favorite ? "Remove favorite" : "Add to favorites"}</button>
                    <button data-archive-message-thread="${escape(active.id)}" data-archive="${!archived}" type="button">${archived ? "Move to inbox" : "Archive conversation"}</button>
                    <button data-mute-message-thread="${escape(active.id)}" data-mute="${!active.preferences?.muted}" type="button">${active.preferences?.muted ? "Unmute conversation" : "Mute conversation"}</button>
                    <label>Section<input data-message-section-name maxlength="40" list="message-section-names" value="${escape(active.preferences?.section_name || '')}" placeholder="Unsectioned"></label><datalist id="message-section-names">${sections.map(name => `<option value="${escape(name)}"></option>`).join('')}</datalist><button data-save-message-section="${escape(active.id)}" type="button">Save section</button>
                  </div></details>` : ""}
                </div>
              </header>
              ${conversationWork ? `<div class="message-work-context"><span class="message-context-icon" aria-hidden="true">${icon('open')}</span><div><small>Work order${conversationWork.assets?.name ? ` / ${escape(conversationWork.assets.name)}` : ''}</small><strong>${escape(conversationWork.title)}</strong></div><span class="message-context-status" data-status="${escape(conversationWork.status)}">${escape(deps.statusLabel(conversationWork.status))}</span></div>` : ''}
              <div class="message-archive-note" ${archived ? "" : "hidden"}>Archived</div>
              <span class="sr-only" data-message-announcement role="status"></span>
              <div class="message-list" role="region" aria-label="Conversation history" aria-busy="${loading}" tabindex="0">
                ${history?.hasOlder ? '<button class="message-older-button" data-message-older type="button">Earlier messages</button>' : ""}
                ${loading ? '<p class="message-empty" role="status">Loading conversation...</p>' : deps.renderMessageList(rows)}
              </div>
              <button class="message-new-indicator" data-message-new type="button" hidden>New messages</button>
              ${canEdit() && !loading ? `<form class="message-reply-form" id="message-reply-form" data-thread-id="${escape(active.id)}">
                ${quote ? `<div class="message-reply-context"><div><strong>Replying to ${escape(deps.teamMemberName(quote.sender_id))}</strong><span>${escape(quote.body.slice(0, 200))}</span></div><button class="message-icon-button" data-clear-message-quote type="button" aria-label="Cancel quoted reply" title="Cancel quoted reply">${icon("close")}</button></div>` : ""}
                <input type="hidden" name="reply_to_id" value="${escape(quote?.id || "")}">
                <div class="message-compose-line"><textarea name="body" rows="1" maxlength="12000" required aria-label="Reply" placeholder="Write a reply..."></textarea><button class="message-icon-button message-send-button" type="submit" title="Send reply" aria-label="Send reply">${icon("send")}</button></div>
                <div class="message-composer-footer">${deps.renderMessageTools?.(active.id) || ""}<details class="message-quick-menu"><summary aria-label="Quick replies" title="Quick replies">${icon('reply')}<span>Quick replies</span></summary><div class="message-quick-replies">${["On it", "Need more info", "Waiting on parts", "My part is done"].map((reply) => `<button data-quick-reply="${escape(reply)}" type="button">${reply}</button>`).join("")}</div></details><span class="message-send-state" role="status"></span></div>
                <p class="error-text" id="message-reply-error" role="alert"></p>
              </form>` : !loading ? '<p class="message-readonly">Read-only conversation</p>' : ""}
            ` : `<div class="message-empty-state">${icon("reply")}<h3>Your conversations</h3><p>No conversation selected.</p>${canEdit() ? '<button data-message-compose type="button">New message</button>' : ""}</div>`}
          </section>
        </div>`}
      </section>`;
    }
    return { renderMessageCenter };
  }
  window.MaintainOpsMessageCenterDisplay = { createMessageCenterDisplayHelpers };
  if (typeof module !== "undefined") module.exports = { createMessageCenterDisplayHelpers };
})();
