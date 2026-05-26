# Current Handoff

Use this file first when starting a new chat.

## Current Goal

Pause feature expansion and preserve project memory so future work can start from docs instead of relying on one long chat thread.

## Current App State

The app is a working Supabase-backed MaintainOps prototype with:

- Auth
- Companies
- Locations
- Team roles
- Quick Fix
- Work Orders
- Equipment
- Parts
- PM
- Procedures
- Requests
- Messages
- Photos
- Comments
- History
- Mobile and desktop layouts
- Large-data stress test improvements

## Most Recent Change

Completed the workspace section navigation boundary extraction from `bindWorkspaceEvents()`.

- Latest app behavior commit:
  - `f3ea2e6` (`Extract workspace section navigation events`)
- Latest documentation/process cleanup:
  - current LFES docs are updated in the docs commit that edits this handoff; do not use older package snapshots as source of truth.
- Latest live cache tag:
  - `app.js?v=lfes-authority-section-navigation-events-1`
- Current `app.js` line count:
  - 8,763 lines.
- Latest deployment:
  - pushed directly to GitHub Pages source branch `main`; no in-repo package snapshot was created.
- Latest modularization state:
  - Phase 16D/16E/16F moved schema error predicates to `src/utils/schemaErrors.js`.
  - Phase 16G/16H/16I moved `withSetupError` to `src/utils/operationResults.js`.
  - Phase 17A/17B/17C moved `withOperationTimeout` to `src/utils/operationTimeout.js`.
  - Phase 17C moved public URL/QR helpers to `src/utils/publicUrlQr.js`.
  - Phase 17D moved `nextDueDate` to `src/utils/maintenanceScheduleDates.js`.
  - Hard-boundary run moved work-order query filter/sort orchestration to `src/utils/workOrderQueryFilters.js`.
  - Small event-binding hard-boundary run moved work-order detail field-jump binding to `src/utils/workSectionJumpEvents.js`.
  - Hard-boundary run moved global search result navigation events to `src/utils/globalSearchNavigationEvents.js`.
  - Measurable reduction run moved request query filters to `src/utils/requestQueryFilters.js`, exact/related work-order search helpers to `src/utils/workOrderSearch.js`, and global/planning/follow-up list builders to `src/utils/workspaceListBuilders.js`.
  - Medium-risk authority run moved workspace search/exact work-search open/close event binding to `src/utils/workspaceSearchEvents.js`.
  - Event-boundary runs moved workspace filter/pagination, detail navigation, and inventory/equipment filter bindings to `src/utils/workspaceFilterPaginationEvents.js`, `src/utils/workspaceDetailNavigationEvents.js`, and `src/utils/workspaceInventoryFilterEvents.js`.
  - High-risk work-order mutation-adjacent run moved only quick status button binding to `src/utils/workspaceWorkOrderStatusEvents.js`; `app.js` still owns `setWorkOrderStatus`, Supabase mutation sequencing, status guards, record events, and render.
  - High-risk work-order mutation-adjacent run moved assignment event wiring to `src/utils/workspaceWorkOrderAssignmentEvents.js`; `app.js` still owns `assignWorkOrderToMe`, `assignWorkOrderFromCard`, Supabase mutation sequencing, permission checks, record events, render, status, delete, and downtime flows.
  - Non-mutating work-order boundary moved downtime copy button wiring to `src/utils/workspaceWorkOrderDowntimeEvents.js`; `app.js` still owns downtime subject/body builders and clipboard implementation.
  - Detail status dropdown boundary moved only `#status-select` binding to `src/utils/workspaceWorkOrderDetailStatusEvents.js`; `app.js` still owns `updateWorkOrderStatus`, `setWorkOrderStatus`, status guards, Supabase mutation sequencing, event recording, and render.
  - High-risk completion boundary moved full Work Order Detail completion submit handling and safety checkbox sync to `src/utils/workspaceWorkOrderCompletionEvents.js`; `app.js` still owns the injected Supabase mutation callback, activity logger, safety payload helpers, render, state arrays, and shared current-safety helper used by quick-update/status paths.
  - High-risk delete boundary moved Work Order Detail delete request/cancel/confirm orchestration to `src/utils/workspaceWorkOrderDeleteEvents.js`; `app.js` still injects permission checks, Supabase row delete, photo storage cleanup, active state setters, render, notices, and timeout wrapper.
  - Medium-risk Team work-view boundary moved `[data-view-member-work]` to `src/utils/workspaceTeamWorkViewEvents.js`; `app.js` still owns state variables, page reset, render, team data, and work-order filtering.
  - Medium-risk Parts detail UI boundary moved `[data-open-part]`, `[data-close-part-detail]`, and `[data-toggle-part-sources]` to `src/utils/workspacePartDetailEvents.js`; `app.js` still owns part data, source data, forms, inventory mutations, document upload, delete flow, and render.
  - Medium-risk Message Center local UI boundary moved `[data-message-filter]`, `[data-open-linked-work-order]`, `[data-clear-message-work-link]`, `#message-search`, `#message-thread-type` composer sync, and `[data-quick-reply]` to `src/utils/workspaceMessageUiEvents.js`; `app.js` still owns thread open/read-state writes, create thread, send reply, message data, render, and Supabase mutations.
  - Medium-low-risk Parts search boundary moved `#part-search-form` input/submit handling to `src/utils/workspacePartSearchEvents.js`; `app.js` still owns part data, forms, restock/use/edit/delete, source rename, document upload, render, and Supabase mutations.
  - Medium-risk workspace section navigation boundary moved `[data-section]` to `src/utils/workspaceSectionNavigationEvents.js`; `app.js` still owns visible-nav rules, queue loaders, state variables, render, command actions, mutations, auth/company/location state, and Supabase access.
- Verification:
  - static JS checks passed for `app.js`, `src/utils/workspaceSectionNavigationEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-section-navigation-events-smoke.js`.
  - targeted mock-DOM section navigation smoke passed for allowed/blocked sections, state clearing, search-mode reset, storage persistence, work/request queue reloads, render, and missing-state no-op.
  - local resource smoke passed against `http://127.0.0.1:4187/`.
  - local browser boot smoke reached the login screen with the new section navigation event script and cache tag present and no browser warning/error logs.
  - hosted GitHub Pages resource smoke passed after Pages propagation.
  - signed-in live smoke passed in the manager/admin browser session on `https://loufish727.github.io/MaintainOps/`.
  - live section navigation smoke clicked Work Orders, Requests, and Parts; each rendered the expected section heading, with new script/cache tags and no browser warning/error logs.
  - live `index.html` referenced `src/utils/workspaceSectionNavigationEvents.js?v=lfes-authority-section-navigation-events-1` and `app.js?v=lfes-authority-section-navigation-events-1`.
  - GitHub Actions local verifier hit API rate limit after finding the run in progress; public run page verified Resource Load Smoke success for `f3ea2e6`, run `https://github.com/loufish727/MaintainOps/actions/runs/26460676489`.
  - fresh live console samples had no relevant warning/error logs.
- Behavior changed:
  - no observed behavior change.
- LFES catch:
  - the first live smoke expectation was wrong. Quick status mutations intentionally set the active work order and re-render into Work Order Detail, so future work-order quick-status smoke must assert the detail status after mutation rather than expecting the list card to remain visible.
  - the dedicated QA/test account is not a manager/admin assignment actor, so assignment controls are hidden there. Assignment mutation smoke requires a manager/admin session plus restore, while the QA/test account remains useful for denied/hidden-control verification.
  - clipboard fallback can settle slower than the nominal 1600ms reset delay in automation; downtime-copy smoke should wait for reset labels conditionally instead of using a brittle fixed sleep.
  - completion smoke must use an `actual_minutes` value compatible with the form step (`5`, `10`, etc.); invalid step values are blocked by native browser validation before the submit handler runs.
  - in-app browser high-level locator clicks can hang on lower-page operational buttons; when DOM state is clear and the action is authorized, scroll the target into view and use coordinate click only after recording the locator/rect evidence.
  - the in-app browser text-entry path can fail when its virtual clipboard is unavailable. For delete-only live smoke, a disposable work order may be created through an authenticated Supabase setup step, but the changed delete behavior must still be verified through the app UI.
  - `python -m http.server` is not available in this Windows environment because `python` resolves to the Microsoft Store shim. Use the existing local Node static-server method for future local resource/browser smokes.
- Safety stop carried forward:
  - form/payload validation is not the next safe extraction boundary yet. Blank Quick Fix required-field behavior stayed blocked by native validation, but the invalid-date UI smoke created a disposable work order instead of cleanly blocking. The disposable smoke artifact was permanently deleted. Treat `requiredText`, `workOrderDateValue`, and `procedureColumn` as blocked pending a narrower validation contract/smoke.
- Process cleanup:
  - restored top-level LFES standards/docs so reviewers do not need to inspect old package snapshots.
  - removed tracked `MaintainOps-github-clean-*` package snapshots from the repo and ignored future package exports.
  - documented why the drift happened and the prevention rule in `docs/LFES/context/DOCUMENTATION_DRIFT_REVIEW_2026-05-21.md`.
- Recommended next step:
  - use `docs/LFES/audits/AUTHORITY_MAP_RENDER_EVENTS_2026-05-21.md` as the current authority map.
  - quick work-order status, assignment, downtime-copy, detail status dropdown, completion, delete, Team work-view, Parts detail UI, Message Center local UI, Parts search, and workspace section navigation boundaries are implemented and live verified.
  - continue high-risk work-order decomposition only one subcluster at a time.
  - next hard target should be selected from the authority map; do not combine request conversion, Quick Fix, storage/photo/document, or broad render/event movement with another change.
  - do not choose form/payload validation until its Quick Fix/date behavior smoke is narrowed and passes.

Still do not move auth/session/company/location logic, Supabase SQL/RLS, storage/photo/document flows, Quick Fix, request conversion, public QR flows, PM generation, broad forms with mutations, `renderWorkspace()`, or broad `bindWorkspaceEvents()`. Work-order mutation-adjacent extraction is allowed only when explicitly selected as one subcluster with visible smoke coverage and direct rollback.

## Prior Recent Change

Completed LFES Phase 10Q through 10V as two consecutive cleanup cycles:

- Phase 10Q/10R/10S:
  - added `src/render/setupDisplay.js`.
  - moved only `renderSetupItem`.
  - deployed commit `f09abd2` (`Extract setup display helper`).
  - live smoke URL: `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10s-live-20260520`.
  - Admin Setup rendered 16 `.setup-item` cards on live.
- Phase 10T/10U/10V:
  - added `src/render/requestPhotoDisplay.js`.
  - moved only `renderMaintenanceRequestPhoto`.
  - deployed commit `0b889c8` (`Extract request photo display helper`).
  - live smoke URL: `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10v-live-20260520`.
  - Requests opened successfully on live.
- Current `app.js` line count:
  - 10,187 lines.
- Verification:
  - static JS checks: PASS.
  - local Resource Load Smoke: PASS.
  - hosted Resource Load Smoke: PASS.
  - signed-in local smokes: PASS.
  - signed-in live smokes: PASS.
  - no visible app errors.
  - no browser warning/error logs.
- GitHub Actions:
  - GitHub connector checks for `f09abd2` and `0b889c8` returned no workflow runs.
- Behavior changed:
  - no observed behavior change.
- Recommended next step:
  - choose LFES Phase 10W planning/readiness before any additional extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 10Q/10R local setup display extraction:

