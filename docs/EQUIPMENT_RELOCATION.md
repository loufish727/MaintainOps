# Equipment Relocation

## Preview Scope

This change is local and on the isolated testing platform only. Production data and
hosting have not been changed for relocation. Migration prerequisite:
`supabase/migrations/20260924054238_equipment_relocation.sql`.

Traveling Equipment is for routinely shared standalone machines. A one-time move
does not require changing the equipment type. Managers/admins use Equipment ->
equipment details -> Actions -> Relocate Equipment. Technicians and production
users retain existing operational editing and traveling-location permissions, but
cannot relocate normal equipment or reclassify existing equipment into/out of
Traveling Equipment. Accounting is read-only for these operations.

## Reviewed Move

1. Choose a destination facility in the same company.
2. Select the directly attached branches that move. Each selection includes its
   complete subtree. Choices use twelve-item pages; selection persists between pages.
3. Review the moving and staying lists, then confirm explicitly.

The root always moves. Unchecked branches stay at the source and lose their parent
link to the root; their descendants remain linked to them. A root with a parent
also detaches from that parent. Detachment events are recorded on both endpoints,
with the actor, time and relocation context. Each moved item gets a facility event.

Equipment identity, type, condition, files, financial records and part links remain.
Existing work orders keep their facility and assigned person while remaining linked
to the same asset. Inventory stock is not transferred. Area / spot is cleared for
moved equipment. PM visibility and new generated work follow the equipment's current
facility; existing PM rows and historical work are not rewritten.

Unsaved equipment edits block opening the relocation review. A timeout or uncertain
response requires Review Again, not an automatic retry. No full workspace reload,
polling, transit state, planned destination or logistics workflow is added.

## Integrity

- Invoker-only RPCs, pinned search paths, live membership checks and existing RLS.
- Review token includes hierarchy, condition, facility, classification and revision.
- Stale reviews, invalid branches, foreign facilities, loops and mixed-facility
  hierarchies fail closed. Reviews over 250 records or 63 levels are rejected.
- Detachments, location changes and history share one transaction. History failure
  rolls back the move. Final deferred relationship checks run before success returns.
- Rare relocations take a SHARE ROW EXCLUSIVE asset-table lock with a three-second
  lock-wait limit. Reads remain available; asset writes across companies can wait.
- Structural statements use a nonblocking advisory gate before row locks. Contenders
  receive HTTP 409 and must review/retry. Routine detail saves omit unchanged parent
  and type columns. Older clients that still send these columns can take this gate.
- Arbitrary external transactions can still cause row/table deadlocks or lock timeouts;
  PostgreSQL rolls back the affected transaction. A lost client response is not proof
  of rollback. There is no automatic replay of an uncertain relocation.

## Verification

- `equipment-relocation-sql-smoke.js`: real migrations/RLS in disposable PGlite,
  role and tenant denials, selective/nested moves, detach history on both sides,
  unchanged linked records, stale/phantom reviews, rollback and PM destination.
- `equipment-relocation-browser.spec.js`: Chrome and WebKit at 320/390/430/1440px,
  escaping, 48px actions, branch pagination, draft protection, cancellation,
  double-submit prevention, stale review and late-response scope isolation.
- `equipment-relocation-live.spec.js`: localhost/QA-only authenticated mutation
  proof using run-owned fixtures and cleanup. Added to authenticated LFES in both
  Chromium and WebKit. Controlled native concurrency requires the additional
  `LFES_RELOCATION_CONCURRENCY=1` flag and temporary QA-only helpers, removed afterward.
- Lazy-loader tests cover cold equipment details opened outside Equipment.
- Existing traveling, PM, equipment draft/history and permission suites remain required.

Browser emulation is not a physical iPhone test. Automated LFES is evidence for the
listed cases, not a claim of every possible workload or recovery scenario.
