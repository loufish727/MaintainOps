(function () {
  function createAuthDisplayHelpers(deps = {}) {
    const escapeHtml = deps.escapeHtml;

    function workspaceLoading(message) {
      return `
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Loading Workspace</h1>
                <p>${escapeHtml(message)}</p>
              </div>
            </div>
            <p class="muted auth-status">Your login was accepted. We are loading company data now.</p>
          </div>
        </section>
      `;
    }

    function workspaceLoadError(message) {
      return `
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Workspace Load Stopped</h1>
                <p>Login worked, but the workspace did not finish loading.</p>
              </div>
            </div>
            <p class="error-text">${escapeHtml(message)}</p>
            <button class="primary-button" id="retry-workspace-load" type="button">Try Again</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </div>
        </section>
      `;
    }

    function authForm(mode, initialError = "") {
      const isSignup = mode === "signup";
      return `
        <section class="auth-shell">
          <form class="auth-card" id="auth-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${isSignup ? "Create Account" : "Welcome Back"}</h1>
                <p>${isSignup ? "Start with email and password." : "Sign in to your maintenance workspace."}</p>
              </div>
            </div>
            <div class="form-grid">
              ${isSignup ? `<label>Full name<input name="fullName" required autocomplete="name"></label>` : ""}
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
              <label>Password<input name="password" type="password" minlength="6" required autocomplete="${isSignup ? "new-password" : "current-password"}"></label>
            </div>
            <p class="error-text" id="auth-error">${escapeHtml(initialError)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${isSignup ? "Sign Up" : "Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${isSignup ? "I already have an account" : "Create an account"}</button>
            ${isSignup ? "" : `<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>`}
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `;
    }

    function authCallback(message) {
      return `
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verifying Your Account</h1>
                <p>${escapeHtml(message)}</p>
              </div>
            </div>
            <p class="muted auth-status">You will be redirected into MaintainOps automatically.</p>
          </div>
        </section>
      `;
    }

    function authCallbackError(message) {
      return `
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verification Link Problem</h1>
                <p>We could not finish verification from this link.</p>
              </div>
            </div>
            <p class="error-text">${escapeHtml(message)}</p>
            <button class="primary-button" id="auth-back-to-login" type="button">Back to Sign In</button>
          </div>
        </section>
      `;
    }

    function passwordResetRequest(initialError = "", initialStatus = "") {
      return `
        <section class="auth-shell">
          <form class="auth-card" id="password-reset-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Reset Password</h1>
                <p>Send a secure reset link to your email.</p>
              </div>
            </div>
            <div class="form-grid">
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
            </div>
            <p class="error-text" id="auth-error">${escapeHtml(initialError)}</p>
            <p class="muted auth-status" id="auth-status">${escapeHtml(initialStatus)}</p>
            <button class="primary-button" type="submit">Send Reset Link</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `;
    }

    function passwordRecovery(options = {}) {
      const ready = Boolean(options.ready);
      const initialError = options.initialError || "";
      return `
        <section class="auth-shell">
          <form class="auth-card" id="password-recovery-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Set New Password</h1>
                <p>Enter a new password for this MaintainOps login.</p>
              </div>
            </div>
            <div class="form-grid">
              <label>New password<input name="password" type="password" minlength="6" required autocomplete="new-password" ${ready ? "" : "disabled"}></label>
              <label>Confirm password<input name="confirmPassword" type="password" minlength="6" required autocomplete="new-password" ${ready ? "" : "disabled"}></label>
            </div>
            <p class="error-text" id="auth-error">${escapeHtml(initialError)}</p>
            <p class="muted auth-status" id="auth-status">${ready ? "Reset link accepted. Choose your new password." : ""}</p>
            <button class="primary-button" type="submit" ${ready ? "" : "disabled"}>Update Password</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-send-new-reset" type="button">Send a new reset link</button>
          </form>
        </section>
      `;
    }

    function companyCreate(appError = "") {
      return `
        <section class="auth-shell">
          <form class="auth-card" id="company-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Create Company</h1>
                <p>Your shared maintenance data will live inside this company.</p>
              </div>
            </div>
            <label>Company name<input name="name" required placeholder="North Plant Operations"></label>
            <p class="error-text" id="company-error">${escapeHtml(appError)}</p>
            <button class="primary-button" type="submit">Create Company</button>
            <button class="text-button" type="button" id="sign-out">Sign out</button>
          </form>
        </section>
      `;
    }

    return {
      workspaceLoading,
      workspaceLoadError,
      authForm,
      authCallback,
      authCallbackError,
      passwordResetRequest,
      passwordRecovery,
      companyCreate,
    };
  }

  window.MaintainOpsAuthDisplay = {
    createAuthDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createAuthDisplayHelpers };
  }
})();
