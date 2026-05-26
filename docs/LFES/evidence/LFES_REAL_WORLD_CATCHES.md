# LFES Real-World Catches

This file records real engineering discoveries, prevented failures, or operational risks found while working on MaintainOps.

Do not add theoretical examples. Only document issues actually observed in MaintainOps.

## 2026-05-26 - Clipboard Copy Smoke Needed Conditional Reset Wait

- Date: 2026-05-26.
- Phase/build: work-order downtime copy event-boundary extraction.
- Issue discovered: the first signed-in live smoke sampled the copy buttons after a fixed sleep and saw `Copy failed` still displayed.
- How it was discovered: diagnostic inspection shortly afterward showed both buttons had reset to `Copy Subject` and `Copy Email Body`. A corrected smoke that waited conditionally for the reset labels passed.
- Operational risk: fixed sleeps can create false failures around browser clipboard fallback behavior, especially when automation permission or focus causes `document.execCommand("copy")` to take longer than expected.
- What LFES principle exposed it: targeted live smoke, observable behavior over timing assumptions, and verification-scope clarity.
- What prevented escalation: the failed smoke stopped the phase, diagnosis proved the app had reset correctly, and the smoke was corrected before closeout.
- Fix applied or recommended: future clipboard/copy smokes should assert immediate result state, then wait for the final label condition with a timeout instead of sleeping for the nominal reset delay.
- Lessons learned: browser APIs can make UI feedback timing less deterministic than the code's timer value suggests. Smokes should wait for user-visible end states.

## 2026-05-26 - Assignment Smoke Needed Role-Aware Coverage

- Date: 2026-05-26.
- Phase/build: high-risk work-order assignment event-boundary extraction.
- Issue discovered: the dedicated QA/test account correctly had no assignment controls for the live `Hydralic Leak` work order, so it could not provide assignment mutation/restore coverage.
- How it was discovered: the signed-in smoke found zero `[data-card-assign]` and zero `[data-assign-me]` controls for the QA/test role, while a manager/admin browser session showed both controls.
- Operational risk: using only one test role can make a mutation path look untestable or broken when authorization is actually working. Conversely, testing only manager/admin could miss hidden-control expectations for lower-privilege users.
- What LFES principle exposed it: role-aware verification, permission-boundary visibility, and targeted live smoke.
- What prevented escalation: the phase stopped after the insufficient-coverage finding, then split coverage by role: QA/test account for hidden controls and manager/admin session for mutation plus restore.
- Fix applied or recommended: future assignment smokes must state the role used. Use technician-style accounts for denied/hidden-control checks and manager/admin sessions for mutation/restore checks.
- Lessons learned: mutation-adjacent event extraction must verify both event behavior and permission visibility. The right smoke account is part of the contract.

## 2026-05-26 - Quick Status Smoke Expected The Wrong Post-Mutation Surface

- Date: 2026-05-26.
- Phase/build: high-risk quick work-order status event-boundary extraction.
- Issue discovered: the first signed-in live smoke treated the status list card as the expected post-click surface after a quick-status mutation. The app actually sets `activeWorkOrderId` and re-renders Work Order Detail after a successful status change.
- How it was discovered: the smoke changed `Hydralic Leak` from `in_progress` to `open`, then failed while waiting for the list card to reflect the new status. Live diagnosis showed the mutation had succeeded and the app had moved to Work Order Detail with status `open`.
- Operational risk: a false failed smoke could trigger an unnecessary rollback or hide the real post-mutation contract. For mutation-adjacent refactors, the smoke itself can become stale if it does not model the workflow's intended navigation.
- What LFES principle exposed it: observable behavior over assumptions, targeted live smoke, and verification-scope clarity.
- What prevented escalation: LFES stopped the phase after the smoke failure, diagnosed before further extraction, confirmed no app regression, restored the work order to `in_progress`, and reran a corrected mutation/restore smoke.
- Fix applied or recommended: future quick-status smokes must assert Work Order Detail status after mutation and restore using the detail quick-status control. Do not require the original list card to remain visible after this workflow.
- Lessons learned: high-risk event extraction can preserve code behavior while exposing stale test assumptions. Mutation smokes must verify the actual user journey, not only the selector surface that starts the mutation.

