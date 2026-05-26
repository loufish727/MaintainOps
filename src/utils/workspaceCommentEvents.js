(function () {
  /*
   * LFES contract: owns Work Order comment form submit binding only.
   * Requires an app.js-owned submit callback.
   * Must not create comments, record activity, reload comments, render, touch Supabase/RLS, or own work-order data.
   */
  function bindWorkspaceCommentEvents(options = {}) {
    const doc = options.documentRef || document;
    const createComment = options.createComment;
    const form = doc.querySelector("#comment-form");

    if (!form || typeof createComment !== "function") return;

    form.addEventListener("submit", createComment);
  }

  window.MaintainOpsWorkspaceCommentEvents = {
    bindWorkspaceCommentEvents,
  };
})();
