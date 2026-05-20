(function () {
  function createTeamMemberDisplayHelpers({
    getProfilesByUserId,
    getCurrentUser,
    getCompanyMembers,
    matchesSearch,
  }) {
    function teamMemberName(userId) {
      const profile = getProfilesByUserId()[userId];
      const currentUser = getCurrentUser();
      if (userId === currentUser?.id) return profile?.full_name || currentUser?.email || "Me";
      return profile?.full_name || userId;
    }

    function filteredMembers() {
      return getCompanyMembers().filter((member) => matchesSearch([
        member.user_id,
        member.role,
        getProfilesByUserId()[member.user_id]?.full_name,
      ]));
    }

    return {
      teamMemberName,
      filteredMembers,
    };
  }

  window.MaintainOpsTeamMemberDisplay = {
    createTeamMemberDisplayHelpers,
  };
})();
