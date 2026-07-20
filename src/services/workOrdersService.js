(function () {
  function selectWorkOrders(supabaseClient, selectClause, options = {}) {
    return supabaseClient
      .from("work_orders")
      .select(selectClause, options);
  }

  function countWorkOrdersQuery(supabaseClient) {
    return supabaseClient
      .from("work_orders")
      .select("id", { count: "exact", head: true });
  }

  function fetchWorkOrderById(supabaseClient, companyId, workOrderId, selectClause) {
    return supabaseClient
      .from("work_orders")
      .select(selectClause)
      .eq("company_id", companyId)
      .eq("id", workOrderId)
      .maybeSingle();
  }

  function fetchWorkOrdersByAsset(supabaseClient, companyId, assetId, selectClause) {
    return supabaseClient
      .from("work_orders")
      .select(selectClause)
      .eq("company_id", companyId)
      .eq("asset_id", assetId)
      .order("completed_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
  }

  async function fetchWorkOrdersByIds(supabaseClient, params) {
    const {
      companyId,
      locationId,
      locationsReady,
      selectClause,
      ids,
    } = params;
    let query = supabaseClient
      .from("work_orders")
      .select(selectClause)
      .eq("company_id", companyId)
      .in("id", ids);
    if (locationsReady && locationId) query = query.eq("location_id", locationId);
    return query;
  }

  function scopedWorkOrderSearchQuery(supabaseClient, params) {
    const { companyId, locationId, locationsReady } = params;
    let query = supabaseClient
      .from("work_orders")
      .select("id, created_at, due_at, completed_at, priority, status")
      .eq("company_id", companyId);
    if (locationsReady && locationId) query = query.eq("location_id", locationId);
    return query;
  }

  function scopedTeamWorkloadQuery(supabaseClient, params) {
    const { companyId, locationId, locationsReady } = params;
    let query = supabaseClient
      .from("work_orders")
      .select("id, assigned_to, status, due_at, location_id")
      .eq("company_id", companyId)
      .in("status", ["open", "in_progress", "blocked"])
      .not("assigned_to", "is", null);
    if (locationsReady && locationId) query = query.eq("location_id", locationId);
    return query.order("id", { ascending: true });
  }

  async function fetchPagedSearchRows(buildQuery, onRows, maxRows = Infinity, pageSizeLimit = 1000) {
    let from = 0;
    let fetched = 0;
    while (fetched < maxRows) {
      const pageSize = Math.min(pageSizeLimit, maxRows - fetched);
      const { data, error } = await buildQuery().range(from, from + pageSize - 1);
      if (error) throw error;
      const rows = data || [];
      onRows(rows);
      fetched += rows.length;
      if (rows.length < pageSize) break;
      from += pageSize;
    }
  }

  window.MaintainOpsWorkOrdersService = {
    selectWorkOrders,
    countWorkOrdersQuery,
    fetchWorkOrderById,
    fetchWorkOrdersByAsset,
    fetchWorkOrdersByIds,
    scopedWorkOrderSearchQuery,
    scopedTeamWorkloadQuery,
    fetchPagedSearchRows,
  };
})();
