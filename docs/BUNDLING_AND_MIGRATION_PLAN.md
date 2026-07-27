# Bundling And Migration Plan

MaintainOps remains a static browser app, but production now loads generated minified and content-hashed assets instead of the source-file graph.

This plan is intentionally staged. It does not change runtime architecture until the current LFES checks can prove the same behavior before and after each step.

## Goals

- Keep GitHub Pages hosting and static deployment.
- Reduce manual script ordering risk.
- Improve cache busting with generated asset names.
- Keep rollback simple during the transition.
- Move SQL changes toward a dated migration history instead of open-ended `step-next` files.

## Bundling Phases

Completed:

1. Script tags, global providers/consumers, and load order are inventoried in `docs/SCRIPT_LOAD_INVENTORY.md`.
2. The production entry points use generated minified runtime, app-shell, application-style, spatial-script, and spatial-style assets with content-hashed filenames and external source maps. Maps retain source paths but omit embedded source copies so Windows and Linux builds stay byte-identical.
3. Manager, Financial, Team presentation, and Admin Setup are lazy feature chunks rather than eager runtime dependencies.
4. Shop Reference and the 3D Performance workspace retain their existing lazy boundaries.
5. Compressed and decoded size budgets run inside `npm run test:bundle:pilot`.
6. Authenticated browser proof enforces initial request, DOM, ready-time, and feature-loading budgets.

Next bundling work should be evidence-driven. Add another lazy boundary only when a measured startup or interaction cost justifies it; do not create one network request per small source module.

## SQL Migration Phases

1. Keep existing `supabase/step-next-*.sql` files as historical checkpoints.
2. Put new database changes in `supabase/migrations/YYYYMMDDHHMM_description.sql`.
3. Use `npm run migration:apply -- <file>` for review and linked-project execution of dated migrations.
4. Record applied production migrations in `docs/APPLIED_MIGRATIONS.md`.
5. Run `npm run test:migrations:static` before release to catch migration naming and tracking drift.
6. Mark `step-next` as legacy once new dated migrations have been used successfully across several releases.

## Success Criteria

- `npm run test:release:gate` passes before push.
- `npm run test:lfes:strict` passes before major bundled releases.
- `npm run test:lfes:hosted` passes after deploy.
- No service-role secrets are introduced into frontend code, logs, docs, or GitHub Actions output.
- Browser startup, QR/request intake, work-order flows, equipment detail, accounting/financial views, and storage dashboard still load with the same public URLs.

## Non-Goals

- No rewrite of the app framework.
- No live data migration without a separate reviewed SQL plan.
- No change to RLS boundaries for bundling convenience.
