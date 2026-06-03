(function () {
  async function notifyRequestEmailer(supabaseClient, requestId) {
    if (!supabaseClient?.functions?.invoke || !requestId) {
      return { data: null, error: null, skipped: true };
    }

    try {
      const { data, error } = await supabaseClient.functions.invoke("request-emailer", {
        body: { request_id: requestId },
      });
      return { data, error: error || null, skipped: false };
    } catch (error) {
      return { data: null, error, skipped: false };
    }
  }

  window.MaintainOpsRequestEmailNotificationService = {
    notifyRequestEmailer,
  };

  if (typeof module !== "undefined") {
    module.exports = { notifyRequestEmailer };
  }
})();
