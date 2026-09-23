(function () {
  function createPreventiveMaintenanceWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const cssRef = deps.CSSRef || CSS;
    const pendingGenerations = new Map();
    const pendingWrites = new Set();

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
        throw new Error("You do not have permission to edit PM schedules.");
      }
    }

    function requireDeleteAccess(context) {
      requireEditor(context);
      if (!deps.canDeleteOperationalRecords()) throw new Error("Only company admins and managers can delete PM schedules.");
    }

    function restoreButton(button, context, label) {
      if (button && button.isConnected !== false && context.isCurrent()) {
        button.disabled = false;
        button.textContent = label;
      }
    }

    function bindPreventiveMaintenanceWorkflowEvents() {
      const forms = Array.from(documentRef.querySelectorAll?.("[data-create-pm-form]") || []);
      const legacyForm = documentRef.querySelector("#create-pm-form");
      if (legacyForm && !forms.includes(legacyForm)) forms.push(legacyForm);
      forms.forEach((pmForm) => pmForm.addEventListener("submit", createPreventiveSchedule));
    }

    async function createPreventiveSchedule(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const context = captureScope();
      const key = `${context.companyId}:create`;
      if (pendingWrites.has(key)) return;
      pendingWrites.add(key);
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorElement = formElement.querySelector("[data-pm-error]") || documentRef.querySelector("#pm-error");
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Adding...";
      }

      try {
        requireEditor(context);
        const draft = deps.captureCreateDraft?.(formElement);
        const form = new FormDataCtor(formElement);
        deps.nextDueDate(String(form.get("next_due_at") || ""), String(form.get("frequency") || ""));
        if (!deps.confirmAssetLocationRouting(form.get("asset_id") || null, "this PM schedule", errorElement)) return;
        const { error } = await deps.withOperationTimeout(
          deps.insertWithOptionalProcedure("preventive_schedules", {
            company_id: context.companyId,
            location_id: deps.locationIdForAsset(form.get("asset_id")),
            asset_id: form.get("asset_id"),
            title: deps.requiredText(form.get("title"), "PM title"),
            frequency: form.get("frequency"),
            next_due_at: form.get("next_due_at"),
            ...deps.procedureColumn(form.get("procedure_template_id")),
            active: true,
            created_by: context.userId,
          }),
          "PM schedule save timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;
        if (draft) deps.clearCreateDraft?.(draft);
        if (!context.isCurrent()) return;
        deps.showNotice("PM schedule added.");
        await deps.render();
      } catch (error) {
        if (!context.isCurrent()) return;
        if (errorElement) errorElement.textContent = error.message || "Could not add PM schedule.";
        else deps.alertUser(error.message || error);
      } finally {
        pendingWrites.delete(key);
        restoreButton(submitButton, context, "Add Schedule");
      }
    }

    function requestDeletePreventiveSchedule(id) {
      const context = captureScope();
      try {
        requireDeleteAccess(context);
        if (pendingWrites.has(`${context.companyId}:delete:${id}`)) return;
        if (!deps.getPreventiveSchedules().some((schedule) => schedule.id === id && schedule.company_id === context.companyId)) return;
        deps.setPendingDeleteScheduleId(id);
        deps.renderWorkspace();
      } catch (error) {
        deps.alertUser(error.message);
      }
    }

    async function deletePreventiveSchedule(id) {
      const context = captureScope();
      const key = `${context.companyId}:delete:${id}`;
      if (pendingWrites.has(key)) return;
      const schedule = deps.getPreventiveSchedules().find((item) => item.id === id && item.company_id === context.companyId);
      if (!schedule) return;
      pendingWrites.add(key);
      const button = documentRef.querySelector(`[data-confirm-delete-schedule="${cssRef.escape(id)}"]`);
      if (button) {
        button.disabled = true;
        button.textContent = "Deleting...";
      }

      try {
        requireDeleteAccess(context);
        const { data, error } = await deps.withOperationTimeout(
          context.client
            .from("preventive_schedules")
            .delete()
            .eq("id", id)
            .eq("company_id", context.companyId)
            .select("id"),
          "PM schedule delete timed out. Check your connection and try again.",
          15000
        );
        if (!context.isCurrent()) return;
        if (error) throw error;
        if (!Array.isArray(data) || !data.some((row) => row.id === id)) {
          throw new Error("PM schedule was not deleted. Refresh and check your access before retrying.");
        }

        const verification = await deps.withOperationTimeout(
          context.client
            .from("preventive_schedules")
            .select("id")
            .eq("id", id)
            .eq("company_id", context.companyId)
            .maybeSingle(),
          "PM schedule delete verification timed out. Refresh and check the PM list.",
          15000
        );
        if (!context.isCurrent()) return;
        if (verification.error) throw new Error(`PM schedule delete verification failed: ${verification.error.message}`);
        if (verification.data) throw new Error("PM schedule delete did not persist in Supabase.");

        deps.setPendingDeleteScheduleId(null);
        deps.showNotice("PM schedule deleted.");
        await deps.render();
      } catch (error) {
        if (!context.isCurrent()) return;
        deps.showNotice(error.message || "Could not delete PM schedule.", "warning");
      } finally {
        pendingWrites.delete(key);
        restoreButton(button, context, "Permanently Delete");
      }
    }

    function generatePreventiveWorkOrder(scheduleId) {
      const key = `${deps.getActiveCompanyId()}:${scheduleId}`;
      if (pendingGenerations.has(key)) return pendingGenerations.get(key);
      const promise = generateOnce(scheduleId).finally(() => pendingGenerations.delete(key));
      pendingGenerations.set(key, promise);
      return promise;
    }
    async function generateOnce(scheduleId) {
      const context = captureScope();
      const schedule = deps.getPreventiveSchedules().find((item) => item.id === scheduleId && item.company_id === context.companyId);
      if (!schedule) return;
      const button = documentRef.querySelector(`[data-generate-pm="${cssRef.escape(scheduleId)}"]`);
      if (button) {
        button.disabled = true;
        button.textContent = "Generating...";
      }

      try {
        requireEditor(context);
        if (schedule.active === false) throw new Error("This PM schedule cannot generate work.");
        deps.nextDueDate(schedule.next_due_at, schedule.frequency);
        const { data, error } = await deps.withOperationTimeout(
          context.client.rpc("generate_preventive_work_order", {
            p_company_id: context.companyId, p_schedule_id: schedule.id, p_expected_due_at: schedule.next_due_at,
          }),
          "PM work order generation timed out. Retry this schedule to check the same occurrence."
        );
        if (error) throw error;
        if (!data?.work_order_id) throw new Error("PM generation did not return a work order.");
        if (!context.isCurrent()) return;
        deps.setActiveWorkOrderId(data.work_order_id);
        deps.setActiveSection("work");
        deps.showNotice(data.reused ? "Opened the work order already generated for this PM occurrence." : "PM work order generated.");
        await deps.render();
      } catch (error) {
        if (context.isCurrent()) deps.showNotice(`Could not generate PM work: ${error.message || error}`, "warning");
      } finally {
        restoreButton(button, context, "Generate Work");
      }
    }

    return {
      bindPreventiveMaintenanceWorkflowEvents,
      createPreventiveSchedule,
      requestDeletePreventiveSchedule,
      deletePreventiveSchedule,
      generatePreventiveWorkOrder,
    };
  }

  window.MaintainOpsPreventiveMaintenanceWorkflow = {
    createPreventiveMaintenanceWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createPreventiveMaintenanceWorkflow };
  }
})();
