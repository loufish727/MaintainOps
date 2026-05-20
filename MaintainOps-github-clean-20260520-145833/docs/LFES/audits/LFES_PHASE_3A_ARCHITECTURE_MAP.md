# LFES Phase 3A Rendering / Event / State Architecture Map

Date: 2026-05-19

Scope: analysis and documentation only.

No app code, Supabase SQL, Supabase RLS policies, service wrappers, workflow logic, rendering logic, or event binding changed during this phase.

## Purpose

Phase 3A maps the remaining operational architecture before deeper mutation extraction. The goal is to preserve engineering understanding around `app.js` while the app is still working and live testing is underway.

This phase is not a refactor. It is a boundary map for deciding what can move later without breaking user workflows, company isolation, location routing, or recovery behavior.

## Current Ownership Summary

`app.js` still acts as the application controller. Earlier LFES phases extracted pure utilities and several low-risk service wrappers, but the main operational system remains concentrated in one file.

Key concentration points:

- global state starts around the top-level declarations near `app.js:54`.
- active-location persistence helpers start at `app.js:179`.
- `renderWorkspace()` starts at `app.js:1932`.
- `bindWorkspaceEvents()` starts at `app.js:5605`.
- high-risk mutation workflows begin in the lower half of the file, including Quick Fix at `app.js:8816`, work-order create at `app.js:8696`, request conversion at `app.js:9328`, and delete/storage flows after that.

## 1. Rendering Ownership Boundaries

`renderWorkspace()` owns the broad workspace shell and most top-level screen composition:

- sidebar and section navigation.
- company/location switchers.
- command stack actions such as Quick Fix, Report Issue, New Work Order, Submit Request, and Export CSV.
- global search visibility.
- My Work and Work Orders queues.
- request queue and request form.
- equipment list/detail.
- PM, Procedures, Messages, Team, Parts, Settings, and Admin Setup screens.
- top-level detail-mode routing for active work orders, equipment, Quick Fix, and create-work-order forms.

Rendering helpers own smaller fragments, but most of them still read global state directly. Examples:

- `renderWorkOrderDetail()` reads active work-order context, comments, photos, parts, events, checklist results, messages, permissions, safety requirements, and warning state.
- `renderMaintenanceRequest()` emits controls for conversion, Quick Fix, delete, and photo display.
- `renderAssetDetail()` emits edit/delete/Quick Fix/work-link contracts.
- `renderPartDetail()` emits edit, use/restock, delete, and document-upload contracts.
- `renderTeamInviteForm()` and `renderTeamInvites()` depend on roles, locations, invite defaults, and cancel state.
- `renderPublicRequestLinkManager()` depends on admin/manager authorization and public URL configuration.

Rendering is not only visual. It defines event contracts through IDs, forms, classes, and `data-*` attributes. This makes render extraction risky until event bindings are mapped and tested with smoke paths.

## 2. Event-Binding Ownership Boundaries

`bindWorkspaceEvents()` owns most authenticated app event binding:

- company and location switching.
- section navigation and command actions.
- global search and exact work-order search.
- opening work orders, equipment, parts, request screens, and message threads.
- status changes, self-assignment, card assignment, and work-order delete confirmation.
- work-order forms: create, Quick Fix, edit, quick update, complete, comments, photos, checklist steps.
- request actions: submit, convert, Quick Fix from request, delete.
- PM schedule create/delete/generate and follow-up create.
- procedure template/step create/delete and checklist updates.
- team add/role/invite/cancel/profile updates.
- messages thread/reply/read flows.
- parts create/update/use/restock/delete/source/document flows.
- company settings, company logo, locations, public request links, and issue reports.

The event layer currently does three jobs at once:

1. finds DOM elements emitted by render functions.
2. mutates global UI state and localStorage.
3. calls workflow mutation functions.

That means moving event binding without preserving render contracts could silently break buttons. Moving mutations without preserving event timing could break loading states, notices, reloads, and recovery paths.

## 3. Global State Ownership

Global state remains broad and directly shared:

- session/company/location: `session`, `companies`, `activeCompanyId`, `locations`, `activeLocationId`.
- work queues: `workOrders`, server totals, dashboard counts, filters, exact-search cache.
- requests: `maintenanceRequests`, request counts, request filter/page state.
- team: `companyMembers`, `teamInvites`, `profilesByUserId`, readiness flags.
- messages: `messageThreads`, members, read state, active thread, search, composer state.
- domain lists: `assets`, `parts`, `preventiveSchedules`, `procedureTemplates`.
- relationship maps: comments, photos, parts used, part documents, events, step results.
- UI modes: active IDs, pending delete IDs, Quick Fix mode, create mode, report issue mode, source manager.
- persistence: active section, filters, pages, location keys, message state, public URL override.
- readiness/error flags: optional schema features, storage features, delete SQL confirmation.

