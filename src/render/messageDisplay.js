(function () {
  const reactions = [
    ["acknowledged", "\u{1f44d}", "Acknowledged"], ["looking", "\u{1f440}", "Looking into it"],
    ["thanks", "\u{1f64c}", "Thanks"], ["question", "\u{2753}", "Question"],
  ];
  function createMessageDisplayHelpers(deps) {
    const escape = deps.escapeHtml;
    const icon = (name) => deps.icon?.(name) || "";
    function renderMessageBubble(message, grouped = false, discussion = false) {
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
      const replyCount = deps.getReplyCount?.(message.id) || 0;
      return `<article class="message-bubble ${mine ? "mine" : ""} ${grouped ? "message-grouped" : ""}" data-message-id="${escape(message.id)}" aria-label="Message from ${escape(senderName)}">
        ${!grouped ? `<div class="message-bubble-meta"><strong>${escape(senderName)}</strong></div>` : ""}
        ${quote ? `<blockquote class="message-quote">${quote}</blockquote>` : ""}
        ${message.body ? `<p>${escape(message.body)}</p>` : ""}
        ${(message.message_files || []).length ? `<div class="message-file-list">${message.message_files.map((file) => `<button class="message-file" data-open-message-file="${escape(file.id)}" data-message-id="${escape(message.id)}" type="button">${icon(file.content_type.startsWith("audio/") ? "mic" : "file")}<span>${escape(file.file_name)}<small>${Math.ceil(file.byte_size / 1024)} KB</small></span></button>`).join("")}</div>` : ""}
        <time class="message-stamp" datetime="${escape(message.created_at)}">${escape(deps.formatMessageTime(message.created_at))}</time>
        <div class="message-bubble-footer">
          <div class="message-reactions">${reactionButtons}</div>
          ${!discussion && replyCount ? `<button class="message-discussion-link" data-open-message-discussion="${escape(message.id)}" type="button">${replyCount} ${replyCount === 1 ? "reply" : "replies"}</button>` : ""}
          ${editable ? `<details class="message-bubble-tools message-action-menu message-overflow"><summary title="Message actions" aria-label="Message actions">${icon("more")}</summary><div class="message-menu-items">
            ${!discussion ? `<button data-quote-message="${escape(message.id)}" type="button" title="Reply to message" aria-label="Reply to message">${icon("reply")}Quote reply</button>` : ""}
            ${!discussion ? `<button data-open-message-discussion="${escape(message.id)}" type="button">Reply in thread</button>` : ""}
            <details class="message-action-menu"><summary title="React to message" aria-label="React to message">${icon("smile")}</summary>
              <div class="message-reaction-picker">${reactions.map(([key, symbol, label]) => `<button data-message-reaction="${key}" data-message-id="${escape(message.id)}" title="${label}" aria-label="${label}" type="button"><span aria-hidden="true">${symbol}</span></button>`).join("")}</div>
            </details>
            ${mine ? `<button class="danger-link" data-delete-message="${escape(message.id)}" type="button">Delete message</button>` : ""}
          </div></details>` : ""}
        </div>
      </article>`;
    }

    function renderMessageList(messages) {
      const visibleMessages = messages.filter((message) => !message.deleted_at);
      if (!visibleMessages.length) return `<p class="muted">No messages yet.</p>`;
      let lastDay = "";
      return visibleMessages.map((message, index) => {
        const day = deps.formatMessageDay(message.created_at);
        const divider = day !== lastDay ? `<div class="message-day-divider"><span>${deps.escapeHtml(day)}</span></div>` : "";
        lastDay = day;
        const previous = visibleMessages[index - 1];
        const grouped = !divider && previous?.sender_id === message.sender_id && new Date(message.created_at) - new Date(previous.created_at) <= 5 * 60 * 1000;
        return `${divider}${renderMessageBubble(message, grouped)}`;
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