- Scope:
  - Phase 10Q readiness approved only Admin Setup item display helper extraction.
  - added `src/render/setupDisplay.js`.
  - moved only `renderSetupItem`.
  - updated `index.html` to load `src/render/setupDisplay.js?v=lfes-phase-10r-setup-display-1`.
  - updated `app.js` cache tag to `app.js?v=lfes-phase-10r-setup-display-1`.
  - updated Resource Load Smoke required resources.
  - did not move `setupItems`, setup action handling, SQL-applied flag behavior, localStorage updates, mutations, auth/session/company/location logic, Supabase SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()`.
- Line count:
  - `app.js` before: 10,204.
  - `app.js` after: 10,197.
  - reduction: 7 lines.
- Static checks:
  - `node --check app.js`: PASS.
  - `node --check supabase-config.js`: PASS.
  - `node --check tests/smoke/resource-load.spec.js`: PASS.
  - all `src/utils/*.js`, `src/services/*.js`, and `src/render/*.js`: PASS.
- Local Resource Load Smoke:
  - PASS.
- Local signed-in UI smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR stayed selected in `location-select`.
  - Phase 10R script tags were present.
  - Admin Setup opened and rendered 16 `.setup-item` cards.
  - Admin Setup included `Supabase config` and `Photos`.
  - Messages still showed the Phase 9I QA thread.
  - no visible app errors were found.
  - no browser warning/error logs were captured.
- Behavior changed:
  - no observed behavior change.
- Immediate next step:
  - Phase 10S package/upload and live verification.

## Prior Recent Change

Completed LFES Phase 10N/10O/10P option display extraction, package/upload, and live verification:

- Scope:
  - Phase 10N readiness approved only option-list display helper extraction.
  - added `src/render/optionDisplay.js`.
  - moved only `renderLocationOptions`, `renderAssetOptions`, `renderParentAssetOptions`, and `assetOptionLabel`.
  - updated `index.html` to load `src/render/optionDisplay.js?v=lfes-phase-10o-option-display-1`.
  - updated `app.js` cache tag to `app.js?v=lfes-phase-10o-option-display-1`.
  - updated Resource Load Smoke required resources.
  - did not move location switching, asset routing warnings, filtering logic, hierarchy checks, form submit handling, event handlers, mutations, auth/session/company/location logic, Supabase SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()`.
- Line count:
  - `app.js` before: 10,215.
  - `app.js` after: 10,204.
  - reduction: 11 lines.
- Static checks:
  - `node --check app.js`: PASS.
  - `node --check supabase-config.js`: PASS.
  - `node --check tests/smoke/resource-load.spec.js`: PASS.
  - all `src/utils/*.js`, `src/services/*.js`, and `src/render/*.js`: PASS.
- Local Resource Load Smoke:
  - PASS.
- Local signed-in UI smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR stayed selected in `location-select`.
  - Phase 10O script tags were present.
  - request asset select rendered 2 options.
  - create equipment parent select rendered 2 options.
  - create equipment location select rendered 5 options.
  - PM asset select rendered 2 options.
  - team invite default location select rendered 5 options.
  - Messages still showed the Phase 9I QA thread.
  - no visible app errors were found.
  - no browser warning/error logs were captured.
- Behavior changed:
  - no observed behavior change.
- Package:
  - `MaintainOps-github-clean-20260520-122031`
  - `MaintainOps-github-clean-20260520-122031.zip`
- GitHub commit:
  - `0b100fa`
  - message: `Extract option display helpers`
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10p-live-20260520`
- Live verification:
  - PASS.
  - live `index.html` references `src/render/optionDisplay.js?v=lfes-phase-10o-option-display-1`.
  - live `index.html` references `app.js?v=lfes-phase-10o-option-display-1`.
  - both live resources returned HTTP 200.
  - hosted Resource Load Smoke against GitHub Pages passed.
  - signed-in live smoke verified request asset, create equipment parent/location, PM asset, and team invite location selects still render options.
  - no visible app errors and no browser warning/error logs.
- GitHub Actions:
  - GitHub connector check for commit `0b100fa` returned no workflow runs.
- Phase status:
  - Phase 10N/10O/10P is functionally closed.
- Recommended next step:
  - choose LFES Phase 10Q planning/readiness before any additional extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 10K/10L/10M Parts display extraction, package/upload, and live verification:

- Scope:
  - Phase 10K readiness approved only Parts list display helper extraction.
  - added `src/render/partsDisplay.js`.
  - moved only `renderPart`, `renderPartsHealth`, and `renderPartSearch`.
  - updated `index.html` to load `src/render/partsDisplay.js?v=lfes-phase-10l-parts-display-1`.
  - updated `app.js` cache tag to `app.js?v=lfes-phase-10l-parts-display-1`.
  - updated Resource Load Smoke required resources.
  - did not move part detail, source manager, part create/edit/use/restock/document forms beyond existing returned markup, click/open handling, search submit handling, inventory filter click handling, localStorage updates, mutations, auth/session/company/location logic, Supabase SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()`.
- Line count:
  - `app.js` before: 10,253.
  - `app.js` after: 10,215.
  - reduction: 38 lines.
- Static checks:
  - `node --check app.js`: PASS.
  - `node --check supabase-config.js`: PASS.
  - `node --check tests/smoke/resource-load.spec.js`: PASS.
  - all `src/utils/*.js`, `src/services/*.js`, and `src/render/*.js`: PASS.
- Local Resource Load Smoke:
  - PASS.
- Local signed-in UI smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR stayed selected in `location-select`.
  - Phase 10L script tags were present.
  - My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages loaded.
  - Equipment showed `New thalmann`.
  - Parts Inventory rendered two `.parts-health` controls, one `#part-search-form`, and the All Parts / Low Stock labels.
  - Messages still showed the Phase 9I QA thread.
  - no visible app errors were found.
  - no browser warning/error logs were captured.
  - current Salem data had zero visible part cards, so the empty-state path was observed.
- Behavior changed:
  - no observed behavior change.
- Package:
  - `MaintainOps-github-clean-20260520-115838`
  - `MaintainOps-github-clean-20260520-115838.zip`
- GitHub commit:
  - `affeabb`
  - message: `Extract parts display helpers`
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10m-live-20260520`
- Live verification:
  - PASS.
  - live `index.html` references `src/render/partsDisplay.js?v=lfes-phase-10l-parts-display-1`.
  - live `index.html` references `app.js?v=lfes-phase-10l-parts-display-1`.
  - both live resources returned HTTP 200.
  - hosted Resource Load Smoke against GitHub Pages passed.
  - signed-in live smoke passed across My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
  - Parts Inventory rendered two `.parts-health` controls, one `#part-search-form`, and the All Parts / Low Stock labels.
  - no visible app errors and no browser warning/error logs.
  - current Salem data had zero visible part cards, so the empty-state path was observed.
- GitHub Actions:
  - GitHub connector check for commit `affeabb` returned no workflow runs.
- Phase status:
  - Phase 10K/10L/10M is functionally closed.
- Recommended next step:
  - choose LFES Phase 10N planning/readiness before any additional extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 10H/10I/10J pagination display extraction, package/upload, and live verification:

- Scope:
  - Phase 10H readiness approved only pagination display helper extraction.
  - added `src/render/paginationDisplay.js`.
  - moved only `renderWorkPagination`, `renderPartsPagination`, `renderAssetsPagination`, and `renderListPagination`.
  - updated `index.html` to load `src/render/paginationDisplay.js?v=lfes-phase-10i-pagination-display-1`.
  - updated `app.js` cache tag to `app.js?v=lfes-phase-10i-pagination-display-1`.
  - updated Resource Load Smoke required resources.
  - did not move page click handling, page state mutation, localStorage updates, filtering, event handlers, mutations, auth/session/company/location logic, Supabase SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()`.
- Line count:
  - `app.js` before: 10,290.
  - `app.js` after: 10,253.
  - reduction: 37 lines.
- Static checks:
  - `node --check app.js`: PASS.
  - `node --check supabase-config.js`: PASS.
  - `node --check tests/smoke/resource-load.spec.js`: PASS.
  - all `src/utils/*.js`, `src/services/*.js`, and `src/render/*.js`: PASS.
- Local Resource Load Smoke:
  - PASS.
- Local signed-in UI smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR stayed selected in `location-select`.
  - Phase 10I script tags were present.
  - My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages loaded.
  - Equipment showed `New thalmann`.
  - Messages still showed the Phase 9I QA thread.
  - no visible app errors were found.
  - no browser warning/error logs were captured.
  - current Salem data did not exceed pagination thresholds, so no pagination bars were visible in this smoke pass.
- Behavior changed:
  - no observed behavior change.
- Package:
  - `MaintainOps-github-clean-20260520-114423`
  - `MaintainOps-github-clean-20260520-114423.zip`
- GitHub commit:
  - `a0f48e3`
  - message: `Extract pagination display helpers`
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10j-live-20260520`
- Live verification:
  - PASS.
  - live `index.html` references `src/render/paginationDisplay.js?v=lfes-phase-10i-pagination-display-1`.
  - live `index.html` references `app.js?v=lfes-phase-10i-pagination-display-1`.
  - both live resources returned HTTP 200.
  - hosted Resource Load Smoke against GitHub Pages passed.
  - signed-in live smoke passed across My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
  - no visible app errors and no browser warning/error logs.
  - current Salem data did not exceed pagination thresholds, so no pagination bars were visible in this smoke pass.
- GitHub Actions:
  - GitHub connector check for commit `a0f48e3` returned no workflow runs.
- Phase status:
  - Phase 10H/10I/10J is functionally closed.
- Recommended next step:
  - choose LFES Phase 10K planning/readiness before any additional extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 10E/10F/10G mini work order display extraction, package/upload, and live verification:

- Scope:
  - Phase 10E readiness approved only tiny mini work order display helper extraction.
  - added `src/render/miniWorkOrderDisplay.js`.
  - moved only `renderMiniWorkOrder` and `renderAssetMiniWorkOrder`.
  - updated `index.html` to load `src/render/miniWorkOrderDisplay.js?v=lfes-phase-10f-mini-work-order-display-1`.
  - updated `app.js` cache tag to `app.js?v=lfes-phase-10f-mini-work-order-display-1`.
  - updated Resource Load Smoke required resources.
  - did not move asset detail rendering, relationship loading, work-order click behavior, event handlers, mutations, auth/session/company/location logic, Supabase SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()`.
- Line count:
  - `app.js` before: 10,309.
  - `app.js` after: 10,290.
  - reduction: 19 lines.
- Static checks:
  - `node --check app.js`: PASS.
  - `node --check supabase-config.js`: PASS.
  - `node --check tests/smoke/resource-load.spec.js`: PASS.
  - all `src/utils/*.js`, `src/services/*.js`, and `src/render/*.js`: PASS.
- Local Resource Load Smoke:
  - PASS.
- Local signed-in UI smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR stayed selected in `location-select`.
  - Phase 10F script tags were present.
  - My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages loaded.
  - Equipment showed `New thalmann`.
  - Equipment detail rendered two `[data-mini-work-order]` snippets.
  - Messages still showed the Phase 9I QA thread.
  - no visible app errors were found.
  - no browser warning/error logs were captured.
- Behavior changed:
  - no observed behavior change.
- Package:
  - `MaintainOps-github-clean-20260520-110415`
  - `MaintainOps-github-clean-20260520-110415.zip`
- GitHub commit:
  - `fba2c26`
  - message: `Extract mini work order display helpers`
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10g-live-20260520`
- Live verification:
  - PASS.
  - live `index.html` references `src/render/miniWorkOrderDisplay.js?v=lfes-phase-10f-mini-work-order-display-1`.
  - live `index.html` references `app.js?v=lfes-phase-10f-mini-work-order-display-1`.
  - both live resources returned HTTP 200.
  - hosted Resource Load Smoke against GitHub Pages passed.
  - signed-in live smoke passed across My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
  - Equipment detail rendered two `[data-mini-work-order]` snippets.
  - no visible app errors and no browser warning/error logs.
- GitHub Actions:
  - GitHub connector check for commit `fba2c26` returned no workflow runs.
- Phase status:
  - Phase 10E/10F/10G is functionally closed.
- Recommended next step:
  - choose LFES Phase 10H planning/readiness before any additional extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 10B/10C/10D Planning display extraction, package/upload, and live verification:

- Scope:
  - Phase 10B readiness approved only Planning display helper extraction.
  - added `src/render/planningDisplay.js`.
  - moved only `renderPlanningGroup` and `renderPlanningItem`.
  - updated `index.html` to load `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1`.
  - updated `app.js` cache tag to `app.js?v=lfes-phase-10c-planning-display-1`.
  - updated Resource Load Smoke required resources.
  - did not move planning item generation, PM generation, follow-up creation, mini work-order opening, event handlers, mutations, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Line count:
  - `app.js` before: 10,354.
  - `app.js` after: 10,309.
  - reduction: 45 lines.
- Static checks:
  - `node --check app.js`: PASS.
  - `node --check supabase-config.js`: PASS.
  - `node --check tests/smoke/resource-load.spec.js`: PASS.
  - all `src/utils/*.js`, `src/services/*.js`, and `src/render/*.js`: PASS.
- Local Resource Load Smoke:
  - PASS.
- Local signed-in UI smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR stayed selected in `location-select`.
  - Phase 10C script tags were present.
  - Planning rendered Overdue, Due Today, Next 7 Days, Follow-up Needed, and PM Due Soon groups.
  - Requests still rendered Active/Converted/All filter buttons.
  - Work Orders, My Work, Equipment, Parts, Team, Settings, and Messages loaded.
  - Messages still showed the Phase 9I QA thread.
  - no visible app errors were found.
  - no browser warning/error logs were captured.
- Behavior changed:
  - no observed behavior change.
- Phase status:
  - Phase 10B/10C/10D is functionally closed.
- Recommended next step:
  - choose LFES Phase 10E planning/readiness before any additional extraction, or pause and continue live pilot monitoring.
- Package:
  - `MaintainOps-github-clean-20260520-103436`
  - `MaintainOps-github-clean-20260520-103436.zip`
- GitHub commit:
  - `efef39c`
  - message: `Extract planning display helpers`
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10d-live-20260520`
- Live resource checks:
  - live `index.html` references `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1`.
  - live `index.html` references `app.js?v=lfes-phase-10c-planning-display-1`.
  - live `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1`: HTTP 200.
  - live `app.js?v=lfes-phase-10c-planning-display-1`: HTTP 200.
- Hosted Resource Load Smoke:
  - PASS.
- GitHub Actions:
  - final check unavailable due public API rate limiting.
- Live signed-in UI smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR stayed selected.
  - Phase 10C script tags were present.
  - Planning rendered Overdue, Due Today, Next 7 Days, Follow-up Needed, and PM Due Soon groups.
  - Requests still rendered Active/Converted/All filter buttons.
  - My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded.
  - Messages still showed the Phase 9I QA thread.
  - no visible app errors were found.
  - no browser warning/error logs were captured.

## Prior Recent Change

Completed LFES Phase 9N equipment label helper extraction locally:

- Scope:
  - created one small equipment label module.
  - moved only the approved pure equipment label helpers.
  - did not package/upload yet.
  - did not move equipment cards/details/forms.
  - did not move equipment delete guards.
  - did not move equipment-driven routing behavior.
  - did not move Quick Fix hooks.
  - did not move event handlers.
  - did not move mutations.
  - did not move Supabase calls.
  - did not move auth/session/company/location logic.
  - did not move `renderWorkspace()` or `bindWorkspaceEvents()`.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Prior phase:
  - Phase 9M planning/readiness: PASS.
  - created `docs/LFES/audits/LFES_PHASE_9M_EQUIPMENT_LABEL_READINESS.md`.
- Created:
  - `src/render/equipmentLabels.js`
- Modified:
  - `app.js`
  - `index.html`
  - `tests/smoke/resource-load.spec.js`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- Helpers moved:
  - `assetTypeLabel`
  - `assetStatusLabel`
- Cache/script loading:
  - `index.html` now loads `src/render/equipmentLabels.js?v=lfes-phase-9n-equipment-labels-1`.
  - `index.html` now loads `app.js?v=lfes-phase-9n-equipment-labels-1`.
- Resource smoke:
  - `tests/smoke/resource-load.spec.js` now includes `src/render/equipmentLabels.js`.
- App.js line count:
  - before Phase 9N: 10,487 lines.
  - after Phase 9N: 10,476 lines.
  - reduction: 11 lines.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, `tests/smoke/resource-load.spec.js`, all `src/utils`, all `src/services`, and all `src/render` files.
- Local resource smoke:
  - PASS with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`.
- Local signed-in smoke:
  - PASS.
  - local URL: `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9n-equipment-labels-20260520`.
  - Taylor Metal Products loaded.
  - Salem, OR was selected.
  - `src/render/equipmentLabels.js` and the Phase 9N `app.js` cache tag were present.
  - Equipment loaded and rendered equipment type/status labels.
  - Work Orders, My Work, Parts, Team, Settings, and Messages loaded.
  - no visible app errors.
  - no browser warning/error logs captured.
- Behavior changed:
  - no observed behavior change.
- Recommended next step:
  - Phase 9O package/upload and live verification.

## Prior Recent Change

Completed LFES Phase 9L package/upload and live verification:

- Scope:
  - packaged/uploaded the stable Phase 9K message formatting helper extraction.
  - did not start Phase 9M.
  - did not move more helpers.
  - did not refactor `app.js`.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Package:
  - `MaintainOps-github-clean-20260520-082153`
  - `MaintainOps-github-clean-20260520-082153.zip`
- GitHub commit:
  - `989ac29b6a9c13df0143756ab74184c421572455`
  - message: `Extract message formatting helpers`
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9l-live-20260520`
- Live resource checks:
  - live `index.html` references `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`.
  - live `index.html` references `app.js?v=lfes-phase-9k-message-format-1`.
  - live `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`: HTTP 200.
  - live `app.js?v=lfes-phase-9k-message-format-1`: HTTP 200.
- Hosted Resource Load Smoke:
  - PASS.
- GitHub Actions:
  - Resource Load Smoke: PASS.
  - run: `https://github.com/loufish727/MaintainOps/actions/runs/26172273053`
  - Pages build/deployment: PASS.
  - run: `https://github.com/loufish727/MaintainOps/actions/runs/26172272050`
- Authenticated live UI smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR stayed selected in `location-select`.
  - Phase 9K script tags were present.
  - Messages loaded with the Phase 9I QA thread.
  - message thread button rendered.
  - one message bubble rendered.
  - sender initials `LF` rendered.
  - `Today` day divider rendered.
  - My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded.
  - no visible app errors were found.
  - no browser warning/error logs were captured.
- Behavior changed:
  - no observed behavior change.
- Phase status:
  - Phase 9L is fully closed.
- Recommended next step:
  - choose LFES Phase 9M planning/readiness before any additional extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 9K message formatting helper extraction locally:

- Scope:
  - created one small message formatting module.
  - moved only the approved pure message formatting helpers.
  - did not package/upload yet.
  - did not move `renderMessageCenter`.
  - did not move `renderMessageThreadButton`.
  - did not move `renderLinkedWorkMessageThread`.
  - did not move message composer forms.
  - did not move thread creation/send/read mutations.
  - did not move event handlers.
  - did not move Supabase calls.
  - did not move auth/session/company/location logic.
  - did not move `renderWorkspace()` or `bindWorkspaceEvents()`.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Prior phase:
  - Phase 9J planning/readiness: PASS.
  - created `docs/LFES/audits/LFES_PHASE_9J_MESSAGE_FORMAT_READINESS.md`.
- Created:
  - `src/render/messageFormatting.js`
- Modified:
  - `app.js`
  - `index.html`
  - `tests/smoke/resource-load.spec.js`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- Helpers moved:
  - `formatMessageTime`
  - `formatMessageDay`
  - `initials`
- Cache/script loading:
  - `index.html` now loads `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`.
  - `index.html` now loads `app.js?v=lfes-phase-9k-message-format-1`.
- Resource smoke:
  - `tests/smoke/resource-load.spec.js` now includes `src/render/messageFormatting.js`.
- App.js line count:
  - before Phase 9K: 10,511 lines.
  - after Phase 9K: 10,487 lines.
  - reduction: 24 lines.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, `tests/smoke/resource-load.spec.js`, all `src/utils`, all `src/services`, and all `src/render` files.
- Local resource smoke:
  - PASS with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`.
- Local signed-in smoke:
  - PASS.
  - local URL: `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9k-message-format-20260520`.
  - Taylor Metal Products loaded.
  - Salem, OR was selected.
  - `src/render/messageFormatting.js` and the Phase 9K `app.js` cache tag were present.
  - Messages loaded with the Phase 9I QA thread.
  - message thread button rendered.
  - one message bubble rendered.
  - sender initials `LF` rendered.
  - `Today` day divider rendered.
  - My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded.
  - no visible app errors.
  - no browser warning/error logs captured.
- Behavior changed:
  - no observed behavior change.
- Recommended next step:
  - Phase 9L package/upload and live verification.

## Prior Recent Change

Completed LFES Phase 9I non-empty Messages smoke:

- Scope:
  - live signed-in runtime smoke only.
  - created one minimal direct QA message thread between safe owned accounts.
  - did not change app code.
  - did not move functions.
  - did not refactor `app.js`.
  - did not change rendering behavior.
  - did not change event binding.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9i-message-smoke-20260520`
- QA thread created:
  - subject: `QA Phase 9I message smoke 20260520-9I-1779288774749`
  - body: `QA Phase 9I message bubble smoke 20260520-9I-1779288774749. Safe owned-account rendering check.`
  - type: direct
  - visible participants: `Louie Fisher, loufish727`
  - cleanup: no cleanup performed; retained as QA evidence unless a later app-supported cleanup decision is made.
- Verified:
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR stayed selected in `location-select`.
  - Messages showed `1 threads`.
  - message thread button rendered subject, participants, sender summary, body preview, and `Today 7:52 AM` timestamp.
  - message detail rendered one `.message-bubble`.
  - sender initials rendered as `LF`.
  - `Today` day divider rendered.
  - My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded after the message mutation.
  - no visible app errors were found.
  - no browser warning/error logs were captured.
- Behavior changed:
  - no app behavior changed.
  - live QA message data was intentionally created.
- Phase status:
  - Phase 9I non-empty Messages smoke: PASS.
- Recommended next step:
  - choose LFES Phase 9J planning/readiness before any additional helper extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 9H app.js cleanup readiness decision:

- Scope:
  - planning/documentation only.
  - did not change app code.
  - did not move functions.
  - did not refactor `app.js`.
  - did not change rendering behavior.
  - did not change event binding.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Created:
  - `docs/LFES/audits/LFES_PHASE_9H_APP_JS_CLEANUP_READINESS.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Decision:
  - do not recommend immediate Phase 9I code extraction yet.
  - Phase 9G is fully closed, but non-empty message bubbles remain not data-exercised because Messages had `0 threads`.
  - avoid stacking more message-adjacent display changes before non-empty message evidence exists.
  - pure label helpers remain safe later but low-value now.
- Recommended next controlled phase:
  - LFES Phase 9I non-empty Messages smoke, if explicitly approved.
  - use an existing safe message thread if available, or create a minimal safe message thread only with explicit approval.
- Remains blocked:
  - Phase 9I code implementation.
  - additional helper extraction.
  - message center/composer/thread workflow movement.
  - event handlers.
  - mutations except a manually approved non-empty Messages smoke using safe owned accounts.
  - Supabase SQL/RLS.
  - `renderWorkspace()`.
  - `bindWorkspaceEvents()`.

## Prior Recent Change

Completed LFES Phase 9G signed-in live UI smoke and fully closed Phase 9G:

- Scope:
  - completed the authenticated live UI smoke for the deployed Phase 9G message display-helper extraction.
  - packaged/uploaded the stable Phase 9G message display-helper extraction.
  - did not start Phase 9H.
  - did not move more helpers.
  - did not refactor `app.js`.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9g-live-20260520-072736`
- Package:
  - `MaintainOps-github-clean-20260520-072736`
  - `MaintainOps-github-clean-20260520-072736.zip`
- GitHub commit:
  - `26b3d1615b03a7f125ec0a32a8bc784a3f92f082`
  - message: `Extract message display helpers`
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, `tests/smoke/resource-load.spec.js`, all `src/utils`, all `src/services`, and all `src/render` files.
- Live resource checks:
  - live `index.html` references `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`.
  - live `index.html` references `app.js?v=lfes-phase-9g-message-1`.
  - live `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`: HTTP 200.
  - live `app.js?v=lfes-phase-9g-message-1`: HTTP 200.
- GitHub Actions:
  - Resource Load Smoke: PASS.
  - run: `https://github.com/loufish727/MaintainOps/actions/runs/26169188200`
  - Pages build/deployment: PASS.
  - run: `https://github.com/loufish727/MaintainOps/actions/runs/26169169535`
- Authenticated live UI smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR was the selected active location in `location-select`.
  - Phase 9G script tags were present.
  - Messages loaded and rendered the 0-thread empty state.
  - My Work loaded.
  - Work Orders loaded.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - no visible app errors were found.
  - no browser warning/error logs were captured.
- Smoke caveat:
  - Messages had 0 threads, so non-empty message bubbles were still not data-exercised.
- Behavior changed:
  - no observed behavior change.
- Phase status:
  - Phase 9G is fully closed.
- Recommended next step:
  - choose LFES Phase 9H planning/readiness only before any additional extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 9G message display-helper extraction locally:

- Scope:
  - created one small message display module.
  - moved only the approved message bubble/list display helpers.
  - did not package/upload.
  - did not move `renderMessageCenter`.
  - did not move `renderMessageThreadButton`.
  - did not move `renderLinkedWorkMessageThread`.
  - did not move message composer forms.
  - did not move thread creation/send/read mutations.
  - did not move event handlers.
  - did not move Supabase calls.
  - did not move auth/session/company/location logic.
  - did not move `renderWorkspace()` or `bindWorkspaceEvents()`.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Created:
  - `src/render/messageDisplay.js`
- Modified:
  - `app.js`
  - `index.html`
  - `tests/smoke/resource-load.spec.js`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- Helpers moved:
  - `renderMessageBubble`
  - `renderMessageList`
- Cache/script loading:
  - `index.html` now loads `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`.
  - `index.html` now loads `app.js?v=lfes-phase-9g-message-1`.
- Resource smoke:
  - `tests/smoke/resource-load.spec.js` now includes `src/render/messageDisplay.js`.
- App.js line count:
  - before Phase 9G: 10,524 lines.
  - after Phase 9G: 10,511 lines.
  - reduction: 13 lines.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, `tests/smoke/resource-load.spec.js`, all `src/utils`, all `src/services`, and all `src/render` files.
- Local resource checks:
  - `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`: HTTP 200.
  - `app.js?v=lfes-phase-9g-message-1`: HTTP 200.
  - Local Playwright Resource Load Smoke passed with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`.
- Local signed-in smoke:
  - PASS.
  - local URL: `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9g-message-20260520`.
  - Taylor Metal Products loaded.
  - Salem, OR was selected.
  - Messages loaded and rendered the no-thread empty state.
  - My Work, Work Orders, Equipment, Parts, Team, and Settings loaded.
  - no visible app errors were found.
  - no actionable browser console warning/error logs were captured.
- Smoke caveat:
  - current pilot data has 0 message threads, so actual non-empty message bubbles were not data-exercised.
  - user confirmed QA and Louie Fisher accounts are both safe owned accounts for a later non-empty Messages smoke if needed.
- Behavior changed:
  - no observed behavior change.
- Package/upload:
  - blocked until explicitly requested.
- Recommended next step:
  - package/upload LFES Phase 9G to GitHub Pages and live verify, if approved.

## Prior Recent Change

Completed LFES Phase 9F app.js cleanup readiness decision:

- Scope:
  - planning/documentation only.
  - did not change app code.
  - did not move functions.
  - did not refactor `app.js`.
  - did not change rendering behavior.
  - did not change event binding.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Created:
  - `docs/LFES/audits/LFES_PHASE_9F_APP_JS_CLEANUP_READINESS.md`
- Updated:
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- Decision:
  - recommended next implementation target is message bubble/list display only.
  - suggested future file: `src/render/messageDisplay.js`.
  - allowed helpers: `renderMessageBubble` and `renderMessageList`.
- Why this is safest:
  - these helpers are display-only.
  - they do not create forms.
  - they do not emit `data-*` action hooks.
  - they do not submit messages.
  - they do not create/select threads.
  - they can receive explicit dependencies from `app.js`.
- Blocked from the next implementation phase:
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
- Other candidates reviewed:
  - tiny labels are safe later but too low-value alone.
  - notice/status/toast helpers remain blocked because `showNotice()` mutates notice state and calls `renderWorkspace()`.
  - admin readiness remains blocked because `renderSetupItem()` emits `data-setup-action`.
  - issue reports, public QR, parts, equipment, and work-order command cards remain blocked.
- Phase status:
  - Phase 9F planning/readiness: PASS.
- Recommended next step:
  - LFES Phase 9G message bubble/list display-helper extraction only, if app.js cleanup continues.

## Prior Recent Change

Completed LFES Phase 9E package/upload and live verification:

- Scope:
  - packaged/uploaded the stable Phase 9E static icon display-helper extraction.
  - did not start Phase 9F.
  - did not move more helpers.
  - did not refactor `app.js`.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Package:
  - `MaintainOps-github-clean-20260520-070853`
- Commits:
  - app deploy: `0ce9a80`
  - resource-smoke stabilization/docs: `4ba4e99`
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, `tests/smoke/resource-load.spec.js`, all `src/utils`, all `src/services`, and all `src/render` files.
- Deployment/resource checks:
  - live `index.html` includes `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1`.
  - live `index.html` includes `app.js?v=lfes-phase-9e-icons-1`.
  - live `src/render/iconDisplay.js`: HTTP 200.
  - live `app.js`: HTTP 200.
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9e-live-20260520-0714`
- Live smoke result:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR was selected.
  - My Work rendered nav/segment icons.
  - Work Orders rendered work list and segment icons.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - no visible app errors were found.
  - no actionable browser console warning/error logs were captured.
- GitHub Actions:
  - initial Resource Load Smoke for commit `0ce9a80` failed because GitHub Pages was still serving the previous Phase 9D `index.html`.
  - `tests/smoke/resource-load.spec.js` was stabilized to retry hosted resource checks while Pages catches up.
  - Resource Load Smoke passed for commit `4ba4e9912c64afcd99cea14dfcf278457fb2a61e`.
  - run: `https://github.com/loufish727/MaintainOps/actions/runs/26168207272`
  - Pages build/deployment passed for the same commit.
- Behavior changed:
  - no observed behavior change beyond intended icon display-helper extraction.
- Phase status:
  - Phase 9E is fully closed.
- Recommended next step:
  - LFES Phase 9F planning/readiness only before any additional extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Captured the Codex LFES execution handoff:

- Codex is now the primary LFES execution agent for MaintainOps.
- The external planning chat should only be needed for second opinions, big architecture judgment, external critique, difficult risk tradeoffs, or plain-English strategy explanation.
- Preserved the working rule that Codex may combine planning and implementation only for clearly low-risk display/read-only helper extraction.
- Preserved the blocked list for mutations, event handlers, workflow orchestration, auth/session/company/location logic, Quick Fix, work-order lifecycle, request conversion, public QR submit, delete confirmations, storage/photo/document flows, parts usage/restock forms, invite/default-location forms, `renderWorkspace`, `bindWorkspaceEvents`, and Supabase SQL/RLS.
- Added the high-risk LFES deviation warning format for skipped verification, risky sequencing changes, or dangerous extraction jumps.
- Documented that Phase 9E is now complete locally and the next recommended phase is package/upload plus live verification.

Created:

- `docs/LFES/context/CODEX_LFES_EXECUTION_HANDOFF.md`

## Prior Recent Change

Completed LFES Phase 9E batched low-risk display-helper cleanup locally:

- Scope:
  - classified candidate helpers first.
  - implemented only the clearly low-risk static icon helper batch.
  - did not package/upload.
  - did not move workflow renderers.
  - did not move event handlers.
  - did not move mutations.
  - did not move `renderWorkspace()` or `bindWorkspaceEvents()`.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Created:
  - `src/render/iconDisplay.js`
- Modified:
  - `app.js`
  - `index.html`
  - `tests/smoke/resource-load.spec.js`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- Helpers moved:
  - `segmentIcon`
  - `navIcon`
- Blocked candidates:
  - notice/status/toast helpers: mutate notice state and call `renderWorkspace()`.
  - admin readiness helpers: emit `data-setup-action`.
  - issue-report helpers: include submit/status mutation contracts.
  - public QR helpers: include copy/regenerate/disable/test form action hooks.
  - parts/equipment cards: emit open/detail behavior hooks.
  - email/helper command cards: emit `data-jump-work-section`.
- Cache/script loading:
  - `index.html` now loads `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1`.
  - `index.html` now loads `app.js?v=lfes-phase-9e-icons-1`.
- App.js line count:
  - before Phase 9E: 10,561 lines.
  - after Phase 9E: 10,524 lines.
  - reduction: 37 lines.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, all `src/render` files including `src/render/iconDisplay.js`, and `tests/smoke/resource-load.spec.js`.
- Local resource checks:
  - `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1`: HTTP 200.
  - `app.js?v=lfes-phase-9e-icons-1`: HTTP 200.
  - Local Playwright Resource Load Smoke passed with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`.
  - The resource smoke list now includes `src/render/relationshipDisplay.js`, `src/render/dashboardDisplay.js`, and `src/render/iconDisplay.js`.
- Local signed-in smoke:
  - PASS.
  - local URL: `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9e-icons-20260520`.
  - Taylor Metal Products loaded.
  - Salem, OR was selected.
  - My Work, Work Orders, Equipment, Parts, Team, and Settings loaded.
  - nav icons and segment icons rendered.
  - no visible app errors were found.
  - no actionable browser console warning/error logs were captured.
- Behavior changed:
  - no observed behavior change.
- Package/upload:
  - blocked until explicitly requested.

## Prior Recent Change

Completed LFES Phase 9D package/upload and live verification:

- Scope:
  - packaged/uploaded the stable Phase 9D dashboard display-helper extraction.
  - did not start Phase 9E.
  - did not move more helpers.
  - did not refactor `app.js`.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Package:
  - `MaintainOps-github-clean-20260520-065324`
- GitHub commit:
  - `0fc2083`
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, `src/render/displayHelpers.js`, `src/render/relationshipDisplay.js`, and `src/render/dashboardDisplay.js`.
- Deployment/resource checks:
  - live `index.html` includes `src/render/dashboardDisplay.js?v=lfes-phase-9d-dashboard-1`.
  - live `index.html` includes `app.js?v=lfes-phase-9d-dashboard-1`.
  - live `src/render/dashboardDisplay.js`: HTTP 200.
  - live `app.js`: HTTP 200.
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9d-live-20260520-0656`
- Live smoke result:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - My Work dashboard/workload metrics rendered.
  - Active Work gauge filter responded.
  - Work Orders loaded.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - no visible app errors were found.
  - no actionable browser console warning/error logs were captured.
- GitHub Actions:
  - Resource Load Smoke passed for commit `0fc2083b80c33dd762ae5efcb089d33dca709764`.
  - run: `https://github.com/loufish727/MaintainOps/actions/runs/26167151368`
  - Pages build/deployment passed for the same commit.
- Behavior changed:
  - no observed behavior change beyond intended dashboard display-helper extraction.
- Phase status:
  - Phase 9D is fully closed.
- Recommended next step:
  - LFES Phase 9E planning/readiness only before any further extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 9D dashboard display-helper extraction and local smoke:

- Scope:
  - created one small dashboard display module.
  - moved only approved dashboard/metrics helpers.
  - no workflow renderers moved.
  - no event handlers moved.
  - no mutations moved.
  - `renderWorkspace()` stayed in `app.js`.
  - `bindWorkspaceEvents()` stayed in `app.js`.
  - parts/equipment detail renderers stayed in `app.js`.
  - issue report renderers stayed in `app.js`.
  - public QR renderers stayed in `app.js`.
  - Team/invite/default-location renderers stayed in `app.js`.
  - no Supabase SQL/RLS changes.
- Created:
  - `src/render/dashboardDisplay.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Helpers moved:
  - `renderGaugeReadout`
  - `renderWorkOrderGaugeDashboard`
  - `renderWorkloadStrip`
- Cache/script loading:
  - `index.html` now loads `src/render/dashboardDisplay.js?v=lfes-phase-9d-dashboard-1`.
  - `index.html` now loads `app.js?v=lfes-phase-9d-dashboard-1`.
- App.js line count:
  - before Phase 9D: 10,625 lines.
  - after Phase 9D: 10,561 lines.
  - reduction: 64 lines.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, `src/render/displayHelpers.js`, `src/render/relationshipDisplay.js`, and `src/render/dashboardDisplay.js`.
- Local resource checks:
  - local `index.html`, Phase 9D `app.js`, `src/render/dashboardDisplay.js`, and `src/render/relationshipDisplay.js` served HTTP 200.
- Local signed-in smoke:
  - PASS.
  - local URL: `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9d-dashboard-20260520`.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - dashboard/workload metrics rendered.
  - gauge filter click responded.
  - Work Orders loaded.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - no visible app errors were found.
  - no actionable browser console warning/error logs were captured.
- Behavior changed:
  - no observed behavior change.
- Package/upload:
  - blocked until explicitly requested.
- Recommended next step:
  - package/upload LFES Phase 9D to GitHub Pages and live verify, if approved.
  - otherwise pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 9C app.js cleanup readiness decision:

- Scope:
  - planning and documentation only.
  - no app code changed.
  - no `app.js` refactor.
  - no functions moved.
  - no Supabase SQL/RLS changed.
  - no workflows/business logic changed.
- Created:
  - `docs/LFES/audits/LFES_PHASE_9C_APP_JS_CLEANUP_READINESS.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Evidence reviewed:
  - Phase 9A subsystem strategy.
  - Phase 9B relationship display extraction and live verification.
  - latest QA/handoff/next steps.
  - modularization plan.
  - LFES real-world catches.
  - current `app.js` candidate clusters.
- Recommended next extraction target:
  - dashboard / metrics display cluster.
- Suggested future file:
  - `src/render/dashboardDisplay.js`
- Suggested future helpers:
  - `renderGaugeReadout`
  - `renderWorkOrderGaugeDashboard`
  - `renderWorkloadStrip`
- Estimated line reduction:
  - approximately 55-85 lines from `app.js`.
- Approval state:
  - implementation is still blocked until explicitly approved.
- Phase 9B real catch documented:
  - `relationshipDisplay.js` deployed correctly, but `app.js` initially had a stale old cache tag.
  - fixed by updating live deploy to `app.js?v=lfes-phase-9b-relationship-1`.
  - future extractions must verify helper script tags and `app.js` cache tags live.
- Remains blocked:
  - issue report display movement.
  - parts/equipment render movement.
  - public QR rendering.
  - Team invite/default-location rendering.
  - workflow/mutation/event binding extraction.
  - broad `renderWorkspace()` movement.
  - Supabase SQL/RLS changes.
- Recommended next step:
  - if continuing app.js cleanup, approve LFES Phase 9D dashboard/metrics display-helper extraction only.
  - otherwise continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 9B package/upload and live verification:

- Scope:
  - packaged/uploaded the stable Phase 9B relationship display-helper extraction.
  - did not start Phase 9C.
  - did not move more helpers.
  - did not refactor `app.js`.
  - did not change Supabase SQL/RLS.
  - did not change workflows/business logic.
- Package:
  - initial package: `MaintainOps-github-clean-20260520-063140`.
  - corrected package after cache-tag fix: `MaintainOps-github-clean-20260520-063612`.
- GitHub commits:
  - initial deploy: `35f21ed`.
  - final corrected deploy: `209dce9`.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, `src/render/displayHelpers.js`, and `src/render/relationshipDisplay.js`.
- Deployment/resource checks:
  - live `index.html` includes `src/render/relationshipDisplay.js?v=lfes-phase-9b-relationship-1`.
  - live `index.html` includes `app.js?v=lfes-phase-9b-relationship-1`.
  - live `src/render/relationshipDisplay.js`: HTTP 200.
  - live `app.js`: HTTP 200.
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9b-live-cachefix-20260520-0640`
- Live smoke result:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders loaded.
  - `Hydralic Leak` detail opened.
  - relationship chips rendered: 2 chips found.
  - History rendered activity entries.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - no visible app errors were found.
  - no actionable browser console warning/error logs were captured.
- GitHub Actions:
  - Resource Load Smoke passed for commit `209dce9aeee5f7c4bce3fd157e6f89b648199e20`.
  - run: `https://github.com/loufish727/MaintainOps/actions/runs/26166156956`
  - Pages build/deployment passed for the same commit.
- Important catch:
  - initial deploy included the new `relationshipDisplay.js` script tag, but `app.js` still had the older Phase 6D cache tag.
  - fixed by updating `index.html` to use `app.js?v=lfes-phase-9b-relationship-1`.
- Behavior changed:
  - no observed behavior change beyond intended relationship display-helper extraction.
- Phase status:
  - Phase 9B is fully closed.
- Recommended next step:
  - LFES Phase 9C readiness/planning only before any further extraction, or pause and continue live pilot monitoring.

## Prior Recent Change

Completed LFES Phase 9B-M manager/admin local Settings smoke confirmation rerun:

- Scope:
  - manager/admin Settings and relationship detail smoke verification only.
  - no app code changed.
  - no packaging/upload performed.
  - no Phase 9C started.
  - no additional helper extraction.
  - no `app.js` refactor.
  - no Supabase SQL/RLS changes.
- Browser/session tested:
  - in-app browser at local `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`.
  - manager/admin-capable session was available.
- Result:
  - PASS.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Settings loaded.
  - Team loaded.
  - Work Orders loaded.
  - `Hydralic Leak` detail opened.
  - relationship chips rendered: 2 chips found.
  - History rendered activity entries for assignment, data correction, update, status change, equipment-created, and created events.
  - Equipment loaded.
  - Parts loaded.
  - no visible app errors were found.
  - no actionable browser console warning/error logs were captured.
- Behavior changed:
  - no observed behavior change from Phase 9B relationship display extraction.
- Package/upload:
  - approved for the stable Phase 9B build.
- Recommended next step:
  - package/upload the stable Phase 9B build to GitHub Pages, then live verify.

## Prior Recent Change

Completed LFES Phase 9B-M manager/admin local Settings smoke checkpoint:

- Scope:
  - manager/admin Settings smoke verification only.
  - no app code changed.
  - no packaging/upload performed.
  - no Phase 9C started.
  - no additional helper extraction.
  - no `app.js` refactor.
  - no Supabase SQL/RLS changes.
- Browser/session tested:
  - in-app browser at local `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`.
  - manager/admin-capable session was available.
- Result:
  - PASS.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Settings loaded.
  - Team loaded.
  - Work Orders loaded.
  - `Hydralic Leak` detail opened.
  - relationship chips rendered: 2 chips found.
  - activity items rendered: 11 relationship detail/activity items found.
  - Equipment loaded.
  - Parts loaded.
  - no visible app errors were found.
  - no actionable browser console warning/error logs were captured.
- Behavior changed:
  - no observed behavior change from Phase 9B relationship display extraction.
- Package/upload:
  - approved for the stable Phase 9B build.
- Recommended next step:
  - package/upload the stable Phase 9B build to GitHub Pages, then live verify.

## Prior Recent Change

Completed LFES Phase 9B-M manager/admin local Settings smoke checkpoint attempt:

- Scope:
  - manager/admin Settings smoke verification only.
  - no app code changed.
  - no packaging/upload.
  - no Phase 9C started.
  - no additional helper extraction.
  - no `app.js` refactor.
  - no Supabase SQL/RLS changes.
- Browser/session checked:
  - in-app browser at local `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`.
- Result:
  - NOT VERIFIED.
  - current local browser session was still at the login screen.
  - no manager/admin-capable local session was available to verify Settings.
  - prior Playwright smoke account could verify Work Orders/relationship display but did not expose Settings navigation.
- Behavior changed:
  - no behavior change observed or introduced.
- Package/upload:
  - still blocked pending actual manager/admin Settings smoke.
- Recommended next step:
  - sign in locally with a manager/admin-capable account, then rerun LFES Phase 9B-M.
  - verify Taylor Metal Products, Salem, Settings, Team, Work Orders, `Hydralic Leak` detail, relationship chips/activity items, no visible errors, and no actionable console errors.

## Prior Recent Change

Completed LFES Phase 9B-S signed-in local smoke checkpoint:

- Scope:
  - signed-in local smoke verification only.
  - no app code changed.
  - no packaging/upload.
  - no Phase 9C started.
  - no additional helper extraction.
  - no `app.js` refactor.
  - no Supabase SQL/RLS changes.
- Browser/session tested:
  - Playwright Chromium against local `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`.
  - in-app browser remained unable to type into the login form because of its virtual clipboard/text-entry limitation, so Playwright Chromium was used for the signed-in smoke.
- Result:
  - PASS WITH SETTINGS NOT VERIFIED.
  - sign-in succeeded.
  - Taylor Metal Products loaded.
  - Salem, OR was selected.
  - Work Orders loaded.
  - `Hydralic Leak` detail opened.
  - relationship chips rendered: 2 chips found.
  - activity items rendered: 10 relationship detail/activity items found.
  - Equipment, Parts, and Team loaded.
  - Settings was NOT VERIFIED because the smoke account/session did not expose a Settings nav item.
  - no visible app errors were found.
  - no actionable console messages were captured.
  - Playwright recorded aborted Supabase HEAD requests during rapid navigation; these were treated as non-actionable test-navigation aborts because the UI loaded and no console errors appeared.
- Behavior changed:
  - no observed behavior change from Phase 9B relationship display extraction.
- Package/upload:
  - still blocked until a manager/admin local smoke verifies Settings after the relationship display extraction.
- Recommended next step:
  - LFES Phase 9B-M manager/admin Settings smoke checkpoint.
  - verify Settings loads under a manager/admin local session, then package/upload can be reconsidered.

## Prior Recent Change

Completed LFES Phase 9B relationship display-helper extraction:

- Scope:
  - created one small render helper module.
  - moved only read-only relationship display helpers.
  - no work-order workflows moved.
  - no relationship mutation logic moved.
  - no comments/photos/parts/steps loaders moved.
  - `renderWorkOrderDetail()` stayed in `app.js`.
  - event handlers stayed in `app.js`.
  - no Supabase SQL/RLS changes.
  - behavior intended to remain unchanged.
- Created:
  - `src/render/relationshipDisplay.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/NEXT_STEPS.md`
- Helpers moved:
  - `renderActivityItem`
  - `renderRelationshipChips`
  - `relationshipChip`
  - `relationshipIcon`
- Implementation:
  - `index.html` now loads `src/render/relationshipDisplay.js?v=lfes-phase-9b-relationship-1` before `app.js`.
  - `app.js` creates a small dependency adapter through `createRelationshipDisplayHelpers(...)`.
  - existing call sites remain unchanged.
- App.js line count:
  - before: 10,704 lines.
  - after: 10,625 lines.
  - reduction: 79 lines.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, `src/render/displayHelpers.js`, and `src/render/relationshipDisplay.js`.
- Local smoke:
  - local `index.html`, `app.js`, and `src/render/relationshipDisplay.js` served HTTP 200.
  - unauthenticated local app loaded to the login screen with no browser warning/error logs captured.
  - signed-in local workflow smoke is NOT VERIFIED because the local origin did not have a restored session and browser text entry failed in the current browser automation environment.
- Package/upload:
  - blocked pending signed-in local smoke verification.
- Recommended next step:
  - LFES Phase 9B-S signed-in local smoke checkpoint.
  - have the user sign in on the local app if needed, then verify Salem active, Work Orders load, `Hydralic Leak` detail opens, relationship chips/activity feed render, Equipment/Parts/Team/Settings load, and no visible app errors appear.

## Prior Recent Change

Completed LFES Phase 9A app.js subsystem extraction strategy:

- Scope:
  - planning and documentation only.
  - no app code changed.
  - no `app.js` refactor.
  - no functions moved.
  - no rendering/event binding changed.
  - no Supabase SQL/RLS changes.
  - no workflow/business logic changes.
- Created:
  - `docs/LFES/audits/LFES_PHASE_9A_SUBSYSTEM_EXTRACTION_STRATEGY.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/NEXT_STEPS.md`
- Decision:
  - safest next coherent subsystem is read-only work-order relationship display helpers.
  - recommended Phase 9B file: `src/render/relationshipDisplay.js`.
  - recommended helpers: `renderActivityItem`, `renderRelationshipChips`, `relationshipChip`, and `relationshipIcon`.
  - estimated line reduction: approximately 110-140 lines from `app.js`.
- Why:
  - these helpers do not create forms, mutation buttons, delete controls, storage upload controls, public/auth boundaries, Supabase calls, or event-binding selectors.
  - other subsystems remain more coupled to workflow, filters, inventory, onboarding, QR request, or delete behavior.
- Remains blocked:
  - Quick Fix/work-order/request conversion movement.
  - Team invite/default-location movement.
  - public QR movement.
  - parts/equipment detail movement.
  - event binding extraction.
  - broad `renderWorkspace()` movement.
  - Supabase SQL/RLS changes.
- Recommended next step:
  - LFES Phase 9B read-only relationship display extraction only.
  - preserve exact markup and pass dependencies explicitly or through a small adapter.
  - run static checks and signed-in work-order detail smoke after extraction.

## Prior Recent Change

Completed LFES Phase 8H invite acceptance / first-login verification checkpoint:

- Scope:
  - verification and documentation only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no workflow/business logic changes.
  - no broader rollout started.
- Created:
  - `docs/LFES/audits/LFES_PHASE_8H_INVITE_ACCEPTANCE_VERIFICATION.md`
- Updated:
  - `docs/QA_LOG.md`
  - `docs/NEXT_STEPS.md`
- Result:
  - NOT VERIFIED.
  - current browser session was already signed in to the established Taylor Metal Products workspace.
  - current session showed Salem, OR selected and owner/admin-style navigation available.
  - no real invite recipient or approved QA recipient completed the invite flow during this checkpoint.
  - Jeffrey first-login behavior, Manager role assignment after acceptance, and Salem default on first login remain unverified.
- No defect found:
  - Phase 8H did not expose an app error.
  - no code or Supabase change was needed.
- Recommended next step:
  - rerun LFES Phase 8H once Jeffrey or an owner-approved QA recipient accepts the Manager + Salem, OR invite and signs in.
  - verify Taylor Metal Products membership, Manager role visibility, Salem active on first login, no Auburn fallback, reload persistence, and Work Orders/Equipment/Parts/Team loading.

## Prior Recent Change

Completed LFES Phase 8G onboarding action decision and invite correction:

- Scope:
  - approved onboarding action and verification only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no workflow/business logic changes.
  - no broader rollout started.
  - existing operational work was not modified.
- Created:
  - `docs/LFES/audits/LFES_PHASE_8G_ONBOARDING_ACTION.md`
- Updated:
  - `docs/QA_LOG.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Invite action taken:
  - old pending invite for `jeffrey.kinkaid@taylormetal.com` was canceled through Team UI.
  - old invite values were role manager and default location `first available`.
  - new invite was created through Team UI.
  - new invite values:
    - email: `jeffrey.kinkaid@taylormetal.com`
    - role: Manager
    - default location: Salem, OR
    - sent: 2026-05-19, 4:05:43 PM
- Onboarding smoke result:
  - PASS / ACCEPTANCE NOT VERIFIED.
  - Team now shows the corrected pending invite with `Default location: Salem, OR`.
  - actual invite acceptance, first login, and first-load default-location behavior were not completed because that requires the invitee or a controlled test recipient to accept/sign in.
- Additional smoke:
  - Salem remained selected.
  - Work Orders loaded and still showed `Hydralic Leak`, with `Test 1` absent.
  - Equipment loaded and still showed `New thalmann`, with `Test 1` absent.
  - Parts loaded with 0 shown.
  - Requests loaded with 0 active.
  - Team loaded with corrected invite visible.
  - Admin Setup loaded and still showed 15/16 ready.
  - no browser warning/error logs were captured.
- Pilot confidence:
  - improved because the stale `first available` invite was removed.
  - the active pending invite now matches the Salem-first pilot policy.
- Recommended next step:
  - LFES Phase 8H invite acceptance / first-login verification.
  - have the invite recipient accept/sign in, or use a controlled test recipient if owner-approved.
  - verify the new user joins Taylor Metal Products as Manager and first-loads into Salem, OR without falling back to Auburn.

## Prior Recent Change

Completed LFES Phase 8F pilot follow-up and onboarding review:

- Scope:
  - pilot follow-up and onboarding readiness review only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no workflow/business logic changes.
  - no broader rollout started.
- Created:
  - `docs/LFES/audits/LFES_PHASE_8F_PILOT_FOLLOWUP.md`
- Updated:
  - `docs/QA_LOG.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Pilot follow-up result:
  - PASS WITH ONBOARDING DECISIONS REMAINING.
  - session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders remained clean: `Hydralic Leak` visible, `Test 1` absent.
  - Equipment remained clean: `New thalmann` visible, `Test 1` absent.
  - Requests remained clean with 0 active requests.
  - Parts remained 0 shown.
  - Team, Settings, and Admin Setup loaded.
  - no visible app errors or browser warning/error logs were captured.
- Invite/default-location finding:
  - pending invite `jeffrey.kinkaid@taylormetal.com` remains unchanged.
  - role: Manager.
  - default location: `first available`.
  - recommendation: do not use this invite for Salem-first pilot onboarding without correcting/reissuing it with Salem, OR as explicit default.
- QA issue-report visibility:
  - Admin Setup still shows 9 captured historical QA/smoke issue reports.
  - recommendation: keep as evidence for now, but consider future Live / QA / Archived filtering.
- Admin Setup:
  - remains 15/16 ready.
  - Admin delete protection warning documented only.
  - no SQL run and no setup state changed.
- Recommended next step:
  - LFES Phase 8G onboarding action decision.
  - decide whether to cancel/reissue `jeffrey.kinkaid@taylormetal.com` with Salem, OR as default.
  - if approved, perform the invite action through Team UI only and then run invite/default-location smoke.

## Prior Recent Change

Completed LFES Phase 8E approved pilot cleanup pass:

- Scope:
  - approved pilot cleanup/review only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no workflow/business logic changes.
  - no broader rollout started.
  - normal app UI cleanup paths only.
- Created:
  - `docs/LFES/audits/LFES_PHASE_8E_APPROVED_PILOT_CLEANUP.md`
- Updated:
  - `docs/QA_LOG.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Cleaned through normal app UI:
  - `Test 1` work order deleted through Work Order Detail.
  - `Test 1` equipment reviewed in Equipment Detail, confirmed no open work/history/PM/parts dependency, then deleted through Equipment Detail.
- Reviewed only:
  - pending invite `jeffrey.kinkaid@taylormetal.com`: role Manager, default location `first available`; no resend/cancel/change performed.
  - historical QA issue reports: Admin Setup still shows 9 captured; no delete/archive performed.
  - Admin delete protection warning: Admin Setup still 15/16 ready; documented only, no SQL run.
- Left untouched:
  - `Hydralic Leak`
  - `New thalmann`
  - real operational work
  - parts/inventory
  - QR request setup
  - SQL/RLS
  - app code/architecture
- Light smoke result:
  - PASS.
  - live app session restored with Taylor Metal Products.
  - Salem, OR remained active.
  - Work Orders loaded and now show only `Hydralic Leak`.
  - Equipment loaded and now shows only `New thalmann`.
  - Requests loaded with 0 active / 0 converted / 0 all.
  - Parts loaded with 0 shown.
  - Team, Settings, and Admin Setup loaded.
  - Salem public QR request page loaded.
  - no visible app errors or browser warning/error logs were captured.
- Pilot confidence:
  - improved because stale `Test 1` setup records no longer pollute active pilot Work Orders or Equipment.
  - still limited by pending invite default location, historical QA issue reports, and Admin delete protection readiness warning.
- Recommended next step:
  - LFES Phase 8F pilot follow-up / invite and admin issue-queue decision.
  - decide whether to cancel/reissue `jeffrey.kinkaid@taylormetal.com` with Salem, OR as default.
  - decide whether historical QA issue reports remain as evidence or need an approved archive/cleanup path.
  - continue daily light smoke.

## Prior Recent Change

Completed LFES Phase 8D pilot issue-review and limited cleanup decision:

- Scope:
  - pilot-state review and cleanup decision only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no tests or workflows added.
  - no data cleanup performed.
  - no broader rollout started.
- Created:
  - `docs/LFES/audits/LFES_PHASE_8D_PILOT_ISSUE_REVIEW.md`
- Updated:
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Pilot cleanliness result:
  - PASS WITH CLEANUP CANDIDATES.
  - app surfaces loaded cleanly.
  - no missing-script or visible app errors observed.
  - pilot confidence is mixed: operational stability remains good, but visible stale/setup records can confuse pilot users.
- Current active Salem Work Orders:
  - `Hydralic Leak`: likely real operational work; keep unless owner says otherwise.
  - `Test 1`: likely setup/demo or leftover test data; cleanup candidate.
- Current Requests:
  - 0 active.
  - 0 converted.
  - 0 all.
  - clean starting state for QR intake.
- Current Parts:
  - 0 shown.
  - no stale QA parts visible.
- Current Team/invite:
  - Team loads.
  - 5 members shown.
  - pending invite `jeffrey.kinkaid@taylormetal.com` from 5/6/2026 with `Default location: first available`; review before pilot onboarding.
- Current issue reports:
  - Admin Setup shows 9 captured issue reports, mostly historical QA/smoke records.
  - Report Issue works, but the admin issue queue is cluttered for pilot use.
- Admin Setup:
  - 15/16 ready.
  - missing readiness item shown as `Admin delete protection`; reconcile before broader rollout.
- LFES catch added:
  - Pilot queue trust risk from stale setup / QA data.
- Recommended next step:
  - LFES Phase 8E approved pilot cleanup pass.
  - ask for explicit approval before deleting/canceling anything.
  - use normal app UI paths only unless a separate SQL fix is approved.
  - cleanup `Test 1` work order if approved.
  - cleanup `Test 1` equipment only after dependency checks allow it.
  - review/cancel stale pending invite if approved.
  - decide what to do with historical QA issue reports.
  - rerun light pilot smoke after cleanup.

## Prior Recent Change

Completed LFES Phase 8C pilot day-one monitoring and issue triage:

- Scope:
  - monitoring/triage/documentation only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no tests or workflows added.
  - no broader rollout started.
- Created:
  - `docs/LFES/audits/LFES_PHASE_8C_DAY_ONE_MONITORING.md`
- Latest deploy/action evidence:
  - live URL: `https://loufish727.github.io/MaintainOps/`
  - latest observed deploy/repo hash: `4b6185e`
  - `Resource Load Smoke #5` / `Hosted resource-load smoke`: PASS / succeeded.
- Day-one monitoring smoke result:
  - signed-in workspace restored after the normal `Checking team access...` state.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders loaded.
  - Requests loaded.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - Admin Setup loaded.
  - Report Issue modal opened and was canceled without submitting.
  - Salem public QR request page loaded to the Taylor Metal Products / Salem, OR maintenance request form.
  - no visible app errors or missing-script failures observed.
- Pilot observations:
  - no Critical, High, or Medium defects were found.
  - Salem currently shows 2 active work orders, including `Test 1` and `Hydralic Leak`.
  - confirm whether `Test 1` is intentional live/pilot data or leftover setup/test data before treating the active queue as live-only.
  - Parts showed `0 shown`, so the parts RPC path was not re-mutated in this monitoring-only pass.
  - Requests showed a clean starting queue: `0 active`, `0 converted`, `0 all`.
  - Admin Setup showed `15/16 ready`; not a pilot blocker in this pass, but worth reviewing before broader rollout.
- Confidence:
  - pilot confidence improved slightly.
  - controlled pilot can continue under Phase 8B supervised limits.
- Still limited/manual:
  - technician assignment guardrail until isolated technician verification is rerun.
  - password reset email/recovery-link round trip.
  - invite acceptance/default-location onboarding.
  - photo/file upload.
  - inventory as authoritative accounting/purchasing truth.
  - broad multi-company rollout.
- Recommended next step:
  - LFES Phase 8D pilot issue-review and limited cleanup decision.
  - confirm whether `Test 1` should remain in Salem active work.
  - continue daily smoke and issue triage.

## Prior Recent Change

Completed LFES Phase 8B controlled pilot launch checklist execution:

- Scope:
  - checklist execution and light live smoke only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no tests or workflows added.
  - no broader rollout started.
- Created:
  - `docs/LFES/audits/LFES_PHASE_8B_PILOT_LAUNCH_CHECKLIST.md`
- Latest deploy/action evidence:
  - live URL: `https://loufish727.github.io/MaintainOps/`
  - latest observed deploy/repo hash: `4b6185e`
  - `Resource Load Smoke #5` / `Hosted resource-load smoke`: PASS / succeeded.
- Light live smoke result:
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR was selected and shown active.
  - Work Orders loaded.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - Salem public QR request page loaded to the Taylor Metal Products / Salem, OR maintenance request form.
  - no visible app errors or missing-script failures observed.
- Pilot launch checklist result:
  - PASS WITH SUPERVISED LIMITS.
  - controlled Taylor Metal Products / Salem pilot can begin.
  - not approved for broad rollout.
- Required pilot operating rules:
  - keep pilot small.
  - start with Salem, OR.
  - use 1-2 manager/admin users first.
  - keep QR request intake controlled.
  - run daily manual smoke during pilot.
  - review GitHub Actions Resource Load Smoke after pushes/uploads.
  - stop and triage if wrong-location work, auth, role, QR, or inventory trust issues appear.
- Still limited/manual:
  - technician assignment guardrail until isolated technician verification is rerun.
  - password reset email/recovery-link round trip.
  - invite acceptance/default-location onboarding.
  - photo/file upload.
  - inventory as authoritative accounting/purchasing truth.
  - broad multi-company rollout.
- Recommended next step:
  - LFES Phase 8C pilot day-one monitoring and issue triage.
  - verification/observation only unless a real defect is found and separately approved.

## Prior Recent Change

Completed LFES Phase 8A controlled pilot readiness review:

- Scope:
  - readiness review only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no tests added.
  - no workflow/business logic changed.
- Created:
  - `docs/LFES/audits/LFES_PHASE_8A_CONTROLLED_PILOT_READINESS.md`
- Latest automation evidence:
  - `Resource Load Smoke #5` on commit `4b6185e`.
  - result: PASS / Success.
  - no CI errors observed.
- Decision:
  - controlled pilot readiness: CONDITIONAL YES.
  - safe for a small supervised pilot.
  - not ready for broad rollout.
- Safe pilot scope:
  - Taylor Metal Products only.
  - Salem, OR primary location.
  - owner/admin and 1-2 manager/admin users.
  - external QR request submitters for Salem QR.
  - optional trusted technician only after focused technician verification.
  - daily/manual smoke checks and GitHub Actions resource smoke after pushes/uploads.
- Must remain limited/manual:
  - technician assignment guardrail until isolated technician verification is rerun.
  - password reset email/recovery-link round trip.
  - invite acceptance/default-location onboarding.
  - photo/file upload.
  - inventory as authoritative accounting/purchasing truth.
  - broad multi-company rollout.
- Recommended next step:
  - LFES Phase 8B pilot launch checklist execution.
  - verification only unless a real defect is found and separately approved.

## Prior Recent Change

Completed LFES Phase 7F GitHub Actions resource-load smoke implementation:

- Scope:
  - GitHub Actions workflow for existing resource-load smoke only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no credentialed tests added.
  - no mutating tests added.
  - no secrets added.
  - no login automation added.
  - no app records created, edited, or deleted.
- Created:
  - `.github/workflows/resource-load-smoke.yml`
- Modified:
  - `docs/SMOKE_TESTS.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Workflow:
  - triggers on `push`, `pull_request`, and `workflow_dispatch`.
  - uses `actions/checkout@v6`.
  - uses `actions/setup-node@v6` with Node `24`.
  - runs `npm ci`.
  - runs `npm run test:smoke:resources`.
  - requires no GitHub secrets.
- Verification:
  - local workflow sanity check passed.
  - `npm ci` passed.
  - `npm run test:smoke:resources` passed, `1 passed`.
- GitHub push verification:
  - final workflow commit tested: `b84fc41`.
  - `Resource Load Smoke #4` completed successfully.
  - `Hosted resource-load smoke` completed successfully.
  - no CI errors observed.
- Result:
  - Phase 7F workflow is uploaded and verified.
  - app behavior did not change.
  - credentialed and mutating automation remains blocked.
- Recommended next step:
  - use GitHub Actions resource-load smoke as the automatic deployment/resource check.
  - continue keeping login/session/mutating automation blocked until a separate strategy is approved.

## Prior Recent Change

Completed LFES Phase 7E automation readiness decision checkpoint:

- Scope:
  - planning/decision checkpoint only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no credentialed tests added.
  - no mutating tests added.
  - no GitHub Actions workflow added in this phase.
- Decision:
  - recommended next phase is LFES Phase 7F GitHub Actions resource-load smoke implementation only.
  - adding the existing resource-load smoke to GitHub Actions is safe to plan because it requires no secrets, no login, no Supabase data mutation, and no cleanup.
- Value:
  - catches stale/missing GitHub Pages files automatically.
  - protects against upload/package mistakes like missing `src` files.
  - runs the first automation without touching live operational data.
- GitHub Actions status:
  - APPROVED TO PLAN / NEXT IMPLEMENTATION CANDIDATE.
  - not implemented yet.
- Remains manual:
  - technician assignment guardrail.
  - password reset email/recovery-link round trip.
  - file/photo upload.
  - invite email acceptance.
  - mobile Safari/Add-to-Home-Screen behavior.
  - real employee flows.
- Remains blocked:
  - credentialed Playwright tests.
  - mutating Playwright tests.
  - public QR automation.
  - work-order/parts mutation automation.
  - technician automation.
  - password reset automation.
  - more `app.js` architecture extraction until a separate controlled phase is approved.
- Recommended next step:
  - add a minimal GitHub Actions workflow that runs `npm ci` and `npm run test:smoke:resources`.
  - do not add secrets, login automation, or mutating tests.

## Prior Recent Change

Completed LFES Phase 7D Playwright resource-load smoke implementation:

- Scope:
  - first automated smoke test only.
  - hosted resource loading only.
  - no login automation.
  - no records created.
  - no Supabase data mutated.
  - no app behavior changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no secrets/passwords added.
- Created:
  - `package.json`
  - `package-lock.json`
  - `playwright.config.js`
  - `tests/smoke/resource-load.spec.js`
- Modified:
  - `.gitignore`
  - `docs/SMOKE_TESTS.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Command:
  - `npm run test:smoke:resources`
- Test result:
  - PASS, `1 passed`.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, `src/render/displayHelpers.js`, `playwright.config.js`, and `tests/smoke/resource-load.spec.js`.
- Test scope:
  - live GitHub Pages `index.html`.
  - `app.js`.
  - `styles.css`.
  - `supabase-config.js`.
  - all current `src/utils`.
  - all current `src/services`.
  - `src/render/displayHelpers.js`.
- Result:
  - first safe automation slice is in place.
  - app behavior did not change.
  - credentialed and mutating automation remains blocked.
- Recommended next step:
  - either rerun `npm run test:smoke:resources` after the next GitHub Pages upload,
  - or plan LFES Phase 7E session/auth automation strategy only.
  - do not automate login or live data mutation without a separate approval.

## Prior Recent Change

Completed LFES Phase 7C Playwright automation planning:

- Scope:
  - planning/documentation only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no workflow/business logic changes.
  - no Playwright dependency/config/test files added.
- Created:
  - `docs/LFES/audits/LFES_PHASE_7C_PLAYWRIGHT_AUTOMATION_PLAN.md`
- Decision:
  - first safe automation target is hosted resource-load smoke.
  - credentialed/mutating Playwright tests remain blocked.

## Prior Recent Change

Completed LFES Phase 7B live manual smoke-suite run:

- Scope:
  - live GitHub Pages manual smoke run.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no workflow/business logic changes.
  - no Playwright added.
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=phase-7b-smoke-20260519`
- Passed:
  - live signed-in session restore.
  - active location persistence with Salem, OR.
  - manager/admin Quick Fix work order create/open/delete.
  - public QR request submit, Salem manager visibility, and request cleanup.
  - parts create/restock/use/work-order part usage through the RPC-backed path.
  - issue report submit and status update to resolved.
  - Team/role/invite visibility in manager/admin session.
  - required hosted script/resource checks.
  - final console/resource visibility check.
- Not verified:
  - technician assignment guardrail.
  - full password reset email/recovery-link round trip.
- Result:
  - no app code defect was found.
  - code movement remains blocked until a separate implementation phase is approved.

## Prior Recent Change

Completed LFES Phase 7A smoke-test formalization:

- Scope:
  - documentation only.
  - no app code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no workflow/business logic changes.
  - no Playwright added.
- Created:
  - `docs/SMOKE_TESTS.md`
- Documented reusable manual smoke tests for:
  1. Live signed-in session restore
  2. Active location persistence
  3. Manager/admin work order create/open/delete
  4. Technician assignment guardrail
  5. Public QR request submit and manager visibility
  6. Parts restock/use/work-order part usage
  7. Issue report submit/update
  8. Team/invite/role visibility
  9. Password reset/recovery flow
  10. Required script/resource load check
- Result:
  - smoke process is now reproducible enough to support future controlled changes.
  - code movement remains blocked until a separate implementation phase is approved.

## Prior Recent Change

Completed LFES post-Phase-6D live sanity checkpoint and next-direction decision:

- Scope:
  - verification and planning only.
  - no code changed.
  - no `app.js` refactor.
  - no helper/service extraction.
  - no Supabase SQL/RLS changes.
  - no workflow/business logic changes.
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=post-phase-6d-sanity-20260519`.
- Sanity results:
  - live app loaded.
  - signed-in manager/admin-capable session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders loaded.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - required hosted files returned `200`, including `app.js?v=lfes-phase-6d-parts-rpc-1`, all `src/utils`, all `src/services`, and `src/render/displayHelpers.js`.
  - no missing-script or visible app errors observed.
  - no `QA Phase6D RPC` records were visible in Work Orders, Equipment, Parts, Team, or Settings checks.
- Parts RPC path:
  - not re-mutated in this checkpoint because Phase 6D live smoke already verified the RPC and cleanup, and this checkpoint found no suspicious regression requiring new QA data.
- Console note:
  - no actionable console errors were observed through visible app behavior/resource loading.
  - the current browser automation surface did not expose a reliable post-load console log collection for this checkpoint.
- Decision:
  - recommended next phase is LFES smoke-test formalization/planning, not more extraction by default.
  - reason: repeated manual smoke has become the bottleneck and risk reducer; formalizing the smoke matrix will make future tiny refactors and inventory changes safer.
  - restock/inventory-only Use transaction safety remains a known future option, but should wait unless live operations need it.

## Prior Recent Change

Packaged, uploaded, and live verified LFES Phase 6D parts RPC integration:

- Scope:
  - package/upload/live verification only after Phase 6D integration.
  - no additional app logic changes beyond the Phase 6D `addPartUsageToWorkOrder(...)` RPC integration.
  - no `app.js` refactor.
  - no Supabase SQL/RLS changes.
  - no function extraction or new phase started.
- Package:
  - folder: `MaintainOps-github-clean-20260519-112043`.
  - zip: `MaintainOps-github-clean-20260519-112043.zip`.
  - package includes:
    - `app.js`
    - `index.html`
    - `supabase-config.js`
    - `styles.css`
    - `assets/`
    - `src/utils/`
    - `src/services/`
    - `src/render/displayHelpers.js`
- Cache tag:
  - `index.html` now loads `app.js?v=lfes-phase-6d-parts-rpc-1`.
- Static checks:
  - `node --check app.js`: PASS.
  - `node --check supabase-config.js`: PASS.
  - `node --check src/**/*.js`: PASS.
- Deployment:
  - pushed to GitHub Pages repo `loufish727/MaintainOps`.
  - commit: `9b3ba40` (`Deploy LFES Phase 6D parts RPC`).
  - remote initially rejected push because `main` had newer work; deployment folder was rebased on `origin/main`, one cache-tag conflict in `index.html` was resolved in favor of `lfes-phase-6d-parts-rpc-1`, then push succeeded.
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-6d-live-20260519-1121`.
- Live script checks:
  - GitHub Pages served the new app cache tag.
  - required files returned `200`, including `app.js`, `styles.css`, `supabase-config.js`, all `src/utils`, all `src/services`, and `src/render/displayHelpers.js`.
