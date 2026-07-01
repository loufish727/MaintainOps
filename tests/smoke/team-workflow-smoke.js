const assert = require("node:assert/strict");

global.window = {};

const { createTeamWorkflow } = require("../../src/workflows/teamWorkflow.js");

function createElement({ dataset = {}, formValues = {}, selectorMap = {} } = {}) {
  const listeners = {};
  const button = { disabled: false, textContent: "", isConnected: true };
  return {
    dataset,
    formValues,
    selectorMap,
    addEventListener(type, handler) {
      listeners[type] = handler;
    },
    async dispatch(type) {
      await listeners[type]({ preventDefault() {}, currentTarget: this });
    },
    reset() {
      this.resetCalled = true;
    },
    querySelector(selector) {
      if (selector === "button[type='submit']") return button;
      return selectorMap[selector] || null;
    },
    button,
  };
}

function createDocument(selectors = {}) {
  const elements = new Map(Object.entries(selectors));
  return {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, { textContent: "" });
      return elements.get(selector);
    },
    querySelectorAll(selector) {
      const value = elements.get(selector);
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    },
  };
}

class FakeFormData {
  constructor(form) {
    this.values = form.formValues || {};
  }

  get(name) {
    return this.values[name] || "";
  }
}

function createQuery(table, calls) {
  return {
    insert(payload) {
      calls.push(["insert", table, payload]);
      return Promise.resolve({ error: null });
    },
    upsert(payload, options) {
      calls.push(["upsert", table, payload, options]);
      return Promise.resolve({ error: null });
    },
    delete() {
      calls.push(["delete", table]);
      return {
        eq(column, value) {
          calls.push(["eq", table, column, value]);
          return this;
        },
        then(resolve) {
          return Promise.resolve({ error: null }).then(resolve);
        },
      };
    },
  };
}

