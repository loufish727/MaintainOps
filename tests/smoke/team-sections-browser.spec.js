const { expect, test } = require("@playwright/test");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

async function renderTeamSections(page) {
  await page.setContent('<main class="panel" id="team-test"></main>');
  await page.addStyleTag({ path: path.join(root, "styles.css") });
  await page.addScriptTag({ path: path.join(root, "src/render/teamMemberDisplay.js") });
  await page.evaluate(() => {
    const escapeHtml = (value) => String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
    const { renderTeamSection } = window.MaintainOpsTeamMemberDisplay.createTeamMemberDisplayHelpers({ escapeHtml });
    document.querySelector("#team-test").innerHTML = [
      renderTeamSection({
        id: "members",
        label: "Team Members",
        meta: "12 shown",
        open: true,
        content: '<div class="member-list"><article class="member-card">Member roster</article></div>',
      }),
      renderTeamSection({
        id: "profile",
        label: "My Profile",
        content: '<form class="team-profile-form"><label>Display name<input value="QA User"></label></form>',
      }),
      renderTeamSection({
        id: "notifications",
        label: "Request Email Recipients",
        meta: "2 configured",
        content: '<section class="team-notification-panel">Notification settings</section>',
      }),
    ].join("");
  });
}

test("Team sections expand cleanly and fit phone width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await renderTeamSections(page);

  const members = page.locator('[data-team-section="members"]');
  const profile = page.locator('[data-team-section="profile"]');
  const notifications = page.locator('[data-team-section="notifications"]');

  await expect(members).toHaveAttribute("open", "");
  await expect(profile).not.toHaveAttribute("open", "");
  await expect(notifications).not.toHaveAttribute("open", "");
  await expect(page.getByText("Member roster")).toBeVisible();
  await expect(page.getByLabel("Display name")).not.toBeVisible();

  await profile.locator("summary").click();
  await expect(profile).toHaveAttribute("open", "");
  await expect(page.getByLabel("Display name")).toBeVisible();

  await members.locator("summary").click();
  await expect(members).not.toHaveAttribute("open", "");
  await expect(page.getByText("Member roster")).not.toBeVisible();

  const layout = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
});
