const assert = require("node:assert/strict");

global.window = {};

const { createEquipmentStructureGuideDisplayHelpers } = require("../../src/render/equipmentStructureGuideDisplay.js");

const { renderEquipmentStructureGuide } = createEquipmentStructureGuideDisplayHelpers();
const html = renderEquipmentStructureGuide();

assert.match(html, /aria-label="Equipment structure guide"/);
assert.match(html, /Structure Guide/);
assert.match(html, /Machine \/ Line/);
assert.match(html, /Sub-assembly/);
assert.match(html, /Tooling \/ Setup/);
assert.match(html, /Component/);
assert.match(html, /Machine sub-history/);
assert.match(html, /Part/);
assert.match(html, /Inventory item/);
assert.match(html, /Shop Item/);
assert.match(html, /Standalone support asset/);
assert.match(html, /part = inventory/);
assert.match(html, /Roll former rule/);
assert.match(html, /station = position on the machine/);

console.log("equipment structure guide display smoke passed");
