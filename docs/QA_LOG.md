# MaintainOps QA Log

This file summarizes important QA passes and remaining test priorities.

## Current Latest QA Entries

- 2026-05-27: HIGH-risk auth verification callback phase implemented. Added `src/utils/authRedirects.js`, `auth/callback/index.html`, and `auth/callback/callback.js`; signup now sends `emailRedirectTo` to `/auth/callback/`; root app startup now handles auth callback `code` or signup hash tokens without misrouting signup verification into password recovery; password recovery remains on the main app path. Supabase Auth URL Configuration was updated: Site URL `https://loufish727.github.io/MaintainOps/`, Redirect URL `https://loufish727.github.io/MaintainOps/auth/callback/`. Static checks, `tests/smoke/auth-callback-smoke.js`, local callback UI smoke, local root signup-token fallback smoke, and local resource smoke passed.
- 2026-05-27: RLS bulletproofing pass completed in Supabase Dashboard SQL Editor. Applied `supabase/step-next-rls-bulletproof-hardening.sql`, created one QA Test Facility location fixture with `supabase/step-next-qa-rls-location-fixture.sql`, and reran the live dashboard summary with all 9 checks PASS: app tables have RLS, policies exist, no direct anon table grants remain, only approved public QR/photo RPCs are anon-executable, approved public RPC grants remain present, security-definer functions have pinned `search_path`, storage buckets are private, storage policies exist, and QA Facility now has one location for denial tests. Direct probes confirmed Taylor cannot read QA Facility `locations`/`assets`/`work_orders`, Taylor is denied `ensure_location_request_link` for the QA location, anonymous table reads return `401`, anonymous internal RPC execute is denied, and invalid-token public QR intake remains callable with an empty result.
- 2026-05-27: GitHub Actions proof recovered for the RLS bulletproofing checkpoint. Public GitHub Actions run page shows Resource Load Smoke #251 for commit `49d8961` (`Complete live RLS hardening checkpoint`) triggered by push on May 27, 2026 at 17:52, Status `Success`, duration 21s. Local `gh` remains unavailable and the unauthenticated API verifier remains rate-limited, so future process improvement is still to install/configure `gh` or provide an authenticated verifier path.
- 2026-05-27: RLS live checkpoint added at `docs/LFES/audits/RLS_LIVE_CHECKPOINT_2026-05-27.md`. Taylor technician direct REST probes returned zero QA Facility rows across app-used tables, direct anonymous table reads returned `401` for app-used tables, and manager/admin RPC role-denial passed for invite create, role update, and invite cancel. Live policy metadata inventory is blocked from anon/auth client credentials and requires dashboard/admin SQL. GitHub Actions verifier remains blocked by unauthenticated API rate limit / missing `gh`.
- 2026-05-27: LFES message UI state wiring pass deployed with partial verification and an intentional stop. `activeMessageThreadId`, `messageThreadFilter`, `messageSearchQuery`, `messageComposerWorkOrderId`, and `messageComposerOpen` now initialize from `workspaceUiState`, app-owned message setters synchronize through the factory, and the cache tag is `lfes-state-message-ui-1` for both `workspaceUiState.js` and `app.js`. Static checks, workspace UI state smoke, message UI smoke, message thread smoke, work message start smoke, section navigation smoke, hosted resource smoke, and signed-in hosted Messages smoke passed for `e7c1a70`. Signed-in smoke confirmed both cache tags, opened a live thread, set the Unread filter, set message search to `qa`, verified localStorage persistence, and captured no relevant console errors. GitHub Actions verification for `e7c1a70` could not be completed because the unauthenticated GitHub API verifier is rate-limited; stop before further phases unless Actions proof is recovered or an authenticated verifier is provided.
- 2026-05-27: LFES active-work-order state wiring pass completed and deployed. `activeWorkOrderId` now initializes from `workspaceUiState`, active-work-order writes go through `setActiveWorkOrderIdState(...)`, and the app cache tag is `app.js?v=lfes-state-active-work-order-1`. Static checks, workspace UI state smoke, section navigation smoke, message UI smoke, command/open-form smokes, asset Quick Fix smoke, work-order edit smoke, Quick Update smoke, comment smoke, work message start smoke, hosted resource smoke, and GitHub Actions Resource Load Smoke passed for `94bb07d`. Signed-in hosted admin smoke confirmed the active-work-order cache tag, opened Work Order Detail for `Hydralic Leak`, returned to Work Orders, kept active section `work`, and captured no relevant console errors. Scope stayed state synchronization only: no work-order selectors, mutation sequencing, comments, photos, parts-used, detail forms, render, auth/company/location state, or Supabase access changes.
- 2026-05-27: LFES active-asset state wiring pass completed and deployed. `activeAssetId` now initializes from `workspaceUiState`, active-asset writes go through `setActiveAssetIdState(...)`, and the app cache tag is `app.js?v=lfes-state-active-asset-1`. Static checks, workspace UI state smoke, asset delete/cancel smoke, asset location warning smoke, asset Quick Fix smoke, section navigation smoke, search state smoke, hosted resource smoke, and GitHub Actions Resource Load Smoke passed for `db2ba7a`. Signed-in hosted admin smoke confirmed the active-asset cache tag, opened Equipment detail for `New thalmann`, returned to Equipment, kept active section `assets`, and captured no relevant console errors. Scope stayed state synchronization only: no Equipment selectors, delete implementation, Quick Fix submit, forms, render, auth/company/location state, or Supabase access changes.
- 2026-05-27: LFES active-part state wiring pass completed and deployed. `activePartId` now initializes from `workspaceUiState`, active-part writes go through `setActivePartIdState(...)`, and the app cache tag is `app.js?v=lfes-state-active-part-2`. Static checks, workspace UI state smoke, part-detail event smoke, message UI smoke, report-issue command smoke, section navigation smoke, workspace search state smoke, hosted resource smoke, and GitHub Actions Resource Load Smoke passed for `99e5af1`. Signed-in hosted admin smoke confirmed the active-part cache tag, opened two disposable part detail views through the live Parts list, cleaned both disposable parts through the app UI, and captured no relevant console errors. First live boot caught `workspaceUiState` initialization order before first use; fixed by moving factory instantiation above `activePartId`. Live smoke also caught data/setup drift: the default Parts view had no existing part cards, so active-part opening needed disposable setup plus cleanup.
- 2026-05-27: LFES active-section state wiring pass completed and deployed. `activeSection` now initializes from `workspaceUiState`, active-section writes go through `setActiveSectionState(...)`, and the app cache tag is `app.js?v=lfes-state-active-section-1`. Static checks, workspace state/navigation/search/filter smokes, command/navigation regression smokes, hosted resource smoke, local boot smoke with the new cache tag, GitHub Actions Resource Load Smoke for `390a6e2`, and signed-in hosted section navigation smoke passed. Signed-in hosted smoke loaded Taylor Metal Products, clicked Work Orders / Requests / Equipment / Parts / Messages, verified active-section persistence values `work`, `requests`, `assets`, `parts`, and `messages`, and captured no relevant console errors.
- 2026-05-27: LFES RLS/security follow-up audit found a source-control gap and an anonymous RPC execute hardening gap. Added missing SQL source files for invite default location, invite cancel, and work-order part usage RPC, plus `supabase/step-next-rpc-execute-hardening.sql`.
- 2026-05-27: RLS hardening SQL was applied after adding explicit `drop function` handling for existing function return-type mismatch. Anonymous internal RPC probes now return execute-denied for internal RPCs, while invalid-token public QR intake remains callable and returns an empty result. QA account for `QA Test Facility` sees only QA company data across app-used tables; Taylor-prefixed storage list probes return empty arrays. Remaining RLS gap: true QA technician role-denial smoke.
- 2026-05-27: Taylor technician RLS/role smoke passed. The technician account sees only main Taylor company rows or empty result sets across app-used tables, direct QA Facility probes returned empty results, and manager/admin-only RPCs for invite creation, public request link creation, role update, and invite cancel were denied.
- 2026-05-26: LFES RLS source audit checkpoint added. App-used data tables and storage buckets have source RLS/policy coverage; anonymous access remains scoped to expected public QR/photo RPCs; source gap found for app-used RPCs `cancel_company_invite` and `record_work_order_part_usage`.
- 2026-05-26: LFES workspace UI state factory scaffold added with targeted smoke, local/hosted resource smoke, hosted boot assertion, and GitHub Actions Resource Load Smoke for `1794209`. No app behavior changed; next state pass should wire one extracted UI event group at a time.
- 2026-05-26: LFES Parts/Equipment filter-search state slice wired to `workspaceUiState`. Static checks, state smoke, part-search smoke, inventory-filter state smoke, local resource smoke, local boot assertion, hosted resource smoke, GitHub Actions Resource Load Smoke, and signed-in live Parts search / Equipment status-filter smoke passed for `17003ed`.
- 2026-05-26: LFES workspace filter/pagination state slice wired to `workspaceUiState`. Static checks, filter-pagination state smoke, state regression smokes, local resource smoke, and local boot assertion passed.
- 2026-05-26: LFES cache-tag catch during workspace filter/pagination state wiring: `app.js` changed, so `index.html` must bump the app cache tag before hosted/live verification.
- 2026-05-26: LFES workspace filter/pagination state slice hosted verification passed after cache-tag fix: hosted resource smoke, GitHub Actions Resource Load Smoke, and signed-in live Work Orders Vendor filter / Due sort smoke passed for `15e4c49`.
- 2026-05-26: LFES workspace search state slice wired to `workspaceUiState`. Static checks, search state smoke, state regression smokes, local resource smoke, and local boot assertion passed. App cache tag bumped to `app.js?v=lfes-state-workspace-search-1`.
- 2026-05-26: LFES workspace search state hosted verification passed after Pages propagation retry: hosted resource smoke, GitHub Actions Resource Load Smoke, and signed-in live workspace search preview / exact Work Orders search smoke passed for `222f308`.
- 2026-05-26: LFES follow-up work event extraction was retried and live verified after the first setup path was rejected. The passing smoke used a visible active follow-up-needed disposable source, clicked Planning `Create Work`, verified source `follow_up_needed=false`, verified the generated follow-up work order, and cleaned all disposable rows through admin UI with data-layer proof.
- 2026-05-26: LFES work-order comment submit event extraction live verified with a disposable work order, visible reopened comment proof, admin UI cleanup, and data-layer `remainingWork=0` / `remainingComments=0`.
- 2026-05-26: LFES work-order Quick Update submit event extraction live verified with a disposable work order, reopened form value proof for resolution/priority, admin UI cleanup, and data-layer `remainingWork=0` / `remainingEvents=0`.
- 2026-05-26: LFES Full Work Order Details submit event extraction live verified with a disposable work order, reopened form value proof for description/resolution/priority, admin UI cleanup, and data-layer `remainingWork=0` / `remainingEvents=0`.
- 2026-05-21: LFES Phase 16D through 16I utility extraction closed with an intentional `ACTION NEEDED` safety stop.
- 2026-05-21: LFES Phase 17A through 17C operation-timeout boundary closed cleanly.
- 2026-05-21: LFES documentation source-of-truth cleanup restored top-level standards, updated restart docs, removed tracked package snapshots, and added package artifact policy.
- 2026-05-21: LFES Phase 17C public URL/QR utility boundary closed cleanly after form/payload validation was rejected by targeted smoke.
- 2026-05-21: LFES Phase 17D maintenance schedule date helper boundary closed cleanly.
- 2026-05-21: LFES hard-boundary work-order query filter/sort extraction closed cleanly.
- 2026-05-21: LFES small event-binding hard-boundary work-order detail jump extraction closed cleanly.
- 2026-05-21: LFES hard-boundary global search navigation event extraction closed cleanly.
- 2026-05-21: LFES measurable app.js reduction run moved read-only query/search/list helpers and met the 300-line target.
- 2026-05-21: LFES authority map created for `renderWorkspace()` and `bindWorkspaceEvents()`; next recommended boundary is workspace search/exact work-search read-only events.
- 2026-05-21: LFES medium-risk workspace search/exact work-search event boundary extracted and live verified.
- 2026-05-26: LFES high-risk quick work-order status event boundary extracted and live verified; first live smoke caught a bad test assumption and the corrected mutation/restore smoke passed.
- 2026-05-26: LFES high-risk work-order assignment event boundary extracted and live verified with manager/admin mutation plus restore.
- 2026-05-26: LFES work-order downtime copy event boundary extracted and live verified; smoke timing was corrected to wait for reset labels conditionally.
- 2026-05-26: LFES detail status dropdown event boundary extracted and live verified with status mutation plus restore.
- 2026-05-26: LFES high-risk work-order completion boundary extracted and live verified with disposable completion plus cleanup.
- 2026-05-26: LFES high-risk work-order delete boundary extracted and live verified with disposable request/cancel/confirm delete plus data-layer proof.
- 2026-05-26: LFES Team work-view boundary extracted and live verified with Team -> Lee Gaede Work navigation.
- 2026-05-26: LFES Parts detail UI boundary extracted and live verified with Parts -> hydralic hose detail/source-manager/back navigation.
- 2026-05-26: LFES Message Center local UI boundary extracted and live verified with Messages filter and quick-reply UI smoke; read-state writes stayed in `app.js`.
- 2026-05-26: LFES Parts search boundary extracted and live verified with manual text-entry smoke due browser virtual clipboard limitation.
- 2026-05-26: LFES workspace section navigation boundary extracted and live verified with Work Orders, Requests, and Parts navigation smoke.
- 2026-05-26: LFES Message Center thread open/read-state boundary extracted and live verified with QA thread open smoke.
- 2026-05-26: LFES issue/admin local UI boundary extracted and live verified with Report Issue open/cancel smoke.
- 2026-05-26: LFES Part delete-cancel boundary extracted and live verified with non-destructive delete warning/cancel smoke.
- 2026-05-26: LFES Work Order Message Team start-composer boundary extracted and live verified with Hydralic Leak composer-link smoke.
- 2026-05-26: LFES Report Issue command boundary extracted and live verified with Report Issue open/cancel smoke.
- 2026-05-26: LFES Submit Request command boundary extracted and live verified with More -> Submit Request open-form smoke.
- 2026-05-26: LFES New Work Order command boundary extracted and live verified with More -> New Work Order open-form smoke.
- 2026-05-26: LFES Export CSV command boundary extracted and live verified with authenticated Equipment export blob-capture smoke.
- 2026-05-26: LFES Equipment delete-cancel boundary extracted and live verified with disposable unlinked equipment warning/cancel/cleanup smoke.
- 2026-05-26: LFES Request delete-cancel boundary extracted and live verified with disposable request warning/cancel/cleanup smoke.
- 2026-05-26: LFES PM schedule delete-cancel boundary extracted and live verified with disposable PM schedule warning/cancel/cleanup smoke.
- 2026-05-26: LFES PM generation event boundary extracted and live verified with disposable PM generation plus data-layer cleanup proof.
- 2026-05-26: LFES Procedure delete-cancel boundary extracted and live verified with disposable unlinked procedure warning/cancel/cleanup smoke.
- 2026-05-26: LFES textarea auto-grow UI boundary extracted and live verified with Report Issue textarea resize smoke.
- 2026-05-26: LFES Team invite cancel-warning UI boundary extracted and live verified with Cancel Invite -> Keep smoke.
- 2026-05-26: LFES Quick Fix command-opener boundary extracted and live verified with open-form/no-submit smoke.
- 2026-05-26: LFES asset-specific Quick Fix opener boundary extracted and live verified with Equipment detail open-form/no-submit smoke.
- 2026-05-26: LFES public request link copy-button boundary extracted and live verified with Settings copy feedback/reset smoke.
- 2026-05-26: LFES Request conversion event boundary extracted and live verified with disposable request conversion, UI cleanup, and data-layer proof.
- 2026-05-26: LFES request-origin Quick Fix opener boundary extracted and live verified with disposable request open-form/no-submit smoke plus cleanup.
- 2026-05-26: LFES public QR print-button boundary extracted and live verified with hosted QR page print-stub smoke.
- 2026-05-26: LFES asset-location warning event boundary extracted and live verified with signed-in request-form same-location warning smoke.
- 2026-05-26: LFES Team invite confirm-cancel event boundary extracted and live verified with disposable invite cancel-confirm plus data-layer lookup proof.
- 2026-05-26: LFES Equipment delete-request warning opener boundary extracted and live verified with disposable equipment warning/cancel plus cleanup.
- 2026-05-26: LFES Request delete-request warning opener boundary extracted and live verified with disposable request warning/cancel plus cleanup.
- 2026-05-26: LFES PM schedule delete-request warning opener boundary extracted and live verified with disposable PM schedule warning/cancel plus cleanup.
- 2026-05-26: LFES Procedure delete-request warning opener boundary extracted and live verified with disposable procedure warning/cancel plus cleanup.
- 2026-05-26: LFES Part delete-request warning opener boundary extracted and live verified with disposable part warning/cancel plus cleanup; selector catch corrected so permanent delete binding remains in `app.js`.
- 2026-05-26: LFES Part confirm-delete event boundary extracted and live verified with disposable part permanent delete plus data-layer proof.
- 2026-05-26: LFES Equipment confirm-delete event boundary extracted and live verified with disposable equipment permanent delete plus data-layer proof.
- 2026-05-26: LFES Request confirm-delete event boundary extracted and live verified with disposable request permanent delete plus data-layer proof.
- 2026-05-26: LFES PM schedule confirm-delete event boundary extracted and live verified with disposable PM schedule permanent delete plus data-layer proof.
- 2026-05-26: LFES Procedure confirm-delete event boundary extracted and live verified with disposable procedure permanent delete plus data-layer proof.
- Full details are recorded later in this log and in `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`.

## LFES Boundary - Follow-Up Work Events - 2026-05-26

Boundary selected:

- `[data-create-follow-up]` follow-up work creation event binding.

Why it was high risk:

- The button starts a follow-up work-order creation flow, clears `follow_up_needed` on the source work order, records activity, refreshes state/render, and depends on loaded work-order visibility.

Implementation attempted:

- Moved only the click binding to `src/utils/workspaceFollowUpWorkEvents.js`.
- Kept `createFollowUpWorkOrder`, work-order creation, source update, event logging, state, render, auth/company/location, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.

Verification before deploy:

- Static checks: PASS for `app.js`, the new module, the targeted smoke, and resource-load smoke.
- Targeted mock-DOM smoke: PASS for callback dispatch and missing-callback no-op.
- Local resource and local browser tag smokes: PASS.
- Hosted resource smoke after behavior push: PASS.

Live smoke result:

- Initial attempt: FAIL / insufficient coverage. Disposable completed source work order `LFES disposable follow-up source 1779832299049` (`478c1984-353a-4bbd-9c3b-3430baaee17e`) did not appear in the Planning follow-up list, and no `[data-create-follow-up]` button rendered in the live manager/admin session.
- Corrected attempt: PASS. Disposable active source `LFES disposable follow-up active source 1779833256477` (`0768bea7-2cec-4524-8d6f-b0ec79455696`) rendered a visible Planning `Create Work` button. Clicking it created follow-up work order `3bd86d0a-7e73-4444-b24b-ab04222e0dd0` titled `Follow-up: LFES disposable follow-up active source 1779833256477` and updated the source to `follow_up_needed=false`.
- Cleanup: PASS. Admin UI deleted the corrected source, generated follow-up, and earlier retry source `8d64d576-342e-48ad-afad-86d5b183c694`; data-layer verification returned `remainingCount: 0`.

Rollback/retry:

- Behavior commit `0046fc2` (`Extract workspace follow up work events`) was reverted with `fbcc7c3`.
- After admin login exposed a cleanup path, the boundary was reapplied with `dd75658` (`Reapply "Extract workspace follow up work events"`).
- Live cache tag is `app.js?v=lfes-authority-follow-up-work-events-1`.

LFES catch:

- Do not smoke follow-up creation by inserting a completed source record directly through REST unless the test also proves that record enters the loaded `workOrders` slice used by `followUpItems()`. Follow-up event extraction needs a visible, UI-loaded follow-up card before deployment can be considered verified.

Next:

- Continue with one contained boundary at a time. Direct REST cleanup remains insufficient for some work-order rows under the QA token; use manager/admin UI cleanup plus data-layer proof when RLS blocks delete cleanup.

## LFES Boundary - Work-Order Comment Events - 2026-05-26

Boundary selected:

- `#comment-form` submit event binding.

Operational risk:

- High. Submitting the form creates a work-order comment, records activity, reloads comments/history state, and re-renders the active work order.

Implementation scope:

- Added `src/utils/workspaceCommentEvents.js`.
- Added `tests/smoke/workspace-comment-events-smoke.js`.
- Moved only the `#comment-form` submit binding into the module.
- Kept `createComment`, comment insert, activity logging, comment reload, render, auth/company/location state, Supabase/RLS, and work-order data ownership in `app.js`.

Verification:

- Static JS checks: PASS for `app.js`, `src/utils/workspaceCommentEvents.js`, `tests/smoke/workspace-comment-events-smoke.js`, and `tests/smoke/resource-load.spec.js`.
- Targeted mock-DOM smoke: PASS for submit callback binding and missing-callback no-op.
- Local resource smoke: PASS.
- Hosted resource smoke: PASS after Pages propagation.
- Signed-in live smoke: PASS. Disposable work order `LFES disposable comment source 1779833704646` (`8ae75ce8-cf97-46fc-a6eb-ba1ca6e24ab6`) accepted comment `LFES disposable comment 1779833704646`; data-layer comment row `a42bf5e3-9596-4cd8-a88f-a712b7ca3c4c` was created.
- Reopened UI visual check: PASS. The comment appeared in the Work Order Detail Comments section after reopening the record.
- Cleanup: PASS. Admin UI deleted the disposable work order; data-layer verification returned `remainingWork=0` and `remainingComments=0`.

Behavior changed:

- No intended behavior change.

LFES catch:

- Comment form textarea is inside a collapsed `details` section. Live smokes must open the Comments section before filling the form, then reopen the record to verify rendered comment output.

Next:

- Continue only with another single contained boundary. Storage/photo/document flows, auth/session/company/location startup, SQL/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` remain blocked.

## LFES Boundary - Work-Order Quick Update Events - 2026-05-26

Boundary selected:

- `#quick-update-work-order-form` submit event binding.

Operational risk:

- High. Quick Update mutates work-order title/status/priority/assignment/resolution fields, may create equipment, may mark equipment down, records activity, and re-renders the active work order.

Implementation scope:

- Added `src/utils/workspaceQuickUpdateEvents.js`.
- Added `tests/smoke/workspace-quick-update-events-smoke.js`.
- Moved only the `#quick-update-work-order-form` submit binding into the module.
- Kept `updateWorkOrderQuickView`, work-order updates, equipment creation/status updates, activity logging, render, auth/company/location state, Supabase/RLS, and work-order data ownership in `app.js`.

Verification:

- Static JS checks: PASS for `app.js`, `src/utils/workspaceQuickUpdateEvents.js`, `tests/smoke/workspace-quick-update-events-smoke.js`, and `tests/smoke/resource-load.spec.js`.
- Targeted mock-DOM smoke: PASS for submit callback binding and missing-callback no-op.
- Local resource smoke: PASS.
- Hosted resource smoke: PASS after Pages propagation.
- Signed-in live smoke: PASS. Disposable work order `LFES disposable quick update source 1779834147629` (`90f8e997-0774-421c-83aa-3bad99802d0d`) saved resolution `LFES quick update resolution 1779834147629`, priority `medium`, and one `quick_update` event.
- Reopened UI value check: PASS. The Quick Update form resolution textarea value and priority select value matched the saved data.
- Cleanup: PASS. Admin UI deleted the disposable work order; data-layer verification returned `remainingWork=0` and `remainingEvents=0`.

Behavior changed:

- No intended behavior change.

LFES catch:

- Textarea values are not visible in `innerText`. Reopened Quick Update smokes should verify `inputValue()` for textarea/select fields, while visible chips can verify summary values such as priority.

Next:

- Continue only with another single contained boundary. Creating equipment through Quick Update, completion, storage/photo/document flows, auth/session/company/location startup, SQL/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` remain blocked unless selected separately.

## LFES Boundary - Full Work Order Details Events - 2026-05-26

Boundary selected:

- `#edit-work-order-form` submit event binding.

Operational risk:

- High. The full work-order edit form mutates description, due date, priority, type, assignment, procedure, cause/resolution, follow-up flag, safety fields, actual minutes, records activity, and re-renders the active work order.

Implementation scope:

- Added `src/utils/workspaceWorkOrderEditEvents.js`.
- Added `tests/smoke/workspace-work-order-edit-events-smoke.js`.
- Moved only the `#edit-work-order-form` submit binding into the module.
- Kept `updateWorkOrderDetails`, work-order updates, activity logging, safety/procedure guards, render, auth/company/location state, Supabase/RLS, and work-order data ownership in `app.js`.

Verification:

- Static JS checks: PASS for `app.js`, `src/utils/workspaceWorkOrderEditEvents.js`, `tests/smoke/workspace-work-order-edit-events-smoke.js`, and `tests/smoke/resource-load.spec.js`.
- Targeted mock-DOM smoke: PASS for submit callback binding and missing-callback no-op.
- Local resource smoke: PASS.
- Hosted resource smoke: PASS after Pages propagation.
- Signed-in live smoke: PASS. Disposable work order `LFES disposable edit source 1779834544980` (`eab5e5ae-8740-48c2-8a51-ac0ba95a000b`) saved edited description, edited resolution, priority `medium`, and one `updated` event.
- Reopened UI value check: PASS. The Full Work Order Details form description textarea, resolution textarea, and priority select values matched the saved data.
- Cleanup: PASS. Admin UI deleted the disposable work order; data-layer verification returned `remainingWork=0` and `remainingEvents=0`.

Behavior changed:

- No intended behavior change.

LFES catch:

- Exact-search result cards can resolve in automation while not being considered visible; forced click is acceptable only for the non-mutating reopen/value-check step after the result card is proven by selector and text. Mutation actions still require visible form controls.

Next:

- Continue only with another single contained boundary. Completion, delete, storage/photo/document flows, auth/session/company/location startup, SQL/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` remain blocked unless selected separately.

## LFES Boundary - PM Generation Events - 2026-05-26

Boundary selected:

- PM Generate Work event binding for `[data-generate-pm]`.

Operational risk:

- High.
- This enters a workflow mutation that creates a preventive work order and advances the PM schedule next-due date, but the boundary only transfers event binding and calls the injected `generatePreventiveWorkOrder` callback. Workflow mutation sequencing stays in `app.js`.

Implementation scope:

- Added `src/utils/workspacePmGenerationEvents.js`.
- Added `tests/smoke/workspace-pm-generation-events-smoke.js`.
- Moved `[data-generate-pm]` binding into the module.
- Kept app-owned `generatePreventiveWorkOrder` as an injected callback.
- Kept generated work-order creation, schedule next-due update, PM schedule data, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-pm-generation-events-1`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspacePmGenerationEvents.js`, `tests/smoke/workspace-pm-generation-events-smoke.js`, and `tests/smoke/resource-load.spec.js`.
- Targeted mock-DOM PM generation event smoke: PASS for generation callback and missing-callback no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the PM generation script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable PM schedule `LFES disposable PM generation 1779831850436` generated work order `c62cc130-9c2e-49c2-9404-e8b25f44fb7e`, and schedule next due advanced from `2026-06-15` to `2026-07-15`.
- Cleanup verification: PASS. The generated work order and PM schedule were removed through the manager/admin UI, and data-layer checks returned `remainingSchedules: 0` and `remainingWorkOrders: 0`.
- GitHub Actions: pending follow-up verifier after the docs commit.

LFES catch:

- Direct REST cleanup can be silently blocked by RLS for generated PM artifacts; manager/admin UI cleanup plus data-layer proof is the stable cleanup path.

Result:

- App deploy commit: `d1cef34` (`Extract workspace PM generation events`).
- `app.js` line count after extraction: 8,057.
- Behavior changed: no observed behavior change.

## LFES Boundary - Request Conversion Events - 2026-05-26

Boundary selected:

- Request conversion event binding for `[data-convert-request]`.

Operational risk:

- High.
- This enters a workflow mutation that creates a work order, marks a request converted, and records activity, but the boundary only transfers event binding and calls the injected `convertRequestToWorkOrder` callback. Workflow mutation sequencing stays in `app.js`.

Implementation scope:

- Added `src/utils/workspaceRequestConversionEvents.js`.
- Added `tests/smoke/workspace-request-conversion-events-smoke.js`.
- Moved `[data-convert-request]` binding into the module.
- Kept app-owned `convertRequestToWorkOrder` as an injected callback.
- Kept work-order creation, request status update, activity logging, request/work-order data, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-request-conversion-events-2`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceRequestConversionEvents.js`, `tests/smoke/workspace-request-conversion-events-smoke.js`, and `tests/smoke/resource-load.spec.js`.
- Targeted mock-DOM Request conversion event smoke: PASS for conversion callback and missing-callback no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Request conversion script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable request `LFES disposable request conversion 1779831207568` was converted to work order `e9bd306d-4339-4fc5-a4d1-7300d378eee3`.
- Cleanup verification: PASS. The created work order and converted request were removed through the manager/admin UI, and data-layer checks returned `remainingRequests: 0` and `remainingWorkOrders: 0`.
- GitHub Actions: pending follow-up verifier after the docs commit.

LFES catches:

- New event modules need both the `index.html` script tag and the top-level `app.js` destructuring alias. Missing the alias caused `Workspace Load Stopped` until fixed in `f69e96f`.
- The browser cached the broken `app.js` under the first request-conversion tag, so the recovery required bumping to `lfes-authority-request-conversion-events-2`.
- Direct cleanup for converted request artifacts can be blocked by RLS/grants on related event rows; manager/admin UI cleanup plus data-layer proof was the stable cleanup path.

Result:

- App deploy commits: `012466b` (`Extract workspace request conversion events`), `f69e96f` (`Fix request conversion event binder import`), and `e0d7d79` (`Bump request conversion event cache tag`).
- `app.js` line count after extraction/fix: 8,056.
- Behavior changed: no observed behavior change after the binder/cache fix.

## LFES Boundary - Part Confirm-Delete Events - 2026-05-26

Boundary selected:

- Part permanent delete event binding for `[data-delete-part].permanent-delete-button`, added to the existing Part delete module.

Operational risk:

- High.
- This confirms an irreversible inventory part delete through the existing app-owned `requestDeletePart` path, but the boundary only transfers event binding. Permission checks, deletion, document cleanup, state updates, notices, and render stay in `app.js`.

Implementation scope:

- Expanded `src/utils/workspacePartDeleteCancelEvents.js`.
- Moved `[data-delete-part].permanent-delete-button` binding into the module.
- Kept app-owned `requestDeletePart` as an injected callback for both opener and permanent-button behavior.
- Kept pending delete state, permanent delete implementation, permission checks, part data, document cleanup, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-part-delete-confirm-events-1`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspacePartDeleteCancelEvents.js`, and `tests/smoke/workspace-part-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Part delete event smoke: PASS for warning opener callback, permanent-button callback, cancel pending-state clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Part confirm-delete script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable part `LFES disposable part delete confirm 1779830808353 hose` was created, Delete Part rendered Cancel and Permanently Delete, Permanently Delete removed the disposable from Parts, and no unrelated part was touched.
- Cleanup verification: PASS. Data-layer check for disposable part `68c6da30-91e7-42f0-87ce-6ae472365893` returned `remaining: 0`.
- GitHub Actions: pending follow-up verifier after the docs commit.

LFES catch:

- Part cards must be opened before detail-only delete controls are available; list cards expose the part but do not render `[data-delete-part]` buttons.

Result:

- App deploy commit: `91a4dff` (`Extract workspace part delete confirm events`).
- `app.js` line count after extraction: 8,055.
- Behavior changed: no observed behavior change.

## LFES Boundary - Team Invite Confirm-Cancel Events - 2026-05-26

Boundary selected:

- Team invite confirm-cancel event binding for `[data-confirm-cancel-invite]`, added to the existing Team invite cancel module.

Operational risk:

- High.
- This confirms an invite cancellation through an app-owned RPC path, but the boundary only transfers event binding and calls the injected `cancelTeamInvite` callback. Invite creation, RPC implementation, reload, render, auth/company/location state, and Supabase/RLS stay in `app.js`.

Implementation scope:

- Expanded `src/utils/workspaceTeamInviteCancelEvents.js`.
- Moved `[data-confirm-cancel-invite]` binding into the module.
- Kept app-owned `cancelTeamInvite` as an injected callback.
- Kept invite creation, cancel RPC implementation, team invite data/reload, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-team-invite-confirm-events-1`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceTeamInviteCancelEvents.js`, and `tests/smoke/workspace-team-invite-cancel-events-smoke.js`.
- Targeted mock-DOM Team invite cancel event smoke: PASS for warning opener, keep/cancel reset, confirm-cancel callback, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Team invite confirm script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable invite `lfes.invite.confirm.1779830518673@maintainops.test` was created, Cancel Invite rendered Keep and Cancel Invite warning controls, confirm removed the disposable from Pending Invites, and no unrelated invite was touched.
- Cleanup verification: PASS. Data-layer lookup for `lfes.invite.confirm.1779830518673@maintainops.test` returned `remainingVisible: 0`.
- GitHub Actions: pending follow-up verifier after the docs commit.

LFES catch:

- The in-app browser virtual clipboard blocked `fill`/`type` for the email field, but raw keypress entry worked. Verify the typed field value before submitting when using this fallback.

Result:

- App deploy commit: `e984132` (`Extract workspace team invite confirm events`).
- `app.js` line count after extraction: 8,058.
- Behavior changed: no observed behavior change.

## LFES Boundary - Procedure Confirm-Delete Events - 2026-05-26

Boundary selected:

- Procedure permanent delete event binding for `[data-confirm-delete-procedure]`, added to the existing Procedure delete module.

Operational risk:

- High.
- This is an irreversible delete control, but the boundary only calls the app-owned `deleteProcedureTemplate` callback. Blocker verification, Supabase mutation sequencing, procedure step cleanup, state updates, notices, and render stay in `app.js`.

Implementation scope:

- Expanded `src/utils/workspaceProcedureDeleteCancelEvents.js`.
- Moved `[data-confirm-delete-procedure]` binding into the module.
- Kept app-owned `deleteProcedureTemplate` as an injected callback.
- Kept permanent delete implementation, blocker verification, procedure data/steps, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-procedure-delete-confirm-events-1`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceProcedureDeleteCancelEvents.js`, and `tests/smoke/workspace-procedure-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Procedure delete event smoke: PASS for warning opener callback, cancel pending-state clear, confirm-delete callback, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Procedure confirm-delete script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable procedure `LFES disposable procedure delete confirm 1779829924465` was created, Delete Procedure rendered Cancel and Permanently Delete, Permanently Delete removed the disposable from Procedures, and no unrelated procedure was touched.
- Cleanup verification: PASS. Data-layer check for disposable procedure `ce2d93ad-b88d-46d6-abeb-9ebaaf34ac0e` returned `remaining: 0`.
- GitHub Actions: pending follow-up verifier after the docs commit.

Result:

- App deploy commit: `492d9bb` (`Extract workspace procedure delete confirm events`).
- `app.js` line count after extraction: 8,060.
- Behavior changed: no observed behavior change.

## LFES Boundary - Equipment Confirm-Delete Events - 2026-05-26

Boundary selected:

- Equipment permanent delete event binding for `[data-confirm-delete-asset]`, added to the existing Equipment delete module.

Operational risk:

- High.
- This is an irreversible delete control, but the boundary only calls the app-owned `deleteAsset` callback. Supabase mutation sequencing, permission checks, link-count guards, storage cleanup, state updates, notices, and render stay in `app.js`.

Implementation scope:

- Expanded `src/utils/workspaceAssetDeleteCancelEvents.js`.
- Moved `[data-confirm-delete-asset]` binding into the module.
- Kept app-owned `deleteAsset` as an injected callback.
- Kept permanent delete implementation, permission checks, link-count guards, equipment data, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-asset-delete-confirm-events-1`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceAssetDeleteCancelEvents.js`, and `tests/smoke/workspace-asset-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Equipment delete event smoke: PASS for warning opener callback, cancel pending-state clear, confirm-delete callback, render, propagation stop, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Equipment confirm-delete script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable equipment `LFES disposable asset delete confirm 1779828673007` was created, Delete Equipment rendered Cancel and Permanently Delete, Permanently Delete removed the disposable from Equipment, and no unrelated equipment was touched.
- Cleanup verification: PASS. Data-layer check for disposable asset `9fb2daa2-1e13-4fbe-8d8d-52a2dd0591e2` returned `remaining: 0`.
- GitHub Actions: PASS after the earlier unauthenticated API rate-limit gap cleared. Verified runs included `96de48c` (`26474526945`) and the follow-up docs checkpoint `1f2b80f` (`26474583585`).

## LFES Boundary - Part Delete-Request Events - 2026-05-26

Boundary selected:

- Part delete warning opener event binding for `[data-delete-part]:not(.permanent-delete-button)`, added to the existing Part delete-cancel module.

Operational risk:

- Medium/high.
- The path is inside an irreversible delete flow with part usage/document cleanup, but this boundary only calls the app-owned warning opener and stops at Cancel. It does not confirm delete, delete parts, clean documents, or touch Supabase/RLS directly.

Implementation scope:

- Expanded `src/utils/workspacePartDeleteCancelEvents.js`.
- Moved only the non-permanent `[data-delete-part]:not(.permanent-delete-button)` warning-opener binding into the module.
- Kept app-owned `requestDeletePart` as an injected callback for opener behavior.
- Kept `.permanent-delete-button` binding, permanent delete, permission checks, part data, document cleanup, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-part-delete-request-events-1`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspacePartDeleteCancelEvents.js`, and `tests/smoke/workspace-part-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Part delete warning/cancel smoke: PASS for non-permanent delete-request callback, permanent-button exclusion, cancel pending-state clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Part delete-request script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable part `LFES disposable part delete request 1779828398671 hose` was created, Delete Part rendered Cancel and Permanently Delete, Cancel cleared the warning and restored only the non-permanent Delete Part button, then the disposable part was permanently deleted through the manager/admin UI.
- Cleanup verification: PASS. Data-layer check for disposable part `b60bc539-c336-4a77-bd6e-df939cc7431b` returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

LFES catch:

- Part delete uses the same `data-delete-part` attribute for both the warning opener and the permanent delete button. The permanent action is distinguished by `.permanent-delete-button`; it must remain bound in `app.js` for this boundary.

## LFES Boundary - Procedure Delete-Request Events - 2026-05-26

Boundary selected:

- Procedure delete warning opener event binding for `[data-delete-procedure]`, added to the existing Procedure delete-cancel module.

Operational risk:

- Medium/high.
- The path is inside an irreversible delete flow with blocker checks, but this boundary only calls the app-owned warning opener and stops at Cancel. It does not confirm delete, verify blockers, delete procedure records, delete steps, or touch Supabase/RLS directly.

Implementation scope:

- Expanded `src/utils/workspaceProcedureDeleteCancelEvents.js`.
- Moved `[data-delete-procedure]` warning-opener binding into the module.
- Kept app-owned `requestDeleteProcedureTemplate` as an injected callback.
- Kept `[data-confirm-delete-procedure]`, permanent delete, blocker verification, procedure data/steps, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-procedure-delete-request-events-1`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceProcedureDeleteCancelEvents.js`, and `tests/smoke/workspace-procedure-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Procedure delete warning/cancel smoke: PASS for delete-request callback, cancel pending-state clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Procedure delete-request script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable procedure `LFES disposable procedure delete request 1779827915362` was created, Delete Procedure rendered Cancel and Permanently Delete, Cancel cleared the warning and restored Delete Procedure, then the disposable procedure was permanently deleted through the manager/admin UI.
- Cleanup verification: PASS. Data-layer check for disposable procedure `2be4f6f4-c79c-4d8f-8ae5-d5f3d8a85345` returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

## LFES Boundary - PM Schedule Delete-Request Events - 2026-05-26

Boundary selected:

- PM schedule delete warning opener event binding for `[data-delete-schedule]`, added to the existing PM schedule delete-cancel module.

Operational risk:

- Medium/high.
- The path is inside an irreversible delete flow, but this boundary only calls the app-owned warning opener and stops at Cancel. It does not confirm delete, generate PM work, delete schedules, or touch Supabase/RLS directly.

Implementation scope:

- Expanded `src/utils/workspaceScheduleDeleteCancelEvents.js`.
- Moved `[data-delete-schedule]` warning-opener binding into the module.
- Kept app-owned `requestDeletePreventiveSchedule` as an injected callback.
- Kept `[data-confirm-delete-schedule]`, permanent delete, PM generation, schedule data, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-schedule-delete-request-events-1`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceScheduleDeleteCancelEvents.js`, and `tests/smoke/workspace-schedule-delete-cancel-events-smoke.js`.
- Targeted mock-DOM PM schedule delete warning/cancel smoke: PASS for delete-request callback, cancel pending-state clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the PM schedule delete-request script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable PM schedule `LFES disposable schedule delete request 1779827709348` was created, Delete rendered Cancel and Permanently Delete, Cancel cleared the warning and restored Delete, then the disposable schedule was permanently deleted through the manager/admin UI.
- Cleanup verification: PASS. Data-layer check for disposable schedule `7369cc0d-6462-4047-8f7e-8930009a7a32` returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

## LFES Boundary - Request Delete-Request Events - 2026-05-26

Boundary selected:

- Request delete warning opener event binding for `[data-delete-request]`, added to the existing Request delete-cancel module.

Operational risk:

- Medium/high.
- The path is inside an irreversible delete flow, but this boundary only calls the app-owned warning opener and stops at Cancel. It does not confirm delete, convert requests, open Quick Fix, delete requests, or touch Supabase/RLS directly.

Implementation scope:

- Expanded `src/utils/workspaceRequestDeleteCancelEvents.js`.
- Moved `[data-delete-request]` warning-opener binding into the module.
- Kept app-owned `requestDeleteMaintenanceRequest` as an injected callback.
- Kept `[data-confirm-delete-request]`, permanent delete, request conversion, request-origin Quick Fix, request data, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-request-delete-request-events-1`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceRequestDeleteCancelEvents.js`, and `tests/smoke/workspace-request-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Request delete warning/cancel smoke: PASS for delete-request callback, cancel pending-state clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Request delete-request script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable request `LFES disposable request delete request 1779827484622` was created, Delete rendered Cancel and Permanently Delete, Cancel cleared the warning and restored Delete, then the disposable request was permanently deleted through the manager/admin UI.
- Cleanup verification: PASS. Data-layer check for disposable request `dc7062dc-298f-4027-b9c3-b9518d98dd9d` returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

## LFES Boundary - Equipment Delete-Request Events - 2026-05-26

Boundary selected:

- Equipment delete warning opener event binding for `[data-delete-asset]`, added to the existing Equipment delete-cancel module.

Operational risk:

- Medium/high.
- The path is inside an irreversible delete flow, but this boundary only calls the app-owned warning opener and stops at Cancel. It does not confirm delete, delete equipment, clean storage, or touch Supabase/RLS directly.

Implementation scope:

- Expanded `src/utils/workspaceAssetDeleteCancelEvents.js`.
- Moved `[data-delete-asset]` warning-opener binding into the module.
- Kept app-owned `requestDeleteAsset` as an injected callback.
- Kept `[data-confirm-delete-asset]`, permanent delete, permission checks, blocker/link-count logic, equipment data, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Updated cache tags to `lfes-authority-asset-delete-request-events-1`.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceAssetDeleteCancelEvents.js`, and `tests/smoke/workspace-asset-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Equipment delete warning/cancel smoke: PASS for delete-request callback, cancel pending-state clear, render, propagation stop, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Equipment delete-request script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable equipment `LFES disposable asset delete request 1779827205046` was created, opened in Equipment detail, Delete Equipment rendered Cancel and Permanently Delete, Cancel cleared the warning and restored Delete Equipment, then the disposable equipment was permanently deleted through the manager/admin UI.
- Cleanup verification: PASS. Data-layer check for disposable asset `7656adb0-ee1e-4125-8715-9940dd26a5f2` returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

LFES catch:

- Test-account direct REST cleanup for a disposable equipment record can be silently blocked by RLS even when setup insert succeeds. For delete-flow cleanup, use the manager/admin UI path or verify the cleanup auth context can actually delete, then confirm removal at the data layer.

## LFES Boundary - Asset Location Warning Events - 2026-05-26

Boundary selected:

- Asset/location warning event binding for `[data-location-sensitive-asset]`.

Operational risk:

- Medium.
- This warning is workflow-adjacent because it tells users when selected equipment belongs to a different location, but this boundary only runs the existing warning updater on initial bind and select changes. It does not submit forms, confirm cross-location saves, mutate records, or touch Supabase/RLS.

Implementation scope:

- Added `src/utils/workspaceAssetLocationWarningEvents.js`.
- Moved only `[data-location-sensitive-asset]` initial/change event binding.
- Injected app-owned `updateAssetLocationWarning`.
- Kept cross-location mismatch calculation, warning text, confirmation gates, asset/location state, form submits, render ownership, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceAssetLocationWarningEvents.js?v=lfes-authority-asset-location-warning-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-asset-location-warning-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceAssetLocationWarningEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-asset-location-warning-events-smoke.js`.
- Targeted mock-DOM asset-location warning smoke: PASS for initial bind, change callback, and missing-callback no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the asset-location warning script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. The live app exposed two `[data-location-sensitive-asset]` controls, the request form equipment select was changed to `New thalmann`, and the warning remained blank as expected for the available same-location asset.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

LFES catch:

- The live dataset did not expose a cross-location equipment option in the request form during this smoke. The phase verifies the live selector/change binding and expected blank same-location warning state; mismatch text remains app-owned and should be covered by a dedicated cross-location smoke if a disposable cross-location fixture is created later.

## LFES Boundary - Request Delete-Cancel Events - 2026-05-26

Boundary selected:

- Request delete warning cancel event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path is inside a request delete flow, but this boundary only clears pending delete state and re-renders. It does not request delete, confirm delete, delete requests, convert requests, open Quick Fix, or touch Supabase/RLS directly.

Implementation scope:

- Added `src/utils/workspaceRequestDeleteCancelEvents.js`.
- Moved only `[data-cancel-delete-request]`.
- Injected app-owned pending delete setter, `renderWorkspace`, and document.
- Kept `[data-delete-request]`, `[data-confirm-delete-request]`, permanent delete, request conversion, Quick Fix from request, request data, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceRequestDeleteCancelEvents.js?v=lfes-authority-request-delete-cancel-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-request-delete-cancel-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceRequestDeleteCancelEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-request-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Request delete-cancel smoke: PASS for pending delete clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Request delete-cancel script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26469402958` completed successfully for `a9fcf55`.
- Signed-in live smoke: PASS. Disposable request `LFES disposable request 1779822739298` was created to expose the request delete warning path, opened in the manager/admin session, Delete rendered Cancel and Permanently Delete, Cancel cleared the warning and restored Delete, then the disposable request was permanently deleted.
- Cleanup verification: PASS. `LFES disposable request 1779822739298` no longer appeared in the app and no browser warning/error logs appeared.

Behavior changed:

- No observed behavior change.

LFES catch:

- Request card controls can sit below the current in-app viewport. Scroll the disposable request card into view before coordinate clicking lower controls.
- Use a disposable request for request delete-cancel smoke, then clean it up immediately.

Next:

- PM schedule delete-cancel or procedure delete-cancel may be considered if a safe disposable/visible record exists. Do not combine delete-confirm, request conversion, Quick Fix, storage/photo/document, auth/company/location, or broad render/event movement with another extraction.

## LFES Boundary - PM Schedule Delete-Cancel Events - 2026-05-26

Boundary selected:

- PM schedule delete warning cancel event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path is inside a preventive-maintenance delete flow beside PM generation and permanent delete controls, but this boundary only clears pending delete state and re-renders. It does not request delete, confirm delete, delete schedules, generate PM work, or touch Supabase/RLS directly.

Implementation scope:

- Added `src/utils/workspaceScheduleDeleteCancelEvents.js`.
- Moved only `[data-cancel-delete-schedule]`.
- Injected app-owned pending delete setter, `renderWorkspace`, and document.
- Kept `[data-delete-schedule]`, `[data-confirm-delete-schedule]`, permanent delete, PM generation, schedule data, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceScheduleDeleteCancelEvents.js?v=lfes-authority-schedule-delete-cancel-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-schedule-delete-cancel-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceScheduleDeleteCancelEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-schedule-delete-cancel-events-smoke.js`.
- Targeted mock-DOM PM schedule delete-cancel smoke: PASS for pending delete clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the PM schedule delete-cancel script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26469751689` completed successfully for `f76c15b`.
- Signed-in live smoke: PASS. Disposable schedule `LFES disposable PM schedule 1779823426651` was created to expose the PM schedule delete warning path, opened in the manager/admin session, Delete rendered Cancel and Permanently Delete, Cancel cleared the warning and restored Delete, then the disposable schedule was permanently deleted.
- Cleanup verification: PASS. `LFES disposable PM schedule 1779823426651` no longer appeared in the app.

Behavior changed:

- No observed behavior change.

LFES catch:

- The in-app browser text-entry path can block PM schedule setup when its virtual clipboard is unavailable. Creating a disposable schedule through authenticated Playwright setup is acceptable if the changed delete-cancel behavior is still verified through the manager/admin app UI and cleanup is verified.

Next:

- Procedure delete-cancel may be considered only if a safe disposable/visible record exists. Do not combine delete-confirm, PM generation, Quick Fix, storage/photo/document, auth/company/location, or broad render/event movement with another extraction.

## LFES Boundary - Procedure Delete-Cancel Events - 2026-05-26

Boundary selected:

- Procedure delete warning cancel event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path is inside a procedure delete flow with blocker verification for linked work orders and PM schedules, but this boundary only clears pending delete state and re-renders. It does not request delete, confirm delete, verify blockers, delete procedures/steps, or touch Supabase/RLS directly.

Implementation scope:

- Added `src/utils/workspaceProcedureDeleteCancelEvents.js`.
- Moved only `[data-cancel-delete-procedure]`.
- Injected app-owned pending delete setter, `renderWorkspace`, and document.
- Kept `[data-delete-procedure]`, `[data-confirm-delete-procedure]`, blocker verification, permanent delete, procedure data/steps, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceProcedureDeleteCancelEvents.js?v=lfes-authority-procedure-delete-cancel-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-procedure-delete-cancel-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceProcedureDeleteCancelEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-procedure-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Procedure delete-cancel smoke: PASS for pending delete clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Procedure delete-cancel script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26470365077` completed successfully for `d776856`.
- Signed-in live smoke: PASS. Disposable procedure `LFES disposable procedure 1779823870455` was created to expose the procedure delete warning path, opened in the manager/admin session, Delete Procedure rendered Cancel and Permanently Delete, Cancel cleared the warning and restored Delete Procedure, then the disposable procedure was permanently deleted.
- Cleanup verification: PASS. `LFES disposable procedure 1779823870455` no longer appeared in the app.

Behavior changed:

- No observed behavior change.

LFES catch:

- Procedure delete-cancel requires an unlinked disposable procedure. Linked procedures may correctly block permanent delete and are not appropriate for this cancel-boundary smoke.

Next:

- Reassess the next boundary from the authority map. Remaining delete-confirm, PM generation, Quick Fix, request conversion, storage/photo/document, broad forms, auth/company/location, and broad render/event movement remain blocked unless explicitly selected with a separate high-risk plan.

## LFES Boundary - Textarea Auto-Grow UI - 2026-05-26

Boundary selected:

- Textarea auto-grow helper and global textarea input binding.

Operational risk:

- Medium-low.
- The behavior touches many forms, but only updates textarea inline height. It does not submit forms, mutate records, render, or touch Supabase/RLS directly.

Implementation scope:

- Added `src/utils/workspaceTextareaAutoGrow.js`.
- Moved `autoGrowTextarea` and the global `textarea` input binding out of `app.js`.
- Kept all form submits, field payloads, validation, mutations, render ownership, auth/company/location state, and Supabase/RLS in `app.js`.
- Added `src/utils/workspaceTextareaAutoGrow.js?v=lfes-authority-textarea-auto-grow-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-textarea-auto-grow-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceTextareaAutoGrow.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-textarea-auto-grow-smoke.js`.
- Targeted mock-DOM textarea auto-grow smoke: PASS for initial sizing, input resizing, and null no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the textarea auto-grow script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Report Issue details textarea grew from 94px to 218px after 12 lines of input, with `src/utils/workspaceTextareaAutoGrow.js` and the textarea cache tag present and no browser warning/error logs.
- GitHub Actions verifier: the unauthenticated API was rate-limited. Use the public workflow page fallback or the next docs commit run to verify the current tree.

Behavior changed:

- No observed behavior change.

LFES catch:

- The public GitHub Actions page is the fallback when the unauthenticated API verifier is rate-limited; if it has not refreshed for a behavior commit, verify the current tree on the following docs commit before advancing into higher-risk work.

Next:

- Reassess before another extraction. Quick Fix, request conversion, storage/photo/document, broad forms, auth/company/location, delete confirmations, PM generation, and broad render/event movement remain blocked unless explicitly selected with a separate high-risk plan.

## LFES Boundary - Team Invite Cancel-Warning UI - 2026-05-26

Boundary selected:

- Team invite cancel-warning and keep/dismiss bindings:
  - `[data-cancel-invite]`
  - `[data-cancel-invite-cancel]`

Operational risk:

- Medium.
- The controls are adjacent to a real invite-cancel mutation, but this boundary only opens and dismisses the warning state. It does not confirm cancel, create invites, or touch Supabase/RLS directly.

Implementation scope:

- Added `src/utils/workspaceTeamInviteCancelEvents.js`.
- Moved only the warning-open and keep/dismiss Team invite bindings.
- Injected app-owned pending invite setter, local cancel-error setter, `renderWorkspace`, and document.
- Kept `[data-confirm-cancel-invite]`, `cancelTeamInvite`, invite creation, invite data, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceTeamInviteCancelEvents.js?v=lfes-authority-team-invite-cancel-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-team-invite-cancel-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceTeamInviteCancelEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-team-invite-cancel-events-smoke.js`.
- Targeted mock-DOM Team invite cancel-warning smoke: PASS for opening pending cancel state, clearing errors, keeping/dismissing the warning, render calls, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Team invite cancel-warning script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Existing pending invite `jeffrey.kinkaid@taylormetal.com` opened the warning, rendered Keep and confirm Cancel Invite, then Keep dismissed the warning and restored the original Cancel Invite without mutating the invite.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Behavior changed:

- No observed behavior change.

LFES catch:

- Team invite cancel-warning smoke can stay non-destructive when an existing pending invite is present. Do not click `[data-confirm-cancel-invite]` during this boundary smoke.

Next:

- Continue only with another bounded local UI/read-only event seam. Quick Fix, request conversion, storage/photo/document, broad forms, auth/company/location, delete confirmations, PM generation, invite confirm-cancel, and broad render/event movement remain blocked unless explicitly selected with a separate high-risk plan.

## LFES Boundary - Quick Fix Command Opener - 2026-05-26

Boundary selected:

- Main Quick Fix command opener:
  - `[data-command-action="quick-fix"]`

Operational risk:

- High-risk but contained.
- The opener enters a mutation-capable Quick Fix form, but this boundary only opens the form and clears conflicting UI modes. It does not submit Quick Fix, create work, convert requests, or touch Supabase/RLS directly.

Implementation scope:

- Added `src/utils/workspaceQuickFixCommandEvents.js`.
- Moved only the main Quick Fix command branch.
- Injected app-owned UI state setters, `setWorkOrderSearchMode`, `renderWorkspace`, localStorage, and document.
- Kept Quick Fix submit, request-specific Quick Fix, asset-specific Quick Fix, validation, created work records, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceQuickFixCommandEvents.js?v=lfes-authority-quick-fix-command-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-quick-fix-command-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceQuickFixCommandEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-quick-fix-command-events-smoke.js`.
- Targeted mock-DOM Quick Fix command smoke: PASS for clearing conflicting modes/details, entering Quick Fix mode, switching to My Work, persisting active section, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Quick Fix command script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Main Quick Fix rendered `#quick-fix-form`; Work Order create and Report Issue forms did not render; no Quick Fix submit occurred.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Behavior changed:

- No observed behavior change.

LFES catch:

- Quick Fix command smoke must stop at form-open verification unless the phase explicitly selects Quick Fix submit/mutation. Do not submit the form in this boundary.

Next:

- Continue only with another bounded local UI/read-only event seam. Request conversion, storage/photo/document, broad forms, auth/company/location, delete confirmations, PM generation, invite confirm-cancel, and broad render/event movement remain blocked unless explicitly selected with a separate high-risk plan.

## LFES Boundary - Asset-Specific Quick Fix Opener - 2026-05-26

Boundary selected:

- Asset-specific Quick Fix opener:
  - `[data-quick-fix-asset]`

Operational risk:

- High-risk but contained.
- The opener enters a mutation-capable Quick Fix form with an equipment preselected, but this boundary only opens the form. It does not submit Quick Fix, create work, convert requests, or touch Supabase/RLS directly.

Implementation scope:

- Added `src/utils/workspaceAssetQuickFixEvents.js`.
- Moved only the asset-specific Quick Fix opener.
- Injected app-owned UI state setters, `renderWorkspace`, localStorage, and document.
- Kept Quick Fix submit, request-specific Quick Fix, validation, created work records, asset data, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceAssetQuickFixEvents.js?v=lfes-authority-asset-quick-fix-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-asset-quick-fix-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceAssetQuickFixEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-asset-quick-fix-events-smoke.js`.
- Targeted mock-DOM asset Quick Fix smoke: PASS for setting selected asset, clearing request/detail state, entering Quick Fix mode, switching to My Work, persisting active section, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the asset Quick Fix script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Equipment detail for `New thalmann` opened Quick Fix For This Equipment, rendered `#quick-fix-form` with `New thalmann` selected, and did not render Work Order create or Report Issue forms. No Quick Fix submit occurred.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Behavior changed:

- No observed behavior change.

LFES catch:

- Equipment list cards open detail through the `.asset-card`/`[data-asset-id]` card itself, not `[data-open-asset]`; open the card before targeting `[data-quick-fix-asset]`.

Next:

- Continue only with another bounded local UI/read-only event seam. Request-specific Quick Fix, request conversion, storage/photo/document, broad forms, auth/company/location, delete confirmations, PM generation, invite confirm-cancel, and broad render/event movement remain blocked unless explicitly selected with a separate high-risk plan.

## LFES Boundary - Public Request Link Copy Button - 2026-05-26

Boundary selected:

- Public request link copy button:
  - `[data-copy-public-request-link]`

Operational risk:

- Medium.
- The binding is in the public QR/link settings area and touches clipboard feedback, but this boundary only copies an existing URL and updates temporary button text. It does not create, enable, disable, regenerate, or save links.

Implementation scope:

- Added `src/utils/workspacePublicRequestLinkCopyEvents.js`.
- Moved only the copy-button binding and temporary label feedback.
- Injected the existing `copyTextToClipboard` helper.
- Kept link creation, enable/disable/regeneration, public request link data, clipboard helper implementation, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspacePublicRequestLinkCopyEvents.js?v=lfes-authority-public-request-link-copy-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-public-request-link-copy-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspacePublicRequestLinkCopyEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-public-request-link-copy-events-smoke.js`.
- Targeted mock-DOM public request link copy smoke: PASS for success/failure labels, reset timer behavior, copied URL injection, and missing-callback no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the public request link copy script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Settings had enabled Copy QR Link buttons; clicking one produced `Copy failed` in the clipboard-limited in-app browser and reset to `Copy QR Link`, with no link mutation.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Behavior changed:

- No observed behavior change.

LFES catch:

- In the in-app browser clipboard-limited environment, `Copy failed` is an acceptable label if it resets to `Copy QR Link`; this boundary verifies feedback/reset and binding, not OS clipboard success.

Next:

- Continue only with another bounded local UI/read-only event seam. Public link create/enable/disable/regenerate, request-specific Quick Fix, request conversion, storage/photo/document, broad forms, auth/company/location, delete confirmations, PM generation, invite confirm-cancel, and broad render/event movement remain blocked unless explicitly selected with a separate high-risk plan.

## LFES Boundary - Request-Origin Quick Fix Opener - 2026-05-26

Boundary selected:

- Request-origin Quick Fix opener:
  - `[data-quick-fix-request]`

Operational risk:

- High-risk but contained.
- The opener enters a mutation-capable Quick Fix form from request context, but this boundary only calls the existing opener. It does not submit Quick Fix, convert/delete requests, create work, or touch Supabase/RLS directly.

Implementation scope:

- Added `src/utils/workspaceRequestQuickFixEvents.js`.
- Moved only the request-origin Quick Fix event binding.
- Injected the existing `openQuickFixForRequest` callback.
- Kept `openQuickFixForRequest`, Quick Fix submit, request conversion/deletion, request data, created work records, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceRequestQuickFixEvents.js?v=lfes-authority-request-quick-fix-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-request-quick-fix-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceRequestQuickFixEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-request-quick-fix-events-smoke.js`.
- Targeted mock-DOM request Quick Fix smoke: PASS for invoking the injected opener with the request id and missing-callback no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the request Quick Fix script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable request `LFES disposable request quick fix 1779825953666` opened Quick Fix from the request card, rendered `#quick-fix-form` with request context and description, and did not render Work Order create or Report Issue forms. No Quick Fix submit occurred.
- Cleanup verification: PASS. Disposable request `LFES disposable request quick fix 1779825953666` was permanently deleted and no longer appeared in the app.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Behavior changed:

- No observed behavior change.

LFES catch:

- Request-origin Quick Fix smoke needs a disposable request if no active requests exist. The smoke must stop at open-form/no-submit, then clean up the disposable request separately.

Next:

- Reassess before continuing. Quick Fix submit, request conversion, storage/photo/document, broad forms, auth/company/location, delete confirmations, PM generation, invite confirm-cancel, and broad render/event movement remain blocked unless explicitly selected with a separate high-risk plan.

## LFES Boundary - Public QR Print Button - 2026-05-26

Boundary selected:

- Public QR print button:
  - `#print-public-qr`

Operational risk:

- Medium-low.
- The binding lives on the public QR page, but it only invokes print. It does not submit public requests, change QR/public request link records, or touch Supabase/RLS directly.

Implementation scope:

- Added `src/utils/publicQrPrintEvents.js`.
- Moved only the public QR print button binding.
- Kept public QR lookup, QR/request URL generation, public request intake/submit, auth/session startup, render ownership, and Supabase access in `app.js`.
- Added `src/utils/publicQrPrintEvents.js?v=lfes-authority-public-qr-print-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-public-qr-print-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/publicQrPrintEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/public-qr-print-events-smoke.js`.
- Targeted mock-DOM public QR print smoke: PASS for invoking the injected print callback and missing-button no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the public QR print script/cache tag present.
- Hosted GitHub Pages resource smoke: PASS.
- Hosted public QR live smoke: PASS. QR page for token `zGl_nSkBQp9WkId5zg15ewHr` loaded with the new script/cache tags; Playwright Chromium stubbed `window.print`, clicked Print / Save PDF, and verified the print callback fired once with no browser warning/error logs.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Behavior changed:

- No observed behavior change.

LFES catch:

- The in-app browser evaluate sandbox could not add print-stub state for this public page. Use Playwright Chromium for public QR print smoke and stub `window.print` before clicking.

Next:

- Reassess before continuing. Public request submit, Quick Fix submit, request conversion, storage/photo/document, broad forms, auth/company/location, delete confirmations, PM generation, invite confirm-cancel, and broad render/event movement remain blocked unless explicitly selected with a separate high-risk plan.

## LFES Boundary - Equipment Delete-Cancel Events - 2026-05-26

Boundary selected:

- Equipment delete warning cancel event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path is inside a delete flow, but this boundary only clears pending delete state and re-renders. It does not request delete, confirm delete, delete equipment, clean storage, or touch Supabase/RLS directly.

Implementation scope:

- Added `src/utils/workspaceAssetDeleteCancelEvents.js`.
- Moved only `[data-cancel-delete-asset]`.
- Injected app-owned pending delete setter, `renderWorkspace`, and document.
- Kept `[data-delete-asset]`, `[data-confirm-delete-asset]`, link-count guards, permanent delete, permission checks, equipment data, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceAssetDeleteCancelEvents.js?v=lfes-authority-asset-delete-cancel-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-asset-delete-cancel-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceAssetDeleteCancelEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-asset-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Equipment delete-cancel smoke: PASS for `stopPropagation`, pending delete clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Equipment delete-cancel script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26463455097`, and Pages build/deployment run `26463454051` completed successfully for `52086d2`.
- Signed-in live smoke: PASS. Disposable equipment `LFES disposable equipment 1779822012824` was created to expose the delete warning path, opened in the manager/admin session, Delete Equipment rendered Cancel and Permanently Delete, Cancel cleared the warning and restored Delete Equipment, then the disposable record was permanently deleted.
- Cleanup verification: PASS. `LFES disposable equipment 1779822012824` no longer appeared in the app and no browser warning/error logs appeared.

Behavior changed:

- No observed behavior change.

LFES catch:

- Existing live equipment can be correctly delete-blocked by linked work orders, so it cannot exercise cancel controls.
- The QA/test login can create equipment but does not expose delete controls. Equipment delete/cancel smoke requires a manager/admin session plus a disposable unlinked equipment record.
- In-app browser text entry can fail due the virtual clipboard layer. It is acceptable to create the disposable setup record with a text-entry-capable browser, then verify the delete/cancel behavior in the manager/admin app session.

Next:

- Request delete-cancel, schedule delete-cancel, or procedure delete-cancel may be considered if a disposable/visible safe record exists. Do not combine request delete/confirm, request conversion, Quick Fix, storage/photo/document, auth/company/location, or broad render/event movement with another extraction.

## LFES Boundary - Export CSV Command Events - 2026-05-26

Boundary selected:

- `Export CSV` command event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path invokes a download side effect, but does not mutate app data, Supabase, auth, company, or location state.

Implementation scope:

- Added `src/utils/workspaceExportCsvCommandEvents.js`.
- Moved only `[data-command-action="export-csv"]`.
- Injected the app-owned `exportActiveSectionCsv` callback.
- Kept export row construction, active-section selection, filename selection, CSV/blob generation, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceExportCsvCommandEvents.js?v=lfes-authority-export-csv-command-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-export-csv-command-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceExportCsvCommandEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-export-csv-command-events-smoke.js`.
- Targeted mock-DOM Export CSV command smoke: PASS for invoking the injected export callback and missing-callback no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Export CSV command script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26462940370`, and Pages build/deployment run `26462939393` completed successfully for `dd307da`.
- Signed-in live smoke: PASS. A download-capable authenticated browser opened Equipment, opened `More`, clicked Export CSV, and captured a generated `equipment.csv` blob-link export with no dialogs and no warning/error logs.

Behavior changed:

- No observed behavior change.

LFES catch:

- The in-app browser does not support download events. Export/download smokes need a download-capable Playwright browser or a browser-side capture of generated anchor/blob behavior.
- Exporting an empty section intentionally shows `Nothing to export in this section yet.`; choose a section with known rows, such as Equipment in the current test company, when verifying the CSV path.

Next:

- Quick Fix is now the only remaining shared command opener in this router and remains higher-risk. Map it separately before touching it.

## LFES Boundary - New Work Order Command Events - 2026-05-26

Boundary selected:

- `New Work Order` command-opener event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path clears active detail/form modes, opens create-work-order mode, switches to Work Orders, persists active section, and renders a mutation-capable form, but does not submit the form.

Implementation scope:

- Added `src/utils/workspaceNewWorkOrderCommandEvents.js`.
- Moved only `[data-command-action="create-work-order"]`.
- Injected app-owned state setters, `setWorkOrderSearchMode`, `renderWorkspace`, storage, and document.
- Kept work-order create submit, validation, Quick Fix, request conversion, Export CSV, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceNewWorkOrderCommandEvents.js?v=lfes-authority-new-work-order-command-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-new-work-order-command-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceNewWorkOrderCommandEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-new-work-order-command-events-smoke.js`.
- Targeted mock-DOM New Work Order command smoke: PASS for clearing active detail/mode state, entering create-work-order mode, switching to Work Orders, persisting active section, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the New Work Order command script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26462656699`, and Pages build/deployment run `26462655467` completed successfully for `b9931f3`.
- Signed-in live smoke: PASS. Opened `More`, clicked New Work Order, confirmed `#create-work-order-form` rendered, confirmed Quick Fix form did not render, new script/cache tags were present, and no warning/error logs appeared.

Behavior changed:

- No observed behavior change.

Next:

- Export CSV remains a download side effect and should be planned separately.
- Quick Fix remains higher-risk and should not be combined with another change.

## LFES Boundary - Submit Request Command Events - 2026-05-26

Boundary selected:

- `Submit Request` command-opener event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path clears active detail/form modes, switches to Requests, resets request paging, persists active section, and reloads the request queue, but does not submit a request, convert a request, or mutate a record.

Implementation scope:

- Added `src/utils/workspaceSubmitRequestCommandEvents.js`.
- Moved only `[data-command-action="request"]`.
- Injected app-owned state setters, `setWorkOrderSearchMode`, `resetRequestsPage`, `reloadRequestQueue`, storage, and document.
- Kept request submit, request conversion, request deletion, public QR intake, Quick Fix, New Work Order, Export CSV, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceSubmitRequestCommandEvents.js?v=lfes-authority-submit-request-command-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-submit-request-command-events-1`.
- Updated hosted resource smoke resource list.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceSubmitRequestCommandEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-submit-request-command-events-smoke.js`.
- Targeted mock-DOM Submit Request command smoke: PASS for clearing active detail/form modes, switching to Requests, resetting request paging, persisting active section, request queue reload, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Submit Request command script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26462192835`, and Pages build/deployment run `26462191804` completed successfully for `b5328a7`.
- Signed-in live smoke: PASS. Opened `More`, clicked Submit Request, confirmed Requests rendered with the request form, new script/cache tags were present, and no warning/error logs appeared.

Behavior changed:

- No observed behavior change.

LFES catch:

- Command buttons inside the `More` disclosure need the disclosure state verified before clicking nested controls. Direct targeting can hit duplicate/hidden responsive controls or stale geometry. Future command-boundary smokes should open `More` first and confirm the nested command is visible.

Next:

- Continue only after reassessing remaining command clusters. New Work Order and Export CSV are broader form/download boundaries. Quick Fix remains higher-risk and should not be combined with another change.

## LFES Boundary - Report Issue Command Events - 2026-05-26

Boundary selected:

- `Report Issue` command-opener event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium-low.
- The path clears active detail/form modes, opens report issue mode, and renders, but does not submit the issue report.

Implementation scope:

- Added `src/utils/workspaceReportIssueCommandEvents.js`.
- Moved only `[data-command-action="report-issue"]`.
- Injected app-owned state setters, `renderWorkspace`, and document.
- Kept Quick Fix, New Work Order, Submit Request, Export CSV, issue creation, issue status mutation, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceReportIssueCommandEvents.js?v=lfes-authority-report-issue-command-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-report-issue-command-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `6c0ab08`, or remove `src/utils/workspaceReportIssueCommandEvents.js`, restore the original report-issue branch in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceReportIssueCommandEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-report-issue-command-events-smoke.js`: PASS.
- `node tests/smoke/workspace-report-issue-command-events-smoke.js`: PASS.
- Local resource smoke: PASS against `http://127.0.0.1:4192/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: unavailable due unauthenticated API rate limit. Direct hosted resource smoke passed for the deployed commit.
- Signed-in live smoke: PASS. Report Issue opened the issue form, scoped cancel closed it, new script/cache tags were present, and no warning/error logs appeared.

Behavior changed:

- No observed behavior change.

Next:

- Continue only after reassessing remaining command clusters. Quick Fix, New Work Order, Submit Request, and Export CSV are broader workflow/download boundaries and should not be combined with another change.

## LFES Boundary - Work Message Start Events - 2026-05-26

Boundary selected:

- Work Order `Message Team` start-composer event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path switches to Messages, opens the composer, links a work order, clears the active thread, persists state, and renders, but does not send or create a message thread.

Implementation scope:

- Added `src/utils/workspaceWorkMessageStartEvents.js`.
- Moved only `[data-start-work-message]`.
- Injected app-owned message/workspace state setters, storage, `renderWorkspace`, and document.
- Kept create-thread submit, send-reply submit, read-state writes, work-order/message data, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceWorkMessageStartEvents.js?v=lfes-authority-work-message-start-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-message-start-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `9b0381b`, or remove `src/utils/workspaceWorkMessageStartEvents.js`, restore the original `[data-start-work-message]` listener block in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceWorkMessageStartEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-work-message-start-events-smoke.js`: PASS.
- `node tests/smoke/workspace-work-message-start-events-smoke.js`: PASS.
- Local resource smoke: PASS against `http://127.0.0.1:4191/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: unavailable due unauthenticated API rate limit. Direct hosted resource smoke passed for the deployed commit.
- Signed-in live smoke: PASS. Hydralic Leak detail opened, Messages accordion opened, Message Team opened the Messages composer with Hydralic Leak linked, no send mutation occurred, and no warning/error logs appeared.

Behavior changed:

- No observed behavior change.

LFES catch:

- Work Order detail accordion controls can be below the viewport. The live smoke recorded summary/button rects, scrolled, and used coordinate clicks only for non-submit UI controls.

Next:

- Continue the LFES batch with another contained boundary. Keep create-thread, send-reply, read-state writes, Quick Fix, request conversion, storage/photo/document flows, mutation forms, and broad render/event movement blocked unless individually planned.

## LFES Boundary - Part Delete-Cancel Events - 2026-05-26

Boundary selected:

- Part delete warning cancel event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path sits inside a destructive delete zone, but the moved behavior only clears pending delete warning state and renders.

Implementation scope:

- Added `src/utils/workspacePartDeleteCancelEvents.js`.
- Moved only `[data-cancel-delete-part]`.
- Injected app-owned pending delete setter, `renderWorkspace`, and document.
- Kept delete request, permanent delete, permission checks, part data, document cleanup, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspacePartDeleteCancelEvents.js?v=lfes-authority-part-delete-cancel-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-part-delete-cancel-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `e8a0b66`, or remove `src/utils/workspacePartDeleteCancelEvents.js`, restore the original `[data-cancel-delete-part]` listener block in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspacePartDeleteCancelEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-part-delete-cancel-events-smoke.js`: PASS.
- `node tests/smoke/workspace-part-delete-cancel-events-smoke.js`: PASS.
- Local resource smoke: PASS against `http://127.0.0.1:4190/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: unavailable due unauthenticated API rate limit. Direct hosted resource smoke passed for the deployed commit.
- Signed-in live smoke: PASS. Parts opened at Auburn, `hydralic hose` detail opened, `Delete Part` opened the warning, scoped `[data-cancel-delete-part]` cleared the warning, `Delete Part` returned, no deletion occurred, and no warning/error logs appeared.

Behavior changed:

- No observed behavior change.

LFES catch:

- The page had two generic `Cancel` buttons, so the live smoke had to scope the cancel click to `[data-cancel-delete-part]`. Future cancel-boundary smokes should avoid generic button labels when danger zones are visible.

Next:

- Continue the LFES batch with another contained boundary. Keep permanent delete, request delete, mutation forms, Quick Fix, request conversion, storage/photo/document flows, and broad render/event movement blocked unless individually planned.

## LFES Boundary - Issue/Admin Local UI Events - 2026-05-26

Boundary selected:

- App issue report cancel and local admin setup action event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium-low.
- The path closes the report-issue panel and marks the local admin delete SQL setup checklist flag; it does not create issue reports or update issue statuses.

Implementation scope:

- Added `src/utils/workspaceIssueAdminUiEvents.js`.
- Moved only `[data-cancel-app-issue-report]` and `[data-setup-action="confirm-admin-delete-sql"]` local UI handling.
- Injected app-owned state setters, storage, `showNotice`, `renderWorkspace`, and document.
- Kept `#app-issue-report-form` submit, `[data-app-issue-status]` submit, setup rendering, admin data, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceIssueAdminUiEvents.js?v=lfes-authority-issue-admin-ui-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-issue-admin-ui-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `9e80f0b`, or remove `src/utils/workspaceIssueAdminUiEvents.js`, restore the original listener blocks in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceIssueAdminUiEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-issue-admin-ui-events-smoke.js`: PASS.
- `node tests/smoke/workspace-issue-admin-ui-events-smoke.js`: PASS.
- Local resource smoke: PASS against `http://127.0.0.1:4189/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: unavailable due unauthenticated API rate limit. Direct hosted resource smoke passed for the deployed commit.
- Signed-in live smoke: PASS. Report Issue opened the issue form, Cancel closed it, new script/cache tags were present, and no warning/error logs appeared.

Behavior changed:

- No observed behavior change.

Next:

- Continue the LFES batch with another contained boundary. Keep app issue creation/status mutations, command actions, Quick Fix, request conversion, storage/photo/document flows, mutation forms, and broad render/event movement blocked unless individually planned.

## LFES Boundary - Message Center Thread Events - 2026-05-26

Boundary selected:

- Message Center thread open/read-state event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium/high.
- The path changes active thread state, persists thread/section state, closes the composer for work-linked threads, calls `markMessageThreadRead`, and renders.

Implementation scope:

- Added `src/utils/workspaceMessageThreadEvents.js`.
- Moved only `[data-message-thread]` and `[data-open-work-message-thread]` bindings.
- Injected app-owned state setters, storage, `markMessageThreadRead`, `renderWorkspace`, and document.
- Kept `markMessageThreadRead` implementation, Supabase read-state write, create-thread submit, send-reply submit, message data loading, render ownership, auth/company/location state, SQL/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceMessageThreadEvents.js?v=lfes-authority-message-thread-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-message-thread-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `04f4a58`, or remove `src/utils/workspaceMessageThreadEvents.js`, restore the original thread listener blocks in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceMessageThreadEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-message-thread-events-smoke.js`: PASS.
- `node tests/smoke/workspace-message-thread-events-smoke.js`: PASS.
- Local resource smoke: PASS against `http://127.0.0.1:4188/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: unavailable due unauthenticated API rate limit; public Actions list was stale for this phase. Direct hosted resource smoke passed for the deployed commit.
- Signed-in live smoke: PASS. Messages opened, QA Phase 9I thread opened, thread detail/reply box rendered, new script/cache tags were present, and no warning/error logs appeared.

Behavior changed:

- No observed behavior change.

Next:

- Continue the LFES batch with another contained boundary. Keep create-thread, send-reply, Quick Fix, request conversion, storage/photo/document flows, mutation forms, and broad render/event movement blocked unless individually planned.

## LFES Boundary - Workspace Section Navigation Events - 2026-05-26

Boundary selected:

- Main workspace `[data-section]` navigation event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path changes active section, clears detail/form modes, resets work paging, persists active section, renders, and reloads work/request queues.

Implementation scope:

- Added `src/utils/workspaceSectionNavigationEvents.js`.
- Moved only `[data-section]` binding and its non-mutating UI-state orchestration.
- Injected app-owned state setters, `visibleNavItems`, `setWorkOrderSearchMode`, `resetWorkOrderPage`, `renderWorkspace`, `reloadWorkOrderQueue`, `reloadRequestQueue`, storage, and document.
- Kept visible-nav rules, queue loader implementations, command actions, mutations, auth/company/location state, render ownership, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceSectionNavigationEvents.js?v=lfes-authority-section-navigation-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-section-navigation-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `f3ea2e6`, or remove `src/utils/workspaceSectionNavigationEvents.js`, restore the original `[data-section]` listener block in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceSectionNavigationEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-section-navigation-events-smoke.js`: PASS.
- `node tests/smoke/workspace-section-navigation-events-smoke.js`: PASS.
- Local resource smoke: PASS against `http://127.0.0.1:4187/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: local verifier hit unauthenticated API rate limit after seeing the run in progress; public run page verified `Status Success` for `f3ea2e6`, Resource Load Smoke run `https://github.com/loufish727/MaintainOps/actions/runs/26460676489`.
- Signed-in live smoke: PASS. Work Orders, Requests, and Parts navigation each rendered expected section headings with no warning/error logs.

Behavior changed:

- No observed behavior change.

Next:

- Continue the LFES batch with another contained boundary. Keep command actions, Quick Fix, request conversion, storage/photo/document flows, mutation forms, and broad render/event movement blocked unless individually planned.

## LFES Boundary - Parts Search Events - 2026-05-26

Boundary selected:

- Parts Inventory search input and submit event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium-low.
- The path updates search text, persists localStorage, resets parts pagination, renders, restores search focus/cursor, and scrolls back to the parts list on submit.

Implementation scope:

- Added `src/utils/workspacePartSearchEvents.js`.
- Moved only `#part-search-form` input and submit handling.
- Injected app-owned part search state setter, `resetPartsPage`, `renderWorkspace`, storage, document, and testable `FormData` dependency.
- Kept part data, create/restock/use/edit/delete forms, source rename, part document upload, render ownership, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspacePartSearchEvents.js?v=lfes-authority-part-search-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-part-search-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `72ef610`, or remove `src/utils/workspacePartSearchEvents.js`, restore the original `#part-search-form` listener block in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspacePartSearchEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-part-search-events-smoke.js`: PASS.
- `node tests/smoke/workspace-part-search-events-smoke.js`: PASS.
- Local resource smoke: PASS against `http://127.0.0.1:4186/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `72ef610`, Resource Load Smoke run `https://github.com/loufish727/MaintainOps/actions/runs/26460275221`.
- Signed-in live smoke: PASS. Browser automation text entry hit the known virtual clipboard limitation, so the user manually entered `hose`; verified `Search parts` value `hose`, visible `hydralic hose` card, new script/cache tags, and no warning/error logs.

Behavior changed:

- No observed behavior change.

Next:

- Continue the LFES batch with another contained event boundary. Keep part mutation forms, source rename, document upload, delete, Quick Fix, request conversion, storage/photo/document flows, and broad render/event movement blocked unless individually planned.

## LFES Boundary - Message Center Local UI Events - 2026-05-26

Boundary selected:

- Message Center local UI event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path updates message filter/search/composer UI state and linked work-order navigation, but deliberately avoids thread open/read-state writes and message send/create mutations.

Implementation scope:

- Added `src/utils/workspaceMessageUiEvents.js`.
- Moved only `[data-message-filter]`, `[data-open-linked-work-order]`, `[data-clear-message-work-link]`, `#message-search`, `#message-thread-type` composer sync, and `[data-quick-reply]`.
- Injected app-owned state setters, storage, `renderWorkspace`, `messageComposerScopeNote`, and `autoGrowTextarea`.
- Kept `[data-message-thread]`, `[data-open-work-message-thread]`, `markMessageThreadRead`, `#message-thread-form` submit, `#message-reply-form` submit, message data loading, Supabase/RLS, auth/company/location state, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceMessageUiEvents.js?v=lfes-authority-message-ui-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-message-ui-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `d4a8503`, or remove `src/utils/workspaceMessageUiEvents.js`, restore the original Message UI listener blocks in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceMessageUiEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-message-ui-events-smoke.js`: PASS.
- `node tests/smoke/workspace-message-ui-events-smoke.js`: PASS.
- Local resource smoke: PASS against `http://127.0.0.1:4185/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `d4a8503`, Resource Load Smoke run `https://github.com/loufish727/MaintainOps/actions/runs/26459972613`.
- Signed-in live smoke: PASS. Messages opened, filter controls remained usable, quick reply `On it` inserted into the active reply textbox, and console stayed quiet.

Behavior changed:

- No observed behavior change.

LFES catch:

- The browser read-only evaluation scope could not read `localStorage` during live smoke, so live verification used visible DOM evidence instead. The targeted mock smoke remains the storage-state proof for this boundary.

Next:

- Select the next hard boundary from the authority map. Message thread-open/read-state writes remain mutation-adjacent and should be planned separately from send/reply forms.

## LFES Boundary - Parts Detail UI Events - 2026-05-26

Boundary selected:

- Parts detail open/close and source-manager toggle event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path changes active part detail state and part source-manager UI visibility inside the inventory screen, but does not mutate business records.

Implementation scope:

- Added `src/utils/workspacePartDetailEvents.js`.
- Moved only `[data-open-part]`, `[data-close-part-detail]`, and `[data-toggle-part-sources]` bindings.
- Injected `activePartId` and `showPartSourceManager` UI-state access plus `renderWorkspace`.
- Kept part data, source data, inventory mutations, source rename forms, part document upload, delete flow, auth/company/location state, SQL/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspacePartDetailEvents.js?v=lfes-authority-part-detail-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-part-detail-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `3a99bfd`, or remove `src/utils/workspacePartDetailEvents.js`, restore the original part detail listener block in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspacePartDetailEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-part-detail-events-smoke.js`: PASS.
- `node tests/smoke/workspace-part-detail-events-smoke.js`: PASS.
- `git diff --check`: PASS, with only existing CRLF warnings.
- Local resource smoke: PASS against `http://127.0.0.1:4184/` after switching from unavailable `python -m http.server` to the local Node static-server method.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `3a99bfd`, Resource Load Smoke run `https://github.com/loufish727/MaintainOps/actions/runs/26459512566`.
- Signed-in live smoke: PASS. Parts opened at Auburn, `hydralic hose` opened into Part Detail, `Edit Sources` revealed source-manager UI, `Back to parts` returned to Parts Inventory, and the `hydralic hose` card was visible again.

Behavior changed:

- No observed behavior change.

LFES catch:

- `python -m http.server` is not available in this Windows environment because `python` resolves to the Microsoft Store shim. Future local resource/browser smokes should use the existing local Node static-server method.

Next:

- Select the next hard boundary from the authority map. Message navigation remains mutation-adjacent because opening a thread marks it read; send/reply forms stay blocked.

## LFES Boundary - Team Work-View Events - 2026-05-26

Boundary selected:

- Team member `View Work` event binding from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The path crosses from Team into Work Orders, applies the assignee filter, resets work-order paging, persists state, clears active detail/form modes, and renders.

Implementation scope:

- Added `src/utils/workspaceTeamWorkViewEvents.js`.
- Moved only `[data-view-member-work]` binding and its UI-state orchestration.
- Injected state setters, `resetWorkOrderPage`, `renderWorkspace`, storage, and document.
- Kept state ownership, team data, work-order filtering, rendering, forms, mutations, auth/company/location state, SQL/RLS, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceTeamWorkViewEvents.js?v=lfes-authority-team-work-view-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-team-work-view-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `0d67122`, or remove `src/utils/workspaceTeamWorkViewEvents.js`, restore the original `[data-view-member-work]` listener block in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceTeamWorkViewEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `git diff --check`: PASS, with only existing CRLF warnings.
- Targeted mock-DOM Team work-view smoke: PASS for state setters, localStorage persistence, work-page reset, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4183/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `0d67122`, Resource Load Smoke run `https://github.com/loufish727/MaintainOps/actions/runs/26458707591`.
- Signed-in live smoke: PASS. Team opened, Lee Gaede `View Work` was clicked, and Work Orders rendered `Lee Gaede Work`, `Assigned to Lee Gaede`, and `Hydralic Leak`.

Behavior changed:

- No observed behavior change.

Next:

- Select the next hard boundary from the authority map. Message read-only navigation may be considered only after mapping read-state effects; send/reply forms stay blocked.

## LFES Boundary - Work-Order Delete Events - 2026-05-26

Boundary selected:

- Work Order Detail delete request/cancel/confirm orchestration from `bindWorkspaceEvents()`.

Operational risk:

- High.
- The path permanently deletes a work order, performs best-effort photo storage cleanup, and relies on database cascade for linked comments, events, parts used, and photo records.

Implementation scope:

- Added `src/utils/workspaceWorkOrderDeleteEvents.js`.
- Moved `requestDeleteWorkOrder(id)`, `deleteWorkOrder(id)`, and the three delete event bindings.
- Injected app-owned dependencies: permission check, alert, Supabase row delete callback, photo storage cleanup callback, photo path lookup, state setters, notice, render, renderWorkspace, timeout wrapper, friendly save error, and warning logger.
- Kept direct Supabase client access, auth/company/location state, photo maps, render ownership, SQL/RLS, storage policies, other delete flows, Quick Fix, request conversion, storage/photo/document upload flows, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceWorkOrderDeleteEvents.js?v=lfes-authority-work-delete-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-delete-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `171037e`, or remove `src/utils/workspaceWorkOrderDeleteEvents.js`, restore the original delete listener blocks plus `requestDeleteWorkOrder` and `deleteWorkOrder` in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceWorkOrderDeleteEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `git diff --check`: PASS, with only existing CRLF warnings.
- Targeted mock-DOM delete smoke: PASS for request, cancel, confirm, denied permission, storage-warning continuation, delete-error path, thrown-error path, state clearing, notice, and render.
- Local resource smoke: PASS against `http://127.0.0.1:4182/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `171037e`, Resource Load Smoke run `https://github.com/loufish727/MaintainOps/actions/runs/26458080821`.
- Signed-in manager/admin live smoke: PASS. Disposable work order `QA LFES delete smoke 2026-05-26T15-33-07-546Z` was created through authenticated Supabase REST because browser text entry was unavailable, then the app UI opened detail, opened the permanent-delete warning, canceled once, reopened, permanently deleted it, returned to Work Orders, and no longer showed the disposable title.
- Data-layer proof: authenticated Supabase REST lookup for `cb06e316-fb24-434c-82b4-5c2f4be8a650` returned `rows: []`.

Behavior changed:

- No observed behavior change.

LFES catch:

- The in-app browser text-entry path can fail when its virtual clipboard is unavailable. For delete-only live smoke, an authenticated setup insert may create the disposable record, but the changed delete behavior must still be verified through the app UI and followed by data-layer deletion proof.

Next:

- Select the next hard boundary from the authority map. Do not combine request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## LFES Boundary - Work-Order Completion Events - 2026-05-26

Boundary selected:

- Work Order Detail completion form submit handling and safety checkbox sync from `bindWorkspaceEvents()`.

Operational risk:

- High.
- This path builds the completion payload, calls an injected Supabase update, records work-order history, applies safety payload helpers, updates form error/button UI, shows notices, and renders.

Implementation scope:

- Added `src/utils/workspaceWorkOrderCompletionEvents.js`.
- Moved full `completeWorkOrder(event)` behavior and `syncSafetyDeviceChecks(event)`.
- Injected app-owned dependencies: active work-order lookup, procedure lookup, checklist/safety helpers, update callback, activity logger, timeout wrapper, notice/error helpers, render, and document.
- Kept Supabase access, auth/company/location state, work-order arrays, safety payload helpers, shared quick-update/status current-safety helper, delete, Quick Fix, request conversion, storage/photo/document flows, SQL/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.
- Added `src/utils/workspaceWorkOrderCompletionEvents.js?v=lfes-authority-work-completion-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-completion-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `d9a1922`, or remove `src/utils/workspaceWorkOrderCompletionEvents.js`, restore the original completion form and safety checkbox listener blocks plus `completeWorkOrder` and `syncSafetyDeviceChecks` in `app.js`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceWorkOrderCompletionEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `git diff --check`: PASS, with only existing CRLF warnings.
- Targeted mock-DOM completion smoke: PASS for success payload/update/log/render/button restore, checklist gate, safety gate, update-error path, log-warning path, submit binding, and safety checkbox sync.
- Local resource smoke: PASS against `http://127.0.0.1:4181/`.
- Local browser boot smoke: PASS; reached login screen with new script/cache tags present and no warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions public run-list verification: PASS for Resource Load Smoke #132 on `d9a1922`; Pages build/deployment #180 also completed successfully. Local verifier hit GitHub API rate limiting.
- Signed-in manager/admin live smoke: PASS. Created disposable Quick Fix work order `QA LFES completion smoke 2026-05-26T15-16-53-084Z`, completed it through the extracted completion path with `actual_minutes = 5`, verified Detail status `Completed`, timestamp/minutes, notes, and resolution, then permanently deleted the disposable record through the app UI.

Behavior changed:

- No observed behavior change.

LFES catches:

- Completion smoke must use `actual_minutes` values compatible with the rendered `step="5"` input. Invalid values such as `3` are blocked by native browser validation before the handler runs.
- Lower-page operational buttons can stall with high-level browser locator clicks in the in-app browser. For authorized disposable smokes, record DOM/rect evidence, scroll the target into view, and use coordinate click only after the locator path stalls.

Next:

- Delete remains the next high-risk work-order target. Map cascade, rollback, cleanup, and smoke coverage before any implementation.

## LFES Boundary - Work-Order Detail Status Dropdown Events - 2026-05-26

Boundary selected:

- Work Order Detail status dropdown binding from `bindWorkspaceEvents()`.

Operational risk:

- High.
- The moved binding triggers `updateWorkOrderStatus`, which delegates to `setWorkOrderStatus` and the real Supabase-backed status mutation path.

Implementation scope:

- Added `src/utils/workspaceWorkOrderDetailStatusEvents.js`.
- Moved only `#status-select` change binding.
- Injected `updateWorkOrderStatus`.
- Left status mutation logic, status guards, Supabase/RLS, quick status buttons, assignment, delete, completion, auth/startup, and state ownership in `app.js`.
- Added `src/utils/workspaceWorkOrderDetailStatusEvents.js?v=lfes-authority-work-detail-status-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-detail-status-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `d0bf9dd`, or remove `src/utils/workspaceWorkOrderDetailStatusEvents.js`, restore the original `#status-select` listener block in `bindWorkspaceEvents()`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceWorkOrderDetailStatusEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `git diff --check`: PASS.
- Targeted mock-DOM event smoke: PASS for `#status-select` change binding and missing-select no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4180/`.
- Local browser boot smoke: PASS; reached login screen with clean logs and new script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions public run-list verification: PASS for Resource Load Smoke #130 on `d0bf9dd`; local verifier was blocked by GitHub API rate limiting.
- Signed-in live smoke: PASS. `Hydralic Leak` Work Order Detail status changed from `in_progress` to `open`, then restored to `in_progress`, with clean logs.

Behavior changed:

- No observed behavior change.

Process note:

- This boundary did not reduce `app.js` line count because the old listener was already a thin delegated wrapper. The value is reduced concentrated event authority, not line reduction.

## LFES Boundary - Work-Order Downtime Copy Events - 2026-05-26

Boundary selected:

- Work-order downtime email copy buttons from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The moved binding is non-mutating but touches clipboard behavior and temporary button state.

Implementation scope:

- Added `src/utils/workspaceWorkOrderDowntimeEvents.js`.
- Moved only `[data-copy-downtime]` click binding.
- Injected work-order lookup, `downtimeEmailSubject`, `downtimeEmailBody`, and `copyTextToClipboard`.
- Left subject/body builders, clipboard implementation, work-order state, Supabase/RLS, status, assignment, delete, completion, and auth/startup in `app.js`.
- Added `src/utils/workspaceWorkOrderDowntimeEvents.js?v=lfes-authority-work-downtime-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-downtime-events-1`.
- Updated hosted resource smoke resource list.
- Added the role-gated smoke rule to `docs/DEBUG_PROCESS.md`.

Rollback path:

- Revert `9eac566`, or remove `src/utils/workspaceWorkOrderDowntimeEvents.js`, restore the original `[data-copy-downtime]` listener block in `bindWorkspaceEvents()`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceWorkOrderDowntimeEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `git diff --check`: PASS.
- Targeted mock-DOM event smoke: PASS for subject copy success, body copy failure state, reset labels, and missing-work-order no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4179/`.
- Local browser boot smoke: PASS; reached login screen with clean logs and new script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions public run verification: PASS for `9eac566`, run `https://github.com/loufish727/MaintainOps/actions/runs/26455942889`. The local verifier hit GitHub API rate limiting while pending.
- Signed-in live smoke: PASS. `Hydralic Leak` Work Order Detail showed copy buttons; `Copy Subject` and `Copy Email Body` changed to a copy result state and reset to their original labels.

Behavior changed:

- No observed behavior change.

LFES catch:

- Clipboard fallback can settle slower than a fixed sleep in browser automation. Future copy-button smoke should wait conditionally for the reset label rather than sleeping for the nominal timeout.

## LFES High-Risk Boundary - Work-Order Assignment Events - 2026-05-26

Boundary selected:

- Work-order assignment event wiring from `bindWorkspaceEvents()`.

Operational risk:

- High.
- The moved binding triggers assignment mutations through app.js-owned `assignWorkOrderToMe` and `assignWorkOrderFromCard`.

Implementation scope:

- Added `src/utils/workspaceWorkOrderAssignmentEvents.js`.
- Moved only `[data-assign-me]` click binding and `[data-card-assign]` submit/click/change binding.
- Injected `assignWorkOrderToMe` and `assignWorkOrderFromCard`.
- Left assignment mutation logic, permission checks, Supabase/RLS, status changes, delete flows, downtime copy, completion flow, auth/startup, and state ownership in `app.js`.
- Added `src/utils/workspaceWorkOrderAssignmentEvents.js?v=lfes-authority-work-assignment-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-assignment-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `892f4c2`, or remove `src/utils/workspaceWorkOrderAssignmentEvents.js`, restore the original `[data-assign-me]` and `[data-card-assign]` listener blocks in `bindWorkspaceEvents()`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceWorkOrderAssignmentEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `git diff --check`: PASS.
- Targeted mock-DOM event smoke: PASS for assign-to-me click, card assignment submit, card click stopPropagation, assigned_to change auto-submit, and unrelated change ignored.
- Local resource smoke: PASS against `http://127.0.0.1:4178/`.
- Local browser boot smoke: PASS; reached login screen with clean logs and new script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `892f4c2`, run `https://github.com/loufish727/MaintainOps/actions/runs/26455282763`.
- Dedicated QA/test account smoke: PASS for hidden assignment controls on non-manager/non-admin role.
- Manager/admin signed-in live smoke: PASS. `Hydralic Leak` changed from Lee Gaede to Louie Fisher via `Assign To Me`, showed the changed owner in Work Order Detail, then restored to Lee Gaede through the card assignment control.

Behavior changed:

- No observed behavior change.

LFES catch:

- Assignment live smoke requires role-aware coverage. The QA/test account correctly hides assignment controls, so mutation/restore coverage needs a manager/admin session while the QA/test account remains useful for denied/hidden-control verification.

## LFES High-Risk Boundary - Quick Work-Order Status Events - 2026-05-26

Boundary selected:

- Quick work-order status buttons from `bindWorkspaceEvents()`.

Operational risk:

- High.
- The moved binding triggers `setWorkOrderStatus`, which performs status guards, Supabase mutation through `updateWorkOrderSafely`, work-order event recording, notice display, active work-order state update, and render.

Implementation scope:

- Added `src/utils/workspaceWorkOrderStatusEvents.js`.
- Moved only `[data-quick-status]` click binding.
- Injected `setWorkOrderStatus` and `showNotice`.
- Left status mutation logic, assignment, delete, downtime copy, detail status dropdown, completion flow, Supabase/RLS, auth/startup, and state ownership in `app.js`.
- Added `src/utils/workspaceWorkOrderStatusEvents.js?v=lfes-authority-work-status-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-status-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `5828262`, or remove `src/utils/workspaceWorkOrderStatusEvents.js`, restore the original `[data-quick-status]` listener block in `bindWorkspaceEvents()`, remove the resource-smoke entry, and restore the previous cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceWorkOrderStatusEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `git diff --check`: PASS.
- Targeted mock-DOM event smoke: PASS for success, false return, thrown error, stopPropagation, disabled/Saving state, restoration, and warning notice.
- Local resource smoke: PASS against `http://127.0.0.1:4177/`.
- Local browser boot smoke: PASS.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `5828262`, run `https://github.com/loufish727/MaintainOps/actions/runs/26454460812`.
- Signed-in live smoke with QA/test account: PASS after correcting the smoke expectation.
- Live mutation/restore path changed `Hydralic Leak` from `in_progress` to `open`, observed Work Order Detail status `open`, restored to `in_progress`, and observed Work Order Detail status `in_progress`.

Behavior changed:

- No observed behavior change.

LFES catch:

- The first live smoke failed because it expected the list card to remain visible after a quick-status mutation. Actual app behavior intentionally sets `activeWorkOrderId` and renders Work Order Detail after status change. Future quick-status smoke should assert the detail status after mutation, then restore through the detail quick-status control.

## LFES Medium-Risk Authority Boundary - Workspace Search Events - 2026-05-21

Boundary selected:

- Workspace search and exact work-search read-only events from `bindWorkspaceEvents()`.

Operational risk:

- Medium.
- The moved event cluster mutates local search/detail/mode/page state, invalidates exact-search cache, reloads Work Order and Request read queues, restores search focus, and toggles exact work-search mode.

Expected behavior:

- Typing in visible workspace search persists the query.
- Non-empty search clears active work/equipment/part detail and form modes.
- Search input resets work, parts, and request page state.
- Search input reloads Work Order and Request read queues.
- Focus returns to the same visible search input with cursor at the end.
- "Page through all matching work orders" opens Work Orders exact-search mode.
- "Back to search preview" exits exact-search mode and returns to the global search preview.
- No mutation, delete, upload, auth, QR submit, request conversion, or form submit behavior changes.

Implementation scope:

- Added `src/utils/workspaceSearchEvents.js`.
- Replaced only `.workspace-search-input`, `[data-view-work-search]`, and `[data-close-work-search]` listener blocks in `bindWorkspaceEvents()` with `bindWorkspaceSearchEvents(...)`.
- Added explicit state setters/getters and read-reload/reset/cache dependencies.
- Added `src/utils/workspaceSearchEvents.js?v=lfes-authority-workspace-search-events-1` before `app.js`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-workspace-search-events-1`.
- Updated hosted resource smoke resource list.

Rollback path:

- Revert `61f6387`, or remove `src/utils/workspaceSearchEvents.js`, restore the original three listener blocks in `bindWorkspaceEvents()`, and restore the prior app cache tag.

Smoke results:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceSearchEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- Targeted mock-DOM event smoke: PASS for search input, exact-search entry, exact-search close, storage writes, read reload calls, page resets, cache invalidation, and focus restoration.
- Local resource smoke: PASS against `http://127.0.0.1:4187/`.
- Local browser boot smoke: PASS with new script/cache tag and no page errors.
- Hosted GitHub Pages resource smoke: PASS after Pages propagation.
- Live signed-in smoke: PASS on `https://loufish727.github.io/MaintainOps/?qa_bust=live-workspace-search-events-61f6387`.
- Live search for `Hydralic` showed global search preview with `Hydralic Leak`.
- Live "Page through all matching work orders" entered exact work-search mode with `Matching Work Orders` and `Hydralic Leak`.
- Live Back returned to the search preview, preserved `Hydralic`, and removed exact-search mode.
- GitHub Actions resource smoke: NOT AVAILABLE. GitHub connector returned no workflow runs for `61f6387`.

Behavior changed:

- No observed behavior change.

Concentrated authority reduced:

- `bindWorkspaceEvents()` no longer directly owns workspace search input and exact work-search open/close event contracts.
- Read-only search authority is now isolated behind explicit dependency injection.

## LFES Authority Map - renderWorkspace / bindWorkspaceEvents - 2026-05-21

Result:

- Created `docs/LFES/audits/AUTHORITY_MAP_RENDER_EVENTS_2026-05-21.md`.

Purpose:

- Shift LFES from safe line reduction to authority reduction under medium/high-risk controls.
- Map concentrated authority in `renderWorkspace()` and `bindWorkspaceEvents()`.
- Identify the first survivable medium-risk boundary.

Recommended first boundary:

- Workspace search and exact work-search read-only events:
  - `.workspace-search-input`
  - `[data-view-work-search]`
  - `[data-close-work-search]`

Risk:

- Medium.
- Mutates local UI/search/page state and reloads read queues, but does not submit forms, delete, upload, convert requests, change auth/session/company startup, or touch SQL/RLS.

Required future smoke:

- Static JS checks.
- Targeted mock-DOM event smoke.
- Local resource and boot smoke.
- Signed-in live smoke for `Hydralic` search, exact work-search mode, and return to search preview.
- Hosted resource smoke.

Behavior changed:

- No app behavior changed in this mapping phase.

## LFES Measurable Reduction - Read-Only Query/Search/List Helpers - 2026-05-21

Starting app.js line count:

- 9,488.

Ending app.js line count:

- 9,122.

Net lines removed:

- 366.

Files/modules created or expanded:

- Added `src/utils/requestQueryFilters.js`.
- Added `src/utils/workOrderSearch.js`.
- Added `src/utils/workspaceListBuilders.js`.
- Updated `index.html` to load the three scripts before `app.js`.
- Updated `tests/smoke/resource-load.spec.js`.

Helpers moved:

- `applyRequestQueryFilters`
- `refreshWorkOrderRelatedSearch`
- related work-order search helpers for parts/tables
- `fetchExactSearchedWorkOrderPage`
- exact work-order search row helpers
- `globalSearchResults`
- `planningItems`
- `planningPmItems`
- `followUpItems`

Risk classification:

- Medium, bounded read-only extraction.
- The moved code composes read queries, derives search/list output, and updates explicit local cache/page/search-result state through injected setters.
- No mutation, event binding, form submit, delete, upload, auth/session/company/location startup, public QR submit, storage/photo/document flow, SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()` movement occurred.

Smoke results:

- Static JS checks: PASS for `app.js`, `src/utils/requestQueryFilters.js`, `src/utils/workOrderSearch.js`, `src/utils/workspaceListBuilders.js`, and `tests/smoke/resource-load.spec.js`.
- Helper-output smoke: PASS for request query filtering, related/exact work-order search orchestration, global search results, planning items, PM planning items, and follow-up items.
- Local resource smoke: PASS against `http://127.0.0.1:4187/`.
- Local boot smoke: PASS with all three new scripts and `app.js?v=lfes-reduction-read-only-query-list-1`; no page errors.
- Hosted GitHub Pages resource smoke: PASS after Pages propagation.
- Live signed-in smoke: PASS. Search for `Hydralic` produced global results, exact paged Work Orders, and `Hydralic Leak`.
- Live signed-in Planning smoke: PASS. Planning showed Overdue / Due Today / Next 7 Days without the search overlay.
- Live signed-in Requests smoke: PASS. Requests showed request filters/form surface without the search overlay.
- GitHub Actions resource smoke: NOT AVAILABLE. GitHub connector returned no workflow runs for commit `2be8b54`.

Functions rejected as unsafe for this run:

- `renderWorkOrderDetail`, `renderCreateWorkOrder`, `renderQuickFixForm`, and `renderWorkOrderCard`: forms, workflow controls, assignment/status controls, or mutation buttons.
- `renderAssetDetail`, `renderProcedureTemplate`, `renderPartDetail`, `renderMaintenanceRequest`, and public request link cards: delete/conversion/QR/mutation-adjacent controls.
- `renderMessageCenter`: message creation/reply forms and read-state workflow coupling.
- `bindWorkspaceEvents`, mutation handlers, delete handlers, upload/storage helpers, auth/startup, and SQL/RLS zones remained blocked.

Measurable progress target:

- MET. The run removed 366 lines from `app.js`, inside the requested 300-500 line target.

Behavior changed:

- No observed behavior change.

LFES catch:

- Initial local boot caught a load-order issue because `parentAssetFor` is a later-initialized helper, not a hoisted function. The stable fix was to inject it lazily as a getter. This reinforced the hard-boundary dependency rule.

## LFES Hard Boundary - Global Search Navigation Events - 2026-05-21

Hard boundary selected:

- Global search result navigation click handlers.

Why it is hard:

- The moved code is a stateful event contract from `bindWorkspaceEvents()`, not a display helper.
- It updates active IDs, active section, persisted search state, and work-search mode before re-rendering.

Why it is recoverable:

- The behavior is non-mutating navigation/read UI behavior.
- No Supabase write path, Quick Fix, request conversion, delete flow, auth/session/company/location startup, storage/photo/document flow, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` movement occurred.
- Rollback path is direct: revert `fb77f1c`, or remove `src/utils/globalSearchNavigationEvents.js`, restore the original five search-result listener blocks in `bindWorkspaceEvents()`, and restore the prior cache tag.

Exact implementation scope:

- Added `src/utils/globalSearchNavigationEvents.js`.
- Replaced only the `[data-search-work-order]`, `[data-search-asset]`, `[data-search-part]`, `[data-search-request]`, and `[data-search-section]` listener blocks in `bindWorkspaceEvents()` with `bindGlobalSearchNavigationEvents(...)`.
- Added explicit dependency injection for state setters, `renderWorkspace`, `setWorkOrderSearchMode`, storage, and document access.
- Added `src/utils/globalSearchNavigationEvents.js?v=lfes-hard-boundary-global-search-nav-1` before `app.js`.
- Updated `app.js` cache tag to `app.js?v=lfes-hard-boundary-global-search-nav-1`.
- Updated hosted resource smoke resource list.

Required smoke tests:

- Static JS checks.
- Targeted mock-DOM event smoke covering all moved search result routes.
- Local resource smoke.
- Local browser boot smoke.
- Hosted GitHub Pages resource smoke.
- Live signed-in global search result navigation smoke.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/globalSearchNavigationEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- Targeted mock-DOM event smoke: PASS for work-order, asset, part, request, and generic section result routes.
- Local resource smoke against `http://127.0.0.1:4187/`: PASS.
- Local browser boot smoke: PASS, new script and app cache tag present, no fresh errors.
- Deploy commit: `fb77f1c` (`Extract global search navigation events`).
- Hosted GitHub Pages resource smoke: PASS after Pages propagation.
- Live signed-in smoke on `https://loufish727.github.io/MaintainOps/?qa_bust=live-global-search-nav-behavior-fb77f1c-final`: PASS.
- Live search for `Hydralic` returned a visible work-order result for `Hydralic Leak`.
- Clicking the result opened Work Order Detail, set active section to `work`, and cleared persisted search plus the visible search input.
- Fresh live console sample had only the existing missing-resource 404 pattern; no app runtime error or page error was observed.

LFES catch:

- The smoke had to avoid Playwright's first-match visibility trap on responsive duplicates. Visible-DOM inspection remains required for dense responsive app surfaces.
- Reusing a copied Chrome profile did not preserve valid auth; copied Edge profile did. Auth-backed smoke method should be recorded as environment-dependent and never treated as a product defect unless the actual user browser fails.

Result:

- PASS for global search navigation hard boundary.
- `app.js` line count after extraction: 9,488.

## LFES Hard Boundary - Work-Order Detail Field-Jump Event Binding - 2026-05-21

Hard boundary selected:

- Small event-binding extraction for work-order detail field-jump buttons.

Why it is hard:

- The moved code is a real event contract from `bindWorkspaceEvents()`, not a display helper.
- It depends on stable `data-jump-work-section` attributes and matching target IDs in Work Order Detail.

Why it is recoverable:

- The behavior is non-mutating: open a details section, scroll to a target, add temporary highlight classes, then remove them.
- No Supabase call, workflow state, Quick Fix, request conversion, delete flow, auth/session/company/location startup, storage/photo/document flow, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` movement occurred.
- Rollback path is direct: revert `5a99590`, or remove `src/utils/workSectionJumpEvents.js`, restore the original listener block in `bindWorkspaceEvents()`, and restore the prior cache tag.

Exact implementation scope:

- Added `src/utils/workSectionJumpEvents.js`.
- Replaced only the `[data-jump-work-section]` listener block in `bindWorkspaceEvents()` with `bindWorkSectionJumpEvents()`.
- Added `src/utils/workSectionJumpEvents.js?v=lfes-hard-boundary-work-jump-1` before `app.js`.
- Updated `app.js` cache tag to `app.js?v=lfes-hard-boundary-work-jump-1`.
- Updated hosted resource smoke resource list.
- Resolved the previous LFES catch in:
  - `docs/DEBUG_PROCESS.md`
  - `docs/LFES/CORE_STANDARD.md`

Required smoke tests:

- Static JS checks.
- Targeted mock-DOM event smoke.
- Local resource smoke.
- Local browser boot smoke.
- Hosted GitHub Pages resource smoke.
- Live signed-in Work Order Detail field-jump smoke.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workSectionJumpEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- Targeted mock-DOM event smoke: PASS. It proved details opening, smooth scroll call, both highlight classes, and delayed class removal.
- Local resource smoke against `http://127.0.0.1:4187/`: PASS.
- Local browser boot smoke: PASS, new jump event script and hard-boundary app cache tag present, no fresh errors.
- Deploy commit: `5a99590` (`Extract work section jump event binding`).
- Hosted GitHub Pages resource smoke: PASS after Pages propagation.
- Live signed-in smoke on `https://loufish727.github.io/MaintainOps/?qa_bust=live-work-jump-event-5a99590`: PASS.
- Work Order Detail opened for `Hydralic Leak`.
- `Go To Completion` opened the completion details, applied `jump-highlight` and `field-jump-highlight`, and removed both after timeout.
- Fresh live console sample after smoke: PASS, no current error logs.

LFES catch resolved:

- The prior responsive-duplicate-control catch is now part of `docs/DEBUG_PROCESS.md` and `docs/LFES/CORE_STANDARD.md`.
- The live smoke again confirmed why visible-DOM targeting is needed: `Hydralic Leak` appeared twice, so a generic text locator was ambiguous.

Result:

- PASS for small event-binding hard boundary.
- `app.js` line count after extraction: 9,539.

## LFES Hard Boundary - Work-Order Query Filters - 2026-05-21

Hard boundary selected:

- Work-order filter/sort query orchestration.

Why it is hard:

- The moved helpers shape Supabase read queries for Work Orders, My Work, dashboard counts, global search, status filters, queue filters, and sort order.
- The helpers depend on many pieces of app state: company, location, active section, status filter, queue filter, assignee filter, search text, related search IDs, session user, and date helpers.

Why it is recoverable:

- The boundary is read-only query composition.
- No mutations, event handlers, `renderWorkspace()`, `bindWorkspaceEvents()`, Quick Fix, request conversion, auth/session/company/location startup, storage/photo/document flow, or Supabase SQL/RLS changed.
- Rollback path is direct: revert `d90976d`, or remove `src/utils/workOrderQueryFilters.js`, restore the five inline helpers in `app.js`, and restore the prior cache tag.

Exact implementation scope:

- Added `src/utils/workOrderQueryFilters.js`.
- Moved:
  - `applyWorkOrderListFilters`
  - `applyWorkOrderFilters`
  - `applyWorkOrderQueueFilters`
  - `applyWorkOrderStatusFilter`
  - `applyWorkOrderSort`
- Added explicit state getter/dependency injection for previously hidden globals.
- Added `src/utils/workOrderQueryFilters.js?v=lfes-hard-boundary-work-order-query-1` before `app.js`.
- Updated `app.js` cache tag to `app.js?v=lfes-hard-boundary-work-order-query-1`.
- Updated hosted resource smoke resource list.

Required smoke tests:

- Static JS checks.
- Targeted fake-query chain smoke covering My Work queue, unassigned queue, completed-month status/sort, global search, and request pseudo-status.
- Local resource smoke.
- Local browser boot smoke.
- Hosted GitHub Pages resource smoke.
- Live signed-in My Work/Work Orders smoke with a visible non-mutating filter interaction.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workOrderQueryFilters.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- Targeted fake-query chain smoke: PASS.
- Local resource smoke against `http://127.0.0.1:4187/`: PASS.
- Local browser boot smoke: PASS, new query script and hard-boundary app cache tag present, no fresh errors.
- Deploy commit: `d90976d` (`Extract work order query filters`).
- Hosted GitHub Pages resource smoke: PASS after Pages propagation.
- Live signed-in smoke on `https://loufish727.github.io/MaintainOps/?qa_bust=live-work-query-hard-boundary-d90976d`: PASS.
- My Work loaded with Assigned To Me / Created By Me and dashboard count surface.
- Work Orders loaded with active/status/filter/sort surface and `Hydralic Leak`.
- Overdue metric click reloaded the read path to `Overdue - All Work Orders` with `Hydralic Leak` still visible.
- Fresh live console sample after smoke: PASS, no current error logs.

LFES catch discovered:

- Responsive duplicate controls made generic Playwright locators ambiguous for the search box. Visible DOM targeting was more reliable for non-mutating filter smoke.
- Moving hard query helpers safely required making hidden global state dependencies explicit through injected getters; this should be treated as the pattern for future hard-but-contained extraction candidates.

Result:

- PASS for work-order query filter/sort hard boundary.
- `app.js` line count after extraction: 9,550.

## LFES Phase 17D Maintenance Schedule Date Helper - 2026-05-21

Scope:

- Extracted only `nextDueDate` from `app.js` into `src/utils/maintenanceScheduleDates.js`.
- Added `src/utils/maintenanceScheduleDates.js?v=lfes-phase-17d-maintenance-date-1` before `app.js` in `index.html`.
- Updated `app.js` cache tag to `app.js?v=lfes-phase-17d-maintenance-date-1`.
- Updated hosted resource smoke resource list to include `src/utils/maintenanceScheduleDates.js`.
- Did not move PM generation, schedule creation/update/delete, Supabase calls, event handlers, render functions, or mutation workflows.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/maintenanceScheduleDates.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- Targeted date helper smoke: PASS for weekly, monthly, quarterly, and unknown-frequency behavior.
- Local resource smoke against `http://127.0.0.1:4187/`: PASS.
- Local browser boot smoke: PASS, new date script and app cache tag present, no fresh errors.
- Deploy commit: `1c37db8` (`Extract maintenance schedule date helper`).
- Hosted GitHub Pages resource smoke: PASS after Pages propagation.
- Live signed-in PM passive smoke on `https://loufish727.github.io/MaintainOps/?qa_bust=live-maintenance-date-17d-1c37db8`: PASS.
- Live PM surface opened and showed Preventive Maintenance without generating PM work or clicking mutation controls.
- Fresh live console sample after smoke: PASS, no current error logs.

Result:

- PASS for maintenance schedule date helper extraction.
- `app.js` line count after extraction: 9,620.
- Form/payload validation remains blocked pending a narrower behavior contract and smoke.

## LFES Phase 17C Public URL/QR Utility Boundary - 2026-05-21

Scope:

- Extracted only public URL/QR helper logic from `app.js` into `src/utils/publicUrlQr.js`.
- Added `src/utils/publicUrlQr.js?v=lfes-phase-17c-public-url-qr-1` before `app.js` in `index.html`.
- Updated `app.js` cache tag to `app.js?v=lfes-phase-17c-public-url-qr-1`.
- Updated hosted resource smoke resource list to include `src/utils/publicUrlQr.js`.
- Did not move public QR submission, QR admin mutation buttons, request creation, event handlers, auth/session/company/location logic, Supabase SQL/RLS, storage/photo flows, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Pre-flight boundary smoke:

- Public URL/QR helpers passed exact-source smoke for request URL generation, QR URL generation, HTTPS normalization, localhost/private host rejection, QR SVG generation, and QR fallback output.
- Signed-in passive Settings smoke showed 5 active location QR links, public GitHub Pages base URL, QR/Test Form links, and QR controls.
- Form/payload validation was rejected as the next boundary: blank Quick Fix submit stayed blocked by native required-field validation, but an invalid-date UI smoke created a disposable work order instead of cleanly blocking. The disposable smoke artifact was permanently deleted.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/publicUrlQr.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- Targeted module helper smoke: PASS.
- Local resource smoke against `http://127.0.0.1:4187/`: PASS.
- Deploy commit: `b67f252` (`Extract public URL QR utility`).
- Hosted GitHub Pages resource smoke: PASS after Pages propagation.
- Live signed-in Settings/QR smoke on `https://loufish727.github.io/MaintainOps/?qa_bust=live-public-url-qr-17c-b67f252`: PASS.
- Live `index.html` references:
  - `src/utils/publicUrlQr.js?v=lfes-phase-17c-public-url-qr-1`
  - `app.js?v=lfes-phase-17c-public-url-qr-1`
- Fresh live console sample after smoke: PASS, no current error logs.

Result:

- PASS for public URL/QR helper extraction.
- `app.js` line count after extraction: 9,627.
- Form/payload validation remains blocked pending a narrower behavior contract and smoke.

## LFES QA / Audit Notes

2026-05-19 LFES Phase 4B technician-role guardrail verification partial pass:

- Scope: technician-role runtime verification only.
- No app code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- Browser/session tested:
  - local HTTP preview: `http://localhost:4294/index.html?qa_bust=password-recovery-2`
  - signed-in QA technician session for the invited Gmail account.
- Verified:
  - Taylor Metal Products loaded.
  - Salem, OR was active.
  - location selector was disabled.
  - helper text showed: `Enable Mobile tech in Team to switch locations.`
  - Admin Setup and Settings nav buttons were not present in the visible workspace navigation.
  - Team invite form was not present.
  - Add Member form was not present.
  - role selectors and Save Role controls were not present.
  - Team showed the signed-in QA account as Technician.
  - Work Orders loaded in Salem, OR.
  - Work Orders showed status buttons but no visible assignment dropdowns.
  - no missing-script errors observed.
  - no browser console errors observed.
- Not fully verified:
  - DB/RLS/trigger assignment-denial proof.
  - reason: browser automation could not type into the local Quick Fix form because the virtual clipboard was unavailable, and the browser tool could not read the local Supabase auth storage needed for a safe direct REST denial probe.
  - no disposable QA work order was created in this partial pass.

TEST:
Technician session restore

STEPS:
Use the signed-in QA technician browser session on the local HTTP preview and inspect workspace load, location state, Team permissions, and console/resource status.

EXPECTED:
Technician session restores, Taylor Metal Products loads, Salem, OR is active, location switching is locked unless Mobile tech is enabled, and no missing-script or visible app errors appear.

RESULT:
PASS

NOTES:
The session displayed technician restrictions and the disabled location selector with the Mobile tech helper.

TEST:
Technician work-order visibility

STEPS:
Open Work Orders in the QA technician session.

EXPECTED:
Technician can load Work Orders normally and can see allowed work-order actions.

RESULT:
PASS

NOTES:
Work Orders loaded for Salem, OR. Existing status action buttons were visible.

TEST:
Technician assignment restriction

STEPS:
Inspect visible Work Orders and Team surfaces for assignment controls and team-management controls. Attempt to create a disposable QA work order for a DB-layer assignment-denial probe if browser automation allows safe input.

EXPECTED:
Technician cannot assign work to another user. If assignment controls are hidden, document that. DB/RLS/trigger enforcement should still be proven in a follow-up.

RESULT:
PARTIAL PASS / DB NOT VERIFIED

NOTES:
No assignment dropdowns were visible on Work Orders, and Team management role/invite controls were hidden. Browser automation could not create the disposable QA work order because local input typing failed, so DB-layer assignment denial remains pending.

2026-05-19 Password reset / recovery flow implementation:

- Scope: auth recovery UI only.
- Added a login-screen `Forgot password?` path that sends a Supabase password reset email.
- Added a Supabase recovery-link landing path that renders `Set New Password`, accepts recovery session tokens, and updates the password through `supabaseClient.auth.updateUser`.
- Recovery URLs are cleaned after password update or leaving the recovery screen so tokens are not left in the address bar.
- No Supabase SQL/RLS/policies changed.
- No app workflow, role, assignment, company/location, Quick Fix, request, work-order, rendering, or service-wrapper logic changed outside auth recovery.
- Bumped `index.html` app script cache tag to `app.js?v=password-recovery-1`.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check` for all current `src/utils/*.js` and `src/services/*.js`
- Clean GitHub package created and verified:
  - `MaintainOps-github-clean-20260519-093021`
  - `MaintainOps-github-clean-20260519-093021.zip`
  - package includes `assets`, `src`, `app.js`, `index.html`, `README.md`, `styles.css`, and `supabase-config.js`
  - package `index.html` references `app.js?v=password-recovery-1`
  - package JavaScript static checks passed.

TEST:
Password reset request UI

STEPS:
Open the local HTTP preview of `index.html?qa_bust=password-recovery-1c` and inspect the login screen.

EXPECTED:
Login screen loads and exposes a `Forgot password?` action without console errors.

RESULT:
PASS

NOTES:
Verified through local HTTP preview. Direct `file://` inspection remains blocked by the in-app browser policy, so HTTP preview was used for browser verification.

TEST:
Password recovery link UI

STEPS:
Open the local HTTP preview with `#type=recovery` and no Supabase recovery tokens.

EXPECTED:
The app routes to `Set New Password`, shows a clear invalid/missing secure-session message, disables password update, and provides a way to send a new reset link.

RESULT:
PASS

NOTES:
This intentionally did not use or store any real recovery token. A real emailed Supabase recovery link still needs live end-to-end verification after GitHub Pages upload and Supabase Auth redirect URL confirmation.

2026-05-19 LFES Phase 4C technician test-account setup planning:

- Scope: planning only.
- No app code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflows/business logic changed.
- Existing technician/member evidence from the live Team surface and docs:
  - `Lee Gaede` appears as a Technician, but should be treated as a real user and not used for QA unless he is intentionally participating.
  - `Louie Technician Test` appears in Team, but the current visible role was Manager, so it is not currently valid for technician-denied-path verification.
  - Team invite flow exists and supports Role plus Default location.
  - Invite acceptance copies invite role/default location into `company_members`.
- Planning conclusion:
  - A valid technician test session is still needed before rerunning Phase 4B.
  - Safest path is a dedicated QA technician account, or an explicitly approved temporary role change of the existing `Louie Technician Test` account if its credentials are available and it is not used for live operations.
  - Do not use Lee Gaede's live account for forced QA.
- No SQL/admin database action is required for the preferred app-based setup path.
- Supabase Auth/admin action may be needed only if a new QA account cannot be created through the normal app sign-up/invite flow.

TEST:
Phase 4C technician test-account setup planning

STEPS:
Review current docs, visible Team role evidence from the prior live session, invite/default-location implementation notes, QA data process, and Debug Process role-security rules. Plan a safe technician-session setup without changing code, SQL, RLS, workflows, or live user roles.

EXPECTED:
Planning identifies whether a technician test account exists, whether one must be invited/created, the safest setup path, QA work-order strategy, cleanup strategy, and exact Phase 4B rerun steps.

RESULT:
PASS

NOTES:
Planning only. No technician login was created or used, and no assignment guardrail was retested. Existing real technician `Lee Gaede` should not be used unless intentionally participating. Existing `Louie Technician Test` may be usable only after explicit approval to set it to Technician and only if credentials are available.

2026-05-19 LFES Phase 4B technician-role guardrail verification:

- Scope: technician-role guardrail verification attempt only.
- No app code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- Live URL/session checked:
  - `https://loufish727.github.io/MaintainOps/`
- Current active signed-in browser session was not a technician-role session.
- Evidence current session was manager/admin-style:
  - Admin Setup visible.
  - Settings visible.
  - Team role selectors and Save Role controls visible.
  - Create Invite/Add Member controls visible.
  - manager/admin navigation and assignment surfaces visible.
- Because the session was not a real technician-role session, no assignment denial attempt was made.
- No missing-script errors observed during the session check.
- No visible app errors observed during the session check.
- No actionable MaintainOps console errors observed during the session check.

TEST:
Technician assignment guardrail

STEPS:
Open the live signed-in MaintainOps session, determine whether the active session is a real technician-role user, and only proceed with assignment-denial testing if the session is truly technician-role.

EXPECTED:
A real technician-role user loads Taylor Metal Products, confirms active location behavior, opens Work Orders, attempts any visible assignment path, and proves that unauthorized assignment to another user is blocked by DB/RLS/trigger where applicable, not only by UI hiding.

RESULT:
NOT VERIFIED

NOTES:
The active signed-in browser session showed manager/admin capabilities, including Admin Setup, Settings, Team role editors, invite controls, and role save controls. This is not a valid technician-role session for Phase 4B. No technician assignment path was attempted because doing so from manager/admin credentials would fake the result. A real technician login/session is still required.

2026-05-19 LFES Phase 4A live smoke and technician assignment guardrail verification:

- Scope: live runtime smoke verification only.
- No app code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=phase-4a-live-smoke-20260519`
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check` for all current `src/utils/*.js` and `src/services/*.js`
- Live scripts confirmed:
  - `supabase-config.js?v=mobile-nav-tiles-1`
  - `src/utils/constants.js?v=lfes-utils-1`
  - `src/utils/dom.js?v=lfes-utils-1`
  - `src/utils/formatting.js?v=lfes-utils-1`
  - `src/services/locationsService.js?v=lfes-phase-2a-locations-1`
  - `src/services/profilesService.js?v=lfes-phase-2b-profiles-1`
  - `src/services/partsService.js?v=lfes-phase-2c-parts-1`
  - `src/services/assetsService.js?v=lfes-phase-2d-assets-1`
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`
  - `src/services/companyService.js?v=lfes-phase-2f-company-1`
  - `src/services/appIssueReportsService.js?v=lfes-phase-2i-issue-report-mutations-1`
  - `app.js?v=lfes-phase-2i-issue-report-mutations-1`
- Browser/session tested:
  - live GitHub Pages in the Codex in-app browser.
  - signed-in manager/admin-style session with Admin Setup and Settings access.
- Safe QA records created and deleted through the app:
  - `QA Phase4A Smoke 1779206383647 work order`
  - `QA Phase4A Assign 1779206409169 work order`
- No missing-script errors observed.
- No visible app errors observed.
- No actionable MaintainOps console errors observed.
- Technician assignment guardrail under a real technician-role session was not verified because no real technician credentials/session were available in this checkpoint.

TEST:
Live signed-in session restore

STEPS:
Open the live GitHub Pages app with cache bust `phase-4a-live-smoke-20260519` and wait for the signed-in workspace to load.

EXPECTED:
The app restores the signed-in session, Taylor Metal Products loads, all required utility/service/app scripts load, and no visible app errors or missing-script errors appear.

RESULT:
PASS

NOTES:
Taylor Metal Products loaded with the signed-in workspace. The live page served all current `src/utils`, `src/services`, `supabase-config.js`, and `app.js` scripts. Console/resource check showed no actionable MaintainOps errors.

TEST:
Active location persistence

STEPS:
Confirm Salem, OR is selected, reload the live app, and inspect the selected location and Work Orders screen.

EXPECTED:
Salem, OR remains active after reload, Work Orders reflects Salem, and the app does not fall back to Auburn.

RESULT:
PASS

NOTES:
After reload, the selected location remained Salem, OR. Work Orders loaded under Salem, OR. Auburn did not replace the saved location.

TEST:
Manager/admin work order basic flow

STEPS:
Create safe QA work order `QA Phase4A Smoke 1779206383647 work order` through Quick Fix, confirm Work Order Detail opens, delete through `Delete Work Order` then `Permanently Delete`, and confirm the QA token disappears.

EXPECTED:
The work order appears, detail opens, deletion succeeds through the normal app path, and the deleted item disappears.

RESULT:
PASS

NOTES:
Quick Fix created the QA work order, Work Order Detail opened, and the normal delete path removed it. The QA token was no longer visible after deletion.

TEST:
Technician assignment guardrail

STEPS:
Attempt to verify forbidden assignment behavior under a real technician-role user.

EXPECTED:
A technician cannot assign work to another user, assign outside vendor, clear assignment, or reassign work already assigned to someone else. The database/RLS/trigger boundary should block unauthorized assignment, not just the UI.

RESULT:
NOT VERIFIED

NOTES:
No real technician-role signed-in browser session or technician credentials were available during this checkpoint. The current signed-in session has manager/admin capabilities, so it cannot prove technician denial. This remains required before claiming the guardrail is fully verified.

TEST:
Manager/admin assignment controls

STEPS:
Create safe QA work order `QA Phase4A Assign 1779206409169 work order`, change assignment from the default user to Louie Andrade through Quick Update, save, confirm the owner changes, then delete the QA work order through the normal app path.

EXPECTED:
Manager/admin assignment controls allow reassignment, save succeeds, the owner updates visibly, and the QA work order can be cleaned up.

RESULT:
PASS

NOTES:
Quick Update saved successfully, the owner changed to Louie Andrade, and the disposable QA work order was deleted through the normal app path.

TEST:
Console/resource check

STEPS:
Inspect live script URLs and browser console warnings/errors after session restore, reload, navigation, Quick Fix create/delete, assignment update, and main section checks.

EXPECTED:
All required scripts load and no actionable MaintainOps console errors appear.

RESULT:
PASS

NOTES:
No missing-script failures, visible app errors, or actionable MaintainOps console warnings/errors were observed.

TEST:
Main signed-in section smoke

STEPS:
Open Work Orders, Equipment, Parts, Team, and Settings from the signed-in live workspace.

EXPECTED:
Each section opens cleanly without visible app errors.

RESULT:
PASS

NOTES:
Work Orders, Equipment, Parts, Team, and Settings opened cleanly while Salem, OR remained selected.

2026-05-19 LFES Phase 3F implementation-readiness decision:

- Scope: implementation-readiness decision and documentation only.
- No app code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflows or business logic changed.
- Created:
  - `docs/LFES/audits/LFES_PHASE_3F_IMPLEMENTATION_READINESS_DECISION.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Decision:
  - no code extraction is approved yet.
  - the next recommended implementation phase is LFES Phase 4A live smoke and technician assignment guardrail verification.
  - workflow, mutation, render, event, auth/session/company/location, public QR, delete, storage/photo/document, and Supabase SQL/RLS changes remain blocked.
- Reason:
  - low-risk render helper extraction is technically possible, but live smoke coverage and role guardrail verification are higher value during live testing.

TEST:
Phase 3F documentation-only implementation-readiness decision

STEPS:
Review Phase 3A-3E maps, Phase 2H mutation plan, app modularization plan, next steps, current handoff, and QA log. Compare possible next moves and choose the safest/highest-value next implementation direction. Create/update LFES documentation only.

EXPECTED:
Documentation decides the next implementation direction without changing app code, Supabase SQL/RLS, wrappers, rendering, event binding, or workflows.

RESULT:
PASS

NOTES:
No runtime browser workflow smoke was run because Phase 3F was planning/decision only. Static JavaScript checks were not required because no JavaScript files changed. Next implementation should run live smoke tests from the Phase 3C matrix.

2026-05-19 LFES Phase 3E render ownership map:

- Scope: render ownership mapping and documentation only.
- No app code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflows or business logic changed.
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
  - classified renderers by LFES risk: Low, Medium, High, Critical.
  - documented render outputs that create DOM IDs, forms, buttons, classes, and `data-*` behavior contracts.
  - identified low-risk render-helper candidates for possible later extraction.
  - workflow/render extraction remains blocked until an implementation-readiness decision is made.

TEST:
Phase 3E documentation-only render ownership checkpoint

STEPS:
Read current handoff, next steps, architecture, QA log, and Phase 3D state ownership map. Statically scan `app.js` render functions and emitted DOM contracts. Create/update LFES documentation only.

EXPECTED:
Documentation maps render ownership, risk, DOM contracts, dependent handlers, and future render-helper candidates without changing app code, Supabase SQL/RLS, wrappers, rendering, event binding, or workflows.

RESULT:
PASS

NOTES:
No runtime browser workflow smoke was run because Phase 3E was planning/documentation only. Static JavaScript checks were not required because no JavaScript files changed. Future implementation phases still require static checks plus relevant smoke tests from the Phase 3C matrix.

2026-05-19 LFES Phase 3D state ownership map:

- Scope: state ownership mapping and documentation only.
- No app code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflows or business logic changed.
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
  - documented localStorage mirrors and state values blocking workflow extraction.
  - identified lower-risk state that could later move into a state module.

TEST:
Phase 3D documentation-only state ownership checkpoint

STEPS:
Read current handoff, next steps, architecture, QA log, and Phase 3C smoke matrix. Statically scan `app.js` top-level mutable state and localStorage keys. Create/update LFES documentation only.

EXPECTED:
Documentation maps global state ownership, scope, risk, localStorage mirrors, and future modularization candidates without changing app code, Supabase SQL/RLS, wrappers, rendering, event binding, or workflows.

RESULT:
PASS

NOTES:
No runtime browser workflow smoke was run because Phase 3D was planning/documentation only. Static JavaScript checks were not required because no JavaScript files changed. Future implementation phases still require static checks plus relevant smoke tests from the Phase 3C matrix.

2026-05-19 LFES Phase 3C smoke-test matrix and contract guard planning:

- Scope: smoke-test matrix and contract guard planning only.
- No app code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflows or business logic changed.
- Created:
  - `docs/LFES/audits/LFES_PHASE_3C_SMOKE_TEST_MATRIX.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Findings:
  - defined 12 reproducible smoke tests for high-risk workflow contracts.
  - documented high-risk DOM IDs, form IDs, `data-*` attributes, visual behavior hooks, and global pending-state dependencies.
  - identified first Playwright automation candidates.
  - workflow extraction remains blocked until state ownership is mapped and a future implementation phase runs the relevant smoke tests.

TEST:
Phase 3C documentation-only smoke matrix checkpoint

STEPS:
Read current handoff, next steps, architecture, QA log, and Phase 3B event-contract inventory. Create a smoke-test matrix and contract guard plan for high-risk workflow paths. Create/update LFES documentation only.

EXPECTED:
Documentation defines reproducible workflow smoke tests and contract guards without changing app code, Supabase SQL/RLS, wrappers, rendering, event binding, or workflows.

RESULT:
PASS

NOTES:
No runtime browser workflow smoke was run because Phase 3C was planning/documentation only. Static JavaScript checks were not required because no JavaScript files changed. Future implementation phases still require static checks plus the relevant smoke tests from the Phase 3C matrix.

2026-05-19 LFES Phase 3B event-contract inventory:

- Scope: event-contract mapping and documentation only.
- No app code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflows or business logic changed.
- Created:
  - `docs/LFES/audits/LFES_PHASE_3B_EVENT_CONTRACT_INVENTORY.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Findings:
  - mapped 126 `bindWorkspaceEvents()` listener registrations.
  - mapped 381 raw DOM contract references across listener selectors, rendered IDs, and `data-*` attributes.
  - identified that auth/public QR intake and signed-in `#request-form` submit include important event contracts outside `bindWorkspaceEvents()`.
  - deeper workflow extraction remains blocked until high-risk smoke paths are explicitly defined.

TEST:
Phase 3B documentation-only event contract checkpoint

STEPS:
Read current handoff, next steps, architecture, and QA log. Statically scan `app.js` for `bindWorkspaceEvents()` listeners, rendered IDs, `data-*` attributes, top-level public/auth/request listeners, and workflow handler connections. Create/update LFES documentation only.

EXPECTED:
Documentation captures DOM/event contracts and hidden coupling risks without changing app code, Supabase SQL/RLS, wrappers, rendering, event binding, or workflows.

RESULT:
PASS

NOTES:
No runtime browser workflow smoke was run because Phase 3B was planning/documentation only. Static JavaScript checks were not required because no JavaScript files changed. Future implementation phases still require static checks and browser smoke tests.

2026-05-19 LFES Phase 3A rendering/event/state architecture mapping:

- Scope: architecture mapping and documentation only.
- No app code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No Supabase SQL/RLS/policies changed.
- No workflows or business logic changed.
- Created:
  - `docs/LFES/audits/LFES_PHASE_3A_ARCHITECTURE_MAP.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Findings:
  - `renderWorkspace()` remains the main rendering owner and emits most screen-level DOM/event contracts.
  - `bindWorkspaceEvents()` remains the main event-binding owner and directly calls most workflow mutations.
  - global state remains broad and shared across session, company, location, work queues, requests, assets, parts, PM, procedures, messages, maps, filters, pages, and UI modes.
  - remaining mutation paths are mostly workflow orchestration, not simple table wrappers.
  - deeper extraction should pause until event contracts are inventoried.
- Smoke-test discipline added:
  - future meaningful implementation phases should record concise smoke tests with TEST/STEPS/EXPECTED/RESULT/NOTES.
  - smoke-test results should be appended to this QA log.

TEST:
Phase 3A documentation-only architecture checkpoint

STEPS:
Read current handoff, next steps, architecture, and QA log. Scan `app.js` for rendering, event binding, global state, localStorage, Supabase mutation, storage, Quick Fix, work-order, request, PM, procedure, photo, and Team/admin boundaries. Create/update LFES architecture documentation only.

EXPECTED:
Documentation captures ownership boundaries and risk areas without changing app code, Supabase SQL/RLS, wrappers, rendering, event binding, or workflows.

RESULT:
PASS

NOTES:
No runtime browser workflow smoke was run because Phase 3A was analysis only. Static JavaScript checks were not required because no JavaScript files changed. Future implementation phases still require static checks and browser smoke tests.

2026-05-18 LFES Phase 2L approved default-location data fix and live verification:

- Scope:
  - no app code changes.
  - no Supabase schema/RLS/policy changes.
  - no wrapper extraction.
  - no `app.js` refactor.
- SQL was run in the Supabase SQL Editor/admin dashboard as `postgres`.
- SQL run:

```sql
update public.company_members
set default_location_id = '328d9ebb-7c4d-4847-a9bb-4aa0619fec43'
where company_id = '0875d674-7f07-4493-8668-701d192f4421'
  and default_location_id is null;
```

- Rows affected: 4.
- Verification SELECT/app read summary:
  - 4 Taylor Metal Products members now point to `328d9ebb-7c4d-4847-a9bb-4aa0619fec43`.
  - all 4 resolve to `Salem, OR`.
  - null `default_location_id` count is now 0.
  - existing non-null defaults before the fix were 0, so no explicit existing defaults were overwritten.
- Live default-location verification:
  - cleared only `maintainops.activeLocationId` and scoped `maintainops.activeLocationId:<user_id>:<company_id>` keys.
  - reloaded live GitHub Pages app with `?qa_bust=phase-2l-default-location-live-20260518`.
  - Taylor Metal Products loaded.
  - Salem, OR selected on fresh/no-saved-location load.
  - app did not fall back to Auburn.
  - scoped key was written with Salem for user `8f6e618f-bf06-46a7-925b-1001d7d30228` and company `0875d674-7f07-4493-8668-701d192f4421`.
  - Work Orders, Equipment, Parts, Team, and Settings opened while active location stayed Salem.
  - intentional location switch persisted across reload, confirming scoped saved location still wins over member default.
  - browser was restored to Salem and reloaded after the test.
  - no actionable console errors or visible app errors observed.
- Deeper workflow extraction:
  - the default-location data blocker is cleared.
  - future extraction still requires explicit approval and normal LFES checkpointing.

2026-05-18 LFES Phase 2L approved default-location data fix attempt:

- Scope:
  - no app code changes.
  - no Supabase schema/RLS/policy changes.
  - no wrapper extraction.
  - no `app.js` refactor.
- Attempted to run the approved data-only update through the signed-in app Supabase client.
- SQL equivalent attempted:

```sql
update public.company_members
set default_location_id = '328d9ebb-7c4d-4847-a9bb-4aa0619fec43'
where company_id = '0875d674-7f07-4493-8668-701d192f4421'
  and default_location_id is null;
```

- Result:
  - no Supabase client error was returned.
  - rows affected: 0.
  - verification still showed 4 Taylor members with `default_location_id = null`.
  - existing non-null defaults before attempt: 0, so no existing explicit defaults were overwritten.
- Interpretation:
  - the app session can read the rows but cannot perform this admin data fix through normal app-side RLS.
  - the prepared SQL must be run in the Supabase SQL editor/admin dashboard.
- Live default-location verification:
  - not run yet because the data fix has not been applied.
- Deeper workflow extraction:
  - remains blocked until the admin SQL update is run and live verified.

2026-05-18 LFES Phase 2L default-location policy decision and safe fix planning:

- Scope: planning/documentation only.
- No code changed.
- No SQL was run.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No Supabase SQL/RLS/policies changed.
- Updated:
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Policy decision:
  - Salem, OR should be the Taylor Metal Products no-saved-location default for existing Taylor users unless a specific user has an intentionally different default.
  - Alphabetical first-location fallback should not be treated as an operational default.
- Reasoning:
  - current fallback chain preserves intentional scoped/legacy saved locations correctly.
  - current `company_members.default_location_id` data is empty/null for observed Taylor members.
  - with no saved location and no member default, the app falls to `locations[0]`.
  - locations are ordered by name, so Auburn becomes the accidental default.
  - that creates risk that new work, requests, PMs, equipment, and live testing begin in the wrong branch before the user notices.
- Alternatives reviewed:
  - targeted data fix on `company_members.default_location_id`: lowest-risk immediate fix because current app already honors member defaults and no app behavior changes are needed.
  - company-level default location field: good future product model, but requires schema/app changes and QA.
  - onboarding prompt requiring user selection: safer for multi-location expansion, but requires UI/state changes and should wait.
  - preserve current behavior: not recommended because alphabetical fallback is not an intentional operating policy.
- Recommended lowest-risk fix:
  - set `company_members.default_location_id` to Salem, OR for Taylor users whose default is currently null.
  - do not overwrite users who already have a non-null default location.
  - keep scoped saved user/company location as highest precedence.
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

- Verification steps after approval/run:
  1. use a signed-in browser with no scoped or legacy active-location localStorage keys.
  2. reload the live app.
  3. confirm Taylor Metal Products loads.
  4. confirm Salem, OR is selected on first load.
  5. confirm a scoped active-location key is written with the Salem id.
  6. intentionally switch to another location, reload, and confirm intentional selection is preserved.
  7. switch back to Salem, reload, and confirm Salem remains.
  8. open Work Orders, Requests, Equipment, Parts, Team, Settings, and Admin Setup.
  9. run the normal LFES debug checkpoint before deeper workflow extraction.
- Deeper workflow extraction:
  - remains blocked until the data fix is approved/run and live verified, or until a different default-location policy is explicitly chosen.

2026-05-18 LFES Phase 2K default-location/onboarding verification checkpoint:

- Scope: analysis/QA/documentation only.
- No code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No Supabase SQL/RLS/policies changed.
- No location logic changed.
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Current active-location precedence in `app.js`:
  1. scoped saved user/company key: `maintainops.activeLocationId:<user_id>:<company_id>`
  2. legacy saved key: `maintainops.activeLocationId`
  3. in-memory `activeLocationId`
  4. `company_members.default_location_id`
  5. first loaded location
- Live signed-in test identifiers:
  - company id: `0875d674-7f07-4493-8668-701d192f4421`
  - user id: `8f6e618f-bf06-46a7-925b-1001d7d30228`
  - Auburn, WA id: `6cdc08a7-1ce8-48f1-9d5c-ec7969fd6d45`
  - Salem, OR id: `328d9ebb-7c4d-4847-a9bb-4aa0619fec43`
- Live data finding:
  - current signed-in membership role is `admin`.
  - current `company_members.default_location_id` is `null`.
  - all currently loaded company member rows observed in the app had `default_location_id: null`.
  - `locationsService.listLocations(...)` orders by name, so Auburn is `locations[0]`.
- Test results:
  - fresh profile/no saved location keys -> Auburn, WA selected.
  - legacy Salem saved key only -> Salem, OR selected and migrated to scoped key.
  - scoped Salem saved key -> Salem, OR selected.
  - conflicting legacy Auburn + scoped Salem -> Salem, OR selected.
  - legacy Auburn only -> Auburn, WA selected and migrated to scoped key.
  - intentional Salem restore + reload -> Salem, OR selected.
- Root cause:
  - Auburn first-load behavior comes from first-location fallback after no scoped key, no legacy key, no in-memory valid location, and no member default.
  - Auburn wins because locations are ordered alphabetically by name.
- Expected or bug:
  - technically expected under current code.
  - operationally a product/onboarding bug risk if Taylor expects Salem to be the default branch for this user or new invited users.
- Invite/default-location influence:
  - not influencing this admin user's first load because `company_members.default_location_id` is `null`.
  - still needs real second-user invite/default-location QA because invite acceptance is supposed to populate member default location.
- Salem preservation:
  - passed. Salem is correctly preserved after intentional selection and reload through the scoped user/company key.
- Safe fix proposal:
  - immediate data policy fix: set intended users' `company_members.default_location_id` to Salem, OR if Salem should be their no-saved-location default.
  - product fix: add an explicit company/onboarding default-location rule instead of relying on alphabetical first-location fallback.
  - preserve scoped saved location as highest precedence.
- Behavior changed:
  - none. Analysis/QA/docs only.
- Deeper workflow extraction:
  - remains blocked until location onboarding/default behavior is settled.

2026-05-18 LFES Phase 2J mutation-boundary review checkpoint:

- Scope: analysis/documentation only.
- No code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No Supabase SQL/RLS/policies changed.
- Reviewed post-Phase-2I architecture state.
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Current architecture state:
  - utilities and low-risk read wrappers are separated.
  - app issue report insert/update wrappers are separated.
  - `app.js` remains the operational controller for auth/session, active company/location, rendering, event binding, permissions, validation, notices, reloads, and most workflow mutations.
- Current measured shape:
  - `app.js` is about 10,514 lines.
  - `app.js` has about 388 function declarations.
  - raw scan shows about 107 Supabase-related call patterns.
  - raw scan shows about 76 mutation/RPC/storage-style patterns before excluding false-positive DOM calls.
  - based on the Phase 2H verified mutation count, about 67 true mutation-boundary call sites remain after Phase 2I moved 2 app issue report mutations.
- Review conclusion:
  - LFES extraction is still improving clarity for pure helpers, read wrappers, and very isolated raw table mutations.
  - extraction pace should slow before moving more mutations.
  - more wrappers without a state/event/render boundary map could fragment the architecture and hide workflow assumptions.
- Major remaining risks:
  - public QR submit,
  - invite/default-location onboarding,
  - active location persistence/defaulting,
  - Quick Fix and work-order mutations,
  - request conversion,
  - delete/storage/photo cleanup,
  - PM/procedure/checklist mutations,
  - message mutations,
  - `renderWorkspace()` and `bindWorkspaceEvents()` concentration.
- Operational continuity note:
  - fresh local/live debug profiles initially selected Auburn, WA before Salem, OR was intentionally selected.
  - Salem hard-save works after intentional selection and reload.
  - Auburn first-load should be verified as a default-location/onboarding behavior before deeper mutation extraction.
- Recommended next controlled phase:
  - LFES Phase 2K default-location/onboarding verification checkpoint, analysis/QA only.
- Behavior changed:
  - none. Analysis/docs only.
- Next implementation phase:
  - blocked pending explicit approval.

2026-05-18 GitHub Pages upload for LFES Phase 2I app issue report mutation wrappers:

- Scope: package/upload/live verification only.
- No next phase was started.
- No additional wrappers were extracted.
- No `app.js` refactor, Supabase SQL/RLS/policy, auth, workflow, rendering, or unrelated business-logic changes were made.
- Package created:
  - folder: `MaintainOps-github-clean-20260518-142305`
  - zip: `MaintainOps-github-clean-20260518-142305.zip`
- Package upload set confirmed:
  - `assets`
  - `src`
  - `app.js`
  - `index.html`
  - `README.md`
  - `styles.css`
  - `supabase-config.js`
- Package contents confirmed:
  - all `src/utils` files.
  - all `src/services` files.
  - updated `src/services/appIssueReportsService.js`.
  - packaged `index.html` references `appIssueReportsService.js?v=lfes-phase-2i-issue-report-mutations-1` and `app.js?v=lfes-phase-2i-issue-report-mutations-1`.
- Static checks:
  - source checks passed for 12 JavaScript files.
  - package checks passed for 12 JavaScript files.
- GitHub Pages deployment:
  - commit: `efd31566b4179d295ccdc4dee73636d033f01d49`
  - live URL tested: `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2i-live-20260518-1429`
  - signed-in live verification URL: `https://loufish727.github.io/MaintainOps/?qa_bust=PLEASE_SIGN_IN_PHASE_2I_LIVE`
- Live script verification:
  - all utility/service scripts loaded.
  - `appIssueReportsService.js` loaded with Phase 2I cache tag.
  - `app.js` loaded with Phase 2I cache tag.
  - `MaintainOpsAppIssueReportsService` exposed list/create/update wrapper functions.
- Live signed-in verification:
  - session restored after user signed in.
  - Taylor Metal Products loaded.
  - fresh live debug profile initially selected Auburn, WA.
  - after intentionally selecting Salem, OR, reload preserved Salem, OR through the scoped hard-save key.
  - Work Orders, Equipment, Parts, Team, Settings, and Admin Setup opened.
  - Report Issue opened.
  - existing reported issues loaded.
  - submitted safe live test issue report:
    - `LFES Phase 2I live wrapper smoke 1779139666427`
  - verified the live report appeared under Salem, OR.
  - updated the live report status to `reviewing`.
  - final live check confirmed the report is visible as `Reviewing`.
  - no missing-script errors.
  - no visible app errors.
  - no page errors/actionable console errors during signed-in live checks.
- Location note:
  - The fresh live debug profile defaulted to Auburn before manual selection.
  - Salem hard-save behavior worked after intentional Salem selection and reload.
  - Unexpected first-load Auburn default remains a separate default-location/onboarding data verification item.
- Behavior changed:
  - no intended user-facing behavior change beyond the already-approved Phase 2I wrapper extraction.
- Next phase:
  - blocked pending explicit approval.

2026-05-18 LFES Phase 2I app issue report mutation wrapper extraction:

- Scope: app issue report mutation wrappers only.
- Code changed:
  - extended `src/services/appIssueReportsService.js`.
  - updated `app.js` to call the new wrappers.
  - bumped `index.html` cache tags for `appIssueReportsService.js` and `app.js`.
- Exact wrappers moved:
  - `createAppIssueReportRecord(supabaseClient, payload)` wraps the `app_issue_reports` insert.
  - `updateAppIssueReportStatusRecord(supabaseClient, companyId, reportId, nextStatus)` wraps the scoped `app_issue_reports` status update.
- Intentionally not moved:
  - public QR,
  - Quick Fix,
  - work orders,
  - request conversion,
  - delete workflows,
  - storage/photos,
  - PM/procedure logic,
  - messages,
  - auth/session/company/location workflows,
  - Supabase SQL/RLS/policies,
  - UI form handling, submit-button state, notices, reloads, and rendering.
- Static checks:
  - passed for `app.js`, `supabase-config.js`, all `src/utils` files, and all `src/services` files.
- Automated local load check:
  - `http://127.0.0.1:4196/index.html?qa_bust=lfes-phase-2i-issue-report-mutations-1`
  - app loaded.
  - `MaintainOpsAppIssueReportsService` exposed list/create/update wrapper functions.
  - no page errors.
  - only observed console error during unsigned load was the non-actionable missing favicon 404.
- Signed-in browser/debug checkpoint:
  - Taylor Metal Products loaded.
  - Fresh debug browser initially selected Auburn, WA.
  - After intentionally selecting Salem, OR, reload preserved Salem, OR using the scoped hard-save key.
  - Work Orders, Equipment, Parts, Team, Settings, and Admin Setup opened.
  - Report Issue opened.
  - Existing reported issues list loaded.
  - Submitted safe test issue report:
    - `LFES Phase 2I wrapper smoke 1779139232957`
  - Verified the new issue appeared in Reported App Issues under Salem, OR.
  - Updated that safe test issue report status to `reviewing`.
  - Verified `Issue report updated.` notice.
  - no missing script errors.
  - no page errors or actionable console errors during signed-in checks.
- Location note:
  - The fresh debug profile defaulted to Auburn before manual selection.
  - Salem hard-save behavior worked after intentional Salem selection and reload.
  - Treat any unexpected first-load Auburn default as a separate default-location/onboarding data verification item, not a Phase 2I wrapper regression.
- Behavior changed:
  - no intended user-facing behavior change beyond moving raw `app_issue_reports` insert/update calls behind wrappers.
- Next phase:
  - blocked pending explicit approval.

2026-05-18 LFES Phase 2H mutation-boundary planning:

- Scope: planning/documentation only.
- No code changed.
- No functions were moved.
- No service files were created.
- No `app.js` refactor was performed.
- No Supabase policies or SQL were changed.
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
  - false-positive DOM `.remove()` matches were excluded from the mutation count.
- Risk counts:
  - Critical: 32
  - High: 24
  - Medium: 11
  - Low: 2
- Lowest-risk mutation candidate:
  - `app_issue_reports` insert/update wrappers.
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
- Static/browser checks:
  - not required for this planning-only pass.
  - no runnable app files were changed.
- Behavior changed:
  - none. Planning/docs only.
- Next phase:
  - blocked pending explicit approval.

2026-05-18 LFES post-Phase-2G remaining app.js risk review:

- Scope: analysis/documentation only.
- No code changed.
- No service extraction was started.
- No `app.js` refactor was performed.
- No Supabase policies or SQL were changed.
- No auth, workflow, rendering, event binding, or business logic changed.
- Updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Current `app.js` concentration observed:
  - approximately 9,600 lines.
  - approximately 388 function declarations.
  - approximately 100 remaining Supabase/RPC/storage call sites.
- Remaining high-risk responsibilities:
  - auth/session startup and login fallback,
  - company selection and membership fallbacks,
  - active location persistence,
  - public QR intake/submit,
  - internal request submit/photo/convert/delete,
  - Quick Fix and work-order create/update/complete/assign/delete workflows,
  - equipment routing and delete guards,
  - PM/procedure create/delete/generation/checklist flows,
  - team roles/invites/Mobile tech,
  - messages,
  - storage uploads/removes/signed URLs,
  - `renderWorkspace()` and `bindWorkspaceEvents()`.
- Remaining Supabase calls were categorized into:
  - public QR RPCs,
  - company/profile/team RPCs and mutations,
  - request reads/mutations,
  - work-order reads/mutations/relationship loaders,
  - equipment mutations and delete guards,
  - PM/procedure reads and mutations,
  - message reads/mutations,
  - public request link reads/mutations,
  - part/document reads and mutations,
  - storage signed URLs/uploads/removes,
  - app issue report mutations.
- Review conclusion:
  - additional read-only extraction remains possible but should not continue by momentum.
  - lower-risk read candidates are PM schedule reads, procedure template reads, and public request link reads.
  - higher-risk read candidates are requests, messages, work-order relationships, and storage signed URL helpers.
  - the next best move is mutation-boundary planning, not auth extraction, rendering extraction, or immediate mutation-service implementation.
- Recommended next single controlled phase:
  - LFES Phase 2H mutation-boundary planning only.
- Behavior changed:
  - none. Analysis/docs only.
- Next phase:
  - blocked pending explicit approval.

2026-05-18 GitHub Pages upload for LFES Phase 2G app issue reports read service extraction:

- Scope: package/upload/live verification only.
- No next phase was started.
- No additional services were extracted.
- No `app.js` refactor, Supabase policy/SQL, auth, workflow, rendering, or business-logic changes were made.
- Package created:
  - folder: `MaintainOps-github-clean-20260518-135557`
  - zip: `MaintainOps-github-clean-20260518-135557.zip`
- Package upload set confirmed:
  - `assets`
  - `src`
  - `app.js`
  - `index.html`
  - `README.md`
  - `styles.css`
  - `supabase-config.js`
- Package `src` confirmed:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
  - `src/services/partsService.js`
  - `src/services/assetsService.js`
  - `src/services/workOrdersService.js`
  - `src/services/companyService.js`
  - `src/services/appIssueReportsService.js`
- Packaged `index.html` confirmed:
  - `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1`
  - `app.js?v=lfes-phase-2g-issue-reports-1`
- Static checks passed in both source and package for:
  - `app.js`
  - `supabase-config.js`
  - all `src/utils` files
  - all `src/services` files, including `appIssueReportsService.js`
- GitHub Pages commit pushed:
  - `62d368c0ca27c4b2ab82d6710ad1aeee5ed69d83`
- Live resource verification passed against:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2g-live-20260518-1359`
- Live HTTP 200 file checks passed after GitHub Pages propagation for:
  - `index.html` with Phase 2G script tags,
  - `app.js?v=lfes-phase-2g-issue-reports-1`,
  - `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1`,
  - existing service and utility scripts checked during the pass.
- Signed-in live verification passed in accessible Edge debug window:
  - user signed into the live GitHub Pages build.
  - Taylor Metal Products loaded.
  - `window.MaintainOpsAppIssueReportsService.listAppIssueReports` was present.
  - The fresh debug profile initially had Auburn saved; after intentionally switching to Salem, OR and reloading, Salem remained active.
  - Work Orders loaded and showed Salem, OR work including `Hydralic Leak`.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - Admin Setup loaded.
  - App issue report area loaded.
  - Report Issue form opened.
  - No missing-script errors were found.
  - No visible app errors were found.
- Console/runtime note:
  - GitHub Pages returned a non-actionable `favicon.ico` 404.
  - No MaintainOps script/runtime error was captured.
- Behavior changed:
  - no behavior change beyond deploying the already verified Phase 2G read-wrapper extraction.
- Next phase:
  - blocked pending explicit approval.

2026-05-18 LFES Phase 2G app issue reports read service extraction:

- Scope: `appIssueReportsService` read-only wrapper only.
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
  - main company-data issue report read:
    - `supabaseClient.from("app_issue_reports").select("*").eq("company_id", activeCompanyId).order("created_at", { ascending: false })`
  - issue report reload read:
    - same company-scoped ordered read, now wrapped by `listAppIssueReports(...)`.
- Updated `index.html` script loading:
  - added `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1`
  - bumped `app.js` to `app.js?v=lfes-phase-2g-issue-reports-1`
- Intentionally not moved:
  - app issue report create mutation,
  - app issue report status update mutation,
  - requests,
  - public QR submit,
  - request conversion,
  - PM/procedure logic,
  - messages,
  - work-order relationship loaders,
  - storage/photo logic,
  - auth/session/company/location workflows,
  - rendering,
  - event binding,
  - Supabase SQL/RLS/policies.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
  - `node --check src/services/partsService.js`
  - `node --check src/services/assetsService.js`
  - `node --check src/services/workOrdersService.js`
  - `node --check src/services/companyService.js`
  - `node --check src/services/appIssueReportsService.js`
- Local HTTP resource checks passed:
  - `index.html` returned HTTP 200.
  - `app.js?v=lfes-phase-2g-issue-reports-1` returned HTTP 200.
  - `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1` returned HTTP 200.
  - existing service and utility scripts checked during the pass returned HTTP 200.
- Signed-in browser/debug passed:
  - tested accessible Edge debug window at:
    - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2g-issue-reports-accessible`
  - signed-in session restored after user login.
  - Taylor Metal Products loaded.
  - `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1` loaded.
  - `app.js?v=lfes-phase-2g-issue-reports-1` loaded.
  - `window.MaintainOpsAppIssueReportsService.listAppIssueReports` was present.
  - The fresh debug profile initially had Auburn saved; after intentionally switching to Salem, OR and reloading, Salem remained active.
  - Work Orders loaded and showed Salem, OR work including `Hydralic Leak`.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - Admin Setup loaded.
  - App issue report area loaded:
    - `App issue reports` ready,
    - Report Issue form opened,
    - Reported App Issues rendered existing captured reports.
  - No missing-script errors were found.
  - No visible app errors were found.
  - No runtime error events were captured during the checkpoint.
- Behavior changed:
  - no intended behavior change.
  - no behavior change observed in static/resource verification.
- Next phase:
  - blocked pending explicit approval.

2026-05-18 LFES Phase 2G remaining service-wrapper planning:

- Scope: planning/documentation only.
- No app behavior changed.
- No new service files were created.
- No functions were moved.
- No `app.js` refactor was performed.
- No Supabase policies or SQL were changed.
- Created:
  - `docs/LFES/audits/LFES_PHASE_2G_REMAINING_SERVICE_PLAN.md`
- Reviewed remaining direct Supabase access in `app.js` after Phase 2F, including:
  - `maintenance_requests`,
  - `preventive_schedules`,
  - `procedure_templates` / `procedure_steps`,
  - `public_request_links`,
  - `app_issue_reports`,
  - `messages` / `message_threads`,
  - `work_order_comments`,
  - `work_order_photos`,
  - `work_order_parts`,
  - `work_order_events`,
  - `work_order_step_results`,
  - `part_documents`,
  - storage signed URLs/uploads/deletes.
- Safest recommended next extraction:
  - `appIssueReportsService` read-only only,
  - `listAppIssueReports(supabaseClient, companyId)`.
- Blocked from Phase 2G implementation until explicit approval:
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
- Static/browser checks:
  - not required for this documentation-only planning pass.
  - no runnable app files were changed.

2026-05-18 GitHub Pages upload for LFES Phase 2F company read service extraction:

- Scope: package/upload the stable LFES Phase 2F build only.
- No Phase 2G work was started.
- No additional services were extracted.
- No `app.js` refactor, Supabase policy/SQL, auth, workflow, rendering, or business-logic changes were made.
- Package created:
  - folder: `MaintainOps-github-clean-20260518-132834`
  - zip: `MaintainOps-github-clean-20260518-132834.zip`
- Package upload set confirmed:
  - `assets`
  - `src`
  - `app.js`
  - `index.html`
  - `README.md`
  - `styles.css`
  - `supabase-config.js`
- Package `src` confirmed:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
  - `src/services/partsService.js`
  - `src/services/assetsService.js`
  - `src/services/workOrdersService.js`
  - `src/services/companyService.js`
- Packaged `index.html` confirmed:
  - `src/services/companyService.js?v=lfes-phase-2f-company-1`
  - `app.js?v=lfes-phase-2f-company-1`
- Static checks passed in both the source and publish folders for:
  - `app.js`
  - `supabase-config.js`
  - all `src/utils` files
  - all `src/services` files, including `companyService.js`
- GitHub Pages commit pushed:
  - `5e79f64d4fc1aa12cd952d9d291bff1fa19209c2`
- Live resource verification passed against:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2f-live-20260518-1329`
- Live HTTP 200 file checks passed for all utility/service scripts and `app.js?v=lfes-phase-2f-company-1`.
- Signed-in live visual verification:
  - Taylor Metal Products loaded.
  - Location selector showed `Salem, OR`.
  - After reload, Salem remained selected.
  - Settings loaded and showed Company Settings.
  - Work Orders, Equipment, Parts, Team, and Settings navigation buttons were visible and responsive in the mobile-width live pane.
  - No missing-script failure or visible app error was observed.
- Behavior changed:
  - no behavior change beyond deploying the already-verified Phase 2F read-wrapper extraction.
- Phase 2G status:
  - blocked pending explicit user approval.

2026-05-18 LFES Phase 2F company read service extraction:

- Scope: `companyService` reads only.
- Created:
  - `src/services/companyService.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Exact company/company-member read helpers moved:
  - `getMyCompanies(supabaseClient)`
  - `listUserCompanyMemberships(supabaseClient, userId)`
  - `listUserCompanyMembershipsLegacy(supabaseClient, userId)`
  - `listCompaniesByIds(supabaseClient, companyIds)`
  - `listCompaniesByIdsLegacy(supabaseClient, companyIds)`
- Exact raw reads moved out of `app.js`:
  - `supabaseClient.rpc("get_my_companies")`
  - `supabaseClient.from("company_members").select("company_id, role, default_location_id").eq("user_id", session.user.id).order("created_at", { ascending: true })`
  - legacy fallback `company_members` read without `default_location_id`
  - `supabaseClient.from("companies").select("id, name, logo_path, created_at").in("id", ids).order("created_at", { ascending: true })`
  - legacy fallback `companies` read without `logo_path`
- Updated `index.html` script loading:
  - added `src/services/companyService.js?v=lfes-phase-2f-company-1`
  - bumped `app.js` to `app.js?v=lfes-phase-2f-company-1`
- Intentionally not moved:
  - company switching
  - active company persistence
  - auth/session startup
  - invite acceptance
  - default location onboarding
  - active location persistence
  - company creation
  - ensure profile RPC
  - invite/create/cancel/role mutations
  - company settings/logo mutations
  - rendering
  - event binding
  - workflow/business logic
  - Supabase policies/RLS/SQL
- Company isolation/RLS preservation:
  - `get_my_companies` remains the server-side membership boundary for company list loading.
  - fallback reads still filter memberships by `session.user.id`.
  - app-side dedupe, role normalization, active company selection, default location behavior, and logo loading remain in `app.js`.
  - no Supabase SQL or policy files were touched.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
  - `node --check src/services/partsService.js`
  - `node --check src/services/assetsService.js`
  - `node --check src/services/workOrdersService.js`
  - `node --check src/services/companyService.js`
- Local browser file-load check passed against:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2f-company-filecheck-1779129000000`
- File-load verification:
  - `window.MaintainOpsCompanyService.getMyCompanies` was present.
  - all existing service globals were present.
  - `src/services/companyService.js?v=lfes-phase-2f-company-1` loaded.
  - `app.js?v=lfes-phase-2f-company-1` loaded.
  - app rendered the login screen without a startup ReferenceError.
  - no actionable console errors were captured in the controlled file-load check.
- Signed-in local/browser debug status:
  - passed on local HTTP after the user signed into the right-pane browser:
    - `http://localhost:4192/index.html?qa_bust=lfes-phase-2f-company-http-localhost-1779129000000`
  - Taylor Metal Products loaded.
  - Work Orders loaded.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - HTTP script verification confirmed all utility/service scripts and `app.js?v=lfes-phase-2f-company-1` were referenced and returned HTTP 200.
  - The local `localhost` origin initially had Auburn saved from prior QA state; after selecting Salem, OR through the app and reloading, Salem remained selected.
  - No missing-script or visible app error was observed.
  - Direct browser dev-console logs were not available through the current tool bridge, so this pass used static checks, HTTP script checks, and visible signed-in behavior.
- Behavior changed:
  - no intended behavior change.
  - no behavior change observed in static/file-load/signed-in verification.
- Next phase status:
  - blocked pending explicit user approval for Phase 2G or packaging/upload.

2026-05-18 short LFES post-fix checkpoint after deployed Salem hard-save fix:

- Scope: verification checkpoint only after the deployed Salem hard-save precedence fix.
- No code changes were made.
- No Phase 2F service extraction was started.
- No additional services were extracted.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
  - `node --check src/services/partsService.js`
  - `node --check src/services/assetsService.js`
  - `node --check src/services/workOrdersService.js`
- Live GitHub Pages script verification passed against:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=location-hard-save-post-fix-checkpoint-20260518`
- Live `index.html` still references:
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`
  - `app.js?v=location-hard-save-1`
- Live HTTP 200 file checks passed for:
  - `src/utils/constants.js?v=lfes-utils-1`
  - `src/utils/dom.js?v=lfes-utils-1`
  - `src/utils/formatting.js?v=lfes-utils-1`
  - `src/services/locationsService.js?v=lfes-phase-2a-locations-1`
  - `src/services/profilesService.js?v=lfes-phase-2b-profiles-1`
  - `src/services/partsService.js?v=lfes-phase-2c-parts-1`
  - `src/services/assetsService.js?v=lfes-phase-2d-assets-1`
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`
  - `app.js?v=location-hard-save-1`
- Signed-in live app verification:
  - Taylor Metal Products was observed loaded in the signed-in in-app browser.
  - Location selector showed `Salem, OR`.
  - Work Orders loaded and showed `Salem, OR` in the Work Orders header.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - The app did not visually revert to Auburn during the live section pass.
- Error check:
  - No missing-script failure was found in live HTTP script checks.
  - No obvious app error screen appeared during signed-in visual verification.
  - Direct browser dev-console logs were not available through the current tool bridge, so this pass treats live resource checks plus visible app behavior as the actionable-error check.
- Docs checked:
  - `docs/QA_LOG.md`, `docs/CURRENT_HANDOFF.md`, and `docs/NEXT_STEPS.md` now reflect the deployed/live-verified state.
- Phase 2F status:
  - can proceed only after explicit approval.

2026-05-18 GitHub Pages upload for location hard-save precedence fix:

- Scope: package and deploy the current local build containing the Salem hard-save precedence fix.
- No Phase 2F service extraction was started.
- No additional `app.js` refactor was performed beyond the already-applied location precedence fix.
- No Supabase policies, SQL, auth, workflow, rendering, or unrelated business logic changed.
- Package created:
  - folder: `MaintainOps-github-clean-20260518-094217`
  - zip: `MaintainOps-github-clean-20260518-094217.zip`
- GitHub Pages commit pushed to `main`:
  - `70d01e5c0051cc1ed40352c18c75f0553b170657`
- Package top-level contents confirmed:
  - `assets`
  - `src`
  - `app.js`
  - `index.html`
  - `README.md`
  - `styles.css`
  - `supabase-config.js`
- Package `src` contents confirmed:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
  - `src/services/partsService.js`
  - `src/services/assetsService.js`
  - `src/services/workOrdersService.js`
- Packaged and live `index.html` cache tags confirmed:
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`
  - `app.js?v=location-hard-save-1`
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
  - `node --check src/services/partsService.js`
  - `node --check src/services/assetsService.js`
  - `node --check src/services/workOrdersService.js`
- Live GitHub Pages resource verification passed against:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=location-hard-save-live-20260518-0943`
- Live HTTP 200 file checks passed for all utility/service scripts and `app.js?v=location-hard-save-1`.
- Signed-in live browser verification status:
  - completed visually in the signed-in Codex in-app browser after the user confirmed the live session was signed in.
  - Taylor Metal Products loaded.
  - Location selector showed `Salem, OR`.
  - Work Orders loaded and continued to show `Salem, OR` in the Work Orders header.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - No obvious error screen or missing-script failure was visible during the live section pass.
  - The app did not visually switch back to Auburn during this verification.
- Intended behavior change:
  - saved Salem/user-company location should persist and migrate into the scoped key instead of falling back to Auburn/member default.
- Behavior changed beyond intended location hard-save fix:
  - none observed in static/package/live-file/signed-in visual verification.
- Phase 2F remains blocked pending explicit approval.

2026-05-18 location hard-save precedence fix:

- Scope: fix active location reopen behavior only.
- Root cause:
  - The app checked the invite/member default location before the legacy saved `maintainops.activeLocationId` value.
  - If a user had a hard-saved legacy location such as Salem, but no scoped per-user/company key yet, the default location could win before the old saved value migrated.
  - This could make the app appear to default back to another location instead of preserving the user's last intentional location.
- Fix:
  - `storedLocationForLoadedCompany()` now chooses locations in this order:
    1. scoped per-user/company saved location,
    2. legacy saved location,
    3. current in-memory location,
    4. invite/member default location,
    5. first available location as final fallback.
  - This preserves the most recent hard-saved location and still uses invite/default location only when there is no saved user choice.
- Updated `index.html` app cache tag:
  - `app.js?v=location-hard-save-1`
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
  - `node --check src/services/partsService.js`
  - `node --check src/services/assetsService.js`
  - `node --check src/services/workOrdersService.js`
- Focused browser verification passed against:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=location-hard-save-1779127000000`
- Verification details:
  - Seeded legacy saved location to Salem, OR.
  - Removed the scoped user/company location key before load.
  - App opened with Salem, OR selected.
  - App migrated Salem into the scoped per-user/company key.
  - App cleared the legacy global location key.
  - No missing script errors.
  - No console errors.
- Note:
  - Prior LFES automation intentionally seeded Auburn in temporary browser profiles for repeatable verification. That was test setup, not intended app default behavior.

2026-05-18 LFES Phase 2E work order read/count/search service extraction:

- Scope: `workOrdersService` read/count/search helpers only.
- Created:
  - `src/services/workOrdersService.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Exact work order read/count/search helpers moved:
  - `selectWorkOrders(supabaseClient, selectClause, options)`
  - `countWorkOrdersQuery(supabaseClient)`
  - `fetchWorkOrderById(supabaseClient, companyId, workOrderId, selectClause)`
  - `fetchWorkOrdersByIds(supabaseClient, params)`
  - `scopedWorkOrderSearchQuery(supabaseClient, params)`
  - `fetchPagedSearchRows(buildQuery, onRows, maxRows, pageSizeLimit)`
- Exact app query portions moved out of `app.js`:
  - `supabaseClient.from("work_orders").select(selectClause, { count: "exact" })`
  - `supabaseClient.from("work_orders").select("id", { count: "exact", head: true })`
  - `supabaseClient.from("work_orders").select(selectClause).eq("company_id", activeCompanyId).eq("id", activeWorkOrderId).maybeSingle()`
  - `supabaseClient.from("work_orders").select(selectClause).eq("company_id", activeCompanyId).in("id", pageIds)`
  - `supabaseClient.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id", activeCompanyId)`
  - the generic paged search row fetch loop used by work-order search.
- Updated `index.html` script loading:
  - added `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`,
  - bumped `app.js` to `app.js?v=lfes-phase-2e-work-orders-1`.
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
- Company isolation/RLS preservation:
  - read helpers still require explicit `companyId` where they scope rows,
  - app-side filters still apply `.eq("company_id", activeCompanyId)` through the service query builders,
  - no RLS or Supabase policy files were touched.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
  - `node --check src/services/partsService.js`
  - `node --check src/services/assetsService.js`
  - `node --check src/services/workOrdersService.js`
- Local signed-in browser/debug passed against:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2e-work-orders-1779126200000`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - `window.MaintainOpsWorkOrdersService` loaded,
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1` loaded,
  - `app.js?v=lfes-phase-2e-work-orders-1` loaded,
  - Work Orders opened,
  - Equipment opened,
  - Parts opened,
  - Settings opened,
  - Team opened,
  - no missing script errors,
  - no failing script/resource URLs,
  - no console errors.
- Work Order Detail verification:
  - Auburn had zero visible work orders in the current filters.
  - Created temporary QA Quick Fix: `QA LFES phase2E detail 1779122164459`.
  - Verified Work Order Detail opened.
  - Deleted the temporary QA work order through the app delete flow.
  - Verified the temporary title was gone after delete.
- Behavior changed:
  - no behavior change observed.
- Next phase status:
  - blocked pending explicit user approval.

2026-05-18 GitHub Pages upload and live verification for stable LFES Phase 2D build:

- Scope: package, deploy, and live verification only.
- Package created:
  - folder: `MaintainOps-github-clean-20260518-092721`
  - zip: `MaintainOps-github-clean-20260518-092721.zip`
- GitHub Pages commit pushed to `main`: `692d50c98d4fe27519a9390868b8bbf077131f06`.
- No app behavior changed during packaging, upload, or verification.
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
- Confirmed packaged `index.html` references scripts in order:
  - `src/utils/constants.js?v=lfes-utils-1`
  - `src/utils/dom.js?v=lfes-utils-1`
  - `src/utils/formatting.js?v=lfes-utils-1`
  - `src/services/locationsService.js?v=lfes-phase-2a-locations-1`
  - `src/services/profilesService.js?v=lfes-phase-2b-profiles-1`
  - `src/services/partsService.js?v=lfes-phase-2c-parts-1`
  - `src/services/assetsService.js?v=lfes-phase-2d-assets-1`
  - `app.js?v=lfes-phase-2d-assets-1`
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
  - `node --check src/services/partsService.js`
  - `node --check src/services/assetsService.js`
- Confirmed live GitHub Pages file loads returned HTTP 200:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
  - `src/services/partsService.js`
  - `src/services/assetsService.js`
  - `app.js`
- Live signed-in verification passed against:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2d-live-verify-20260518-0929`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - `window.MaintainOpsAssetsService.listAssets` loaded,
  - Equipment opened,
  - Work Orders opened,
  - Parts opened,
  - Settings opened,
  - Team opened,
  - no missing script errors,
  - no failing live script/resource URLs after focused resource check.
- Console/resource result:
  - one generic browser 404 log appeared during signed-in automation without a URL,
  - focused live resource check found no failing URLs and no logs,
  - no actionable MaintainOps console error was found.
- Behavior changed:
  - no behavior change observed.
- Phase 2E status:
  - blocked pending explicit user approval.

2026-05-18 LFES Phase 2D assets read service extraction:

- Scope: `assetsService` reads only.
- Created:
  - `src/services/assetsService.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Exact assets read function moved:
  - `listAssets(supabaseClient, companyId)`
- Exact app query moved out of `app.js`:
  - `supabaseClient.from("assets").select("*").eq("company_id", activeCompanyId).order("name")`
- Updated `app.js` to call:
  - `listAssets(supabaseClient, activeCompanyId)` inside `loadCompanyData()`.
- Updated `index.html` script loading:
  - added `src/services/assetsService.js?v=lfes-phase-2d-assets-1`,
  - bumped `app.js` to `app.js?v=lfes-phase-2d-assets-1`.
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
- Company isolation/RLS preservation:
  - `listAssets()` still requires an explicit `companyId`,
  - the query remains scoped by `.eq("company_id", companyId)`,
  - no RLS or Supabase policy files were touched.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
  - `node --check src/services/partsService.js`
  - `node --check src/services/assetsService.js`
- Local signed-in browser/debug passed against:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2d-assets-1779125600000`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - `window.MaintainOpsAssetsService.listAssets` loaded,
  - `src/services/assetsService.js?v=lfes-phase-2d-assets-1` loaded,
  - `app.js?v=lfes-phase-2d-assets-1` loaded,
  - Equipment opened,
  - Work Orders opened,
  - Parts opened,
  - Settings opened,
  - Team opened,
  - no missing script errors,
  - no failing script/resource URLs,
  - no console errors.
- Behavior changed:
  - no behavior change observed.
- Phase 2E status:
  - blocked pending explicit user approval.

2026-05-18 LFES checkpoint after Phase 2C parts read extraction:

- Scope: verification checkpoint only.
- No code was changed during the checkpoint.
- No `assetsService` was created.
- No `app.js` refactor, Supabase policy, SQL, RLS, auth, workflow, rendering, or business logic changes were made.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
  - `node --check src/services/partsService.js`
- Confirmed `index.html` still loads:
  - `src/services/partsService.js?v=lfes-phase-2c-parts-1`
  - `app.js?v=lfes-phase-2c-parts-1`
- Local signed-in browser/debug checkpoint passed against:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2c-checkpoint-1779125200000`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - `window.MaintainOpsPartsService.listParts` loaded,
  - Parts opened,
  - Work Orders opened,
  - Equipment opened,
  - Settings opened,
  - Team opened,
  - no missing script errors,
  - no failing script/resource URLs,
  - no console errors.
- Behavior changed:
  - no behavior change observed.
- Phase 2D status:
  - blocked pending explicit user approval.

2026-05-18 LFES Phase 2C parts read service extraction:

- Scope: `partsService` reads only.
- Created:
  - `src/services/partsService.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Exact parts read function moved:
  - `listParts(supabaseClient, companyId)`
- Exact app query moved out of `app.js`:
  - `supabaseClient.from("parts").select("*").eq("company_id", activeCompanyId).order("name")`
- Updated `app.js` to call:
  - `listParts(supabaseClient, activeCompanyId)` inside `loadCompanyData()`.
- Updated `index.html` script loading:
  - added `src/services/partsService.js?v=lfes-phase-2c-parts-1`,
  - bumped `app.js` to `app.js?v=lfes-phase-2c-parts-1`.
- Intentionally not moved:
  - parts mutations,
  - add/edit/delete part workflows,
  - part source rename workflow,
  - part stock/inventory business rules,
  - `work_order_parts` logic,
  - `part_documents` storage/metadata logic,
  - part rendering,
  - part search/filter/pagination UI helpers,
  - event binding,
  - auth/session startup,
  - Supabase policies/RLS/SQL.
- Company isolation/RLS preservation:
  - `listParts()` still requires an explicit `companyId`,
  - the query remains scoped by `.eq("company_id", companyId)`,
  - no RLS or Supabase policy files were touched.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
  - `node --check src/services/partsService.js`
- Local signed-in browser/debug passed against:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2c-parts-1779124800000`
- Browser/debug verified:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - `window.MaintainOpsPartsService.listParts` loaded,
  - `src/services/partsService.js?v=lfes-phase-2c-parts-1` loaded,
  - `app.js?v=lfes-phase-2c-parts-1` loaded,
  - Parts opened,
  - Work Orders opened,
  - Equipment opened,
  - Settings opened,
  - Team opened,
  - no missing script errors,
  - no failing script/resource URLs,
  - no console errors.
- Behavior changed:
  - no behavior change observed.
- Phase 2D status:
  - blocked pending explicit user approval.

2026-05-18 GitHub Pages upload and live verification for stable LFES Phase 2A/2B build:

- Scope: deploy and live verification only.
- Package deployed: `MaintainOps-github-clean-20260518-090136`.
- GitHub Pages commit pushed to `main`: `2310126d934e836a0fea2b08fc95374e934aea4b`.
- No app behavior changed during upload or verification.
- No `app.js` refactor was performed.
- No `partsService` was created.
- No Supabase policies, SQL, auth, workflow, rendering, or business logic changed.
- Live URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2ab-upload-live-20260518-0915`
  - Quick Fix retry: `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2ab-qf-retry-20260518-0918`
- Confirmed live `index.html` references:
  - `src/utils/constants.js?v=lfes-utils-1`
  - `src/utils/dom.js?v=lfes-utils-1`
  - `src/utils/formatting.js?v=lfes-utils-1`
  - `src/services/locationsService.js?v=lfes-phase-2a-locations-1`
  - `src/services/profilesService.js?v=lfes-phase-2b-profiles-1`
  - `app.js?v=lfes-phase-2b-profiles-1`
- Confirmed live file loads returned HTTP 200:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
  - `app.js`
- Signed-in live verification passed:
  - session restored,
  - Taylor Metal Products loaded,
  - Auburn active location loaded,
  - Quick Fix was visible,
  - Work Orders opened,
  - Equipment opened,
  - Parts opened,
  - Settings opened,
  - Team opened.
- Service/global checks passed:
  - `window.MaintainOpsConstants`,
  - `window.MaintainOpsDom`,
  - `window.MaintainOpsFormatting`,
  - `window.MaintainOpsLocationsService`,
  - `window.MaintainOpsProfilesService`.
- Safe workflow smoke passed:
  - Created live QA Quick Fix work order: `QA LFES live upload <timestamp>`.
  - Opened the created work order detail.
  - Deleted the created QA work order through the app delete flow.
- Console/resource result:
  - No missing `src/utils`, `src/services`, or `app.js` script errors found.
  - Follow-up live resource check found no failing script/resource URLs.
  - No actionable MaintainOps console error was found.
- Result: hosted LFES Phase 2A/2B build is verified.
- Phase 2C `partsService` remains blocked until the user explicitly approves continuing.

2026-05-18 GitHub clean package for stable LFES Phase 2A/2B build:

- Scope: packaging verification only.
- No app behavior changed.
- No `app.js` refactor was performed.
- No `partsService` was created.
- No Supabase policies, SQL, auth, workflow, rendering, or business logic changed.
- Ran `tools/create-github-upload.ps1`.
- Created clean GitHub Pages package:
  - folder: `MaintainOps-github-clean-20260518-090136`
  - zip: `MaintainOps-github-clean-20260518-090136.zip`
- Package top-level contents:
  - `assets`
  - `src`
  - `app.js`
  - `index.html`
  - `README.md`
  - `styles.css`
  - `supabase-config.js`
- Confirmed package folder includes:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
- Confirmed zip includes:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
- Confirmed packaged `index.html` references required scripts in order:
  - `src/utils/constants.js?v=lfes-utils-1`
  - `src/utils/dom.js?v=lfes-utils-1`
  - `src/utils/formatting.js?v=lfes-utils-1`
  - `src/services/locationsService.js?v=lfes-phase-2a-locations-1`
  - `src/services/profilesService.js?v=lfes-phase-2b-profiles-1`
  - `app.js?v=lfes-phase-2b-profiles-1`
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
- Result: this build is ready for GitHub Pages upload.
- After upload, run a signed-in GitHub Pages checkpoint before starting Phase 2C.

2026-05-18 full LFES Debug Protocol checkpoint after Phase 2A/2B service wrappers:

- Scope: checkpoint only after `locationsService` and `profilesService` extractions.
- No code was changed during the checkpoint.
- No `partsService` was created.
- No `app.js` refactor, Supabase policy, SQL, RLS, auth, or business logic changes were made.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
- File/script checks passed:
  - `src/utils/constants.js` exists,
  - `src/utils/dom.js` exists,
  - `src/utils/formatting.js` exists,
  - `src/services/locationsService.js` exists,
  - `src/services/profilesService.js` exists,
  - `index.html` loads all utility scripts, both service scripts, and `app.js`.
- Reviewer tags remain sparse:
  - 7 total LFES reviewer tags across `app.js` and `supabase/schema.sql`.
- Company isolation/RLS logic was not touched:
  - no Supabase SQL or policy files were changed,
  - `private.is_company_member(company_id)` remained untouched,
  - service wrappers still require explicit `companyId`.
- Local signed-in browser/debug checkpoint passed against:
  - `http://127.0.0.1:4187/index.html?qa_bust=lfes-phase-2ab-full-debug-1779119916417`
- Browser/debug results:
  - session restored,
  - Taylor Metal Products loaded,
  - active location loaded as Auburn, WA,
  - Quick Fix was visible,
  - `window.MaintainOpsConstants` loaded,
  - `window.MaintainOpsDom` loaded,
  - `window.MaintainOpsFormatting` loaded,
  - `window.MaintainOpsLocationsService` loaded,
  - `window.MaintainOpsProfilesService` loaded,
  - Work Orders opened with no setup/load errors,
  - Equipment opened with no setup/load errors,
  - Parts opened with no setup/load errors,
  - Settings / Company Settings opened with no setup/load errors,
  - Team opened with no setup/load errors,
  - Mobile tech was visible,
  - Technician, Manager, and Admin role labels were visible,
  - Invite area rendered.
- Safe work-order smoke passed:
  - created Quick Fix `QA LFES phase2AB checkpoint 1779119916417`,
  - Work Order Detail opened,
  - used `Delete Work Order` -> `Permanently Delete`,
  - verified the QA title was no longer visible after delete,
  - final app still showed work navigation.
- Console errors:
  - none captured.
- Behavior changed:
  - no behavior change observed.
- Phase 2C status:
  - blocked pending user approval. Recommended choice is either run another full hosted/GitHub Pages debug after upload, or begin a narrow `partsService` extraction for read/simple scoped mutations only.

2026-05-18 LFES Phase 2B profile/member read service extraction:

- Scope: profile/company-member/team read wrappers only.
- Created:
  - `src/services/profilesService.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Exact profile/member read functions moved:
  - `listProfiles(supabaseClient, companyId)` wraps `profiles` select for `user_id`, `full_name`, and `mobile_tech` by explicit `company_id`.
  - `listCompanyMembers(supabaseClient, companyId)` wraps `company_members` select by explicit `company_id`, ordered by `created_at`.
  - `listTeamInvites(supabaseClient, companyId)` wraps `company_invites` select including `default_location_id`, ordered newest first.
  - `listTeamInvitesLegacy(supabaseClient, companyId)` wraps the fallback `company_invites` select without `default_location_id`.
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
- `index.html` now loads `src/services/profilesService.js?v=lfes-phase-2b-profiles-1` before `app.js?v=lfes-phase-2b-profiles-1`.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
  - `node --check src/services/profilesService.js`
- Local signed-in browser/debug check passed against:
  - `http://127.0.0.1:4186/index.html?qa_bust=lfes-phase-2b-local-rerun-1779119712218`
- Browser/debug results:
  - `window.MaintainOpsProfilesService` was present with `listProfiles`, `listCompanyMembers`, `listTeamInvites`, and `listTeamInvitesLegacy`.
  - signed-in session restored,
  - Taylor Metal Products loaded,
  - active location loaded as Auburn, WA,
  - Quick Fix was visible,
  - Work Orders opened,
  - Equipment opened,
  - Parts opened,
  - Settings / Company Settings opened,
  - Team opened,
  - Mobile tech was visible in Team,
  - Technician, Manager, and Admin role labels were visible,
  - Pending Invite / Invite Teammate area rendered,
  - no setup/load errors appeared,
  - no MaintainOps console errors were captured.
- Behavior changed: no intended behavior change. The extraction only moved low-risk profile/member/team read query wrappers.
- Phase 2C status: blocked pending user approval. Recommended next service target is still conservative: parts read/simple scoped mutations, or pause for a full Debug Protocol first.

2026-05-18 LFES Phase 2A locations service extraction:

- Scope: `locationsService` only.
- Created:
  - `src/services/locationsService.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Exact location functions/queries moved:
  - `listLocations(supabaseClient, companyId)` wraps `locations` select by explicit `company_id` ordered by name.
  - `createLocation(supabaseClient, companyId, name)` wraps `locations` insert with explicit `company_id`, returning the inserted `id`.
- Intentionally not moved:
  - active location persistence,
  - startup/auth/session logic,
  - rendering,
  - event binding,
  - workflow/business logic,
  - location readiness/error handling,
  - Supabase policies/RLS/SQL.
- `index.html` now loads `src/services/locationsService.js?v=lfes-phase-2a-locations-1` before `app.js?v=lfes-phase-2a-locations-1`.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
  - `node --check src/services/locationsService.js`
- Local signed-in browser/debug check passed against:
  - `http://127.0.0.1:4184/index.html?qa_bust=lfes-phase-2a-local-1779119154006`
- Browser/debug results:
  - `window.MaintainOpsLocationsService` was present with `listLocations` and `createLocation`.
  - signed-in session restored,
  - Taylor Metal Products loaded,
  - Quick Fix was visible,
  - active location loaded as Auburn, WA,
  - all five configured locations were visible: Auburn, Riverside, Sacramento, Salem, Spokane,
  - Work Orders opened,
  - Equipment opened,
  - Parts opened,
  - Settings / Company Settings opened,
  - no setup/load errors appeared,
  - no MaintainOps console errors were captured.
- Behavior changed: no intended behavior change. The extraction only moved the low-risk location select/insert query wrappers.
- Phase 2B status: blocked pending user approval. Recommended next service target remains profile/member/team read wrappers, not workflow mutations.

2026-05-18 LFES Phase 2 service-wrapper extraction plan:

- Created `docs/LFES/audits/LFES_PHASE_2_SERVICE_WRAPPER_PLAN.md`.
- Planning only:
  - no app behavior changed,
  - no service wrappers were created,
  - no `app.js` refactor was performed,
  - no Supabase policies, RLS, SQL, auth, UI, or workflow logic changed.
- The plan identifies safest future service targets:
  - `locationsService`,
  - `profilesService`,
  - `companyService`,
  - `partsService`,
  - `assetsService`,
  - `workOrdersService`,
  - `publicRequestsService` only after more caution.
- Recommended extraction order starts with location reads/create, then profile/member reads, parts, assets, work-order read/count/search helpers, company RPC wrappers, public requests later, and storage last.
- The plan marks high-risk items that should not move in the first service extraction:
  - auth/session startup,
  - active company/location persistence,
  - rendering and event binding,
  - Quick Fix,
  - work-order creation/update workflows,
  - request conversion,
  - PM generation,
  - safety checks,
  - technician assignment guardrails,
  - delete workflows,
  - photo/storage uploads,
  - optional schema fallback logic.
- Company isolation preservation is explicit: future services must receive `companyId`, keep location scope visible, preserve RLS, and must not weaken `private.is_company_member(company_id)`.
- No runtime Debug Protocol was required for this planning-only documentation change.

2026-05-18 signed-in GitHub Pages verification after LFES Phase 1 utilities:

- Verified the live GitHub Pages app after the user signed in:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-live-signedin-ui-clean-20260518`
- Signed-in user/session verified through the hosted app's Chrome session:
  - `louie.fisher@taylormetal.com`
  - Supabase role: `authenticated`
  - MaintainOps role from `get_my_companies`: `admin`
- Backend/RLS/data access checks passed with HTTP 200:
  - auth user lookup,
  - `get_my_companies`,
  - current company `Taylor Metal Products`,
  - five company locations,
  - stored active location `Auburn, WA`,
  - location-scoped work orders,
  - location-scoped equipment/assets,
  - parts,
  - active requests.
- Live browser render checks passed:
  - startup restored the signed-in app,
  - Taylor Metal Products loaded,
  - Quick Fix and My Work were visible,
  - active location loaded as Auburn, WA,
  - Work Orders opened without setup/load errors,
  - Equipment opened without setup/load errors,
  - Parts opened without setup/load errors,
  - Settings / Company Settings opened without setup/load errors.
- Missing script check passed:
  - hosted `src/utils/constants.js?v=lfes-utils-1` returned HTTP 200,
  - hosted `src/utils/dom.js?v=lfes-utils-1` returned HTTP 200,
  - hosted `src/utils/formatting.js?v=lfes-utils-1` returned HTTP 200,
  - no missing `src/utils` script errors were captured.
- Console check:
  - no MaintainOps console errors were captured during the signed-in UI pass,
  - one `https://loufish727.github.io/favicon.ico` 404 was observed and treated as harmless static-site noise.
- Basic live workflow smoke passed:
  - created Quick Fix `QA LFES live workflow 1779118764973`,
  - verified it opened as Work Order Detail,
  - deleted it through `Delete Work Order` -> `Permanently Delete`,
  - verified the QA title was no longer visible after delete,
  - no console errors were captured during the create/delete workflow.
- App behavior was not changed during this verification pass.
- Phase 2 service-wrapper planning is now unblocked from the deployment/signed-in-verification side, but should still remain a separate approved phase with Debug Protocol after each extraction.

2026-05-18 GitHub Pages deploy after LFES Phase 1 utilities:

- Deployed the clean package to `loufish727/MaintainOps` `main`.
- Git commit pushed: `aafc208` (`Deploy LFES utility package`).
- GitHub repository verification passed:
  - `index.html` on `main` now loads `src/utils/constants.js?v=lfes-utils-1`, `src/utils/dom.js?v=lfes-utils-1`, `src/utils/formatting.js?v=lfes-utils-1`, and `app.js?v=lfes-utils-1`.
  - `src/utils/constants.js`, `src/utils/dom.js`, and `src/utils/formatting.js` exist on `main`.
- GitHub Pages cache initially served the old `cleanup-delete-paths-2` HTML, then updated during polling at approximately 08:29 Pacific.
- Hosted verification URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-live-smoke-20260518-0830`
- Hosted asset checks passed:
  - `src/utils/constants.js?v=lfes-utils-1` returned HTTP 200.
  - `src/utils/dom.js?v=lfes-utils-1` returned HTTP 200.
  - `src/utils/formatting.js?v=lfes-utils-1` returned HTTP 200.
  - `app.js?v=lfes-utils-1` returned HTTP 200.
- Hosted unauthenticated startup passed: the live app rendered the normal `Welcome Back` login screen with the new utility scripts loaded.
- Console/resource check: no missing `src/utils` script errors were found. A `favicon.ico` 404 appeared and was treated as non-app noise.
- Static checks passed before deploy:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
- Signed-in live verification was completed afterward; see `2026-05-18 signed-in GitHub Pages verification after LFES Phase 1 utilities`.
- App behavior was not intentionally changed beyond deploying the already-approved LFES Phase 1 package.
- Phase 2 service-wrapper planning is no longer blocked by GitHub Pages deployment verification, but should still remain a separate approved phase with Debug Protocol checkpoints.

2026-05-18 GitHub upload packaging fix for LFES Phase 1 utilities:

- Scope: packaging-only fix after Phase 1 utility extraction.
- Modified `tools/create-github-upload.ps1` so the clean GitHub Pages package copies both `assets/` and the full `src/` directory.
- Updated `docs/GITHUB_PAGES_PROCESS.md` so the upload checklist and drag/drop instructions include `src/`.
- Created verification package:
  - `MaintainOps-github-clean-20260518-082455`
  - `MaintainOps-github-clean-20260518-082455.zip`
- Confirmed package folder includes:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
- Confirmed zip includes:
  - `src\utils\constants.js`
  - `src\utils\dom.js`
  - `src\utils\formatting.js`
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
- App behavior was not changed. No `app.js`, Supabase policy, SQL, auth, workflow, rendering, or service-wrapper code was modified.
- Phase 2 service-wrapper planning remains blocked pending true signed-in browser verification.

2026-05-18 LFES signed-in Debug Protocol checkpoint after Phase 1 utilities:

- Requested scope: signed-in browser verification after utilities/constants extraction; no refactor, no Supabase policy changes, and no app behavior changes unless a real defect was found.
- Browser/tooling tested:
  - Static local checks through PowerShell/Node.
  - Headless Chrome local load against `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-signedin-checkpoint-20260518`.
  - Local HTTP public QR load attempt against `http://127.0.0.1:4182/index.html?request=PJIpdPESjj6fl_x2UwQNjSs3&qa_bust=lfes-public-checkpoint-20260518`.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
- `index.html` still loads `src/utils/constants.js`, `src/utils/dom.js`, and `src/utils/formatting.js` before `app.js?v=lfes-utils-1`.
- Unauthenticated local app load passed: the normal `Welcome Back` login form rendered through the extracted utility scripts.
- Signed-in verification was not completed because this Codex session did not expose a controllable signed-in app browser session or app credentials. Existing Edge/Chrome local storage inspection found hosted MaintainOps state such as active company/location, but no reusable MaintainOps Supabase app auth token for the local or hosted app origin.
- Signed-in user type tested: not verified in this pass. Prior verified signed-in user remains manager-level `louie@taylormetal.com`, but this specific Phase 1 runtime checkpoint still needs a live signed-in browser pass.
- Not verified in this pass:
  - session restore past login,
  - company selection/current company load,
  - Work Orders load,
  - Assets/Equipment load,
  - Parts load,
  - active/default location persistence inside an authenticated session,
  - authenticated public request manager-side visibility,
  - basic work order create/edit after the utility extraction.
- Public QR route note: the known Salem QR URL was opened, but headless Chrome did not progress past `Loading request form...` during this pass, so public QR is not counted as verified here.
- Existing LFES reviewer tags remain minimal: 7 total tags were found across `app.js` and `supabase/schema.sql`.
- Company isolation/RLS behavior was not touched. No Supabase policy, SQL, auth, or workflow code was changed.
- Broken helpers found: none from static checks or unauthenticated local load.
- Behavior changes found: none confirmed.
- Additional deployment risk observed but not changed in this pass: `tools/create-github-upload.ps1` currently copies only root files and `assets`; after Phase 1 utilities, any GitHub Pages upload package must include `src/` or the hosted app will miss the utility scripts. Fix the package script before the next GitHub upload package.
- Phase 2 service-wrapper planning is not approved yet. Finish a true signed-in browser checkpoint first.

2026-05-18 LFES modularization Phase 1:

- Scope: pure utility/constants extraction only.
- Created:
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
- Modified:
  - `app.js`
  - `index.html`
  - `docs/ARCHITECTURE.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
  - `docs/QA_LOG.md`
- Extracted only pure constants/helpers with no Supabase calls, no auth/session dependency, no company membership dependency, no global state mutation, and no workflow mutation.
- `index.html` now loads utility scripts before `app.js` and uses `app.js?v=lfes-utils-1`.
- Static checks passed:
  - `node --check app.js`
  - `node --check supabase-config.js`
  - `node --check src/utils/constants.js`
  - `node --check src/utils/dom.js`
  - `node --check src/utils/formatting.js`
- Headless Chrome smoke passed against the local file URL with cache bust `lfes-utils-smoke-20260518`; the normal Welcome Back login form rendered through the new utility scripts.
- Authenticated Debug Protocol was not fully completed in this sandbox because the available tools did not expose an authenticated browser session or credentials. Work Orders load, signed-in session behavior, and company-isolation runtime behavior still need a signed-in browser pass.
- No app behavior was intentionally changed.

2026-05-18 LFES v1 documentation-and-audit pass:

- Created `docs/LFES` with Core and Gold standards, practical standards, audit process, traceability, templates, context memory, real-world failure pattern mapping, app.js modularization plan, and LFES Gold audit report.
- App behavior was not intentionally changed.
- Added 7 sparse LFES reviewer tags only at high-risk boundaries:
  - location persistence,
  - public QR request intake,
  - equipment-driven cross-location routing,
  - equipment delete linked-count guard,
  - invite/default-location onboarding,
  - request conversion,
  - `private.is_company_member(company_id)`.
- Initial LFES Gold score: 78/100, Acceptable.
- Initial critical findings: none.
- High findings:
  - true restricted-role technician QA still needs completion,
  - `app.js` responsibility concentration remains the largest maintainability risk.
- Medium findings:
  - real second-user invite acceptance/default-location startup remains unverified,
  - optional schema fallbacks can hide missing migrations,
  - real mobile/desktop file-picker photo QA remains incomplete,
  - GitHub Pages package/cache drift remains a deployment risk.
- Static checks should be run after this pass because `app.js`, `index.html`, and `supabase/schema.sql` comments/cache tag were updated.

## Stress Tests Completed

The app has been stress tested with large work-order counts:

- 100 work order matrix
- 500 work order load
- 1,000 work order load
- 2,500 work order paging verification
- 5,000 work order verification
- 10,000 work order verification

Outcome:

- The app moved toward server-paged work orders.
- Work queues remain usable with 12 visible cards per page.
- Search was expanded to pull related matches without rendering thousands at once.

## Relationship Stress Tests

Relationship tests have covered:

- Work order to equipment.
- Work order to procedures.
- Work order to parts used.
- Work order to comments.
- Work order to photos.
- Work order to history/events.
- Work order to messages.
- Assignment and reassignment.
- Status changes across generated and manual work orders.

Important finding:

- Procedure checklist logic had issues on some work-order variation types and was patched.
- Any new work-order creation path should be retested against procedure checklist behavior.

## Role And Permission QA

Test user:

`louie@taylormetal.com`

Known last tested role:

`manager`

Validated behavior:

- Technician can create Quick Fix.
- Technician can update assigned work.
- Technician can comment.
- Technician cannot use admin-only delete paths.
- Manager sees Team role controls.
- Manager sees Admin Setup and Settings.
- Role update from Supabase reflects in app after sign out/in.

2026-05-07 role model update:

- Removed the unused `member` role from the app UI. The working role model is now Technician, Manager, Admin.
- Fixed role-save redraw behavior: after `update_company_member_role` succeeds, the app reloads `company_members` before rendering Team again.
- Added `supabase/step-next-role-model-technician-manager-admin.sql` to convert legacy `member` rows/invites to `technician`, tighten database role checks, and update role/invite RPC validation.
- Still needs Supabase SQL application and a live Team role-change QA pass.

2026-05-07 technician assignment guardrails:

- Added the agreed technician rule: technicians can create work orders, convert requests to work orders, and claim unassigned work for themselves.
- Technicians cannot assign work to other users, assign outside vendors, clear assignments, or reassign work already assigned to someone else.
- Managers/admins keep full assignment controls.
- Added `supabase/step-next-technician-assignment-guardrails.sql` for database enforcement.
- Supabase SQL was applied, then debug protocol was run with fresh local token `1778195748451`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Startup passed with Taylor Metal Products loaded and no MaintainOps console errors.
- Main navigation passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings.
- Manager location switching loaded cleanly across the first three configured locations.
- Team role UI showed only Technician, Manager, Admin. Member was absent from role guide, invite role selector, and editable role selectors.
- Created Quick Fix `QA assignment guard quick fix 1778195839716`; verified it opened/saved successfully with no Quick Fix error.
- Submitted internal request `QA assignment guard request 1778195863991`; converted it to a work order and verified Work Order Detail opened.
- Claimed the converted unassigned work through Assign to me, then saved Quick Update with `Assignment guard update 1778195899595`.
- Submitted public QR request `QA assignment public request 1778195925580`; anonymous submit showed Request sent and manager search found it under the QR location.
- No MaintainOps console errors were observed. Browser-use Statsig telemetry warnings were ignored.
- Still needs live technician-account QA to prove the database trigger blocks forbidden technician assignment paths under a true technician session.
- Protocol improvement from this pass: `docs/DEBUG_PROCESS.md` and `docs/FEATURE_CHANGE_PROCESS.md` now require true restricted-role denied-path checks for role/security changes, durable Team reload verification after role saves, and exact QR-location verification for public request visibility.

## Location QA

Validated:

- Switching locations reloads work queues.
- Location A data and Riverside data do not show together in default location-scoped work views.

2026-05-15 invite default location build:

- Added Team invite Default location selector.
- Added `supabase/step-next-invite-default-location.sql`.
- The SQL adds `default_location_id` to `company_members` and `company_invites`, updates invite creation, invite acceptance, and `get_my_companies()`.
- App startup now prefers the member default location when there is no saved scoped active location for that signed-in user/company.
- Bumped `index.html` to `app.js?v=invite-default-location-2`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Browser UI smoke before SQL application passed:
  - Taylor Metal Products loaded,
  - Team screen opened,
  - Invite Teammate showed Default location,
  - Salem, OR and Spokane, WA appeared in the location options,
  - no console errors were captured.
- Supabase SQL was applied and Team reloaded without schema warnings.
- Created pending invite `qa.invite.default.location@maintainops.test` with role Technician and Default location `Salem, OR`.
- Pending Invites displayed the QA invite with `Default location: Salem, OR`.
- No browser console errors were captured during the SQL-applied invite smoke.
- Fixed an invite email validation/automation issue: the field now uses `type="text"` with `inputmode="email"`, autocomplete, no autocapitalize/spellcheck, and an escaped email pattern so the user experience remains email-like while QA automation can type and submit.
- Still needs live invite acceptance QA with a real second user.

2026-05-15 pending invite cancel build:

- Added manager/admin Cancel Invite controls to Pending Invites.
- Cancel flow is two-step: first click exposes Keep / Cancel Invite; second click calls `cancel_company_invite`.
- Added `supabase/step-next-cancel-team-invites.sql`; SQL was applied after the initial UI smoke.
- Local browser UI smoke against `app.js?v=cancel-team-invite-2` passed:
  - Team screen opened,
  - pending QA invite `qa.invite.default.location@maintainops.test` appeared,
  - `Default location: Salem, OR` still displayed,
  - Cancel Invite buttons rendered,
  - no browser console errors were captured.
- Canceled `qa.invite.default.location@maintainops.test` through the app after SQL application; Pending Invites reloaded and the QA invite no longer appeared.
- Existing pending invite `jeffrey.kinkaid@taylormetal.com` remained untouched.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.

Recent change needing fresh QA:

- Topbar location switcher.
- Mobile tech lock.
- Team profile Mobile tech setting.

2026-05-15 Mobile tech manager-side QA:

- Ran signed-in local HTTP QA against `app.js?v=procedure-delete-guard-1`.
- Current signed-in account loaded Taylor Metal Products as a manager/admin-level user with Admin Setup visible.
- Manager/admin location switcher was enabled.
- Switched Salem, OR and Spokane, WA from the visible topbar location selector; both selected cleanly with no console errors.
- Team screen opened and My Profile showed `Mobile tech - I intentionally work across locations`.
- Mobile tech checkbox was present and enabled in Team profile.
- Created Quick Fix `QA mobile tech manager 1778885988402 quick fix` while Spokane, WA was selected and no equipment was attached.
- Work Order Detail opened and Spokane, WA remained selected, confirming the Quick Fix used the active selected location.
- Deleted the QA work order through `Delete Work Order` -> `Permanently Delete`; final snapshot no longer showed the QA work title.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Remaining unproven risk: true technician-session QA is still needed to prove Mobile tech off locks location switching, Mobile tech on unlocks it, and turning it off locks it again. This cannot be proven from the current manager/admin session.

2026-05-06 update:

- Manager session confirmed topbar location switcher is unlocked.
- Manager switched Salem, OR to Riverside, CA; work counts/cards reloaded to Riverside-scoped data.
- Found and fixed a blocker: profile loading did not select `profiles.mobile_tech`, so the Team checkbox could save but would reload as off and technicians would remain locked.
- Verified Mobile tech checkbox now persists checked after save/re-render, then restored the current manager profile back to off.
- Created QA Quick Fix `QA mobile location lock quick fix 1778099147702` while Riverside, CA was selected.
- Confirmed that Quick Fix appeared in Riverside, CA and did not appear after switching to Salem, OR.
- Still needs a real technician-account pass for disabled switcher/unlock/re-lock behavior when a technician login is available.

2026-05-13 live location correction:

- Investigated Lee Gaede's live work order `Hydralic Leak`, id `8a19166f-c653-4da6-a5db-01bc5b96491a`.
- Found it was created under Auburn, WA and linked to equipment `New thalmann`, id `fdab0981-bb5e-4335-92ce-f0b4667b1692`, which was also assigned to Auburn, WA.
- Code review confirmed work order creation uses selected equipment location when equipment is attached; otherwise it uses the active workspace location. This points to equipment/location routing rather than a random database save failure.
- Ran a targeted Supabase correction from an unsaved SQL editor tab: moved the one work order and its linked equipment from Auburn, WA to Salem, OR and inserted a work order event noting the admin correction.
- Verification query showed `Hydralic Leak` at `Salem, OR` after the correction.
- Follow-up product fix remains: implement invite/default location and finish true technician mobile-tech lock QA so new or restricted users do not silently fall back to Auburn, WA.

2026-05-13 active location persistence hardening:

- Root issue: active location was saved only in the global `maintainops.activeLocationId` localStorage key, so reload/reopen behavior was too loose for live field use.
- Fix: active location is now persisted per signed-in user and company as `maintainops.activeLocationId:<user_id>:<company_id>`, while the legacy global key remains as a read/write fallback.
- Startup now reloads the saved company/user location when it still belongs to the loaded company; otherwise it falls back safely to the first available location.
- Company switching no longer clears that company's saved active location before the app has loaded and validated its locations.
- Updated `docs/DEBUG_PROCESS.md` and `docs/FEATURE_CHANGE_PROCESS.md` so location changes require reload/reopen persistence verification.
- Bumped `index.html` to `app.js?v=location-persist-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Targeted helper unit passed for scoped key creation, legacy fallback, scoped write, and scoped read.
- Local HTTP app loaded at `http://127.0.0.1:4182/index.html?qa_bust=location-persist-20260513` to the login screen with no `127.0.0.1:4182` console errors.
- Signed-in browser QA remains manual/pending because the local HTTP origins were not signed in and browser automation is blocked from inspecting the signed-in `file://` origin.

## Public Request QR QA

2026-05-06 update:

- Manager opened Company Settings and created an active Riverside, CA public request QR link.
- With Public MaintainOps URL set to local test server `http://127.0.0.1:4173/index.html`, the QR page loaded anonymously and showed Riverside, CA / Taylor Metal Products.
- Anonymous request form loaded without company login from `?request=...`.
- Submitted external QA request `QA outside QR request 1778099491452`.
- Public form showed `Request Sent`.
- Manager reloaded MaintainOps and confirmed the request appears under Riverside, CA Requests with outside requester name/contact and Convert/Quick Fix actions.
- Before printing real QR codes, set Public MaintainOps URL to the deployed MaintainOps URL rather than the local test URL.
- GitHub Pages URL confirmed as `https://loufish727.github.io/MaintainOps/`.
- Local `supabase-config.js` now sets `window.PUBLIC_APP_URL` to the GitHub Pages URL for QR generation after upload.
- Direct GitHub asset check confirmed hosted `app.js` contains the public request flow and public URL guard.
- Anonymous Supabase intake RPC confirmed Riverside, CA / Taylor Metal Products for the active Riverside token.

2026-05-07 request photo update:

- Added optional photo inputs to internal Requests and public QR request intake.
- Request photos reuse the existing work-order photo optimization behavior: image uploads are resized to a 2400px max dimension and encoded as JPEG quality 0.88 when supported.
- Added `supabase/step-next-maintenance-request-photos.sql` for `maintenance_requests.photo_*` metadata, the private `maintenance-request-photos` bucket, storage policies, and `attach_maintenance_request_photo`.
- Request cards now show the attached request photo thumbnail, optimized size metadata, and an authenticated signed link for managers/team members.
- Conversion and Quick Fix from a request preserve a text note on the created work order when the original request has a photo.
- Verified the provided test image `C:\Users\louie\Downloads\logo.png` is a PNG, 3052x1171, 145,981 bytes; it is larger than 2400px wide, so the browser optimizer should resize it before request-photo upload.
- Static checks passed after the code change: `node --check app.js` and `node --check supabase-config.js`.
- Fresh local UI verification used `request-photos-ui-1778193600000`.
- Verified internal Request form shows one optional photo input and the 2400px optimization copy.
- Verified public QR form shows one optional photo input and the 2400px optimization copy.
- Verified public QR submit without a photo still shows `Request Sent`.
- Verified internal request submit without a photo still appears in manager Requests.
- Full photo upload QA still requires running `supabase/step-next-maintenance-request-photos.sql` in Supabase, then selecting a file in the browser file picker on desktop/mobile.

2026-05-07 request photo SQL applied QA:

- After the request-photo SQL was applied, submitted public QR request `QA request photo upload 1778194123496` and attached `C:\Users\louie\Downloads\logo.png`.
- Verified the anonymous request record, private storage upload, and `attach_maintenance_request_photo` RPC all completed.
- Verified manager Requests screen showed the request card with `logo.png`, thumbnail image, size metadata, and an `Open photo` link.
- Verified no MaintainOps console errors during manager-side request photo rendering.
- Tested conversion behavior and kept the reliable behavior scoped: converted work orders include a note that the original request has an attached photo. Automatic copying into `work_order_photos` was attempted but not left enabled because it did not reliably render in the work order Photos section.

2026-05-07 connectivity smoke update:

- Re-ran desktop app with fresh cache bust against live Supabase config.
- Verified all main navigation buttons open without console errors: My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, Settings.
- Verified manager location switching for Riverside, Salem, and Spokane reloads cleanly.
- Created Quick Fix `QA smoke connectivity 1778190977622`; confirmed it opened as a work order.
- Updated the smoke work order to In Progress, saved due date/resolution, and added a comment.
- Created part `QA smoke part 1778191046361`; verified Use and Restock inventory actions.
- Created equipment `QA smoke equipment 1778191132519`, found equipment card open navigation was missing, and fixed equipment cards so click/Enter/Space open Equipment Detail.
- Saved equipment detail name update to `QA smoke equipment 1778191132519 saved`.
- Found and fixed a section navigation leak where leaving a detail view could keep the old detail panel visible while another nav item was active.
- Submitted internal request `QA smoke request 1778191273133` and converted it to a work order.
- Created procedure `QA smoke procedure 1778191311036` and added step `QA smoke required step 1778191318813`.
- Created PM schedule `QA smoke PM 1778191339236` and generated a preventive work order from it.
- Submitted public QR request `QA public smoke request 1778191377621` through the anonymous Riverside request URL and verified it appeared in Riverside Requests.
- Submitted app issue report `QA smoke app report 1778191406745`.
- No browser console errors were observed during the smoke pass.

## Process QA

2026-05-15 signed-in correction QA:

- Ran signed-in local HTTP QA against `app.js?v=procedure-delete-guard-1`.
- Startup passed for Taylor Metal Products with no browser console errors.
- Requests Active, Converted, and All filters opened cleanly with no setup warning and no console errors.
- Location persistence passed in both directions:
  - switched to Salem, OR and reloaded; Salem stayed selected,
  - switched back to Spokane, WA and reloaded; Spokane stayed selected.
- Created QA equipment `QA guard 1778885282060 equipment`.
- Created QA procedure `QA guard 1778885282060 procedure`.
- Created QA PM schedule `QA guard 1778885282060 PM` linking that equipment and procedure.
- Procedure delete blocker passed: linked procedure showed `Kept For Traceability` because it was linked to 1 PM schedule.
- Equipment delete blocker passed: linked equipment showed `Kept For Traceability` because it had 1 PM schedule.
- Cleaned up through the app in dependency order:
  - deleted the QA PM schedule,
  - deleted the QA procedure,
  - deleted the QA equipment.
- Final cleanup snapshots no longer showed the QA PM, procedure, or equipment names.
- No MaintainOps console errors were captured during the pass.

2026-05-15 procedure delete guard correction:

- Extended the server-paged traceability guard to procedure templates.
- Procedure delete now checks live Supabase counts for linked work orders and PM schedules before showing confirmation or deleting.
- This prevents linked procedure history from being hidden by the currently loaded work-order page.
- Bumped `index.html` to `app.js?v=procedure-delete-guard-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Browser/live QA still needs a signed-in procedure delete-blocker smoke with one linked procedure.

2026-05-15 equipment delete guard correction:

- Found a live-data safety risk from server-paged lists: equipment delete blockers were using only the rows currently loaded in the browser.
- Added live Supabase count checks for linked work orders, PM schedules, and maintenance requests before equipment delete can move to confirmation or execute.
- This preserves traceability even when related records are on another Work Orders or Requests page.
- Bumped `index.html` to `app.js?v=equipment-delete-guard-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Browser/live QA still needs a signed-in delete-blocker smoke with one linked equipment record.

2026-05-15 request server paging correction:

- Changed Requests from browser-side slicing of the loaded request array to Supabase server paging at 12 per page.
- Active, Converted, and All request filter counts now come from count queries.
- Request reloads are now wired to location switch, request section open, Active/Converted/All filter changes, request pagination, and global search changes.
- Request search keeps linked equipment matching by adding matching equipment IDs to the server-side request search.
- Bumped `index.html` to `app.js?v=request-server-paging-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Browser/live QA still needs a signed-in pass before packaging because this was a code-level correction.

2026-05-15 senior-code-review cleanup and audit support:

- Archived 50 old GitHub/export package folders and zips under `_archive/github-packages` instead of deleting them.
- Kept the active project root focused on current source files and the latest clean package.
- Added read-only Supabase audit SQL at `supabase/step-next-location-integrity-audit.sql`.
- The audit script includes separate SELECT checks for:
  - work orders, equipment, requests, parts, and PM schedules whose `location_id` does not belong to the same `company_id`;
  - work orders, requests, and PM schedules where the record location differs from linked equipment location;
  - validation status for location foreign-key constraints.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Confirmed `index.html` still points to `app.js?v=location-guardrails-1`.

2026-05-15 local folder rename:

- Renamed the local project folder from `theres-an-ap-called-maintenance-x` to `MaintainOps`.
- Updated live docs local file URL references in `docs/PROJECT_OVERVIEW.md`, `docs/DEBUG_PROCESS.md`, and `docs/FEATURE_CHANGE_PROCESS.md`.
- Updated automation `maintainops-daily-full-debug` to run from `C:\Users\louie\Documents\Codex\2026-04-28\MaintainOps`.
- Static checks passed after rename: `node --check app.js` and `node --check supabase-config.js`.
- Confirmed `index.html` still points to `app.js?v=location-guardrails-1`.
- New local refresh URL: `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=folder-rename-20260515`.

2026-05-15 senior-code-review correction pass:

- Added cross-location equipment routing warnings before saving Quick Fix, full Work Order, Quick Update, internal Request, and PM schedule forms.
- Preserved existing routing behavior: equipment location still controls the saved location when equipment is selected, but the user now gets an intentional warning if it differs from the active location.
- Tightened active-location storage so the scoped user/company key is used after migration and the old global key is removed.
- Added clean GitHub Pages process docs at `docs/GITHUB_PAGES_PROCESS.md`.
- Added `tools/create-github-upload.ps1` to generate a clean GitHub Pages upload folder and zip.
- Bumped app cache tag to `app.js?v=location-guardrails-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Confirmed `index.html` points to `app.js?v=location-guardrails-1`.
- Package script smoke passed and created `MaintainOps-github-clean-20260515-141819` plus `MaintainOps-github-clean-20260515-141819.zip` with only `assets`, `app.js`, `index.html`, `README.md`, `styles.css`, and `supabase-config.js`.
- Browser QA blocker: the in-app browser blocked the local `127.0.0.1` test URL before the app loaded, so signed-in UI verification remains pending.

2026-05-15 full live debug protocol:

- Created active daily automation `MaintainOps Daily Full Debug` (`maintainops-daily-full-debug`) so the daily run uses the full live debug protocol, not only the smaller daily smoke.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Confirmed `index.html` points to `app.js?v=cleanup-delete-paths-2`.
- Ran hosted full debug on GitHub Pages with `?qa_bust=full-debug-20260515`.
- Startup passed: Taylor Metal Products loaded, no workspace load stop appeared, and no MaintainOps console errors were captured.
- Main navigation passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings.
- Location persistence passed:
  - Switched to Riverside, CA and reloaded; Riverside stayed selected.
  - Switched back to Salem, OR and reloaded; Salem stayed selected.
- Baseline Requests across Auburn, Riverside, Sacramento, Salem, and Spokane showed `Active 0`, `Converted 0`, and `All 0`.
- Confirmed live `Hydralic Leak` is visible only in Salem and not in the other locations.
- Quick Fix / Work Order path passed:
  - Created `QA full debug quick fix 2026-05-15-full` in Salem.
  - Work Order Detail opened.
  - Saved status `In Progress`, due date `2026-05-20`, and resolution `QA full debug resolution 2026-05-15-full`.
  - Comment count increased during comment verification, but the browser automation snapshot did not expose the comment body text; treat comment body visibility as automation-limited for this run, not a confirmed app failure.
  - Deleted the QA work order through `Delete Work Order` -> `Permanently Delete`.
- Internal Request path passed:
  - Submitted `QA full debug request 2026-05-15-full`.
  - Confirmed it was visible in Active requests.
  - Converted it to Work Order Detail.
  - Deleted the converted/generated work order through the app.
  - Deleted the converted request through the app.
  - Requests returned to `Active 0`, `Converted 0`, and `All 0`.
- Equipment / Procedure / PM path passed:
  - Created equipment `QA full debug equipment 2026-05-15-full`.
  - Created procedure `QA full debug procedure 2026-05-15-full` with step `QA full debug step 2026-05-15-full`.
  - Created PM schedule `QA full debug PM 2026-05-15-full`.
  - Generated a PM work order and opened Work Order Detail.
  - Deleted the generated PM work order, PM schedule, procedure, and equipment through the app.
- Parts path was not completed because browser automation still cannot reliably type into number inputs. No bad part was saved and no live data was touched.
- Public Salem QR request path passed:
  - Loaded the anonymous Salem request form from `?request=PJIpdPESjj6fl_x2UwQNjSs3`.
  - Confirmed Taylor Metal Products / Salem, OR.
  - Submitted `QA full debug QR 2026-05-15-full`.
  - Public form showed `Request Sent`.
  - Reopened the manager app, confirmed the request appeared in Salem Active requests, then deleted it through the app.
- Final sweep:
  - Auburn, Riverside, Sacramento, Salem, and Spokane Requests all showed `Active 0`, `Converted 0`, and `All 0`.
  - No today QA work, PM schedules, equipment, procedures, or parts were left visible.
  - Final console check found no MaintainOps errors.

2026-05-15 daily live debug:

- Ran hosted daily live debug on GitHub Pages with `?qa_bust=daily-live-20260515`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Confirmed `index.html` points to `app.js?v=cleanup-delete-paths-2`.
- Startup passed: Taylor Metal Products loaded, login screen was not shown, Salem, OR was selected, and no workspace load stop appeared.
- Main navigation passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings with no stopped workspace state.
- Location persistence passed in both directions:
  - Switched to Riverside, CA and reloaded; Riverside stayed selected.
  - Switched back to Salem, OR and reloaded; Salem stayed selected.
- Request baseline across Auburn, Riverside, Sacramento, Salem, and Spokane showed `Active 0`, `Converted 0`, and `All 0`.
- Quick Fix daily smoke passed:
  - Created `QA daily quick fix 2026-05-15` in Salem.
  - Work Order Detail opened.
  - Deleted it through `Delete Work Order` -> `Permanently Delete`.
  - Confirmed the title was gone after deletion.
- Public Salem QR daily smoke passed:
  - Loaded public request form from Salem token and confirmed Taylor Metal Products / Salem, OR.
  - Submitted `QA daily QR 2026-05-15`.
  - Public form showed `Request Sent`.
  - Reopened manager app and confirmed Salem Requests showed the submitted QA request in Active.
  - Deleted the QA request through the app delete confirmation flow.
  - Salem Requests returned to `Active 0`, `Converted 0`, and `All 0`.
- Final hosted console check found no MaintainOps errors.

2026-05-13 QA data lifecycle and app-delete cleanup:

- Added `docs/QA_DATA_PROCESS.md` so future debug runs use consistent QA naming and cleanup tokens.
- User clarified cleanup should run through the app, not SQL, so the temporary SQL cleanup file was removed before use.
- Cleanup is intentionally QA-only: it targets explicit QA prefixes and known debug/test records.
- Active QA work orders were deleted through the hosted app using the real `Delete Work Order` -> `Permanently Delete` flow.
- Verified location results after app cleanup:
  - Auburn, WA: 0 active work, no visible QA active work orders.
  - Riverside, CA: 0 active work, no visible QA active work orders.
  - Sacramento, CA: 0 active work, no visible QA active work orders.
  - Salem, OR: 1 active work, only live `Hydralic Leak` visible.
  - Spokane, WA: 0 active work, no visible QA active work orders.
- Created `QA delete smoke 20260513 app path` through Quick Fix, verified Work Order Detail opened, then deleted it through the same app delete flow; it no longer appeared afterward.
- Delete function behavior observed: delete confirmation appears, permanent delete completes, workspace reloads, and active counts update.
- Deleted 13 QA parts through the app by opening each Part Detail and using the real `Delete Part` confirmation. Parts now shows `0 shown`.
- Equipment app-delete check found a traceability blocker: `QA full debug equipment 20260513-full-debug` is kept because it still has a linked PM schedule. This is correct existing behavior.
- Post-cleanup smoke found no MaintainOps console errors on the hosted app.
- Remaining cleanup work:
  - Equipment still has QA records because linked PM/history blocks deletion.
  - PM still has QA schedules and currently needs an app delete/archive path.
  - Requests still has QA requests and currently needs an app delete/archive path.
  - Procedures still appear in dropdowns and need an app delete/archive path if they should be cleaned without SQL.
- Added QA data lifecycle checks to `docs/DEBUG_PROCESS.md`.

2026-05-13 full debug after app-delete cleanup:

- Ran hosted full debug at `https://loufish727.github.io/MaintainOps/?qa_bust=full-debug-after-cleanup-20260513`.
- Startup passed with Taylor Metal Products loaded.
- Main navigation passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings / Company Settings.
- Location switching passed across Auburn, Riverside, Sacramento, Salem, Spokane, and back to Salem.
- Active Work Orders stayed clean after cleanup:
  - Auburn, WA: 0 active, no visible QA work.
  - Riverside, CA: 0 active, no visible QA work.
  - Sacramento, CA: 0 active, no visible QA work.
  - Salem, OR: 1 active, only live `Hydralic Leak`.
  - Spokane, WA: 0 active, no visible QA work.
- Quick Fix create/delete smoke passed with `QA full debug cleanup smoke 20260513`; Work Order Detail opened and the app delete flow removed it.
- Part create/delete smoke passed on retry with `QA full debug cleanup part retry 20260513`; the first attempt hit a browser automation limitation filling a number input, not an app failure.
- Equipment create/delete smoke passed on retry with `QA full debug cleanup equipment retry 20260513`.
- Requests filter loaded, but Active still contains old QA requests. This confirms Requests needs an app delete/archive cleanup path before live testing.
- PM and Procedures load, but still contain old QA PM schedules/procedure templates. This confirms those sections need app delete/archive cleanup paths before app-only cleanup can be completed.
- Existing QA equipment remains visible because linked PM/history blocks deletion for traceability; this is expected current behavior.

2026-05-13 cleanup path follow-up:

- Added manager/admin app delete controls for maintenance requests, preventive schedules, and procedure templates so QA cleanup can stay app-first.
- Request delete removes attached request-photo storage before deleting the request row.
- PM and Procedure deletes use permanent confirmation and verify the row is gone after Supabase delete.
- Added `supabase/step-next-cleanup-delete-paths.sql` for the required delete grants/RLS policies.
- Updated the QA data process so future cleanup order is Work Orders, Parts, Requests, PM, Procedures, then Equipment.
- After SQL was applied, static verification passed with `node --check app.js`.
- GitHub Pages was checked and was still serving the prior `app.js?v=request-flow-clean-auth-3` build, so the new cleanup delete buttons were not yet available on the hosted app.
- Prepared clean upload package `MaintainOps-github-clean-20260513-final-cleanup` and zip `MaintainOps-github-clean-20260513-final-cleanup.zip` containing only the current app, assets, docs, and Supabase files.
- Final app-click debug is pending upload of the cleanup build to GitHub Pages, then reload with a fresh cache-bust.

2026-05-13 final cleanup publish and hosted debug:

- Published cleanup build to GitHub `main`:
  - `cb5f5d2` added app cleanup delete paths.
  - `ae484ce` bumped the app cache tag to `app.js?v=cleanup-delete-paths-2` after the browser had cached the first cleanup tag before GitHub Pages finished updating.
- Verified GitHub `index.html` points to `app.js?v=cleanup-delete-paths-2`.
- Verified hosted `app.js` contains `data-delete-request` and `canDeleteOperationalRecords`.
- Hosted app loaded at `https://loufish727.github.io/MaintainOps/?qa_bust=final-cleanup-debug-20260513-cache2`.
- Startup passed for Taylor Metal Products with Salem, OR selected and no MaintainOps console errors.
- New cleanup buttons appeared on hosted Requests after the cache tag bump.
- Deleted QA maintenance requests through the app delete confirmation flow:
  - Salem: 6 converted requests and 13 active requests.
  - Auburn: 2 requests.
  - Riverside: 2 requests.
  - Spokane: 6 requests, then 3 remaining converted requests on a follow-up pass.
  - Sacramento: 1 remaining converted request on a follow-up pass.
- Final Requests sweep across all locations showed `Active 0`, `Converted 0`, and `All 0`.
- Deleted QA PM schedules through the app delete confirmation flow:
  - Salem: 12 schedules, including 4 found on the second unfiltered pass.
  - Spokane: 3 schedules.
- Final PM sweep across all locations showed 0 QA PM headings.
- Deleted 15 QA procedure templates through the app delete confirmation flow.
- Final Procedures check showed 0 QA headings and 0 QA procedure options.
- Deleted remaining QA equipment through the app delete confirmation flow:
  - Spokane: 3 equipment records.
  - Salem: 7 equipment records after PM blockers were removed.
- Final Equipment sweep across all locations showed 0 QA equipment headings.
- Deleted the remaining visible QA part `QA full debug part 1778196110830` through the app delete confirmation flow.
- Final Parts check showed no QA headings and `No parts added yet.`
- Quick Fix smoke after cleanup passed:
  - Created `QA final cleanup smoke 20260513`.
  - Work Order Detail opened.
  - Deleted the smoke work order through `Delete Work Order` -> `Permanently Delete`.
  - Confirmed the smoke title was gone after deletion.
- Main navigation smoke passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings. PM and Parts headings differ from nav labels (`Preventive Maintenance`, `Parts Inventory`), but the sections loaded with no stopped workspace state.
- Final console check found no MaintainOps errors.
- No hosted MaintainOps console errors were captured during the final pass.

2026-05-07 update:

- Added `docs/DEBUG_PROCESS.md` as the repeatable debug/smoke workflow.
- Added `docs/FEATURE_CHANGE_PROCESS.md` as the feature gate process for scoping, risk classification, targeted QA, Supabase gate, GitHub package gate, GitHub Pages QA, and final response format.
- Linked both process docs from `docs/CURRENT_HANDOFF.md`, `docs/NEXT_STEPS.md`, and this QA log so future feature work starts from the same process.

2026-05-13 Supabase Data API grants update:

- Reviewed Supabase's 2026 public-schema Data API grant change.
- Added `supabase/step-next-explicit-data-api-grants.sql` so MaintainOps keeps explicit table/function grants instead of depending on old public schema defaults.
- Updated `docs/FEATURE_CHANGE_PROCESS.md`, `docs/SUPABASE_SETUP.md`, and `docs/ARCHITECTURE.md` so every future public table must include explicit grants, RLS, and policies.
- Kept anonymous QR access on scoped RPC grants; no direct `anon` table grants were added.
- Supabase dashboard had a stalled run on the first large all-in-one grant pass. Re-ran the needed service-role table grants as a smaller batch, which returned `Success. No rows returned`.
- Ran service-role RPC execute grants as a second small batch, which also returned `Success. No rows returned`.
- Verification query returned `true` for authenticated schema usage, service_role schema usage, authenticated work order select/update, service_role app issue report delete, service_role work order delete, anon public request RPC execute, and service_role public request RPC execute.

2026-05-13 hosted debug after Supabase grants and Lee correction:

- Ran static checks: `node --check app.js` and `node --check supabase-config.js` passed.
- Verified `index.html` still points to `styles.css?v=request-flow-clean-1` and `app.js?v=request-flow-clean-auth-3`.
- Hosted app loaded at `https://loufish727.github.io/MaintainOps/?qa_bust=post-supabase-lee-debug-20260513` with Taylor Metal Products and no MaintainOps console errors.
- Main navigation smoke passed: My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings.
- Manager/admin location switching passed across Salem, Auburn, and back to Salem without loading hangs.
- Verified Lee Gaede's corrected work order `Hydralic Leak` appears in Salem, OR search results with equipment `New thalmann`.
- Verified Auburn, WA search for `Hydralic Leak` showed zero result cards; the only prior match was the search input value itself.
- Verified `New thalmann` appears while Salem, OR is selected.
- Created Quick Fix `QA post grants quick fix 20260513-grants-lee` in Salem, OR; Work Order Detail opened.
- Saved Quick Update on that work order with status In Progress, due date `2026-05-20`, and resolution `Post grants quick update 20260513-grants-lee`.
- Added comment `Post grants debug comment 20260513-grants-lee`; comment persisted in the comments panel.
- Submitted internal request `QA post grants request 20260513-grants-lee` in Salem, OR; it appeared in Active requests.
- Converted that request to a work order; Work Order Detail opened in Salem, OR.
- Browser automation note: clearing the global search input required actual Ctrl+A/Backspace key events; direct fill did not clear the controlled value in that run.
- Local HTTP server startup failed in this desktop shell, so hosted GitHub Pages was used for the app debug pass. This is acceptable for this pass because the changes were live Supabase grants/data, not local JavaScript behavior.

2026-05-13 full hosted debug:

- Ran a broader full debug pass on GitHub Pages using fresh hosted cache busts including `full-debug-20260513-1`, `full-debug-clean-20260513-2`, and `full-debug-fresh-tab-20260513`.
- Static checks passed again: `node --check app.js` and `node --check supabase-config.js`.
- Cache tags remained `styles.css?v=request-flow-clean-1` and `app.js?v=request-flow-clean-auth-3`.
- Startup passed: signed-in hosted app loaded Taylor Metal Products with Salem, OR selected and no loading hang.
- Main navigation passed cleanly after clearing a persisted global search result state: My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings.
- Location switching passed across Salem, OR, Riverside, CA, Spokane, WA, Auburn, WA, and back to Salem, OR.
- Created Quick Fix `QA full debug quick fix 20260513-full-debug`; Work Order Detail opened in Salem.
- Saved Quick Update on that work order with resolution `Full debug resolution 20260513-full-debug`, due date `2026-05-21`, and status In Progress.
- Added comment `Full debug comment 20260513-full-debug`; comment persisted after reopening the comments panel.
- Opened an existing part from `[data-open-part]` and verified Use and Restock controls in Part Detail.
- Created equipment `QA full debug equipment 20260513-full-debug` with ID `QA-EQ-20260513-full-debug`; it appeared in Equipment.
- Created procedure `QA full debug procedure 20260513-full-debug` and step `QA full debug step 20260513-full-debug`.
- PM creation first pass was not durable because the form cleared but the title was not visible/searchable. Retried with `QA full debug PM 20260513-full-debug-pm2`, selecting the new equipment and procedure explicitly; PM appeared in the list and Generate Work opened Work Order Detail.
- Submitted internal request `QA full debug request 20260513-full-debug`; it appeared in Active requests and converted to Work Order Detail.
- Submitted app issue report `QA full debug app report 20260513-full-debug`; report form closed without a loading hang.
- Team role surface passed: Technician, Manager, Admin present; Member absent; Mobile tech visible; Lee Gaede present as a Technician.
- Public Salem QR form loaded anonymously from `?request=PJIpdPESjj6fl_x2UwQNjSs3`, showed Taylor Metal Products / Salem, OR, and submitted `QA full debug public request 20260513-full-debug` with Request Sent.
- Reopened manager app after public QR testing replaced the manager tab; Salem Requests showed `QA full debug public request 20260513-full-debug` in Active requests.
- Final console check found no MaintainOps errors. Browser log noise was from Supabase dashboard/PostHog/ConfigCat tabs, not the hosted MaintainOps app.
- Protocol note: if global search persists across reloads, clicking a search result clears `maintainops.searchQuery` through the app's own handler and returns to a normal section view. Direct automation fill may not clear the controlled search input reliably.

2026-05-07 process test:

- Ran the debug process against the live local app with fresh cache bust `debug-process-test-1778191792707`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Startup passed for Taylor Metal Products with no browser console errors.
- Main navigation smoke passed; the process found a false-negative where `Settings` opens the `Company Settings` heading, so `docs/DEBUG_PROCESS.md` now notes that nav labels and headings can differ.
- Location switching passed for Salem, Riverside, Spokane, and back to Salem.
- Stale-detail checks passed for Work Order Detail to Requests, Equipment Detail to PM, and Part Detail to Equipment.
- The first stale-detail automation attempt used a broad `article` selector that hit hidden DOM; `docs/DEBUG_PROCESS.md` now requires visible, section-scoped selectors and known QA records.
- Created Quick Fix `QA process test 1778191897000 quick fix`; verified it appeared in Salem Work Orders.
- Submitted internal request `QA process test 1778191897000 request`; verified it appeared in Salem Requests.
- Submitted public QR request `QA process public request 1778191936240`; verified the public form showed `Request Sent` and the request appeared in Riverside Requests.
- Updated `docs/DEBUG_PROCESS.md` and `docs/FEATURE_CHANGE_PROCESS.md` to require durable write verification from lists/details rather than relying only on immediate post-click screen text.

2026-05-07 process repeat:

- Re-ran the debug process after the first process test to make sure the process itself was not missing failures.
- Found a real internal request submit bug: the document-level submit listener passed `document` as `event.currentTarget`, so the request save path could read the wrong object instead of the submitted form.
- Fixed internal request submit to use `event.target` and removed the temporary click-submit workaround so the normal form submit path owns request creation.
- Bumped the app script cache tag to `app.js?v=request-submit-form-target-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Fresh local verification used `request-submit-form-target-1778192864000`.
- Main navigation passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings / Company Settings.
- Manager location switching passed for Salem, OR, Riverside, CA, Spokane, WA, and back to Salem, OR.
- Submitted internal request `QA request native submit 1778192839053`; verified it appeared with no request-title error and no app console errors.
- Created Quick Fix `QA process final 1778192963192 quick fix`; verified it opened as Work Order Detail.
- Verified stale detail clearing from Work Order Detail to Requests, Equipment Detail to PM, and Part Detail to Equipment.
- Submitted internal request `QA process final 1778192963192 request`; verified it appeared under Requests.
- Created part `QA process final 1778193011833 part`; verified through part search, opened Part Detail, used one, restocked one, and confirmed the detail panel cleared when navigating to Equipment.
- Submitted public QR request `QA public process 1778193085730`; verified anonymous `Request Sent` and confirmed it appeared in manager Requests.
- The repeat run also improved the process docs: automation must scope visible desktop/mobile duplicate controls, Quick Fix smoke should use the actual Quick Fix fields, and Parts smoke should use `[data-open-part]` plus Part Detail inventory controls.
- No app console errors were observed. One Statsig/browser-use network message from the automation tooling appeared outside the app and was not treated as a MaintainOps console error.

2026-05-07 clean process finish:

- Re-ran the tightened process with fresh local cache bust `debug-process-clean-1778193196466`.
- Static checks still passed and `index.html` still points to `app.js?v=request-submit-form-target-1`.
- Startup, navigation, and manager location switching passed again.
- Created Quick Fix `QA clean process 1778193200167 quick fix`; verified Work Order Detail opened and stale detail cleared when navigating to Requests.
- Submitted internal request `QA clean process 1778193200167 request`; verified it appeared without the title-required error.
- Created part `QA clean process 1778193200167 part`; Add Part opened the new Part Detail, then Use and Restock both worked and stale detail cleared when navigating to Equipment.
- Submitted public QR request `QA clean public 1778193266182`; anonymous submit showed `Request Sent` and the manager Requests screen showed the request.
- Final corrected pass did not uncover a new app issue. The only remaining refinement was documenting that Add Part can verify by opening Part Detail immediately after save.
- No MaintainOps console errors were observed.

2026-05-07 full debug after technician assignment guardrails:

- Ran the full debug process with fresh local cache bust `full-debug-1778196110830`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Confirmed cache tags: `styles.css?v=request-photos-1` and `app.js?v=tech-assignment-guardrails-1`.
- Startup passed for Taylor Metal Products with no MaintainOps console errors.
- Main navigation and manager location switching had already passed in this full-debug run before the write-path sweep: My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, Settings, and all five locations.
- Created Quick Fix `QA full debug quick fix 1778196210920`; saved Quick Update to In Progress with due date `2026-05-20`; added comment `Full debug comment 1778196110830`.
- Created part `QA full debug part 1778196110830`; opened Part Detail; verified Use reduced stock from 5 to 4 and Restock raised it to 6.
- Created equipment `QA full debug equipment 1778196110830`; opened Equipment Detail; saved it as `QA full debug equipment 1778196110830 saved` with Watch status.
- Submitted internal request `QA full debug request 1778196110830`; converted it to a Work Order Detail.
- Created procedure `QA full debug procedure 1778196110830`; added required checklist step `QA full debug required step 1778196110830`.
- Created PM schedule `QA full debug PM retry 1778196110830`; generated a preventive work order from it.
- Submitted app issue report `QA full debug app report 1778196110830`.
- Submitted anonymous Spokane QR request `QA full debug public request retry 1778196110830`; public form showed `Request Sent`, then manager app was reopened and the request was visible in Spokane Requests.
- Team role UI showed only Technician, Manager, Admin; Member was absent from the role guide, invite role selector, and editable role selectors. Mobile tech setting was visible.
- No MaintainOps console errors were observed. Browser-use Statsig telemetry warnings were ignored.
- Protocol improvements from this pass: open collapsed Comments before automating `#comment-form`; verify PM title fill before submit and verify refreshed DOM after PM saves; reopen manager app after anonymous QR testing if the in-app browser replaces the manager tab.
- Still needs live technician-account QA to prove forbidden assignment paths and mobile-tech location lock under a true technician session.

2026-05-08 request flow cleanup:

- Cleaned up the Requests screen so converted requests no longer sit mixed into the default active request queue.
- Requests now default to an Active filter showing only submitted, unconverted requests for the active location.
- Added request filters: Active, Converted, All. Converted requests are still available intentionally, but no longer clutter the working request queue.
- Work Orders request gauge/queue now stays focused on Active requests and notes that converted requests are kept out of that queue.
- Converted request cards are visually quieter and show `Converted to work order` instead of conversion actions.
- Mobile request cards were tightened with a stable main content column and cleaner converted-state styling.
- Bumped cache tags to `styles.css?v=request-flow-clean-1` and `app.js?v=request-flow-clean-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Public QR request smoke passed through local server with `QA request flow public 1778270000000`; public form loaded for Spokane, WA and showed `Request Sent` with no MaintainOps console errors.
- Authenticated full debug could not be completed in the browser automation session because direct `file://` navigation was blocked and the local test server opened a separate origin without the existing signed-in session. Needs signed-in local file refresh verification from the user's current browser session.
- Retried against the user's current signed-in `file://` tab after request. Browser automation still reported the local file URL as blocked by policy before DOM inspection or clicks. Static checks and cache-tag verification still passed.
- After Node approval, localhost browser smoke was retried in a new tab. App loaded to the login screen on `http://127.0.0.1:4182`, proving the changed files load without a startup error on a browser-safe origin.
- Public QR request smoke passed again with `QA request flow retry 177827`; form loaded and showed `Request Sent` with no MaintainOps console errors.
- Added login resilience for local browser QA: normal Supabase password sign-in still runs first, and a timed-out password login retries through the Supabase auth token endpoint before setting the session.
- Added a safe `maintenance_requests` read fallback without joined relations so Requests can still load when relationship metadata is unavailable in a test origin.
- Authenticated localhost QA then loaded Taylor Metal Products on `http://127.0.0.1:4182` with no MaintainOps console errors.
- Verified Requests no longer shows the setup-needed message on localhost.
- Verified Active / Converted / All filters on authenticated localhost. Active showed submitted unconverted requests only; Converted showed converted history only.
- Full navigation smoke passed after the cleanup: My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Company Settings.
- Manager location switching passed across all five configured locations using the visible location selector.
- Created Quick Fix `QA auth full quick fix 177827-authfull-b`, saved Quick Update, and added comment `Auth full comment 177827-authfull-b`.
- Verified existing part `QA full debug part 1778196110830` could still be opened, used, and restocked. Browser automation could not type into numeric inputs reliably, so the new-part path was not counted as an app failure in this pass.
- Created or verified equipment detail save on `QA auth full equipment 177827-authfull-d saved`.
- Created procedure `QA auth full procedure 177827-authfull-d` and step `QA auth full step 177827-authfull-d`.
- Created PM `QA auth full PM 177827-authfull-d` and generated a preventive work order.
- Submitted app issue report `QA auth full app report 177827-authfull-d`.
- The debug pass found one cleanup wrinkle: if an internal request was submitted while the user was viewing Converted, the save succeeded but the new active request was not immediately visible until Active was clicked.
- Fixed that by returning Requests to Active page 1 after an internal request submit. Bumped `index.html` to `app.js?v=request-flow-clean-auth-3`.
- Verified the fix by submitting `QA request active reset 177827-active-reset` while viewing Converted. The app returned to Active, showed the new request, and did not show converted cards in Active.
- Converted `QA request active reset 177827-active-reset` to a work order. Work Order Detail opened, then Requests Active no longer showed that converted request; Converted showed it with `Converted to work order` and no conversion buttons.
- Static checks passed after the final fix: `node --check app.js` and `node --check supabase-config.js`.
- No MaintainOps console errors were observed in the final request, navigation, and location checks.
- Protocol improvements from this pass: request cleanup checks now require submit-from-any-filter verification, Active-vs-Converted action verification, and visible scoping for duplicate desktop/mobile location selectors.

2026-05-08 full debug rerun after request cleanup:

- Re-ran the debug protocol on `http://127.0.0.1:4182/index.html?qa_bust=full-debug-rerun-177827`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Confirmed cache tags: `styles.css?v=request-flow-clean-1` and `app.js?v=request-flow-clean-auth-3`.
- Startup passed for Taylor Metal Products with no MaintainOps console errors.
- Main navigation passed: My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Company Settings.
- Manager location switching passed across Auburn, Riverside, Sacramento, Salem, and Spokane using the visible location selector.
- Created Quick Fix `QA debug rerun quick fix 177827-rerun`; Work Order Detail opened.
- Saved Quick Update on that work order with `Debug rerun quick update 177827-rerun`.
- Added comment `Debug rerun comment 177827-rerun`.
- Request cleanup path passed again: submitted `QA debug rerun request 177827-rerun` while viewing Converted, verified it returned to Active, then converted it to a work order. Active no longer showed it; Converted showed it with no conversion action.
- Opened an existing part detail and verified Use and Restock controls still work.
- Created equipment `QA debug rerun equipment 177827-rerun`, opened Equipment Detail, and saved it as `QA debug rerun equipment 177827-rerun saved`.
- Created procedure `QA debug rerun procedure 177827-rerun` and added step `QA debug rerun step 177827-rerun`.
- Created PM schedule `QA debug rerun PM 177827-rerun` using the newly saved equipment and generated a preventive work order from it.
- Submitted app issue report `QA debug rerun app report 177827-rerun`.
- Submitted anonymous Spokane QR request `QA debug rerun public request 177827-rerun`; public form showed Request Sent and manager Requests showed the request after reopening the manager app.
- Team role UI still shows Technician, Manager, Admin; Member is absent. Mobile tech remains visible.
- No MaintainOps console errors were observed in the final pass.
- No new app bug was found. Protocol improvements from this pass: Quick Fix submit is `Log Quick Fix`, PM creation must fill equipment and due date before submit, and public QR verification should look for company/location text rather than a generic heading.

Current next QA sequence:

1. Manager account:
   - Confirm topbar location switcher is unlocked.
   - Switch Salem, Riverside, Spokane.
   - Confirm work orders/equipment/parts are scoped to selected location.

2. Technician with Mobile tech off:
   - Confirm topbar location switcher is visible but disabled.
   - Confirm helper text says to enable Mobile tech in Team.
   - Confirm Quick Fix lands in current/default location.

3. Technician enables Mobile tech:
   - Go to Team.
   - Check Mobile tech.
   - Save My Settings.
   - Confirm location dropdown unlocks.
   - Switch location.
   - Create Quick Fix.
   - Confirm it lands in selected location.

4. Technician disables Mobile tech:
   - Confirm location dropdown locks again.
   - Confirm existing work remains intact.

## Known Browser Notes

- Firefox had login/session issues during earlier testing.
- Edge worked when Firefox stalled on membership load.
- Hard refresh/cache-busting often needed due local `file://` testing.

## Request Photo Debug Protocol Pass - 2026-05-07

Token refs:

- `1778194529477` initial full protocol pass
- `1778194725490` Quick Fix re-test after fix
- `1778194798152` request photo subset
- `1778194843081` public QR request verification

Result:

- Debug protocol was run after adding QR/internal request photos.
- The protocol caught a real regression: Quick Fix failed with `sourceRequest is not defined`.
- Root cause was the request-photo conversion note logic referencing a request variable inside Quick Fix save without defining it in that function.
- Fixed by resolving `sourceRequest` inside `createQuickFix()` before building the work order description.

Verified after fix:

- `node --check app.js` passed.
- `node --check supabase-config.js` passed.
- Quick Fix opened, saved `QA qf fixed 1778194725490`, and Work Order Detail showed the created work order.
- Internal request form still has exactly one optional photo input.
- Internal request without a photo saved as `QA protocol internal request 1778194798152`.
- Previously uploaded request photo `logo.png` still displayed on request cards with thumbnails.
- Public request form from QR token still has exactly one optional photo input.
- Public request without a photo submitted as `QA protocol public request 1778194843081`.
- Manager-side verification found the public request after switching/searching in the QR link's location, Auburn, WA.
- No MaintainOps console errors were observed. Browser-use Statsig warnings were ignored as tool telemetry noise.

Still manual:

- Real browser file-picker selection should be tested on desktop and mobile because automation verified storage with `logo.png`, but did not physically click a user file picker.

## Daily QA Pass - 2026-05-18

Token:

- `20260518-0738`

Verified in this sandbox run:

- Static checks: `node --check app.js` and `node --check supabase-config.js` passed.
- Local cache tag present in `index.html`: `app.js?v=cancel-team-invite-2`.

Not verified (sandbox limitation: no outbound network / no in-app browser automation tools available here):

- Hosted GitHub Pages with a fresh cache-bust (`?qa_bust=20260518-0738`).
- Startup + main navigation smoke, location persistence, request baselines.
- Public QR request smoke.
- Internal request + convert smoke.
- Quick Fix create/open/update/comment/delete smoke.
- Post-run cleanup via app delete paths and final console error scan.

Records created/deleted:

- Created: none
- Deleted: none

Next action:

- Run the full live UI pass on a machine with browser + network using:
  - Hosted: `https://loufish727.github.io/MaintainOps/?qa_bust=20260518-0738`
  - Local: `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=20260518-0738`

## Manual QA Checklist

Run this before larger feature work:

Use `docs/FEATURE_CHANGE_PROCESS.md` for feature gates and `docs/DEBUG_PROCESS.md` as the repeatable debug workflow. This checklist remains the broad manual coverage list.

- Login/logout.
- Company load.
- Location switch.
- Quick Fix create.
- Quick Fix complete with no equipment.
- Quick Fix complete with equipment and safety check.
- Full work order create.
- Work order edit.
- Work order status changes.
- Work order assignment/reassignment.
- Add comment.
- Upload photo.
- Add/use/restock part.
- Attach part document.
- Delete part.
- Add/edit/delete equipment.
- PM schedule create.
- Generate work from PM.
- Procedure create.
- Add steps.
- Attach procedure to work order.
- Complete checklist.
- Message direct/company/location.
- Link message to work order.
- Search work, equipment, parts, people.
- CSV export.
- Role change.
- Invite flow.

## Remaining Risk Areas

- Large `app.js` is hard to reason about and easy to regress.
- Optional schema fallbacks still exist in parts of the codebase; these can hide missing migrations.
- No automated test harness yet.
- Public QR/request flow needs final hosted URL validation.
- Invite default location is not implemented yet.

## LFES Phase 5A Render Helper Extraction Planning - 2026-05-19

Scope:

- Planning/documentation only.
- No app code changed.
- No rendering behavior changed.
- No event binding changed.
- No workflow handlers moved.
- No mutations moved.
- No Supabase SQL/RLS/policies changed.

Created:

- `docs/LFES/audits/LFES_PHASE_5A_RENDER_HELPER_EXTRACTION_PLAN.md`

Updated:

- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`

TEST:
Phase 5A documentation-only pass

STEPS:
Review prior LFES Phase 3A-3F findings and inspect candidate render helper bodies in `app.js`.

EXPECTED:
Identify only truly low-risk display helpers for future extraction and keep workflow/render/mutation/event contracts blocked.

RESULT:
PASS

NOTES:
Safest first candidates are `renderMetric`, `renderInsight`, and `renderRoleGuide`. Phase 5A also found a false-safe coupling: `renderWorkloadStrip` calls `renderGaugeReadout`, and `renderGaugeReadout` emits gauge filter behavior tied to global `activeStatusFilter`.

TEST:
Runtime smoke test

STEPS:
Not run.

EXPECTED:
Not applicable because no app code changed.

RESULT:
NOT VERIFIED

NOTES:
Phase 5B implementation must run static checks and signed-in smoke verification.

## LFES Phase 5B Render Display-Helper Extraction - 2026-05-19

Scope:

- Created one small render helper module.
- Moved only:
  - `renderMetric`
  - `renderInsight`
  - `renderRoleGuide`
- Did not move:
  - `renderWorkloadStrip`
  - `renderGaugeReadout`
  - pagination helpers
  - `renderRelationshipChips`
  - request/photo/storage helpers
  - workflow renderers
  - event handlers
  - mutations
  - Supabase SQL/RLS/policies

Files changed:

- `src/render/displayHelpers.js`
- `app.js`
- `index.html`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`

TEST:
Static checks

STEPS:
Run `node --check` for `app.js`, `supabase-config.js`, all current `src/utils/*.js`, all current `src/services/*.js`, and `src/render/displayHelpers.js`.

EXPECTED:
All files parse successfully.

RESULT:
PASS

NOTES:
All static checks passed.

TEST:
Local script/resource check

STEPS:
Load `http://localhost:4294/index.html?qa_bust=lfes-phase-5b-display-2` through HTTP, inspect returned `index.html`, and request each local script referenced by the page.

EXPECTED:
`index.html` includes `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` before `app.js`, and all local scripts return HTTP 200.

RESULT:
PASS

NOTES:
Local HTTP returned 200 for `index.html`, all utils, all services, `src/render/displayHelpers.js`, and `app.js`.

TEST:
Signed-in browser smoke

STEPS:
Restore a signed-in browser session and verify Taylor Metal Products, Salem, dashboard metrics, Team role guide, Work Orders, Equipment, Parts, Team, and Settings.

EXPECTED:
App loads with no missing script errors, no visible app errors, Salem remains active, dashboard metrics render, and Team role guide renders.

RESULT:
NOT VERIFIED

NOTES:
This turn did not expose a direct browser automation tool, and the bundled Playwright package was unavailable in the local Node REPL. Runtime smoke still needs to be completed in the signed-in browser before packaging/upload.

## LFES Phase 5B Signed-In Smoke Checkpoint - 2026-05-19

Scope:

- Signed-in browser verification only.
- No code changed.
- No Phase 5C started.
- No package/upload performed.
- No additional render helpers moved.
- No `app.js` refactor.
- No Supabase SQL/RLS/policies changed.

Browser/session:

- Local URL tested: `http://localhost:4294/index.html?qa_bust=lfes-phase-5b-smoke-20260519`
- Signed-in session: QA technician Gmail session.
- Company loaded: Taylor Metal Products.
- Active location: Salem, OR selected.

TEST:
Session restore and company load

STEPS:
Open the local app with cache bust `lfes-phase-5b-smoke-20260519` and wait for signed-in workspace load.

EXPECTED:
Session restores, Taylor Metal Products loads, and no missing-script or visible app errors appear.

RESULT:
PASS

NOTES:
Initial reload briefly showed the normal loading workspace state, then Taylor Metal Products loaded successfully.

TEST:
Active location persistence

STEPS:
Inspect the workspace location selector after signed-in load.

EXPECTED:
Salem, OR remains selected and app does not fall back to Auburn.

RESULT:
PASS

NOTES:
The visible selector still lists all locations because they are options, but selected option inspection showed Salem, OR selected.

TEST:
Display helper script load

STEPS:
Inspect loaded scripts and page state.

EXPECTED:
`src/render/displayHelpers.js?v=lfes-phase-5b-display-1` loads before `app.js`, with no missing-script errors.

RESULT:
PASS

NOTES:
The display helper script was present. Console/resource logs showed no errors or warnings.

TEST:
Dashboard / work summary display

STEPS:
Open My Work and Work Orders.

EXPECTED:
Dashboard/work summary display renders normally with no visible app errors.

RESULT:
PASS

NOTES:
My Work and Work Orders loaded and showed the expected summary/gauge-style work counts. The moved `renderMetric` helper has no current active call sites in `app.js`, so this smoke verifies the surrounding display surface rather than direct metric-card output.

TEST:
Team role guide display

STEPS:
Open Team.

EXPECTED:
Role guide renders Technician, Manager, and Admin descriptions normally.

RESULT:
PASS

NOTES:
Team loaded and the role guide rendered normally from the extracted `renderRoleGuide` helper.

TEST:
Main workspace navigation

STEPS:
Open Work Orders, Equipment, Parts, and Team from the workspace navigation.

EXPECTED:
Each screen loads without missing scripts, visible app errors, or console errors.

RESULT:
PASS

NOTES:
Work Orders, Equipment, Parts, and Team loaded successfully.

TEST:
Settings navigation

STEPS:
Look for a visible Settings navigation button in the active signed-in session.

EXPECTED:
Settings loads if available to the signed-in role.

RESULT:
NOT VERIFIED

NOTES:
The current signed-in session is a technician-role session and no exact Settings button was visible. Settings should be smoke-tested from a manager/admin session before packaging if that surface is required for release verification.

TEST:
Console/resource errors

STEPS:
Inspect browser error/warning logs after navigation.

EXPECTED:
No missing script errors and no actionable MaintainOps console errors.

RESULT:
PASS

NOTES:
No browser error or warning logs were observed during the checkpoint.

Conclusion:

- Phase 5B extraction appears stable in the signed-in technician session.
- No display regressions were observed in Work Orders, Equipment, Parts, Team, or role guide rendering.
- Packaging/upload is approved only after a manager/admin Settings smoke is completed or explicitly waived.

## LFES Phase 5B Manager/Admin Settings Smoke Attempt - 2026-05-19

Scope:

- Manager/admin Settings smoke checkpoint only.
- No code changed.
- No Phase 5C started.
- No additional render helpers moved.
- No `app.js` refactor.
- No Supabase SQL/RLS/policies changed.
- No package/upload performed.

TEST:
Manager/admin session restore

STEPS:
Open the current in-app browser tab at `http://localhost:4294/index.html?qa_bust=lfes-phase-5b-smoke-20260519` and inspect signed-in state.

EXPECTED:
Manager/admin session restores, Taylor Metal Products loads, Salem, OR remains selected, and Settings is available.

RESULT:
NOT VERIFIED

NOTES:
The browser was on the `Welcome Back` login screen, not a signed-in manager/admin session. The display helper script `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` was present and no console warnings/errors were observed, but Settings/Team/dashboard runtime checks could not be performed while logged out.

TEST:
Manager/admin Settings screen

STEPS:
Not run because no manager/admin session was active.

EXPECTED:
Settings loads cleanly with no missing-script errors, visible app errors, or actionable console errors.

RESULT:
NOT VERIFIED

NOTES:
Requires signing in as a manager/admin user.

Conclusion:

- No defect was found.
- Manager/admin Settings smoke remains blocked by lack of an active manager/admin signed-in session.
- Packaging/upload remains blocked until this smoke passes or is explicitly waived.

## LFES Phase 5B Manager/Admin Settings Smoke Checkpoint - 2026-05-19

Scope:

- Manager/admin Settings smoke checkpoint only.
- No code changed.
- No Phase 5C started.
- No additional render helpers moved.
- No `app.js` refactor.
- No Supabase SQL/RLS/policies changed.
- No package/upload performed.

Browser/session:

- Local URL tested: `http://localhost:4294/index.html?qa_bust=lfes-phase-5b-smoke-20260519`
- Signed-in session: manager/admin-capable Taylor Metal Products session.
- Company loaded: Taylor Metal Products.
- Active location: Salem, OR selected.

TEST:
Manager/admin session restore and company load

STEPS:
Use the signed-in manager/admin browser session and inspect the loaded workspace.

EXPECTED:
Taylor Metal Products loads, Salem remains selected, manager/admin navigation is available, and `src/render/displayHelpers.js` is loaded.

RESULT:
PASS

NOTES:
Admin Setup and Settings were visible. `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` was loaded.

TEST:
Settings screen

STEPS:
Open Settings from the manager/admin workspace navigation.

EXPECTED:
Settings loads cleanly with no missing-script errors, visible app errors, or actionable console errors.

RESULT:
PASS

NOTES:
Company Settings loaded, Salem remained the active location, location QR settings rendered, and no visible error text appeared.

TEST:
Team role guide

STEPS:
Open Team from the manager/admin workspace navigation.

EXPECTED:
Team loads and the role guide renders Technician, Manager, and Admin descriptions normally.

RESULT:
PASS

NOTES:
Team loaded, invite/admin controls were visible, and the extracted `renderRoleGuide` output rendered correctly.

TEST:
Dashboard/work summary display

STEPS:
Open My Work and Work Orders from the manager/admin workspace navigation.

EXPECTED:
Work summary/dashboard surfaces render normally after the display helper extraction.

RESULT:
PASS

NOTES:
My Work and Work Orders loaded with work summary/gauge counts. `renderMetric` has no current active call sites in `app.js`, so no `.metric.dashboard-card` elements were expected or observed.

TEST:
Console/resource errors

STEPS:
Inspect browser error/warning logs after Settings, Team, My Work, and Work Orders navigation.

EXPECTED:
No missing script errors and no actionable MaintainOps console errors.

RESULT:
PASS

NOTES:
No browser warning/error logs were observed.

Conclusion:

- Phase 5B signed-in manager/admin smoke passed.
- No display regressions were observed.
- No behavior change was observed.
- Phase 5B packaging/upload is approved.
- Phase 5C remains blocked pending separate approval.

## LFES Phase 5B GitHub Pages Package/Upload/Live Verification - 2026-05-19

Scope:

- Packaged and uploaded stable LFES Phase 5B build.
- No Phase 5C started.
- No additional render helpers moved.
- No `app.js` refactor.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.

Package:

- Folder: `MaintainOps-github-clean-20260519-100842`
- Zip: `MaintainOps-github-clean-20260519-100842.zip`
- Package includes:
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

Deploy:

- Repository: `loufish727/MaintainOps`
- Branch: `main`
- Commit: `3439f56`
- Message: `Deploy LFES phase 5B display helpers`

TEST:
Static checks before package/deploy

STEPS:
Run `node --check` for `app.js`, `supabase-config.js`, all current `src/utils/*.js`, all current `src/services/*.js`, and `src/render/displayHelpers.js`.

EXPECTED:
All files parse successfully.

RESULT:
PASS

NOTES:
All static checks passed before packaging and again in the temp deploy clone.

TEST:
Package contents

STEPS:
Run `tools/create-github-upload.ps1`, then inspect the package folder.

EXPECTED:
Clean package includes `src/render/displayHelpers.js`, all current utils/services, and updated `index.html` cache tags.

RESULT:
PASS

NOTES:
Package included the required files. Packaged `index.html` references `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` before `app.js?v=password-recovery-1`.

TEST:
Live script availability

STEPS:
Open `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-5b-live-20260519-100842` and request key script URLs.

EXPECTED:
GitHub Pages serves updated `index.html`, `src/render/displayHelpers.js`, `app.js`, utils, and services with HTTP 200.

RESULT:
PASS

NOTES:
GitHub Pages initially served the prior index, then updated after polling. `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` and `app.js?v=password-recovery-1` returned HTTP 200.

TEST:
Live signed-in session restore

STEPS:
Open the live GitHub Pages URL with cache bust and wait for the workspace.

EXPECTED:
Session restores, Taylor Metal Products loads, and Salem, OR remains active.

RESULT:
PASS

NOTES:
Manager/admin-capable live session restored. Taylor Metal Products loaded and Salem, OR remained selected.

TEST:
Live Settings, Team, dashboard/work summary, Work Orders, Equipment, and Parts

STEPS:
Open Settings, Team, My Work, Work Orders, Equipment, and Parts from the live app.

EXPECTED:
Each screen loads cleanly, Team role guide renders correctly, work summary/dashboard surfaces render, and no visible app errors appear.

RESULT:
PASS

NOTES:
Settings, Team, My Work, Work Orders, Equipment, and Parts loaded. Team role guide rendered. `renderMetric` still has no active call sites in `app.js`, so no `.metric.dashboard-card` elements were expected or observed.

TEST:
Live console/resource errors

STEPS:
Inspect browser warning/error logs after live navigation.

EXPECTED:
No missing-script errors and no actionable MaintainOps console errors.

RESULT:
PASS

NOTES:
No browser warning/error logs were observed.

Conclusion:

- LFES Phase 5B is deployed to GitHub Pages and live-verified.
- No display regressions were observed.
- No behavior change was observed beyond the intended helper extraction.
- Phase 5C remains blocked pending separate approval.

## LFES Phase 5C Readiness Decision - 2026-05-19

Scope:

- Planning/decision only.
- No code changed.
- No render helpers moved.
- No `app.js` refactor.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.

TEST:
Phase 5C readiness review

STEPS:
Review Phase 5A render-helper extraction plan, Phase 5B smoke results, Phase 4B technician guardrail status, parts transaction gap, QR public request validation status, and remaining render/event/state contracts.

EXPECTED:
Decide whether to continue display-helper extraction or pause for higher-value operational blockers.

RESULT:
PASS

NOTES:
Decision is to pause further display-helper extraction. Phase 5B proved the process works, but the next helper candidates are more coupled than the first three. Technician DB-layer assignment denial, live public QR request validation, and parts inventory transaction risk are higher-value next targets during live testing.

TEST:
Runtime smoke

STEPS:
Not run.

EXPECTED:
Not applicable because no code changed.

RESULT:
NOT VERIFIED

NOTES:
No runtime verification was needed for this documentation-only decision.

Conclusion:

- Another tiny display-helper extraction is technically possible but not approved now.
- Next recommended phase is operational smoke hardening, starting with technician assignment DB-layer guardrail proof.
- Phase 5C implementation, Phase 5D, and further code extraction remain blocked pending separate approval.
## LFES Phase 6A Operational Smoke Hardening - 2026-05-19

Scope:

- Live operational smoke hardening only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No rendering/event-binding changes.
- No Supabase SQL/RLS/policy changes.
- Disposable QA records used token: `20260519-6A-1779211250092`.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check src/**/*.js`: PASS

TEST:
Live signed-in session restore and global navigation

STEPS:
Open the live GitHub Pages app, confirm the signed-in manager/admin-capable session, then open Work Orders, Equipment, Parts, Team, and Settings.

EXPECTED:
Taylor Metal Products loads, Salem, OR remains active, all required scripts load, and no visible app errors appear.

RESULT:
PASS

NOTES:
Taylor Metal Products loaded with Salem, OR selected. Work Orders, Equipment, Parts, Team, and Settings loaded cleanly. Browser warning/error logs were empty.

TEST:
Technician assignment guardrail proof

STEPS:
Use the dedicated QA technician account session through the Supabase authenticated API boundary. Create disposable work order `QA Phase6A Tech Guardrail 20260519-6A-1779211250092` in Salem, OR. Attempt self-claim, assign another user, clear assignment, and vendor-style assignment.

EXPECTED:
Technician can claim unassigned work for self, but cannot assign another user, clear assignment, or vendor-assign. Enforcement must be DB/RLS/trigger-backed where possible, not only hidden in UI.

RESULT:
PASS

NOTES:
Self-claim succeeded. Assigning another user, clearing assignment, and vendor-style assignment were blocked with Supabase/Postgres error `P0001`: `Technicians can only claim unassigned work for themselves.` This proves DB-trigger enforcement for the forbidden assignment paths. Previous technician UI smoke already showed assignment dropdowns/admin controls hidden for the QA technician session.

TEST:
Public QR request end-to-end validation

STEPS:
Open the Salem public request link, submit disposable request `QA Phase6A QR Smoke 20260519-6A-1779211250092` through the public request RPC, verify it appears in the signed-in manager/admin Requests screen, then delete it through the app.

EXPECTED:
Public QR link opens without login, request submits successfully, manager/admin view shows the request under Salem Active requests, and cleanup succeeds.

RESULT:
PASS

NOTES:
The public Salem request form loaded for Taylor Metal Products / Salem, OR. Submit returned request id `17aa6827-f9fb-4bde-b607-46dfda55dee2`. The manager/admin Requests screen showed the QA request under Active with Convert and Delete actions. The QA request was deleted through the app, and REST verification returned no remaining row.

TEST:
Parts use/restock/work-order-part smoke

STEPS:
Create disposable part `QA Phase6A Part Smoke 20260519-6A-1779211250092` in Salem with quantity 5. Restock to 8. Use inventory down to 6. Record 2 units on the disposable QA work order and update stock to 4. Verify quantity and work_order_parts record, then clean up QA records.

EXPECTED:
Part create, restock, inventory use, work-order-part recording, and final quantity behavior are visible and consistent. Cleanup removes QA part, QA work order, and relationship rows.

RESULT:
PASS WITH OPERATIONAL RISK NOTE

NOTES:
The part was created, restocked from 5 to 8, used from 8 to 6, recorded on the QA work order with quantity 2, and final quantity became 4. The app currently records work-order part usage as a separate `work_order_parts` insert plus a separate `parts.quantity_on_hand` update. This worked in the smoke path, but it is not atomic and remains a future parts transaction RPC planning item before heavy inventory use.

TEST:
QA cleanup verification

STEPS:
Delete the QA public request through the app. Delete the QA work order through the app, which removed the linked work_order_parts row. Delete the QA part through the app. Verify all QA rows are gone.

EXPECTED:
No Phase 6A QA request, work order, part, or work_order_parts row remains.

RESULT:
PASS

NOTES:
Final verification returned empty results for the QA work order, QA part, QA public request, and QA work_order_parts row.

Conclusion:

- Phase 6A increased live pilot confidence.
- Technician assignment guardrail is now DB-trigger proven for self-claim allowed and forbidden assign/clear/vendor paths blocked.
- Public Salem QR request flow passed end to end and cleanup passed.
- Parts use/restock/work-order-part path passed, with a real operational trust concern: inventory use and work-order part recording should eventually move to a transaction/RPC so stock and usage cannot diverge under partial failure or concurrency.
- Architecture extraction should remain paused until the parts transaction plan and any desired automated/manual smoke hardening are addressed or explicitly deferred.

## LFES Phase 6B Parts Transaction/RPC Planning - 2026-05-19

Scope:

- Planning/documentation only.
- No app code changed.
- No `app.js` refactor.
- No functions extracted.
- No workflow/business logic changed.
- No Supabase SQL/RLS/policies changed.
- No RPC created.

Created:

- `docs/LFES/audits/LFES_PHASE_6B_PARTS_TRANSACTION_RPC_PLAN.md`

TEST:
Current parts transaction-boundary review

STEPS:
Review current `app.js` parts paths: `createPart`, `restockPart`, `usePartFromInventory`, `recordPartUsed`, and `addPartUsageToWorkOrder`.

EXPECTED:
Document where operations are single-table, where operations use client-calculated quantities, and where multi-table atomicity is missing.

RESULT:
PASS

NOTES:
Part creation is a single-table insert. Restock and inventory Use update `parts.quantity_on_hand` using client-calculated values. Work-order part usage inserts `work_order_parts` and then separately updates `parts.quantity_on_hand`, which is the primary transaction gap.

TEST:
Runtime smoke

STEPS:
Not run.

EXPECTED:
Not applicable for planning-only phase.

RESULT:
NOT VERIFIED

NOTES:
No runtime smoke was needed because no code, SQL, RLS, or workflow behavior changed.

Conclusion:

- Recommended primary RPC: `public.record_work_order_part_usage`.
- The RPC should insert `work_order_parts` and decrement `parts.quantity_on_hand` atomically.
- The function should validate authenticated company membership, work-order company, part company, positive quantity, and preserve `private.is_company_member(company_id)` as the security boundary.
- First implementation should preserve current floor-at-zero behavior unless strict insufficient-stock blocking is separately approved.
- Implementation remains blocked until Phase 6C produces exact copy/paste SQL and receives approval.

## LFES Phase 6C Parts RPC SQL Proposal - 2026-05-19

Scope:

- SQL proposal/documentation only.
- No SQL was run.
- No app code changed.
- No `app.js` refactor.
- No functions extracted.
- No workflow/business logic changed.
- No Supabase RLS/policies changed.
- No RPC created in Supabase.

Created:

- `docs/LFES/audits/LFES_PHASE_6C_PARTS_RPC_SQL_PROPOSAL.md`

TEST:
SQL proposal against repo schema

STEPS:
Review the Phase 6B plan, `supabase/schema.sql`, current parts/work-order-parts policies, and current `app.js` part usage behavior.

EXPECTED:
Create exact copy/paste SQL proposal for `public.record_work_order_part_usage` that matches current schema and preserves current behavior unless an explicit future decision changes it.

RESULT:
PASS

NOTES:
The proposal uses `security definer`, pins `search_path`, validates `auth.uid()`, validates `private.is_company_member(p_company_id)`, validates work-order and part company membership, locks the part row, inserts `work_order_parts`, decrements `parts.quantity_on_hand`, and grants execute only to `authenticated`. It intentionally preserves floor-at-zero stock behavior because current app behavior uses `Math.max(0, quantity - used)`.

TEST:
Runtime smoke

STEPS:
Not run.

EXPECTED:
Not applicable because Phase 6C changed documentation only and did not run SQL or change app behavior.

RESULT:
NOT VERIFIED

NOTES:
Runtime smoke is required after a future approved SQL/app integration phase.

Conclusion:

- RPC proposal file is ready for review.
- No database or app behavior changed.
- Main open decision is whether future inventory should continue floor-at-zero behavior or reject insufficient stock.
- Phase 6D app integration remains blocked until the SQL proposal is approved/applied and verified.

## LFES Phase 6C-R Parts RPC SQL Review Checkpoint - 2026-05-19

Scope:

- SQL review/documentation only.
- No SQL was run.
- No app code changed.
- No `app.js` refactor.
- No Supabase RLS/policies changed.
- No workflow/business logic changed.

TEST:
Parts RPC SQL proposal review

STEPS:
Review `docs/LFES/audits/LFES_PHASE_6C_PARTS_RPC_SQL_PROPOSAL.md` against repo schema and current app behavior. Check function signature, insert columns, `parts.quantity_on_hand`, `work_orders.company_id`, `parts.company_id`, `private.is_company_member(p_company_id)`, pinned `search_path`, authenticated-only grant, no anon execute grant, floor-at-zero behavior, rollback SQL, verification SQL separation, and documented schema mismatch risks.

EXPECTED:
Return `APPROVED TO RUN` if the SQL is safe to apply as the next controlled database-only step, or `NEEDS REVISION` if a schema/security mismatch is found.

RESULT:
PASS - APPROVED TO RUN

NOTES:
No schema mismatch was found. `work_order_parts` supports `company_id`, `work_order_id`, `part_id`, `quantity_used`, and `unit_cost_at_use`. `parts.quantity_on_hand` exists as integer and supports the proposed decrement. `work_orders.company_id` and `parts.company_id` checks match the current multi-tenant model. `private.is_company_member(p_company_id)` is the expected tenant boundary. The function pins `search_path`, grants execute only to `authenticated`, does not grant to `anon`, includes rollback SQL, and keeps non-mutating verification SELECTs separate from later authenticated mutation smoke. Floor-at-zero behavior matches the current app's `Math.max(0, ...)` behavior.

TEST:
Runtime smoke

STEPS:
Not run.

EXPECTED:
Not applicable because Phase 6C-R changed documentation only and did not run SQL or app code.

RESULT:
NOT VERIFIED

NOTES:
Runtime smoke remains required after SQL is applied and after any future app integration phase.

Conclusion:

- Phase 6C SQL proposal is APPROVED TO RUN as a database-only step.
- Phase 6D app integration remains blocked until the approved SQL is applied and verification SELECTs pass.
- Open business decision remains: keep floor-at-zero behavior now, and decide later whether strict insufficient-stock blocking is needed.

## LFES Phase 6C SQL Apply Attempt - 2026-05-19

Scope:

- Attempted approved SQL apply/verification step.
- No SQL was run.
- No app code changed.
- No `app.js` refactor.
- No Supabase RLS/policies changed.
- No workflow/business logic changed.

TEST:
Supabase admin SQL execution channel check

STEPS:
Check the local workspace for a Supabase CLI, `psql`, database connection environment variables, Postgres/Supabase credentials, and available project config that could execute the approved `create function` SQL.

EXPECTED:
Find an admin-capable SQL path before running `public.record_work_order_part_usage`.

RESULT:
BLOCKED - NOT RUN

NOTES:
The workspace has only the public Supabase URL and publishable anon key in `supabase-config.js`. No `supabase` CLI command, no `psql` command, no `DATABASE_URL`, no Postgres connection string, and no Supabase admin/management token were available. The anon app key cannot create Postgres functions. Running through the app client would be the wrong security boundary and was not attempted.

TEST:
Verification SELECTs

STEPS:
Not run because the approved SQL was not applied.

EXPECTED:
Function exists, authenticated execute grant exists, anon execute grant is absent, `search_path` is pinned, expected columns exist, and RLS remains enabled.

RESULT:
NOT VERIFIED

NOTES:
Verification must be run after the approved SQL is applied through Supabase SQL Editor, Supabase CLI with an authenticated project session, or another admin-capable Postgres connection.

Conclusion:

- SQL apply is blocked by missing admin SQL access in this Codex workspace.
- `public.record_work_order_part_usage` is not confirmed created.
- Phase 6D app integration remains blocked.
- Next safe path is to run the approved SQL in the Supabase SQL Editor or provide an admin-capable database execution path, then run the verification SELECTs from the Phase 6C proposal.

## LFES Phase 6C SQL Apply and Verification - 2026-05-19

Scope:

- Supabase SQL apply/verification only.
- No app code changed.
- No `app.js` refactor.
- No functions extracted.
- No workflow/business logic changed.
- No Supabase RLS/policy changes beyond creating the approved function/grant.

Supabase context:

- Project: `lbphkzznvvumemdkqoay`.
- SQL editor query/tab: `Record work-order part usage`.
- SQL editor id: `5b7a680a-f33f-4770-94de-6a58716cced5`.

TEST:
Apply approved parts RPC SQL

STEPS:
Run the approved LFES Phase 6C SQL from `docs/LFES/audits/LFES_PHASE_6C_PARTS_RPC_SQL_PROPOSAL.md` in Supabase SQL Editor.

EXPECTED:
`public.record_work_order_part_usage` is created or replaced, execute is granted to `authenticated`, execute is not granted to `anon`, and PostgREST schema reload is notified.

RESULT:
PASS

NOTES:
The first browser-entry attempt failed with `ERROR: 42601: syntax error at or near "definerset"` because the browser SQL editor dropped whitespace between `security definer` and `set search_path`. The corrected compact version of the same approved SQL ran successfully and Supabase returned `Success. No rows returned`.

TEST:
Function privilege and search_path verification

STEPS:
Run non-mutating verification SELECTs for function existence, execute privileges, and function config.

EXPECTED:
RPC exists, authenticated can execute, anon cannot execute, and `search_path` is pinned.

RESULT:
PASS

NOTES:
Verification returned `rpc_exists=true`, `authenticated_can_execute=true`, `anon_can_execute=false`, `function_config=search_path=public, private, pg_temp`, and `search_path_pinned=true`.

TEST:
Schema column verification

STEPS:
Run non-mutating verification SELECTs for required `parts` and `work_order_parts` columns.

EXPECTED:
Required columns exist for the future app integration:
`parts.quantity_on_hand`, `parts.unit_cost`, `work_order_parts.quantity_used`, and `work_order_parts.unit_cost_at_use`.

RESULT:
PASS

NOTES:
Verification returned `expected_column_count=4` with all expected columns present.

TEST:
RLS verification

STEPS:
Run non-mutating verification SELECT for RLS status on `parts` and `work_order_parts`.

EXPECTED:
RLS remains enabled on both affected tables.

RESULT:
PASS

NOTES:
Verification returned `rls_enabled_count=2` and `rls_summary=parts:true, work_order_parts:true`.

TEST:
Runtime smoke

STEPS:
Not run.

EXPECTED:
Not applicable for this database-only step because no app code or app behavior changed.

RESULT:
NOT VERIFIED

NOTES:
Runtime smoke is required in Phase 6D after the app integration changes `addPartUsageToWorkOrder(...)` to call the RPC.

Conclusion:

- `public.record_work_order_part_usage` is created and verified.
- Authenticated users can execute it.
- Anonymous users cannot execute it.
- The function search path is pinned.
- Expected schema columns exist.
- RLS remains enabled on `parts` and `work_order_parts`.
- No app behavior changed in this phase.
- Phase 6D app integration is unblocked as a separate controlled phase.

## LFES Phase 6D Parts RPC App Integration - 2026-05-19

Scope:

- App integration only.
- Updated only `addPartUsageToWorkOrder(...)` in `app.js`.
- No `app.js` refactor beyond the smallest required integration.
- No Supabase SQL/RLS/policies changed.
- No restock, part creation/edit/delete, work order creation, rendering, event binding, or unrelated workflow changes.

Code change:

- Replaced the old two-step Work Order part usage mutation:
  - insert into `work_order_parts`;
  - update `parts.quantity_on_hand`.
- New path:
  - `supabaseClient.rpc("record_work_order_part_usage", { p_company_id, p_work_order_id, p_part_id, p_quantity })`.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check src/**/*.js`: PASS

TEST:
Parts usage RPC integration

STEPS:
- Open local build at `http://localhost:4299/index.html?qa_bust=lfes-phase-6d-rpc-20260519`.
- Sign in with the dedicated QA technician session.
- Confirm Taylor Metal Products loads.
- Confirm Salem, OR remains active.
- Open Parts.
- Create safe QA part:
  - `QA Phase6D RPC Part 20260519-6D-1779214388252`.
- Open Quick Fix.
- Create safe QA work order:
  - `QA Phase6D RPC Work 20260519-6D-1779214388252`.
- Open the created Work Order Detail.
- Open Parts Used.
- Select the QA part.
- Record part usage through the Work Order Detail Parts Used form.

EXPECTED:
- Usage and quantity update succeed together through the RPC.
- A `work_order_parts` usage row appears.
- `parts.quantity_on_hand` updates.
- No visible app errors.
- No missing script errors.
- Existing UI behavior remains unchanged.

RESULT:
PASS

NOTES:
The created QA part displayed `50 on hand`. Browser automation had trouble replacing the number input cleanly and submitted `21` as the usage quantity. The result still proved the RPC path: the Work Order Detail displayed the usage row `QA Phase6D RPC Part 20260519-6D-1779214388252 - 21 used - $420.00`, and the part selector refreshed to `29 on hand`. This confirms the app path reached `public.record_work_order_part_usage` and returned a consistent usage/stock result.

TEST:
Cleanup through normal app path

STEPS:
Look for normal delete controls in the signed-in QA technician session after the smoke test.

EXPECTED:
If safe app delete controls are available, delete the QA work order and QA part through the app.

RESULT:
NOT VERIFIED

NOTES:
Cleanup was not completed in this phase because the technician session did not expose delete controls for the QA work order or QA part. SQL cleanup was intentionally not used because this phase approved only app integration and smoke verification. Recommended next package/live verification under a manager/admin session should clean up `QA Phase6D RPC` records through app UI if safe.

Conclusion:

- Phase 6D app integration passed static checks and local browser smoke.
- The parts transaction catch from Phase 6A is closed for Work Order Detail work-order part usage.
- Restock and inventory-only Use still remain separate client-side updates and are not changed by this phase.
- Package/upload is approved as the next separate controlled step.

## LFES Phase 6D Package, Upload, and Live Verification - 2026-05-19

Scope:

- Package/upload/live verification only.
- No additional app logic changed beyond Phase 6D.
- No `app.js` refactor.
- No Supabase SQL/RLS/policies changed.
- No function extraction.
- No new phase started.

Package:

- Folder: `MaintainOps-github-clean-20260519-112043`
- Zip: `MaintainOps-github-clean-20260519-112043.zip`

Package contents verified:

- `app.js`
- `index.html`
- `supabase-config.js`
- `styles.css`
- `assets/`
- `src/utils/`
- `src/services/`
- `src/render/displayHelpers.js`

Cache tag:

- `index.html` loads `app.js?v=lfes-phase-6d-parts-rpc-1`.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check src/**/*.js`: PASS

Deployment:

- Repository: `loufish727/MaintainOps`
- Branch: `main`
- Commit: `9b3ba40`
- Commit message: `Deploy LFES Phase 6D parts RPC`
- Note: initial push was rejected because remote `main` had newer work. Deployment folder was rebased onto `origin/main`; one `index.html` cache-tag conflict was resolved in favor of `app.js?v=lfes-phase-6d-parts-rpc-1`; push then succeeded.

TEST:
GitHub Pages file serving

STEPS:
Check live `index.html` and required scripts/styles after deployment.

EXPECTED:
GitHub Pages serves the current Phase 6D cache tag and all required files return `200`.

RESULT:
PASS

NOTES:
Live `index.html` served `app.js?v=lfes-phase-6d-parts-rpc-1`. Required files returned `200`: `app.js`, `styles.css`, `supabase-config.js`, all `src/utils`, all `src/services`, and `src/render/displayHelpers.js`.

TEST:
Parts usage RPC live verification

STEPS:
- Open `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-6d-live-20260519-1121`.
- Confirm signed-in manager/admin-capable session restores.
- Confirm Taylor Metal Products loads.
- Confirm Salem, OR remains active.
- Open Work Orders.
- Open existing QA work order from Phase 6D local smoke:
  - `QA Phase6D RPC Work 20260519-6D-1779214388252`.
- Open Parts Used.
- Select existing QA part from Phase 6D local smoke:
  - `QA Phase6D RPC Part 20260519-6D-1779214388252`.
- Record one additional part usage through the deployed app.

EXPECTED:
- Parts usage succeeds through RPC.
- Usage and stock decrement occur together.
- Usage row appears.
- Quantity on hand changes as expected.
- No visible app errors.
- No missing script errors.

RESULT:
PASS

NOTES:
Before the live hosted test, the QA part showed `29 on hand` from the local Phase 6D smoke. After recording `1` additional usage through the deployed GitHub Pages app, the part selector showed `28 on hand`. Parts Used displayed both rows: `21 used - $420.00` and `1 used - $20.00`.

TEST:
Live navigation regression check

STEPS:
Open Work Orders, Equipment, Parts, Team, and Settings on the deployed app.

EXPECTED:
Each section loads, Taylor Metal Products remains visible, Salem, OR remains visible/active, and no visible error/missing-script text appears.

RESULT:
PASS

NOTES:
All five sections loaded cleanly with Taylor Metal Products and Salem, OR still visible. No visible app errors were observed.

TEST:
Live QA cleanup

STEPS:
- Delete `QA Phase6D RPC Work 20260519-6D-1779214388252` through the live admin Work Order Detail delete flow.
- Delete `QA Phase6D RPC Part 20260519-6D-1779214388252` through the live admin Part Detail delete flow.
- Reopen Parts.

EXPECTED:
QA work order and QA part are removed through normal app paths, and Parts no longer shows the QA part.

RESULT:
PASS

NOTES:
The QA work order was permanently deleted through the app, then the QA part was permanently deleted through the app. Parts returned to `0 shown`.

Conclusion:

- Phase 6D is fully closed.
- Intended behavior change is limited to transaction-safe work-order part usage through `public.record_work_order_part_usage`.
- Work Order Detail part usage passed on live GitHub Pages.
- Phase 6D QA records were cleaned up through the live admin UI.
- Restock and inventory-only Use remain unchanged and still use client-side updates.

## LFES Post-Phase-6D Live Sanity Checkpoint - 2026-05-19

Scope:

- Verification and next-direction decision only.
- No code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=post-phase-6d-sanity-20260519`

TEST:
Live app/session/location sanity

STEPS:
- Open live GitHub Pages app with fresh cache bust.
- Confirm signed-in session restores.
- Confirm Taylor Metal Products loads.
- Confirm Salem, OR remains active.

EXPECTED:
Live app loads signed in, company context is Taylor Metal Products, and active location remains Salem, OR.

RESULT:
PASS

NOTES:
The session restored into the authenticated app. Taylor Metal Products was visible. Salem, OR was selected as the active location.

TEST:
Core section navigation sanity

STEPS:
Open Work Orders, Equipment, Parts, Team, and Settings.

EXPECTED:
Each section loads without visible app errors, with Taylor Metal Products and Salem, OR still visible.

RESULT:
PASS

NOTES:
All five sections loaded. No visible `Could not`, missing script, failed load, or app error text was observed.

TEST:
Phase 6D QA cleanup persistence

STEPS:
Check the same core sections for visible `QA Phase6D RPC` records after the prior live cleanup.

EXPECTED:
No Phase 6D QA work order or QA part remains visible.

RESULT:
PASS

NOTES:
No visible `QA Phase6D RPC` records appeared in Work Orders, Equipment, Parts, Team, or Settings checks. Parts remained clean after prior cleanup.

TEST:
Hosted file/resource sanity

STEPS:
Request the live hosted `index.html`, app script, stylesheet, config, utility scripts, service scripts, and render helper script.

EXPECTED:
Each required hosted file returns HTTP 200 and the app script uses the Phase 6D cache tag.

RESULT:
PASS

NOTES:
`index.html`, `app.js?v=lfes-phase-6d-parts-rpc-1`, `styles.css`, `supabase-config.js`, all `src/utils`, all `src/services`, and `src/render/displayHelpers.js` returned `200`.

TEST:
Parts usage RPC path

STEPS:
Not re-mutated in this checkpoint.

EXPECTED:
No new QA data is created unless there is a reason to suspect the deployed RPC path regressed.

RESULT:
NOT RE-RUN

NOTES:
Phase 6D live verification already proved the deployed Work Order Detail RPC path and cleaned up the QA records. This sanity checkpoint found no visible regression, so no new part/work-order mutation was needed.

TEST:
Console/error visibility

STEPS:
Check visible app behavior and hosted resource status. Attempt to identify whether the browser automation surface exposes reliable post-load console collection.

EXPECTED:
No missing-script errors, visible app errors, or actionable console errors.

RESULT:
PASS WITH LIMITATION

NOTES:
No missing-script errors or visible app errors were observed, and required hosted files returned `200`. The current browser automation surface did not expose reliable post-load console log collection for this checkpoint, so console status is based on visible behavior and resource loading rather than a captured DevTools console transcript.

Next-direction decision:

- Recommended next phase: LFES smoke-test formalization/planning only.
- Rationale: Phase 6D is stable and closed. The highest current value is making repeated smoke tests more reproducible before more code movement or new inventory transaction work.
- Restock and inventory-only Use remain known future transaction-safety candidates, but should wait unless live operations require stronger guarantees there.
- Additional app architecture extraction remains blocked until the smoke process is easier to repeat and compare.

## LFES Phase 7A Smoke-Test Formalization - 2026-05-19

Scope:

- Documentation only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.
- No Playwright added.

Created:

- `docs/SMOKE_TESTS.md`

TEST:
Smoke-test playbook creation

STEPS:
Create a reusable manual smoke-test document using the required format:
`TEST`, `STEPS`, `EXPECTED`, `RESULT`, `NOTES`.

EXPECTED:
The document makes repeated manual smoke checks reproducible before automation or more code movement.

RESULT:
PASS

NOTES:
`docs/SMOKE_TESTS.md` now explains that these checks are manual smoke tests, not a full automated test suite. It also defines result meanings for PASS, FAIL, and NOT VERIFIED.

TEST:
Required smoke paths documented

STEPS:
Document smoke tests for session restore, location persistence, work orders, technician guardrails, public QR, parts, issue reports, Team/invites/roles, password recovery, and hosted resource checks.

EXPECTED:
Each smoke test includes required role/session, setup data, exact steps, expected observable result, cleanup steps, PASS/FAIL/NOT VERIFIED criteria, and future Playwright candidacy.

RESULT:
PASS

NOTES:
The documented tests are:
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

TEST:
Future automation roadmap

STEPS:
Add a section identifying when Playwright should be considered and which smoke tests should be automated first.

EXPECTED:
Automation is recommended only after manual paths, credentials, expected records, and cleanup rules are stable.

RESULT:
PASS

NOTES:
Highest-priority automation candidates are Quick Fix/work order lifecycle, location persistence, technician guardrail, public QR request, and parts transaction/RPC usage. Email delivery, OS file upload paths, invite email acceptance, mobile Safari/Add-to-Home-Screen checks, real employee account flows, and unsafe cleanup paths remain manual for now.

Conclusion:

- Phase 7A completed as documentation only.
- Manual smoke-test expectations are now centralized in `docs/SMOKE_TESTS.md`.
- Code movement remains blocked until a separate implementation phase is approved.
- Recommended next step is either running the manual smoke suite once end to end, or planning automation from this document without adding Playwright yet.

## LFES Phase 7B Live Manual Smoke-Suite Run - 2026-05-19

Scope:

- Live GitHub Pages manual smoke run using `docs/SMOKE_TESTS.md`.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.
- No Playwright added.

Live target:

- `https://loufish727.github.io/MaintainOps/?qa_bust=phase-7b-smoke-20260519`

QA token:

- `20260519-7B-1779225564137`

TEST:
Live signed-in session restore

STEPS:
Open the live GitHub Pages app with the Phase 7B cache-bust URL in an existing signed-in manager/admin-capable browser session.

EXPECTED:
The app restores the signed-in session, loads Taylor Metal Products, and shows no missing-script or visible app errors.

RESULT:
PASS

NOTES:
Taylor Metal Products loaded in the live app. No visible login/session failure appeared.

TEST:
Active location persistence

STEPS:
Load the live app and confirm the active location shown in the workspace location selector.

EXPECTED:
Salem, OR remains selected and the app does not fall back to Auburn, WA.

RESULT:
PASS

NOTES:
Salem, OR was selected on the live run and remained the active workspace during the smoke suite.

TEST:
Manager/admin work order create/open/delete

STEPS:
Create `QA Phase7B Work 20260519-7B-1779225564137` through Quick Fix, confirm Work Order Detail opens, then delete the work order through the normal delete confirmation path.

EXPECTED:
The work order appears, detail opens, deletion succeeds, and the deleted QA item disappears.

RESULT:
PASS

NOTES:
Quick Fix created the QA work order, Work Order Detail opened automatically, and the work order was deleted through `Delete Work Order` then `Permanently Delete`.

TEST:
Technician assignment guardrail

STEPS:
Attempt to run the smoke test using a real technician-role session without using manager/admin credentials.

EXPECTED:
A technician cannot assign work to another user, clear assignment, or vendor-assign where prohibited, and DB/RLS/trigger protection is proven where possible.

RESULT:
NOT VERIFIED

NOTES:
This Phase 7B run used the live manager/admin-capable session. An isolated technician session was not available without disrupting the active admin smoke run, so the technician guardrail was not faked with admin credentials. Prior dedicated technician verification remains the better evidence for this path; rerun this test separately when the QA technician session is available in an isolated browser/profile.

TEST:
Public QR request submit and manager visibility

STEPS:
Open the Salem public request link from the QR route, submit `QA Phase7B QR Request 20260519-7B-1779225564137`, return to the signed-in manager/admin Requests view, verify the request appears under Salem, then delete it through the normal request delete path.

EXPECTED:
The public request submits successfully, routes to Salem, appears in manager/admin Requests, and can be cleaned up safely.

RESULT:
PASS

NOTES:
The public intake showed Taylor Metal Products / Salem, OR, submitted successfully with `Request Sent`, appeared in the Salem Requests view as active/submitted, and was cleaned up through `Delete` then `Permanently Delete`.

TEST:
Parts restock/use/work-order part usage

STEPS:
Create `QA Phase7B Part 20260519-7B-1779225564137`, restock/use it from the Parts detail screen, create `QA Phase7B Part Work 20260519-7B-1779225564137`, record the QA part as used on Work Order Detail, verify the usage row and stock decrement, then delete the QA work order and QA part through normal app paths.

EXPECTED:
Parts load correctly, restock/use visibly changes quantity, Work Order Detail part usage succeeds through the RPC-backed path, `parts.quantity_on_hand` changes as expected, and cleanup completes.

RESULT:
PASS

NOTES:
The QA part was created and restock increased visible quantity from `100` to `101`. Inventory-only Use returned it to `100` after one retry in browser automation. Work Order Detail recorded `1 used - $30.00` and the part selector then showed `99 on hand`, proving the RPC-backed work-order usage path updated usage and stock together. The QA work order and QA part were both cleaned up through the app. Browser automation amplified typed number inputs during part creation (`10` became `100`, `2` became `20`, `3` became `30`), so numeric automation should use more controlled input handling in future automated tests.

TEST:
Issue report submit/update

STEPS:
Submit `QA Phase7B Issue Report 20260519-7B-1779225564137` through Report Issue, open Admin Setup / Reported App Issues, verify the report appears, change its status to resolved, and save.

EXPECTED:
The issue report submits, appears in the admin issue report list, and status update succeeds.

RESULT:
PASS

NOTES:
The issue report appeared in Admin Setup with status `open`, was changed to `resolved`, and saved successfully. No delete/cleanup path was used; the QA issue remains as a resolved historical app issue.

TEST:
Team/invite/role visibility

STEPS:
Open Team in the manager/admin session and verify Team settings, role guide, invite controls, pending invite area, and member role controls render.

EXPECTED:
Team and role visibility load without visible app errors. Invite acceptance is not performed unless intentionally approved.

RESULT:
PASS

NOTES:
Team loaded with Mobile tech setting, role guide, Invite Teammate form, Pending Invites, member role selectors, and Save Role controls visible. No invite email was sent and invite acceptance was not tested in this live smoke pass to avoid unnecessary live email side effects.

TEST:
Password reset/recovery flow

STEPS:
Determine whether password recovery can be safely tested in this live smoke run without retrieving an email recovery link or causing additional Supabase email rate-limit pressure.

EXPECTED:
Recovery email request and recovery-link password update can be verified only if link retrieval is available and rate limits are not a concern.

RESULT:
NOT VERIFIED

NOTES:
Not re-run in Phase 7B. Earlier testing hit Supabase email rate limits, and this run did not have a safe way to retrieve a fresh email recovery link without adding more email pressure. The in-app recovery handler exists from the prior fix, but email delivery and full recovery-link round trip should be verified separately when rate limits are clear.

TEST:
Required script/resource load check

STEPS:
Request the live hosted `index.html`, `app.js`, `styles.css`, `supabase-config.js`, all `src/utils`, all `src/services`, and `src/render/displayHelpers.js`.

EXPECTED:
Each required hosted file returns HTTP 200 and no missing-script errors appear in the app.

RESULT:
PASS

NOTES:
`index.html`, `app.js?v=lfes-phase-6d-parts-rpc-1`, `styles.css`, `supabase-config.js`, all utility scripts, all current service scripts, and `src/render/displayHelpers.js` returned `200`.

TEST:
Console/resource visibility

STEPS:
Check live browser warnings/errors after the smoke run.

EXPECTED:
No actionable MaintainOps console errors, missing-script errors, or visible app errors.

RESULT:
PASS

NOTES:
No actionable console errors were captured at the end of the run. During public request and issue report submit, transient `Statsig` rate-limit warnings appeared from the browser environment; they were not MaintainOps script errors and did not block the app workflow.

Conclusion:

- Phase 7B live manual smoke suite improved controlled pilot confidence for manager/admin, location persistence, public QR request intake, parts RPC usage, issue reports, Team visibility, and hosted resources.
- No app code defect was found during this run.
- Cleanup completed for the QA work orders, QA part, and QA public request.
- The QA issue report remains as a resolved historical issue record.
- Technician guardrail and password recovery email round trip remain NOT VERIFIED in this Phase 7B pass and should be tested as separate focused checks.
- Code movement remains blocked until the owner approves the next controlled phase.
- Recommended next phase: LFES Phase 7C Playwright/manual automation planning only, using `docs/SMOKE_TESTS.md` and this Phase 7B result as source evidence. Do not add Playwright yet unless separately approved.

## LFES Phase 7C Playwright Automation Planning - 2026-05-19

Scope:

- Planning/documentation only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.
- No Playwright dependency, config, or automated test file added.

Created:

- `docs/LFES/audits/LFES_PHASE_7C_PLAYWRIGHT_AUTOMATION_PLAN.md`

TEST:
Automation candidate review

STEPS:
Review `docs/SMOKE_TESTS.md`, the latest Phase 7B results in `docs/QA_LOG.md`, `docs/CURRENT_HANDOFF.md`, and `docs/NEXT_STEPS.md`.

EXPECTED:
The plan identifies the safest first automation target, what should remain manual, required account/session strategy, cleanup requirements, and implementation blockers.

RESULT:
PASS

NOTES:
The safest first automation target is the required script/resource load check. It requires no login, no database mutation, no cleanup, and directly protects against stale or incomplete GitHub Pages uploads.

TEST:
Automation boundary decision

STEPS:
Classify smoke tests as safe first automation, safe later, manual for now, or blocked.

EXPECTED:
High-risk paths remain blocked until role/session and cleanup strategies are explicit.

RESULT:
PASS

NOTES:
Recommended order is:
1. resource-load smoke,
2. app shell load,
3. signed-in session restore after safe session strategy,
4. active location persistence after session strategy,
5. manager/admin Quick Fix create/open/delete after cleanup rules are proven,
6. parts RPC usage after the work-order cleanup automation is reliable.

Blocked/manual for now:

- technician assignment guardrail until an isolated technician session strategy exists.
- password reset email/recovery-link flow because it depends on email delivery and recent rate limits.
- file/photo upload.
- invite email acceptance.
- real employee flows.
- broad live SQL cleanup.

TEST:
Secret/session safety review

STEPS:
Define how future automation should handle accounts, passwords, tokens, and browser sessions.

EXPECTED:
The plan avoids committed secrets and prevents admin/technician/public sessions from contaminating each other.

RESULT:
PASS

NOTES:
The plan recommends dedicated QA manager/admin and technician accounts, local environment variables or ignored local config for credentials, separate browser contexts/storage states for admin, technician, and anonymous public QR testing, and no committed passwords, tokens, recovery links, or storage-state files.

Conclusion:

- Phase 7C completed as planning only.
- Playwright implementation remains blocked until explicitly approved.
- Recommended next phase is LFES Phase 7D resource-load smoke implementation only.
- Phase 7D should not automate login, mutate data, change app behavior, or touch Supabase SQL/RLS.

## LFES Phase 7D Playwright Resource-Load Smoke Implementation - 2026-05-19

Scope:

- Added first automated smoke test only.
- Hosted resource loading only.
- No login automation.
- No records created.
- No Supabase data mutated.
- No app behavior changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No secrets or passwords added.

Created:

- `package.json`
- `package-lock.json`
- `playwright.config.js`
- `tests/smoke/resource-load.spec.js`

Modified:

- `.gitignore`
- `docs/SMOKE_TESTS.md`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`

TEST:
Playwright hosted resource-load smoke

STEPS:
Run:

```powershell
npm run test:smoke:resources
```

EXPECTED:
The test verifies live GitHub Pages serves `index.html` and all required local app files with HTTP 200, without login or data mutation.

RESULT:
PASS

NOTES:
The test ran `tests/smoke/resource-load.spec.js` and passed: `1 passed`. It verified `index.html`, `app.js`, `styles.css`, `supabase-config.js`, all current `src/utils`, all current `src/services`, and `src/render/displayHelpers.js`.

`node_modules/` was added to `.gitignore` so the installed Playwright dependency folder is not committed or uploaded.

TEST:
Static syntax checks

STEPS:
Run `node --check` for:

- `app.js`
- `supabase-config.js`
- `src/utils/constants.js`
- `src/utils/dom.js`
- `src/utils/formatting.js`
- `src/services/locationsService.js`
- `src/services/profilesService.js`
- `src/services/partsService.js`
- `src/services/assetsService.js`
- `src/services/workOrdersService.js`
- `src/services/companyService.js`
- `src/services/appIssueReportsService.js`
- `src/render/displayHelpers.js`
- `playwright.config.js`
- `tests/smoke/resource-load.spec.js`

EXPECTED:
All files parse successfully.

RESULT:
PASS

NOTES:
All `node --check` commands completed successfully.

Conclusion:

- Phase 7D completed the first safe automation slice.
- The automated test does not authenticate, create data, mutate Supabase, or require cleanup.
- App behavior did not change.
- Credentialed and mutating automation remains blocked.
- Recommended next phase is LFES Phase 7E planning only for session strategy and automation boundaries, or rerun Phase 7D after the next GitHub Pages upload.

## LFES Phase 7E Automation Readiness Decision Checkpoint - 2026-05-19

Scope:

- Planning/decision checkpoint only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No credentialed tests added.
- No mutating tests added.
- No GitHub Actions workflow added in this phase.

Reviewed:

- Phase 7D Playwright resource-load result.
- `docs/SMOKE_TESTS.md`.
- `docs/QA_LOG.md`.
- `docs/CURRENT_HANDOFF.md`.
- `docs/NEXT_STEPS.md`.
- Remaining known blockers from Phase 7B and Phase 7C.

TEST:
Automation readiness decision

STEPS:
Evaluate whether the next best move is GitHub Actions resource smoke, session strategy planning, architecture work, restock/inventory transaction planning, or pilot-readiness pause.

EXPECTED:
The next phase should increase confidence without introducing secrets, live data mutation, role/session confusion, or new workflow risk.

RESULT:
PASS

NOTES:
Recommended next phase is adding the existing non-credentialed resource-load smoke to GitHub Actions. This is safer and higher value than credentialed login automation because it needs no secrets, creates no records, and directly catches missing/stale GitHub Pages files.

Decision:

- GitHub Actions for the resource-load smoke: APPROVED TO PLAN / NEXT IMPLEMENTATION CANDIDATE.
- GitHub Actions can run `npm ci` and `npm run test:smoke:resources`.
- No secrets are required.
- No Supabase data is touched.
- No browser login is required.
- No cleanup is required.

What remains manual:

- technician assignment guardrail.
- password reset email/recovery-link round trip.
- file/photo upload.
- invite email acceptance.
- mobile Safari/Add-to-Home-Screen behavior.
- real employee flows.

What remains blocked:

- credentialed Playwright tests.
- mutating Playwright tests.
- public QR automation.
- work-order/parts mutation automation.
- technician automation.
- password reset automation.
- more `app.js` architecture extraction until the next controlled phase is approved.
- restock/inventory-only transaction changes unless live inventory accuracy becomes the highest priority.

Future login automation requirements:

- dedicated QA manager/admin account.
- dedicated QA technician account.
- secrets stored outside the repo.
- separate browser storage states for manager/admin, technician, and anonymous contexts.
- no committed passwords, tokens, recovery links, or storage-state files.
- explicit cleanup and failure-reporting rules before any data-mutating test runs.

Conclusion:

- The resource-load smoke adds immediate deployment protection now.
- It should move from local-only to GitHub Actions next because it is non-secret, non-mutating, and low risk.
- More automation should wait until role/session and cleanup strategy are explicit.
- Recommended next phase: LFES Phase 7F GitHub Actions resource-load smoke implementation only.

## LFES Phase 7F GitHub Actions Resource-Load Smoke Implementation - 2026-05-19

Scope:

- Added GitHub Actions workflow for the existing resource-load smoke test only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No credentialed tests added.
- No mutating tests added.
- No secrets added.
- No login automation added.
- No app records created, edited, or deleted.

Created:

- `.github/workflows/resource-load-smoke.yml`

Modified:

- `docs/SMOKE_TESTS.md`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`

Workflow:

- Name: `Resource Load Smoke`
- Triggers:
  - `push`
  - `pull_request`
  - `workflow_dispatch`
- Runner:
  - `ubuntu-latest`
- Steps:
  - `actions/checkout@v6`
  - `actions/setup-node@v6` with Node `24` and npm cache
  - `npm ci`
  - `npm run test:smoke:resources`

TEST:
GitHub Actions workflow shape

STEPS:
Create `.github/workflows/resource-load-smoke.yml` and run a lightweight workflow sanity check confirming required triggers and commands are present.

EXPECTED:
Workflow contains `push`, `pull_request`, `workflow_dispatch`, checkout, Node setup, `npm ci`, and `npm run test:smoke:resources`.

RESULT:
PASS

NOTES:
Workflow sanity check passed. The workflow requires no GitHub secrets and does not authenticate into MaintainOps.

TEST:
CI-equivalent dependency install

STEPS:
Run:

```powershell
npm ci
```

EXPECTED:
Dependencies install cleanly from `package-lock.json`.

RESULT:
PASS

NOTES:
`npm ci` completed successfully and found 0 vulnerabilities.

TEST:
Resource-load smoke after workflow addition

STEPS:
Run:

```powershell
npm run test:smoke:resources
```

EXPECTED:
Existing hosted resource-load smoke passes locally.

RESULT:
PASS

NOTES:
The Playwright resource smoke passed: `1 passed`.

Conclusion:

- Phase 7F is ready to push/upload.
- App behavior did not change.
- No secrets are required.
- No Supabase data is touched.
- Credentialed and mutating automation remains blocked.
- Recommended next step is to push/upload the workflow and let GitHub Actions run the resource-load smoke on the repository.

Push/upload verification:

- Commit pushed:
  - `b84fc41`
- Workflow run:
  - `Resource Load Smoke #4`
- Result:
  - PASS / Success
- Job:
  - `Hosted resource-load smoke`
- Duration:
  - 13s
- CI errors:
  - none observed.
- Notes:
  - Initial workflow runs passed but showed a GitHub Actions Node 20 deprecation warning for `actions/checkout@v4` / `actions/setup-node@v4`.
  - The workflow was updated to `actions/checkout@v6` and `actions/setup-node@v6` with Node `24`.
  - The current-runtime workflow run completed successfully.
  - Latest docs push also triggered `Resource Load Smoke #5` on commit `4b6185e`; it completed successfully with no CI errors observed.

## LFES Phase 8A Controlled Pilot Readiness Review - 2026-05-19

Scope:

- Readiness review only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No tests added.
- No workflow/business logic changed.

Created:

- `docs/LFES/audits/LFES_PHASE_8A_CONTROLLED_PILOT_READINESS.md`

Reviewed:

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`
- `docs/SMOKE_TESTS.md`
- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- latest GitHub Actions Resource Load Smoke result
- known blockers and risks

TEST:
Controlled pilot readiness decision

STEPS:
Evaluate proven workflows, unproven workflows, acceptable controlled-pilot risks, broader-rollout blockers, safe roles, safe pilot workflows, limited/manual workflows, data trust limits, support/rollback needs, and pre-pilot checklist.

EXPECTED:
Readiness decision clearly states whether MaintainOps can enter a controlled pilot and what must remain limited.

RESULT:
PASS

NOTES:
Decision is CONDITIONAL YES for a small supervised pilot. MaintainOps is not ready for broad rollout, unsupervised technician rollout, outside company onboarding, or fully authoritative inventory use.

Safe pilot scope:

- Taylor Metal Products only.
- Salem, OR as primary location.
- owner/admin and 1-2 manager/admin users.
- external QR request submitters for Salem QR.
- optional trusted technician only after focused technician verification.
- daily/manual smoke checks and GitHub Actions Resource Load Smoke review after pushes/uploads.

Blocked/limited scope:

- technician assignment guardrail until isolated technician verification is rerun.
- password reset email/recovery-link round trip until rate limits are clear.
- invite acceptance/default-location onboarding until focused test passes.
- photo/file upload until desktop and mobile upload paths are verified.
- parts inventory as authoritative accounting/purchasing truth.
- broad multi-company rollout.

Conclusion:

- Controlled pilot readiness: CONDITIONAL YES.
- Recommended next phase: LFES Phase 8B pilot launch checklist execution.
- Phase 8B should run the pre-pilot checklist and document PASS / FAIL / NOT VERIFIED without changing code or SQL unless a real defect is separately approved.

## LFES Phase 8B Controlled Pilot Launch Checklist Execution - 2026-05-19

Scope:

- Checklist execution and light live smoke only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No tests or workflows added.
- No workflow/business logic changed.
- No broader rollout started.

Created:

- `docs/LFES/audits/LFES_PHASE_8B_PILOT_LAUNCH_CHECKLIST.md`

Reviewed / verified:

- `docs/LFES/audits/LFES_PHASE_8A_CONTROLLED_PILOT_READINESS.md`
- `docs/SMOKE_TESTS.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`
- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- latest GitHub Actions Resource Load Smoke job page

Deployment evidence:

- Current live URL: `https://loufish727.github.io/MaintainOps/`
- Latest observed repo/deploy hash: `4b6185e`
- Workflow: `Resource Load Smoke`
- Run: `Document resource smoke workflow verification #5`
- Job: `Hosted resource-load smoke`
- Result: PASS / succeeded
- Observed job steps:
  - Checkout repository
  - Set up Node
  - Install dependencies
  - Run resource-load smoke

TEST:
Pilot readiness sanity

STEPS:
1. Opened live GitHub Pages app with `?qa_bust=phase8b-pilot-20260519`.
2. Confirmed signed-in session restored.
3. Confirmed Taylor Metal Products loaded.
4. Confirmed Salem, OR was selected.
5. Opened Work Orders.
6. Opened Equipment.
7. Opened Parts.
8. Opened Team.
9. Opened Settings.
10. Opened the Salem public QR request page with `?request=...&qa_bust=phase8b-pilot-qr-20260519`.
11. Checked visible app state and browser warning/error logs available through the current browser connection.

EXPECTED:
The app behaves normally, Salem remains active, Work Orders/Equipment/Parts/Team/Settings load, the public QR request page opens, no missing scripts appear, and no visible app errors appear.

RESULT:
PASS

NOTES:
The signed-in manager/admin-capable session restored. Taylor Metal Products loaded. Salem, OR was selected and Settings listed Salem as the active location. Work Orders, Equipment, Parts, Team, and Settings loaded without visible app errors. The Salem public QR page initially showed `Loading request form...`, then loaded the Taylor Metal Products / Salem, OR maintenance request form with photo and urgency fields. No warning/error logs were captured through the browser connection during this light smoke. No QA records were created or deleted in this phase.

Checklist category results:

- Deployment readiness: PASS.
- Session/auth readiness: PASS for known signed-in manager/admin session; LIMITED for password recovery and broader account lifecycle.
- Location persistence readiness: PASS for Salem active location.
- Work-order workflow readiness: PASS for supervised manager/admin pilot use.
- QR request readiness: PASS for controlled Salem QR form load and prior end-to-end submit/visibility evidence.
- Parts RPC readiness: PASS for Work Order Detail part usage; LIMITED for restock and inventory-only Use as authoritative inventory.
- Smoke-test readiness: PASS.
- Rollback/support readiness: PASS for controlled pilot support expectations.
- Known limitations acknowledged: PASS.
- Pilot monitoring expectations: PASS.

Conclusion:

- Pilot readiness result: PASS WITH SUPERVISED LIMITS.
- MaintainOps can begin the controlled Taylor Metal Products / Salem, OR pilot.
- This is not approval for broad rollout, unsupervised technician rollout, outside-company onboarding, or treating inventory as accounting-grade truth.

Known supervised-use limitations:

- Technician assignment guardrail still needs isolated technician verification rerun before broad technician participation.
- Password reset email/recovery-link round trip still needs verification when rate limits are clear.
- Invite acceptance/default-location onboarding still needs a real second-user pass.
- Photo/file upload still needs desktop and mobile verification.
- Parts inventory quantities should not be treated as final purchasing/accounting truth.
- Mobile Safari/Add-to-Home-Screen should remain under real-device observation.

Recommended next phase:

- LFES Phase 8C pilot day-one monitoring and issue triage.
- Phase 8C should run daily pilot smoke, review Report Issue entries, review QR request behavior, confirm no wrong-location work appeared, and avoid code/SQL changes unless a real defect is separately approved.

## LFES Phase 8C Pilot Day-One Monitoring And Issue Triage - 2026-05-19

Scope:

- Monitoring/triage/documentation only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No tests or workflows added.
- No workflow/business logic changed.
- No broader rollout started.

Created:

- `docs/LFES/audits/LFES_PHASE_8C_DAY_ONE_MONITORING.md`

Reviewed / verified:

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`
- `docs/LFES/audits/LFES_PHASE_8B_PILOT_LAUNCH_CHECKLIST.md`
- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- latest GitHub Actions Resource Load Smoke job page evidence from Phase 8B

Deployment/action evidence:

- Current live URL: `https://loufish727.github.io/MaintainOps/`
- Latest observed repo/deploy hash: `4b6185e`
- Workflow: `Resource Load Smoke`
- Run: `Document resource smoke workflow verification #5`
- Job: `Hosted resource-load smoke`
- Result: PASS / succeeded

TEST:
Day-one live pilot smoke

STEPS:
1. Opened live GitHub Pages app with `?qa_bust=phase8c-monitor-20260519`.
2. Waited for the signed-in workspace to load after `Checking team access...`.
3. Confirmed Taylor Metal Products loaded.
4. Confirmed Salem, OR was selected.
5. Opened Work Orders.
6. Opened Requests.
7. Opened Equipment.
8. Opened Parts.
9. Opened Team.
10. Opened Settings.
11. Opened Admin Setup.
12. Opened Report Issue modal and canceled without submitting.
13. Opened Salem public QR request page with `?request=...&qa_bust=phase8c-pilot-qr-20260519`.
14. Checked visible app state and warning/error logs available through the browser connection.

EXPECTED:
The app restores session, Salem remains active, pilot pages load, QR request page loads, Report Issue is visible, no missing scripts appear, and no visible app errors appear.

RESULT:
PASS

NOTES:
No pilot records were created, edited, or deleted during this monitoring pass. Work Orders, Requests, Equipment, Parts, Team, Settings, and Admin Setup loaded. Report Issue modal opened and was canceled. The Salem public QR route loaded the Taylor Metal Products / Salem, OR request form after the initial loading state. No warning/error logs were captured through the browser connection.

Monitoring check results:

- Daily live smoke run: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Session restore: PASS.
- Salem persistence: PASS.
- Work Orders load: PASS.
- Requests load: PASS.
- Equipment load: PASS.
- Parts load: PASS.
- Team load: PASS.
- Settings load: PASS.
- Admin Setup load: PASS.
- QR request path: PASS.
- Issue report visibility: PASS.
- Missing scripts/resources: PASS.
- Actionable console/browser errors: PASS.
- Parts RPC usage path: NOT RE-MUTATED in this non-mutating monitoring pass; Phase 6D / 7B evidence remains the current proof.

Pilot observations:

- No Critical, High, or Medium defects were found.
- Salem currently shows 2 active work orders:
  - `Test 1`
  - `Hydralic Leak`
- `Test 1` should be confirmed as intentional live/pilot data or leftover setup/test data before the active queue is treated as live-only.
- Requests showed `0 active`, `0 converted`, and `0 all`, which is a clean starting state for controlled QR intake.
- Parts Inventory showed `0 shown`, so no fresh parts RPC path was exercised without creating QA data.
- Admin Setup showed `15/16 ready`; not a pilot blocker in this pass, but should be reviewed before broader rollout if the missing readiness item matters operationally.

Triage severity:

- Critical: none.
- High: none.
- Medium: none.
- Low: none confirmed.
- Observation:
  - confirm `Test 1` work-order intent/status.
  - continue treating inventory as supervised/non-authoritative.
  - keep QR request routing under daily watch.

LFES real-world catch tracking:

- No new confirmed LFES real-world catch was added.
- Reason: this pass found observations and known limitations, but no confirmed new defect, hidden assumption failure, mutation-boundary failure, deployment issue, or operational continuity problem requiring a new catch entry.

Conclusion:

- Pilot confidence improved slightly.
- Controlled pilot can continue under Phase 8B supervised limits.
- Broad rollout remains blocked.

Recommended next phase:

- LFES Phase 8D pilot issue-review and limited cleanup decision.
- Confirm whether `Test 1` should remain in Salem active work.
- Continue daily smoke and issue triage.

## LFES Phase 8D Pilot Issue Review And Limited Cleanup Decision - 2026-05-19

Scope:

- Pilot-state review and cleanup decision only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No tests or workflows added.
- No workflow/business logic changed.
- No data cleanup performed.
- No broader rollout started.

Created:

- `docs/LFES/audits/LFES_PHASE_8D_PILOT_ISSUE_REVIEW.md`

Updated:

- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`

TEST:
Pilot operational cleanliness

STEPS:
1. Restored signed-in session in the live GitHub Pages app.
2. Verified Taylor Metal Products loaded.
3. Verified Salem, OR remained active.
4. Loaded Work Orders.
5. Opened `Test 1` Work Order Detail for read-only inspection.
6. Loaded Requests.
7. Loaded Parts.
8. Loaded Team.
9. Loaded Settings.
10. Loaded Admin Setup.
11. Verified public QR links were visible in Settings.
12. Inspected for stale QA/demo data.
13. Checked warning/error logs available through the browser connection.

EXPECTED:
No obvious stale QA pollution, no missing scripts, no visible app errors, and pilot queues understandable to pilot users.

RESULT:
PASS WITH CLEANUP CANDIDATES

NOTES:
The app loaded normally and Salem stayed active. No missing-script or visible app errors were observed. `Test 1` is visible in active Salem Work Orders and appears to be setup/demo or leftover test data. Admin Setup shows historical QA issue reports. These are cleanup candidates, not code defects.

Review results:

- Current active Work Orders:
  - `Hydralic Leak`: likely real operational work; keep unless owner says otherwise.
  - `Test 1`: likely setup/demo or leftover test data; cleanup candidate.
- `Test 1` detail read-only inspection:
  - status: New.
  - priority: Medium.
  - type: Corrective.
  - owner: Louie Fisher.
  - due date: unset.
  - equipment: `Test 1`.
  - detail text: `Test 1`.
  - safety: required.
  - classification: setup/demo or leftover test data unless owner confirms it is intentional live pilot work.
- Current active Requests:
  - 0 active.
  - 0 converted.
  - 0 all.
  - clean starting state for controlled QR intake.
- Current Parts:
  - 0 shown.
  - All Parts: 0.
  - Low Stock: 0.
  - no stale QA parts visible.
- Current Team/invite:
  - Team: 5 shown.
  - Pending Invites: 1.
  - pending invite `jeffrey.kinkaid@taylormetal.com`, sent 5/6/2026, role Manager, default location `first available`.
  - recommendation: review before pilot onboarding because it conflicts with Salem-first pilot expectations.
- Current pilot QR requests:
  - Requests queue is clean.
  - Salem QR link is active and showed last-used timestamp 5/19/2026, 2:27:24 PM.
  - other location links remain active, but pilot scope should stay Salem unless intentionally testing another location.
- Current Issue Reports:
  - Admin Setup shows `Reported App Issues 9 captured`.
  - visible reports are mostly historical QA/smoke records.
  - Report Issue works, but the admin issue queue is cluttered for pilot use.
- Admin Setup readiness:
  - 15/16 ready.
  - missing readiness item: `Admin delete protection`.
  - message: `Run step-next-admin-delete-work-orders.sql, then mark it applied`.
  - not a pilot blocker in this pass, but should be reconciled before broader rollout.

Cleanup decision:

- Cleanup recommended: YES, but not performed in Phase 8D.
- Cleanup should happen through normal app flows only, after explicit owner approval.

Recommended cleanup candidates:

1. `Test 1` active work order.
2. `Test 1` equipment, only after linked work/dependency checks allow it.
3. Pending invite `jeffrey.kinkaid@taylormetal.com`, if no longer intended.
4. Historical QA issue reports, if the app provides an approved admin cleanup/archive path or the owner approves a separate targeted cleanup plan.

Do not clean without owner confirmation:

- `Hydralic Leak`
- `New thalmann`
- any real pilot/live work
- any record with unclear ownership

LFES real-world catch tracking:

- Added catch: `2026-05-19 - Phase 8D - Pilot Queue Trust Risk From Stale Setup / QA Data`.
- Reason: stale setup/QA records in live pilot surfaces are an operational trust risk, even though the app is technically functioning.

Conclusion:

- Pilot cleanliness result: PASS WITH CLEANUP CANDIDATES.
- Pilot confidence: MIXED.
- Improved because app surfaces loaded cleanly, Requests and Parts are clean, QR links are visible, and no app errors appeared.
- Decreased slightly because active Work Orders and Admin Setup contain ambiguous setup/QA records that could confuse pilot users.

Recommended next phase:

- LFES Phase 8E approved pilot cleanup pass.
- Ask for explicit approval before deleting or canceling anything.
- Use normal app UI paths only unless a separate SQL fix is approved.
- Rerun light pilot smoke after cleanup.

## LFES Phase 8E Approved Pilot Cleanup Pass - 2026-05-19

Scope:

- Approved pilot cleanup/review only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.
- No broader rollout started.
- Normal app UI cleanup paths only.

Created:

- `docs/LFES/audits/LFES_PHASE_8E_APPROVED_PILOT_CLEANUP.md`

Updated:

- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`

Cleanup performed:

- `Test 1` work order deleted through normal app Work Order Detail delete path.
- `Test 1` equipment reviewed in Equipment Detail, showed no linked equipment, open work, completed history, PM schedules, or parts history, then deleted through normal app Equipment Detail delete path.

Reviewed only:

- Pending invite `jeffrey.kinkaid@taylormetal.com`:
  - role: Manager.
  - default location: `first available`.
  - no resend/cancel/change performed.
  - needs owner decision before pilot onboarding because Salem, OR is the supervised pilot default.
- Historical QA issue reports:
  - Admin Setup still shows 9 captured issue reports.
  - no delete/archive action performed.
- Admin delete protection warning:
  - Admin Setup remains 15/16 ready.
  - warning documented only; no SQL run and no setup state forced.

Left untouched:

- `Hydralic Leak`
- `New thalmann`
- real operational work
- parts/inventory
- QR request setup
- Supabase SQL/RLS
- app code/architecture

TEST:
Pilot cleanup smoke

STEPS:
1. Reloaded the live GitHub Pages app with `?qa_bust=phase8e-final-smoke-20260519`.
2. Verified signed-in session restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR remained active.
5. Loaded Work Orders.
6. Loaded Requests.
7. Loaded Equipment.
8. Loaded Parts.
9. Loaded Team.
10. Loaded Settings.
11. Loaded Admin Setup.
12. Opened the Salem public QR request form in a separate tab.
13. Checked browser warning/error logs available through the current browser connection.

EXPECTED:
Session restores, Salem remains active, Work Orders/Requests/Equipment/Parts/Team/Settings/Admin Setup load, public QR request page loads, no missing scripts appear, and no visible app errors appear.

RESULT:
PASS

NOTES:
Work Orders now shows only `Hydralic Leak` in the active Salem queue. Equipment now shows only `New thalmann`. Requests remain 0 active / 0 converted / 0 all. Parts remain 0 shown. The Salem public QR request page loaded to the Taylor Metal Products / Salem, OR request form. No browser warning/error logs were captured.

Conclusion:

- Pilot queue confidence improved.
- Active pilot Work Orders and Equipment no longer show the stale `Test 1` setup records.
- Remaining cleanup/decision items are the pending invite default location, historical QA issue reports, and Admin delete protection readiness warning.

Recommended next phase:

- LFES Phase 8F pilot follow-up / invite and admin issue-queue decision.

## LFES Phase 8F Pilot Follow-Up And Onboarding Review - 2026-05-19

Scope:

- Pilot follow-up and onboarding readiness review only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.
- No broader rollout started.

Created:

- `docs/LFES/audits/LFES_PHASE_8F_PILOT_FOLLOWUP.md`

Updated:

- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`

Review results:

- Pending invite `jeffrey.kinkaid@taylormetal.com` remains unchanged.
  - role: Manager.
  - default location: `first available`.
  - recommendation: do not use this invite for Salem-first pilot onboarding without correcting/reissuing it with Salem, OR as explicit default.
- Default-location behavior remains understandable but depends on the invite/member default and saved-location precedence.
  - Existing Taylor member default-location data was previously fixed to Salem, OR.
  - The old pending invite still carries the ambiguous `first available` value.
- Historical QA issue reports remain visible in Admin Setup.
  - Admin Setup still shows 9 captured issue reports.
  - recommendation: keep as engineering evidence for now, but consider a future Live / QA / Archived distinction or filter.
- Admin Setup remains 15/16 ready.
  - Admin delete protection warning documented only.
  - no SQL run and no setup state changed.

TEST:
Pilot follow-up sanity

STEPS:
1. Opened the live GitHub Pages app with `?qa_bust=phase8f-followup-20260519`.
2. Verified signed-in session restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR remained active.
5. Loaded Work Orders.
6. Loaded Equipment.
7. Loaded Parts.
8. Loaded Team.
9. Loaded Settings.
10. Loaded Admin Setup.
11. Loaded Requests.
12. Inspected invite/default-location visibility.
13. Inspected issue-report visibility.
14. Checked browser warning/error logs available through the current browser connection.

EXPECTED:
No visible app errors, no missing scripts, onboarding/default-location behavior is understandable enough to document, and pilot queues are understandable.

RESULT:
PASS

NOTES:
Work Orders remained clean after Phase 8E, showing `Hydralic Leak` and not `Test 1`. Equipment showed `New thalmann` and not `Test 1`. Requests remained clean with 0 active requests. Parts remained 0 shown. Team still showed the pending `jeffrey.kinkaid@taylormetal.com` Manager invite with `Default location: first available`. Admin Setup still showed 9 captured issue reports and the 15/16 Admin delete protection warning. No browser warning/error logs were captured.

Conclusion:

- Pilot follow-up result: PASS WITH ONBOARDING DECISIONS REMAINING.
- Controlled pilot can continue.
- More users should not be onboarded through the old `first available` invite without an explicit decision.

Recommended next phase:

- LFES Phase 8G onboarding action decision.

## LFES Phase 8G Onboarding Action Decision And Invite Correction - 2026-05-19

Scope:

- Approved onboarding action and verification only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.
- No broader rollout started.
- Existing operational work was not modified.

Created:

- `docs/LFES/audits/LFES_PHASE_8G_ONBOARDING_ACTION.md`

Updated:

- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`

Invite action taken:

- Reviewed old pending invite for `jeffrey.kinkaid@taylormetal.com`.
  - role: manager.
  - default location: `first available`.
  - sent: 2026-05-06, 4:17:24 PM.
- Canceled old invite through Team UI.
- Reissued invite through Team UI:
  - email: `jeffrey.kinkaid@taylormetal.com`.
  - role: Manager.
  - default location: Salem, OR.
  - sent: 2026-05-19, 4:05:43 PM.

TEST:
Invite/default-location onboarding

STEPS:
1. Reviewed pending invite state in Team.
2. Confirmed old invite had `Default location: first available`.
3. Canceled old invite through Team UI.
4. Reissued invite for `jeffrey.kinkaid@taylormetal.com`.
5. Selected Role: Manager.
6. Selected Default location: Salem, OR.
7. Created the invite through Team UI.
8. Verified the corrected pending invite is visible.
9. Loaded Work Orders.
10. Loaded Team.
11. Loaded Admin Setup.
12. Loaded Equipment.
13. Loaded Parts.
14. Loaded Requests.
15. Checked browser warning/error logs available through the current browser connection.

EXPECTED:
Onboarding/default-location behavior is explicit and understandable, Salem is the intended default for the invite, no visible app errors appear, no missing scripts appear, and no operational ambiguity remains on the pending invite.

RESULT:
PASS / ACCEPTANCE NOT VERIFIED

NOTES:
The pending invite now explicitly targets Salem, OR and Manager role. Actual invite acceptance, first login, and first-load default-location behavior were not completed because that requires the invitee or a controlled test recipient to accept/sign in. No visible app errors or browser warning/error logs were captured.

Additional smoke:

- Salem remained selected.
- Work Orders loaded and still showed `Hydralic Leak`, with `Test 1` absent.
- Equipment loaded and still showed `New thalmann`, with `Test 1` absent.
- Parts loaded with 0 shown.
- Requests loaded with 0 active.
- Team loaded with the corrected invite visible.
- Admin Setup loaded and still showed 15/16 ready.

Conclusion:

- Pilot confidence improved.
- The stale `first available` invite was removed.
- The active pending invite now matches the Salem-first pilot policy.
- Remaining onboarding verification: recipient acceptance and first-login Salem default behavior.

Recommended next phase:

- LFES Phase 8H invite acceptance / first-login verification.

## LFES Phase 8H Invite Acceptance And First Login Verification - 2026-05-19

Scope:

- Invite acceptance / first-login verification only.
- No app code changed.
- No `app.js` refactor.
- No helper/service extraction.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.
- No broader rollout started.

Created:

- `docs/LFES/audits/LFES_PHASE_8H_INVITE_ACCEPTANCE_VERIFICATION.md`

TEST:
Invite acceptance + first login

STEPS:
1. Opened the live GitHub Pages app in the current browser session.
2. Checked whether the current session represented the real invite recipient or approved QA recipient.
3. Verified the current live app session was already inside the established Taylor Metal Products workspace.
4. Observed Salem, OR selected in the location selector.
5. Observed owner/admin-style navigation such as Team, Admin Setup, and Settings.

EXPECTED:
Invite acceptance succeeds, the user joins Taylor Metal Products as Manager, Salem, OR becomes active on first login, the app does not fall back to Auburn, session restore works after login, Work Orders/Equipment/Parts/Team load, and no visible app errors or missing scripts appear.

RESULT:
NOT VERIFIED

NOTES:
The current signed-in session is not proof of invite acceptance because it was already in the established Taylor Metal Products workspace and did not represent the newly invited recipient. A real invite recipient or owner-approved QA recipient still needs to accept the corrected Manager + Salem, OR invite and sign in before this test can pass. No defect was found and no code/Supabase change was made.

Conclusion:

- Invite acceptance result: NOT VERIFIED.
- Role result: NOT VERIFIED.
- Salem first-login default result: NOT VERIFIED.
- Session persistence result for the invited account: NOT VERIFIED.
- Controlled pilot confidence is unchanged from Phase 8G.

Recommended next phase:

- Rerun LFES Phase 8H after Jeffrey or an owner-approved QA recipient accepts the invite and signs in.

## LFES Phase 9A App.js Subsystem Extraction Strategy - 2026-05-19

Scope:

- Planning and documentation only.
- No app code changed.
- No `app.js` refactor.
- No functions moved.
- No rendering/event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflow/business logic changed.

Created:

- `docs/LFES/audits/LFES_PHASE_9A_SUBSYSTEM_EXTRACTION_STRATEGY.md`

Updated:

- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`

Review result:

- Safest next coherent subsystem:
  - read-only work-order relationship display helpers.
- Recommended Phase 9B target file:
  - `src/render/relationshipDisplay.js`.
- Recommended helpers:
  - `renderActivityItem`
  - `renderRelationshipChips`
  - `relationshipChip`
  - `relationshipIcon`
- Estimated line reduction:
  - approximately 110-140 lines from `app.js`.

Why this target is safest:

- No forms.
- No mutation buttons.
- No delete controls.
- No storage upload controls.
- No public/auth boundary.
- No Supabase calls.
- No event-binding selectors.

Subsystems kept blocked or later:

- dashboard/gauges remain coupled to filters.
- issue reports remain coupled to submit/status mutation forms.
- Team remains coupled to role/default-location/invite onboarding.
- public QR remains a live anonymous boundary.
- parts/equipment display remains coupled to inventory, routing, detail, and delete workflows.
- notice/toast helpers are side-effectful and low line-reduction value.

TEST:
Phase 9A planning checkpoint

STEPS:
1. Reviewed LFES Phase 3A-3F architecture, event, smoke-test, state, render, and readiness maps.
2. Reviewed Phase 5A render-helper extraction plan.
3. Reviewed current smoke-test and QA context.
4. Scanned `app.js` function locations and coupling around candidate subsystems.
5. Created the Phase 9A subsystem strategy document.

EXPECTED:
No app behavior changes, no code movement, and a clear recommended next implementation scope.

RESULT:
PASS

NOTES:
This was documentation-only. Relationship display extraction is approved as the recommended next controlled implementation, but actual extraction has not started.

Recommended next phase:

- LFES Phase 9B read-only relationship display extraction only.

## LFES Phase 9B Relationship Display-Helper Extraction - 2026-05-19

Scope:

- Created one small render helper module.
- Moved only read-only relationship display helpers.
- Did not move work-order workflows.
- Did not move relationship mutation logic.
- Did not move comments/photos/parts/steps loaders.
- Did not move `renderWorkOrderDetail()`.
- Did not move event handlers.
- Did not change Supabase SQL/RLS/policies.
- Intended behavior to remain unchanged.

Created:

- `src/render/relationshipDisplay.js`

Modified:

- `app.js`
- `index.html`

Exact helpers moved:

- `renderActivityItem`
- `renderRelationshipChips`
- `relationshipChip`
- `relationshipIcon`

Implementation notes:

- `index.html` now loads `src/render/relationshipDisplay.js?v=lfes-phase-9b-relationship-1` before `app.js`.
- `app.js` uses `createRelationshipDisplayHelpers(...)` with explicit dependency getters/adapters.
- existing call sites continue to call `renderActivityItem(...)`, `renderRelationshipChips(...)`, and `relationshipIcon(...)`.
- `renderWorkOrderCard()` and `renderWorkOrderDetail()` remain in `app.js`.

App.js line count:

- before extraction: 10,704 lines.
- after extraction: 10,625 lines.
- reduction: 79 lines.

TEST:
Static Phase 9B checks

STEPS:
1. Ran `node --check app.js`.
2. Ran `node --check supabase-config.js`.
3. Ran `node --check` for all `src/utils` files.
4. Ran `node --check` for all `src/services` files.
5. Ran `node --check src/render/displayHelpers.js`.
6. Ran `node --check src/render/relationshipDisplay.js`.

EXPECTED:
All syntax checks pass.

RESULT:
PASS

NOTES:
No static errors were returned.

TEST:
Local resource and unauthenticated load smoke

STEPS:
1. Verified local `index.html` served HTTP 200.
2. Verified local `app.js` served HTTP 200.
3. Verified local `src/render/relationshipDisplay.js` served HTTP 200.
4. Opened the local app through `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`.
5. Observed the local app reached the login screen.
6. Checked browser warning/error logs available through the browser connection.

EXPECTED:
The local build serves required scripts and loads without missing-script errors or visible app errors.

RESULT:
PASS

NOTES:
The local origin did not have a restored signed-in session. The login screen loaded and no browser warning/error logs were captured.

TEST:
Signed-in relationship display smoke

STEPS:
1. Restore or complete sign-in on the local app.
2. Verify Salem, OR is active.
3. Load Work Orders.
4. Open `Hydralic Leak` detail if safe.
5. Verify relationship chips and activity items render normally.
6. Load Equipment, Parts, Team, and Settings.

EXPECTED:
Signed-in workspace loads, Work Orders load, work-order detail opens, relationship display remains intact, no missing-script errors appear, and no visible app errors appear.

RESULT:
NOT VERIFIED

NOTES:
The local origin did not have a restored session. Browser text entry failed in the current automation environment while attempting to sign in, so Codex could not complete the signed-in local smoke pass. No app defect was identified from this; it is a test-environment/session gap.

Conclusion:

- Relationship display extraction is implemented.
- Static checks passed.
- Local resource/load smoke passed.
- Signed-in local workflow smoke remains NOT VERIFIED.
- Package/upload is blocked pending signed-in local smoke.

Recommended next phase:

- LFES Phase 9B-S signed-in local smoke checkpoint.

## LFES Phase 9B-S Signed-In Local Smoke Checkpoint - 2026-05-20

Scope:

- Signed-in local smoke verification only.
- No app code changed.
- No packaging/upload.
- No Phase 9C started.
- No additional helper extraction.
- No `app.js` refactor.
- No Supabase SQL/RLS/policies changed.

TEST:
Phase 9B signed-in relationship display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`.
2. Confirmed the in-app browser was still at the login form.
3. Attempted to use the in-app browser for sign-in, but text entry remained blocked by the browser automation virtual clipboard/text-entry limitation.
4. Used Playwright Chromium against the same local URL to complete the signed-in smoke.
5. Signed in successfully.
6. Verified Taylor Metal Products loaded.
7. Verified Salem, OR was selected.
8. Opened Work Orders.
9. Opened `Hydralic Leak` detail.
10. Counted relationship display elements.
11. Opened Equipment.
12. Opened Parts.
13. Opened Team.
14. Attempted to verify Settings availability.
15. Reviewed console/resource output available through Playwright.

EXPECTED:
Signed-in workspace loads, Salem remains active, Work Orders load, `Hydralic Leak` detail opens, relationship chips and activity items render normally, Equipment/Parts/Team/Settings load, no missing-script errors appear, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS WITH SETTINGS NOT VERIFIED

NOTES:
Sign-in succeeded in Playwright Chromium. Taylor Metal Products loaded. Salem, OR was selected. Work Orders loaded. `Hydralic Leak` detail opened. Relationship chips rendered with 2 `.relationship-chip` elements. Activity/relationship detail items rendered with 10 matching relationship detail elements. Equipment, Parts, and Team loaded. Settings was not verified because the smoke account/session did not expose a Settings nav item. No visible app errors were found. No actionable console messages were captured. Playwright recorded aborted Supabase HEAD requests during rapid navigation; these were treated as non-actionable test-navigation aborts because the UI loaded successfully and no console errors appeared.

Conclusion:

- Relationship display extraction behavior: PASS.
- Work order detail smoke: PASS.
- Relationship chips/activity display: PASS.
- Equipment/Parts/Team smoke: PASS.
- Settings smoke: NOT VERIFIED.
- Behavior changed: no observed behavior change.
- Package/upload: blocked pending manager/admin Settings smoke.

Recommended next phase:

- LFES Phase 9B-M manager/admin Settings smoke checkpoint.

## LFES Phase 9B-M Manager/Admin Local Settings Smoke Checkpoint - 2026-05-20

Scope:

- Manager/admin Settings smoke verification only.
- No app code changed.
- No packaging/upload.
- No Phase 9C started.
- No additional helper extraction.
- No `app.js` refactor.
- No Supabase SQL/RLS/policies changed.

TEST:
Manager/admin local Settings smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`.
2. Inspected the current in-app browser session.
3. Checked whether a manager/admin-capable local session was already available.
4. Confirmed the local browser was still at the login form.

EXPECTED:
A manager/admin-capable session signs in or restores successfully, Taylor Metal Products loads, Salem remains active, Settings loads, Team loads, Work Orders load, `Hydralic Leak` detail opens, relationship chips/activity items render normally, and no visible app errors or actionable console errors appear.

RESULT:
NOT VERIFIED

NOTES:
No manager/admin-capable local session was available. The current local browser remained at the login form. The prior Playwright smoke account could verify Work Orders and relationship display, but did not expose Settings navigation, so it is not valid evidence for this manager/admin Settings checkpoint.

Conclusion:

- Settings smoke result: NOT VERIFIED.
- Relationship display result from Phase 9B-S remains PASS.
- Behavior changed: no observed or introduced behavior change.
- Package/upload: blocked pending manager/admin Settings smoke.

Recommended next phase:

- Rerun LFES Phase 9B-M after signing into the local app with a manager/admin-capable account.

## LFES Phase 9B-M Manager/Admin Local Settings Smoke Checkpoint - Rerun - 2026-05-20

Scope:

- Manager/admin Settings smoke verification only.
- No app code changed.
- No packaging/upload performed.
- No Phase 9C started.
- No additional helper extraction.
- No `app.js` refactor.
- No Supabase SQL/RLS/policies changed.

TEST:
Manager/admin local Settings smoke

STEPS:
1. Used the local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`.
2. Verified manager/admin-capable signed-in session was available.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Opened Settings.
6. Opened Team.
7. Opened Work Orders.
8. Opened `Hydralic Leak` detail.
9. Counted relationship display elements.
10. Opened Equipment.
11. Opened Parts.
12. Checked browser warning/error logs available through the browser connection.

EXPECTED:
A manager/admin-capable session signs in or restores successfully, Taylor Metal Products loads, Salem remains active, Settings loads, Team loads, Work Orders load, `Hydralic Leak` detail opens, relationship chips/activity items render normally, and no visible app errors or actionable console errors appear.

RESULT:
PASS

NOTES:
Taylor Metal Products loaded with Salem, OR selected. Settings loaded. Team loaded. Work Orders loaded and showed `Hydralic Leak`. `Hydralic Leak` detail opened. Relationship chips rendered with 2 `.relationship-chip` elements. Activity/relationship detail items rendered with 11 matching relationship detail elements. Equipment loaded. Parts loaded. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Settings smoke result: PASS.
- Work order detail smoke: PASS.
- Relationship display result: PASS.
- Display regressions: none observed.
- Behavior changed: no observed behavior change.
- Package/upload: approved for stable Phase 9B build.

Recommended next phase:

- Package/upload stable LFES Phase 9B build to GitHub Pages, then live verify.

## LFES Phase 9B-M Manager/Admin Local Settings Smoke Checkpoint - Confirmation Rerun - 2026-05-20

Scope:

- Manager/admin Settings smoke verification only after the user confirmed the local browser was signed in.
- No app code changed.
- No packaging/upload performed.
- No Phase 9C started.
- No additional helper extraction.
- No `app.js` refactor.
- No Supabase SQL/RLS/policies changed.

TEST:
Manager/admin local Settings and relationship detail smoke

STEPS:
1. Used the local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`.
2. Verified Taylor Metal Products was loaded in a signed-in manager/admin-capable session.
3. Verified Salem, OR remained active.
4. Opened Settings.
5. Opened Team.
6. Opened Work Orders.
7. Opened `Hydralic Leak` detail.
8. Verified relationship chips were present.
9. Opened the History section and verified activity/history entries rendered.
10. Opened Equipment.
11. Opened Parts.
12. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Manager/admin workspace loads, Salem remains active, Settings and Team load, Work Orders load, `Hydralic Leak` detail opens, relationship chips and activity/history items render normally, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Taylor Metal Products loaded with Salem, OR active. Settings, Team, Work Orders, Equipment, and Parts loaded. `Hydralic Leak` detail opened. Relationship chips rendered with 2 `.relationship-chip` elements. History rendered activity entries including assignment, data correction, update, status change, equipment-created, and created events. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Settings smoke result: PASS.
- Work order detail smoke: PASS.
- Relationship chip display: PASS.
- Activity/history display: PASS.
- Display regressions: none observed.
- Behavior changed: no observed behavior change.
- Package/upload: approved for stable Phase 9B build.

## LFES Phase 9B GitHub Pages Package/Upload and Live Verification - 2026-05-20

Scope:

- Packaged and uploaded LFES Phase 9B relationship display-helper extraction to GitHub Pages.
- Did not start Phase 9C.
- Did not move more helpers.
- Did not refactor `app.js`.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Package:

- Initial package: `MaintainOps-github-clean-20260520-063140`
- Corrected package after cache-tag fix: `MaintainOps-github-clean-20260520-063612`

Commits:

- Initial deploy commit: `35f21ed` (`Deploy LFES Phase 9B relationship display`)
- Corrected deploy commit: `209dce9` (`Fix Phase 9B cache tag`)

Static checks:

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
- `node --check src/render/relationshipDisplay.js`: PASS

Resource/package checks:

- Package included `src/render/relationshipDisplay.js`.
- Package included `src/render/displayHelpers.js`.
- Package included all `src/utils` files.
- Package included all current `src/services` files.
- Live `index.html` serves `src/render/relationshipDisplay.js?v=lfes-phase-9b-relationship-1`.
- Live `index.html` now serves `app.js?v=lfes-phase-9b-relationship-1`.
- Live `src/render/relationshipDisplay.js?v=lfes-phase-9b-relationship-1`: HTTP 200.
- Live `app.js?v=lfes-phase-9b-relationship-1`: HTTP 200.

TEST:
Phase 9B corrected live smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9b-live-cachefix-20260520-0640`.
2. Verified signed-in session restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR remained active.
5. Opened Work Orders.
6. Opened `Hydralic Leak` detail.
7. Opened History and verified activity/history entries rendered.
8. Opened Equipment.
9. Opened Parts.
10. Opened Team.
11. Opened Settings.
12. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live app restores session, Taylor Metal Products loads, Salem remains active, Work Orders load, `Hydralic Leak` detail opens, relationship chips and activity/history entries render, Equipment/Parts/Team/Settings load, no missing-script errors appear, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Live smoke passed after correcting the `app.js` cache tag from the older Phase 6D tag to `lfes-phase-9b-relationship-1`. `Hydralic Leak` detail rendered 2 relationship chips. History rendered assignment, data correction, update, status change, equipment-created, and work-order-created entries. No visible app errors were found. No browser warning/error logs were captured.

TEST:
GitHub Actions Resource Load Smoke

STEPS:
1. Checked GitHub Actions after push to `main`.
2. Verified latest Resource Load Smoke workflow for commit `209dce9aeee5f7c4bce3fd157e6f89b648199e20`.
3. Verified GitHub Pages deployment workflow for the same commit.

EXPECTED:
Resource Load Smoke completes successfully and Pages deployment completes successfully.

RESULT:
PASS

NOTES:
Resource Load Smoke run passed: `https://github.com/loufish727/MaintainOps/actions/runs/26166156956`. Pages build/deployment passed: `https://github.com/loufish727/MaintainOps/actions/runs/26166153561`.

Conclusion:

- Phase 9B package/upload: PASS.
- Live Phase 9B smoke: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Behavior changed: no observed behavior change beyond the intended relationship display-helper extraction.
- Phase 9B is fully closed.

## LFES Phase 9C App.js Cleanup Readiness Decision - 2026-05-20

Scope:

- Planning and documentation only.
- No app code changed.
- No `app.js` refactor performed.
- No functions moved.
- No Supabase SQL/RLS/policies changed.
- No workflows/business logic changed.

Evidence reviewed:

- Phase 9A subsystem extraction strategy.
- Phase 9B relationship display extraction and live verification result.
- Latest `QA_LOG.md`, `CURRENT_HANDOFF.md`, `NEXT_STEPS.md`.
- `APP_JS_MODULARIZATION_PLAN.md`.
- `LFES_REAL_WORLD_CATCHES.md`.
- Current `app.js` candidate render/helper clusters.

Created:

- `docs/LFES/audits/LFES_PHASE_9C_APP_JS_CLEANUP_READINESS.md`

Updated:

- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`

Candidate decision summary:

- Recommended next extraction target: dashboard / metrics display cluster.
- Suggested future file: `src/render/dashboardDisplay.js`.
- Suggested future helpers: `renderGaugeReadout`, `renderWorkOrderGaugeDashboard`, `renderWorkloadStrip`.
- Estimated line reduction: approximately 55-85 lines from `app.js`.
- Implementation approval: still blocked until explicitly approved.

Key risk notes:

- Dashboard/gauge helpers are display-oriented but emit `data-status-filter` and `data-section`, so they are behavior contracts.
- Issue report display is safe later but creates submit/status mutation contracts.
- Notice/toast helpers are low-value and side-effectful because `showNotice()` mutates global notice state and calls `renderWorkspace()` through a timer.
- Parts and equipment render helpers remain blocked because they emit inventory, document, edit, Quick Fix, routing, and delete workflow hooks.

Phase 9B real catch documented:

- `relationshipDisplay.js` deployed correctly, but `app.js` initially used a stale older cache tag.
- Fixed by updating `index.html` to `app.js?v=lfes-phase-9b-relationship-1`.
- New rule: every extracted script/app.js deploy must verify live helper script tags and live `app.js` cache tags.

TEST:
Phase 9C planning checkpoint

STEPS:
1. Reviewed Phase 9A and Phase 9B evidence.
2. Scanned `app.js` for candidate display/helper clusters.
3. Classified each candidate by coupling, event-contract risk, mutation risk, smoke requirements, and safety.
4. Documented the Phase 9B cache-tag catch.
5. Updated LFES planning, catch, QA, handoff, and next-step docs.

EXPECTED:
No app behavior changes. Next extraction candidate and blocked boundaries are documented.

RESULT:
PASS

NOTES:
No runtime smoke was required because Phase 9C was documentation-only and no app code changed.

Conclusion:

- Recommended next phase: LFES Phase 9D dashboard/metrics display-helper extraction only, if explicitly approved.
- Code extraction remains blocked until approval.

## LFES Phase 9D Dashboard Display-Helper Extraction - 2026-05-20

Scope:

- Created a small dashboard display module.
- Moved only the approved dashboard/metrics helpers.
- Did not move workflow renderers.
- Did not move event handlers.
- Did not move mutations.
- Did not move `renderWorkspace()`.
- Did not move `bindWorkspaceEvents()`.
- Did not move parts/equipment detail renderers.
- Did not move issue report renderers.
- Did not move public QR renderers.
- Did not move Team/invite/default-location renderers.
- Did not change Supabase SQL/RLS/policies.

Created:

- `src/render/dashboardDisplay.js`

Modified:

- `app.js`
- `index.html`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`

Helpers moved:

- `renderGaugeReadout`
- `renderWorkOrderGaugeDashboard`
- `renderWorkloadStrip`

Implementation notes:

- `index.html` now loads `src/render/dashboardDisplay.js?v=lfes-phase-9d-dashboard-1` before `app.js`.
- `index.html` now loads `app.js?v=lfes-phase-9d-dashboard-1`.
- `app.js` wires dashboard helpers through `createDashboardDisplayHelpers(...)` with explicit dependency getters/adapters.
- Gauge behavior hooks were preserved:
  - `data-status-filter`
  - `data-section`
  - selected gauge class behavior
  - overdue alert marker behavior

App.js line count:

- before Phase 9D: 10,625 lines.
- after Phase 9D: 10,561 lines.
- reduction: 64 lines.

Static checks:

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
- `node --check src/render/relationshipDisplay.js`: PASS
- `node --check src/render/dashboardDisplay.js`: PASS

Resource checks:

- Local `index.html` served HTTP 200.
- Local `app.js?v=lfes-phase-9d-dashboard-1` served HTTP 200.
- Local `src/render/dashboardDisplay.js?v=lfes-phase-9d-dashboard-1` served HTTP 200.
- Local `src/render/relationshipDisplay.js?v=lfes-phase-9b-relationship-1` served HTTP 200.
- Local `index.html` contains the Phase 9D dashboard helper script tag and the Phase 9D `app.js` cache tag.

TEST:
Phase 9D signed-in local dashboard smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9d-dashboard-20260520`.
2. Verified signed-in workspace was available.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR remained active.
5. Verified dashboard/workload metrics rendered.
6. Verified gauge filter click still responded.
7. Opened Work Orders.
8. Opened Equipment.
9. Opened Parts.
10. Opened Team.
11. Opened Settings.
12. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace restores, dashboard/gauge/workload metrics render normally, gauge filter behavior still responds, core sections load, no missing-script errors appear, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Taylor Metal Products loaded with Salem, OR active. My Work showed 7 gauge readouts and 1 workload strip. Work Orders showed 8 gauge readouts. Gauge filter click left the selected gauge state intact. Work Orders, Equipment, Parts, Team, and Settings loaded. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9D extraction: PASS locally.
- Behavior changed: no observed behavior change.
- Package/upload: approved only after explicit user request.

## LFES Phase 9D GitHub Pages Package/Upload and Live Verification - 2026-05-20

Scope:

- Packaged and uploaded LFES Phase 9D dashboard display-helper extraction to GitHub Pages.
- Did not start Phase 9E.
- Did not move more helpers.
- Did not refactor `app.js`.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Package:

- `MaintainOps-github-clean-20260520-065324`

Commit:

- `0fc2083` (`Deploy LFES Phase 9D dashboard display`)

Static checks:

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
- `node --check src/render/relationshipDisplay.js`: PASS
- `node --check src/render/dashboardDisplay.js`: PASS

Resource/package checks:

- Package included `src/render/dashboardDisplay.js`.
- Package included `src/render/relationshipDisplay.js`.
- Package included `src/render/displayHelpers.js`.
- Package included all `src/utils` files.
- Package included all current `src/services` files.
- Live `index.html` serves `src/render/dashboardDisplay.js?v=lfes-phase-9d-dashboard-1`.
- Live `index.html` serves `app.js?v=lfes-phase-9d-dashboard-1`.
- Live `src/render/dashboardDisplay.js?v=lfes-phase-9d-dashboard-1`: HTTP 200.
- Live `app.js?v=lfes-phase-9d-dashboard-1`: HTTP 200.

TEST:
Phase 9D live dashboard smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9d-live-20260520-0656`.
2. Verified signed-in session restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR remained active.
5. Opened My Work.
6. Verified dashboard/workload metrics rendered.
7. Clicked the Active Work gauge and verified the gauge filter still responded.
8. Opened Work Orders.
9. Opened Equipment.
10. Opened Parts.
11. Opened Team.
12. Opened Settings.
13. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live app restores session, Taylor Metal Products loads, Salem remains active, dashboard/gauge/workload metrics render, gauge filter responds, Work Orders/Equipment/Parts/Team/Settings load, no missing-script errors appear, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Initial live smoke ran before the workspace settled and did not find navigation buttons. DOM inspection showed the page completed and the expected Phase 9D script tags were present. Rerunning against the settled workspace passed. My Work rendered 7 gauge readouts and 1 workload strip. Work Orders rendered 8 gauge readouts. The Active Work gauge click responded and selected gauge state remained present. No visible app errors were found. No browser warning/error logs were captured.

TEST:
GitHub Actions Resource Load Smoke

STEPS:
1. Checked GitHub Actions after push to `main`.
2. Verified latest Resource Load Smoke workflow for commit `0fc2083b80c33dd762ae5efcb089d33dca709764`.
3. Verified GitHub Pages deployment workflow for the same commit.

EXPECTED:
Resource Load Smoke completes successfully and Pages deployment completes successfully.

RESULT:
PASS

NOTES:
Resource Load Smoke run passed: `https://github.com/loufish727/MaintainOps/actions/runs/26167151368`. Pages build/deployment passed: `https://github.com/loufish727/MaintainOps/actions/runs/26167148730`.

Conclusion:

- Phase 9D package/upload: PASS.
- Live Phase 9D smoke: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Behavior changed: no observed behavior change beyond the intended dashboard display-helper extraction.
- Phase 9D is fully closed.

## LFES Phase 9E Batched Low-Risk Display Helper Cleanup - 2026-05-20

Scope:

- Classified the next display-helper cleanup candidates before implementation.
- Implemented only the clearly low-risk static icon display helper batch.
- Did not move notice/status/toast helpers because they mutate notice state and call `renderWorkspace()`.
- Did not move admin readiness helpers because `renderSetupItem()` emits `data-setup-action` behavior hooks.
- Did not move issue-report helpers because they include submit/status mutation contracts.
- Did not move public QR helpers because they include copy/regenerate/disable/test form action hooks.
- Did not move parts/equipment card helpers because they emit open/detail behavior hooks.
- Did not move email/helper command cards because they emit `data-jump-work-section` behavior hooks.
- Did not move workflow renderers, event handlers, mutations, `renderWorkspace()`, or `bindWorkspaceEvents()`.
- Did not change Supabase SQL/RLS/policies.

Created:

- `src/render/iconDisplay.js`

Modified:

- `app.js`
- `index.html`
- `tests/smoke/resource-load.spec.js`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`

Helpers moved:

- `segmentIcon`
- `navIcon`

Cache/script loading:

- `index.html` now loads `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1`.
- `index.html` now loads `app.js?v=lfes-phase-9e-icons-1`.

App.js line count:

- before Phase 9E: 10,561 lines.
- after Phase 9E: 10,524 lines.
- reduction: 37 lines.

Static checks:

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
- `node --check src/render/relationshipDisplay.js`: PASS
- `node --check src/render/dashboardDisplay.js`: PASS
- `node --check src/render/iconDisplay.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS

Resource checks:

- Local `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1` served HTTP 200.
- Local `app.js?v=lfes-phase-9e-icons-1` served HTTP 200.
- Local Playwright Resource Load Smoke was run with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`: PASS.
- The resource smoke list now includes `src/render/relationshipDisplay.js`, `src/render/dashboardDisplay.js`, and `src/render/iconDisplay.js`.

TEST:
Phase 9E signed-in local display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9e-icons-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was the selected active location.
5. Verified `src/render/iconDisplay.js` and the Phase 9E `app.js` cache tag were present.
6. Opened My Work and verified gauges/segment icons rendered.
7. Opened Work Orders and verified work list and segment icons rendered.
8. Opened Equipment.
9. Opened Parts.
10. Opened Team.
11. Opened Settings.
12. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace restores, Taylor Metal Products loads, Salem remains active, nav icons and segment icons render normally, core sections load, no missing-script errors appear, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
The local app loaded with the Phase 9E icon helper script and app cache tag. Navigation icons rendered across the workspace. My Work rendered 7 gauge readouts and segment icons. Work Orders rendered 8 gauge readouts and segment icons. Work Orders, Equipment, Parts, Team, and Settings loaded. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9E local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: blocked until explicitly requested.

## Codex LFES Execution Handoff Captured - 2026-05-20

Scope:

- Captured the handoff that Codex is now the primary LFES execution agent for MaintainOps.
- Did not change app code.
- Did not package/upload.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Created:

- `docs/LFES/context/CODEX_LFES_EXECUTION_HANDOFF.md`

Updated:

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`

Notes:

- The handoff preserves that Phase 9E is locally complete and the next recommended phase is Phase 9E package/upload plus live verification.
- The handoff preserves the high-risk LFES deviation warning format for skipped verification, risky sequencing changes, or dangerous extraction jumps.
- The handoff preserves the blocked list for mutations, workflow orchestration, event binding, auth/session/company/location logic, public QR submit, delete/storage/photo/document flows, `renderWorkspace()`, `bindWorkspaceEvents()`, and Supabase SQL/RLS.

## LFES Phase 9E GitHub Pages Package/Upload and Live Verification - 2026-05-20

Scope:

- Packaged and uploaded LFES Phase 9E static icon display-helper extraction to GitHub Pages.
- Did not start Phase 9F.
- Did not move more helpers.
- Did not refactor `app.js`.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Package:

- `MaintainOps-github-clean-20260520-070853`

Commits:

- App deploy: `0ce9a80` (`Deploy LFES Phase 9E icon display helpers`)
- Resource-smoke stabilization/docs: `4ba4e99` (`Stabilize hosted resource smoke`)

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS
- all `src/utils/*.js`: PASS
- all `src/services/*.js`: PASS
- all `src/render/*.js`: PASS

Package/resource checks:

- Package included `src/render/iconDisplay.js`.
- Package included all current `src/render`, `src/utils`, `src/services`, `assets`, `app.js`, `index.html`, `README.md`, `styles.css`, and `supabase-config.js`.
- Packaged `index.html` includes `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1`.
- Packaged `index.html` includes `app.js?v=lfes-phase-9e-icons-1`.
- Live `index.html` includes `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1`.
- Live `index.html` includes `app.js?v=lfes-phase-9e-icons-1`.
- Live `src/render/iconDisplay.js`: HTTP 200.
- Live `app.js`: HTTP 200.

CI note:

- Initial Resource Load Smoke for commit `0ce9a80` failed because GitHub Pages was still serving the previous Phase 9D `index.html`.
- This was a deployment timing issue, not an app behavior failure.
- `tests/smoke/resource-load.spec.js` was updated to retry hosted resource checks briefly while Pages catches up.
- Resource Load Smoke then passed for commit `4ba4e99`.

TEST:
Phase 9E live icon display smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9e-live-20260520-0714`.
2. Verified signed-in session restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified live `index.html` contained the Phase 9E icon helper script and Phase 9E `app.js` cache tag.
6. Opened My Work and verified nav/segment icons rendered.
7. Opened Work Orders and verified work list and segment icons rendered.
8. Opened Equipment.
9. Opened Parts.
10. Opened Team.
11. Opened Settings.
12. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live app restores session, Taylor Metal Products loads, Salem remains selected, nav icons and segment icons render normally, core sections load, no missing-script errors appear, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
My Work rendered 7 gauge readouts and segment icons. Work Orders rendered 8 gauge readouts and segment icons. Work Orders, Equipment, Parts, Team, and Settings loaded. No visible app errors were found. No browser warning/error logs were captured.

TEST:
GitHub Actions Resource Load Smoke

STEPS:
1. Checked GitHub Actions after push.
2. Verified latest Resource Load Smoke workflow for commit `4ba4e9912c64afcd99cea14dfcf278457fb2a61e`.
3. Verified GitHub Pages deployment workflow for the same commit.

EXPECTED:
Resource Load Smoke completes successfully and Pages deployment completes successfully.

RESULT:
PASS

NOTES:
Resource Load Smoke passed: `https://github.com/loufish727/MaintainOps/actions/runs/26168207272`. Pages build/deployment passed: `https://github.com/loufish727/MaintainOps/actions/runs/26168191246`.

Conclusion:

- Phase 9E package/upload: PASS.
- Live Phase 9E smoke: PASS.
- GitHub Actions Resource Load Smoke: PASS after retry stabilization.
- Behavior changed: no observed behavior change beyond the intended icon display-helper extraction.
- Phase 9E is fully closed.

## Daily QA Pass - 2026-05-20 (Automation) - 20260520-0704

Scope:

- Daily QA pass for MaintainOps using the documented Debug Protocol + Smoke Tests.
- No app code changes were made.
- No Supabase SQL/RLS/policy changes were made.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS

Hosted GitHub Pages (fresh `qa_bust`) and live debug protocol:

TEST:
Hosted resource smoke (Playwright)

STEPS:
1. Ran `npm run test:smoke:resources` (Playwright request-based hosted resource verification).

EXPECTED:
The live GitHub Pages site responds with HTTP 200 for `index.html` and required JS/CSS resources.

RESULT:
NOT VERIFIED

NOTES:
This environment has outbound network blocked (cannot reach GitHub Pages or any external HTTPS endpoints), so Playwright failed with `connect EACCES ...:443` while requesting `https://loufish727.github.io/MaintainOps/index.html?qa_bust=resource-smoke`.

TEST:
Live UI smoke (startup, navigation, location persistence, requests, Quick Fix)

STEPS:
1. Attempted outbound HTTP probes to GitHub Pages and `api.github.com` to confirm reachability.

EXPECTED:
Browser and/or scripted checks can reach hosted GitHub Pages and Supabase-backed APIs.

RESULT:
NOT VERIFIED

NOTES:
Outbound network is blocked in this automation runtime, so hosted/live UI checks (startup, navigation, location persistence, request baselines, public QR submit, internal request/convert, Quick Fix lifecycle, and console scan) could not be executed.

QA records created:

- None (no safe way to reach Supabase-hosted app).

QA records deleted:

- None.

Blockers / next action:

- Blocker: outbound network access is required to run the hosted GitHub Pages smoke and any Supabase-backed live debug flows.
- Next action: rerun this daily pass from an environment with internet access and a browser so the hosted checks can be executed with a fresh `?qa_bust=daily-qa-20260520-0704`.

## LFES Phase 9F App.js Cleanup Readiness Decision - 2026-05-20

Scope:

- Planning and documentation only.
- Reviewed remaining `app.js` helper/render candidates after Phase 9E.
- Did not change app code.
- Did not move functions.
- Did not refactor `app.js`.
- Did not change rendering behavior.
- Did not change event binding.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Created:

- `docs/LFES/audits/LFES_PHASE_9F_APP_JS_CLEANUP_READINESS.md`

Updated:

- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`

Decision:

- Recommended next implementation target: message bubble/list display only.
- Suggested future file: `src/render/messageDisplay.js`.
- Allowed future helpers:
  - `renderMessageBubble`
  - `renderMessageList`

Why:

- These helpers are display-only.
- They do not create forms.
- They do not emit `data-*` action hooks.
- They do not submit messages.
- They do not create or select threads.
- They can receive explicit dependencies from `app.js`.

Blocked from Phase 9G:

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

Other candidates reviewed:

- tiny label/text helpers: safe later but too low-value as a standalone phase.
- notice/status/toast helpers: blocked because `showNotice()` mutates notice state and can call `renderWorkspace()`.
- admin readiness helpers: blocked because `renderSetupItem()` emits `data-setup-action`.
- issue-report display/admin area: blocked because it includes report submit/status controls.
- public QR display: blocked because it crosses public anonymous intake and QR admin controls.
- parts/equipment display: blocked because these helpers carry open/detail/use/restock/Quick Fix/delete behavior hooks.
- work-order command cards: blocked because they emit `data-jump-work-section`.

Verification:

- Documentation-only phase; no app behavior changed.
- Static/runtime smoke was not required because no app code changed.

Conclusion:

- Phase 9F planning/readiness: PASS.
- Behavior changed: no.
- Next recommended phase: LFES Phase 9G message bubble/list display-helper extraction only, pending explicit implementation request.

## LFES Phase 9G Message Display Helper Extraction - 2026-05-20

Scope:

- Created one small message display module.
- Moved only the approved message bubble/list display helpers.
- Did not move `renderMessageCenter`.
- Did not move `renderMessageThreadButton`.
- Did not move `renderLinkedWorkMessageThread`.
- Did not move message composer forms.
- Did not move thread creation/send/read mutations.
- Did not move event handlers.
- Did not move Supabase calls.
- Did not move auth/session/company/location logic.
- Did not move `renderWorkspace()` or `bindWorkspaceEvents()`.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Created:

- `src/render/messageDisplay.js`

Modified:

- `app.js`
- `index.html`
- `tests/smoke/resource-load.spec.js`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`

Helpers moved:

- `renderMessageBubble`
- `renderMessageList`

Cache/script loading:

- `index.html` now loads `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`.
- `index.html` now loads `app.js?v=lfes-phase-9g-message-1`.

Resource smoke:

- `tests/smoke/resource-load.spec.js` now includes `src/render/messageDisplay.js`.

App.js line count:

- before Phase 9G: 10,524 lines.
- after Phase 9G: 10,511 lines.
- reduction: 13 lines.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS
- all `src/utils/*.js`: PASS
- all `src/services/*.js`: PASS
- all `src/render/*.js`: PASS

Resource checks:

- Local `src/render/messageDisplay.js?v=lfes-phase-9g-message-1` served HTTP 200.
- Local `app.js?v=lfes-phase-9g-message-1` served HTTP 200.
- Local Playwright Resource Load Smoke was run with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`: PASS.

TEST:
Phase 9G signed-in local message display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9g-message-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/messageDisplay.js` and the Phase 9G `app.js` cache tag were present.
6. Opened Messages.
7. Verified Messages screen loaded without visible errors.
8. Verified the no-thread/empty message state rendered.
9. Opened My Work.
10. Opened Work Orders.
11. Opened Equipment.
12. Opened Parts.
13. Opened Team.
14. Opened Settings.
15. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace restores, Taylor Metal Products loads, Salem remains selected, Messages loads, message empty/list display remains stable, core sections load, no missing-script errors appear, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
The current pilot data had 0 message threads, so actual non-empty message bubbles were not data-exercised during this smoke. The Messages screen loaded and rendered the empty state normally. My Work, Work Orders, Equipment, Parts, Team, and Settings loaded. No visible app errors were found. No browser warning/error logs were captured. User confirmed QA and Louie Fisher accounts are both safe owned accounts for a later non-empty Messages smoke if needed.

Conclusion:

- Phase 9G local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: blocked until explicitly requested.
- Follow-up watch item: verify non-empty message bubble rendering when safe message-thread data exists.

## LFES Phase 9G Package/Upload And Live Resource Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 9G message display-helper extraction to GitHub Pages.
- Did not start Phase 9H.
- Did not move more helpers.
- Did not refactor `app.js`.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Package:

- `MaintainOps-github-clean-20260520-072736`
- `MaintainOps-github-clean-20260520-072736.zip`

GitHub deploy:

- Commit: `26b3d1615b03a7f125ec0a32a8bc784a3f92f082`
- Commit message: `Extract message display helpers`

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS
- all `src/utils/*.js`: PASS
- all `src/services/*.js`: PASS
- all `src/render/*.js`: PASS

Package/resource verification:

- Package includes `src/render/messageDisplay.js`.
- Packaged `index.html` references `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`.
- Packaged `index.html` references `app.js?v=lfes-phase-9g-message-1`.

Live resource verification:

- Live `index.html` references `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`.
- Live `index.html` references `app.js?v=lfes-phase-9g-message-1`.
- Live `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`: HTTP 200.
- Live `app.js?v=lfes-phase-9g-message-1`: HTTP 200.
- Hosted Resource Load Smoke: PASS.

GitHub Actions:

- Resource Load Smoke: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26169188200`
- Pages build/deployment: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26169169535`

TEST:
Phase 9G live resource smoke

STEPS:
1. Pushed commit `26b3d1615b03a7f125ec0a32a8bc784a3f92f082`.
2. Waited for GitHub Pages to serve the updated `index.html`.
3. Confirmed live `index.html` contains the Phase 9G `messageDisplay.js` and `app.js` cache tags.
4. Confirmed live `messageDisplay.js` returns HTTP 200.
5. Confirmed live `app.js` returns HTTP 200.
6. Ran hosted Resource Load Smoke.
7. Checked GitHub Actions and Pages deployment result.

EXPECTED:
GitHub Pages serves the new message display helper, `app.js` uses the current cache tag, hosted Resource Load Smoke passes, and GitHub Actions/Pages deployment are green.

RESULT:
PASS

NOTES:
Authenticated live UI smoke was not completed in this automated pass because the automation session did not inherit the user's signed-in browser session. A signed-in live smoke should still verify Taylor Metal Products, Salem, Messages, My Work, Work Orders, Equipment, Parts, Team, and Settings.

Conclusion:

- Phase 9G package/upload and live resource verification: PASS.
- Authenticated live UI smoke: NOT VERIFIED in this pass.
- Behavior changed: no observed behavior change from resource/package verification.

## LFES Phase 9G Signed-In Live UI Smoke - 2026-05-20

Scope:

- Completed the remaining authenticated live UI smoke for Phase 9G.
- Did not start Phase 9H.
- Did not move more helpers.
- Did not refactor `app.js`.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.
- Did not create or mutate app records.

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9g-live-20260520-072736`

TEST:
Phase 9G signed-in live UI smoke

STEPS:
1. Opened live GitHub Pages app with Phase 9G cache bust.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected in `location-select`.
5. Verified Phase 9G script tags were present:
   - `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`
   - `app.js?v=lfes-phase-9g-message-1`
6. Opened Messages.
7. Verified Messages loaded without visible errors.
8. Opened My Work.
9. Opened Work Orders.
10. Opened Equipment.
11. Opened Parts.
12. Opened Team.
13. Opened Settings.
14. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, Messages and core sections load, no missing-script errors appear, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
The live signed-in session restored as `louie.fisher@taylormetal.com` under Taylor Metal Products. The active location select had `Salem, OR` selected. Messages loaded with `0 threads` and rendered the empty/no-thread state, so non-empty message bubbles remain not data-exercised. My Work, Work Orders, Equipment, Parts, Team, and Settings loaded. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9G signed-in live UI smoke: PASS.
- Phase 9G is fully closed.
- Behavior changed: no observed behavior change.
- Follow-up watch item: verify non-empty message bubble rendering when safe message-thread data exists.

## LFES Phase 9H App.js Cleanup Readiness Decision - 2026-05-20

Scope:

- Planning and documentation only.
- Reviewed remaining low-risk `app.js` cleanup candidates after Phase 9G was fully closed.
- Did not change app code.
- Did not move functions.
- Did not refactor `app.js`.
- Did not change rendering behavior.
- Did not change event binding.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Created:

- `docs/LFES/audits/LFES_PHASE_9H_APP_JS_CLEANUP_READINESS.md`

Updated:

- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`

Decision:

- Do not recommend immediate Phase 9I code extraction yet.
- Phase 9G is fully closed, but non-empty message bubbles remain not data-exercised because the live Messages screen had `0 threads`.
- Moving additional message-adjacent helpers before non-empty message evidence would stack unverified display risk.
- Pure label helpers such as `assetTypeLabel` and `assetStatusLabel` remain technically safe later, but low-value now.

Recommended next controlled phase:

- LFES Phase 9I non-empty Messages smoke, if explicitly approved.
- Use an existing safe message thread if available, or create a minimal safe message thread only with explicit approval.
- Verify message list, message bubble, sender initials, timestamp/day divider, thread button summary, and core section navigation afterward.

TEST:
Phase 9H app.js cleanup readiness decision

STEPS:
1. Reviewed current Phase 9G closure state, QA caveats, `app.js` helper candidates, and existing render modules.
2. Classified possible next candidates by operational value, risk, and verification availability.
3. Documented the Phase 9H decision and updated continuity docs.

EXPECTED:
Planning identifies the next safest controlled phase without changing app code, Supabase SQL/RLS, rendering behavior, event binding, workflows, or business logic.

RESULT:
PASS

NOTES:
No runtime browser smoke was required because this was documentation-only. No JavaScript static checks were required because no JavaScript files changed. The next recommended phase is a non-empty Messages smoke before further helper extraction.

## LFES Phase 9I Non-Empty Messages Smoke - 2026-05-20

Scope:

- Live signed-in runtime smoke only.
- Created one minimal direct QA message thread to exercise non-empty message rendering.
- Did not change app code.
- Did not move functions.
- Did not refactor `app.js`.
- Did not change rendering behavior.
- Did not change event binding.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9i-message-smoke-20260520`

QA data created:

- Subject: `QA Phase 9I message smoke 20260520-9I-1779288774749`
- Body: `QA Phase 9I message bubble smoke 20260520-9I-1779288774749. Safe owned-account rendering check.`
- Thread type: direct
- Visible participants: `Louie Fisher, loufish727`

QA cleanup:

- No cleanup was performed.
- The thread is retained as QA evidence unless a later app-supported cleanup/archive decision is made.

TEST:
Phase 9I non-empty Messages smoke

STEPS:
1. Opened live GitHub Pages app with Phase 9I cache bust.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected in `location-select`.
5. Opened Messages.
6. Confirmed there were initially `0` message threads.
7. Opened New message.
8. Selected Direct message.
9. Selected the safe owned `loufish727` teammate entry.
10. Created the direct QA thread with token `20260520-9I-1779288774749`.
11. Verified the thread list rendered the new thread.
12. Verified the message detail rendered the non-empty message list and bubble.
13. Opened My Work.
14. Opened Work Orders.
15. Opened Equipment.
16. Opened Parts.
17. Opened Team.
18. Opened Settings.
19. Returned to Messages.
20. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, a safe direct QA message thread can be created, message thread summary and message bubble render, sender initials and date divider render, core sections still load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Messages showed `1 threads` after creation. The thread button rendered the subject, participants `Louie Fisher, loufish727`, sender/body summary, and `Today 7:52 AM` timestamp. The detail view rendered one `.message-bubble`, sender initials `LF`, and a `Today` day divider. My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded afterward with Salem, OR still active. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9I non-empty Messages smoke: PASS.
- Non-empty message bubble rendering is now data-exercised.
- Behavior changed: no app behavior changed.
- Live data changed: one direct QA message thread was intentionally created and retained as evidence.

## LFES Phase 9J Message Format Readiness Decision - 2026-05-20

Scope:

- Planning and documentation only.
- Reviewed message-format helper candidates after Phase 9I verified non-empty message rendering.
- Did not change app code.
- Did not move functions.
- Did not refactor `app.js`.
- Did not change rendering behavior.
- Did not change event binding.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Created:

- `docs/LFES/audits/LFES_PHASE_9J_MESSAGE_FORMAT_READINESS.md`

Decision:

- Approved Phase 9K implementation for only:
  - `formatMessageTime`
  - `formatMessageDay`
  - `initials`
- Kept message center, thread buttons, composer forms, message mutations, event handlers, Supabase calls, `renderWorkspace()`, `bindWorkspaceEvents()`, and Supabase SQL/RLS blocked.

TEST:
Phase 9J message format readiness decision

STEPS:
1. Reviewed Phase 9I live non-empty Messages smoke evidence.
2. Reviewed message-related helpers in `app.js`.
3. Classified possible next candidates by risk and verification readiness.
4. Documented the Phase 9J decision.

EXPECTED:
Planning identifies a narrow safe implementation scope without changing app code, Supabase SQL/RLS, rendering behavior, event binding, workflows, or business logic.

RESULT:
PASS

NOTES:
No runtime browser smoke was required because this was documentation-only. No JavaScript static checks were required because no JavaScript files changed.

## LFES Phase 9K Message Formatting Helper Extraction - 2026-05-20

Scope:

- Created one small message formatting module.
- Moved only the approved pure message formatting helpers.
- Did not move `renderMessageCenter`.
- Did not move `renderMessageThreadButton`.
- Did not move `renderLinkedWorkMessageThread`.
- Did not move message composer forms.
- Did not move thread creation/send/read mutations.
- Did not move event handlers.
- Did not move Supabase calls.
- Did not move auth/session/company/location logic.
- Did not move `renderWorkspace()` or `bindWorkspaceEvents()`.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Created:

- `src/render/messageFormatting.js`

Modified:

- `app.js`
- `index.html`
- `tests/smoke/resource-load.spec.js`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`

Helpers moved:

- `formatMessageTime`
- `formatMessageDay`
- `initials`

Cache/script loading:

- `index.html` now loads `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`.
- `index.html` now loads `app.js?v=lfes-phase-9k-message-format-1`.

Resource smoke:

- `tests/smoke/resource-load.spec.js` now includes `src/render/messageFormatting.js`.

App.js line count:

- before Phase 9K: 10,511 lines.
- after Phase 9K: 10,487 lines.
- reduction: 24 lines.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS
- all `src/utils/*.js`: PASS
- all `src/services/*.js`: PASS
- all `src/render/*.js`: PASS

Resource checks:

- Local Playwright Resource Load Smoke was run with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`: PASS.

TEST:
Phase 9K signed-in local message formatting smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9k-message-format-20260520`.
2. Verified signed-in workspace restored after loading.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/messageFormatting.js` and the Phase 9K `app.js` cache tag were present.
6. Opened Messages.
7. Verified the Phase 9I QA thread was visible.
8. Verified the message thread button rendered.
9. Verified one message bubble rendered.
10. Verified sender initials `LF` rendered.
11. Verified `Today` day divider rendered.
12. Opened My Work.
13. Opened Work Orders.
14. Opened Equipment.
15. Opened Parts.
16. Opened Team.
17. Opened Settings.
18. Returned to Messages.
19. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new message formatting script loads, message thread summary and message bubble formatting remain stable, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
The local app loaded with `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1` and `app.js?v=lfes-phase-9k-message-format-1`. The Phase 9I QA message thread and body rendered. One message bubble, sender initials `LF`, and one day divider rendered. My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded with Salem, OR selected. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9K local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 9L.

## LFES Phase 9L Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 9K message formatting helper extraction to GitHub Pages.
- Did not start Phase 9M.
- Did not move more helpers.
- Did not refactor `app.js`.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Package:

- `MaintainOps-github-clean-20260520-082153`
- `MaintainOps-github-clean-20260520-082153.zip`

GitHub deploy:

- Commit: `989ac29b6a9c13df0143756ab74184c421572455`
- Commit message: `Extract message formatting helpers`

Live resource verification:

- Live `index.html` references `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`.
- Live `index.html` references `app.js?v=lfes-phase-9k-message-format-1`.
- Live `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`: HTTP 200.
- Live `app.js?v=lfes-phase-9k-message-format-1`: HTTP 200.
- Hosted Resource Load Smoke: PASS.

GitHub Actions:

- Resource Load Smoke: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26172273053`
- Pages build/deployment: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26172272050`

TEST:
Phase 9L signed-in live message formatting smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9l-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected in `location-select`.
5. Verified `src/render/messageFormatting.js` and the Phase 9K `app.js` cache tag were present.
6. Opened Messages.
7. Verified the Phase 9I QA thread was visible.
8. Verified the message thread button rendered.
9. Verified one message bubble rendered.
10. Verified sender initials `LF` rendered.
11. Verified `Today` day divider rendered.
12. Opened My Work.
13. Opened Work Orders.
14. Opened Equipment.
15. Opened Parts.
16. Opened Team.
17. Opened Settings.
18. Returned to Messages.
19. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new message formatting script loads, message thread summary and message bubble formatting remain stable, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
The live app loaded with `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1` and `app.js?v=lfes-phase-9k-message-format-1`. The Phase 9I QA message thread and body rendered. One message bubble, sender initials `LF`, and one day divider rendered. My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded with Salem, OR selected. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9L package/upload and live verification: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Pages build/deployment: PASS.
- Behavior changed: no observed behavior change.
- Phase 9K/9L is fully closed.

## LFES Phase 9M Equipment Label Readiness Decision - 2026-05-20

Scope:

- Planning and documentation only.
- Reviewed equipment label helper candidates after Phase 9K/9L fully closed.
- Did not change app code.
- Did not move functions.
- Did not refactor `app.js`.
- Did not change rendering behavior.
- Did not change event binding.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Created:

- `docs/LFES/audits/LFES_PHASE_9M_EQUIPMENT_LABEL_READINESS.md`

Decision:

- Approved Phase 9N implementation for only:
  - `assetTypeLabel`
  - `assetStatusLabel`
- Kept equipment cards/details/forms, delete guards, equipment-driven routing behavior, Quick Fix hooks, event handlers, mutations, Supabase calls, `renderWorkspace()`, `bindWorkspaceEvents()`, and Supabase SQL/RLS blocked.

TEST:
Phase 9M equipment label readiness decision

STEPS:
1. Reviewed latest Phase 9L closure state.
2. Reviewed label helper candidates in `app.js`.
3. Classified possible next candidates by risk and verification readiness.
4. Documented the Phase 9M decision.

EXPECTED:
Planning identifies a narrow safe implementation scope without changing app code, Supabase SQL/RLS, rendering behavior, event binding, workflows, or business logic.

RESULT:
PASS

NOTES:
No runtime browser smoke was required because this was documentation-only. No JavaScript static checks were required because no JavaScript files changed.

## LFES Phase 9N Equipment Label Helper Extraction - 2026-05-20

Scope:

- Created one small equipment label module.
- Moved only the approved pure equipment label helpers.
- Did not move equipment cards/details/forms.
- Did not move equipment delete guards.
- Did not move equipment-driven routing behavior.
- Did not move Quick Fix hooks.
- Did not move event handlers.
- Did not move mutations.
- Did not move Supabase calls.
- Did not move auth/session/company/location logic.
- Did not move `renderWorkspace()` or `bindWorkspaceEvents()`.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Created:

- `src/render/equipmentLabels.js`

Modified:

- `app.js`
- `index.html`
- `tests/smoke/resource-load.spec.js`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`

Helpers moved:

- `assetTypeLabel`
- `assetStatusLabel`

Cache/script loading:

- `index.html` now loads `src/render/equipmentLabels.js?v=lfes-phase-9n-equipment-labels-1`.
- `index.html` now loads `app.js?v=lfes-phase-9n-equipment-labels-1`.

Resource smoke:

- `tests/smoke/resource-load.spec.js` now includes `src/render/equipmentLabels.js`.

App.js line count:

- before Phase 9N: 10,487 lines.
- after Phase 9N: 10,476 lines.
- reduction: 11 lines.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS
- all `src/utils/*.js`: PASS
- all `src/services/*.js`: PASS
- all `src/render/*.js`: PASS

Resource checks:

- Local Playwright Resource Load Smoke was run with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`: PASS.

TEST:
Phase 9N signed-in local equipment label smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9n-equipment-labels-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/equipmentLabels.js` and the Phase 9N `app.js` cache tag were present.
6. Opened Equipment.
7. Verified equipment type/status labels rendered.
8. Opened Work Orders.
9. Opened My Work.
10. Opened Parts.
11. Opened Team.
12. Opened Settings.
13. Opened Messages.
14. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new equipment label script loads, Equipment labels render, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
The local app loaded with `src/render/equipmentLabels.js?v=lfes-phase-9n-equipment-labels-1` and `app.js?v=lfes-phase-9n-equipment-labels-1`. Equipment rendered `Machine` and `Running` label text. Work Orders, My Work, Parts, Team, Settings, and Messages loaded with Salem, OR selected. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9N local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 9O.

## LFES Phase 9O Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 9N equipment label helper extraction to GitHub Pages.
- Did not start Phase 9P.
- Did not move more helpers.
- Did not refactor `app.js`.
- Did not change Supabase SQL/RLS/policies.
- Did not change workflows/business logic.

Package:

- `MaintainOps-github-clean-20260520-085806`
- `MaintainOps-github-clean-20260520-085806.zip`

GitHub deploy:

- Commit: `c7a03782b2bd6e547dcf6b99261d9d3c11a8d51a`
- Commit message: `Extract equipment label helpers`

Live resource verification:

- Live `index.html` references `src/render/equipmentLabels.js?v=lfes-phase-9n-equipment-labels-1`.
- Live `index.html` references `app.js?v=lfes-phase-9n-equipment-labels-1`.
- Live `src/render/equipmentLabels.js?v=lfes-phase-9n-equipment-labels-1`: HTTP 200.
- Live `app.js?v=lfes-phase-9n-equipment-labels-1`: HTTP 200.
- Hosted Resource Load Smoke: PASS.

GitHub Actions:

- Resource Load Smoke: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26174279121`
- Pages build/deployment: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26174277950`

TEST:
Phase 9O signed-in live equipment label smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9o-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected in `location-select`.
5. Verified `src/render/equipmentLabels.js` and the Phase 9N `app.js` cache tag were present.
6. Opened Equipment.
7. Verified equipment type/status labels rendered.
8. Opened Work Orders.
9. Opened My Work.
10. Opened Parts.
11. Opened Team.
12. Opened Settings.
13. Opened Messages.
14. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new equipment label script loads, Equipment labels render, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
The live app loaded with `src/render/equipmentLabels.js?v=lfes-phase-9n-equipment-labels-1` and `app.js?v=lfes-phase-9n-equipment-labels-1`. Equipment rendered `Machine` and `Running` label text. Work Orders, My Work, Parts, Team, Settings, and Messages loaded with Salem, OR selected. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9O package/upload and live verification: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Pages build/deployment: PASS.
- Behavior changed: no observed behavior change.
- Phase 9N/9O is fully closed.

## LFES Phase 9P Empty State Readiness - 2026-05-20

Scope:

- Reviewed the next low-risk `app.js` cleanup candidate after Phase 9N/9O.
- Approved only the empty-state text helpers for extraction.
- No code changed during readiness.

Decision:

- Proceed to Phase 9Q with `requestEmptyStateText`, `assetEmptyStateText`, and `partEmptyStateText` only.
- Keep filter/search state owned by `app.js`; inject getter dependencies into the render helper module.

Audit:

- `docs/LFES/audits/LFES_PHASE_9P_EMPTY_STATE_READINESS.md`

## LFES Phase 9Q Empty State Text Extraction - 2026-05-20

Scope:

- Added `src/render/emptyStateText.js`.
- Moved only `requestEmptyStateText`, `assetEmptyStateText`, and `partEmptyStateText`.
- Updated `index.html` to load `src/render/emptyStateText.js?v=lfes-phase-9q-empty-state-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-phase-9q-empty-state-1`.
- Updated Resource Load Smoke required resources.
- No workflow logic, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()` changed.

Line count:

- `app.js` before: 10,476 lines.
- `app.js` after: 10,470 lines.
- reduction: 6 lines.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS
- all `src/utils/*.js`: PASS
- all `src/services/*.js`: PASS
- all `src/render/*.js`: PASS

Resource checks:

- Local Playwright Resource Load Smoke was run with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`: PASS.

TEST:
Phase 9Q signed-in local empty-state smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9q-empty-state-20260520b`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/emptyStateText.js?v=lfes-phase-9q-empty-state-1` and `app.js?v=lfes-phase-9q-empty-state-1` were present.
6. Opened Requests and verified the active request empty-state copy rendered.
7. Opened Equipment and verified equipment labels still rendered.
8. Opened Parts and verified part empty-state copy rendered.
9. Opened Work Orders, My Work, Team, Settings, and Messages.
10. Verified Messages still showed the Phase 9I QA thread.
11. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new empty-state text script loads, empty-state copy renders in applicable sections, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Requests rendered `No active requests waiting for review.`. Parts rendered an expected empty-state copy. Equipment still rendered label text including `Machine` / `Running`. Messages still showed `QA Phase 9I message smoke`. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9Q local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 9R.

## LFES Phase 9R Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 9Q empty-state text helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change workflow logic, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-091730`
- `MaintainOps-github-clean-20260520-091730.zip`

GitHub deploy:

- Commit: `6f358dcdbfc3bd52aef6bce63521bcafa28d58f0`
- Commit message: `Extract empty state text helpers`

Live resource verification:

- Live `index.html` references `src/render/emptyStateText.js?v=lfes-phase-9q-empty-state-1`.
- Live `index.html` references `app.js?v=lfes-phase-9q-empty-state-1`.
- Live `src/render/emptyStateText.js?v=lfes-phase-9q-empty-state-1`: HTTP 200.
- Live `app.js?v=lfes-phase-9q-empty-state-1`: HTTP 200.
- Hosted Resource Load Smoke: PASS.

GitHub Actions:

- Resource Load Smoke: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26175333772`
- Pages build/deployment: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26175333222`

TEST:
Phase 9R signed-in live empty-state smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9r-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/emptyStateText.js?v=lfes-phase-9q-empty-state-1` and `app.js?v=lfes-phase-9q-empty-state-1` were present.
6. Opened Requests and verified the active request empty-state copy rendered.
7. Opened Equipment and verified equipment labels still rendered.
8. Opened Parts and verified part empty-state copy rendered.
9. Opened Work Orders, My Work, Team, Settings, and Messages.
10. Verified Messages still showed the Phase 9I QA thread.
11. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new empty-state text script loads, empty-state copy renders in applicable sections, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Requests rendered `No active requests waiting for review.`. Parts rendered an expected empty-state copy. Equipment still rendered label text including `Machine` / `Running`. Messages still showed `QA Phase 9I message smoke`. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9R package/upload and live verification: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Pages build/deployment: PASS.
- live signed-in smoke: PASS.
- Behavior changed: no observed behavior change.
- Phase 9P/9Q/9R is fully closed.

## LFES Phase 9S Request Filter Display Readiness - 2026-05-20

Scope:

- Reviewed the next low-risk `app.js` cleanup candidate after Phase 9P/9Q/9R.
- Approved only request filter display helper extraction.
- No code changed during readiness.

Decision:

- Proceed to Phase 9T with `requestPanelSubtitle` and `renderRequestFilterBar` only.
- Keep request counts, filtering, pagination, conversion, mutation, and event handling in `app.js`.

Audit:

- `docs/LFES/audits/LFES_PHASE_9S_REQUEST_FILTER_DISPLAY_READINESS.md`

## LFES Phase 9T Request Filter Display Extraction - 2026-05-20

Scope:

- Added `src/render/requestDisplay.js`.
- Moved only `requestPanelSubtitle` and `renderRequestFilterBar`.
- Updated `index.html` to load `src/render/requestDisplay.js?v=lfes-phase-9t-request-display-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-phase-9t-request-display-1`.
- Updated Resource Load Smoke required resources.
- No request filtering, event handlers, mutations, workflow logic, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()` changed.

Line count:

- `app.js` before: 10,470 lines.
- `app.js` after: 10,454 lines.
- reduction: 16 lines.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS
- all `src/utils/*.js`: PASS
- all `src/services/*.js`: PASS
- all `src/render/*.js`: PASS

Resource checks:

- Local Playwright Resource Load Smoke was run with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`: PASS.

TEST:
Phase 9T signed-in local request filter display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9t-request-display-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/requestDisplay.js?v=lfes-phase-9t-request-display-1` and `app.js?v=lfes-phase-9t-request-display-1` were present.
6. Opened Requests and verified the request filter bar rendered Active, Converted, and All with counts.
7. Verified active request empty-state copy still rendered.
8. Opened Equipment, Parts, Work Orders, My Work, Team, Settings, and Messages.
9. Verified Messages still showed the Phase 9I QA thread.
10. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new request display script loads, request filter display renders, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Requests rendered the Active/Converted/All filter bar with counts and `No active requests waiting for review.`. Parts still rendered expected empty-state copy. Messages still showed `QA Phase 9I message smoke`. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9T local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 9U.

## LFES Phase 9U Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 9T request filter display helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change request filtering, counts, pagination, submit/convert/delete behavior, workflow logic, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-094703`
- `MaintainOps-github-clean-20260520-094703.zip`

GitHub deploy:

- Commit: `c6e94f14a1faaa210d722116111ea3969ced1530`
- Commit message: `Extract request filter display helpers`

Live resource verification:

- Live `index.html` references `src/render/requestDisplay.js?v=lfes-phase-9t-request-display-1`.
- Live `index.html` references `app.js?v=lfes-phase-9t-request-display-1`.
- Live `src/render/requestDisplay.js?v=lfes-phase-9t-request-display-1`: HTTP 200.
- Live `app.js?v=lfes-phase-9t-request-display-1`: HTTP 200.
- Hosted Resource Load Smoke: PASS.

GitHub Actions:

- Resource Load Smoke: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26176843065`
- Pages build/deployment: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26176841661`

TEST:
Phase 9U signed-in live request filter display smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9u-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/requestDisplay.js?v=lfes-phase-9t-request-display-1` and `app.js?v=lfes-phase-9t-request-display-1` were present.
6. Opened Requests and verified the request filter bar rendered Active, Converted, and All with counts.
7. Verified active request empty-state copy still rendered.
8. Opened Equipment, Parts, Work Orders, My Work, Team, Settings, and Messages.
9. Verified Messages still showed the Phase 9I QA thread.
10. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new request display script loads, request filter display renders, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Requests rendered the Active/Converted/All filter bar with counts and `No active requests waiting for review.`. Parts still rendered expected empty-state copy. Messages still showed `QA Phase 9I message smoke`. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9U package/upload and live verification: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Pages build/deployment: PASS.
- live signed-in smoke: PASS.
- Behavior changed: no observed behavior change.
- Phase 9S/9T/9U is fully closed.

## LFES Phase 9V Global Search Display Readiness - 2026-05-20

Scope:

- Reviewed the next low-risk `app.js` cleanup candidate after Phase 9S/9T/9U.
- Approved only global search result display helper extraction.
- No code changed during readiness.

Decision:

- Proceed to Phase 9W with global search result display helpers only.
- Keep `globalSearchResults()`, search matching, exact work order search, search input state, and data-search event handling in `app.js`.

Audit:

- `docs/LFES/audits/LFES_PHASE_9V_GLOBAL_SEARCH_DISPLAY_READINESS.md`

## LFES Phase 9W Global Search Display Extraction - 2026-05-20

Scope:

- Added `src/render/globalSearchDisplay.js`.
- Moved only global search result display helpers and `globalResultCount`.
- Updated `index.html` to load `src/render/globalSearchDisplay.js?v=lfes-phase-9w-global-search-display-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-phase-9w-global-search-display-1`.
- Updated Resource Load Smoke required resources.
- No search/filter logic, exact work order search, event handlers, mutations, workflow logic, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()` changed.

Line count:

- `app.js` before: 10,454 lines.
- `app.js` after: 10,370 lines.
- reduction: 84 lines.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS
- all `src/utils/*.js`: PASS
- all `src/services/*.js`: PASS
- all `src/render/*.js`: PASS

Resource checks:

- Local Playwright Resource Load Smoke was run with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`: PASS.

Display render probe:

- Node VM probe loaded `src/render/globalSearchDisplay.js`, created the helper factory with sample dependencies, rendered a sample global search result panel, and verified:
  - `Search Results` panel text.
  - Work Orders, Equipment, Parts, Requests, PM, and Procedures groups.
  - `Page through all matching work orders` action.
  - expected `data-search-work-order` and `data-search-asset` attributes.
- Result: PASS.

TEST:
Phase 9W signed-in local global search display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9w-global-search-display-20260520h`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/globalSearchDisplay.js?v=lfes-phase-9w-global-search-display-1` and `app.js?v=lfes-phase-9w-global-search-display-1` were present.
6. Opened Requests, Equipment, Parts, Work Orders, My Work, Team, Settings, and Messages.
7. Verified Requests still rendered the Active/Converted/All filter bar.
8. Verified Messages still showed the Phase 9I QA thread.
9. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new global search display script loads, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
The in-browser text entry path for the global search box was blocked by the browser virtual clipboard layer, so the actual global search display HTML was verified with the Node render probe and the loaded app was verified by signed-in section smoke. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9W local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 9X.

## LFES Phase 9X Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 9W global search display helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change `globalSearchResults()`, search/filter logic, exact work order search, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-100524`
- `MaintainOps-github-clean-20260520-100524.zip`

GitHub deploy:

- Commit: `57a746f20af54941196f07c49b7fcb7e5b263808`
- Commit message: `Extract global search display helpers`

Live resource verification:

- Live `index.html` references `src/render/globalSearchDisplay.js?v=lfes-phase-9w-global-search-display-1`.
- Live `index.html` references `app.js?v=lfes-phase-9w-global-search-display-1`.
- Live `src/render/globalSearchDisplay.js?v=lfes-phase-9w-global-search-display-1`: HTTP 200.
- Live `app.js?v=lfes-phase-9w-global-search-display-1`: HTTP 200.
- Hosted Resource Load Smoke after Pages served the new build: PASS.

GitHub Actions:

- Resource Load Smoke for commit `57a746f20af54941196f07c49b7fcb7e5b263808`: failed due Pages timing. The job ran before GitHub Pages served the new `index.html` cache tags and timed out waiting for the new resource reference.
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26177757511`
- Pages build/deployment: PASS
- Run: `https://github.com/loufish727/MaintainOps/actions/runs/26177756072`
- Follow-up hosted Resource Load Smoke run locally against live GitHub Pages after Pages completed: PASS.

TEST:
Phase 9X signed-in live global search display smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9x-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/globalSearchDisplay.js?v=lfes-phase-9w-global-search-display-1` and `app.js?v=lfes-phase-9w-global-search-display-1` were present.
6. Opened Requests, Equipment, Parts, Work Orders, My Work, Team, Settings, and Messages.
7. Verified Requests still rendered the Active/Converted/All filter bar.
8. Verified Messages still showed the Phase 9I QA thread.
9. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new global search display script loads, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
The live app loaded with the Phase 9W global search display script and app cache tag. Requests still rendered the request filter bar. Messages still showed `QA Phase 9I message smoke`. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9X package/upload and live verification: PASS with one known GitHub Actions timing failure.
- live resource verification: PASS.
- Pages build/deployment: PASS.
- hosted Resource Load Smoke after Pages completion: PASS.
- live signed-in smoke: PASS.
- Behavior changed: no observed behavior change.
- Phase 9V/9W/9X is functionally closed.

## LFES Phase 9Y Work Queue Display Readiness - 2026-05-20

Scope:

- Reviewed the next low-risk `app.js` cleanup candidate after Phase 9V/9W/9X.
- Approved only Work Orders / My Work queue title display helper extraction.
- No code changed during readiness.

Decision:

- Proceed to Phase 9Z with `workOrdersPanelTitle`, `myWorkPanelTitle`, `workQueuePanelTitle`, and `workQueuePanelSubtitle` only.
- Keep queue filtering, server paging, counts, assignment filtering, and event handling in `app.js`.

Audit:

- `docs/LFES/audits/LFES_PHASE_9Y_WORK_QUEUE_DISPLAY_READINESS.md`

## LFES Phase 9Z Work Queue Display Extraction - 2026-05-20

Scope:

- Added `src/render/workQueueDisplay.js`.
- Moved only Work Orders / My Work queue title/subtitle display helpers.
- Updated `index.html` to load `src/render/workQueueDisplay.js?v=lfes-phase-9z-work-queue-display-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-phase-9z-work-queue-display-1`.
- Updated Resource Load Smoke required resources.
- No work order filtering, server paging, counts, assignment filtering, event handlers, mutations, workflow logic, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()` changed.

Line count:

- `app.js` before: 10,370 lines.
- `app.js` after: 10,354 lines.
- reduction: 16 lines.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS
- all `src/utils/*.js`: PASS
- all `src/services/*.js`: PASS
- all `src/render/*.js`: PASS

Resource checks:

- Local Playwright Resource Load Smoke was run with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`: PASS.

TEST:
Phase 9Z signed-in local work queue display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9z-work-queue-display-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/workQueueDisplay.js?v=lfes-phase-9z-work-queue-display-1` and `app.js?v=lfes-phase-9z-work-queue-display-1` were present.
6. Opened My Work and verified the title/subtitle rendered.
7. Opened Work Orders and verified the queue title/subtitle rendered.
8. Opened Requests, Equipment, Parts, Team, Settings, and Messages.
9. Verified Requests still rendered the Active/Converted/All filter bar.
10. Verified Messages still showed the Phase 9I QA thread.
11. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new work queue display script loads, queue title/subtitle copy renders, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
My Work and Work Orders rendered title/subtitle copy. Requests still rendered the request filter bar. Messages still showed `QA Phase 9I message smoke`. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 9Z local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 10A.

## LFES Phase 10A Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 9Z work queue display helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change work order filtering, server paging, counts, assignment filtering, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-102539`
- `MaintainOps-github-clean-20260520-102539.zip`

GitHub deploy:

- Commit: `b037737b5edcf85f9910fb89d087da33235a88de`
- Commit message: `Extract work queue display helpers`

Live resource verification:

- Live `index.html` references `src/render/workQueueDisplay.js?v=lfes-phase-9z-work-queue-display-1`.
- Live `index.html` references `app.js?v=lfes-phase-9z-work-queue-display-1`.
- Live `src/render/workQueueDisplay.js?v=lfes-phase-9z-work-queue-display-1`: HTTP 200.
- Live `app.js?v=lfes-phase-9z-work-queue-display-1`: HTTP 200.
- Hosted Resource Load Smoke against live GitHub Pages: PASS.

GitHub Actions:

- Public GitHub API was rate-limited during final verification.
- Connector workflow lookup returned no workflow runs for commit `b037737b5edcf85f9910fb89d087da33235a88de`.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

TEST:
Phase 10A signed-in live work queue display smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10a-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/workQueueDisplay.js?v=lfes-phase-9z-work-queue-display-1` and `app.js?v=lfes-phase-9z-work-queue-display-1` were present.
6. Opened My Work and verified the title/subtitle rendered.
7. Opened Work Orders and verified the queue title/subtitle rendered.
8. Opened Requests, Equipment, Parts, Team, Settings, and Messages.
9. Verified Requests still rendered the Active/Converted/All filter bar.
10. Verified Messages still showed the Phase 9I QA thread.
11. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new work queue display script loads, queue title/subtitle copy renders, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
My Work and Work Orders rendered title/subtitle copy. Requests still rendered the request filter bar. Messages still showed `QA Phase 9I message smoke`. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 10A package/upload and live verification: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- Behavior changed: no observed behavior change.
- GitHub Actions final check unavailable due public API rate limiting / connector run lookup gap.
- Phase 9Y/9Z/10A is functionally closed.

## LFES Phase 10B Planning Display Readiness - 2026-05-20

Scope:

- Reviewed the next low-risk `app.js` cleanup candidate after Phase 9Y/9Z/10A.
- Approved only Planning display helper extraction.
- No code changed during readiness.

Decision:

- Proceed to Phase 10C with `renderPlanningGroup` and `renderPlanningItem` only.
- Keep planning item generation, PM generation, follow-up work order creation, mini work-order opening, and event handling in `app.js`.

Audit:

- `docs/LFES/audits/LFES_PHASE_10B_PLANNING_DISPLAY_READINESS.md`

## LFES Phase 10C Planning Display Extraction - 2026-05-20

Scope:

- Added `src/render/planningDisplay.js`.
- Moved only `renderPlanningGroup` and `renderPlanningItem`.
- Updated `index.html` to load `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-phase-10c-planning-display-1`.
- Updated Resource Load Smoke required resources.
- No planning bucket calculation, PM generation, follow-up creation, mini work-order opening, event handlers, mutations, workflow logic, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()` changed.

Line count:

- `app.js` before: 10,354 lines.
- `app.js` after: 10,309 lines.
- reduction: 45 lines.

Static checks:

- `node --check app.js`: PASS
- `node --check supabase-config.js`: PASS
- `node --check tests/smoke/resource-load.spec.js`: PASS
- all `src/utils/*.js`: PASS
- all `src/services/*.js`: PASS
- all `src/render/*.js`: PASS

Resource checks:

- Local Playwright Resource Load Smoke was run with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`: PASS.

TEST:
Phase 10C signed-in local planning display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-10c-planning-display-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1` and `app.js?v=lfes-phase-10c-planning-display-1` were present.
6. Opened Planning and verified Overdue, Due Today, Next 7 Days, Follow-up Needed, and PM Due Soon groups rendered.
7. Opened My Work, Work Orders, Requests, Equipment, Parts, Team, Settings, and Messages.
8. Verified Requests still rendered the Active/Converted/All filter bar.
9. Verified Messages still showed the Phase 9I QA thread.
10. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new planning display script loads, Planning groups render, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Planning rendered the expected groups and either planning items or `Nothing here.` copy. Requests still rendered the request filter bar. Messages still showed `QA Phase 9I message smoke`. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 10C local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 10D.

## LFES Phase 10D Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 10C Planning display helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change planning item generation, PM generation, follow-up creation, mini work-order opening, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-103436`
- `MaintainOps-github-clean-20260520-103436.zip`

GitHub deploy:

- Commit: `efef39c`
- Commit message: `Extract planning display helpers`

Live resource verification:

- Live `index.html` references `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1`.
- Live `index.html` references `app.js?v=lfes-phase-10c-planning-display-1`.
- Live `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1`: HTTP 200.
- Live `app.js?v=lfes-phase-10c-planning-display-1`: HTTP 200.
- Hosted Resource Load Smoke against live GitHub Pages: PASS.

GitHub Actions:

- Public GitHub API was still rate-limited during final verification.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

TEST:
Phase 10D signed-in live Planning display smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10d-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1` and `app.js?v=lfes-phase-10c-planning-display-1` were present.
6. Opened Planning and verified Overdue, Due Today, Next 7 Days, Follow-up Needed, and PM Due Soon groups rendered.
7. Opened My Work, Work Orders, Requests, Equipment, Parts, Team, Settings, and Messages.
8. Verified Requests still rendered the Active/Converted/All filter bar.
9. Verified Messages still showed the Phase 9I QA thread.
10. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new Planning display script loads, Planning groups render, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
Planning rendered the expected groups and either planning items or `Nothing here.` copy. Requests still rendered the request filter bar. Messages still showed `QA Phase 9I message smoke`. No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 10D package/upload and live verification: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- Behavior changed: no observed behavior change.
- GitHub Actions final check unavailable due public API rate limiting.
- Phase 10B/10C/10D is functionally closed.

## LFES Phase 10F Mini Work Order Display Local Verification - 2026-05-20

Scope:

- Added `src/render/miniWorkOrderDisplay.js`.
- Moved only `renderMiniWorkOrder` and `renderAssetMiniWorkOrder` into the display helper module.
- Did not move asset detail rendering, relationship loading, work-order click behavior, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Local implementation:

- `index.html` now references `src/render/miniWorkOrderDisplay.js?v=lfes-phase-10f-mini-work-order-display-1`.
- `index.html` now references `app.js?v=lfes-phase-10f-mini-work-order-display-1`.
- Resource Load Smoke now includes `src/render/miniWorkOrderDisplay.js`.
- `app.js` line count after extraction: 10,290.

TEST:
Phase 10F static and local resource checks

RESULT:
PASS

Verified:

- `node --check app.js`: PASS.
- `node --check supabase-config.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check` across `src/utils`, `src/services`, and `src/render`: PASS.
- Local Resource Load Smoke against `http://127.0.0.1:4294/`: PASS.

TEST:
Phase 10F signed-in local mini work order display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-10f-mini-work-order-display-20260520b`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/miniWorkOrderDisplay.js?v=lfes-phase-10f-mini-work-order-display-1` and `app.js?v=lfes-phase-10f-mini-work-order-display-1` were present.
6. Opened My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
7. Verified Equipment showed `New thalmann`.
8. Opened an Equipment detail and verified two `[data-mini-work-order]` snippets rendered.
9. Verified Messages still showed the Phase 9I QA thread.
10. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new mini work order display script loads, Equipment detail mini work-order snippets render, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 10F local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 10G.

## LFES Phase 10G Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 10F mini work order display helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change asset detail rendering, relationship loading, work-order click behavior, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-110415`
- `MaintainOps-github-clean-20260520-110415.zip`

GitHub deploy:

- Commit: `fba2c26`
- Commit message: `Extract mini work order display helpers`

Live resource verification:

- Live `index.html` references `src/render/miniWorkOrderDisplay.js?v=lfes-phase-10f-mini-work-order-display-1`.
- Live `index.html` references `app.js?v=lfes-phase-10f-mini-work-order-display-1`.
- Live `src/render/miniWorkOrderDisplay.js?v=lfes-phase-10f-mini-work-order-display-1`: HTTP 200.
- Live `app.js?v=lfes-phase-10f-mini-work-order-display-1`: HTTP 200.
- Hosted Resource Load Smoke against live GitHub Pages: PASS.

GitHub Actions:

- GitHub connector check for commit `fba2c26` returned no workflow runs.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

TEST:
Phase 10G signed-in live mini work order display smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10g-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/miniWorkOrderDisplay.js?v=lfes-phase-10f-mini-work-order-display-1` and `app.js?v=lfes-phase-10f-mini-work-order-display-1` were present.
6. Opened My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
7. Verified Equipment showed `New thalmann`.
8. Opened an Equipment detail and verified two `[data-mini-work-order]` snippets rendered.
9. Verified Messages still showed the Phase 9I QA thread.
10. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new mini work order display script loads, Equipment detail mini work-order snippets render, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 10G package/upload and live verification: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- Behavior changed: no observed behavior change.
- Phase 10E/10F/10G is functionally closed.

## LFES Phase 10I Pagination Display Local Verification - 2026-05-20

Scope:

- Added `src/render/paginationDisplay.js`.
- Moved only `renderWorkPagination`, `renderPartsPagination`, `renderAssetsPagination`, and `renderListPagination` into the display helper module.
- Did not move page click handling, page state mutation, localStorage updates, filtering, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Local implementation:

- `index.html` now references `src/render/paginationDisplay.js?v=lfes-phase-10i-pagination-display-1`.
- `index.html` now references `app.js?v=lfes-phase-10i-pagination-display-1`.
- Resource Load Smoke now includes `src/render/paginationDisplay.js`.
- `app.js` line count after extraction: 10,253.

TEST:
Phase 10I static and local resource checks

RESULT:
PASS

Verified:

- `node --check app.js`: PASS.
- `node --check supabase-config.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check` across `src/utils`, `src/services`, and `src/render`: PASS.
- Local Resource Load Smoke against `http://127.0.0.1:4294/`: PASS.

TEST:
Phase 10I signed-in local pagination display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-10i-pagination-display-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/paginationDisplay.js?v=lfes-phase-10i-pagination-display-1` and `app.js?v=lfes-phase-10i-pagination-display-1` were present.
6. Opened My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
7. Verified Equipment showed `New thalmann`.
8. Verified Messages still showed the Phase 9I QA thread.
9. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new pagination display script loads, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
No visible app errors were found. No browser warning/error logs were captured. Current Salem data did not exceed pagination thresholds, so no pagination bars were visible in this smoke pass.

Conclusion:

- Phase 10I local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 10J.

## LFES Phase 10J Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 10I pagination display helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change page click handling, page state mutation, localStorage updates, filtering, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-114423`
- `MaintainOps-github-clean-20260520-114423.zip`

GitHub deploy:

- Commit: `a0f48e3`
- Commit message: `Extract pagination display helpers`

Live resource verification:

- Live `index.html` references `src/render/paginationDisplay.js?v=lfes-phase-10i-pagination-display-1`.
- Live `index.html` references `app.js?v=lfes-phase-10i-pagination-display-1`.
- Live `src/render/paginationDisplay.js?v=lfes-phase-10i-pagination-display-1`: HTTP 200.
- Live `app.js?v=lfes-phase-10i-pagination-display-1`: HTTP 200.
- Hosted Resource Load Smoke against live GitHub Pages: PASS.

GitHub Actions:

- GitHub connector check for commit `a0f48e3` returned no workflow runs.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

TEST:
Phase 10J signed-in live pagination display smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10j-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/paginationDisplay.js?v=lfes-phase-10i-pagination-display-1` and `app.js?v=lfes-phase-10i-pagination-display-1` were present.
6. Opened My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
7. Verified Equipment showed `New thalmann`.
8. Verified Messages still showed the Phase 9I QA thread.
9. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new pagination display script loads, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
No visible app errors were found. No browser warning/error logs were captured. Current Salem data did not exceed pagination thresholds, so no pagination bars were visible in this smoke pass.

Conclusion:

- Phase 10J package/upload and live verification: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- Behavior changed: no observed behavior change.
- Phase 10H/10I/10J is functionally closed.

## LFES Phase 10L Parts Display Local Verification - 2026-05-20

Scope:

- Added `src/render/partsDisplay.js`.
- Moved only `renderPart`, `renderPartsHealth`, and `renderPartSearch` into the display helper module.
- Did not move part detail, source manager, part create/edit/use/restock/document forms beyond existing returned markup, click/open handling, search submit handling, inventory filter click handling, localStorage updates, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Local implementation:

- `index.html` now references `src/render/partsDisplay.js?v=lfes-phase-10l-parts-display-1`.
- `index.html` now references `app.js?v=lfes-phase-10l-parts-display-1`.
- Resource Load Smoke now includes `src/render/partsDisplay.js`.
- `app.js` line count after extraction: 10,215.

TEST:
Phase 10L static and local resource checks

RESULT:
PASS

Verified:

- `node --check app.js`: PASS.
- `node --check supabase-config.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check` across `src/utils`, `src/services`, and `src/render`: PASS.
- Local Resource Load Smoke against `http://127.0.0.1:4294/`: PASS.

TEST:
Phase 10L signed-in local parts display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-10l-parts-display-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/partsDisplay.js?v=lfes-phase-10l-parts-display-1` and `app.js?v=lfes-phase-10l-parts-display-1` were present.
6. Opened My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
7. Verified Equipment showed `New thalmann`.
8. Verified Parts Inventory rendered two `.parts-health` controls, one `#part-search-form`, and the All Parts / Low Stock labels.
9. Verified Messages still showed the Phase 9I QA thread.
10. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new parts display script loads, Parts Inventory display controls render, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
No visible app errors were found. No browser warning/error logs were captured. Current Salem data had zero visible part cards in the smoke pass, so the empty-state path was observed alongside the Parts health/search controls.

Conclusion:

- Phase 10L local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 10M.

## LFES Phase 10M Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 10L Parts display helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change part detail, source manager, part create/edit/use/restock/document forms beyond existing returned markup, click/open handling, search submit handling, inventory filter click handling, localStorage updates, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-115838`
- `MaintainOps-github-clean-20260520-115838.zip`

GitHub deploy:

- Commit: `affeabb`
- Commit message: `Extract parts display helpers`

Live resource verification:

- Live `index.html` references `src/render/partsDisplay.js?v=lfes-phase-10l-parts-display-1`.
- Live `index.html` references `app.js?v=lfes-phase-10l-parts-display-1`.
- Live `src/render/partsDisplay.js?v=lfes-phase-10l-parts-display-1`: HTTP 200.
- Live `app.js?v=lfes-phase-10l-parts-display-1`: HTTP 200.
- Hosted Resource Load Smoke against live GitHub Pages: PASS.

GitHub Actions:

- GitHub connector check for commit `affeabb` returned no workflow runs.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

TEST:
Phase 10M signed-in live Parts display smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10m-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/partsDisplay.js?v=lfes-phase-10l-parts-display-1` and `app.js?v=lfes-phase-10l-parts-display-1` were present.
6. Opened My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
7. Verified Equipment showed `New thalmann`.
8. Verified Parts Inventory rendered two `.parts-health` controls, one `#part-search-form`, and the All Parts / Low Stock labels.
9. Verified Messages still showed the Phase 9I QA thread.
10. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new Parts display script loads, Parts Inventory display controls render, core sections load, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
No visible app errors were found. No browser warning/error logs were captured. Current Salem data had zero visible part cards in the smoke pass, so the empty-state path was observed alongside the Parts health/search controls.

Conclusion:

- Phase 10M package/upload and live verification: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- Behavior changed: no observed behavior change.
- Phase 10K/10L/10M is functionally closed.

## LFES Phase 10O Option Display Local Verification - 2026-05-20

Scope:

- Added `src/render/optionDisplay.js`.
- Moved only `renderLocationOptions`, `renderAssetOptions`, `renderParentAssetOptions`, and `assetOptionLabel` into the display helper module.
- Did not move location switching, asset routing warnings, filtering logic, hierarchy checks, form submit handling, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Local implementation:

- `index.html` now references `src/render/optionDisplay.js?v=lfes-phase-10o-option-display-1`.
- `index.html` now references `app.js?v=lfes-phase-10o-option-display-1`.
- Resource Load Smoke now includes `src/render/optionDisplay.js`.
- `app.js` line count after extraction: 10,204.

TEST:
Phase 10O static and local resource checks

RESULT:
PASS

Verified:

- `node --check app.js`: PASS.
- `node --check supabase-config.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check` across `src/utils`, `src/services`, and `src/render`: PASS.
- Local Resource Load Smoke against `http://127.0.0.1:4294/`: PASS.

TEST:
Phase 10O signed-in local option display smoke

STEPS:
1. Opened local app at `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-10o-option-display-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/optionDisplay.js?v=lfes-phase-10o-option-display-1` and `app.js?v=lfes-phase-10o-option-display-1` were present.
6. Verified request asset select rendered 2 options.
7. Verified create equipment parent select rendered 2 options.
8. Verified create equipment location select rendered 5 options.
9. Verified PM asset select rendered 2 options.
10. Verified team invite default location select rendered 5 options.
11. Verified Messages still showed the Phase 9I QA thread.
12. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Signed-in workspace loads, Salem remains active, the new option display script loads, location/equipment option lists render in existing forms, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 10O local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 10P.

## LFES Phase 10P Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 10O option display helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change location switching, asset routing warnings, filtering logic, hierarchy checks, form submit handling, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-122031`
- `MaintainOps-github-clean-20260520-122031.zip`

GitHub deploy:

- Commit: `0b100fa`
- Commit message: `Extract option display helpers`

Live resource verification:

- Live `index.html` references `src/render/optionDisplay.js?v=lfes-phase-10o-option-display-1`.
- Live `index.html` references `app.js?v=lfes-phase-10o-option-display-1`.
- Live `src/render/optionDisplay.js?v=lfes-phase-10o-option-display-1`: HTTP 200.
- Live `app.js?v=lfes-phase-10o-option-display-1`: HTTP 200.
- Hosted Resource Load Smoke against live GitHub Pages: PASS.

GitHub Actions:

- GitHub connector check for commit `0b100fa` returned no workflow runs.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

TEST:
Phase 10P signed-in live option display smoke

STEPS:
1. Opened live app at `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10p-live-20260520`.
2. Verified signed-in workspace restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR was selected.
5. Verified `src/render/optionDisplay.js?v=lfes-phase-10o-option-display-1` and `app.js?v=lfes-phase-10o-option-display-1` were present.
6. Verified request asset select rendered 2 options.
7. Verified create equipment parent select rendered 2 options.
8. Verified create equipment location select rendered 5 options.
9. Verified PM asset select rendered 2 options.
10. Verified team invite default location select rendered 5 options.
11. Verified Messages still showed the Phase 9I QA thread.
12. Checked browser warning/error logs available through the browser connection.

EXPECTED:
Live signed-in workspace loads, Salem remains active, the new option display script loads, location/equipment option lists render in existing forms, no visible app errors appear, and no actionable console errors appear.

RESULT:
PASS

NOTES:
No visible app errors were found. No browser warning/error logs were captured.

Conclusion:

- Phase 10P package/upload and live verification: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- Behavior changed: no observed behavior change.
- Phase 10N/10O/10P is functionally closed.

## LFES Phase 10R Setup Display Local Verification - 2026-05-20

Scope:

- Added `src/render/setupDisplay.js`.
- Moved only `renderSetupItem` into the display helper module.
- Did not move `setupItems`, setup action handling, SQL-applied flag behavior, localStorage updates, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Local implementation:

- `index.html` now references `src/render/setupDisplay.js?v=lfes-phase-10r-setup-display-1`.
- `index.html` now references `app.js?v=lfes-phase-10r-setup-display-1`.
- Resource Load Smoke now includes `src/render/setupDisplay.js`.
- `app.js` line count after extraction: 10,197.

TEST:
Phase 10R static and local resource checks

RESULT:
PASS

Verified:

- `node --check app.js`: PASS.
- `node --check supabase-config.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check` across `src/utils`, `src/services`, and `src/render`: PASS.
- Local Resource Load Smoke against `http://127.0.0.1:4294/`: PASS.

TEST:
Phase 10R signed-in local setup display smoke

RESULT:
PASS

Verified:

- signed-in workspace restored.
- Taylor Metal Products loaded.
- Salem, OR was selected.
- `src/render/setupDisplay.js?v=lfes-phase-10r-setup-display-1` and `app.js?v=lfes-phase-10r-setup-display-1` were present.
- Admin Setup opened and rendered 16 `.setup-item` cards.
- Admin Setup included `Supabase config` and `Photos`.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

Conclusion:

- Phase 10R local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 10S.

## LFES Phase 10S Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 10R setup display helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change `setupItems`, setup action handling, SQL-applied flag behavior, localStorage updates, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-123706`
- `MaintainOps-github-clean-20260520-123706.zip`

GitHub deploy:

- Commit: `f09abd2`
- Commit message: `Extract setup display helper`

Live resource verification:

- Live `index.html` references `src/render/setupDisplay.js?v=lfes-phase-10r-setup-display-1`.
- Live `index.html` references `app.js?v=lfes-phase-10r-setup-display-1`.
- Live `src/render/setupDisplay.js?v=lfes-phase-10r-setup-display-1`: HTTP 200.
- Live `app.js?v=lfes-phase-10r-setup-display-1`: HTTP 200.
- Hosted Resource Load Smoke against live GitHub Pages: PASS.

TEST:
Phase 10S signed-in live setup display smoke

RESULT:
PASS

Verified:

- Taylor Metal Products loaded.
- Salem, OR was selected.
- new setup display script and app cache tag loaded.
- Admin Setup opened and rendered 16 `.setup-item` cards.
- Admin Setup included `Supabase config` and `Photos`.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

Conclusion:

- Phase 10S package/upload and live verification: PASS.
- Behavior changed: no observed behavior change.
- GitHub connector check for commit `f09abd2` returned no workflow runs.

## LFES Phase 10U Request Photo Display Local Verification - 2026-05-20

Scope:

- Added `src/render/requestPhotoDisplay.js`.
- Moved only `renderMaintenanceRequestPhoto` into the display helper module.
- Did not move request submit handling, request conversion, Quick Fix request behavior, request delete controls, photo upload/optimization/storage code, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Local implementation:

- `index.html` now references `src/render/requestPhotoDisplay.js?v=lfes-phase-10u-request-photo-display-1`.
- `index.html` now references `app.js?v=lfes-phase-10u-request-photo-display-1`.
- Resource Load Smoke now includes `src/render/requestPhotoDisplay.js`.
- `app.js` line count after extraction: 10,187.

TEST:
Phase 10U static and local resource checks

RESULT:
PASS

Verified:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local Requests smoke: PASS.
- Requests opened successfully.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

Conclusion:

- Phase 10U local extraction: PASS.
- Behavior changed: no observed behavior change.
- Package/upload: next Phase 10V.

## LFES Phase 10V Package/Upload And Live Verification - 2026-05-20

Scope:

- Packaged and uploaded the stable LFES Phase 10U request photo display helper extraction to GitHub Pages.
- Did not move additional helpers.
- Did not change request submit handling, request conversion, Quick Fix request behavior, request delete controls, photo upload/optimization/storage code, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Package:

- `MaintainOps-github-clean-20260520-124047`
- `MaintainOps-github-clean-20260520-124047.zip`

GitHub deploy:

- Commit: `0b889c8`
- Commit message: `Extract request photo display helper`

Live resource verification:

- Live `index.html` references `src/render/requestPhotoDisplay.js?v=lfes-phase-10u-request-photo-display-1`.
- Live `index.html` references `app.js?v=lfes-phase-10u-request-photo-display-1`.
- Live `src/render/requestPhotoDisplay.js?v=lfes-phase-10u-request-photo-display-1`: HTTP 200.
- Live `app.js?v=lfes-phase-10u-request-photo-display-1`: HTTP 200.
- Hosted Resource Load Smoke against live GitHub Pages: PASS.

TEST:
Phase 10V signed-in live request photo display smoke

RESULT:
PASS

Verified:

- Taylor Metal Products loaded.
- Salem, OR was selected.
- new request photo display script and app cache tag loaded.
- Requests opened successfully.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

Conclusion:

- Phase 10V package/upload and live verification: PASS.
- Behavior changed: no observed behavior change.
- GitHub connector check for commit `0b889c8` returned no workflow runs.
- Phase 10Q/10R/10S and Phase 10T/10U/10V are functionally closed.

## LFES Phase 10W Through 11Q Display Extraction Continuation - 2026-05-20

Scope:

- Continued tiny display-only modularization from Phase 10W through Phase 11Q.
- Added display modules for message nav badge, app issue reports, work-order messages, work recommendations, command cards, work command summary, and missing work-order detail fallback.
- Did not move workflow logic, event handlers, mutations, auth/session/company/location logic, Supabase SQL/RLS, storage/photo/document flows, Quick Fix, request conversion, delete guards, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Shipped commits:

- Phase 10Y: `7a8baa9` - `Extract message badge display helper`
- Phase 11B: `edfed5c` - `Extract app issue report display helper`
- Phase 11E: `6fc7453` - `Extract work message display helpers`
- Phase 11H: `2452bc0` - `Extract work recommendation display helper`
- Phase 11K: `1e333ba` - `Extract command card display helpers`
- Phase 11N: `fdb3325` - `Extract work command display helper`
- Phase 11Q: `3c31d77` - `Extract missing work detail display helper`

Latest package:

- `MaintainOps-github-clean-20260520-131510`
- `MaintainOps-github-clean-20260520-131510.zip`

Latest implementation:

- `index.html` now references `src/render/missingWorkDetailDisplay.js?v=lfes-phase-11p-missing-work-detail-display-1`.
- `index.html` now references `app.js?v=lfes-phase-11p-missing-work-detail-display-1`.
- Resource Load Smoke now includes `src/render/missingWorkDetailDisplay.js`.
- `app.js` line count after Phase 11P extraction: 10,093.

TEST:
Phase 11Q static, hosted resource, and signed-in live smoke

RESULT:
PASS

Verified:

- static JS checks passed in source and publish worktrees.
- local Resource Load Smoke passed.
- hosted GitHub Pages Resource Load Smoke passed.
- live `src/render/missingWorkDetailDisplay.js?v=lfes-phase-11p-missing-work-detail-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-11p-missing-work-detail-display-1`: HTTP 200.
- Taylor Metal Products loaded.
- Salem, OR was visible in the active workspace selector.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

Notes:

- Work command cards and missing work-order fallback were not naturally visible in the current healthy signed-in Salem view, so smoke verified module loading and unchanged signed-in workspace behavior.
- GitHub connector checks returned no workflow runs for `fdb3325` and `3c31d77`.

Conclusion:

- The requested 20-phase continuation target was completed and intentionally rounded out to a full packaged/live-verified cycle.
- Behavior changed: no observed behavior change.

## LFES Phase 11R Through 11W Display Extraction Continuation - 2026-05-20

Scope:

- Continued the same low-risk LFES modularization loop after Phase 11Q.
- Added `src/render/partSourceDisplay.js` and moved only `renderPartSourceOptions` and `renderPartSourceManager`.
- Added `src/render/assetCardDisplay.js` and moved only `renderAssetCard`.
- Did not move part source rename behavior, source toggles, equipment detail forms, Quick Fix actions, hierarchy mutation logic, delete guards, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Shipped commits:

- Phase 11T: `50d40f0` - `Extract part source display helpers`
- Phase 11W: `3e68c82` - `Extract asset card display helper`

Latest package:

- `MaintainOps-github-clean-20260520-132436`
- `MaintainOps-github-clean-20260520-132436.zip`

Latest implementation:

- `index.html` now references `src/render/assetCardDisplay.js?v=lfes-phase-11v-asset-card-display-1`.
- `index.html` now references `app.js?v=lfes-phase-11v-asset-card-display-1`.
- Resource Load Smoke now includes `src/render/assetCardDisplay.js`.
- `app.js` line count after Phase 11V extraction: 10,055.

TEST:
Phase 11W static, hosted resource, and signed-in live smoke

RESULT:
PASS

Verified:

- static JS checks passed in source and publish worktrees.
- local Resource Load Smoke passed.
- hosted GitHub Pages Resource Load Smoke passed.
- live `src/render/assetCardDisplay.js?v=lfes-phase-11v-asset-card-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-11v-asset-card-display-1`: HTTP 200.
- Taylor Metal Products loaded.
- Salem, OR was visible in the active workspace selector.
- Equipment opened and rendered 1 `.asset-card`.
- Messages still showed the Phase 9I QA thread after Equipment navigation.
- no visible app errors.
- no browser warning/error logs.

Notes:

- Salem Parts view currently had 0 parts, so Phase 11T verified the Parts Inventory view, Add Part source/vendor datalist, and Edit sources control rather than existing source options.
- GitHub connector checks returned no workflow runs for `50d40f0` and `3e68c82`.

Conclusion:

- Phase 11R through 11W is functionally closed.
- Behavior changed: no observed behavior change.

## LFES Phase 11X Through 12R Display Extraction Continuation - 2026-05-20

Scope:

- Continued the low-risk LFES modularization loop for 21 phase steps, from Phase 11X through Phase 12R.
- Added display modules for procedure select options, message thread buttons, app issue panel wrapper, message thread labels, message composer scope text, invite default-location labels, and part setup warning text.
- Did not move request/work cards, assignment controls, delete zones, auth/startup views, public QR flows, forms with mutations, Quick Fix, request conversion, PM generation, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Shipped commits:

- Phase 11Z: `76a9b7d` - `Extract procedure options display helper`
- Phase 12C: `e286d6e` - `Extract message thread button display helper`
- Phase 12F: `84d2d3b` - `Extract app issue panel display helper`
- Phase 12I: `56f46b4` - `Extract message thread label display helpers`
- Phase 12L: `7eb5c6c` - `Extract message composer display helper`
- Phase 12O: `2c01a71` - `Extract invite location display helper`
- Phase 12R: `eef5e1c` - `Extract part setup display helper`

Latest package:

- `MaintainOps-github-clean-20260520-134626`
- `MaintainOps-github-clean-20260520-134626.zip`

Latest implementation:

- `index.html` now references `src/render/partSetupDisplay.js?v=lfes-phase-12q-part-setup-display-1`.
- `index.html` now references `app.js?v=lfes-phase-12q-part-setup-display-1`.
- Resource Load Smoke now includes `src/render/partSetupDisplay.js`.
- `app.js` line count after Phase 12Q extraction: 10,042.

TEST:
Phase 12R static, hosted resource, and signed-in live smoke

RESULT:
PASS

Verified:

- static JS checks passed in source and publish worktrees.
- local Resource Load Smoke passed.
- hosted GitHub Pages Resource Load Smoke passed.
- live `src/render/partSetupDisplay.js?v=lfes-phase-12q-part-setup-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-12q-part-setup-display-1`: HTTP 200.
- Taylor Metal Products loaded.
- Salem, OR was visible in the active workspace selector.
- Parts Inventory opened and Add Part rendered.
- part setup warning text was empty because part cost/source readiness flags are healthy.
- Messages still showed the Phase 9I QA thread after Parts navigation.
- no visible app errors.
- no browser warning/error logs.

Notes:

- Phase 12H initially exposed a local runtime load-order issue after extracting message thread labels; it was fixed before deployment by instantiating the label helper before helpers that receive `messageThreadScopeLabel`.
- GitHub connector checks returned no workflow runs for latest app commits, including `eef5e1c`.

Conclusion:

- The requested 21 phase steps completed without an `ACTION NEEDED` stop.
- Behavior changed: no observed behavior change.

## Medium-Risk Authority Boundary - Workspace Filter/Pagination Events - 2026-05-21

Scope:

- Started the `bindWorkspaceEvents()` hard-zone decomposition under LFES controls.
- Mapped the current `bindWorkspaceEvents()` selector surface before implementation: 934 function lines and 121 selector bindings.
- Extracted one named event-binding group only: workspace filter and pagination events.
- Added `src/utils/workspaceFilterPaginationEvents.js?v=lfes-authority-filter-pagination-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-filter-pagination-events-1`.
- Updated hosted resource smoke coverage.
- Added `.env.local` to `.gitignore` for local-only test credential config. No password or token was committed.

Hard-boundary ranking:

- Safe-to-medium: already isolated workspace search/exact search, global search navigation, work-section jumps, and future pure read-only local navigation helpers.
- Medium-risk: filter/pagination events, detail/open navigation, team member work-view filters.
- High-risk: command routing, message center, work-order status/assignment/delete/downtime, request conversion/Quick Fix/delete, parts restock/use/edit/delete/documents, asset/PM/procedure/team/settings forms.
- Do-not-touch-yet: auth/session/company/location startup, Quick Fix creation flow, request conversion, public QR submit/admin flow, storage/photo/document/logo flows, SQL/RLS, broad `renderWorkspace()`, broad `bindWorkspaceEvents()`.

Selected boundary:

- `[data-status-filter]`
- `[data-my-work-filter]`
- `[data-work-order-filter]`
- `[data-clear-assignee-filter]`
- `[data-work-sort]`
- `[data-request-filter]`
- `[data-work-page]`
- `[data-parts-page]`
- `[data-assets-page]`
- `[data-list-page]`

Why it is hard:

- The moved listeners mutate local view/page/filter state, persist localStorage keys, invalidate exact-search cache state, and choose between `reloadWorkOrderQueue()`, `reloadRequestQueue()`, and `renderWorkspace()`.

Why it is recoverable:

- The boundary is non-mutating against business data and does not submit forms, delete, upload, route auth/startup, alter SQL/RLS, convert requests, create Quick Fix work, or move broad render/event authority.
- `app.js` still owns state through injected getters/setters.
- Rollback is direct: revert `ceb8ba6`, or remove the module/script/resource-smoke entry and restore the original listener blocks plus prior cache tag.

Verification:

- static JS checks: PASS for `app.js`, `src/utils/workspaceFilterPaginationEvents.js`, and `tests/smoke/resource-load.spec.js`.
- targeted mock-DOM smoke: PASS for all ten moved selector groups, including disabled request-filter no-op behavior, request pagination reload behavior, page increments, storage writes/removals, cache invalidation, and render/reload call choices.
- local browser boot smoke: PASS with the new script/cache tags present and the binder available on `window`.
- local hosted resource smoke: PASS.
- live GitHub Pages resource smoke: PASS.
- signed-in live smoke using the dedicated QA/test account: PASS.
- live smoke verified deployed script tags, successful login, Work Orders sort storage, Work Orders filter storage, Requests status switch, request filter storage, and no relevant page errors.
- GitHub Actions resource smoke: NOT AVAILABLE; GitHub connector returned no workflow runs for `ceb8ba6`.

Result:

- deploy commit: `ceb8ba6` (`Extract workspace filter pagination events`).
- `app.js` line count moved from 9,093 to 9,046.
- Behavior changed: no observed behavior change.

LFES catch:

- Copied browser profiles were unreliable for fresh auth because active browser storage did not flush predictably. The stable path is to use the dedicated QA/test account directly for Playwright login while keeping credentials out of committed docs/code.

## Medium-Risk Authority Boundary - Workspace Detail Navigation Events - 2026-05-21

Scope:

- Continued `bindWorkspaceEvents()` hard-zone decomposition under LFES controls.
- Extracted one named event-binding group only: workspace detail/open navigation events.
- Added `src/utils/workspaceDetailNavigationEvents.js?v=lfes-authority-detail-navigation-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-detail-navigation-events-1`.
- Updated hosted resource smoke coverage.

Selected boundary:

- `#back-to-my-work`
- `#back-to-equipment`
- `.work-card`
- `.asset-card`
- `[data-open-asset]`
- `[data-asset-id]`
- `[data-mini-work-order]`

Why it is hard:

- The moved listeners change active detail state, active section state, pending delete state, Quick Fix/create mode flags, issue-report mode, localStorage active-section persistence, and `renderWorkspace()` sequencing.

Why it is recoverable:

- The boundary is UI navigation only and does not mutate business data.
- No form submit, delete, upload, auth/session/company/location startup, public QR submit, Quick Fix creation, request conversion, storage/photo/document flow, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` movement occurred.
- `app.js` remains the state owner through injected getters/setters.
- Rollback is direct: revert `ef69559`, or remove the module/script/resource-smoke entry and restore the original listener blocks plus prior cache tag.

Verification:

- static JS checks: PASS for `app.js`, `src/utils/workspaceDetailNavigationEvents.js`, and `tests/smoke/resource-load.spec.js`.
- targeted mock-DOM smoke: PASS for all moved selector groups, including back actions, work-card open, asset-card open, inline asset open with stop propagation, `[data-asset-id]` click and keyboard activation, non-open keyboard no-op, mini work-order open, storage writes, and render calls.
- local browser boot smoke: PASS with the new script/cache tags present and the binder available on `window`.
- local hosted resource smoke: PASS.
- live GitHub Pages resource smoke: PASS.
- signed-in live smoke using the dedicated QA/test account: PASS.
- live smoke verified deployed script tags, successful login, Work Orders card open/back behavior, Equipment card open/back behavior, active Assets section persistence, and no relevant page errors.
- GitHub Actions resource smoke: NOT AVAILABLE; GitHub connector returned no workflow runs for `ef69559`.

Result:

- deploy commit: `ef69559` (`Extract workspace detail navigation events`).
- `app.js` line count moved from 9,046 to 8,986.
- Behavior changed: no observed behavior change.

LFES catch:

- Work-order detail open state is not persisted to localStorage. Live smoke must assert visible detail/back-button DOM state for work detail navigation rather than expecting a storage key.

## GitHub Actions Verification Gap Closed - 2026-05-21

Issue:

- Recent phase reports treated GitHub Actions as `NOT AVAILABLE` because the GitHub connector workflow lookup returned no runs for pushed commits.

Root cause:

- The workflow was active and passing. The gap was the verification method, not GitHub Actions.
- Direct GitHub Actions API lookup showed `Resource Load Smoke` push runs completed successfully for recent commits, including `ceb8ba6`, `ef69559`, and `9f8bbed`.

Fix:

- Added `scripts/verify-github-actions-run.js`.
- Added package script `npm run test:smoke:github-actions`.
- The script queries GitHub's Actions runs API for the current commit and waits for `Resource Load Smoke` to complete successfully.

Verification:

- `node --check scripts/verify-github-actions-run.js`: PASS.
- `npm run test:smoke:github-actions`: PASS for current HEAD `9f8bbed`.
- Confirmed run: `https://github.com/loufish727/MaintainOps/actions/runs/26244086777`.

Process update:

- Future LFES phases should use `npm run test:smoke:github-actions` for push-run verification.
- The GitHub connector commit workflow lookup may still be useful for PR-specific checks, but it should not be treated as authoritative evidence for normal push workflow runs.

## Authority Contract Phase - 2026-05-21

Scope:

- Added explicit LFES contract comments to current event-boundary modules.
- Added first state-boundary planning document.

Files:

- `src/utils/workspaceSearchEvents.js`
- `src/utils/workspaceFilterPaginationEvents.js`
- `src/utils/workspaceDetailNavigationEvents.js`
- `docs/LFES/audits/STATE_BOUNDARY_PLAN_2026-05-21.md`

Result:

- Event modules now state what they bind, what they may call, what app.js still owns, and what they must not touch.
- The recommended first state boundary is workspace UI state only.
- RLS/security audit is explicitly separated from modularization.

Behavior changed:

- No runtime behavior change intended.

## Safe-to-Medium Authority Boundary - Workspace Inventory Filter Events - 2026-05-21

Scope:

- Extracted the remaining read-only part/equipment filter bindings before moving workspace UI state into a factory.
- Added `src/utils/workspaceInventoryFilterEvents.js?v=lfes-authority-inventory-filter-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-inventory-filter-events-1`.
- Updated hosted resource smoke coverage.
- Deliberately left part search text handling in `app.js`; it has focus restoration and text-input behavior and should be a separate boundary if moved.

Moved event contracts:

- `[data-part-inventory-filter]`
- `[data-asset-status-filter]`

Risk:

- Safe-to-medium.
- The moved handlers update local filter state, persist localStorage keys, reset local pages, and render.
- They do not create, edit, delete, upload, submit forms, route auth/startup, touch Supabase/RLS, or mutate business records.

Verification:

- static JS checks: PASS for `app.js`, `src/utils/workspaceInventoryFilterEvents.js`, and `tests/smoke/resource-load.spec.js`.
- targeted mock-DOM event smoke: PASS for part inventory filter storage/reset/render and asset status toggle-to-filter/toggle-to-all behavior.
- local hosted resource smoke: PASS.
- local browser boot smoke: PASS.
- hosted GitHub Pages resource smoke: PASS.
- signed-in live smoke with QA/test account: PASS.
- live smoke verified deployed script tags, binder presence, part filter storage change to `low`, asset status filter storage change to `running`, asset status toggle back to `all`, and no relevant page errors.
- GitHub Actions verifier: PASS for `2b4ad8e`.

Result:

- deploy commit: `2b4ad8e` (`Extract workspace inventory filter events`).
- `app.js` line count moved from 8,986 to 8,985.
- Behavior changed: no observed behavior change.

Process note:

- This intentionally prioritizes sequencing over line count. It closes the event/state asymmetry before a workspace UI state factory owns `partInventoryFilter` and `assetStatusFilter`.

## LFES Phase 16D Through 16I Utility Extraction - 2026-05-21

Scope:

- Extracted schema error predicates into `src/utils/schemaErrors.js`.
- Extracted the setup error response wrapper into `src/utils/operationResults.js`.
- Stopped with `ACTION NEEDED` after Phase 16I because remaining candidates crossed into mutation payloads, auth/public flows, readiness side effects, or workflow state.

Shipped commits:

- `f78d84a` - `Extract schema error utility helpers`
- `abb1b80` - `Extract setup error response helper`
- `4bc023e` - `Document phase 16 utility safety stop`

Latest package:

- `MaintainOps-github-clean-20260521-085044`
- package path: `C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages`

TEST:
Phase 16I static, helper, hosted resource, and signed-in live smoke

RESULT:
PASS

Verified:

- `node --check app.js`: PASS.
- `node --check src/utils/schemaErrors.js`: PASS.
- `node --check src/utils/operationResults.js`: PASS.
- direct helper-output smokes passed.
- local resource checks passed before package/upload.
- hosted GitHub Pages resources passed after propagation.
- live app showed authenticated shell with Louie, Work, Parts, and Team visible.
- hosted files confirmed `src/utils/operationResults.js` exported `MaintainOpsOperationResults`, live `app.js` imported it, and the old inline `withSetupError` function was absent.

Notes:

- GitHub connector returned no workflow runs for the latest app/doc commits. This is not a GitHub Actions PASS.
- Behavior changed: no observed behavior change.

Conclusion:

- Phase 16D through 16I closed with an intentional `ACTION NEEDED` safety stop.

## LFES Phase 17A Through 17C Operation Timeout Boundary - 2026-05-21

Scope:

- After architecture review, extracted only `withOperationTimeout` into `src/utils/operationTimeout.js`.
- Did not change timeout values, call sites, Supabase calls, mutation handlers, auth flows, storage flows, public QR flows, message flows, work-order workflow logic, readiness flags, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Shipped commits:

- `db77ffd` - `Extract operation timeout utility`
- `8764fc5` - `Document operation timeout boundary`

Latest package:

- `MaintainOps-github-clean-20260521-090143`
- package path: `C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages`

TEST:
Phase 17C static, timeout helper, hosted resource, and signed-in live smoke

RESULT:
PASS

Verified:

- `node --check app.js`: PASS.
- `node --check src/utils/operationTimeout.js`: PASS.
- direct timeout helper smoke passed for resolved promise and timeout rejection message.
- local resource smoke passed.
- hosted resource checks passed after GitHub Pages propagation.
- live signed-in smoke passed with authenticated shell, Louie, Work, Parts, and Team visible.
- hosted files confirmed `src/utils/operationTimeout.js` exported `MaintainOpsOperationTimeout`, live `app.js` imported it, and the old inline `withOperationTimeout` function was absent.

Notes:

- Browser page-global probing was unreliable in the in-app browser, but resource/file probes and successful app boot verified the script/import path.
- GitHub connector returned no workflow runs for `db77ffd`. This is not a GitHub Actions PASS.
- `app.js` line count after Phase 17B: 9,677.
- Behavior changed: no observed behavior change.

Conclusion:

- Phase 17C closed cleanly.
- Next extraction must be an explicit boundary with targeted behavior smoke, not another automatic 21-phase run.

## LFES Documentation Source-of-Truth Cleanup - 2026-05-21

Scope:

- Reviewed LFES process, standards, case studies, documentation entry points, package artifacts, and GitHub/repo reviewability before high-risk work.
- Restored full LFES standards to the current top-level `docs/LFES` tree.
- Removed tracked `MaintainOps-github-clean-*` package snapshots from the publish repo.
- Added package artifact ignore rules.
- Documented why the drift happened and how to prevent it.

TEST:
Documentation/process consistency review

RESULT:
PASS WITH CORRECTIONS

Corrected:

- `docs/CURRENT_HANDOFF.md` now points at Phase 17C state instead of stale Phase 16C state.
- `docs/NEXT_STEPS.md` now names the current explicit-boundary decision instead of stale Phase 9P work.
- `docs/LFES/context/CODEX_LFES_EXECUTION_HANDOFF.md` now reflects the post-Phase-17C process.
- `docs/LFES/CORE_STANDARD.md`, `docs/LFES/GOLD_STANDARD.md`, `docs/LFES/standards/*`, `docs/LFES/audit/*`, `docs/LFES/templates/*`, and `docs/LFES/traceability/*` are present at top level.
- `docs/LFES/context/DOCUMENTATION_DRIFT_REVIEW_2026-05-21.md` records the root cause and prevention rule.
- `.gitignore` excludes future `MaintainOps-github-clean-*` folders and zips.

Notes:

- Root cause: package/export artifacts were committed into the publish repo, and rapid phase execution updated the modularization plan more consistently than restart docs and QA log.
- External package artifacts remain available under `C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages`.

Conclusion:

- The LFES work discipline held, but documentation entry points drifted. This cleanup restores source-of-truth clarity before high-risk items.

## LFES Phase 15X Through 16C Error Display Extraction - 2026-05-20

Scope:

- Continued with a smaller 6-step LFES modularization run, from Phase 15X through Phase 16C.
- Added pure error display helpers for message-center errors and app issue report errors.
- Left readiness mutations in `app.js`: `messagesReady = false` and `appIssueReportsReady = false` were not moved.
- Did not move message creation, reply sending, read-state mutation, issue report creation/update/reload, forms, event handlers, workflows, Supabase SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Shipped commits:

- Phase 15Z: `f90f376` - `Extract message center error display helper`
- Phase 16C: `09ef977` - `Extract app issue error display helper`

Latest package:

- `MaintainOps-github-clean-20260520-161159`
- `MaintainOps-github-clean-20260520-161159.zip`
- Stored under `C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages`

Latest implementation:

- `index.html` now references `src/render/appIssueErrorDisplay.js?v=lfes-phase-16b-app-issue-error-display-1`.
- `index.html` now references `app.js?v=lfes-phase-16b-app-issue-error-display-1`.
- `app.js` line count after Phase 16B extraction: 9,711.

TEST:
Phase 16C static, hosted resource, and signed-in live smoke

RESULT:
PASS

Verified:

- static JS checks passed for `app.js`, `src/render/messageCenterErrorDisplay.js`, and `src/render/appIssueErrorDisplay.js`.
- targeted local helper-output smokes passed for message-center schema/generic errors and app-issue schema/generic errors.
- local resource checks passed before each package/upload.
- hosted GitHub Pages resources passed for the final Phase 16C deploy.
- live `src/render/appIssueErrorDisplay.js?v=lfes-phase-16b-app-issue-error-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-16b-app-issue-error-display-1`: HTTP 200.
- Taylor Metal Products loaded.
- Salem, OR was visible.
- Louie was visible.
- signed-in workspace rendered with Work, Parts, and Team nav available.
- no browser warning/error logs after filtering known benign noise.

Notes:

- GitHub Pages again served `app.js` before the newly added module path; final verification waited until the new module returned HTTP 200.
- GitHub connector checks returned no workflow runs for the latest app commits, including `09ef977`.

Conclusion:

- The requested smaller 6-step run completed without an `ACTION NEEDED` stop.
- Behavior changed: no observed behavior change.

## LFES Phase 15C Through 15W Display Extraction Continuation - 2026-05-20

Scope:

- Continued the medium-risk LFES modularization loop for 21 phase steps, from Phase 15C through Phase 15W.
- Added display modules for work-order sorting, active-location filtering, message thread filtering/unread counts, setup readiness status, work-order status matching, work-order search values, and the My Work queue helper.
- Preserved the tightened review boundary: no workflow logic, event handlers, mutations, auth/session/company/location startup, Supabase SQL/RLS, storage/photo/document flows, Quick Fix, request conversion, delete actions, delete confirmations, public QR flows, PM generation, forms with mutations, assignment controls, `renderWorkspace()`, or `bindWorkspaceEvents()` were moved.

Shipped commits:

- Phase 15E: `51092d8` - `Extract work order sort display helpers`
- Phase 15H: `ef12207` - `Extract location filter display helpers`
- Phase 15K: `fb9ba71` - `Extract message thread filter display helpers`
- Phase 15N: `b62799d` - `Extract setup status display helper`
- Phase 15Q: `d0da94c` - `Extract work order status filter display helper`
- Phase 15T: `fd96990` - `Extract work order search display helper`
- Phase 15W: `3a9f4be` - `Extract my work queue display helper`

Latest package:

- `MaintainOps-github-clean-20260520-155625`
- `MaintainOps-github-clean-20260520-155625.zip`
- Stored under `C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages`

Latest implementation:

- `index.html` now references `src/render/myWorkQueueDisplay.js?v=lfes-phase-15v-my-work-queue-display-1`.
- `index.html` now references `app.js?v=lfes-phase-15v-my-work-queue-display-1`.
- `app.js` line count after Phase 15V extraction: 9,705.

TEST:
Phase 15W static, hosted resource, and signed-in live smoke

RESULT:
PASS

Verified:

- static JS checks passed for `app.js` and each new render module.
- targeted local helper-output smokes passed for all seven extraction cycles.
- local resource checks passed before each package/upload.
- hosted GitHub Pages resources passed for the final Phase 15W deploy.
- live `src/render/myWorkQueueDisplay.js?v=lfes-phase-15v-my-work-queue-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-15v-my-work-queue-display-1`: HTTP 200.
- Taylor Metal Products loaded.
- Salem, OR was visible.
- Louie was visible.
- signed-in workspace rendered with Work, Parts, and Team nav available.
- no browser warning/error logs after filtering known benign noise.

Notes:

- Local signed-in browser smoke remains unavailable on temporary localhost origins because the browser is signed out there; local verification used syntax, resource, and direct helper-output checks, with signed-in behavior gated on live smoke.
- GitHub Pages continued to show a predictable propagation lag where `index.html`/`app.js` advanced before newly added module paths served 200; each deploy was verified only after the new module path served successfully.
- GitHub connector checks returned no workflow runs for the latest app commits, including `3a9f4be`.
- `myWorkQueueOrders` appears unused in the current main render path, but it was moved intact and direct-smoked to preserve behavior if reactivated.

Conclusion:

- The requested 21 phase steps completed without an `ACTION NEEDED` stop.
- Behavior changed: no observed behavior change.

## LFES Phase 14H Through 15B Display/Search Extraction Continuation - 2026-05-20

Scope:

- Continued the medium-risk LFES modularization loop for 21 phase steps, from Phase 14H through Phase 15B.
- Added or extended display modules for request filtering/counts, asset hierarchy filtering, part inventory filtering, team member filtering, maintenance list filtering, dashboard metrics, and shared search predicates.
- Did not move workflow logic, event handlers, mutations, auth/session/company/location logic, Supabase SQL/RLS, storage/photo/document flows, Quick Fix, request conversion, delete actions, delete confirmations, public QR flows, PM generation, forms with mutations, assignment controls, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Shipped commits:

- Phase 14J: `d5bbfe9` - `Extract request filter display helpers`
- Phase 14M: `bed7851` - `Extract asset hierarchy display helpers`
- Phase 14P: `6e99df9` - `Extract part filter display helpers`
- Phase 14S: `85029c7` - `Extract team member filter display helper`
- Phase 14V: `65aaa6a` - `Extract maintenance list display helpers`
- Phase 14Y: `01f547b` - `Extract dashboard metrics display helpers`
- Phase 15B: `1242284` - `Extract search filter display helpers`

Latest package:

- `MaintainOps-github-clean-20260520-152322`
- `MaintainOps-github-clean-20260520-152322.zip`

Latest implementation:

- `index.html` now references `src/render/searchFilterDisplay.js?v=lfes-phase-15a-search-filter-display-1`.
- `index.html` now references `app.js?v=lfes-phase-15a-search-filter-display-1`.
- `app.js` line count after Phase 15A extraction: 9,854.

TEST:
Phase 15B static, hosted resource, and signed-in live smoke

RESULT:
PASS

Verified:

- static JS checks passed for `app.js` and each new or updated render module.
- targeted local helper-output smokes passed for all seven extraction cycles.
- local resource checks passed before each package/upload.
- hosted GitHub Pages resources passed for the final Phase 15B deploy.
- live `src/render/searchFilterDisplay.js?v=lfes-phase-15a-search-filter-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-15a-search-filter-display-1`: HTTP 200.
- Taylor Metal Products loaded.
- Salem, OR was visible.
- Louie was visible.
- signed-in workspace rendered with Work, Parts, and Team nav available.
- no browser warning/error logs after filtering known benign noise.

Notes:

- Local signed-in browser smoke remains unavailable on temporary localhost origins because the browser is signed out there; local verification used syntax, resource, and direct helper-output checks, with signed-in behavior gated on live smoke.
- GitHub Pages/browser propagation lag appeared intermittently; new paths or fresh script tags sometimes needed 30-90 seconds before fresh tabs saw them.
- GitHub connector checks returned no workflow runs for the latest app commits, including `1242284`.

Conclusion:

- The requested 21 phase steps completed without an `ACTION NEEDED` stop.
- Behavior changed: no observed behavior change.

## LFES Phase 12S Through 13M Display Extraction Continuation - 2026-05-20

Scope:

- Continued the low-risk LFES modularization loop for 21 phase steps, from Phase 12S through Phase 13M.
- Added display modules for team member names, team workload chips, active location labels, downtime email copy text, setup error messages, work-order save error messages, and assignment labels.
- Did not move request/work cards, assignment controls, assignment mutations, delete zones, auth/startup views, public QR flows, forms with mutations, Quick Fix, request conversion, PM generation, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Shipped commits:

- Phase 12U: `7c2d1e9` - `Extract team member display helper`
- Phase 12X: `2237404` - `Extract team workload display helper`
- Phase 13A: `05364be` - `Extract location display helper`
- Phase 13D: `92cd812` - `Extract downtime email display helper`
- Phase 13G: `31ec687` - `Extract setup error display helper`
- Phase 13J: `d3b8e63` - `Extract work order error display helper`
- Phase 13M: `10516dc` - `Extract assignment display helper`

Latest package:

- `MaintainOps-github-clean-20260520-141451`
- `MaintainOps-github-clean-20260520-141451.zip`

Latest implementation:

- `index.html` now references `src/render/assignmentDisplay.js?v=lfes-phase-13l-assignment-display-1`.
- `index.html` now references `app.js?v=lfes-phase-13l-assignment-display-1`.
- Resource Load Smoke now includes `src/render/assignmentDisplay.js`.
- `app.js` line count after Phase 13L extraction: 10,011.

TEST:
Phase 13M static, hosted resource, and signed-in live smoke

RESULT:
PASS

Verified:

- static JS checks passed in source and publish worktrees.
- local resource checks passed for each new module.
- hosted GitHub Pages Resource Load Smoke passed for the final Phase 13M deploy.
- live `src/render/assignmentDisplay.js?v=lfes-phase-13l-assignment-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-13l-assignment-display-1`: HTTP 200.
- Taylor Metal Products loaded.
- Salem, OR was visible.
- signed-in workspace rendered with Work, Team, and Messages nav available.
- no browser warning/error logs.

Notes:

- Local signed-in browser smoke was unavailable on the temporary localhost origins because the browser was signed out there; local verification used syntax and resource checks, with signed-in behavior gated on live smoke.
- Browser click automation was intermittently slow during Phase 13G live smoke, so the accepted smoke used passive signed-in workspace assertions plus clean console.
- GitHub connector checks returned no workflow runs for the latest app commits, including `10516dc`.

Conclusion:

- The requested 21 phase steps completed without an `ACTION NEEDED` stop.
- Behavior changed: no observed behavior change.

## LFES Phase 13N Through 14G Display Extraction Continuation - 2026-05-20

Scope:

- Continued the medium-risk LFES modularization loop for 21 phase steps, from Phase 13N through Phase 14G.
- Added display modules for work-order description text, work-order change summaries, activity feed aggregation, part inventory low-stock filtering, part usage rows, open request queue filtering, and delete-blocker messages.
- Did not move request/workflow mutations, request conversion, Quick Fix, delete actions, delete confirmations, blocker queries, auth/startup, public QR flows, forms with mutations, PM generation, event handlers, Supabase SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()`.

Shipped commits:

- Phase 13P: `7053b85` - `Extract work order description display helper`
- Phase 13R: `8c0393d` - `Extract work order change display helper`
- Phase 13U: `a8c0333` - `Extract activity feed display helper`
- Phase 13X: `6985a70` - `Extract part inventory display helper`
- Phase 14A: `381bbc3` - `Extract part usage display helper`
- Phase 14D: `ac9a3fa` - `Extract request queue display helper`
- Phase 14G: `1a17d36` - `Extract delete blocker display helper`

Latest package:

- `MaintainOps-github-clean-20260520-145833`
- `MaintainOps-github-clean-20260520-145833.zip`

Latest implementation:

- `index.html` now references `src/render/deleteBlockerDisplay.js?v=lfes-phase-14f-delete-blocker-display-1`.
- `index.html` now references `app.js?v=lfes-phase-14f-delete-blocker-display-1`.
- `app.js` line count after Phase 14F extraction: 9,969.

TEST:
Phase 14G static, hosted resource, and signed-in live smoke

RESULT:
PASS

Verified:

- static JS checks passed for `app.js` and each new render module.
- targeted local helper-output smokes passed for description text, change summaries, activity ordering, low-stock filtering, part usage rows, submitted request filtering, and delete-blocker message text.
- local resource checks passed for each new module before package/upload.
- hosted GitHub Pages resources passed for the final Phase 14G deploy.
- live `src/render/deleteBlockerDisplay.js?v=lfes-phase-14f-delete-blocker-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-14f-delete-blocker-display-1`: HTTP 200.
- Taylor Metal Products loaded.
- Salem, OR was visible.
- signed-in workspace rendered with Work, Parts, and Team nav available.
- no browser warning/error logs after filtering known benign noise.

Notes:

- Local signed-in browser smoke remains unavailable on temporary localhost origins because the browser is signed out there; local verification used syntax, resource, and direct helper-output checks, with signed-in behavior gated on live smoke.
- GitHub Pages briefly returned 404 for newly added render modules immediately after deploy, then served them successfully on retry after propagation.
- GitHub connector checks returned no workflow runs for the latest app commits, including `1a17d36`.

Conclusion:

- The requested 21 phase steps completed without an `ACTION NEEDED` stop.
- Behavior changed: no observed behavior change.
