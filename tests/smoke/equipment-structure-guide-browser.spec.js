const { expect, test } = require("@playwright/test");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

for (const width of [320, 390, 768, 1440]) {
  test(`Equipment guide stays readable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.setContent('<main class="panel" id="equipment-test"></main>');
    await page.addStyleTag({ path: path.join(root, "styles.css") });
    await page.addScriptTag({ path: path.join(root, "src/render/equipmentStructureGuideDisplay.js") });
    await page.addScriptTag({ path: path.join(root, "src/render/equipmentLabels.js") });
    await page.addScriptTag({ path: path.join(root, "src/utils/constants.js") });
    await page.evaluate(() => {
      const { renderEquipmentStructureGuide } = window.MaintainOpsEquipmentStructureGuideDisplay.createEquipmentStructureGuideDisplayHelpers();
      const { assetTypeLabel } = window.MaintainOpsEquipmentLabels;
      const options = window.MaintainOpsConstants.ASSET_TYPE_OPTIONS.map((type) =>
        `<option value="${type}">${assetTypeLabel(type)}</option>`).join("");
      document.querySelector("#equipment-test").innerHTML = `${renderEquipmentStructureGuide()}
        <label>Equipment type<select id="asset-type">${options}</select></label>`;
    });

    const guide = page.getByRole("region", { name: "Equipment structure guide" });
    await expect(guide.locator("article")).toHaveCount(8);
    await expect(guide.getByText("Traveling Primary", { exact: true })).toBeVisible();
    await expect(guide.getByText("Sub equipment can belong to a primary machine OR to another sub-equipment record. It is not limited to one level.", { exact: true })).toBeVisible();
    await expect(guide.getByText(/Related part: Hydraulic Hose, linked to the pump in Parts/)).toBeVisible();
    await page.getByLabel("Equipment type").selectOption({ label: "Forklift / Mobile Lift" });
    await expect(page.getByLabel("Equipment type")).toHaveValue("forklift");

    const layout = await guide.evaluate((element) => {
      const overflows = [...element.querySelectorAll("article, p, strong, span")].filter((node) => {
        const parent = node.parentElement.getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(node);
        return [...range.getClientRects()].some((rect) => rect.left < parent.left - 1 || rect.right > parent.right + 1);
      }).map((node) => node.textContent.trim());
      const cards = [...element.querySelectorAll("article")].map((node) => node.getBoundingClientRect());
      const overlappingCards = cards.some((a, i) => cards.slice(i + 1).some((b) =>
        a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom));
      return { overflows, overlappingCards, scrollWidth: document.documentElement.scrollWidth, width: innerWidth };
    });
    expect(layout.overflows).toEqual([]);
    expect(layout.overlappingCards).toBe(false);
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width);
    await page.screenshot({ path: testInfo.outputPath(`equipment-guide-${width}.png`), fullPage: true });
  });
}
