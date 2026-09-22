const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");
const source = fs.readFileSync(path.resolve(__dirname, "../../src/utils/messageDrafts.mjs"), "utf8").replaceAll("export function", "function");

async function fixture(page, storageFault = false) {
  await page.route("http://drafts.test/**", route => route.fulfill({ contentType: "text/html", body: `<!doctype html><main></main><script>${source}
    let scope = sessionStorage.getItem('testScope') || 'person:company:north';
    let opened = false, thread = 'thread-1';
    const drafts = createMessageDrafts(${storageFault ? '{ storage: () => { throw new Error("disabled"); } }' : ''});
    drafts.bind(document, () => scope);
    function render() {
      const recovered = drafts.capture(document, scope);
      if (recovered) opened = recovered.composerOpen;
      document.querySelector('main').innerHTML = '<section class="message-center '+(opened ? 'has-composer' : '')+'" data-thread-id="'+thread+'">'+
        (opened ? '<form id="message-thread-form"><select name="thread_type" id="message-thread-type"><option value="direct">Direct</option><option value="location">Team</option></select><select name="direct_user_id"><option value="">Choose</option><option value="person-b">Person B</option></select><input name="title"><select name="work_order_id"><option value="">None</option><option value="order-1">Order 1</option></select><textarea name="body"></textarea><input type="file" name="attachment"></form>' :
        '<form id="message-reply-form" data-thread-id="'+thread+'"><textarea name="body"></textarea><input type="hidden" name="reply_to_id" value="validated-by-app"></form>')+'</section>';
      drafts.restore(document);
    }
    window.draftTest = { render, open() { opened = true; render(); }, close() { opened = false; render(); },
      switchScope(next) { scope = next; sessionStorage.setItem('testScope', scope); render(); },
      sent(body) { drafts.clear(document, opened ? 'composer' : thread, { body }); render(); },
      signOut() { drafts.reset(); document.querySelector('main').replaceChildren(); },
      discussion() { const form = document.createElement('form'); form.className = 'message-discussion-form'; form.dataset.attachmentKey = 'discussion:root'; form.innerHTML = '<textarea name="body"></textarea>'; document.body.append(form); drafts.restoreForm(form); },
    };
    render();
  </script>` }));
  await page.goto("http://drafts.test/");
}

test("new-message fields survive reload; sends clear but newer edits survive", async ({ page }) => {
  await fixture(page);
  await page.evaluate(() => draftTest.open());
  await page.locator('[name="direct_user_id"]').selectOption("person-b");
  await page.locator('[name="title"]').fill("Pump follow-up");
  await page.locator('[name="work_order_id"]').selectOption("order-1");
  await page.locator('[name="body"]').fill("First line\nDetailed instructions <not markup>");
  await page.reload();
  await expect(page.locator('#message-thread-form')).toBeVisible();
  await expect(page.locator('[name="direct_user_id"]')).toHaveValue("person-b");
  await expect(page.locator('[name="title"]')).toHaveValue("Pump follow-up");
  await expect(page.locator('[name="work_order_id"]')).toHaveValue("order-1");
  await expect(page.locator('[name="body"]')).toHaveValue("First line\nDetailed instructions <not markup>");
  await page.evaluate(() => draftTest.sent("An older in-flight submission"));
  await page.reload();
  await expect(page.locator('[name="body"]')).toHaveValue("First line\nDetailed instructions <not markup>");
  await page.locator('[name="title"]').evaluate(field => { field.defaultValue = "Linked work-order subject"; });
  await page.evaluate(() => draftTest.sent("First line\nDetailed instructions <not markup>"));
  await page.reload();
  await expect(page.locator('[name="body"]')).toHaveValue("");
  expect(await page.evaluate(() => Object.keys(sessionStorage).filter(key => key.startsWith('maintainops.messageDrafts')))).toEqual([]);
});

test("reply and discussion drafts recover without crossing account, company, or location", async ({ page }) => {
  await fixture(page);
  await page.locator('[name="body"]').fill("Reply draft");
  await page.reload();
  await expect(page.locator('[name="body"]')).toHaveValue("Reply draft");
  await expect(page.locator('[name="reply_to_id"]')).toHaveValue("validated-by-app");
  await page.evaluate(() => draftTest.discussion());
  await page.locator('.message-discussion-form textarea').fill("Unsent thread reply");
  await page.reload();
  await page.evaluate(() => draftTest.discussion());
  await expect(page.locator('.message-discussion-form textarea')).toHaveValue("Unsent thread reply");
  await page.locator('.message-discussion-form').evaluate(node => node.remove());
  for (const scope of ['person:company:south', 'person:other-company:north', 'other-person:company:north']) {
    await page.evaluate(scope => draftTest.switchScope(scope), scope);
    await expect(page.locator('[name="body"]')).toHaveValue("");
  }
  await page.evaluate(() => draftTest.switchScope('person:company:north'));
  await expect(page.locator('[name="body"]')).toHaveValue("Reply draft");
  await page.evaluate(() => draftTest.signOut());
  expect(await page.evaluate(() => Object.keys(sessionStorage).filter(key => key.startsWith('maintainops.messageDrafts')))).toEqual([]);
  await page.reload();
  await expect(page.locator('[name="body"]')).toHaveValue("");
});

test("invalid/expired storage and unavailable storage do not break editing", async ({ page }) => {
  await fixture(page);
  for (const value of ['{broken', JSON.stringify({ at: Date.now() - 86400001, composerOpen: true, drafts: [['composer', { fields: [['body', 'expired']] }]] }), JSON.stringify({ at: Date.now(), drafts: [null, ['x', null]] })]) {
    await page.evaluate(value => sessionStorage.setItem('maintainops.messageDrafts.v1:person:company:north', value), value);
    await page.reload();
    await expect(page.locator('[name="body"]')).toHaveValue("");
  }
  await page.unroute("http://drafts.test/**");
  await fixture(page, true);
  await page.locator('[name="body"]').fill("Memory fallback");
  await page.evaluate(() => draftTest.render());
  await expect(page.locator('[name="body"]')).toHaveValue("Memory fallback");
});
