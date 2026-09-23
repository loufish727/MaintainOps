const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.resolve(__dirname, "../../src/utils/checklistResponseDrafts.mjs"), "utf8");
const origin = "http://checklist-response-drafts.test";
const prefix = "maintainops.checklistResponseDraft.v1:";
const initial = { text: "Saved answer", check: false, choice: "", number: "", note: "" };

async function fixture(page, { storageFault = false } = {}) {
  const requests = [], records = new Map();
  let failSaves = true;
  const time = Date.now();
  await page.route("**/*", async route => {
    const request = route.request(), url = new URL(request.url());
    if (url.origin !== origin) return route.abort();
    if (url.pathname === "/drafts.mjs") return route.fulfill({ contentType: "text/javascript", body: source });
    if (url.pathname === "/api/results") {
      const key = JSON.stringify([url.searchParams.get("scope"), url.searchParams.get("work")]);
      return route.fulfill({ contentType: "application/json", body: JSON.stringify(records.get(key) || initial) });
    }
    if (url.pathname === "/api/result" && request.method() === "POST") {
      const body = request.postDataJSON();
      requests.push(body);
      if (failSaves) return route.fulfill({ status: 503, contentType: "application/json", body: '{"message":"Checklist save unavailable"}' });
      const key = JSON.stringify([body.scope, body.workOrderId]);
      records.set(key, { ...(records.get(key) || initial), [body.stepId]: body.value });
      return route.fulfill({ contentType: "application/json", body: '{"ok":true}' });
    }
    if (url.pathname !== "/") return route.abort();
    await route.fulfill({ contentType: "text/html", body: `<!doctype html><main></main><script type="module">
      import { createChecklistResponseDrafts } from '/drafts.mjs';
      let scope = 'user:company:north', workOrderId = 'work-a', clock = ${time};
      let changes = 0, attempts = 0, saved = { ...${JSON.stringify(initial)} };
      const options = { getScope: () => scope, now: () => clock${storageFault ? ', storage: () => { throw Error("Storage unavailable"); }' : ""} };
      const drafts = createChecklistResponseDrafts(options);
      const main = document.querySelector('main');
      function fieldFor(step) { return [...main.querySelectorAll('[data-step-result][data-work-order-id]')].find(field => field.dataset.stepResult === step); }
      function readouts() {
        const done = Object.values(saved).filter(Boolean).length;
        main.querySelector('[data-checklist-summary]').textContent = done + ' of 5 complete';
        main.querySelector('[data-progress]').textContent = String(done);
      }
      async function save(event) {
        const field = event.target;
        changes++;
        if (field.disabled) return;
        const token = drafts.snapshot(field);
        const submitted = { scope, workOrderId: field.dataset.workOrderId, stepId: field.dataset.stepResult,
          value: field.type === 'checkbox' ? field.checked : field.value };
        field.disabled = true;
        attempts++;
        try {
          const response = await fetch('/api/result', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(submitted) });
          if (!response.ok) throw Error('HTTP ' + response.status);
          saved[submitted.stepId] = submitted.value;
          drafts.clear(token);
          if (field.isConnected) {
            field.closest('.checklist-step').querySelector('[data-checklist-recorded]').textContent = 'Recorded after confirmed save';
            readouts();
          }
          window.saveStatus = 'saved';
        } catch (error) { window.saveStatus = error.message; }
        finally { field.disabled = false; }
      }
      async function render() {
        drafts.capture();
        const response = await fetch('/api/results?scope=' + encodeURIComponent(scope) + '&work=' + encodeURIComponent(workOrderId));
        saved = await response.json();
        main.innerHTML = '<p data-checklist-summary></p><span data-progress></span><button data-complete-work-order type="button">Complete Work</button>';
        for (const step of ['text', 'check', 'choice', 'number', 'note']) {
          const row = document.createElement('div'); row.className = 'checklist-step';
          const field = document.createElement(step === 'choice' ? 'select' : step === 'note' ? 'textarea' : 'input');
          field.dataset.stepResult = step; field.dataset.workOrderId = workOrderId; field.setAttribute('aria-label', step);
          if (step === 'choice') for (const value of ['', 'pass', 'fail']) {
            const option = new Option(value || 'Not checked', value, saved[step] === value, saved[step] === value); field.add(option);
          }
          else if (step === 'check') { field.type = 'checkbox'; field.defaultChecked = saved[step]; }
          else { if (step === 'number') field.type = 'number'; field.defaultValue = saved[step]; }
          const recorded = document.createElement('small'); recorded.dataset.checklistRecorded = '';
          recorded.textContent = saved[step] ? 'Recorded previously' : '';
          if (step === 'check') {
            const label = document.createElement('label'); label.className = 'check-row';
            label.append(field, document.createTextNode(' Done')); row.append(label);
          } else row.append(field);
          row.append(recorded); main.append(row); field.addEventListener('change', save);
        }
        main.insertAdjacentHTML('beforeend', '<input aria-label="Unrelated" data-step-result="unrelated"><input type="hidden" data-step-result="hidden" data-work-order-id="work-a" value="not-a-draft">');
        readouts(); drafts.restore();
      }
      window.draftTest = {
        drafts, render, fieldFor,
        snapshot: step => drafts.snapshot(fieldFor(step)), clear: token => drafts.clear(token),
        hasDraft: work => drafts.hasDraft(work || workOrderId),
        away() { drafts.capture(); main.innerHTML = '<p>Other view</p>'; },
        async navigate(work) { drafts.capture(); workOrderId = work; await render(); },
        async switchScope(next) { drafts.capture(); scope = next; await render(); },
        signOut() { drafts.reset(); scope = ''; main.replaceChildren(); },
        resetBeforeNavigation() { drafts.reset(); drafts.capture(); },
        duplicateFactory: () => createChecklistResponseDrafts(options) === drafts,
        state: () => ({ scope, workOrderId, changes, attempts, saved: { ...saved } }),
        advance(ms) { clock += ms; },
      };
      await render(); window.fixtureReady = true;
    </script>` });
  });
  await page.goto(origin);
  await page.waitForFunction(() => window.fixtureReady);
  return { requests, records, setSaveFailure: value => { failSaves = value; } };
}