This state is currently owned by `app.js`, not by dedicated state modules. Future extraction should avoid creating modules that secretly read or mutate these variables without an explicit owner.

## 4. Mutation Dependency Chains

Several mutations are not single-table writes. They are operational workflows.

### Quick Fix

`createQuickFix()` can:

- create equipment if a new equipment name is supplied.
- route the work order to the selected equipment location.
- validate safety-device completion.
- block completed status when required procedure checklist state cannot exist yet.
- create a work order.
- record part usage and reduce inventory.
- upload a photo.
- update equipment status.
- record work-order events.
- convert/update a source request when launched from a request.
- mutate UI mode and active work-order state.
- reload the app through `render()`.

This is a critical mutation chain and should not move as a simple service wrapper.

### Work Order Create / Update / Complete / Status / Assignment

Work-order mutations depend on:

- company id and active location.
- equipment-driven routing.
- role and assignment guardrails.
- safety-device requirements.
- procedure/checklist completion state.
- optional columns and schema readiness.
- comments, photos, parts, events, and follow-up state.
- page/filter/search state and detail selection.

These workflows are high to critical risk.

### Request Conversion

`convertRequestToWorkOrder()` creates a work order, updates the request to converted, links `converted_work_order_id`, records history, changes active section, opens the new work order, and reloads.

The conversion boundary is critical because it crosses request state, work-order state, location routing, company isolation, and user-facing queue cleanliness.

### Delete Workflows

Delete workflows combine:

- role checks.
- pending confirmation state.
- live linked-count guards for equipment/procedures.
- storage object cleanup for photos/documents.
- database delete.
- verification selects on some paths.
- active selection cleanup.
- reload and notice behavior.

Deletes should remain blocked from extraction until each delete workflow has a dedicated smoke path.

### Storage / Photo / Document Flows

Storage flows cross browser file handling, image optimization, Supabase Storage, metadata records or RPC attachment, cleanup on partial failure, signed URL display, and user notices.

These are critical operational continuity paths because partial success can create orphaned files or missing evidence.

## 5. Workflow Orchestration Boundaries

Current orchestration remains in `app.js`.

The safest future boundary is not "one table equals one service." The safer boundary is:

- service wrappers own raw data calls only.
- workflow controllers own validation, sequencing, warnings, cleanup, and reload decisions.
- render modules own markup only after event contracts are stable.
- event modules own binding only after render contracts are stable.
- state persistence helpers remain explicit and traceable.

Until those boundaries exist, higher-risk mutations should stay in `app.js`.

## 6. Remaining Hidden Assumptions

Important assumptions that could decay:

- active location is one location at a time.
- scoped active-location storage wins over member default.
- member default wins over first-location fallback.
- legacy active-location key can still migrate to scoped storage.
- equipment location can override active location only after an intentional warning.
- completed work should not appear by default.
- technicians can claim unassigned work but cannot reassign other users.
- admins/managers can delete certain operational records only after guardrails.
- public QR request intake must remain token scoped and anonymous-safe.
- request conversion should remove converted requests from active request clutter.
- storage cleanup failures must be visible or recoverable.
- optional schema fallbacks still exist for older deployments.
- `renderWorkspace()` must always be followed by `bindWorkspaceEvents()` for generated controls.

## 7. Rendering + Mutation Coupling Points

High-coupling points:

- `renderQuickFixForm()` -> `#quick-fix-form` -> `createQuickFix()`.
- `renderCreateWorkOrder()` -> `#create-work-order-form` -> `createWorkOrder()`.
- `renderWorkOrderDetail()` -> edit, quick update, complete, comment, photo, checklist, delete, message, and parts forms.
- `renderMaintenanceRequest()` -> convert, Quick Fix, delete, and request-photo display.
- `renderAssetDetail()` -> update, Quick Fix, linked work, delete guard, delete confirmation.
- `renderPartDetail()` -> use/restock, edit, delete, document upload.
- `renderProcedureTemplate()` -> add step, delete guard, delete confirmation.
- `renderTeamInviteForm()` -> invite default location and invite RPC.
- `renderPublicRequestLocationCard()` -> public link create/disable/regenerate/copy.

Risk: markup changes can break mutations if IDs or `data-*` names change.

## 8. Event-Binding + Mutation Coupling Points

`bindWorkspaceEvents()` calls mutation workflows directly. The highest-risk couplings are:

- `[data-command-action="quick-fix"]` and `[data-quick-fix-request]` set Quick Fix state before `createQuickFix()`.
- `[data-location-select]` and `#location-select` mutate active location and reload queues.
- `[data-convert-request]` calls request conversion.
- delete confirmation buttons call delete workflows using pending ID state.
- status controls call `setWorkOrderStatus()`.
- checklist controls call `saveStepResult()`.
- message actions mutate active thread/read state and localStorage.
- part inventory forms mutate parts and then re-render.
- settings/admin controls mutate company, location, QR links, and issue reports.

