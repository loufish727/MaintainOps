(function () {
  const UNIT_GROUPS = [
    {
      id: "length",
      label: "Length",
      defaultValue: "12",
      defaultFrom: "in",
      defaultTo: "cm",
      units: [
        { id: "in", label: "Inches", toBase: 0.0254 },
        { id: "ft", label: "Feet", toBase: 0.3048 },
        { id: "yd", label: "Yards", toBase: 0.9144 },
        { id: "mm", label: "Millimeters", toBase: 0.001 },
        { id: "cm", label: "Centimeters", toBase: 0.01 },
        { id: "m", label: "Meters", toBase: 1 },
      ],
    },
    {
      id: "area",
      label: "Area",
      defaultValue: "100",
      defaultFrom: "sqft",
      defaultTo: "sqm",
      units: [
        { id: "sqin", label: "Square inches", toBase: 0.00064516 },
        { id: "sqft", label: "Square feet", toBase: 0.09290304 },
        { id: "sqyd", label: "Square yards", toBase: 0.83612736 },
        { id: "sqcm", label: "Square centimeters", toBase: 0.0001 },
        { id: "sqm", label: "Square meters", toBase: 1 },
      ],
    },
    {
      id: "weight",
      label: "Weight",
      defaultValue: "10",
      defaultFrom: "lb",
      defaultTo: "kg",
      units: [
        { id: "oz", label: "Ounces", toBase: 0.028349523125 },
        { id: "lb", label: "Pounds", toBase: 0.45359237 },
        { id: "g", label: "Grams", toBase: 0.001 },
        { id: "kg", label: "Kilograms", toBase: 1 },
      ],
    },
    {
      id: "temperature",
      label: "Temperature",
      defaultValue: "212",
      defaultFrom: "f",
      defaultTo: "c",
      units: [
        { id: "f", label: "Fahrenheit", toBase: (value) => (value - 32) * 5 / 9, fromBase: (value) => (value * 9 / 5) + 32 },
        { id: "c", label: "Celsius", toBase: (value) => value, fromBase: (value) => value },
        { id: "k", label: "Kelvin", toBase: (value) => value - 273.15, fromBase: (value) => value + 273.15 },
      ],
    },
    {
      id: "volume",
      label: "Volume",
      defaultValue: "1",
      defaultFrom: "gal",
      defaultTo: "l",
      units: [
        { id: "floz", label: "Fluid ounces", toBase: 0.0295735295625 },
        { id: "cup", label: "Cups", toBase: 0.2365882365 },
        { id: "pt", label: "Pints", toBase: 0.473176473 },
        { id: "qt", label: "Quarts", toBase: 0.946352946 },
        { id: "gal", label: "Gallons", toBase: 3.785411784 },
        { id: "ml", label: "Milliliters", toBase: 0.001 },
        { id: "l", label: "Liters", toBase: 1 },
      ],
    },
    {
      id: "pressure",
      label: "Pressure",
      defaultValue: "100",
      defaultFrom: "psi",
      defaultTo: "bar",
      units: [
        { id: "psi", label: "PSI", toBase: 6.8947572932 },
        { id: "kpa", label: "kPa", toBase: 1 },
        { id: "bar", label: "Bar", toBase: 100 },
        { id: "mpa", label: "MPa", toBase: 1000 },
      ],
    },
    {
      id: "torque",
      label: "Torque",
      defaultValue: "25",
      defaultFrom: "ftlb",
      defaultTo: "nm",
      units: [
        { id: "inlb", label: "in-lb", toBase: 0.112984829 },
        { id: "ftlb", label: "ft-lb", toBase: 1.3558179483 },
        { id: "nm", label: "Nm", toBase: 1 },
      ],
    },
  ];

  const BOLT_REFERENCE = [
    { inch: "#10", inchDiameter: "0.190", metric: "M5", metricDiameter: "5.0", threads: "10-24 / 10-32" },
    { inch: "1/4", inchDiameter: "0.250", metric: "M6", metricDiameter: "6.0", threads: "1/4-20 / 1/4-28" },
    { inch: "5/16", inchDiameter: "0.3125", metric: "M8", metricDiameter: "8.0", threads: "5/16-18 / 5/16-24" },
    { inch: "3/8", inchDiameter: "0.375", metric: "M10", metricDiameter: "10.0", threads: "3/8-16 / 3/8-24" },
    { inch: "7/16", inchDiameter: "0.4375", metric: "M10 / M12", metricDiameter: "10.0 / 12.0", threads: "7/16-14 / 7/16-20" },
    { inch: "1/2", inchDiameter: "0.500", metric: "M12", metricDiameter: "12.0", threads: "1/2-13 / 1/2-20" },
    { inch: "5/8", inchDiameter: "0.625", metric: "M16", metricDiameter: "16.0", threads: "5/8-11 / 5/8-18" },
    { inch: "3/4", inchDiameter: "0.750", metric: "M20", metricDiameter: "20.0", threads: "3/4-10 / 3/4-16" },
    { inch: "7/8", inchDiameter: "0.875", metric: "M22", metricDiameter: "22.0", threads: "7/8-9 / 7/8-14" },
    { inch: "1", inchDiameter: "1.000", metric: "M24", metricDiameter: "24.0", threads: "1-8 / 1-12" },
  ];

  const BOLT_GAUGE_SIZES = [
    { label: "#10 / M5", inch: "#10", metric: "M5", diameterIn: 0.190 },
    { label: "1/4 / M6", inch: "1/4", metric: "M6", diameterIn: 0.250 },
    { label: "5/16 / M8", inch: "5/16", metric: "M8", diameterIn: 0.3125 },
    { label: "3/8 / M10", inch: "3/8", metric: "M10", diameterIn: 0.375 },
    { label: "7/16 / M10-M12", inch: "7/16", metric: "M10 / M12", diameterIn: 0.4375 },
    { label: "1/2 / M12", inch: "1/2", metric: "M12", diameterIn: 0.500 },
    { label: "5/8 / M16", inch: "5/8", metric: "M16", diameterIn: 0.625 },
    { label: "3/4 / M20", inch: "3/4", metric: "M20", diameterIn: 0.750 },
    { label: "7/8 / M22", inch: "7/8", metric: "M22", diameterIn: 0.875 },
    { label: "1 / M24", inch: "1", metric: "M24", diameterIn: 1.000 },
  ];

  function groupById(groupId) {
    return UNIT_GROUPS.find((group) => group.id === groupId) || null;
  }

  function unitById(group, unitId) {
    return group?.units.find((unit) => unit.id === unitId) || null;
  }

  function convertValue(groupId, rawValue, fromId, toId) {
    const value = Number(rawValue);
    if (!Number.isFinite(value)) return null;
    const group = groupById(groupId);
    const from = unitById(group, fromId);
    const to = unitById(group, toId);
    if (!group || !from || !to) return null;
    const baseValue = typeof from.toBase === "function" ? from.toBase(value) : value * from.toBase;
    return typeof to.fromBase === "function" ? to.fromBase(baseValue) : baseValue / to.toBase;
  }

  function formatConvertedValue(value) {
    if (value === null || !Number.isFinite(value)) return "Enter a value";
    const absolute = Math.abs(value);
    const decimals = absolute >= 100 ? 2 : absolute >= 10 ? 3 : 4;
    return value
      .toFixed(decimals)
      .replace(/\.?0+$/, "");
  }

  function conversionResultText(groupId, rawValue, fromId, toId) {
    const value = convertValue(groupId, rawValue, fromId, toId);
    const group = groupById(groupId);
    const to = unitById(group, toId);
    if (value === null || !to) return "Enter a value";
    return `${formatConvertedValue(value)} ${to.label}`;
  }

  function nearestBoltSize(diameterIn) {
    const value = Number(diameterIn);
    if (!Number.isFinite(value) || value <= 0) return null;
    return BOLT_GAUGE_SIZES.reduce((closest, size) => {
      const delta = Math.abs(size.diameterIn - value);
      return !closest || delta < closest.delta ? { ...size, delta } : closest;
    }, null);
  }

  function boltGaugeReading(diameterPx, pixelsPerInch) {
    const px = Number(diameterPx);
    const ppi = Number(pixelsPerInch);
    if (!Number.isFinite(px) || !Number.isFinite(ppi) || px <= 0 || ppi <= 0) return null;
    const diameterIn = px / ppi;
    const diameterMm = diameterIn * 25.4;
    const closest = nearestBoltSize(diameterIn);
    return {
      diameterIn,
      diameterMm,
      closest,
      text: closest
        ? `${formatConvertedValue(diameterIn)} in / ${formatConvertedValue(diameterMm)} mm - closest ${closest.label}`
        : `${formatConvertedValue(diameterIn)} in / ${formatConvertedValue(diameterMm)} mm`,
    };
  }

  function bindBoltGaugeEvents(options = {}) {
    const doc = options.documentRef || document;
    const storage = options.storage || (typeof window !== "undefined" ? window.localStorage : null);
    doc.querySelectorAll("[data-bolt-gauge]").forEach((gauge) => {
      const card = gauge.querySelector("[data-bolt-gauge-card]");
      const circle = gauge.querySelector("[data-bolt-gauge-circle]");
      const diameter = gauge.querySelector("[data-bolt-gauge-diameter]");
      const calibration = gauge.querySelector("[data-bolt-gauge-calibration]");
      const calibrationLine = gauge.querySelector("[data-bolt-gauge-calibration-line]");
      const output = gauge.querySelector("[data-bolt-gauge-output]");
      const storedCalibration = Number(storage?.getItem("maintainops.boltGaugePixelsPerInch"));
      if (calibration && Number.isFinite(storedCalibration) && storedCalibration > 0) {
        calibration.value = String(storedCalibration);
      }
      const update = () => {
        const diameterPx = Number(diameter?.value || 0);
        const pixelsPerInch = Number(calibration?.value || 96);
        if (circle) {
          circle.style.width = `${diameterPx}px`;
          circle.style.height = `${diameterPx}px`;
        }
        if (calibrationLine) calibrationLine.style.width = `${pixelsPerInch}px`;
        const reading = boltGaugeReading(diameterPx, pixelsPerInch);
        if (output) output.textContent = reading ? reading.text : "Calibrate the gauge";
        if (storage && Number.isFinite(pixelsPerInch) && pixelsPerInch > 0) {
          storage.setItem("maintainops.boltGaugePixelsPerInch", String(pixelsPerInch));
        }
      };
      [diameter, calibration].filter(Boolean).forEach((element) => {
        element.addEventListener("input", update);
        element.addEventListener("change", update);
      });
      if (card) card.addEventListener("click", () => diameter?.focus?.());
      update();
    });
  }

  function bindConversionEvents(options = {}) {
    const doc = options.documentRef || document;
    doc.querySelectorAll("[data-conversion-card]").forEach((card) => {
      const groupId = card.dataset.conversionGroup;
      const input = card.querySelector("[data-conversion-input]");
      const from = card.querySelector("[data-conversion-from]");
      const to = card.querySelector("[data-conversion-to]");
      const output = card.querySelector("[data-conversion-output]");
      const swap = card.querySelector("[data-conversion-swap]");
      const update = () => {
        if (!input || !from || !to || !output) return;
        output.textContent = conversionResultText(groupId, input.value, from.value, to.value);
      };
      [input, from, to].filter(Boolean).forEach((element) => {
        element.addEventListener("input", update);
        element.addEventListener("change", update);
      });
      if (swap) {
        swap.addEventListener("click", () => {
          const nextFrom = to.value;
          to.value = from.value;
          from.value = nextFrom;
          update();
        });
      }
      update();
    });
    bindBoltGaugeEvents(options);
  }

  window.MaintainOpsConversions = Object.freeze({
    UNIT_GROUPS,
    BOLT_REFERENCE,
    BOLT_GAUGE_SIZES,
    nearestBoltSize,
    boltGaugeReading,
    convertValue,
    formatConvertedValue,
    conversionResultText,
    bindConversionEvents,
    bindBoltGaugeEvents,
  });

  if (typeof module !== "undefined") {
    module.exports = {
      UNIT_GROUPS,
      BOLT_REFERENCE,
      BOLT_GAUGE_SIZES,
      nearestBoltSize,
      boltGaugeReading,
      convertValue,
      formatConvertedValue,
      conversionResultText,
      bindConversionEvents,
      bindBoltGaugeEvents,
    };
  }
})();
