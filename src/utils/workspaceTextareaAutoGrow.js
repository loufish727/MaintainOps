(function () {
  /*
   * Module contract: owns textarea auto-grow UI behavior only.
   * May update textarea inline height on initial bind and input.
   * Must not submit forms, mutate app state, touch Supabase/RLS, or render.
   */
  function autoGrowTextarea(field) {
    if (!field || !field.style) return;
    field.style.height = "auto";
    field.style.height = `${field.scrollHeight}px`;
  }

  function bindWorkspaceTextareaAutoGrow(options = {}) {
    const doc = options.documentRef || document;

    doc.querySelectorAll("textarea").forEach((field) => {
      autoGrowTextarea(field);
      field.addEventListener("input", () => autoGrowTextarea(field));
    });
  }

  window.MaintainOpsWorkspaceTextareaAutoGrow = {
    autoGrowTextarea,
    bindWorkspaceTextareaAutoGrow,
  };
})();
