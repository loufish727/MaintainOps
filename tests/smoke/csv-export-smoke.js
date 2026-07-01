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
    name: "10\u2019 Press Brake",
    asset_type: "machine",
    asset_code: "SN-100",
    manufacturer: "Engel",
    model: "RF-42",
    location_id: "loc-1",
    location: "Bay 1",
    status: "running",
  }, {
    id: "asset-3",
    name: "Back Gauge",
    asset_type: "component",
    parent_asset_id: "asset-4",
    asset_code: "BG-1",
    location_id: "loc-1",
    location: "Bay 1",
    status: "running",
  }, {
    id: "asset-4",
    name: "Brake Controls",
    asset_type: "secondary_machine",
    parent_asset_id: "asset-1",
    asset_code: "BC-1",
    location_id: "loc-1",
    location: "Bay 1",
    status: "running",
  }, {
    id: "asset-2",
    name: "Other plant shear",
    asset_type: "machine",
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
  assetTypeLabel: (type) => ({
    machine: "Primary",
    secondary_machine: "Sub Equipment",
    component: "Component",
  }[type] || type),
  assignmentLabel: () => "Louie",
  csvCell: (value) => `"${String(value ?? "").replaceAll('"', '""')}"`,
});

exportActiveSectionCsv();
assert.equal(link.download, "work-orders.csv");
assert.equal(clicks.some((call) => call[0] === "click" && call[1] === "work-orders.csv"), true);
assert.equal(urls[0].parts[0].charCodeAt(0), 0xfeff);
assert.match(urls[0].parts[0], /"Pump, leaking"/);

activeSection = "assets";
exportActiveSectionCsv();
assert.equal(link.download, "equipment.csv");
assert.equal(urls[1].parts[0].charCodeAt(0), 0xfeff);
assert.match(urls[1].parts[0], /equipment_type,name,parent_equipment,serial_number,manufacturer,model,picture_id,picture_count,picture_status/);
assert.match(urls[1].parts[0], /10\u2019 Press Brake/);
assert.match(urls[1].parts[0], /"Primary","10\u2019 Press Brake","","SN-100","Engel","RF-42","rollformer-front\.jpg","1","attached"/);
assert.doesNotMatch(urls[1].parts[0], /Other plant shear/);
assert.ok(urls[1].parts[0].indexOf("10\u2019 Press Brake") < urls[1].parts[0].indexOf("Brake Controls"));
assert.ok(urls[1].parts[0].indexOf("Brake Controls") < urls[1].parts[0].indexOf("Back Gauge"));

activeSection = "financial";
exportActiveSectionCsv();
assert.equal(link.download, "equipment-financial.csv");
assert.equal(urls[2].parts[0].charCodeAt(0), 0xfeff);
assert.match(urls[2].parts[0], /"Primary","10\u2019 Press Brake","","SN-100","Engel","RF-42","rollformer-front\.jpg","1","attached"/);

downloadCsv("custom.csv", [{ a: "one", b: "two" }]);
assert.equal(link.download, "custom.csv");
assert.deepEqual(alerts, []);

console.log("csv export smoke passed");
