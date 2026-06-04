const assert = require("node:assert/strict");

global.window = {};

const { shouldRenderForAuthEvent } = require("../../src/utils/authRenderPolicy.js");

const sessionA = { user: { id: "user-1" }, access_token: "old" };
const refreshedA = { user: { id: "user-1" }, access_token: "new" };
const sessionB = { user: { id: "user-2" }, access_token: "new" };

assert.equal(shouldRenderForAuthEvent("TOKEN_REFRESHED", sessionA, refreshedA), false);
assert.equal(shouldRenderForAuthEvent("TOKEN_REFRESHED", null, refreshedA), true);
assert.equal(shouldRenderForAuthEvent("TOKEN_REFRESHED", sessionA, sessionB), true);
assert.equal(shouldRenderForAuthEvent("SIGNED_IN", sessionA, refreshedA), true);
assert.equal(shouldRenderForAuthEvent("SIGNED_OUT", sessionA, null), true);
assert.equal(shouldRenderForAuthEvent("USER_UPDATED", sessionA, refreshedA), true);

console.log("auth render policy smoke passed");
