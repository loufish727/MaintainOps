const { expect, test } = require("@playwright/test");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

async function renderWorkOrderFilters(page) {
  await page.setContent('<main class="panel queue-panel" id="work-order-filter-test"></main>');
  await page.addStyleTag({ path: path.join(root, "styles.css") });
  await page.addScriptTag({ path: path.join(root, "src/utils/workspaceUiState.js") });
  await page.addScriptTag({ path: path.join(root, "src/utils/workspaceFilterPaginationEvents.js") });
  await page.addScriptTag({ path: path.join(root, "src/render/workQueueDisplay.js") });
  await page.evaluate(() => {
    const values = {};
    const storage = {
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : null;
      },
      setItem(key, value) {
        values[key] = String(value);
      },
      removeItem(key) {
        delete values[key];
      },
    };
    const state = window.MaintainOpsWorkspaceUiState.createWorkspaceUiState({ storage });
    state.setActiveSection("work");
    const members = [
      { userId: "user-1", name: "Taylor Tech" },
      { userId: "user-2", name: "Morgan Manager" },
    ];
    const workOrders = [
      {
        id: "wo-1",
        title: "Press brake inspection",
        description: "Inspect guarding",
        status: "open",
        type: "preventive",
        priority: "high",
        assigned_to: "user-2",
        created_at: "2026-07-18T12:00:00Z",
        due_at: "2026-07-22",
        assets: { name: "Press Brake 1" },
      },
      {
        id: "wo-2",
        title: "Unassigned repair",
        description: "Diagnose drive fault",
        status: "blocked",
        type: "corrective",
        priority: "critical",
        assigned_to: null,
        created_at: "2026-07-17T12:00:00Z",
        due_at: "2026-07-20",
        assets: { name: "Roll Former 2" },
      },
      {
        id: "wo-3",
        title: "Vendor service",
        description: "Outside vendor visit",
        status: "in_progress",
        type: "fabrication",
        priority: "medium",
        assigned_to: "__outside_vendor__",
        created_at: "2026-07-16T12:00:00Z",
        due_at: "2026-07-25",
        assets: { name: "Forklift 4" },
      },
    ];
    const escapeHtml = (value) => String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
    const statusLabel = (status) => ({
      active: "Active",
      open: "New",
      in_progress: "In Progress",
      blocked: "Blocked",
      overdue: "Overdue",
      completed: "All Completed",
      completed_month: "Completed Month",
      completed_week: "Done This Week",
    }[status] || status);
    const typeLabel = (type) => type.charAt(0).toUpperCase() + type.slice(1);
    const assignmentLabel = (workOrder) => {
      if (workOrder.assigned_to === "__outside_vendor__") return "Outside vendor";
      return members.find((member) => member.userId === workOrder.assigned_to)?.name || "Unassigned";
    };
    const helpers = window.MaintainOpsWorkQueueDisplay.createWorkQueueDisplayHelpers({
      statusLabel,
      workOrderTypeLabel: typeLabel,
      teamMemberName: (userId) => members.find((member) => member.userId === userId)?.name || userId,
      getWorkOrderAssigneeFilter: () => state.getWorkOrderAssigneeFilter(),
      getWorkOrderFilter: () => state.getWorkOrderFilter(),
      getWorkOrderTypeFilter: () => state.getWorkOrderTypeFilter(),
      getWorkOrderPriorityFilter: () => state.getWorkOrderPriorityFilter(),
      getWorkSort: () => state.getWorkSort(),
      getWorkGroup: () => state.getWorkGroup(),
      getActiveStatusFilter: () => state.getActiveStatusFilter(),
      getMyWorkFilter: () => state.getMyWorkFilter(),
      getActiveSection: () => "work",
      getDueState: () => null,
      getProcedureTemplates: () => [],
      getActiveWorkOrderId: () => "",
      getProfilesByUserId: () => ({}),
      getSession: () => ({ user: { id: "user-1" } }),
      STATUS_OPTIONS: ["open", "in_progress", "blocked", "completed"],
      TYPE_OPTIONS: ["corrective", "preventive", "fabrication"],
      OUTSIDE_VENDOR_VALUE: "__outside_vendor__",
      escapeHtml,
      cleanWorkOrderDescription: (value) => value,
      relationshipIcon: () => "",
      segmentIcon: () => "",
      isVendorAssigned: (workOrder) => workOrder.assigned_to === "__outside_vendor__",
      assignmentLabel,
      renderRelationshipChips: () => "",
      canAssignWorkOrderToMe: () => false,
      canManageTeam: () => false,
    });

    window.__workFilterState = state;
    window.__workFilterReloads = 0;
    window.__renderWorkFilterTest = () => {
      document.querySelector("#work-order-filter-test").innerHTML = `
        <div class="panel-header"><h2>${helpers.workQueuePanelTitle()}</h2><span>3 shown</span></div>
        <button data-status-filter="open" type="button">3 New</button>
        ${helpers.renderWorkOrderFilterToolbar(members)}
        ${helpers.renderWorkOrderCollection(workOrders, { groupBy: state.getWorkGroup() })}
      `;
      window.MaintainOpsWorkspaceFilterPaginationEvents.bindWorkspaceFilterPaginationEvents({
        documentRef: document,
        windowRef: window,
        state,
        resetWorkOrderPage: () => state.resetWorkOrderPage(),
        resetRequestsPage: () => {},
        reloadWorkOrderQueue: async () => {
          window.__workFilterReloads += 1;
          window.__renderWorkFilterTest();
        },
        reloadRequestQueue: async () => {},
        renderWorkspace: () => window.__renderWorkFilterTest(),
        invalidateExactWorkOrderSearchCache: () => {},
      });
    };
    window.__renderWorkFilterTest();
  });
}

