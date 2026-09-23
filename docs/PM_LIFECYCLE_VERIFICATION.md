# PM Lifecycle Verification

## Candidate Scope

Audit started 2026-09-22 Pacific on `codex/pm-lifecycle-audit-20260922`, based on
`c05144667902248fbaee2a6cbf2fadf07f98fce5`. This candidate is local/testing only.
No Taylor production records were edited and no PM release has been pushed.

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

`supabase/migrations/20260923051845_pm_lifecycle_integrity.sql` was applied only
to testing project `fsxqrngpaseqdxijggcm`. Both public RPCs are security invoker,
authenticated-only, and company/role checked. The isolated schema test now loads
the historical procedures baseline before dated migrations, so these tables,
foreign keys, and triggers are actually exercised.

Before a separately authorized production release: inspect production constraints
and existing cross-company references, apply the migration, verify RPC grants and
constraints, then publish the frontend. Do not publish this frontend first.
There is no inferred backfill of old schedule-to-order associations.

Rollback is a separate reviewed operation. Prefer a frontend rollback while
retaining new provenance and integrity constraints; do not delete generated work
or drop history as a rollback technique. The old generator lacks atomic retry
protection and must not be treated as equivalent to the new generation RPC.

## Evidence

Verification is in progress. Final command results and tested commit are recorded
below after the complete candidate passes. Individual checks must not be presented
as Full Strict or as a production deployment.

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
