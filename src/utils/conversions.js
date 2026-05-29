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
    { inch: "#0", inchDiameter: "0.060", metric: "M1.6", metricDiameter: "1.6", threads: "0-80 UNF" },
    { inch: "#1", inchDiameter: "0.073", metric: "M2", metricDiameter: "2.0", threads: "1-64 UNC" },
    { inch: "#1", inchDiameter: "0.073", metric: "M2", metricDiameter: "2.0", threads: "1-72 UNF" },
    { inch: "#2", inchDiameter: "0.086", metric: "M2.2", metricDiameter: "2.2", threads: "2-56 UNC" },
    { inch: "#2", inchDiameter: "0.086", metric: "M2.2", metricDiameter: "2.2", threads: "2-64 UNF" },
    { inch: "#3", inchDiameter: "0.099", metric: "M2.5", metricDiameter: "2.5", threads: "3-48 UNC" },
    { inch: "#3", inchDiameter: "0.099", metric: "M2.5", metricDiameter: "2.5", threads: "3-56 UNF" },
    { inch: "#4", inchDiameter: "0.112", metric: "M3", metricDiameter: "3.0", threads: "4-40 UNC" },
    { inch: "#4", inchDiameter: "0.112", metric: "M3", metricDiameter: "3.0", threads: "4-48 UNF" },
    { inch: "#5", inchDiameter: "0.125", metric: "M3", metricDiameter: "3.0", threads: "5-40 UNC" },
    { inch: "#5", inchDiameter: "0.125", metric: "M3", metricDiameter: "3.0", threads: "5-44 UNF" },
    { inch: "#6", inchDiameter: "0.138", metric: "M3.5", metricDiameter: "3.5", threads: "6-32 UNC" },
    { inch: "#6", inchDiameter: "0.138", metric: "M3.5", metricDiameter: "3.5", threads: "6-40 UNF" },
    { inch: "#8", inchDiameter: "0.164", metric: "M4", metricDiameter: "4.0", threads: "8-32 UNC" },
    { inch: "#8", inchDiameter: "0.164", metric: "M4", metricDiameter: "4.0", threads: "8-36 UNF" },
    { inch: "#10", inchDiameter: "0.190", metric: "M5", metricDiameter: "5.0", threads: "10-24 UNC" },
    { inch: "#10", inchDiameter: "0.190", metric: "M5", metricDiameter: "5.0", threads: "10-32 UNF" },
    { inch: "#12", inchDiameter: "0.216", metric: "M5.5", metricDiameter: "5.5", threads: "12-24 UNC" },
    { inch: "#12", inchDiameter: "0.216", metric: "M5.5", metricDiameter: "5.5", threads: "12-28 UNF" },
    { inch: "1/4", inchDiameter: "0.250", metric: "M6", metricDiameter: "6.0", threads: "1/4-20 UNC" },
    { inch: "1/4", inchDiameter: "0.250", metric: "M6", metricDiameter: "6.0", threads: "1/4-28 UNF" },
    { inch: "1/4", inchDiameter: "0.250", metric: "M6", metricDiameter: "6.0", threads: "1/4-32 UNEF" },
    { inch: "5/16", inchDiameter: "0.3125", metric: "M8", metricDiameter: "8.0", threads: "5/16-18 UNC" },
    { inch: "5/16", inchDiameter: "0.3125", metric: "M8", metricDiameter: "8.0", threads: "5/16-24 UNF" },
    { inch: "5/16", inchDiameter: "0.3125", metric: "M8", metricDiameter: "8.0", threads: "5/16-32 UNEF" },
    { inch: "3/8", inchDiameter: "0.375", metric: "M10", metricDiameter: "10.0", threads: "3/8-16 UNC" },
    { inch: "3/8", inchDiameter: "0.375", metric: "M10", metricDiameter: "10.0", threads: "3/8-24 UNF" },
    { inch: "3/8", inchDiameter: "0.375", metric: "M10", metricDiameter: "10.0", threads: "3/8-32 UNEF" },
    { inch: "7/16", inchDiameter: "0.4375", metric: "M10 / M12", metricDiameter: "10.0 / 12.0", threads: "7/16-14 UNC" },
    { inch: "7/16", inchDiameter: "0.4375", metric: "M10 / M12", metricDiameter: "10.0 / 12.0", threads: "7/16-20 UNF" },
    { inch: "7/16", inchDiameter: "0.4375", metric: "M10 / M12", metricDiameter: "10.0 / 12.0", threads: "7/16-28 UNEF" },
    { inch: "1/2", inchDiameter: "0.500", metric: "M12", metricDiameter: "12.0", threads: "1/2-13 UNC" },
    { inch: "1/2", inchDiameter: "0.500", metric: "M12", metricDiameter: "12.0", threads: "1/2-20 UNF" },
    { inch: "1/2", inchDiameter: "0.500", metric: "M12", metricDiameter: "12.0", threads: "1/2-28 UNEF" },
    { inch: "9/16", inchDiameter: "0.5625", metric: "M14", metricDiameter: "14.0", threads: "9/16-12 UNC" },
    { inch: "9/16", inchDiameter: "0.5625", metric: "M14", metricDiameter: "14.0", threads: "9/16-18 UNF" },
    { inch: "9/16", inchDiameter: "0.5625", metric: "M14", metricDiameter: "14.0", threads: "9/16-24 UNEF" },
    { inch: "5/8", inchDiameter: "0.625", metric: "M16", metricDiameter: "16.0", threads: "5/8-11 UNC" },
    { inch: "5/8", inchDiameter: "0.625", metric: "M16", metricDiameter: "16.0", threads: "5/8-18 UNF" },
    { inch: "5/8", inchDiameter: "0.625", metric: "M16", metricDiameter: "16.0", threads: "5/8-24 UNEF" },
    { inch: "3/4", inchDiameter: "0.750", metric: "M20", metricDiameter: "20.0", threads: "3/4-10 UNC" },
    { inch: "3/4", inchDiameter: "0.750", metric: "M20", metricDiameter: "20.0", threads: "3/4-16 UNF" },
    { inch: "3/4", inchDiameter: "0.750", metric: "M20", metricDiameter: "20.0", threads: "3/4-20 UNEF" },
    { inch: "7/8", inchDiameter: "0.875", metric: "M22", metricDiameter: "22.0", threads: "7/8-9 UNC" },
    { inch: "7/8", inchDiameter: "0.875", metric: "M22", metricDiameter: "22.0", threads: "7/8-14 UNF" },
    { inch: "7/8", inchDiameter: "0.875", metric: "M22", metricDiameter: "22.0", threads: "7/8-20 UNEF" },
    { inch: "1", inchDiameter: "1.000", metric: "M24", metricDiameter: "24.0", threads: "1-8 UNC" },
    { inch: "1", inchDiameter: "1.000", metric: "M24", metricDiameter: "24.0", threads: "1-12 UNF" },
    { inch: "1", inchDiameter: "1.000", metric: "M24", metricDiameter: "24.0", threads: "1-20 UNEF" },
    { inch: "1-1/8", inchDiameter: "1.125", metric: "M30", metricDiameter: "30.0", threads: "1-1/8-7 UNC" },
    { inch: "1-1/8", inchDiameter: "1.125", metric: "M30", metricDiameter: "30.0", threads: "1-1/8-12 UNF" },
    { inch: "1-1/4", inchDiameter: "1.250", metric: "M33", metricDiameter: "33.0", threads: "1-1/4-7 UNC" },
    { inch: "1-1/4", inchDiameter: "1.250", metric: "M33", metricDiameter: "33.0", threads: "1-1/4-12 UNF" },
    { inch: "1-3/8", inchDiameter: "1.375", metric: "M36", metricDiameter: "36.0", threads: "1-3/8-6 UNC" },
    { inch: "1-3/8", inchDiameter: "1.375", metric: "M36", metricDiameter: "36.0", threads: "1-3/8-12 UNF" },
    { inch: "1-1/2", inchDiameter: "1.500", metric: "M39", metricDiameter: "39.0", threads: "1-1/2-6 UNC" },
    { inch: "1-1/2", inchDiameter: "1.500", metric: "M39", metricDiameter: "39.0", threads: "1-1/2-12 UNF" },
  ];

  const BOLT_GAUGE_SIZES = BOLT_REFERENCE.reduce((sizes, row) => {
    if (sizes.some((size) => size.inch === row.inch)) return sizes;
    sizes.push({
      label: `${row.inch} / ${row.metric}`,
      inch: row.inch,
      metric: row.metric,
      diameterIn: Number(row.inchDiameter),
    });
    return sizes;
  }, []);

  const WRENCH_REFERENCE = [
    { thread: "#6", threadDiameterIn: "0.138", wrenchIn: "1/4", wrenchMm: "6.4", note: "small machine screw hex" },
    { thread: "#8", threadDiameterIn: "0.164", wrenchIn: "1/4", wrenchMm: "6.4", note: "small machine screw hex" },
    { thread: "#10", threadDiameterIn: "0.190", wrenchIn: "5/16", wrenchMm: "7.9", note: "common hex head" },
    { thread: "1/4", threadDiameterIn: "0.250", wrenchIn: "7/16", wrenchMm: "11.1", note: "common hex bolt/nut" },
    { thread: "5/16", threadDiameterIn: "0.3125", wrenchIn: "1/2", wrenchMm: "12.7", note: "common hex bolt/nut" },
    { thread: "3/8", threadDiameterIn: "0.375", wrenchIn: "9/16", wrenchMm: "14.3", note: "common hex bolt/nut" },
    { thread: "7/16", threadDiameterIn: "0.4375", wrenchIn: "5/8", wrenchMm: "15.9", note: "common hex bolt/nut" },
    { thread: "1/2", threadDiameterIn: "0.500", wrenchIn: "3/4", wrenchMm: "19.1", note: "common hex bolt/nut" },
    { thread: "9/16", threadDiameterIn: "0.5625", wrenchIn: "13/16", wrenchMm: "20.6", note: "common hex bolt/nut" },
    { thread: "5/8", threadDiameterIn: "0.625", wrenchIn: "15/16", wrenchMm: "23.8", note: "common hex bolt/nut" },
    { thread: "3/4", threadDiameterIn: "0.750", wrenchIn: "1-1/8", wrenchMm: "28.6", note: "common hex bolt/nut" },
    { thread: "7/8", threadDiameterIn: "0.875", wrenchIn: "1-5/16", wrenchMm: "33.3", note: "common hex bolt/nut" },
    { thread: "1", threadDiameterIn: "1.000", wrenchIn: "1-1/2", wrenchMm: "38.1", note: "common hex bolt/nut" },
    { thread: "1-1/8", threadDiameterIn: "1.125", wrenchIn: "1-11/16", wrenchMm: "42.9", note: "common hex bolt/nut" },
    { thread: "1-1/4", threadDiameterIn: "1.250", wrenchIn: "1-7/8", wrenchMm: "47.6", note: "common hex bolt/nut" },
    { thread: "1-3/8", threadDiameterIn: "1.375", wrenchIn: "2-1/16", wrenchMm: "52.4", note: "common hex bolt/nut" },
    { thread: "1-1/2", threadDiameterIn: "1.500", wrenchIn: "2-1/4", wrenchMm: "57.2", note: "common hex bolt/nut" },
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

  function wrenchSizeInches(value) {
    const match = String(value).match(/^(\d+)(?:-(\d+)\/(\d+)|\/(\d+))?$/);
    if (!match) return Number(value) || 0;
    const whole = Number(match[1]) || 0;
    if (match[2] && match[3]) return whole + (Number(match[2]) / Number(match[3]));
    if (match[4]) return whole / Number(match[4]);
    return whole;
  }

  function nearestWrenchSize(diameterIn) {
    const value = Number(diameterIn);
    if (!Number.isFinite(value) || value <= 0) return null;
    return WRENCH_REFERENCE.reduce((closest, size) => {
      const wrenchIn = wrenchSizeInches(size.wrenchIn);
      const delta = Math.abs(wrenchIn - value);
      return !closest || delta < closest.delta ? { ...size, wrenchDiameterIn: wrenchIn, delta } : closest;
    }, null);
  }

  function boltGaugeReading(diameterPx, pixelsPerInch, mode = "thread") {
    const px = Number(diameterPx);
    const ppi = Number(pixelsPerInch);
    if (!Number.isFinite(px) || !Number.isFinite(ppi) || px <= 0 || ppi <= 0) return null;
    const diameterIn = px / ppi;
    const diameterMm = diameterIn * 25.4;
    if (mode === "wrench") {
      const closestWrench = nearestWrenchSize(diameterIn);
      return {
        diameterIn,
        diameterMm,
        mode,
        closest: closestWrench,
        text: closestWrench
          ? `${formatConvertedValue(diameterIn)} in / ${formatConvertedValue(diameterMm)} mm across flats - closest ${closestWrench.wrenchIn} wrench for ${closestWrench.thread} thread`
          : `${formatConvertedValue(diameterIn)} in / ${formatConvertedValue(diameterMm)} mm across flats`,
      };
    }
    const closest = nearestBoltSize(diameterIn);
    return {
      diameterIn,
      diameterMm,
      mode: "thread",
      closest,
      text: closest
        ? `${formatConvertedValue(diameterIn)} in / ${formatConvertedValue(diameterMm)} mm thread diameter - closest ${closest.label}`
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
      const help = gauge.querySelector("[data-bolt-gauge-help]");
      const modeInputs = Array.from(gauge.querySelectorAll("[data-bolt-gauge-mode]"));
      const lock = gauge.querySelector("[data-bolt-gauge-lock]");
      const storedCalibration = Number(storage?.getItem("maintainops.boltGaugePixelsPerInch"));
      const storedLock = storage?.getItem("maintainops.boltGaugeCalibrationLocked");
      if (calibration && Number.isFinite(storedCalibration) && storedCalibration > 0) {
        calibration.value = String(storedCalibration);
      }
      if (lock) lock.checked = storedLock !== "false";
      const update = () => {
        const diameterPx = Number(diameter?.value || 0);
        const pixelsPerInch = Number(calibration?.value || 96);
        const mode = modeInputs.find((input) => input.checked)?.value || "thread";
        const locked = !lock || lock.checked;
        if (calibration) calibration.disabled = locked;
        if (circle) {
          circle.style.width = `${diameterPx}px`;
          circle.style.height = `${diameterPx}px`;
        }
        if (calibrationLine) calibrationLine.style.width = `${pixelsPerInch}px`;
        const reading = boltGaugeReading(diameterPx, pixelsPerInch, mode);
        if (output) output.textContent = reading ? reading.text : "Calibrate the gauge";
        if (help) {
          help.textContent = mode === "wrench"
            ? "Fit the circle across the bolt head or nut flats to estimate wrench size."
            : "Fit the circle around the bolt shaft or inside the nut opening to estimate thread size.";
        }
        const activeInch = mode === "thread" ? (reading?.closest?.inch || "") : "";
        const activeWrenchThread = mode === "wrench" ? (reading?.closest?.thread || "") : "";
        doc.querySelectorAll("[data-bolt-size-row]").forEach((row) => {
          row.classList.toggle("bolt-reference-active", Boolean(activeInch && row.dataset.boltSizeRow === activeInch));
        });
        doc.querySelectorAll("[data-wrench-size-row]").forEach((row) => {
          row.classList.toggle("bolt-reference-active", Boolean(activeWrenchThread && row.dataset.wrenchSizeRow === activeWrenchThread));
        });
        if (storage && Number.isFinite(pixelsPerInch) && pixelsPerInch > 0) {
          storage.setItem("maintainops.boltGaugePixelsPerInch", String(pixelsPerInch));
        }
        if (storage && lock) storage.setItem("maintainops.boltGaugeCalibrationLocked", String(locked));
      };
      [diameter, calibration, lock, ...modeInputs].filter(Boolean).forEach((element) => {
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
    WRENCH_REFERENCE,
    nearestBoltSize,
    nearestWrenchSize,
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
      WRENCH_REFERENCE,
      nearestBoltSize,
      nearestWrenchSize,
      boltGaugeReading,
      convertValue,
      formatConvertedValue,
      conversionResultText,
      bindConversionEvents,
      bindBoltGaugeEvents,
    };
  }
})();
