# Backup And Restore Validation

Last checked: 2026-05-28.

This document records the current backup/restore posture for MaintainOps and the result of the first restore-validation pass.

## Current Result

Restore validation is not complete.

The current Supabase project is on the Free plan. In the Supabase dashboard:

- Scheduled backups page reports: Free Plan does not include project backups.
- Point-in-time recovery reports: PITR is a Pro Plan add-on.
- Restore to new project reports: restore to a new project requires Pro Plan and physical backups.

Because of that, a true Supabase-managed restore test could not be completed from the current project state.

## Local Tooling Result

The current local machine does not have the tooling needed for a local database restore simulation:

- Supabase CLI: not available.
- `psql`: not available.
- Docker/Postgres runtime: not available.

This means a local restore dry run cannot currently be performed from this workspace alone.

## What The Repository Can Rebuild

The repository contains the app source, SQL schema, and incremental SQL step files:

- `supabase/schema.sql`
- `supabase/step-next-*.sql`
- app frontend files
- auth callback files
- smoke/security probe scripts

This is enough to rebuild a project structure manually in a clean Supabase project, but it is not the same as a verified backup restore.

The repo does not by itself contain:

- Supabase Auth users/passwords/sessions.
- live table data snapshots.
- storage object bytes.
- database extension/runtime state outside the checked-in SQL.
- a known-good restore target configuration.

## Current Backup Gap

For real production dependence, MaintainOps needs a tested recovery path that includes:

- database schema
- table data
- RLS policies
- grants
- RPC functions
- auth users or an account recovery/reinvite process
- storage buckets
- storage object files
- app environment/config values

At the moment, the security posture is better verified than the operational recovery posture.

## Required Path To Complete Restore Validation

Use one of these paths.

### Preferred: Supabase Managed Restore

1. Upgrade the Supabase org/project to a plan that includes scheduled physical backups.
2. Confirm backups are enabled and a recent backup exists.
3. Use Supabase "Restore to new project" to create a restore target.
4. Capture the restored project's URL and publishable anon key.
5. Temporarily point local `supabase-config.js` at the restored project.
6. Run:

```bash
npm run test:security:static
npm run test:security:boundary
npm run test:smoke:resources
```

7. Sign in or create/reinvite a test user in the restored project.
8. Verify the app loads company/workspace data.
9. Verify storage buckets and signed URL behavior.
10. Record restore duration, missing pieces, and manual recovery actions.

### Alternate: Manual Rebuild Restore Drill

This validates rebuildability, not full production backup recovery.

1. Create a separate Supabase restore-test project.
2. Run `supabase/schema.sql`.
3. Run the current `supabase/step-next-*.sql` files that are not already represented in the schema.
4. Configure auth redirect URLs for the restore-test project.
5. Create/reinvite test users.
6. Seed representative company/location/work-order data.
7. Create required storage buckets and policies through SQL.
8. Point local `supabase-config.js` at the restore-test project.
9. Run smoke and security probes.
10. Document all manual gaps.

This path does not prove live data recovery unless table data and storage objects are also exported and restored.

## Storage Recovery Notes

Storage must be treated as a separate restore concern.

Known buckets:

- `work-order-photos`
- `maintenance-request-photos`
- `company-logos`
- `part-documents`

For production readiness, storage object backup must be validated separately from database schema/table restore.

## Provisional Incident Guidance

Until restore validation is complete:

- Do not claim full production disaster-recovery readiness.
- Treat the live database as pilot/internal operational data only.
- Export critical data before high-risk database work.
- Keep SQL changes reversible where possible.
- Use a restore-test project before major schema rewrites.

## Current Status

ACTION NEEDED:

A true backup/restore validation requires either:

- Supabase Pro backup/restore capability, or
- a separate restore-test Supabase project plus database/export tooling.

The current Free-plan project and local machine tooling cannot complete a real restore validation today.
