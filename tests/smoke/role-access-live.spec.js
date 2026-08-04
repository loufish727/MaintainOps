const { expect, test } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");

const workspaceRequestBudget = Math.max(1, Number(process.env.LFES_WORKSPACE_REQUEST_BUDGET) || 35);
const workspaceDomBudget = Math.max(1, Number(process.env.LFES_WORKSPACE_DOM_BUDGET) || 1600);
const workspaceReadyBudgetMs = Math.max(1000, Number(process.env.LFES_WORKSPACE_READY_BUDGET_MS) || 12000);
const evidencePath = path.resolve(__dirname, "../../lfes-evidence/authenticated-workspace-request-counts.json");

const roles = [
  { name: "admin", prefix: "LFES_ADMIN", financial: "edit", operational: "edit", managerDashboard: true },
  { name: "manager", prefix: "LFES_MANAGER", financial: "read", operational: "edit", managerDashboard: false },
  { name: "accounting", prefix: "LFES_ACCOUNTING", financial: "edit", operational: "read", managerDashboard: false },
  { name: "production", prefix: "LFES_PRODUCTION", financial: "none", operational: "edit", managerDashboard: false },
  { name: "technician", prefix: "LFES_TECHNICIAN", financial: "none", operational: "edit", managerDashboard: false },
].map((role) => ({
  ...role,
  email: process.env[`${role.prefix}_EMAIL`] || "",
  password: process.env[`${role.prefix}_PASSWORD`] || "",
}));

const missingCredentials = roles.flatMap((role) => [
  ...(!role.email ? [`${role.prefix}_EMAIL`] : []),
  ...(!role.password ? [`${role.prefix}_PASSWORD`] : []),
]);

function supabaseEndpoint(url) {
  const testingHost = new URL(process.env.LFES_SUPABASE_URL).host;
  const parsed = new URL(url);
  if (parsed.host !== testingHost) return "";
  const rpc = parsed.pathname.match(/^\/rest\/v1\/rpc\/([^/]+)/);
  if (rpc) return `rpc:${rpc[1]}`;
  const table = parsed.pathname.match(/^\/rest\/v1\/([^/]+)/);
  if (table) return table[1];
  if (parsed.pathname.startsWith("/auth/")) return "auth";
  if (parsed.pathname.startsWith("/storage/")) return "storage";
  return parsed.pathname;
}

function createWorkspaceRequestTrace(page) {
  const requests = [];
  const inFlight = new Set();
  let capturing = false;

  page.on("request", (request) => {
    if (!capturing) return;
    const endpoint = supabaseEndpoint(request.url());
    if (!endpoint) return;
    requests.push({ endpoint, method: request.method() });
    inFlight.add(request);
  });
  const finish = (request) => inFlight.delete(request);
  page.on("requestfinished", finish);
  page.on("requestfailed", finish);

  return {
    start() {
      requests.length = 0;
      inFlight.clear();
      capturing = true;
    },
    async settle() {
      const startedAt = Date.now();
      let idleSince = 0;
      while (Date.now() - startedAt < 30000) {
        if (inFlight.size === 0) {
          if (!idleSince) idleSince = Date.now();
          if (Date.now() - idleSince >= 1000) break;
        } else {
          idleSince = 0;
        }
        await page.waitForTimeout(100);
      }
      capturing = false;
      if (inFlight.size) throw new Error(`${inFlight.size} Supabase requests did not settle.`);

      const byEndpoint = {};
      requests.forEach(({ endpoint }) => {
        byEndpoint[endpoint] = (byEndpoint[endpoint] || 0) + 1;
      });
      return {
        budget: workspaceRequestBudget,
        requests: requests.length,
        byEndpoint: Object.fromEntries(
          Object.entries(byEndpoint).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
        ),
      };
    },
  };
}

function recordWorkspaceRequestEvidence(role, browserName, evidence) {
  fs.mkdirSync(path.dirname(evidencePath), { recursive: true });
  let report = { budget: workspaceRequestBudget, roles: {} };
  if (fs.existsSync(evidencePath)) {
    report = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
  }
  report.budget = workspaceRequestBudget;
  report.roles[`${role.name}:${browserName}`] = { browserName, ...evidence };
  fs.writeFileSync(evidencePath, `${JSON.stringify(report, null, 2)}\n`);
}

