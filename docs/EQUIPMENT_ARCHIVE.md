# Equipment Archive / Delete

## Release State

Implemented locally on `codex/equipment-archive-20260924`. The prerequisite
`supabase/migrations/20260924202304_equipment_archive_restore.sql` was applied to
the isolated testing platform (`fsxqrngpaseqdxijggcm`) on 2026-09-24 UTC.
Production (`lbphkzznvvumemdkqoay`) is unchanged. This feature is not yet pushed
or released. Apply and verify the database prerequisite before publishing the UI.

## User Contract

- Managers/admins use Equipment -> equipment details -> Actions ->
  **Archive / Delete Equipment**. Reasons are Sold, Scrapped, Delete, and Other.
  Other requires notes. Confirmation explicitly says the action is reversible.
- The permanent equipment ID remains. The record disappears from normal
  equipment lists, pickers, counts, exports and the Traveling Equipment board.
- Managers/admins can open **Archived Equipment** from Equipment. Search and
  facility filters are explicit; list and related history use twelve-item pages.
- Completed work, equipment events, files, photos, part links, part usage and
  financial records remain attached. No Storage objects are deleted or resized.
  Historical work remains readable, with an Archived equipment notice, but
  cannot be reopened, edited, deleted or detached until the equipment is restored.
- Financials keeps the asset and an archive banner, including archive fields in
  CSV. Accounting/admin retain financial edits; managers remain read-only.
  Operational archival does not infer a sale price, disposal date or depreciation.
- Open work, unfinished production actions, outstanding follow-ups and submitted
  requests block archival of the affected selected equipment. Nothing is silently
  completed, cancelled or reassigned.
- Managers explicitly select direct attached branches to archive together,
  including all descendants. Unchecked branches stay active and detach. The root
  also detaches from its own active parent. Both endpoints get history events.
- Active PM is paused. Inactive PM is not marked for automatic resumption.
  Restoration retains condition, facility and selected-child relationships. It
  does not mark equipment Running, reattach the root to its former parent or
  resume PM. Review / Resume PM requires a manager/admin to review its next date.

## Safeguards

Archive/restore review tokens cover connected work and the equipment hierarchy.
Stale reviews, invalid branches, cross-company references, hierarchy loops and
oversized trees fail closed. Archive, detachments, PM pause and audit events share
one PostgreSQL transaction. Lifecycle events cannot be forged through the client.
Resume PM locks its schedule before equipment; archive takes schedule locks before
asset locks, matching PM generation order. A lock timeout or uncertain response
requires review again; the UI does not automatically replay the operation.

The migration revokes authenticated asset DELETE and rejects direct lifecycle
column changes. Guards also protect OLD references so history cannot be unlinked
or moved to another company. Restricted Storage writes protect existing equipment,
work-order and request attachments. Accounting's hidden UPDATE-lock targets fail
closed instead of being mistaken for nonexistent/unlinked equipment.

Archived records remain company-readable under existing SELECT policies for
historical joins and Financials. The manager-only archive screen/RPC does not
claim that archived table rows are confidential from other company members.
Privileged database-owner maintenance remains outside application permissions.

Archive UI lives in the existing lazy maintenance bundle. Routine startup only
loads active equipment/PM; no archive-list request, full bootstrap, polling or
automatic page refresh is added. Initial compressed resources remain within the
unchanged 175 KiB aggregate budget (173,518 bytes measured locally).

## Verification

- `scripts/isolated-equipment-archive-check.js`, invoked by
  `scripts/isolated-schema-check.js`: actual migrations, permissions, cross-company
  denial, direct-delete denial, stale reviews, blockers, retained IDs, finance,
  hierarchy, PM pause/resume, twelve-item paging and stale-client protections.
- `tests/smoke/equipment-archive-browser.spec.js`: eight cases covering
  320/390/430/1440px, touch targets, escaping, branch paging, drafts, confirmation,
  cancellation, duplicate submit, uncertain responses and company switches.
- `tests/smoke/equipment-archive-live.spec.js`: opt-in localhost/QA-only mutation
  proof. Five signed-in roles, real archive and restoration UI, retained work and
  byte-identical uploaded photos after stale delete attempts, unchanged part stock,
  financial permissions, PM resume, traveling exclusion, and two competing archive
  requests producing exactly one audit event. Final lifecycle run passed 2026-09-24.
- Run-owned fixture IDs are written to `LFES/private/archive-live-fixture.json`.
  A new run refuses to overwrite an existing fixture. Cleanup validates exact
  company/IDs/names; Storage objects are removed through Storage API, then only
  owned disposable rows are removed through privileged QA cleanup. Never use this
  cleanup against production or restore authenticated hard-delete permissions.
- Existing relocation/travel lifecycle tests use the separate
  `tests/fixtures/qa-equipment-cleanup.sql` helper installed in QA only. It requires
  the fixed QA company's admin, a validated random fixture prefix, owned asset IDs,
  and no remaining work, PM, requests, part links or files. Tests assert manager
  denial, invalid-prefix denial and connected-record denial. Never include this
  helper in a production deployment. Run manifests are attached to test results.
- Full Strict LFES and the separate five-role authenticated proof remain release
  requirements; results are recorded in the verification section below.

## Limits And Release Notes

Browser emulation is not a physical iPhone/Safari test. Native duplicate-archive
concurrency is proven; controlled PM-generation/archive lock interleavings have
not been exercised on native PostgreSQL. Locks and transaction rollback protect
integrity, but arbitrary external transactions can still time out or deadlock.
No automated test establishes every possible workflow or production workload.

Previously hard-deleted equipment is not recovered by this feature. In particular,
the missing curving unit is not recreated. Do not roll back by dropping archive
columns or regranting DELETE: retain the data and guards and use a forward fix.
An older client may show an archived record or a blocked deletion until updated;
the database must remain authoritative.

### Verification Record

Final Full Strict LFES, authenticated proof and cleanup results: pending final run.
