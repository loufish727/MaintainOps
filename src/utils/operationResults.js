(function () {
  function withSetupError(response, message) {
    return {
      ...response,
      error: {
        ...(response.error || {}),
        message,
        originalMessage: response.error?.message || "",
      },
    };
  }

  window.MaintainOpsOperationResults = {
    withSetupError,
  };
})();
