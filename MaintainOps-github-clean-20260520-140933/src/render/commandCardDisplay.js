(function () {
  function createCommandCardDisplayHelpers({
    escapeHtml,
  }) {
    function commandShortcut(label, count, targetId, helper, tone) {
      return `
        <button class="command-card command-${tone} ${count ? "" : "empty"}" data-jump-work-section="${targetId}" type="button">
          <span>${escapeHtml(label)}</span>
          <strong>${count}</strong>
          <small>${escapeHtml(helper)}</small>
        </button>
      `;
    }

    function renderEmailHelperCommandCard(workOrder) {
      if (!workOrder.asset_id) return "";
      return commandShortcut("Email Helper", "Copy", "work-order-email-helper-target", "Copy to paste an email update", "email");
    }

    return {
      renderEmailHelperCommandCard,
      commandShortcut,
    };
  }

  window.MaintainOpsCommandCardDisplay = {
    createCommandCardDisplayHelpers,
  };
})();
