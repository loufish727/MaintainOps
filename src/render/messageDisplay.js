(function () {
  const reactions = [
    ["acknowledged", "\u{1f44d}", "Acknowledged"], ["looking", "\u{1f440}", "Looking into it"],
    ["thanks", "\u{1f64c}", "Thanks"], ["question", "\u{2753}", "Question"],
  ];
  function createMessageDisplayHelpers(deps) {
    const escape = deps.escapeHtml;
    const icon = (name) => deps.icon?.(name) || "";
    function renderMessageBubble(message) {
      const mine = message.sender_id === deps.getCurrentUserId();
      const editable = deps.canEditOperationalRecords?.() ?? true;
      const senderName = deps.teamMemberName(message.sender_id);
      const saved = (message.message_reactions || []).filter((row) => row.active);
      const quote = message.reply_to_id ? (message.reply && !message.reply.deleted_at
        ? `<strong>${escape(deps.teamMemberName(message.reply.sender_id))}</strong><span>${escape(message.reply.body.slice(0, 320))}</span>`
        : `<span>Original message unavailable</span>`) : "";
      const reactionButtons = reactions.map(([key, symbol, label]) => {
        const rows = saved.filter((row) => row.reaction === key);
        const selected = rows.some((row) => row.user_id === deps.getCurrentUserId());
        const names = rows.map((row) => deps.teamMemberName(row.user_id)).join(", ");
        return rows.length ? `<button class="message-reaction" data-message-reaction="${key}" data-message-id="${escape(message.id)}" aria-pressed="${selected}" aria-label="${label}: ${escape(names)}" title="${label}: ${escape(names)}" type="button" ${editable ? "" : "disabled"}><span aria-hidden="true">${symbol}</span> ${rows.length}</button>` : "";
      }).join("");
      return `<article class="message-bubble ${mine ? "mine" : ""}" data-message-id="${escape(message.id)}">
        <span class="message-avatar" aria-hidden="true">${escape(deps.initials(senderName))}</span>
        <div class="message-bubble-meta"><strong>${escape(senderName)}</strong><time datetime="${escape(message.created_at)}">${escape(deps.formatMessageTime(message.created_at))}</time></div>
        ${quote ? `<blockquote class="message-quote">${quote}</blockquote>` : ""}
        <p>${escape(message.body)}</p>
        <div class="message-bubble-footer">
          <div class="message-reactions">${reactionButtons}</div>
          ${editable ? `<div class="message-bubble-tools">
            <button class="message-icon-button" data-quote-message="${escape(message.id)}" type="button" title="Reply to message" aria-label="Reply to message">${icon("reply")}</button>
            <details class="message-action-menu"><summary title="React to message" aria-label="React to message">${icon("smile")}</summary>
              <div class="message-reaction-picker">${reactions.map(([key, symbol, label]) => `<button data-message-reaction="${key}" data-message-id="${escape(message.id)}" title="${label}" aria-label="${label}" type="button"><span aria-hidden="true">${symbol}</span></button>`).join("")}</div>
            </details>
            ${mine ? `<details class="message-action-menu"><summary title="Message options" aria-label="Message options">${icon("more")}</summary><div class="message-menu-items"><button class="danger-link" data-delete-message="${escape(message.id)}" type="button">Delete message</button></div></details>` : ""}
          </div>` : ""}
        </div>
      </article>`;
    }

    function renderMessageList(messages) {
      const visibleMessages = messages.filter((message) => !message.deleted_at);
      if (!visibleMessages.length) return `<p class="muted">No messages yet.</p>`;
      let lastDay = "";
      return visibleMessages.map((message) => {
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
    reactions,
  });
})();
