(function () {
  function createCompanySettingsWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;

    function bindCompanySettingsWorkflowEvents() {
      const settingsForm = documentRef.querySelector("#company-settings-form");
      if (settingsForm) settingsForm.addEventListener("submit", updateCompanySettings);

      const locationForm = documentRef.querySelector("#location-form");
      if (locationForm) locationForm.addEventListener("submit", createLocation);

      const publicAppUrlForm = documentRef.querySelector("#public-app-url-form");
      if (publicAppUrlForm) publicAppUrlForm.addEventListener("submit", savePublicAppUrl);
    }

    async function updateCompanySettings(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }
      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("companies")
            .update({ name: deps.requiredText(form.get("name"), "Company name") })
            .eq("id", deps.getActiveCompanyId()),
          "Company save timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;
        deps.showNotice("Company saved.");
        await deps.render();
      } catch (error) {
        deps.showNotice(`Could not save company: ${error.message || error}`, "warning");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Save Company";
        }
      }
    }

    async function createLocation(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#location-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const name = String(new FormDataCtor(formElement).get("name") || "").trim();
      if (!name) return;
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Adding...";
      }

      try {
        const { data, error } = await deps.withOperationTimeout(
          deps.createLocationRecord(deps.supabaseClient(), deps.getActiveCompanyId(), name),
          "Location save timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          if (deps.isColumnSchemaError(error, ["locations"])) deps.setLocationsReady(false);
          throw new Error(deps.getLocationsReady() ? error.message : "Run supabase/step-next-locations.sql before adding locations.");
        }

        deps.setActiveLocationId(data.id);
        deps.persistActiveLocationId(data.id);
        deps.showNotice("Location added.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not add location.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Add Location";
        }
      }
    }

    function savePublicAppUrl(event) {
      event.preventDefault();
      const errorElement = documentRef.querySelector("#public-request-link-error");
      const rawUrl = String(new FormDataCtor(event.currentTarget).get("public_app_url") || "").trim();
      if (errorElement) errorElement.textContent = "";

      if (!rawUrl) {
        deps.setPublicAppUrlOverride("");
        deps.storage.removeItem("maintainops.publicAppUrl");
        deps.showNotice("Public app URL cleared.");
        deps.renderWorkspace();
        return;
      }

      const normalizedUrl = deps.normalizePublicAppUrl(rawUrl);
      if (!normalizedUrl) {
        if (errorElement) errorElement.textContent = "Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.";
        return;
      }

      deps.setPublicAppUrlOverride(normalizedUrl);
      deps.storage.setItem("maintainops.publicAppUrl", normalizedUrl);
      deps.showNotice("Public app URL saved.");
      deps.renderWorkspace();
    }

    return {
      bindCompanySettingsWorkflowEvents,
      updateCompanySettings,
      createLocation,
      savePublicAppUrl,
    };
  }

  window.MaintainOpsCompanySettingsWorkflow = {
    createCompanySettingsWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createCompanySettingsWorkflow };
  }
})();
