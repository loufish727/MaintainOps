(function () {
  function createMessageThreadButtonDisplayHelpers({
    escapeHtml,
    formatMessageTime,
    teamMemberName,
    messageThreadScopeLabel,
    unreadMessageCount,
    getMessagesByThreadId,
    getActiveMessageThreadId,
  }) {
    function renderMessageThreadButton(thread) {
      const messages = getMessagesByThreadId()[thread.id] || [];
      const lastMessage = messages[messages.length - 1];
      const unreadCount = unreadMessageCount(thread.id);
      return `
        <button class="message-thread-button ${thread.id === getActiveMessageThreadId() ? "active" : ""}" data-message-thread="${thread.id}" type="button">
          <strong>${escapeHtml(thread.title)}${unreadCount ? `<span class="message-unread-pill">${unreadCount}</span>` : ""}</strong>
          <span>${escapeHtml(messageThreadScopeLabel(thread))}</span>
          <small>${lastMessage ? `${escapeHtml(teamMemberName(lastMessage.sender_id))}: ${escapeHtml(lastMessage.body)} Â· ${escapeHtml(formatMessageTime(lastMessage.created_at))}` : "No messages yet"}</small>
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
