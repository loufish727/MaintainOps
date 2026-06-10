(function () {
  /*
   * Module contract: owns visible calendar button behavior for native date inputs only.
   * May focus/click date inputs and call showPicker when the browser supports it.
   * Must not submit forms, mutate app state, parse/save dates, touch Supabase/RLS, or render.
   */
  function openDatePicker(input) {
    if (!input) return false;

    if (typeof input.focus === "function") input.focus();

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return true;
      } catch (_error) {
        // Some browsers only allow showPicker from trusted clicks or visible controls.
      }
    }

    if (typeof input.click === "function") {
      input.click();
      return true;
    }

    return false;
  }

  function bindWorkspaceDatePickerControls(options = {}) {
    const doc = options.documentRef || document;

    doc.querySelectorAll("[data-open-date-picker]").forEach((button) => {
      button.addEventListener("click", () => {
        const field = button.closest("[data-date-picker-field]");
        const input = field?.querySelector('input[type="date"]');
        openDatePicker(input);
      });
    });
  }

  window.MaintainOpsWorkspaceDatePickerControls = {
    bindWorkspaceDatePickerControls,
    openDatePicker,
  };

  if (typeof module !== "undefined") {
    module.exports = { bindWorkspaceDatePickerControls, openDatePicker };
  }
})();
