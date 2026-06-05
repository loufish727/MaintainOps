(function () {
  /*
   * Module contract: read-only manager dashboard data helpers.
   * May select scoped completed work-order rows for dashboard reporting.
   * Must not insert, update, delete, upload, change auth/session, or alter RLS.
   */
  function fetchRecentCompletedWorkOrders(supabaseClient, params = {}) {
    const {
      companyId,
      locationId,
      locationsReady,
      selectClause,
      cutoffIso,
      limit = 200,
    } = params;

    let query = supabaseClient
      .from("work_orders")
      .select(selectClause || "*")
      .eq("company_id", companyId)
      .eq("status", "completed")
      .gte("completed_at", cutoffIso)
      .order("completed_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (locationsReady && locationId) query = query.eq("location_id", locationId);
    return query;
  }

  window.MaintainOpsManagerDashboardService = {
    fetchRecentCompletedWorkOrders,
  };
})();
