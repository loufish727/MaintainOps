const path = require("node:path");
const { test, expect } = require("@playwright/test");

const stylesPath = path.resolve(__dirname, "../../styles.css");
const eventsPath = path.resolve(__dirname, "../../src/utils/workspaceProductionActionEvents.js");

async function mountWorkCards(page, cardWidth) {
  await page.setContent(`<!doctype html><html data-theme="dark"><head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
    <body><main class="work-list" style="padding:16px;grid-template-columns:repeat(auto-fit,${cardWidth}px);align-items:start"></main></body></html>`);
  await page.addStyleTag({ path: stylesPath });
  for (const file of ["iconDisplay", "relationshipDisplay", "productionActionDisplay", "workQueueDisplay"]) {
    await page.addScriptTag({ path: path.resolve(__dirname, `../../src/render/${file}.js`) });
  }
  await page.addScriptTag({ path: eventsPath });
  await page.evaluate(() => {
    const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    const procedures = [{ id: "inspection", name: "Basic Equipment Inspection" }];
    const relationships = window.MaintainOpsRelationshipDisplay.createRelationshipDisplayHelpers({
      escapeHtml, getProcedureTemplates: () => procedures, checklistProgress: () => ({ done: 1, total: 4 }),
      getPartsUsedByWorkOrder: () => ({}), getCommentsByWorkOrder: () => ({ "wo-0": [{}] }),
      getPhotosByWorkOrder: () => ({ "wo-0": [{}, {}, {}, {}, {}] }), getMessageThreads: () => [],
    });
    const production = window.MaintainOpsProductionActionDisplay.createProductionActionDisplayHelpers({
      escapeHtml, getCompanyMembers: () => [{ user_id: "production", role: "production" }],
      normalizeRole: (role) => role, teamMemberName: () => "Production Supervisor With A Long Name",
      activeCompanyRole: () => "manager", getSession: () => ({ user: { id: "manager" } }),
      hasProductionAction: (order) => Boolean(order.production_action), canEditOperationalRecords: () => true,
    });
    const queue = window.MaintainOpsWorkQueueDisplay.createWorkQueueDisplayHelpers({
      escapeHtml, statusLabel: (status) => ({ open: "New", in_progress: "In Progress", blocked: "Blocked", completed: "Completed" })[status],
      getDueState: () => null, getProcedureTemplates: () => procedures, getActiveWorkOrderId: () => "",
      cleanWorkOrderDescription: (text) => text, relationshipIcon: relationships.relationshipIcon,
      segmentIcon: window.MaintainOpsIconDisplay.segmentIcon, isVendorAssigned: () => false,
      assignmentLabel: () => "Maintenance Technician", renderRelationshipChips: relationships.renderRelationshipChips,
      renderProductionActionCard: production.renderProductionActionCard,
      hasOpenProductionAction: (order) => order.production_action_status === "open",
      canAssignWorkOrderToMe: () => false, canManageTeam: () => false,
      STATUS_OPTIONS: ["open", "in_progress", "blocked", "completed"],
    });
    document.querySelector("main").innerHTML = ["none", "open", "completed"].map((status, index) => queue.renderWorkOrderCard({
      id: `wo-${index}`, status: "in_progress", priority: "high", type: "corrective",
      title: "Shear clutch needs to be replaced; it has been damaged severely", description: "Clutch for shear",
      asset_id: "shear", assets: { name: "Production Roll Former" }, procedure_template_id: "inspection",
      created_at: "2026-06-09T12:00:00Z", production_action_status: status,
      production_action_assigned_to: status === "none" ? null : "production",
      production_action: status === "none" ? "" : "Stage the material and clear the entire production area before maintenance begins. ".repeat(30),
    })).join("");
    window.productionCalls = [];
    window.MaintainOpsWorkspaceProductionActionEvents.bindWorkspaceProductionActionEvents({
      saveProductionAction: (event) => { event.preventDefault(); window.productionCalls.push("save"); },
      setProductionActionStatus: (event) => window.productionCalls.push(event.currentTarget.dataset.productionActionStatus),
      removeProductionAction: () => window.productionCalls.push("remove"),
    });
  });
}

