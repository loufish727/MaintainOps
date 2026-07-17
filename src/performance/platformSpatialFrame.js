import { createStorageWorld } from "./platformSpatialWorld.js";

const parentOrigin = window.location.origin;
const MEBI = 1024 * 1024;
let world = null;
let hasSnapshot = false;
let frameState = null;
let worldRenderAnnounced = false;

const fallbackSnapshot = {
  sampledAt: new Date().toISOString(),
  sampling: {
    status: "pending",
    message: "Waiting for the host application to provide company data.",
    notices: [],
  },
  telemetry: { message: "Platform instrumentation is not connected yet." },
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
      eyebrow: "Maintain Ops / Platform Pulse",
      title: "Platform Pulse",
      subtitle: "Company platform scale and data footprint",
      badge: statusLabel,
      tooltip: summary.totalRecords === null ? "Company record count unavailable" : `${numberText(summary.totalRecords)} company records monitored`,
      rows: [
        ["Orders through system", numberText(summary.ordersReceivedTotal)],
        ["Public intake", numberText(summary.publicIntakeTotal)],
        ["Data stored", summary.storage?.available ? summary.storage.totalBytesText : "Role limited"],
        ["Records monitored", numberText(summary.totalRecords)],
      ],
      footer: "Company platform command core",
      status: statusLabel,
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
    tooltip: document.querySelector("#world-tooltip"),
    exit: document.querySelector("[data-performance-exit]"),
  };
}

let els = null;
let activeBucketFilter = "all";

function updateStaticCopy(data) {
  const { summary, systems, months, sampling } = data;
  const statusLabel = samplingLabel(sampling);
  const isCurrent = sampling.status === "current";
  document.title = "Maintain Ops App Performance";
  document.documentElement.classList.toggle("platform-spatial-degraded", sampling.status === "degraded");
  document.documentElement.classList.toggle("platform-spatial-pending", sampling.status === "pending");
  els.headerKicker.textContent = "App Performance";
  els.headerSubtitle.innerHTML = summary.totalRecords === null
    ? "Company record count unavailable"
    : `<span id="linked-files-count">${escapeHtml(numberText(summary.totalRecords))}</span> company records monitored`;
  els.headerStateLabel.textContent = "Platform status";
  els.headerState.innerHTML = `<i aria-hidden="true"></i>${escapeHtml(statusLabel)}`;
  els.samplingNotice.hidden = isCurrent;
  if (!isCurrent) {
    els.samplingNotice.querySelector("strong").textContent = statusLabel;
    els.samplingNotice.querySelector("span").textContent = sampling.message;
  }
  const stageMetrics = [
    ["Orders Through System", numberText(summary.ordersReceivedTotal), "all company history"],
    ["Public Intake Total", numberText(summary.publicIntakeTotal), "all company history"],
    ["Data Stored", summary.storage?.available ? summary.storage.totalBytesText : "Role limited", ""],
    ["Records Monitored", numberText(summary.totalRecords), ""],
  ];
  els.stageReadoutStatus.innerHTML = `System Status <b>${escapeHtml(statusLabel)}</b>`;
  els.stageReadoutMetrics.forEach((metric, index) => {
    const [label, value, detail] = stageMetrics[index] || ["Platform signal", "Current", ""];
    metric.querySelector("small").textContent = label;
    metric.querySelector("b").textContent = value;
    const detailNode = metric.querySelector("em");
    if (detailNode) detailNode.textContent = detail;
  });
  els.search.placeholder = "Search systems...";
  const telemetry = [
    ["Platform pulse", statusLabel],
    ["Public intake total", numberText(summary.publicIntakeTotal)],
    ["Orders through system", numberText(summary.ordersReceivedTotal)],
    ["Records monitored", numberText(summary.totalRecords)],
    ["Data vault", summary.storage?.available ? summary.storage.totalBytesText : "Role limited"],
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
    ["Platform Pulse", "4 metrics"],
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
  const segments = [...document.querySelectorAll("[data-bucket-filter]")];
  ["All", "Systems", "Signals"].forEach((label, index) => {
    if (segments[index]) {
      segments[index].textContent = label;
      segments[index].dataset.bucketFilter = index === 0 ? "all" : index === 1 ? "systems" : "signals";
    }
  });
}

function renderSummary(data) {
  const { summary } = data;
  const metrics = [
    ["Orders Through System", numberText(summary.ordersReceivedTotal), "All company history", "cyan"],
    ["Data Stored", summary.storage?.available ? summary.storage.totalBytesText : "Role limited", summary.storage?.available ? `${numberText(summary.storage?.fileCount)} stored objects` : "Storage access follows role", "blue"],
    ["Public Intake Total", numberText(summary.publicIntakeTotal), `${numberText(summary.requestsToday)} received today`, "mint"],
    ["Records Monitored", numberText(summary.totalRecords), `${numberText(summary.locations)} plants`, "blue"],
  ];
  const container = els.summarySource.querySelector(".summary-grid");
  container.innerHTML = metrics.map(([label, value, detail, tone]) => `
    <article class="metric-card accent-${tone}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(detail)}</small>
      <div class="metric-meter"><i style="width:${label === "Data Stored" ? 58 : 72}%"></i></div>
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
    });
  }
  document.documentElement.classList.add("platform-spatial-ready");
  window.__MAINTAIN_OPS_PLATFORM_SPATIAL_READY = true;
  if (!worldRenderAnnounced) {
    window.requestAnimationFrame(() => {
      worldRenderAnnounced = true;
      window.parent.postMessage({ type: "maintainops-platform-spatial-rendered" }, parentOrigin);
    });
  }
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
