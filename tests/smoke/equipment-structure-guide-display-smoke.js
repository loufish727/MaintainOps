const assert = require("node:assert/strict");

global.window = {};

const { createEquipmentStructureGuideDisplayHelpers } = require("../../src/render/equipmentStructureGuideDisplay.js");

const { renderEquipmentStructureGuide } = createEquipmentStructureGuideDisplayHelpers();
const html = renderEquipmentStructureGuide();

assert.match(html, /aria-label="Equipment structure guide"/);
assert.match(html, /Structure Guide/);
assert.match(html, /Primary/);
assert.match(html, /Forklift \/ Mobile Lift/);
assert.match(html, /Sub Equipment/);
assert.match(html, /Tooling \/ Setup/);
assert.match(html, /Component/);
assert.match(html, /Maintainable device or assembly within equipment/);
assert.match(html, /Part/);
assert.match(html, /Replaceable or stocked item/);
assert.match(html, /Shop Item/);
assert.match(html, /Standalone tool or support equipment/);
assert.match(html, /Primary = main machine/);
assert.match(html, /Part = replaceable or stocked item/);
assert.match(html, /Sub equipment can belong to a primary machine OR to another sub-equipment record\. It is not limited to one level\./);
assert.match(html, /Roll Former \(Primary\) &rarr; Decoiler \(Sub Equipment\) &rarr; Hydraulic System \(Sub Equipment\) &rarr; Hydraulic Pump \(Component\)/);
assert.match(html, /Related part: Hydraulic Hose, linked to the pump in Parts/);
assert.match(html, /they are not another equipment level/);
assert.equal((html.match(/<article>/g) || []).length, 7);
assert.doesNotMatch(html, /Major section under a primary|tracked piece|Standalone support asset/);
assert.match(html, /Roll former rule/);
assert.match(html, /station = position on the machine/);

console.log("equipment structure guide display smoke passed");