## 2026-05-21 - Documentation Source-of-Truth Drift Before High-Risk Work

- Date: 2026-05-21.
- Phase/build: post Phase 17C operation-timeout boundary and LFES process review.
- Issue discovered: implementation discipline remained strong, but current restart docs and LFES standards were split. `APP_JS_MODULARIZATION_PLAN.md` was current through Phase 17C, while `CURRENT_HANDOFF.md`, `NEXT_STEPS.md`, and `QA_LOG.md` lagged. Full LFES standards were present inside committed package snapshots instead of the current top-level `docs/LFES` tree.
- How it was discovered: user requested a full LFES/process/documentation review before high-risk items. Repo review showed stale Phase 9/16 restart docs, missing top-level standards folders, and 3,369 tracked files under `MaintainOps-github-clean-*`.
- Operational risk: a future AI, coder reviewer, or operator could start from stale instructions, miss LFES standards, or treat old package snapshots as current source. Verification language could also drift by implying GitHub Actions passed when only hosted resource checks were performed.
- What LFES principle exposed it: reviewability, traceability, engineering memory, and verification-scope clarity.
- What prevented escalation: the review was run before high-risk extraction. No app behavior was changed.
- Fix applied or recommended: restore top-level LFES standards, update current handoff/next steps/QA log, remove tracked package snapshots, add `.gitignore` rules for package artifacts, and create an explicit package artifact policy.
- Lessons learned: fast phase execution can preserve code safety while still drifting documentation if source-of-truth docs are not part of every closeout. High-risk work must begin with documentation alignment.

## 2026-05-20 - Phase 9B - New Helper Script Deployed With Stale App.js Cache Tag

- Date: 2026-05-20
- Phase/build: LFES Phase 9B relationship display-helper extraction.
- Issue discovered: `src/render/relationshipDisplay.js` deployed correctly and live `index.html` referenced it, but `app.js` initially still used the older `app.js?v=lfes-phase-6d-parts-rpc-1` cache tag.
- How it was discovered: during live GitHub Pages verification, the new helper file returned HTTP 200, but the browser still had stale orchestration behavior risk because the `app.js` cache tag had not changed with the extraction.
- Operational risk: some browsers could keep using an older cached `app.js` that did not initialize the newly extracted helper module. That can create live-only failures even when the new file exists and static checks pass.
- What LFES principle exposed it: deployment-state traceability, verification visibility, and controlled evolution.
- What prevented escalation: Phase 9B required live script checks plus signed-in smoke after deployment. The stale cache tag was caught before Phase 9B was closed.
- Fix applied or recommended: updated `index.html` to load `app.js?v=lfes-phase-9b-relationship-1`, redeployed, verified live `index.html`, live `app.js`, live `relationshipDisplay.js`, live signed-in smoke, and GitHub Actions Resource Load Smoke.
- Lessons learned: extracted script deploys must verify both new helper script tags and the `app.js` cache tag. File presence alone is not enough; the orchestration script must also be forced current.

## 2026-05-19 - Phase 8D - Pilot Queue Trust Risk From Stale Setup / QA Data

- Date: 2026-05-19
- Pilot context: controlled Taylor Metal Products / Salem, OR pilot readiness and day-one monitoring.
- Issue: the live Salem active Work Orders queue still showed `Test 1`, and Admin Setup showed historical QA issue reports. Team also showed an older pending invite with `Default location: first available`.
- Operational risk: pilot users may treat visible active work and issue reports as live operational truth. Stale setup/test records can reduce trust, hide real pilot issues, or cause work to be discussed/updated incorrectly.
- How LFES exposed it: Phase 8C monitoring identified `Test 1` as an ambiguous active work order; Phase 8D performed a focused pilot cleanliness review instead of proceeding with broader rollout.
- Severity: Medium for pilot trust if users begin relying on the queues without cleanup/context; Low if reviewed and cleaned before broader pilot use.
- Fix or mitigation: no cleanup was performed in Phase 8D. Recommended mitigation is an approved app-UI cleanup pass for `Test 1` work/equipment if confirmed stale, review/cancel the stale pending invite if no longer intended, and decide whether historical QA issue reports should remain as evidence or be archived/cleaned through approved paths.
- Lessons learned: a technically working app can still lose operational trust if live pilot surfaces contain ambiguous setup or QA records. Pilot readiness must include data cleanliness, not just code and workflow smoke tests.

