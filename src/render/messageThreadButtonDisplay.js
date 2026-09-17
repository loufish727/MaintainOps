(function () {
  function createMessageThreadButtonDisplayHelpers({
    escapeHtml,
    formatMessageTime,
    teamMemberName,
    messageThreadScopeLabel,
    unreadMessageCount,
    getMessagesByThreadId,
    getActiveMessageThreadId,
    threadTitle = (thread) => thread.title,
  }) {
    function renderMessageThreadButton(thread) {
      const messages = getMessagesByThreadId()[thread.id] || [];
      const visibleMessages = messages.filter((message) => !message.deleted_at);
      const lastMessage = thread.latest_message || visibleMessages[visibleMessages.length - 1];
      const unreadCount = unreadMessageCount(thread.id);
      const lastMessageBody = lastMessage?.body ? `${escapeHtml(teamMemberName(lastMessage.sender_id))}: ${escapeHtml(lastMessage.body)}` : "Last activity";
      return `
        <button class="message-thread-button ${thread.id === getActiveMessageThreadId() ? "active" : ""} ${unreadCount ? "unread" : ""}" data-message-thread="${thread.id}" aria-current="${thread.id === getActiveMessageThreadId() ? "true" : "false"}" type="button">
          <span class="message-row-heading"><strong>${escapeHtml(threadTitle(thread))}</strong><time>${lastMessage ? escapeHtml(formatMessageTime(lastMessage.created_at)) : ""}</time></span>
          <span class="message-row-preview"><small>${lastMessage ? lastMessageBody : "No messages yet"}</small>${unreadCount ? `<span class="message-unread-pill" aria-label="${unreadCount} unread messages">${unreadCount}</span>` : ""}</span>
          <span class="message-row-scope">${thread.work_order_id ? "Work order / " : ""}${escapeHtml(messageThreadScopeLabel(thread))}${thread.preferences?.muted ? " / Muted" : ""}</span>
        </button>
      `;
    }

    return {
      renderMessageThreadButton,
    };
  }

  window.MaintainOpsMessageThreadButtonDisplay = {
    createMessageThreadButtonDisplayHelpers,
  };
})();
