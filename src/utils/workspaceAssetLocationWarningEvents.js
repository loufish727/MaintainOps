(function () {
  /*
   * LFES contract: binds equipment/location warning UI updates only.
   * Requires app.js-owned warning calculation/updater callback.
   * May run the callback on initial bind and on select changes.
   * Must not mutate business records, submit forms, delete, upload, render,
   * route auth/startup, touch Supabase/RLS, or own asset/location state.
   */
  function bindWorkspaceAssetLocationWarningEvents(options = {}) {
    const doc = options.documentRef || document;
    const updateAssetLocationWarning = options.updateAssetLocationWarning;

    if (typeof updateAssetLocationWarning !== "function") return;

    doc.querySelectorAll("[data-location-sensitive-asset]").forEach((select) => {
      updateAssetLocationWarning(select);
      select.addEventListener("change", () => updateAssetLocationWarning(select));
    });
  }

  window.MaintainOpsWorkspaceAssetLocationWarningEvents = {
    bindWorkspaceAssetLocationWarningEvents,
  };
})();
