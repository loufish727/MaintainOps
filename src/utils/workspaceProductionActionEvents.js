(function () {
  function bindWorkspaceProductionActionEvents(options = {}) {
    const doc = options.documentRef || document;

    doc.querySelectorAll("[data-production-action-control]").forEach((control) => {
      control.addEventListener("click", (event) => event.stopPropagation());
    });
    doc.querySelectorAll("[data-production-action-dialog-open]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const dialog = doc.getElementById(button.getAttribute("aria-controls"));
        if (!dialog || dialog.open) return;
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      });
    });
    doc.querySelectorAll("[data-production-action-dialog-close]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const dialog = button.closest("[data-production-action-dialog]");
        if (!dialog) return;
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      });
    });
    doc.querySelectorAll("[data-production-action-dialog]").forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target !== dialog) return;
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      });
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
