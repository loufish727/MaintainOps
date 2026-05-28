(function () {
  function createPublicRequestLinkWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const windowRef = deps.windowRef || window;
    const cssRef = deps.CSSRef || CSS;

    async function createPublicRequestLink(locationId) {
      const errorElement = documentRef.querySelector("#public-request-link-error");
      const button = documentRef.querySelector(`[data-create-public-request-link="${cssRef.escape(locationId)}"]`);
      if (errorElement) errorElement.textContent = "";
      if (button) {
        button.disabled = true;
        button.textContent = "Creating...";
      }

      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().rpc("ensure_location_request_link", {
            target_location_id: locationId,
          }),
          "QR link save timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          deps.setPublicRequestLinksReady(false);
          throw new Error(error.message.includes("ensure_location_request_link")
            ? "Run supabase/step-next-public-request-links.sql before creating QR request links."
            : error.message);
        }

        deps.showNotice("Location request QR link ready.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not create QR request link.";
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = "Create QR Link";
        }
      }
    }

    async function disablePublicRequestLink(linkId) {
      if (!deps.canAdministerPublicRequestLinks()) {
        const errorElement = documentRef.querySelector("#public-request-link-error");
        if (errorElement) errorElement.textContent = "Only admins can disable posted QR request links.";
        return;
      }
      const confirmed = windowRef.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.");
      if (!confirmed) return;
      await setPublicRequestLinkActive(linkId, false);
    }

    async function setPublicRequestLinkActive(linkId, isActive) {
      if (!deps.canAdministerPublicRequestLinks()) {
        const errorElement = documentRef.querySelector("#public-request-link-error");
        if (errorElement) errorElement.textContent = "Only admins can reactivate or disable posted QR request links.";
        return;
      }
      await updatePublicRequestLink(
        linkId,
        { is_active: Boolean(isActive) },
        isActive ? "Request link reactivated." : "Request link disabled.",
      );
    }

    async function regeneratePublicRequestLink(linkId) {
      if (!deps.canAdministerPublicRequestLinks()) {
        const errorElement = documentRef.querySelector("#public-request-link-error");
        if (errorElement) errorElement.textContent = "Only admins can replace posted QR request links.";
        return;
      }
      const confirmed = windowRef.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.");
      if (!confirmed) return;

      await updatePublicRequestLink(
        linkId,
        {
          token: deps.generatePublicRequestToken(),
          is_active: true,
        },
        "Request QR regenerated.",
      );
    }

    async function updatePublicRequestLink(linkId, patch, successMessage) {
      const errorElement = documentRef.querySelector("#public-request-link-error");
      if (errorElement) errorElement.textContent = "";

      if (!deps.canAdministerPublicRequestLinks()) {
        if (errorElement) errorElement.textContent = "Only admins can replace, disable, or reactivate posted QR request links.";
        return;
      }

      if (!linkId || !deps.getActiveCompanyId()) {
        if (errorElement) errorElement.textContent = "Select a company before updating request links.";
        return;
      }

      try {
        const { data, error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("public_request_links")
            .update({
              ...patch,
              updated_at: new Date().toISOString(),
            })
            .eq("id", linkId)
            .eq("company_id", deps.getActiveCompanyId())
            .select("id"),
          "Request link update timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          if (errorElement) errorElement.textContent = error.message;
          return;
        }

        if (!data?.length) {
          if (errorElement) {
            errorElement.textContent = "Could not update the request link. Check that your company role is admin or manager.";
          }
          return;
        }

        deps.showNotice(successMessage);
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not update the request link.";
      }
    }

    return {
      createPublicRequestLink,
      disablePublicRequestLink,
      setPublicRequestLinkActive,
      regeneratePublicRequestLink,
      updatePublicRequestLink,
    };
  }

  window.MaintainOpsPublicRequestLinkWorkflow = {
    createPublicRequestLinkWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createPublicRequestLinkWorkflow };
  }
})();
