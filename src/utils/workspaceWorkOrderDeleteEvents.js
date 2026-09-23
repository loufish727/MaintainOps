(function () {
  /*
   * Module contract: owns Work Order Detail delete request/cancel/confirm event handling.
   * Requires app.js-injected permission, storage cleanup, row delete, state setters, notices, render, and timeout wrapper.
   * May set/clear the pending work-order delete id, remove captured storage paths after confirmed deletion,
   * call the injected work-order delete callback, clear active detail state, show delete notices, and render.
   * Must not import Supabase, own auth/company/location state, delete other record types, alter cascade/RLS/storage
   * policies, or touch broad renderWorkspace/bindWorkspaceEvents behavior.
   */
  function createWorkspaceWorkOrderDeleteEvents(options = {}) {
    const doc = options.documentRef || document;
    const pending = new Set();

    function requestDeleteWorkOrder(id) {
      if (!options.canDeleteWorkOrders()) {
        options.alertRef("Only company admins can delete work orders.");
        return;
      }

      options.setPendingDeleteWorkOrderId(id);
      options.renderWorkspace();
    }

    async function deleteWorkOrder(id) {
      if (pending.has(id)) return;
      if (!options.canDeleteWorkOrders()) {
        options.alertRef("Only company admins can delete work orders.");
        return;
      }

      pending.add(id);
      try {
        const cleanupDocuments = options.removeWorkOrderDocuments ? await options.removeWorkOrderDocuments(id) : null;
        const photoPaths = options.getPhotoPathsByWorkOrder(id);
        const { error, data } = await options.withOperationTimeout(
          options.deleteWorkOrderRecord(id),
          "Work order delete timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          options.alertRef(`Could not delete work order: ${options.friendlyWorkOrderSaveError(error)}`);
          return;
        }
        if (!Array.isArray(data) || !data.some(row => row.id === id)) {
          options.alertRef("Work order deletion was not confirmed. No attached files were removed.");
          return;
        }

        let cleanupFailed = false;
        try {
          if (cleanupDocuments) await cleanupDocuments();
          if (photoPaths.length) {
            const result = await options.withOperationTimeout(options.removeWorkOrderPhotoStorage(photoPaths), "Work order photo cleanup timed out.", 15000);
            if (result.error) throw result.error;
          }
        } catch (error) {
          cleanupFailed = true;
          options.warnRef("Deleted work order storage cleanup failed", error);
        }

        options.setActiveWorkOrderId(null);
        options.setActiveAssetId(null);
        options.setPendingDeleteWorkOrderId(null);
        options.showNotice(cleanupFailed ? "Work order deleted, but some stored files could not be removed. Report this for storage cleanup." : "Work order deleted.", cleanupFailed ? "warning" : "success");
        await options.render();
      } catch (error) {
        options.alertRef(`Could not delete work order: ${error.message || error}`);
      } finally {
        pending.delete(id);
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
