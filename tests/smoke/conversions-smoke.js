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
assert.match(html, /<span class="conversion-card-icon" aria-hidden="true">L<\/span>/);
assert.match(html, /<span class="conversion-card-icon" aria-hidden="true">T<\/span>/);
assert.match(html, /Bolt Size Reference/);
assert.match(html, /data-bolt-gauge/);
assert.match(html, /bolt-gauge-card/);
assert.match(html, /bolt-gauge-card-readout/);
assert.match(html, /data-bolt-gauge-diameter/);
assert.match(html, /data-bolt-gauge-size-lock/);
assert.match(html, /Lock size/);
assert.match(html, /bolt-gauge-screen-callout/);
assert.match(html, /<p class="bolt-gauge-screen-callout"><span aria-hidden="true">\*<\/span>PLACE THE ACTUAL BOLT, NUT, OR WRENCH HEAD DIRECTLY ON THE WHITE SCREEN CARD BELOW\.<\/p>/);
assert.match(html, /Common Inch Thread Reference/);
assert.match(html, /100 rows/);
assert.match(html, /data-bolt-size-row="1\/4"/);
assert.match(html, /data-bolt-size-row="3-1\/2"/);
assert.match(html, /bolt-reference-detail/);
assert.match(html, /data-bolt-gauge-points/);
assert.match(html, /SELECT HEAD \/ WRENCH/);
assert.match(html, /SELECT THREAD \/ NUT ID/);
assert.ok(html.indexOf("SELECT HEAD / WRENCH") < html.indexOf("SELECT THREAD / NUT ID"));
assert.match(html, /value="wrench" checked/);
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
assert.match(html, /Hydraulic Fluid Condition Reference/);
assert.match(html, /Socket \/ Wrench Close-Fit Reference/);
assert.match(html, /Sheet Metal Gauge Reference/);
assert.match(html, /Fastener Grade Marking Reference/);
assert.match(html, /O-Ring Size Reference/);
assert.match(html, /Shaft Seal Reference/);
assert.match(html, /NEMA Motor Frame Reference/);
assert.match(html, /Electrical Plug \/ Receptacle Reference/);
assert.match(html, /Common Sensor ID Reference/);
assert.match(html, /VFD Fault Quick Reference/);
assert.match(html, /Bearing Suffix ID Reference/);
assert.match(html, /Belt Code ID Reference/);
assert.match(html, /Chain Sprocket ID Reference/);
assert.match(html, /Metric Thread Pitch Reference/);
assert.match(html, /NPT Pipe Thread Reference/);
assert.match(html, /O-Ring Material Reference/);
assert.doesNotMatch(html, /PM Interval Starter Reference/);
assert.match(html, /Common Failure Symptom Reference/);
assert.match(html, /Bearing Symptom Reference/);
assert.match(html, /Belt Failure Pattern Reference/);
assert.match(html, /Chain \/ Sprocket Wear Reference/);
assert.match(html, /Pneumatic Cylinder Troubleshooting Reference/);
assert.match(html, /Hydraulic Leak \/ Failure Reference/);
assert.match(html, /Compressor Maintenance Reference/);
assert.match(html, /Pump Seal Failure Reference/);
assert.doesNotMatch(html, /Lockout \/ Tagout Checklist Reference/);
assert.doesNotMatch(html, /PPE Task Matrix Reference/);
assert.doesNotMatch(html, /Safety & LOTO/);
assert.match(html, /Extension Cord Load Reference/);
assert.match(html, /Industrial Wire Color Reference/);
assert.match(html, /Conduit Fill Quick Reference/);
assert.match(html, /IP \/ NEMA Enclosure Reference/);
assert.match(html, /Relay \/ Contactor Symbol Reference/);
assert.match(html, /PLC I\/O Voltage Reference/);
assert.match(html, /Diesel SPN \/ FMI Diagnostic Reference/);
assert.match(html, /Diesel Aftertreatment ID Reference/);
assert.match(html, /CNC G-Code Quick Reference/);
assert.match(html, /CNC M-Code Quick Reference/);
assert.match(html, /Machining Insert ID Reference/);
assert.match(html, /GD&T Symbol Quick Reference/);
assert.match(html, /Weld Symbol Quick Reference/);
assert.match(html, /Stick Electrode Reference/);
assert.match(html, /Industrial PLC Sourcing \/ Sinking Reference/);
assert.match(html, /Control Transformer Reference/);
assert.match(html, /77 charts \/ 12 per page/);
assert.match(html, /data-shop-reference-category-grid/);
assert.doesNotMatch(html, /shop-reference-top-strip/);
assert.doesNotMatch(html, /data-shop-reference-top=/);
assert.match(html, /data-shop-reference-kind-grid/);
assert.match(html, /data-shop-reference-kind="sizing-id"/);
assert.match(html, /data-shop-reference-kind="troubleshooting"/);
assert.match(html, /data-shop-reference-kind="codes-symbols"/);
assert.match(html, /data-shop-reference-kind="common-specs"/);
assert.match(html, /1\. Choose reference type/);
assert.match(html, /2\. Narrow by trade area/);
assert.match(html, /Sizing \/ ID/);
assert.match(html, /Troubleshooting/);
assert.match(html, /Codes \/ symbols/);
assert.match(html, /Common specs/);
assert.match(html, /data-shop-reference-category-group hidden/);
assert.match(html, /data-shop-reference-category=""/);
assert.match(html, /All trade areas/);
assert.match(html, /data-shop-reference-category="fasteners"/);
assert.match(html, /data-shop-reference-category="diesel-mobile"/);
assert.match(html, /data-shop-reference-category="machining-cnc"/);
assert.match(html, /data-shop-reference-category="fabrication"/);
assert.match(html, /data-shop-reference-active-category/);
assert.match(html, /data-shop-reference-active-category-label/);
assert.match(html, /Fasteners & Threads/);
assert.match(html, /Electrical & Controls/);
assert.match(html, /Diesel & Mobile/);
assert.match(html, /Machining & CNC/);
assert.match(html, /Fabrication & Welding/);
assert.match(html, /PM & Troubleshooting/);
assert.match(html, /data-shop-reference-back/);
assert.doesNotMatch(html, /<strong>0 charts<\/strong>/);
assert.match(html, /Fasteners & Threads[\s\S]*7 charts/);
assert.match(html, /Electrical & Controls[\s\S]*16 charts/);
assert.match(html, /Diesel & Mobile[\s\S]*4 charts/);
assert.match(html, /Machining & CNC[\s\S]*8 charts/);
assert.match(html, /Fabrication & Welding[\s\S]*6 charts/);
assert.match(html, /Search filters chart names, IDs, sizes, and notes\./);
assert.match(html, /Try 6205, NPT, M12, 5VX800, photoeye/);
assert.match(html, /Showing 1-12 of 77 - Page 1 of 7/);
assert.match(html, /data-shop-reference-page="prev"/);
assert.match(html, /data-shop-reference-page="next"/);
assert.match(html, /data-shop-reference-panel/);
assert.match(html, /data-shop-reference-card/);
assert.match(html, /data-shop-reference-kind="sizing-id"/);
assert.match(html, /data-shop-reference-favorite/);
assert.match(html, /data-shop-reference-search-input/);
assert.match(html, /data-shop-reference-empty/);
assert.match(html, /data-shop-reference-search="[^"]*6205/);
assert.match(html, /data-shop-reference-search="[^"]*5vx800/);
assert.match(html, /class="shop-reference-row-field" data-label="AWG"/);
assert.match(html, /class="shop-reference-row-field" data-label="Common use note"/);
assert.match(html, /shop-reference-row-high-signal/);
assert.match(html, /shop-reference-row-signal/);
assert.match(html, /Very common/);
assert.match(html, /<th>Verify by<\/th>/);
assert.match(html, /data-label="Verify by"[\s\S]*read hose layline/);
assert.match(html, /data-label="Verify by"[\s\S]*match class, volts, amps/);
assert.match(html, /data-label="Verify by"[\s\S]*measure bore \+ full code/);
assert.match(html, /data-label="Verify by"[\s\S]*read cord jacket marking/);
assert.match(html, /data-label="Verify by"[\s\S]*read code \+ OEM tree/);
assert.match(html, /data-label="Verify by"[\s\S]*dry run \+ active modal check/);
assert.match(html, /data-label="Verify by"[\s\S]*match insert code \+ holder/);
assert.match(html, /data-label="Verify by"[\s\S]*read drawing symbol\/tail/);
assert.match(html, /data-label="Verify by"[\s\S]*check module diagram/);
assert.match(html, /shop-reference-row-card/);
assert.match(html, /shop-reference-row-has-detail/);
assert.match(html, /shop-reference-line-detail/);
assert.match(html, /shop-reference-detail-panel/);
assert.match(html, /shop-reference-help-mark/);
assert.match(html, /Explain SPN/);
assert.doesNotMatch(html, /Details for row above:/);
assert.doesNotMatch(html, /Related chart/);
assert.match(html, /Mechanic 101/);
assert.match(html, /Common confusion/);
assert.match(html, /Senior tech note/);
assert.match(html, /Risk \/ signal/);
assert.match(html, /Source family/);
assert.match(html, /Example/);
assert.match(html, /identify the part family, then verify the exact marking, size, and application/);
assert.match(html, /SPN points to the suspect parameter or circuit family/);
assert.match(html, /The same SPN can lead to different tests depending on FMI/);
assert.match(html, /<strong>Verify first<\/strong>/);
assert.match(html, /SPN \/ suspect parameter number \/ identifies system or sensor \/ OEM mapping/);
assert.match(html, /SAE J1939, engine OEM service data, equipment service manuals/);
assert.match(html, /CNC control manual, machine builder documentation, setup sheet/);
assert.match(html, /AWS symbol\/procedure standards, WPS, filler manufacturer data/);
assert.match(html, /NEC\/NFPA 70, NEMA\/IEC standards, device datasheets/);
assert.match(html, /same code on another control, wrong active work offset, hidden modal state/);
assert.match(html, /wire size, fuse size, insulation rating, and run length all matter/);
assert.match(html, /wrench size is fastener head size, not bolt thread size/);
assert.match(html, /10mm is a high-frequency mechanic size/);
assert.match(html, /bearing bore, OD, width, suffix, seal style, and clearance all matter/);
assert.match(html, /14 AWG is only one sizing clue; fuse\/breaker size, copper vs aluminum, insulation rating, temperature, bundling, and run length all matter/);
assert.match(html, /14 AWG can be confused with nearby gauge sizes by sight/);
assert.match(html, /14 AWG is commonly associated with very common 15 A branch and medium cord size/);
assert.match(html, /10mm is close enough to some inch sizes to tempt a shortcut/);
assert.match(html, /10 mm is commonly reached for very common 10mm socket; frequent-loss size/);
assert.match(html, /6205 can match by bore while still being wrong by width, seal\/shield suffix, clearance, cage, or fit/);
assert.match(html, /6205 \(25 mm bore, 52 x 15 mm\) is commonly seen on very common pump, conveyor, and motor bearing/);
assert.match(html, /spark plug condition is a clue; compare all cylinders and confirm ignition, fuel, compression, heat range, and OEM plug spec/);
assert.match(html, /Dry carbon fouling[\s\S]*Common failure/);
assert.match(html, /Fuel wet fouling[\s\S]*Fuel-wet and oil-wet plugs can both look wet at a glance/);
assert.match(html, /Oil fouling[\s\S]*The new plug may foul again if oil control/);
assert.match(html, /Ash deposits[\s\S]*Ash deposits are dry crusty residue/);
assert.match(html, /Ash deposits[\s\S]*Check oil use, additives, fuel quality/);
assert.match(html, /Overheated \/ blistered[\s\S]*High consequence/);
const sparkStart = html.indexOf('data-shop-reference-title="Spark Plug Condition Reference"');
const sparkEnd = html.indexOf('data-shop-reference-title="Stick Electrode Reference"');
const sparkSection = html.slice(sparkStart, sparkEnd);
assert.ok(sparkStart > -1);
assert.ok(sparkEnd > sparkStart);
assert.match(sparkSection, /<span class="shop-reference-row-signal">Easy mix-up<\/span>Carbon tracking/);
assert.match(sparkSection, /<span class="shop-reference-row-signal">Very common<\/span>Worn electrode/);
assert.doesNotMatch(sparkSection, /Explain Normal/);
assert.match(sparkSection, /Explain Dry carbon fouling/);
assert.match(sparkSection, /Explain Ash deposits/);
assert.match(sparkSection, /Explain Overheated \/ blistered/);
assert.doesNotMatch(sparkSection, /Ash deposits:[\s\S]{0,120}plug appearance can be mistaken for final diagnosis/);
const hydraulicFluidStart = html.indexOf('data-shop-reference-title="Hydraulic Fluid Condition Reference"');
const hydraulicFluidEnd = html.indexOf('data-shop-reference-title="Hydraulic Hose Dash Reference"');
const hydraulicFluidSection = html.slice(hydraulicFluidStart, hydraulicFluidEnd);
assert.ok(hydraulicFluidStart > -1);
assert.ok(hydraulicFluidEnd > hydraulicFluidStart);
assert.match(hydraulicFluidSection, /<span class="shop-reference-row-signal">High consequence<\/span>Milky \/ cloudy oil/);
assert.match(hydraulicFluidSection, /<span class="shop-reference-row-signal">Common failure<\/span>Foam on surface/);
assert.match(hydraulicFluidSection, /<span class="shop-reference-row-signal">Easy mix-up<\/span>Air bubbles suspended/);
assert.match(hydraulicFluidSection, /Milky oil is often treated like normal color change/);
assert.match(hydraulicFluidSection, /Foam usually means air management trouble/);
assert.match(hydraulicFluidSection, /Entrained air is a pump and valve warning/);
assert.match(hydraulicFluidSection, /Varnish is a reliability clue/);
assert.doesNotMatch(hydraulicFluidSection, /Explain Clear \/ normal color/);
assert.match(hydraulicFluidSection, /Explain Milky \/ cloudy oil/);
assert.doesNotMatch(hydraulicFluidSection, /normal darkening vs failed oil, water haze vs air bubbles/);
const extensionCordStart = html.indexOf('data-shop-reference-title="Extension Cord Load Reference"');
const extensionCordEnd = html.indexOf('data-shop-reference-title="Fastener Grade Marking Reference"');
const extensionCordSection = html.slice(extensionCordStart, extensionCordEnd);
assert.ok(extensionCordStart > -1);
assert.ok(extensionCordEnd > extensionCordStart);
assert.match(extensionCordSection, /<span class="shop-reference-row-signal">Easy mix-up<\/span>16 AWG/);
assert.match(extensionCordSection, /<span class="shop-reference-row-signal">Very common<\/span>12 AWG/);
assert.match(extensionCordSection, /<span class="shop-reference-row-signal">High consequence<\/span>10 AWG/);
assert.match(extensionCordSection, /<span class="shop-reference-row-signal">Spec required<\/span>Outdoor cord/);
assert.match(extensionCordSection, /<span class="shop-reference-row-signal">Stock item<\/span>SOOW/);
assert.match(extensionCordSection, /extension cord choice depends on AWG, length, load amps/);
assert.match(extensionCordSection, /16 AWG cords look useful because they are common and light/);
assert.match(extensionCordSection, /12 AWG is the everyday heavy-cord size worth recognizing/);
assert.match(extensionCordSection, /Outdoor or jobsite use is a marking-and-protection check/);
assert.match(extensionCordSection, /SOOW is worth recognizing for portable equipment and tougher shop cords/);
assert.match(extensionCordSection, /UL flexible cord\/listing guidance/);
assert.doesNotMatch(extensionCordSection, /Explain 14 AWG/);
assert.match(extensionCordSection, /Explain 16 AWG/);
assert.match(html, /shop-reference-card-grid/);
assert.ok(html.indexOf('data-shop-reference-title="Bearing Quick Reference"') < html.indexOf('data-shop-reference-title="Belt Section Reference"'));
assert.ok(html.indexOf('data-shop-reference-title="Belt Section Reference"') < html.indexOf('data-shop-reference-title="Drill / Tap Quick Reference"'));
assert.ok(html.indexOf('data-shop-reference-title="Torque Reference"') < html.indexOf('data-shop-reference-title="Wire Gauge Reference"'));
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
assert.match(html, /Hydraulic Fluid Condition Reference[\s\S]*10 rows/);
assert.match(html, /Socket \/ Wrench Close-Fit Reference[\s\S]*20 rows/);
assert.match(html, /Sheet Metal Gauge Reference[\s\S]*20 rows/);
assert.match(html, /Fastener Grade Marking Reference[\s\S]*20 rows/);
assert.match(html, /O-Ring Size Reference[\s\S]*20 rows/);
assert.match(html, /Shaft Seal Reference[\s\S]*20 rows/);
assert.match(html, /NEMA Motor Frame Reference[\s\S]*20 rows/);
assert.match(html, /Electrical Plug \/ Receptacle Reference[\s\S]*20 rows/);
assert.match(html, /Common Sensor ID Reference[\s\S]*12 rows/);
assert.match(html, /Fuse Class Reference[\s\S]*12 rows/);
assert.match(html, /Bearing Suffix ID Reference[\s\S]*16 rows/);
assert.match(html, /Extension Cord Load Reference[\s\S]*10 rows/);
assert.match(html, /Common Failure Symptom Reference[\s\S]*8 rows/);
assert.match(html, /Pneumatic Cylinder Troubleshooting Reference[\s\S]*8 rows/);
assert.match(html, /Spark Plug Condition Reference[\s\S]*12 rows/);
assert.match(html, /Common Sensor ID Reference[\s\S]*Encoder/);
assert.match(html, /Fuse Class Reference[\s\S]*Class L/);
assert.match(html, /IP \/ NEMA Enclosure Reference[\s\S]*NEMA 6/);
assert.match(html, /Thermocouple \/ RTD Reference[\s\S]*4-wire RTD/);
assert.match(html, /Diesel SPN \/ FMI Diagnostic Reference[\s\S]*SPN/);
assert.match(html, /CNC G-Code Quick Reference[\s\S]*G54-G59/);
assert.match(html, /Machining Insert ID Reference[\s\S]*CNMG/);
assert.match(html, /Stick Electrode Reference[\s\S]*E7018/);
assert.match(html, /Industrial PLC Sourcing \/ Sinking Reference[\s\S]*PNP sensor/);
assert.match(html, /Common Sensor ID Reference[\s\S]*M12 connector size, M12 sensor body, and M12 thread language can get mixed together/);
assert.match(html, /Fuse Class Reference[\s\S]*Class CC and midget fuses can look similar by size/);
assert.match(html, /Photoeye Setup Reference[\s\S]*Transparent film or bottles can pass through ordinary photoeyes/);
assert.match(html, /Proximity Sensor Reference[\s\S]*An NPN sensor installed where a PNP input is expected/);
assert.match(html, /PLC I\/O Voltage Reference[\s\S]*A live 4 mA signal is not zero current/);
assert.match(html, /Industrial PLC Sourcing \/ Sinking Reference[\s\S]*PNP\/sourcing sensor into sinking input/);
assert.match(html, /Belt Section Reference[\s\S]*A 4L belt can be used where an A belt appears to fit/);
assert.match(html, /NEMA Motor Frame Reference[\s\S]*A 56-frame motor may physically fit while voltage/);
assert.match(html, /Motor Nameplate Reference[\s\S]*A dual-voltage motor can be wired wrong/);
assert.match(html, /VFD Fault Quick Reference[\s\S]*Overcurrent is often reset repeatedly/);
assert.match(html, /Gear Reducer ID Reference[\s\S]*A reducer with the same physical size but different ratio/);
assert.match(html, /Coupling Insert Reference[\s\S]*Nearby jaw coupling series can look similar/);
assert.match(html, /Diesel SPN \/ FMI Diagnostic Reference[\s\S]*Read SPN and FMI together/);
assert.match(html, /Diesel Aftertreatment ID Reference[\s\S]*ash load as a service-life and cleaning-history question/);
assert.match(html, /Diesel Fluid \/ Filter Reference[\s\S]*Water in fuel may show up as intermittent no-start/);
assert.match(html, /Heavy Equipment Battery \/ Charging Reference[\s\S]*Ohm checks can pass with no load/);
assert.match(html, /CNC G-Code Quick Reference[\s\S]*Running an inch program as metric/);
assert.match(html, /CNC M-Code Quick Reference[\s\S]*An M99 in the wrong place can make a program repeat unexpectedly/);
assert.match(html, /Machining Insert ID Reference[\s\S]*CNMG shape alone is not enough/);
assert.match(html, /GD&T Symbol Quick Reference/);
assert.match(html, /most gd&t mistakes start with the wrong datum setup/);
assert.match(html, /Weld Symbol Quick Reference[\s\S]*Arrow side and other side are one of the easiest ways/);
assert.match(html, /Stick Electrode Reference[\s\S]*storage and handling are part of the weld/);
assert.match(html, /MIG Wire \/ Shielding Gas Reference[\s\S]*If the weld changed after a cylinder swap/);
assert.match(html, /Plasma Cutting Reference[\s\S]*Piercing too low can destroy consumables/);
assert.match(html, /Fabrication Bend Reference[\s\S]*Changing V-die width can change the formed part/);
assert.match(html, /Structural Shape ID Reference[\s\S]*pipe size is nominal and schedule controls wall thickness/);
assert.match(html, /<p class="shop-reference-note"><span aria-hidden="true">\*<\/span>/);
assert.match(html, /very common 15 A branch and medium cord size/);
assert.match(html, /very common 20 A branch and heavy cord size/);
assert.match(html, /RV TT-30/);
assert.match(html, /common 50 A RV 14-50/);
assert.match(html, /extension cords \/ light machine leads/);
assert.match(html, /electrical boxes and covers/);
assert.match(html, /plant air branches/);
assert.match(html, /shop fans and light conveyors/);
assert.match(html, /very common pump, conveyor, and motor bearing/);
assert.match(html, /very common 10mm socket; frequent-loss size/);
assert.match(html, /common 19mm metric socket \/ 1\/2 bolt heads; verify full seat/);
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
const threadMode = { value: "thread", checked: false, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const wrenchMode = { value: "wrench", checked: true, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const calibrationLock = { checked: true, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const sizeLock = { checked: false, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const gaugePoints = createField("6");
const gaugeOutput = { textContent: "" };
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
assert.match(gaugeOutput.textContent, /wrench/);
assert.equal(gaugeDataset.boltGaugeModeCurrent, "wrench");
assert.equal(gaugeDataset.boltGaugePointsCurrent, "6");
assert.equal(gaugeDataset.boltGaugeSizeLocked, "false");
assert.equal(gaugeCalibration.disabled, true);
assert.equal(gaugeDiameter.disabled, false);
assert.equal(storage.values["maintainops.boltGaugeCalibrationLocked"], "true");
assert.equal(Object.values(highlightedWrenchRows).some(Boolean), false);
assert.equal(highlightedRows["1/4"], false);

threadMode.checked = true;
wrenchMode.checked = false;
gaugeDiameter.value = "96";
threadMode.listeners.change();
assert.match(gaugeOutput.textContent, /closest 1 \/ M24/);
assert.equal(gaugeDataset.boltGaugeModeCurrent, "thread");
assert.equal(highlightedRows["1"], true);
assert.equal(highlightedRows["1/4"], false);

wrenchMode.checked = true;
threadMode.checked = false;
gaugeDiameter.value = "72";
wrenchMode.listeners.change();
assert.match(gaugeOutput.textContent, /closest 3\/4 wrench for 1\/2 thread/);
assert.equal(gaugeDataset.boltGaugeModeCurrent, "wrench");
assert.equal(gaugeDataset.boltGaugePointsCurrent, "6");
assert.equal(highlightedWrenchRows["1/2"], true);
assert.equal(highlightedRows["1"], false);

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
assert.equal(gaugeDataset.boltGaugePointsCurrent, "4");

gaugePoints.value = "8";
gaugePoints.listeners.change();
assert.equal(gaugeDataset.boltGaugePointsCurrent, "8");

const favoriteStorage = {
  values: { "maintainops.shopReferencePage": "2" },
  getItem(key) { return this.values[key] || null; },
  setItem(key, value) { this.values[key] = value; },
};
const favoriteGridOne = {
  children: [],
  hidden: false,
  scrollCalls: [],
  set textContent(value) { if (value === "") this.children = []; },
  get textContent() { return ""; },
  appendChild(card) { this.children.push(card); },
  scrollIntoView(options) { this.scrollCalls.push(options); },
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
  const isBeta = title.includes("Beta");
  return {
    dataset: { shopReferenceTitle: title, shopReferenceCategory: isBeta ? "bearings-belts-chain" : "electrical", shopReferenceKind: isBeta ? "sizing-id" : "codes-symbols" },
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
const searchInput = { value: "", listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const emptyState = { hidden: true };
const kindGrid = {
  hidden: false,
  listeners: {},
  addEventListener(eventName, handler) { this.listeners[eventName] = handler; },
  contains(card) { return card === sizingKind || card === codesKind; },
  querySelectorAll(selector) {
    return selector === "[data-shop-reference-kind]" ? [sizingKind, codesKind] : [];
  },
};
const categoryGroup = { hidden: false };
const categoryGrid = {
  hidden: false,
  listeners: {},
  addEventListener(eventName, handler) { this.listeners[eventName] = handler; },
  contains(card) { return card === electricalCategory || card === bearingCategory; },
  querySelectorAll(selector) {
    return selector === "[data-shop-reference-category]" ? [electricalCategory, bearingCategory] : [];
  },
};
function createCategoryCard(id, label) {
  const countElement = { textContent: "" };
  return {
    dataset: { shopReferenceCategory: id },
    hidden: false,
    listeners: {},
    attributes: {},
    classList: { values: {}, toggle(name, active) { this.values[name] = active; } },
    closest(selector) { return selector === "[data-shop-reference-category]" ? this : null; },
    querySelector(selector) {
      if (selector === "span") return { textContent: label };
      if (selector === "strong") return countElement;
      return null;
    },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(eventName, handler) { this.listeners[eventName] = handler; },
    countElement,
  };
}
function createKindCard(id, label) {
  return {
    dataset: { shopReferenceKind: id },
    listeners: {},
    attributes: {},
    classList: { values: {}, toggle(name, active) { this.values[name] = active; } },
    closest(selector) { return selector === "[data-shop-reference-kind]" ? this : null; },
    querySelector(selector) { return selector === "span" ? { textContent: label } : null; },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(eventName, handler) { this.listeners[eventName] = handler; },
  };
}
const sizingKind = createKindCard("sizing-id", "Sizing / ID");
const codesKind = createKindCard("codes-symbols", "Codes / symbols");
const electricalCategory = createCategoryCard("electrical", "Electrical & Controls");
const bearingCategory = createCategoryCard("bearings-belts-chain", "Bearings, Belts & Chain");
const backButton = { hidden: true, textContent: "", listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const activeCategoryBanner = { hidden: true };
const activeCategoryLabel = { textContent: "" };
const prevButton = { disabled: false, dataset: { shopReferencePage: "prev" }, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const nextButton = { disabled: false, dataset: { shopReferencePage: "next" }, listeners: {}, addEventListener(eventName, handler) { this.listeners[eventName] = handler; } };
const shopPanel = {
  dataset: { shopReferencePageSize: "12" },
  querySelectorAll(selector) {
    if (selector === "[data-shop-reference-card]") return [betaCard, alphaCard];
    if (selector === "[data-shop-reference-page]") return [prevButton, nextButton];
    if (selector === "[data-shop-reference-kind]") return [sizingKind, codesKind];
    if (selector === "[data-shop-reference-category]") return [electricalCategory, bearingCategory];
    return [];
  },
  querySelector(selector) {
    if (selector === "[data-shop-reference-grid]") return favoriteGridOne;
    if (selector === "[data-shop-reference-kind-grid]") return kindGrid;
    if (selector === "[data-shop-reference-category-group]") return categoryGroup;
    if (selector === "[data-shop-reference-category-grid]") return categoryGrid;
    if (selector === "[data-shop-reference-back]") return backButton;
    if (selector === "[data-shop-reference-active-category]") return activeCategoryBanner;
    if (selector === "[data-shop-reference-active-category-label]") return activeCategoryLabel;
    if (selector === "[data-shop-reference-page-status]") return pageStatus;
    if (selector === "[data-shop-reference-search-input]") return searchInput;
    if (selector === "[data-shop-reference-empty]") return emptyState;
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
assert.equal(categoryGroup.hidden, true);
assert.equal(categoryGrid.hidden, true);
assert.equal(favoriteGridOne.hidden, false);
assert.equal(favoriteGridOne.children.length, 2);
assert.equal(pageStatus.textContent, "Showing 1-2 of 2 - Page 1 of 1");
assert.equal(activeCategoryBanner.hidden, true);
assert.equal(prevButton.disabled, true);
assert.equal(nextButton.disabled, true);

kindGrid.listeners.click({ target: sizingKind });
assert.equal(activeCategoryBanner.hidden, false);
assert.equal(activeCategoryLabel.textContent, "Type: Sizing / ID");
assert.equal(categoryGroup.hidden, false);
assert.equal(categoryGrid.hidden, false);
assert.equal(electricalCategory.hidden, true);
assert.equal(bearingCategory.hidden, false);
assert.equal(bearingCategory.countElement.textContent, "1 charts");
assert.equal(sizingKind.classList.values["shop-reference-kind-active"], true);
assert.equal(favoriteGridOne.children[0], betaCard);
assert.equal(favoriteGridOne.children.length, 1);
assert.equal(pageStatus.textContent, "Showing 1-1 of 1 in Sizing / ID - Page 1 of 1");
backButton.listeners.click();
favoriteGridOne.scrollCalls = [];

kindGrid.listeners.click({ target: codesKind });
assert.equal(categoryGroup.hidden, false);
assert.equal(electricalCategory.hidden, false);
assert.equal(bearingCategory.hidden, true);
favoriteGridOne.scrollCalls = [];
categoryGrid.listeners.click({ target: electricalCategory });
assert.equal(categoryGrid.hidden, false);
assert.equal(favoriteGridOne.hidden, false);
assert.equal(activeCategoryBanner.hidden, false);
assert.equal(activeCategoryLabel.textContent, "Codes / symbols / Electrical & Controls");
assert.equal(favoriteGridOne.scrollCalls.length, 1);
assert.equal(favoriteGridOne.children[0], alphaCard);
assert.equal(favoriteGridOne.children.length, 1);
assert.equal(alphaCard.button.innerHTML, "&#9734;");
assert.equal(pageStatus.textContent, "Showing 1-1 of 1 in Codes / symbols in Electrical & Controls - Page 1 of 1");
assert.equal(prevButton.disabled, true);
assert.equal(nextButton.disabled, true);

betaCard.button.listeners.click({ preventDefault() {}, stopPropagation() {} });
assert.equal(JSON.parse(favoriteStorage.values["maintainops.shopReferenceFavorites"])[0], "Beta Reference");
assert.equal(betaCard.button.innerHTML, "&#9733;");
assert.equal(betaCard.classList.values["shop-reference-favorited"], true);
assert.equal(favoriteStorage.values["maintainops.shopReferencePage"], "1");
betaCard.dataset.shopReferenceSearch = "bearing 6205 motor";
alphaCard.dataset.shopReferenceSearch = "photoeye sensor m12";
searchInput.value = "photoeye";
searchInput.listeners.input();
assert.equal(favoriteGridOne.children.length, 1);
assert.equal(favoriteGridOne.children[0], alphaCard);
assert.equal(activeCategoryLabel.textContent, "Search results for \"photoeye\"");
assert.equal(categoryGroup.hidden, true);
assert.equal(favoriteGridOne.scrollCalls.length, 2);
assert.equal(pageStatus.textContent, "Showing 1-1 of 1 for \"photoeye\" - Page 1 of 1");
assert.equal(emptyState.hidden, true);
searchInput.value = "bearing";
searchInput.listeners.input();
assert.equal(favoriteGridOne.children.length, 1);
assert.equal(favoriteGridOne.children[0], betaCard);
assert.equal(pageStatus.textContent, "Showing 1-1 of 1 for \"bearing\" - Page 1 of 1");
searchInput.value = "no-hit";
searchInput.listeners.input();
assert.equal(favoriteGridOne.children.length, 0);
assert.equal(pageStatus.textContent, "Showing 0-0 of 0 for \"no-hit\" - Page 1 of 1");
assert.equal(emptyState.hidden, false);
backButton.listeners.click();
assert.equal(searchInput.value, "");
assert.equal(categoryGroup.hidden, true);
assert.equal(categoryGrid.hidden, true);
assert.equal(favoriteGridOne.hidden, false);
assert.equal(favoriteGridOne.children[0], betaCard);
assert.equal(favoriteGridOne.children[1], alphaCard);
assert.equal(pageStatus.textContent, "Showing 1-2 of 2 - Page 1 of 1");

alphaCard.open = true;
betaCard.open = true;
betaCard.listeners.toggle();
assert.equal(alphaCard.open, false);
assert.equal(betaCard.open, true);
console.log("conversions smoke passed");
