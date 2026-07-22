const { spawn } = require("node:child_process");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { evidenceDirectory, writeEvidence } = require("./lfes-evidence");

const root = path.resolve(__dirname, "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
const preferredPort = Number(process.env.MAINTAINOPS_LFES_PORT || 4195);
const candidatePorts = [preferredPort, preferredPort + 1, preferredPort + 2];
const releaseGateMode = process.argv.includes("--release-gate");
const startedAt = new Date().toISOString();
const stages = [];

async function runStage(name, callback) {
  const started = Date.now();
  try {
    await callback();
    stages.push({ name, status: "PASS", durationMs: Date.now() - started });
  } catch (error) {
    stages.push({ name, status: "FAIL", durationMs: Date.now() - started, error: error.message });
    throw error;
  }
}

function gitCommit() {
  return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
}

function gitWorktreeChanges() {
  const output = execFileSync("git", ["status", "--porcelain", "--untracked-files=all"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  return output ? output.split(/\r?\n/) : [];
}

function verifyGeneratedBundlesClean() {
  const output = execFileSync("git", [
    "status",
    "--porcelain",
    "--untracked-files=all",
    "--",
    "index.html",
    "performance-spatial.html",
    "src/bundles",
  ], { cwd: root, encoding: "utf8" }).trim();
  if (output) {
    throw new Error(`Generated browser bundles differ from the committed source:\n${output}\nRun npm run build:runtime:bundles and commit the generated files.`);
  }
}

function writeSummary(status, error = null) {
  const worktreeChanges = gitWorktreeChanges();
  const summaryFile = releaseGateMode ? "release-gate-summary.json" : "lfes-strict-summary.json";
  const scope = releaseGateMode
    ? "Fast release gate: recursive/static security, live anonymous boundaries, isolated PostgreSQL/RLS, bundles, Node/browser regressions, and local resource loading"
    : "Full Strict LFES: release-gate coverage plus serial desktop/mobile Performance interaction";
  return writeEvidence(summaryFile, {
    status,
    mode: releaseGateMode ? "RELEASE_GATE" : "FULL_STRICT_LFES",
    scope,
    startedAt,
    completedAt: new Date().toISOString(),
    commit: gitCommit(),
    worktreeDirty: worktreeChanges.length > 0,
    worktreeChanges,
    node: process.version,
    platform: `${process.platform}-${process.arch}`,
    authenticatedLiveProof: releaseGateMode
      ? "NOT_RUN_BY_RELEASE_GATE"
      : "RUN_SEPARATELY_BY_FULL_STRICT_WORKFLOW",
    stages,
    ...(error ? { error: error.message } : {}),
  });
}

function run(command, args, options = {}) {
  const label = options.label || [command].concat(args).join(" ");
  console.log(`\n=== ${label} ===`);
  const needsShell = process.platform === "win32" && command.endsWith(".cmd");
  const spawnCommand = needsShell ? [command].concat(args).join(" ") : command;
  const spawnArgs = needsShell ? [] : args;

  return new Promise((resolve, reject) => {
    const child = spawn(spawnCommand, spawnArgs, {
      cwd: root,
      stdio: "inherit",
      shell: needsShell,
      env: {
        ...process.env,
        ...(options.env || {}),
      },
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${label} failed with exit code ${code}`));
    });
  });
}

function requestUrl(url, timeoutMs = 1500) {
  return new Promise((resolve) => {
    const request = http.get(url, (response) => {
      response.resume();
      resolve(response.statusCode >= 200 && response.statusCode < 500);
    });

    request.on("error", () => resolve(false));
    request.setTimeout(timeoutMs, () => {
      request.destroy();
      resolve(false);
    });
  });
}

async function waitForHttp(url, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await requestUrl(url)) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return false;
}

async function startLocalServer() {
  for (const port of candidatePorts) {
    const baseUrl = `http://127.0.0.1:${port}/`;
    const readyUrl = `${baseUrl}index.html?lfes=ready`;

    if (await requestUrl(readyUrl)) {
      console.log(`\n=== local resource server already available on ${baseUrl} ===`);
      return { baseUrl, child: null };
    }

    console.log(`\n=== starting local resource server on ${baseUrl} ===`);
    const child = spawn(process.execPath, ["scripts/local-static-server.js", String(port)], {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });

    child.stdout.on("data", (data) => process.stdout.write(`[server:${port}] ${data}`));
    child.stderr.on("data", (data) => process.stderr.write(`[server:${port}] ${data}`));

    const exitedEarly = new Promise((resolve) => {
      child.once("exit", () => resolve(true));
    });

    const ready = await Promise.race([
      waitForHttp(readyUrl),
      exitedEarly.then(() => false),
    ]);

    if (ready) {
      return { baseUrl, child };
    }

    if (!child.killed) {
      child.kill();
    }
  }

  throw new Error(`Could not start local resource server on ports ${candidatePorts.join(", ")}`);
}

async function runNodeSmokeSweep() {
  const smokeDir = path.join(root, "tests", "smoke");
  const smokeFiles = fs.readdirSync(smokeDir)
    .filter((name) => name.endsWith(".js"))
    .filter((name) => !name.endsWith(".spec.js"))
    .filter((name) => name !== "quick-fix-live-lifecycle-smoke.js")
    .sort();

  const failed = [];
  for (const fileName of smokeFiles) {
    try {
      await run(process.execPath, [path.join("tests", "smoke", fileName)], {
        label: `node smoke ${fileName}`,
      });
    } catch (error) {
      failed.push(`${fileName}: ${error.message}`);
    }
  }

  if (failed.length) {
    throw new Error(`Node smoke sweep failed:\n${failed.join("\n")}`);
  }
}

async function main() {
  fs.rmSync(evidenceDirectory(), { recursive: true, force: true });
  await runStage("security static audit", () => run(npmCommand, ["run", "test:security:static"], {
    label: "security static audit",
  }));
  await runStage("anonymous security boundary probe", () => run(npmCommand, ["run", "test:security:boundary"], {
    label: "security boundary probe",
  }));
  await runStage("script load inventory", () => run(npmCommand, ["run", "test:scripts:inventory"], {
    label: "script load inventory check",
  }));
  await runStage("migration static evidence", () => run(npmCommand, ["run", "test:migrations:static"], {
    label: "migration static check",
  }));
  await runStage("isolated PostgreSQL schema and RLS", () => run(npmCommand, ["run", "test:schema:isolated"], {
    label: "isolated PostgreSQL schema and RLS check",
  }));
  await runStage("runtime bundle build and manifest", () => run(npmCommand, ["run", "test:bundle:pilot"], {
    label: "bundle pilot smoke",
  }));
  await runStage("generated bundle cleanliness", async () => verifyGeneratedBundlesClean());
  await runStage("broad Node smoke sweep", () => runNodeSmokeSweep());
  await runStage("work attachment smoke suite", () => run(npmCommand, ["run", "test:smoke:work-attach"], {
    label: "work attach smoke suite",
  }));
  await runStage("targeted browser regressions", () => run(npxCommand, [
    "playwright",
    "test",
    "tests/smoke/equipment-choice-browser.spec.js",
    "tests/smoke/equipment-history-scroll-browser.spec.js",
    "tests/smoke/financial-archived-edit-browser.spec.js",
    "tests/smoke/planning-layout-browser.spec.js",
    "tests/smoke/quick-fix-date-field-browser.spec.js",
    "tests/smoke/team-sections-browser.spec.js",
    "tests/smoke/work-order-filter-toolbar-browser.spec.js",
    "tests/smoke/workspace-search-stability-browser.spec.js",
  ], {
    label: "targeted browser regression smokes",
  }));

  const server = await startLocalServer();
  try {
    await runStage("local application resource load", () => run(npmCommand, ["run", "test:smoke:resources"], {
      label: "local resource load smoke",
      env: {
        MAINTAINOPS_BASE_URL: server.baseUrl,
      },
    }));
    if (!releaseGateMode) {
      await runStage("desktop and mobile Performance interaction", () => run(npxCommand, [
        "playwright",
        "test",
        "tests/smoke/platform-performance-mobile-browser.spec.js",
        "tests/smoke/platform-performance-desktop-browser.spec.js",
        "--workers=1",
      ], {
        label: "desktop and mobile Performance controls smoke",
        env: {
          MAINTAINOPS_BASE_URL: server.baseUrl,
        },
      }));
    }
  } finally {
    if (server.child && !server.child.killed) {
      server.child.kill();
    }
  }
  writeSummary("PASS");
}

main().catch((error) => {
  writeSummary("FAIL", error);
  console.error(`\nLFES strict check failed: ${error.message}`);
  process.exit(1);
});
