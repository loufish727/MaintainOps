# LFES Phase 9C App.js Cleanup Readiness Decision

Date: 2026-05-20

Scope: planning and documentation only.

No app code, `app.js` refactor, function movement, Supabase SQL/RLS, workflow logic, or business logic changed during this phase.

## Purpose

Phase 9C decides the next safest `app.js` reduction step after Phase 9B closed cleanly. The goal is controlled responsibility reduction, not arbitrary helper movement.

## Evidence Reviewed

- `docs/LFES/audits/LFES_PHASE_9A_SUBSYSTEM_EXTRACTION_STRATEGY.md`
- Phase 9B local and live smoke results in `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Current `app.js` render/helper boundaries

## Phase 9B Result Summary

Phase 9B extracted read-only relationship display helpers into:

- `src/render/relationshipDisplay.js`

Moved helpers:

- `renderActivityItem`
- `renderRelationshipChips`
- `relationshipChip`
- `relationshipIcon`

Phase 9B closed cleanly after:

- local manager/admin smoke passed.
- live GitHub Pages smoke passed.
- GitHub Actions Resource Load Smoke passed.
- the Phase 9B cache-tag deploy issue was caught and fixed.

## Phase 9B Real Catch

Issue:

- `relationshipDisplay.js` deployed correctly.
- `index.html` referenced `src/render/relationshipDisplay.js?v=lfes-phase-9b-relationship-1`.
- `app.js` initially still used the old cache tag: `app.js?v=lfes-phase-6d-parts-rpc-1`.
- This meant some clients could keep using an older cached `app.js` that did not know about the newly extracted relationship display helper module.

Fix:

- Updated `index.html` to load `app.js?v=lfes-phase-9b-relationship-1`.
- Redeployed.
- Verified live `index.html`, `app.js`, and `relationshipDisplay.js` all served correctly.
- Reran signed-in live smoke successfully.

Lesson:

- Every extracted script/app.js deploy must verify live cache tags, not just file presence.
- A new helper script can be present while the app still runs stale cached orchestration code.
- Future extraction smoke must include:
  - live `index.html` script tag check.
  - live helper script HTTP 200.
  - live `app.js` cache tag check.
  - signed-in smoke after cache-tag correction.

## Candidate Evaluation

| Candidate | Estimated Line Reduction | Coupling Risk | `renderWorkspace()` Dependency | `bindWorkspaceEvents()` Dependency | Mutation Risk | Smoke Tests Required | Decision |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| More pure display helpers | 20-60 | Low to Medium | Low to Medium | Low if display-only | Low | session restore, affected screen render, no missing scripts | SAFE LATER |
| Dashboard / metrics display cluster | 55-85 | Medium | Medium | Medium through `data-status-filter` | Low direct mutation | dashboard/my work, gauge click filters, Work Orders filters, Requests gauge | RECOMMENDED NEXT, IMPLEMENTATION STILL NEEDS APPROVAL |
| Issue report display / admin issue area | 70-100 | Medium to High | Medium | High through report form/status forms | Medium | Settings/Admin Setup, Report Issue open/submit/update, existing issues list | SAFE LATER |
| Notice / status / toast helpers | 10-25 | Medium | Medium through `renderWorkspace()` | Low | Low direct mutation | save notice, warning notice, auto-clear timer | LOW VALUE, SAFE LATER |
| Admin readiness display helpers | 50-85 | Medium | Medium | Medium through `data-setup-action` | Low/Medium | Admin Setup load, readiness items, admin delete warning action | SAFE LATER |
| Parts display-only helpers | 60-120 if card/search/health only; 200+ if broad | High | High | High through open/use/restock/search/page hooks | High/Critical | Parts load, search, low-stock filter, open part, use/restock smoke | BLOCKED |
| Equipment display-only helpers | 60-120 if card/mini-work only; 200+ if broad | High | High | High through open/edit/Quick Fix/delete hooks | High/Critical | Equipment load/detail, Quick Fix from equipment, edit/delete guard smoke | BLOCKED |

## Candidate Notes

### 1. More Pure Display Helpers

Potential examples:

- very small stat/card text helpers that only accept passed-in values.
- tiny formatting-only render helpers with no `data-*`, no forms, no global state, and no mutation contracts.

Decision:

- SAFE LATER.

Reason:

- There may be a few tiny helpers left, but Phase 9C should choose coherent subsystems over random line shaving.

### 2. Dashboard / Metrics Display Cluster

Relevant functions:

- `renderGaugeReadout(label, value, tone, options)`
- `renderWorkOrderGaugeDashboard()`
- `renderWorkloadStrip(items)`

Estimated line reduction:

- approximately 55-85 lines from `app.js`, depending on adapter size.

Coupling:

- reads `activeStatusFilter`.
- reads `workOrderDashboardCounts`.
- reads `requestsReady`.
- calls `openMaintenanceRequests()` and `matchesActiveLocation()`.
- emits `data-status-filter` and sometimes `data-section`.

Mutation risk:

- Low direct mutation risk; these helpers do not write data.
- Event-contract risk is Medium because the gauge buttons drive filters through `bindWorkspaceEvents()`.

Decision:

- RECOMMENDED NEXT, but implementation remains blocked until explicitly approved.

Safe implementation shape:

- Create a small `src/render/dashboardDisplay.js`.
- Move only `renderGaugeReadout`, `renderWorkOrderGaugeDashboard`, and `renderWorkloadStrip`.
- Pass dependencies explicitly:
  - `escapeHtml`
  - `getActiveStatusFilter`
  - `getWorkOrderDashboardCounts`
  - `getRequestsReady`
  - `openMaintenanceRequests`
  - `matchesActiveLocation`
- Preserve exact markup and `data-status-filter` / `data-section` attributes.
- Update `index.html` and `app.js` cache tags together.

Why this is the next best target:

- It is a coherent display cluster.
- It is smaller than parts/equipment/admin issue extraction.
- It has known event contracts and simple smoke tests.
- It reduces `app.js` without touching workflow mutations or database logic.

### 3. Issue Report Display / Admin Issue Area

Relevant functions:

- `renderAppIssueReportForm()`
- `renderAppIssueReportsPanel()`
- `renderAppIssueReport(report)`

Estimated line reduction:

- approximately 70-100 lines.

Coupling:

- reads `showIssueReportPanel`.
- reads `activeSection`.
- reads `appIssueReportsReady`.
- reads `appIssueReports`.
- reads `profilesByUserId`.
- reads `locations`.
- calls `canManageTeam()`.
- emits `#app-issue-report-form`, `data-cancel-app-issue-report`, and `data-app-issue-status`.