for (const layout of [
  { width: 1280, card: 224 }, { width: 1280, card: 240 }, { width: 1280, card: 280 }, { width: 1280, card: 340 },
  { width: 320, card: 288 }, { width: 390, card: 358 },
]) {
  test(`Production Action contents stay contained at ${layout.width}px / ${layout.card}px cards`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: layout.width, height: 960 });
    await mountWorkCards(page, layout.card);
    await page.screenshot({ path: testInfo.outputPath("work-cards.png"), fullPage: true });
    const bounds = await page.locator(".production-action-card-compact").evaluateAll((rows) => rows.map((row) => {
      const box = (node) => {
        const { top, bottom, left, right, height } = node.getBoundingClientRect();
        return { top, bottom, left, right, height };
      };
      return {
        row: box(row), copy: box(row.querySelector(".production-action-card-copy")),
        chips: [...row.querySelectorAll(".production-action-card-heading .chip")].map(box),
        preview: box(row.querySelector(".production-action-card-preview")),
        button: box(row.querySelector(".production-action-card-open")),
        previous: box(row.previousElementSibling), next: box(row.nextElementSibling),
      };
    }));
    for (const b of bounds) {
      expect(b.row.height).toBe(64);
      expect(b.copy.top, "production text must stay below the row's top padding").toBeGreaterThanOrEqual(b.row.top + 6);
      expect(b.preview.bottom).toBeLessThanOrEqual(b.row.bottom - 6);
      expect(b.chips[0].top).toBe(b.chips[1].top);
      expect(b.chips[0].right).toBeLessThanOrEqual(b.chips[1].left);
      expect(b.chips[1].right).toBeLessThanOrEqual(b.button.left - 4);
      expect(b.copy.right).toBeLessThanOrEqual(b.button.left - 4);
      expect(b.copy.left).toBeGreaterThanOrEqual(b.row.left + 6);
      expect(b.button.right, "action button must stay inside the card").toBeLessThanOrEqual(b.row.right - 6);
      expect(b.button.top).toBeGreaterThanOrEqual(b.row.top + 6);
      expect(b.button.bottom).toBeLessThanOrEqual(b.row.bottom - 6);
      expect(b.previous.bottom).toBeLessThanOrEqual(b.row.top);
      expect(b.next.top).toBeGreaterThanOrEqual(b.row.bottom);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    if (layout.width > 720) {
      const heights = await page.locator(".work-card").evaluateAll((cards) => cards.map((card) => card.getBoundingClientRect().height));
      expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1);
    }

    for (const [index, label] of ["Assign Production Action", "Manage Production Action", "Manage Production Action"].entries()) {
      const card = page.locator(`.work-card[data-id="wo-${index}"]`);
      const before = await card.boundingBox();
      await card.getByRole("button", { name: label, exact: true }).click();
      const dialog = card.getByRole("dialog", { name: "Production Action", exact: true });
      await expect(dialog).toBeVisible();
      if (!index) {
        await dialog.getByLabel("Production action", { exact: true }).fill("Clear the area for maintenance.");
        await dialog.getByRole("button", { name: "Assign Production Action", exact: true }).click();
        expect(await page.evaluate(() => window.productionCalls.at(-1))).toBe("save");
      } else {
        await expect(dialog.locator(".production-action-text")).toContainText("Stage the material");
        await dialog.getByRole("button", { name: index === 1 ? "Complete Production Action" : "Reopen Production Action", exact: true }).click();
        expect(await page.evaluate(() => window.productionCalls.at(-1))).toBe(index === 1 ? "completed" : "open");
      }
      await dialog.getByRole("button", { name: "Close", exact: true }).click();
      await expect(dialog).toBeHidden();
      expect((await card.boundingBox()).height).toBe(before.height);
    }
  });
}

