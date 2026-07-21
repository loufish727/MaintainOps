import { createStorageWorld } from "./platformSpatialWorld.js";

const parentOrigin = window.location.origin;
const MEBI = 1024 * 1024;
let world = null;
let hasSnapshot = false;
let frameState = null;
let worldRenderAnnounced = false;
const frameStartedAt = performance.now();

const fallbackSnapshot = {
  sampledAt: new Date().toISOString(),
  sampling: {
    status: "pending",
    message: "Waiting for the host application to provide company data.",
    notices: [],
  },
  telemetry: { message: "Platform instrumentation is not connected yet." },
  health: {
    score: null,
    status: "collecting",
    label: "Collecting",
    measuredCount: 0,
    totalCount: 4,
    metrics: [
      { metric: "lcp_ms", label: "Largest Contentful Paint", shortLabel: "Page load", valueText: "Collecting", status: "collecting", statusLabel: "Collecting", gaugePosition: 0, direction: "lower", target: "2.5 s or less", basis: "Core Web Vitals threshold", sampleCount: 0 },
      { metric: "inp_ms", label: "Interaction to Next Paint", shortLabel: "Responsiveness", valueText: "Collecting", status: "collecting", statusLabel: "Collecting", gaugePosition: 0, direction: "lower", target: "200 ms or less", basis: "Core Web Vitals threshold", sampleCount: 0 },
      { metric: "query_latency_ms", label: "Data Query Latency", shortLabel: "Data response", valueText: "Collecting", status: "collecting", statusLabel: "Collecting", gaugePosition: 0, direction: "lower", target: "500 ms or less", basis: "MaintainOps product target", sampleCount: 0 },
      { metric: "spatial_fps", label: "3D Frame Rate", shortLabel: "3D smoothness", valueText: "Collecting", status: "collecting", statusLabel: "Collecting", gaugePosition: 0, direction: "higher", target: "50 FPS desktop / 40 FPS mobile", basis: "Device-aware MaintainOps target", sampleCount: 0 },
    ],
  },
  summary: {
    teamSeats: 0,
    requestsToday: 0,
    ordersReceivedToday: 0,
    processEventsToday: 0,
    publicIntakeTotal: 0,
    ordersReceivedTotal: 0,
    totalRecords: 0,
    assets: 0,
    parts: 0,
    locations: 0,
    storage: { available: false, totalBytesText: "Role limited", fileCount: 0 },
  },
  systems: [
    { id: "intake", label: "Public Intake", value: "0 received", detail: "Awaiting company telemetry" },
    { id: "orders", label: "Order Throughput", value: "0 total", detail: "Awaiting company telemetry" },
    { id: "flow", label: "Today's Process Flow", value: "0 events", detail: "Awaiting company telemetry" },
    { id: "vault", label: "Data Vault", value: "Role limited", detail: "Storage detail follows existing access" },
    { id: "footprint", label: "Platform Footprint", value: "0 records", detail: "Awaiting company telemetry" },
  ],
  signals: [
    { title: "Platform snapshot loading", value: "Waiting", detail: "The host application is preparing live company data.", kind: "active" },
  ],
  timeline: [],
  plants: [],
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function number(value) {
  return Number(value) || 0;
}

function numberText(value) {
  if (value === null || value === undefined || value === "") return "Unavailable";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "Unavailable";
  return new Intl.NumberFormat("en-US").format(numeric);
}

function samplingLabel(sampling) {
  if (sampling?.status === "degraded") return "Partial data";
  if (sampling?.status === "pending") return "Pending";
  return "Current";
}

function countWithSuffix(value, suffix) {
  return value === null || value === undefined ? "Unavailable" : `${numberText(value)} ${suffix}`;
}

function compactLabel(value, fallback) {
  const text = String(value || fallback || "").trim();
  return text.length > 18 ? `${text.slice(0, 17)}...` : text;
}

function shortDay(value, fallbackIndex) {
  const text = String(value || "");
  if (!text) return `D${fallbackIndex + 1}`;
  return compactLabel(text.replace(/\s+\d{4}$/, ""), `D${fallbackIndex + 1}`);
}

function signalKindToSeverity(kind) {
  if (kind === "attention") return "high";
  if (kind === "stable") return "low";
  return "medium";
}

function signalWeight(signal, index) {
  const numeric = Number.parseFloat(String(signal?.value || "").replace(/[^0-9.]/g, ""));
  return Math.max(1, numeric || 10 - index) * MEBI;
}

function systemWeight(system, index) {
  const numeric = Number.parseFloat(String(system?.value || "").replace(/[^0-9.]/g, ""));
  return Math.max(1, numeric || 8 - index) * MEBI;
}

function buildSignals(snapshot) {
  const direct = Array.isArray(snapshot.signals) ? snapshot.signals : [];
  const systems = Array.isArray(snapshot.systems) ? snapshot.systems : [];
  const timeline = Array.isArray(snapshot.timeline) ? snapshot.timeline : [];
  const derived = systems.map((system) => ({
    title: system.label,
    value: system.value,
    detail: system.detail,
    kind: system.tone === "amber" ? "attention" : "active",
    system: system.label,
  }));
  const latest = timeline.at(-1);
  if (latest) {
    const ordersReceived = number(latest.ordersReceived ?? latest.workCreated);
    derived.push({
      title: "Today\'s process flow",
      value: `${number(latest.requests) + ordersReceived} events`,
      detail: `${number(latest.requests)} intake and ${ordersReceived} orders received`,
      kind: "active",
      system: "Process Data Flow",
    });
  }
  const combined = [];
  const seenSystems = new Set();
  [...direct, ...derived].forEach((signal) => {
    const identity = String(signal.system || signal.title || "").trim().toLowerCase();
    if (!identity || seenSystems.has(identity)) return;
    seenSystems.add(identity);
    combined.push(signal);
  });
  while (combined.length < 10) {
    const position = String(combined.length + 1).padStart(2, "0");
    combined.push({
      title: `Telemetry channel ${position}`,
      value: "Pending",
      detail: "Telemetry will appear after it is connected to Maintain Ops.",
      kind: "stable",
      system: `Platform Instrumentation ${position}`,
    });
  }
  return combined.slice(0, 10);
}

function buildFrameData(snapshot) {
  const summary = snapshot.summary || fallbackSnapshot.summary;
  const health = snapshot.health || fallbackSnapshot.health;
  const sampling = snapshot.sampling || { status: "current", message: "Company data sampled.", notices: [] };
  const statusLabel = samplingLabel(sampling);
  const systems = (snapshot.systems || fallbackSnapshot.systems).slice(0, 5);
  const signals = buildSignals(snapshot);
  const timeline = (snapshot.timeline || []).slice(-12);
  const buckets = systems.map((system, index) => ({
    title: system.label,
    files: Math.max(1, number(String(system.value).replace(/[^0-9.]/g, "")) || 1),
    itemLabel: "signals",
    size: systemWeight(system, index),
    valueLabel: system.value,
    type: "systems",
    eyebrow: `Major app systems / ${String(index + 1).padStart(2, "0")} of ${String(systems.length).padStart(2, "0")}`,
    subtitle: "All-plant aggregated platform metric",
    badge: system.value,
    rows: [
      ["Current measure", system.value],
      ["System detail", system.detail],
      ["Scope", "Current company / all plants"],
      ["Telemetry", "Company sampled"],
    ],
    footer: "Maintain Ops performance index",
    status: statusLabel,
  }));
  const files = signals.map((signal, index) => ({
    name: signal.title,
    bucket: signal.system || (systems[index % Math.max(systems.length, 1)]?.label || "Platform Signal"),
    category: "App performance",
    equipment: signal.detail,
    size: signalWeight(signal, index),
    valueLabel: signal.value,
    eyebrow: "Current notable signal",
    subtitle: `${signal.system || "Platform"} / all-plant aggregate`,
    badge: `Rank ${String(index + 1).padStart(2, "0")} of ${signals.length}`,
    rows: [
      ["Current value", signal.value],
      ["System", signal.system || "Platform"],
      ["Context", signal.detail],
      ["State", signal.kind === "attention" ? "Review" : "Current"],
    ],
    footer: "Live platform signal index",
    status: signal.kind === "attention" ? "Review" : "Current",
  }));
  const months = timeline.map((row, index) => {
    const ordersReceived = number(row.ordersReceived ?? row.workCreated);
    const total = number(row.requests) + ordersReceived;
    return {
      label: row.label || `Day ${index + 1}`,
      added: Math.max(total, 0) * MEBI,
      valueLabel: `${total} events`,
      subtitle: "Daily platform activity",
      badge: total ? "Active" : "Quiet",
      rows: [
        ["Public intake", String(number(row.requests))],
        ["Orders received", String(ordersReceived)],
        ["Order throughput", String(ordersReceived)],
        ["Process data flow", `${total} events`],
      ],
      footer: "Company activity runway",
      status: total ? "Tracked" : "Quiet",
    };
  });
  return {
    health,
    telemetry: snapshot.telemetry || fallbackSnapshot.telemetry,
    summary,
    systems,
    signals,
    buckets,
    files,
    months,
    rules: systems.map((system) => ({
      title: system.label,
      summary: system.value,
      detail: system.detail,
    })),
    operations: signals.slice(0, 5).map((signal) => ({
      severity: signalKindToSeverity(signal.kind),
      title: signal.title,
      detail: `${signal.value} - ${signal.detail}`,
    })),
    recentActivity: [
      {
        label: "Public intake",
        value: countWithSuffix(summary.requestsToday, "today"),
        detail: summary.publicIntakeTotal === null ? "Company total unavailable" : `${numberText(summary.publicIntakeTotal)} total received`,
      },
      {
        label: "Orders received",
        value: countWithSuffix(summary.ordersReceivedToday, "today"),
        detail: summary.ordersReceivedTotal === null ? "Company total unavailable" : `${numberText(summary.ordersReceivedTotal)} total recorded`,
      },
      {
        label: "Process data flow",
        value: countWithSuffix(summary.processEventsToday, "events"),
        detail: "Today across public intake and orders received",
      },
    ],
    core: {
      eyebrow: "Maintain Ops / App Health",
      title: "App Health",
      subtitle: "Measured browser and platform responsiveness",
      badge: health.label,
      tooltip: health.score === null ? "Collecting performance samples" : `${health.score} of 100 across measured signals`,
      rows: [
        ["Health score", health.score === null ? "Collecting" : `${health.score}/100`],
        ["Signals measured", `${health.measuredCount || 0}/${health.totalCount || 0}`],
        [health.metrics?.[0]?.shortLabel || "Page load", health.metrics?.[0]?.valueText || "Collecting"],
        [health.metrics?.[1]?.shortLabel || "Responsiveness", health.metrics?.[1]?.valueText || "Collecting"],
      ],
      footer: "Company app health command core",
      status: health.label,
    },
    sampling,
  };
}

function getElements() {
  return {
    headerKicker: document.querySelector(".header-kicker"),
    headerSubtitle: document.querySelector(".subtitle.subtle"),
    headerStateLabel: document.querySelector(".header-system-state small"),
    headerState: document.querySelector(".header-system-state strong"),
    samplingNotice: document.querySelector("#sampling-notice"),
    stageReadoutStatus: document.querySelector(".readout-status"),
    stageReadoutMetrics: [...document.querySelectorAll(".readout-metrics > span")],
    search: document.querySelector("#file-search"),
    refresh: document.querySelector("#refresh-button"),
    zoneIndicator: document.querySelector("#zone-indicator"),
    telemetryRows: [...document.querySelectorAll(".telemetry-row")],
    activityEvents: [...document.querySelectorAll(".activity-event")],
    chartStats: [...document.querySelectorAll(".chart-stats > span")],
    timelineMonths: [...document.querySelectorAll("[data-timeline-month]")],
    stageActions: [...document.querySelectorAll("[data-world-target]")],
    timelineSource: document.querySelector("#timeline-source"),
    sourcePanels: [...document.querySelectorAll(".source-lattice > .source-panel")],
    summarySource: document.querySelector(".summary-source"),
    rulesGrid: document.querySelector("#rules-grid"),
    usageChart: document.querySelector("#usage-chart"),
    bucketList: document.querySelector("#bucket-list"),
    fileList: document.querySelector("#file-list"),
    fileEmpty: document.querySelector("#file-empty"),
    filesCount: document.querySelector("#files-count"),
    clearSearch: document.querySelector("#clear-search"),
    updated: document.querySelector("#updated-pill"),
    opsGrid: document.querySelector("#ops-grid"),
    dialog: document.querySelector("#file-dialog"),
    dialogTitle: document.querySelector("#dialog-title"),
    dialogDetails: document.querySelector("#dialog-details"),
    canvas: document.querySelector("#storage-world"),
    touchTargets: document.querySelector("[data-spatial-touch-targets]"),
    tooltip: document.querySelector("#world-tooltip"),
    exit: document.querySelector("[data-performance-exit]"),
    qualityButtons: [...document.querySelectorAll("[data-quality-tier]")],
    timelineConsoleDetail: document.querySelector(".timeline-console-head small"),
    timelineConsoleWindow: document.querySelector(".timeline-console-head > span"),
  };
}

let els = null;
let activeBucketFilter = "all";

function updateStaticCopy(data) {
  const { summary, systems, months, sampling, health } = data;
  const statusLabel = health?.label || samplingLabel(sampling);
  const isCurrent = sampling.status === "current";
  const telemetryUnavailable = data.telemetry?.status === "unavailable";
  document.title = "Maintain Ops App Performance";
  document.documentElement.classList.toggle("platform-spatial-degraded", sampling.status === "degraded");
  document.documentElement.classList.toggle("platform-spatial-pending", sampling.status === "pending");
  document.documentElement.dataset.health = health?.status || "collecting";
  els.headerKicker.textContent = "App Performance";
  els.headerSubtitle.innerHTML = summary.totalRecords === null
    ? "Company record count unavailable"
    : `<span id="linked-files-count">${escapeHtml(numberText(summary.totalRecords))}</span> company records monitored`;
  els.headerStateLabel.textContent = "App experience";
  els.headerState.innerHTML = `<i aria-hidden="true"></i>${escapeHtml(statusLabel)}`;
  els.samplingNotice.hidden = isCurrent && !telemetryUnavailable;
  if (!els.samplingNotice.hidden) {
    els.samplingNotice.querySelector("strong").textContent = telemetryUnavailable ? "Telemetry unavailable" : statusLabel;
    els.samplingNotice.querySelector("span").textContent = telemetryUnavailable ? data.telemetry.message : sampling.message;
  }
  const stageMetrics = [
    ["Orders Through System", numberText(summary.ordersReceivedTotal), "all company history"],
    ["Public Intake Total", numberText(summary.publicIntakeTotal), "all company history"],
    ["Data Stored", summary.storage?.available ? summary.storage.totalBytesText : "Role limited", ""],
    ["Records Monitored", numberText(summary.totalRecords), ""],
  ];
  els.stageReadoutStatus.innerHTML = `App Experience <b>${escapeHtml(statusLabel)}</b>`;
  els.stageReadoutMetrics.forEach((metric, index) => {
    const [label, value, detail] = stageMetrics[index] || ["Platform signal", "Current", ""];
    metric.querySelector("small").textContent = label;
    metric.querySelector("b").textContent = value;
    const detailNode = metric.querySelector("em");
    if (detailNode) detailNode.textContent = detail;
  });
  els.search.placeholder = "Search systems...";
  const telemetry = [
    ["App health", health?.score === null ? "Collecting" : `${health.score}/100`],
    ...((health?.metrics || []).slice(0, 4).map((metric) => [metric.shortLabel, metric.valueText])),
  ];
  els.telemetryRows.forEach((row, index) => {
    const entry = telemetry[index] || ["Platform signal", "Current"];
    row.querySelector("small").textContent = entry[0];
    row.querySelector("strong").textContent = entry[1];
  });
  els.activityEvents.forEach((row, index) => {
    const activity = data.recentActivity[index] || { label: "Process telemetry", value: "Pending", detail: "Awaiting source connection" };
    row.querySelector("small").textContent = "TODAY";
    row.querySelector("strong").innerHTML = `${escapeHtml(activity.label)}<em>${escapeHtml(`${activity.value} - ${activity.detail}`)}</em>`;
  });
  const activityHead = document.querySelector(".activity-head");
  activityHead.querySelector("small").textContent = "Process data stream";
  activityHead.querySelector("strong").textContent = "Today at a glance";
  activityHead.querySelector("b").innerHTML = `<i aria-hidden="true"></i>${escapeHtml(statusLabel)}`;
  document.querySelector(".source-lattice-head p").textContent = "Performance sources";
  document.querySelector(".source-lattice-head h2").textContent = "Maintain Ops Platform Archive";
  document.querySelector(".source-lattice-head > span").innerHTML = `<i aria-hidden="true"></i>${systems.length} systems sampled`;
  const sourceSummaries = [...document.querySelectorAll(".source-summary")];
  const labels = [
    ["App Health", `${health?.measuredCount || 0}/${health?.totalCount || 0} measured`],
    ["App Systems", `${systems.length} systems`],
    ["Activity Runway", `${months.length} days`],
    ["Platform Systems", `${systems.length} systems`],
    ["Notable Signals", `${data.files.length} shown`],
    ["Instrumentation Queue", `${data.operations.length} signals`],
  ];
  sourceSummaries.forEach((summaryNode, index) => {
    const [label, value] = labels[index] || ["Platform source", "Current"];
    summaryNode.querySelector("span").textContent = label;
    summaryNode.querySelector("strong").textContent = value;
  });
  document.querySelector("#rules-title").innerHTML = "Major App Systems <span>Current company-scoped operating signals</span>";
  document.querySelector(".rules-panel .section-heading p").textContent = "Each tower above represents one part of the Maintain Ops platform. Values are sampled from live company records where they exist.";
  document.querySelector("#month-title").innerHTML = "Activity Runway <span>Recent company activity</span>";
  document.querySelector(".chart-panel .section-heading p").textContent = "Public intake and order throughput across the selected activity window.";
  document.querySelector("#space-title").innerHTML = "Platform Systems <span>Major capabilities</span>";
  document.querySelector(".buckets-panel .section-heading p").textContent = "The spatial towers map directly to the five major platform systems.";
  document.querySelector("#files-title").innerHTML = "Current Notable Signals <span>Live platform index</span>";
  document.querySelector(".files-panel .section-heading p").textContent = "The front physical cubes represent the current signals that need attention or mark momentum.";
  document.querySelector("#ops-title").innerHTML = "Instrumentation Queue <span>Observed platform conditions</span>";
  document.querySelector(".operations-panel .section-heading p").textContent = "Only values Maintain Ops can actually observe are presented as live. Missing telemetry remains marked as pending.";
  const chartStats = [
    ["Process Events Today", numberText(summary.processEventsToday)],
    ["Public Intake Today", numberText(summary.requestsToday)],
    ["Orders Received Today", numberText(summary.ordersReceivedToday)],
  ];
  els.chartStats.forEach((stat, index) => {
    const [label, value] = chartStats[index] || ["Platform signal", "0"];
    stat.querySelector("small").textContent = label;
    stat.querySelector("strong").textContent = value;
  });
  els.timelineConsoleDetail.textContent = `${months.length} day activity view`;
  els.timelineConsoleWindow.textContent = `${months.length} Days`;
  const segments = [...document.querySelectorAll("[data-bucket-filter]")];
  ["All", "Systems", "Signals"].forEach((label, index) => {
    if (segments[index]) {
      segments[index].textContent = label;
      segments[index].dataset.bucketFilter = index === 0 ? "all" : index === 1 ? "systems" : "signals";
    }
  });
}

function renderSummary(data) {
  const metrics = data.health?.metrics || [];
  const container = els.summarySource.querySelector(".summary-grid");
  container.innerHTML = metrics.map((metric) => `
    <article class="metric-card health-metric-card status-${escapeHtml(metric.status)}">
      <div class="health-metric-head"><span>${escapeHtml(metric.shortLabel)}</span><b>${escapeHtml(metric.statusLabel)}</b></div>
      <strong>${escapeHtml(metric.valueText)}</strong>
      <div class="metric-scale direction-${escapeHtml(metric.direction)} ${metric.status === "collecting" ? "is-collecting" : ""}" style="--good-position:${Math.round(metric.goodPosition || 0)}%;--watch-position:${Math.round(metric.watchPosition || 0)}%" role="meter" aria-label="${escapeHtml(metric.label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(metric.gaugePosition || 0)}" aria-valuetext="${escapeHtml(`${metric.valueText}, ${metric.statusLabel}`)}">
        <i style="left:${Math.max(0, Math.min(100, metric.gaugePosition || 0))}%"></i>
      </div>
      <small>${escapeHtml(metric.target)}</small>
      <p>${escapeHtml(metric.basis)}${metric.sampleCount ? ` / ${numberText(metric.sampleCount)} samples` : ""}</p>
    </article>
  `).join("");
}

function renderRules(data) {
  els.rulesGrid.innerHTML = data.rules.map((rule) => `
    <article class="rule-card">
      <h3>${escapeHtml(rule.title)}</h3>
      <strong>${escapeHtml(rule.summary)}</strong>
      <p>${escapeHtml(rule.detail)}</p>
    </article>
  `).join("");
}

function renderChart(data) {
  const largest = Math.max(1, ...data.months.map((month) => month.added));
  els.usageChart.innerHTML = data.months.map((month, index) => {
    const height = Math.max(month.added ? 10 : 0, (month.added / largest) * 184);
    return `
      <article class="month-bar" data-month-index="${index}" title="View ${escapeHtml(month.label)} activity">
        <div class="month-plot"><div class="month-total" style="height:${height}px"></div><div class="month-fill" style="height:${height}px"></div></div>
        <div class="month-labels"><strong>${escapeHtml(month.valueLabel)}</strong><span>Company activity</span><small>${escapeHtml(month.label)}</small></div>
      </article>
    `;
  }).join("");
  els.usageChart.querySelectorAll(".month-bar").forEach((bar) => {
    bar.addEventListener("click", () => selectTimelineMonth(Number(bar.dataset.monthIndex)));
  });
}

function renderBuckets(data) {
  const visible = activeBucketFilter === "all" ? data.buckets : data.buckets;
  const largest = Math.max(1, ...data.buckets.map((bucket) => bucket.size));
  els.bucketList.innerHTML = visible.map((bucket, index) => {
    const percent = Math.max(4, (bucket.size / largest) * 100);
    return `
      <article class="bucket-card" data-bucket-index="${index}" title="Focus ${escapeHtml(bucket.title)} in the 3D model">
        <div class="bucket-card-main">
          <div><h3 class="bucket-title">${escapeHtml(bucket.title)}</h3><div class="bucket-meta">${escapeHtml(bucket.valueLabel)} - company scoped</div></div>
          <div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${percent}%"></div></div>
          <div class="bucket-size"><span>${percent.toFixed(0)}%</span>${escapeHtml(bucket.valueLabel)}</div>
        </div>
        <details class="bucket-source"><summary>System context <span>${escapeHtml(bucket.badge)}</span></summary><div class="bucket-source-list">
          ${bucket.rows.map(([label, value]) => `<div class="source-file"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(bucket.title)}</small></div>`).join("")}
        </div></details>
      </article>
    `;
  }).join("");
  els.bucketList.querySelectorAll(".bucket-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest(".bucket-source")) return;
      world?.focusBucket(Number(card.dataset.bucketIndex));
    });
  });
}