Mutation risk:

- Medium. Rendering creates submit/status mutation contracts even though display itself does not mutate.

Decision:

- SAFE LATER.

Reason:

- The subsystem is coherent, but it touches live tester feedback. Move only after one more issue report submit/update smoke or after pilot issue-report usage calms down.

### 4. Notice / Status / Toast Helpers

Relevant state/functions:

- `appNotice`
- `appNoticeTone`
- `noticeTimer`
- `showNotice(message, tone)`

Estimated line reduction:

- approximately 10-25 lines.

Coupling:

- `showNotice()` mutates global state.
- timer callback calls `renderWorkspace()`.
- many mutation handlers depend on this function for visible user feedback.

Mutation risk:

- Low direct mutation risk, but high surface area because many workflows call it.

Decision:

- LOW VALUE, SAFE LATER.

Reason:

- Not worth moving yet. It is small, side-effectful, and widely called.

### 5. Admin Readiness Display Helpers

Relevant functions:

- `setupItems()`
- `renderSetupItem(item)`

Estimated line reduction:

- approximately 50-85 lines.

Coupling:

- reads readiness flags such as `appIssueReportsReady`, QR request readiness, part document readiness, and setup state.
- emits `data-setup-action`.
- tied to Admin Setup warnings and pilot readiness visibility.

Mutation risk:

- Low to Medium. Display itself is mostly read-only, but `data-setup-action` is consumed by admin readiness actions.

Decision:

- SAFE LATER.

Reason:

- The cluster is bounded, but Admin Setup remains a diagnostic area used during pilot. Avoid moving it before the next pilot-readiness review unless needed.

### 6. Parts Display-Only Helpers

Relevant functions:

- `renderPart(part)`
- `renderPartDetail()`
- `renderPartDangerZone(part)`
- `renderPartsHealth()`
- `renderPartSearch()`

Estimated line reduction:

- 60-120 lines if limited to `renderPart`, `renderPartsHealth`, and `renderPartSearch`.
- 200+ lines if broad detail/danger-zone movement is attempted.

Coupling:

- reads `parts`, `activePartId`, `partInventoryFilter`, `partSearchQuery`, `partDocumentsByPartId`, `pendingDeletePartId`, `showPartSourceManager`, and permissions.
- emits `data-open-part`, `data-use-part`, `data-restock-part`, `data-edit-part`, `data-part-document`, `data-delete-part`, `data-part-inventory-filter`, and `#part-search-form`.

Mutation risk:

- High to Critical because parts rendering creates inventory use/restock/edit/delete/document workflow contracts.