Phase 8E update:

- Mitigation applied: `Test 1` work order and `Test 1` equipment were deleted through normal app UI paths after review confirmed they were setup/demo/test-like data.
- Evidence: Work Orders now shows only `Hydralic Leak` in the active Salem queue, and Equipment now shows only `New thalmann`.
- Still open: pending invite `jeffrey.kinkaid@taylormetal.com` still has default location `first available`; Admin Setup still contains 9 historical QA issue reports; Admin Setup still shows the documented `Admin delete protection` readiness warning.
- Lesson reinforced: cleanup should be done through the same operational UI paths users rely on when possible, because it tests deletion protections while improving pilot trust.

Phase 8F update:

- Follow-up finding: active pilot queues remained clean after Phase 8E, but the pending invite default-location ambiguity is still present.
- Onboarding risk: `first available` is not acceptable for Taylor Metal Products Salem-first pilot onboarding because it can recreate location confusion for a new user.
- Recommended mitigation: cancel/reissue or otherwise correct the `jeffrey.kinkaid@taylormetal.com` invite with Salem, OR as explicit default before using it for pilot onboarding.
- Issue-report visibility: historical QA reports should remain as evidence for now, but future Live / QA / Archived filtering would reduce pilot admin confusion.

Phase 8G update:

- Mitigation applied: the old `jeffrey.kinkaid@taylormetal.com` invite with `Default location: first available` was canceled through Team UI.
- Corrected invite created: `jeffrey.kinkaid@taylormetal.com`, role Manager, `Default location: Salem, OR`, created through Team UI.
- Evidence: Team showed the corrected pending invite with `Default location: Salem, OR`; Salem remained active; Work Orders, Equipment, Parts, Requests, Team, and Admin Setup loaded without browser warning/error logs.
- Remaining boundary: actual invite acceptance and first-login default-location behavior still need to be verified by the recipient or a controlled test recipient.

## 2026-05-19 - Phase 6A - Parts Usage Is Not Transaction-Safe Yet

- Issue discovered: recording a part on a work order and decrementing inventory are separate database operations.
- How it was discovered: LFES Phase 6A created a disposable QA part, restocked it, used it from inventory, recorded it on a disposable QA work order, and verified the resulting quantity and `work_order_parts` row.
- Operational risk: if the `work_order_parts` insert succeeds but the stock update fails, or if two users record usage at the same time, inventory history and quantity on hand can diverge.
- LFES principle exposed it: mutation-boundary traceability, operational continuity, and failure-state visibility.
- What prevented escalation: Phase 6A used disposable QA records, verified final state, and cleaned up the request, work order, relationship row, and part after testing.
- Fix applied or recommended: no code or SQL fix applied in Phase 6A. Recommended next phase is parts transaction/RPC planning so work-order part usage and stock decrement happen atomically.
- Lessons learned: a workflow can pass live smoke and still expose a higher-grade operational trust gap. Passing the happy path is not the same as proving mutation atomicity.

Phase 6D update:

- Fix applied: `public.record_work_order_part_usage` was created in Phase 6C, then `addPartUsageToWorkOrder(...)` was updated in Phase 6D to call the RPC instead of separately inserting `work_order_parts` and updating `parts.quantity_on_hand`.
- Evidence: local Work Order Detail smoke recorded `QA Phase6D RPC Part 20260519-6D-1779214388252` as used and changed visible quantity from `50 on hand` to `29 on hand` through the app path.
- Remaining boundary: this closes the transaction gap for work-order part usage. Parts-screen Restock and inventory-only Use still remain separate client-side updates and should be handled in a future phase only if live operations require that stronger guarantee.

## 2026-05-19 - Live Testing - Password Recovery Link Had No App Handler

