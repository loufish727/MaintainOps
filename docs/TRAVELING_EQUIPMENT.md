# Traveling Primary Equipment

## Contract

- `assets.asset_type = traveling_machine` identifies a standalone shared machine, not a duplicate equipment record.
- Equipment's Traveling Equipment filter shows company-wide units, with their current facility, using the existing 12-item pages. Normal facility lists also include units currently there.
- The current equipment location changes in place. There is no home facility, return date, approval workflow, stock transfer, or automatic assignment change.
- The move RPC checks the company, operational-editor role, destination and expected previous location. It locks the equipment row; retries at the same destination do not create another event. A conflicting move fails with an actionable message.
- Traveling equipment requires a current facility and cannot have a parent or linked child equipment. Classification of an existing hierarchy is rejected until separately resolved. Parent-row locking prevents a concurrent new child from slipping through classification.
- The guard and atomic history trigger also cover direct asset updates. Every successful move records the real actor, source/destination facility names and timestamp in Equipment History. If history cannot save, the location change rolls back.
- Area / spot is cleared because it describes the previous facility. Normal equipment editing cannot silently restore a traveling unit's old location.
- Existing work orders, assignments, status, comments, photos, documents, stock, part links/usage, PM schedules and financial rows are not rewritten. They remain linked by the permanent equipment ID.
- PM displays use the traveling machine's current facility without rewriting the stored schedule. The existing transactional PM generator uses the current equipment location for new work. Historical work retains its original facility.
- Financials and CSV use the existing asset identity and the Traveling Primary label. Operational permissions remain unchanged; accounting can read but cannot move equipment.

## Verification

`node tests/smoke/traveling-equipment-sql-smoke.js` uses disposable in-memory PostgreSQL and real migrations/RLS to check relationship preservation, permission boundaries, hierarchy guards, stale moves, retry idempotency, history rollback, PM generation, completion/reopen/delete and invoker-only privileges.

`traveling-equipment-display-smoke.js` checks company-wide versus local filtering, escaping and hierarchy choices. `traveling-equipment-workflow-smoke.js` checks confirmation/cancellation, duplicate submissions, errors, account/context races and stale edit payloads. `workspace-startup-paged-maintenance-smoke.js` verifies derived PM location without added startup queries or mutation of source rows.

`tests/smoke/traveling-equipment-live.spec.js` requires the explicit `LFES_TRAVEL_MUTATIONS=1` switch, isolated QA host/company and a localhost frontend configured to QA. It creates run-owned fixtures, tests desktop/mobile paging, a technician move and retained work/history, accounting read-only access, and PM visibility/generation at the destination. Cleanup is restricted to run-owned IDs. Authenticated LFES runs this suite in Chromium and WebKit.

The broader Strict LFES command includes the Node tests, bundle budgets, isolated schema, security and existing regression suites. Browser automation is not a physical-device field test or proof of every possible concurrent workload.

## Deployment

Verified release candidate: Full Strict LFES (13 stages) and authenticated LFES (9 stages) passed on 2026-09-23 local time. The latter includes desktop/mobile traveling lifecycle checks in both Chromium and WebKit. Production schema and the three requested initial records have been applied; see `APPLIED_MIGRATIONS.md` for the fingerprint comparison. GitHub's required Release Gate governs frontend publication.

Database prerequisite: `supabase/migrations/20260924025115_traveling_primary_equipment.sql`.
Apply and verify on QA before production. The migration changes no existing business rows and introduces no security-definer function or new public table. Record production application separately in `APPLIED_MIGRATIONS.md`.

The requested Taylor units start in Salem pending the user's location verification:

- 150/100 Curving Unit #1
- 150/100 Curving Unit #2
- 150/200 Curving Unit #3

Creation is separate from schema migration, bounded to the verified Taylor company and performed only after checking existing records for duplicates. Do not recreate them when replaying migrations.

Rollback: restore the previous frontend if needed, keeping the additive type support, history and records. Do not drop the type constraint support while traveling rows exist, rewrite past work locations, delete financial records, or detach equipment as rollback.
