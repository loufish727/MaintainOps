(function () {
  function createPublicRequestLinkWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const windowRef = deps.windowRef || window;
    const cssRef = deps.CSSRef || CSS;
    const currentScope = () => deps.getScope?.() || deps.getActiveCompanyId();
    let replacementPending = false;

    function confirmReplacement(locationName, triggerButton) {
      return new Promise((resolve, reject) => {
        const dialog = documentRef.createElement("dialog");
        const previousFocus = triggerButton || documentRef.activeElement;
        dialog.className = "qr-replacement-dialog";
        dialog.setAttribute("role", "alertdialog");
        dialog.setAttribute("aria-labelledby", "qr-replacement-title");
        dialog.setAttribute("aria-describedby", "qr-replacement-impact");
        const element = (tag, text, className) => {
          const node = documentRef.createElement(tag);
          if (text) node.textContent = text;
          if (className) node.className = className;
          return node;
        };
        const caution = () => {
          const icon = element("span", "\u26a0\ufe0e", "qr-warning-symbol");
          icon.setAttribute("aria-hidden", "true");
          return icon;
        };
        const title = element("h2", "", "qr-warning-title");
        title.id = "qr-replacement-title";
        title.append(caution(), element("span", "WARNING"), caution());
        const impact = element("p", "The current QR code will stop working immediately.", "qr-warning-impact");
        impact.id = "qr-replacement-impact";
        const facility = element("p", locationName ? `Location: ${locationName}` : "For this location", "qr-warning-facility");
        const consequences = element("div", "", "qr-warning-details");
        consequences.append(
          element("p", "Every printed sign, saved QR image, and shared link using the current code will stop working. People scanning those copies will no longer be able to submit maintenance requests."),
          element("p", "You must print the NEW QR code, replace EVERY posted copy, and update shared links.", "qr-warning-required"),
          element("p", "Existing requests are not deleted. Other locations' QR codes are not affected."),
          element("p", "Only need another copy? Select Cancel, then Print QR Code.", "qr-warning-alternative"),
        );
        const actions = element("div", "", "qr-warning-actions");
        const cancel = element("button", "Cancel", "secondary-button");
        const replace = element("button", "Replace QR Code", "danger-action-button qr-replace-button");
        cancel.type = replace.type = "button";
        actions.append(cancel, replace);
        dialog.append(title, facility, impact, consequences, actions);
        let settled = false;
        const finish = (confirmed) => {
          if (settled) return;
          settled = true;
          if (dialog.open) dialog.close();
          dialog.remove();
          if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
          resolve(confirmed);
        };
        cancel.addEventListener("click", () => finish(false));
        replace.addEventListener("click", () => finish(true));
        dialog.addEventListener("cancel", (event) => { event.preventDefault(); finish(false); });
        dialog.addEventListener("close", () => finish(false));
        dialog.addEventListener("click", (event) => {
          if (event.target !== dialog) return;
          const box = dialog.getBoundingClientRect();
          if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) finish(false);
        });
        try {
          documentRef.body.append(dialog);
          dialog.showModal();
          cancel.focus({ preventScroll: true });
        } catch (error) {
          settled = true;
          dialog.remove();
          if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
          reject(new Error("Could not open the QR replacement warning. No changes were made."));
        }
      });
    }

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
      if (replacementPending) return;
      if (!deps.canAdministerPublicRequestLinks()) {
        const errorElement = documentRef.querySelector("#public-request-link-error");
        if (errorElement) errorElement.textContent = "Only admins can replace posted QR request links.";
        return;
      }
      const companyId = deps.getActiveCompanyId(), scope = currentScope();
      if (!linkId || !companyId) return;
      const link = (deps.getPublicRequestLinks?.() || []).find((item) => item.id === linkId);
      const locationName = (deps.getLocations?.() || []).find((location) => location.id === link?.location_id)?.name || "";
      replacementPending = true;
      const button = documentRef.querySelector(`[data-regenerate-public-request-link="${cssRef.escape(linkId)}"]`);
      try {
        const confirmed = await (deps.confirmReplacement || confirmReplacement)(locationName, button);
        if (!confirmed) return;
        if (companyId !== deps.getActiveCompanyId() || scope !== currentScope() || !deps.canAdministerPublicRequestLinks()) {
          deps.showNotice("Your workspace or access changed. Reopen the QR code before replacing it.", "warning");
          return;
        }
        if (button) button.disabled = true;
        await updatePublicRequestLink(linkId, { token: deps.generatePublicRequestToken(), is_active: true }, "Request QR regenerated.");
      } catch (error) {
        if (scope === currentScope()) deps.showNotice(error.message || "Could not open the QR replacement warning. No changes were made.", "warning");
      } finally {
        replacementPending = false;
        if (button?.isConnected) button.disabled = false;
      }
    }

    async function updatePublicRequestLink(linkId, patch, successMessage) {
      const companyId = deps.getActiveCompanyId(), scope = currentScope();
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
            .eq("company_id", companyId)
            .select("id"),
          "Request link update timed out. Check your connection and try again.",
          15000
        );

        if (scope !== currentScope() || companyId !== deps.getActiveCompanyId() || !deps.canAdministerPublicRequestLinks()) return;
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
        if (scope !== currentScope() || companyId !== deps.getActiveCompanyId()) return;
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
