(function () {
  /*
   * Module contract: owns public QR/request intake rendering and submit workflow only.
   * May call injected public RPC callbacks, optional request photo attach, email notification,
   * and injected public request display renderers.
   * Must not own auth/session startup, company workspace state, SQL/RLS, or authenticated request conversion.
   */
  function createPublicRequestIntakeWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const bodyRef = deps.bodyRef || document.body;
    const FormDataCtor = deps.FormDataCtor || FormData;

    async function publicRequestIntake(token, timeoutMessage) {
      const { data, error } = await deps.withOperationTimeout(
        deps.getPublicRequestIntake(token),
        timeoutMessage
      );
      return {
        data: Array.isArray(data) ? data[0] : data,
        error,
      };
    }

    async function renderPublicRequestQrPage(token) {
      bodyRef.classList.add("public-qr-mode");
      deps.setAppHtml(deps.loadingQrPage());

      let intake = null;
      try {
        const { data, error } = await publicRequestIntake(token, "Request QR lookup timed out.");
        intake = data;
        if (error || !intake) {
          renderPublicRequestError("This QR code link is inactive or invalid.");
          return;
        }
      } catch (_error) {
        renderPublicRequestError("This QR code link is inactive or invalid.");
        return;
      }

      const requestUrl = deps.publicRequestUrl(token);
      deps.setAppHtml(deps.publicRequestQrPage(intake, requestUrl));
      deps.bindPublicQrPrintEvents();
      if (typeof deps.ensureQrLibrary === "function") {
        deps.ensureQrLibrary()
          .then(() => {
            deps.setAppHtml(deps.publicRequestQrPage(intake, requestUrl));
            deps.bindPublicQrPrintEvents();
          })
          .catch(() => {});
      }
    }

    async function renderPublicRequestIntake(token) {
      bodyRef.classList.remove("public-qr-mode");
      deps.setAppHtml(deps.loadingRequestForm());

      let intake = null;
      try {
        const { data, error } = await publicRequestIntake(token, "Request form lookup timed out.");
        if (error) {
          renderPublicRequestError("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");
          return;
        }
        intake = data;
      } catch (error) {
        renderPublicRequestError(error.message || "This request link could not be loaded.");
        return;
      }

      if (!intake) {
        renderPublicRequestError("This request link is inactive or invalid.");
        return;
      }

      deps.setAppHtml(deps.publicRequestForm(intake));
      documentRef.querySelector("#public-request-form").addEventListener("submit", (event) => submitPublicRequest(event, token, intake));
    }

    function renderPublicRequestError(message) {
      deps.setAppHtml(deps.publicRequestError(message));
    }

    async function submitPublicRequest(event, token, intake) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const form = new FormDataCtor(formElement);
      const errorElement = documentRef.querySelector("#public-request-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      try {
        const { data: requestId, error } = await deps.withOperationTimeout(
          deps.submitPublicLocationRequest({
            request_token: token,
            request_title: deps.requiredText(form.get("title"), "Request title"),
            equipment_note: deps.requiredText(form.get("equipment_note"), "Machine / area"),
            request_description: deps.requiredText(form.get("description"), "Request details"),
            requester_name: deps.requiredText(form.get("requester_name"), "Your name"),
            requester_contact: String(form.get("requester_contact") || "").trim() || null,
            request_priority: form.get("priority") || "medium",
          }),
          "Request send timed out."
        );

        if (error) throw error;
        const photo = form.get("photo");
        let photoWarning = "";
        if (photo && photo.name) {
          const photoError = await deps.addPhotoToMaintenanceRequest(requestId, photo);
          if (photoError) photoWarning = `Request sent, but the photo did not upload: ${photoError.message || photoError}`;
        }
        const emailResult = await deps.notifyRequestEmailer(requestId);
        if (emailResult.error) deps.warn("Request email notification did not send", emailResult.error);

        deps.setAppHtml(deps.publicRequestSuccess(intake, photoWarning));
        documentRef.querySelector("#public-request-another").addEventListener("click", () => renderPublicRequestIntake(token));
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not send the request.";
      } finally {
        if (submitButton?.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Request";
        }
      }
    }

    return {
      renderPublicRequestError,
      renderPublicRequestIntake,
      renderPublicRequestQrPage,
      submitPublicRequest,
    };
  }

  window.MaintainOpsPublicRequestIntakeWorkflow = {
    createPublicRequestIntakeWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createPublicRequestIntakeWorkflow };
  }
})();
