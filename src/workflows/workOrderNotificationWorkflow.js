(function () {
  function createWorkOrderNotificationWorkflow(deps = {}) {
    async function markNotificationsRead(notifications, options = {}) {
      const unread = notifications.filter((notification) => !notification.read_at);
      if (!unread.length) return true;

      const originalById = new Map(unread.map((notification) => [notification.id, notification]));
      const readAt = new Date().toISOString();
      const unreadIds = unread.map((notification) => notification.id);
      deps.setNotifications(deps.getNotifications().map((notification) => (
        originalById.has(notification.id) ? { ...notification, read_at: readAt } : notification
      )));
      if (options.render !== false) deps.renderWorkspace();

      try {
        const response = await deps.withOperationTimeout(
          deps.markWorkOrderNotificationsRead(
            deps.getSupabaseClient(),
            deps.getSession().user.id,
            unreadIds,
            readAt
          ),
          "Work notification update timed out.",
          10000
        );
        if (response.error) throw response.error;
        return true;
      } catch (error) {
        deps.setNotifications(deps.getNotifications().map((notification) => (
          originalById.get(notification.id) || notification
        )));
        deps.showNotice(`Could not mark the work notification read: ${error.message || error}`, "warning");
        if (options.render !== false) deps.renderWorkspace();
        return false;
      }
    }

    function markWorkOrderNotificationRead(notificationId, options = {}) {
      return markNotificationsRead(
        deps.getNotifications().filter((notification) => notification.id === notificationId),
        options
      );
    }

    function markWorkOrderNotificationsReadForOrder(workOrderId, options = {}) {
      return markNotificationsRead(
        deps.getNotifications().filter((notification) => notification.work_order_id === workOrderId),
        options
      );
    }

    return {
      markWorkOrderNotificationRead,
      markWorkOrderNotificationsReadForOrder,
    };
  }

  window.MaintainOpsWorkOrderNotificationWorkflow = {
    createWorkOrderNotificationWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createWorkOrderNotificationWorkflow };
  }
})();