const control = (page, step) => page.locator(`[data-step-result="${step}"][data-work-order-id]`);
const row = (page, step) => page.locator(".checklist-step").filter({ has: control(page, step) });

for (const width of [390, 1440]) {
  test(`HTTP 503 preserves an answer across navigation/reload and unchanged retry saves it at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const server = await fixture(page);
    await control(page, "text").fill("Unsent answer <literal>");
    await control(page, "text").press("Tab");
    await expect.poll(() => page.evaluate(() => window.saveStatus)).toBe("HTTP 503");
    expect(server.requests).toHaveLength(1);
    expect(server.records.size).toBe(0);
    await expect(row(page, "text")).toContainText("Unsaved answer");
    await expect(row(page, "text").locator("[data-checklist-recorded]")).toHaveText("Recorded previously");
    await expect(page.locator("[data-checklist-summary]")).toHaveText("1 of 5 complete");
    await page.evaluate(() => draftTest.away());
    await page.evaluate(() => draftTest.navigate('work-a'));
    await expect(control(page, "text")).toHaveValue("Unsent answer <literal>");
    await page.reload();
    await page.waitForFunction(() => window.fixtureReady);
    await expect(control(page, "text")).toHaveValue("Unsent answer <literal>");
    expect(await page.evaluate(() => draftTest.hasDraft('work-a'))).toBe(true);
    expect(await page.evaluate(() => draftTest.state())).toMatchObject({ changes: 0, attempts: 0, saved: initial });
    await expect(page.locator("[data-complete-work-order]")).toBeEnabled();
    await control(page, "text").focus();
    await control(page, "text").press("Tab");
    expect(server.requests).toHaveLength(1);
    server.setSaveFailure(false);
    await row(page, "text").getByRole("button", { name: "Save answer", exact: true }).click();
    await expect.poll(() => page.evaluate(() => window.saveStatus)).toBe("saved");
    expect(server.requests).toHaveLength(2);
    expect(server.requests[1]).toMatchObject({ workOrderId: "work-a", stepId: "text", value: "Unsent answer <literal>" });
    expect(await page.evaluate(() => draftTest.state().changes)).toBe(1);
    await expect(row(page, "text").locator("[data-checklist-response-draft]")).toHaveCount(0);
    expect(await page.evaluate(() => draftTest.hasDraft())).toBe(false);
    await page.evaluate(() => draftTest.render());
    await page.reload();
    await page.waitForFunction(() => window.fixtureReady);
    await expect(control(page, "text")).toHaveValue("Unsent answer <literal>");
    await expect(page.locator("[data-checklist-draft-retry]")).toHaveCount(0);
  });
}

test("checkbox booleans and other strings restore without changing saved results, progress, labels, or completion", async ({ page }) => {
  const server = await fixture(page);
  await control(page, "check").check();
  await expect.poll(() => page.evaluate(() => window.saveStatus)).toBe("HTTP 503");
  await control(page, "choice").selectOption("fail");
  await expect.poll(() => server.requests.length).toBe(2);
  await control(page, "number").fill("0");
  await control(page, "note").fill("Line one\nLine two");
  await page.getByRole("textbox", { name: "Unrelated", exact: true }).fill("Not a checklist answer");
  await page.evaluate(() => draftTest.away());
  await page.reload();
  await page.waitForFunction(() => window.fixtureReady);
  await expect(control(page, "check")).toBeChecked();
  await expect(control(page, "choice")).toHaveValue("fail");
  await expect(control(page, "number")).toHaveValue("0");
  await expect(control(page, "note")).toHaveValue("Line one\nLine two");
  await expect(page.locator("[data-checklist-draft-retry]")).toHaveCount(4);
  await expect(page.locator("[data-progress]")).toHaveText("1");
  await expect(page.locator("[data-checklist-summary]")).toHaveText("1 of 5 complete");
  await expect(row(page, "check").locator("[data-checklist-recorded]")).toBeEmpty();
  await expect(page.locator("[data-complete-work-order]")).toBeEnabled();
  expect(await page.evaluate(() => draftTest.state().saved)).toEqual(initial);
  const stored = await page.evaluate(prefix => Object.keys(sessionStorage).filter(key => key.startsWith(prefix)).map(key => [JSON.parse(key.slice(prefix.length)), JSON.parse(sessionStorage.getItem(key))]), prefix);
  expect(stored).toHaveLength(4);
  expect(stored.find(([identity]) => identity[2] === "check")[1].value).toBe(true);
  expect(stored.filter(([identity]) => identity[2] !== "check").every(([, value]) => typeof value.value === "string")).toBe(true);
});

test("drafts isolate user/company/location, work orders and steps, including invisible pending answers", async ({ page, context }) => {
  await fixture(page);
  await control(page, "text").fill("North A text");
  await control(page, "note").fill("North A note");
  await page.evaluate(() => draftTest.navigate('work-b'));
  await expect(control(page, "text")).toHaveValue("Saved answer");
  expect(await page.evaluate(() => draftTest.hasDraft('work-a'))).toBe(true);
  expect(await page.evaluate(() => draftTest.hasDraft('work-b'))).toBe(false);
  await control(page, "text").fill("North B text");
  for (const scope of ["other-user:company:north", "user:other-company:north", "user:company:south"]) {
    await page.evaluate(scope => draftTest.switchScope(scope), scope);
    await expect(control(page, "text")).toHaveValue("Saved answer");
    expect(await page.evaluate(() => draftTest.hasDraft('work-a'))).toBe(false);
    await control(page, "text").fill(scope);
  }
  await page.evaluate(() => draftTest.switchScope('user:company:north'));
  await expect(control(page, "text")).toHaveValue("North B text");
  await page.evaluate(() => draftTest.navigate('work-a'));
  await expect(control(page, "text")).toHaveValue("North A text");
  await expect(control(page, "note")).toHaveValue("North A note");
  const otherTab = await context.newPage();
  await fixture(otherTab);
  await expect(control(otherTab, "text")).toHaveValue("Saved answer");
  expect(await otherTab.evaluate(() => draftTest.hasDraft())).toBe(false);
  await otherTab.close();
});

test("unchecked saved checkboxes and empty saved text remain pending and restore as false and empty string", async ({ page }) => {
  const server = await fixture(page);
  server.records.set(JSON.stringify(["user:company:north", "work-a"]), { ...initial, check: true });
  await page.evaluate(() => draftTest.render());
  await control(page, "check").uncheck();
  await expect.poll(() => page.evaluate(() => window.saveStatus)).toBe("HTTP 503");
  await control(page, "text").fill("");
  await page.evaluate(() => draftTest.away());
  await page.reload();
  await page.waitForFunction(() => window.fixtureReady);
  await expect(control(page, "check")).not.toBeChecked();
  await expect(control(page, "text")).toHaveValue("");
  expect(await page.evaluate(() => draftTest.hasDraft())).toBe(true);
  await expect(page.locator("[data-checklist-draft-retry]")).toHaveCount(2);
  await expect(row(page, "check").locator("label [data-checklist-response-draft]")).toHaveCount(0);
  await expect(row(page, "check").locator("[data-checklist-response-draft]")).toHaveCount(1);
  await expect(page.locator("[data-checklist-summary]")).toHaveText("2 of 5 complete");
  expect(await page.evaluate(() => draftTest.state().saved)).toEqual({ ...initial, check: true });
});

test("success clears only the submitted revision and never a newer edit, other step, or another scope", async ({ page }) => {
  await fixture(page);
  await control(page, "text").fill("Submitted text");
  const token = await page.evaluate(() => draftTest.snapshot('text'));
  await control(page, "text").fill("Newer text");
  await control(page, "note").fill("Separate step");
  expect(await page.evaluate(token => draftTest.clear(token), token)).toBe(false);
  await expect(control(page, "text")).toHaveValue("Newer text");
  await expect(row(page, "text")).toContainText("Unsaved answer");
  const current = await page.evaluate(() => draftTest.snapshot('text'));
  await page.evaluate(() => draftTest.switchScope('user:company:south'));
  await control(page, "text").fill("South text");
  expect(await page.evaluate(token => draftTest.clear(token), current)).toBe(true);
  await expect(control(page, "text")).toHaveValue("South text");
  await expect(row(page, "text")).toContainText("Unsaved answer");
  await page.evaluate(() => draftTest.switchScope('user:company:north'));
  await expect(control(page, "text")).toHaveValue("Saved answer");
  await expect(control(page, "note")).toHaveValue("Separate step");
  const noteToken = await page.evaluate(() => draftTest.snapshot('note'));
  expect(await page.evaluate(token => draftTest.clear(token), noteToken)).toBe(true);
  await page.evaluate(() => draftTest.drafts.capture());
  expect(await page.evaluate(() => draftTest.hasDraft())).toBe(false);
  await expect(control(page, "note")).toHaveValue("Separate step");
});

test("newer edit versions survive even when they return to the submitted value", async ({ page }) => {
  await fixture(page);
  await control(page, "text").fill("Original edit");
  const token = await page.evaluate(() => draftTest.snapshot('text'));
  await control(page, "text").fill("New edit");
  await control(page, "text").fill("Original edit");
  expect(await page.evaluate(token => draftTest.clear(token), token)).toBe(false);
  await expect(row(page, "text")).toContainText("Unsaved answer");
  const current = await page.evaluate(() => draftTest.snapshot('text'));
  await control(page, "text").evaluate(field => { field.value = "New programmatic edit"; });
  expect(await page.evaluate(token => draftTest.clear(token), current)).toBe(false);
  await page.evaluate(() => draftTest.render());
  await expect(control(page, "text")).toHaveValue("New programmatic edit");
});

test("retry dispatches exactly one bubbling change, never invokes disabled fields, and restore is idempotent", async ({ page }) => {
  const server = await fixture(page);
  await control(page, "text").fill("Retry this answer");
  await page.reload();
  await page.waitForFunction(() => window.fixtureReady);
  expect(await page.evaluate(() => draftTest.duplicateFactory())).toBe(true);
  expect(await page.evaluate(() => { for (let i = 0; i < 5; i++) { draftTest.drafts.capture(); draftTest.drafts.restore(); } return draftTest.drafts.restore().length; })).toBe(1);
  await expect(row(page, "text").getByRole("button", { name: "Save answer" })).toHaveCount(1);
  await page.evaluate(() => {
    window.retryChanges = 0;
    document.addEventListener('change', event => { if (event.target.dataset.stepResult === 'text') window.retryChanges++; });
    draftTest.fieldFor('text').disabled = true;
  });
  await row(page, "text").getByRole("button", { name: "Save answer" }).click();
  expect(await page.evaluate(() => window.retryChanges)).toBe(0);
  expect(server.requests).toHaveLength(0);
  await control(page, "text").evaluate(field => { field.disabled = false; });
  await row(page, "text").getByRole("button", { name: "Save answer" }).click();
  await expect.poll(() => page.evaluate(() => window.saveStatus)).toBe("HTTP 503");
  expect(await page.evaluate(() => window.retryChanges)).toBe(1);
  expect(server.requests).toHaveLength(1);
  await expect(row(page, "text")).toContainText("Unsaved answer");
});

test("pagehide captures edits without an input event, and sign-out clears all drafts without recapture", async ({ page }) => {
  await fixture(page);
  await control(page, "text").evaluate(field => { field.value = "Before unload"; });
  await page.evaluate(() => dispatchEvent(new Event('pagehide')));
  await page.reload();
  await page.waitForFunction(() => window.fixtureReady);
  await expect(control(page, "text")).toHaveValue("Before unload");
  const oldToken = await page.evaluate(() => draftTest.snapshot('text'));
  await page.evaluate(() => draftTest.resetBeforeNavigation());
  expect(await page.evaluate(prefix => Object.keys(sessionStorage).filter(key => key.startsWith(prefix)), prefix)).toEqual([]);
  expect(await page.evaluate(token => draftTest.clear(token), oldToken)).toBe(false);
  await page.evaluate(() => draftTest.signOut());
  await page.reload();
  await page.waitForFunction(() => window.fixtureReady);
  await expect(control(page, "text")).toHaveValue("Saved answer");
  expect(await page.evaluate(() => draftTest.hasDraft())).toBe(false);
});

test("expired, future, malformed, and wrong-type storage are ignored; drafts expire after 24 hours", async ({ page }) => {
  await fixture(page);
  const key = prefix + JSON.stringify(["user:company:north", "work-a", "text"]);
  for (const variant of ["expired", "future", "malformed", "wrong-type"]) {
    await control(page, "text").fill("Disposable draft");
    await page.evaluate(({ key, variant }) => {
      const record = JSON.parse(sessionStorage.getItem(key));
      if (variant === 'expired') record.at -= 86400000;
      if (variant === 'future') record.at += 1;
      if (variant === 'wrong-type') record.value = true;
      sessionStorage.setItem(key, variant === 'malformed' ? '{broken' : JSON.stringify(record));
    }, { key, variant });
    await page.reload();
    await page.waitForFunction(() => window.fixtureReady);
    await expect(control(page, "text")).toHaveValue("Saved answer");
    expect(await page.evaluate(() => draftTest.hasDraft())).toBe(false);
  }
});

test("storage failures keep memory-only drafts across navigation without interrupting entry or reset", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await fixture(page, { storageFault: true });
  await control(page, "text").fill("Memory-only pending answer");
  await page.evaluate(() => draftTest.away());
  await page.evaluate(() => draftTest.navigate('work-a'));
  await expect(control(page, "text")).toHaveValue("Memory-only pending answer");
  expect(await page.evaluate(() => draftTest.hasDraft())).toBe(true);
  await page.evaluate(() => draftTest.signOut());
  expect(await page.evaluate(() => draftTest.hasDraft('work-a'))).toBe(false);
  expect(errors).toEqual([]);
});
