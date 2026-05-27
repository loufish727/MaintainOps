const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("src/utils/authRedirects.js", "utf8");

function loadRedirects(href, publicAppUrl = "") {
  const location = new URL(href);
  const sandbox = {
    window: {
      location: {
        href: location.href,
        origin: location.origin,
        pathname: location.pathname,
      },
      PUBLIC_APP_URL: publicAppUrl,
    },
    URL,
    URLSearchParams,
  };
  sandbox.window.window = sandbox.window;
  vm.runInNewContext(source, sandbox);
  return sandbox.window.MaintainOpsAuthRedirects;
}

const redirects = loadRedirects("https://loufish727.github.io/MaintainOps/auth/callback/?code=abc", "https://loufish727.github.io/MaintainOps/");

assert.equal(
  redirects.authCallbackUrl(),
  "https://loufish727.github.io/MaintainOps/auth/callback/"
);

assert.equal(
  redirects.workspaceUrl({ auth: "verified" }),
  "https://loufish727.github.io/MaintainOps/?auth=verified"
);

const signupHash = redirects.authParamsFromHref("https://loufish727.github.io/MaintainOps/#access_token=a&refresh_token=r&type=signup");
assert.equal(redirects.isAuthCallbackParams(signupHash), true);
assert.equal(redirects.isPasswordRecoveryParams(signupHash), false);

const recoveryHash = redirects.authParamsFromHref("https://loufish727.github.io/MaintainOps/#access_token=a&refresh_token=r&type=recovery");
assert.equal(redirects.isAuthCallbackParams(recoveryHash), true);
assert.equal(redirects.isPasswordRecoveryParams(recoveryHash), true);

const codeParams = redirects.authParamsFromHref("https://loufish727.github.io/MaintainOps/auth/callback/?code=abc");
assert.equal(codeParams.code, "abc");
assert.equal(redirects.isAuthCallbackParams(codeParams), true);

const cleaned = redirects.cleanAuthUrl({
  href: "https://loufish727.github.io/MaintainOps/?code=abc&type=signup#access_token=a&refresh_token=r",
});
assert.equal(cleaned, "https://loufish727.github.io/MaintainOps/");

console.log("auth callback redirect smoke passed");
