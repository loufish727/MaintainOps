(function () {
  function createNavBadgeDisplayHelpers() {
    function normalizedCount(count) {
      const value = Number(count);
      if (!Number.isFinite(value) || value <= 0) return 0;
      return Math.floor(value);
    }

    function navBadgeText(count) {
      const value = normalizedCount(count);
      if (!value) return "";
      return value > 99 ? "99+" : String(value);
    }

    function renderNavCountBadge(count, options = {}) {
      const text = navBadgeText(count);
      if (!text) return "";
      const alertClass = options.alert ? " nav-alert-badge" : "";
      const suffix = options.alertSuffix ? "!" : "";
      return `<b class="nav-badge${alertClass}">${text}${suffix}</b>`;
    }

    return {
      navBadgeText,
      renderNavCountBadge,
    };
  }

  window.MaintainOpsNavBadgeDisplay = {
    createNavBadgeDisplayHelpers,
  };
})();
