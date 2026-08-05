const path = require("node:path");
const { test, expect } = require("@playwright/test");

const stylesPath = path.resolve(__dirname, "../../styles.css");

for (const viewport of [
  { name: "desktop", width: 1100, height: 760 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test(`Production Ready notifications remain readable and contained on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.setContent(`
      <main class="workspace">
        <div class="work-list">
          <article class="work-card">
            <div class="work-card-header">
              <div class="chip-row">
                <span class="chip medium">medium</span>
                <span class="chip">Corrective</span>
                <span class="chip open">New</span>
                <span class="chip production-ready">Production Ready</span>
              </div>
            </div>
            <div class="work-card-body"><h3>Guard repair</h3><p>Repair the press guard.</p></div>
          </article>
        </div>
        <section class="message-center">
          <div class="message-layout">
            <aside class="message-thread-rail">
              <div class="message-rail-header"><div><h3>Messages</h3><p>1 unread</p></div></div>
              <details class="work-notification-panel" open>
                <summary><span>Work notifications</span><span>1 new</span></summary>
                <div class="work-notification-list">
                  <button class="work-notification-item unread" type="button">
                    <span class="work-notification-heading"><span class="chip production-ready">Production Ready</span><time>12:00 PM</time></span>
                    <strong>Production ready: Guard repair</strong>
                    <span>Production Action completed by Justin Werber. This work order is ready for Maintenance.</span>
                  </button>
                </div>
              </details>
              <div class="message-people-strip"><button class="message-person-card" type="button"><span class="message-person-avatar">JW</span><span class="message-person-name">Justin</span></button></div>
              <form class="message-thread-form"><details><summary>New message</summary></details></form>
              <label class="message-search"><input type="search" placeholder="Search messages"></label>
              <div class="message-filter-bar"><button class="active" type="button">All</button><button type="button">Unread</button></div>
              <div class="message-thread-list"><button class="message-thread-button" type="button"><strong>Maintenance update</strong><span>Recent message</span></button></div>
              <div class="pagination-bar"><span>1 of 1</span></div>
            </aside>
            <section class="message-thread-detail"><p>Choose a thread.</p></section>
          </div>
        </section>
      </main>
    `);
    await page.addStyleTag({ path: stylesPath });

    const layout = await page.evaluate(() => {
      const rail = document.querySelector(".message-thread-rail").getBoundingClientRect();
      const panel = document.querySelector(".work-notification-panel").getBoundingClientRect();
      const notification = document.querySelector(".work-notification-item").getBoundingClientRect();
      const pagination = document.querySelector(".pagination-bar").getBoundingClientRect();
      const chipStyle = getComputedStyle(document.querySelector(".chip.production-ready"));
      return {
        rail,
        panel,
        notification,
        pagination,
        chipBackground: chipStyle.backgroundImage,
        chipColor: chipStyle.color,
      };
    });

    expect(layout.notification.height).toBeGreaterThanOrEqual(48);
    expect(layout.panel.left).toBeGreaterThanOrEqual(layout.rail.left - 1);
    expect(layout.panel.right).toBeLessThanOrEqual(layout.rail.right + 1);
    expect(layout.pagination.bottom).toBeLessThanOrEqual(layout.rail.bottom + 1);
    expect(layout.chipBackground).not.toBe("none");
    expect(layout.chipColor).not.toBe("rgb(255, 255, 255)");
  });
}
