(function () {
  function createMessageComposerDisplayHelpers({
    activeLocationName,
  }) {
    function messageComposerScopeNote(threadType) {
      if (threadType === "direct") return "Only you and the selected teammate will see this thread.";
      if (threadType === "location") return `Visible to company members. Tagged to ${activeLocationName()}.`;
      return "Visible to everyone in this company.";
    }

    return {
      messageComposerScopeNote,
    };
  }

  window.MaintainOpsMessageComposerDisplay = {
    createMessageComposerDisplayHelpers,
  };
})();
