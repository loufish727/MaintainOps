(function () {
  function createAssetCardDisplayHelpers({
    escapeHtml,
    assetTypeLabel,
    assetStatusLabel,
    getWorkOrders,
    getAssetParts,
    getAssetDocumentsByAssetId,
    getActiveAssetId,
    parentAssetFor,
    childAssetsFor,
  }) {
    function equipmentTypeSummary(assetType) {
      const type = String(assetType || "").toLowerCase();
      if (type === "tooling") {
        return {
          primary: "Setup",
          standalone: "Standalone tooling",
          child: "Linked setup items",
          noChild: "No linked setup items",
          childLabel: "Setup Items",
          files: "Tooling files on record",
          noFiles: "No tooling files yet",
        };
      }
      if (type === "component") {
        return {
          primary: "Parent",
          standalone: "Standalone component",
          child: "Linked component items",
          noChild: "No linked component items",
          childLabel: "Components",
          files: "Component files on record",
          noFiles: "No component files yet",
        };
      }
      if (type === "line" || type === "machine" || type === "secondary_machine") {
        return {
          primary: "Primary",
          standalone: "Primary / standalone item",
          child: "Linked child equipment",
          noChild: "No linked child equipment",
          childLabel: "Sub Equipment",
          files: "Machine files on record",
          noFiles: "No machine files yet",
        };
      }
      return {
        primary: "Primary",
        standalone: "Primary / standalone item",
        child: "Linked child items",
        noChild: "No linked child items",
        childLabel: "Linked Items",
        files: "Equipment files on record",
        noFiles: "No equipment files yet",
      };
    }

    function renderAssetCard(asset) {
      const openWork = getWorkOrders().filter((workOrder) => workOrder.asset_id === asset.id && workOrder.status !== "completed").length;
      const linkedParts = getAssetParts().filter((row) => row.asset_id === asset.id).length;
      const fileCount = (getAssetDocumentsByAssetId()[asset.id] || []).length;
      const parent = parentAssetFor(asset);
      const children = childAssetsFor(asset.id);
      const primaryLabel = parent ? parent.name : "Primary";
      const typeSummary = equipmentTypeSummary(asset.asset_type);
      const locationLabel = asset.location || "No location set";
      return `
        <article class="asset-card asset-state-${asset.status} ${asset.id === getActiveAssetId() ? "selected" : ""}" data-asset-id="${asset.id}" tabindex="0">
          <div class="asset-card-main">
            <div class="chip-row">
              <span class="chip asset-${asset.status}">${escapeHtml(assetStatusLabel(asset.status))}</span>
              <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
              ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
              ${asset.safety_devices_required === false ? `<span class="chip">no safety check</span>` : `<span class="chip overdue">safety check</span>`}
            </div>
            <h3>${escapeHtml(asset.name)}</h3>
            <div class="asset-card-context">
              <span>${escapeHtml(asset.location || "No location set")}</span>
              <span>${parent ? `Part of ${escapeHtml(primaryLabel)}` : "Top level equipment"}</span>
            </div>
            <div class="asset-card-summary" aria-label="Equipment card summary">
              <span>
                <small>Status</small>
                <strong>${escapeHtml(assetStatusLabel(asset.status))}</strong>
                <em>${asset.safety_devices_required === false ? "No safety completion gate" : "Safety check required before completing work"}</em>
              </span>
              <span>
                <small>Location</small>
                <strong>${escapeHtml(locationLabel)}</strong>
                <em>${asset.location ? escapeHtml(asset.location) : "Area / spot unset"}</em>
              </span>
              <span>
                <small>${escapeHtml(typeSummary.primary)}</small>
                <strong>${escapeHtml(parent ? primaryLabel : asset.asset_code || primaryLabel)}</strong>
                <em>${parent ? "Linked under parent equipment" : typeSummary.standalone}</em>
              </span>
              <span>
                <small>${escapeHtml(typeSummary.childLabel)}</small>
                <strong>${children.length}</strong>
                <em>${children.length ? typeSummary.child : typeSummary.noChild}</em>
              </span>
              <span>
                <small>Parts</small>
                <strong>${linkedParts}</strong>
                <em>${linkedParts ? "Recommended/common parts linked" : "No linked parts yet"}</em>
              </span>
              <span>
                <small>Open Work</small>
                <strong>${openWork}</strong>
                <em>${openWork ? "Active work tied to this equipment" : "No open work"}</em>
              </span>
              <span>
                <small>Files</small>
                <strong>${fileCount}</strong>
                <em>${fileCount ? typeSummary.files : typeSummary.noFiles}</em>
              </span>
            </div>
          </div>
        </article>
      `;
    }

    return {
      renderAssetCard,
    };
  }

  window.MaintainOpsAssetCardDisplay = {
    createAssetCardDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createAssetCardDisplayHelpers };
  }
})();