- Live smoke:
  - signed-in manager/admin-capable session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders, Equipment, Parts, Team, and Settings loaded cleanly.
  - no missing-script errors or visible app errors observed.
  - existing QA part/work order from local Phase 6D smoke were used:
    - `QA Phase6D RPC Part 20260519-6D-1779214388252`.
    - `QA Phase6D RPC Work 20260519-6D-1779214388252`.
  - live Work Order Detail part usage succeeded through the deployed app:
    - part went from `29 on hand` to `28 on hand`.
    - Parts Used showed both rows: `21 used - $420.00` and `1 used - $20.00`.
- Cleanup:
  - QA work order permanently deleted through live admin UI.
  - QA part permanently deleted through live admin UI.
  - Parts page returned to `0 shown`.
- Result:
  - Phase 6D is fully closed.
  - intended behavior change is limited to making work-order part usage transaction-safe through the RPC.
  - next recommended phase is a short post-deploy checkpoint or planning the next controlled operational item, not more extraction by default.

## Prior Recent Change

Completed LFES Phase 6D parts RPC app integration:

- Scope:
  - updated only `addPartUsageToWorkOrder(...)` in `app.js`.
  - replaced the old two-step mutation boundary with `supabaseClient.rpc("record_work_order_part_usage", ...)`.
  - did not change restock, part creation/edit/delete, work order creation, rendering, event binding, Supabase SQL/RLS/policies, or unrelated workflows.
