(function () {
  /*
   * Module contract: owns company-create screen binding and create-company submit workflow only.
   * May select an existing company, call injected create-company RPC, call injected profile/starter setup,
   * persist injected active company id, and render via injected callbacks.
   * Must not own auth/session startup, company loading, workspace loading, SQL, or RLS.
   */
  function createCompanySetupWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;

    function renderCompanyCreate() {
      deps.setAppHtml(deps.companyCreateForm(deps.getAppError()));

      documentRef.querySelector("#company-form").addEventListener("submit", createCompany);
      documentRef.querySelector("#sign-out").addEventListener("click", () => deps.signOut());
    }

    async function createCompany(event) {
      event.preventDefault();
      const formElement = event.target;
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorTarget = documentRef.querySelector("#company-error");
      const name = String(new FormDataCtor(formElement).get("name") || "").trim();
      submitButton.disabled = true;
      submitButton.textContent = "Creating...";
      errorTarget.textContent = "";

      try {
        if (!name) throw new Error("Company name is required.");
        const existing = deps.getCompanies().find((company) => company.name.trim().toLowerCase() === name.trim().toLowerCase());
        if (existing) {
          deps.setActiveCompanyId(existing.id);
          deps.persistActiveCompanyId(existing.id);
          await deps.render();
          return;
        }

        const { data, error } = await deps.withOperationTimeout(
          deps.createCompanyRecord(name),
          "Company creation timed out."
        );

        if (error) {
          errorTarget.textContent = error.message.includes("create_company")
            ? "Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again."
            : error.message;
          return;
        }

        deps.setActiveCompanyId(data);
        deps.persistActiveCompanyId(data);
        const profileReady = await deps.ensureProfileForActiveCompany(name);
        if (!profileReady) throw new Error(deps.getAppError() || "Could not create your company profile.");
        await deps.seedStarterAssets();
        await deps.render();
      } catch (error) {
        errorTarget.textContent = error.message || "Could not create company.";
      } finally {
        if (submitButton?.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Create Company";
        }
      }
    }

    return {
      createCompany,
      renderCompanyCreate,
    };
  }

  window.MaintainOpsCompanySetupWorkflow = {
    createCompanySetupWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createCompanySetupWorkflow };
  }
})();
