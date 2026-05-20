(function () {
  function createActivityFeedDisplayHelpers() {
    function buildActivityFeed(comments, photos, events, usedParts = []) {
      return [
        ...comments.map((comment) => ({ ...comment, type: "comment" })),
        ...photos.map((photo) => ({ ...photo, type: "photo" })),
        ...usedParts.map((part) => ({ ...part, type: "part" })),
        ...events.map((event) => ({ ...event, type: "event" })),
      ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return {
      buildActivityFeed,
    };
  }

  window.MaintainOpsActivityFeedDisplay = {
    createActivityFeedDisplayHelpers,
  };
})();
