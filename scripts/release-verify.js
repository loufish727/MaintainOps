const { execFileSync, spawn } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

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

function readGitText(args) {
  try {
    return execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch (error) {
    return "";
  }
}

function printReleasePrepStatus() {
  const branch = readGitText(["branch", "--show-current"]);
  const status = readGitText(["status", "--short"]);
  console.log("\n=== release prep status ===");
  console.log(`Branch: ${branch || "unknown"}`);
  if (status) {
    console.log("Working tree: dirty");
    console.log(status);
  } else {
    console.log("Working tree: clean");
  }
}

async function main() {
  printReleasePrepStatus();
  await run(npmCommand, ["run", "build:runtime:bundles"], {
    label: "build hashed browser bundles",
  });
  await run(process.execPath, ["scripts/script-load-inventory.js", "--write"], {
    label: "refresh generated script inventory",
  });
  await run(npmCommand, ["run", "test:lfes:strict"], {
    label: "strict LFES",
  });

  if (process.env.MAINTAINOPS_RELEASE_SKIP_HOSTED === "1") {
    console.log("\n=== hosted LFES skipped by MAINTAINOPS_RELEASE_SKIP_HOSTED=1 ===");
    return;
  }

  await run(npmCommand, ["run", "test:lfes:hosted"], {
    label: "hosted LFES",
  });
}

main().catch((error) => {
  console.error(`\nRelease verification failed: ${error.message}`);
  process.exit(1);
});
