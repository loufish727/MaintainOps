# LFES Phase 9A Subsystem Extraction Strategy

Date: 2026-05-19

Scope: planning and documentation only.

No app code, `app.js` refactor, function movement, rendering behavior, event binding, Supabase SQL/RLS, workflow logic, or business logic changed during this phase.

## Purpose

Phase 9A resumes `app.js` cleanup by choosing the next safest coherent subsystem to extract. The goal is not random helper movement. The goal is to reduce responsibility concentration while preserving operational continuity, company isolation, and live pilot stability.

## Evidence Reviewed

- `docs/LFES/audits/LFES_PHASE_3A_ARCHITECTURE_MAP.md`
- `docs/LFES/audits/LFES_PHASE_3B_EVENT_CONTRACT_INVENTORY.md`
- `docs/LFES/audits/LFES_PHASE_3C_SMOKE_TEST_MATRIX.md`
- `docs/LFES/audits/LFES_PHASE_3D_STATE_OWNERSHIP_MAP.md`
- `docs/LFES/audits/LFES_PHASE_3E_RENDER_OWNERSHIP_MAP.md`
- `docs/LFES/audits/LFES_PHASE_3F_IMPLEMENTATION_READINESS_DECISION.md`
- `docs/LFES/audits/LFES_PHASE_5A_RENDER_HELPER_EXTRACTION_PLAN.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/SMOKE_TESTS.md`
- `docs/QA_LOG.md`

## Decision Summary

Recommended Phase 9B implementation scope:

**Extract read-only work-order relationship display helpers only.**

Recommended file:

- `src/render/relationshipDisplay.js`

Candidate helpers:

- `renderActivityItem`
- `renderRelationshipChips`
- `relationshipChip`
- `relationshipIcon`

Estimated line-reduction potential:

- approximately 110-140 lines from `app.js`, depending on whether small adapter/wrapper code remains in `app.js`.

Why this is safest:

- these helpers do not create forms.
- they do not create mutation buttons.
- they do not create delete controls.
- they do not create storage upload controls.
- they do not submit Supabase mutations.
- they support already-rendered work-order detail/card display.
- their coupling is mainly read-only relationship data already loaded by `app.js`.

Important implementation constraint:

- Phase 9B should pass dependencies explicitly or through a small adapter. Do not let the new module secretly reach into `app.js` globals.

## Candidate Subsystem Evaluation

| Candidate | Approx. Line Reduction | Global State Coupling | `renderWorkspace()` Coupling | `bindWorkspaceEvents()` Coupling | Event-Contract Risk | Mutation Risk | Required Smoke Tests | Classification |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| Dashboard/metrics display | 40-100 remaining lines | Medium | Medium | Medium through gauge filters | High for gauges | Low direct mutation | session restore, dashboard render, Work Orders gauge/filter check | SAFE LATER |
| Issue reports/admin issue area | 70-100 lines | Medium: `appIssueReports`, profiles, locations, permissions | Medium | High through report submit/status forms | High | Medium: issue submit/update | Settings/Admin Setup issue report smoke | SAFE LATER |
| Team/role guide/admin display | 120-180 lines | High: members, invites, roles, locations, profiles | High | High through role/invite/profile forms | Critical | High: role/default/invite mutations | Team invite/member role/default-location smoke | BLOCKED |
| Public QR request display | 120-180 lines | High: public token, intake, request photo readiness | Separate public render path plus settings QR manager | High through public submit and QR link controls | Critical | Critical: anonymous request boundary | public QR submit + manager visibility | DO NOT TOUCH YET |
| Parts display-only surfaces | 150-250 lines if broad | High: parts, filters, active part, docs, pending delete | High | High through open/use/restock/edit/delete/document forms | Critical in detail, Medium in list | Critical for inventory/detail flows | parts load, use, restock, work-order part usage, cleanup | BLOCKED |
| Equipment display-only surfaces | 120-220 lines if broad | High: assets, active asset, linked work, pending delete | High | High through card open, Quick Fix, edit/delete | Critical in detail, Medium in card | High/Critical for equipment routing/delete | equipment load/detail/edit/delete guard smoke | BLOCKED |
| Read-only relationship display helpers | 110-140 lines | Medium: relationship maps, profiles, procedure templates, messages | Low/Medium | Low: display output only | Low | Low | work-order detail open, relationship chips, activity feed display | SAFE NEXT |
| Notice/toast/status display helpers | 20-40 lines | High: `appNotice`, `noticeTimer`, `renderWorkspace()` | Medium | Low | Low | Low direct, but side-effectful | notice appears/clears after save/error | SAFE LATER |

