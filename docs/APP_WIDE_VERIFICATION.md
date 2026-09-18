# App-Wide Pre-Release Verification

## Scope

Started 2026-09-18 on the local messaging candidate. The initial QA pass below
preceded publication; see Production Rollout for subsequent release evidence.
Test each identified tab/workflow using repeatable isolated fixtures, browser UI,
persisted-record assertions, role boundaries and failure/retry checks. Existing
unit/static proof does not substitute for a signed-in lifecycle.

No finite suite establishes every possible sequence, device or external failure.
This matrix records specific evidence and explicitly unproven paths. It is not an
unqualified release approval.

## Final Results

Verified locally on 2026-09-18 against the isolated testing platform. Application
code checkpoint: `7b3bbec`; final verification-tool checkpoint: `24632a8`.
Subsequent documentation changes do not change the tested executable candidate.

| Proof | Result | Evidence scope |
| --- | --- | --- |
| Full Strict local | PASS | 13 stages, clean worktree at `24632a8`; includes Release Gate coverage, 177 Node smoke files, 28 targeted browser cases, resources and desktop/mobile 3D interaction |
| Authenticated LFES | PASS | All 5 stages; 46 boundary PASS, 5 INFO, 0 FAIL; five Chromium roles, both Production lifecycles and WebKit admin |
| App-wide lifecycle | PASS | 20 scenarios in Chromium and 20 in WebKit; no skipped, flaky or failed final cases |
| Role/tab layouts | PASS | 68 permitted role/tab pairs at two widths in each engine: 272 viewport checks across 16 unique tabs |
| Messaging regression | PASS | Two signed-in lifecycle/tools suites in each engine; 11 additional focused WebKit presentation/audio/confirmation cases |
| Isolated database | PASS | 62 checks, including all 14 dated migrations, role boundaries, conversion rollback/retry and part usage |
| Static security | PASS | 114 SQL files, 101 parsed functions, 89 security definers and 35 reviewed DOM assignment sites |
| Dependency audit | PASS | `npm audit`: 0 reported vulnerabilities |
| Fixture cleanup | VERIFIED | 130 exact run-scoped companies and 33 generated conversations removed; no remaining fixture files; original 8 work orders, 3 requests and 2 manual conversations retained |

During that initial QA pass, no GitHub workflow was dispatched, no production
migration was applied, and no push or deployment occurred. Two reviewers contributed findings;
the parent review reproduced and corrected the 11 app defects below. This human
review and its residual risks remain separate from the automated pass counts.

Startup measured 31 requests for admin, manager and accounting, 30 for production,
and 35 for technician against the unchanged 35-request budget. WebKit admin used
31. No optional feature bundle loaded on My Work. Chromium workspace visibility
was 1.85-1.88 seconds on this local QA run, not a production or phone benchmark.
The technician baseline has no request-budget headroom; this is not a large-volume
scalability claim. Initial JS/CSS is 777,431 decoded / 176,241 gzip bytes, and lazy
Messages JS/CSS is 26,088 gzip bytes. No budget, dependency or polling was added.

Private evidence includes the three `appwide-*-reviewed*.json` reports, messaging
JSON reports, `LFES/private/appwide-proof-20260918/`, timestamped LFES proof
snapshots, fixture manifests and guarded cleanup SQL/results. Credentials and
browser traces are not committed.

## Verification Matrix

The table names the signed-in cases, not every feature on the screen. The broader
Node, isolated-database and browser regression suites are recorded separately.

