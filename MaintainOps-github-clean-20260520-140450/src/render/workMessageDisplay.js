(function () {
  function createWorkMessageDisplayHelpers({
    escapeHtml,
    formatMessageTime,
    messageThreadScopeLabel,
    getMessageThreads,
    getMessagesByThreadId,
    getMessageWorkOrderLinksReady,
  }) {
    function renderLinkedWorkMessageThread(thread) {
      const messages = getMessagesByThreadId()[thread.id] || [];
      const lastMessage = messages[messages.length - 1];
      return `
        <article class="work-linked-thread">
          <div>
            <strong>${escapeHtml(thread.title)}</strong>
            <span>${escapeHtml(messageThreadScopeLabel(thread))}${lastMessage ? ` - ${escapeHtml(formatMessageTime(lastMessage.created_at))}` : ""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${thread.id}" type="button">Open Thread</button>
        </article>
      `;
    }

    function renderWorkOrderMessages(workOrder) {
      const linkedThreads = getMessageThreads().filter((thread) => thread.work_order_id === workOrder.id);
      return `
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${workOrder.id}" type="button">Message Team</button>
            ${getMessageWorkOrderLinksReady() ? `
              <div class="work-linked-thread-list">
                ${linkedThreads.map(renderLinkedWorkMessageThread).join("") || `<p class="muted">No message threads linked yet.</p>`}
              </div>
            ` : `<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>`}
          </div>
        </details>
      `;
    }

    return {
      renderWorkOrderMessages,
      renderLinkedWorkMessageThread,
    };
  }

  window.MaintainOpsWorkMessageDisplay = {
    createWorkMessageDisplayHelpers,
  };
})();
