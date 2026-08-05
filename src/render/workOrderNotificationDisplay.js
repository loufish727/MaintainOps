(function () {
  function createWorkOrderNotificationDisplayHelpers(deps = {}) {
    const getNotifications = deps.getNotifications || (() => []);
    const escapeHtml = deps.escapeHtml || ((value) => String(value || ""));
    const formatMessageTime = deps.formatMessageTime || ((value) => String(value || ""));
    const visibleLimit = Math.max(Number(deps.visibleLimit) || 12, 1);

    function unreadWorkOrderNotificationCount() {
      return getNotifications().filter((notification) => !notification.read_at).length;
    }

    function hasUnreadProductionReady(workOrderId) {
      return getNotifications().some((notification) => (
        !notification.read_at
        && notification.kind === "production_action_completed"
        && notification.work_order_id === workOrderId
      ));
    }

    function renderWorkOrderNotifications() {
      if (!deps.getReady?.()) return "";
      const notifications = getNotifications();
      if (!notifications.length) return "";
      const unreadCount = unreadWorkOrderNotificationCount();
      const visibleNotifications = notifications.slice(0, visibleLimit);
      return `
        <details class="work-notification-panel" ${unreadCount ? "open" : ""}>
          <summary>
            <span>Work notifications</span>
            <span>${unreadCount ? `${unreadCount} new` : "Recent"}</span>
          </summary>
          <div class="work-notification-list">
            ${visibleNotifications.map((notification) => `
              <button
                class="work-notification-item ${notification.read_at ? "read" : "unread"}"
                data-open-work-notification="${escapeHtml(notification.id)}"
                data-work-order-id="${escapeHtml(notification.work_order_id)}"
                type="button"
              >
                <span class="work-notification-heading">
                  <span class="chip production-ready">Production Ready</span>
                  <time>${escapeHtml(formatMessageTime(notification.created_at))}</time>
                </span>
                <strong>${escapeHtml(notification.title)}</strong>
                <span>${escapeHtml(notification.body)}</span>
              </button>
            `).join("")}
          </div>
          ${notifications.length > visibleLimit ? `<p class="work-notification-limit">Showing the ${visibleLimit} most recent notifications.</p>` : ""}
        </details>
      `;
    }

    return {
      hasUnreadProductionReady,
      renderWorkOrderNotifications,
      unreadWorkOrderNotificationCount,
    };
  }

  window.MaintainOpsWorkOrderNotificationDisplay = {
    createWorkOrderNotificationDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createWorkOrderNotificationDisplayHelpers };
  }
})();
