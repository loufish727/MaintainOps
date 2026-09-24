const path = require("node:path");
const { test, expect } = require("@playwright/test");

const root = path.resolve(__dirname, "../..");

for (const width of [1100, 390, 320]) {
  test(`Work Activity shows read and unread updates without disclosure at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 760 });
    await page.setContent('<main id="message-workspace"></main>');
    for (const file of ["styles.css", "src/render/messageStyles.css"]) {
      await page.addStyleTag({ path: path.join(root, file) });
    }
    for (const file of ["render/iconDisplay", "render/messageCenterDisplay", "render/workOrderNotificationDisplay", "utils/workspaceWorkOrderNotificationEvents"]) {
      await page.addScriptTag({ path: path.join(root, `src/${file}.js`) });
    }
    await page.evaluate(() => {
      document.body.style.margin = "0";
      document.body.classList.add("messages-active");
      const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
      let notifications = Array.from({ length: 13 }, (_, index) => ({
        id: `notification-${index}`, work_order_id: `work-${index}`, kind: "production_action_completed",
        title: `Production ready: Guard repair ${index}`,
        body: "Production Action completed by Justin <Production>. This work order is ready for Maintenance.",
        created_at: "2026-09-23T12:00:00Z", read_at: index ? "2026-09-23T13:00:00Z" : null,
      }));
      const proof = window.activityProof = { opened: [] };
      const notificationsDisplay = window.MaintainOpsWorkOrderNotificationDisplay.createWorkOrderNotificationDisplayHelpers({
        getNotifications: () => notifications, getReady: () => true, escapeHtml, formatMessageTime: () => "12:00 PM",
      });
      const display = window.MaintainOpsMessageCenterDisplay.createMessageCenterDisplayHelpers({
        escapeHtml, icon: window.MaintainOpsIconDisplay.segmentIcon, navIcon: window.MaintainOpsIconDisplay.navIcon,
        getMessagesReady: () => true, getMessageThreads: () => [], getActiveMessageThreadId: () => "",
        getMessageComposerOpen: () => false, getMessageView: () => "activity", getMessageThreadsPage: () => 1,
        filteredMessageThreads: () => [], LIST_ITEMS_PER_PAGE: 12, getCompanyMembers: () => [],
        getWorkOrders: () => [], getMessageComposerWorkOrderId: () => "", totalUnreadMessages: () => 0,
        getMessageThreadFilter: () => "all", getMessageSearchQuery: () => "",
        getWorkspaceLabel: () => "Taylor Metal Products / Salem, OR",
        getActivityCount: notificationsDisplay.unreadWorkOrderNotificationCount,
        renderWorkOrderNotifications: notificationsDisplay.renderWorkOrderNotifications,
      });
      function render() {
        document.querySelector("main").innerHTML = display.renderMessageCenter();
        document.querySelector(".message-center").style.height = "100dvh";
        window.MaintainOpsWorkspaceWorkOrderNotificationEvents.bindWorkspaceWorkOrderNotificationEvents({
          openWorkOrderNotification: async (notificationId, workOrderId) => proof.opened.push({ notificationId, workOrderId }),
        });
      }
      proof.readAll = () => { notifications = notifications.map(row => ({ ...row, read_at: "2026-09-23T13:00:00Z" })); render(); };
      proof.empty = () => { notifications = []; render(); };
      proof.longText = () => { notifications[0].title = "WorkOrder".repeat(25); notifications[0].body = "LongEquipmentName".repeat(50); render(); };
      render();
    });

    const items = page.locator(".work-notification-item");
    const first = items.first();
    await expect(items).toHaveCount(12);
    await expect(first).toBeVisible();
    await expect(first).toHaveClass(/unread/);
    await expect(first).toContainText("Justin <Production>");
    await expect(first).toContainText("Open work order");
    await expect(page.locator(".work-notification-header")).toContainText("1 new");
    await expect(page.locator(".message-activity details,.message-activity summary")).toHaveCount(0);
    expect(await page.evaluate(() => activityProof.opened)).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath("work-activity.png") });

    for (const item of await items.all()) {
      const box = await item.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(48);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    await items.last().scrollIntoViewIfNeeded();
    await expect(items.last()).toBeInViewport();
    expect(await page.locator(".message-activity").evaluate(node => node.scrollTop)).toBeGreaterThan(0);
    await first.focus();
    await page.keyboard.press("Enter");
    expect(await page.evaluate(() => activityProof.opened)).toEqual([{ notificationId: "notification-0", workOrderId: "work-0" }]);

    await page.evaluate(() => activityProof.readAll());
    await expect(first).toBeVisible();
    await expect(first).toHaveClass(/\bread\b/);
    await expect(page.locator(".work-notification-header")).toContainText("Recent");
    await expect(page.locator('.message-view-tabs [data-message-view="activity"] .message-unread-pill')).toHaveCount(0);
    await first.click();
    expect(await page.evaluate(() => activityProof.opened)).toHaveLength(2);

    await page.evaluate(() => activityProof.longText());
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await first.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
    await page.evaluate(() => activityProof.empty());
    await expect(page.getByText("No work notifications.", { exact: true })).toBeVisible();
    await expect(items).toHaveCount(0);
  });
}
