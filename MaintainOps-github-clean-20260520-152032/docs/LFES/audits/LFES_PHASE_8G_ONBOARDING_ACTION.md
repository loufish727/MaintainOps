# LFES Phase 8G Onboarding Action Decision And Invite Correction

Date: 2026-05-19

## Scope

Approved onboarding action and verification only.

- No app code changed.
- No Supabase SQL/RLS changed.
- No `app.js` refactor.
- No helper/service extraction.
- No broader rollout started.
- Existing operational work was not modified.

## Approved Action

Correct the pending invite for:

- `jeffrey.kinkaid@taylormetal.com`

Required invite values:

- Role: Manager
- Default location: Salem, OR

## Action Taken

### Old Invite

The old pending invite was reviewed in Team:

- Email: `jeffrey.kinkaid@taylormetal.com`
- Role: manager
- Default location: `first available`
- Sent: 2026-05-06, 4:17:24 PM

Action:

- Canceled through Team UI.
- Confirmation path used:
  - `Cancel Invite`
  - confirmation `Cancel Invite`

### Corrected Invite

A new invite was created through Team UI:

- Email: `jeffrey.kinkaid@taylormetal.com`
- Role: Manager
- Default location: Salem, OR
- Sent: 2026-05-19, 4:05:43 PM

Verification:

- Team showed 1 pending invite.
- The pending invite displayed:
  - `jeffrey.kinkaid@taylormetal.com`
  - `Default location: Salem, OR`
  - `manager`

## Invite / Default-Location Onboarding Smoke

TEST:
Invite/default-location onboarding

STEPS:
1. Reviewed pending invite state in Team.
2. Confirmed old invite had `Default location: first available`.
3. Canceled old invite through Team UI.
4. Reissued invite for `jeffrey.kinkaid@taylormetal.com`.
5. Selected Role: Manager.
6. Selected Default location: Salem, OR.
7. Created the invite through Team UI.
8. Verified the corrected pending invite is visible.
9. Loaded Work Orders.
10. Loaded Team.
11. Loaded Admin Setup.
12. Loaded Equipment.
13. Loaded Parts.
14. Loaded Requests.
15. Checked browser warning/error logs available through the current browser connection.

EXPECTED:
Onboarding/default-location behavior is explicit and understandable, Salem is the intended default for the invite, no visible app errors appear, no missing scripts appear, and no operational ambiguity remains on the pending invite.

RESULT:
PASS / ACCEPTANCE NOT VERIFIED

NOTES:
The pending invite now explicitly targets Salem, OR and Manager role. Actual invite acceptance, first login, and first-load default-location behavior were not completed because that requires the invitee or a controlled test recipient to accept/sign in. No visible app errors or browser warning/error logs were captured.

## Additional Smoke Result

- Salem remained selected.
- Work Orders loaded.
- Work Orders still showed `Hydralic Leak` and not `Test 1`.
- Equipment loaded.
- Equipment still showed `New thalmann` and not `Test 1`.
- Parts loaded with 0 shown.
- Requests loaded with 0 active.
- Team loaded with corrected invite visible.
- Admin Setup loaded and still showed 15/16 ready.

## Remaining Onboarding Risk

The pending invite is now explicit and understandable.

Remaining unverified item:

- real invite acceptance and first-login default-location behavior for the recipient.

This is not a code defect found in Phase 8G; it is the expected limit because the recipient has not completed acceptance during this checkpoint.

## Pilot Confidence

Pilot confidence improved.

Reason:

- The stale `first available` invite was removed.
- The active pending invite now matches the Salem-first pilot policy.
- Pilot queues stayed clean after the invite correction.

## Recommended Next LFES Phase

LFES Phase 8H invite acceptance / first-login verification.

Recommended scope:

1. Have the invite recipient accept/sign in, or use a controlled test recipient if owner-approved.
2. Verify the new user joins Taylor Metal Products as Manager.
3. Verify Salem, OR becomes active on first load.
4. Verify the app does not fall back to Auburn.
5. Keep broader rollout blocked until this real acceptance path is verified.
