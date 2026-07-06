# Bundling And Migration Plan

MaintainOps is still a static browser app that loads many JavaScript files directly from `index.html`. That is workable for the current app, but it makes cache control, dependency order, and review confidence harder as the app grows.

This plan is intentionally staged. It does not change runtime architecture until the current LFES checks can prove the same behavior before and after each step.

## Goals

- Keep GitHub Pages hosting and static deployment.
- Reduce manual script ordering risk.
- Improve cache busting with generated asset names.
- Keep rollback simple during the transition.
- Move SQL changes toward a dated migration history instead of open-ended `step-next` files.

## Bundling Phases

1. Inventory current script tags, module globals, and load-order dependencies in `docs/SCRIPT_LOAD_INVENTORY.md`.
2. Enforce that main-index globals are provided before they are consumed.
3. Add a build tool in compatibility mode that still outputs static files for GitHub Pages.
4. Bundle low-risk extracted modules first while preserving the existing global API expected by `app.js`.
5. Prove the first pilot bundle through `npm run test:bundle:pilot` without loading the generated bundle in production.
6. Swap proven low-risk bundles into `index.html` one at a time, starting with `src/bundles/emptyStateText.bundle.js`.
7. Move toward generated hashed asset filenames so browser cache busting is automatic.
8. Keep a rollback path to the current static script tags until strict LFES and hosted LFES pass on the bundled output.

## SQL Migration Phases

1. Keep existing `supabase/step-next-*.sql` files as historical checkpoints.
2. Put new database changes in `supabase/migrations/YYYYMMDDHHMM_description.sql`.
3. Record applied production migrations in `docs/APPLIED_MIGRATIONS.md`.
4. Run `npm run test:migrations:static` before release to catch migration naming and tracking drift.
5. Mark `step-next` as legacy once new dated migrations have been used successfully across several releases.

## Success Criteria

- `npm run test:lfes:strict` passes before push.
- `npm run test:lfes:hosted` passes after deploy.
- No service-role secrets are introduced into frontend code, logs, docs, or GitHub Actions output.
- Browser startup, QR/request intake, work-order flows, equipment detail, accounting/financial views, and storage dashboard still load with the same public URLs.

## Non-Goals

- No rewrite of the app framework.
- No live data migration without a separate reviewed SQL plan.
- No change to RLS boundaries for bundling convenience.
