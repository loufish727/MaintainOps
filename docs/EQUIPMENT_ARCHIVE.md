# Equipment Archive / Delete

## Release State

The prerequisite `supabase/migrations/20260924202304_equipment_archive_restore.sql`
was applied to isolated QA (`fsxqrngpaseqdxijggcm`), then production
(`lbphkzznvvumemdkqoay`) at 2026-09-24 21:32:57 UTC after user release authorization.
Production postflight passed; frontend publication is tracked by PR #72 and the
required GitHub Release Gate. No equipment or teammate default was changed by
the migration. Never deploy the separate QA cleanup helper to production.

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
  company/IDs/names; fixtures are restored, Storage objects removed through Storage
  API, then only owned disposable rows removed through guarded QA cleanup. Never use this
  cleanup against production or restore authenticated hard-delete permissions.
- Archive and existing relocation/travel lifecycle tests use the separate
  `tests/fixtures/qa-equipment-cleanup.sql` helper installed in QA only. It requires
  the fixed QA company's admin, a validated random fixture prefix, owned asset IDs,
  and no remaining work, PM, requests, part links or files. Tests assert manager
  denial, invalid-prefix denial and connected-record denial. Never include this
  helper in a production deployment. Relocation/travel manifests are attached to
  test results; the archive manifest remains private. Archive retention runs in
  both Chromium and WebKit as part of the authenticated LFES command.
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

Verified 2026-09-24 UTC:

- Full Strict LFES: **13/13 PASS**, clean worktree at `039a2bb`. Evidence:
  `LFES/private/archive-final-strict-evidence/lfes-strict-summary.json`.
- Isolated PostgreSQL: **85/85 PASS**, including ten archive groups and 28
  additional denied-write assertions from the independent review. All 22 dated
  migrations compiled. Recursive SQL audit inspected 123 application/QA SQL files,
  145 function declarations and 101 security definers with pinned search paths.
- Authenticated LFES: **13/13 PASS**, completed `2026-09-24T21:16:11Z` against
  localhost and isolated QA. Includes five roles, Chromium/WebKit archive retention,
  relocation, traveling equipment, production notifications and account switching.
  Evidence: `LFES/private/archive-final-auth-evidence/lfes-authenticated-summary.json`.
- Focused archive UI: **8/8 Chromium and 8/8 WebKit PASS**. One earlier Windows
  WebKit invocation passed its cases but timed out during runner teardown; the
  clean rerun completed in 9.9 seconds. This is not physical-device certification.
- Signed-in startup: 30-35 requests against the existing 35-request ceiling;
  core workspace loaders ran once. No archive feature bundle loaded on startup.
- Cleanup postflight: zero run-owned equipment, work, PM, financial snapshots or
  parts remain. Uploaded proof files were removed through Storage API and checked
  using uncached reads. A cached-photo cleanup assertion and the old tests' direct
  DELETE cleanup were corrected without weakening application permissions.
- QA advisors report no missing-search-path/RLS-disabled findings. The expected
  [authenticated security-definer warning](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable)
  remains for guarded RPCs, including the QA cleanup helper. Pre-existing anonymous
  RPC notices and
  [disabled leaked-password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)
  remain outside this feature; this is not a zero-warning security claim.

The independent review covered permissions, retained references, lifecycle-event
forgery, stale revisions, lock order and asynchronous company/navigation changes.
These are risk-scoped checks, not a claim that automated tests replace LFES Gold.
These QA results do not include physical iPhone verification.

### Production Database Postflight

Applied source SHA256: `b33cd07f306d667e3dd4d04db173dd2c899f4d7a96447aeebc0a81f589a15f63`.
Original-field fingerprints match before/after across 25 business/storage relations,
including 151 equipment records, 226 work orders and 277 stored objects. Zero
equipment was archived, zero PM was paused, and company memberships are unchanged.
All 15 function bodies/configuration match tested QA. Production retains narrower
grants: six public functions omit QA's additional service-role EXECUTE permission.
No migration function is anonymous-callable. All six columns, fourteen triggers,
eight restrictive Storage policies, archive constraints and index match QA.
Authenticated hard DELETE is denied; the QA cleanup function is absent.

Production advisors retain three no-policy INFO findings, five anonymous-callable
RPC warnings and disabled leaked-password protection. Authenticated-callable
definer warnings increase from 29 to 32 for the three explicitly role-checked
archive/restore/resume RPCs. This is not a zero-warning security claim.
Exact evidence is retained in `LFES/private/archive-production-release-proof.json`.
The local Release Gate passed all twelve stages on `9d98e4a`; GitHub's executable
Release Gate also passed before the production evidence documentation update.
