# LFES Phase 5A Render Helper Extraction Plan

Date: 2026-05-19

Phase 5A is planning only. No app code, rendering behavior, event binding, workflow handler, mutation path, Supabase SQL, RLS policy, or business logic changed.

## Goal

Identify the first render helpers that can later move out of `app.js` without breaking operational continuity.

This phase uses the earlier LFES maps:

- `LFES_PHASE_3A_ARCHITECTURE_MAP.md`
- `LFES_PHASE_3B_EVENT_CONTRACT_INVENTORY.md`
- `LFES_PHASE_3C_SMOKE_TEST_MATRIX.md`
- `LFES_PHASE_3D_STATE_OWNERSHIP_MAP.md`
- `LFES_PHASE_3E_RENDER_OWNERSHIP_MAP.md`
- `LFES_PHASE_3F_IMPLEMENTATION_READINESS_DECISION.md`
- `APP_JS_MODULARIZATION_PLAN.md`

## Extraction Safety Rules

A helper is safe for first extraction only when it:

- returns display HTML only,
- does not create forms,
- does not create mutation buttons,
- does not create delete confirmations,
- does not create storage or upload controls,
- does not create public/auth boundary controls,
- does not emit high-risk `data-*` action attributes,
- does not depend on session/company/location state except through explicitly passed data,
- does not mutate global state,
- does not require Supabase calls,
- can keep the same function name or a clearly equivalent imported/global wrapper.

## SAFE FIRST EXTRACTION

These helpers are the safest first render extraction candidates, assuming Phase 5B keeps their existing function names available to `app.js` and does not change markup.

| Helper | Why It Is Safe First | Dependencies | Required Smoke Check |
| --- | --- | --- | --- |
| `renderMetric(label, value, tone)` | Pure display card. No buttons, forms, `data-*`, mutation path, or global state read. | CSS classes only. | Dashboard loads and metric cards render. |
| `renderInsight(label, value, description, tone)` | Pure display card. No event contract. | CSS classes only. | Dashboard / insight area renders. |
| `renderRoleGuide()` | Display-only role explainer. It reads `COMPANY_ROLES`, `roleLabel`, and `roleDescription`, but creates no workflow controls. | Role constants and formatter helpers. | Team page loads and role guide displays. |
| `renderMessageBubble(message)` | Message display item. No event binding or mutation control. | `session.user.id`, `teamMemberName`, `initials`, `formatMessageTime`, `escapeHtml`. | Messages open and existing thread messages render. |
| `renderMessageList(messages)` | Display list wrapper around `renderMessageBubble`. No buttons or workflow controls. | `renderMessageBubble`, `formatMessageDay`, `escapeHtml`. | Messages open with empty and non-empty message lists. |
| `renderMessageNavBadge()` | Small display-only badge helper. | Unread message count state/helper. | Message nav badge still appears correctly. |
| `renderActivityItem(item)` | Activity feed display for comments/photos/parts/events. No event controls. | Relationship formatter helpers and relationship maps by item payload. | Work order detail activity feed still renders comments/photos/parts/events. |
| `renderEmailHelperCommandCard(workOrder)` | Small wrapper around command shortcut. It only renders when a work order has equipment. | `commandShortcut`. | Work order detail command cards still render and jump behavior still works. |

Phase 5B should choose a smaller subset first if maximum caution is needed:

1. `renderMetric`
2. `renderInsight`
3. `renderRoleGuide`

Then, in a second commit/pass:

4. `renderMessageBubble`
5. `renderMessageList`
6. `renderMessageNavBadge`
7. `renderActivityItem`
8. `renderEmailHelperCommandCard`

## SAFE LATER

These helpers may be extractable later, but not first. They are display-oriented but have more hidden state, relationship, or behavior-contract dependencies.

| Helper | Reason To Wait | Required Smoke Check |
| --- | --- | --- |
| `renderRelationshipChips(workOrder)` | Looks display-only, but reads global relationship maps: `procedureTemplates`, `partsUsedByWorkOrder`, `commentsByWorkOrder`, `photosByWorkOrder`, and `messageThreads`. | Work order card/detail relationship chips after loading comments/photos/parts/procedure/messages. |
| `renderMaintenanceRequestPhoto(request)` | Display-only, but depends on request photo readiness, signed URL behavior, storage metadata, and public/internal request photo assumptions. | Public QR photo submit, manager request photo display, and non-image attachment display. |
| `relationshipChip(type, label, value)` | Pure display, but usually coupled with `renderRelationshipChips`. | Same as relationship chips. |
| `relationshipIcon(type)` | Pure icon display, but used by work cards and relationship chips. | Work card/detail icon rendering. |
| `commandShortcut(label, count, targetId, helper, tone)` | Display helper, but emits `data-jump-work-section`, a behavior contract consumed by detail command navigation. | Work order detail command-card jump behavior. |
| `renderLocationOptions(selectedId)` | Option helper, but depends on global `locations` and active/default location assumptions. | Team invite default-location selector and location switching. |
| `renderProcedureOptions(selectedId)` | Option helper, but depends on global procedure list and work-order procedure workflows. | Work-order create/edit procedure selection and checklist creation. |
| `renderPartSourceOptions()` | Option helper, but tied to parts form semantics. | Part create/edit form. |

## BLOCKED

These helpers or renderer groups should not move during early render-helper extraction because they create workflow, mutation, public, auth, delete, storage, or state-persistence contracts.

