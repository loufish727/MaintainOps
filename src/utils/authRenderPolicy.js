(function () {
  function sessionUserId(session) {
    return session?.user?.id || "";
  }

  function shouldRenderForAuthEvent(eventName, previousSession, nextSession) {
    const event = String(eventName || "");
    if (!sessionUserId(previousSession) && !sessionUserId(nextSession)) {
      return false;
    }
    // Supabase also emits SIGNED_IN when a background tab regains focus.
    if (["TOKEN_REFRESHED", "SIGNED_IN", "INITIAL_SESSION"].includes(event) && sessionUserId(previousSession) && sessionUserId(previousSession) === sessionUserId(nextSession)) {
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
