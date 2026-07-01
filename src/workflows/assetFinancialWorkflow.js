(function () {
  function createAssetFinancialWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const CSSRef = deps.CSSRef || CSS;

    function emptyToNull(value) {
      const text = String(value ?? "").trim();
      return text ? text : null;
    }

    function numberOrNull(value) {
      const text = String(value ?? "").trim();
      if (!text) return null;
      const number = Number(text);
      return Number.isFinite(number) ? number : null;
    }

    function dateOrNull(value) {
      return emptyToNull(value);
    }

    async function saveAssetFinancial(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const assetId = formElement.dataset.financialAsset || "";
      const errorElement = documentRef.querySelector(`[data-financial-error="${CSSRef.escape(assetId)}"]`);
      const submitButton = formElement.querySelector("button[type='submit']");
      const originalButtonText = submitButton?.textContent || "Save Financial Info";
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }
      try {
        if (!assetId) throw new Error("Choose equipment before saving financial info.");
        const form = new FormDataCtor(formElement);
        const needsReview = form.get("needs_review") === "on";
        const payload = {
          company_id: deps.getActiveCompanyId(),
          asset_id: assetId,
          asset_tag: emptyToNull(form.get("asset_tag")),
          acquisition_date: dateOrNull(form.get("acquisition_date")),
          acquisition_cost: numberOrNull(form.get("acquisition_cost")),
          depreciation_method: emptyToNull(form.get("depreciation_method")),
          useful_life_years: numberOrNull(form.get("useful_life_years")),
          current_book_value: numberOrNull(form.get("current_book_value")),
          tax_jurisdiction: emptyToNull(form.get("tax_jurisdiction")),
          ownership_status: emptyToNull(form.get("ownership_status")),
          in_service_date: dateOrNull(form.get("in_service_date")),
          disposal_date: dateOrNull(form.get("disposal_date")),
          disposal_notes: emptyToNull(form.get("disposal_notes")),
          gl_account_code: emptyToNull(form.get("gl_account_code")),
          cost_center: emptyToNull(form.get("cost_center")),
          finance_notes: emptyToNull(form.get("finance_notes")),
          needs_review: needsReview,
          updated_by: deps.getSession?.()?.user?.id || null,
          updated_at: new Date().toISOString(),
        };
        if (!needsReview) {
          payload.last_reviewed_at = new Date().toISOString();
          payload.reviewed_by = deps.getSession?.()?.user?.id || null;
        }
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("asset_financials")
            .upsert(payload, { onConflict: "asset_id" })
            .select("id")
            .single(),
          "Financial info save timed out. Check your connection and try again.",
          15000
        );
        if (error) {
          if (deps.isMissingTableError?.(error, "asset_financials")) {
            deps.setAssetFinancialsReady(false);
            throw new Error("Run supabase/step-next-asset-financials.sql before saving financial fields.");
          }
          throw error;
        }
        deps.showNotice?.("Financial info saved.");
        await deps.loadAssetFinancials?.();
        deps.renderWorkspace?.();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not save financial info.";
        else deps.showNotice?.(error.message || "Could not save financial info.", "warning");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    }

    function bindFinancialEvents() {
      documentRef.querySelectorAll("[data-financial-asset]").forEach((form) => {
        form.addEventListener("submit", saveAssetFinancial);
      });
    }

    return {
      bindFinancialEvents,
      saveAssetFinancial,
    };
  }

  window.MaintainOpsAssetFinancialWorkflow = { createAssetFinancialWorkflow };

  if (typeof module !== "undefined") {
    module.exports = { createAssetFinancialWorkflow };
  }
})();
