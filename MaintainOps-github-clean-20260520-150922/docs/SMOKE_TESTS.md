# MaintainOps Smoke Tests

This file defines reusable manual smoke tests for MaintainOps.

These tests are not a full automated test suite. They are a practical operational checklist used after meaningful changes, GitHub Pages uploads, Supabase changes, role/permission changes, and controlled LFES refactors.

Use these tests to prove the app still works in the areas most likely to break real field workflows. Keep results concise and append evidence to `docs/QA_LOG.md` using this format:

```text
TEST:
[name]

STEPS:
[exact actions]

EXPECTED:
[specific observable result]

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
[unexpected behavior, known gaps, cleanup result, or intentionally skipped verification]
```

## General Rules

- Use a fresh cache-bust URL for hosted checks, for example:
  `https://loufish727.github.io/MaintainOps/?qa_bust=smoke-YYYYMMDD-HHMM`
- Use QA record names that include the phase/token, for example:
  `QA Smoke Work 20260519-001`
- Clean up QA records through normal app paths when possible.
- Do not use broad SQL cleanup during live testing.
- If a role/session is not available, mark the test `NOT VERIFIED` and explain why.
- If a test would affect real production data and no safe QA path exists, mark it `NOT VERIFIED`.
- When a test creates records, verify both creation and cleanup.
- If console access is not reliable, document visible app behavior and resource checks instead of pretending console was captured.
- Public QR and password reset tests may require a separate browser/session or email access.

## Result Definitions

PASS:
The expected observable result happened, no visible app errors appeared, and any required cleanup completed.

FAIL:
The expected result did not happen, an app error appeared, data routed incorrectly, permissions were wrong, cleanup failed, or a workflow was blocked unexpectedly.

NOT VERIFIED:
The test could not be run because required role credentials, email access, browser capability, safe QA data, or approval was unavailable.

## Test 1 - Live Signed-In Session Restore

Required role/session:
Manager/admin-capable session preferred. Technician session can be used for technician-specific smoke.

Setup data:
No new data required.

TEST:
Live signed-in session restore

STEPS:
1. Open the live app with a fresh cache-bust URL.
2. Wait for the app to load.
3. Confirm whether the app restores the signed-in session or shows login.
4. If login appears and credentials are available, sign in normally.

EXPECTED:
The app restores or accepts sign-in, loads Taylor Metal Products, and shows the authenticated workspace.

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
Record the browser/session used, signed-in role if known, and any login delay or error.

Cleanup steps:
No cleanup needed.

PASS:
Workspace loads signed in.

FAIL:
Login loops, workspace never loads, or visible app errors appear.

NOT VERIFIED:
No valid session or credentials are available.

Future Playwright candidate:
Yes. This is a high-priority automation candidate after safe test credentials/session handling is defined.

## Test 2 - Active Location Persistence

Required role/session:
Manager/admin for location switching, or technician with Mobile tech enabled. Any signed-in role can verify current active location.

Setup data:
No new data required.

TEST:
Active location persistence

STEPS:
1. Open the app signed in.
2. Confirm Taylor Metal Products loads.
3. Select Salem, OR if the session is allowed to switch locations.
4. Reload the app with a fresh cache-bust URL.
5. Confirm active location after reload.

EXPECTED:
Salem, OR remains active after reload. The app does not unexpectedly fall back to Auburn, WA.

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
Record whether the session was manager/admin, technician, or technician with Mobile tech.

Cleanup steps:
No cleanup needed.

PASS:
Salem remains selected after reload.

FAIL:
App changes location without user intent or reload falls back to Auburn unexpectedly.

NOT VERIFIED:
Session cannot switch locations and no saved-location scenario is available to test.

Future Playwright candidate:
Yes. This is a high-priority automation candidate because location routing affects work orders, requests, PM, and equipment.

## Test 3 - Manager/Admin Work Order Create, Open, Delete

Required role/session:
Manager or admin.

Setup data:
Use a QA title such as `QA Smoke Work <token>`.

TEST:
Manager/admin work order create/open/delete

STEPS:
1. Sign in as manager/admin.
2. Confirm Salem, OR is active.
3. Open Work Orders.
4. Create a safe QA work order.
5. Confirm the new work order appears in the active work list.
6. Open the work order detail.
7. Delete it through the app's normal delete flow.
8. Return to Work Orders and confirm it no longer appears.

