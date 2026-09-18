# App-Wide Pre-Release Verification

## Scope

Started 2026-09-18 on the local messaging candidate. No push or production release.
Test each identified tab/workflow using repeatable isolated fixtures, browser UI,
persisted-record assertions, role boundaries and failure/retry checks. Existing
unit/static proof does not substitute for a signed-in lifecycle.

No finite suite establishes every possible sequence, device or external failure.
This matrix records specific evidence and explicitly unproven paths. It is not an
unqualified release approval.

## Verification Matrix

Executable checkpoint: `7b3bbec`. Final browser/gate reruns are in progress.
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
removal, never a broad name-only delete.

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
Both are applied only to the isolated testing platform. Production remains
unchanged. Full candidate reruns are recorded above once done.

## Release Boundaries

- This is a local candidate, not a production release or hosted-release smoke.
- Five dated migrations remain pending in production: the three Messages
  migrations (`202609171659`, `202609171801`, `202609171830`) followed by the two
  app-wide corrections (`202609181444`, `202609181531`). Review and verify their
  production application before releasing the corresponding frontend.
- Physical iOS/Android camera/library, microphone/codec and virtual-keyboard
  checks remain open. Desktop WebKit is not a substitute for an actual iPhone.
- Real invite acceptance, password-reset delivery and external request-email
  delivery need separate controlled acceptance checks.
- Offline telemetry does not provide a durable offline write queue. Storage
  restore and large-volume load testing remain separate readiness workstreams.
- Roll back frontend presentation independently of data. Do not remove business
  records or restore the superseded permission checks to roll back a UI release.

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
