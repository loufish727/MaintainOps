(function () {
  function createMessageDisplayHelpers(deps) {
    function renderMessageBubble(message) {
      const mine = message.sender_id === deps.getCurrentUserId();
      const senderName = deps.teamMemberName(message.sender_id);
      return `
    <article class="message-bubble ${mine ? "mine" : ""}">
      <span class="message-avatar" aria-hidden="true">${deps.escapeHtml(deps.initials(senderName))}</span>
      <div>
        <strong>${deps.escapeHtml(senderName)}</strong>
        <span>${deps.escapeHtml(deps.formatMessageTime(message.created_at))}</span>
      </div>
      <p>${deps.escapeHtml(message.body)}</p>
    </article>
  `;
    }

    function renderMessageList(messages) {
      if (!messages.length) return `<p class="muted">No messages yet.</p>`;
      let lastDay = "";
      return messages.map((message) => {
        const day = deps.formatMessageDay(message.created_at);
        const divider = day !== lastDay ? `<div class="message-day-divider"><span>${deps.escapeHtml(day)}</span></div>` : "";
        lastDay = day;
        return `${divider}${renderMessageBubble(message)}`;
      }).join("");
    }

    return Object.freeze({
      renderMessageBubble,
      renderMessageList,
    });
  }

  window.MaintainOpsMessageDisplay = Object.freeze({
    createMessageDisplayHelpers,
  });
})();
