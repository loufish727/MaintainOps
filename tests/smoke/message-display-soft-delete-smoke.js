const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/messageDisplay.js");
const { createMessageDisplayHelpers } = window.MaintainOpsMessageDisplay;

const helpers = createMessageDisplayHelpers({
  getCurrentUserId: () => "user-1",
  teamMemberName: (id) => id === "user-1" ? "QA User" : "QA Teammate",
  initials: (name) => name.split(/\s+/).map((part) => part[0]).join(""),
  formatMessageTime: () => "Today",
  formatMessageDay: () => "Today",
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
});

const ownMessage = helpers.renderMessageBubble({
  id: "message-1",
  sender_id: "user-1",
  body: "Please review <script>",
  created_at: "2026-06-05T12:00:00Z",
});
assert.match(ownMessage, /data-delete-message="message-1"/);
assert.match(ownMessage, /Please review &lt;script&gt;/);

const deletedList = helpers.renderMessageList([{
  id: "message-2",
  sender_id: "user-1",
  body: "Transcript body remains in Supabase",
  deleted_at: "2026-06-05T12:05:00Z",
  created_at: "2026-06-05T12:00:00Z",
}]);
assert.match(deletedList, /No messages yet/);
assert.doesNotMatch(deletedList, /Message deleted/);
assert.doesNotMatch(deletedList, /Transcript body remains/);
assert.doesNotMatch(deletedList, /data-delete-message/);

const teammateMessage = helpers.renderMessageBubble({
  id: "message-3",
  sender_id: "user-2",
  body: "From teammate",
  created_at: "2026-06-05T12:00:00Z",
});
assert.doesNotMatch(teammateMessage, /data-delete-message/);

console.log("message display soft delete smoke passed");
