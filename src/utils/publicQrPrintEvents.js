(function () {
  /*
   * LFES contract: owns public QR print-button binding only.
   * May invoke the injected print callback. Must not submit public requests,
   * change auth/session state, touch Supabase/RLS, or own QR/request data.
   */
  function bindPublicQrPrintEvents(options = {}) {
    const doc = options.documentRef || document;
    const printRef = options.printRef || (() => window.print());
    const button = doc.querySelector("#print-public-qr");

    if (!button || typeof printRef !== "function") return;

    button.addEventListener("click", () => printRef());
  }

  window.MaintainOpsPublicQrPrintEvents = {
    bindPublicQrPrintEvents,
  };
})();
