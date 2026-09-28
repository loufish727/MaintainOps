const { test, expect } = require('@playwright/test');
const path = require('node:path');
const fs = require('node:fs');
const root = path.resolve(__dirname, '../..');
const sections = {
  mywork: ['My Work', '#9bb9ff'], work: ['Work Orders', '#9bb9ff'], planning: ['Planning', '#9bb9ff'],
  requests: ['Requests', '#6edbc7'], assets: ['Equipment', '#77d7ff'], financial: ['Financial', '#c5b4f5'],
  pm: ['PM', '#72d39b'], procedures: ['Procedure Checklist', '#72d39b'], parts: ['Parts', '#f0bc63'],
  conversions: ['Conversions', '#9bb9ff'], messages: ['Messages', '#99dfce'], team: ['Team', '#72d39b'],
  manager: ['Manager', '#9bb9ff'], setup: ['Admin Setup', '#c1cbd2'], settings: ['Settings', '#c1cbd2'],
  performance: ['App Performance', '#6edcff'],
};
const rgb = hex => `rgb(${hex.slice(1).match(/../g).map(n => parseInt(n, 16)).join(', ')})`;

async function mount(page, section) {
  await page.mouse.move(0, 0);
  await page.setContent(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body data-ui-section="${section}"><div class="app-shell"><aside class="sidebar"><div class="brand"><strong>MaintainOps</strong></div>
    <nav class="section-nav" aria-label="Workspace sections">${Object.entries(sections).map(([id, [label]]) =>
      `<button class="nav-${id} ${id === section ? 'active' : ''}" data-section="${id}"><span class="nav-icon">+</span><span>${label}</span></button>`).join('')}</nav>
    <div class="topbar-actions"><button class="secondary-button" data-traveling-units>Traveling Equipment</button><button class="secondary-button report-issue-button">Report Issue</button></div></aside>
    <main class="workspace"><section class="panel"><div class="panel-header"><h2>${sections[section][0]}</h2><span>Salem, OR</span></div>
    <div class="segmented-control"><button class="segment active">All records</button><button class="segment">Needs review</button></div>
    <form class="form-grid"><label>Record name<input value="Curving Unit #1"></label><label>Notes<textarea>Inspection completed.</textarea></label></form>
    <div class="button-row"><button class="primary-button" id="save">Save</button><button class="secondary-button" id="edit">Edit details</button><button class="secondary-button" disabled>Unavailable</button></div>
    <div class="relationship-detail parts"><h3>Related parts</h3><button class="secondary-button" id="part">Open part</button></div>
    <p class="error-text">Example: a required value is missing.</p><p class="muted">No additional records.</p>
    </section></main></div>
    <dialog class="attachment-dialog"><h2>Review attachments</h2><p>Inspection photo.jpg</p><div class="button-row"><button class="primary-button">Attach files</button><button class="secondary-button">Cancel</button></div></dialog></body></html>`);
  await page.addStyleTag({ path: path.join(root, 'styles.css') });
}

async function color(locator, property = 'color') {
  return locator.evaluate((node, property) => getComputedStyle(node)[property], property);
}

async function contrast(locator) {
  return locator.evaluate(node => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const rgba = value => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = value; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data]; };
    let background = [0, 0, 0]; const ancestors = [];
    for (let el = node; el; el = el.parentElement) ancestors.unshift(el);
    for (const el of ancestors) {
      const values = rgba(getComputedStyle(el).backgroundColor), alpha = values[3] / 255;
      background = background.map((v, i) => values[i] * alpha + v * (1 - alpha));
    }
    const luminance = values => values.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
      .reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
    const text = luminance(rgba(getComputedStyle(node).color)), bg = luminance(background);
    return (Math.max(text, bg) + .05) / (Math.min(text, bg) + .05);
  });
}

for (const width of [390, 1440]) test(`all section identities and dialog states remain connected at ${width}px`, async ({ page }, testInfo) => {
  await page.setViewportSize({ width, height: 900 });
  for (const [section, [label, hex]] of Object.entries(sections)) {
    await mount(page, section);
    const expected = rgb(hex);
    expect(await color(page.locator(`.nav-${section} .nav-icon`)), label).toBe(expected);
    expect(await color(page.locator('.panel-header h2')), label).toBe(expected);
    expect(await color(page.locator('#save'), 'backgroundColor')).toBe(expected);
    expect(await color(page.locator('#edit'))).toBe(expected);
    expect(await color(page.locator('.segment.active'))).toBe(expected);
    expect(await color(page.locator('#part'))).toBe(rgb('#f0bc63'));
    expect(await color(page.locator('[data-traveling-units]'))).toBe(rgb('#77d7ff'));
    expect(await color(page.locator('.report-issue-button'))).toBe(rgb('#c1cbd2'));
    for (const selector of ['#save', '#edit', '.segment.active', '.panel-header h2', '.error-text']) {
      expect(await contrast(page.locator(selector)), `${label} ${selector} text contrast`).toBeGreaterThanOrEqual(4.5);
    }
    await page.locator('#edit').hover();
    expect(await contrast(page.locator('#edit'))).toBeGreaterThanOrEqual(4.5);
    await page.locator('input').focus();
    expect(await color(page.locator('input'), 'borderTopColor')).toBe(expected);
    await expect(page.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`${section}-${width}.png`), fullPage: true });
    await page.locator('dialog').evaluate(dialog => dialog.showModal());
    expect(await color(page.locator('dialog h2'))).toBe(expected);
    expect(await color(page.locator('dialog .primary-button'), 'backgroundColor')).toBe(expected);
    expect(await contrast(page.locator('dialog .primary-button'))).toBeGreaterThanOrEqual(4.5);
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog')).not.toBeVisible();
  }
});

test('relationship identities, equipment conditions and warnings do not inherit unrelated sections', async ({ page }) => {
  await mount(page, 'financial');
  await page.addStyleTag({ path: path.join(root, 'src/render/travelingStyles.css') });
  await page.addStyleTag({ path: path.join(root, 'src/render/messageStyles.css') });
  await page.addStyleTag({ path: path.join(root, 'src/render/messageTools.css') });
  await page.locator('.panel').evaluate(node => {
    const extra = document.createElement('div');
    extra.innerHTML = `<div class="relationship-detail financial"><button class="secondary-button financial-action-button">Save finances</button></div>
      <div class="relationship-detail team"><button class="secondary-button">Save teammate</button></div>
      <div class="relationship-detail procedure"><button class="secondary-button">Save PM</button></div>
      <button class="secondary-button asset-action-button" data-section="parts">Go to Parts</button>
      <div class="message-center"><button class="message-send-button">Send</button></div>
      <span class="relationship-chip message">Messages</span><button class="primary-button qr-print-button">Print QR Code</button>
      <button class="danger-action-button qr-replace-button">Regenerate/Replace QR Code</button>
      <div class="asset-card financial-asset-card financial-asset-deleted"><div class="financial-deleted-banner">Operational equipment deleted</div></div>
      ${['running', 'watch', 'degraded', 'offline'].map(status => `<article class="asset-card asset-state-${status}">Equipment<span class="chip asset-${status}">${status}</span></article><article class="travel-unit travel-${status}">Traveling</article>`).join('')}
      <dialog class="production-action-dialog qr-history-dialog"><h2>Replacement history</h2><button class="secondary-button">Next</button></dialog>`;
    node.append(extra);
  });
  expect(await color(page.locator('.financial-action-button'))).toBe(rgb('#c5b4f5'));
  expect(await color(page.locator('.relationship-detail.team button'))).toBe(rgb('#72d39b'));
  expect(await color(page.locator('.relationship-detail.procedure button'))).toBe(rgb('#72d39b'));
  expect(await color(page.locator('[data-section="parts"].asset-action-button'))).toBe(rgb('#f0bc63'));
  expect(await color(page.locator('.message-send-button'), 'backgroundColor')).toBe(rgb('#99dfce'));
  expect(await color(page.locator('.relationship-chip.message'))).toBe(rgb('#99dfce'));
  expect(await color(page.locator('.qr-print-button'), 'backgroundColor')).toBe(rgb('#72d39b'));
  expect(await color(page.locator('.qr-replace-button'), 'backgroundColor')).toBe(rgb('#8f242b'));
  expect(await contrast(page.locator('.qr-replace-button'))).toBeGreaterThanOrEqual(4.5);
  expect(await color(page.locator('.financial-asset-deleted'), 'borderLeftColor')).toBe(rgb('#ef7676'));
  for (const [status, hex] of Object.entries({ running: '#8beaab', watch: '#f0bc63', degraded: '#efa665', offline: '#ef7676' })) {
    expect(await color(page.locator(`.asset-state-${status}`), 'borderLeftColor')).toBe(rgb(hex));
    expect(await color(page.locator(`.travel-${status}`), 'borderTopColor')).toBe(rgb(hex));
    if (status !== 'running') expect(await contrast(page.locator(`.chip.asset-${status}`))).toBeGreaterThanOrEqual(4.5);
  }
  await page.locator('.qr-history-dialog').evaluate(dialog => dialog.showModal());
  expect(await color(page.locator('.qr-history-dialog button'))).toBe(rgb('#c1cbd2'));
});

test('real render paths assign theme context without changing data or lazy-loading ownership', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  expect(app).toContain('document.body.dataset.uiSection = activeSection;');
  expect(app).toContain('data-ui-section="${activeAssetId ? "assets" : "work"}"');
  const attachment = fs.readFileSync(path.join(root, 'src/workflows/attachmentWorkflow.mjs'), 'utf8');
  expect(attachment).toContain("dialog.setAttribute('data-ui-section', { work: 'work', asset: 'assets', part: 'parts' }[context.kind]);");
  const financial = fs.readFileSync(path.join(root, 'src/render/financialDisplay.js'), 'utf8');
  expect(financial).toContain('relationship-detail financial');
  expect(financial).not.toContain('relationship-detail asset');
  const team = fs.readFileSync(path.join(root, 'src/render/teamMemberDisplay.js'), 'utf8');
  expect(team).toContain('relationship-detail team');
  expect(team).not.toContain('relationship-detail comment');
});

for (const width of [390, 1440]) test(`conversion cards keep blue identity and readable expanded results at ${width}px`, async ({ page }, testInfo) => {
  await page.setViewportSize({ width, height: 900 });
  await mount(page, 'conversions');
  await page.addScriptTag({ path: path.join(root, 'src/render/conversionDisplay.js') });
  await page.evaluate(() => {
    const groups = ['length', 'area', 'weight', 'temperature', 'volume', 'pressure', 'torque'].map(id => ({
      id, label: id, units: [{ id: 'a', label: 'From unit' }, { id: 'b', label: 'To unit' }],
    }));
    const display = window.MaintainOpsConversionDisplay.createConversionDisplayHelpers({
      escapeHtml: String, conversionGroups: groups, boltReference: [], wrenchReference: [], showShopReferenceCharts: false, conversionResultText: () => '1 = 25.4',
    });
    document.querySelector('.panel').innerHTML = display.renderConversionsPanel();
  });
  for (const card of await page.locator('.conversion-card').all()) {
    await card.locator('summary').click();
    expect(await color(card, 'borderTopColor')).toBe(rgb('#9bb9ff'));
    for (const selector of ['h3', '.conversion-result', '.conversion-controls label', '.conversion-card-heading > span:last-child']) {
      const elements = card.locator(selector);
      expect(await elements.count(), selector).toBeGreaterThan(0);
      for (const element of await elements.all()) {
        expect(await contrast(element), selector).toBeGreaterThanOrEqual(4.5);
      }
    }
    await expect(card.locator('input')).toBeEditable();
    await card.locator('input').fill('12');
    await card.locator('summary').click();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath(`conversions-${width}.png`), fullPage: true });
});
