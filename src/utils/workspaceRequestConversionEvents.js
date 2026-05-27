(function () {
  /*
   * Module contract: owns request conversion button event binding only.
   * Requires an app.js-owned convert callback.
   * Must not create work orders, update requests, touch Supabase/RLS, or own request data.
   */
  function bindWorkspaceRequestConversionEvents(options = {}) {
    const doc = options.documentRef || document;
    const convertRequestToWorkOrder = options.convertRequestToWorkOrder;

    if (typeof convertRequestToWorkOrder !== "function") return;

    doc.querySelectorAll("[data-convert-request]").forEach((button) => {
      button.addEventListener("click", () => {
        convertRequestToWorkOrder(button.dataset.convertRequest);
      });
    });
  }

  window.MaintainOpsWorkspaceRequestConversionEvents = {
    bindWorkspaceRequestConversionEvents,
  };
})();
