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
  const inviteForm = createElement({
    formValues: { email: "new@example.com", role: "technician", default_location_id: "loc-1" },
  });
  const requestNotificationForm = createElement({
    formValues: { email: "notify@example.com", label: "Desk", location_id: "loc-1" },
  });
  const deleteRequestNotificationButton = createElement({
    dataset: { deleteRequestNotificationRecipient: "recipient-1" },
  });
  const documentRef = createDocument({
    "#add-member-form": memberForm,
    "[data-member-role]": [roleForm],
    "#profile-form": profileForm,
    "#team-invite-form": inviteForm,
    "#request-notification-recipient-form": requestNotificationForm,
    "[data-delete-request-notification-recipient]": [deleteRequestNotificationButton],
    "#profile-error": { textContent: "" },
    "#team-invite-error": { textContent: "" },
    "#request-notification-recipient-error": { textContent: "" },
  });
  const calls = [];
  const state = {
    notices: [],
    renders: 0,
    renderWorkspaceCount: 0,
    loadMembersCount: 0,
    loadTeamInvitesCount: 0,
    teamInvitesReady: true,
    requestNotificationRecipientsReady: true,
    requestNotificationRecipientError: "",
    pendingCancelInviteId: "invite-1",
    teamInviteCancelError: "old",
    loadRequestNotificationRecipientsCount: 0,
    inviteEmailerCalls: [],
  };

  const workflow = createTeamWorkflow({
    documentRef,
    FormDataCtor: FakeFormData,
    supabaseClient: () => ({
      from: (table) => createQuery(table, calls),
      rpc: (name, payload) => {
        calls.push(["rpc", name, payload]);
        return Promise.resolve({ data: name === "create_company_invite" ? "invite-1" : null, error: null });
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
    getRequestNotificationRecipientsReady: () => state.requestNotificationRecipientsReady,
    setRequestNotificationRecipientsReady: (value) => { state.requestNotificationRecipientsReady = value; },
    setRequestNotificationRecipientError: (value) => { state.requestNotificationRecipientError = value; },
    notifyTeamInviteEmailer: async (inviteId) => {
      state.inviteEmailerCalls.push(inviteId);
      return { data: { sent: 1 }, error: null, skipped: false };
    },
    setPendingCancelInviteId: (value) => { state.pendingCancelInviteId = value; },
    setTeamInviteCancelError: (value) => { state.teamInviteCancelError = value; },
    loadMembers: async () => { state.loadMembersCount += 1; },
    loadTeamInvites: async () => { state.loadTeamInvitesCount += 1; },
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

  await inviteForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "rpc" && call[1] === "create_company_invite"));
  assert.deepEqual(state.inviteEmailerCalls, ["invite-1"]);
  assert.equal(state.teamInviteCancelError, "");
  assert.equal(state.notices.at(-1)[0], "Invite created and email sent.");

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
