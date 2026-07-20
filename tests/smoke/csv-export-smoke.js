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
    type: "reactive",
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
    name: "Auburn component",
    asset_type: "component",
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
  getLocations: () => [
    { id: "loc-1", name: "Salem, OR" },
    { id: "loc-2", name: "Auburn, WA" },
  ],
  getAssetFinancialsByAssetId: () => ({
    "asset-1": {
      asset_tag: "FA-100",
      acquisition_date: "2024-01-15",
      acquisition_cost: "25000.00",
      depreciation_method: "Straight-line",
      useful_life_years: "10",
      current_book_value: "21000.00",
      tax_jurisdiction: "Marion County",
      ownership_status: "owned",
      in_service_date: "2024-02-01",
      gl_account_code: "1600",
      cost_center: "Salem Production",
      finance_notes: "Reviewed for mid-year audit",
      needs_review: false,
      last_reviewed_at: "2026-07-01T12:00:00Z",
      reviewed_by: "8f6e618f-bf06-46a7-925b-1001d7d30228",
    },
  }),
  getAssetFinancials: () => [{
    id: "finance-archived",
    asset_id: null,
    archived_asset_name: "Deleted Salem Brake",
    archived_asset_type: "machine",
    archived_asset_code: "DEL-1",
    archived_manufacturer: "Pacific",
    archived_model: "PX",
    archived_location_id: "loc-1",
    archived_location: "Bay 4",
    asset_tag: "FA-DEL",
    ownership_status: "disposed",
    disposal_date: "2026-06-30",
  }],
  getMaintenanceRequests: () => [],
  getPreventiveSchedules: () => [],
  getParts: () => [],
  getProcedureTemplates: () => [],
  getCompanyMembers: () => [],
  getProfilesByUserId: () => ({
    "8f6e618f-bf06-46a7-925b-1001d7d30228": { full_name: "Steven Sickles", email: "steven.sickles@taylormetal.com" },
  }),
  matchesActiveLocation: (row) => row.location_id === "loc-1",
  assetTypeLabel: (type) => ({
    machine: "Primary",
    secondary_machine: "Sub Equipment",
    component: "Component",
  }[type] || type),
  workOrderTypeLabel: (type) => type === "reactive" ? "Corrective" : type,
  assignmentLabel: () => "Louie",
  csvCell: (value) => `"${String(value ?? "").replaceAll('"', '""')}"`,
});

exportActiveSectionCsv();
assert.equal(link.download, "work-orders.csv");
assert.equal(clicks.some((call) => call[0] === "click" && call[1] === "work-orders.csv"), true);
assert.equal(urls[0].parts[0].charCodeAt(0), 0xfeff);
assert.match(urls[0].parts[0], /"Pump, leaking"/);
assert.match(urls[0].parts[0], /"Corrective"/);
assert.doesNotMatch(urls[0].parts[0], /"reactive"/);

activeSection = "assets";
exportActiveSectionCsv();
assert.equal(link.download, "equipment.csv");
assert.equal(urls[1].parts[0].charCodeAt(0), 0xfeff);
assert.match(urls[1].parts[0], /equipment_type,name,parent_equipment,serial_number,manufacturer,model,picture_id,picture_count,picture_status,facility,area_department,status/);
assert.match(urls[1].parts[0], /10\u2019 Press Brake/);
assert.match(urls[1].parts[0], /"Primary","10\u2019 Press Brake","","SN-100","Engel","RF-42","rollformer-front\.jpg","1","attached","Salem, OR","Bay 1","running"/);
assert.doesNotMatch(urls[1].parts[0], /Auburn component/);
assert.ok(urls[1].parts[0].indexOf("10\u2019 Press Brake") < urls[1].parts[0].indexOf("Brake Controls"));
assert.ok(urls[1].parts[0].indexOf("Brake Controls") < urls[1].parts[0].indexOf("Back Gauge"));

activeSection = "financial";
exportActiveSectionCsv();
assert.equal(link.download, "equipment-financial.csv");
assert.equal(urls[2].parts[0].charCodeAt(0), 0xfeff);
assert.match(urls[2].parts[0], /operational_status,equipment_type,name,parent_equipment,facility/);
assert.match(urls[2].parts[0], /asset_tag,acquisition_date,acquisition_cost/);
assert.match(urls[2].parts[0], /"active","Primary","10\u2019 Press Brake","","Salem, OR","Bay 1"/);
assert.doesNotMatch(urls[2].parts[0], /"loc-1","Bay 1"/);
assert.ok(urls[2].parts[0].indexOf("Auburn component") < urls[2].parts[0].indexOf("10\u2019 Press Brake"));
assert.match(urls[2].parts[0], /"deleted","Primary","Deleted Salem Brake","","Salem, OR","Bay 4"/);
assert.match(urls[2].parts[0], /"FA-DEL"/);
assert.match(urls[2].parts[0], /"FA-100","2024-01-15","25000.00","Straight-line"/);
assert.match(urls[2].parts[0], /"Marion County","owned","2024-02-01"/);
assert.match(urls[2].parts[0], /"Steven Sickles"/);
assert.doesNotMatch(urls[2].parts[0], /8f6e618f-bf06-46a7-925b-1001d7d30228/);

downloadCsv("custom.csv", [{ a: "one", b: "two" }]);
assert.equal(link.download, "custom.csv");
assert.deepEqual(alerts, []);

console.log("csv export smoke passed");