## Candidate Notes

### 1. Dashboard / Metrics Display

Phase 5B already extracted the safest dashboard helpers:

- `renderMetric`
- `renderInsight`
- `renderRoleGuide`

The remaining dashboard-like helpers are not as isolated:

- `renderGaugeReadout()` emits `data-status-filter` and `data-section`.
- `renderWorkOrderGaugeDashboard()` composes filter controls.
- `renderWorkloadStrip()` calls `renderGaugeReadout()`.

Classification: SAFE LATER.

Reason: the display value is real, but the remaining dashboard helpers are partly filter controls. Extract only after a focused gauge/filter smoke pass.

### 2. Issue Reports / Admin Issue Area

Issue report data access has already been partially separated through `appIssueReportsService.js`. The remaining render area is bounded, but it still creates:

- `#app-issue-report-form`
- `[data-app-issue-status]`
- status update forms.

Classification: SAFE LATER.

Reason: this is a coherent subsystem, but it still has submit/status mutation contracts. It is a good future candidate after relationship display extraction because its boundaries are now better understood.

### 3. Team / Role Guide / Admin Display

`renderRoleGuide()` is already extracted. The remaining Team renderers create high-risk contracts:

- `renderMember()` creates role/default/mobile tech update controls.
- `renderTeamInviteForm()` creates invite/default-location onboarding controls.
- `renderTeamInvites()` creates cancel-invite controls.

Classification: BLOCKED.

Reason: Team rendering is tied directly to role, invite, default-location, and onboarding behavior. It should not move during the controlled Salem pilot until invite acceptance and first-login behavior are verified.

### 4. Public QR Request Display

Public QR rendering crosses anonymous intake, token scope, location routing, and optional photo upload.

Classification: DO NOT TOUCH YET.

Reason: public QR is a live customer-facing boundary. Even display changes could affect anonymous request submission or location routing. Keep this stable during pilot.

### 5. Parts Display-Only Surfaces

The parts area looks partly visual, but the main renderers emit behavior contracts:

- `renderPart()` emits `[data-open-part]`.
- `renderPartsHealth()` emits `[data-part-inventory-filter]`.
- `renderPartSearch()` creates `#part-search-form`.
- `renderPartDetail()` creates use/restock/edit/delete/document upload forms.
- `renderPartDangerZone()` creates delete controls.

Classification: BLOCKED.

Reason: parts are now backed by a transaction-safe work-order usage RPC, but display extraction can still break inventory workflows. Wait until parts restock/use and work-order part usage have another stable smoke run.

### 6. Equipment Display-Only Surfaces

Equipment card/detail rendering carries workflow routing and delete protection behavior:

- `renderAssetCard()` emits `[data-open-asset]`.
- `renderAssetDetail()` emits edit, Quick Fix, and linked-work contracts.
- `renderAssetDangerZone()` emits delete confirmation contracts.

Classification: BLOCKED.

Reason: equipment is tied to location routing and work-order creation. It should not move until equipment workflow smoke coverage is stronger.

### 7. Read-Only Relationship Display Helpers

This is the best Phase 9B target.

Candidate helpers:

- `renderActivityItem(item)`
- `renderRelationshipChips(workOrder)`
- `relationshipChip(type, label, value)`
- `relationshipIcon(type)`

Current coupling:

- reads relationship maps such as comments, photos, parts used, messages, and procedures.
- reads `profilesByUserId` for display names.
- uses formatting helpers such as `escapeHtml`, `money`, `photoMetaText`, and part usage cost helpers.
- uses `checklistProgress()` for procedure progress display.

