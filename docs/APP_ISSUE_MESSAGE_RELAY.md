# Reported Issues to Messages

Release: 2026-09-23. Production migration and Taylor Metal routing were enabled
after the user's release authorization. The frontend is published through the
required GitHub Release Gate and Pages deployment. This is app-problem reporting,
not the maintenance Requests workflow.

## Behavior

- A new report in a configured company sends one ordinary direct message from
  its signed-in reporter to the configured company admin/manager.
- The body identifies itself as automatically sent from an issue report and
  includes title, location name, screen, severity and complete details. It omits
  `page_url`, which could carry sensitive query parameters.
- Manual reports and the existing automatic upload-failure reporter use the
  same database trigger. No second browser-side message send is required.
- Reuse the pair's most recent general `Direct message` conversation, or create
  one. Named-topic, work-linked, location-scoped, third-party-owned, and expanded
  audience conversations are excluded. All company locations use the same pair.
- Existing unread, archive, mute, search and reply behavior remains unchanged.
  A new message reactivates an archived conversation under existing logic; mute
  is not overridden. There are no new Messages controls, badges or filters.
- Replies are normal messages. Resolving/deleting a report does not alter the
  conversation. A recipient reporting their own issue does not generate a self-DM.
- Existing reports are not backfilled. Reports in unconfigured companies still
  save normally without a message. No email delivery is added.

## Boundaries and Recovery

Report, conversation creation, memberships and relay message commit together.
A configured but ineligible recipient causes a visible manual submission error,
not a false delivery confirmation. Automatic upload reporting retains its existing
best-effort error handling; it does not guarantee delivery during an outage.

The message ID equals the report ID. Repeating an insert cannot relay twice.
Manual submissions retain a per-draft ID across failed/timed-out attempts in the
current page. A conflict is accepted only after reading the same ID, company,
reporter and exact submitted fields; status changes do not invalidate a retry.
Double-clicks are single-flight. Switching accounts/companies suppresses stale
completion UI. Pending IDs do not survive a full page reload; a newly re-entered
report is a new submission. Editing a failed draft creates a new submission too.

Concurrent relays for a pair take a transaction-level advisory lock and create
one conversation. Unrelated manual conversation creation does not take this lock;
the application does not promise a globally unique DM per pair.

The routing table is private, RLS-enabled and inaccessible to browser roles.
Only company admins can invoke the routing RPC. Recipients must currently be an
admin/manager in that same company. Reporter identity and location membership are
checked by the trigger. Existing message RLS and grants are not widened.
Accounting may receive a relay reply but remains manually read-only in Messages,
as before. Report visibility itself retains the existing company-member policy;
the DM does not make the original report confidential to its participants.

The new admin-only SECURITY DEFINER RPC intentionally adds one authenticated-callable
advisor warning. All role/cross-company denial checks must pass; this is not an
all-clear security report. Review the provider's
[RPC security guidance](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable).
The trigger function is private, not callable by anonymous/authenticated clients,
and both functions pin an empty search path.

## Release Setup

1. Apply `supabase/migrations/20260923181857_app_issue_message_relay.sql` through
   the reviewed migration process. It changes no existing report/message rows.
2. Verify the exact company and Louie's existing user ID and eligible membership.
   Do not choose a duplicate company or infer an ID from display name alone.
3. As that company's authenticated admin, call
   `set_app_issue_message_recipient(target_company_id, target_recipient_id)`.
   This config is per company, not per location. No settings UI is added.
4. Publish the matching frontend through the release gate, then verify delivery
   only with an explicitly authorized production test report.

Disable future relay with the same admin RPC and a null recipient. This does not
remove existing reports/messages. Frontend rollback may retain the additive
schema and routing, but old clients lack the new manual retry reconciliation.
Never delete conversations as rollback. Removing the recipient's membership
cascades the routing row and leaves the company unconfigured.

## Verification

