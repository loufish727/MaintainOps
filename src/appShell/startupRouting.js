export function authParamsFromHref(authRedirects, href) {
  return authRedirects.authParamsFromHref(href);
}

export function passwordRecoveryParamsFromUrl({ windowRef, authRedirects }) {
  return authParamsFromHref(authRedirects, windowRef.location.href);
}

export function isPasswordRecoveryParams(authRedirects, params) {
  return authRedirects.isPasswordRecoveryParams(params);
}

export function isAuthCallbackParams(authRedirects, params) {
  return authRedirects.isAuthCallbackParams(params);
}

export function publicRequestTokenFromUrl(windowRef) {
  const url = new URL(windowRef.location.href);
  return String(url.searchParams.get("request") || url.searchParams.get("public_request") || "").trim();
}

export function publicRequestQrTokenFromUrl(windowRef) {
  const url = new URL(windowRef.location.href);
  return String(url.searchParams.get("qr") || "").trim();
}

export async function initializeStartupRoute({
  windowRef,
  authRedirects,
  supabaseGlobal,
  supabaseUrl,
  supabaseAnonKey,
  capturePendingJoinTokenFromUrl,
  startPasswordRecovery,
  startAuthCallback,
  renderPublicRequestQrPage,
  renderPublicRequestIntake,
  renderAuth,
  setSupabaseClient,
  setSession,
}) {
  const recoveryParams = authParamsFromHref(authRedirects, windowRef.location.href);
  const supabaseClient = supabaseGlobal.createClient(supabaseUrl, supabaseAnonKey);
  setSupabaseClient(supabaseClient);
  capturePendingJoinTokenFromUrl();

  if (isPasswordRecoveryParams(authRedirects, recoveryParams)) {
    await startPasswordRecovery(recoveryParams);
    return { routed: true, supabaseClient };
  }

  if (isAuthCallbackParams(authRedirects, recoveryParams)) {
    await startAuthCallback(recoveryParams);
    return { routed: true, supabaseClient };
  }

  const qrToken = publicRequestQrTokenFromUrl(windowRef);
  if (qrToken) {
    await renderPublicRequestQrPage(qrToken);
    return { routed: true, supabaseClient };
  }

  const requestToken = publicRequestTokenFromUrl(windowRef);
  if (requestToken) {
    await renderPublicRequestIntake(requestToken);
    return { routed: true, supabaseClient };
  }

  renderAuth("login");
  const { data } = await supabaseClient.auth.getSession();
  setSession(data.session);
  return { routed: false, supabaseClient };
}
