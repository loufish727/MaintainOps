# LFES Phase 3F Implementation-Readiness Decision

Date: 2026-05-19

Scope: planning and documentation only. No app code, rendering, event binding, Supabase SQL/RLS, wrapper extraction, workflow handler movement, or business logic changed.

## Purpose

Phase 3F decides the safest next implementation direction after the Phase 3A-3E architecture, event, smoke-test, state, and render maps.

The goal is to avoid continuing modularization just because it is possible. MaintainOps is live testing, so the next move should reduce operational risk more than it increases code churn.

## Evidence Reviewed

- `docs/LFES/audits/LFES_PHASE_3A_ARCHITECTURE_MAP.md`
- `docs/LFES/audits/LFES_PHASE_3B_EVENT_CONTRACT_INVENTORY.md`
- `docs/LFES/audits/LFES_PHASE_3C_SMOKE_TEST_MATRIX.md`
- `docs/LFES/audits/LFES_PHASE_3D_STATE_OWNERSHIP_MAP.md`
- `docs/LFES/audits/LFES_PHASE_3E_RENDER_OWNERSHIP_MAP.md`
- `docs/LFES/audits/LFES_PHASE_2H_MUTATION_BOUNDARY_PLAN.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/NEXT_STEPS.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/QA_LOG.md`

## Decision Summary

Recommended next implementation phase:

**B. Automated/manual smoke-test strengthening, with technician assignment guardrail verification as the first focused live smoke path.**

Do not extract code yet.

Rationale:

- Phase 3A-3E mapped enough architecture to show where the danger is.
- Phase 3C defined the smoke paths, but they have not been run as the gate for new code movement.
- Phase 2H shows 69 mutation-boundary call sites remaining, with 32 Critical and 24 High.
- Phase 3D shows 100 top-level mutable state variables.
- Phase 3E shows render output is a behavior contract, with 83 `render*` functions and many mutation/public/storage/delete contracts.
- The app is live testing, so proving user-facing guardrails is higher value than moving a low-risk display helper.

## Option Evaluation

| Option | Risk | Value | Architecture Dependency | Regression Likelihood | Verification Required | Do Now? |
| --- | --- | --- | --- | --- | --- | --- |
| A. Low-risk render helper extraction | Low/Medium | Medium | Depends on render map and script loading | Low if only pure helpers move, but still creates packaging/cache risk | static checks, app load, relevant display smoke | Later |
| B. Automated/manual smoke-test strengthening | Low | Very High | Uses Phase 3C matrix; no code movement | Very Low | signed-in smoke, console check, QA log entries | Yes |
| C. Technician guardrail verification | Low | Very High | Needs role/test-user state and work-order assignment paths | Very Low if verification only | technician and manager/admin assignment smoke | Yes, as first B focus |
| D. NOT VALID constraint validation planning | Low as planning, Medium/High when SQL runs | High for database integrity | Needs current schema and data audit | Low if planning only; higher if constraints validate against dirty data | exact SQL plan, read-only audits, Supabase verification | Later, plan after smoke |
| E. Parts transaction RPC planning | Low as planning, High when implemented | High for inventory correctness | Needs parts/work-order part mutation map | Medium/High because inventory flows are live workflows | parts use/restock smoke, SQL/RPC plan, rollback plan | Later |
| F. Continue architecture mapping | Low | Medium | Could map more, but diminishing returns | Very Low | docs only | Later if a specific blind spot appears |

## Specific Decisions

### Is low-risk render helper extraction safe now?

Technically yes, but not recommended as the next move.

Pure display helpers such as `renderMetric`, `renderInsight`, `renderWorkloadStrip`, `renderMessageBubble`, `renderActivityItem`, `renderRelationshipChips`, and `renderEmailHelperCommandCard` are plausible later extraction candidates.

However, extraction still touches script loading, cache tags, packaging, and review overhead. Since live-testing confidence is more valuable right now, run smoke strengthening first.

### Should workflow extraction remain blocked?

Yes.

Workflow extraction remains blocked for:

