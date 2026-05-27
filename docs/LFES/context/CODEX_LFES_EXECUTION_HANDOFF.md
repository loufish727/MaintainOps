# Codex LFES Execution Handoff

Codex is now the primary LFES execution agent for MaintainOps.

The separate planning chat should be used only for:

- second-opinion review
- big architectural judgment calls
- external critique
- difficult risk tradeoff discussion
- explaining strategy in plain English

Codex may own:

- determining the next LFES phase
- writing the next prompt internally
- applying LFES constraints
- updating docs
- running checks
- stopping when risk increases
- reporting blocked or not verified states

## Current LFES Status

MaintainOps is in supervised pilot territory.

Current active technical direction:

- continue explicit boundary review for each next module movement; do not resume automatic large batch extraction unless the boundary is already proven low-risk and smokes are defined.

Most recent deployed closed phase:

- HIGH-risk auth verification callback phase in `41a0fe9` after the RLS hardening checkpoint.

Most recent local completed phase:

- Hard-boundary Create Work Order renderer extraction is complete locally and pending deployment verification. It moved `renderCreateWorkOrder` to `src/render/createWorkOrderDisplay.js`, reducing `app.js` to 7,627 lines. The boundary is renderer-only; event binding, submit handling, payload construction, inserts, photo upload, part usage, comment creation, auth/session/company/location state, storage, public QR, SQL, and RLS remain in `app.js`/existing event modules. Static checks, targeted renderer smoke, and New Work Order / Asset location warning event regression smokes passed.
- Hard-boundary Message Center renderer extraction in `e4380ec` moved `renderMessageCenter` to `src/render/messageCenterDisplay.js`, reducing `app.js` to 7,706 lines. The boundary is renderer-only; event binding, message read-state writes, thread creation, reply submission, auth/session/company/location state, storage, public QR, SQL, and RLS remain in `app.js`/existing event modules. Static checks, targeted renderer smoke, message event regression smokes, hosted resource smoke, and GitHub Actions Resource Load Smoke passed.
- Hard-boundary Asset Detail renderer extraction in `c58aa67` moved `renderAssetDetail` to `src/render/assetDetailDisplay.js`, reducing `app.js` to 7,783 lines. The boundary is renderer-only; workflow events, mutations, pending delete state, permissions, blocker counts, auth/session/company/location state, storage, public QR, SQL, and RLS remain in `app.js`/existing event modules. Static checks, targeted renderer smoke, Asset Detail event regression smokes, hosted resource smoke, and GitHub Actions Resource Load Smoke passed.
- Hard-boundary Work Order Detail renderer extraction in `c3d3cf3` moved `renderWorkOrderDetail` to `src/render/workOrderDetailDisplay.js`, reducing `app.js` to 7,858 lines. The boundary is renderer-only; workflow events and mutations remain in `app.js`/existing event modules. Static checks, targeted renderer/event smokes, hosted resource smoke, GitHub Actions Resource Load Smoke, and signed-in live detail-contract smoke passed.
- Six-phase state-adapter cleanup in `0512029` reduced `app.js` to 8,059 lines by routing selected event modules directly through `workspaceUiState` and removing redundant localStorage writes already owned by state setters. Static checks, targeted smokes, hosted resource smoke, and GitHub Actions Resource Load Smoke passed; signed-in live shell/cache smoke passed, while deeper browser click proof was limited by stale workspace search state in the automation session.
- Documentation drift cleanup in `c5e7500` reconciled current handoff, next steps, RLS live checkpoint, Supabase setup, and the modularization plan after the RLS/auth checkpoints.
- Auth callback verification is deployed and live verified, including fresh real signup verification returning through MaintainOps.
- RLS hardening is closed for the current app-used table/RPC/storage surface, with live dashboard summary PASS and direct cross-company/anonymous probes documented.

## Current App.js Status

`app.js` remains the main structural risk.

Current app.js line count after the Create Work Order renderer extraction:

- 7,627 lines.

Recent extracted/source modules include 57 files under `src/utils`, including:

- `src/utils/schemaErrors.js`
- `src/utils/operationResults.js`
- `src/utils/operationTimeout.js`
- `src/utils/publicUrlQr.js`
- `src/utils/maintenanceScheduleDates.js`
- `src/utils/workOrderQueryFilters.js`
- `src/utils/workSectionJumpEvents.js`
- `src/utils/globalSearchNavigationEvents.js`
- `src/utils/requestQueryFilters.js`
- `src/utils/workOrderSearch.js`
- `src/utils/workspaceListBuilders.js`
- `src/utils/workspaceSearchEvents.js`
- workspace event-boundary modules for filters, detail navigation, section navigation, work-order lifecycle seams, request/asset/part/PM/procedure delete-warning seams, command openers, message UI/thread seams, Quick Fix openers, public QR print/copy seams, and state factory support.
- `src/utils/workspaceUiState.js`
- `src/utils/authRedirects.js`
- previous render/display modules listed in `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`

Current strategy:

- do not batch by default.
- require explicit boundary selection and targeted behavior smoke for each next medium/high-risk extraction.
- keep workflow/orchestration zones blocked unless separately planned and approved.

## Safe To Batch

Codex may combine planning and implementation in one phase only for:

- pure display helpers
- read-only render helpers
- helpers that only return markup/text
- helpers with no mutation path
- helpers with no event-binding contract risk
- helpers with no fragile global state dependency
- helpers already classified SAFE NEXT or clearly equivalent

## Must Remain Surgical Or Blocked

Do not batch or casually move:

