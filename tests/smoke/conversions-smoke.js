const assert = require("node:assert/strict");

global.window = {};

const {
  BOLT_REFERENCE,
  UNIT_GROUPS,
  WRENCH_REFERENCE,
  boltGaugeReading,
  bindBoltGaugeEvents,
  bindConversionEvents,
  bindShopReferenceEvents,
  conversionResultText,
  nearestBoltSize,
  nearestWrenchSize,
} = require("../../src/utils/conversions.js");
const { createConversionDisplayHelpers } = require("../../src/render/conversionDisplay.js");

assert.equal(conversionResultText("length", 12, "in", "cm"), "30.48 Centimeters");
assert.equal(conversionResultText("area", 100, "sqft", "sqm"), "9.2903 Square meters");
assert.equal(conversionResultText("weight", 10, "lb", "kg"), "4.5359 Kilograms");
assert.equal(conversionResultText("temperature", 212, "f", "c"), "100 Celsius");
assert.equal(BOLT_REFERENCE.length, 100);
assert.equal(WRENCH_REFERENCE.length, 100);
assert.equal(BOLT_REFERENCE.find((row) => row.inch === "1/4")?.metric, "M6");
assert.equal(nearestBoltSize(0.251)?.inch, "1/4");
assert.equal(nearestBoltSize(1.49)?.inch, "1-1/2");
assert.equal(nearestBoltSize(3.6)?.inch, "3-1/2");
assert.equal(nearestWrenchSize(0.749)?.thread, "1/2");
assert.equal(nearestWrenchSize(6)?.thread, "4");
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
assert.match(html, /bolt-gauge-card-readout/);
assert.match(html, /data-bolt-gauge-diameter/);
assert.match(html, /data-bolt-gauge-size-lock/);
assert.match(html, /Lock size/);
assert.match(html, /Common Inch Thread Reference/);
assert.match(html, /100 rows/);
assert.match(html, /data-bolt-size-row="1\/4"/);
assert.match(html, /data-bolt-size-row="3-1\/2"/);
assert.match(html, /bolt-reference-detail/);
assert.match(html, /Thread \/ Nut ID/);
assert.match(html, /Head \/ Wrench/);
assert.match(html, /data-bolt-gauge-points/);
assert.match(html, /6 point hex/);
assert.match(html, /4 point square/);
assert.match(html, /8 point square/);
assert.match(html, /12 point socket/);
assert.match(html, /Common Wrench \/ Head Size Reference/);
assert.match(html, /data-wrench-size-row="1\/2"/);
assert.match(html, /data-wrench-size-row="4"/);
assert.match(html, /bolt-reference-table/);
assert.match(html, /not interchangeable by diameter alone/);
assert.match(html, /Shop Reference Charts/);
assert.match(html, /Drill \/ Tap Quick Reference/);
assert.match(html, /Wire Gauge Reference/);
assert.match(html, /Pipe \/ Tubing Reference/);
assert.match(html, /Belt Section Reference/);
assert.match(html, /Bearing Quick Reference/);
assert.match(html, /Roller Chain Reference/);
assert.match(html, /Oil \/ Grease Reference/);
assert.match(html, /Torque Reference/);
assert.match(html, /Fitting \/ Thread Reference/);
assert.match(html, /Hydraulic Hose Dash Reference/);
assert.match(html, /Socket \/ Wrench Close-Fit Reference/);
assert.match(html, /Sheet Metal Gauge Reference/);
assert.match(html, /Fastener Grade Marking Reference/);
assert.match(html, /O-Ring Size Reference/);
assert.match(html, /Shaft Seal Reference/);
assert.match(html, /NEMA Motor Frame Reference/);
assert.match(html, /Electrical Plug \/ Receptacle Reference/);
assert.match(html, /17 charts \/ 12 per page/);
assert.match(html, /Common field references, sorted alphabetically\. Favorites stay first\./);
assert.match(html, /Showing 1-12 of 17 - Page 1 of 2/);
assert.match(html, /data-shop-reference-page="prev"/);
assert.match(html, /data-shop-reference-page="next"/);
assert.match(html, /data-shop-reference-panel/);
assert.match(html, /data-shop-reference-card/);
assert.match(html, /data-shop-reference-favorite/);
assert.match(html, /shop-reference-card-grid/);
assert.ok(html.indexOf("Bearing Quick Reference") < html.indexOf("Belt Section Reference"));
assert.ok(html.indexOf("Belt Section Reference") < html.indexOf("Drill / Tap Quick Reference"));
assert.ok(html.indexOf("Torque Reference") < html.indexOf("Wire Gauge Reference"));
assert.match(html, /Drill \/ Tap Quick Reference[\s\S]*20 rows/);
assert.match(html, /Wire Gauge Reference[\s\S]*20 rows/);
assert.match(html, /Pipe \/ Tubing Reference[\s\S]*20 rows/);
assert.match(html, /Belt Section Reference[\s\S]*20 rows/);
assert.match(html, /Bearing Quick Reference[\s\S]*20 rows/);
assert.match(html, /Roller Chain Reference[\s\S]*20 rows/);
assert.match(html, /Oil \/ Grease Reference[\s\S]*20 rows/);
assert.match(html, /Torque Reference[\s\S]*20 rows/);
assert.match(html, /Fitting \/ Thread Reference[\s\S]*20 rows/);
assert.match(html, /Hydraulic Hose Dash Reference[\s\S]*20 rows/);
assert.match(html, /Socket \/ Wrench Close-Fit Reference[\s\S]*20 rows/);
assert.match(html, /Sheet Metal Gauge Reference[\s\S]*20 rows/);
assert.match(html, /Fastener Grade Marking Reference[\s\S]*20 rows/);
assert.match(html, /O-Ring Size Reference[\s\S]*20 rows/);
assert.match(html, /Shaft Seal Reference[\s\S]*20 rows/);
assert.match(html, /NEMA Motor Frame Reference[\s\S]*20 rows/);
assert.match(html, /Electrical Plug \/ Receptacle Reference[\s\S]*20 rows/);
assert.match(html, /<p class="shop-reference-note"><span aria-hidden="true">\*<\/span>/);
assert.match(html, /15 A branch \/ medium outdoor cord/);
assert.match(html, /RV TT-30/);
assert.match(html, /50 A RV 14-50/);
assert.match(html, /light indoor extension cord/);
assert.match(html, /heavy outdoor cord/);
assert.match(html, /electrical boxes and covers/);
assert.match(html, /plant air branches/);
assert.match(html, /shop fans and light conveyors/);
assert.match(html, /common pump and conveyor bearing/);
assert.match(html, /common conveyor and sprocket drive/);
assert.match(html, /general motor and conveyor bearings/);
assert.match(html, /structural brackets \/ bases/);
assert.match(html, /double-pitch conveyor/);
assert.match(html, /flat face O-ring/);
assert.match(html, /common hydraulic hose/);
assert.match(html, /1\/2 bolt heads/);
assert.match(html, /machine guards/);
assert.match(html, /SAE Grade 8/);
assert.match(html, /hydraulic glands/);
assert.match(html, /gear reducers/);
assert.match(html, /pumps and fans/);
assert.match(html, /RV 50A \/ range \/ EV/);

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
const calibrationLock = { checked: true, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const sizeLock = { checked: false, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const gaugePoints = createField("6");
const gaugeOutput = { textContent: "" };
const gaugeHelp = { textContent: "" };
const gaugeDataset = {};
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
  "[data-bolt-gauge-points]": gaugePoints,
  "[data-bolt-gauge-lock]": calibrationLock,
  "[data-bolt-gauge-size-lock]": sizeLock,
};
const gaugeElement = {
  dataset: gaugeDataset,
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
assert.equal(gaugeDataset.boltGaugeModeCurrent, "thread");
assert.equal(gaugeDataset.boltGaugePointsCurrent, "6");
assert.equal(gaugeDataset.boltGaugeSizeLocked, "false");
assert.equal(gaugeCalibration.disabled, true);
assert.equal(gaugeDiameter.disabled, false);
assert.equal(storage.values["maintainops.boltGaugeCalibrationLocked"], "true");
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
assert.match(gaugeHelp.textContent, /6-point head mode/);
assert.equal(gaugeDataset.boltGaugeModeCurrent, "wrench");
assert.equal(gaugeDataset.boltGaugePointsCurrent, "6");
assert.equal(highlightedWrenchRows["1/2"], true);
assert.equal(highlightedRows["1"], false);
assert.match(gaugeHelp.textContent, /across opposite flats/);

calibrationLock.checked = false;
calibrationLock.listeners.change();
assert.equal(gaugeCalibration.disabled, false);
assert.equal(storage.values["maintainops.boltGaugeCalibrationLocked"], "false");

sizeLock.checked = true;
sizeLock.listeners.change();
assert.equal(gaugeDiameter.disabled, true);
assert.equal(gaugeDataset.boltGaugeSizeLocked, "true");

gaugePoints.value = "4";
gaugePoints.listeners.change();
assert.match(gaugeHelp.textContent, /4-point head mode/);
assert.equal(gaugeDataset.boltGaugePointsCurrent, "4");

gaugePoints.value = "8";
gaugePoints.listeners.change();
assert.match(gaugeHelp.textContent, /8-point head mode/);
assert.equal(gaugeDataset.boltGaugePointsCurrent, "8");

const favoriteStorage = {
  values: { "maintainops.shopReferencePage": "2" },
  getItem(key) { return this.values[key] || null; },
  setItem(key, value) { this.values[key] = value; },
};
const favoriteGridOne = {
  children: [],
  set textContent(value) { if (value === "") this.children = []; },
  get textContent() { return ""; },
  appendChild(card) { this.children.push(card); },
  querySelectorAll(selector) { return selector === "[data-shop-reference-card]" ? this.children : []; },
};
function createFavoriteButton() {
  return {
    innerHTML: "",
    title: "",
    attributes: {},
    listeners: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    getAttribute(name) { return this.attributes[name]; },
    addEventListener(eventName, handler) { this.listeners[eventName] = handler; },
  };
}
function createReferenceCard(title) {
  const button = createFavoriteButton();
  return {
    dataset: { shopReferenceTitle: title },
    listeners: {},
    open: false,
    classList: { values: {}, toggle(name, active) { this.values[name] = active; } },
    querySelector(selector) { return selector === "[data-shop-reference-favorite]" ? button : null; },
    addEventListener(eventName, handler) { this.listeners[eventName] = handler; },
    removeAttribute(name) { if (name === "open") this.open = false; },
    button,
  };
}
const alphaCard = createReferenceCard("Alpha Reference");
const betaCard = createReferenceCard("Beta Reference");
const pageStatus = { textContent: "" };
const prevButton = { disabled: false, dataset: { shopReferencePage: "prev" }, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const nextButton = { disabled: false, dataset: { shopReferencePage: "next" }, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const shopPanel = {
  dataset: { shopReferencePageSize: "12" },
  querySelectorAll(selector) {
    if (selector === "[data-shop-reference-card]") return [betaCard, alphaCard];
    if (selector === "[data-shop-reference-page]") return [prevButton, nextButton];
    return [];
  },
  querySelector(selector) {
    if (selector === "[data-shop-reference-grid]") return favoriteGridOne;
    if (selector === "[data-shop-reference-page-status]") return pageStatus;
    if (selector === "[data-shop-reference-page=\"prev\"]") return prevButton;
    if (selector === "[data-shop-reference-page=\"next\"]") return nextButton;
    return null;
  },
};
const shopDocument = {
  querySelectorAll(selector) {
    return selector === "[data-shop-reference-panel]" ? [shopPanel] : [];
  },
};
bindShopReferenceEvents({ documentRef: shopDocument, storage: favoriteStorage });
assert.equal(favoriteGridOne.children[0], alphaCard);
assert.equal(favoriteGridOne.children[1], betaCard);
assert.equal(alphaCard.button.innerHTML, "&#9734;");
assert.equal(pageStatus.textContent, "Showing 1-2 of 2 - Page 1 of 1");
assert.equal(prevButton.disabled, true);
assert.equal(nextButton.disabled, true);

betaCard.button.listeners.click({ preventDefault() {}, stopPropagation() {} });
assert.equal(JSON.parse(favoriteStorage.values["maintainops.shopReferenceFavorites"])[0], "Beta Reference");
assert.equal(favoriteGridOne.children[0], betaCard);
assert.equal(betaCard.button.innerHTML, "&#9733;");
assert.equal(betaCard.classList.values["shop-reference-favorited"], true);
assert.equal(favoriteStorage.values["maintainops.shopReferencePage"], "1");

alphaCard.open = true;
betaCard.open = true;
betaCard.listeners.toggle();
assert.equal(alphaCard.open, false);
assert.equal(betaCard.open, true);
console.log("conversions smoke passed");