- Code path changed:
  - `app.js` line near `addPartUsageToWorkOrder(workOrderId, part, quantity)`.
  - old behavior:
    - insert into `work_order_parts`;
    - then update `parts.quantity_on_hand`.
  - new behavior:
    - call `public.record_work_order_part_usage` with `p_company_id`, `p_work_order_id`, `p_part_id`, and `p_quantity`.
- Static checks:
  - `node --check app.js`: PASS.
  - `node --check supabase-config.js`: PASS.
  - `node --check src/**/*.js`: PASS.
- Local smoke:
  - URL: `http://localhost:4299/index.html?qa_bust=lfes-phase-6d-rpc-20260519`.
  - signed-in QA technician session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - QA part created through the Parts UI:
    - `QA Phase6D RPC Part 20260519-6D-1779214388252`.
  - QA work order created through Quick Fix:
    - `QA Phase6D RPC Work 20260519-6D-1779214388252`.
  - Work Order Detail part usage submitted through the visible Parts Used form.
  - usage row appeared:
    - `QA Phase6D RPC Part 20260519-6D-1779214388252`
    - `21 used - $420.00`.
  - part quantity changed from `50 on hand` to `29 on hand`.
  - no visible app errors or missing-script errors were observed.
- Cleanup:
  - not completed through the technician UI because the technician session did not expose delete controls.
  - do not force cleanup with SQL inside this phase unless separately approved.
- Result:
  - Phase 6D integration passed local smoke.
  - package/upload is approved as the next separate step.

## Prior Recent Change

Completed LFES Phase 6C SQL apply and verification in Supabase:

- Scope:
  - ran only the approved SQL for `public.record_work_order_part_usage`.
  - no app code changed.
  - no `app.js` refactor.
  - no workflow/business logic changed.
  - no Supabase RLS/policy changes beyond creating the approved function/grant.
- Supabase SQL Editor:
  - project: `lbphkzznvvumemdkqoay`.
  - query/tab used: `Record work-order part usage`.
  - URL included SQL id `5b7a680a-f33f-4770-94de-6a58716cced5`.
- Apply result:
  - first browser-entry attempt failed with `42601` near `definerset` because the browser editor dropped whitespace between `security definer` and `set search_path`.
  - corrected compact version of the same approved SQL ran successfully.
  - Supabase returned `Success. No rows returned`.
- Verification results:
  - `rpc_exists`: `true`.
  - `authenticated_can_execute`: `true`.
  - `anon_can_execute`: `false`.
  - `function_config`: `search_path=public, private, pg_temp`.
  - `search_path_pinned`: `true`.
  - `expected_column_count`: `4`.
  - expected columns confirmed:
    - `parts.quantity_on_hand`
    - `parts.unit_cost`
    - `work_order_parts.quantity_used`
    - `work_order_parts.unit_cost_at_use`
  - `rls_enabled_count`: `2`.
  - RLS summary: `parts:true, work_order_parts:true`.
- Result:
  - `public.record_work_order_part_usage` is created and verified.
  - Phase 6D app integration is unblocked as a separate controlled phase.
  - Phase 6D should update only `addPartUsageToWorkOrder(...)` to call the RPC, then run the parts smoke matrix.

## Prior Recent Change

Attempted LFES Phase 6C SQL apply/verification step, but SQL was not run:

- Scope:
  - attempted approved SQL apply/verification only.
  - no SQL was run.
  - no app code changed.
  - no `app.js` refactor.
  - no Supabase RLS/policy changes.
  - no workflow/business logic changed.
- Blocker:
  - this workspace has only the public Supabase URL and publishable anon key in `supabase-config.js`.
  - no `supabase` CLI command is available.
  - no `psql` command is available.
  - no `DATABASE_URL`, Postgres connection string, Supabase admin token, or management token is available in environment variables.
  - the anon app key cannot safely create Postgres functions.
- Result:
  - `public.record_work_order_part_usage` was not created or verified from this workspace.
  - verification SELECTs were not run because the SQL was not applied.
  - Phase 6D app integration remains blocked.
- Next safe step:
  - run the approved SQL from `docs/LFES/audits/LFES_PHASE_6C_PARTS_RPC_SQL_PROPOSAL.md` in Supabase SQL Editor or provide an admin-capable database execution path.
  - then run the verification SELECTs from the same proposal.
  - only after verification passes should Phase 6D app integration begin.

## Prior Recent Change

Completed LFES Phase 6C-R parts RPC SQL review checkpoint:

- Scope:
  - SQL review/documentation only.
  - no SQL was run.
  - no app code changed.
  - no `app.js` refactor.
  - no Supabase RLS/policy changes.
  - no workflow/business logic changed.
- Reviewed:
  - `docs/LFES/audits/LFES_PHASE_6C_PARTS_RPC_SQL_PROPOSAL.md`
- Decision:
  - `APPROVED TO RUN`
- Review results:
  - function signature matches current schema expectations.
  - `work_order_parts` insert columns match current table columns.
  - `parts.quantity_on_hand` exists as an integer and supports the proposed decrement.
  - `work_orders.company_id` and `parts.company_id` checks match current tenant scoping.
  - `private.is_company_member(p_company_id)` is the expected company isolation boundary.
  - `search_path` is pinned.
  - execute is granted only to `authenticated`.
  - `anon` is not granted execute.
  - floor-at-zero behavior matches current app behavior.
  - rollback SQL is included.
  - verification SQL is non-mutating and separated from later authenticated mutation smoke.
  - schema mismatch risks are documented.
- Result:
  - next safe step is applying the approved SQL and running the verification SELECTs only.
  - Phase 6D app integration remains blocked until SQL is applied and verified.
  - architecture extraction remains paused.

## Prior Recent Change

Completed LFES Phase 6C parts transaction RPC SQL proposal:

- Scope:
  - SQL proposal/documentation only.
  - no SQL was run.
  - no app code changed.
  - no `app.js` refactor.
  - no functions extracted.
  - no workflow/business logic changed.
  - no Supabase RLS/policy changes.
  - no RPC was created in Supabase.
- Created:
  - `docs/LFES/audits/LFES_PHASE_6C_PARTS_RPC_SQL_PROPOSAL.md`
- Proposed RPC:
  - `public.record_work_order_part_usage(p_company_id uuid, p_work_order_id uuid, p_part_id uuid, p_quantity integer)`
- Proposed behavior:
  - require authenticated user.
  - require positive quantity.
  - validate company membership with `private.is_company_member(p_company_id)`.
  - validate work order belongs to the company.
  - validate part belongs to the company.
  - lock the part row with `for update`.
  - insert `work_order_parts`.
  - decrement `parts.quantity_on_hand` in the same transaction.
  - preserve current floor-at-zero stock behavior unless strict insufficient-stock blocking is separately approved.
  - grant execute to `authenticated` only.
  - do not grant to `anon`.
- Verification approach documented:
  - non-mutating SELECT checks for function existence, execute grant, expected columns, and RLS enabled.
  - future authenticated app/API smoke after SQL and app integration.
- Result:
  - Phase 6D implementation remains blocked until the SQL proposal is reviewed, approved, applied, and verified.
  - architecture extraction remains paused.

## Prior Recent Change

Completed LFES Phase 6B parts transaction/RPC planning:

- Scope:
  - planning/documentation only.
  - no app code changed.
  - no `app.js` refactor.
  - no functions extracted.
  - no workflow/business logic changed.
  - no Supabase SQL/RLS/policy changes.
  - no RPC created.
- Created:
  - `docs/LFES/audits/LFES_PHASE_6B_PARTS_TRANSACTION_RPC_PLAN.md`
- Current behavior mapped:
  - `createPart(event)` inserts a single `parts` row and is low transaction risk.
  - `restockPart(event)` updates `parts.quantity_on_hand` using client-calculated final quantity.
  - `usePartFromInventory(event)` updates `parts.quantity_on_hand` using client-calculated final quantity and floors at zero.
  - `recordPartUsed(event)` calls `addPartUsageToWorkOrder(...)`.
  - `addPartUsageToWorkOrder(...)` inserts `work_order_parts`, then separately updates `parts.quantity_on_hand`.
  - Quick Fix and full Work Order creation both call `addPartUsageToWorkOrder(...)` after the work order is created.
- Primary transaction gap:
  - work-order part usage and stock decrement are not atomic.
  - a usage row can exist while inventory fails to update.
  - concurrent users can overwrite stock using stale in-memory quantities.
- Recommended design:
  - create a future RPC named `public.record_work_order_part_usage`.
  - it should validate authenticated company membership, work order company, part company, and positive quantity.
  - it should insert the `work_order_parts` row and decrement `parts.quantity_on_hand` in one transaction.
  - it should use database-side locking/arithmetic instead of client-calculated final quantity.
  - it should preserve current floor-at-zero behavior first unless stricter insufficient-stock blocking is separately approved.
  - it should grant execute only to `authenticated`.
  - it should preserve `private.is_company_member(company_id)` as the security boundary.
- Recommended implementation order:
  1. Phase 6C: produce exact copy/paste SQL for the RPC, grants, and schema reload; do not run until approved.
  2. Phase 6D: change only `addPartUsageToWorkOrder(...)` to call the RPC; do not move workflows or service wrappers.
  3. Phase 6E: package/upload and run live smoke for Work Order Detail part usage, Quick Fix part usage, full Work Order part usage, insufficient-stock behavior, and concurrent/stale quantity behavior.
  4. Phase 6F: optional planning for atomic Restock/Inventory Use RPCs.
- Result:
  - implementation remains blocked pending explicit Phase 6C approval.
  - architecture extraction remains paused.

## Prior Recent Change

Completed LFES Phase 6A operational smoke hardening:

- Scope:
  - live operational smoke only.
  - no app code changed.
  - no `app.js` refactor.
  - no service/helper extraction.
  - no rendering/event-binding changes.
  - no Supabase SQL/RLS/policy changes.
