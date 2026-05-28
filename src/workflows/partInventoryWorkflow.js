(function () {
  function createPartInventoryWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;

    function bindPartInventoryWorkflowEvents() {
      const partForm = documentRef.querySelector("#create-part-form");
      if (partForm) partForm.addEventListener("submit", createPart);

      documentRef.querySelectorAll("[data-restock-part]").forEach((form) => {
        form.addEventListener("submit", restockPart);
      });

      documentRef.querySelectorAll("[data-use-part]").forEach((form) => {
        form.addEventListener("submit", usePartFromInventory);
      });

      documentRef.querySelectorAll("[data-edit-part]").forEach((form) => {
        form.addEventListener("submit", updatePart);
      });

      documentRef.querySelectorAll("[data-rename-part-source]").forEach((form) => {
        form.addEventListener("submit", renamePartSource);
      });
    }

    async function createPart(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#part-create-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Adding...";
      }
      let saveTimeoutId;

      try {
        const payload = {
          company_id: deps.getActiveCompanyId(),
          location_id: deps.activeLocationDatabaseId(),
          name: String(form.get("name") || "").trim(),
          sku: String(form.get("sku") || "").trim() || null,
          supplier_name: String(form.get("supplier_name") || "").trim() || null,
          quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
          reorder_point: Number(form.get("reorder_point")) || 0,
          unit_cost: Number(form.get("unit_cost")) || 0,
        };

        if (!payload.company_id) throw new Error("Choose a company before adding parts.");
        if (!payload.name) throw new Error("Part name is required.");

        const saveTimeout = new Promise((_, reject) => {
          saveTimeoutId = setTimeout(() => reject(new Error("Part save timed out. Check your connection and try again.")), 20000);
        });
        const { data, error } = await Promise.race([
          deps.supabaseClient().from("parts").insert(payload).select("id").single(),
          saveTimeout,
        ]);
        clearTimeout(saveTimeoutId);

        if (error && deps.isMissingColumnError(error, "location_id")) {
          deps.setLocationsReady(false);
          throw new Error(deps.databaseSetupRequiredMessage("saving parts by location"));
        }
        if (error && deps.isMissingColumnError(error, "supplier_name")) {
          deps.setPartSuppliersReady(false);
          throw new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");
        }
        if (error && deps.isMissingColumnError(error, "unit_cost")) {
          deps.setPartCostsReady(false);
          throw new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");
        }
        if (error) throw error;

        deps.setActivePartId(data?.id || null);
        deps.clearPartSearchState();
        deps.showNotice("Part added.");
        formElement.reset();
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not add part.";
      } finally {
        if (saveTimeoutId) clearTimeout(saveTimeoutId);
        if (submitButton && submitButton.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Add Part";
        }
      }
    }

    async function restockPart(event) {
      event.preventDefault();
      const formElement = event.target;
      const submitButton = formElement.querySelector("button[type='submit']");
      const part = deps.getParts().find((item) => item.id === formElement.dataset.restockPart);
      const quantity = Number(new FormDataCtor(formElement).get("quantity")) || 0;
      if (!part || quantity <= 0) return;
      const originalText = submitButton?.textContent || "Restock";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }

      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("parts")
            .update({ quantity_on_hand: (Number(part.quantity_on_hand) || 0) + quantity })
            .eq("id", part.id)
            .eq("company_id", deps.getActiveCompanyId()),
          "Part restock timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;
        deps.showNotice("Part restocked.");
        await deps.render();
      } catch (error) {
        deps.showNotice(`Could not restock part: ${error.message || error}`, "warning");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    }

    async function usePartFromInventory(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const submitButton = formElement.querySelector("button[type='submit']");
      const part = deps.getParts().find((item) => item.id === formElement.dataset.usePart);
      const quantity = Number(new FormDataCtor(formElement).get("quantity")) || 0;
      if (!part || quantity <= 0) return;
      const originalText = submitButton?.textContent || "Use";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }

      try {
        const currentQuantity = Number(part.quantity_on_hand) || 0;
        const nextQuantity = Math.max(0, currentQuantity - quantity);
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("parts")
            .update({ quantity_on_hand: nextQuantity })
            .eq("id", part.id)
            .eq("company_id", deps.getActiveCompanyId()),
          "Part use save timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;
        deps.showNotice("Part used.");
        await deps.render();
      } catch (error) {
        deps.showNotice(`Could not use part: ${error.message || error}`, "warning");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    }

    async function updatePart(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const partId = formElement.dataset.editPart;
      const errorElement = documentRef.querySelector(`[data-part-edit-error="${partId}"]`);
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      if (errorElement) errorElement.textContent = "";
      const originalText = submitButton?.textContent || "Save Part";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }

      const payload = {
        name: String(form.get("name") || "").trim(),
        sku: form.get("sku") || null,
        supplier_name: form.get("supplier_name") || null,
        quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
        reorder_point: Number(form.get("reorder_point")) || 0,
        unit_cost: Number(form.get("unit_cost")) || 0,
      };

      try {
        if (!payload.name) throw new Error("Part name is required.");

        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("parts")
            .update(payload)
            .eq("id", partId)
            .eq("company_id", deps.getActiveCompanyId()),
          "Part save timed out. Check your connection and try again.",
          15000
        );

        if (error && deps.isMissingColumnError(error, "supplier_name")) {
          deps.setPartSuppliersReady(false);
          throw new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");
        }

        if (error && deps.isMissingColumnError(error, "unit_cost")) {
          deps.setPartCostsReady(false);
          throw new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");
        }

        if (error) throw error;

        deps.setActivePartId(null);
        deps.clearPartSearchState();
        deps.showNotice("Part saved.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not save part.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    }

    async function renamePartSource(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#part-source-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      const oldSource = String(form.get("old_source") || "").trim();
      const newSource = String(form.get("new_source") || "").trim();

      if (errorElement) errorElement.textContent = "";
      if (!oldSource) return;
      if (!deps.getPartSuppliersReady()) {
        if (errorElement) errorElement.textContent = "Run supabase/step-next-part-suppliers.sql before editing sources.";
        return;
      }
      if (oldSource === newSource) {
        if (errorElement) errorElement.textContent = "Change the source name before saving.";
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Renaming...";
      }

      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("parts")
            .update({ supplier_name: newSource || null })
            .eq("company_id", deps.getActiveCompanyId())
            .eq("supplier_name", oldSource),
          "Part source rename timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          if (deps.isMissingColumnError(error, "supplier_name")) deps.setPartSuppliersReady(false);
          throw new Error(deps.getPartSuppliersReady()
            ? error.message
            : "Run supabase/step-next-part-suppliers.sql before editing sources.");
        }

        deps.showNotice("Part source updated.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not update part source.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Rename";
        }
      }
    }

    return {
      bindPartInventoryWorkflowEvents,
      createPart,
      restockPart,
      usePartFromInventory,
      updatePart,
      renamePartSource,
    };
  }

  window.MaintainOpsPartInventoryWorkflow = {
    createPartInventoryWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createPartInventoryWorkflow };
  }
})();
