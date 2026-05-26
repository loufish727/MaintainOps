(function () {
  /*
   * LFES contract: owns Work Order Detail delete request/cancel/confirm event handling.
   * Requires app.js-injected permission, storage cleanup, row delete, state setters, notices, render, and timeout wrapper.
   * May set/clear the pending work-order delete id, remove injected photo storage paths before deletion,
   * call the injected work-order delete callback, clear active detail state, show delete notices, and render.
   * Must not import Supabase, own auth/company/location state, delete other record types, alter cascade/RLS/storage
   * policies, or touch broad renderWorkspace/bindWorkspaceEvents behavior.
   */
  function createWorkspaceWorkOrderDeleteEvents(options = {}) {
    const doc = options.documentRef || document;

    function requestDeleteWorkOrder(id) {
      if (!options.canDeleteWorkOrders()) {
        options.alertRef("Only company admins can delete work orders.");
        return;
      }

      options.setPendingDeleteWorkOrderId(id);
      options.renderWorkspace();
    }

    async function deleteWorkOrder(id) {
      if (!options.canDeleteWorkOrders()) {
        options.alertRef("Only company admins can delete work orders.");
        return;
      }

      try {
        const photoPaths = options.getPhotoPathsByWorkOrder(id);
        if (photoPaths.length) {
          const storageDelete = await options.withOperationTimeout(
            options.removeWorkOrderPhotoStorage(photoPaths),
            "Work order photo cleanup timed out.",
            15000
          );
          if (storageDelete.error) {
            options.warnRef("Work order photo storage cleanup failed", storageDelete.error);
          }
        }

        const { error } = await options.withOperationTimeout(
          options.deleteWorkOrderRecord(id),
          "Work order delete timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          options.alertRef(`Could not delete work order: ${options.friendlyWorkOrderSaveError(error)}`);
          return;
        }

        options.setActiveWorkOrderId(null);
        options.setActiveAssetId(null);
        options.setPendingDeleteWorkOrderId(null);
        options.showNotice("Work order deleted.");
        await options.render();
      } catch (error) {
        options.alertRef(`Could not delete work order: ${error.message || error}`);
      }
    }

    function bindWorkspaceWorkOrderDeleteEvents() {
      doc.querySelectorAll("[data-delete-work-order]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          requestDeleteWorkOrder(button.dataset.deleteWorkOrder);
        });
      });

      doc.querySelectorAll("[data-cancel-delete-work-order]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          options.setPendingDeleteWorkOrderId(null);
          options.renderWorkspace();
        });
      });

      doc.querySelectorAll("[data-confirm-delete-work-order]").forEach((button) => {
        button.addEventListener("click", async (event) => {
          event.stopPropagation();
          await deleteWorkOrder(button.dataset.confirmDeleteWorkOrder);
        });
      });
    }

    return {
      bindWorkspaceWorkOrderDeleteEvents,
      deleteWorkOrder,
      requestDeleteWorkOrder,
    };
  }

  window.MaintainOpsWorkspaceWorkOrderDeleteEvents = {
    createWorkspaceWorkOrderDeleteEvents,
  };
})();
