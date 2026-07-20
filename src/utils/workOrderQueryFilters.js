(function () {
  function createWorkOrderQueryFilterHelpers(deps) {
    function state(name) {
      return deps[name]();
    }

    function optionalState(name, fallback) {
      return typeof deps[name] === "function" ? deps[name]() : fallback;
    }

    function applyWorkOrderListFilters(query) {
      const searchQuery = state("searchQuery");
      const activeSection = state("activeSection");
      const activeStatusFilter = state("activeStatusFilter");
      const isGlobalSearch = Boolean(searchQuery.trim());
      const statusFilter = isGlobalSearch
        ? "__any__"
        : activeSection === "work" && activeStatusFilter === "requests"
          ? "__none__"
          : activeStatusFilter;
      return applyWorkOrderSort(applyWorkOrderFilters(query, {
        statusFilter,
        section: activeSection,
        includeQueue: !isGlobalSearch,
        includeSearch: true,
      }));
    }

    function applyWorkOrderFilters(query, options = {}) {
      const section = options.section || state("activeSection");
      let nextQuery = query.eq("company_id", state("activeCompanyId"));
      if (state("locationsReady") && state("activeLocationId")) {
        nextQuery = nextQuery.eq("location_id", state("activeLocationId"));
      }

      if (options.includeQueue !== false) {
        nextQuery = applyWorkOrderQueueFilters(nextQuery, section);
      }

      if (options.includeAttributeFilters !== false && section === "work") {
        const typeFilter = optionalState("workOrderTypeFilter", "all");
        const priorityFilter = optionalState("workOrderPriorityFilter", "all");
        if (typeFilter !== "all") nextQuery = nextQuery.eq("type", typeFilter);
        if (priorityFilter !== "all") nextQuery = nextQuery.eq("priority", priorityFilter);
      }

      nextQuery = applyWorkOrderStatusFilter(nextQuery, options.statusFilter || state("activeStatusFilter"));

      if (options.includeSearch !== false) {
        const term = deps.postgrestSearchTerm(state("searchQuery"));
        if (term) {
          const workOrderRelatedSearch = state("workOrderRelatedSearch");
          const searchClauses = [
            `title.ilike.%${term}%`,
            `description.ilike.%${term}%`,
            `priority.ilike.%${term}%`,
            `type.ilike.%${term}%`,
            `status.ilike.%${term}%`,
            ...(workOrderRelatedSearch.assetIds.length ? [`asset_id.in.(${workOrderRelatedSearch.assetIds.join(",")})`] : []),
            ...(workOrderRelatedSearch.procedureIds.length ? [`procedure_template_id.in.(${workOrderRelatedSearch.procedureIds.join(",")})`] : []),
            ...(workOrderRelatedSearch.workOrderIds.length ? [`id.in.(${workOrderRelatedSearch.workOrderIds.join(",")})`] : []),
          ];
          nextQuery = nextQuery.or(searchClauses.join(","));
        }
      }

      return nextQuery;
    }

    function applyWorkOrderQueueFilters(query, section) {
      if (section === "mywork") {
        return state("myWorkFilter") === "created"
          ? query.eq("created_by", state("session").user.id)
          : query.eq("assigned_to", state("session").user.id);
      }

      if (section !== "work") return query;
      if (state("workOrderAssigneeFilter")) return query.eq("assigned_to", state("workOrderAssigneeFilter"));
      if (state("workOrderFilter") === "assigned") return query.not("assigned_to", "is", null);
      if (state("workOrderFilter") === "vendor") return query.ilike("description", `%${deps.OUTSIDE_VENDOR_NOTE}%`);
      if (state("workOrderFilter") === "unassigned") {
        return query
          .is("assigned_to", null)
          .not("description", "ilike", `%${deps.OUTSIDE_VENDOR_NOTE}%`);
      }
      return query;
    }

    function applyWorkOrderStatusFilter(query, statusFilter) {
      const today = deps.isoDate(deps.startOfToday());
      if (statusFilter === "__any__") return query;
      if (statusFilter === "__none__") return query.eq("id", "00000000-0000-0000-0000-000000000000");
      if (statusFilter === "overdue") return query.neq("status", "completed").lt("due_at", today);
      if (statusFilter === "completed_month") return query.gte("completed_at", deps.isoDateTime(deps.monthStartDate()));
      if (statusFilter === "completed_week") return query.gte("completed_at", deps.isoDateTime(deps.daysAgoDate(7)));
      if (statusFilter === "active" || statusFilter === "all") return query.neq("status", "completed");
      return query.eq("status", statusFilter);
    }

    function applyWorkOrderSort(query) {
      if (["completed", "completed_month", "completed_week"].includes(state("activeStatusFilter"))) {
        return query
          .order("completed_at", { ascending: false, nullsFirst: false })
          .order("created_at", { ascending: false });
      }

      if (state("workSort") === "due") {
        return query
          .order("due_at", { ascending: true, nullsFirst: false })
          .order("created_at", { ascending: false });
      }

      if (state("workSort") === "priority") {
        return query
          .order("priority_rank", { ascending: false })
          .order("due_at", { ascending: true, nullsFirst: false })
          .order("created_at", { ascending: false });
      }

      if (state("workSort") === "type") {
        return query
          .order("type", { ascending: true })
          .order("created_at", { ascending: false });
      }

      if (state("workSort") === "assigned") {
        return query
          .order("assigned_to", { ascending: true, nullsFirst: false })
          .order("created_at", { ascending: false });
      }

      return query.order("created_at", { ascending: false });
    }

    return {
      applyWorkOrderListFilters,
      applyWorkOrderFilters,
      applyWorkOrderQueueFilters,
      applyWorkOrderStatusFilter,
      applyWorkOrderSort,
    };
  }

  window.MaintainOpsWorkOrderQueryFilters = {
    createWorkOrderQueryFilterHelpers,
  };
})();
