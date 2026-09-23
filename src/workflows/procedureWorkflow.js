(function () {
  function createProcedureWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const cssRef = deps.CSSRef || CSS;
    const pending = new Set();
    const sampleName = "Basic Equipment Inspection";
    const sampleDescription = "A simple starter checklist for visual checks, readings, and final pass/fail.";
    const sampleSteps = [
      { position: 1, prompt: "Confirm lockout or safe operating condition", response_type: "checkbox", required: true },
      { position: 2, prompt: "Inspect for leaks, loose guards, or visible damage", response_type: "pass_fail", required: true },
      { position: 3, prompt: "Record operating reading", response_type: "number", required: false },
      { position: 4, prompt: "Add technician notes", response_type: "text", required: false },
    ];

    function captureScope() {
      const companyId = deps.getActiveCompanyId();
      const userId = deps.getSession()?.user?.id;
      const scope = deps.getScope?.();
      return {
        companyId, userId, client: deps.supabaseClient(),
        isCurrent: () => deps.getActiveCompanyId() === companyId &&
          deps.getSession()?.user?.id === userId && deps.getScope?.() === scope,
      };
    }

    function requireEditor(context) {
      if (!context.companyId || !context.userId || deps.canEditOperationalRecords?.() !== true) {
        throw new Error("You do not have permission to edit procedure checklists.");
      }
    }

    function requireDeleteAccess(context) {
      requireEditor(context);
      if (!deps.canDeleteOperationalRecords()) throw new Error("Only company admins and managers can delete procedures.");
    }

    function restoreButton(button, context, label) {
      if (button && button.isConnected !== false && context.isCurrent()) {
        button.disabled = false;
        button.textContent = label;
      }
    }

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
      const context = captureScope();
      const key = `${context.companyId}:create`;
      if (pending.has(key)) return;
      pending.add(key);
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorElement = documentRef.querySelector("#procedure-error");
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Adding...";
      }

      try {
        requireEditor(context);
        const draft = deps.captureCreateDraft?.(formElement);
        const form = new FormDataCtor(formElement);
        const { error } = await deps.withOperationTimeout(
          context.client.from("procedure_templates").insert({
            company_id: context.companyId,
            name: deps.requiredText(form.get("name"), "Procedure checklist name"),
            description: String(form.get("description") || "").trim() || null,
            created_by: context.userId,
          }),
          "Procedure save timed out."
        );
        if (error) throw error;
        if (draft) deps.clearCreateDraft?.(draft);
        if (!context.isCurrent()) return;
        deps.showNotice("Procedure checklist added.");
        await deps.render();
      } catch (error) {
        if (!context.isCurrent()) return;
        if (errorElement) errorElement.textContent = error.message || "Could not add procedure.";
        else deps.alertUser(error.message || error);
      } finally {
        pending.delete(key);
        restoreButton(submitButton, context, "Add Checklist");
      }
    }

    async function seedSampleProcedure() {
      const context = captureScope();
      const key = `${context.companyId}:sample`;
      if (pending.has(key)) return;
      pending.add(key);
      const button = documentRef.querySelector("#seed-sample-procedure");
      let stepKey = null;
      let retryCompletion = false;
      if (button) {
        button.disabled = true;
        button.textContent = "Adding sample...";
      }

      try {
        requireEditor(context);
        // Read persisted state on every attempt, including retries after an ambiguous timeout.
        const lookup = await deps.withOperationTimeout(
          context.client.from("procedure_templates").select("id, company_id, name, description")
            .eq("company_id", context.companyId).ilike("name", sampleName),
          "Sample procedure lookup timed out."
        );
        if (!context.isCurrent()) return;
        if (lookup.error) throw lookup.error;
        if (!Array.isArray(lookup.data)) throw new Error("Could not verify existing sample checklists.");
        if (lookup.data.length > 1) throw new Error("Multiple sample checklists already exist. No checklists were changed.");
        requireEditor(context);
        let template = lookup.data[0];
        if (!template) {
          const saved = await deps.withOperationTimeout(
            context.client.from("procedure_templates").insert({
              company_id: context.companyId, name: sampleName, description: sampleDescription, created_by: context.userId,
            }).select("id, company_id, name, description").single(),
            "Sample procedure save timed out. Retry to check whether the checklist was saved."
          );
          if (!context.isCurrent()) return;
          if (saved.error) throw saved.error;
          template = saved.data;
        }
        if (!template?.id || template.company_id !== context.companyId) throw new Error("Could not verify the saved sample checklist.");
        const candidateKey = `${context.companyId}:steps:${template.id}`;
        if (pending.has(candidateKey)) throw new Error("Checklist steps are already being saved. Retry when that save finishes.");
        stepKey = candidateKey;
        pending.add(stepKey);
        retryCompletion = true;
        const existing = await deps.withOperationTimeout(
          context.client.from("procedure_steps").select("*").eq("company_id", context.companyId)
            .eq("procedure_template_id", template.id),
          "Sample procedure steps lookup timed out."
        );
        if (!context.isCurrent()) return;
        if (existing.error) throw existing.error;
        if (!Array.isArray(existing.data)) throw new Error("Could not verify saved sample steps.");
        const positions = new Set();
        for (const step of existing.data) {
          const expected = sampleSteps.find((item) => item.position === step.position);
          if (!expected || positions.has(step.position) || step.company_id !== context.companyId ||
              step.procedure_template_id !== template.id || step.prompt !== expected.prompt ||
              step.response_type !== expected.response_type || step.required !== expected.required) {
            retryCompletion = false;
            throw new Error("The existing sample checklist has customized steps. No steps were changed.");
          }
          positions.add(step.position);
        }
        const missing = sampleSteps.filter((step) => !positions.has(step.position));
        if (!missing.length) {
          retryCompletion = false;
          deps.showNotice("Sample inspection procedure already exists.", "warning");
          await deps.render();
          return;
        }
        if (template.description !== sampleDescription) {
          retryCompletion = false;
          throw new Error("The existing sample checklist has been customized. Review its steps manually; no steps were changed.");
        }
        const blockers = await loadProcedureDeleteBlockers(template.id, context);
        if (!context.isCurrent()) return;
        if (blockers.workOrders || blockers.schedules) {
          retryCompletion = false;
          throw new Error("The partial sample checklist is already linked to work or PM schedules. Review its steps manually; no steps were changed.");
        }
        requireEditor(context);
        const steps = missing.map((step) => ({
          ...step,
          company_id: context.companyId,
          procedure_template_id: template.id,
        }));
        const { error: stepsError } = await deps.withOperationTimeout(
          context.client.from("procedure_steps").insert(steps),
          "Sample procedure steps save timed out."
        );
        if (stepsError) throw stepsError;
        retryCompletion = false;
        if (!context.isCurrent()) return;
        deps.showNotice("Sample procedure checklist added.");
        await deps.render();
      } catch (error) {
        if (context.isCurrent()) deps.showNotice(retryCompletion
          ? `Sample checklist retained, but completion failed: ${error.message || error} Retry to finish missing steps.`
          : `Could not add sample procedure: ${error.message || error}`, "warning");
      } finally {
        pending.delete(key);
        if (stepKey) pending.delete(stepKey);
        restoreButton(button, context, retryCompletion ? "Retry sample checklist completion" : "Add sample inspection checklist");
      }
    }

    async function createProcedureStep(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const context = captureScope();
      const templateId = formElement.dataset.addStep;
      const key = `${context.companyId}:steps:${templateId}`;
      if (pending.has(key)) return;
      pending.add(key);
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorElement = documentRef.querySelector(`[data-step-error="${cssRef.escape(templateId)}"]`);
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Adding...";
      }

      try {
        requireEditor(context);
        const template = deps.getProcedureTemplates().find((item) => item.id === templateId && item.company_id === context.companyId);
        if (!template || !Array.isArray(template.procedure_steps)) throw new Error("Procedure checklist is unavailable. Refresh before adding a step.");
        const positions = template.procedure_steps.map((step) => Number(step.position));
        if (positions.some((position) => !Number.isSafeInteger(position) || position < 1)) throw new Error("Procedure step positions could not be verified.");
        const nextPosition = Math.max(0, ...positions) + 1;
        if (!Number.isSafeInteger(nextPosition)) throw new Error("Procedure step position is out of range.");
        const draft = deps.captureCreateDraft?.(formElement);
        const form = new FormDataCtor(formElement);
        const { error } = await deps.withOperationTimeout(
          context.client.from("procedure_steps").insert({
            company_id: context.companyId,
            procedure_template_id: templateId,
            position: nextPosition,
            prompt: deps.requiredText(form.get("prompt"), "Procedure checklist step"),
            response_type: form.get("response_type"),
            required: form.get("required") === "true",
          }),
          "Procedure step save timed out."
        );
        if (error) throw error;
        if (draft) deps.clearCreateDraft?.(draft);
        if (!context.isCurrent()) return;
        deps.showNotice("Procedure checklist step added.");
        await deps.render();
      } catch (error) {
        if (!context.isCurrent()) return;
        if (errorElement) errorElement.textContent = error.message || "Could not add procedure step.";
        else deps.alertUser(error.message || error);
      } finally {
        pending.delete(key);
        restoreButton(submitButton, context, "Add Step");
      }
    }

    async function loadProcedureDeleteBlockers(templateId, context = captureScope()) {
      const { data, error } = await deps.withOperationTimeout(
        context.client.rpc("get_procedure_link_counts", {
          p_company_id: context.companyId, p_template_ids: [templateId],
        }),
        "Procedure delete check timed out.",
        15000
      );
      if (error) throw new Error(`Could not verify procedure links: ${error.message}`);
      if (!Array.isArray(data) || data.length !== 1 || data[0]?.procedure_template_id !== templateId) {
        throw new Error("Could not verify procedure links. No checklist was deleted.");
      }
      function verifiedCount(value) {
        if ((typeof value !== "number" && !(typeof value === "string" && /^\d+$/.test(value))) ||
            !Number.isSafeInteger(Number(value)) || Number(value) < 0) {
          throw new Error("Could not verify procedure link counts. No checklist was deleted.");
        }
        return Number(value);
      }
      return { workOrders: verifiedCount(data[0].work_order_count), schedules: verifiedCount(data[0].schedule_count) };
    }

    async function countProcedureLinkedRows(tableName, templateId) {
      if (!["work_orders", "preventive_schedules"].includes(tableName)) throw new Error("Unsupported procedure relationship.");
      const blockers = await loadProcedureDeleteBlockers(templateId);
      return tableName === "work_orders" ? blockers.workOrders : blockers.schedules;
    }

    async function requestDeleteProcedureTemplate(id) {
      const context = captureScope();
      const key = `${context.companyId}:delete:${id}`;
      if (pending.has(key)) return;
      if (!deps.getProcedureTemplates().some((template) => template.id === id && template.company_id === context.companyId)) return;
      pending.add(key);
      const errorElement = documentRef.querySelector(`[data-procedure-delete-error="${cssRef.escape(id)}"]`);
      if (errorElement) errorElement.textContent = "";
      try {
        requireDeleteAccess(context);
        const blockers = await loadProcedureDeleteBlockers(id, context);
        if (!context.isCurrent()) return;
        requireDeleteAccess(context);
        const message = deps.procedureDeleteBlockerMessage(blockers);
        if (message) {
          if (errorElement) errorElement.textContent = message;
          return;
        }
        deps.setPendingDeleteProcedureId(id);
        deps.renderWorkspace();
      } catch (error) {
        if (!context.isCurrent()) return;
        if (errorElement) errorElement.textContent = error.message || "Could not verify procedure links before delete.";
        else deps.showNotice(error.message || "Could not verify procedure links before delete.", "warning");
      } finally {
        pending.delete(key);
      }
    }

    async function deleteProcedureTemplate(id) {
      const context = captureScope();
      const key = `${context.companyId}:delete:${id}`;
      if (pending.has(key)) return;
      const template = deps.getProcedureTemplates().find((item) => item.id === id && item.company_id === context.companyId);
      if (!template) return;
      pending.add(key);
      const button = documentRef.querySelector(`[data-confirm-delete-procedure="${cssRef.escape(id)}"]`);
      const errorElement = documentRef.querySelector(`[data-procedure-delete-error="${cssRef.escape(id)}"]`);
      if (errorElement) errorElement.textContent = "";
      if (button) {
        button.disabled = true;
        button.textContent = "Deleting...";
      }

      try {
        requireDeleteAccess(context);
        const blockers = await loadProcedureDeleteBlockers(id, context);
        if (!context.isCurrent()) return;
        requireDeleteAccess(context);
        const blockerMessage = deps.procedureDeleteBlockerMessage(blockers);
        if (blockerMessage) throw new Error(blockerMessage);

        const { data, error } = await deps.withOperationTimeout(
          context.client
            .from("procedure_templates")
            .delete()
            .eq("id", id)
            .eq("company_id", context.companyId)
            .select("id"),
          "Procedure checklist delete timed out. Check your connection and try again.",
          15000
        );
        if (!context.isCurrent()) return;
        if (error) throw error;
        if (!Array.isArray(data) || !data.some((row) => row.id === id)) {
          throw new Error("Procedure checklist was not deleted. Refresh and check your access before retrying.");
        }

        const verification = await deps.withOperationTimeout(
          context.client
            .from("procedure_templates")
            .select("id")
            .eq("id", id)
            .eq("company_id", context.companyId)
            .maybeSingle(),
          "Procedure checklist delete verification timed out. Refresh and check the checklist list.",
          15000
        );
        if (!context.isCurrent()) return;
        if (verification.error) throw new Error(`Procedure checklist delete verification failed: ${verification.error.message}`);
        if (verification.data) throw new Error("Procedure checklist delete did not persist in Supabase.");

        deps.setPendingDeleteProcedureId(null);
        deps.showNotice("Procedure checklist deleted.");
        await deps.render();
      } catch (error) {
        if (!context.isCurrent()) return;
        const message = error.message || "Could not delete procedure.";
        deps.showNotice(message, "warning");
        if (errorElement) errorElement.textContent = message;
      } finally {
        pending.delete(key);
        restoreButton(button, context, "Permanently Delete");
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