- Issue discovered: Supabase password recovery links returned to the app, but MaintainOps did not have a screen to set a new password from a recovery session.
- How it was discovered: while preparing a technician test account, the user sent a password reset and the resulting recovery link did not lead to a usable in-app reset flow.
- Operational risk: test users and live users could become locked out or require manual Supabase/admin intervention, delaying role QA and live pilot support.
- LFES principle exposed it: operational continuity, recovery-path visibility, and auth-boundary traceability.
- What prevented escalation: the issue was handled before technician guardrail testing continued, and the recovery token itself was not stored in docs.
- Fix applied or recommended: added a login `Forgot password?` screen, Supabase reset email request, recovery-link detection, `Set New Password` screen, password confirmation validation, `updateUser` call, and recovery URL cleanup.
- Lessons learned: account recovery is part of the operational auth boundary. A sign-in flow is incomplete if users cannot recover access without leaving the app process.

## 2026-05-18 - Phase 2K / 2L - Auburn First-Load Default Location

- Issue discovered: fresh/no-saved-location sessions selected Auburn, WA even though Taylor Metal Products expected Salem, OR as the operational default.
- How it was discovered: LFES live browser verification cleared scoped and legacy active-location localStorage keys and reloaded the GitHub Pages app.
- Operational risk: new work, requests, PM, equipment, or live testing could begin in the wrong branch before the user noticed.
- LFES principle exposed it: assumption traceability and operational-state persistence visibility.
- What prevented escalation: the Phase 2K analysis paused deeper workflow extraction, mapped the location precedence chain, and identified that `company_members.default_location_id` was null.
- Fix applied or recommended: Phase 2L ran a data-only Supabase SQL update setting Taylor members with null default location to Salem, OR. No app code, schema, or RLS changes were needed.
- Lessons learned: location defaulting is an operational boundary, not a cosmetic preference. Fresh-profile behavior must be tested separately from saved-location behavior.

## 2026-05-18 - Phase 2L - App Client Could Not Apply Admin Data Fix

- Issue discovered: attempting the default-location data fix through the signed-in app Supabase client affected 0 rows even though the app could read the rows.
- How it was discovered: an app-side Supabase update equivalent to the approved SQL returned no error but verification still showed all Taylor member defaults as null.
- Operational risk: relying on app-side admin-style updates could create false confidence that data fixes were applied.
- LFES principle exposed it: security-boundary traceability and verification visibility.
- What prevented escalation: the verification SELECT/app read was run immediately after the attempted update and caught the 0-row result.
- Fix applied or recommended: the prepared SQL was run through the Supabase SQL Editor/admin dashboard as `postgres`, then verified again.
- Lessons learned: data fixes crossing RLS-sensitive tables should use an explicit admin path and must always include a verification SELECT.

## 2026-05-19 - Phase 3A - renderWorkspace / bindWorkspaceEvents Responsibility Concentration

- Issue discovered: `renderWorkspace()` and `bindWorkspaceEvents()` define most screen composition, event contracts, global state transitions, and mutation entry points.
- How it was discovered: Phase 3A scanned `app.js` for rendering, event binding, state persistence, and mutation call sites.
- Operational risk: moving mutations before mapping render/event contracts could break buttons, forms, reload behavior, or location-scoped workflows without obvious syntax failures.
- LFES principle exposed it: controlled evolution, dependency visibility, and reviewer cognitive-load reduction.
- What prevented escalation: Phase 3A stopped at architecture mapping and recommended an event-contract inventory before deeper extraction.
- Fix applied or recommended: no code fix applied. Recommended next phase is Phase 3B event-contract inventory, planning only.
- Lessons learned: a file can become more modular at the service layer while still being operationally coupled at the render/event/state layer.

## 2026-05-19 - Phase 3B - Hidden DOM/Event Contract Inventory Gap

