(function () {
  function withOperationTimeout(promise, message, timeoutMs = 20000) {
    let timeoutId;
    const timeout = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
  }

  window.MaintainOpsOperationTimeout = {
    withOperationTimeout,
  };
})();
