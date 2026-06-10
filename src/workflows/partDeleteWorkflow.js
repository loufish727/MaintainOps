(function () {
  /*
   * Module contract: owns part delete request/confirm workflow only.
   * May validate role/link blockers, remove injected part document storage paths,
   * delete and verify the injected part record, update local delete UI, and call injected render/notice callbacks.
   * Must not create/edit parts, upload files, own app state, touch auth/session startup, SQL, or RLS.
   */
  function createPartDeleteWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const cssRef = deps.CSSRef || CSS;
    const alertUser = deps.alertUser || alert;

    function blockerMessage(id) {
      if (deps.partUsageRows(id).length) return "This part has work order usage history and is kept for traceability.";
      if (deps.assetPartRows(id).length) return "This part is linked to equipment and is kept for traceability.";
      return "";
    }

    function requestDeletePart(id) {
      if (!deps.canDeleteParts()) {
        alertUser("Only company admins and managers can delete parts.");
        return;
      }

      const part = deps.getParts().find((item) => item.id === id);
      if (!part) return;

      const blocker = blockerMessage(id);
      if (blocker) {
        alertUser(blocker);
        return;
      }

      const confirmButtonVisible = Boolean(documentRef.querySelector(`[data-delete-part="${cssRef.escape(id)}"].permanent-delete-button`));
      if (deps.getPendingDeletePartId() === id || confirmButtonVisible) {
        deletePart(id);
        return;
      }

      deps.setPendingDeletePartId(id);
      deps.renderWorkspace();
    }

    async function deletePart(id) {
      if (!deps.canDeleteParts()) {
        alertUser("Only company admins and managers can delete parts.");
        return;
      }

      const part = deps.getParts().find((item) => item.id === id);
      const errorElement = documentRef.querySelector("#part-delete-error");
      if (errorElement) errorElement.textContent = "";
      if (!part) return;

      const blocker = blockerMessage(id);
      if (blocker) {
        if (errorElement) errorElement.textContent = blocker;
        return;
      }

      const confirmButton = documentRef.querySelector(`[data-delete-part="${cssRef.escape(id)}"].permanent-delete-button`);
      if (confirmButton) {
        confirmButton.disabled = true;
        confirmButton.textContent = "Deleting...";
      }

      try {
        const documentPaths = (deps.getPartDocumentsByPartId()[id] || [])
          .map((document) => document.storage_path)
          .filter(Boolean);
        if (documentPaths.length) {
          const storageDelete = await deps.withOperationTimeout(
            deps.removePartDocumentStorage(documentPaths),
            "Part document cleanup timed out. Try deleting again.",
            15000
          );
          if (storageDelete.error) {
            throw new Error(`Could not remove filed receipts/invoices: ${storageDelete.error.message}`);
          }
        }

        const { data, error } = await deps.withOperationTimeout(
          deps.deletePartRecord(id),
          "Part delete timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          throw new Error(error.message.includes("violates foreign key constraint")
            ? "This part is linked to work or equipment and cannot be deleted."
            : error.message);
        }

        if (!data?.length) {
          throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");
        }

        const verification = await deps.withOperationTimeout(
          deps.verifyPartDeleted(id),
          "Part delete verification timed out. Refresh and check the part list.",
          15000
        );

        if (verification.error) {
          throw new Error(`Part delete verification failed: ${verification.error.message}`);
        }

        if (verification.data) {
          throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");
        }

        deps.setActivePartId(null);
        deps.setPendingDeletePartId(null);
        deps.showNotice("Part deleted.");
        await deps.render();
      } catch (error) {
        deps.showNotice(error.message || "Could not delete part.", "warning");
        if (errorElement) {
          errorElement.textContent = error.message || "Could not delete part.";
        }
        if (confirmButton) {
          confirmButton.disabled = false;
          confirmButton.textContent = "Permanently Delete";
        }
      }
    }

    return {
      deletePart,
      requestDeletePart,
    };
  }

  window.MaintainOpsPartDeleteWorkflow = {
    createPartDeleteWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createPartDeleteWorkflow };
  }
})();
