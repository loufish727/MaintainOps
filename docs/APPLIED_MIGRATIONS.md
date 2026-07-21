# Applied Migration Tracking

This file closes the review gap where the repository contains many `supabase/step-next-*.sql` files but the live application state is not obvious from Git alone.

## Current Status

Tracking has been introduced after many SQL steps were already applied manually through the Supabase dashboard. Older rows still must be backfilled from live database inspection and known handoff history.

## Source Of Truth Going Forward

Preferred live source:

- `public.applied_migrations`

Live status:

- `supabase/step-next-applied-migrations.sql` was applied to project `lbphkzznvvumemdkqoay` on 2026-06-11 through `npx supabase db query --linked --file`.
- Initial rows were backfilled for `step-next-applied-migrations.sql` and `step-next-invite-links.sql`.
- The first dated migration file now exists in the repo at `supabase/migrations/202607061430_applied_migration_metadata.sql`; it is not listed as applied until live execution and verification are completed.
- `supabase/migrations/202607201200_work_order_type_taxonomy.sql` maps legacy work-order types to the Corrective/Preventive/Fabrication taxonomy; live status is recorded below after execution and verification.
- `supabase/migrations/202607201330_work_order_priority_rank.sql` adds a generated priority rank used for correct Critical-to-Low work-order sorting; production and testing-platform application are recorded below.
- `supabase/migrations/202607211200_app_performance_telemetry.sql` adds privacy-limited, company-scoped browser performance samples and aggregate dashboard RPCs; it remains pending until isolated, testing-platform, and production verification are complete.

Repo source:

- this file records known manual state when live access is not available.
- `npm run migration:apply -- 202607061430_applied_migration_metadata.sql` is the helper entry point for dated migration review and linked-project execution.

## Known Recently Applied

| SQL file | Live status | Evidence |
|---|---|---|
| `supabase/migrations/202607211200_app_performance_telemetry.sql` | Pending | Added for the App Performance instrumentation packet. No live database has been changed yet. The migration revokes direct table access, accepts an allowlisted sample shape through a membership-checked RPC, exposes only company aggregates, rate limits writes, and retains 90 days. |
| `supabase/migrations/202607201330_work_order_priority_rank.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm` and production project `lbphkzznvvumemdkqoay` on 2026-07-20 after isolated schema and Strict LFES verification. Read-only production postflight verified `priority_rank` is an `ALWAYS` generated `smallint`, verified the exact `work_orders_company_location_priority_idx` definition, and returned Critical=4 (14), High=3 (24), Medium=2 (45), and Low=1 (10). Testing returned the same rank mapping across all eight testing work orders. No work-order rows were updated or deleted. |
| `supabase/migrations/202607201200_work_order_type_taxonomy.sql` | Applied | Applied to production project `lbphkzznvvumemdkqoay` with the corrected Windows migration helper on 2026-07-20. Read-only preflight counted 31 Corrective, 59 Reactive, and 3 Preventive work orders. Postflight counted 90 Corrective and 3 Preventive, verified the Corrective default, verified the exact Corrective/Preventive/Fabrication constraint, and verified the assignment guard trigger was enabled again. The same migration was then applied to testing project `fsxqrngpaseqdxijggcm`; its postflight counted 4 Corrective and 4 Preventive and verified the same default, constraint, and restored trigger. No rows were deleted and no records were auto-classified as Fabrication. |
| `supabase/step-next-accounting-role.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; verified `company_members`/`company_invites` role constraints include `accounting`, verified `update_company_member_role` and `create_company_invite` include `accounting`, and recorded in `public.applied_migrations`. |
| `supabase/step-next-asset-financial-manager-readonly.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; verified live `asset_financials` SELECT remains available to company members while INSERT/UPDATE policies allow only `admin` and `accounting`. |
| `supabase/step-next-asset-financials.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; verified `asset_financials` columns, grants, RLS policies, and recorded in `public.applied_migrations`. |
| `supabase/step-next-asset-audit-fields.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; `information_schema.columns` verified `manufacturer` and `model` exist on `public.assets`. |
| `supabase/step-next-work-order-photo-delete.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-06; verified `authenticated` has DELETE grant on `public.work_order_photos`. |
| `supabase/step-next-applied-migrations.sql` | Applied | Applied with Supabase CLI on 2026-06-11; query verified rows exist in `public.applied_migrations`. |
| `supabase/step-next-invite-links.sql` | Applied | User confirmed SQL success on 2026-06-11; frontend join-link phase verified live afterward. |

## Known Needs Confirmation

| SQL file | Reason |
|---|---|
| `supabase/step-next-audit-log.sql` | SQL foundation exists in repo, but live application status was unknown in the 2026-06-11 review. |

## Rule

Every new SQL run should record:

- SQL file name
- applied timestamp
- project ref
- who/what applied it
- verification performed
- rollback note if applicable
