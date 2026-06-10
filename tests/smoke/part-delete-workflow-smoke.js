const assert = require("node:assert/strict");

global.window = {};

const { createPartDeleteWorkflow } = require("../../src/workflows/partDeleteWorkflow.js");

const calls = [];
const state = {
  activePartId: "part-1",
  notices: [],
  pendingDeletePartId: "",
  parts: [{ id: "part-1", name: "Bearing" }, { id: "linked", name: "Linked Part" }],
};
let confirmButton = null;

const workflow = createPartDeleteWorkflow({
  CSSRef: { escape: (value) => value },
  alertUser: (message) => calls.push(["alert", message]),
  assetPartRows: (id) => (id === "linked" ? [{ id: "asset-part-1" }] : []),
  canDeleteParts: () => true,
  deletePartRecord: async (id) => {
    calls.push(["deletePartRecord", id]);
    return { data: [{ id }], error: null };
  },
  documentRef: {
    querySelector(selector) {
      calls.push(["querySelector", selector]);
      if (selector.includes("permanent-delete-button")) return confirmButton;
      if (selector === "#part-delete-error") return { textContent: "" };
      return null;
    },
  },
  getPartDocumentsByPartId: () => ({ "part-1": [{ storage_path: "parts/doc.pdf" }] }),
  getParts: () => state.parts,
  getPendingDeletePartId: () => state.pendingDeletePartId,
  partUsageRows: () => [],
  removePartDocumentStorage: async (paths) => {
    calls.push(["removePartDocumentStorage", paths]);
    return { error: null };
  },
  render: async () => calls.push(["render"]),
  renderWorkspace: () => calls.push(["renderWorkspace"]),
  setActivePartId: (value) => {
    state.activePartId = value;
  },
  setPendingDeletePartId: (value) => {
    state.pendingDeletePartId = value;
  },
  showNotice: (message, tone = "success") => state.notices.push([message, tone]),
  verifyPartDeleted: async (id) => {
    calls.push(["verifyPartDeleted", id]);
    return { data: null, error: null };
  },
  withOperationTimeout: (promise) => promise,
});

workflow.requestDeletePart("part-1");
assert.equal(state.pendingDeletePartId, "part-1");
assert.equal(calls.some((call) => call[0] === "renderWorkspace"), true);

confirmButton = { disabled: false, textContent: "Permanently Delete" };
workflow.requestDeletePart("linked");
assert.equal(calls.some((call) => call[0] === "alert" && call[1].includes("linked to equipment")), true);

(async () => {
  await workflow.deletePart("part-1");

  assert.equal(confirmButton.disabled, true);
  assert.equal(calls.some((call) => call[0] === "removePartDocumentStorage" && call[1][0] === "parts/doc.pdf"), true);
  assert.equal(calls.some((call) => call[0] === "deletePartRecord" && call[1] === "part-1"), true);
  assert.equal(calls.some((call) => call[0] === "verifyPartDeleted" && call[1] === "part-1"), true);
  assert.equal(state.activePartId, null);
  assert.deepEqual(state.notices.at(-1), ["Part deleted.", "success"]);

  console.log("part delete workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
