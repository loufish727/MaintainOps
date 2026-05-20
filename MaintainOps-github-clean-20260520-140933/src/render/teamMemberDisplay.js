(function () {
  function createTeamMemberDisplayHelpers({
    getProfilesByUserId,
    getCurrentUser,
  }) {
    function teamMemberName(userId) {
      const profile = getProfilesByUserId()[userId];
      const currentUser = getCurrentUser();
      if (userId === currentUser?.id) return profile?.full_name || currentUser?.email || "Me";
      return profile?.full_name || userId;
    }

    return {
      teamMemberName,
    };
  }

  window.MaintainOpsTeamMemberDisplay = {
    createTeamMemberDisplayHelpers,
  };
})();
