const { expect, test } = require("@playwright/test");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

async function renderPlanningFixture(page) {
  await page.setContent('<main class="panel full-width" id="planning-test"></main>');
  await page.addStyleTag({ path: path.join(root, "styles.css") });
  await page.addScriptTag({ path: path.join(root, "src/utils/workspaceUiState.js") });
  await page.addScriptTag({ path: path.join(root, "src/utils/workspaceFilterPaginationEvents.js") });
  await page.addScriptTag({ path: path.join(root, "src/utils/workspacePlanningDueDateEvents.js") });
  await page.addScriptTag({ path: path.join(root, "src/render/planningDisplay.js") });
  await page.evaluate(() => {
    const values = {};
    const storage = {
      getItem(key) { return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : null; },
      setItem(key, value) { values[key] = String(value); },
      removeItem(key) { delete values[key]; },
    };
    const state = window.MaintainOpsWorkspaceUiState.createWorkspaceUiState({ storage });
    const groups = {
      noDue: [{
        id: "work-no-due",
        kind: "no_due",
        priority: "high",
        status: "open",
        title: "Schedule bearing repair",
        assetName: "Roll Former 2",
        assignedTo: "Taylor Tech",
        createdAt: "2026-07-01T12:00:00Z",
      }],
      followUp: [{
        id: "work-follow-up",
        kind: "follow_up",
        title: "Verify press repair",
        assetName: "Press Brake 1",
        completedAt: "7/18/2026",
        resolution: "Confirm the repair remains stable.",
      }],
      overdue: [],
      today: [],
      soon: [{
        id: "work-soon",
        kind: "work",
        priority: "critical",
        status: "in_progress",
        title: "Replace drive belt",
        assetName: "Roll Former 1",
        dueAt: "2026-07-23",
        workOrder: {},
      }],
      pm: [],
    };
    const helpers = window.MaintainOpsPlanningDisplay.createPlanningDisplayHelpers({
      escapeHtml: (value) => String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      LIST_ITEMS_PER_PAGE: 12,
      getPlanningPage: (kind) => state.getPlanningPage(kind),
      getPlanningGroupOpen: (kind, fallback) => state.getPlanningGroupOpen(kind, fallback),
      renderListPagination: () => "",
      statusLabel: (status) => ({ open: "New", in_progress: "In Progress" }[status] || status),
      renderRelationshipChips: () => "",
      canEditOperationalRecords: () => true,
    });

    window.__planningState = state;
    window.__planningGroups = groups;
    window.__planningSaved = null;
    window.__renderPlanningFixture = () => {
      document.querySelector("#planning-test").innerHTML = `
        <div class="panel-header"><h2>Planning</h2><span>3 queue items</span></div>
        ${helpers.renderPlanningBoard(groups)}
      `;
      window.MaintainOpsWorkspaceFilterPaginationEvents.bindWorkspaceFilterPaginationEvents({
        documentRef: document,
        windowRef: window,
        state,
      });
      window.MaintainOpsWorkspacePlanningDueDateEvents.bindWorkspacePlanningDueDateEvents({
        documentRef: document,
        savePlanningDueDate: async (id, value) => {
          window.__planningSaved = { id, value };
          groups.noDue = groups.noDue.filter((item) => item.id !== id);
          window.__renderPlanningFixture();
        },
      });
    };
    window.__renderPlanningFixture();
  });
}

test("Planning lanes expand independently and schedule no-due work inline", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await renderPlanningFixture(page);

  await expect(page.getByRole("heading", { name: "Needs action" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Current schedule" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Upcoming" })).toBeVisible();
  await expect(page.locator('[data-planning-group="no-due"]')).toHaveAttribute("open", "");
  await expect(page.locator('[data-planning-group="soon"]')).not.toHaveAttribute("open", "");
  await expect(page.getByLabel("Due date")).toBeVisible();

  const layout = await page.evaluate(() => {
    const lanes = [...document.querySelectorAll(".planning-lane")];
    return {
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      laneLefts: lanes.map((lane) => Math.round(lane.getBoundingClientRect().left)),
    };
  });
  expect(layout.documentScrollWidth).toBeLessThanOrEqual(layout.documentClientWidth);
  expect(new Set(layout.laneLefts).size).toBe(3);
  if (process.env.MAINTAINOPS_CAPTURE_FILTER_UI === "1") {
    await page.screenshot({ path: path.join(root, "test-results", "planning-desktop.png"), fullPage: true });
  }

  await page.locator('[data-planning-group="soon"] > summary').click();
  await expect(page.locator('[data-planning-group="soon"]')).toHaveAttribute("open", "");

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileLayout = await page.evaluate(() => {
    const form = document.querySelector(".planning-due-form");
    const children = [...form.children];
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      childLefts: children.map((child) => Math.round(child.getBoundingClientRect().left)),
    };
  });
  expect(mobileLayout.scrollWidth).toBeLessThanOrEqual(mobileLayout.clientWidth);
  expect(new Set(mobileLayout.childLefts).size).toBe(1);
  if (process.env.MAINTAINOPS_CAPTURE_FILTER_UI === "1") {
    await page.screenshot({ path: path.join(root, "test-results", "planning-mobile.png"), fullPage: true });
  }

  await page.getByLabel("Due date").fill("2026-07-31");
  await page.getByRole("button", { name: "Set Due Date" }).click();
  await expect(page.getByText("Schedule bearing repair", { exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => window.__planningSaved)).toEqual({ id: "work-no-due", value: "2026-07-31" });

});
