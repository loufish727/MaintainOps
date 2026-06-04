(function () {
  function createOptionDisplayHelpers({
    escapeHtml,
    getLocations,
    getActiveLocationId,
    getAssets,
    matchesActiveLocation,
    isAssetDescendantOf,
    parentAssetFor,
  }) {
    function renderLocationOptions(selectedId = getActiveLocationId()) {
      return getLocations().map((location) => `<option value="${location.id}" ${location.id === selectedId ? "selected" : ""}>${escapeHtml(location.name)}</option>`).join("");
    }

    function assetOptionLabel(asset) {
      const parent = parentAssetFor(asset);
      return parent ? `${asset.name} - part of ${parent.name}` : asset.name;
    }

    function renderAssetOptions(selectedId = "") {
      const options = getAssets()
        .filter(matchesActiveLocation)
        .sort((a, b) => assetOptionLabel(a).localeCompare(assetOptionLabel(b)));
      const selectedAsset = selectedId ? getAssets().find((asset) => asset.id === selectedId) : null;
      const list = selectedAsset && !options.some((asset) => asset.id === selectedAsset.id)
        ? [selectedAsset, ...options]
        : options;
      return list.map((asset) => `<option value="${asset.id}" ${asset.id === selectedId ? "selected" : ""}>${escapeHtml(assetOptionLabel(asset))}</option>`).join("");
    }

    function renderParentAssetOptions(selectedId = "", currentAssetId = "") {
      return getAssets()
        .filter(matchesActiveLocation)
        .filter((asset) => asset.id !== currentAssetId && !isAssetDescendantOf(asset.id, currentAssetId))
        .sort((a, b) => assetOptionLabel(a).localeCompare(assetOptionLabel(b)))
        .map((asset) => `<option value="${asset.id}" ${asset.id === selectedId ? "selected" : ""}>${escapeHtml(assetOptionLabel(asset))}</option>`)
        .join("");
    }

    function assetAreaOptions(selectedArea = "") {
      const areas = [...new Set(getAssets()
        .filter(matchesActiveLocation)
        .map((asset) => String(asset.location || "").trim())
        .filter(Boolean))]
        .sort((a, b) => a.localeCompare(b));
      const cleanSelected = String(selectedArea || "").trim();
      return cleanSelected && !areas.includes(cleanSelected) ? [cleanSelected, ...areas] : areas;
    }

    function renderAssetAreaOptions(selectedArea = "") {
      return assetAreaOptions(selectedArea)
        .map((area) => `<option value="${escapeHtml(area)}" ${area === selectedArea ? "selected" : ""}>${escapeHtml(area)}</option>`)
        .join("");
    }

    return {
      renderLocationOptions,
      renderAssetOptions,
      renderParentAssetOptions,
      renderAssetAreaOptions,
      assetOptionLabel,
    };
  }

  window.MaintainOpsOptionDisplay = {
    createOptionDisplayHelpers,
  };
})();
