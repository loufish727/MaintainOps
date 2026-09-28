const { test, expect } = require('@playwright/test');
const path = require('node:path');
const fs = require('node:fs');
const root = path.resolve(__dirname, '../..');
const { revealSection, navigateSection } = require('../helpers/workspace-navigation');
const items = [['mywork', 'My Work'], ['work', 'Work Orders'], ['planning', 'Planning'], ['requests', 'Requests'],
  ['assets', 'Equipment'], ['pm', 'PM'], ['procedures', 'Procedure Checklist'], ['financial', 'Financial'], ['parts', 'Parts'],
  ['team', 'Team'], ['messages', 'Messages'], ['conversions', 'Conversions'], ['manager', 'Manager'], ['settings', 'Settings'], ['setup', 'Admin Setup'], ['performance', 'App Performance']];

async function mount(page, texture = true) {
  await page.route('https://nav.preview.test/assets/navigation/graphite-v1.webp', route => texture
    ? route.fulfill({ contentType: 'image/webp', body: fs.readFileSync(path.join(root, 'assets/navigation/graphite-v1.webp')) }) : route.abort());
  await page.setContent('<!doctype html><html><head><base href="https://nav.preview.test/"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body data-ui-section="mywork"><div class="app-shell"><aside class="sidebar"><nav class="section-nav grouped-nav" aria-label="Workspace sections"></nav></aside><main class="workspace"><h1>My Work</h1><label>Unsaved note<input id="draft"></label></main></div></body></html>');
  await page.addStyleTag({ path: path.join(root, 'styles.css') });
  for (const file of ['iconDisplay.js', 'workspaceNavigationDisplay.js']) await page.addScriptTag({ path: path.join(root, 'src/render', file) });
  await page.evaluate(items => {
    window.navOptions = { items, activeSection: 'mywork', scope: 'qa', escapeHtml: text => text,
      navIcon: window.MaintainOpsIconDisplay.navIcon, renderBadge: id => id === 'messages' ? '<b class="nav-badge nav-message-badge" aria-label="2 unread conversations and work alerts">2</b>' : '' };
    window.drawNav = () => {
      document.querySelector('nav').innerHTML = window.MaintainOpsWorkspaceNavigation.render(window.navOptions);
      window.MaintainOpsWorkspaceNavigation.bind();
    };
    window.drawNav();
  }, items);
  if (texture) expect(await page.evaluate(() => new Promise(resolve => {
    const image = new Image(); image.onload = () => resolve(image.naturalWidth); image.onerror = () => resolve(0);
    image.src = 'assets/navigation/graphite-v1.webp';
  }))).toBe(384);
}

