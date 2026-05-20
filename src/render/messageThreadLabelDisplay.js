(function () {
  function createMessageThreadLabelDisplayHelpers({
    getLocations,
    getMessageThreadMembers,
    teamMemberName,
  }) {
    function directThreadNames(thread) {
      const members = getMessageThreadMembers()
        .filter((member) => member.thread_id === thread.id)
        .map((member) => teamMemberName(member.user_id));
      return members.length ? members.join(", ") : "Direct message";
    }

    function messageThreadScopeLabel(thread) {
      if (thread.thread_type === "direct") return directThreadNames(thread);
      if (thread.thread_type === "location") return getLocations().find((location) => location.id === thread.location_id)?.name || "Location thread";
      return "Whole company";
    }

    return {
      directThreadNames,
      messageThreadScopeLabel,
    };
  }

  window.MaintainOpsMessageThreadLabelDisplay = {
    createMessageThreadLabelDisplayHelpers,
  };
})();