function fileMatches(file, query) {
  return !query || `${file.name} ${file.bucket} ${file.category} ${file.equipment}`.toLowerCase().includes(query.toLowerCase());
}

function renderFiles(data) {
  const query = els.search.value.trim();
  const ranked = [...data.files].sort((left, right) => right.size - left.size);
  const visible = ranked.filter((file) => fileMatches(file, query));
  els.filesCount.textContent = `${visible.length} shown`;
  els.fileEmpty.hidden = visible.length > 0;
  els.fileList.innerHTML = visible.map((file) => {
    const sourceIndex = data.files.indexOf(file);
    return `
      <article class="file-row" data-file-index="${sourceIndex}" data-file-type="signal">
        <div class="file-token" aria-hidden="true">SIG</div>
        <div><h3 class="file-name">${escapeHtml(file.name)}</h3><p class="file-meta">${escapeHtml(file.bucket)} - ${escapeHtml(file.category)}</p></div>
        <div class="file-equipment">${escapeHtml(file.equipment)}</div>
        <button class="button open-file" data-file-index="${sourceIndex}" type="button">Inspect</button>
        <div class="file-size">${escapeHtml(file.valueLabel)}</div>
      </article>
    `;
  }).join("");
  els.fileList.querySelectorAll(".open-file").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const file = data.files[Number(button.dataset.fileIndex)];
      if (file) openFileDialog(file);
    });
  });
  els.fileList.querySelectorAll(".file-row").forEach((row) => {
    row.addEventListener("click", () => world?.focusFile(Number(row.dataset.fileIndex)));
  });
}

