# PM Lifecycle Verification

## Candidate Scope

Audit started 2026-09-22 Pacific on `codex/pm-lifecycle-audit-20260922`, based on
`c05144667902248fbaee2a6cbf2fadf07f98fce5`. The user authorized release on
2026-09-23. The branch is pushed as PR #59; production database prerequisites
have been applied and verified. The frontend remains gated until merge/deployment.
No existing Taylor business-record contents were edited by the migration.

The regression classes checked were lost form input, relationship counts that
disagree with opened history, and work-order equipment/procedure connectivity.
The audit follows those through PM, Procedures, Equipment, Planning, dashboard,
Manager, work-order detail, completion, reopening, and deletion.

## Corrections

- PM creation (both menu and equipment), checklist creation, and new-step forms
  preserve allowed text/select input across rerenders, navigation, and same-tab
  reloads. Drafts are user/company/location scoped, expire after 24 hours, and
  clear only after acknowledged success or explicit Clear Form. Files are not
  serialized. Signing out clears drafts.
- Failed checklist answers remain visibly unsaved, survive navigation/reload,
  and offer Save answer. An unchanged restored answer can be retried. A late
  successful write does not erase a newer edit. Completion blocks on pending
  answers or unverifiable checklist reads.
- Typed checklist validation distinguishes unchecked from checked, permits
  numeric zero, rejects whitespace-only answers, and validates pass/fail values.
  Answer ownership and required-completion rules are also enforced by PostgreSQL.
- One database transaction generates a PM order, advances its due date, and
  records creation history. Concurrent requests and retries reuse the existing
  occurrence. A failed transaction leaves neither half of the operation saved.
- Generated orders retain source schedule ID/title/due date even after schedule
  deletion. Equipment, location, procedure, and safety requirements are copied
  from the validated source at generation.
- Procedure deletion checks exact database counts, including retained answers
  after an order changes procedure and inactive schedules. Foreign keys prevent
  deletion of linked templates and answered steps. Equipment deletion fails
  closed when linked-PM counts cannot be verified, before deleting stored files.
- Procedure/PM startup loaders and checklist-result reads validate complete
  pages. Failed or truncated reads do not silently replace history with empty
  data. Relationship counts and PM history update their own nodes, not forms.
- Main PM/Procedure lists, equipment PM lists, generated PM history, and equipment
  work history use 12-item pages. Generated history is fetched on demand.
- Recurrence handles month ends/leap years as calendar dates; date inputs do not
  shift in positive UTC offsets. Inactive/invalid schedules do not inflate due
  metrics. PM read failures are shown as unavailable in affected PM surfaces.
- Save handlers guard duplicate actions and stale user/company/location contexts.
  Completion and history failures are distinguished, including a successful
  completion followed by a failed history write or screen update.
- Linked work-order navigation retains the equipment detail until reads complete.
  Background DOM replacement no longer cancels the click; explicit navigation,
  account/location changes, and a newer linked-record request cancel stale opens.
- Work-order safety presentation uses the actual requirement, not merely the
  presence of an equipment ID. Equipment that does not require the check no longer
  appears unassigned or incorrectly marked Required.
- PM-specific render/workflow/draft modules load as a maintenance feature chunk.
  Ordinary work queues do not load that chunk; checklist detail does. Total
  initial gzip budget remains 175 KiB. App-shell allocation increases from 47
  to 48 KiB while the overall startup cap remains unchanged.

## Database Prerequisite

`supabase/migrations/20260923051845_pm_lifecycle_integrity.sql` was applied first
to testing project `fsxqrngpaseqdxijggcm`, then production `lbphkzznvvumemdkqoay`
on 2026-09-23 after release authorization. Both public RPCs are security invoker,
authenticated-only, and company/role checked. The isolated schema test now loads
the historical procedures baseline before dated migrations, so these tables,
foreign keys, and triggers are actually exercised.

Production preflight inspected existing constraints and found zero cross-company
reference mismatches. Postflight verified grants, all five integrity triggers,
three RESTRICT foreign keys, and the unique occurrence index. The six new function
definitions and permissions match QA. Row digests and counts remained unchanged
for 216 work orders, 1 schedule, 2 templates, 4 steps, and 32 answers. Existing
security advisor findings were unchanged. The frontend must follow this verified
database prerequisite, not precede it.
There is no inferred backfill of old schedule-to-order associations.