EXPECTED:
The QA work order is created in Salem, opens cleanly, and is deleted through app UI.

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
Record the QA title/token and whether delete confirmation appeared.

Cleanup steps:
Delete the QA work order through the app.

PASS:
Create, detail open, and delete all succeed.

FAIL:
Save hangs, wrong location is used, detail fails, delete fails, or the deleted record remains visible.

NOT VERIFIED:
No manager/admin session is available or creating QA work is not safe.

Future Playwright candidate:
Yes. This is a high-priority automation candidate.

## Test 4 - Technician Assignment Guardrail

Required role/session:
Dedicated QA technician account. Do not use manager/admin credentials for this test.

Setup data:
Use a disposable QA work order such as `QA Smoke Tech Guardrail <token>`.

TEST:
Technician assignment guardrail

STEPS:
1. Sign in as a real technician-role QA user.
2. Confirm Taylor Metal Products loads.
3. Confirm Salem, OR is active or expected for that technician.
4. Open Work Orders.
5. Inspect visible assignment controls.
6. If available, attempt to assign work to another user.
7. If available, attempt to clear assignment.
8. If available, attempt vendor assignment.
9. Confirm whether allowed technician actions, such as self-claim, still work.

EXPECTED:
Technician cannot assign work to another user, clear assignment, or vendor-assign if prohibited. DB/trigger enforcement should block unauthorized assignment where a safe app-level attempt exists.

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
Record visible controls, hidden controls, exact error/result, and whether DB-layer enforcement was proven.

Cleanup steps:
Delete QA work order through manager/admin app UI if technician cannot delete.

PASS:
Technician is blocked from unauthorized assignment and allowed technician actions still work.

FAIL:
Technician can assign another user, clear assignment, vendor-assign, or loses allowed functionality.

NOT VERIFIED:
No technician session is available or no safe assignment attempt exists.

Future Playwright candidate:
Yes, but only after safe technician test credentials/session handling exists.

## Test 5 - Public QR Request Submit And Manager Visibility

Required role/session:
Anonymous/public browser for submit. Manager/admin session for visibility and cleanup.

Setup data:
Use a location-specific public request link, preferably Salem. Use title `QA Smoke QR Request <token>`.

TEST:
Public QR request submit and manager visibility

STEPS:
1. Open the public request link in a browser/session that is not relying on app login.
2. Confirm the public form shows Taylor Metal Products and the expected location.
3. Submit a QA request.
4. Open the signed-in manager/admin app.
5. Go to Requests.
6. Confirm the QA request appears in the correct location and active request view.
7. Delete the QA request through the app if safe.

EXPECTED:
Public QR form opens without login, request submits, manager/admin sees it in the correct location, and cleanup succeeds.

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
Record QR/request token, expected location, actual location, and cleanup result.

Cleanup steps:
Delete QA request through manager/admin app UI.

PASS:
Request submits and appears in the correct location.

FAIL:
Form fails, request routes to wrong location, request does not appear, or cleanup fails.

NOT VERIFIED:
No public link/session is available or manager/admin visibility cannot be checked.

Future Playwright candidate:
Yes. This is a high-priority automation candidate, with care around anonymous/session separation.

## Test 6 - Parts Restock, Use, And Work-Order Part Usage

Required role/session:
Manager/admin preferred for create/delete cleanup. Technician can verify allowed work-order part usage where applicable.

Setup data:
Use QA part `QA Smoke Part <token>` and QA work order `QA Smoke Part Work <token>`.

TEST:
Parts restock/use/work-order part usage

STEPS:
1. Sign in as manager/admin.
2. Confirm Salem, OR is active.
3. Create a QA part with known quantity, reorder point, and unit cost.
4. Open the QA part detail.
5. Restock a small quantity.
6. Use a small quantity from inventory.
7. Create or open a QA work order.
8. Record the QA part in Work Order Detail Parts Used.
9. Confirm usage row appears.
10. Confirm quantity on hand changes.
11. Delete QA work order.
12. Delete QA part.

EXPECTED:
Restock and inventory Use behave as currently designed. Work-order part usage succeeds through `public.record_work_order_part_usage`, and usage/stock update stay consistent.

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
Record starting quantity, restock quantity, use quantity, work-order usage quantity, final quantity, and cleanup result.

