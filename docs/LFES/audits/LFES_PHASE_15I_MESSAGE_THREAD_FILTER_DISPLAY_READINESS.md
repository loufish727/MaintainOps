# LFES Phase 15I Message Thread Filter Display Readiness

Date: 2026-05-20

## Classification

MEDIUM RISK.

Risk: message filtering and unread counts are read-only but affect the message rail and nav badge.

## Approved Scope

Move only these helpers from `app.js` into `src/render/messageThreadFilterDisplay.js`:

- `recentMessageLinkWorkOrders`
- `filteredMessageThreads`
- `messageThreadSearchValues`
- `unreadMessageCount`
- `totalUnreadMessages`
- `directUnreadMessages`

## Required Injection

- work orders and active-location matcher
- message threads, thread members, message maps, read maps
- current user
- message filter/search state
- `matchesQuery`
- `teamMemberName`
- `messageThreadScopeLabel`

## Explicit Non-Scope

Do not move:

- `messageThreadMembersForType`
- message creation
- reply sending
- read-state mutation
- message event handlers
- message rendering/forms
- `renderWorkspace()`
- `bindWorkspaceEvents()`

## Verification Plan

- `node --check app.js`
- `node --check src/render/messageThreadFilterDisplay.js`
- direct helper-output smoke for unread counts, direct unread counts, filter/search, and recent linked work orders
- local resource smoke for `index.html`, `app.js`, and `src/render/messageThreadFilterDisplay.js`
- no package/upload unless local checks pass
- hosted resource checks and signed-in live smoke after package/upload