async function workspaceRenderEvidence(page) {
  return page.evaluate(() => ({
    domNodes: document.querySelectorAll("*").length,
    featureBundles: performance.getEntriesByType("resource")
      .map((entry) => entry.name.match(/\/([^/]+Feature\.[a-f0-9]{10}\.js)(?:\?|$)/)?.[1] || "")
      .filter(Boolean),
    workspacePanels: document.querySelectorAll("#workspace-main .layout-grid > section.panel").length,
  }));
}

async function expectSingleActiveWorkspacePanel(page) {
  await expect(page.locator("#workspace-main .layout-grid > section.panel")).toHaveCount(1);
}

async function signIn(page, role, browserName) {
  const pageErrors = [];
  const requestTrace = createWorkspaceRequestTrace(page);
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(`?lfes-auth-role=${role.name}-${Date.now()}`, { waitUntil: "load" });
  await expect(page.getByRole("button", { name: "Log In" })).toBeVisible({ timeout: 30000 });
  await page.getByLabel("Email").fill(role.email);
  await page.getByLabel("Password").fill(role.password);
  requestTrace.start();
  const workspaceStartedAt = Date.now();
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.locator('[data-section="mywork"]')).toBeVisible({ timeout: 45000 });
  const workspaceVisibleMs = Date.now() - workspaceStartedAt;
  const requestEvidence = await requestTrace.settle();
  const renderEvidence = await workspaceRenderEvidence(page);
  recordWorkspaceRequestEvidence(role, browserName, {
    ...requestEvidence,
    ...renderEvidence,
    domBudget: workspaceDomBudget,
    workspaceReadyBudgetMs,
    workspaceVisibleMs,
  });
  expect(
    requestEvidence.requests,
    `${role.name} initial workspace Supabase requests exceeded the ${workspaceRequestBudget}-request budget: ${JSON.stringify(requestEvidence.byEndpoint)}`
  ).toBeLessThanOrEqual(workspaceRequestBudget);
  expect(requestEvidence.byEndpoint["rpc:get_my_companies"]).toBe(1);
  expect(requestEvidence.byEndpoint.locations).toBe(1);
  expect(requestEvidence.byEndpoint.assets).toBe(1);
  expect(requestEvidence.byEndpoint.work_orders).toBe(1);
  expect(requestEvidence.byEndpoint["rpc:get_workspace_work_order_counts"]).toBe(1);
  expect(renderEvidence.featureBundles, `${role.name} should not load optional feature bundles on My Work`).toEqual([]);
  expect(renderEvidence.workspacePanels, `${role.name} should render one active workspace panel`).toBe(1);
  expect(renderEvidence.domNodes, `${role.name} initial workspace DOM exceeds ${workspaceDomBudget} nodes`).toBeLessThanOrEqual(workspaceDomBudget);
  expect(workspaceVisibleMs, `${role.name} workspace took longer than ${workspaceReadyBudgetMs} ms to become visible`).toBeLessThanOrEqual(workspaceReadyBudgetMs);
  expect(pageErrors, `page errors while signing in as ${role.name}`).toEqual([]);
  return { pageErrors, requestEvidence };
}

