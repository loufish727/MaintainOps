const assert = require("node:assert/strict");

global.window = {};

const {
  BOLT_REFERENCE,
  UNIT_GROUPS,
  WRENCH_REFERENCE,
  boltGaugeReading,
  bindBoltGaugeEvents,
  bindConversionEvents,
  conversionResultText,
  nearestBoltSize,
  nearestWrenchSize,
} = require("../../src/utils/conversions.js");
const { createConversionDisplayHelpers } = require("../../src/render/conversionDisplay.js");

assert.equal(conversionResultText("length", 12, "in", "cm"), "30.48 Centimeters");
assert.equal(conversionResultText("area", 100, "sqft", "sqm"), "9.2903 Square meters");
assert.equal(conversionResultText("weight", 10, "lb", "kg"), "4.5359 Kilograms");
assert.equal(conversionResultText("temperature", 212, "f", "c"), "100 Celsius");
assert.equal(BOLT_REFERENCE.length, 57);
assert.equal(WRENCH_REFERENCE.length, 17);
assert.equal(BOLT_REFERENCE.find((row) => row.inch === "1/4")?.metric, "M6");
assert.equal(nearestBoltSize(0.251)?.inch, "1/4");
assert.equal(nearestBoltSize(1.49)?.inch, "1-1/2");
assert.equal(nearestWrenchSize(0.749)?.thread, "1/2");
assert.equal(boltGaugeReading(24, 96)?.closest?.inch, "1/4");
assert.equal(boltGaugeReading(72, 96, "wrench")?.closest?.thread, "1/2");

const helpers = createConversionDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  conversionGroups: UNIT_GROUPS,
  boltReference: BOLT_REFERENCE,
  wrenchReference: WRENCH_REFERENCE,
  conversionResultText,
});

const html = helpers.renderConversionsPanel();
assert.match(html, /data-conversion-group="length"/);
assert.match(html, /data-conversion-group="area"/);
assert.match(html, /<summary class="conversion-card-heading">/);
assert.match(html, /Bolt Size Reference/);
assert.match(html, /data-bolt-gauge/);
assert.match(html, /bolt-gauge-card/);
assert.match(html, /data-bolt-gauge-diameter/);
assert.match(html, /Common Inch Thread Reference/);
assert.match(html, /data-bolt-size-row="1\/4"/);
assert.match(html, /Thread \/ Nut ID/);
assert.match(html, /Head \/ Wrench/);
assert.match(html, /Common Wrench \/ Head Size Reference/);
assert.match(html, /data-wrench-size-row="1\/2"/);
assert.match(html, /bolt-reference-table/);
assert.match(html, /not interchangeable by diameter alone/);

function createField(value) {
  return {
    value,
    listeners: {},
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
  };
}

const input = createField("12");
const from = createField("in");
const to = createField("cm");
const output = { textContent: "" };
const swap = createField("");
const lookup = {
  "[data-conversion-input]": input,
  "[data-conversion-from]": from,
  "[data-conversion-to]": to,
  "[data-conversion-output]": output,
  "[data-conversion-swap]": swap,
};

const card = {
  dataset: { conversionGroup: "length" },
  querySelector(selector) {
    return lookup[selector] || null;
  },
};
const documentRef = {
  querySelectorAll(selector) {
    return selector === "[data-conversion-card]" ? [card] : [];
  },
};

bindConversionEvents({ documentRef });
assert.equal(output.textContent, "30.48 Centimeters");

input.value = "24";
input.listeners.input();
assert.equal(output.textContent, "60.96 Centimeters");

swap.listeners.click();
assert.equal(from.value, "cm");
assert.equal(to.value, "in");
assert.equal(output.textContent, "9.4488 Inches");

const gaugeDiameter = createField("24");
const gaugeCalibration = createField("96");
const threadMode = { value: "thread", checked: true, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const wrenchMode = { value: "wrench", checked: false, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const gaugeOutput = { textContent: "" };
const gaugeHelp = { textContent: "" };
const highlightedRows = {};
const highlightedWrenchRows = {};
const boltRows = ["#10", "1/4", "1"].map((size) => ({
  dataset: { boltSizeRow: size },
  classList: {
    toggle(className, active) {
      if (className === "bolt-reference-active") highlightedRows[size] = active;
    },
  },
}));
const wrenchRows = ["1/4", "1/2", "1"].map((thread) => ({
  dataset: { wrenchSizeRow: thread },
  classList: {
    toggle(className, active) {
      if (className === "bolt-reference-active") highlightedWrenchRows[thread] = active;
    },
  },
}));
const gaugeLookup = {
  "[data-bolt-gauge-card]": { addEventListener() {} },
  "[data-bolt-gauge-circle]": { style: {} },
  "[data-bolt-gauge-diameter]": gaugeDiameter,
  "[data-bolt-gauge-calibration]": gaugeCalibration,
  "[data-bolt-gauge-calibration-line]": { style: {} },
  "[data-bolt-gauge-output]": gaugeOutput,
  "[data-bolt-gauge-help]": gaugeHelp,
};
const gaugeElement = {
  querySelector(selector) {
    return gaugeLookup[selector] || null;
  },
  querySelectorAll(selector) {
    return selector === "[data-bolt-gauge-mode]" ? [threadMode, wrenchMode] : [];
  },
};
const gaugeDocument = {
  querySelectorAll(selector) {
    if (selector === "[data-bolt-gauge]") return [gaugeElement];
    if (selector === "[data-bolt-size-row]") return boltRows;
    if (selector === "[data-wrench-size-row]") return wrenchRows;
    return [];
  },
};
const storage = {
  values: {},
  getItem(key) { return this.values[key] || null; },
  setItem(key, value) { this.values[key] = value; },
};
bindBoltGaugeEvents({ documentRef: gaugeDocument, storage });
assert.match(gaugeOutput.textContent, /closest 1\/4 \/ M6/);
assert.equal(highlightedRows["1/4"], true);
assert.equal(highlightedRows["#10"], false);
assert.match(gaugeHelp.textContent, /bolt shaft/);

gaugeDiameter.value = "96";
gaugeDiameter.listeners.input();
assert.match(gaugeOutput.textContent, /closest 1 \/ M24/);
assert.equal(highlightedRows["1"], true);
assert.equal(highlightedRows["1/4"], false);

wrenchMode.checked = true;
threadMode.checked = false;
gaugeDiameter.value = "72";
wrenchMode.listeners.change();
assert.match(gaugeOutput.textContent, /closest 3\/4 wrench for 1\/2 thread/);
assert.equal(highlightedWrenchRows["1/2"], true);
assert.equal(highlightedRows["1"], false);
assert.match(gaugeHelp.textContent, /bolt head/);

console.log("conversions smoke passed");