for (const viewport of [
  { name: "desktop", width: 1100, height: 760 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test(`Production Action controls keep readable contrast on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.setContent(`
      <main class="workspace">
        <span data-production-ink-probe style="color: var(--production-ink)" hidden></span>
        <div class="work-list">
          <article class="work-card" data-expanded-card>
            <div class="work-card-header"><span class="chip">In Progress</span></div>
            <div class="work-card-body"><h3>Press repair</h3><p>Repair the damaged press guard.</p></div>
            <div class="work-card-meta"><span>Assigned to Maintenance</span></div>
            <div class="relationship-row"><span class="relationship-chip">Press 2</span></div>
            <div class="quick-actions work-card-actions"><button type="button">Complete</button></div>
            <section class="production-action-control production-action-card-compact is-open" data-production-action-control>
              <div class="production-action-card-copy">
                <div class="chip-row production-action-card-heading"><span class="chip production-action-chip">Production Action</span><span class="chip status-open">Open</span></div>
                <p class="production-action-card-preview">Justin Werber - Stage material for maintenance.</p>
              </div>
              <button class="secondary-button production-action-card-open" data-production-action-dialog-open="wo-1" aria-controls="production-action-dialog-wo-1" aria-label="Manage Production Action" type="button"><span aria-hidden="true">...</span></button>
              <dialog class="production-action-dialog" id="production-action-dialog-wo-1" data-production-action-dialog="wo-1">
                <div class="production-action-dialog-shell">
                  <header class="production-action-dialog-header"><h3>Production Action</h3><button class="text-button production-action-dialog-close" data-production-action-dialog-close type="button">Close</button></header>
                  <div class="production-action-dialog-body">
                    <form class="production-action-form compact">
                      <label>Production action<textarea>Stage material for maintenance.</textarea></label>
                      <label>Production owner<select><option>Justin Werber</option></select></label>
                      <div class="button-row production-action-form-actions"><button class="secondary-button production-action-button" type="button">Save Production Action</button></div>
                    </form>
                  </div>
                </div>
              </dialog>
            </section>
          </article>
          <article class="work-card" data-neighbor-card>
            <div class="work-card-header"><span class="chip">New</span></div>
            <div class="work-card-body"><h3>Conveyor inspection</h3><p>Inspect the conveyor drive.</p></div>
            <div class="work-card-meta"><span>Unassigned</span></div>
            <div class="relationship-row"><span class="relationship-chip">Conveyor 1</span></div>
            <div class="quick-actions work-card-actions"><button type="button">Start</button></div>
            <section class="production-action-control production-action-card-compact is-empty" data-production-action-control>
              <div class="production-action-card-copy">
                <div class="chip-row production-action-card-heading"><span class="chip production-action-chip">Production Action</span><span class="chip">None</span></div>
                <p class="production-action-card-preview">Not assigned</p>
              </div>
              <button class="secondary-button production-action-card-open" data-production-action-dialog-open="wo-2" aria-controls="production-action-dialog-wo-2" aria-label="Assign Production Action" type="button"><span aria-hidden="true">+</span></button>
              <dialog class="production-action-dialog" id="production-action-dialog-wo-2" data-production-action-dialog="wo-2"></dialog>
            </section>
          </article>
        </div>
      </main>
    `);
    await page.addStyleTag({ path: stylesPath });
    await page.addScriptTag({ path: eventsPath });
    await page.evaluate(() => {
      window.MaintainOpsWorkspaceProductionActionEvents.bindWorkspaceProductionActionEvents({
        saveProductionAction: () => {},
        setProductionActionStatus: () => {},
        removeProductionAction: () => {},
      });
    });

    const initialLayout = await page.evaluate(() => ({
      expandedHeight: document.querySelector("[data-expanded-card]").getBoundingClientRect().height,
      neighborHeight: document.querySelector("[data-neighbor-card]").getBoundingClientRect().height,
      productionActionHeight: document.querySelector("[data-expanded-card] .production-action-card-compact").getBoundingClientRect().height,
    }));
    expect(Math.abs(initialLayout.expandedHeight - initialLayout.neighborHeight)).toBeLessThanOrEqual(1);
    expect(initialLayout.productionActionHeight).toBe(64);

    await page.locator('[data-production-action-dialog-open="wo-1"]').click();
    await expect(page.locator('[data-production-action-dialog="wo-1"]')).toBeVisible();

    for (const theme of ["default", "dark"]) {
      await page.evaluate((activeTheme) => {
        if (activeTheme === "dark") document.documentElement.dataset.theme = "dark";
        else delete document.documentElement.dataset.theme;
      }, theme);

      const result = await page.locator(".production-action-button").evaluate((button) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        const rgba = (value) => {
          context.clearRect(0, 0, 1, 1);
          context.fillStyle = value;
          context.fillRect(0, 0, 1, 1);
          const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
          return [red, green, blue, alpha / 255];
        };
        const composite = (foreground, background) => {
          const alpha = foreground[3] + background[3] * (1 - foreground[3]);
          return [
            (foreground[0] * foreground[3] + background[0] * background[3] * (1 - foreground[3])) / alpha,
            (foreground[1] * foreground[3] + background[1] * background[3] * (1 - foreground[3])) / alpha,
            (foreground[2] * foreground[3] + background[2] * background[3] * (1 - foreground[3])) / alpha,
            alpha,
          ];
        };
        const luminance = (color) => {
          const channel = (value) => {
            const normalized = value / 255;
            return normalized <= 0.04045
              ? normalized / 12.92
              : ((normalized + 0.055) / 1.055) ** 2.4;
          };
          return 0.2126 * channel(color[0]) + 0.7152 * channel(color[1]) + 0.0722 * channel(color[2]);
        };

        const ancestors = [];
        for (let element = button; element; element = element.parentElement) ancestors.push(element);
        let effectiveBackground = [255, 255, 255, 1];
        for (const element of ancestors.reverse()) {
          effectiveBackground = composite(rgba(getComputedStyle(element).backgroundColor), effectiveBackground);
        }

        const style = getComputedStyle(button);
        const textColor = composite(rgba(style.color), effectiveBackground);
        const lighter = Math.max(luminance(textColor), luminance(effectiveBackground));
        const darker = Math.min(luminance(textColor), luminance(effectiveBackground));
        const expectedInk = getComputedStyle(document.querySelector("[data-production-ink-probe]")).color;
        return {
          backgroundColor: style.backgroundColor,
          backgroundImage: style.backgroundImage,
          color: style.color,
          contrast: (lighter + 0.05) / (darker + 0.05),
          expectedInk,
          productionBackground: getComputedStyle(document.documentElement).getPropertyValue("--production-bg").trim(),
        };
      });

      expect(result.productionBackground).toBe("rgba(119, 215, 255, 0.11)");
      expect(result.backgroundImage).toBe("none");
      expect(result.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
      expect(result.color).toBe(result.expectedInk);
      expect(result.contrast).toBeGreaterThanOrEqual(4.5);
    }

    const openLayout = await page.evaluate(() => ({
      expandedHeight: document.querySelector("[data-expanded-card]").getBoundingClientRect().height,
      neighborHeight: document.querySelector("[data-neighbor-card]").getBoundingClientRect().height,
      textareaHeight: document.querySelector(".production-action-form.compact textarea").getBoundingClientRect().height,
    }));
    expect(openLayout.textareaHeight).toBe(88);
    expect(Math.abs(openLayout.expandedHeight - openLayout.neighborHeight)).toBeLessThanOrEqual(1);
    expect(openLayout.expandedHeight).toBe(initialLayout.expandedHeight);

    await page.locator('[data-production-action-dialog="wo-1"] [data-production-action-dialog-close]').click();
    await expect(page.locator('[data-production-action-dialog="wo-1"]')).toBeHidden();
  });
}