Rollback is a separate reviewed operation. Prefer a frontend rollback while
retaining new provenance and integrity constraints; do not delete generated work
or drop history as a rollback technique. The old generator lacks atomic retry
protection and must not be treated as equivalent to the new generation RPC.

## Evidence

Verification completed 2026-09-22 Pacific (2026-09-23 UTC). Full Strict and the
separate authenticated proof ran at clean commit `fe2ac58`. Subsequent evidence
documentation does not change the tested executable candidate.

| Proof | Result | Scope / tested commit |
| --- | --- | --- |
| Required GitHub Release Gate | Release in progress | PR #59; initial run exposed the fixture readiness race below, corrected before rerun/merge |
| Full Strict local proof | PASS, 13/13 stages | `fe2ac58`; 191 Node smoke files, 81 targeted browser cases, resource checks, and desktop/mobile Performance interaction |
| Authenticated testing-platform proof | PASS, 7/7 stages | `fe2ac58`; five Chromium roles, WebKit admin, both engines' account/location switching, Production Action and notification lifecycles |
| Authenticated database/storage boundary probes | PASS | 46 PASS, 5 informational results, 0 FAIL; authenticated proof required |
| PM signed-in Chromium suite | PASS, 4/4 cases | `252cc8d`; desktop 1440px, phone 390px, pagination, and real PostgreSQL concurrency |
| PM signed-in WebKit suite | PASS, 4/4 cases | `a4a58c3`; same scenario set, final application bytes also used by `fe2ac58` |
| Isolated PostgreSQL PM checks | PASS, 17 groups | Fresh schema/migrations, transaction rollback, occurrence reuse, answer validation, ownership, and history/delete constraints |
| LFES Gold risk review | Findings recorded | Scope, code paths, persisted-state proof, failure recovery, cleanup, deployment order, rollback, and limits below; not an external certification |

The differences after the Chromium run were optional safety-note presentation,
settled-reload test synchronization, and migration filename tooling. The WebKit
run covers the final application bytes; Full Strict covers the final tooling.
All eight PM browser-suite cases ran without retries or skipped cases.

### Lifecycle Coverage

| Area | Evidence |
| --- | --- |
| PM/procedure/step creation | Signed-in desktop/phone entry, rerender, navigation, same-tab reload, failed save and retry; only successful saves clear the submitted draft |
| Generation and connectivity | Menu and equipment PM generation; persisted equipment, location, procedure, source occurrence, due-date advance and creation event |
| Concurrent generation | Real authenticated HTTP requests against QA PostgreSQL; one occurrence/order and one date advance, including retry after schedule deletion |
| Required answers | Checkbox, text, number including zero, and pass/fail; pending/failed answers block completion; failed text restored and successfully retried |
| Completion and reopening | Complete, reopen, inspect retained answers/equipment link, complete again; persisted status/timestamps and both completion history entries checked |
| Counts and history | Equipment open/completed counts and PM source history checked before/after transitions; exact procedure links include retained answers and inactive schedules |
| Deletion | Linked procedure deletion denied; schedule deletion retains work/source snapshot; work deletion updates counts; unlinked procedure can then be deleted |
| Pagination | PM and Procedure menus, equipment PM, PM source history, and equipment completed history move forward/back at 12 items |
| Other PM surfaces | Focused render/date tests cover Planning, dashboard and Manager due/unavailable states; five-role proof covers navigation/permissions, not every mutation on those screens |
| Scope and navigation races | Mocked delayed/out-of-order reads and writes, 44 linked-navigation cases, detached/replaced DOM, changed accounts/locations, and newer user edits |

### Weight And Startup

The measured initial bundle total is 772,942 decoded bytes / 178,481 gzip bytes,
versus 784,739 / 179,118 at the base. The deferred maintenance chunk is 36,695 /
11,073 bytes. The existing total initial gzip cap remains 175 KiB; this is a
weight comparison, not proof of a production speed improvement.

Signed-in QA workspace samples used 30-35 Supabase requests against the unchanged
35-request budget. Admin, Manager and Accounting used 31, Production 30, and
Technician 35; WebKit Admin used 31. Initial My Work loaded zero optional feature
bundles for every role. Workspace visibility was 1,855-2,020 ms in these six
samples. Those timings are local-preview/QA observations, not a field SLA.

### Reproduction And Artifacts

The local credential-loading wrapper points only to testing project
`fsxqrngpaseqdxijggcm`, QA company `0d6fd8f1-428d-4192-8176-48943e3ec119`, and
`http://127.0.0.1:4203/`. With the guarded testing environment configured, run:

