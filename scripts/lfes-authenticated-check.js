const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const { evidenceDirectory, writeEvidence } = require("./lfes-evidence");

const root = path.resolve(__dirname, "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
const startedAt = new Date().toISOString();
const stages = [];

const requiredEnvironment = [
  "LFES_SUPABASE_URL",
  "LFES_SUPABASE_ANON_KEY",
  "LFES_ADMIN_EMAIL",
  "LFES_ADMIN_PASSWORD",
  "LFES_MANAGER_EMAIL",
  "LFES_MANAGER_PASSWORD",
  "LFES_ACCOUNTING_EMAIL",
  "LFES_ACCOUNTING_PASSWORD",
  "LFES_PRODUCTION_EMAIL",
  "LFES_PRODUCTION_PASSWORD",
  "LFES_TECHNICIAN_EMAIL",
  "LFES_TECHNICIAN_PASSWORD",
  "LFES_QA_COMPANY_ID",
  "LFES_FORBIDDEN_COMPANY_ID",
  "LFES_TECH_DELETE_REQUEST_ID",
];

function run(command, args, options = {}) {
  // Keep Playwright filters as argv entries; cmd.exe split multiword --grep values.
  const directPlaywright = command === npxCommand && args[0] === "playwright";
  const executable = directPlaywright ? process.execPath : command;
  const commandArgs = directPlaywright
    ? [path.join(root, "node_modules/@playwright/test/cli.js"), ...args.slice(1)]
    : args;
  const needsShell = process.platform === "win32" && executable.endsWith(".cmd");
  const spawnCommand = needsShell ? [executable].concat(commandArgs).join(" ") : executable;
  const spawnArgs = needsShell ? [] : commandArgs;
  return new Promise((resolve, reject) => {
    const child = spawn(spawnCommand, spawnArgs, {
      cwd: root,
      stdio: "inherit",
      shell: needsShell,
      env: { ...process.env, ...(options.env || {}) },
    });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${options.label || command} failed with exit code ${code}`)));
  });
}

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

function writeSummary(status, error = null) {
  const testingBackend = new URL(process.env.LFES_SUPABASE_URL || "https://missing.invalid");
  const requestEvidencePath = path.join(evidenceDirectory(), "authenticated-workspace-request-counts.json");
  const workspaceRequestEvidence = fs.existsSync(requestEvidencePath)
    ? JSON.parse(fs.readFileSync(requestEvidencePath, "utf8"))
    : null;
  writeEvidence("lfes-authenticated-summary.json", {
    status,
    scope: "Hosted sign-in for five roles plus required live tenant, role, RPC, request, and storage boundary probes",
    startedAt,
    completedAt: new Date().toISOString(),
    baseUrl: process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/",
    testingBackendHost: testingBackend.hostname,
    stages,
    workspaceRequestEvidence,
    ...(error ? { error: error.message } : {}),
  });
}

async function main() {
  fs.rmSync(evidenceDirectory(), { recursive: true, force: true });
  const missing = requiredEnvironment.filter((name) => !process.env[name]);
  if (missing.length) throw new Error(`Authenticated LFES cannot run without: ${missing.join(", ")}`);

  await runStage("authenticated database and storage boundaries", () => run(npmCommand, ["run", "test:security:boundary"], {
    label: "required authenticated security boundary proof",
    env: {
      MAINTAINOPS_SUPABASE_URL: process.env.LFES_SUPABASE_URL,
      MAINTAINOPS_SUPABASE_ANON_KEY: process.env.LFES_SUPABASE_ANON_KEY,
      MAINTAINOPS_REQUIRE_AUTH_PROOF: "1",
      MAINTAINOPS_PROBE_EMAIL: process.env.LFES_TECHNICIAN_EMAIL,
      MAINTAINOPS_PROBE_PASSWORD: process.env.LFES_TECHNICIAN_PASSWORD,
      MAINTAINOPS_PROBE_COMPANY_ID: process.env.LFES_QA_COMPANY_ID,
      MAINTAINOPS_FORBIDDEN_COMPANY_ID: process.env.LFES_FORBIDDEN_COMPANY_ID,
      MAINTAINOPS_TECH_DELETE_REQUEST_ID: process.env.LFES_TECH_DELETE_REQUEST_ID,
    },
  }));

  await runStage("hosted five-role browser and request-budget contract", () => run(npxCommand, [
    "playwright",
    "test",
    "tests/smoke/role-access-live.spec.js",
    "--workers=1",
  ], {
    label: "hosted authenticated role browser proof",
    env: {
      MAINTAINOPS_BASE_URL: process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/",
    },
  }));

  await runStage("signed-in Production Action lifecycle", () => run(npxCommand, [
    "playwright",
    "test",
    "tests/smoke/production-action-live.spec.js",
    "--workers=1",
  ], {
    label: "hosted Production Action lifecycle proof",
    env: {
      MAINTAINOPS_BASE_URL: process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/",
    },
  }));

  await runStage("signed-in Production Ready notification lifecycle", () => run(npxCommand, [
    "playwright",
    "test",
    "tests/smoke/production-ready-notification-live.spec.js",
    "--workers=1",
  ], {
    label: "hosted Production Ready notification lifecycle proof",
    env: {
      MAINTAINOPS_BASE_URL: process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/",
    },
  }));

  await runStage("WebKit admin browser and request-budget contract", () => run(npxCommand, [
    "playwright",
    "test",
    "tests/smoke/role-access-live.spec.js",
    "--browser=webkit",
    "--grep",
    "admin navigation and permission surfaces match the role contract",
    "--workers=1",
  ], {
    label: "hosted authenticated WebKit admin proof",
    env: {
      MAINTAINOPS_BASE_URL: process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/",
      MAINTAINOPS_CHROMIUM_CHANNEL: "",
    },
  }));

  for (const browser of ["chromium", "webkit"]) {
    await runStage(`${browser} equipment relocation lifecycle`, () => run(npxCommand, [
      "playwright", "test", "tests/smoke/equipment-relocation-live.spec.js",
      `--browser=${browser}`, "--workers=1",
    ], {
      label: `${browser} equipment relocation lifecycle proof`,
      env: { LFES_TRAVEL_MUTATIONS: "1", MAINTAINOPS_CHROMIUM_CHANNEL: browser === "chromium" ? process.env.MAINTAINOPS_CHROMIUM_CHANNEL || "" : "" },
    }));
    await runStage(`${browser} traveling equipment lifecycle`, () => run(npxCommand, [
      "playwright", "test", "tests/smoke/traveling-equipment-live.spec.js",
      `--browser=${browser}`, "--workers=1",
    ], {
      label: `${browser} traveling equipment lifecycle proof`,
      env: { LFES_TRAVEL_MUTATIONS: "1", MAINTAINOPS_CHROMIUM_CHANNEL: browser === "chromium" ? process.env.MAINTAINOPS_CHROMIUM_CHANNEL || "" : "" },
    }));
    await runStage(`${browser} signed-in account/location switching`, () => run(npxCommand, [
      "playwright", "test", "tests/smoke/location-account-switch-live.spec.js",
      `--browser=${browser}`, "--workers=1",
    ], {
      label: `${browser} account/location isolation proof`,
      env: { MAINTAINOPS_CHROMIUM_CHANNEL: browser === "chromium" ? process.env.MAINTAINOPS_CHROMIUM_CHANNEL || "" : "" },
    }));
  }

  writeSummary("PASS");
}

main().catch((error) => {
  writeSummary("FAIL", error);
  console.error(`Authenticated LFES failed: ${error.message}`);
  process.exitCode = 1;
});
