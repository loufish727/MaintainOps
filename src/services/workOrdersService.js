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

  async function fetchAssetWorkOrderCounts(supabaseClient, companyId, assetId) {
    const query = () => countWorkOrdersQuery(supabaseClient).eq("company_id", companyId).eq("asset_id", assetId);
    const [open, completed] = await Promise.all([
      query().neq("status", "completed"),
      query().eq("status", "completed"),
    ]);
    const error = open.error || completed.error;
    if (error) return { error };
    if (![open.count, completed.count].every((count) => Number.isInteger(count) && count >= 0)) {
      return { error: new Error("Equipment work counts are unavailable.") };
    }
    return { data: { open: open.count, completed: completed.count }, error: null };
  }

  async function fetchWorkOrdersByAsset(supabaseClient, companyId, assetId, selectClause) {
    const rows = [];
    // Do not mistake the API's row limit for the equipment's complete history.
    while (true) {
      const response = await supabaseClient
        .from("work_orders")
        .select(selectClause, { count: "exact" })
        .eq("company_id", companyId)
        .eq("asset_id", assetId)
        .order("completed_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .order("id", { ascending: true })
        .range(rows.length, rows.length + 999);
      if (response.error) return response;
      const page = response.data || [];
      rows.push(...page);
      if (!page.length || (Number.isInteger(response.count) ? rows.length >= response.count : page.length < 1000)) {
        return { data: rows, error: null };
      }
    }
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
      .select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id")
      .eq("company_id", companyId)
      .in("status", ["open", "in_progress", "blocked", "completed"])
      .or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");
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
    fetchAssetWorkOrderCounts,
    fetchWorkOrdersByIds,
    scopedWorkOrderSearchQuery,
    scopedTeamWorkloadQuery,
    fetchPagedSearchRows,
  };
})();
