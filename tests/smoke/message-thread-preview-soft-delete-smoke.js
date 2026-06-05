const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/messageThreadButtonDisplay.js");

const { createMessageThreadButtonDisplayHelpers } = window.MaintainOpsMessageThreadButtonDisplay;

const helpers = createMessageThreadButtonDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  formatMessageTime: () => "Today",
  teamMemberName: () => "QA User",
  messageThreadScopeLabel: () => "Direct thread",
  unreadMessageCount: () => 0,
  getActiveMessageThreadId: () => "thread-1",
  getMessagesByThreadId: () => ({
    "thread-1": [
      { id: "message-1", sender_id: "user-1", body: "Visible prior message", created_at: "2026-06-05T12:00:00Z" },
      { id: "message-2", sender_id: "user-1", body: "Deleted transcript body", deleted_at: "2026-06-05T12:05:00Z", created_at: "2026-06-05T12:05:00Z" },
    ],
  }),
});

const html = helpers.renderMessageThreadButton({ id: "thread-1", title: "QA Thread" });
assert.match(html, /Visible prior message/);
assert.doesNotMatch(html, /Deleted transcript body/);
assert.doesNotMatch(html, /Message deleted/);

console.log("message thread preview soft delete smoke passed");
