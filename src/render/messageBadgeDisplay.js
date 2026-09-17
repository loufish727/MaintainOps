(function () {
  function createMessageBadgeDisplayHelpers({
    directUnreadMessages,
    totalUnreadMessages,
  }) {
    function renderMessageNavBadge() {
      const unread = totalUnreadMessages();
      return unread > 0 ? `<b class="nav-badge nav-message-badge" aria-label="${unread} unread conversations and work alerts">${unread}</b>` : "";
    }

    return {
      renderMessageNavBadge,
    };
  }

  window.MaintainOpsMessageBadgeDisplay = {
    createMessageBadgeDisplayHelpers,
  };
})();
