(function () {
  function renderAssetInventoryControls({ assets, matchesActiveLocation, workspaceUiState, ASSET_TYPE_OPTIONS, escapeHtml }) {
    const locationAssets = assets.filter(matchesActiveLocation);
    const assetAreaOptions = [...new Set((workspaceUiState.getAssetTypeFilter() === "traveling_machine" ? assets.filter((asset) => asset.asset_type === "traveling_machine") : locationAssets).map((asset) => String(asset.location || "").trim()).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b));
    if (workspaceUiState.getAssetAreaFilter() !== "all" && !assetAreaOptions.includes(workspaceUiState.getAssetAreaFilter())) {
      workspaceUiState.setAssetAreaFilter("all");
    }
    const activeAssetAreaFilter = workspaceUiState.getAssetAreaFilter();
    const assetTypeCounts = ASSET_TYPE_OPTIONS.reduce((counts, type) => {
      counts[type] = locationAssets.filter((asset) => (asset.asset_type || "machine") === type).length;
      return counts;
    }, {});
    const runningAssetCount = locationAssets.filter((asset) => asset.status === "running").length;
    const degradedAssetCount = locationAssets.filter((asset) => asset.status === "degraded").length;
    const downAssetCount = locationAssets.filter((asset) => asset.status === "offline").length;
    const activeAssetStatusFilter = workspaceUiState.getAssetStatusFilter();
    const activeAssetTypeFilter = workspaceUiState.getAssetTypeFilter();
    const renderAssetAreaFilter = () => `
      <div class="asset-area-filter relationship-detail asset" aria-label="Equipment area filter">
        <label>Area / spot
          <select data-asset-area-filter>
            <option value="all" ${activeAssetAreaFilter === "all" ? "selected" : ""}>Display all areas</option>
            ${assetAreaOptions.map((area) => `<option value="${escapeHtml(area)}" ${activeAssetAreaFilter === area ? "selected" : ""}>${escapeHtml(area)}</option>`).join("")}
          </select>
        </label>
        <span>${activeAssetAreaFilter === "all" ? "Showing all equipment areas." : `Showing ${escapeHtml(activeAssetAreaFilter)}.`}</span>
      </div>
    `;
    const assetTypeSummaryCards = [
      { label: "Traveling Equipment", count: assets.filter((asset) => asset.asset_type === "traveling_machine").length,
        tone: "command-owner", typeFilter: "traveling_machine", detail: "All company facilities.", empty: "No traveling equipment yet." },
      {
        label: "Running",
        count: runningAssetCount,
        tone: "status-completed",
        statusFilter: "running",
        detail: "Equipment currently marked running.",
        empty: "No equipment marked running.",
      },
      {
        label: "Degraded",
        count: degradedAssetCount,
        tone: "status-open",
        statusFilter: "degraded",
        detail: "Known issue, still usable.",
        empty: "No degraded equipment.",
      },
      {
        label: "Offline / Down",
        count: downAssetCount,
        tone: "status-blocked",
        statusFilter: "offline",
        detail: "Equipment currently marked offline/down.",
        empty: "No equipment marked offline/down.",
      },
      {
        type: "machine",
        label: "Primary",
        count: assetTypeCounts.machine || 0,
        tone: "command-owner",
        typeFilter: "machine",
        detail: "Main machines, lines, and standalone equipment.",
        empty: "No primary equipment yet.",
      },
      {
        type: "forklift",
        label: "Forklifts / Mobile Lifts",
        count: assetTypeCounts.forklift || 0,
        tone: "command-equipment",
        typeFilter: "forklift",
        detail: "Lift trucks and mobile equipment with repair or inspection history.",
        empty: "No forklifts or mobile lifts yet.",
      },
      {
        type: "secondary_machine",
        label: "Sub Equipment",
        count: assetTypeCounts.secondary_machine || 0,
        tone: "command-equipment",
        typeFilter: "secondary_machine",
        detail: "Major sections under a main machine or line.",
        empty: "No sub equipment yet.",
      },
      {
        type: "tooling",
        label: "Tooling / Setup",
        count: assetTypeCounts.tooling || 0,
        tone: "command-equipment",
        typeFilter: "tooling",
        detail: "Roll tooling, die sets, profiles, and setup records.",
        empty: "No tooling/setup records yet.",
      },
      {
        type: "component",
        label: "Components",
        count: assetTypeCounts.component || 0,
        tone: "command-equipment",
        typeFilter: "component",
        detail: "Tracked equipment components; inventory parts stay in detail.",
        empty: "No component records yet.",
      },
      {
        type: "shop_item",
        label: "Shop Items",
        count: assetTypeCounts.shop_item || 0,
        tone: "command-equipment",
        typeFilter: "shop_item",
        detail: "Support equipment or shop assets worth tracking.",
        empty: "No shop item records yet.",
      },
    ];
    const renderAssetMasterSummary = () => `
      <section class="work-command-summary asset-command-summary asset-master-summary" aria-label="Equipment master summary">
        ${assetTypeSummaryCards.map((card) => {
          const count = card.count || 0;
          const active = (card.statusFilter && activeAssetStatusFilter === card.statusFilter) || (card.typeFilter && activeAssetTypeFilter === card.typeFilter);
          const filterAttribute = card.statusFilter
            ? `data-asset-status-filter="${escapeHtml(card.statusFilter)}"`
            : `data-asset-type-filter="${escapeHtml(card.typeFilter)}"`;
          return `
            <button class="command-card ${card.tone} ${count ? "" : "empty"} ${active ? "active" : ""}" ${filterAttribute} aria-pressed="${active}" type="button">
              <span>${escapeHtml(card.label)}</span>
              <strong>${count}</strong>
              <small>${escapeHtml(count ? card.detail : card.empty)}</small>
            </button>
          `;
        }).join("")}
      </section>
    `;
    return `${renderAssetMasterSummary()}${workspaceUiState.getAssetTypeFilter() === "traveling_machine" ? '<h3>Traveling Equipment <small>All facilities</small></h3>' : ""}${renderAssetAreaFilter()}`;
  }
  window.MaintainOpsAssetInventoryDisplay = { renderAssetInventoryControls };
})();