- Issue discovered: signed-in workspace workflows depend on 126 listener registrations in `bindWorkspaceEvents()`, while auth/public QR intake and signed-in request submit also use top-level or renderer-local listeners outside that function.
- How it was discovered: Phase 3B statically inventoried listener selectors, rendered IDs, and `data-*` attributes in `app.js`.
- Operational risk: future extraction could move a workflow handler while missing the DOM contract that reaches it, causing silent button/form failures without syntax errors.
- LFES principle exposed it: dependency visibility, operational continuity, and verification-boundary visibility.
- What prevented escalation: Phase 3B stopped at documentation, created `LFES_PHASE_3B_EVENT_CONTRACT_INVENTORY.md`, and kept workflow extraction blocked.
- Fix applied or recommended: no app code fix applied. Recommended next phase is a smoke-test matrix and contract guard plan before moving workflow handlers.
- Lessons learned: markup selectors, `data-*` attributes, and event handlers are part of the architecture. They need the same traceability as service wrappers and database boundaries.

## 2026-05-19 - Phase 3C - Missing Workflow Smoke Matrix Before Handler Extraction

- Issue discovered: the app had broad debug protocol coverage, but the exact workflow smoke tests tied to high-risk DOM/event contracts were not centralized before handler extraction.
- How it was discovered: Phase 3C converted the Phase 3B event inventory into workflow-specific smoke tests and contract guards.
- Operational risk: a handler extraction could pass static checks while breaking a real user path such as Quick Fix, request conversion, public QR submit, delete confirmation, or safety-check completion.
- LFES principle exposed it: verification visibility, controlled evolution, and operational continuity.
- What prevented escalation: Phase 3C stopped at planning and created `LFES_PHASE_3C_SMOKE_TEST_MATRIX.md` before workflow handlers moved.
- Fix applied or recommended: no app code fix applied. Recommended next phase is state ownership mapping before any workflow extraction.
- Lessons learned: the Debug Protocol needs phase-specific smoke paths when a refactor touches event contracts, because general app loading is not enough evidence for workflow continuity.

## 2026-05-19 - Phase 3D - Global State Ownership Concentration

- Issue discovered: `app.js` has 100 top-level mutable state variables spanning session, company, location, lists, filters, relationship maps, pending deletes, and workflow modes.
- How it was discovered: Phase 3D statically inventoried top-level `let` declarations and localStorage mirrors in `app.js`.
- Operational risk: moving workflow handlers before state ownership is explicit could desynchronize active location, selected detail records, pending delete confirmations, relationship maps, or reload filters.
- LFES principle exposed it: assumption traceability, dependency visibility, controlled evolution, and operational continuity.
- What prevented escalation: Phase 3D stopped at documentation and created `LFES_PHASE_3D_STATE_OWNERSHIP_MAP.md`.
- Fix applied or recommended: no app code fix applied. Recommended next phase is render ownership mapping before workflow extraction.
- Lessons learned: state ownership is a separate architecture boundary from service wrappers. A codebase can have cleaner data services while still being tightly coupled through shared mutable state.

## 2026-05-19 - Phase 3E - Render Output Is A Behavior Contract

- Issue discovered: many `render*` functions create mutation forms, delete confirmations, public QR boundaries, storage upload forms, and desktop/mobile command contracts rather than display-only HTML.
- How it was discovered: Phase 3E inventoried 83 render functions and the IDs, classes, and `data-*` attributes they emit.
- Operational risk: extracting or renaming render helpers could break workflow entry points even if the JavaScript still parses and services still work.
- LFES principle exposed it: render-contract traceability, dependency visibility, and controlled evolution.
- What prevented escalation: Phase 3E stopped at documentation and created `LFES_PHASE_3E_RENDER_OWNERSHIP_MAP.md`.
- Fix applied or recommended: no app code fix applied. Recommended next phase is an implementation-readiness decision before any render/helper movement.
- Lessons learned: renderers that emit forms, behavior classes, or `data-*` actions must be treated as part of workflow architecture, not just UI markup.

## 2026-05-19 - Phase 3F - Code Movement Was Technically Possible But Not Highest Value

