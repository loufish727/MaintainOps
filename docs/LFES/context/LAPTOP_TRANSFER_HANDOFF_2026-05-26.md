# MaintainOps Laptop Transfer Handoff - 2026-05-26

Use this file when continuing MaintainOps LFES work from a new machine or new Codex thread.

## Source Of Truth

Repository:

```text
https://github.com/loufish727/MaintainOps.git
```

Current branch:

```text
main
```

Current latest app/process checkpoint:

```text
76e5a19 Document workspace search state verification
```

## Laptop Setup

1. Install or open Git on the laptop.
2. Clone the repo:

```powershell
git clone https://github.com/loufish727/MaintainOps.git
cd MaintainOps
```

3. In Codex on the laptop, open the cloned `MaintainOps` folder as the workspace.
4. Start the new chat with:

```text
Read docs/CURRENT_HANDOFF.md first, then docs/LFES/context/LAPTOP_TRANSFER_HANDOFF_2026-05-26.md. Continue LFES from the current clean checkpoint.
```

## Read Order

Read these first:

1. `docs/CURRENT_HANDOFF.md`
2. `docs/NEXT_STEPS.md`
3. `docs/QA_LOG.md`
4. `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
5. `docs/LFES/audits/RLS_SOURCE_AUDIT_2026-05-26.md`
6. `docs/LFES/audits/STATE_BOUNDARY_PLAN_2026-05-21.md`
7. `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`

## Current State

- `app.js` line count: 8,050.
- Working tree should be clean after cloning.
- RLS source audit is complete.
- `workspaceUiState` exists in `src/utils/workspaceUiState.js`.
- State slices wired to `workspaceUiState`:
  - Parts/Equipment filter-search state.
  - Workspace filter/pagination state.
  - Workspace search state.
- Latest app cache tag:
  - `app.js?v=lfes-state-workspace-search-1`

## Latest Verified Work

Recent commits:

```text
76e5a19 Document workspace search state verification
222f308 Document workspace search state commit
a0e8171 Wire workspace search state to UI factory
1e21850 Document filter state live verification
15e4c49 Bump app cache tag for filter state wiring
5f77e9e Wire workspace filter state to UI factory
```

Verification completed:

- static JS checks;
- targeted state smokes;
- local resource smoke;
- local boot assertions;
- hosted resource smoke;
- GitHub Actions Resource Load Smoke;
- signed-in live Parts search / Equipment status-filter smoke;
- signed-in live Work Orders Vendor filter / Due sort smoke;
- signed-in live workspace search preview / exact Work Orders search smoke.

## Critical Constraints

Do not touch these until explicitly planned:

- auth/session/company/location startup;
- public QR submit;
- storage/photo/document flows;
- Supabase SQL/RLS;
- team invite cancel;
- parts-used mutation;
- broad renderWorkspace movement;
- broad bindWorkspaceEvents movement;
- multiple mutation systems in one phase.

## Current Blocker

The RLS source audit found two app-used RPCs that are not present in checked SQL source:

- `cancel_company_invite`
- `record_work_order_part_usage`

Do not work on team invite cancel or parts-used mutation boundaries until this source-of-truth gap is resolved or explicitly accepted.

## Recommended Next LFES Phase

Map section/detail navigation state before implementation.

Likely candidate:

- section/detail navigation state currently used by extracted modules such as:
  - `workspaceSectionNavigationEvents.js`
  - `workspaceDetailNavigationEvents.js`
  - `globalSearchNavigationEvents.js`

Rules:

- one state slice only;
- no mutations;
- no auth/startup;
- no storage;
- no SQL/RLS;
- keep `app.js` as business-data owner;
- run targeted state smoke, static checks, local resource smoke, hosted resource smoke, GitHub Actions smoke, and signed-in live smoke.

## Test Account Note

Do not commit test account credentials into the repo. Use the existing test/admin login details from the private chat context or password manager when needed.