(async () => {
  const memberForm = createElement({ formValues: { user_id: "user-2", role: "technician" } });
  const roleForm = createElement({ dataset: { memberRole: "user-2" }, formValues: { role: "manager" } });
  const mobileTechInput = { checked: true };
  const profileForm = createElement({
    formValues: { full_name: "QA User" },
    selectorMap: { 'input[name="mobile_tech"]': mobileTechInput },
  });
  const passwordChangeForm = createElement({
    formValues: { password: "newPassword1", confirmPassword: "newPassword1" },
  });
  const inviteForm = createElement({
    formValues: { email: "new@example.com", role: "technician", default_location_id: "loc-1" },
  });
  const inviteLinkForm = createElement({
    formValues: { role: "technician", default_location_id: "loc-1" },
  });
  const requestNotificationForm = createElement({
    formValues: { email: "notify@example.com", label: "Desk", location_id: "loc-1" },
  });
  const deleteRequestNotificationButton = createElement({
    dataset: { deleteRequestNotificationRecipient: "recipient-1" },
  });
  const revokeInviteLinkButton = createElement({
    dataset: { revokeInviteLink: "link-1" },
  });
  const keepInviteLinkButton = createElement();
  const confirmRevokeInviteLinkButton = createElement({
    dataset: { confirmRevokeInviteLink: "link-1" },
  });
  const documentRef = createDocument({
    "#add-member-form": memberForm,
    "[data-member-role]": [roleForm],
    "#profile-form": profileForm,
    "#password-change-form": passwordChangeForm,
    "#team-invite-form": inviteForm,
    "#team-invite-link-form": inviteLinkForm,
    "[data-revoke-invite-link]": [revokeInviteLinkButton],
    "[data-revoke-invite-link-cancel]": [keepInviteLinkButton],
    "[data-confirm-revoke-invite-link]": [confirmRevokeInviteLinkButton],
    "#request-notification-recipient-form": requestNotificationForm,
    "[data-delete-request-notification-recipient]": [deleteRequestNotificationButton],
    "#profile-error": { textContent: "" },
    "#password-change-error": { textContent: "" },
    "#team-invite-error": { textContent: "" },
    "#team-invite-link-error": { textContent: "" },
    "#request-notification-recipient-error": { textContent: "" },
  });
  const calls = [];
  const state = {
    notices: [],
    renders: 0,
    renderWorkspaceCount: 0,
    loadMembersCount: 0,
    loadTeamInvitesCount: 0,
    loadTeamInviteLinksCount: 0,
    teamInvitesReady: true,
    teamInviteLinksReady: true,
    teamInviteLinkError: "",
    requestNotificationRecipientsReady: true,
    requestNotificationRecipientError: "",
    pendingCancelInviteId: "invite-1",
    teamInviteCancelError: "old",
    loadRequestNotificationRecipientsCount: 0,
  };

  const workflow = createTeamWorkflow({
    documentRef,
    FormDataCtor: FakeFormData,
    supabaseClient: () => ({
      auth: {
        updateUser: (payload) => {
          calls.push(["auth.updateUser", payload]);
          return Promise.resolve({ error: null });
        },
      },
      from: (table) => createQuery(table, calls),
      rpc: (name, payload) => {
        calls.push(["rpc", name, payload]);
        return Promise.resolve({ error: null });
      },
    }),
    withOperationTimeout: (value) => value,
    isMissingColumnError: () => false,
    isColumnSchemaError: () => false,
    alertUser: (message) => { throw new Error(message); },
    getSession: () => ({ user: { id: "user-1" } }),
    getActiveCompanyId: () => "company-1",
    getProfilesByUserId: () => ({ "user-1": { mobile_tech: false } }),
    canAdministerTeamRoles: () => true,
    getTeamInvitesReady: () => state.teamInvitesReady,
    setTeamInvitesReady: (value) => { state.teamInvitesReady = value; },
    getTeamInviteLinksReady: () => state.teamInviteLinksReady,
    setTeamInviteLinksReady: (value) => { state.teamInviteLinksReady = value; },
    setTeamInviteLinkError: (value) => { state.teamInviteLinkError = value; },
    getRequestNotificationRecipientsReady: () => state.requestNotificationRecipientsReady,
    setRequestNotificationRecipientsReady: (value) => { state.requestNotificationRecipientsReady = value; },
    setRequestNotificationRecipientError: (value) => { state.requestNotificationRecipientError = value; },
    setPendingCancelInviteId: (value) => { state.pendingCancelInviteId = value; },
    setPendingRevokeInviteLinkId: (value) => { state.pendingRevokeInviteLinkId = value; },
    setTeamInviteCancelError: (value) => { state.teamInviteCancelError = value; },
    loadMembers: async () => { state.loadMembersCount += 1; },
    loadTeamInvites: async () => { state.loadTeamInvitesCount += 1; },
    loadTeamInviteLinks: async () => { state.loadTeamInviteLinksCount += 1; },
    loadRequestNotificationRecipients: async () => { state.loadRequestNotificationRecipientsCount += 1; },
    showNotice: (message, tone = "success") => { state.notices.push([message, tone]); },
    render: async () => { state.renders += 1; },
    renderWorkspace: () => { state.renderWorkspaceCount += 1; },
  });

  workflow.bindTeamWorkflowEvents();
  await memberForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "insert" && call[1] === "company_members"));
  assert.equal(state.renders, 1);

  await roleForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "rpc" && call[1] === "update_company_member_role"));
  assert.equal(state.loadMembersCount, 1);
  assert.equal(state.notices.at(-1)[0], "Role saved.");

  await profileForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "upsert" && call[1] === "profiles"));
  assert.equal(state.notices.at(-1)[0], "Profile saved.");

  await passwordChangeForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "auth.updateUser" && call[1].password === "newPassword1"));
  assert.equal(passwordChangeForm.resetCalled, true);
  assert.equal(state.notices.at(-1)[0], "Password updated.");

  const shortPasswordForm = createElement({
    formValues: { password: "short", confirmPassword: "short" },
  });
  const shortPasswordError = { textContent: "" };
  const shortWorkflow = createTeamWorkflow({
    documentRef: createDocument({ "#password-change-error": shortPasswordError }),
    FormDataCtor: FakeFormData,
    supabaseClient: () => ({
      auth: {
        updateUser: () => {
          throw new Error("short password should not call Supabase");
        },
      },
    }),
    withOperationTimeout: (value) => value,
    showNotice: () => {},
  });
  await shortWorkflow.updateMyPassword({ preventDefault() {}, currentTarget: shortPasswordForm });
  assert.equal(shortPasswordError.textContent, "Password must be at least 8 characters.");

  const mismatchPasswordForm = createElement({
    formValues: { password: "newPassword1", confirmPassword: "newPassword2" },
  });
  const mismatchPasswordError = { textContent: "" };
  const mismatchWorkflow = createTeamWorkflow({
    documentRef: createDocument({ "#password-change-error": mismatchPasswordError }),
    FormDataCtor: FakeFormData,
    supabaseClient: () => ({
      auth: {
        updateUser: () => {
          throw new Error("mismatched password should not call Supabase");
        },
      },
    }),
    withOperationTimeout: (value) => value,
    showNotice: () => {},
  });
  await mismatchWorkflow.updateMyPassword({ preventDefault() {}, currentTarget: mismatchPasswordForm });
  assert.equal(mismatchPasswordError.textContent, "Passwords do not match.");

  await inviteForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "rpc" && call[1] === "create_company_invite"));
  assert.equal(state.teamInviteCancelError, "");
  assert.equal(state.notices.at(-1)[0], "Invite created.");

  await inviteLinkForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "rpc" && call[1] === "create_company_invite_link"));
  assert.equal(state.teamInviteLinkError, "");
  assert.equal(state.loadTeamInviteLinksCount, 1);
  assert.equal(state.notices.at(-1)[0], "Join link created.");

  await revokeInviteLinkButton.dispatch("click");
  assert.equal(state.pendingRevokeInviteLinkId, "link-1");
  await keepInviteLinkButton.dispatch("click");
  assert.equal(state.pendingRevokeInviteLinkId, null);
  await confirmRevokeInviteLinkButton.dispatch("click");
  assert.ok(calls.some((call) => call[0] === "rpc" && call[1] === "revoke_company_invite_link"));
  assert.equal(state.pendingRevokeInviteLinkId, null);
  assert.equal(state.loadTeamInviteLinksCount, 2);
  assert.equal(state.notices.at(-1)[0], "Join link revoked.");

  await requestNotificationForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "insert" && call[1] === "request_notification_recipients" && call[2].email === "notify@example.com"));
  assert.equal(state.loadRequestNotificationRecipientsCount, 1);
  assert.equal(state.notices.at(-1)[0], "Request email recipient saved.");

  await deleteRequestNotificationButton.dispatch("click");
  assert.ok(calls.some((call) => call[0] === "delete" && call[1] === "request_notification_recipients"));
  assert.equal(state.loadRequestNotificationRecipientsCount, 2);
  assert.equal(state.notices.at(-1)[0], "Request email recipient removed.");

  const renderWorkspaceCountBeforeCancel = state.renderWorkspaceCount;
  await workflow.cancelTeamInvite("invite-1");
  assert.equal(state.pendingCancelInviteId, null);
  assert.equal(state.loadTeamInvitesCount, 1);
  assert.equal(state.renderWorkspaceCount, renderWorkspaceCountBeforeCancel + 1);
  assert.equal(state.notices.at(-1)[0], "Invite canceled.");

  console.log("team workflow smoke passed");
})();
