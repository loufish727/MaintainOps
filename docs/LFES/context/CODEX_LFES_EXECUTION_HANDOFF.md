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

- pause automatic extraction runs and use explicit boundary review for each next module movement.

Most recent deployed closed phase:

- Hard-boundary work-order query filter/sort extraction.

Most recent local completed phase:

- Hard-boundary work-order query filter/sort extraction is deployed and live verified.
- A documentation/process cleanup followed the previous operation-timeout Phase 17C to restore LFES standards to the current docs tree, update stale handoff files, and remove tracked package snapshots from the repo.

## Current App.js Status

`app.js` remains the main structural risk.

Current app.js line count after hard-boundary work-order query extraction:

- 9,550 lines.

Recent extraction modules:

- `src/utils/schemaErrors.js`
- `src/utils/operationResults.js`
- `src/utils/operationTimeout.js`
- `src/utils/publicUrlQr.js`
- `src/utils/maintenanceScheduleDates.js`
- `src/utils/workOrderQueryFilters.js`
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
- password reset full email/recovery-link round trip after rate limits clear
- photo/file upload desktop/mobile verification
- broader inventory authority beyond work-order part usage RPC
- backup/export strategy
- more `app.js` decomposition
- credentialed Playwright automation
- mutating automation remains blocked

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

Hard-boundary work-order query filter/sort extraction is complete.

Next recommended phase:

- choose the next explicit boundary before moving code.
- public URL/QR helpers are already extracted and live verified.
- maintenance schedule date helper is already extracted and live verified.
- work-order query filter/sort orchestration is already extracted and live verified.
- form/payload validation helpers (`requiredText`, `workOrderDateValue`, `procedureColumn`) are blocked until Quick Fix/date validation behavior is narrowed and passes targeted smoke.
- any new boundary requires targeted behavior smokes beyond resource loading before deploy.

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
