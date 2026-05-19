# MaintainOps QA Log

This file summarizes important QA passes and remaining test priorities.

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
  - `actions/checkout@v4`
  - `actions/setup-node@v4` with Node `20` and npm cache
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