test.describe("MaintainOps authenticated role proof", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(() => {
    if (missingCredentials.length) {
      throw new Error(`Authenticated LFES requires: ${missingCredentials.join(", ")}`);
    }
  });

  for (const role of roles) {
    test(`${role.name} navigation and permission surfaces match the role contract`, async ({ page, browserName }) => {
      test.setTimeout(150000);
      const { pageErrors } = await signIn(page, role, browserName);

      for (const section of ["mywork", "work", "planning", "requests", "assets", "team", "performance"]) {
        await expect(page.locator(`[data-section="${section}"]`)).toBeVisible();
      }

      await page.locator('[data-section="planning"]').click();
      await expect(page.getByRole("heading", { name: "Planning", exact: true, level: 2 })).toBeVisible();
      await expectSingleActiveWorkspacePanel(page);
      await expect(page.getByText("No Due Date", { exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Current schedule", exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Upcoming", exact: true })).toBeVisible();
      if (role.operational === "read") {
        await expect(page.locator("[data-planning-due-form]")).toHaveCount(0);
      }

      const financialNav = page.locator('[data-section="financial"]');
      if (role.financial === "none") {
        await expect(financialNav).toHaveCount(0);
      } else {
        await expect(financialNav).toBeVisible();
        await financialNav.click();
        await expect(page.getByRole("heading", { name: "Financial", exact: true, level: 2 })).toBeVisible();
        await expect(page.locator('[data-financial-filter="missing"]')).toBeVisible();
        const financialCards = page.locator("[data-open-financial-asset]");
        await expect(financialCards.first(), `${role.name} QA fixture needs at least one financial equipment card`).toBeVisible();
        await financialCards.first().click();
        await expect(page.getByRole("heading", { name: "Financial Detail", exact: true, level: 2 })).toBeVisible();
        if (role.financial === "edit") {
          await expect(page.locator(".financial-asset-form")).toBeVisible();
          await expect(page.getByRole("button", { name: "Save Financial Info" })).toBeEnabled();
        } else {
          await expect(page.locator(".financial-readonly-list")).toBeVisible();
          await expect(page.locator(".financial-asset-form")).toHaveCount(0);
        }
        const financialLoads = (await workspaceRenderEvidence(page)).featureBundles;
        expect(financialLoads.some((name) => name.startsWith("financialFeature."))).toBe(true);
      }

      await page.locator('[data-section="team"]').click();
      await expect(page.getByRole("heading", { name: "Team", exact: true, level: 2 })).toBeVisible();
      await expectSingleActiveWorkspacePanel(page);
      const memberCards = page.locator(".member-card");
      await expect(memberCards.first()).toBeVisible();
      await expect(memberCards.first().locator(".member-workload")).toContainText(/\d+ New/);
      await expect(memberCards.first().locator(".member-workload")).toContainText(/\d+ In Progress/);
      await expect(memberCards.first().locator(".member-workload")).toContainText(/\d+ Blocked/);
      await expect(memberCards.first().locator(".member-workload")).toContainText(/\d+ Completed/);
      const teamLoads = (await workspaceRenderEvidence(page)).featureBundles;
      expect(teamLoads.some((name) => name.startsWith("teamFeature."))).toBe(true);

      const managerNav = page.locator('[data-section="manager"]');
      if (role.managerDashboard) {
        await expect(managerNav).toBeVisible();
        await managerNav.click();
        await expect(page.locator(".manager-dashboard")).toBeVisible({ timeout: 30000 });
        await expectSingleActiveWorkspacePanel(page);
        const managerLoads = (await workspaceRenderEvidence(page)).featureBundles;
        expect(managerLoads.some((name) => name.startsWith("managerFeature."))).toBe(true);
      }
      else await expect(managerNav).toHaveCount(0);

      if (role.name === "admin") {
        await page.locator('[data-section="setup"]').click();
        await expect(page.locator(".setup-list")).toBeVisible({ timeout: 30000 });
        await expectSingleActiveWorkspacePanel(page);
        const setupLoads = (await workspaceRenderEvidence(page)).featureBundles;
        expect(setupLoads.some((name) => name.startsWith("setupFeature."))).toBe(true);

        await page.locator('[data-section="performance"]').click();
        const performanceFrame = page.frameLocator('iframe[data-platform-spatial-frame]');
        await expect(performanceFrame.locator(".quality-control")).toBeVisible({ timeout: 120000 });
        const healthSummary = performanceFrame.locator(".summary-source > summary");
        await expect(healthSummary).toBeVisible();
        await healthSummary.click();
        await expect(performanceFrame.locator(".health-metric-card").first()).toBeVisible({ timeout: 30000 });
        await expect(performanceFrame.locator(".metric-scale[role='meter']").first()).toBeVisible({ timeout: 30000 });
        await expect(performanceFrame.locator(".header-system-state strong")).not.toHaveText("Healthy");
      }

      if (role.operational === "read") {
        await page.locator('[data-section="assets"]').click();
        const assetCards = page.locator("[data-asset-id]");
        await expect(assetCards.first()).toBeVisible();
        await assetCards.first().click();
        await expect(page.getByText(/Accounting has read-only equipment access/)).toBeVisible();
      }

      expect(pageErrors, `page errors while checking ${role.name}`).toEqual([]);
    });
  }
});