function renderOperations(data) {
  els.opsGrid.innerHTML = data.operations.map((item) => `
    <article class="ops-card"><span class="severity ${escapeHtml(item.severity)}">${escapeHtml(item.severity)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.detail)}</p></article>
  `).join("");
}

function openFileDialog(file) {
  els.dialogTitle.textContent = file.name;
  els.dialogDetails.innerHTML = `
    <dt>System</dt><dd>${escapeHtml(file.bucket)}</dd>
    <dt>Signal</dt><dd>${escapeHtml(file.valueLabel)}</dd>
    <dt>Context</dt><dd>${escapeHtml(file.equipment)}</dd>
    <dt>Scope</dt><dd>Current company / all plants</dd>
    <dt>Status</dt><dd>${escapeHtml(file.status)}</dd>
  `;
  if (!els.dialog.open) els.dialog.showModal();
}

function selectTimelineMonth(index) {
  els.timelineMonths.forEach((button) => button.classList.toggle("active", Number(button.dataset.timelineMonth) === index));
  els.usageChart.querySelectorAll(".month-bar").forEach((bar) => bar.classList.toggle("active", Number(bar.dataset.monthIndex) === index));
}

function openTimelineSource(index = null) {
  els.timelineSource.open = true;
  setActiveStageAction("timeline");
  els.zoneIndicator.textContent = "Viewing: Activity Runway";
  if (index !== null) selectTimelineMonth(index);
  requestAnimationFrame(() => els.timelineSource.scrollIntoView({ behavior: "smooth", block: "start" }));
}