for (const width of [320, 390, 430, 760, 761, 768, 920, 921, 1440]) test(`grouped menu layout, colors and complete tap targets at ${width}px`, async ({ page }, testInfo) => {
  await page.setViewportSize({ width, height: 960 });
  await mount(page);
  await expect(page.locator('nav > *')).toHaveCount(6);
  await expect(page.locator('[data-nav-group][open]')).toHaveCount(1);
  for (const root of await page.locator('nav > button, nav > details > summary').all()) {
    await expect(root).toHaveCSS('border-radius', '18px');
    expect(await root.evaluate(node => getComputedStyle(node, '::before').clipPath)).toBe('none');
    expect(await root.evaluate(node => getComputedStyle(node, '::before').borderRadius)).toBe('18px');
  }
  for (const roundControl of await page.locator('.nav-emblem, .nav-disclosure').all()) {
    await expect(roundControl).toHaveCSS('border-radius', '50%');
    const box = await roundControl.boundingBox();
    expect(box.width).toBe(box.height);
  }
  for (const groupId of ['team', 'settings', 'assets', 'work']) {
    const group = page.locator(`[data-nav-group="${groupId}"]`), summary = group.locator('summary');
    const box = await summary.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(48);
    const label = await summary.locator('.nav-group-label').boundingBox();
    const disclosure = await summary.locator('.nav-disclosure').boundingBox();
    expect(label.x + label.width).toBeLessThanOrEqual(disclosure.x);
    expect(label.height).toBeLessThan(24);
    await summary.click({ position: { x: box.width - 5, y: box.height / 2 } });
    await expect(summary).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('[data-nav-group][open]')).toHaveCount(1);
    const controls = group.locator('[data-section]');
    for (const control of await controls.all()) {
      await expect(control).toBeVisible();
      const metrics = await control.evaluate(node => ({ height: node.getBoundingClientRect().height, overflow: node.scrollWidth - node.clientWidth }));
      expect(metrics.height).toBeGreaterThanOrEqual(48);
      expect(metrics.overflow).toBeLessThanOrEqual(1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await page.screenshot({ path: testInfo.outputPath(`${groupId}-${width}.png`), fullPage: true, animations: 'disabled' });
  }
  await revealSection(page, 'financial');
  await expect(page.locator('.nav-financial .nav-icon')).toHaveCSS('color', 'rgb(197, 180, 245)');
  await expect(page.locator('summary.nav-assets .nav-icon')).toHaveCSS('color', 'rgb(119, 215, 255)');
  await expect(page.locator('summary[data-nav-messages] .nav-badge')).toBeVisible();
});

test('narrow menu labels fit with alternate system font metrics', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await mount(page);
  for (const family of ['Arial, sans-serif', 'Verdana, sans-serif']) {
    await page.evaluate(font => { document.documentElement.style.fontFamily = font; }, family);
    for (const label of await page.locator('.nav-group-label, .grouped-nav > button .nav-label').all()) {
      expect((await label.boundingBox()).height, family).toBeLessThan(24);
      expect(await label.evaluate(node => node.scrollWidth - node.clientWidth), family).toBeLessThanOrEqual(1);
    }
  }
});

test('keyboard disclosure preserves drafts, current page, focus and rerender state without network activity', async ({ page }) => {
  await mount(page);
  await page.locator('#draft').fill('Do not lose this unfinished work');
  const calls = [];
  page.on('request', request => calls.push(request.url()));
  const team = page.locator('[data-nav-group="team"] > summary');
  await team.focus();
  await team.press('Enter');
  await expect(team).toHaveAttribute('aria-expanded', 'true');
  await expect(team).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('button.nav-team')).toBeFocused();
  await team.focus();
  await team.press('Space');
  await expect(team).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Tab');
  await expect(page.locator('[data-nav-group="settings"] > summary')).toBeFocused();
  await page.evaluate(() => window.drawNav());
  await expect(page.locator('[data-nav-group][open]')).toHaveCount(0);
  await expect(page.locator('#draft')).toHaveValue('Do not lose this unfinished work');
  await expect(page.locator('[aria-current="page"]')).toHaveAttribute('data-section', 'mywork');
  await page.evaluate(() => { window.navOptions.activeSection = 'procedures'; window.drawNav(); });
  await expect(page.locator('[data-nav-group="assets"] > summary')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.nav-procedures')).toBeVisible();
  await page.evaluate(() => { window.navOptions.scope = 'another-user'; window.navOptions.activeSection = 'messages'; window.drawNav(); });
  await expect(page.locator('[data-nav-group="team"] > summary')).toHaveAttribute('aria-expanded', 'true');
  expect(calls).toEqual([]);
});

test('mobile disclosure does not scroll, reset input, or invoke destination actions', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  try {
    await mount(page);
    await page.locator('#draft').fill('Half completed equipment');
    await page.evaluate(() => { document.querySelector('main').style.minHeight = '2000px'; scrollTo(0, 0); });
    const team = page.locator('[data-nav-group="team"] > summary');
    await team.tap();
    await expect(team).toHaveAttribute('aria-expanded', 'true');
    expect(await page.evaluate(() => scrollY)).toBe(0);
    await expect(page.locator('#draft')).toHaveValue('Half completed equipment');
    await expect(page.locator('[aria-current="page"]')).toHaveAttribute('data-section', 'mywork');
    await team.tap();
    await expect(team).toHaveAttribute('aria-expanded', 'false');
    expect(await page.evaluate(() => scrollY)).toBe(0);
  } finally { await context.close(); }
});