Why still safe:

- no forms.
- no buttons.
- no event-binding selectors.
- no mutation path.
- no Supabase calls.
- no delete/storage/upload behavior.
- no location persistence behavior.

Classification: SAFE NEXT.

Implementation guard:

- the new module should accept dependencies from `app.js`.
- avoid hidden reads from `window` except existing utility namespaces, if unavoidable.
- preserve exact returned markup.
- keep `renderWorkOrderDetail()` and `renderWorkOrderCard()` in `app.js`.

### 8. Notice / Toast / Status Display Helpers

`showNotice()` is small but side-effectful:

- mutates `appNotice`.
- mutates `appNoticeTone`.
- manages `noticeTimer`.
- calls `renderWorkspace()` after timeout.

Classification: SAFE LATER.

Reason: low line-reduction value and hidden state/timer coupling. It is not dangerous, but it is not the highest-value next subsystem.

## Required Phase 9B Smoke Tests

TEST:
Static relationship display extraction checks

STEPS:
1. Run syntax checks for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, `src/render/displayHelpers.js`, and the new relationship display module.

EXPECTED:
All static checks pass.

RESULT:
NOT RUN in Phase 9A.

NOTES:
Required for Phase 9B implementation.

TEST:
Signed-in app load after relationship display extraction

STEPS:
1. Open local or live app with a fresh cache-bust URL.
2. Restore session.
3. Verify Taylor Metal Products loads.
4. Verify Salem, OR remains active.

EXPECTED:
No missing script errors, no visible app errors, and active location remains Salem.

RESULT:
NOT RUN in Phase 9A.

NOTES:
Required for Phase 9B implementation.

TEST:
Work-order relationship display smoke

STEPS:
1. Open Work Orders.
2. Open an existing safe work order.
3. Confirm relationship chips render without errors.
4. Confirm activity feed renders comments/photos/parts/events if present.
5. If no relationship-rich live work order exists, document the gap rather than creating unnecessary pilot data.

EXPECTED:
Work-order detail opens normally, relationship display remains intact, and no mutation behavior changes.

RESULT:
NOT RUN in Phase 9A.

NOTES:
This is the main Phase 9B smoke path.

TEST:
Baseline navigation smoke

STEPS:
1. Load Work Orders.
2. Load Equipment.
3. Load Parts.
4. Load Team.
5. Load Settings.

EXPECTED:
All sections load without visible app errors or missing scripts.

RESULT:
NOT RUN in Phase 9A.

NOTES:
Confirms the new script load does not break the authenticated shell.

## What Remains Blocked

Keep blocked:

- Quick Fix extraction.
- work-order create/edit/status/complete/delete extraction.
- request conversion extraction.
- public QR submit or public QR display extraction.
- Team invite/member/default-location render extraction.
- parts detail/use/restock/delete/document render extraction.
- equipment detail/edit/delete/Quick Fix render extraction.
- event binding extraction.
- broad `renderWorkspace()` movement.
- auth/session/company/location movement.
- Supabase SQL/RLS changes.

## Recommended Phase 9B Prompt

```text
Begin LFES Phase 9B read-only relationship display extraction only.

Scope:
- Create `src/render/relationshipDisplay.js`.
- Move only:
  - renderActivityItem
  - renderRelationshipChips
  - relationshipChip
  - relationshipIcon
- Preserve exact markup.
- Do not move work-order detail/card renderers.
- Do not move event handlers.
- Do not move mutations.
- Do not change Supabase SQL/RLS.
- Do not change workflows/business logic.
- Pass dependencies explicitly or through a small adapter; do not create hidden app.js global reads.

After extraction:
- Update index.html script loading.
- Run static checks.
- Verify signed-in smoke:
  - session restore
  - Taylor Metal Products loads
  - Salem, OR active
  - Work Orders load
  - work-order detail opens
  - relationship chips/activity feed render
  - Equipment, Parts, Team, Settings load
  - no missing script errors
  - no visible app errors

Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.

Stop after relationship display extraction only.
```
