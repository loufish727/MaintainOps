const { expect } = require('@playwright/test');

async function revealSection(page, section) {
  const target = page.locator(`.section-nav [data-section="${section}"]`);
  await expect(target).toBeAttached({ timeout: 45000 });
  const group = target.locator('xpath=ancestor::details[@data-nav-group]');
  if (await group.count() && await group.getAttribute('open') === null) {
    await group.locator(':scope > summary').click();
  }
  await expect(target).toBeVisible();
  return target;
}

async function navigateSection(page, section) {
  const target = await revealSection(page, section);
  await target.click();
}

module.exports = { revealSection, navigateSection };
