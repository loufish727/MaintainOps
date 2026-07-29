(function () {
  const DEFINITIONS = Object.freeze({
    lcp_ms: {
      label: "Largest Contentful Paint",
      shortLabel: "Page paint (LCP)",
      unit: "ms",
      direction: "lower",
      good: 2500,
      watch: 4000,
      gaugeMax: 6000,
      target: "2.5 s or less",
      basis: "Core Web Vitals page-paint threshold; separate from workspace readiness",
    },
    inp_ms: {
      label: "Interaction to Next Paint",
      shortLabel: "Responsiveness",
      unit: "ms",
      direction: "lower",
      good: 200,
      watch: 500,
      gaugeMax: 800,
      target: "200 ms or less",
      basis: "Core Web Vitals threshold",
    },
    cls: {
      label: "Cumulative Layout Shift",
      shortLabel: "Visual stability",
      unit: "score",
      direction: "lower",
      good: 0.1,
      watch: 0.25,
      gaugeMax: 0.5,
      target: "0.10 or less",
      basis: "Core Web Vitals threshold",
    },
    workspace_ready_ms: {
      label: "Workspace Ready",
      shortLabel: "Workspace ready",
      unit: "ms",
      direction: "lower",
      good: 3000,
      watch: 6000,
      gaugeMax: 10000,
      target: "3 s or less",
      basis: "Authenticated load start through usable workspace",
    },
    section_navigation_ms: {
      label: "Section Navigation",
      shortLabel: "Screen change",
      unit: "ms",
      direction: "lower",
      good: 500,
      watch: 1500,
      gaugeMax: 3000,
      target: "500 ms or less",
      basis: "MaintainOps product target",
    },
    query_latency_ms: {
      label: "Data Loader Response",
      shortLabel: "Data loader",
      unit: "ms",
      direction: "lower",
      good: 500,
      watch: 1500,
      gaugeMax: 3000,
      target: "500 ms or less",
      basis: "MaintainOps product target",
    },
    client_error_rate: {
      label: "Client Errors per 100 Visits",
      shortLabel: "Client errors",
      unit: "per_100",
      direction: "lower",
      good: 1,
      watch: 5,
      gaugeMax: 10,
      target: "1 or fewer per 100 visits",
      basis: "App and data-loader error events",
    },
    spatial_fps: {
      label: "3D Frame Rate",
      shortLabel: "3D smoothness",
      unit: "fps",
      direction: "higher",
      good: 40,
      watch: 24,
      gaugeMax: 60,
      target: "40 FPS or more",
      basis: "Mixed-device MaintainOps target",
    },
    spatial_ready_ms: {
      label: "3D View Ready Time",
      shortLabel: "3D view ready",
      unit: "ms",
      direction: "lower",
      good: 5000,
      watch: 10000,
      gaugeMax: 20000,
      target: "5 s or less",
      basis: "Performance-view entry through first rendered frame",
    },
    connection_downlink_mbps: {
      label: "Estimated Connection",
      shortLabel: "Network estimate",
      unit: "mbps",
      direction: "higher",
      good: 10,
      watch: 2,
      gaugeMax: 25,
      target: "10 Mbps or more",
      basis: "Browser connection estimate",
    },
    storage_usage_percent: {
      label: "Company Linked File Usage",
      shortLabel: "Company files",
      unit: "percent",
      direction: "lower",
      good: 70,
      watch: 85,
      gaugeMax: 100,
      target: "Keep below 70% of project allowance",
      basis: "Company-linked files compared with the 100 GB project allowance",
    },
  });

  function finite(value) {
    if (value === null || value === undefined || value === "") return null;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  }

  function formatValue(value, unit) {
    const numeric = finite(value);
    if (numeric === null) return "Collecting";
    if (unit === "ms") return numeric >= 1000 ? `${(numeric / 1000).toFixed(numeric >= 10000 ? 0 : 1)} s` : `${Math.round(numeric)} ms`;
    if (unit === "percent") return `${numeric.toFixed(numeric < 10 ? 1 : 0)}%`;
    if (unit === "per_100") return `${numeric.toFixed(numeric < 10 ? 1 : 0)} / 100`;
    if (unit === "fps") return `${Math.round(numeric)} FPS`;
    if (unit === "mbps") return `${numeric.toFixed(numeric < 10 ? 1 : 0)} Mbps`;
    if (unit === "score") return numeric.toFixed(3);
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(numeric);
  }

  function gradeMetric(metric, value, context = {}) {
    const definition = DEFINITIONS[metric];
    const numeric = finite(value);
    if (!definition || numeric === null) {
      return {
        metric,
        label: definition?.label || metric,
        shortLabel: definition?.shortLabel || metric,
        value: null,
        valueText: "Collecting",
        status: "collecting",
        statusLabel: "Collecting",
        gaugePosition: 0,
        direction: definition?.direction || "lower",
        directionLabel: definition?.direction === "higher" ? "Higher is better" : "Lower is better",
        target: definition?.target || "No target defined",
        basis: definition?.basis || "No threshold defined",
        sampleCount: Number(context.sampleCount) || 0,
        statisticLabel: context.statisticLabel || "Current",
        currentValue: null,
        currentValueText: "",
        currentComparisonLabel: "",
      };
    }

    let good = definition.good;
    let watch = definition.watch;
    const isGood = definition.direction === "higher" ? numeric >= good : numeric <= good;
    const isWatch = definition.direction === "higher" ? numeric >= watch : numeric <= watch;
    const status = isGood ? "good" : isWatch ? "watch" : "poor";
    const statusLabel = status === "good" ? "Good" : status === "watch" ? "Watch" : "Poor";
    const gaugePosition = Math.max(0, Math.min(100, (numeric / definition.gaugeMax) * 100));
    const goodPosition = Math.max(0, Math.min(100, (good / definition.gaugeMax) * 100));
    const watchPosition = Math.max(0, Math.min(100, (watch / definition.gaugeMax) * 100));
    const currentValue = finite(context.currentValue);
    const statisticLabel = context.statisticLabel || "Current";
    const currentValueText = currentValue === null ? "" : formatValue(currentValue, definition.unit);
    return {
      metric,
      label: definition.label,
      shortLabel: definition.shortLabel,
      value: numeric,
      valueText: formatValue(numeric, definition.unit),
      unit: definition.unit,
      status,
      statusLabel,
      gaugePosition,
      goodPosition,
      watchPosition,
      direction: definition.direction,
      directionLabel: definition.direction === "higher" ? "Higher is better" : "Lower is better",
      target: definition.target,
      basis: definition.basis,
      sampleCount: Number(context.sampleCount) || 0,
      statisticLabel,
      currentValue,
      currentValueText,
      currentComparisonLabel: currentValueText && statisticLabel !== "Latest this visit"
        ? `Latest this visit ${currentValueText}`
        : "",
    };
  }

  function overallHealth(metrics = []) {
    const graded = metrics.filter((metric) => metric.status !== "collecting");
    if (!graded.length) return { score: null, status: "collecting", label: "Collecting" };
    const points = { good: 100, watch: 62, poor: 24 };
    const score = Math.round(graded.reduce((total, metric) => total + points[metric.status], 0) / graded.length);
    return {
      score,
      status: score >= 85 ? "good" : score >= 55 ? "watch" : "poor",
      label: score >= 85 ? "Good" : score >= 55 ? "Watch" : "Poor",
    };
  }

  const api = { DEFINITIONS, formatValue, gradeMetric, overallHealth };
  if (typeof window !== "undefined") window.MaintainOpsPlatformPerformanceThresholds = api;
  if (typeof module !== "undefined") module.exports = api;
})();