test("Work Orders filters expose their hierarchy and remain usable on phones", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await renderWorkOrderFilters(page);

  await expect(page.getByText("Current view", { exact: true })).toBeVisible();
  await expect(page.getByText("Status: Active", { exact: true })).toBeVisible();
  await expect(page.getByText("Assignment: Any assignment", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Filter work orders by assigned person")).toBeVisible();
  await expect(page.getByLabel("Sort work orders")).toHaveValue("newest");
  await expect(page.getByLabel("Sort work orders")).toContainText("Work type A-Z");
  await expect(page.getByRole("button", { name: "Assigned", exact: true })).toHaveCount(0);
  if (process.env.MAINTAINOPS_CAPTURE_FILTER_UI === "1") {
    await page.screenshot({ path: path.join(root, "test-results", "work-order-filters-desktop.png"), fullPage: true });
  }

  await page.setViewportSize({ width: 1024, height: 768 });
  const tabletLayout = await page.evaluate(() => {
    const controls = document.querySelector(".work-order-controls");
    return {
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      controlsClientWidth: controls.clientWidth,
      controlsScrollWidth: controls.scrollWidth,
    };
  });
  expect(tabletLayout.documentScrollWidth).toBeLessThanOrEqual(tabletLayout.documentClientWidth);
  expect(tabletLayout.controlsScrollWidth).toBeLessThanOrEqual(tabletLayout.controlsClientWidth);
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.getByLabel("Filter work orders by assigned person").selectOption("user-2");
  await expect(page.getByLabel("Filter work orders by assignment")).toHaveValue("assigned");
  await expect(page.getByText("Person: Morgan Manager", { exact: true })).toBeVisible();

  await page.getByLabel("Filter work orders by work type").selectOption("preventive");
  await page.getByLabel("Filter work orders by priority").selectOption("high");
  await page.getByLabel("Sort work orders").selectOption("type");
  await expect(page.getByText("Type: Preventive", { exact: true })).toBeVisible();
  await expect(page.getByText("Priority: High", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Sort work orders")).toHaveValue("type");

  await page.getByRole("button", { name: "3 New", exact: true }).click();
  await expect(page.getByLabel("Filter work orders by status")).toHaveValue("open");
  await expect(page.getByLabel("Filter work orders by assignment")).toHaveValue("all");
  await expect(page.getByLabel("Filter work orders by assigned person")).toHaveValue("");
  await expect(page.getByLabel("Filter work orders by work type")).toHaveValue("all");
  await expect(page.getByLabel("Filter work orders by priority")).toHaveValue("all");

  await page.getByLabel("Group work orders").selectOption("assignee");
  await expect(page.locator(".work-order-group-heading").getByText("Morgan Manager", { exact: true })).toBeVisible();
  await expect(page.locator(".work-order-group-heading").getByText("Unassigned", { exact: true })).toBeVisible();
  await expect(page.locator(".work-order-group-heading").getByText("Outside vendor", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(page.getByLabel("Filter work orders by status")).toHaveValue("active");
  await expect(page.getByLabel("Filter work orders by assignment")).toHaveValue("all");
  await expect(page.getByLabel("Filter work orders by assigned person")).toHaveValue("");
  await expect(page.getByLabel("Group work orders")).toHaveValue("none");
  await expect(page.getByRole("button", { name: "Clear filters", exact: true })).toBeDisabled();

  await page.getByLabel("Filter work orders by status").selectOption("completed");
  await expect(page.getByLabel("Sort work orders")).toBeDisabled();
  await expect(page.getByLabel("Sort work orders")).toHaveValue("completed");
  await expect(page.getByLabel("Sort work orders")).toContainText("Recently completed");
  await expect(page.locator(".panel-header h2")).toHaveText("All Completed - Work Orders");

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileLayout = await page.evaluate(() => {
    const fields = [...document.querySelectorAll(".work-filter-fields .work-control-field")];
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      fieldLefts: fields.map((field) => Math.round(field.getBoundingClientRect().left)),
      fieldWidths: fields.map((field) => Math.round(field.getBoundingClientRect().width)),
    };
  });
  expect(mobileLayout.scrollWidth).toBeLessThanOrEqual(mobileLayout.clientWidth);
  expect(new Set(mobileLayout.fieldLefts).size).toBe(1);
  expect(Math.min(...mobileLayout.fieldWidths)).toBeGreaterThan(300);
  if (process.env.MAINTAINOPS_CAPTURE_FILTER_UI === "1") {
    await page.screenshot({ path: path.join(root, "test-results", "work-order-filters-mobile.png"), fullPage: true });
  }
});
