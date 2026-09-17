const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "../..");

for (const viewport of [{ width: 1300, height: 900 }, { width: 390, height: 844 }]) {
  test(`message drafts, escaping and bounded history at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.setContent('<main id="app"></main>');
    await page.addStyleTag({ path: path.join(root, "styles.css") });
    await page.addScriptTag({ path: path.join(root, "src/render/messageCenterDisplay.js") });
    await page.addScriptTag({ path: path.join(root, "src/render/messageDisplay.js") });
    await page.addScriptTag({ path: path.join(root, "src/utils/workspaceMessageUiEvents.js") });
    await page.addScriptTag({ content: fs.readFileSync(path.join(root, "src/utils/messageDrafts.mjs"), "utf8").replace("export function", "function") });
    await page.evaluate(() => {
      const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
      const drafts = createMessageDrafts();
      let scope = "company:a:user:a";
      let active = "one";
      let search = "";
      const rows = Array.from({ length: 55 }, (_, i) => ({ id: `message-${i}`, body: `Direction ${i}: <img src=x onerror=alert(1)>`, created_at: "2026-09-17", sender_id: "other" }));
      const display = window.MaintainOpsMessageDisplay.createMessageDisplayHelpers({ escapeHtml, getCurrentUserId: () => "me", teamMemberName: () => "Teammate", initials: () => "TM", formatMessageDay: () => "Today", formatMessageTime: () => "10 AM" });
      const thread = { id: "one", title: "Motor repair", thread_type: "direct" };
      const renderer = window.MaintainOpsMessageCenterDisplay.createMessageCenterDisplayHelpers({
        getMessagesReady: () => true, getMessageThreads: () => [thread], getActiveMessageThreadId: () => active,
        getMessagesByThreadId: () => ({ one: rows }), getMessageHistory: () => ({ one: { rows, hasOlder: false } }),
        getWorkOrders: () => [], getMessageComposerWorkOrderId: () => "", getMessageComposerOpen: () => false,
        getCompanyMembers: () => [], getSession: () => ({ user: { id: "me" } }), getMessageWorkOrderLinksReady: () => true,
        getMessageSearchQuery: () => search, getMessageThreadFilter: () => "all", getMessageThreadsPage: () => 1,
        LIST_ITEMS_PER_PAGE: 12, filteredMessageThreads: () => [thread], totalUnreadMessages: () => 0,
        teamMemberName: () => "Teammate", escapeHtml, messageComposerScopeNote: () => '<img src=x onerror=alert(1)>',
        recentMessageLinkWorkOrders: () => [], statusLabel: String,
        renderMessageThreadButton: () => '<button data-test-open>Motor repair</button>',
        messageThreadScopeLabel: () => '<img src=x onerror=alert(1)>', renderMessageList: display.renderMessageList,
        renderListPagination: () => "",
      });
      function render() {
        drafts.capture(document, scope);
        document.querySelector("#app").innerHTML = renderer.renderMessageCenter();
        window.MaintainOpsWorkspaceMessageUiEvents.bindWorkspaceMessageUiEvents({ documentRef: document,
          storage: { setItem() {} }, renderWorkspace: render, messageComposerScopeNote: () => "Direct",
          state: { setMessageSearchQuery: (value) => { search = value; }, setMessageThreadFilter() {} },
          backToMessages: () => { active = ""; render(); },
        });
        document.querySelector("[data-test-open]").onclick = () => { active = "one"; render(); };
        drafts.restore(document);
      }
      window.messageTest = { render, changeScope: () => { scope = "company:b:user:b"; render(); } };
      render();
    });
    await expect(page.locator(".message-center img")).toHaveCount(0);
    await expect(page.locator(".message-bubble")).toHaveCount(55);
    const history = page.getByRole("region", { name: "Conversation history" });
    expect(await history.evaluate((node) => node.scrollHeight > node.clientHeight && node.scrollTop > 0)).toBe(true);
    await history.evaluate((node) => { node.scrollTop = 100; });
    await page.getByRole("textbox", { name: "Reply", exact: true }).fill("Do not lose this draft");
    if (viewport.width > 920) {
      await page.locator("#message-search").pressSequentially("Motor pump", { delay: 30 });
      await expect(page.locator("#message-search")).toHaveValue("Motor pump");
      expect(await history.evaluate((node) => node.scrollTop)).toBe(100);
    }
    await page.getByRole("button", { name: "Back to conversations" }).click();
    await page.locator("[data-test-open]").click();
    await expect(page.getByRole("textbox", { name: "Reply", exact: true })).toHaveValue("Do not lose this draft");
    await page.evaluate(() => window.messageTest.changeScope());
    await expect(page.getByRole("textbox", { name: "Reply", exact: true })).toHaveValue("");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
