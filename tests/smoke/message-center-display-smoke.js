const assert = require("node:assert/strict");

global.window = {};

const { createMessageCenterDisplayHelpers } = require("../../src/render/messageCenterDisplay.js");

const threads = Array.from({ length: 13 }, (_, index) => ({
  id: `thread-${index + 1}`,
  title: `Line ${index + 1} update`,
  thread_type: "company",
  work_order_id: index === 0 ? "wo-1" : "",
}));
const thread = threads[0];

const { renderMessageCenter } = createMessageCenterDisplayHelpers({
  getMessagesReady: () => true,
  getMessageThreads: () => threads,
  getActiveMessageThreadId: () => "thread-1",
  getMessagesByThreadId: () => ({ "thread-1": [{ body: "Checked line", author_id: "user-2" }] }),
  getWorkOrders: () => [{ id: "wo-1", title: "Hydraulic Leak", status: "open" }],
  getMessageComposerWorkOrderId: () => "wo-1",
  getMessageComposerOpen: () => true,
  getCompanyMembers: () => [
    { user_id: "user-1" },
    { user_id: "user-2" },
  ],
  getSession: () => ({ user: { id: "user-1" } }),
  getMessageWorkOrderLinksReady: () => true,
  getMessageSearchQuery: () => "line",
  getMessageThreadFilter: () => "unread",
  getMessageThreadsPage: () => 1,
  LIST_ITEMS_PER_PAGE: 12,
  filteredMessageThreads: () => threads,
  totalUnreadMessages: () => 2,
  teamMemberName: (id) => (id === "user-2" ? "QA Teammate" : "QA User"),
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  messageComposerScopeNote: (type) => type === "location" ? "Only the current location can see this." : "Direct thread.",
  recentMessageLinkWorkOrders: () => [{ id: "wo-1", title: "Hydraulic Leak", status: "open" }],
  statusLabel: (status) => status,
  renderMessageThreadButton: (row) => `<button data-open-message-thread="${row.id}">${row.title}</button>`,
  messageThreadScopeLabel: () => "Company thread",
  renderMessageList: (messages) => messages.map((message) => `<article>${message.body}</article>`).join(""),
  renderListPagination: (kind, totalCount, currentPage, totalPages) => `<nav data-page-kind="${kind}">${totalCount}:${currentPage}:${totalPages}</nav>`,
});

const { renderMessageCenter: renderReadOnlyMessageCenter } = createMessageCenterDisplayHelpers({
  getMessagesReady: () => true,
  getMessageThreads: () => threads,
  getActiveMessageThreadId: () => "thread-1",
  getMessagesByThreadId: () => ({ "thread-1": [{ body: "Checked line", author_id: "user-2" }] }),
  getWorkOrders: () => [{ id: "wo-1", title: "Hydraulic Leak", status: "open" }],
  getMessageComposerWorkOrderId: () => "wo-1",
  getMessageComposerOpen: () => true,
  getCompanyMembers: () => [
    { user_id: "user-1" },
    { user_id: "user-2" },
  ],
  getSession: () => ({ user: { id: "user-1" } }),
  getMessageWorkOrderLinksReady: () => true,
  getMessageSearchQuery: () => "line",
  getMessageThreadFilter: () => "unread",
  getMessageThreadsPage: () => 1,
  LIST_ITEMS_PER_PAGE: 12,
  filteredMessageThreads: () => threads,
  totalUnreadMessages: () => 2,
  teamMemberName: (id) => (id === "user-2" ? "QA Teammate" : "QA User"),
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  messageComposerScopeNote: (type) => type === "location" ? "Only the current location can see this." : "Direct thread.",
  recentMessageLinkWorkOrders: () => [{ id: "wo-1", title: "Hydraulic Leak", status: "open" }],
  statusLabel: (status) => status,
  renderMessageThreadButton: (row) => `<button data-open-message-thread="${row.id}">${row.title}</button>`,
  messageThreadScopeLabel: () => "Company thread",
  renderMessageList: (messages) => messages.map((message) => `<article>${message.body}</article>`).join(""),
  renderListPagination: (kind, totalCount, currentPage, totalPages) => `<nav data-page-kind="${kind}">${totalCount}:${currentPage}:${totalPages}</nav>`,
  canEditOperationalRecords: () => false,
});

const html = renderMessageCenter();

assert.match(html, /class="message-center"/);
assert.match(html, /id="message-thread-form"/);
assert.match(html, /id="message-thread-type"/);
assert.doesNotMatch(html, /Whole company/);
assert.match(html, /Current location/);
assert.match(html, /Direct message/);
assert.match(html, /Only the current location can see this\./);
assert.match(html, /QA Teammate/);
assert.match(html, /class="message-people-strip"/);
assert.match(html, /class="message-person-avatar"/);
assert.match(html, /data-message-person="user-2"/);
assert.match(html, /title="Message QA Teammate"/);
assert.match(html, /QT/);
assert.doesNotMatch(html, /data-message-person="user-1"/);
assert.match(html, /data-clear-message-work-link/);
assert.match(html, /id="message-search"/);
assert.match(html, /value="line"/);
assert.match(html, /data-message-filter="unread"/);
assert.match(html, /data-open-message-thread="thread-1"/);
assert.match(html, /data-open-message-thread="thread-12"/);
assert.doesNotMatch(html, /data-open-message-thread="thread-13"/);
assert.match(html, /data-page-kind="messages">13:1:2/);
assert.match(html, /data-open-linked-work-order="wo-1"/);
assert.match(html, /data-delete-message-thread="thread-1"/);
assert.match(html, /Delete Thread/);
assert.match(html, /id="message-reply-form"/);
assert.match(html, /data-thread-id="thread-1"/);
assert.match(html, /data-quick-reply="On it"/);

const readOnlyHtml = renderReadOnlyMessageCenter();
assert.match(readOnlyHtml, /class="message-center"/);
assert.match(readOnlyHtml, /data-open-message-thread="thread-1"/);
assert.match(readOnlyHtml, /Checked line/);
assert.doesNotMatch(readOnlyHtml, /id="message-thread-form"/);
assert.doesNotMatch(readOnlyHtml, /data-delete-message-thread="thread-1"/);
assert.doesNotMatch(readOnlyHtml, /id="message-reply-form"/);
assert.doesNotMatch(readOnlyHtml, /data-quick-reply="On it"/);

const unavailableRenderer = createMessageCenterDisplayHelpers({
  getMessagesReady: () => false,
}).renderMessageCenter;
assert.match(unavailableRenderer(), /step-next-message-center\.sql/);

console.log("message center display smoke passed");