- `renderWorkspace()`
- `renderAuth()`
- `renderPublicRequestIntake()`
- `renderCompanyCreate()`
- `renderQuickFixForm()`
- `renderCreateWorkOrder()`
- `renderWorkOrderCard()`
- `renderWorkOrderDetail()`
- `renderWorkOrderDangerZone()`
- `renderCardAssignmentControl()`
- `renderWorkOrderAssignmentField()`
- `renderMaintenanceRequest()`
- `renderRequestFormContent()`
- `renderPublicRequestLinkManager()`
- `renderPublicRequestLocationCard()`
- `renderAssetDetail()`
- `renderAssetDangerZone()`
- `renderPartDetail()`
- `renderPartDangerZone()`
- `renderPreventiveSchedule()`
- `renderProcedureTemplate()`
- `renderChecklistStep()`
- `renderTeamInviteForm()`
- `renderMember()`
- `renderMessageCenter()`
- `renderAppIssueReportForm()`
- `renderAppIssueReportsPanel()`
- `renderAppIssueReport()`

## SECRETLY COUPLED

These helpers appear small or visual, but should not be treated as safe first extraction because they emit behavior hooks, depend on global state, or sit close to mutation workflows.

| Helper | Hidden Coupling |
| --- | --- |
| `renderGaugeReadout()` | Emits filter buttons with `data-status-filter` and reads `activeStatusFilter`. |
| `renderWorkloadStrip()` | Calls `renderGaugeReadout`, so it is tied to gauge filtering even though it looks like a summary strip. |
| `renderWorkOrderGaugeDashboard()` | Reads dashboard counts, request readiness, active location filters, and emits gauge action controls. |
| `renderPlanningItem()` | Emits planning/work-order action buttons such as open/generate/follow-up contracts. |
| `renderMiniWorkOrder()` | Emits/open-work-order behavior through rendered work-order shortcuts. |
| `renderAssetMiniWorkOrder()` | Same work-order open behavior, inside equipment context. |
| `renderMessageThreadButton()` | Emits `data-message-thread` and depends on active thread state. |
| `renderAppIssueReport()` | Creates status/update workflow controls. |
| `renderAppIssueReportsPanel()` | Composes report update controls. |
| `renderPart(part)` | Visual card but acts as a part-open behavior contract. |
| `renderPartsHealth()` | Emits part health filter behavior. |
| `renderPartSearch()` | Creates search form/input contracts. |
| `renderPartsPagination()` | Emits `data-parts-page` controls and reads `partsPage`. |
| `renderAssetsPagination()` | Emits `data-assets-page` controls and reads `assetsPage`. |
| `renderListPagination()` | Emits shared `data-list-page` / `data-page-direction` controls. |

## Required Smoke Tests Before Phase 5B

TEST:
Static render-helper extraction checks

STEPS:
Run `node --check app.js`, `node --check supabase-config.js`, all current utils/services, and the new render helper file once created.

EXPECTED:
All checks pass.

RESULT:
NOT RUN in Phase 5A; planning only.

NOTES:
Required for Phase 5B implementation.

TEST:
Signed-in app load

STEPS:
Open local HTTP or live GitHub Pages build, restore session, load Taylor Metal Products.

EXPECTED:
No missing-script errors, no visible app errors, and the active location remains correct.

RESULT:
NOT RUN in Phase 5A; planning only.

NOTES:
Required for Phase 5B implementation.

TEST:
Dashboard display helper smoke

STEPS:
Open My Work and Work Orders.

EXPECTED:
Metric/insight display still renders and gauge behavior is unchanged if any gauge-adjacent helper was touched.

RESULT:
NOT RUN in Phase 5A; planning only.

NOTES:
If Phase 5B touches only `renderMetric`, `renderInsight`, and `renderRoleGuide`, gauge behavior should still be checked visually but not deeply retested.

TEST:
Messages display smoke

STEPS:
Open Messages, open an existing thread if available, and verify message list/bubbles/nav badge.

EXPECTED:
Message list displays, day dividers remain intact, unread badge remains sane, and no message send/reply behavior changes.

RESULT:
NOT RUN in Phase 5A; planning only.

NOTES:
Required if Phase 5B moves message display helpers.

TEST:
Work order activity display smoke

STEPS:
Open a work order detail with comments/photos/parts/events if available.

EXPECTED:
Activity feed still renders each activity type correctly.

RESULT:
NOT RUN in Phase 5A; planning only.

NOTES:
Required if Phase 5B moves `renderActivityItem`.

TEST:
Request photo preview smoke

STEPS:
Submit or open a request with photo metadata and verify manager-side preview/link behavior.

EXPECTED:
Image previews and open-photo links still work.

RESULT:
NOT RUN in Phase 5A; planning only.

NOTES:
Required before moving `renderMaintenanceRequestPhoto`; not required for the first safest subset.

## Recommended First Implementation Phase

Recommended next controlled implementation phase:

LFES Phase 5B render display-helper extraction only.

Scope should be:

- create a small display helper module such as `src/render/displayHelpers.js`,
- load it before `app.js` from `index.html`,
- move only `renderMetric`, `renderInsight`, and `renderRoleGuide` first,
- preserve exact markup and function names or expose equivalent global wrappers,
- run static checks and the signed-in smoke checks above,
- stop after that smaller extraction.

Do not move `renderWorkloadStrip` first. It depends on `renderGaugeReadout`, which emits filter behavior and reads global filter state.

Do not move `renderRelationshipChips` first. It looks display-only but reads several global relationship maps.

Do not move request photo preview first. It is close to storage/signed URL readiness and public/internal request assumptions.

## Approval State

Phase 5A approves only the plan. It does not approve code movement by itself.

The safest Phase 5B implementation target is approved as a recommendation, but actual extraction remains blocked until explicitly requested.
