(function () {
  function createAssetHierarchyDisplayHelpers(deps) {
    function parentAssetFor(asset) {
      return deps.getAssets().find((item) => item.id === asset?.parent_asset_id) || null;
    }

    function childAssetsFor(assetId) {
      return deps.getAssets()
        .filter((asset) => asset.parent_asset_id === assetId)
        .sort((a, b) => a.name.localeCompare(b.name));
    }

    function isAssetDescendantOf(assetId, ancestorId) {
      if (!assetId || !ancestorId) return false;
      let current = deps.getAssets().find((asset) => asset.id === assetId);
      const seen = new Set();
      while (current?.parent_asset_id && !seen.has(current.id)) {
        if (current.parent_asset_id === ancestorId) return true;
        seen.add(current.id);
        current = deps.getAssets().find((asset) => asset.id === current.parent_asset_id);
      }
      return false;
    }

    function filteredAssets() {
      return deps.getAssets().filter((asset) => {
        if (!deps.matchesActiveLocation(asset)) return false;
        if (deps.getAssetStatusFilter() !== "all" && asset.status !== deps.getAssetStatusFilter()) return false;
        if (deps.getAssetTypeFilter && deps.getAssetTypeFilter() !== "all" && (asset.asset_type || "machine") !== deps.getAssetTypeFilter()) return false;
        return deps.matchesSearch([
          asset.name,
          asset.asset_code,
          asset.location,
          asset.status,
          asset.asset_type,
          parentAssetFor(asset)?.name,
        ]);
      });
    }

    return {
      filteredAssets,
      parentAssetFor,
      childAssetsFor,
      isAssetDescendantOf,
    };
  }

  window.MaintainOpsAssetHierarchyDisplay = {
    createAssetHierarchyDisplayHelpers,
  };
})();
