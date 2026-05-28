const assert = require("node:assert/strict");

global.window = {};

const { createMessageWorkflow } = require("../../src/workflows/messageWorkflow.js");

function createElement({ dataset = {}, formValues = {} } = {}) {
  const listeners = {};
  const button = { disabled: false, textContent: "", isConnected: true };
  return {
    dataset,
    formValues,
    addEventListener(type, handler) {
      listeners[type] = handler;
    },
    async dispatch(type) {
      await listeners[type]({ preventDefault() {}, currentTarget: this });
    },
    querySelector(selector) {
      if (selector === "button[type='submit']") return button;
      return null;
    },
    button,
  };
}

function createDocument(selectors) {
  const elements = new Map(Object.entries(selectors));
  return {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, { textContent: "" });
      return elements.get(selector);
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
  const query = {
    payload: null,
    patch: null,
    filters: [],
    insert(payload) {
      this.payload = payload;
      calls.push(["insert", table, payload]);
      return this;
    },
    update(patch) {
      this.patch = patch;
      calls.push(["update", table, patch]);
      return this;
    },
    upsert(payload, options) {
      calls.push(["upsert", table, payload, options]);
      return Promise.resolve({ error: null });
    },
    select() {
      return this;
    },
    single() {
      return Promise.resolve({ data: { id: "thread-1", ...this.payload }, error: null });
    },
    eq(column, value) {
      this.filters.push([column, value]);
      calls.push(["eq", table, column, value]);
      return this;
    },
    then(resolve) {
      resolve({ error: null });
    },
    catch() {
      return Promise.resolve({ error: null });
    },
  };
  return query;
}

(async () => {
  const threadForm = createElement({
    formValues: {
      thread_type: "team",
      title: "Pump issue",
      body: "Please review",
      work_order_id: "wo-1",
    },
  });
  const replyForm = createElement({
    dataset: { threadId: "thread-1" },
    formValues: { body: "On it" },
  });
  const documentRef = createDocument({
    "#message-thread-form": threadForm,
    "#message-reply-form": replyForm,
    "#message-thread-error": { textContent: "" },
    "#message-reply-error": { textContent: "" },
  });
  const calls = [];
  const state = {
    activeThread: "",
    composerWorkOrderId: "wo-1",
    composerOpen: true,
    messagesReady: true,
    linksReady: true,
    reads: {},
    notices: [],
    renders: 0,
  };

  const workflow = createMessageWorkflow({
    documentRef,
    FormDataCtor: FakeFormData,
    supabaseClient: () => ({ from: (table) => createQuery(table, calls) }),
    withOperationTimeout: (value) => value,
    isMissingColumnError: () => false,
    messageCenterErrorState: (error) => ({ message: error.message || String(error) }),
    warn: () => {},
    getSession: () => ({ user: { id: "user-1" } }),
    getActiveCompanyId: () => "company-1",
    getCompanyMembers: () => [{ user_id: "user-1" }, { user_id: "user-2" }],
    getMessagesReady: () => state.messagesReady,
    setMessagesReady: (value) => { state.messagesReady = value; },
    getMessageWorkOrderLinksReady: () => state.linksReady,
    setMessageWorkOrderLinksReady: (value) => { state.linksReady = value; },
    activeLocationDatabaseId: () => "location-1",
    setActiveMessageThreadId: (value) => { state.activeThread = value; },
    setMessageComposerWorkOrderId: (value) => { state.composerWorkOrderId = value; },
    setMessageComposerOpen: (value) => { state.composerOpen = value; },
    setMessageThreadRead: (threadId, readRow) => { state.reads[threadId] = readRow; },
    showNotice: (message) => { state.notices.push(message); },
    render: async () => { state.renders += 1; },
  });

  workflow.bindMessageWorkflowEvents();
  await threadForm.dispatch("submit");

  assert.equal(state.activeThread, "thread-1");
  assert.equal(state.composerWorkOrderId, "");
  assert.equal(state.composerOpen, false);
  assert.equal(state.reads["thread-1"].user_id, "user-1");
  assert.deepEqual(state.notices, ["Thread started."]);
  assert.equal(state.renders, 1);
  assert.ok(calls.some((call) => call[0] === "insert" && call[1] === "message_threads"));
  assert.ok(calls.some((call) => call[0] === "insert" && call[1] === "message_thread_members"));
  assert.ok(calls.some((call) => call[0] === "insert" && call[1] === "messages"));
  assert.ok(calls.some((call) => call[0] === "upsert" && call[1] === "message_reads"));

  await replyForm.dispatch("submit");
  assert.deepEqual(state.notices, ["Thread started.", "Message sent."]);
  assert.equal(state.renders, 2);

  assert.deepEqual(workflow.messageThreadMembersForType("direct", "user-2"), ["user-1", "user-2"]);

  console.log("message workflow smoke passed");
})();
