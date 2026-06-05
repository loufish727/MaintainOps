const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/partInventoryDisplay.js");

const { createPartInventoryDisplayHelpers } = window.MaintainOpsPartInventoryDisplay;

const parts = [
  { id: "part-3", name: "Z Bearing", sku: "Z", supplier_name: "McMaster", machine_note: "ASC Line", quantity_on_hand: 8, reorder_point: 2 },
  { id: "part-1", name: "A Bearing", sku: "A", supplier_name: "Grainger", machine_note: "MS200", quantity_on_hand: 8, reorder_point: 2 },
  { id: "part-2", name: "No Source", sku: "N", supplier_name: "", machine_note: "", quantity_on_hand: 8, reorder_point: 2 },
  { id: "part-4", name: "B Bearing", sku: "B", supplier_name: "Grainger", machine_note: "Roll Former", quantity_on_hand: 8, reorder_point: 2 },
];

function createHelpers(partSort = "default") {
  return createPartInventoryDisplayHelpers({
    getParts: () => parts,
    getPartInventoryFilter: () => "all",
    getPartSort: () => partSort,
    getPartSearchQuery: () => "",
    matchesActiveLocation: () => true,
  });
}

assert.deepEqual(createHelpers("default").filteredParts().map((part) => part.id), ["part-3", "part-1", "part-2", "part-4"]);
assert.deepEqual(createHelpers("source").filteredParts().map((part) => part.id), ["part-1", "part-4", "part-3", "part-2"]);
assert.deepEqual(createHelpers("source").partSourceOptions(), ["Grainger", "McMaster"]);

const machineSearchHelpers = createPartInventoryDisplayHelpers({
  getParts: () => parts,
  getPartInventoryFilter: () => "all",
  getPartSort: () => "default",
  getPartSearchQuery: () => "ms200",
  matchesActiveLocation: () => true,
});
assert.deepEqual(machineSearchHelpers.filteredParts().map((part) => part.id), ["part-1"]);

console.log("part inventory display smoke passed");
