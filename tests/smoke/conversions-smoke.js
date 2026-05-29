const assert = require("node:assert/strict");

global.window = {};

const {
  BOLT_REFERENCE,
  UNIT_GROUPS,
  bindConversionEvents,
  conversionResultText,
} = require("../../src/utils/conversions.js");
const { createConversionDisplayHelpers } = require("../../src/render/conversionDisplay.js");

assert.equal(conversionResultText("length", 12, "in", "cm"), "30.48 Centimeters");
assert.equal(conversionResultText("area", 100, "sqft", "sqm"), "9.2903 Square meters");
assert.equal(conversionResultText("weight", 10, "lb", "kg"), "4.5359 Kilograms");
assert.equal(conversionResultText("temperature", 212, "f", "c"), "100 Celsius");
assert.equal(BOLT_REFERENCE.find((row) => row.inch === "1/4")?.metric, "M6");

const helpers = createConversionDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  conversionGroups: UNIT_GROUPS,
  boltReference: BOLT_REFERENCE,
  conversionResultText,
});

const html = helpers.renderConversionsPanel();
assert.match(html, /data-conversion-group="length"/);
assert.match(html, /data-conversion-group="area"/);
assert.match(html, /<summary class="conversion-card-heading">/);
assert.match(html, /Bolt Size Reference/);
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

console.log("conversions smoke passed");
