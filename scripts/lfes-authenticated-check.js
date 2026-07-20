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
  "LFES_ADMIN_EMAIL",
  "LFES_ADMIN_PASSWORD",
  "LFES_MANAGER_EMAIL",
  "LFES_MANAGER_PASSWORD",
  "LFES_ACCOUNTING_EMAIL",
  "LFES_ACCOUNTING_PASSWORD",
  "LFES_TECHNICIAN_EMAIL",
  "LFES_TECHNICIAN_PASSWORD",
  "LFES_QA_COMPANY_ID",
  "LFES_FORBIDDEN_COMPANY_ID",
  "LFES_TECH_DELETE_REQUEST_ID",
];

function run(command, args, options = {}) {
  const needsShell = process.platform === "win32" && command.endsWith(".cmd");
  const spawnCommand = needsShell ? [command].concat(args).join(" ") : command;
  const spawnArgs = needsShell ? [] : args;
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
  writeEvidence("lfes-authenticated-summary.json", {
    status,
    scope: "Hosted sign-in for four roles plus required live tenant, role, RPC, request, and storage boundary probes",
    startedAt,
    completedAt: new Date().toISOString(),
    baseUrl: process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/",
    stages,
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
      MAINTAINOPS_REQUIRE_AUTH_PROOF: "1",
      MAINTAINOPS_PROBE_EMAIL: process.env.LFES_TECHNICIAN_EMAIL,
      MAINTAINOPS_PROBE_PASSWORD: process.env.LFES_TECHNICIAN_PASSWORD,
      MAINTAINOPS_PROBE_COMPANY_ID: process.env.LFES_QA_COMPANY_ID,
      MAINTAINOPS_FORBIDDEN_COMPANY_ID: process.env.LFES_FORBIDDEN_COMPANY_ID,
      MAINTAINOPS_TECH_DELETE_REQUEST_ID: process.env.LFES_TECH_DELETE_REQUEST_ID,
    },
  }));

  await runStage("hosted four-role browser contract", () => run(npxCommand, [
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

  writeSummary("PASS");
}

main().catch((error) => {
  writeSummary("FAIL", error);
  console.error(`Authenticated LFES failed: ${error.message}`);
  process.exitCode = 1;
});
