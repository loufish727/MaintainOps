# Equipment Relocation

## Scope

Migration applied to isolated QA and production on 2026-09-24 UTC. Release is
tracked in PR #70; merge/deployment checks determine frontend availability. Prerequisite:
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
- Normal facility writes require the reviewed RPC, including manager/admin writes.
  Older open forms cannot silently restore a previous facility after relocation.
- Equipment deletion confirms the database returned the deleted ID before Storage
  cleanup. Rejected or uncertain deletion leaves files alone. Cleanup is not a
  cross-service transaction: failure warns that files may remain for admin cleanup;
  no durable automatic cleanup queue is included. Late completion cannot close a
  different equipment editor or replace a changed account/navigation context.
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

### Verified Preview

Full Strict LFES passed 13/13 stages on clean code commit `dad9323`, including
104 targeted browser regressions. Authenticated LFES passed 11/11 stages on
`c7ff2ec` on 2026-09-24 UTC. The only difference is a test readiness wait before
mobile geometry probes; application code and schema are identical. The first
authenticated run exposed a detached-element test race during lazy loading; the
complete rerun passed without removing any mobile tap assertions.

Chromium and WebKit both passed signed-in relocation, traveling lifecycle and
account/location switching. Separate controlled native transactions passed
competing relocation, structural contention/retry, cycle refusal and queued
old-facility child-insertion refusal. Temporary helpers were removed. Full-row
fingerprints for all eleven tracked QA relations match the original baseline
after the final authenticated run. No production migration, test move or push
was performed during that preview. A read-only peer review has no remaining
safeguard blocker after the release corrections described above.

### Equipment Home Navigation

The main Equipment tab returns to the overview, clearing the traveling board,
selected detail/history, search, equipment type/condition/area filters and paging.
It retains the active company and facility. Back to Traveling Equipment remains
a separate contextual return action. Signed-in traveling tests cover board,
detail, type-filter and cross-tab returns at 1440/390/430px in both browser engines.

Release candidate startup JS/CSS measured 742,939 decoded bytes / 172,939 gzip bytes, down from
770,295 / 179,055. Equipment details and relocation share the on-demand maintenance
bundle; initial budgets remain unchanged. QA security advisors are unchanged:
five no-policy INFO findings, five anonymous-callable and 31 authenticated-callable
definer warnings, plus disabled leaked-password protection. This change introduces
no security definer. Existing findings remain separate work; see
[RPC guidance](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable)
and [password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

### Release Verification

Full Strict LFES passed 13/13 stages on clean `d2ced2e`, including the final
Equipment-home navigation, rejected-deletion file preservation, stale-manager-form
denial and delayed-delete navigation guard. The preceding authenticated run passed
11/11 stages; a complete rerun against `d2ced2e` is required before merge. The final
authenticated result, required GitHub gate and deployment result are recorded in
[PR #70](https://github.com/loufish727/MaintainOps/pull/70).

Production's read-only authenticated relocation review returned successfully.
The migration did not rewrite any of the 25 fingerprinted business/storage
relations. All eight migration functions match QA, with no new definer or changed
RLS policies. Source-level peer review has no remaining targeted findings. No
production equipment moves/deletes were used for verification. Browser WebKit
evidence remains emulation, not a physical iPhone/Safari certification.