| Area | Signed-in scenario coverage | Explicit boundary |
| --- | --- | --- |
| Auth and workspace | Five role sessions, permitted tabs, company isolation, location switching, startup budgets | Real password changes/reset-email acceptance are not exercised with shared QA credentials |
| My Work | Assigned queue, Team drill-through, Quick Fix completion/follow-up; separate Production Action/Ready lifecycle | Every gauge/filter combination is not a separate live scenario |
| Work Orders | Guided create, failed-save draft/retry, assign, block/unblock, edit, checklist/safety, comments, photos, parts, completion, 12-row pages and 13-row CSV | New-order lost-response idempotency and every reopen/delete variant are not proven |
| Planning | 12+2 undated rows, set due removes item, create follow-up, open original from both cached and cold completed records | All date/time-zone boundary combinations remain unit-level evidence |
| Requests | Anonymous QR intake, photo-library input contract, conversion attribution/link, committed-but-lost-response retry | Internal request photo lifecycle, reject/delete and request CSV are not signed-in browser scenarios in this run |
| Equipment | Create, operational edit, delete cancellation/deletion, retained finance, file upload/delete, history paging/back, linked-parts draft/save | Full hierarchy editing and audit export are covered by existing smokes, not a new end-to-end browser case |
| Financial | Accounting save/reviewer, manager UI/API read-only, operational rename, deletion banner/retention, continued archived editing, mobile form | Full-register CSV and permanent financial deletion are not new signed-in cases |
| PM | Create schedule, link procedure, generate order, advance due date | Delete/retry under an ambiguous generation response is not proven |
| Procedure Checklist | Template and required step creation, result save, delayed-save draft retention, required completion, referenced-template delete guard | Arbitrary step reorder/delete combinations are not exhaustively exercised |
| Parts | Create, restock/use/edit, concurrent stale forms, overlapping detail reads, explicit reopen recovery, work usage/quantity/actor, Accounting RPC denial | Part documents and permanent deletion remain existing smoke evidence |
| Conversions | Inch/mm and swap, freezing and negative temperature, hidden reference charts, mobile bounds | Physical screen calibration accuracy is not proven |
| Messages | Separate lifecycle/tools suites: paging, real incoming messages, drafts/retry, quotes/reactions, archive/mute, search/discussions, private attachments/voice, Activity | Simulated microphone is not real-phone codec/capture proof; see messaging report |
| Team | Role round trips, scoped profile/mobile flag, password mismatch validation, invite create/cancel, link create/revoke, workload totals/drill-through | New-account invite acceptance and actual password updates are not exercised |
| Manager | Seeded blocked total, drilldown to exact assigned order, mobile navigation | Every trend/report/export option is not a new signed-in scenario |
| Admin Setup | Role route, setup disclosures/content; separate storage and permission checks | No destructive admin repair/setup operation against production |
| Settings | Company rename, location creation, QR create/disable/reactivate | Actual email delivery, logo replacement and location deletion are not new signed-in cases |
| App Performance | Five-role lazy-frame readiness/back and viewport bounds; Full Strict exercises desktop/mobile scene interaction | Software-rendered desktop tests do not measure physical phone performance |

## Isolation

New tests refuse production hosts and create UUID-named disposable companies only
inside the testing platform. Five pre-existing QA identities are members of these
temporary companies; production memberships and manual QA fixtures are unchanged.
Each case records its company ID before mutations. File cleanup is confined to its
company prefix. Company cleanup requires exact recorded IDs and verified storage
removal, never a broad name-only delete. Verification checks both company-prefixed
objects and request-ID-prefixed photo objects before database cleanup.

Request-email delivery is suppressed in the browser fixture and temporary
companies start without notification recipients. This proves application behavior,
not actual external email delivery. Real-phone capture/keyboard, auth email links,
external provider delivery, production deployment/restore and large-volume load
tests must remain explicitly separate until actually exercised.

## Confirmed Defects Corrected

- Team role updates: a PL/pgSQL variable named `current_role` collided with the
  PostgreSQL keyword. The RPC now uses `actor_role`, denies missing membership,
  and serializes company role changes while preserving self/last-admin guards.
- Request conversion: separate insert/link writes could leave an unlinked order
  and create a second one on retry. A caller-RLS RPC now locks the request and
  performs creation, linking, reviewer attribution and history in one transaction.
- Checklist saves: a completed background save rebuilt the detail screen and
  erased an in-progress completion draft. It now updates only checklist feedback.
- Inventory: stale Restock/Use/Edit screens could silently replace another
  user's quantity. Compare-and-set writes now fail visibly on conflict, retain
  the entry, and do not automatically refresh. Use above available stock fails.
- CSV: paged Work Orders and Requests exported only their loaded slice. Exports
  now fetch the entire matching query, with count/duplicate/scope/error checks
  and no partial download. A 100,000-record ceiling requires narrower filters.
  This is not a transactional database snapshot under concurrent edits.
- Equipment History: its detail loader grouped events by `work_order_id`, losing
  visible equipment events. Group replacement now accepts `asset_id` explicitly.