- `node tests/smoke/app-issue-relay-sql-smoke.js`: real isolated PostgreSQL/RLS;
  configuration and tenant/role denial, sender forgery, exact audience selection,
  automatic attribution, retry identity, atomic rollback, no backfill, self-report,
  archive/mute/read state, Accounting contract, and report lifecycle independence.
- `node tests/smoke/app-issue-relay-retry-smoke.js`: browser workflow/service
  contracts, lost response, duplicate click, edited draft, account/company changes,
  stale list loads and saved-report/list-reload failure distinction.
- `tests/smoke/appwide-issue-relay-live.spec.js`: disposable-company signed-in
  Chromium/WebKit at desktop/mobile widths. Ordinary bidirectional replies,
  realtime arrival, lost-response retry, escaped report text, archive return,
  cross-location reuse, concurrent relay and actual upload-failure path.
- `npm run test:lfes:strict` and the separate authenticated QA command verify
  surrounding regressions. These do not constitute proof of every physical
  device, network outage, or production deployment.

Initial gzip increases from 176,420 to 176,787 bytes (+367) within the unchanged
179,200-byte budget. No new startup queries or eager feature bundles are added.
The Messages bundle and CSS are unchanged.

### Verified Candidate Results

2026-09-23, implementation commit `7e585a4` plus fixture correction `2ef4e0e`:

- Full automated Strict LFES: PASS, all 13 stages, clean worktree. Includes 197
  Node smoke files, 81 targeted browser regressions, isolated schema/RLS,
  security, bundle budgets/cleanliness, resource loading and desktop/mobile 3D.
- Separate authenticated LFES: PASS, all 7 stages, five-role Chromium contracts,
  WebKit admin contract, Production Action/notification lifecycles and account/
  location switching in both engines. Startup requests were 30-35 against a 35
  request budget in this QA dataset; these are not general network benchmarks.
- New signed-in relay suite: 4/4 PASS across Chromium/WebKit at 1440px and 390px.
  Mobile and desktop screenshots reviewed; no horizontal page overflow.
- New SQL and retry suites: PASS, included in the full Node sweep.
- `npm audit --omit=optional --audit-level=moderate`: zero vulnerabilities.
- All eight disposable companies from test development/final runs removed after
  exact ID/name/QA creator and zero-storage checks. Postflight found zero remaining
  company, object or routing rows for those IDs. Auth proof removed its own
  temporary request. No production writes, publication or recipient setup.

The first full run identified a PM fixture missing the legacy issue-report
baseline before applying all dated migrations. Its fixture was corrected;
all 17 isolated PM lifecycle checks and the complete rerun passed. No PM runtime
behavior was changed. Browser-test development also corrected a nonunique message
locator, mobile startup navigation, exact status-copy matching and archive-save
synchronization; none required changing Messages behavior.

Private evidence is retained under `LFES/private/proof/issue-relay-*20260923`.
Browser traces may contain QA session material and must not be committed or shared.

### Production Database Checkpoint

Applied to production `lbphkzznvvumemdkqoay` at 18:42 UTC on 2026-09-23, then
configured at 18:43 UTC for Louie Fisher's verified admin membership in the active
Taylor Metal Products company. All five facilities are covered. No duplicate
companies, existing reports or conversations were altered; no production test
message was sent. The authorized backend setup wrote only the guarded private
routing row; browser configuration still requires the admin-only RPC.

Both function bodies, function privileges, pinned search paths, trigger, routing
RLS and routing policies/grants match the tested QA catalog. Before/after hashes
and counts match across 25 existing business/storage relations, including 220
work orders, 136 assets, 13 messages, 10 reports and 278 stored-object metadata
rows. Existing messaging policies are identical.

Production advisors add the expected authenticated-callable setter warning
(28 to 29); the 3 existing no-policy INFO findings, 5 anonymous-callable warnings
and disabled leaked-password protection are unchanged. These remain documented
risks, not a claim that every advisor finding is resolved. Frontend publication
and hosted-resource verification are recorded with the GitHub release evidence.
