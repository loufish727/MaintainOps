# App-Wide Pre-Release Verification

## Scope

Started 2026-09-18 on the local messaging candidate. No push or production release.
Test each identified tab/workflow using repeatable isolated fixtures, browser UI,
persisted-record assertions, role boundaries and failure/retry checks. Existing
unit/static proof does not substitute for a signed-in lifecycle.

No finite suite establishes every possible sequence, device or external failure.
This matrix records specific evidence and explicitly unproven paths. It is not an
unqualified release approval.

## Work In Progress

| Area | Planned proof | Current status |
| --- | --- | --- |
| Auth and workspace | Sign-in/out, role routes, company/location changes, stale scope, drafts | Existing proof; expanded run pending |
| My Work | Assignment, gauges/filters, Quick Fix, production handoff | Expanded lifecycle pending |
| Work Orders | Create/edit/status/checklist/safety, comments, photos, parts, completion, reopen, paging/export | Expanded lifecycle pending |
| Planning | Undated/due/follow-up groups, set due, original/follow-up links, paging | Expanded lifecycle pending |
| Requests | Internal and public intake, photos, convert, Quick Fix, reject/delete, retry | Expanded lifecycle pending |
| Equipment | Create/edit/hierarchy, history, linked work/parts/PM, files, delete, export | Expanded lifecycle pending |
| Financial | Accounting edit, manager read, filters/export, operational-delete retention | Expanded lifecycle pending |
| PM | Schedule creation/generation/deletion, due advancement, linked procedure | Expanded lifecycle pending |
| Procedure Checklist | Templates, steps, results, required completion guard, delete traceability | Expanded lifecycle pending |
| Parts | Create/edit/restock/use, work-order usage, documents, delete guard | Expanded lifecycle pending |
| Conversions | Units, reference visibility, calibration, local preference behavior | Expanded browser proof pending |
| Messages | Paging, live events, permissions, retry, media, voice, Activity | Full scoped proof 2026-09-17; regression rerun pending |
| Team | Profile, role changes, invites/links, totals, restrictions | Expanded lifecycle pending |
| Manager | Measured totals, drilldowns, report/filter controls | Expanded browser proof pending |
| Admin Setup | Setup disclosure, version/status and QR controls | Expanded browser proof pending |
| Settings | Company/location settings, logo, public links, notification recipients, storage | Expanded lifecycle pending |
| App Performance | Lazy load, gauges, objects, quality, mobile taps, back/fallback | Full scoped proof 2026-09-17; regression rerun pending |

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

The new database contract is in
`supabase/migrations/202609181444_appwide_role_and_request_integrity.sql`.
Production remains unchanged. Full candidate reruns are recorded above once done.

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