Risk: if workflow functions are moved before event contracts are stabilized, the system can become harder to reason about even if each wrapper is individually small.

## 9. State Persistence Dependencies

Persistence is spread across:

- `maintainops.activeCompanyId`
- `maintainops.activeLocationId`
- `maintainops.activeLocationId:<user_id>:<company_id>`
- `maintainops.activeSection`
- `maintainops.myWorkFilter`
- `maintainops.workOrderFilter`
- `maintainops.workOrderAssigneeFilter`
- `maintainops.workSort`
- `maintainops.workOrderPage`
- `maintainops.partsPage`
- `maintainops.assetsPage`
- `maintainops.requestsPage`
- `maintainops.requestViewFilter`
- `maintainops.schedulesPage`
- `maintainops.proceduresPage`
- `maintainops.membersPage`
- `maintainops.assetStatusFilter`
- `maintainops.partInventoryFilter`
- `maintainops.partSearchQuery`
- `maintainops.searchQuery`
- `maintainops.workOrderSearchMode`
- `maintainops.activeMessageThreadId`
- `maintainops.messageThreadFilter`
- `maintainops.messageSearchQuery`
- `maintainops.messageComposerWorkOrderId`
- `maintainops.publicAppUrl`
- `maintainops.adminDeleteSqlConfirmed`

The most operationally sensitive persistence dependency is active location. It controls where work, requests, parts, equipment, PM, and messages appear or get created.

## 10. Operational Continuity Risks If Extraction Proceeds Too Quickly

Risks:

- a mutation wrapper hides company/location scoping assumptions.
- a render extraction changes `data-*` attributes and breaks event handlers.
- an event extraction changes sequencing and loses loading/error/notice behavior.
- a workflow extraction misses partial-failure cleanup.
- a service extraction removes optional schema fallback handling.
- a state extraction duplicates or desynchronizes localStorage keys.
- request conversion starts creating work while leaving requests active.
- Quick Fix creates work but fails to update source request/equipment/part/event side effects.
- delete workflows delete database rows but leave storage objects, or delete storage first and fail database delete.
- public QR intake loses anonymous token scoping or photo attachment behavior.
- technician guardrails remain in UI but become harder to verify against database enforcement.

## Smoke-Test Discipline

LFES smoke tests are lightweight operational verification, not a formal enterprise QA suite.

Every meaningful implementation phase should include:

- static checks.
- smoke tests.
- explicit expected results.
- pass/fail outcome.
- notes about what was not verified.

Smoke tests should use this structure:

```text
TEST:
[name]

STEPS:
[exact actions]

EXPECTED:
[specific observable result]

RESULT:
PASS / FAIL

NOTES:
[unexpected behavior, known gaps, or intentionally skipped verification]
```

High-priority smoke-test paths:

- Quick Fix create/complete.
- Parts use/restock.
- Technician assignment guardrails.
- Public QR request submit.
- Location switch + reload persistence.
- PM generation to work order.
- Issue report submit/update.
- Work-order create/open/delete.

Smoke-test results should be appended to `docs/QA_LOG.md`. The goal is operational verification evidence, not decorative process.

## Recommended Next Controlled Phase

Recommended next phase: LFES Phase 3B event-contract inventory, planning only.

Phase 3B should map the exact `data-*` attributes, form IDs, and DOM IDs emitted by render functions and consumed by `bindWorkspaceEvents()`.

Why this next:

- deeper mutation extraction is still blocked by render/event coupling.
- an event-contract inventory gives future coders a clear checklist for preserving button/form behavior.
- it creates safer smoke-test targets before moving any workflow code.

After Phase 3B, the next implementation candidate should still be narrow. Good candidates would be either:

- a tiny render-independent service wrapper for a non-critical read path, or
- a dedicated smoke-test run for one high-risk path before any extraction.

## What Should Remain Blocked

Remain blocked until separately planned and smoke-tested:

- Quick Fix workflow extraction.
- work-order create/update/status/complete/assignment/delete extraction.
- request conversion extraction.
- public QR submit/photo extraction.
- storage/photo/document extraction.
- PM generation extraction.
- procedure/checklist mutation extraction.
- Team/admin invite/default-location movement.
- active location persistence movement.
- `renderWorkspace()` extraction.
- `bindWorkspaceEvents()` extraction.

## Phase 3A Conclusion

LFES extraction should pause at the workflow boundary. The app is more reviewable than before because utilities, read wrappers, and issue-report wrappers exist, but the remaining work is not "more wrappers." The remaining work is boundary design.

The safest path is to preserve current behavior, map event/render contracts, then move only one tightly scoped boundary at a time with a smoke test that proves the actual field workflow still works.
