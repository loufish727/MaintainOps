(function () {
  function createLocationDisplayHelpers(deps) {
    function activeLocationName() {
      return deps.getLocations().find((location) => location.id === deps.getActiveLocationId())?.name || "Location";
    }

    return {
      activeLocationName,
    };
  }

  window.MaintainOpsLocationDisplay = {
    createLocationDisplayHelpers,
  };
})();
