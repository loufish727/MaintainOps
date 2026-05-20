# LFES Phase 9F App.js Cleanup Readiness Decision

Date: 2026-05-20

Scope: planning and documentation only.

No app code, `app.js` refactor, function movement, rendering behavior, event binding, Supabase SQL/RLS, workflow logic, or business logic changed during this phase.

## Purpose

Phase 9F decides the next safest app.js reduction step after Phase 9E closed cleanly. The goal is to continue responsibility reduction only where the helper boundary is genuinely low-risk display/read-only.

## Evidence Reviewed

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/ARCHITECTURE.md`
- `docs/QA_LOG.md`
- `docs/LFES/audits/LFES_PHASE_9A_SUBSYSTEM_EXTRACTION_STRATEGY.md`
- `docs/LFES/audits/LFES_PHASE_9C_APP_JS_CLEANUP_READINESS.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- current `app.js` helper/render boundaries after Phase 9E

## Phase 9E Result Summary

Phase 9E extracted static icon display helpers into:

- `src/render/iconDisplay.js`

Moved helpers:

- `segmentIcon`
- `navIcon`

Phase 9E closed cleanly after:

- static checks passed.
- local signed-in smoke passed.
- package/upload completed.
- live signed-in smoke passed.
- GitHub Actions Resource Load Smoke passed after retry stabilization.

## Phase 9E Deployment Lesson

Issue:

- The first Resource Load Smoke on commit `0ce9a80` checked GitHub Pages before Pages finished serving the new Phase 9E `index.html`.
- The smoke test failed even though the live page caught up shortly afterward.

Fix:

- `tests/smoke/resource-load.spec.js` now retries hosted resource checks for a short window while GitHub Pages catches up.

Lesson:

- Hosted resource tests must account for Pages publish lag when push and Pages deployment happen concurrently.
- Continue verifying live `index.html`, helper script HTTP 200, `app.js` cache tag, signed-in smoke, Resource Load Smoke, and Pages deployment after every extraction.

## Candidate Evaluation

| Candidate | Estimated Line Reduction | Coupling Risk | `renderWorkspace()` Dependency | `bindWorkspaceEvents()` Dependency | Mutation Risk | Smoke Tests Required | Decision |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| Message bubble/list display only | 25-45 | Low/Medium | Medium via Messages screen composition | Low if thread buttons stay in `app.js` | Low | Messages load, thread list visible, message list/bubbles render, core sections still load | RECOMMENDED NEXT |
| Tiny label/text helpers | 10-25 | Low for pure labels, Medium for labels reading global lists | Low | None direct | Low | affected screen render only | LOW VALUE, SAFE LATER |
| Notice/status/toast helpers | 10-25 | Medium/High due timer/global notice state | Medium through `renderWorkspace()` timer | None direct | Low direct | notice appears/clears after save/error | BLOCKED FOR NOW |
| Admin readiness helpers | 50-85 | Medium | Medium | Medium through `data-setup-action` | Low/Medium | Admin Setup load, readiness items, setup action remains functional | BLOCKED FOR NOW |
| Issue report display/admin issue area | 70-100 | Medium/High | Medium | High through report form/status controls | Medium | Report Issue open, submit/update, issue list | BLOCKED FOR NOW |
| Public QR display | 120-180 | High | Settings/public render boundary | High through QR admin controls and public submit | Critical | public QR submit + manager visibility | DO NOT TOUCH YET |
| Parts display-only surfaces | 60-120 narrow; 200+ broad | High | High | High through open/use/restock/search/page hooks | High/Critical | parts load, search, open, use/restock, RPC smoke | BLOCKED |
| Equipment display-only surfaces | 60-120 narrow; 200+ broad | High | High | High through open/edit/Quick Fix/delete hooks | High/Critical | equipment load/detail, routing, Quick Fix, delete guard | BLOCKED |
| Work-order command cards | 20-40 | Medium/High | Work-order detail | High through `data-jump-work-section` | Low direct | work detail navigation commands | BLOCKED FOR NOW |

## Candidate Notes

### 1. Message Bubble/List Display Only

Relevant helpers:

- `renderMessageBubble(message)`
- `renderMessageList(messages)`

Why this is the best next target:

- It is a coherent display-only cluster.
- It does not submit messages.
- It does not create the message composer form.
- It does not create thread selection buttons.
- It does not emit `data-*` action hooks.
- It can receive explicit dependencies from `app.js` instead of reading globals directly.

Required implementation guardrails:

