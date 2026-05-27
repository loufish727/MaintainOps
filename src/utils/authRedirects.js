(function (global) {
  function stripTrailingSlash(value) {
    return String(value || "").replace(/\/+$/, "");
  }

  function appBaseUrl(locationLike = global.location, publicAppUrl = global.PUBLIC_APP_URL) {
    if (publicAppUrl) return `${stripTrailingSlash(publicAppUrl)}/`;
    const origin = locationLike?.origin || "";
    const path = locationLike?.pathname || "/";
    const marker = "/auth/callback";
    const callbackIndex = path.indexOf(marker);
    if (callbackIndex >= 0) return `${origin}${path.slice(0, callbackIndex + 1)}`;
    const directory = path.endsWith("/") ? path : path.replace(/[^/]*$/, "");
    return `${origin}${directory || "/"}`;
  }

  function authCallbackUrl(locationLike = global.location, publicAppUrl = global.PUBLIC_APP_URL) {
    return `${appBaseUrl(locationLike, publicAppUrl)}auth/callback/`;
  }

  function workspaceUrl(params = {}, locationLike = global.location, publicAppUrl = global.PUBLIC_APP_URL) {
    const url = new URL(appBaseUrl(locationLike, publicAppUrl));
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
    });
    return url.href;
  }

  function authParamsFromHref(href) {
    const url = new URL(href);
    const hashParams = new URLSearchParams(url.hash.replace(/^#/, ""));
    const queryParams = url.searchParams;
    return {
      code: queryParams.get("code") || "",
      type: hashParams.get("type") || queryParams.get("type") || "",
      accessToken: hashParams.get("access_token") || queryParams.get("access_token") || "",
      refreshToken: hashParams.get("refresh_token") || queryParams.get("refresh_token") || "",
      error: hashParams.get("error") || queryParams.get("error") || "",
      errorCode: hashParams.get("error_code") || queryParams.get("error_code") || "",
      errorDescription: hashParams.get("error_description") || queryParams.get("error_description") || "",
    };
  }

  function isAuthCallbackParams(params) {
    return Boolean(params?.code || (params?.accessToken && params?.refreshToken) || params?.error || params?.errorDescription);
  }

  function isPasswordRecoveryParams(params) {
    return params?.type === "recovery" || (!params?.type && Boolean(params?.accessToken && params?.refreshToken));
  }

  function cleanAuthUrl(locationLike = global.location) {
    const url = new URL(locationLike.href);
    [
      "access_token",
      "code",
      "error",
      "error_code",
      "error_description",
      "expires_at",
      "expires_in",
      "refresh_token",
      "token_type",
      "type",
      "sb",
    ].forEach((key) => url.searchParams.delete(key));
    url.hash = "";
    return url.href;
  }

  global.MaintainOpsAuthRedirects = {
    appBaseUrl,
    authCallbackUrl,
    workspaceUrl,
    authParamsFromHref,
    isAuthCallbackParams,
    isPasswordRecoveryParams,
    cleanAuthUrl,
  };
})(window);