- Quick Fix.
- work-order create/edit/status/complete/delete.
- request conversion.
- public QR submit.
- assignment guardrails.
- storage/photo/document flows.
- PM generation.
- procedure/checklist behavior.
- Team/admin/invite workflows.
- auth/session/company/location workflows.

### Should mutation extraction remain blocked?

Yes.

App issue report wrappers are already extracted. Further mutation extraction should wait until smoke tests prove the current live behavior and the next mutation target has a tighter workflow plan.

### Should technician assignment guardrail verification happen before more refactor?

Yes.

This should be the first focused smoke path because it protects a real role/security expectation:

- technicians can claim allowed unassigned work for themselves.
- technicians cannot assign work to others.
- technicians cannot assign outside vendors.
- technicians cannot clear assignments.
- technicians cannot take work already assigned to someone else.
- managers/admins retain broader assignment controls.

This is more operationally important than extracting display helpers.

### Should NOT VALID constraint validation be planned before more refactor?

Not before the next smoke pass.

It should be planned soon, but as a separate database-integrity phase. The right order is:

1. verify live workflow guardrails.
2. plan NOT VALID constraint validation with read-only audits and exact SQL.
3. run constraints only after data findings are understood.

No SQL should be run in Phase 3F.

### Should parts transaction RPC planning happen before more inventory use?

Plan it later, but do not implement it yet.

Parts use/restock and work-order part usage are important inventory correctness paths. A transaction RPC may be the right long-term move for atomic inventory updates, but implementing it touches SQL, RLS/RPC grants, app mutation flows, and smoke coverage.

Before planning/implementing it:

- run parts use/restock smoke.
- run work-order part usage smoke.
- document current inventory race/failure assumptions.

### Should Playwright/manual smoke-test strengthening come before more code movement?

Yes.

The next implementation should strengthen verification, not change application behavior. Manual smoke is acceptable first. Playwright can follow for stable paths that do not require fragile file-picker or credential handling.

## Recommended Next Phase

Recommended next controlled implementation phase:

**LFES Phase 4A live smoke and technician guardrail verification.**

Scope:

- no code changes unless a real defect is found.
- no Supabase SQL/RLS changes.
- no wrapper extraction.
- no render/state/event movement.
- run the Phase 3C smoke-test format against live or local signed-in sessions.
- start with technician assignment guardrails, then session/company/location/work-order smoke.

## Required Smoke Tests For Phase 4A

Minimum:

1. Session restore.
2. Taylor Metal Products loads.
3. intended active location persists after reload.
4. Work Orders load.
5. create/open/delete a safe QA work order as manager/admin.
6. technician can claim allowed unassigned work.
7. technician cannot assign others, assign vendor, clear assignments, or take work assigned to another user.
8. manager/admin assignment controls still work.
9. no missing script errors.
10. no actionable console errors.

Recommended if time allows:

- Quick Fix create/open/delete.
- signed-in request submit/convert/delete.
- parts restock/use.
- issue report submit/update.

## What Remains Blocked

- workflow extraction.
- mutation extraction.
- render extraction.
- event binding extraction.
- auth/session/company/location movement.
- public QR submit movement.
- Quick Fix/work-order/request conversion movement.
- delete/storage/photo/document movement.
- Supabase SQL/RLS changes.
- NOT VALID constraint SQL execution.
- parts transaction RPC implementation.

## Code Extraction Approval

No code extraction is approved by Phase 3F.

Low-risk render helper extraction is technically possible later, but it is not the next highest-value move. The next approved direction is verification strengthening first.

## Recommended Prompt For Next Phase

```text
Begin LFES Phase 4A live smoke and technician assignment guardrail verification.

Do not change code unless a real defect is found.
Do not refactor app.js.
Do not move functions.
Do not change Supabase SQL/RLS.

Run the Phase 3C smoke-test format for:
- session restore
- company/location load and reload persistence
- Work Orders load
- manager/admin safe QA work order create/open/delete
- technician assignment guardrails
- manager/admin assignment controls
- console/missing script check

Update docs/QA_LOG.md, docs/CURRENT_HANDOFF.md, and docs/NEXT_STEPS.md.

Report pass/fail results, defects found, whether code changes were needed, and whether modularization remains blocked.
```

