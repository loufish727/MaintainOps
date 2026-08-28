const path = require("node:path");
const { test, expect } = require("@playwright/test");

const stylesPath = path.resolve(__dirname, "../../styles.css");
const eventsPath = path.resolve(__dirname, "../../src/utils/workspaceProductionActionEvents.js");

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