Cleanup steps:
Delete the QA work order first, then delete the QA part through the app.

PASS:
All part flows complete and cleanup succeeds.

FAIL:
Quantity is wrong, usage row missing, save hangs, RPC fails, or cleanup fails.

NOT VERIFIED:
No safe manager/admin session or QA data path exists.

Future Playwright candidate:
Yes. Work-order part usage RPC is high priority. Restock/use automation can come later.

## Test 7 - Issue Report Submit And Update

Required role/session:
Any signed-in user can submit if Report Issue is available. Manager/admin may be required to view/update issue reports.

Setup data:
Use title/description `QA Smoke Issue Report <token>`.

TEST:
Issue report submit/update

STEPS:
1. Sign in.
2. Click Report Issue.
3. Submit a QA issue report.
4. Open Settings/Admin issue report area as manager/admin if needed.
5. Confirm the issue report appears.
6. Update status/fields if the app exposes a safe update path.
7. Clean up or mark the report appropriately if a cleanup/status path exists.

EXPECTED:
Issue report submits, appears for manager/admin review, and update path works if exposed.

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
Record whether submit-only or submit/update was verified.

Cleanup steps:
Use app-provided status/update/delete path if available. If no cleanup path exists, clearly mark the QA record and document it.

PASS:
Submit and safe update/visibility path work.

FAIL:
Submit fails, report is not visible, or update fails.

NOT VERIFIED:
Issue report area or safe cleanup/update path is unavailable.

Future Playwright candidate:
Medium priority. Good candidate after core work/order/parts flows are stable.

## Test 8 - Team, Invite, And Role Visibility

Required role/session:
Manager/admin for team/invite/role management. Technician for restricted visibility check.

Setup data:
Use a QA invite email only when an actual invite test is approved. Avoid sending unnecessary live emails.

TEST:
Team/invite/role visibility

STEPS:
1. Sign in as manager/admin.
2. Open Team.
3. Confirm member list loads.
4. Confirm role labels are visible and understandable.
5. Confirm invite/default-location controls are visible where expected.
6. If approved, send a QA invite with default location.
7. Verify pending invite appears.
8. Sign in as technician separately if available.
9. Confirm technician sees only allowed Team/profile controls.

EXPECTED:
Manager/admin sees Team controls. Technician visibility is restricted to allowed controls. Invite/default-location information is visible when tested.

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
Record role/session used and whether actual invite acceptance was tested.

Cleanup steps:
Cancel QA invite through app if one was created.

PASS:
Role visibility matches expected behavior.

FAIL:
Unauthorized role controls appear, role changes do not stick, invite/default-location behavior is wrong, or pending invite cleanup fails.

NOT VERIFIED:
No manager/admin or technician session is available.

Future Playwright candidate:
Medium/high priority, but invite email acceptance may remain partly manual.

## Test 9 - Password Reset / Recovery Flow

Required role/session:
Test account with email access. Do not expose passwords or recovery tokens in docs.

Setup data:
Use a dedicated QA/test account, not a production employee account unless approved.

TEST:
Password reset / recovery flow

STEPS:
1. Open login screen.
2. Click Forgot password.
3. Submit QA account email.
4. Open the reset email.
5. Follow recovery link to MaintainOps.
6. Confirm the Set New Password screen appears.
7. Set a test password.
8. Confirm app returns to signed-in workspace or allows sign-in with the new password.

EXPECTED:
Recovery request sends, recovery link opens in app, password update succeeds, and login works afterward.

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
Do not paste recovery tokens or passwords into docs. Record only account label/type and outcome.

Cleanup steps:
Restore test account password if needed and document the final known safe state privately outside repo docs.

PASS:
Recovery link and password update flow work end to end.

FAIL:
Email does not arrive, rate limit blocks test, recovery link lands nowhere, update fails, or new password cannot sign in.

NOT VERIFIED:
No email access, rate limit active, or no QA account available.

Future Playwright candidate:
Partial. The in-app recovery screen can be automated later, but email delivery and reset-link retrieval may remain manual.

## Test 10 - Required Script And Resource Load Check

Required role/session:
No app role required for HTTP resource checks. Signed-in session useful for visual app load.

Setup data:
No new data required.

TEST:
Required script/resource load check