- Create `src/render/messageDisplay.js`.
- Move only `renderMessageBubble` and `renderMessageList`.
- Do not move `renderMessageCenter`.
- Do not move `renderMessageThreadButton` because it emits `data-message-thread`.
- Do not move `renderLinkedWorkMessageThread` because it emits `data-open-work-message-thread`.
- Do not move message composer, thread creation, message send, read receipts, direct/location/company scope logic, or Supabase calls.
- Pass dependencies explicitly:
  - `escapeHtml`
  - `currentUserId` or a `getCurrentUserId()` callback
  - `teamMemberName`
  - `initials`
  - `formatMessageTime`
  - `formatMessageDay`
- Preserve exact markup.
- Update `index.html` helper script tag and `app.js` cache tag together.
- Update Resource Load Smoke required resources to include `src/render/messageDisplay.js`.

Estimated line reduction:

- approximately 25-45 lines depending on adapter size.

Required smoke tests:

TEST:
Phase 9G signed-in message display smoke

STEPS:
1. Open local app with fresh `qa_bust`.
2. Verify signed-in session restores.
3. Verify Taylor Metal Products loads.
4. Verify Salem, OR remains selected.
5. Open Messages.
6. Verify message center loads if message feature is ready.
7. Verify thread list remains visible.
8. Verify message list/bubbles render normally when messages exist, or empty state renders normally when no messages exist.
9. Open My Work, Work Orders, Equipment, Parts, Team, and Settings.
10. Check for missing-script errors, visible app errors, and actionable console errors.

EXPECTED:
Message display is unchanged, no missing scripts, no visible app errors, and core sections continue to load.

RESULT:
NOT RUN in Phase 9F.

NOTES:
Required for Phase 9G if implemented.

### 2. Tiny Label/Text Helpers

Potential helpers:

- `assetTypeLabel(type)`
- `assetStatusLabel(status)`
- `requestPanelSubtitle(filter, count)`

Decision:

- LOW VALUE, SAFE LATER.

Reason:

- These helpers are simple enough to move safely, but the line reduction is small and they do not form a meaningful subsystem by themselves.
- Moving them alone would feel like line shaving rather than controlled responsibility reduction.

### 3. Notice / Status / Toast Helpers

Relevant helper:

- `showNotice(message, tone)`

Decision:

- BLOCKED FOR NOW.

Reason:

- The helper mutates `appNotice`, `appNoticeTone`, and `noticeTimer`.
- The timer callback calls `renderWorkspace()`.
- Many mutation paths depend on this visible feedback.
- It is not display-only despite looking small.

### 4. Admin Readiness Helpers

Relevant helpers:

- `setupItems()`
- `renderSetupItem(item)`

Decision:

- BLOCKED FOR NOW.

Reason:

- `renderSetupItem()` emits `data-setup-action`.
- Admin readiness is tied to setup warnings and operational trust during pilot.
- It should wait until Admin Setup warning handling is revisited or smoke-tested directly.

### 5. Issue Report Display/Admin Area

Relevant helpers:

- `renderAppIssueReportForm()`
- `renderAppIssueReportsPanel()`
- `renderAppIssueReport(report)`

Decision:

- BLOCKED FOR NOW.

Reason:

- These helpers emit report submit/status controls and remain tied to live tester feedback workflows.
- Move only after issue report submit/update receives another explicit smoke pass or pilot issue-report usage calms down.

### 6. Public QR, Parts, Equipment, Team, Work-Order Commands

Decision:

- remain blocked.

Reason:

- These areas emit behavior hooks, forms, mutation controls, public anonymous boundaries, delete/storage flows, invite/default-location workflows, or work-order lifecycle commands.
- They require planning-only first if touched later.

## Recommended Next Phase

Recommended Phase 9G implementation scope:

- Extract message bubble/list display only.

Suggested file:

- `src/render/messageDisplay.js`

Allowed helpers:

- `renderMessageBubble`
- `renderMessageList`

Explicitly blocked in Phase 9G:

- `renderMessageCenter`
- `renderMessageThreadButton`
- `renderLinkedWorkMessageThread`
- message composer forms
- thread creation/send/read mutations
- event handlers
- Supabase calls
- auth/session/company/location logic
- `renderWorkspace()`
- `bindWorkspaceEvents()`
- Supabase SQL/RLS

## If Phase 9G Is Approved

Phase 9G should:

1. Create `src/render/messageDisplay.js`.
2. Move only `renderMessageBubble` and `renderMessageList`.
3. Pass dependencies explicitly from `app.js`.
4. Update `index.html` script loading.
5. Bump `app.js` cache tag.
6. Update Resource Load Smoke required resources.
7. Run static checks.
8. Run local signed-in smoke including Messages and core sections.
9. Stop before package/upload unless explicitly instructed.

## Phase 9F Status

- Planning/readiness only: PASS.
- App behavior changed: no.
- Code extraction approved: Phase 9G message bubble/list display only, pending explicit implementation request.
- Broader workflow/render extraction remains blocked.
