# LFES Phase 8F Pilot Follow-Up And Onboarding Review

Date: 2026-05-19

## Scope

Pilot follow-up and onboarding readiness review only.

- No app code changed.
- No Supabase SQL/RLS changed.
- No `app.js` refactor.
- No helper/service extraction.
- No broader rollout started.

## Review Summary

Phase 8F reviewed the live pilot state after Phase 8E cleanup.

Result: PASS WITH ONBOARDING DECISIONS REMAINING.

The active operational queues are cleaner after `Test 1` was removed, but onboarding and admin visibility still need owner decisions before more users are added.

## Pending Invite State

Pending invite reviewed:

- Email: `jeffrey.kinkaid@taylormetal.com`
- Sent: 2026-05-06, 4:17:24 PM
- Role: Manager
- Default location: `first available`
- Action taken: none

The invite remains unchanged.

## Default Location Behavior For Invited Users

Current intended behavior:

- Invite form supports Role and Default location.
- Invite acceptance should copy invite default location into the member/default-location path.
- If a user has no saved/scoped active location, member/default location should guide the first workspace location.
- Existing Taylor users with null member defaults were previously data-fixed to Salem, OR.

Important distinction:

- The existing pending invite still says `first available`.
- That does not match the Salem-first controlled pilot expectation.

## Is `first available` Acceptable?

For Taylor Metal Products controlled pilot: NO.

Reason:

- The pilot is explicitly Salem-first.
- `first available` is ambiguous to a new pilot user.
- Historically, first/fallback location behavior contributed to Auburn-first confusion.
- New manager/admin users should not enter the pilot with a default-location ambiguity.

## Should Salem Be The Explicit Invite Default?

Recommended policy:

- For Taylor Metal Products pilot invites, Salem, OR should be explicit by default unless the invite is intentionally for another branch.

Recommended handling for `jeffrey.kinkaid@taylormetal.com`:

1. Do not rely on the existing `first available` invite for pilot onboarding.
2. Either cancel and reissue it with Salem, OR as default, or create a new approved invite with Salem, OR.
3. Do this through the Team UI unless a separate approved admin/Supabase path is chosen.

No invite action was performed in Phase 8F.

## Historical QA Issue-Report Visibility

Current state:

- Admin Setup still shows `Reported App Issues 9 captured`.
- The visible list contains historical QA/smoke issue reports.
- No delete/archive action was performed.

Recommendation:

- Do not delete QA issue reports casually because they are useful verification evidence.
- For pilot clarity, create an approved future approach:
  - leave them visible as engineering history, or
  - mark/tag them as QA history if the UI supports it later, or
  - add an archive/hide filter later so pilot admins can focus on live reports.

Current best decision:

- Keep them visible for now, but treat Admin Setup issue-report clutter as a pilot admin clarity limitation.

## Admin Setup 15/16 Warning

Current state:

- Admin Setup remains `15/16 ready`.
- Remaining setup item:
  - `Admin delete protection`
  - `Run step-next-admin-delete-work-orders.sql, then mark it applied`

Phase 8F action:

- Documented only.
- No SQL run.
- No setup state changed.

Impact:

- Not a blocker for the supervised pilot.
- Should be reconciled before broader rollout or before less-supervised admin use.

## Remaining Pilot-User Confusion Risks

1. Pending invite default location is still `first available`.
2. Admin Setup issue-report list contains historical QA reports.
3. Admin Setup readiness warning could confuse a pilot admin if they are expected to use setup diagnostics.
4. Some live workflows remain intentionally supervised:
   - technician guardrail rerun,
   - password recovery email round trip,
   - invite acceptance/default-location onboarding,
   - photo upload,
   - inventory as authoritative purchasing/accounting truth.

## Onboarding Friction Remaining

- Existing pending invite should be corrected before use.
- Invite acceptance/default-location behavior still needs a real second-user verification pass.
- Password recovery works in-app, but full email/recovery-link round trip remains limited by prior email rate limits.

## Likely Support Burden During Pilot

Expected support burden is manageable if the pilot remains supervised.

Likely questions:

- Which location should a new invited user start in?
- Why are old QA issue reports visible in Admin Setup?
- What does Admin Setup 15/16 mean?
- Which workflows are safe for live operational use versus still under verification?

## Missing Operational Visibility

Recommended future visibility improvements:

- Clearer invite default-location status before invite acceptance.
- Better issue-report filtering by Live / QA / Resolved / Archived.
- Clearer Admin Setup explanation for items that are not required during a supervised pilot.

## Smoke Test

TEST:
Pilot follow-up sanity

STEPS:
1. Opened the live GitHub Pages app with `?qa_bust=phase8f-followup-20260519`.
2. Verified signed-in session restored.
3. Verified Taylor Metal Products loaded.
4. Verified Salem, OR remained active.
5. Loaded Work Orders.
6. Loaded Equipment.
7. Loaded Parts.
8. Loaded Team.
9. Loaded Settings.
10. Loaded Admin Setup.
11. Loaded Requests.
12. Inspected invite/default-location visibility.
13. Inspected issue-report visibility.
14. Checked browser warning/error logs available through the current browser connection.

EXPECTED:
No visible app errors, no missing scripts, onboarding/default-location behavior is understandable enough to document, and pilot queues are understandable.

RESULT:
PASS

NOTES:
Work Orders remained clean after Phase 8E, showing `Hydralic Leak` and not `Test 1`. Equipment showed `New thalmann` and not `Test 1`. Requests remained clean with 0 active requests. Parts remained 0 shown. Team still showed the pending `jeffrey.kinkaid@taylormetal.com` Manager invite with `Default location: first available`. Admin Setup still showed 9 captured issue reports and the 15/16 Admin delete protection warning. No browser warning/error logs were captured.

## Decision

Pilot follow-up result:

PASS WITH ONBOARDING DECISIONS REMAINING.

The controlled pilot can continue. More users should not be onboarded through the old `first available` invite without an explicit decision.

## Recommended Next LFES Phase

LFES Phase 8G onboarding action decision.

Recommended scope:

1. Decide whether to cancel/reissue `jeffrey.kinkaid@taylormetal.com` with Salem, OR as default.
2. If approved, perform the invite action through Team UI only.
3. Run invite/default-location smoke after the invite action.
4. Keep historical QA issue-report cleanup as a separate decision unless the pilot admin view becomes confusing.
