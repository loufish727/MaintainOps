(function () {
  function createInviteLocationDisplayHelpers({
    getLocations,
  }) {
    function inviteDefaultLocationLabel(invite) {
      const location = getLocations().find((item) => item.id === invite.default_location_id);
      return location ? `Default location: ${location.name}` : "Default location: first available";
    }

    return {
      inviteDefaultLocationLabel,
    };
  }

  window.MaintainOpsInviteLocationDisplay = {
    createInviteLocationDisplayHelpers,
  };
})();
