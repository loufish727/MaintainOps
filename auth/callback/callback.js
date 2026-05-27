(async function () {
  const messageTarget = document.querySelector("#auth-callback-message");
  const errorTarget = document.querySelector("#auth-callback-error");
  const redirects = window.MaintainOpsAuthRedirects;

  function setMessage(message) {
    if (messageTarget) messageTarget.textContent = message;
  }

  function setError(message) {
    if (errorTarget) errorTarget.textContent = message;
  }

  function redirectToApp(params) {
    window.location.replace(redirects.workspaceUrl(params, window.location, window.PUBLIC_APP_URL));
  }

  try {
    if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
      throw new Error("MaintainOps Supabase config is missing.");
    }
    if (!window.supabase?.createClient) {
      throw new Error("Supabase client did not load.");
    }

    const params = redirects.authParamsFromHref(window.location.href);
    if (redirects.isPasswordRecoveryParams(params)) {
      const recoveryUrl = new URL(redirects.workspaceUrl({}, window.location, window.PUBLIC_APP_URL));
      recoveryUrl.hash = window.location.hash;
      [
        "access_token",
        "expires_at",
        "expires_in",
        "refresh_token",
        "token_type",
        "type",
      ].forEach((key) => {
        const value = new URL(window.location.href).searchParams.get(key);
        if (value) recoveryUrl.searchParams.set(key, value);
      });
      window.location.replace(recoveryUrl.href);
      return;
    }

    if (params.error || params.errorDescription) {
      throw new Error(params.errorDescription || params.error || "The verification link is invalid or expired.");
    }

    const client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    setMessage("Verifying your account...");

    let session = null;
    if (params.code) {
      const { data, error } = await client.auth.exchangeCodeForSession(params.code);
      if (error) throw error;
      session = data?.session || null;
    } else if (params.accessToken && params.refreshToken) {
      const { data, error } = await client.auth.setSession({
        access_token: params.accessToken,
        refresh_token: params.refreshToken,
      });
      if (error) throw error;
      session = data?.session || null;
    } else {
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      session = data?.session || null;
    }

    if (!session) {
      throw new Error("The verification link did not create a session. Request a new verification email and try again.");
    }

    setMessage("Verification complete. Loading MaintainOps...");
    redirectToApp({ auth: "verified" });
  } catch (error) {
    setMessage("Verification could not be completed.");
    setError(error.message || "This verification link is invalid or expired.");

    const loginButton = document.createElement("button");
    loginButton.className = "primary-button";
    loginButton.type = "button";
    loginButton.textContent = "Back to MaintainOps";
    loginButton.addEventListener("click", () => redirectToApp({ auth_error: "verification" }));
    errorTarget?.insertAdjacentElement("afterend", loginButton);
  }
})();
