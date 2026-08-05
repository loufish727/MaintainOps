(function () {
  function bindWorkspaceWorkOrderNotificationEvents(options = {}) {
    const doc = options.documentRef || document;

    doc.querySelectorAll(".work-card[data-id]").forEach((card) => {
      card.addEventListener("click", () => {
        void options.markWorkOrderNotificationsReadForOrder?.(card.dataset.id, { render: false });
      });
    });

    doc.querySelectorAll("[data-open-work-notification]").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        button.disabled = true;
        await options.openWorkOrderNotification?.(
          button.dataset.openWorkNotification,
          button.dataset.workOrderId
        );
      });
    });
  }

  window.MaintainOpsWorkspaceWorkOrderNotificationEvents = {
    bindWorkspaceWorkOrderNotificationEvents,
  };

  if (typeof module !== "undefined") {
    module.exports = { bindWorkspaceWorkOrderNotificationEvents };
  }
})();
