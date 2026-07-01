(function () {
  function createRequestQueryFilterHelpers(deps) {
    function state(name) {
      return deps[name]();
    }

    function applyRequestQueryFilters(query, filter = state("requestViewFilter")) {
      let nextQuery = query.eq("company_id", state("activeCompanyId"));
      if (state("locationsReady") && state("activeLocationId")) nextQuery = nextQuery.eq("location_id", state("activeLocationId"));

      if (filter === "converted") {
        nextQuery = nextQuery.or("status.eq.converted,converted_work_order_id.not.is.null");
      } else if (filter !== "all") {
        nextQuery = nextQuery.eq("status", "submitted").is("converted_work_order_id", null);
      }

      const term = deps.postgrestSearchTerm(state("searchQuery"));
      if (term) {
        const pattern = `%${term}%`;
        const matchedAssetIds = state("assets")
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
          ], term))
          .map((asset) => asset.id)
          .slice(0, deps.SEARCH_ID_PAGE_SIZE);
        nextQuery = nextQuery.or([
          `title.ilike.${pattern}`,
          `description.ilike.${pattern}`,
          `status.ilike.${pattern}`,
          `priority.ilike.${pattern}`,
          `requested_by_name.ilike.${pattern}`,
          `requested_by_contact.ilike.${pattern}`,
          ...(matchedAssetIds.length ? [`asset_id.in.(${matchedAssetIds.join(",")})`] : []),
        ].join(","));
      }

      return nextQuery;
    }

    return { applyRequestQueryFilters };
  }

  window.MaintainOpsRequestQueryFilters = {
    createRequestQueryFilterHelpers,
  };
})();
