(function () {
  function createOptionDisplayHelpers({
    escapeHtml,
    getLocations,
    getActiveLocationId,
    getAssets,
    filteredAssets,
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
      const options = filteredAssets();
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

    return {
      renderLocationOptions,
      renderAssetOptions,
      renderParentAssetOptions,
      assetOptionLabel,
    };
  }

  window.MaintainOpsOptionDisplay = {
    createOptionDisplayHelpers,
  };
})();
