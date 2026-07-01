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
let activeSection = "work";

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
  getActiveSection: () => activeSection,
  getWorkOrders: () => [{
    title: "Pump, leaking",
    status: "open",
    priority: "high",
    assets: { name: "Pump 1" },
  }],
  getAssets: () => [{
    id: "asset-1",
    name: "Roll former",
    asset_code: "SN-100",
    manufacturer: "Engel",
    model: "RF-42",
    location_id: "loc-1",
    location: "Bay 1",
    status: "running",
  }, {
    id: "asset-2",
    name: "Other plant shear",
    asset_code: "SN-200",
    location_id: "loc-2",
    location: "Bay 9",
    status: "running",
  }],
  getAssetDocumentsByAssetId: () => ({
    "asset-1": [
      { original_file_name: "rollformer-front.jpg", document_type: "machine_photo", content_type: "image/jpeg" },
      { original_file_name: "rollformer-manual.pdf", document_type: "manual", content_type: "application/pdf" },
    ],
  }),
  getMaintenanceRequests: () => [],
  getPreventiveSchedules: () => [],
  getParts: () => [],
  getProcedureTemplates: () => [],
  getCompanyMembers: () => [],
  getProfilesByUserId: () => ({}),
  matchesActiveLocation: (row) => row.location_id === "loc-1",
  assignmentLabel: () => "Louie",
  csvCell: (value) => `"${String(value ?? "").replaceAll('"', '""')}"`,
});

exportActiveSectionCsv();
assert.equal(link.download, "work-orders.csv");
assert.equal(clicks.some((call) => call[0] === "click" && call[1] === "work-orders.csv"), true);
assert.match(urls[0].parts[0], /"Pump, leaking"/);

activeSection = "assets";
exportActiveSectionCsv();
assert.equal(link.download, "equipment.csv");
assert.match(urls[1].parts[0], /serial_number,manufacturer,model,picture_id,picture_count,picture_status/);
assert.match(urls[1].parts[0], /"SN-100","Engel","RF-42","rollformer-front\.jpg","1","attached"/);
assert.doesNotMatch(urls[1].parts[0], /Other plant shear/);

downloadCsv("custom.csv", [{ a: "one", b: "two" }]);
assert.equal(link.download, "custom.csv");
assert.deepEqual(alerts, []);

console.log("csv export smoke passed");
