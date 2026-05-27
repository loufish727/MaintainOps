# MaintainOps App Review Packet

## Primary Links

- Live app: https://loufish727.github.io/MaintainOps/
- Main repository: https://github.com/loufish727/MaintainOps
- Public front door: https://loufish727.github.io/
- GitHub profile: https://github.com/loufish727

## Recommended Review Path

1. [README](../README.md)
2. [Current handoff](CURRENT_HANDOFF.md)
3. [Project overview](PROJECT_OVERVIEW.md)
4. [Architecture](ARCHITECTURE.md)
5. [Feature status](FEATURE_STATUS.md)
6. [QA log](QA_LOG.md)
7. [Supabase setup / security context](SUPABASE_SETUP.md)
8. [RLS live checkpoint](LFES/audits/RLS_LIVE_CHECKPOINT_2026-05-27.md)

## Current State Summary

MaintainOps is a Supabase-backed maintenance operations app for work orders, equipment, requests, parts, preventive maintenance, team workflows, and field operations.

The app is live on GitHub Pages and backed by Supabase Auth, Database, RLS policies, RPC functions, and storage buckets.

## Current Architecture

- Vanilla browser app.
- Static HTML/CSS/JavaScript.
- Supabase backend.
- `app.js` remains the main orchestration file.
- `app.js` is currently about 7,442 lines.
- Extracted modules now live under `src/`.
- Recent extraction includes Quick Fix submit workflow in `src/workflows/quickFixWorkflow.js`.

## Current Verification

- Targeted smoke tests under `tests/smoke`.
- Hosted resource checks.
- Selected signed-in live lifecycle smokes.
- GitHub Actions Resource Load Smoke.
- Latest public review-doc alignment commit: `68e7080`.
- GitHub Actions passed for `68e7080`.

## Current Public Positioning

- Root GitHub Pages now presents MaintainOps, not the grocery app.
- SimpleCart moved to https://loufish727.github.io/simplecart/.
- GitHub profile README now presents MaintainOps as the main project.
- MaintainOps repo description and README have been cleaned up for review.

## Review Focus Requested

1. App architecture and maintainability.
2. Supabase/RLS security posture.
3. Auth verification flow.
4. Work order / asset / request workflows.
5. Current modularization state.
6. Production-readiness gaps.
7. Documentation consistency.
8. Public repo / GitHub Pages exposure risks.
9. Backup / restore / incident response gaps.
10. Public request QR/link intake hardening.
11. Any blockers before external users.
12. Whether this is ready for controlled pilot vs broader external rollout.

## Known Posture

- Strong candidate for controlled pilot/internal use.
- Not claiming fully hardened external SaaS readiness.
- Main remaining architectural concern is `app.js` authority concentration.
- Main testing gap is lack of comprehensive automated unit/integration/e2e suite.
- Main operational gap is backup / restore / incident response documentation.
- Public request QR/link intake exists, but final production polish/custom-domain/support path still needs review.
