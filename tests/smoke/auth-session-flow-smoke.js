const assert = require("node:assert/strict");

global.window = {};

const { createAuthSessionFlow } = require("../../src/services/authSessionFlow.js");

function createClassList() {
  return {
    removed: [],
    remove(value) {
      this.removed.push(value);
    },
  };
}

function createElement() {
  return {
    textContent: "",
    disabled: false,
    listeners: {},
    addEventListener(event, handler) {
      this.listeners[event] = handler;
    },
    querySelector() {
      return createElement();
    },
  };
}

function createDocument() {
  const elements = new Map();
  return {
    title: "MaintainOps",
    body: {
      classList: createClassList(),
      contains: () => true,
    },
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, createElement());
      return elements.get(selector);
    },
    elements,
  };
}

async function run() {
  const documentRef = createDocument();
  const app = { innerHTML: "" };
  const sessions = [];
  const calls = [];
  const windowRef = {
    location: new URL("https://loufish727.github.io/MaintainOps/#access_token=a&refresh_token=r&type=signup"),
    PUBLIC_APP_URL: "https://loufish727.github.io/MaintainOps/",
    history: {
      replaceState(...args) {
        calls.push(["replaceState", ...args]);
      },
    },
    MaintainOpsAuthRedirects: {
      authCallbackUrl: () => "https://loufish727.github.io/MaintainOps/auth/callback/",
      cleanAuthUrl: () => "https://loufish727.github.io/MaintainOps/",
    },
  };
  const supabaseClient = {
    auth: {
      exchangeCodeForSession: async () => ({ data: { session: { user: { id: "code-user" } } } }),
      setSession: async () => ({ data: { session: { user: { id: "hash-user" } } } }),
      getSession: async () => ({ data: { session: { user: { id: "existing-user" } } } }),
      resetPasswordForEmail: async () => ({ error: null }),
      updateUser: async () => ({ error: null }),
    },
  };
  let renderCount = 0;
  let loginMessage = "";

  const flow = createAuthSessionFlow({
    windowRef,
    documentRef,
    app,
    supabaseClient,
    setSession(value) {
      sessions.push(value);
    },
    render: async () => {
      renderCount += 1;
    },
    renderAuth: (_mode, message = "") => {
      loginMessage = message;
    },
    resetLoginState: () => {},
    withOperationTimeout: (value) => value,
    authCallback: (message) => `<p>${message}</p>`,
    authCallbackError: (message) => `<button id="auth-back-to-login">${message}</button>`,
    passwordResetRequest: () => "<form id=\"password-reset-request-form\"></form>",
    passwordRecovery: ({ ready }) => `<form id="password-recovery-form">${ready}</form><button id="auth-back-to-login"></button><button id="auth-send-new-reset"></button>`,
    passwordRecoveryParamsFromUrl: () => ({ accessToken: "a", refreshToken: "r" }),
  });

  assert.equal(flow.authCallbackRedirectUrl(), "https://loufish727.github.io/MaintainOps/auth/callback/");
  assert.equal(flow.passwordResetRedirectUrl(), "https://loufish727.github.io/MaintainOps/");

  await flow.startAuthCallback({ code: "abc" });
  assert.equal(sessions.at(-1).user.id, "code-user");
  assert.equal(renderCount, 1);
  assert.match(app.innerHTML, /Verification complete/);
  assert.equal(calls.at(-1)[0], "replaceState");

  await flow.startAuthCallback({ accessToken: "a", refreshToken: "r" });
  assert.equal(sessions.at(-1).user.id, "hash-user");
  assert.equal(renderCount, 2);

  await flow.startAuthCallback({ errorDescription: "Expired link" });
  assert.match(app.innerHTML, /Expired link/);
  assert.ok(documentRef.elements.get("#auth-back-to-login").listeners.click);

  await flow.startPasswordRecovery({ accessToken: "a", refreshToken: "r" });
  assert.match(app.innerHTML, /true/);
  assert.ok(documentRef.elements.get("#password-recovery-form").listeners.submit);

  await flow.startPasswordRecovery({});
  assert.match(app.innerHTML, /false/);

  flow.renderPasswordRecovery({ ready: true });
  documentRef.elements.get("#auth-back-to-login").listeners.click();
  assert.equal(loginMessage, "");

  console.log("auth session flow smoke passed");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
