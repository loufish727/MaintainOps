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
      const title = threadTitle(thread);
      const avatar = String(title || 'MO').trim().split(/\s+/).slice(0,2).map(word => Array.from(word)[0]).join('').toUpperCase();
      const tone = Math.abs([...String(title)].reduce((sum, c) => (sum * 31 + c.charCodeAt(0)) | 0, 0)) % 6;
      const lastMessageBody = lastMessage?.body ? `${escapeHtml(teamMemberName(lastMessage.sender_id))}: ${escapeHtml(lastMessage.body)}` : "Attachment";
      const lastDate = new Date(lastMessage?.created_at);
      const sameDay = lastDate.toDateString() === new Date().toDateString();
      const time = lastMessage ? (sameDay ? lastDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : formatMessageTime(lastMessage.created_at)) : '';
      return `
        <button class="message-thread-button ${thread.id === getActiveMessageThreadId() ? "active" : ""} ${unreadCount ? "unread" : ""}" data-message-thread="${thread.id}" aria-current="${thread.id === getActiveMessageThreadId() ? "true" : "false"}" type="button">
          <span class="message-thread-avatar" data-tone="${tone}" aria-hidden="true">${thread.thread_type === 'direct' ? escapeHtml(avatar) : '#'}</span>
          <span class="message-row-content"><span class="message-row-heading"><strong>${escapeHtml(title)}</strong><time datetime="${escapeHtml(lastMessage?.created_at || '')}" title="${escapeHtml(lastMessage ? formatMessageTime(lastMessage.created_at) : '')}">${escapeHtml(time)}</time></span>
          <span class="message-row-preview"><small>${lastMessage ? lastMessageBody : "No messages yet"}</small>${unreadCount ? `<span class="message-unread-pill" aria-label="${unreadCount} unread messages">${unreadCount}</span>` : ""}</span>
          <span class="message-row-scope">${thread.work_order_id ? "Work order / " : ""}${escapeHtml(messageThreadScopeLabel(thread))}${thread.preferences?.muted ? " / Muted" : ""}</span>
          </span>
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
