(function () {
  /*
   * Module contract: binds quick work-order status buttons only.
   * Requires injected setWorkOrderStatus and showNotice callbacks from app.js.
   * May disable/update the clicked button while the injected mutation runs.
   * Must not own status mutation logic, assign work, delete work, copy downtime text,
   * change selectors, route auth/startup, touch Supabase/RLS directly, or take ownership of app.js state.
   */
  function bindWorkspaceWorkOrderStatusEvents(options = {}) {
    const doc = options.documentRef || document;

    doc.querySelectorAll("[data-quick-status]").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.stopPropagation();
        const scope = options.getScope?.();
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = "Saving...";
        try {
          if (button.dataset.quickStatus === "completed") {
            await options.prepareCompletion?.(button.dataset.id);
            if (options.getScope?.() !== scope) return;
          }
          const saved = await options.setWorkOrderStatus(button.dataset.id, button.dataset.quickStatus);
          if (!saved && button.dataset.quickStatus === "completed") {
            const panel = doc.querySelector("#work-order-complete-target");
            if (panel?.dataset.workOrderId === button.dataset.id) {
              panel.open = true;
              panel.querySelector("summary")?.focus({ preventScroll: true });
              panel.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        } catch (error) {
          options.showNotice(`Could not update status: ${error.message || error}`, "warning");
        } finally {
          if (button.isConnected) {
            button.disabled = false;
            button.textContent = originalText;
          }
        }
      });
    });
  }

  window.MaintainOpsWorkspaceWorkOrderStatusEvents = {
    bindWorkspaceWorkOrderStatusEvents,
  };
})();
