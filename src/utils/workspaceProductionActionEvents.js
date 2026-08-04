(function () {
  function bindWorkspaceProductionActionEvents(options = {}) {
    const doc = options.documentRef || document;

    doc.querySelectorAll("[data-production-action-control]").forEach((control) => {
      control.addEventListener("click", (event) => event.stopPropagation());
    });
    doc.querySelectorAll("[data-production-action-form]").forEach((form) => {
      form.addEventListener("submit", options.saveProductionAction);
    });
    doc.querySelectorAll("[data-production-action-status]").forEach((button) => {
      button.addEventListener("click", options.setProductionActionStatus);
    });
    doc.querySelectorAll("[data-production-action-remove]").forEach((button) => {
      button.addEventListener("click", options.removeProductionAction);
    });
  }

  window.MaintainOpsWorkspaceProductionActionEvents = {
    bindWorkspaceProductionActionEvents,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { bindWorkspaceProductionActionEvents };
  }
})();