- Equipment navigation: the card click listener also matched history paging and
  relationship controls carrying `data-asset-id`. It now binds only asset cards,
  keeping Next/Previous and expandable relationship controls in their own views.
- Independent-review expansion: obsolete part detail reads could change the cache
  behind a visible form and defeat its quantity comparison. Loads now carry a
  caller-validity guard; inventory writes compare against the bound form snapshot.
- Part usage RPC: Accounting could deduct stock through a membership-only
  security-definer function. The new migration enforces operational-editor access.
- Linked equipment parts: recreated open disclosures repeatedly rerendered and
  detached their own input controls. Unchanged toggle events are ignored and
  already-loaded sections keep their DOM and drafts intact.
- Planning originals: completed orders outside the active work slice opened a
  missing-record screen. Mini links now use the existing linked-record loader,
  including detail relationships and cancellation after navigating away.

The new database contracts are
`supabase/migrations/202609181444_appwide_role_and_request_integrity.sql` and
`supabase/migrations/202609181531_work_part_usage_operational_boundary.sql`.
Both initially applied only to the isolated testing platform. They subsequently
applied to production with PR #49. Full candidate QA reruns are recorded above.

## Verification Corrections

- Independent-review failures were first reproduced on the older candidate;
  they were not dismissed or converted into passing assertions.
- An earlier Windows WebKit run finished its assertions but hung in worker
  teardown and required stopping that worker. It is not the final clean proof.
  The final WebKit run completed normally in separate 15-workflow and 5-role
  batches, followed by the clean 13-case messaging run.
- The private preview server initially excluded tracked `auth/callback` files.
  Its allowlist was corrected and the complete Strict suite rerun; the resource
  assertions were unchanged.
- Windows shell splitting of the authenticated runner's multiword `--grep`
  accidentally selected an opt-in app-wide case. Its guard refused before writes.
  Playwright now runs directly through Node with preserved argv; a Windows/Linux
  command regression was added. Authenticated LFES and Full Strict both passed
  again at `24632a8` with a clean worktree.

