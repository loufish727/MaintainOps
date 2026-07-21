const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const root = path.resolve(__dirname, "..");
const evidenceDir = path.join(root, "lfes-evidence");
const baseUrl = new URL(process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/");

function percentile(values, fraction) {
  if (!values.length) return null;
  const ordered = [...values].sort((left, right) => left - right);
  return ordered[Math.min(ordered.length - 1, Math.ceil(ordered.length * fraction) - 1)];
}

function gradeLatency(value) {
  if (!Number.isFinite(value)) return "poor";
  if (value <= 1000) return "good";
  if (value <= 2500) return "watch";
  return "poor";
}

async function probe(resourcePath) {
  const url = new URL(resourcePath, baseUrl);
  const startedAt = performance.now();
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { "user-agent": "MaintainOps-GitHub-Synthetic-Probe/1.0" },
      signal: AbortSignal.timeout(15000),
    });
    const body = await response.arrayBuffer();
    const durationMs = Number((performance.now() - startedAt).toFixed(1));
    return {
      path: resourcePath,
      status: response.status,
      ok: response.ok,
      duration_ms: durationMs,
      bytes: body.byteLength,
      content_type: response.headers.get("content-type") || "",
      text: response.headers.get("content-type")?.includes("text/html") ? Buffer.from(body).toString("utf8") : "",
    };
  } catch (error) {
    return {
      path: resourcePath,
      status: 0,
      ok: false,
      duration_ms: Number((performance.now() - startedAt).toFixed(1)),
      bytes: 0,
      error: error.message,
      text: "",
    };
  }
}

function pageResources(html, pageName) {
  const paths = [];
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const resource = match[1];
    const resourceUrl = new URL(resource, baseUrl);
    if (resourceUrl.origin === baseUrl.origin && /\.(?:css|js)(?:[?#]|$)/i.test(resource)) paths.push(resource);
  }
  if (pageName === "performance") {
    paths.push(
      "assets/performance-spatial/hdri/studio_small_01_1k.hdr",
      "assets/performance-spatial/models/maintain_ops_concept_kit.glb",
      "assets/performance-spatial/textures/file-cube-skins.png",
      "assets/performance-spatial/textures/silo-open-panels.png",
      "assets/performance-spatial/textures/silo-closed-panels.png",
      "assets/performance-spatial/textures/capacity-core-kit.png",
      "assets/performance-spatial/textures/floor-deck.png",
      "assets/performance-spatial/textures/outer-walls.png",
    );
  }
  return [...new Set(paths)];
}

async function main() {
  const startedAt = new Date().toISOString();
  const index = await probe("index.html");
  const performancePage = await probe("performance-spatial.html");
  const resources = [
    index,
    performancePage,
    ...await Promise.all(pageResources(index.text, "index").map(probe)),
    ...await Promise.all(pageResources(performancePage.text, "performance").map(probe)),
  ].map(({ text, ...result }) => result);
  const durations = resources.filter((item) => item.ok).map((item) => item.duration_ms);
  const passed = resources.filter((item) => item.ok).length;
  const p75 = percentile(durations, 0.75);
  const report = {
    status: passed === resources.length ? "PASS" : "FAIL",
    scope: "GitHub-runner synthetic availability and resource response probe; not real-user uptime or internet speed",
    started_at: startedAt,
    completed_at: new Date().toISOString(),
    base_url: baseUrl.href,
    resources_checked: resources.length,
    resources_passed: passed,
    availability_percent: Number(((passed / Math.max(resources.length, 1)) * 100).toFixed(2)),
    response_p75_ms: p75,
    response_grade: gradeLatency(p75),
    response_target: "1 s good / 2.5 s watch (MaintainOps synthetic target)",
    resources,
  };

  fs.mkdirSync(evidenceDir, { recursive: true });
  fs.writeFileSync(path.join(evidenceDir, "hosted-performance-probe.json"), `${JSON.stringify(report, null, 2)}\n`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, [
      "## MaintainOps hosted performance probe",
      "",
      `- Status: **${report.status}**`,
      `- Resources: **${passed}/${resources.length}**`,
      `- Synthetic response p75: **${p75 ?? "Unavailable"} ms** (${report.response_grade})`,
      `- Scope: ${report.scope}`,
      "",
    ].join("\n"));
  }
  console.log(JSON.stringify(report, null, 2));
  if (report.status !== "PASS") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
