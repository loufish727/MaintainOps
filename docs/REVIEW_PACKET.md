# MaintainOps Review Packet

This packet is intended for external review. It summarizes what the app is, what is working, what is still maturing, and where reviewers should focus.

## Product

MaintainOps is a Supabase-backed maintenance operations app for small maintenance teams. It covers work orders, equipment, locations, requests, parts inventory, preventive maintenance, procedures, messages, photos, comments, team roles, and public QR request intake.

Live app: [loufish727.github.io/MaintainOps](https://loufish727.github.io/MaintainOps/)

## Current Maturity

MaintainOps is suitable for controlled pilot or internal operational review. It is not being presented as a fully hardened external SaaS platform yet.

Strong areas:

- Real multi-tenant maintenance workflow surface.
- Supabase auth, company membership, role model, and location-scoped workspace.
- RLS-first security posture for shared operational data.
- Public QR request intake through scoped RPC paths rather than direct anonymous table access.
- Significant modularization work underway from a large legacy `app.js`.
- Targeted smoke coverage and GitHub Actions resource-load checks.

Areas still maturing:

- `app.js` remains the main orchestration file.
- Automated integration/end-to-end coverage is still limited.
- Backup, restore, support, and incident procedures need final production rollout polish.
- Backup/restore validation is currently blocked by the Free-plan Supabase project and missing local restore tooling; see `docs/BACKUP_RESTORE_VALIDATION.md`.
- Public request intake needs final production copy, routing, and support hardening.
- The current hosted app contains QA and pilot-style data.

## Architecture Snapshot

- Frontend: static HTML/CSS/JavaScript.
- Hosting: GitHub Pages.
- Backend: Supabase Auth, Postgres, RLS policies, RPCs, and private storage buckets.
- Main app entry: `index.html`.
- Main orchestration: `app.js` at roughly 4,821 lines.
- Extracted modules: `src/`.
- SQL source: `supabase/`.

Current architecture is transitional but more intentional than earlier versions: `app.js` remains the app shell, bootstrapper, render router, and dependency wiring layer, while workflow, render, service, utility, and event modules continue moving into `src/`. The remaining `app.js` authority is tracked in `docs/APP_JS_AUTHORITY_MAP.md`.

Recent UI trace: the Conversions tab now includes expanded shop reference charts and a screen-fit bolt gauge. Shop reference cards were corrected for desktop and mobile behavior: collapsed cards stay compact, opened desktop cards span the grid, opened mobile charts use stacked label/value rows instead of clipped wide tables, favorite charts are visually prominent, and reference search filters relevant cards by names, common IDs, sizes, row values, and notes. Favorites now sync to a signed-in user's Supabase `user_preferences` row when the preference table exists, with `localStorage` retained as a browser fallback/cache. Reference search is not connected to inventory or Supabase yet.

## Security Posture

The app is designed around database-enforced tenant isolation:

- Shared operational tables use `company_id`.
- Location-scoped data uses `location_id`.
- RLS is expected to remain enabled on shared tables.
- Anonymous access is intended only for narrow public request RPCs.
- Storage buckets are intended to remain private.
- Supabase browser config uses the publishable anon key; authorization must come from RLS and RPC checks, not secrecy of frontend config.

Reviewers should inspect:

- RLS policies and grants in `supabase/`.
- Public request RPCs.
- Role checks around manager/admin actions.
- Storage access patterns for photos and documents.

## Testing And Verification

Current verification uses targeted smoke tests, resource-load checks, and selected live browser checks for high-risk flows.

Useful entry points:

- `tests/smoke/`
- `.github/workflows/resource-load-smoke.yml`
- `package.json` scripts
- `docs/APP_JS_AUTHORITY_MAP.md`
- `docs/SECURITY_VERIFICATION.md`
- `docs/BACKUP_RESTORE_VALIDATION.md`

This is not yet a full automated test suite. A broader integration/e2e suite remains a recommended next maturity step.

## Review Focus

Recommended review questions:

- Is tenant isolation enforced at the database layer?
- Are public QR/request paths narrowly scoped?
- Are role-gated actions enforced outside the UI?
- Are mutation workflows understandable and recoverable?
- Is the remaining `app.js` authority concentration acceptable for the current maturity stage?
- Which workflows need stronger automated coverage before broader rollout?

## Public Documentation

This repository intentionally keeps public docs focused on product, architecture, feature status, setup, and review posture. Detailed internal operating notes and phase-by-phase process records are not part of the public review surface.