The testing-platform advisor output is retained separately and is not an
all-clear: it includes callable SECURITY DEFINER warnings and disabled leaked
password protection, including testing-platform functions outside this app's
SQL inventory. No unrelated platform functions or Auth settings were changed.
See the provider's [RPC warning guidance](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable)
and [password protection guidance](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

## Release Boundaries

- The initial candidate is now deployed through PR #49. All five dated migrations
  (`202609171659`, `202609171801`, `202609171830`, `202609181444`, `202609181531`)
  applied and passed production postflight before that frontend merge.
- Physical iOS/Android camera/library, microphone/codec and virtual-keyboard
  checks remain open. Desktop WebKit is not a substitute for an actual iPhone.
- Real invite acceptance, password-reset delivery and external request-email
  delivery need separate controlled acceptance checks.
- Focused contrast, layout and keyboard regressions are not a complete
  accessibility or screen-reader conformance audit.
- Offline telemetry does not provide a durable offline write queue. Storage
  restore and large-volume load testing remain separate readiness workstreams.
- Roll back frontend presentation independently of data. Do not remove business
  records or restore the superseded permission checks to roll back a UI release.

## Production Rollout

On 2026-09-18 the user authorized publishing and live retesting. PR
[#49](https://github.com/loufish727/MaintainOps/pull/49) merged as `6ced496` only
after production prerequisites and the required Release Gate passed. Branch
protection and administrator enforcement were not bypassed.

- [Release Gate](https://github.com/loufish727/MaintainOps/actions/runs/35367888398): PASS.
- [Pages deployment](https://github.com/loufish727/MaintainOps/actions/runs/35368051421): PASS.
- [Hosted App Smoke](https://github.com/loufish727/MaintainOps/actions/runs/35368132376): PASS.
- Local hosted verification: both resource/shell cases and the exact-commit GitHub
  smoke check passed. All 14 served entry/bundle files matched local bytes.
- Database: 14 reviewed function bodies matched; RLS, RPC grants, private bucket
  and realtime publication verified. Existing-field fingerprints for 18 tables
  and all stored-object metadata matched preflight exactly. See the migration log.
- Signed-in production browsing used the user's Taylor session and existing Salem
  records. Messages connected, rendered existing history and returned scoped
  content-search results. Planning opened an uncached completed original;
  Equipment History displayed events/actors; Financial opened its own detail.
  The permitted tabs were visited and their desktop/mobile DOM bounds inspected.
- Performance reached `platform-spatial-ready` and its Back link worked. The
  unchanged spatial bundle emitted nonfatal Three.js texture-without-image warnings;
  browser error logs were empty. This is not a claim that all console warnings are
  resolved. The in-app browser's desktop screenshot capture did not yield reliable
  pixels after viewport override; live desktop proof is DOM/layout, not a new
  desktop screenshot approval. Prior isolated visual proof remains separate.

Live retesting caught an additional display defect: loading a linked completed
order polluted the shared cache used as the active work list, so an extra card
could remain after returning, despite the correct server count. The follow-up
keeps explicit server-page IDs separate from detail/history/notification records,
preserves page order and updates, and adds no refresh or network request. A new
Node regression first failed on the deployed source, reproducing the extra rows.
The signed-in Planning case now also asserts the return list excludes the linked
completed order. Follow-up [PR #50](https://github.com/loufish727/MaintainOps/pull/50)
contains the correction and release evidence. At `0c59ad5`, Full Strict passed all
13 stages with a clean worktree (178 Node smoke files). Five focused signed-in
scenarios passed in each of Chromium and WebKit: part-usage permissions, linked
parts, Planning original/return, paging/filter/search/location/export, and saved
work/Manager drilldown. All ten disposable QA companies were removed with exact
ID/creator/name/storage guards; the manual 8-order/3-request/2-conversation baseline
remained intact. Initial JS/CSS is 777,549 decoded / 176,263 gzip bytes, a 22-byte
gzip increase with no added requests. The first rerun correctly stopped on a stale
generated script inventory; regenerating that document preceded the full clean pass.
Final deployed commit and hosted retest are attached to that release PR.

The subsequent live path starting in My Work exposed a separate return-scope
defect: Back to Work Orders reused the personal page under all-work filters.
[PR #51](https://github.com/loufish727/MaintainOps/pull/51) tracks loaded section
and page ownership. Detail, Messages and Performance returns load the destination
queue only when it differs; same-page returns retain the cache with no refresh.
The regression failed before the correction and passed after it. Full Strict
passed all 13 stages at clean executable checkpoint `b60a85b`. The signed-in
Planning regression now enters from both scopes and exercises the mobile Messages
exit. Initial JS/CSS is 777,835 decoded / 176,379 gzip bytes, 116 additional gzip
bytes versus PR #50. No database changes or background polling were added.
Final browser results, fixture cleanup and deployed retest evidence are attached
to PR #51; physical-device limitations above still apply.

No operational create/save/assign/send/delete controls were used on production.
Normal sign-in housekeeping, telemetry and conversation read markers may run during
browsing; those are not represented as a zero-write session. Destructive and
failure/retry lifecycles remain isolated-QA proof, not live-company tests.

## Reproduction

`npm run test:lfes:appwide` runs the signed-in lifecycle suite. Add
`-- --browser=webkit` for the second engine. It requires the existing protected
five-role `LFES_*` credential environment, `LFES_APPWIDE_MUTATIONS=1`, and a local
`MAINTAINOPS_BASE_URL` serving the candidate against the allowlisted test backend.
Missing credentials or the wrong backend fail closed. Never commit credentials,
browser traces, session headers or private test reports.

Set `MAINTAINOPS_CHROMIUM_CHANNEL=chromium` to use Playwright's full Chromium
headless engine instead of its separate headless shell. Unset it for WebKit.
Role-navigation tests use Efficient 3D mode on the software-rendered test host;
the separate Full Strict spatial tests exercise Auto/Ultra and inspect canvas
pixels. Neither is a physical-phone performance measurement.

Each run creates temporary companies rather than reusing manual QA records.
Storage cleanup runs through the storage API in test teardown. Database cleanup
is a separate privileged step using only the recorded manifest IDs, checking the
creator, QA name and empty storage prefix before removing companies and children.
Do not delete companies by name alone. Archive evidence before Full Strict or
Authenticated Proof, which replace their evidence directory. This lifecycle suite
does not silently become part of the fast required Release Gate.
