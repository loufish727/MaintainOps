# LFES Phase 9M Equipment Label Readiness Decision

Date: 2026-05-20

## Purpose

Phase 9M decides the next safe code movement after Phase 9K/9L fully closed.

This phase is planning/documentation only.

## Evidence Reviewed

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `app.js`
- current `src/render/*` modules

## Candidate Evaluation

| Candidate | Estimated Line Reduction | Risk | Why | Decision |
| --- | ---: | --- | --- | --- |
| `assetTypeLabel`, `assetStatusLabel` | 10-20 | Low | Pure string label helpers; no Supabase, no DOM events, no mutations, no state writes | RECOMMENDED |
| empty-state helpers | 10-25 | Low/Medium | Read global search/filter state and are less coherent as a module | DEFER |
| assignment label helpers | 20-40 | Medium | Touch vendor assignment semantics and downtime email output | DEFER |
| message scope/thread label helpers | 15-35 | Medium | Depend on message members, locations, filters/search summaries | DEFER |
| equipment cards/details | 100+ | High | Emit detail/open/quick-fix/delete behavior hooks | BLOCKED |

## Decision

Approve a narrow Phase 9N implementation:

- create `src/render/equipmentLabels.js`
- move only:
  - `assetTypeLabel`
  - `assetStatusLabel`
- expose them through `window.MaintainOpsEquipmentLabels`
- update `app.js` to import the helpers from that namespace
- keep Equipment cards/details/forms, delete controls, Quick Fix hooks, and all mutations in `app.js`

## Required Phase 9N Guardrails

Phase 9N must:

- preserve exact helper behavior
- update `index.html` script loading before `app.js`
- bump the `app.js` cache tag
- update `tests/smoke/resource-load.spec.js`
- run static JavaScript checks
- run local resource smoke
- run signed-in local smoke focused on Equipment, Work Orders, My Work, Parts, Team, Settings, and Messages
- update QA and handoff docs

## Remains Blocked

- equipment cards/details/forms
- equipment delete guards
- equipment-driven routing behavior
- Quick Fix hooks
- parts/request/work-order renderers
- event handlers
- mutations
- Supabase calls
- auth/session/company/location logic
- `renderWorkspace()`
- `bindWorkspaceEvents()`
- Supabase SQL/RLS

## Verification

Documentation-only phase:

- app behavior changed: no
- app code changed: no
- Supabase SQL/RLS changed: no
- runtime smoke required: no

Result:

- Phase 9M planning/readiness: PASS
