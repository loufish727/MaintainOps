(function () {
  function createWorkOrderSearchHelpers(deps) {
    function state(name) {
      return deps[name]();
    }

    async function refreshWorkOrderRelatedSearch() {
      const query = state("searchQuery").trim();
      if (!query || state("workOrderSearchMode")) {
        deps.setWorkOrderRelatedSearch({ assetIds: [], workOrderIds: [], procedureIds: [] });
        return;
      }

      const matchedAssets = state("assets")
        .filter(deps.matchesActiveLocation)
        .filter((asset) => deps.matchesQuery([
          asset.name,
          asset.asset_code,
          asset.manufacturer,
          asset.model,
          asset.location,
          asset.status,
          asset.asset_type,
          deps.parentAssetFor()(asset)?.name,
        ], query))
        .map((asset) => asset.id);

      const matchedProcedures = state("procedureTemplates")
        .filter((template) => deps.matchesQuery([
          template.name,
          template.description,
          ...(template.procedure_steps || []).map((step) => step.prompt),
        ], query))
        .map((template) => template.id);

      const matchedPartIds = state("parts")
        .filter(deps.matchesActiveLocation)
        .filter((part) => deps.matchesQuery([
          part.name,
          part.sku,
          part.supplier_name,
          part.quantity_on_hand,
          part.reorder_point,
          part.unit_cost,
        ], query))
        .map((part) => part.id);

      const workOrderIds = new Set();
      await Promise.all([
        addRelatedWorkOrderIdsFromParts(workOrderIds, matchedPartIds),
        addRelatedWorkOrderIdsFromTable(workOrderIds, "work_order_comments", ["body"], query),
        addRelatedWorkOrderIdsFromTable(workOrderIds, "work_order_events", ["event_type", "summary"], query),
        addRelatedWorkOrderIdsFromTable(workOrderIds, "work_order_photos", ["file_name"], query),
        addRelatedWorkOrderIdsFromTable(workOrderIds, "work_order_step_results", ["value"], query),
      ]);

      deps.setWorkOrderRelatedSearch({
        assetIds: matchedAssets.slice(0, 200),
        procedureIds: matchedProcedures.slice(0, 200),
        workOrderIds: [...workOrderIds].slice(0, 300),
      });
    }

    async function addRelatedWorkOrderIdsFromParts(target, partIds, options = {}) {
      if (!partIds.length) return;
      const maxRows = options.maxRows ?? 300;
      let remaining = maxRows;
      for (const chunk of deps.chunkArray(partIds, deps.SEARCH_ID_CHUNK_SIZE)) {
        if (remaining <= 0) break;
        try {
          await deps.fetchPagedSearchRows(
            () => state("supabaseClient")
              .from("work_order_parts")
              .select("work_order_id")
              .eq("company_id", state("activeCompanyId"))
              .in("part_id", chunk),
            (rows) => {
              rows.forEach((row) => {
                if (row.work_order_id) target.add(row.work_order_id);
              });
              remaining -= rows.length;
            },
            remaining
          );
        } catch (error) {
          deps.warn("Part-linked work order search failed", error);
          return;
        }
      }
    }

    async function addRelatedWorkOrderIdsFromTable(target, tableName, columns, query, options = {}) {
      const term = deps.postgrestSearchTerm(query);
      if (!term) return;
      const orClause = columns.map((column) => `${column}.ilike.%${term}%`).join(",");
      const maxRows = options.maxRows ?? 300;
      try {
        await deps.fetchPagedSearchRows(
          () => state("supabaseClient")
            .from(tableName)
            .select("work_order_id")
            .eq("company_id", state("activeCompanyId"))
            .or(orClause),
          (rows) => {
            rows.forEach((row) => {
              if (row.work_order_id) target.add(row.work_order_id);
            });
          },
          maxRows
        );
      } catch (error) {
        deps.warn(`${tableName} work order search failed`, error);
      }
    }

    async function fetchExactSearchedWorkOrderPage(options = {}) {
      const rows = await exactWorkOrderSearchRows();
      const total = rows.length;
      const totalPages = Math.max(1, Math.ceil(total / deps.WORK_ORDERS_PER_PAGE));
      if (state("workOrderPage") > totalPages) {
        deps.setWorkOrderPage(totalPages);
      }
      if (state("workOrderPage") < 1) {
        deps.setWorkOrderPage(1);
      }

      const from = (state("workOrderPage") - 1) * deps.WORK_ORDERS_PER_PAGE;
      const pageIds = rows.slice(from, from + deps.WORK_ORDERS_PER_PAGE).map((row) => row.id);
      if (!pageIds.length) return { data: [], error: null, count: total };

      const selectClause = options.includeLocationRelation === false ? deps.WORK_ORDER_FALLBACK_SELECT() : deps.WORK_ORDER_RELATION_SELECT();
      const response = await deps.fetchWorkOrdersByIds(state("supabaseClient"), {
        companyId: state("activeCompanyId"),
        locationId: state("activeLocationId"),
        locationsReady: state("locationsReady"),
        selectClause,
        ids: pageIds,
      });
      if (response.error) return response;
      const byId = new Map((response.data || []).map((workOrder) => [workOrder.id, workOrder]));
      return {
        ...response,
        data: pageIds.map((id) => byId.get(id)).filter(Boolean),
        count: total,
      };
    }

    async function exactWorkOrderSearchRows() {
      const key = [
        state("activeCompanyId") || "",
        state("locationsReady") ? state("activeLocationId") || "" : "all-locations",
        state("workSort"),
        state("searchQuery").trim().toLowerCase(),
      ].join("|");
      const cache = state("exactWorkOrderSearchCache");
      if (cache.key === key) return cache.rows;

      const query = state("searchQuery").trim();
      const rowMap = new Map();
      await addDirectWorkOrderSearchRows(rowMap, query);

      const matchedAssets = state("assets")
        .filter(deps.matchesActiveLocation)
        .filter((asset) => deps.matchesQuery([
          asset.name,
          asset.asset_code,
          asset.manufacturer,
          asset.model,
          asset.location,
          asset.status,
          asset.asset_type,
          deps.parentAssetFor()(asset)?.name,
        ], query))
        .map((asset) => asset.id);

      const matchedProcedures = state("procedureTemplates")
        .filter((template) => deps.matchesQuery([
          template.name,
          template.description,
          ...(template.procedure_steps || []).map((step) => step.prompt),
        ], query))
        .map((template) => template.id);

      const matchedPartIds = state("parts")
        .filter(deps.matchesActiveLocation)
        .filter((part) => deps.matchesQuery([
          part.name,
          part.sku,
          part.supplier_name,
          part.quantity_on_hand,
          part.reorder_point,
          part.unit_cost,
        ], query))
        .map((part) => part.id);

      await Promise.all([
        addWorkOrderSearchRowsByColumn(rowMap, "asset_id", matchedAssets),
        addWorkOrderSearchRowsByColumn(rowMap, "procedure_template_id", matchedProcedures),
      ]);

      const relatedIds = new Set();
      await Promise.all([
        addRelatedWorkOrderIdsFromParts(relatedIds, matchedPartIds, { maxRows: Infinity }),
        addRelatedWorkOrderIdsFromTable(relatedIds, "work_order_comments", ["body"], query, { maxRows: Infinity }),
        addRelatedWorkOrderIdsFromTable(relatedIds, "work_order_events", ["event_type", "summary"], query, { maxRows: Infinity }),
        addRelatedWorkOrderIdsFromTable(relatedIds, "work_order_photos", ["file_name"], query, { maxRows: Infinity }),
        addRelatedWorkOrderIdsFromTable(relatedIds, "work_order_step_results", ["value"], query, { maxRows: Infinity }),
      ]);
      await addWorkOrderSearchRowsByIds(rowMap, [...relatedIds]);

      const rows = [...rowMap.values()].sort(deps.compareWorkOrders);
      deps.setExactWorkOrderSearchCache({ key, rows });
      return rows;
    }

    async function addDirectWorkOrderSearchRows(target, query) {
      const term = deps.postgrestSearchTerm(query);
      if (!term) return;
      const orClause = [
        "title",
        "description",
        "priority",
        "type",
        "status",
        "failure_cause",
        "resolution_summary",
        "completion_notes",
      ].map((column) => `${column}.ilike.%${term}%`).join(",");

      await deps.fetchPagedSearchRows(
        () => scopedWorkOrderSearchQuery().or(orClause),
        (rows) => addWorkOrderSearchRows(target, rows)
      );
    }

    async function addWorkOrderSearchRowsByColumn(target, column, values) {
      if (!values.length) return;
      for (const chunk of deps.chunkArray(values, deps.SEARCH_ID_CHUNK_SIZE)) {
        await deps.fetchPagedSearchRows(
          () => scopedWorkOrderSearchQuery().in(column, chunk),
          (rows) => addWorkOrderSearchRows(target, rows)
        );
      }
    }

    async function addWorkOrderSearchRowsByIds(target, ids) {
      if (!ids.length) return;
      for (const chunk of deps.chunkArray(ids, deps.SEARCH_ID_CHUNK_SIZE)) {
        await deps.fetchPagedSearchRows(
          () => scopedWorkOrderSearchQuery().in("id", chunk),
          (rows) => addWorkOrderSearchRows(target, rows)
        );
      }
    }

    function scopedWorkOrderSearchQuery() {
      return deps.buildScopedWorkOrderSearchQuery(state("supabaseClient"), {
        companyId: state("activeCompanyId"),
        locationId: state("activeLocationId"),
        locationsReady: state("locationsReady"),
      });
    }

    function addWorkOrderSearchRows(target, rows) {
      (rows || []).forEach((row) => {
        if (!row?.id) return;
        target.set(row.id, { ...(target.get(row.id) || {}), ...row });
      });
    }

    return {
      refreshWorkOrderRelatedSearch,
      fetchExactSearchedWorkOrderPage,
      exactWorkOrderSearchRows,
      addRelatedWorkOrderIdsFromParts,
      addRelatedWorkOrderIdsFromTable,
    };
  }

  window.MaintainOpsWorkOrderSearch = {
    createWorkOrderSearchHelpers,
  };
})();