- Live build:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-5b-live-20260519-100842`
- Static checks:
  - `node --check app.js`: PASS
  - `node --check supabase-config.js`: PASS
  - `node --check src/**/*.js`: PASS
- Global live verification:
  - signed-in manager/admin-capable session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders, Equipment, Parts, Team, and Settings loaded.
  - no missing-script or visible app errors.
  - browser warning/error logs were empty.
- Technician guardrail proof:
  - used dedicated QA technician account through the authenticated Supabase boundary.
  - created disposable Salem work order `QA Phase6A Tech Guardrail 20260519-6A-1779211250092`.
  - technician self-claim succeeded.
  - technician attempts to assign another user, clear assignment, and vendor-assign were blocked by the DB trigger with `P0001`: `Technicians can only claim unassigned work for themselves.`
  - this proves DB-layer enforcement, not only UI hiding.
- Public QR request validation:
  - Salem public request form loaded for Taylor Metal Products / Salem, OR.
  - disposable request `QA Phase6A QR Smoke 20260519-6A-1779211250092` submitted successfully.
  - manager/admin Requests screen showed it under Active.
  - request cleanup through app delete passed.
- Parts smoke:
  - disposable part `QA Phase6A Part Smoke 20260519-6A-1779211250092` created in Salem.
  - restock, inventory use, and work-order-part recording passed.
  - final quantity behavior matched the expected sequence.
  - cleanup removed QA work order, linked work_order_parts row, QA part, and QA request.
- Operational risk confirmed:
  - work-order part usage and part stock decrement are still separate database operations.
  - this worked in the smoke path, but future parts transaction RPC planning remains recommended before heavier live inventory use.
- Result:
  - broader live pilot confidence improved.
  - architecture extraction remains paused.
  - next controlled work should be planning or implementing the parts transaction/RPC approach, or formalizing repeatable smoke tests, before deeper workflow extraction.

## Prior Recent Change

Completed LFES Phase 5C readiness decision:

- Scope:
  - planning/decision only.
  - no code changed.
  - no render helpers moved.
  - no `app.js` refactor.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Evidence reviewed:
  - Phase 5A render-helper extraction plan.
  - Phase 5B smoke and live deployment results.
  - Phase 4B technician assignment guardrail status.
  - parts transaction/inventory gap.
  - public QR request validation status.
  - remaining high-risk render/event/state contracts.
- Decision:
  - do not continue display-helper extraction now.
  - another tiny extraction is technically possible, but not the highest-value next move during live testing.
- Reason:
  - Phase 5B proved the extraction process works for tiny display helpers.
  - the next helper group is more coupled: message helpers, activity helpers, command cards, relationship chips, and request photo preview all carry session/state/relationship/storage assumptions.
  - higher-value operational risks remain open.
- Recommended next phase:
  - LFES Phase 6A operational smoke hardening.
  - first target: technician assignment DB-layer guardrail proof with disposable QA work order.
- Follow-on priorities:
  1. live public QR request end-to-end validation.
  2. parts use/restock/work-order part usage smoke.
  3. parts transaction RPC planning only after inventory smoke confirms current risk.
- Remains blocked:
  - Phase 5C implementation/code extraction.
  - further render-helper extraction.
  - workflow renderer extraction.
  - event binding extraction.
  - mutation extraction.
  - public QR submit movement.
  - Quick Fix/work-order/request conversion movement.
  - delete/storage/photo/document movement.
  - auth/session/company/location movement.
  - Supabase SQL/RLS changes.

## Prior Recent Change

Completed LFES Phase 5B package/upload/live verification:

- Scope:
  - packaged and uploaded stable LFES Phase 5B build.
  - no Phase 5C started.
  - no additional render helpers moved.
  - no `app.js` refactor.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Package:
  - `MaintainOps-github-clean-20260519-100842`
  - `MaintainOps-github-clean-20260519-100842.zip`
- Package contents verified:
  - `assets`
  - `src`
  - `src/render/displayHelpers.js`
  - all `src/utils/*.js`
  - all `src/services/*.js`
  - `app.js`
  - `index.html`
  - `README.md`
  - `styles.css`
  - `supabase-config.js`
- Static checks:
  - passed for `app.js`, `supabase-config.js`, all current utils, all current services, and `src/render/displayHelpers.js`.
- Deploy:
  - repo: `loufish727/MaintainOps`
  - branch: `main`
  - commit: `3439f56`
  - commit message: `Deploy LFES phase 5B display helpers`
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-5b-live-20260519-100842`
- Live verification:
  - GitHub Pages served updated `index.html`.
  - `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` returned HTTP 200.
  - `app.js?v=password-recovery-1` returned HTTP 200.
  - signed-in manager/admin session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained selected.
  - Settings loaded.
  - Team loaded and role guide rendered.
  - My Work loaded.
  - Work Orders loaded.
  - Equipment loaded.
  - Parts loaded.
  - no visible app errors.
  - no browser warning/error logs observed.
- Result:
  - Phase 5B is deployed and live-verified.
  - no behavior change observed beyond intended helper extraction.
  - Phase 5C remains blocked pending separate approval.

## Prior Recent Change

Completed LFES Phase 5B manager/admin Settings smoke checkpoint:

- Scope:
  - manager/admin Settings verification only.
  - no code changed.
  - no Phase 5C started.
  - no package/upload performed.
  - no additional render helpers moved.
  - no `app.js` refactor.
  - no Supabase SQL/RLS/policy changes.
- Browser/session:
  - local URL tested: `http://localhost:4294/index.html?qa_bust=lfes-phase-5b-smoke-20260519`
  - signed-in manager/admin-capable Taylor Metal Products session.
- Verified:
  - session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained selected.
  - Admin Setup and Settings were visible.
  - `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` loaded.
  - Settings loaded cleanly.
  - Team loaded cleanly.
  - Team role guide rendered Technician, Manager, and Admin descriptions.
  - My Work loaded.
  - Work Orders loaded.
  - no visible app errors.
  - no browser error/warning logs observed.
- Notes:
  - `renderMetric` currently has no active call sites in `app.js`, so no `.metric.dashboard-card` elements were expected or observed.
  - My Work and Work Orders work-summary/gauge surfaces rendered normally.
- Result:
  - Phase 5B signed-in smoke is complete for technician and manager/admin coverage.
  - no behavior change observed.
  - Phase 5B packaging/upload is approved.
  - Phase 5C remains blocked pending separate approval.

## Prior Recent Change

Attempted LFES Phase 5B manager/admin Settings smoke checkpoint:

- Scope:
  - manager/admin Settings verification only.
  - no code changed.
  - no Phase 5C started.
  - no package/upload performed.
  - no additional render helpers moved.
  - no `app.js` refactor.
  - no Supabase SQL/RLS/policy changes.
- Browser:
  - current in-app browser URL: `http://localhost:4294/index.html?qa_bust=lfes-phase-5b-smoke-20260519`
- Result:
  - NOT VERIFIED.
- Reason:
  - browser was on the `Welcome Back` login screen.
  - no manager/admin signed-in session was active.
- Verified while logged out:
  - `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` was present.
  - no browser warning/error logs were observed.
- Still required:
  - sign in as manager/admin.
  - verify Taylor Metal Products loads.
  - verify Salem, OR remains active.
  - verify Settings loads.
  - verify Team loads and role guide renders.
  - verify no missing-script, visible app, or actionable console errors.
- Packaging/upload:
  - still blocked until manager/admin Settings smoke passes or is explicitly waived.

## Prior Recent Change

Completed LFES Phase 5B signed-in smoke checkpoint:

- Scope:
  - signed-in browser verification only.
  - no code changed.
  - no Phase 5C started.
  - no package/upload performed.
  - no additional render helpers moved.
  - no `app.js` refactor.
  - no Supabase SQL/RLS/policy changes.
- Browser/session:
  - local URL tested: `http://localhost:4294/index.html?qa_bust=lfes-phase-5b-smoke-20260519`
  - signed-in session was the QA technician Gmail session.
- Verified:
  - session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained selected.
  - display helper script `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` loaded.
  - My Work loaded.
  - Work Orders loaded.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Team role guide rendered Technician, Manager, and Admin descriptions.
  - no visible app errors.
  - no browser error/warning logs observed.
- Not fully verified:
  - Settings screen load.
  - reason: the active signed-in session is technician-role and no exact Settings navigation button was visible.
  - before packaging/upload, either verify Settings with a manager/admin session or explicitly waive that role-specific smoke item.
- Result:
  - Phase 5B appears stable for the signed-in technician session.
  - no behavior change observed.
  - packaging/upload is blocked only by the unverified manager/admin Settings smoke item.

## Prior Recent Change

Completed LFES Phase 5B render display-helper extraction:

- Scope:
  - created one small render helper module.
  - moved only `renderMetric`, `renderInsight`, and `renderRoleGuide`.
  - no workflow renderers moved.
  - no event handlers moved.
  - no mutations moved.
  - no Supabase SQL/RLS/policies changed.
  - no business logic changed.
- Created:
  - `src/render/displayHelpers.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Static checks:
  - `node --check app.js`: PASS
  - `node --check supabase-config.js`: PASS
  - `node --check src/utils/constants.js`: PASS
  - `node --check src/utils/dom.js`: PASS
  - `node --check src/utils/formatting.js`: PASS
  - `node --check src/services/locationsService.js`: PASS
  - `node --check src/services/profilesService.js`: PASS
  - `node --check src/services/partsService.js`: PASS
  - `node --check src/services/assetsService.js`: PASS
  - `node --check src/services/workOrdersService.js`: PASS
  - `node --check src/services/companyService.js`: PASS
  - `node --check src/services/appIssueReportsService.js`: PASS
  - `node --check src/render/displayHelpers.js`: PASS
- Local resource check:
  - `http://localhost:4294/index.html?qa_bust=lfes-phase-5b-display-2` returned 200.
  - `index.html` includes `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` before `app.js`.
  - all local scripts referenced by `index.html` returned HTTP 200, including utils, services, `src/render/displayHelpers.js`, and `app.js`.
- Runtime smoke status:
  - signed-in browser smoke is NOT VERIFIED in this pass.
  - reason: no direct browser automation tool was exposed in this turn, and local Playwright was unavailable in the Node REPL.
  - before packaging/upload, verify signed-in session restore, Taylor Metal Products, Salem active location, dashboard metrics, Team role guide, Work Orders, Equipment, Parts, Team, and Settings.
- Behavior:
  - no intentional behavior change.
  - expected behavior should be unchanged because only pure display helpers moved.

## Prior Recent Change

Completed LFES Phase 5A low-risk render-helper extraction planning:

- Scope:
  - planning/documentation only.
  - no app code changes.
  - no render behavior changes.
  - no event-binding changes.
  - no workflow handler movement.
  - no mutation movement.
  - no Supabase SQL/RLS/policy changes.
- Created:
  - `docs/LFES/audits/LFES_PHASE_5A_RENDER_HELPER_EXTRACTION_PLAN.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Safest first extraction candidates:
  - `renderMetric`
  - `renderInsight`
  - `renderRoleGuide`
- Safe later candidates:
  - `renderMessageBubble`
  - `renderMessageList`
  - `renderMessageNavBadge`
  - `renderActivityItem`
  - `renderEmailHelperCommandCard`
  - `renderRelationshipChips`
  - `renderMaintenanceRequestPhoto`
- Important catch:
  - `renderWorkloadStrip` looked like a simple display helper, but it calls `renderGaugeReadout`.
  - `renderGaugeReadout` emits `data-status-filter` behavior and reads `activeStatusFilter`, so gauge helpers are not safe first extraction targets.
  - pagination helpers, relationship chips, and request photo preview also carry hidden state/storage/event assumptions.
- Recommendation:
  - next implementation, if approved, should be LFES Phase 5B render display-helper extraction only.
  - move only `renderMetric`, `renderInsight`, and `renderRoleGuide` into a small render helper module.
  - run static checks and signed-in smoke tests afterward.
  - workflow/render/mutation/event extraction remains blocked.

## Prior Recent Change

Completed a partial LFES Phase 4B technician-role guardrail verification:

- Scope:
  - technician runtime verification only.
  - no app code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no rendering/event-binding changes.
  - no Supabase SQL/RLS/policy changes.
- Browser/session:
  - local HTTP preview at `http://localhost:4294/index.html?qa_bust=password-recovery-2`.
  - signed-in QA technician session for the invited Gmail account.
- Verified:
  - Taylor Metal Products loaded.
  - Salem, OR was active.
  - location selector was disabled.
  - Mobile tech helper text was shown.
  - visible workspace navigation did not include Admin Setup or Settings.
  - Team invite/add-member/role-save controls were absent.
  - Team showed the signed-in QA account as Technician.
  - Work Orders loaded for Salem, OR.
  - Work Orders showed status buttons but no visible assignment dropdowns.
  - no missing-script or browser console errors were observed.
- Not fully verified:
  - DB/RLS/trigger denial for assigning another user, clearing assignment, or stealing another assignment.
  - reason: browser automation could not type into the local Quick Fix form, and the browser tool could not read local Supabase auth storage needed for a safe direct REST denial probe.
  - no disposable QA work order was created in this partial pass.
- Current conclusion:
  - technician UI restrictions and location lock are behaving correctly in this session.
  - the assignment guardrail still needs one final DB-layer proof using a disposable QA work order.

## Prior Recent Change

Added MaintainOps password reset/recovery UI:

- Scope:
  - auth recovery UI only.
  - no Supabase SQL/RLS/policy changes.
  - no service-wrapper extraction.
  - no `app.js` refactor beyond the auth recovery path.
  - no workflow/business logic changes outside password reset/recovery.
- Added:
  - login-screen `Forgot password?` action.
  - reset email request screen using `supabaseClient.auth.resetPasswordForEmail`.
  - recovery-link landing screen using Supabase recovery tokens.
  - new password confirmation validation.
  - password update through `supabaseClient.auth.updateUser`.
  - recovery URL cleanup after update/back/new-reset actions.
- Important:
  - do not paste recovery links/tokens into chat or docs.
  - Supabase Auth redirect URLs must include the deployed GitHub Pages URL for live reset links to return to the app.
  - real emailed reset-link end-to-end verification remains needed after upload/deploy.
- Updated:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Verified:
  - static checks passed for `app.js`, `supabase-config.js`, all `src/utils/*.js`, and all `src/services/*.js`.
  - local HTTP preview showed `Forgot password?` on login.
  - local HTTP preview with `#type=recovery` showed `Set New Password`, a safe invalid-link message, disabled update without secure tokens, and a path to send a new reset link.
  - clean GitHub Pages package created and verified:
    - `MaintainOps-github-clean-20260519-093021`
    - `MaintainOps-github-clean-20260519-093021.zip`
    - includes `assets`, `src`, `app.js`, `index.html`, `README.md`, `styles.css`, and `supabase-config.js`.
    - packaged `index.html` references `app.js?v=password-recovery-1`.
- Not verified:
  - live GitHub Pages reset email and recovery-token update path, pending upload/deploy and Supabase redirect URL check.

## Prior Recent Change

Completed LFES Phase 4C technician test-account setup planning:

- Scope:
  - planning only.
  - no app code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no rendering/event-binding changes.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Findings:
  - an existing real technician member is visible: `Lee Gaede`.
  - do not use Lee's live account for QA unless he is intentionally participating.
  - an existing `Louie Technician Test` member is visible, but its current visible role was Manager, not Technician.
  - `Louie Technician Test` may be the safest existing account only if the user approves changing it to Technician and credentials are available.
  - Team invite flow exists and supports Role plus Default location.
  - Invite acceptance copies role/default location into `company_members`.
- Recommended safe setup path:
  1. Prefer a dedicated QA technician account with a clear email/name, such as `qa.tech.guardrail+20260519@maintainops.test` or another user-controlled test email.
  2. Create the account through the normal Team invite/sign-up path when possible.
  3. Invite as `Technician` with Default location `Salem, OR`.
  4. The user should enter/retain the password privately; do not paste passwords into docs or chat.
  5. If the app sign-up/invite path cannot create the auth user, use Supabase Auth/admin UI only to create the auth user, then accept/use the invite; no SQL is needed for the preferred path.
- Alternative setup path:
  - temporarily change `Louie Technician Test` from Manager to Technician through Team only if explicitly approved and credentials are known.
  - after verification, either leave it as Technician if that is its intended role or restore its prior Manager role if approved.
- QA data strategy:
  - create disposable work orders prefixed `QA Phase4B Tech Guardrail <token>`.
  - use Salem, OR unless intentionally testing another branch.
  - include one unassigned QA work order to verify allowed "Assign to me" behavior.
  - include one QA work order assigned to another user or outside vendor only if needed to verify denied reassignment/clear behavior.
  - clean up all QA records through the app after testing.
- Phase 4B remains blocked until a real technician session exists.

## Prior Recent Change

Attempted LFES Phase 4B technician-role guardrail verification, stopped because the active browser session was not a technician session:

- Scope:
  - technician-role guardrail verification only.
  - no app code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no rendering/event-binding changes.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Live session checked:
  - `https://loufish727.github.io/MaintainOps/`
- Result:
  - NOT VERIFIED.
- Reason:
  - active signed-in session showed manager/admin capabilities.
  - Admin Setup and Settings were visible.
  - Team role editors, Save Role controls, Create Invite, and Add Member controls were visible.
  - therefore this was not a real technician-role session.
- Action taken:
  - stopped before attempting assignment denial.
  - did not fake the technician guardrail using manager/admin credentials.
- Console/resource status:
  - no missing-script errors observed during the session check.
  - no visible app errors observed during the session check.
  - no actionable MaintainOps console errors observed during the session check.
- Current conclusion:
  - Phase 4B still requires a real technician login/session.
  - DB/RLS/trigger enforcement for technician unauthorized assignment remains unproven.

## Prior Recent Change

Completed LFES Phase 4A live smoke and technician assignment guardrail verification:

- Scope:
  - live runtime smoke verification only.
  - no app code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no rendering/event-binding changes.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=phase-4a-live-smoke-20260519`
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - all current `src/utils/*.js`
  - all current `src/services/*.js`
- Verified:
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained selected after reload.
  - app did not fall back to Auburn.
  - live utility/service/app scripts loaded with no missing-script errors.
  - Work Orders, Equipment, Parts, Team, and Settings opened cleanly.
  - manager/admin Quick Fix create -> Work Order Detail -> normal delete path passed.
  - manager/admin assignment control changed a disposable QA work order owner to Louie Andrade and saved.
  - disposable QA work orders were deleted through the normal app path.
  - no visible app errors or actionable MaintainOps console errors were observed.
- QA records created and removed:
  - `QA Phase4A Smoke 1779206383647 work order`
  - `QA Phase4A Assign 1779206409169 work order`
- Not verified:
  - technician assignment guardrail under a real technician-role session.
  - reason: no real technician-role signed-in browser session or technician credentials were available during this checkpoint.
- Current conclusion:
  - live pilot confidence improved for manager/admin runtime continuity.
  - architecture work should not claim the technician guardrail is fully proven until a real technician session is tested.

## Prior Recent Change

Completed LFES Phase 3F implementation-readiness decision:

- Scope:
  - decision/planning only.
  - no app code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no rendering/event-binding changes.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Created:
  - `docs/LFES/audits/LFES_PHASE_3F_IMPLEMENTATION_READINESS_DECISION.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Decision:
  - recommended next implementation phase is LFES Phase 4A live smoke and technician assignment guardrail verification.
  - no code extraction is approved yet.
  - low-risk render helper extraction is technically possible later, but not the highest-value next move during live testing.
  - workflow, mutation, render, event binding, auth/session/company/location, public QR, delete/storage/photo/document, and Supabase SQL/RLS changes remain blocked.
- Required Phase 4A smoke focus:
  - session restore.
  - Taylor Metal Products load.
  - active location reload persistence.
  - Work Orders load.
  - manager/admin safe QA work order create/open/delete.
  - technician assignment guardrails.
  - manager/admin assignment controls.
  - console/missing script check.

## Prior Recent Change

Completed LFES Phase 3E render ownership map:

- Scope:
  - analysis/documentation only.
  - no app code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no rendering/event-binding changes.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Created:
  - `docs/LFES/audits/LFES_PHASE_3E_RENDER_OWNERSHIP_MAP.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Findings:
  - mapped 83 major `render*` functions in `app.js`.
  - highest-risk renderers include `renderWorkspace`, auth/public request renderers, Quick Fix, work order detail/list/create, request conversion cards, delete zones, storage upload forms, Team/admin forms, PM/procedure/checklist renderers, and parts/equipment mutation forms.
  - low-risk future render-helper candidates include pure display helpers such as metrics, insights, message bubbles, activity rows, relationship chips, email helper card, request photo preview, and some pagination/option helpers after smoke coverage.
  - documented a real-world LFES catch that render output is a behavior contract.
- Recommendation:
  - keep workflow/render extraction blocked.
  - next controlled phase should be LFES Phase 3F implementation-readiness decision, planning only.

## Prior Recent Change

Completed LFES Phase 3D state ownership map:

- Scope:
  - analysis/documentation only.
  - no app code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no rendering/event-binding changes.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Created:
  - `docs/LFES/audits/LFES_PHASE_3D_STATE_OWNERSHIP_MAP.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Findings:
  - mapped 100 top-level mutable state variables in `app.js`.
  - categorized state as company-scoped, location-scoped, user/session-scoped, view/UI-scoped, workflow-scoped, pending action/confirmation-scoped, and cache/list-scoped.
  - highest-risk state includes `supabaseClient`, `session`, `activeCompanyId`, `activeLocationId`, `activeSection`, selected detail IDs, Quick Fix routing state, pending delete IDs, work/request/assets/parts lists, and work-order relationship maps.
  - lower-risk future state-module candidates include notices, simple filters, page values, parts source manager visibility, and grouped readiness flags after call sites are mapped.
- Recommendation:
  - keep workflow extraction blocked.
  - next controlled phase should be LFES Phase 3E render ownership map, planning only.

## Prior Recent Change

Completed LFES Phase 3C smoke-test matrix and contract guard planning:

- Scope:
  - analysis/documentation only.
  - no app code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no rendering/event-binding changes.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Created:
  - `docs/LFES/audits/LFES_PHASE_3C_SMOKE_TEST_MATRIX.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Findings:
  - defined 12 smoke tests for high-risk workflows: Quick Fix, work order lifecycle, request conversion, public QR request visibility, location persistence, parts use/restock, PM generation, procedure checklist, issue reports, Team/invite/roles, technician assignment guardrails, and photo/document upload paths.
  - documented high-risk DOM IDs, form IDs, `data-*` attributes, visual behavior hooks, and global pending-state dependencies.
  - identified first automated Playwright candidates.
  - documented a real-world LFES catch for missing workflow-specific smoke matrix before handler extraction.
- Recommendation:
  - keep workflow extraction blocked.
  - next controlled phase should be LFES Phase 3D state ownership map, planning only.

## Prior Recent Change

Completed LFES Phase 3B event-contract inventory:

- Scope:
  - analysis/documentation only.
  - no app code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no rendering/event-binding changes.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Created:
  - `docs/LFES/audits/LFES_PHASE_3B_EVENT_CONTRACT_INVENTORY.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Findings:
  - mapped 126 listener registrations inside `bindWorkspaceEvents()`.
  - mapped 381 raw DOM contract references across listener selectors, rendered IDs, and `data-*` attributes.
  - found important event contracts outside `bindWorkspaceEvents()`, including auth, public QR intake, public QR print, workspace load retry, company create, and the signed-in `#request-form` document-level submit path.
  - high-risk contracts include Quick Fix, full work order create/edit/status/complete/delete, request conversion, public QR submit, location switch, safety check sync, delete-confirm pairs, PM generation, procedure checklist results, Team/invite role flows, and storage/photo/document forms.
- Recommendation:
  - keep workflow extraction blocked.
  - next controlled phase should be LFES Phase 3C smoke-test matrix and contract guard planning before moving any workflow handler.

## Prior Recent Change

Completed LFES Phase 3A rendering/event/state architecture mapping:

- Scope:
  - analysis/documentation only.
  - no app code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no Supabase SQL/RLS/policy changes.
  - no workflow/business logic changes.
- Created:
  - `docs/LFES/audits/LFES_PHASE_3A_ARCHITECTURE_MAP.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Findings:
  - `renderWorkspace()` remains the broad rendering owner and emits most DOM/event contracts.
  - `bindWorkspaceEvents()` remains the broad event-binding owner and directly calls most workflow mutations.
  - global state remains concentrated in `app.js` across session/company/location, queues, requests, assets, parts, PM, procedures, messages, relationship maps, pending deletes, filters, pages, and UI modes.
  - remaining mutations are mostly workflow orchestration boundaries, not simple raw table calls.
  - high-risk zones include Quick Fix, work-order mutations, request conversion, delete/storage cleanup, PM generation, procedures/checklists, public QR submit, active-location persistence, and Team/admin flows.
- Smoke-test discipline:
  - documented the TEST/STEPS/EXPECTED/RESULT/NOTES format for future implementation phases.
  - appended a Phase 3A documentation-only smoke checkpoint to `docs/QA_LOG.md`.
- Real-world LFES catches documented:
  - Auburn first-load default-location risk.
  - app-client 0-row admin data-fix attempt.
  - `renderWorkspace()` / `bindWorkspaceEvents()` responsibility concentration.
- Recommendation:
  - pause deeper workflow extraction.
  - next controlled phase should be LFES Phase 3B event-contract inventory, planning only.

## Prior Recent Change

Completed LFES Phase 2L approved data-only default-location fix and live verification:

## Prior Recent Change

Attempted LFES Phase 2L approved data-only default-location fix through the app client; admin SQL execution was required:

## Prior Recent Change

Completed LFES Phase 2L default-location policy decision and safe fix planning:

- Scope:
  - planning/documentation only.
  - no code changes.
  - no SQL run.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no Supabase SQL/RLS/policy changes.
- Updated:
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Recommended default-location policy:
  - Salem, OR should be the Taylor Metal Products no-saved-location default for existing Taylor users unless a specific user has an intentionally different default.
  - Alphabetical first-location fallback should not be treated as an operational default.
- Current data gap:
  - observed Taylor `company_members.default_location_id` values are null.
  - with no saved scoped/legacy browser location, the app falls through to first loaded location.
  - locations are ordered by name, so Auburn becomes the accidental first-location fallback.
- Alternatives reviewed:
  - targeted `company_members.default_location_id` data fix,
  - company-level default location field,
  - onboarding prompt requiring user selection,
  - preserve current behavior.
- Recommended lowest-risk fix:
  - data-only update: set Taylor users with null `default_location_id` to Salem, OR.
  - do not overwrite users who already have a non-null default.
  - no app behavior change required because current code already honors member defaults before first-location fallback.
- SQL prepared but not run:

```sql
-- LFES Phase 2L recommended data-only default-location fix.
-- Purpose: make Salem, OR the Taylor Metal Products no-saved-location default
-- for existing Taylor users who do not already have an explicit default.
-- This does not override any user's scoped saved browser location.

update public.company_members
set default_location_id = '328d9ebb-7c4d-4847-a9bb-4aa0619fec43'
where company_id = '0875d674-7f07-4493-8668-701d192f4421'
  and default_location_id is null;

select
  cm.company_id,
  cm.user_id,
  cm.role,
  cm.default_location_id,
  l.name as default_location_name
from public.company_members cm
left join public.locations l on l.id = cm.default_location_id
where cm.company_id = '0875d674-7f07-4493-8668-701d192f4421'
order by cm.created_at;
```

- Verification after approval/run:
  - clear scoped/legacy active-location keys in a signed-in browser,
  - reload live app,
  - confirm Taylor Metal Products opens in Salem, OR,
  - confirm scoped Salem key is written,
  - confirm intentional later location switching still persists.
- Behavior changed:
  - none. Planning/docs only.
- Deeper workflow extraction remains blocked until default-location policy is approved and verified.

## Prior Recent Change

Completed LFES Phase 2K default-location/onboarding verification checkpoint:

- Scope:
  - analysis/QA/documentation only.
  - no code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no Supabase SQL/RLS/policy changes.
  - no location logic changes.
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Active-location precedence confirmed:
  1. scoped saved user/company key: `maintainops.activeLocationId:<user_id>:<company_id>`
  2. legacy saved key: `maintainops.activeLocationId`
  3. in-memory `activeLocationId`
  4. `company_members.default_location_id`
  5. first loaded location
- Live signed-in identifiers:
  - company id: `0875d674-7f07-4493-8668-701d192f4421`
  - user id: `8f6e618f-bf06-46a7-925b-1001d7d30228`
  - Auburn, WA id: `6cdc08a7-1ce8-48f1-9d5c-ec7969fd6d45`
  - Salem, OR id: `328d9ebb-7c4d-4847-a9bb-4aa0619fec43`
- Root cause of Auburn first-load behavior:
  - current signed-in admin membership has `default_location_id: null`.
  - no saved scoped/legacy location means the app reaches first-location fallback.
  - `locationsService.listLocations(...)` orders by name.
  - Auburn is first alphabetically, so it becomes the fallback and is persisted into the scoped key.
- Test results:
  - fresh/no saved location keys -> Auburn, WA.
  - legacy Salem only -> Salem, OR and migrated to scoped key.
  - scoped Salem -> Salem, OR.
  - conflicting legacy Auburn + scoped Salem -> Salem, OR.
  - legacy Auburn only -> Auburn, WA and migrated to scoped key.
  - intentional Salem restore + reload -> Salem, OR.
- Expected or bug:
  - technically expected under current code.
  - operationally a default-location/onboarding bug risk if Salem should be the intended default for Taylor users.
- Invite/default-location finding:
  - not influencing this admin test account because its member default is null.
  - real second-user invite/default-location QA is still needed.
- Safe fix proposal:
  - immediate data policy fix: set intended users' `company_members.default_location_id` to Salem, OR.
  - product fix: add an explicit company/onboarding default-location rule instead of relying on first alphabetical location.
- Behavior changed:
  - none. Analysis/QA/docs only.
- Deeper workflow extraction remains blocked until location default/onboarding behavior is settled.

## Prior Recent Change

Completed LFES Phase 2J mutation-boundary review checkpoint:

- Scope:
  - analysis/documentation only.
  - no code changes.
  - no wrapper extraction.
  - no `app.js` refactor.
  - no Supabase SQL/RLS/policy changes.
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Current architectural state:
  - LFES utility extraction and low-risk read-wrapper extraction improved clarity.
  - Phase 2I app issue report insert/update wrappers are a good safe-boundary example.
  - `app.js` remains the operational controller for auth/session, active company/location, rendering, event binding, permissions, validation, notices, reloads, and most workflow mutations.
- Current measured shape:
  - `app.js` is about 10,514 lines.
  - `app.js` has about 388 function declarations.
  - raw scan shows about 107 Supabase-related call patterns.
  - raw scan shows about 76 mutation/RPC/storage-style patterns before excluding false-positive DOM calls.
  - based on the Phase 2H verified mutation count, about 67 true mutation-boundary call sites remain after Phase 2I moved 2 app issue report mutations.
- Review conclusion:
  - wrapper boundaries are clearer than before.
  - extraction still helps when it targets pure helpers, read wrappers, and isolated raw table mutations.
  - extraction pace should slow now because more mutation wrappers could fragment the architecture without reducing workflow coupling.
- Major remaining risks:
  - public QR submit,
  - invite/default-location onboarding,
  - active location persistence/defaulting,
  - Quick Fix and work-order mutations,
  - request conversion,
  - delete/storage/photo cleanup,
  - PM/procedure/checklist mutations,
  - messages,
  - `renderWorkspace()` and `bindWorkspaceEvents()` concentration.
- Operational continuity note:
  - fresh local/live debug profiles initially selected Auburn, WA.
  - Salem hard-save worked after intentional Salem selection and reload.
  - Auburn first-load should be verified as default-location/onboarding behavior before deeper mutation extraction.
- Recommended next controlled phase:
  - LFES Phase 2K default-location/onboarding verification checkpoint, analysis/QA only.
- Behavior changed:
  - none. Analysis/docs only.
- Next implementation phase remains blocked pending explicit approval.

## Prior Recent Change

Packaged, uploaded, and live verified stable LFES Phase 2I build on GitHub Pages:

- Scope:
  - package/upload/live verification only.
  - no next phase started.
  - no additional wrappers extracted.
  - no `app.js` refactor.
  - no Supabase SQL/RLS/policy changes.
  - no auth, workflow, rendering, or unrelated business-logic changes.
- Package created:
  - folder: `MaintainOps-github-clean-20260518-142305`
  - zip: `MaintainOps-github-clean-20260518-142305.zip`
- Package contents confirmed:
  - `assets`
  - `src`
  - `app.js`
  - `index.html`
  - `README.md`
  - `styles.css`
  - `supabase-config.js`
  - all `src/utils` files.
  - all `src/services` files, including updated `src/services/appIssueReportsService.js`.
- Static checks:
  - source checks passed for 12 JavaScript files.
  - package checks passed for 12 JavaScript files.
- GitHub Pages deployment:
  - commit: `efd31566b4179d295ccdc4dee73636d033f01d49`
  - live URL tested: `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2i-live-20260518-1429`
- Live verification:
  - Phase 2I script tags served correctly.
  - `MaintainOpsAppIssueReportsService` exposed list/create/update wrappers.
  - user signed in on live Edge verification window.
  - Taylor Metal Products loaded.
  - Work Orders, Equipment, Parts, Team, Settings, and Admin Setup opened.
  - Report Issue opened.
  - existing issue reports loaded.
  - safe live test issue report was submitted and appeared under Salem, OR:
    - `LFES Phase 2I live wrapper smoke 1779139666427`
  - safe live test issue report status was updated to `reviewing`.
  - no missing-script errors.
  - no visible app errors.
  - no page errors/actionable console errors during signed-in live checks.
- Location note:
  - fresh live debug profile initially selected Auburn, WA.
  - after intentionally selecting Salem, OR, reload preserved Salem, OR through the scoped hard-save key.
  - unexpected first-load Auburn default remains a separate default-location/onboarding data verification item.
- Behavior changed:
  - no intended behavior change beyond the previously approved Phase 2I wrapper extraction.
- Next phase remains blocked pending explicit approval.

## Prior Recent Change

Completed LFES Phase 2I app issue report mutation-wrapper extraction:

- Scope:
  - used existing `src/services/appIssueReportsService.js`.
  - moved only the lowest-risk `app_issue_reports` insert/update wrappers.
  - no public QR movement.
  - no Quick Fix/work-order/request-conversion/delete/storage/photo/PM/procedure/message/auth/company/location movement.
  - no Supabase SQL/RLS/policy changes.
- Modified:
  - `src/services/appIssueReportsService.js`
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Exact wrappers moved:
  - `createAppIssueReportRecord(supabaseClient, payload)`
  - `updateAppIssueReportStatusRecord(supabaseClient, companyId, reportId, nextStatus)`
- Intentionally left in `app.js`:
  - Report Issue form handling,
  - submit button state,
  - validation payload assembly,
  - notices,
  - reloads,
  - rendering,
  - permission checks.
- Static checks:
  - passed for `app.js`, `supabase-config.js`, all utility files, and all service files.
- Browser/debug:
  - local app loaded from `http://127.0.0.1:4196/index.html?qa_bust=lfes-phase-2i-issue-report-mutations-1`.
  - Taylor Metal Products loaded.
  - Work Orders, Equipment, Parts, Team, Settings, and Admin Setup opened.
  - Report Issue opened.
  - existing reported issues list loaded.
  - safe test issue report was submitted and appeared in Reported App Issues:
    - `LFES Phase 2I wrapper smoke 1779139232957`
  - safe test issue report status was updated to `reviewing`.
  - no missing script errors.
  - no page errors/actionable console errors during signed-in checks.
- Location note:
  - fresh debug browser initially selected Auburn, WA.
  - after intentionally selecting Salem, OR, reload preserved Salem, OR through the scoped hard-save key.
  - treat unexpected first-load Auburn default as a separate default-location/onboarding data verification item, not a Phase 2I wrapper regression.
- Behavior changed:
  - no intended behavior change beyond moving raw `app_issue_reports` insert/update calls behind wrappers.
- Next implementation phase remains blocked pending explicit approval.

## Prior Recent Change

Completed LFES Phase 2H mutation-boundary planning only:

- Scope:
  - planning/documentation only.
  - no code changes.
  - no functions moved.
  - no service files created.
  - no `app.js` refactor.
  - no Supabase policy/SQL changes.
- Created:
  - `docs/LFES/audits/LFES_PHASE_2H_MUTATION_BOUNDARY_PLAN.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Mutation-boundary findings:
  - true remaining Supabase/RPC/storage mutation-boundary call sites: 69.
  - related storage signed URL read boundaries tracked separately: 4.
  - risk counts:
    - Critical: 32
    - High: 24
    - Medium: 11
    - Low: 2
- Lowest-risk mutation candidate:
  - app issue report insert/update wrappers.
- Highest-risk mutation areas:
  - public anonymous QR submit,
  - invite acceptance/default-location onboarding,
  - Quick Fix and work-order creation/update/status/assignment,
  - request conversion,
  - delete workflows,
  - PM generation,
  - procedure/template changes,
  - comments/photos/parts/checklist relationships,
  - storage uploads/removes/photo metadata.
- Recommended next controlled phase:
  - LFES Phase 2I app issue report mutation wrapper extraction only, if explicitly approved.
- Must remain blocked:
  - public QR submit,
  - request conversion,
  - Quick Fix/work-order mutations,
  - delete workflows,
  - storage/photo/document uploads/removes,
  - PM generation,
  - procedure checklist behavior,
  - messages,
  - auth/session/company/location workflows,
  - Supabase SQL/RLS changes.
- Behavior changed:
  - none. Planning/docs only.
- Next implementation phase remains blocked pending explicit approval.

## Prior Recent Change

Completed LFES post-Phase-2G remaining `app.js` risk review:

- Scope:
  - analysis/documentation only.
  - no code changes.
  - no service extraction.
  - no `app.js` refactor.
  - no Supabase policy/SQL changes.
  - no auth, workflow, rendering, or business-logic changes.
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Review findings:
  - `app.js` remains about 9,600 lines with about 388 function declarations and about 100 remaining Supabase/RPC/storage call sites.
  - The dominant remaining risk is workflow mutation plus render/event/global-state coupling, not simple read queries.
  - `renderWorkspace()` and `bindWorkspaceEvents()` remain major reviewability bottlenecks.
  - Remaining high-risk areas include auth/session, company/location persistence, public QR submit, request conversion, Quick Fix/work-order mutations, PM/procedure mutations, messages, storage, delete guards, and work-order relationship workflows.
- Additional read-only extraction:
  - still possible, but no longer the best next move by default.
  - PM/procedure/public-link reads are the lower-risk read candidates.
  - request/message/work-order relationship/storage reads need more focused QA before extraction.
- Recommended next single controlled phase at that time:
  - LFES Phase 2H mutation-boundary planning only.
  - no implementation.
  - map remaining mutations by risk before moving any write path.
  - This has now been completed by the most recent Phase 2H planning pass above.
- Behavior changed:
  - none. Analysis/docs only.
- Next implementation phase remains blocked pending explicit approval.

## Prior Recent Change

Packaged, uploaded, and live verified stable LFES Phase 2G build on GitHub Pages:

- Scope:
  - package/upload/live verification only.
  - no next phase started.
  - no additional services extracted.
  - no `app.js` refactor.
  - no Supabase policy/SQL changes.
  - no auth, workflow, rendering, or business-logic changes.
- Package created:
  - folder: `MaintainOps-github-clean-20260518-135557`
  - zip: `MaintainOps-github-clean-20260518-135557.zip`
- Package contents confirmed:
  - `assets`
  - `src`
  - `app.js`
  - `index.html`
  - `README.md`
  - `styles.css`
  - `supabase-config.js`
- Package `src` contents confirmed:
  - all `src/utils` files,
  - all current `src/services` files,
  - `src/services/appIssueReportsService.js`.
- Packaged `index.html` confirmed:
  - `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1`
  - `app.js?v=lfes-phase-2g-issue-reports-1`
- Static checks passed in source and package for `app.js`, `supabase-config.js`, all utils, and all current service files.
- GitHub Pages commit pushed:
  - `62d368c0ca27c4b2ab82d6710ad1aeee5ed69d83`
- Live URL verified:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2g-live-20260518-1359`
- Live resource checks passed after GitHub Pages propagation:
  - `index.html` served the Phase 2G script tags,
  - `app.js?v=lfes-phase-2g-issue-reports-1` returned HTTP 200,
  - `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1` returned HTTP 200.
- Signed-in live verification passed in accessible Edge debug window:
  - user signed into the live GitHub Pages build,
  - Taylor Metal Products loaded,
  - `appIssueReportsService` was present on `window`,
  - the debug profile initially had Auburn saved; after switching to Salem, OR and reloading, Salem remained active,
  - Work Orders loaded and showed Salem work including `Hydralic Leak`,
  - Equipment loaded,
  - Parts loaded,
  - Team loaded,
  - Settings loaded,
  - Admin Setup loaded,
  - issue report area loaded,
  - Report Issue form opened,
  - no missing script errors or visible app errors were found.
- Console/runtime note:
  - only captured error was a GitHub Pages `favicon.ico` 404.
  - no actionable MaintainOps runtime/script error was captured.
- Behavior changed:
  - no behavior change beyond deploying the already verified Phase 2G read-wrapper extraction.
- Next phase remains blocked pending explicit approval.

## Prior Recent Change

Completed LFES Phase 2G `appIssueReportsService` read-only extraction:

- Scope:
  - `appIssueReportsService` only.
  - one read wrapper only.
  - no app issue report mutations moved.
  - no requests, public QR submit, request conversion, PM/procedure logic, messages, work-order relationship loaders, storage/photo logic, auth/session/company/location workflows, or Supabase SQL/RLS/policies changed.
- Created:
  - `src/services/appIssueReportsService.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Exact function moved:
  - `listAppIssueReports(supabaseClient, companyId)`
- Exact reads moved out of `app.js`:
  - `supabaseClient.from("app_issue_reports").select("*").eq("company_id", activeCompanyId).order("created_at", { ascending: false })`
  - both the main company-data issue report read and the issue-report reload read now call the wrapper.
- Updated `index.html` script loading:
  - added `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1`
  - bumped `app.js` to `app.js?v=lfes-phase-2g-issue-reports-1`
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all current service files including `appIssueReportsService`.
- Local script/resource verification passed:
  - local HTTP check returned `200` for `index.html`, `app.js?v=lfes-phase-2g-issue-reports-1`, `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1`, existing service scripts, and utility scripts.
- Signed-in browser/debug passed in accessible Edge debug window:
  - local URL: `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2g-issue-reports-accessible`
  - signed-in session restored after user login.
  - Taylor Metal Products loaded.
  - Phase 2G scripts loaded:
    - `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1`
    - `app.js?v=lfes-phase-2g-issue-reports-1`
  - The fresh debug profile initially had Auburn saved; after intentionally switching to Salem, OR and reloading, Salem remained active.
  - Work Orders loaded and showed Salem, OR work including `Hydralic Leak`.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - Admin Setup loaded.
  - Issue report/admin area loaded:
    - `App issue reports` showed ready,
    - Report Issue opened,
    - Reported App Issues rendered existing captured reports.
  - no missing script errors or visible app errors were found.
  - no runtime error events were captured during the checkpoint.
- Behavior changed:
  - no intended behavior change.
  - no behavior change observed in static/resource verification.
- Next phase remains blocked pending explicit approval.

## Prior Recent Change

Completed LFES Phase 2G remaining service-wrapper planning only:

- Scope:
  - planning/documentation only.
  - no app behavior changes.
  - no new service files.
  - no `app.js` refactor.
  - no Supabase policy/SQL changes.
  - no functions moved.
- Created:
  - `docs/LFES/audits/LFES_PHASE_2G_REMAINING_SERVICE_PLAN.md`
- The plan maps remaining Supabase access in `app.js` after Phase 2F:
  - maintenance requests,
  - preventive schedules,
  - procedure templates/steps,
  - public request links,
  - app issue reports,
  - messages/message threads,
  - work-order comments/photos/parts/events/step results,
  - storage signed URLs/uploads/deletes,
  - workflow mutations that should stay blocked.
- Safest recommended next extraction:
  - `src/services/appIssueReportsService.js`
  - read-only only,
  - one wrapper: `listAppIssueReports(supabaseClient, companyId)`.
- Still blocked pending explicit approval:
  - maintenance request reads/counts,
  - public QR intake/submit,
  - request conversion,
  - PM generation/mutations,
  - procedure mutations/checklist movement,
  - messages,
  - work-order relationship loaders,
  - storage helpers/uploads/deletes,
  - auth/session/company/location workflows,
  - any Supabase SQL/RLS changes.
- Behavior changed:
  - none. Docs/planning only.
- Phase 2G implementation remains blocked until the user explicitly approves the recommended narrow target.

## Prior Recent Change

Packaged, uploaded, and live verified the stable LFES Phase 2F build on GitHub Pages:

- Scope:
  - package/upload only.
  - no Phase 2G.
  - no additional service extraction.
  - no `app.js` refactor, Supabase policy/SQL, auth, workflow, rendering, or business-logic changes.
- Package created:
  - folder: `MaintainOps-github-clean-20260518-132834`
  - zip: `MaintainOps-github-clean-20260518-132834.zip`
- GitHub Pages commit pushed:
  - `5e79f64d4fc1aa12cd952d9d291bff1fa19209c2`
- Package and live scripts confirmed:
  - all `src/utils` files,
  - all current `src/services` files,
  - `src/services/companyService.js?v=lfes-phase-2f-company-1`,
  - `app.js?v=lfes-phase-2f-company-1`.
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all service files.
- Live URL verified:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2f-live-20260518-1329`
- Signed-in live visual verification:
  - Taylor Metal Products loaded,
  - Salem, OR remained active after reload,
  - Settings loaded and showed Company Settings,
  - Work Orders, Equipment, Parts, Team, and Settings navigation buttons were visible and responsive in the mobile-width live pane,
  - no missing-script failure or visible app error was observed.
- Phase 2G remains blocked pending explicit user approval.

## Prior Recent Change

Completed LFES Phase 2F company read service extraction:

- Scope:
  - `companyService` reads only.
  - no code beyond read-wrapper extraction.
  - no Supabase policy/SQL changes.
  - no auth/session startup, company switching, invite acceptance, default location onboarding, active location persistence, mutations, rendering, or event binding moved.
- Created:
  - `src/services/companyService.js`
- Moved read helpers:
  - `getMyCompanies(supabaseClient)`
  - `listUserCompanyMemberships(supabaseClient, userId)`
  - `listUserCompanyMembershipsLegacy(supabaseClient, userId)`
  - `listCompaniesByIds(supabaseClient, companyIds)`
  - `listCompaniesByIdsLegacy(supabaseClient, companyIds)`
- Updated `index.html` to load:
  - `src/services/companyService.js?v=lfes-phase-2f-company-1`
  - `app.js?v=lfes-phase-2f-company-1`
- Company behavior intentionally left in `app.js`:
  - dedupe,
  - role normalization,
  - active company selection,
  - active/default location handling,
  - logo URL loading,
  - error messaging and fallbacks.
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all current service files including `companyService`.
- Local controlled browser file-load check passed:
  - `companyService` global loaded,
  - all existing service globals loaded,
  - `app.js?v=lfes-phase-2f-company-1` loaded,
  - login screen rendered without a startup ReferenceError,
  - no actionable console errors were captured.
- Signed-in Phase 2F browser/debug passed on local HTTP:
  - `http://localhost:4192/index.html?qa_bust=lfes-phase-2f-company-http-localhost-1779129000000`
  - Taylor Metal Products loaded.
  - Work Orders, Equipment, Parts, Team, and Settings opened cleanly.
  - Utility/service scripts and `app.js?v=lfes-phase-2f-company-1` returned HTTP 200.
  - The local `localhost` origin initially had Auburn saved from prior QA state; after selecting Salem, OR and reloading, Salem remained selected.
  - No missing-script or visible app error was observed. Direct dev-console logs were not available through the current tool bridge.
- Phase 2G or packaging/upload should wait for explicit user approval.

## Prior Recent Change

Ran the short LFES post-fix checkpoint after the deployed Salem hard-save fix:

- Scope:
  - verification checkpoint only.
  - no code changes.
  - no Phase 2F.
  - no additional service extraction.
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all current service files.
- Live GitHub Pages script verification passed against:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=location-hard-save-post-fix-checkpoint-20260518`
- Confirmed live `index.html` still serves:
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`
  - `app.js?v=location-hard-save-1`
- Confirmed all utility/service scripts and `app.js?v=location-hard-save-1` returned HTTP 200.
- Signed-in live app visual verification:
  - Taylor Metal Products loaded,
  - location selector showed `Salem, OR`,
  - Work Orders loaded and showed Salem in the Work Orders header,
  - Equipment, Parts, Team, and Settings loaded,
  - the app did not visually revert to Auburn.
- No missing-script failure was found.
- No obvious app error screen appeared. Direct browser dev-console logs were not available through the current tool bridge.
- Phase 2F can proceed only after explicit approval.

## Prior Recent Change

Packaged and deployed the location hard-save precedence fix to GitHub Pages:

- Scope:
  - package/upload the current local build containing the Salem location hard-save precedence fix.
  - no Phase 2F service extraction.
  - no unrelated `app.js` refactor.
  - no Supabase policy/SQL/auth/workflow/rendering/business-logic changes.
- Package created:
  - folder: `MaintainOps-github-clean-20260518-094217`
  - zip: `MaintainOps-github-clean-20260518-094217.zip`
- GitHub Pages commit pushed:
  - `70d01e5c0051cc1ed40352c18c75f0553b170657`
- Package contains exactly the expected upload set:
  - `assets`
  - `src`
  - `app.js`
  - `index.html`
  - `README.md`
  - `styles.css`
  - `supabase-config.js`
- Confirmed package includes all extracted utilities/services through `workOrdersService`.
- Confirmed packaged and live `index.html` references:
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`
  - `app.js?v=location-hard-save-1`
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all service files.
- Live GitHub Pages resource verification passed:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=location-hard-save-live-20260518-0943`
  - all utility/service scripts and `app.js?v=location-hard-save-1` returned HTTP 200.
- Signed-in live browser verification was completed visually after the user confirmed the in-app browser was signed in:
  - Taylor Metal Products loaded,
  - location selector showed `Salem, OR`,
  - Work Orders loaded and continued to show Salem in the Work Orders header,
  - Equipment, Parts, Team, and Settings loaded,
  - the app did not visually switch back to Auburn,
  - no obvious error screen or missing-script failure was visible.
- Phase 2F remains blocked pending explicit approval.

## Prior Recent Change

Fixed active location hard-save precedence so Salem stays selected after reopen:

- Root cause:
  - `storedLocationForLoadedCompany()` checked invite/member default location before the old legacy saved location key.
  - If the scoped per-user/company location key did not exist yet, a saved Salem location under the old key could lose to the member default before migration.
- Fix:
  - Location selection now resolves in this order:
    1. scoped per-user/company saved location,
    2. legacy saved location,
    3. current in-memory location,
    4. invite/member default location,
    5. first available location fallback.
- Updated `index.html` app cache tag:
  - `app.js?v=location-hard-save-1`
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all service files.
- Focused browser verification passed at:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=location-hard-save-1779127000000`
- Verification:
  - legacy saved location seeded as Salem, OR,
  - scoped location key removed before load,
  - app opened with Salem, OR selected,
  - Salem migrated into the scoped per-user/company key,
  - legacy global location key cleared,
  - no console errors.
- Important note:
  - Prior LFES automated checks forced Auburn in temporary browser profiles to make verification repeatable. Auburn should not be treated as the app default.

## Prior Recent Change

Completed LFES Phase 2E work order read/count/search service extraction:

- Scope: `workOrdersService` read/count/search helpers only.
- Created `src/services/workOrdersService.js`.
- `workOrdersService` contains only:
  - `selectWorkOrders(supabaseClient, selectClause, options)`,
  - `countWorkOrdersQuery(supabaseClient)`,
  - `fetchWorkOrderById(supabaseClient, companyId, workOrderId, selectClause)`,
  - `fetchWorkOrdersByIds(supabaseClient, params)`,
  - `scopedWorkOrderSearchQuery(supabaseClient, params)`,
  - `fetchPagedSearchRows(buildQuery, onRows, maxRows, pageSizeLimit)`.
- Moved raw work-order read/count/search query portions out of `app.js` while leaving app state and filters in place.
- Updated `index.html` to load:
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`,
  - `app.js?v=lfes-phase-2e-work-orders-1`.
- Intentionally not moved:
  - work order creation,
  - Quick Fix,
  - request conversion,
  - status changes,
  - assignment guardrails,
  - delete workflows,
  - comments/photos/parts/steps relationship loading or mutations,
  - work-order filter, queue, sort, dashboard state logic,
  - rendering,
  - event binding,
  - auth/session startup,
  - Supabase policies/RLS/SQL.
- Company isolation/RLS was preserved:
  - work-order read helpers still require explicit `companyId` where they scope rows,
  - app-side filters still apply `.eq("company_id", activeCompanyId)` through service query builders,
  - no Supabase SQL or policy files were touched.
- Static checks passed:
  - `node --check app.js`,
  - `node --check supabase-config.js`,
  - `node --check src/utils/constants.js`,
  - `node --check src/utils/dom.js`,
  - `node --check src/utils/formatting.js`,
  - `node --check src/services/locationsService.js`,
  - `node --check src/services/profilesService.js`,
  - `node --check src/services/partsService.js`,
  - `node --check src/services/assetsService.js`,
  - `node --check src/services/workOrdersService.js`.
- Local signed-in browser/debug passed at:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2e-work-orders-1779126200000`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - Work Orders, Equipment, Parts, Settings, and Team opened,
  - `workOrdersService` and updated `app.js` scripts loaded,
  - no missing script errors,
  - no console errors.
- Work Order Detail verification:
  - Auburn had zero visible work orders in current filters,
  - created temporary QA Quick Fix `QA LFES phase2E detail 1779122164459`,
  - verified Work Order Detail opened,
  - deleted the temporary QA work order through the app.
- Behavior changed: no behavior change observed.
- Next phase remains blocked pending explicit user approval.

## Prior Recent Change

Packaged, uploaded, and live verified the stable LFES Phase 2D build on GitHub Pages:

- Scope: package, deploy, and live verification only.
- Package created:
  - folder: `MaintainOps-github-clean-20260518-092721`
  - zip: `MaintainOps-github-clean-20260518-092721.zip`
- GitHub Pages commit pushed to `main`: `692d50c98d4fe27519a9390868b8bbf077131f06`.
- No app behavior changed.
- No `app.js` refactor was performed.
- No Phase 2E work was started.
- No Supabase policies, SQL, auth, workflow, rendering, or business logic changed.
- Package folder and zip include:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
  - `src/services/partsService.js`
  - `src/services/assetsService.js`
- Confirmed live GitHub Pages loads:
  - `src/utils/constants.js?v=lfes-utils-1`
  - `src/utils/dom.js?v=lfes-utils-1`
  - `src/utils/formatting.js?v=lfes-utils-1`
  - `src/services/locationsService.js?v=lfes-phase-2a-locations-1`
  - `src/services/profilesService.js?v=lfes-phase-2b-profiles-1`
  - `src/services/partsService.js?v=lfes-phase-2c-parts-1`
  - `src/services/assetsService.js?v=lfes-phase-2d-assets-1`
  - `app.js?v=lfes-phase-2d-assets-1`
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all current service files.
- Live signed-in verification passed at:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2d-live-verify-20260518-0929`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - Equipment, Work Orders, Parts, Settings, and Team opened,
  - `assetsService` and updated `app.js` scripts loaded,
  - no missing script errors,
  - no failing live script/resource URLs after focused resource check,
  - no actionable MaintainOps console error.
- Behavior changed: no behavior change observed.
- Phase 2E remains blocked pending explicit user approval.

## Prior Recent Change

Completed LFES Phase 2D assets read service extraction:

- Scope: `assetsService` reads only.
- Created `src/services/assetsService.js`.
- `assetsService` contains only:
  - `listAssets(supabaseClient, companyId)`.
- Moved the company-scoped equipment/assets list query out of `loadCompanyData()`:
  - from `supabaseClient.from("assets").select("*").eq("company_id", activeCompanyId).order("name")`,
  - to `listAssets(supabaseClient, activeCompanyId)`.
- Updated `index.html` to load:
  - `src/services/assetsService.js?v=lfes-phase-2d-assets-1`,
  - `app.js?v=lfes-phase-2d-assets-1`.
- Intentionally not moved:
  - asset mutations,
  - add/edit/delete equipment workflows,
  - equipment delete guards,
  - equipment-driven routing logic,
  - location persistence logic,
  - work order creation or assignment logic,
  - asset search/filter/hierarchy UI helpers,
  - rendering,
  - event binding,
  - auth/session startup,
  - Supabase policies/RLS/SQL.
- Company isolation/RLS was preserved:
  - `listAssets()` requires explicit `companyId`,
  - the query remains scoped by `.eq("company_id", companyId)`,
  - no Supabase SQL or policy files were touched.
- Static checks passed:
  - `node --check app.js`,
  - `node --check supabase-config.js`,
  - `node --check src/utils/constants.js`,
  - `node --check src/utils/dom.js`,
  - `node --check src/utils/formatting.js`,
  - `node --check src/services/locationsService.js`,
  - `node --check src/services/profilesService.js`,
  - `node --check src/services/partsService.js`,
  - `node --check src/services/assetsService.js`.
- Local signed-in browser/debug passed at:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2d-assets-1779125600000`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - Equipment, Work Orders, Parts, Settings, and Team opened,
  - `assetsService` and updated `app.js` scripts loaded,
  - no missing script errors,
  - no console errors.
- Behavior changed: no behavior change observed.
- Phase 2E remains blocked pending explicit user approval.

## Prior Recent Change

Ran LFES checkpoint after Phase 2C parts read extraction:

- Scope: verification checkpoint only.
- No code changed during the checkpoint.
- No `assetsService` was created.
- No `app.js` refactor was performed.
- No Supabase policies, SQL, auth, workflow, rendering, or business logic changed.
- Static checks passed:
  - `node --check app.js`,
  - `node --check supabase-config.js`,
  - `node --check src/utils/constants.js`,
  - `node --check src/utils/dom.js`,
  - `node --check src/utils/formatting.js`,
  - `node --check src/services/locationsService.js`,
  - `node --check src/services/profilesService.js`,
  - `node --check src/services/partsService.js`.
- Confirmed `index.html` still loads:
  - `src/services/partsService.js?v=lfes-phase-2c-parts-1`,
  - `app.js?v=lfes-phase-2c-parts-1`.
- Local signed-in browser/debug passed at:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2c-checkpoint-1779125200000`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - Parts, Work Orders, Equipment, Settings, and Team opened,
  - `partsService` and updated `app.js` scripts loaded,
  - no missing script errors,
  - no console errors.
- Behavior changed: no behavior change observed.
- Phase 2D `assetsService` reads-only remains blocked pending explicit user approval.

## Prior Recent Change

Completed LFES Phase 2C parts read service extraction:

- Scope: `partsService` reads only.
- Created `src/services/partsService.js`.
- `partsService` contains only:
  - `listParts(supabaseClient, companyId)`.
- Moved the company-scoped parts list query out of `loadCompanyData()`:
  - from `supabaseClient.from("parts").select("*").eq("company_id", activeCompanyId).order("name")`,
  - to `listParts(supabaseClient, activeCompanyId)`.
- Updated `index.html` to load:
  - `src/services/partsService.js?v=lfes-phase-2c-parts-1`,
  - `app.js?v=lfes-phase-2c-parts-1`.
- Intentionally not moved:
  - parts mutations,
  - add/edit/delete part workflows,
  - part source rename workflow,
  - part stock/inventory business rules,
  - `work_order_parts` logic,
  - `part_documents` storage/metadata logic,
  - rendering,
  - event binding,
  - auth/session startup,
  - Supabase policies/RLS/SQL.
- Company isolation/RLS was preserved:
  - `listParts()` requires explicit `companyId`,
  - the query remains scoped by `.eq("company_id", companyId)`,
  - no Supabase SQL or policy files were touched.
- Static checks passed:
  - `node --check app.js`,
  - `node --check supabase-config.js`,
  - `node --check src/utils/constants.js`,
  - `node --check src/utils/dom.js`,
  - `node --check src/utils/formatting.js`,
  - `node --check src/services/locationsService.js`,
  - `node --check src/services/profilesService.js`,
  - `node --check src/services/partsService.js`.
- Local signed-in browser/debug passed at:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2c-parts-1779124800000`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - Parts, Work Orders, Equipment, Settings, and Team opened,
  - `partsService` and updated `app.js` scripts loaded,
  - no missing script errors,
  - no console errors.
- Behavior changed: no behavior change observed.
- Phase 2D remains blocked pending explicit user approval.

## Prior Recent Change

Uploaded and verified the current stable LFES Phase 2A/2B build on GitHub Pages:

- Scope: deploy and live verification only.
- Package deployed: `MaintainOps-github-clean-20260518-090136`.
- GitHub Pages commit pushed to `main`: `2310126d934e836a0fea2b08fc95374e934aea4b`.
- No app behavior changed.
- No `app.js` refactor was performed.
- No `partsService` was created.
- No Supabase policies, SQL, auth, workflow, rendering, or business logic changed.
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2ab-upload-live-20260518-0915`
  - Quick Fix retry: `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2ab-qf-retry-20260518-0918`
- Confirmed live GitHub Pages loads:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
  - `app.js?v=lfes-phase-2b-profiles-1`
- Signed-in live verification passed:
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - Work Orders, Equipment, Parts, Settings, and Team opened cleanly,
  - service globals were present,
  - no missing utility/service script errors were found.
- Safe workflow smoke passed:
  - created a QA Quick Fix work order,
  - opened the created work order detail,
  - deleted the created QA work order through the app.
- Follow-up resource check found no failing live script/resource URLs.
- No actionable MaintainOps console error was found.
- Result: hosted LFES Phase 2A/2B build is verified.
- Phase 2C `partsService` remains blocked until the user explicitly approves continuing.

## Prior Recent Change

Packaged the current stable LFES Phase 2A/2B build for GitHub Pages upload:

- Scope: packaging verification only.
- No app behavior changed.
- No `app.js` refactor was performed.
- No `partsService` was created.
- No Supabase policies, SQL, auth, workflow, rendering, or business logic changed.
- Ran `tools/create-github-upload.ps1`.
- Created clean package:
  - folder: `MaintainOps-github-clean-20260518-090136`
  - zip: `MaintainOps-github-clean-20260518-090136.zip`
- Result: package was ready for GitHub Pages upload and was later deployed in commit `2310126d934e836a0fea2b08fc95374e934aea4b`.

## Prior Recent Change

Ran the full LFES Debug Protocol checkpoint after Phase 2A/2B service-wrapper extractions:

- No code changed during the checkpoint.
- No `partsService` was created.
- Static checks passed:
  - `node --check app.js`,
  - `node --check supabase-config.js`,
  - `node --check src/utils/constants.js`,
  - `node --check src/utils/dom.js`,
  - `node --check src/utils/formatting.js`,
  - `node --check src/services/locationsService.js`,
  - `node --check src/services/profilesService.js`.
- Confirmed required files exist:
  - all three `src/utils` files,
  - `src/services/locationsService.js`,
  - `src/services/profilesService.js`.
- Confirmed `index.html` loads:
  - utility scripts,
  - `locationsService`,
  - `profilesService`,
  - `app.js?v=lfes-phase-2b-profiles-1`.
- Reviewer tags remain sparse:
  - 7 total LFES reviewer tags across `app.js` and `supabase/schema.sql`.
- Company isolation/RLS was not touched:
  - no Supabase SQL/policy edits,
  - `private.is_company_member(company_id)` unchanged,
  - service wrappers keep explicit `companyId`.
- Local signed-in browser/debug passed at:
  - `http://127.0.0.1:4187/index.html?qa_bust=lfes-phase-2ab-full-debug-1779119916417`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - active location Auburn, WA loaded,
  - Quick Fix visible,
  - all utility and service globals loaded,
  - Work Orders opened,
  - Equipment opened,
  - Parts opened,
  - Settings / Company Settings opened,
  - Team opened,
  - Mobile tech visible,
  - Technician, Manager, and Admin role labels visible,
  - Invite area rendered,
  - no setup/load errors,
  - no console errors.
- Safe test work order smoke passed:
  - created Quick Fix `QA LFES phase2AB checkpoint 1779119916417`,
  - verified Work Order Detail opened,
  - deleted it through `Delete Work Order` -> `Permanently Delete`,
  - verified the title disappeared after delete.
- Behavior changed: no behavior change observed.
- Phase 2C remains blocked pending user approval.

## Prior Recent Change

Completed LFES Phase 2B profile/member read service extraction:

- Created `src/services/profilesService.js`.
- `profilesService` contains only read wrappers:
  - `listProfiles(supabaseClient, companyId)`,
  - `listCompanyMembers(supabaseClient, companyId)`,
  - `listTeamInvites(supabaseClient, companyId)`,
  - `listTeamInvitesLegacy(supabaseClient, companyId)`.
- Updated `index.html` to load `src/services/profilesService.js?v=lfes-phase-2b-profiles-1` before `app.js?v=lfes-phase-2b-profiles-1`.
- Updated `app.js` to call the new service wrapper for:
  - profile reads in `loadProfiles()`,
  - company member reads in `loadMembers()`,
  - team invite reads and legacy fallback reads in `loadTeamInvites()`.
- Intentionally not moved:
  - auth/session startup,
  - invite acceptance,
  - invite creation/cancel mutations,
  - role update mutations,
  - default location onboarding logic,
  - company switching,
  - active location persistence,
  - rendering,
  - event binding,
  - workflow/business logic,
  - Team readiness/fallback decisions,
  - Supabase policies/RLS/SQL.
- Static checks passed:
  - `node --check app.js`,
  - `node --check supabase-config.js`,
  - `node --check src/utils/constants.js`,
  - `node --check src/utils/dom.js`,
  - `node --check src/utils/formatting.js`,
  - `node --check src/services/locationsService.js`,
  - `node --check src/services/profilesService.js`.
- Local signed-in browser/debug passed at:
  - `http://127.0.0.1:4186/index.html?qa_bust=lfes-phase-2b-local-rerun-1779119712218`
- Browser/debug verified:
  - signed-in session restored,
  - Taylor Metal Products loaded,
  - active location Auburn, WA loaded,
  - Work Orders, Equipment, Parts, Settings, and Team opened,
  - Mobile tech visible,
  - Technician, Manager, and Admin role labels visible,
  - Pending Invite / Invite Teammate area rendered,
  - no setup/load errors,
  - no MaintainOps console errors.
- Behavior changed: no intended behavior change. This was a read-only service-wrapper extraction.
- Phase 2C is blocked pending user approval. Recommended next target is parts read/simple scoped mutations, or pause for a full Debug Protocol first.

## Prior Recent Change

Completed LFES Phase 2A `locationsService` extraction:

- Created `src/services/locationsService.js`.
- `locationsService` contains only:
  - `listLocations(supabaseClient, companyId)`,
  - `createLocation(supabaseClient, companyId, name)`.
- Updated `index.html` to load `src/services/locationsService.js?v=lfes-phase-2a-locations-1` before `app.js?v=lfes-phase-2a-locations-1`.
- Updated `app.js` to call the new service wrapper for:
  - location list load in `loadCompanyData()`,
  - location insert in `createLocation()`.
- Intentionally not moved:
  - active location persistence,
  - auth/session startup,
  - rendering,
  - event binding,
  - workflow/business logic,
  - location readiness/error handling,
  - Supabase policies/RLS/SQL.
- Static checks passed:
  - `node --check app.js`,
  - `node --check supabase-config.js`,
  - `node --check src/utils/constants.js`,
  - `node --check src/utils/dom.js`,
  - `node --check src/utils/formatting.js`,
  - `node --check src/services/locationsService.js`.
- Local signed-in browser/debug passed at:
  - `http://127.0.0.1:4184/index.html?qa_bust=lfes-phase-2a-local-1779119154006`
- Browser/debug verified:
  - signed-in session restored,
  - Taylor Metal Products loaded,
  - Quick Fix visible,
  - active location Auburn, WA loaded,
  - all five locations visible,
  - Work Orders, Equipment, Parts, and Settings opened,
  - no setup/load errors,
  - no MaintainOps console errors.
- Behavior changed: no intended behavior change. This was a service-wrapper extraction only.
- Phase 2B is blocked pending user approval. Recommended next target is profile/member/team read wrappers only.

## Prior Recent Change

Created the LFES Phase 2 service-wrapper extraction plan only:

- Added `docs/LFES/audits/LFES_PHASE_2_SERVICE_WRAPPER_PLAN.md`.
- No app behavior changed.
- No `app.js` refactor was performed.
- No service wrappers were created yet.
- No Supabase policies, SQL, RLS, auth, UI, or workflow logic changed.
- The plan identifies safe future service targets:
  - `locationsService`,
  - `profilesService`,
  - `companyService`,
  - `partsService`,
  - `assetsService`,
  - `workOrdersService`,
  - `publicRequestsService` only after more caution.
- Recommended order:
  1. location read/create wrappers,
  2. profile/member/invite read wrappers,
  3. parts reads/simple mutations,
  4. assets reads/simple mutations,
  5. work-order read/count/search wrappers,
  6. company RPC wrappers,
  7. public request wrappers later,
  8. storage wrappers last.
- The plan explicitly says not to move auth/session startup, active company/location persistence, `bindWorkspaceEvents()`, render functions, Quick Fix, request conversion, work-order creation, PM generation, safety checks, assignment guardrails, delete workflows, photo/storage flows, or optional schema fallback logic in the first Phase 2 extraction.
- Company isolation guidance: service wrappers must receive `companyId` explicitly, keep location scope explicit, preserve RLS, and never weaken `private.is_company_member(company_id)`.
- Recommended next implementation, only after approval: Phase 2A `locationsService` extraction.

## Prior Recent Change

Completed the signed-in GitHub Pages verification after LFES Phase 1 utilities:

- Verified live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-live-signedin-ui-clean-20260518`
- Verified hosted signed-in session for `louie.fisher@taylormetal.com`.
- Supabase/RLS-backed checks passed with HTTP 200:
  - auth user lookup,
  - `get_my_companies`,
  - current company `Taylor Metal Products`,
  - five company locations,
  - stored active location `Auburn, WA`,
  - location-scoped work orders,
  - location-scoped equipment/assets,
  - parts,
  - active requests.
- Live browser UI checks passed:
  - signed-in app restored,
  - dashboard/company loaded,
  - Work Orders opened,
  - Equipment opened,
  - Parts opened,
  - Settings / Company Settings opened,
  - no setup/load errors appeared in those views.
- Hosted script checks passed:
  - `src/utils/constants.js?v=lfes-utils-1`,
  - `src/utils/dom.js?v=lfes-utils-1`,
  - `src/utils/formatting.js?v=lfes-utils-1`,
  - `app.js?v=lfes-utils-1`.
- Console checks:
  - no missing `src/utils` script errors,
  - no MaintainOps console errors during signed-in UI or workflow smoke,
  - one `favicon.ico` 404 was observed and treated as harmless GitHub Pages/static-site noise.
- Basic live workflow smoke passed:
  - created Quick Fix `QA LFES live workflow 1779118764973`,
  - verified Work Order Detail opened,
  - deleted the QA order through the app delete path,
  - verified the QA title was gone afterward.
- App behavior was not changed during this verification.
- Phase 2 service-wrapper planning is no longer blocked by the deployment/signed-in verification checkpoint, but should still be run only as a separate approved phase with Debug Protocol checkpoints.

## Prior Recent Change

Deployed the LFES Phase 1 utility package to GitHub Pages:

- Pushed commit `aafc208` to `loufish727/MaintainOps` `main` with message `Deploy LFES utility package`.
- GitHub repo `main` now has:
  - updated `index.html` loading `src/utils/constants.js`, `src/utils/dom.js`, `src/utils/formatting.js`, and `app.js?v=lfes-utils-1`,
  - `src/utils/constants.js`,
  - `src/utils/dom.js`,
  - `src/utils/formatting.js`.
- GitHub Pages initially served the old HTML, then updated during polling at approximately 08:29 Pacific.
- Hosted smoke URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-live-smoke-20260518-0830`
- Hosted asset checks passed:
  - all three `src/utils` scripts returned HTTP 200,
  - `app.js?v=lfes-utils-1` returned HTTP 200.
- Hosted unauthenticated startup passed: the live app rendered the normal `Welcome Back` login form through the new utility-script deployment.
- Console/resource check found no missing `src/utils` errors. A `favicon.ico` 404 appeared and was treated as non-app noise.
- Static checks passed before deploy:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
- Signed-in live browser verification is complete; see the most recent change above.
- Phase 2 service-wrapper planning is no longer blocked by deployment verification, but remains a separate approved phase.

## Prior Recent Change

Fixed GitHub upload packaging for LFES Phase 1 utilities:

- Updated `tools/create-github-upload.ps1` so the clean GitHub Pages package copies both `assets/` and the full `src/` directory.
- Updated `docs/GITHUB_PAGES_PROCESS.md` so upload instructions include `src/`.
- Recreated a clean package:
  - `MaintainOps-github-clean-20260518-082455`
  - `MaintainOps-github-clean-20260518-082455.zip`
- Verified the package folder includes `src/utils/constants.js`, `src/utils/dom.js`, and `src/utils/formatting.js`.
- Verified the zip includes `src\utils\constants.js`, `src\utils\dom.js`, and `src\utils\formatting.js`.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
- App behavior was not changed; no `app.js`, Supabase policy, SQL, auth, workflow, rendering, or service-wrapper code was modified.
- Phase 2 service-wrapper planning remains blocked until a true signed-in browser pass is completed.

## Prior Recent Change

Ran the LFES signed-in Debug Protocol checkpoint after Phase 1 utilities as far as this session allowed:

- Static checks passed again:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
- Confirmed `index.html` still loads `src/utils/constants.js`, `src/utils/dom.js`, and `src/utils/formatting.js` before `app.js?v=lfes-utils-1`.
- Headless Chrome local file load rendered the normal `Welcome Back` login screen through the utility scripts.
- Existing LFES reviewer tags remain sparse: 7 total across `app.js` and `supabase/schema.sql`.
- Company isolation/RLS was not touched; no Supabase policies, SQL, auth logic, workflow logic, or rendering logic were changed.
- Signed-in browser verification is still blocked/pending because this session did not expose a controllable signed-in MaintainOps browser session or app credentials. Edge/Chrome storage inspection found hosted app state, but no reusable MaintainOps Supabase app auth token for the local/hosted app origin.
- Not yet verified after Phase 1 utilities: authenticated session restore, company load, Work Orders, Equipment, Parts, location persistence, authenticated request visibility, and basic work order create/edit.
- Public QR route was attempted with the known Salem token, but headless Chrome stayed at `Loading request form...`; do not count public QR as verified in this checkpoint.
- Deployment risk discovered: `tools/create-github-upload.ps1` does not currently include `src/`, so it must be updated before the next GitHub upload package or GitHub Pages will miss the new utility scripts.
- Phase 2 service-wrapper planning is not approved until a true signed-in browser pass is completed.

## Prior Recent Change

Completed LFES-approved `app.js` modularization Phase 1:

- Extracted only pure constants and utility helpers from `app.js`.
- Added `src/utils/constants.js`, `src/utils/dom.js`, and `src/utils/formatting.js`.
- Updated `index.html` to load those scripts before `app.js`.
- Bumped `index.html` to `app.js?v=lfes-utils-1`.
- Left auth, Supabase calls, workflow/business logic, rendering logic, RLS/policies, and company isolation untouched.
- Extracted constants: status/type/equipment role/list paging/search constants, outside-vendor constants, company roles, active-location storage key.
- Extracted pure helpers: search/date/chunk helpers, safe filename helpers, status/role label helpers, photo/file-size/money/due-state/CSV helpers, and HTML escaping.
- Static checks passed: `node --check app.js`, `node --check supabase-config.js`, and `node --check` for all three utility scripts.
- Headless Chrome smoke passed: local file URL loaded through the new utility scripts and rendered the normal Welcome Back login form.
- Verification boundary: authenticated Debug Protocol items such as session persistence and Work Orders loading were not completed in this sandbox because no authenticated browser session/credentials were available through the active tools.

## Prior Recent Change

Created LF Engineering Standard v1 documentation and audit pass:

- Added `docs/LFES` as MaintainOps' internal engineering continuity and review framework.
- LFES preserves engineering understanding, traceability, assumption visibility, operational observability, and controlled evolution.
- LFES does not replace `docs/DEBUG_PROCESS.md`; Debug Protocol remains the functional verification process.
- Added LFES Core and Gold standards, category standards, audit process, traceability matrix, templates, context docs, real-world failure pattern mapping, app.js modularization plan, and Gold audit report.
- Added 7 sparse reviewer tags only at high-risk boundaries: location persistence, public QR intake, equipment-driven location routing, delete traceability guard, invite/default-location onboarding, request conversion, and `private.is_company_member(company_id)`.
- Lightly updated `README.md` with LFES reviewer entry points.
- Bumped `index.html` to `app.js?v=lfes-v1-1`.
- App functionality was not intentionally changed.
- Initial LFES Gold score: 78/100, Acceptable.
- Key strengths confirmed: RLS/company isolation direction, `private.is_company_member(company_id)`, public QR scoped RPC direction, detailed Debug Protocol/QA logs, server-paged work/request direction, delete traceability guards.
- Key risks recorded: true technician-session QA remains incomplete, real second-user invite acceptance remains unverified, `app.js` responsibility concentration, optional schema fallbacks can hide missing migrations, mobile file-picker/photo QA still needs real device verification.
- Recommended next implementation after approval: utilities-only extraction from `app.js`, followed by Debug Protocol.

## Prior Recent Change

Added pending invite cancellation:

- Team Pending Invites now show a Cancel Invite action for managers/admins.
- Cancel is intentional: first click asks for confirmation with Keep / Cancel Invite, second click calls Supabase.
- Added `supabase/step-next-cancel-team-invites.sql`.
- The SQL creates `cancel_company_invite(company_id, invite_id)`, limited to admin/manager members of the company and only pending invites.
- Bumped `index.html` to `app.js?v=cancel-team-invite-2`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Local browser UI smoke passed: Team loads, pending QA invite appears, Cancel Invite buttons render, and no console errors were captured.
- Supabase SQL was applied.
- Canceled pending QA invite `qa.invite.default.location@maintainops.test` through the app; Pending Invites reloaded cleanly and only the existing Jeffrey invite remained.
- Still needs: live invite acceptance QA with a real second user to prove the accepted member starts in the invite default location.

## Prior Recent Change

Completed manager-side invite/default location build and smoke:

- Team invite form now includes a Default location selector.
- Pending invites show the selected default location when the new schema is available.
- Added `supabase/step-next-invite-default-location.sql`.
- The SQL adds `default_location_id` to `company_members` and `company_invites`, updates `create_company_invite(...)`, updates `accept_company_invites()`, and updates `get_my_companies()` to return member default location.
- Startup now prefers the member default location when there is no saved scoped active location for the signed-in user/company.
- Invite email input now keeps email keyboard/autocomplete/pattern validation while using a text input so browser QA automation can exercise the form reliably.
- Bumped `index.html` to `app.js?v=invite-default-location-2`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Supabase SQL was applied, then local browser smoke passed with no console errors.
- Created pending invite `qa.invite.default.location@maintainops.test` as Technician with Default location `Salem, OR`; Team displayed `Default location: Salem, OR`.
- Still needs: live invite acceptance QA with a real second user to prove the accepted member starts in the invite default location.

## Prior Recent Change

Continued Mobile tech location lock QA:

- Manager/admin side passed in signed-in local QA.
- Visible location selector was enabled and switched Salem, OR and Spokane, WA with no console errors.
- Team My Profile showed the Mobile tech checkbox and it was enabled for editing.
- Quick Fix created while Spokane, WA was selected opened Work Order Detail and stayed in Spokane.
- QA Quick Fix `QA mobile tech manager 1778885988402 quick fix` was deleted through the app.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Remaining unproven item: true technician-session QA for Mobile tech off/on/off lock behavior.

## Prior Recent Change

Continued senior-code-review corrections:

- Procedure delete is now guarded by live Supabase link counts for work orders and PM schedules before showing/confirming delete.
- Procedure cards still show quick loaded counts, but the actual delete path verifies against Supabase so server-paged work orders cannot hide linked history.
- Bumped `index.html` to `app.js?v=procedure-delete-guard-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.

Prior senior-code-review corrections:

- Equipment delete is now guarded by live Supabase link counts before showing/confirming delete.
- This prevents a server-paged Work Orders or Requests list from hiding linked records that should keep equipment for traceability.
- Bumped `index.html` to `app.js?v=equipment-delete-guard-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.

Earlier senior-code-review corrections:

- Request lists now use server-paged loading at 12 per page, matching the large-list rule for live testing.
- Request Active / Converted / All counts now come from count queries instead of loading every request into the browser.
- Location changes, request filters, request pagination, and global search now reload the request queue from Supabase.
- Request search still covers request text/contact fields and linked equipment matches.
- Bumped `index.html` to `app.js?v=request-server-paging-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.

Earlier senior-code-review corrections:

- Archived 50 old GitHub/export package folders and zips under `_archive/github-packages`.
- Left only the current clean GitHub package at the root during the pass.
- Added read-only Supabase audit SQL: `supabase/step-next-location-integrity-audit.sql`.
- The audit SQL checks bad company/location links, work/request/PM records whose location differs from linked equipment, and location constraint validation status.
- Static checks still pass: `node --check app.js` and `node --check supabase-config.js`.

## Prior Recent Change

Renamed the local project folder:

- Old folder: `C:\Users\louie\Documents\Codex\2026-04-28\theres-an-ap-called-maintenance-x`
- New folder: `C:\Users\louie\Documents\Codex\2026-04-28\MaintainOps`
- Updated live docs that referenced the old local file URL.
- Updated automation `maintainops-daily-full-debug` so its workspace path is now `C:\Users\louie\Documents\Codex\2026-04-28\MaintainOps`.
- Static checks still pass after the rename: `node --check app.js` and `node --check supabase-config.js`.
- New local refresh link format: `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=...`

## Prior Recent Change

Started the senior-code-review correction pass:

- Added cross-location equipment routing warnings before saving Quick Fix, full Work Order, Quick Update, internal Request, and PM schedule forms.
- Existing behavior is preserved: if selected equipment belongs to another location, the record still routes to that equipment's location, but the user must intentionally continue.
- Tightened active-location persistence so the scoped `maintainops.activeLocationId:<user_id>:<company_id>` key becomes the real storage path and the old global `maintainops.activeLocationId` key is removed after migration.
- Added `docs/GITHUB_PAGES_PROCESS.md`.
- Added `tools/create-github-upload.ps1`, which creates a clean GitHub Pages folder and zip containing only `index.html`, `app.js`, `styles.css`, `supabase-config.js`, `README.md`, and `assets/`.
- Bumped `index.html` to `app.js?v=location-guardrails-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Package script smoke passed and created `MaintainOps-github-clean-20260515-141819` plus matching zip.
- Signed-in browser QA is still needed because the in-app browser blocked the local `127.0.0.1` test URL before the app loaded.

## Prior Recent Change

The daily debug process was combined into the full live debug protocol, then the full hosted protocol was run on GitHub Pages:

- Created active automation `MaintainOps Daily Full Debug` (`maintainops-daily-full-debug`) to run the full protocol daily at 7:00 AM.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Hosted startup, main navigation, and location persistence passed.
- Requests baseline was clean across Auburn, Riverside, Sacramento, Salem, and Spokane.
- Live `Hydralic Leak` remained visible only in Salem.
- Quick Fix create/update/delete passed.
- Internal request submit/convert/delete passed.
- Equipment, Procedure, PM schedule, generated PM work order, and related delete paths passed.
- Public Salem QR request submit/manager visibility/delete passed.
- Final sweep left no today QA work, requests, PM schedules, equipment, procedures, or parts visible.
- Final console check found no MaintainOps errors.
- Parts create was not counted in this run because browser automation still cannot reliably type into number inputs; no bad part was saved.

## Prior Recent Change

QA data cleanup process was formalized, the first app-delete cleanup pass was run, and the missing cleanup paths were added:

- Added `docs/QA_DATA_PROCESS.md` with required QA naming, cleanup, and post-delete debug rules.
- User clarified cleanup should go through the app, not SQL, so the SQL cleanup artifact was removed.
- The app-delete process targets QA/debug/test records only and avoids broad deletes.
- Parts/equipment should be left in place if the app reports linked history.
- Updated `docs/DEBUG_PROCESS.md` so future debug runs include QA data lifecycle discipline.
- Through the hosted app, QA active work orders were deleted via the real `Delete Work Order` -> `Permanently Delete` path across locations.
- Salem active Work Orders now show only Lee's real `Hydralic Leak`; Auburn, Riverside, Sacramento, and Spokane show no visible active QA work orders.
- Created and deleted `QA delete smoke 20260513 app path` through the same app workflow to verify create/delete after cleanup.
- Deleted 13 QA parts through the app; Parts now shows `0 shown`.
- Added manager/admin app delete controls for Requests, PM schedules, and Procedure templates.
- Added `supabase/step-next-cleanup-delete-paths.sql` with exact delete grants and RLS policies for those app delete paths.
- Final hosted cleanup was completed after the SQL and GitHub Pages upload:
  - Requests are clean across all locations.
  - PM schedules are clean across all locations.
  - Procedures are clean.
  - Equipment has no visible QA headings across all locations.
  - Parts has no visible QA headings.
  - Quick Fix create/delete smoke passed after cleanup.
  - No MaintainOps console errors were captured.
- Ran full hosted debug after cleanup:
  - navigation passed for all main sections,
  - location switching passed all five locations,
  - Work Orders active queues stayed clean with only live `Hydralic Leak` in Salem,
  - Quick Fix create/delete, Part create/delete, and Equipment create/delete smokes passed,
  - Requests, PM, Procedures, and linked QA Equipment remain the cleanup blockers,
  - no hosted MaintainOps console errors were captured.

## Prior Recent Change

Active location persistence was hardened:

- Location selection is now stored per signed-in user and company with a scoped localStorage key.
- The old `maintainops.activeLocationId` key is still written/read as a compatibility fallback.
- Startup now prefers the saved location for the loaded company when that location still exists.
- Switching companies no longer wipes the saved location for that company before locations are loaded.
- `index.html` now points to `app.js?v=location-persist-1`.
- Updated the debug/feature processes so location changes must be verified after app reload/reopen.
- Static checks passed and the local HTTP app loaded to the login screen with no `127.0.0.1:4182` console errors. Browser automation could not complete signed-in local location switching because the local/file origins did not have the current auth session and `file://` inspection is blocked by browser policy.

## Prior Recent Change

Supabase Data API grant hardening for the 2026 public-schema change:

- Added `supabase/step-next-explicit-data-api-grants.sql`.
- Updated process/setup/architecture docs so future public tables require explicit grants plus RLS policies.
- Kept public QR access on scoped RPCs, not direct anonymous table grants.
- Ran focused service-role table and RPC grant passes in Supabase after the first all-in-one run stalled in the dashboard.
- Verified the important grants returned `true`: authenticated schema usage, service_role schema usage, authenticated work order select/update, service_role app issue report delete, service_role work order delete, anon public request RPC execute, and service_role public request RPC execute.
- Ran hosted debug after the grants and Lee correction:
  - static checks passed,
  - hosted app loaded,
  - main navigation passed,
  - location switching passed Salem/Auburn/Salem,
  - `Hydralic Leak` and `New thalmann` verified in Salem,
  - Auburn search showed zero result cards for `Hydralic Leak`,
  - Quick Fix, Quick Update, comment, internal request submit, and request conversion passed in Salem.
- Ran full hosted debug afterward:
  - main navigation passed cleanly after clearing persisted global search state,
  - location switching passed Salem, Riverside, Spokane, Auburn, Salem,
  - Quick Fix, Quick Update, comments, parts Use/Restock, equipment create, procedure/step create, PM create/generate, internal request submit/convert, app issue report, Team role surface, and public Salem QR request all passed,
  - no MaintainOps console errors were found,
  - protocol note: click a search result to clear a persisted global search state if direct automation fill does not clear the controlled search input.

## Prior Recent Change

Live correction for Lee Gaede's `Hydralic Leak` work order:

- Found work order `8a19166f-c653-4da6-a5db-01bc5b96491a` had landed in Auburn, WA.
- The linked equipment `New thalmann` (`fdab0981-bb5e-4335-92ce-f0b4667b1692`) was also in Auburn, WA.
- App logic uses selected equipment location when equipment is attached, so this was likely equipment/location routing rather than a random save failure.
- Ran a targeted Supabase correction to move the work order and linked equipment to Salem, OR.
- Verification showed the work order now at Salem, OR.
- Follow-up remains: build invite/default location and finish true technician mobile-tech lock QA so users do not fall back to the first alphabetical location.

## Earlier Recent Change

Requests flow was cleaned up so converted requests do not clutter the active request queue.

Implementation:

- Requests now default to an Active filter for submitted, unconverted requests.
- Added Active, Converted, and All request filters.
- Work Orders request gauge/queue stays focused on Active requests.
- Converted request cards are visually quieter and no longer show conversion actions.
- Mobile request card layout was tightened.
- Local password login QA has a timeout fallback that retries through Supabase's auth token endpoint and sets the returned session.
- Request loading has a safe no-join fallback for `maintenance_requests` so the Requests panel can still load if relationship metadata is unavailable in a test origin.
- Internal request submit now returns the Requests screen to Active page 1 so newly submitted requests are immediately visible even if the user was reviewing Converted history.
- Bumped `index.html` to `styles.css?v=request-flow-clean-1` and `app.js?v=request-flow-clean-auth-3`.

Verified:

- Static checks passed.
- Public QR request smoke passed with `QA request flow public 1778270000000`.
- Authenticated localhost app loaded after login fallback with Taylor Metal Products visible.
- Requests panel loaded without setup-needed warning.
- Active / Converted / All request filters worked; Active excluded converted cards and Converted removed conversion actions.
- Submitted `QA request active reset 177827-active-reset` while viewing Converted; the app returned to Active and showed the new request.
- Converted `QA request active reset 177827-active-reset` to a work order; Work Order Detail opened, Active no longer showed it, and Converted showed it as converted.
- Main navigation passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings.
- Manager location switching passed across all five configured locations.
- No MaintainOps console errors were observed in the final request, navigation, and location checks.

## Prior Recent Change

Technician assignment guardrails were added.

Implementation:

- Technicians can still create work orders and convert maintenance requests into work orders.
- Technicians can claim unassigned work for themselves.
- Technicians cannot assign work to other users, assign outside vendors, clear assignments, or reassign work already assigned to someone else.
- Managers/admins keep full assignment and reassignment controls.
- Assignment dropdowns now show manager-level choices only to managers/admins.
- Added `supabase/step-next-technician-assignment-guardrails.sql` with a work-order trigger and tightened work-order insert/update policies.
- Bumped `index.html` to `app.js?v=tech-assignment-guardrails-1`.

Still needs:

- Re-test with a real technician login to prove forbidden technician assignment paths are blocked under a true technician session.
- If preparing GitHub, include the updated `app.js`, `index.html`, docs, and `supabase/step-next-technician-assignment-guardrails.sql`.

Verified:

- Supabase assignment guardrail SQL was applied by the user.
- Debug protocol ran with fresh local token `1778195748451`.
- Static checks passed.
- Main navigation and manager location switching passed.
- Team role UI shows only Technician, Manager, Admin.
- Quick Fix save passed with `QA assignment guard quick fix 1778195839716`.
- Internal request conversion passed with `QA assignment guard request 1778195863991`.
- Assign to me and Quick Update passed on the converted work order.
- Public QR request submit passed with `QA assignment public request 1778195925580`.
- No MaintainOps console errors were observed.

Most recent full debug:

- Full debug ran with fresh local token `1778196110830`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Verified Quick Fix, Quick Update, comments, parts Use/Restock, equipment create/save, internal request conversion, procedure step creation, PM schedule generation, app issue report, public Spokane QR request, and Team role UI.
- Team still shows only Technician, Manager, Admin; Member is absent.
- No MaintainOps console errors were observed.
- `docs/DEBUG_PROCESS.md` was updated with lessons from this run: open collapsed Comments before targeting `#comment-form`, verify PM title fill/refreshed DOM, and reopen the manager app after anonymous QR tests if the in-app browser replaces the manager tab.
- `docs/QA_LOG.md` has the full record names and token details.

## Prior Recent Change

LFES app cleanup continuation completed through Phase 11Q.

Implementation:

- Added `src/render/messageBadgeDisplay.js`.
- Added `src/render/appIssueDisplay.js`.
- Added `src/render/workMessageDisplay.js`.
- Added `src/render/workRecommendationDisplay.js`.
- Added `src/render/commandCardDisplay.js`.
- Added `src/render/workCommandDisplay.js`.
- Added `src/render/missingWorkDetailDisplay.js`.
- Reduced `app.js` to 10,093 lines.
- Latest GitHub Pages cache tag is `app.js?v=lfes-phase-11p-missing-work-detail-display-1`.

Verified:

- Latest commit: `3c31d77`.
- Latest package: `MaintainOps-github-clean-20260520-131510`.
- Static JS checks passed.
- Local and hosted Resource Load Smoke passed.
- Signed-in live smoke passed at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-11q-live-20260520`.
- Taylor Metal Products, Salem, OR, and the Phase 9I message thread remained visible.
- No browser warning/error logs were observed.
- GitHub connector returned no workflow runs for the latest app commits.

Still do not move workflow logic, event handlers, mutations, auth/session/company/location logic, Supabase SQL/RLS, storage/photo/document flows, Quick Fix, request conversion, delete guards, `renderWorkspace()`, or `bindWorkspaceEvents()`.

## Prior Recent Change

LFES app cleanup continuation completed through Phase 11W.

Implementation:

- Added `src/render/partSourceDisplay.js`.
- Added `src/render/assetCardDisplay.js`.
- Reduced `app.js` to 10,055 lines.
- Latest GitHub Pages cache tag is `app.js?v=lfes-phase-11v-asset-card-display-1`.

Verified:

- Latest app commit: `3e68c82`.
- Latest package: `MaintainOps-github-clean-20260520-132436`.
- Static JS checks passed.
- Local and hosted Resource Load Smoke passed.
- Signed-in live Equipment smoke passed at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-11w-live-20260520`.
- Equipment rendered 1 asset card.
- Taylor Metal Products, Salem, OR, and the Phase 9I message thread remained visible.
- No browser warning/error logs were observed.
- GitHub connector returned no workflow runs for the latest app commits.

Next cleanup selection should be cautious because many remaining render functions mix forms, danger zones, auth, public QR, or workflow actions.

## Prior Recent Change

LFES app cleanup continuation completed through Phase 12R.

Implementation:

- Added `src/render/procedureOptionsDisplay.js`.
- Added `src/render/messageThreadButtonDisplay.js`.
- Added `src/render/appIssuePanelDisplay.js`.
- Added `src/render/messageThreadLabelDisplay.js`.
- Added `src/render/messageComposerDisplay.js`.
- Added `src/render/inviteLocationDisplay.js`.
- Added `src/render/partSetupDisplay.js`.
- Reduced `app.js` to 10,042 lines.
- Latest GitHub Pages cache tag is `app.js?v=lfes-phase-12q-part-setup-display-1`.

Verified:

- Latest app commit: `eef5e1c`.
- Latest package: `MaintainOps-github-clean-20260520-134626`.
- Static JS checks passed.
- Local and hosted Resource Load Smoke passed.
- Signed-in live Parts smoke passed at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-12r-live-20260520`.
- Phase 9I message regression passed after Parts navigation.
- No browser warning/error logs were observed.
- GitHub connector returned no workflow runs for the latest app commits.

Note:

- Phase 12H caught a local load-order issue before deployment; it was fixed by initializing message thread labels before helpers that receive `messageThreadScopeLabel`.
- Remaining cleanup candidates require fresh readiness because most remaining render functions are forms, auth/startup, public QR, assignment controls, delete zones, workflow actions, or full detail views.

## Prior Recent Change

LFES app cleanup continued through another 21 controlled medium-risk phase steps, ending at Phase 14G.

Implementation:

- Extracted work-order description display helpers into `src/render/workOrderDescriptionDisplay.js`.
- Extracted work-order change summary display helper into `src/render/workOrderChangeDisplay.js`.
- Extracted activity feed aggregation into `src/render/activityFeedDisplay.js`.
- Extracted part inventory low-stock helpers into `src/render/partInventoryDisplay.js`.
- Extracted part usage row lookup into `src/render/partUsageDisplay.js`.
- Extracted open request queue filtering into `src/render/requestQueueDisplay.js`.
- Extracted delete-blocker message formatting into `src/render/deleteBlockerDisplay.js`.
- Latest cache tag is `app.js?v=lfes-phase-14f-delete-blocker-display-1`.

Verified:

- Latest deploy commit: `1a17d36`.
- Latest package: `MaintainOps-github-clean-20260520-145833`.
- Static JS checks passed.
- Targeted helper-output smokes passed.
- Local and hosted resource checks passed.
- Signed-in live smoke passed against `https://loufish727.github.io/MaintainOps/`.
- Taylor Metal Products, Salem, OR, Louie, Work nav, Parts nav, and Team nav were visible.
- No browser warning/error logs were observed after filtering known benign noise.
- GitHub connector returned no workflow runs for latest deploy commits.

Note:

- No workflow logic, event handlers, mutations, auth/session/company/location logic, Supabase SQL/RLS, `renderWorkspace()`, `bindWorkspaceEvents()`, assignment controls, delete actions, delete confirmations, public QR flows, Quick Fix, request conversion, or PM generation were moved.
- `app.js` line count after Phase 14F is 9,969.

## Prior Recent Change

Team roles were simplified to the real working model: Technician, Manager, Admin.

Implementation:

- Removed Member from role selectors, invite role selector, and the role guide.
- Legacy `member` values are normalized as Technician in the app.
- Role save now reloads `company_members` after the Supabase RPC succeeds, so a changed role does not redraw from stale in-memory data.
- Added `supabase/step-next-role-model-technician-manager-admin.sql` to convert existing `member` rows/invites to `technician`, tighten role checks, and update role/invite RPC validation.
- Bumped `index.html` to `app.js?v=roles-three-role-model-1`.

Still needs:

- Run the new role-model SQL in Supabase.
- Re-test role change from Team after SQL is applied.

## Prior Recent Change

QR and internal maintenance requests now have an optional photo field.

Implementation:

- Public QR request form and internal Request form include a photo upload input.
- Request photos reuse the same `optimizePhoto()` behavior as work-order photos: 2400px max dimension, JPEG quality 0.88 for supported image types.
- `supabase/step-next-maintenance-request-photos.sql` adds request photo metadata columns, a private `maintenance-request-photos` bucket, storage policies, and the attach RPC.
- Request cards show the attached photo thumbnail and signed authenticated open link after SQL is applied.

Verified:

- Syntax checks passed.
- Internal and public request forms show the photo input and optimization copy.
- Public and internal request submit still work without a photo.
- After SQL was applied, a QR request with `logo.png` attached showed a manager-side thumbnail and `Open photo` link.
- The post-feature debug protocol caught and fixed a Quick Fix regression (`sourceRequest is not defined`).
- Quick Fix was re-tested after the fix and saved `QA qf fixed 1778194725490` successfully.
- Public QR request submit was re-tested after the fix and manager-side verification found `QA protocol public request 1778194843081` under the QR link's Auburn, WA location.

Still needs:

- Re-test with a real selected file from the browser file picker on desktop and mobile.

## Prior Recent Change

The repeatable debug process was tested against the live local app until it stopped finding new misses in the tested areas.

Implementation:

- `docs/DEBUG_PROCESS.md` and `docs/FEATURE_CHANGE_PROCESS.md` now include visible/scoped selector rules for desktop/mobile duplicate controls.
- Internal request submit now uses the submitted form (`event.target`) from the document-level submit listener.
- The temporary click-submit workaround was removed so the native form submit path owns request creation.
- The cache tag was bumped to `app.js?v=request-submit-form-target-1`.

Verified:

- Navigation smoke.
- Manager location switching.
- Quick Fix create.
- Internal request submit.
- Equipment and part detail stale-panel clearing.
- Part create, search, Use, and Restock.
- Public QR anonymous submit and manager-side visibility.

## Prior Recent Change

Location switching was made intentional.

Implementation:

- Top banner has a location dropdown.
- Managers/admins can switch.
- Regular technicians cannot switch unless they enable `Mobile tech`.
- `Mobile tech` is set in Team under My Profile.
- Required SQL adds `profiles.mobile_tech`.

## Next Action

Continue LFES hard-boundary authority reduction.

Latest completed hard-boundary extraction:

- `bindWorkspaceEvents()` part/equipment filter group was extracted into `src/utils/workspaceInventoryFilterEvents.js`.
- App deploy commit: `2b4ad8e`.
- Docs update commit follows the app deploy.
- Current app cache tag: `app.js?v=lfes-authority-inventory-filter-events-1`.
- Current `app.js` line count: 8,985.
- Signed-in live smoke passed with the dedicated QA/test account.
- GitHub Actions verification gap is closed: use `npm run test:smoke:github-actions`; latest verifier pass covered `2b4ad8e`.
- Event modules now carry explicit LFES contract comments.
- First state-boundary planning is documented in `docs/LFES/audits/STATE_BOUNDARY_PLAN_2026-05-21.md`.

Next safest candidates:

- Workspace UI state factory as a medium-risk non-mutating state boundary, if the next goal is real authority reduction.
- Team member work-view bridge as a medium-risk UI-state boundary.
- Message read-only navigation sub-boundary only after mapping read-state side effects; send/reply forms remain blocked.

Do not move yet: command routing, message center send/reply, work-order mutation/status/assignment/delete/downtime flows, request conversion/Quick Fix/delete, parts mutation/document/source flows, asset/PM/procedure/team/settings forms, auth/session/company/location startup, public QR submit/admin, storage/photo/document/logo flows, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()`.

Before and after any new feature or fix, use `docs/FEATURE_CHANGE_PROCESS.md` and `docs/DEBUG_PROCESS.md` so changes are scoped, tested, documented, and packaged the same way every time.

See `docs/QA_LOG.md`, `docs/NEXT_STEPS.md`, `docs/FEATURE_CHANGE_PROCESS.md`, and `docs/DEBUG_PROCESS.md`.

## Important User Preferences

- Always provide Supabase copy-paste SQL when Supabase changes are required.
- Do not overbuild location permissions.
- Keep location switching simple but intentional.
- Keep Quick Fix central.
- Prefer practical shop-floor use over accounting/billing depth.
- Mobile matters heavily, but do not break desktop.
- Completed work should not clutter default screens.
- Warnings should be visually obvious.

## Project Docs

Read these in order:

1. `docs/PROJECT_OVERVIEW.md`
2. `docs/ARCHITECTURE.md`
3. `docs/FEATURE_STATUS.md`
4. `docs/QA_LOG.md`
5. `docs/NEXT_STEPS.md`
6. `docs/FEATURE_CHANGE_PROCESS.md`
7. `docs/DEBUG_PROCESS.md`
8. `docs/SUPABASE_SETUP.md`
