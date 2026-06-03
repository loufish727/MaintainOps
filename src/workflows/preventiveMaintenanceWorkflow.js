(function () {
  function createPreventiveMaintenanceWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const cssRef = deps.CSSRef || CSS;

    function bindPreventiveMaintenanceWorkflowEvents() {
      const forms = Array.from(documentRef.querySelectorAll?.("[data-create-pm-form]") || []);
      const legacyForm = documentRef.querySelector("#create-pm-form");
      if (legacyForm && !forms.includes(legacyForm)) forms.push(legacyForm);
      forms.forEach((pmForm) => pmForm.addEventListener("submit", createPreventiveSchedule));
    }

    async function createPreventiveSchedule(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorElement = formElement.querySelector("[data-pm-error]") || documentRef.querySelector("#pm-error");
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Adding...";
      }

      try {
        const form = new FormDataCtor(formElement);
        if (!deps.confirmAssetLocationRouting(form.get("asset_id") || null, "this PM schedule", errorElement)) return;
        const { error } = await deps.withOperationTimeout(
          deps.insertWithOptionalProcedure("preventive_schedules", {
            company_id: deps.getActiveCompanyId(),
            location_id: deps.locationIdForAsset(form.get("asset_id")),
            asset_id: form.get("asset_id"),
            title: deps.requiredText(form.get("title"), "PM title"),
            frequency: form.get("frequency"),
            next_due_at: form.get("next_due_at"),
            ...deps.procedureColumn(form.get("procedure_template_id")),
            active: true,
            created_by: deps.getSession().user.id,
          }),
          "PM schedule save timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;
        deps.showNotice("PM schedule added.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not add PM schedule.";
        else deps.alertUser(error.message || error);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Add Schedule";
        }
      }
    }

    function requestDeletePreventiveSchedule(id) {
      if (!deps.canDeleteOperationalRecords()) {
        deps.alertUser("Only company admins and managers can delete PM schedules.");
        return;
      }
      if (!deps.getPreventiveSchedules().some((schedule) => schedule.id === id)) return;
      deps.setPendingDeleteScheduleId(id);
      deps.renderWorkspace();
    }

    async function deletePreventiveSchedule(id) {
      if (!deps.canDeleteOperationalRecords()) {
        deps.alertUser("Only company admins and managers can delete PM schedules.");
        return;
      }

      const schedule = deps.getPreventiveSchedules().find((item) => item.id === id);
      if (!schedule) return;
      const button = documentRef.querySelector(`[data-confirm-delete-schedule="${cssRef.escape(id)}"]`);
      if (button) {
        button.disabled = true;
        button.textContent = "Deleting...";
      }

      try {
        const { data, error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("preventive_schedules")
            .delete()
            .eq("id", id)
            .eq("company_id", deps.getActiveCompanyId())
            .select("id"),
          "PM schedule delete timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;
        if (!data?.length) {
          throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");
        }

        const verification = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("preventive_schedules")
            .select("id")
            .eq("id", id)
            .eq("company_id", deps.getActiveCompanyId())
            .maybeSingle(),
          "PM schedule delete verification timed out. Refresh and check the PM list.",
          15000
        );
        if (verification.error) throw new Error(`PM schedule delete verification failed: ${verification.error.message}`);
        if (verification.data) throw new Error("PM schedule delete did not persist in Supabase.");

        deps.setPendingDeleteScheduleId(null);
        deps.showNotice("PM schedule deleted.");
        await deps.render();
      } catch (error) {
        deps.showNotice(error.message || "Could not delete PM schedule.", "warning");
        if (button) {
          button.disabled = false;
          button.textContent = "Permanently Delete";
        }
      }
    }

    async function generatePreventiveWorkOrder(scheduleId) {
      const schedule = deps.getPreventiveSchedules().find((item) => item.id === scheduleId);
      if (!schedule) return;
      const button = documentRef.querySelector(`[data-generate-pm="${cssRef.escape(scheduleId)}"]`);
      if (button) {
        button.disabled = true;
        button.textContent = "Generating...";
      }

      try {
        const payload = {
          company_id: deps.getActiveCompanyId(),
          location_id: deps.locationIdForAsset(schedule.asset_id),
          asset_id: schedule.asset_id,
          title: schedule.title,
          description: `Generated from preventive schedule: ${schedule.frequency}.`,
          priority: "medium",
          type: "preventive",
          status: "open",
          due_at: schedule.next_due_at,
          ...deps.procedureColumn(schedule.procedure_template_id),
          created_by: deps.getSession().user.id,
        };
        deps.applySafetyRequirementPayload(payload);
        deps.applySafetyCheckPayload(payload, false);
        const { data, error } = await deps.withOperationTimeout(
          deps.insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
          "PM work order generation timed out."
        );

        if (error) throw error;

        deps.setActiveWorkOrderId(data.id);
        deps.setActiveSection("work");
        let scheduleWarning = "";
        try {
          const scheduleUpdate = await deps.withOperationTimeout(
            deps.supabaseClient()
              .from("preventive_schedules")
              .update({ next_due_at: deps.nextDueDate(schedule.next_due_at, schedule.frequency) })
              .eq("id", schedule.id)
              .eq("company_id", deps.getActiveCompanyId()),
            "PM next due date update timed out."
          );
          if (scheduleUpdate.error) scheduleWarning = scheduleUpdate.error.message;
        } catch (updateError) {
          scheduleWarning = updateError.message || String(updateError);
        }
        deps.showNotice(
          scheduleWarning ? `PM work generated, but next due date did not update: ${scheduleWarning}` : "PM work order generated.",
          scheduleWarning ? "warning" : "success"
        );
        await deps.render();
      } catch (error) {
        deps.showNotice(`Could not generate PM work: ${error.message || error}`, "warning");
        if (button) {
          button.disabled = false;
          button.textContent = "Generate Work";
        }
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