- Issue discovered: low-risk render helper extraction is technically possible, but the evidence shows live smoke coverage and role guardrail verification are more valuable before additional code movement.
- How it was discovered: Phase 3F compared Phase 3A-3E maps, the Phase 2H mutation plan, and the current live-testing context.
- Operational risk: continuing modularization could improve structure while failing to prove technician guardrails, location persistence, and work-order workflows still behave correctly for real users.
- LFES principle exposed it: proportional rigor, verification visibility, and operational relevance.
- What prevented escalation: Phase 3F stopped at a readiness decision and did not approve code extraction.
- Fix applied or recommended: run LFES Phase 4A live smoke and technician assignment guardrail verification before more refactor.
- Lessons learned: the safest next engineering step is not always the smallest code change; during live testing, evidence from user workflows can be more valuable than additional modularity.

## 2026-05-19 - Phase 5A - Render Helper False-Safe Coupling

- Issue discovered: several render helpers that initially looked like low-risk display helpers actually emit behavior hooks or read global workflow state.
- How it was discovered: Phase 5A inspected specific helper bodies before approving render extraction candidates.
- Operational risk: moving or renaming helpers such as `renderGaugeReadout`, `renderWorkloadStrip`, pagination renderers, or request photo preview could break filters, paging, signed photo links, or relationship visibility while still passing syntax checks.
- LFES principle exposed it: render-contract traceability, hidden dependency visibility, and controlled evolution.
- What prevented escalation: Phase 5A stopped at planning, separated `SAFE FIRST EXTRACTION` from `SECRETLY COUPLED`, and kept broad render extraction blocked.
- Fix applied or recommended: no app code fix applied. Recommended Phase 5B should move only `renderMetric`, `renderInsight`, and `renderRoleGuide` first, with static checks and signed-in smoke verification.
- Lessons learned: a helper is not safe because it is short. It is safe only if it does not carry behavior contracts, global state assumptions, or operational workflow dependencies.

## 2026-05-20 - Phase 9E - Resource Smoke Can Race GitHub Pages Deployment

- Issue discovered: the GitHub Actions Resource Load Smoke failed on commit `0ce9a80` because it checked live GitHub Pages while Pages was still serving the previous Phase 9D `index.html`.
- How it was discovered: Phase 9E package/upload pushed the new `iconDisplay.js` resource list, and the workflow failed with `index.html should reference src/render/iconDisplay.js`; direct live checks shortly afterward confirmed Phase 9E was serving correctly.
- Operational risk: a valid deployment could show a false CI failure if the smoke test checks the live site before GitHub Pages finishes publishing the new commit.
- LFES principle exposed it: deployment-state traceability, verification visibility, and operational continuity.
- What prevented escalation: the failure was investigated before reporting success, live `index.html` and `src/render/iconDisplay.js` were checked directly, and the smoke test was updated to retry while Pages catches up.
- Fix applied or recommended: updated `tests/smoke/resource-load.spec.js` to retry hosted resource checks for a short window before failing.
- Lessons learned: hosted smoke tests that validate GitHub Pages must account for publish lag, especially when a push triggers the smoke workflow and Pages deployment concurrently.

## 2026-05-26 - Work-Order Completion Smoke - Native Step Validation Can Block Handler Evidence

- Issue discovered: a live completion smoke used `actual_minutes = 3`, but the completion form input has `step="5"`, so native browser validation blocked form submission before the extracted handler ran.
- How it was discovered: the disposable work order remained `New`, no completion notice appeared, and there were no console errors. Inspecting the form showed `actual_minutes` was the invalid field.
- Operational risk: a smoke can falsely report a handler regression when the browser never dispatched submit. This is especially easy to miss after handler extraction because the form values remain visible and the page looks idle rather than broken.
- What prevented escalation: the disposable work order was still safe to reuse, the smoke was rerun with `actual_minutes = 5`, and the completion path then moved the record to `Completed` with timestamp, minutes, notes, and resolution visible.
- Fix or mitigation: future completion smokes must use step-compatible minute values such as `5`, `10`, or `15`, or explicitly assert native validation when testing invalid inputs.
- Lessons learned: mutation smokes must respect the rendered form contract, not just the JavaScript handler contract.

## 2026-05-26 - Work-Order Completion Cleanup - Lower-Page Locator Clicks Can Stall

