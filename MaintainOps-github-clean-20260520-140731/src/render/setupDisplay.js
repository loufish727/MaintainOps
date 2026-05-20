(function () {
  function createSetupDisplayHelpers({
    escapeHtml,
  }) {
    function renderSetupItem(item) {
      return `
        <article class="setup-item ${item.ready ? "ready" : "needs-work"}">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.detail)}</span>
            ${item.action ? `<button class="secondary-button setup-action-button" data-setup-action="${escapeHtml(item.action)}" type="button">${escapeHtml(item.actionLabel)}</button>` : ""}
          </div>
          <span class="chip ${item.ready ? "completed" : "blocked"}">${item.ready ? "ready" : "setup"}</span>
        </article>
      `;
    }

    return {
      renderSetupItem,
    };
  }

  window.MaintainOpsSetupDisplay = {
    createSetupDisplayHelpers,
  };
})();
