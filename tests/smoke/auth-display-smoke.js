const assert = require("node:assert/strict");

global.window = {};

const { createAuthDisplayHelpers } = require("../../src/render/authDisplay.js");

const helpers = createAuthDisplayHelpers({
  escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },
});

assert.match(helpers.workspaceLoading("<loading>"), /Loading Workspace/);
assert.match(helpers.workspaceLoading("<loading>"), /&lt;loading&gt;/);

const loadError = helpers.workspaceLoadError("Load <failed>");
assert.match(loadError, /Workspace Load Stopped/);
assert.match(loadError, /retry-workspace-load/);
assert.match(loadError, /auth-reset/);
assert.match(loadError, /Load &lt;failed&gt;/);

const login = helpers.authForm("login", "Bad <login>");
assert.match(login, /Welcome Back/);
assert.match(login, /auth-form/);
assert.match(login, /auth-forgot-password/);
assert.match(login, /current-password/);
assert.match(login, /Bad &lt;login&gt;/);

const signup = helpers.authForm("signup");
assert.match(signup, /Create Account/);
assert.match(signup, /name="fullName"/);
assert.match(signup, /new-password/);
assert.doesNotMatch(signup, /auth-forgot-password/);

assert.match(helpers.authCallback("Done <soon>"), /Verifying Your Account/);
assert.match(helpers.authCallback("Done <soon>"), /Done &lt;soon&gt;/);
assert.match(helpers.authCallbackError("Expired <link>"), /Verification Link Problem/);
assert.match(helpers.authCallbackError("Expired <link>"), /Expired &lt;link&gt;/);

const reset = helpers.passwordResetRequest("Reset <error>", "Sent <status>");
assert.match(reset, /password-reset-request-form/);
assert.match(reset, /Reset &lt;error&gt;/);
assert.match(reset, /Sent &lt;status&gt;/);

const recoveryReady = helpers.passwordRecovery({ ready: true, initialError: "Recover <ok>" });
assert.match(recoveryReady, /password-recovery-form/);
assert.match(recoveryReady, /Reset link accepted/);
assert.match(recoveryReady, /Recover &lt;ok&gt;/);

const recoveryBlocked = helpers.passwordRecovery({ ready: false });
assert.match(recoveryBlocked, /disabled/);

const company = helpers.companyCreate("Company <error>");
assert.match(company, /company-form/);
assert.match(company, /Create Company/);
assert.match(company, /Company &lt;error&gt;/);

console.log("auth display smoke passed");