- Issue discovered: high-level browser locator clicks intermittently stalled on lower-page operational buttons such as `Complete Work Order`, `Delete Work Order`, and `Permanently Delete`, even though DOM evidence showed the buttons existed and were enabled.
- How it was discovered: live completion and cleanup smokes timed out while waiting on locator click commands. Coordinate clicks worked after recording button rect evidence and scrolling the target into view.
- Operational risk: a valid workflow can look blocked because automation cannot click a lower-page control, especially during cleanup of disposable mutation records.
- What prevented escalation: no app code change was made for the automation limitation; the smoke recorded DOM/rect state, used valid form input, scrolled the confirmation button into view, completed the disposable work order, and deleted it through the app UI.
- Fix or mitigation: for authorized disposable live smokes, prefer stable locators first. If a lower-page locator click stalls, record DOM/rect evidence, scroll into view, use coordinate click, and document the deviation.
- Lessons learned: automation mechanics are part of the smoke contract. A click timeout is not automatically an app regression, but it must be diagnosed before proceeding.

## 2026-05-26 - Work-Order Delete Smoke - Browser Text Entry Can Be Blocked By Clipboard Layer

- Issue discovered: the in-app browser could click and inspect the live app, but `fill`, `type`, and DOM text-entry paths failed because the browser automation virtual clipboard was unavailable.
- How it was discovered: the Quick Fix issue field focused correctly, the page had no warning/error logs, but text entry failed before the disposable delete-smoke record could be created through the UI.
- Operational risk: a live smoke can become blocked by automation setup even when the app workflow under test is healthy. For delete testing, this is risky because an abandoned disposable setup record would pollute live queues.
- What prevented escalation: a disposable work order was created through authenticated Supabase REST as setup only, then all changed delete behavior was verified through the live app UI: detail open, delete warning, cancel, reopen warning, permanent delete, list disappearance, and authenticated data-layer deletion proof.
- Fix or mitigation: if browser text entry is unavailable, setup data may be created through an authenticated API path only when the actual boundary under test is still exercised through the app UI and cleanup/deletion proof is recorded.
- Lessons learned: distinguish setup mechanics from the workflow boundary under test. The setup path may vary when automation is degraded, but the changed operational path still needs live UI evidence.

## 2026-05-26 - Parts Detail Local Smoke - Python Server Shim Caused Timeout

- Issue discovered: local resource smoke timed out because `python -m http.server` did not start a server; on this Windows machine `python` resolves to the Microsoft Store shim.
- How it was discovered: direct `Invoke-WebRequest` checks to `http://127.0.0.1:4184/` failed, and the server stderr reported that Python was not found.
- Operational risk: a verifier infrastructure failure can look like an app/resource regression and waste the timeout window, especially when the smoke loops for Pages-style propagation.
- What prevented escalation: the failed local server was diagnosed before deployment, a local Node static-server method was used instead, and the same resource smoke passed against localhost before hosted verification.
- Fix or mitigation: do not use `python -m http.server` in this environment. Use the established local Node static-server method for future local LFES smokes.
- Lessons learned: when a local resource smoke times out, first prove the server is listening and serving the new resource before investigating application code.

## 2026-05-26 - Follow-Up Work Event Smoke - Setup Record Was Not UI-Visible

- Issue discovered: a completed source work order inserted through authenticated REST did not appear in the Planning follow-up list, so no `[data-create-follow-up]` button rendered for live verification.
- How it was discovered: hosted resources loaded correctly and the signed-in manager/admin workspace opened, but the Planning section contained no follow-up controls and did not show the disposable source title.
- Operational risk: an event-binding extraction for a mutation path could appear technically correct while the real live smoke never exercises the changed handler. Continuing would leave an unverified mutation boundary deployed.
- What prevented escalation: LFES stopped the phase, attempted cleanup, observed direct REST cleanup was blocked by RLS for the setup auth context, reverted the behavior commit, and documented the smoke/setup mismatch before moving on.
- Fix or mitigation: do not use direct REST inserts as follow-up smoke setup unless the test also proves the row is loaded into the `workOrders` state consumed by `followUpItems()`. Follow-up extraction requires a visible follow-up card and an authorized cleanup path before deploy.
- Lessons learned: setup data is not automatically smoke data. For state-derived UI lists, the setup path must prove both persistence and presence in the exact client-side state slice that renders the control under test.