function setActiveStageAction(target) {
  els.stageActions.forEach((button) => {
    const active = button.dataset.worldTarget === target;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderFrame(snapshot) {
  frameState = buildFrameData(snapshot || fallbackSnapshot);
  updateStaticCopy(frameState);
  renderSummary(frameState);
  renderRules(frameState);
  renderChart(frameState);
  renderBuckets(frameState);
  renderFiles(frameState);
  renderOperations(frameState);
  els.refresh.classList.remove("refreshing");
  const refreshLabel = els.refresh.querySelector("span:last-child");
  if (refreshLabel) refreshLabel.textContent = "Refresh";
  els.updated.textContent = `Sampled ${new Date(snapshot?.sampledAt || Date.now()).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  els.timelineMonths.forEach((button, index) => {
    const month = frameState.months[index];
    button.textContent = shortDay(month?.label, index);
    button.dataset.timelineMonth = String(index);
    button.hidden = !month;
  });
  if (!world) {
    world = createStorageWorld({
      canvas: els.canvas,
      touchTargets: els.touchTargets,
      tooltip: els.tooltip,
      buckets: frameState.buckets,
      months: frameState.months,
      files: frameState.files,
      core: frameState.core,
      activity: frameState.recentActivity,
      formatBytes: (value) => `${numberText(value / MEBI)} events`,
      onZoneChange: (zone) => {
        setActiveStageAction(zone.id);
        els.zoneIndicator.textContent = `Viewing: ${zone.label}`;
      },
      onBucketSelected: () => {
        activeBucketFilter = "all";
        renderBuckets(frameState);
      },
      onMonthSelected: (_month, index) => openTimelineSource(index),
      // A physical cube already opens its own in-world HUD. The separate
      // dialog remains available only from the expandable source index.
      onFileSelected: () => {},
      onVaultSelected: () => {
        els.summarySource.open = true;
      },
      qualityPreference: localStorage.getItem("maintainops.performanceQuality") || "auto",
      onPerformanceSample: (sample) => {
        window.parent.postMessage({ type: "maintainops-platform-spatial-telemetry", sample }, parentOrigin);
      },
      onQualityChange: (quality) => updateQualityButtons(quality.preference, quality.effective),
      onFirstRender: (sample) => {
        if (worldRenderAnnounced) return;
        worldRenderAnnounced = true;
        document.documentElement.classList.add("platform-spatial-ready");
        window.__MAINTAIN_OPS_PLATFORM_SPATIAL_READY = true;
        window.parent.postMessage({ type: "maintainops-platform-spatial-rendered" }, parentOrigin);
        window.parent.postMessage({
          type: "maintainops-platform-spatial-telemetry",
          sample: { ...sample, readyMs: performance.now() - frameStartedAt },
        }, parentOrigin);
      },
    });
  }
}

function updateQualityButtons(preference, effective) {
  els.qualityButtons.forEach((button) => {
    const active = button.dataset.qualityTier === preference;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    const base = button.dataset.qualityTier === "performance" ? "Efficient" : button.dataset.qualityTier === "cinematic" ? "Ultra" : "Auto";
    button.textContent = button.dataset.qualityTier === "auto" && effective ? `${base}: ${effective === "performance" ? "Efficient" : effective === "cinematic" ? "Ultra" : "Balanced"}` : base;
  });
}

function requestRefresh() {
  const label = els.refresh.querySelector("span:last-child");
  els.refresh.classList.add("refreshing");
  if (label) label.textContent = "Sampling";
  window.parent.postMessage({ type: "maintainops-platform-spatial-refresh" }, parentOrigin);
}

function bindInteractions() {
  els.exit?.addEventListener("click", (event) => {
    if (window.self === window.top) {
      localStorage.setItem("maintainops.activeSection", "mywork");
      return;
    }
    event.preventDefault();
    window.parent.postMessage({ type: "maintainops-platform-spatial-exit" }, parentOrigin);
  });
  document.querySelectorAll("[data-bucket-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeBucketFilter = button.dataset.bucketFilter;
      document.querySelectorAll("[data-bucket-filter]").forEach((item) => item.classList.toggle("active", item === button));
      renderBuckets(frameState);
    });
  });
  els.sourcePanels.forEach((panel) => panel.addEventListener("toggle", () => {
    if (!panel.open) return;
    els.sourcePanels.forEach((other) => { if (other !== panel) other.open = false; });
  }));
  els.search.addEventListener("input", () => renderFiles(frameState));
  els.clearSearch.addEventListener("click", () => {
    els.search.value = "";
    els.search.focus();
    renderFiles(frameState);
  });
  els.refresh.addEventListener("click", requestRefresh);
  els.qualityButtons.forEach((button) => button.addEventListener("click", () => {
    const preference = button.dataset.qualityTier || "auto";
    localStorage.setItem("maintainops.performanceQuality", preference);
    const quality = world?.setQuality(preference);
    updateQualityButtons(preference, quality?.effective || "");
  }));
  els.stageActions.forEach((button) => button.addEventListener("click", () => {
    const target = button.dataset.worldTarget;
    if (target === "timeline") openTimelineSource();
    else world?.setView(target);
  }));
  els.timelineMonths.forEach((button) => button.addEventListener("click", () => openTimelineSource(Number(button.dataset.timelineMonth))));
  window.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLInputElement) return;
    const targets = ["overview", "buckets", "timeline", "files", "vault"];
    const index = Number(event.key) - 1;
    if (index < 0 || index >= targets.length) return;
    event.preventDefault();
    if (targets[index] === "timeline") openTimelineSource();
    else world?.setView(targets[index]);
  });
}

window.addEventListener("message", (event) => {
  if (event.origin !== parentOrigin || event.data?.type !== "maintainops-platform-spatial-snapshot") return;
  hasSnapshot = true;
  document.documentElement.classList.remove("platform-spatial-standalone");
  renderFrame(event.data.snapshot || fallbackSnapshot);
});

els = getElements();
bindInteractions();
window.parent.postMessage({ type: "maintainops-platform-spatial-ready" }, parentOrigin);
window.setTimeout(() => {
  // A direct open (including the in-app browser's wrapper) has no host message.
  // Keep that review path useful instead of leaving a blank canvas indefinitely.
  if (hasSnapshot) return;
  document.documentElement.classList.add("platform-spatial-standalone");
  renderFrame(fallbackSnapshot);
}, 800);
