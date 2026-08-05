(function () {
  function listWorkOrderNotifications(supabaseClient, companyId, recipientId, limit = 50) {
    const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 100);
    return supabaseClient
      .from("work_order_notifications")
      .select("id, company_id, work_order_id, recipient_id, actor_id, source_event_id, kind, title, body, read_at, created_at")
      .eq("company_id", companyId)
      .eq("recipient_id", recipientId)
      .order("created_at", { ascending: false })
      .limit(safeLimit);
  }

  function markWorkOrderNotificationsRead(supabaseClient, recipientId, notificationIds, readAt) {
    const ids = [...new Set((notificationIds || []).filter(Boolean))];
    if (!ids.length) return Promise.resolve({ data: [], error: null });
    return supabaseClient
      .from("work_order_notifications")
      .update({ read_at: readAt })
      .eq("recipient_id", recipientId)
      .in("id", ids)
      .select("id, read_at");
  }

  window.MaintainOpsWorkOrderNotificationsService = {
    listWorkOrderNotifications,
    markWorkOrderNotificationsRead,
  };

  if (typeof module !== "undefined") {
    module.exports = {
      listWorkOrderNotifications,
      markWorkOrderNotificationsRead,
    };
  }
})();
