const assert = require("node:assert/strict");

global.window = {};

const { createCsvExportHelpers } = require("../../src/utils/csvExport.js");

const clicks = [];
const link = {
  href: "",
  download: "",
  click() {
    clicks.push(["click", this.download]);
  },
  remove() {
    clicks.push(["remove"]);
  },
};
const alerts = [];
const urls = [];

const { exportActiveSectionCsv, downloadCsv } = createCsvExportHelpers({
  documentRef: {
    body: {
      appendChild(node) {
        clicks.push(["append", node.download]);
      },
    },
    createElement(tag) {
      assert.equal(tag, "a");
      return link;
    },
  },
  URLRef: {
    createObjectURL(blob) {
      urls.push(blob);
      return "blob://csv";
    },
    revokeObjectURL(url) {
      clicks.push(["revoke", url]);
    },
  },
  BlobCtor: class FakeBlob {
    constructor(parts, options) {
      this.parts = parts;
      this.options = options;
    }
  },
  alertRef: (message) => alerts.push(message),
  getActiveSection: () => "work",
  getWorkOrders: () => [{
    title: "Pump, leaking",
    status: "open",
    priority: "high",
    assets: { name: "Pump 1" },
  }],
  getAssets: () => [],
  getMaintenanceRequests: () => [],
  getPreventiveSchedules: () => [],
  getParts: () => [],
  getProcedureTemplates: () => [],
  getCompanyMembers: () => [],
  getProfilesByUserId: () => ({}),
  assignmentLabel: () => "Louie",
  csvCell: (value) => `"${String(value ?? "").replaceAll('"', '""')}"`,
});

exportActiveSectionCsv();
assert.equal(link.download, "work-orders.csv");
assert.equal(clicks.some((call) => call[0] === "click" && call[1] === "work-orders.csv"), true);
assert.match(urls[0].parts[0], /"Pump, leaking"/);

downloadCsv("custom.csv", [{ a: "one", b: "two" }]);
assert.equal(link.download, "custom.csv");
assert.deepEqual(alerts, []);

console.log("csv export smoke passed");
