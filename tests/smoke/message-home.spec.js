const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');

for (const width of [1440, 768, 390, 320]) {
  test(`message home, navigation and draft continuity at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await page.setContent('<main id="message-workspace"></main>');
    for (const file of ['styles.css', 'src/render/messageStyles.css']) await page.addStyleTag({ path: path.join(root, file) });
    for (const file of ['render/iconDisplay', 'render/messageCenterDisplay', 'render/messageLiveDisplay', 'utils/workspaceMessageUiEvents', 'utils/workspaceMessageThreadEvents', 'utils/workspaceSectionNavigationEvents']) {
      await page.addScriptTag({ path: path.join(root, `src/${file}.js`) });
    }
    await page.addScriptTag({ content: fs.readFileSync(path.join(root, 'src/utils/messageDrafts.mjs'), 'utf8').replaceAll('export function', 'function') });
    await page.evaluate(() => {
      document.body.style.margin = '0';
      document.body.classList.add('messages-active');
      const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
      let view = 'home', active = 'one', composing = false, readOnly = false, unread = 2;
      const threads = [{ id: 'one', title: 'Shift handoff', thread_type: 'direct' }];
      const drafts = createMessageDrafts({ storage: () => null });
      drafts.bind(document, () => 'qa:company:person');
      const proof = window.homeProof = { reads: [], loads: [] };
      const setActive = id => { active = id; if (id) view = 'conversations'; };
      const showHome = () => { active = ''; composing = false; view = 'home'; };
      const setView = next => { if (next === 'home' || view === 'home') { active = ''; composing = false; } view = next; render(); };
      const options = {
        escapeHtml, icon: window.MaintainOpsIconDisplay.segmentIcon, navIcon: window.MaintainOpsIconDisplay.navIcon,
        getMessagesReady: () => true, getMessageThreads: () => threads, getActiveMessageThreadId: () => active,
        getMessageView: () => view, getMessageComposerOpen: () => composing, canEditOperationalRecords: () => !readOnly,
        getMessageHistory: () => ({ one: { rows: [], hasOlder: false } }), getMessagesByThreadId: () => ({ one: [] }),
        getWorkOrders: () => [], getMessageComposerWorkOrderId: () => '', getCompanyMembers: () => [{ user_id: 'sam' }],
        getSession: () => ({ user: { id: 'me' } }), getMessageWorkOrderLinksReady: () => true,
        getMessageSearchQuery: () => '', getMessageThreadFilter: () => 'all', getMessageThreadsPage: () => 1,
        LIST_ITEMS_PER_PAGE: 12, filteredMessageThreads: () => threads, totalUnreadMessages: () => unread,
        teamMemberName: () => 'Sam Rivera', getWorkspaceLabel: () => 'Taylor Metal Products / Salem, OR',
        getMessageConnection: () => 'Live', messageComposerScopeNote: () => 'Direct message', recentMessageLinkWorkOrders: () => [],
        statusLabel: String, messageThreadScopeLabel: () => 'Sam Rivera', renderMessageList: () => '', renderListPagination: () => '',
        renderMessageThreadButton: thread => `<button data-message-thread="${thread.id}">${thread.title}</button>`,
        renderWorkOrderNotifications: () => '<p>All work activity</p>',
      };
      const display = window.MaintainOpsMessageCenterDisplay.createMessageCenterDisplayHelpers(options);
      const threadEvents = {
        storage: { setItem() {} }, getActiveThreadId: () => active, getActiveSection: () => 'messages',
        state: { setActiveMessageThreadId: setActive, setActiveSection() {}, setMessageComposerOpen: value => { composing = value; } },
        renderWorkspace: render, loadActiveMessageThreadMessages: async id => proof.loads.push(id),
        markMessageThreadRead: async id => proof.reads.push(id),
      };
      const live = window.MaintainOpsMessageLiveDisplay.createMessageLiveDisplay({
        documentRef: document, ...options, getState: () => ({ activeMessageThreadId: active, messageThreads: threads, messageHistory: {}, messageQuotes: {}, messageComposerOpen: composing, messageView: view, messagesByThreadId: {} }),
        updateMessageNavBadges() {}, isConversationArchived: () => false,
      });
      function render() {
        drafts.capture(document, 'qa:company:person');
        document.querySelector('main').innerHTML = display.renderMessageCenter();
        document.querySelector('.message-center').style.height = '100dvh';
        window.MaintainOpsWorkspaceMessageUiEvents.bindWorkspaceMessageUiEvents({
          state: {}, storage: { setItem() {} }, renderWorkspace: render, setMessageView: setView,
          openComposer: () => { view = 'conversations'; composing = true; render(); },
          closeComposer: () => { composing = false; render(); }, backToMessages: () => { active = ''; render(); },
        });
        window.MaintainOpsWorkspaceMessageThreadEvents.bindWorkspaceMessageThreadEvents(threadEvents);
        drafts.restore(document);
      }
      proof.update = () => { unread = 4; live.renderLiveMessages(); };
      proof.readOnly = () => { readOnly = true; showHome(); render(); };
      proof.empty = () => { threads.length = 0; unread = 0; showHome(); render(); };
      proof.menu = () => {
        const button = document.createElement('button'); button.dataset.section = 'messages'; document.body.append(button);
        window.MaintainOpsWorkspaceSectionNavigationEvents.bindWorkspaceSectionNavigationEvents({
          state: new Proxy({}, { get: () => () => {} }), visibleNavItems: () => [['messages']], storage: { setItem() {} },
          renderWorkspace: render, openMessageHome: showHome, resetWorkOrderPage() {}, setWorkOrderSearchMode() {},
        });
        button.click(); button.remove();
      };
      proof.link = () => {
        const button = document.createElement('button'); button.dataset.openWorkMessageThread = 'one'; document.body.append(button);
        window.MaintainOpsWorkspaceMessageThreadEvents.bindWorkspaceMessageThreadEvents({ ...threadEvents, documentRef: { querySelectorAll: selector => selector === '[data-open-work-message-thread]' ? [button] : [] } });
        button.click(); button.remove();
      };
      render();
    });
    const home = page.locator('.message-home');
    await expect(home).toBeVisible();
    await expect(page.locator('.message-list')).toHaveCount(0);
    await expect(page.locator('.message-center')).toHaveAttribute('data-thread-id', '');
    await expect(page.locator('[data-message-home-unread]')).toHaveText('2');
    await page.locator('.message-home-choices button').first().focus();
    await page.evaluate(() => homeProof.update());
    await expect(page.locator('[data-message-home-unread]')).toHaveText('4');
    await expect(page.locator('.message-home-choices button').first()).toBeFocused();
    expect(await page.evaluate(() => homeProof.reads)).toEqual([]);
    expect(await page.evaluate(() => homeProof.loads)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const button of await home.locator('button').all()) {
      const box = await button.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(48);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    await page.screenshot({ path: testInfo.outputPath(`message-home-${width}.png`) });
    await home.locator('[data-message-view="conversations"]').click();
    await expect(page.locator('.message-list')).toHaveCount(0);
    await page.locator('[data-message-thread="one"]').click();
    await expect(page.getByRole('textbox', { name: 'Reply', exact: true })).toBeVisible();
    expect(await page.evaluate(() => homeProof.reads)).toEqual(['one']);
    await page.getByRole('textbox', { name: 'Reply', exact: true }).fill('Keep this reply');
    await page.getByRole('button', { name: 'Back to conversations' }).click();
    await page.locator('.message-view-tabs [data-message-view="home"]').click();
    await expect(home).toBeVisible();
    await home.locator('[data-message-compose]').click();
    await page.locator('#message-thread-form [name="body"]').fill('Keep this new message');
    await page.getByRole('button', { name: 'Cancel new message' }).click();
    await page.locator('.message-view-tabs [data-message-view="home"]').click();
    await home.locator('[data-message-compose]').click();
    await expect(page.locator('#message-thread-form [name="body"]')).toHaveValue('Keep this new message');
    await page.evaluate(() => homeProof.menu());
    await expect(home).toBeVisible();
    await home.locator('[data-message-view="activity"]').click();
    await expect(page.locator('.message-activity')).toHaveText('All work activity');
    await page.evaluate(() => homeProof.link());
    await expect(page.getByRole('textbox', { name: 'Reply', exact: true })).toHaveValue('Keep this reply');
    await page.evaluate(() => homeProof.readOnly());
    await expect(home).toBeVisible();
    await expect(page.locator('[data-message-compose]')).toHaveCount(0);
    await page.evaluate(() => homeProof.empty());
    await expect(home).toBeVisible();
    await expect(page.locator('[data-message-home-unread]')).toHaveText('0');
    await home.locator('[data-message-view="conversations"]').click();
    await expect(page.getByText('No conversations match this view.')).toBeVisible();
  });
}
