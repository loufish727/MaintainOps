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
    { inch: "1-1/16", inchDiameter: "1.0625", metric: "M27", metricDiameter: "27.0", threads: "1-1/16-12 UN" },
    { inch: "1-1/8", inchDiameter: "1.125", metric: "M30", metricDiameter: "30.0", threads: "1-1/8-18 UNEF" },
    { inch: "1-3/16", inchDiameter: "1.1875", metric: "M30", metricDiameter: "30.0", threads: "1-3/16-12 UN" },
    { inch: "1-1/4", inchDiameter: "1.250", metric: "M33", metricDiameter: "33.0", threads: "1-1/4-18 UNEF" },
    { inch: "1-5/16", inchDiameter: "1.3125", metric: "M33", metricDiameter: "33.0", threads: "1-5/16-12 UN" },
    { inch: "1-7/16", inchDiameter: "1.4375", metric: "M36", metricDiameter: "36.0", threads: "1-7/16-12 UN" },
    { inch: "1-9/16", inchDiameter: "1.5625", metric: "M39 / M40", metricDiameter: "39.0 / 40.0", threads: "1-9/16-12 UN" },
    { inch: "1-5/8", inchDiameter: "1.625", metric: "M42", metricDiameter: "42.0", threads: "1-5/8-5.5 UNC" },
    { inch: "1-5/8", inchDiameter: "1.625", metric: "M42", metricDiameter: "42.0", threads: "1-5/8-12 UNF" },
    { inch: "1-5/8", inchDiameter: "1.625", metric: "M42", metricDiameter: "42.0", threads: "1-5/8-18 UNEF" },
    { inch: "1-11/16", inchDiameter: "1.6875", metric: "M42", metricDiameter: "42.0", threads: "1-11/16-12 UN" },
    { inch: "1-3/4", inchDiameter: "1.750", metric: "M45", metricDiameter: "45.0", threads: "1-3/4-5 UNC" },
    { inch: "1-3/4", inchDiameter: "1.750", metric: "M45", metricDiameter: "45.0", threads: "1-3/4-12 UNF" },
    { inch: "1-3/4", inchDiameter: "1.750", metric: "M45", metricDiameter: "45.0", threads: "1-3/4-18 UNEF" },
    { inch: "1-13/16", inchDiameter: "1.8125", metric: "M45 / M48", metricDiameter: "45.0 / 48.0", threads: "1-13/16-12 UN" },
    { inch: "1-7/8", inchDiameter: "1.875", metric: "M48", metricDiameter: "48.0", threads: "1-7/8-4.5 UNC" },
    { inch: "1-7/8", inchDiameter: "1.875", metric: "M48", metricDiameter: "48.0", threads: "1-7/8-12 UNF" },
    { inch: "1-7/8", inchDiameter: "1.875", metric: "M48", metricDiameter: "48.0", threads: "1-7/8-18 UNEF" },
    { inch: "1-15/16", inchDiameter: "1.9375", metric: "M48", metricDiameter: "48.0", threads: "1-15/16-12 UN" },
    { inch: "2", inchDiameter: "2.000", metric: "M52", metricDiameter: "52.0", threads: "2-4.5 UNC" },
    { inch: "2", inchDiameter: "2.000", metric: "M52", metricDiameter: "52.0", threads: "2-12 UNF" },
    { inch: "2", inchDiameter: "2.000", metric: "M52", metricDiameter: "52.0", threads: "2-18 UNEF" },
    { inch: "2-1/8", inchDiameter: "2.125", metric: "M54", metricDiameter: "54.0", threads: "2-1/8-12 UN" },
    { inch: "2-1/4", inchDiameter: "2.250", metric: "M56 / M60", metricDiameter: "56.0 / 60.0", threads: "2-1/4-4.5 UNC" },
    { inch: "2-1/4", inchDiameter: "2.250", metric: "M56 / M60", metricDiameter: "56.0 / 60.0", threads: "2-1/4-8 UNF" },
    { inch: "2-1/4", inchDiameter: "2.250", metric: "M56 / M60", metricDiameter: "56.0 / 60.0", threads: "2-1/4-12 UNEF" },
    { inch: "2-3/8", inchDiameter: "2.375", metric: "M60", metricDiameter: "60.0", threads: "2-3/8-12 UN" },
    { inch: "2-1/2", inchDiameter: "2.500", metric: "M64", metricDiameter: "64.0", threads: "2-1/2-4 UNC" },
    { inch: "2-1/2", inchDiameter: "2.500", metric: "M64", metricDiameter: "64.0", threads: "2-1/2-8 UNF" },
    { inch: "2-1/2", inchDiameter: "2.500", metric: "M64", metricDiameter: "64.0", threads: "2-1/2-12 UNEF" },
    { inch: "2-5/8", inchDiameter: "2.625", metric: "M68", metricDiameter: "68.0", threads: "2-5/8-12 UN" },
    { inch: "2-3/4", inchDiameter: "2.750", metric: "M70", metricDiameter: "70.0", threads: "2-3/4-4 UNC" },
    { inch: "2-3/4", inchDiameter: "2.750", metric: "M70", metricDiameter: "70.0", threads: "2-3/4-8 UNF" },
    { inch: "2-3/4", inchDiameter: "2.750", metric: "M70", metricDiameter: "70.0", threads: "2-3/4-12 UNEF" },
    { inch: "3", inchDiameter: "3.000", metric: "M76", metricDiameter: "76.0", threads: "3-4 UNC" },
    { inch: "3", inchDiameter: "3.000", metric: "M76", metricDiameter: "76.0", threads: "3-8 UNF" },
    { inch: "3", inchDiameter: "3.000", metric: "M76", metricDiameter: "76.0", threads: "3-12 UNEF" },
    { inch: "3-1/4", inchDiameter: "3.250", metric: "M80 / M85", metricDiameter: "80.0 / 85.0", threads: "3-1/4-4 UNC" },
    { inch: "3-1/4", inchDiameter: "3.250", metric: "M80 / M85", metricDiameter: "80.0 / 85.0", threads: "3-1/4-8 UNF" },
    { inch: "3-1/2", inchDiameter: "3.500", metric: "M90", metricDiameter: "90.0", threads: "3-1/2-4 UNC" },
    { inch: "3-1/2", inchDiameter: "3.500", metric: "M90", metricDiameter: "90.0", threads: "3-1/2-8 UNF" },
    { inch: "3-3/4", inchDiameter: "3.750", metric: "M95", metricDiameter: "95.0", threads: "3-3/4-4 UNC" },
    { inch: "3-3/4", inchDiameter: "3.750", metric: "M95", metricDiameter: "95.0", threads: "3-3/4-8 UNF" },
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

  BOLT_REFERENCE.sort((left, right) => (
    Number(left.inchDiameter) - Number(right.inchDiameter) ||
    left.threads.localeCompare(right.threads, undefined, { numeric: true })
  ));

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
    { thread: "#0", threadDiameterIn: "0.060", wrenchIn: "5/32", wrenchMm: "4.0", note: "small machine screw hex" },
    { thread: "#1", threadDiameterIn: "0.073", wrenchIn: "5/32", wrenchMm: "4.0", note: "small machine screw hex" },
    { thread: "#2", threadDiameterIn: "0.086", wrenchIn: "3/16", wrenchMm: "4.8", note: "small machine screw hex" },
    { thread: "#3", threadDiameterIn: "0.099", wrenchIn: "3/16", wrenchMm: "4.8", note: "small machine screw hex" },
    { thread: "#4", threadDiameterIn: "0.112", wrenchIn: "1/4", wrenchMm: "6.4", note: "small machine screw hex" },
    { thread: "#5", threadDiameterIn: "0.125", wrenchIn: "1/4", wrenchMm: "6.4", note: "small machine screw hex" },
    { thread: "#12", threadDiameterIn: "0.216", wrenchIn: "3/8", wrenchMm: "9.5", note: "machine screw hex" },
    { thread: "1/4", threadDiameterIn: "0.250", wrenchIn: "1/2", wrenchMm: "12.7", note: "heavy hex or square head" },
    { thread: "5/16", threadDiameterIn: "0.3125", wrenchIn: "9/16", wrenchMm: "14.3", note: "heavy hex or square head" },
    { thread: "3/8", threadDiameterIn: "0.375", wrenchIn: "11/16", wrenchMm: "17.5", note: "heavy hex or square head" },
    { thread: "7/16", threadDiameterIn: "0.4375", wrenchIn: "3/4", wrenchMm: "19.1", note: "heavy hex or square head" },
    { thread: "1/2", threadDiameterIn: "0.500", wrenchIn: "7/8", wrenchMm: "22.2", note: "heavy hex or square head" },
    { thread: "9/16", threadDiameterIn: "0.5625", wrenchIn: "15/16", wrenchMm: "23.8", note: "heavy hex or square head" },
    { thread: "5/8", threadDiameterIn: "0.625", wrenchIn: "1-1/16", wrenchMm: "27.0", note: "heavy hex or square head" },
    { thread: "3/4", threadDiameterIn: "0.750", wrenchIn: "1-1/4", wrenchMm: "31.8", note: "heavy hex or square head" },
    { thread: "7/8", threadDiameterIn: "0.875", wrenchIn: "1-7/16", wrenchMm: "36.5", note: "heavy hex or square head" },
    { thread: "1", threadDiameterIn: "1.000", wrenchIn: "1-5/8", wrenchMm: "41.3", note: "heavy hex or square head" },
    { thread: "1-1/8", threadDiameterIn: "1.125", wrenchIn: "1-13/16", wrenchMm: "46.0", note: "heavy hex or square head" },
    { thread: "1-1/4", threadDiameterIn: "1.250", wrenchIn: "2", wrenchMm: "50.8", note: "heavy hex or square head" },
    { thread: "1-3/8", threadDiameterIn: "1.375", wrenchIn: "2-3/16", wrenchMm: "55.6", note: "heavy hex or square head" },
    { thread: "1-1/2", threadDiameterIn: "1.500", wrenchIn: "2-3/8", wrenchMm: "60.3", note: "heavy hex or square head" },
    { thread: "1/4", threadDiameterIn: "0.250", wrenchIn: "1/2", wrenchMm: "12.7", note: "square head cap screw" },
    { thread: "3/8", threadDiameterIn: "0.375", wrenchIn: "3/4", wrenchMm: "19.1", note: "square head cap screw" },
    { thread: "1-5/8", threadDiameterIn: "1.625", wrenchIn: "2-7/16", wrenchMm: "61.9", note: "common hex bolt/nut" },
    { thread: "1-5/8", threadDiameterIn: "1.625", wrenchIn: "2-1/2", wrenchMm: "63.5", note: "heavy hex or square head" },
    { thread: "1-5/8", threadDiameterIn: "1.625", wrenchIn: "2-3/8", wrenchMm: "60.3", note: "jam nut or low-profile hex" },
    { thread: "1-3/4", threadDiameterIn: "1.750", wrenchIn: "2-5/8", wrenchMm: "66.7", note: "common hex bolt/nut" },
    { thread: "1-3/4", threadDiameterIn: "1.750", wrenchIn: "2-3/4", wrenchMm: "69.9", note: "heavy hex or square head" },
    { thread: "1-3/4", threadDiameterIn: "1.750", wrenchIn: "2-9/16", wrenchMm: "65.1", note: "jam nut or low-profile hex" },
    { thread: "1-7/8", threadDiameterIn: "1.875", wrenchIn: "2-13/16", wrenchMm: "71.4", note: "common hex bolt/nut" },
    { thread: "1-7/8", threadDiameterIn: "1.875", wrenchIn: "2-15/16", wrenchMm: "74.6", note: "heavy hex or square head" },
    { thread: "1-7/8", threadDiameterIn: "1.875", wrenchIn: "2-3/4", wrenchMm: "69.9", note: "jam nut or low-profile hex" },
    { thread: "2", threadDiameterIn: "2.000", wrenchIn: "3", wrenchMm: "76.2", note: "common hex bolt/nut" },
    { thread: "2", threadDiameterIn: "2.000", wrenchIn: "3-1/8", wrenchMm: "79.4", note: "heavy hex or square head" },
    { thread: "2", threadDiameterIn: "2.000", wrenchIn: "2-15/16", wrenchMm: "74.6", note: "jam nut or low-profile hex" },
    { thread: "2-1/8", threadDiameterIn: "2.125", wrenchIn: "3-3/16", wrenchMm: "81.0", note: "common hex bolt/nut" },
    { thread: "2-1/8", threadDiameterIn: "2.125", wrenchIn: "3-5/16", wrenchMm: "84.1", note: "heavy hex or square head" },
    { thread: "2-1/8", threadDiameterIn: "2.125", wrenchIn: "3-1/8", wrenchMm: "79.4", note: "jam nut or low-profile hex" },
    { thread: "2-1/4", threadDiameterIn: "2.250", wrenchIn: "3-3/8", wrenchMm: "85.7", note: "common hex bolt/nut" },
    { thread: "2-1/4", threadDiameterIn: "2.250", wrenchIn: "3-1/2", wrenchMm: "88.9", note: "heavy hex or square head" },
    { thread: "2-1/4", threadDiameterIn: "2.250", wrenchIn: "3-5/16", wrenchMm: "84.1", note: "jam nut or low-profile hex" },
    { thread: "2-3/8", threadDiameterIn: "2.375", wrenchIn: "3-9/16", wrenchMm: "90.5", note: "common hex bolt/nut" },
    { thread: "2-3/8", threadDiameterIn: "2.375", wrenchIn: "3-11/16", wrenchMm: "93.7", note: "heavy hex or square head" },
    { thread: "2-3/8", threadDiameterIn: "2.375", wrenchIn: "3-1/2", wrenchMm: "88.9", note: "jam nut or low-profile hex" },
    { thread: "2-1/2", threadDiameterIn: "2.500", wrenchIn: "3-3/4", wrenchMm: "95.3", note: "common hex bolt/nut" },
    { thread: "2-1/2", threadDiameterIn: "2.500", wrenchIn: "3-7/8", wrenchMm: "98.4", note: "heavy hex or square head" },
    { thread: "2-1/2", threadDiameterIn: "2.500", wrenchIn: "3-11/16", wrenchMm: "93.7", note: "jam nut or low-profile hex" },
    { thread: "2-5/8", threadDiameterIn: "2.625", wrenchIn: "3-15/16", wrenchMm: "100.0", note: "common hex bolt/nut" },
    { thread: "2-5/8", threadDiameterIn: "2.625", wrenchIn: "4-1/16", wrenchMm: "103.2", note: "heavy hex or square head" },
    { thread: "2-5/8", threadDiameterIn: "2.625", wrenchIn: "3-7/8", wrenchMm: "98.4", note: "jam nut or low-profile hex" },
    { thread: "2-3/4", threadDiameterIn: "2.750", wrenchIn: "4-1/8", wrenchMm: "104.8", note: "common hex bolt/nut" },
    { thread: "2-3/4", threadDiameterIn: "2.750", wrenchIn: "4-1/4", wrenchMm: "108.0", note: "heavy hex or square head" },
    { thread: "2-3/4", threadDiameterIn: "2.750", wrenchIn: "4-1/16", wrenchMm: "103.2", note: "jam nut or low-profile hex" },
    { thread: "2-7/8", threadDiameterIn: "2.875", wrenchIn: "4-5/16", wrenchMm: "109.5", note: "common hex bolt/nut" },
    { thread: "2-7/8", threadDiameterIn: "2.875", wrenchIn: "4-7/16", wrenchMm: "112.7", note: "heavy hex or square head" },
    { thread: "2-7/8", threadDiameterIn: "2.875", wrenchIn: "4-1/4", wrenchMm: "108.0", note: "jam nut or low-profile hex" },
    { thread: "3", threadDiameterIn: "3.000", wrenchIn: "4-1/2", wrenchMm: "114.3", note: "common hex bolt/nut" },
    { thread: "3", threadDiameterIn: "3.000", wrenchIn: "4-5/8", wrenchMm: "117.5", note: "heavy hex or square head" },
    { thread: "3", threadDiameterIn: "3.000", wrenchIn: "4-7/16", wrenchMm: "112.7", note: "jam nut or low-profile hex" },
    { thread: "3-1/8", threadDiameterIn: "3.125", wrenchIn: "4-11/16", wrenchMm: "119.1", note: "common hex bolt/nut" },
    { thread: "3-1/8", threadDiameterIn: "3.125", wrenchIn: "4-13/16", wrenchMm: "122.2", note: "heavy hex or square head" },
    { thread: "3-1/8", threadDiameterIn: "3.125", wrenchIn: "4-5/8", wrenchMm: "117.5", note: "jam nut or low-profile hex" },
    { thread: "3-1/4", threadDiameterIn: "3.250", wrenchIn: "4-7/8", wrenchMm: "123.8", note: "common hex bolt/nut" },
    { thread: "3-1/4", threadDiameterIn: "3.250", wrenchIn: "5", wrenchMm: "127.0", note: "heavy hex or square head" },
    { thread: "3-1/4", threadDiameterIn: "3.250", wrenchIn: "4-13/16", wrenchMm: "122.2", note: "jam nut or low-profile hex" },
    { thread: "3-3/8", threadDiameterIn: "3.375", wrenchIn: "5-1/16", wrenchMm: "128.6", note: "common hex bolt/nut" },
    { thread: "3-3/8", threadDiameterIn: "3.375", wrenchIn: "5-3/16", wrenchMm: "131.8", note: "heavy hex or square head" },
    { thread: "3-3/8", threadDiameterIn: "3.375", wrenchIn: "5", wrenchMm: "127.0", note: "jam nut or low-profile hex" },
    { thread: "3-1/2", threadDiameterIn: "3.500", wrenchIn: "5-1/4", wrenchMm: "133.4", note: "common hex bolt/nut" },
    { thread: "3-1/2", threadDiameterIn: "3.500", wrenchIn: "5-3/8", wrenchMm: "136.5", note: "heavy hex or square head" },
    { thread: "3-1/2", threadDiameterIn: "3.500", wrenchIn: "5-3/16", wrenchMm: "131.8", note: "jam nut or low-profile hex" },
    { thread: "3-5/8", threadDiameterIn: "3.625", wrenchIn: "5-7/16", wrenchMm: "138.1", note: "common hex bolt/nut" },
    { thread: "3-5/8", threadDiameterIn: "3.625", wrenchIn: "5-9/16", wrenchMm: "141.3", note: "heavy hex or square head" },
    { thread: "3-5/8", threadDiameterIn: "3.625", wrenchIn: "5-3/8", wrenchMm: "136.5", note: "jam nut or low-profile hex" },
    { thread: "3-3/4", threadDiameterIn: "3.750", wrenchIn: "5-5/8", wrenchMm: "142.9", note: "common hex bolt/nut" },
    { thread: "3-3/4", threadDiameterIn: "3.750", wrenchIn: "5-3/4", wrenchMm: "146.1", note: "heavy hex or square head" },
    { thread: "3-3/4", threadDiameterIn: "3.750", wrenchIn: "5-9/16", wrenchMm: "141.3", note: "jam nut or low-profile hex" },
    { thread: "3-7/8", threadDiameterIn: "3.875", wrenchIn: "5-13/16", wrenchMm: "147.6", note: "common hex bolt/nut" },
    { thread: "3-7/8", threadDiameterIn: "3.875", wrenchIn: "5-15/16", wrenchMm: "150.8", note: "heavy hex or square head" },
    { thread: "3-7/8", threadDiameterIn: "3.875", wrenchIn: "5-3/4", wrenchMm: "146.1", note: "jam nut or low-profile hex" },
    { thread: "4", threadDiameterIn: "4.000", wrenchIn: "6", wrenchMm: "152.4", note: "common hex bolt/nut" },
    { thread: "4", threadDiameterIn: "4.000", wrenchIn: "6-1/8", wrenchMm: "155.6", note: "heavy hex or square head" },
    { thread: "4", threadDiameterIn: "4.000", wrenchIn: "5-15/16", wrenchMm: "150.8", note: "jam nut or low-profile hex" },
  ];

  WRENCH_REFERENCE.sort((left, right) => (
    wrenchSizeInches(left.wrenchIn) - wrenchSizeInches(right.wrenchIn) ||
    left.note.localeCompare(right.note) ||
    Number(left.threadDiameterIn) - Number(right.threadDiameterIn)
  ));

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
      const modeInputs = Array.from(gauge.querySelectorAll("[data-bolt-gauge-mode]"));
      const points = gauge.querySelector("[data-bolt-gauge-points]");
      const lock = gauge.querySelector("[data-bolt-gauge-lock]");
      const sizeLock = gauge.querySelector("[data-bolt-gauge-size-lock]");
      const storedCalibration = Number(storage?.getItem("maintainops.boltGaugePixelsPerInch"));
      const storedLock = storage?.getItem("maintainops.boltGaugeCalibrationLocked");
      if (calibration && Number.isFinite(storedCalibration) && storedCalibration > 0) {
        calibration.value = String(storedCalibration);
      }
      if (lock) lock.checked = storedLock !== "false";
      const update = () => {
        const diameterPx = Number(diameter?.value || 0);
        const pixelsPerInch = Number(calibration?.value || 96);
        const mode = modeInputs.find((input) => input.checked)?.value || "wrench";
        const headPoints = points?.value || "6";
        const locked = !lock || lock.checked;
        const sizeLocked = Boolean(sizeLock?.checked);
        gauge.dataset.boltGaugeModeCurrent = mode;
        gauge.dataset.boltGaugePointsCurrent = headPoints;
        gauge.dataset.boltGaugeSizeLocked = String(sizeLocked);
        if (calibration) calibration.disabled = locked;
        if (diameter) diameter.disabled = sizeLocked;
        if (circle) {
          circle.style.width = `${diameterPx}px`;
          circle.style.height = `${diameterPx}px`;
        }
        if (calibrationLine) calibrationLine.style.width = `${pixelsPerInch}px`;
        const reading = boltGaugeReading(diameterPx, pixelsPerInch, mode);
        if (output) output.textContent = reading ? reading.text : "Calibrate the gauge";
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
      [diameter, calibration, points, lock, sizeLock, ...modeInputs].filter(Boolean).forEach((element) => {
        element.addEventListener("input", update);
        element.addEventListener("change", update);
      });
      if (card) {
        card.addEventListener("click", (event) => {
          if (event.target?.closest?.(".bolt-gauge-card-readout")) return;
          diameter?.focus?.();
        });
      }
      update();
    });
  }

  function bindShopReferenceEvents(options = {}) {
    const doc = options.documentRef || document;
    const storage = options.storage || (typeof window !== "undefined" ? window.localStorage : null);
    const favoriteStore = options.favoriteStore || null;
    const favoriteKey = "maintainops.shopReferenceFavorites";
    const pageKey = "maintainops.shopReferencePage";

    doc.querySelectorAll("[data-shop-reference-panel]").forEach((panel) => {
      if (panel.dataset.shopReferenceBound === "true") return;
      panel.dataset.shopReferenceBound = "true";
      const grid = panel.querySelector("[data-shop-reference-grid]");
      const cards = Array.from(panel.querySelectorAll("[data-shop-reference-card]"));
      if (!grid || !cards.length) return;

      const pageSize = Math.max(1, Number(panel.dataset.shopReferencePageSize) || 12);
      const searchInput = panel.querySelector("[data-shop-reference-search-input]");
      const kindGrid = panel.querySelector("[data-shop-reference-kind-grid]");
      const kindCards = () => Array.from(kindGrid?.querySelectorAll?.("[data-shop-reference-kind]") || []);
      const categoryGrid = panel.querySelector("[data-shop-reference-category-grid]");
      const categoryGroup = panel.querySelector("[data-shop-reference-category-group]");
      const categoryCards = () => Array.from(categoryGrid?.querySelectorAll?.("[data-shop-reference-category]") || []);
      const backButton = panel.querySelector("[data-shop-reference-back]");
      const activeCategoryBanner = panel.querySelector("[data-shop-reference-active-category]");
      const activeCategoryLabelElement = panel.querySelector("[data-shop-reference-active-category-label]");
      const emptyState = panel.querySelector("[data-shop-reference-empty]");
      let currentPage = Math.max(1, Number(storage?.getItem(pageKey)) || 1);
      let searchQuery = "";
      let activeKind = "";
      let activeCategory = "";
      let cachedFavorites = null;
      const readFavorites = () => {
        if (cachedFavorites) return cachedFavorites;
        try {
          const parsed = JSON.parse(storage?.getItem(favoriteKey) || "[]");
          cachedFavorites = Array.isArray(parsed) ? parsed.filter(Boolean) : [];
        } catch (error) {
          cachedFavorites = [];
        }
        return cachedFavorites;
      };
      const writeFavorites = (favorites) => {
        cachedFavorites = Array.isArray(favorites) ? favorites.filter(Boolean) : [];
        try {
          storage?.setItem(favoriteKey, JSON.stringify(cachedFavorites));
        } catch (error) {}
        if (favoriteStore?.save) {
          Promise.resolve(favoriteStore.save(cachedFavorites)).catch((error) => {
            console.warn?.("Could not sync shop reference favorites.", error);
          });
        }
      };
      const normalizedTitle = (card) => card.dataset.shopReferenceTitle || "";
      const favoriteButton = (card) => card.querySelector("[data-shop-reference-favorite]");
      const applyFavoriteState = (favorites) => {
        const favoriteSet = new Set(favorites);
        cards.forEach((card) => {
          const active = favoriteSet.has(normalizedTitle(card));
          card.classList.toggle("shop-reference-favorited", active);
          const button = favoriteButton(card);
          if (button) {
            button.setAttribute("aria-pressed", String(active));
            button.innerHTML = active ? "&#9733;" : "&#9734;";
            button.title = active ? "Remove favorite" : "Favorite chart";
          }
        });
      };
      const orderedCards = (favorites) => {
        const favoriteSet = new Set(favorites);
        const byTitle = new Map(cards.map((card) => [normalizedTitle(card), card]));
        const favoriteCards = favorites.map((title) => byTitle.get(title)).filter(Boolean);
        const rest = cards
          .filter((card) => !favoriteSet.has(normalizedTitle(card)))
          .sort((a, b) => normalizedTitle(a).localeCompare(normalizedTitle(b)));
        return [...favoriteCards, ...rest];
      };
      const matchesSearch = (card) => {
        const tokens = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
        if (!tokens.length) return true;
        const haystack = `${normalizedTitle(card)} ${card.dataset.shopReferenceSearch || ""}`.toLowerCase();
        return tokens.every((token) => haystack.includes(token));
      };
      const matchesCategory = (card) => (
        !activeCategory || searchQuery || card.dataset.shopReferenceCategory === activeCategory
      );
      const matchesKind = (card) => (
        !activeKind || searchQuery || card.dataset.shopReferenceKind === activeKind
      );
      const categoryCountForKind = (categoryId) => cards.filter((card) => (
        (!activeKind || card.dataset.shopReferenceKind === activeKind)
        && (!categoryId || card.dataset.shopReferenceCategory === categoryId)
      )).length;
      const activeKindLabel = () => (
        kindCards().find((card) => card.dataset.shopReferenceKind === activeKind)?.querySelector?.("span")?.textContent?.trim() || activeKind
      );
      const activeCategoryLabel = () => (
        categoryCards().find((card) => card.dataset.shopReferenceCategory === activeCategory)?.querySelector?.("span")?.textContent?.trim() || activeCategory
      );
      const pageStatus = () => panel.querySelector("[data-shop-reference-page-status]");
      const pageButton = (direction) => panel.querySelector(`[data-shop-reference-page="${direction}"]`);
      const closeCards = (except = null) => {
        cards.forEach((card) => {
          if (card !== except) card.removeAttribute?.("open");
        });
      };
      const focusResults = () => {
        grid?.scrollIntoView?.({ behavior: "smooth", block: "start" });
      };
      const renderOrder = (options = {}) => {
        if (options.closeOpen) closeCards();
        const favorites = readFavorites();
        applyFavoriteState(favorites);
        const hasFilter = Boolean(searchQuery || activeKind || activeCategory);
        if (kindGrid) kindGrid.hidden = false;
        if (categoryGroup) categoryGroup.hidden = Boolean(searchQuery || !activeKind);
        if (categoryGrid) categoryGrid.hidden = Boolean(searchQuery || !activeKind);
        if (grid) grid.hidden = false;
        if (backButton) {
          backButton.textContent = "Reset filters";
        }
        if (activeCategoryBanner) {
          activeCategoryBanner.hidden = !hasFilter;
        }
        if (activeCategoryLabelElement) {
          if (searchQuery) {
            activeCategoryLabelElement.textContent = `Search results for "${searchQuery}"`;
          } else if (activeKind && activeCategory) {
            activeCategoryLabelElement.textContent = `${activeKindLabel()} / ${activeCategoryLabel()}`;
          } else if (activeKind) {
            activeCategoryLabelElement.textContent = `Type: ${activeKindLabel()}`;
          } else if (activeCategory) {
            activeCategoryLabelElement.textContent = `Trade: ${activeCategoryLabel()}`;
          } else {
            activeCategoryLabelElement.textContent = "";
          }
        }
        kindCards().forEach((card) => {
          const active = card.dataset.shopReferenceKind === activeKind && !searchQuery;
          card.classList.toggle("shop-reference-kind-active", active);
          card.setAttribute?.("aria-pressed", String(active));
        });
        categoryCards().forEach((card) => {
          const categoryId = card.dataset.shopReferenceCategory || "";
          const relevantCount = categoryCountForKind(categoryId);
          const countElement = card.querySelector?.("strong");
          if (countElement && activeKind && !searchQuery) {
            countElement.textContent = `${relevantCount} charts`;
          }
          card.hidden = Boolean(activeKind && !searchQuery && categoryId && relevantCount === 0);
          const active = card.dataset.shopReferenceCategory === activeCategory && !searchQuery;
          card.classList.toggle("shop-reference-category-active", active);
          card.setAttribute?.("aria-pressed", String(active));
        });
        const ordered = orderedCards(favorites).filter((card) => matchesSearch(card) && matchesKind(card) && matchesCategory(card));
        const totalPages = Math.max(1, Math.ceil(ordered.length / pageSize));
        currentPage = Math.min(Math.max(1, currentPage), totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const pageCards = ordered.slice(startIndex, startIndex + pageSize);
        grid.textContent = "";
        pageCards.forEach((card) => grid.appendChild(card));
        if (emptyState) emptyState.hidden = ordered.length > 0;
        const status = pageStatus();
        if (status) {
          const firstShown = ordered.length ? startIndex + 1 : 0;
          const lastShown = Math.min(ordered.length, startIndex + pageCards.length);
          const searchSuffix = searchQuery ? ` for "${searchQuery}"` : "";
          const kindSuffix = activeKind && !searchQuery ? ` in ${activeKindLabel()}` : "";
          const categorySuffix = activeCategory && !searchQuery ? ` in ${activeCategoryLabel()}` : "";
          status.textContent = `Showing ${firstShown}-${lastShown} of ${ordered.length}${kindSuffix}${categorySuffix}${searchSuffix} - Page ${currentPage} of ${totalPages}`;
        }
        const prev = pageButton("prev");
        const next = pageButton("next");
        if (prev) prev.disabled = currentPage <= 1;
        if (next) next.disabled = currentPage >= totalPages;
        try {
          storage?.setItem(pageKey, String(currentPage));
        } catch (error) {}
      };

      panel.querySelectorAll("[data-shop-reference-page]").forEach((button) => {
        button.addEventListener("click", () => {
          currentPage += button.dataset.shopReferencePage === "next" ? 1 : -1;
          renderOrder({ closeOpen: true });
        });
      });

      searchInput?.addEventListener("input", () => {
        searchQuery = searchInput.value.trim();
        currentPage = 1;
        renderOrder({ closeOpen: true });
        if (searchQuery) focusResults();
      });

      panel.querySelectorAll("[data-shop-reference-top]").forEach((button) => {
        button.addEventListener?.("click", () => {
          searchQuery = button.dataset.shopReferenceTop || "";
          activeKind = "";
          activeCategory = "";
          if (searchInput) searchInput.value = searchQuery;
          currentPage = 1;
          renderOrder({ closeOpen: true });
          focusResults();
        });
      });

      kindGrid?.addEventListener?.("click", (event) => {
        const card = event.target?.closest?.("[data-shop-reference-kind]");
        if (!card || !kindGrid.contains?.(card)) return;
        activeKind = card.dataset.shopReferenceKind || "";
        activeCategory = "";
        currentPage = 1;
        renderOrder({ closeOpen: true });
        focusResults();
      });

      kindCards().forEach((card) => {
        card.addEventListener?.("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault?.();
          activeKind = card.dataset.shopReferenceKind || "";
          activeCategory = "";
          currentPage = 1;
          renderOrder({ closeOpen: true });
          focusResults();
        });
      });

      categoryGrid?.addEventListener?.("click", (event) => {
        const card = event.target?.closest?.("[data-shop-reference-category]");
        if (!card || !categoryGrid.contains?.(card)) return;
        activeCategory = card.dataset.shopReferenceCategory || "";
        currentPage = 1;
        renderOrder({ closeOpen: true });
        focusResults();
      });

      categoryCards().forEach((card) => {
        card.addEventListener?.("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault?.();
          activeCategory = card.dataset.shopReferenceCategory || "";
          currentPage = 1;
          renderOrder({ closeOpen: true });
          focusResults();
        });
      });

      backButton?.addEventListener?.("click", () => {
        activeKind = "";
        activeCategory = "";
        searchQuery = "";
        if (searchInput) searchInput.value = "";
        currentPage = 1;
        renderOrder({ closeOpen: true });
      });

      cards.forEach((card) => {
        card.addEventListener?.("toggle", () => {
          if (card.open) closeCards(card);
        });
        const button = favoriteButton(card);
        if (!button) return;
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const title = normalizedTitle(card);
          const favorites = readFavorites().filter((favorite) => favorite !== title);
          if (button.getAttribute("aria-pressed") !== "true") favorites.push(title);
          writeFavorites(favorites);
          currentPage = 1;
          renderOrder({ closeOpen: true });
        });
      });
      renderOrder();
      if (favoriteStore?.load) {
        Promise.resolve(favoriteStore.load()).then((favorites) => {
          if (!Array.isArray(favorites)) return;
          cachedFavorites = favorites.filter(Boolean);
          try {
            storage?.setItem(favoriteKey, JSON.stringify(cachedFavorites));
          } catch (error) {}
          currentPage = 1;
          renderOrder({ closeOpen: true });
        }).catch((error) => {
          console.warn?.("Could not load shop reference favorites.", error);
        });
      }
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
    bindShopReferenceEvents(options);
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
    bindShopReferenceEvents,
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
      bindShopReferenceEvents,
    };
  }
})();