- mutations
- event handlers
- workflow orchestration
- auth/session/company/location logic
- Quick Fix
- work-order lifecycle flows
- request conversion
- public QR submit workflows
- delete confirmations
- storage/photo/document flows
- parts usage/restock forms
- invite/default-location forms
- `renderWorkspace`
- `bindWorkspaceEvents`
- Supabase SQL/RLS

Any of these requires planning-only first or explicit approval.

## LFES Rules Codex Should Enforce

1. Preserve behavior exactly unless a defect fix is explicitly approved.
2. Prefer small coherent modules over random line movement.
3. Do not move functions just to reduce line count.
4. Every extraction must have static checks, local smoke, package/upload, hosted resource checks, and live smoke. Record GitHub Actions as PASS only when an actual workflow run is inspected and confirmed.
5. Verify cache tags after every deploy:
   - new helper script must return HTTP 200.
   - `app.js` cache tag must be current.
   - live `index.html` must reference the correct tags.
6. Use PASS / FAIL / NOT VERIFIED.
7. Never fake verification.
8. Keep blocked items visible.
9. Update docs every phase.
10. Stop if risk rises above the approved boundary, if verification cannot be completed, or if the next move needs a wider architecture decision.

## High-Risk LFES Deviation

If Codex is about to skip, reorder, or rush a high-risk planned step, it should flag:

```text
HIGH-RISK LFES DEVIATION

Planned safer path:
[...]

Requested deviation:
[...]

Known risk:
[...]

Mitigation/watch item:
[...]
```

Use this only for high-risk sequencing changes, skipped verification, or dangerous extraction jumps. Do not turn it into routine paperwork.

## Current Known Open Items

Still open or not fully verified:

- invite acceptance and first-login Salem default for Jeffrey or approved recipient
- password reset full email/recovery-link round trip remains a lower-priority auth symmetry smoke; signup verification callback is now proven.
- photo/file upload desktop/mobile verification
- broader inventory authority beyond work-order part usage RPC
- backup/export strategy
- more `app.js` decomposition
- credentialed Playwright automation
- local GitHub Actions verifier still needs `gh` or an authenticated API path; public run-page fallback has been used successfully.
- mutating automation remains blocked unless separately planned.

## Pilot State

Controlled pilot readiness:

- supervised yes.

Pilot scope:

- Taylor Metal Products
- Salem, OR primary location
- manager/admin supervised use
- controlled QR intake
- work orders
- parts usage with RPC-backed work-order part usage
- daily/manual smoke as needed
- GitHub Actions Resource Load Smoke after pushes

Current pilot queue after cleanup:

- Work Orders: Hydralic Leak
- Equipment: New thalmann
- Requests: clean
- Parts: clean

## Current Next Step

RLS/auth checkpoints are closed for the current app-used surface, and workspace UI state factory wiring is the safest next modularization direction if kept client-side.

Next recommended phase:

- choose one explicit state-factory/event-boundary group before moving code.
- do not combine state wiring with workflow mutation extraction.
- public URL/QR helpers are already extracted and live verified.
- maintenance schedule date helper is already extracted and live verified.
- work-order query filter/sort orchestration is already extracted and live verified.
- work-order detail field-jump event binding is already extracted and live verified.
- workspace search/exact-search events are already extracted and live verified.
- workspace filter/pagination events are already extracted and live verified in app commit `ceb8ba6`.
- workspace detail/open navigation events are already extracted and live verified in app commit `ef69559`.
- workspace inventory/equipment filter events are already extracted and live verified in app commit `2b4ad8e`.
- GitHub Actions proof is available through public run pages for recent RLS/auth checkpoints, but the local unauthenticated API verifier can still rate-limit. Prefer installing/configuring `gh` or using an authenticated verifier path before relying on local automated Actions proof for future high-risk phases.
- Existing event-boundary modules now have explicit LFES contract comments.
- First state-boundary planning is documented in `docs/LFES/audits/STATE_BOUNDARY_PLAN_2026-05-21.md`.
- form/payload validation helpers (`requiredText`, `workOrderDateValue`, `procedureColumn`) are blocked until Quick Fix/date validation behavior is narrowed and passes targeted smoke.
- any new boundary requires targeted behavior smokes beyond resource loading before deploy.

Best next candidates:

- one more `workspaceUiState` wiring pass for an already extracted UI module group.
- QA Facility technician symmetry smoke before touching auth/session, public QR submit, or storage/photo/document flows.
- a planning-only renderWorkspace segmentation map if the next goal is concentrated authority reduction instead of line count.

Still blocked until separate planning:

- command routing.
- message center send/reply.
- work-order mutation/status/assignment/delete/downtime flows.
- request conversion, Quick Fix, request delete.
- part inventory mutations and document/source flows.
- asset/PM/procedure/team/settings forms.
- auth/session/company/location startup.
- public QR submit/admin.
- storage/photo/document/logo flows.
- SQL/RLS.
- broad `renderWorkspace()` or broad `bindWorkspaceEvents()` extraction.

The next boundary plan must confirm:

- exactly which functions move.
- which call sites are affected.
- which workflow/path proves behavior stayed intact.
- cache tags and hosted resources after deploy.
- whether GitHub Actions actually ran and passed or remained not verified.

## Response Style Going Forward

For each phase, Codex should include:

1. Simple explanation: what is happening in plain English.
2. LFES scope: what is allowed and what is blocked.
3. Work performed: files created or modified.
4. Verification: static checks, local smoke, live smoke, GitHub Actions.
5. Status: PASS / FAIL / NOT VERIFIED.
6. Next recommended phase.

## Bottom Line

Codex can determine next steps within LFES.

The external planning chat should no longer be needed for every phase. Use it only when the next move involves higher-risk architecture judgment, workflow/mutation extraction, framework strategy, external review, or major product direction.
