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
      const visibleMessages = messages.filter((message) => !message.deleted_at);
      const lastMessage = visibleMessages[visibleMessages.length - 1];
      const unreadCount = unreadMessageCount(thread.id);
      const lastMessageText = escapeHtml(lastMessage?.body || "");
      return `
        <button class="message-thread-button ${thread.id === getActiveMessageThreadId() ? "active" : ""}" data-message-thread="${thread.id}" type="button">
          <strong>${escapeHtml(thread.title)}${unreadCount ? `<span class="message-unread-pill">${unreadCount}</span>` : ""}</strong>
          <span>${escapeHtml(messageThreadScopeLabel(thread))}</span>
          <small>${lastMessage ? `${escapeHtml(teamMemberName(lastMessage.sender_id))}: ${lastMessageText} - ${escapeHtml(formatMessageTime(lastMessage.created_at))}` : "No messages yet"}</small>
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
