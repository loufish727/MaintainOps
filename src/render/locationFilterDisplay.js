(function () {
  function createLocationFilterDisplayHelpers(deps) {
    function recordLocationId(record) {
      return record?.location_id || record?.assets?.location_id || null;
    }

    function matchesActiveLocation(record) {
      if (!deps.getLocationsReady() || !deps.getActiveLocationId()) return true;
      return recordLocationId(record) === deps.getActiveLocationId();
    }

    return {
      recordLocationId,
      matchesActiveLocation,
    };
  }

  window.MaintainOpsLocationFilterDisplay = {
    createLocationFilterDisplayHelpers,
  };
})();
