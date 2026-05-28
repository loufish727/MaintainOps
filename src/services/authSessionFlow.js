(function () {
  function createAuthSessionFlow(deps = {}) {
    const windowRef = deps.windowRef || window;
    const documentRef = deps.documentRef || document;
    const app = deps.app;

    function authCallbackRedirectUrl() {
      return windowRef.MaintainOpsAuthRedirects.authCallbackUrl(windowRef.location, windowRef.PUBLIC_APP_URL);
    }

    function passwordResetRedirectUrl() {
      return windowRef.MaintainOpsAuthRedirects.cleanAuthUrl(windowRef.location);
    }

    function clearPasswordRecoveryUrl() {
      windowRef.history.replaceState({}, documentRef.title, windowRef.MaintainOpsAuthRedirects.cleanAuthUrl(windowRef.location));
    }

    async function startAuthCallback(params) {
      renderAuthCallback("Verifying your account...");

      try {
        if (params.error || params.errorDescription) {
          throw new Error(params.errorDescription || params.error || "This verification link is invalid or expired.");
        }

        let callbackSession = null;
        if (params.code) {
          const { data, error } = await deps.supabaseClient.auth.exchangeCodeForSession(params.code);
          if (error) throw error;
          callbackSession = data?.session || null;
        } else if (params.accessToken && params.refreshToken) {
          const { data, error } = await deps.supabaseClient.auth.setSession({
            access_token: params.accessToken,
            refresh_token: params.refreshToken,
          });
          if (error) throw error;
          callbackSession = data?.session || null;
        }

        if (!callbackSession) {
          const { data, error } = await deps.supabaseClient.auth.getSession();
          if (error) throw error;
          callbackSession = data?.session || null;
        }

        if (!callbackSession) {
          throw new Error("The verification link did not create a session. Request a new verification email and try again.");
        }

        deps.setSession(callbackSession);
        clearPasswordRecoveryUrl();
        renderAuthCallback("Verification complete. Loading workspace...");
        await deps.render();
      } catch (error) {
        clearPasswordRecoveryUrl();
        renderAuthCallbackError(error.message || "This verification link is invalid or expired.");
      }
    }

    function renderAuthCallback(message) {
      documentRef.body.classList.remove("public-qr-mode");
      app.innerHTML = deps.authCallback(message);
    }

    function renderAuthCallbackError(message) {
      documentRef.body.classList.remove("public-qr-mode");
      app.innerHTML = deps.authCallbackError(message);
      documentRef.querySelector("#auth-back-to-login").addEventListener("click", () => deps.renderAuth("login"));
    }

    async function startPasswordRecovery(params = deps.passwordRecoveryParamsFromUrl()) {
      let ready = false;
      let initialError = "";

      if (params.accessToken && params.refreshToken) {
        const { data, error } = await deps.supabaseClient.auth.setSession({
          access_token: params.accessToken,
          refresh_token: params.refreshToken,
        });
        ready = Boolean(data?.session && !error);
        if (error) {
          initialError = "This reset link is expired or invalid. Send a new password reset email and use the newest link.";
        }
      } else {
        initialError = "This reset link is missing the secure session. Send a new password reset email and use the newest link.";
      }

      renderPasswordRecovery({ ready, initialError });
    }

    function renderPasswordResetRequest(initialError = "", initialStatus = "") {
      documentRef.body.classList.remove("public-qr-mode");
      app.innerHTML = deps.passwordResetRequest(initialError, initialStatus);

      documentRef.querySelector("#auth-back-to-login").addEventListener("click", () => deps.renderAuth("login"));
      documentRef.querySelector("#auth-reset").addEventListener("click", deps.resetLoginState);
      documentRef.querySelector("#password-reset-request-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const formElement = event.target;
        const submitButton = formElement.querySelector("button[type='submit']");
        const errorTarget = documentRef.querySelector("#auth-error");
        const statusTarget = documentRef.querySelector("#auth-status");
        const email = String(new FormData(formElement).get("email") || "").trim();
        errorTarget.textContent = "";
        statusTarget.textContent = "Sending reset link...";
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
          const { error } = await deps.withOperationTimeout(
            deps.supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: passwordResetRedirectUrl() }),
            "Password reset email timed out. Check your connection and try again.",
            20000
          );
          if (error) {
            statusTarget.textContent = "";
            errorTarget.textContent = error.message;
            return;
          }
          statusTarget.textContent = "If that email exists in Supabase, a reset link has been sent.";
        } catch (error) {
          statusTarget.textContent = "";
          errorTarget.textContent = error.message || "Could not send reset link.";
        } finally {
          if (documentRef.body.contains(submitButton)) {
            submitButton.disabled = false;
            submitButton.textContent = "Send Reset Link";
          }
        }
      });
    }

    function renderPasswordRecovery({ ready = false, initialError = "" } = {}) {
      documentRef.body.classList.remove("public-qr-mode");
      app.innerHTML = deps.passwordRecovery({ ready, initialError });

      documentRef.querySelector("#auth-back-to-login").addEventListener("click", () => {
        clearPasswordRecoveryUrl();
        deps.renderAuth("login");
      });
      documentRef.querySelector("#auth-send-new-reset").addEventListener("click", () => {
        clearPasswordRecoveryUrl();
        renderPasswordResetRequest();
      });
      documentRef.querySelector("#password-recovery-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!ready) return;
        const formElement = event.target;
        const submitButton = formElement.querySelector("button[type='submit']");
        const form = new FormData(formElement);
        const password = String(form.get("password") || "");
        const confirmPassword = String(form.get("confirmPassword") || "");
        const errorTarget = documentRef.querySelector("#auth-error");
        const statusTarget = documentRef.querySelector("#auth-status");
        errorTarget.textContent = "";

        if (password.length < 8) {
          errorTarget.textContent = "Password must be at least 8 characters.";
          return;
        }
        if (password !== confirmPassword) {
          errorTarget.textContent = "Passwords do not match.";
          return;
        }

        statusTarget.textContent = "Updating password...";
        submitButton.disabled = true;
        submitButton.textContent = "Updating...";

        try {
          const { error } = await deps.withOperationTimeout(
            deps.supabaseClient.auth.updateUser({ password }),
            "Password update timed out. Try the newest reset link again.",
            20000
          );
          if (error) {
            statusTarget.textContent = "";
            errorTarget.textContent = error.message;
            return;
          }
          clearPasswordRecoveryUrl();
          const { data } = await deps.supabaseClient.auth.getSession();
          deps.setSession(data.session);
          statusTarget.textContent = data.session ? "Password updated. Loading workspace..." : "Password updated. Sign in with your new password.";
          if (data.session) {
            await deps.render();
            return;
          }
          deps.renderAuth("login", "Password updated. Sign in with your new password.");
        } catch (error) {
          statusTarget.textContent = "";
          errorTarget.textContent = error.message || "Could not update password.";
        } finally {
          if (documentRef.body.contains(submitButton)) {
            submitButton.disabled = false;
            submitButton.textContent = "Update Password";
          }
        }
      });
    }

    return {
      authCallbackRedirectUrl,
      passwordResetRedirectUrl,
      clearPasswordRecoveryUrl,
      startAuthCallback,
      renderAuthCallback,
      renderAuthCallbackError,
      startPasswordRecovery,
      renderPasswordResetRequest,
      renderPasswordRecovery,
    };
  }

  window.MaintainOpsAuthSessionFlow = {
    createAuthSessionFlow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createAuthSessionFlow };
  }
})();