test('rapid group changes cannot hide a destination between visibility and click', async ({ page }) => {
  page.setDefaultTimeout(3000);
  await mount(page);
  await page.evaluate(() => {
    document.querySelector('nav').addEventListener('click', event => {
      if (event.target.closest('[data-section]')) document.querySelector('h1').textContent = event.target.closest('[data-section]').dataset.section;
    });
  });
  for (let attempt = 0; attempt < 3; attempt++) {
    for (const section of ['mywork', 'work', 'planning', 'requests', 'assets', 'team', 'performance']) await revealSection(page, section);
    await navigateSection(page, 'messages');
    await expect(page.locator('h1')).toHaveText('messages');
    await expect(page.locator('[data-nav-group][open]')).toHaveCount(1);
  }
});

test('menu affordances stay distinct and respect reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await mount(page);
  const summary = page.locator('[data-nav-group="team"] > summary');
  expect(await summary.evaluate(node => getComputedStyle(node).transitionDuration)).toBe('0s');
  const mark = summary.locator('.nav-disclosure');
  expect(await mark.evaluate(node => getComputedStyle(node, '::after').transitionDuration)).toBe('0s');
  expect(await mark.evaluate(node => getComputedStyle(node, '::after').transform)).toBe('matrix(0, 1, -1, 0, 0, 0)');
  await summary.click();
  expect(await mark.evaluate(node => getComputedStyle(node, '::after').transform)).toBe('matrix(1, 0, 0, 1, 0, 0)');
  const child = page.locator('button.nav-team');
  await expect(child).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(child).toHaveCSS('box-shadow', 'none');
  await expect(page.locator('button.nav-mywork')).toHaveAttribute('aria-current', 'page');
});

test('custom material is bounded and navigation works when it cannot load', async ({ page }) => {
  expect(fs.statSync(path.join(root, 'assets/navigation/graphite-v1.webp')).size).toBeLessThan(6 * 1024);
  await mount(page, false);
  const team = page.locator('[data-nav-group="team"] > summary');
  await team.click();
  await expect(page.locator('button.nav-messages')).toBeVisible();
  await team.click();
  await expect(team.locator('.nav-badge')).toBeVisible();
  expect(await team.evaluate(node => getComputedStyle(node, '::before').backgroundColor)).toBe('rgb(35, 44, 50)');
});

test('rounded surfaces retain full tap targets and visible unread badges on a narrow phone', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 320, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  try {
    await mount(page);
    await page.evaluate(() => {
      window.navOptions.renderBadge = id => id === 'messages' ? '<b class="nav-badge nav-message-badge">128</b>' : '';
      window.drawNav();
    });
    const team = page.locator('[data-nav-group="team"] > summary');
    const badge = team.locator('.nav-badge');
    await expect(badge).toBeVisible();
    const boxes = await team.evaluate(node => [node, node.querySelector('.nav-group-label'), node.querySelector('.nav-badge'), node.querySelector('.nav-disclosure')].map(n => {
      const r = n.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
    }));
    expect(boxes[1].right).toBeLessThanOrEqual(boxes[2].left);
    expect(boxes[2].right).toBeLessThanOrEqual(boxes[3].left);
    expect(boxes[3].right).toBeLessThan(boxes[0].right);
    await team.scrollIntoViewIfNeeded();
    const rect = await team.boundingBox();
    // Tap inside the visible rounded edge, not the empty square corner outside it.
    await page.touchscreen.tap(rect.x + 12, rect.y + rect.height - 6);
    await expect(team).toHaveAttribute('aria-expanded', 'true');
    await expect(badge).toBeHidden();
    await expect(page.locator('button.nav-messages .nav-badge')).toBeVisible();
    await team.locator('.nav-emblem').tap();
    await expect(team).toHaveAttribute('aria-expanded', 'false');
    await expect(badge).toBeVisible();
    await team.locator('.nav-group-label').tap();
    await expect(team).toHaveAttribute('aria-expanded', 'true');
  } finally { await context.close(); }
});
