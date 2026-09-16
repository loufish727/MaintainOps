const path = require("node:path");
const { test, expect } = require("@playwright/test");

const stylesPath = path.resolve(__dirname, "../../styles.css");
const autoGrowPath = path.resolve(__dirname, "../../src/utils/workspaceTextareaAutoGrow.js");
const longResolution = Array.from(
  { length: 36 },
  (_, index) => `${index + 1}. Complete resolution direction ${index + 1}.`,
).join("\n");

for (const viewport of [
  { name: "desktop", width: 1100, height: 760 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test(`long work order resolutions remain scrollable on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.setContent(`
      <main class="workspace">
        <div class="detail-stack">
          <form class="form-grid">
            <label id="quick-update-resolution-field">
              Resolution
              <textarea name="resolution_summary" rows="2"></textarea>
            </label>
          </form>
        </div>
      </main>
    `);
    await page.addStyleTag({ path: stylesPath });
    await page.addScriptTag({ path: autoGrowPath });
    await page.locator('textarea[name="resolution_summary"]').fill(longResolution);
    await page.evaluate(() => {
      window.MaintainOpsWorkspaceTextareaAutoGrow.bindWorkspaceTextareaAutoGrow();
    });

    const textarea = page.locator('textarea[name="resolution_summary"]');
    const layout = await textarea.evaluate((field) => {
      const style = getComputedStyle(field);
      return {
        clientHeight: field.clientHeight,
        maxHeight: Number.parseFloat(style.maxHeight),
        overflowY: style.overflowY,
        scrollHeight: field.scrollHeight,
      };
    });

    expect(layout.clientHeight).toBeLessThanOrEqual(layout.maxHeight);
    expect(layout.scrollHeight).toBeGreaterThan(layout.clientHeight);
    expect(layout.overflowY).toBe("auto");

    await textarea.hover();
    await page.mouse.wheel(0, 600);
    await expect.poll(() => textarea.evaluate((field) => field.scrollTop)).toBeGreaterThan(0);
  });
}
