const { execFileSync } = require("node:child_process");
const https = require("node:https");

const repo = process.env.GITHUB_REPOSITORY || "loufish727/MaintainOps";
const workflowName = process.env.MAINTAINOPS_ACTION_WORKFLOW || "Resource Load Smoke";
const sha = process.env.GITHUB_SHA || execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const attempts = Number(process.env.MAINTAINOPS_ACTION_ATTEMPTS || 36);
const delayMs = Number(process.env.MAINTAINOPS_ACTION_DELAY_MS || 5000);

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function requestJson(url) {
  return new Promise((resolve, reject) => {
    const headers = {
      "Accept": "application/vnd.github+json",
      "User-Agent": "MaintainOps-LFES-Actions-Smoke",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    https.get(url, { headers }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`GitHub API ${response.statusCode}: ${body}`));
          return;
        }
        resolve(JSON.parse(body));
      });
    }).on("error", reject);
  });
}

async function main() {
  const shortSha = sha.slice(0, 7);
  const url = `https://api.github.com/repos/${repo}/actions/runs?head_sha=${sha}&per_page=50`;
  let lastRuns = [];

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const payload = await requestJson(url);
    lastRuns = payload.workflow_runs || [];
    const run = lastRuns.find((item) => item.name === workflowName);

    if (!run) {
      console.log(`Attempt ${attempt}/${attempts}: no "${workflowName}" run found for ${shortSha} yet.`);
      await wait(delayMs);
      continue;
    }

    console.log(`Attempt ${attempt}/${attempts}: ${workflowName} is ${run.status}/${run.conclusion || "pending"} for ${shortSha}`);
    console.log(run.html_url);

    if (run.status !== "completed") {
      await wait(delayMs);
      continue;
    }

    if (run.conclusion !== "success") {
      throw new Error(`${workflowName} completed with conclusion "${run.conclusion}" for ${shortSha}: ${run.html_url}`);
    }

    console.log(`${workflowName} passed for ${shortSha}.`);
    return;
  }

  const summary = lastRuns.map((run) => `${run.name}:${run.status}/${run.conclusion || "pending"}`).join(", ");
  throw new Error(`Timed out waiting for "${workflowName}" to pass for ${shortSha}. Seen runs: ${summary || "none"}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
