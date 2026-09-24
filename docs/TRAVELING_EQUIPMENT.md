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

### Traveling Units Board

The topbar Traveling Units command opens a company-wide board within Equipment.
It shows current facility in blue lettering, previous facility, last move actor/time,
condition and server-counted open work. It does not add planned destinations or transit states.
Update Location and Update Condition are independent, explicit save/cancel dialogs;
Equipment Details opens the same permanent asset and returns to the board.
Accounting sees the board/details without editing controls. Twelve units per page
are discovered server-side, independently of startup inventory and work-queue limits.

The board's script and stylesheet load only on demand. Each open/page/save reads a
bounded summary; there is no polling, full workspace reload or added startup query.
In-memory equipment and derived PM facility state update after a save. Existing work,
stock, PM database rows, attachments and finance are not relocated or rewritten.

Migration `20260924050141_traveling_units_board.sql` adds a protected revision
counter, structured movement events and invoker-only summary/update functions.
Direct clients cannot insert movement events or set the revision. Location/status
changes increment it, preventing stale board and Equipment edit forms from undoing
newer changes, including a move away and back. The original move RPC remains for
older clients; its expected-location check is weaker than the new revision contract.
New quick condition updates and their history save atomically. Expected conflicts
return HTTP 409, not a retryable database serialization failure.

Legacy movement events are not rewritten. Previous facility is recovered only when
the complete recorded summary exactly matches one unique pair of company facility
names; otherwise the board directs the user to history. New moves retain name
snapshots even if a facility is subsequently renamed. Missing actor names never show UUIDs.

`traveling-units-browser.spec.js` covers 320/390/430/1440px layout, 48px actions,
escaping, modal preservation during redraw, cancellation and late-save scope changes.
It is included in the Release Gate; WebKit is also run for this release.
The authenticated traveling lifecycle also exercises board paging, independent
condition/location changes, latest-change conflicts, actor/previous facility,
PM visibility without a workspace reload, accounting denial and retained history.
The SQL suite checks counts beyond 1,000 work orders, complete paged discovery,
forged-history rejection, revision protection, rollback and all operational roles.

`node tests/smoke/traveling-equipment-sql-smoke.js` uses disposable in-memory PostgreSQL and real migrations/RLS to check relationship preservation, permission boundaries, hierarchy guards, stale moves, retry idempotency, history rollback, PM generation, completion/reopen/delete and invoker-only privileges.

`traveling-equipment-display-smoke.js` checks company-wide versus local filtering, escaping and hierarchy choices. `traveling-equipment-workflow-smoke.js` checks confirmation/cancellation, duplicate submissions, errors, account/context races and stale edit payloads. `workspace-startup-paged-maintenance-smoke.js` verifies derived PM location without added startup queries or mutation of source rows.

`tests/smoke/traveling-equipment-live.spec.js` requires the explicit `LFES_TRAVEL_MUTATIONS=1` switch, isolated QA host/company and a localhost frontend configured to QA. It creates run-owned fixtures, tests desktop/mobile paging, a technician move and retained work/history, accounting read-only access, and PM visibility/generation at the destination. Cleanup is restricted to run-owned IDs. Authenticated LFES runs this suite in Chromium and WebKit.

The broader Strict LFES command includes the Node tests, bundle budgets, isolated schema, security and existing regression suites. Browser automation is not a physical-device field test or proof of every possible concurrent workload.

## Deployment

Verified board release candidate: Full Strict LFES (13 stages) and authenticated LFES (9 stages) passed on clean code commit `b92debd` on 2026-09-23 local time. The latter includes desktop/mobile traveling lifecycle and account/location checks in both Chromium and WebKit. Production board schema has been applied without changing the existing business records; the three requested units were created in the earlier release and were not recreated. See `APPLIED_MIGRATIONS.md` for the fingerprint comparison. GitHub's required Release Gate governs frontend publication.

Database prerequisites: `supabase/migrations/20260924025115_traveling_primary_equipment.sql`, then `supabase/migrations/20260924050141_traveling_units_board.sql`.
Apply and verify on QA before production. The migration changes no existing business rows and introduces no security-definer function or new public table. Record production application separately in `APPLIED_MIGRATIONS.md`.

The requested Taylor units start in Salem pending the user's location verification:

- 150/100 Curving Unit #1
- 150/100 Curving Unit #2
- 150/200 Curving Unit #3

Creation is separate from schema migration, bounded to the verified Taylor company and performed only after checking existing records for duplicates. Do not recreate them when replaying migrations.

Rollback: restore the previous frontend if needed, keeping the additive type support, history and records. Do not drop the type constraint support while traveling rows exist, rewrite past work locations, delete financial records, or detach equipment as rollback.
