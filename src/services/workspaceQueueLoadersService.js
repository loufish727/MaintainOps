(function () {
  function requiredDependency(deps, name) {
    if (deps[name] === undefined) throw new Error(`workspaceQueueLoadersService missing dependency: ${name}`);
    return deps[name];
  }

  function createWorkspaceQueueLoaders(deps = {}) {
    const supabaseClientRef = requiredDependency(deps, "supabaseClient");
    const workspaceUiState = requiredDependency(deps, "workspaceUiState");
    const applyRequestQueryFilters = requiredDependency(deps, "applyRequestQueryFilters");
    const applyWorkOrderListFilters = requiredDependency(deps, "applyWorkOrderListFilters");
    const applyWorkOrderFilters = requiredDependency(deps, "applyWorkOrderFilters");
    const selectWorkOrders = requiredDependency(deps, "selectWorkOrders");
    const countWorkOrdersQuery = requiredDependency(deps, "countWorkOrdersQuery");
    const fetchExactSearchedWorkOrderPage = requiredDependency(deps, "fetchExactSearchedWorkOrderPage");
    const isColumnSchemaError = requiredDependency(deps, "isColumnSchemaError");
    const warn = deps.warn || (() => {});
    const listItemsPerPage = requiredDependency(deps, "LIST_ITEMS_PER_PAGE");
    const workOrdersPerPage = requiredDependency(deps, "WORK_ORDERS_PER_PAGE");
    const requestRelationSelect = requiredDependency(deps, "REQUEST_RELATION_SELECT");
    const requestAssetFallbackSelect = requiredDependency(deps, "REQUEST_ASSET_FALLBACK_SELECT");
    const requestFallbackSelect = requiredDependency(deps, "REQUEST_FALLBACK_SELECT");
    const workOrderRelationSelect = requiredDependency(deps, "WORK_ORDER_RELATION_SELECT");
    const workOrderFallbackSelect = requiredDependency(deps, "WORK_ORDER_FALLBACK_SELECT");

    function getSupabaseClient() {
      return typeof supabaseClientRef === "function" ? supabaseClientRef() : supabaseClientRef;
    }

    async function fetchRequestPage(filter = workspaceUiState.getRequestViewFilter(), options = {}) {
      const page = Math.max(1, workspaceUiState.getRequestsPage());
      const from = (page - 1) * listItemsPerPage;
      const to = from + listItemsPerPage - 1;
      const selectClause = options.includeRelations === false
        ? requestFallbackSelect
        : options.includeLocationRelation === false
          ? requestAssetFallbackSelect
          : requestRelationSelect;

      const response = await applyRequestQueryFilters(
        getSupabaseClient()
          .from("maintenance_requests")
          .select(selectClause, { count: "exact" }),
        filter
      )
        .order("created_at", { ascending: false })
        .range(from, to);

      if (response.error && options.includeLocationRelation !== false && isColumnSchemaError(response.error, ["location_id", "locations"])) {
        return fetchRequestPage(filter, { includeLocationRelation: false });
      }
      if (response.error && options.includeRelations !== false) {
        return fetchRequestPage(filter, { includeRelations: false });
      }
      if (!response.error && response.count && page > 1 && from >= response.count) {
        workspaceUiState.setRequestsPage(Math.max(1, Math.ceil(response.count / listItemsPerPage)));
        return fetchRequestPage(filter, options);
      }
      return response;
    }

    async function countRequests(filter) {
      const response = await applyRequestQueryFilters(
        getSupabaseClient()
          .from("maintenance_requests")
          .select("id", { count: "exact", head: true }),
        filter
      );
      if (response.error) {
        warn("Request count failed", response.error);
        return 0;
      }
      return response.count || 0;
    }

    async function loadRequestDashboardCounts() {
      const [active, converted, all] = await Promise.all([
        countRequests("active"),
        countRequests("converted"),
        countRequests("all"),
      ]);
      return { active, converted, all };
    }

    async function fetchWorkOrderPage(options = {}) {
      if (workspaceUiState.getWorkOrderSearchMode() && workspaceUiState.getSearchQuery().trim()) {
        return fetchExactSearchedWorkOrderPage(options);
      }

      const page = Math.max(1, workspaceUiState.getWorkOrderPage());
      const from = (page - 1) * workOrdersPerPage;
      const to = from + workOrdersPerPage - 1;
      const selectClause = options.includeLocationRelation === false ? workOrderFallbackSelect : workOrderRelationSelect;
      const response = await applyWorkOrderListFilters(
        selectWorkOrders(getSupabaseClient(), selectClause, { count: "exact" })
      )
        .range(from, to);

      if (!response.error && response.count && page > 1 && from >= response.count) {
        workspaceUiState.setWorkOrderPage(Math.max(1, Math.ceil(response.count / workOrdersPerPage)));
        return fetchWorkOrderPage(options);
      }

      return response;
    }

    async function countWorkOrders(options = {}) {
      const response = await applyWorkOrderFilters(countWorkOrdersQuery(getSupabaseClient()), options);
      if (response.error) {
        warn("Work order count failed", response.error);
        return 0;
      }
      return response.count || 0;
    }

    async function loadWorkOrderDashboardCounts() {
      const [activeWork, newWork, inProgress, blocked, overdue, completedMonth, completedWeek] = await Promise.all([
        countWorkOrders({ statusFilter: "active", includeQueue: false, includeSearch: false }),
        countWorkOrders({ statusFilter: "open", includeQueue: false, includeSearch: false }),
        countWorkOrders({ statusFilter: "in_progress", includeQueue: false, includeSearch: false }),
        countWorkOrders({ statusFilter: "blocked", includeQueue: false, includeSearch: false }),
        countWorkOrders({ statusFilter: "overdue", includeQueue: false, includeSearch: false }),
        countWorkOrders({ statusFilter: "completed_month", includeQueue: false, includeSearch: false }),
        countWorkOrders({ statusFilter: "completed_week", includeQueue: false, includeSearch: false }),
      ]);
      return { activeWork, newWork, inProgress, blocked, overdue, completedMonth, completedWeek };
    }

    async function loadMyWorkDashboardCounts() {
      const [activeWork, newWork, inProgress, blocked, overdue, completedMonth, completedWeek] = await Promise.all([
        countWorkOrders({ statusFilter: "active", section: "mywork", includeQueue: true, includeSearch: true }),
        countWorkOrders({ statusFilter: "open", section: "mywork", includeQueue: true, includeSearch: true }),
        countWorkOrders({ statusFilter: "in_progress", section: "mywork", includeQueue: true, includeSearch: true }),
        countWorkOrders({ statusFilter: "blocked", section: "mywork", includeQueue: true, includeSearch: true }),
        countWorkOrders({ statusFilter: "overdue", section: "mywork", includeQueue: true, includeSearch: true }),
        countWorkOrders({ statusFilter: "completed_month", section: "mywork", includeQueue: true, includeSearch: true }),
        countWorkOrders({ statusFilter: "completed_week", section: "mywork", includeQueue: true, includeSearch: true }),
      ]);
      return { activeWork, newWork, inProgress, blocked, overdue, completedMonth, completedWeek };
    }

    return {
      fetchRequestPage,
      countRequests,
      loadRequestDashboardCounts,
      fetchWorkOrderPage,
      countWorkOrders,
      loadWorkOrderDashboardCounts,
      loadMyWorkDashboardCounts,
    };
  }

  const api = { createWorkspaceQueueLoaders };
  if (typeof window !== "undefined") window.MaintainOpsWorkspaceQueueLoadersService = api;
  if (typeof module !== "undefined") module.exports = api;
})();
