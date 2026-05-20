(function () {
  function createMessageBadgeDisplayHelpers({
    directUnreadMessages,
    totalUnreadMessages,
  }) {
    function renderMessageNavBadge() {
      const directUnread = directUnreadMessages();
      if (directUnread > 0) return `<b class="nav-badge nav-alert-badge">${directUnread}!</b>`;
      const unread = totalUnreadMessages();
      return unread > 0 ? `<b class="nav-badge">${unread}</b>` : "";
    }

    return {
      renderMessageNavBadge,
    };
  }

  window.MaintainOpsMessageBadgeDisplay = {
    createMessageBadgeDisplayHelpers,
  };
})();
