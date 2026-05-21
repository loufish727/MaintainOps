# Documentation Drift Review - 2026-05-21

## Purpose

This review explains why MaintainOps documentation drifted during the LFES `app.js` modularization work and defines the prevention rule before any high-risk extraction begins.

## What Happened

The implementation process stayed disciplined, but the documentation source of truth split:

- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md` was updated through Phase 17C and became the most accurate modularization timeline.
- `docs/CURRENT_HANDOFF.md`, `docs/NEXT_STEPS.md`, and `docs/QA_LOG.md` lagged behind recent phases.
- Full LFES standards existed inside old `MaintainOps-github-clean-*` package snapshots that had been committed to the repo, while the current top-level `docs/LFES` folder had only a partial standards set.
- GitHub/package snapshots were tracked in the repo, creating thousands of historical files that made current documentation harder to review.
- Some docs used "GitHub Actions PASS" language from earlier workflow-verified phases, while recent commits only had hosted resource checks and GitHub connector checks showing no workflow runs.

## Root Cause

The drift came from mixing two responsibilities:

1. A deployable app repository.
2. An export/package archive area.

Package snapshots belonged outside the publish repo, but some were committed. Once that happened, the repo contained many historical copies of docs and LFES standards. During rapid phased work, the modularization plan kept moving forward, but restart docs and central QA logs were not updated with the same regularity.

## Impact

The app behavior was not affected. The risk was review and operational continuity:

- A future AI or engineer could start from stale Phase 9 or Phase 16 instructions.
- A reviewer could miss the LFES standards because they were not present at the current top-level path.
- GitHub review was noisy because old package snapshots looked like current source files.
- Verification claims could become ambiguous if hosted resource checks were described as GitHub Actions evidence.

## Correction Applied

- Restored LFES standards to the current top-level `docs/LFES` tree.
- Added package export ignore rules to `.gitignore`.
- Removed tracked `MaintainOps-github-clean-*` package snapshots from the publish repo.
- Updated current handoff, next steps, Codex LFES handoff, QA log, and LFES evidence.
- Preserved actual package artifacts in the external package folder:
  `C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages`

## Prevention Rule

For every future LFES phase, update these current docs before closing the phase:

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`

If the phase changes process, standards, risk boundaries, or verification expectations, also update:

- `docs/LFES/context/CODEX_LFES_EXECUTION_HANDOFF.md`
- relevant `docs/LFES/standards/*.md`
- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`

Package exports must stay outside the publish repo. If a package folder or zip appears under the repo root, stop and move it out before committing.

## Verification Language Rule

Use exact verification language:

- `static checks: PASS` only after local syntax/check commands pass.
- `local resource smoke: PASS` only after local resources are verified.
- `hosted resource checks: PASS` only after live GitHub Pages resources return expected status and tags.
- `signed-in live smoke: PASS` only after the authenticated live app shell or targeted workflow is verified.
- `GitHub Actions: PASS` only after an actual workflow run is inspected and confirmed.
- `GitHub connector returned no workflow runs` means GitHub Actions is not verified.

## High-Risk Readiness Implication

Before high-risk code movement, run this documentation consistency check first:

- current handoff matches latest commit/cache tag/package.
- next steps names the next explicit boundary.
- QA log includes the last closed phase.
- LFES standards are present at top-level `docs/LFES`.
- package snapshots are not tracked in git.
- verification claims distinguish hosted checks from GitHub Actions.
