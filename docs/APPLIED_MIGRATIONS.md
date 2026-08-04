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
- `supabase/migrations/202607211200_app_performance_telemetry.sql` adds privacy-limited, company-scoped browser performance samples and aggregate dashboard RPCs; testing-platform and production application are recorded below.
- `supabase/migrations/202607271000_workspace_work_order_counts.sql` adds one company/location-scoped dashboard count RPC; testing-platform and production application are recorded below.
- `supabase/migrations/202607281200_performance_vital_session_dedup.sql` changes only the performance aggregate RPC so repeated Web Vital captures count once per browser session; testing-platform and production application are recorded below.
- `supabase/migrations/202607291200_performance_measurement_integrity.sql` versions performance samples so only visibility-safe, non-automated generation-2 measurements drive the dashboard; testing-platform and production application are recorded below.
- `supabase/migrations/202608041200_production_actions.sql` adds the Production role, work-order Production Actions, My Work routing, completion guards, and automatic history; testing-platform and production application are recorded below.

Repo source:

- this file records known manual state when live access is not available.
- `npm run migration:apply -- 202607061430_applied_migration_metadata.sql` is the helper entry point for dated migration review and linked-project execution.

## Known Recently Applied

| SQL file | Live status | Evidence |
|---|---|---|
| `supabase/migrations/202608041200_production_actions.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm`, then production project `lbphkzznvvumemdkqoay` on 2026-08-04. Local Full Strict LFES passed on commit `6b7c71a`; Release Gate run `30933794766`, five-role Authenticated LFES run `30933804371`, Pages deployment `30934076280`, and Hosted App Smoke `30934135722` passed. Testing preflight/postflight retained 5 prior members and 8 work orders; its signed-in Production lifecycle proved assignment, Team drill-down, My Work routing, completion blocking, action completion, queue removal, cleanup, and automatic history. Production preflight/postflight retained 21 members, 120 work orders, and 685 work-order events while adding 7 columns, 5 constraints, 2 work-order triggers, the Production role constraint, and the authenticated-only count RPC. Justin Werber's single Taylor Metal Products Salem membership changed from Technician to Production; his existing normal work-order assignment remained. Both applications were recorded in `public.applied_migrations`. |
| `supabase/migrations/202607291200_performance_measurement_integrity.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm`, then production project `lbphkzznvvumemdkqoay` on 2026-07-29 after focused telemetry, SQL-security, migration-static, bundle, desktop/mobile Performance, isolated-schema, authenticated boundary, and full Strict LFES verification. Testing retained 819 generation-1 samples, accepted generation-2 samples, excluded legacy measurements from the aggregate, and returned no boundary failures. Production retained all 15,953 historical samples as generation 1; postflight verified the non-null version column and index, both security-definer RPCs with pinned `search_path`, authenticated execution, and no `anon` execution. The application was recorded in `public.applied_migrations`; no operational rows were changed. |
| `supabase/migrations/202607281200_performance_vital_session_dedup.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm`, then production project `lbphkzznvvumemdkqoay` on 2026-07-28 after focused telemetry, threshold, SQL, bundle, desktop, mobile, visual, security, migration-static, and isolated-schema verification. The isolated PostgreSQL check proves repeated LCP samples within one browser session aggregate once and remain identity-free. Production postflight found 14,225 raw samples, 12,599 aggregate samples, and 1,626 repeated Web Vital samples ignored without deleting or updating any raw row. Taylor Metal's LCP aggregate changed from 560 raw samples with a 5,908 ms p75 to 44 session samples with a 3,704 ms p75. Catalog verification found one stable security-definer RPC with pinned `search_path`, authenticated execution, and no `anon` or `PUBLIC` execution. The application was recorded in `public.applied_migrations`; no operational rows were changed. |
| `supabase/migrations/202607271000_workspace_work_order_counts.sql` | Applied | Applied to isolated testing project `fsxqrngpaseqdxijggcm`, then production project `lbphkzznvvumemdkqoay` on 2026-07-27 after local Strict LFES, four-role authenticated testing-platform proof, WebKit proof, and GitHub Release Gate run `30289872510`. The isolated PostgreSQL check verifies company/location counts, assigned-versus-created My Work scope, Sunday-to-Sunday completion boundaries, invalid filter rejection, and cross-company denial. Signed-in testing measured 30 requests for admin, manager, accounting, and WebKit admin, and 34 for technician, with one `work_orders` query and one count RPC per initial workspace load. Read-only production catalog verification found exactly one stable security-definer RPC with pinned `search_path`, authenticated execution, and no `anon` or `PUBLIC` execution. The application was recorded in `public.applied_migrations`; no operational rows were updated or deleted. |
| `supabase/migrations/202607211200_app_performance_telemetry.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm` and production project `lbphkzznvvumemdkqoay` on 2026-07-21 after isolated schema, local Strict LFES, hosted Strict LFES, and authenticated testing-platform proof. Authenticated run `29871957982` passed all four role contracts plus telemetry write, aggregate-only read, malformed-unit rejection, raw-read denial, and cross-company denial. Read-only production postflight verified RLS enabled, no `anon` or `authenticated` table SELECT, exactly two security-definer RPCs with pinned `search_path`, authenticated execute grants, and zero initial samples. No operational rows were updated or deleted; the migration only added the telemetry table, constraints, policies, indexes, and RPCs. |
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
| `supabase/migrations/202608041200_production_actions.sql` | Not yet applied to testing or production; awaiting focused browser, Strict LFES, and authenticated testing-platform verification. |

## Rule

Every new SQL run should record:

- SQL file name
- applied timestamp
- project ref
- who/what applied it
- verification performed
- rollback note if applicable