```sh
npm run test:lfes:strict
npm run test:lfes:authenticated
npx playwright test tests/smoke/pm-lifecycle-live.spec.js tests/smoke/pm-lifecycle-concurrency-live.spec.js --workers=1
npx playwright test tests/smoke/pm-lifecycle-live.spec.js tests/smoke/pm-lifecycle-concurrency-live.spec.js --browser=webkit --workers=1
```

Run authenticated suites serially and archive `lfes-evidence` before another
LFES command replaces it. Credentials remain private and are not part of this
report. Local archives are `LFES/private/pm-strict-fe2ac58`,
`LFES/private/pm-authenticated-fe2ac58`, `LFES/private/pm-chromium-252cc8d`, and
`LFES/private/pm-webkit-a4a58c3`. Command logs are under `LFES/private/pm-*.log`.

Focused suites include `pm-procedure-lifecycle-smoke`, `pm-completion-state-smoke`,
`pm-dates-surfaces-smoke`, `checklist-results-state-smoke`,
`workspace-startup-paged-maintenance-smoke`, `maintenance-workflow-scope-smoke`,
`maintenance-create-draft-browser`, `checklist-response-draft-browser`,
`maintenance-relations-browser`, and isolated PostgreSQL PM lifecycle checks.
The draft/relationship browser regressions are included in the LFES command;
all Node smoke files are discovered by its existing sweep.

The separately opted-in `pm-lifecycle-live.spec.js` and
`pm-lifecycle-concurrency-live.spec.js` require the allowlisted local preview,
testing backend, QA company, and `LFES_PM_LIFECYCLE_MUTATIONS=1`. They mutate only
run-owned fixtures, verify persisted state, then remove those fixtures and
retained financial snapshots. Existing profile/invite/telemetry housekeeping
writes are suppressed in the browser lifecycle suite.

One early six-minute test timeout exhausted the Playwright request fixture before
cleanup. Its exact run IDs were inspected and removed on the testing project;
postflight confirmed zero remaining assets, templates, steps, schedules, orders,
answers, events, comments, and financial snapshots for that run. The pagination
helper now checks for absent controls without waiting; action timeouts are bounded.

An earlier WebKit run reported access-control/network console errors around
repeated reloads. The fixture now waits for outstanding QA reads to settle before
an intentional reload; the complete rerun passed without ignoring those errors.
This proves settled reloads, not abrupt mid-request interruption or offline use.
An initial Full Strict run also rejected the Supabase CLI's 14-digit migration
timestamp. The checker/apply helper now accept that format and legacy 12-digit
names, with malformed-name and timestamp-collision regression tests. The complete
gate was rerun, not waived.

The first GitHub Release Gate run (`35865546254`) passed 80 browser cases but
failed one because its test-only inline ES module had not finished executing
before fixture setup used its export. The fixture now explicitly awaits module
readiness with a bounded timeout. No application code or assertions were relaxed;
the required gate must pass on the corrected commit before merge.

Final read-only QA postflight found zero `LFES PM` assets, templates, schedules,
or work orders in the QA company. Per-case cleanup also verifies owned child
answers, steps, events, comments, and financial snapshots. The authenticated
proof's disposable delete-denial request was removed and its absence verified.

## Limits And Follow-Up

- Old orders without a recorded schedule source are not linked by guessed titles.
  Generated Work History represents orders with an explicit source association.
- Procedure templates are not versioned snapshots. Adding/changing definitions
  can affect how existing work is displayed; full historical template versioning
  remains a separate design decision. Persisted answers cannot be erased through
  template deletion while linked work/history exists.
- General work-order completion and its activity event are separate writes. The
  UI reports partial history failure; only PM generation is made atomic here.
- PM generation remains an explicit action, not a new background scheduler.
- Cross-tab creation of the optional sample checklist is not an atomic server
  operation. Partial sample retries are non-destructive, but two simultaneous
  sample creations may still produce duplicates.
- Browser viewport tests are not physical-device, camera, soft-keyboard, or
  offline/reconnect proof. Draft storage can be evicted by the browser; it is not
  a server backup. Storage-disabled behavior has an in-memory fallback only.
- A finite passing suite is not a claim of every possible workflow or 100%
  absence of defects. The testing project is not the production deployment.
- Existing Supabase advisor findings remain outside this patch: exposed legacy
  security-definer APIs and disabled leaked-password protection. No new PM RPC
  uses security definer. See the provider's
  [function-exposure guidance](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable)
  and [password-protection guidance](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).
