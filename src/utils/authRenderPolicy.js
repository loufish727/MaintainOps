(function () {
  function sessionUserId(session) {
    return session?.user?.id || "";
  }

  function shouldRenderForAuthEvent(eventName, previousSession, nextSession) {
    const event = String(eventName || "");
    if (!sessionUserId(previousSession) && !sessionUserId(nextSession)) {
      return false;
    }
    if (event === "TOKEN_REFRESHED" && sessionUserId(previousSession) && sessionUserId(previousSession) === sessionUserId(nextSession)) {
      return false;
    }
    return true;
  }

  window.MaintainOpsAuthRenderPolicy = {
    shouldRenderForAuthEvent,
  };

  if (typeof module !== "undefined") {
    module.exports = { shouldRenderForAuthEvent };
  }
})();
