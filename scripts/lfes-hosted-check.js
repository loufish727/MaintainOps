const { spawn } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const hostedUrl = "https://loufish727.github.io/MaintainOps/";

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

async function main() {
  await run(npmCommand, ["run", "test:smoke:resources"], {
    label: "hosted GitHub Pages resource smoke",
    env: {
      MAINTAINOPS_BASE_URL: hostedUrl,
    },
  });
  await run(npmCommand, ["run", "test:smoke:github-actions"], {
    label: "latest GitHub Actions resource-load smoke",
  });
}

main().catch((error) => {
  console.error(`\nLFES hosted check failed: ${error.message}`);
  process.exit(1);
});