STEPS:
1. Request live `index.html` with a fresh cache-bust query.
2. Confirm the current expected cache tags are present.
3. Request required hosted files:
   - `app.js`
   - `styles.css`
   - `supabase-config.js`
   - all `src/utils/*.js`
   - all `src/services/*.js`
   - `src/render/displayHelpers.js`
4. Confirm each returns HTTP 200.
5. Open the live app and confirm no missing-script text or blank screen appears.

EXPECTED:
All required files return HTTP 200, app cache tag is current, and app renders.

RESULT:
PASS / FAIL / NOT VERIFIED

NOTES:
Record cache tag and any failed resource.

Cleanup steps:
No cleanup needed.

PASS:
All files return 200 and app renders.

FAIL:
Missing `src` file, stale cache tag, old app version, blank app, or script load failure.

NOT VERIFIED:
Network/GitHub Pages unavailable.

Future Playwright candidate:
Yes. This can be automated early because it does not require data mutation.

## Future Automation Roadmap

Do not add Playwright until these manual paths stay stable and the team agrees on test credentials, cleanup rules, and expected records.

## Automated Resource-Load Smoke

LFES Phase 7D added the first automated smoke test.

This automated test is intentionally narrow:

- no login,
- no credentials,
- no Supabase mutations,
- no record creation,
- no cleanup,
- no workflow automation.

Command:

```powershell
npm run test:smoke:resources
```

Test file:

- `tests/smoke/resource-load.spec.js`

What it verifies:

- live GitHub Pages serves `index.html` with HTTP 200.
- `index.html` references the required local app files.
- the following hosted files return HTTP 200:
  - `app.js`
  - `styles.css`
  - `supabase-config.js`
  - `src/utils/constants.js`
  - `src/utils/dom.js`
  - `src/utils/formatting.js`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
  - `src/services/partsService.js`
  - `src/services/assetsService.js`
  - `src/services/workOrdersService.js`
  - `src/services/companyService.js`
  - `src/services/appIssueReportsService.js`
  - `src/render/displayHelpers.js`

Optional target override:

```powershell
$env:MAINTAINOPS_BASE_URL='https://loufish727.github.io/MaintainOps/'; npm run test:smoke:resources
```

Use this after:

- GitHub Pages uploads,
- clean package script changes,
- `index.html` script changes,
- `src` file moves/additions,
- cache-tag changes.

GitHub Actions:

- LFES Phase 7F added `.github/workflows/resource-load-smoke.yml`.
- It runs on:
  - `push`
  - `pull_request`
  - `workflow_dispatch`
- It runs:
  - `npm ci`
  - `npm run test:smoke:resources`
- Current workflow actions:
  - `actions/checkout@v6`
  - `actions/setup-node@v6`
  - Node `24`
- It does not require GitHub secrets.
- It does not log in.
- It does not create, edit, or delete app records.
- It does not mutate Supabase.

This does not replace manual smoke testing. It only catches missing/stale hosted files before deeper workflow checks.

Recommended automation order:

1. Required script/resource load check
2. Live signed-in session restore
3. Active location persistence
4. Quick Fix / work order lifecycle
5. Work Order Detail part usage RPC
6. Public QR request submit and manager visibility
7. Technician assignment guardrail
8. Parts restock/use/delete
9. Team/invite/role visibility
10. Password recovery partial automation

Highest-priority automation candidates:

- Quick Fix/work order lifecycle
- location persistence
- technician guardrail
- public QR request
- parts transaction/RPC usage

Remain manual for now:

- Email delivery and password reset link retrieval
- File/photo uploads that require OS file picker behavior
- Invite email acceptance
- Mobile Safari and Add-to-Home-Screen checks
- Any test requiring real employee accounts
- Any cleanup where the app does not expose a safe delete/status path

## When To Run The Smoke Tests

Run the full set before:

- major GitHub Pages release,
- professional app review,
- live pilot expansion,
- App Store/Play Store preparation,
- auth/RLS changes,
- public QR changes,
- role/permission changes,
- work-order workflow changes,
- parts/inventory changes.

Run a focused subset after:

- tiny display helper extraction,
- docs-only updates,
- cache-tag/package changes,
- low-risk service wrapper changes.

When in doubt, run:

1. Required script/resource load check
2. Live signed-in session restore
3. Active location persistence
4. Work Orders
5. Parts
6. The workflow touched by the change
