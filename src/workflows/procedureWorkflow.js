(function () {
  function createProcedureWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const cssRef = deps.CSSRef || CSS;

    function bindProcedureWorkflowEvents() {
      const procedureForm = documentRef.querySelector("#create-procedure-form");
      if (procedureForm) procedureForm.addEventListener("submit", createProcedureTemplate);

      const sampleProcedureButton = documentRef.querySelector("#seed-sample-procedure");
      if (sampleProcedureButton) sampleProcedureButton.addEventListener("click", seedSampleProcedure);

      documentRef.querySelectorAll("[data-add-step]").forEach((form) => {
        form.addEventListener("submit", createProcedureStep);
      });
    }

    async function createProcedureTemplate(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorElement = documentRef.querySelector("#procedure-error");
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Adding...";
      }

      try {
        const form = new FormDataCtor(formElement);
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().from("procedure_templates").insert({
            company_id: deps.getActiveCompanyId(),
            name: deps.requiredText(form.get("name"), "Procedure checklist name"),
            description: String(form.get("description") || "").trim() || null,
            created_by: deps.getSession().user.id,
          }),
          "Procedure save timed out."
        );
        if (error) throw error;
        deps.showNotice("Procedure checklist added.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not add procedure.";
        else deps.alertUser(error.message || error);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Add Checklist";
        }
      }
    }

    async function seedSampleProcedure() {
      const button = documentRef.querySelector("#seed-sample-procedure");
      const existing = deps.getProcedureTemplates().find((template) => template.name.toLowerCase() === "basic equipment inspection");
      if (existing) {
        deps.showNotice("Sample inspection procedure already exists.", "warning");
        return;
      }
      if (button) {
        button.disabled = true;
        button.textContent = "Adding sample...";
      }

      try {
        const { data: template, error: templateError } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("procedure_templates")
            .insert({
              company_id: deps.getActiveCompanyId(),
              name: "Basic Equipment Inspection",
              description: "A simple starter checklist for visual checks, readings, and final pass/fail.",
              created_by: deps.getSession().user.id,
            })
            .select()
            .single(),
          "Sample procedure save timed out."
        );

        if (templateError) throw templateError;

        const steps = [
          { position: 1, prompt: "Confirm lockout or safe operating condition", response_type: "checkbox", required: true },
          { position: 2, prompt: "Inspect for leaks, loose guards, or visible damage", response_type: "pass_fail", required: true },
          { position: 3, prompt: "Record operating reading", response_type: "number", required: false },
          { position: 4, prompt: "Add technician notes", response_type: "text", required: false },
        ].map((step) => ({
          ...step,
          company_id: deps.getActiveCompanyId(),
          procedure_template_id: template.id,
        }));

        const { error: stepsError } = await deps.withOperationTimeout(
          deps.supabaseClient().from("procedure_steps").insert(steps),
          "Sample procedure steps save timed out."
        );
        if (stepsError) throw stepsError;
        deps.showNotice("Sample procedure checklist added.");
        await deps.render();
      } catch (error) {
        deps.showNotice(`Could not add sample procedure: ${error.message || error}`, "warning");
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = "Add sample inspection checklist";
        }
      }
    }

    async function createProcedureStep(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorElement = documentRef.querySelector(`[data-step-error="${formElement.dataset.addStep}"]`);
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Adding...";
      }

      try {
        const form = new FormDataCtor(formElement);
        const template = deps.getProcedureTemplates().find((item) => item.id === formElement.dataset.addStep);
        const nextPosition = (template?.procedure_steps?.length || 0) + 1;
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().from("procedure_steps").insert({
            company_id: deps.getActiveCompanyId(),
            procedure_template_id: formElement.dataset.addStep,
            position: nextPosition,
            prompt: deps.requiredText(form.get("prompt"), "Procedure checklist step"),
            response_type: form.get("response_type"),
            required: form.get("required") === "true",
          }),
          "Procedure step save timed out."
        );
        if (error) throw error;
        deps.showNotice("Procedure checklist step added.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not add procedure step.";
        else deps.alertUser(error.message || error);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Add Step";
        }
      }
    }

    async function loadProcedureDeleteBlockers(templateId) {
      const [workOrdersCount, schedulesCount] = await Promise.all([
        countProcedureLinkedRows("work_orders", templateId),
        countProcedureLinkedRows("preventive_schedules", templateId),
      ]);
      return {
        workOrders: workOrdersCount,
        schedules: schedulesCount,
      };
    }

    async function countProcedureLinkedRows(tableName, templateId) {
      const { count, error } = await deps.withOperationTimeout(
        deps.supabaseClient()
          .from(tableName)
          .select("id", { count: "exact", head: true })
          .eq("company_id", deps.getActiveCompanyId())
          .eq("procedure_template_id", templateId),
        `Procedure delete check timed out while checking ${tableName}.`,
        15000
      );
      if (error) throw new Error(`Could not verify linked ${tableName.replaceAll("_", " ")} before deleting procedure: ${error.message}`);
      return count || 0;
    }

    async function requestDeleteProcedureTemplate(id) {
      if (!deps.canDeleteOperationalRecords()) {
        deps.alertUser("Only company admins and managers can delete procedures.");
        return;
      }
      if (!deps.getProcedureTemplates().some((template) => template.id === id)) return;
      const errorElement = documentRef.querySelector(`[data-procedure-delete-error="${cssRef.escape(id)}"]`);
      if (errorElement) errorElement.textContent = "";
      try {
        const blockers = await loadProcedureDeleteBlockers(id);
        const message = deps.procedureDeleteBlockerMessage(blockers);
        if (message) {
          if (errorElement) errorElement.textContent = message;
          return;
        }
        deps.setPendingDeleteProcedureId(id);
        deps.renderWorkspace();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not verify procedure links before delete.";
        else deps.showNotice(error.message || "Could not verify procedure links before delete.", "warning");
      }
    }

    async function deleteProcedureTemplate(id) {
      if (!deps.canDeleteOperationalRecords()) {
        deps.alertUser("Only company admins and managers can delete procedures.");
        return;
      }

      const template = deps.getProcedureTemplates().find((item) => item.id === id);
      if (!template) return;
      const button = documentRef.querySelector(`[data-confirm-delete-procedure="${cssRef.escape(id)}"]`);
      const errorElement = documentRef.querySelector(`[data-procedure-delete-error="${cssRef.escape(id)}"]`);
      if (errorElement) errorElement.textContent = "";
      if (button) {
        button.disabled = true;
        button.textContent = "Deleting...";
      }

      try {
        const blockers = await loadProcedureDeleteBlockers(id);
        const blockerMessage = deps.procedureDeleteBlockerMessage(blockers);
        if (blockerMessage) throw new Error(blockerMessage);

        const { data, error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("procedure_templates")
            .delete()
            .eq("id", id)
            .eq("company_id", deps.getActiveCompanyId())
            .select("id"),
          "Procedure checklist delete timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;
        if (!data?.length) {
          throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");
        }

        const verification = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("procedure_templates")
            .select("id")
            .eq("id", id)
            .eq("company_id", deps.getActiveCompanyId())
            .maybeSingle(),
          "Procedure checklist delete verification timed out. Refresh and check the checklist list.",
          15000
        );
        if (verification.error) throw new Error(`Procedure checklist delete verification failed: ${verification.error.message}`);
        if (verification.data) throw new Error("Procedure checklist delete did not persist in Supabase.");

        deps.setPendingDeleteProcedureId(null);
        deps.showNotice("Procedure checklist deleted.");
        await deps.render();
      } catch (error) {
        const message = error.message || "Could not delete procedure.";
        deps.showNotice(message, "warning");
        if (errorElement) errorElement.textContent = message;
        if (button) {
          button.disabled = false;
          button.textContent = "Permanently Delete";
        }
      }
    }

    return {
      bindProcedureWorkflowEvents,
      createProcedureTemplate,
      seedSampleProcedure,
      createProcedureStep,
      loadProcedureDeleteBlockers,
      countProcedureLinkedRows,
      requestDeleteProcedureTemplate,
      deleteProcedureTemplate,
    };
  }

  window.MaintainOpsProcedureWorkflow = {
    createProcedureWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createProcedureWorkflow };
  }
})();
