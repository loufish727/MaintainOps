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

for (const width of [320, 390, 1280]) {
  test(`Team cards show saved default locations without overflow at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await page.setContent('<main class="panel"><div class="member-list" id="members"></div></main>');
    await page.addStyleTag({ path: path.join(root, "styles.css") });
    await page.addScriptTag({ path: path.join(root, "src/render/teamMemberDisplay.js") });
    await page.evaluate(() => {
      const escapeHtml = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
      const profiles = { salem: { full_name: 'Salem Teammate', mobile_tech: true }, auburn: { full_name: 'Auburn Teammate' }, none: { full_name: 'Unassigned Teammate' }, unknown: { full_name: 'Unavailable Location' }, long: { full_name: 'Long Location' } };
      const locations = [{ id: 'salem', name: 'Salem' }, { id: 'auburn', name: 'Auburn' }, { id: 'long', name: 'North Manufacturing and Fabrication Facility ' + 'LongLocationName'.repeat(8) }];
      const { renderMember } = window.MaintainOpsTeamMemberDisplay.createTeamMemberDisplayHelpers({
        getProfilesByUserId: () => profiles, getSession: () => ({ user: { id: 'viewer' } }),
        getLocations: () => locations, getActiveCompanyMembership: () => ({ default_location_id: 'auburn' }),
        escapeHtml, roleDescription: () => 'Technician', roleLabel: () => 'Technician',
        normalizeRole: role => role, canAdministerTeamRoles: () => false, COMPANY_ROLES: ['technician'],
        teamMemberWorkload: () => ({ newWork: 1, inProgress: 2, blocked: 0, completed: 5, overdue: 0 }),
      });
      document.querySelector('#members').innerHTML = [
        ['salem', 'salem'], ['auburn', 'auburn'], ['none', null], ['unknown', 'missing-id'], ['long', 'long'],
      ].map(([user_id, default_location_id]) => renderMember({ user_id, default_location_id, role: 'technician' })).join('');
    });
    const values = page.locator('.member-default-location');
    await expect(values.nth(0)).toHaveText('Default location: Salem');
    await expect(values.nth(1)).toHaveText('Default location: Auburn');
    await expect(values.nth(2)).toHaveText('Default location: Not set');
    await expect(values.nth(3)).toHaveText('Default location: Location unavailable');
    await expect(values.nth(0)).toBeVisible();
    await expect(page.locator('input[name="default_location_id"], select[name="default_location_id"]')).toHaveCount(0);
    const layout = await page.evaluate(() => ({
      width: innerWidth, scroll: document.documentElement.scrollWidth,
      visibleValues: [...document.querySelectorAll('.member-default-location strong')].every(node => {
        const style = getComputedStyle(node);
        return style.color !== getComputedStyle(node.closest('.member-card')).backgroundColor && node.getBoundingClientRect().height > 0;
      }),
    }));
    expect(layout.scroll).toBeLessThanOrEqual(layout.width);
    expect(layout.visibleValues).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`team-default-location-${width}.png`), fullPage: true });
  });
}

for (const width of [390, 1280]) {
  for (const viewerRole of ["admin", "manager", "technician", "production", "accounting"]) {
    test(`Team role visibility for ${viewerRole} at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 844 });
      await page.setContent('<main class="panel"><div class="member-list" id="members"></div></main>');
      await page.addStyleTag({ path: path.join(root, "styles.css") });
      await page.addScriptTag({ path: path.join(root, "src/render/teamMemberDisplay.js") });
      await page.evaluate(viewer => {
        const roles = ["admin", "manager", "technician", "production", "accounting"];
        const profiles = Object.fromEntries(roles.map((role, index) => [`member-${index}`, { full_name: `Teammate ${index + 1}` }]));
        const { renderMember } = window.MaintainOpsTeamMemberDisplay.createTeamMemberDisplayHelpers({
          getProfilesByUserId: () => profiles,
          getSession: () => ({ user: { id: `member-${roles.indexOf(viewer)}` } }),
          getLocations: () => [{ id: "salem", name: "Salem, OR" }],
          escapeHtml: value => String(value ?? ""),
          roleDescription: role => `${role} permissions`,
          roleLabel: role => role,
          normalizeRole: role => role,
          canManageTeam: () => ["admin", "manager"].includes(viewer),
          canAdministerTeamRoles: () => viewer === "admin",
          COMPANY_ROLES: roles,
          teamMemberWorkload: () => ({ newWork: 1, inProgress: 2, blocked: 0, completed: 5, overdue: 0 }),
        });
        document.querySelector("#members").innerHTML = roles.map((role, index) => renderMember({
          user_id: `member-${index}`, role, default_location_id: "salem",
        })).join("");
      }, viewerRole);

      const cards = page.locator(".member-card");
      await expect(cards).toHaveCount(5);
      await expect(page.getByRole("button", { name: "View Work", exact: true })).toHaveCount(5);
      await expect(page.locator(".member-default-location")).toHaveText(Array(5).fill("Default location: Salem, OR"));
      await expect(page.locator(".member-workload .completed")).toHaveText(Array(5).fill("5 Completed"));
      const canViewRoles = ["admin", "manager"].includes(viewerRole);
      await expect(page.locator(".member-role-description")).toHaveCount(canViewRoles ? 5 : 0);
      await expect(page.locator(".member-role-badge")).toHaveCount(viewerRole === "admin" ? 1 : viewerRole === "manager" ? 5 : 0);
      await expect(page.getByRole("combobox")).toHaveCount(viewerRole === "admin" ? 4 : 0);
      if (!canViewRoles) {
        expect(await page.locator("#members").innerHTML()).not.toMatch(/admin|manager|technician|production|accounting/i);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: testInfo.outputPath(`team-${viewerRole}-${width}.png`), fullPage: true });
    });
  }
}