Decision:

- BLOCKED.

Reason:

- Parts have recent transaction-sensitive work. Do not move parts renderers until inventory-only Use and Restock strategy is decided or another complete parts smoke run passes.

### 7. Equipment Display-Only Helpers

Relevant functions:

- `renderAssetCard(asset)`
- `renderAssetDetail()`
- `renderAssetDangerZone(asset)`
- `renderAssetMiniWorkOrder(workOrder)`

Estimated line reduction:

- 60-120 lines if limited to cards/mini-work.
- 200+ lines if detail/danger-zone movement is attempted.

Coupling:

- reads `assets`, `activeAssetId`, `workOrders`, `preventiveSchedules`, `partsUsedByWorkOrder`, `pendingDeleteAssetId`, locations, hierarchy helpers, and permissions.
- emits `data-open-asset`, `data-quick-fix-asset`, `#edit-asset-form`, delete controls, and linked-work contracts.

Mutation risk:

- High to Critical because equipment rendering creates edit, Quick Fix, routing, and delete guard contracts.

Decision:

- BLOCKED.

Reason:

- Equipment is location-sensitive and connected to work-order creation. Keep stable during pilot.

## Recommended Next Extraction Target

Recommended Phase 9D implementation target:

- Dashboard / metrics display cluster.

Suggested file:

- `src/render/dashboardDisplay.js`

Suggested helpers:

- `renderGaugeReadout`
- `renderWorkOrderGaugeDashboard`
- `renderWorkloadStrip`

Estimated line reduction:

- approximately 55-85 lines from `app.js`.

Implementation status:

- Planning-approved only.
- Actual code movement remains blocked until explicitly approved.

## Required Smoke Tests for Recommended Phase 9D

TEST:
Static dashboard display extraction checks

STEPS:
1. Run syntax checks for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, `src/render/displayHelpers.js`, `src/render/relationshipDisplay.js`, and new `src/render/dashboardDisplay.js`.

EXPECTED:
All syntax checks pass.

TEST:
Dashboard and gauge render smoke

STEPS:
1. Open local app with a fresh cache-bust URL.
2. Restore manager/admin session.
3. Verify Taylor Metal Products loads.
4. Verify Salem, OR remains active.
5. Verify dashboard/gauge area renders.
6. Verify My Work workload strip renders.

EXPECTED:
Dashboard metrics and workload strip render normally without visible errors.

TEST:
Gauge filter contract smoke

STEPS:
1. Click each key gauge/filter if safe:
   - Active Work
   - New
   - In Progress
   - Blocked
   - Overdue
   - Requests
2. Confirm Work Orders or Requests lists filter/change as expected.
3. Confirm selected glow/active state still appears.

EXPECTED:
Gauge buttons still drive the existing `data-status-filter` behavior and no list/filter regression appears.

TEST:
Baseline navigation smoke

STEPS:
1. Load Work Orders.
2. Open `Hydralic Leak` detail if safe.
3. Load Equipment.
4. Load Parts.
5. Load Team.
6. Load Settings.

EXPECTED:
All sections load, relationship display remains intact, no missing-script errors, no visible app errors, no actionable console errors.

TEST:
Live deploy cache-tag smoke

STEPS:
1. Verify live `index.html` includes the new `src/render/dashboardDisplay.js` script tag if Phase 9D creates it.
2. Verify live `app.js` cache tag is updated for Phase 9D.
3. Verify live new helper script returns HTTP 200.
4. Run signed-in live smoke after GitHub Pages publish.

EXPECTED:
No stale app.js cache issue repeats.

## What Remains Blocked

Keep blocked:

- Phase 9D implementation until explicitly approved.
- issue report display movement.
- parts render/detail movement.
- equipment render/detail movement.
- Team invite/member/default-location rendering.
- public QR rendering and submit flow.
- Quick Fix extraction.
- work-order create/edit/status/complete/delete extraction.
- request conversion extraction.
- event binding extraction.
- mutation extraction.
- broad `renderWorkspace()` movement.
- auth/session/company/location movement.
- Supabase SQL/RLS changes.

## Phase 9C Decision

Recommended next phase:

- LFES Phase 9D dashboard/metrics display-helper extraction only, if approved.

Approval state:

- Implementation is still blocked until the user explicitly approves Phase 9D.

Why this is safest:

- It is the smallest coherent subsystem left with meaningful line reduction.
- It has known event contracts.
- It does not touch Supabase, mutations, auth, company isolation, location persistence, public QR, parts inventory, equipment routing, or delete workflows.
- The Phase 9B cache-tag catch gives a concrete deployment guardrail for Phase 9D.
