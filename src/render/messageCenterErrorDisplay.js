(function () {
  function createMessageCenterErrorDisplayHelpers(deps) {
    function messageCenterErrorState(error) {
      if (deps.isMissingColumnError(error, "work_order_id")) {
        return {
          message: "Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",
          messagesReady: null,
        };
      }
      if (deps.isColumnSchemaError(error, ["message_threads", "message_thread_members", "messages"]) || String(error?.message || "").includes("message_threads")) {
        return {
          message: "Run supabase/step-next-message-center.sql before using Messages.",
          messagesReady: false,
        };
      }
      return {
        message: error?.message || String(error),
        messagesReady: null,
      };
    }

    return {
      messageCenterErrorState,
    };
  }

  window.MaintainOpsMessageCenterErrorDisplay = {
    createMessageCenterErrorDisplayHelpers,
  };
})();
