# LFES Phase 7C Playwright Automation Plan

Planning only. Do not add Playwright, automated tests, app code changes, Supabase SQL/RLS changes, workflow changes, or refactors in this phase.

## Purpose

Phase 7C translates the proven manual smoke-test process into a safe automation plan. The goal is not to replace human QA all at once. The goal is to automate the most repeatable, lowest-risk checks first while preserving live data safety, company isolation, role boundaries, and cleanup discipline.

Source evidence:

- `docs/SMOKE_TESTS.md`
- `docs/QA_LOG.md` Phase 7B live smoke results
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`

## Automation Readiness Summary

The first automation should be conservative:

1. Start with non-mutating hosted resource checks.
2. Add signed-in session restore only after a safe session strategy is approved.
3. Add active location persistence after session handling is stable.
4. Add one manager/admin Quick Fix create/open/delete test only after cleanup rules are proven.
5. Delay public QR, technician, password recovery, file upload, and invite acceptance until session isolation and cleanup are stronger.

Phase 7B showed the app is stable enough to plan automation, but it also showed two important limits:

- Technician assignment guardrails require a real isolated technician session and must not be faked with admin credentials.
- Password reset depends on email delivery/recovery-link retrieval and was recently affected by Supabase email rate limits.

## Manual Smoke Tests Best Suited For First Automation

### 1. Required Script/Resource Load Check

Status: SAFE FIRST AUTOMATION

Why:

- No login required.
- No database mutation.
- No cleanup required.
- Catches stale GitHub Pages uploads and missing `src` files quickly.
- Already passed manually in Phase 7B.

Automated checks:

- Fetch live `index.html` with a cache-bust query.
- Confirm expected script references exist.
- Fetch:
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
- Assert HTTP 200 for each required resource.

Run frequency:

- Every package/upload.
- Every GitHub Pages verification.
- Every change that touches `index.html`, `src`, cache tags, packaging, or deployment.

### 2. Live App Load Without Auth Mutation

Status: SAFE EARLY AUTOMATION

Why:

- Can verify the app shell renders without writing data.
- Useful after deployments.
- Should be separate from credentialed login until session handling is designed.

Automated checks:

- Open live URL with cache-bust.
- Confirm the page is not blank.
- Confirm no missing-script console errors.
- If already signed in through stored session, confirm Taylor Metal Products shell appears.
- If not signed in, confirm the login/recovery screen appears instead of failing.

Run frequency:

- Every package/upload.
- Every frontend deploy.

### 3. Signed-In Session Restore

Status: APPROVED TO PLAN, BLOCKED FOR IMPLEMENTATION UNTIL SESSION STRATEGY EXISTS

Why:

- High operational value.
- Low data risk if it only reads.
- Phase 7B passed in the live admin session.

Blocker:

- Automated tests need a safe way to authenticate without committing passwords or tokens.

Recommended strategy:

- Use a dedicated QA manager/admin account.
- Store credentials outside the repo in local environment variables or a local ignored `.env` file.
- Never commit passwords, refresh tokens, recovery links, or session storage artifacts.
- Prefer an isolated browser profile/storage state created locally by the test runner.
- Do not reuse a real employee account.

Run frequency:

- Every meaningful app change once session strategy is approved.
- Before release.

### 4. Active Location Persistence

Status: APPROVED TO PLAN, DEPENDS ON SIGNED-IN SESSION STRATEGY

Why:

- Location routing affects work orders, requests, equipment, PM, and live pilot trust.
- Phase 7B confirmed Salem, OR remained active.
- No data mutation is needed if only reading saved state.

Automated checks:

- Sign in with QA manager/admin session.
- Select Salem, OR if needed.
- Reload with cache-bust.
- Assert Salem, OR is still selected.
- Assert Auburn, WA is not selected unless intentionally chosen.

Cleanup:

- No database cleanup.
- If the test changes active location, restore Salem, OR before ending.

Run frequency:

- Every meaningful app change once session strategy is approved.
- Every location/onboarding/default-location change.

### 5. Manager/Admin Quick Fix Work Order Create/Open/Delete

Status: FIRST MUTATING AUTOMATION CANDIDATE AFTER READ-ONLY TESTS

Why:

- High-value core workflow.
- Phase 7B passed manually.
- Cleanup is available through normal app UI.
- Uses one record with a clear QA prefix.

Risks:

- Mutates live data.
- Requires reliable cleanup.
- Requires manager/admin account.
- Delete confirmation must be handled carefully.

Required data prefix:

- `QA Auto Work <YYYYMMDD-HHMMSS-token>`

Automated checks:

- Ensure Salem, OR active.
- Create QA work order through Quick Fix.
- Confirm Work Order Detail opens.
- Confirm title appears.
- Delete through normal app delete confirmation.
- Confirm QA title no longer appears in active work list.

Cleanup:

- Primary cleanup: delete through app UI.
- If cleanup fails, test must fail loudly and report the exact QA title. Do not run SQL cleanup automatically.

Run frequency:

- Before release.
- After work-order, Quick Fix, location, or delete-flow changes.
- Not necessarily every tiny docs/style change.

### 6. Parts Work-Order Usage RPC

Status: SAFE LATER AFTER QUICK FIX AUTOMATION PROVES CLEANUP

Why:

- High operational value because Phase 6D moved work-order part usage to the transaction-safe RPC.
- Phase 7B passed manually and cleaned up through the app.

Risks:

- Requires creating a part and work order.
- Requires deleting the work order before deleting the part.
- Browser automation must handle numeric inputs carefully. Phase 7B observed typed number amplification during part creation.

Required data prefixes:

- `QA Auto Part <token>`
- `QA Auto Part Work <token>`

Implementation note:

- Use controlled field clearing and value setting. Do not rely on repeated keypress typing for number inputs until the automation runner proves it does not duplicate digits.

Run frequency:

- Before release.
- After parts, inventory, RPC, or work-order relationship changes.

## Tests That Should Remain Manual For Now

### Technician Assignment Guardrail

Status: MANUAL FOR NOW

Why:

- Must use a real technician-role account.
- Must not be faked with manager/admin credentials.
- Needs isolated session storage so admin and technician sessions do not overwrite each other.
- DB/trigger enforcement proof may require a safe app-level direct assignment attempt that the UI might hide.

Automation prerequisite:

- Dedicated QA technician account.
- Dedicated isolated browser context/storage state.
- Clear test data creation by admin and cleanup by admin.
- Documented expected visible controls for technician.

### Password Reset / Recovery

Status: MANUAL FOR NOW

Why:

- Requires email delivery.
- Requires recovery-link retrieval.
- Recent testing hit Supabase email rate limits.
- Recovery tokens must never be stored in docs, logs, screenshots, or repo.

Automation prerequisite:

- Safe test mailbox integration.
- Rate-limit strategy.
- Secret redaction strategy.

### File/Photo Upload

Status: MANUAL FOR NOW

Why:

- Requires local file fixture handling and browser upload APIs.
- Storage/photo paths have size optimization and object cleanup concerns.
- Better after core smoke automation is stable.

### Invite Email Acceptance

Status: MANUAL FOR NOW

Why:

- Sends live email.
- Requires second-account email access.
- Has onboarding/default-location implications.
- Cleanup includes pending invites and possibly user/company membership state.

### Real Employee Flows

Status: DO NOT AUTOMATE

Why:

- Automation should not mutate or impersonate real employee accounts.
- Use dedicated QA accounts only.

## Test Account And Session Strategy

Recommended accounts:

- `QA Manager/Admin` account for admin smoke.
- `QA Technician` account for future technician guardrail smoke.
- Optional `QA Public` is not needed because public QR should run unauthenticated.

Secret handling:

- Do not commit passwords.
- Do not paste passwords into docs.
- Do not store access tokens, refresh tokens, or recovery links in repo files.
- Use local environment variables or an ignored local config file when automation is approved.
- Mask credentials in logs.
- Store Playwright storage state only in an ignored local path, never in GitHub upload packages.

Session isolation:

- Use separate browser contexts/storage states for:
  - admin/manager,
  - technician,
  - anonymous public QR.
- Never run technician verification in a manager/admin session.
- Public QR tests should clear auth/session state or use a separate anonymous context.

## Local Vs Live Target Strategy

Recommended:

- Resource checks should target live GitHub Pages after packaging/upload.
- Signed-in app smoke should initially target live GitHub Pages because the live pilot uses GitHub Pages.
- Local app smoke can be added later for faster pre-upload checks.

Suggested split:

- Local pre-upload:
  - app shell load,
  - static/resource path sanity if a local server is used,
  - no live data mutation unless intentionally approved.
- Live post-upload:
  - hosted resource check,
  - session restore,
  - location persistence,
  - one controlled manager/admin workflow smoke when needed.

## Cleanup Strategy

General cleanup rules:

- Every mutating automated test must generate a unique token.
- QA records must include the token in the visible title/name.
- Cleanup should happen through normal app UI paths.
- If cleanup fails, report the exact record and stop. Do not silently continue.
- Do not run broad SQL cleanup from automation.

Recommended prefix format:

- `QA Auto <TestName> <YYYYMMDD-HHMMSS>`

Examples:

- `QA Auto Work 20260519-153012`
- `QA Auto QR Request 20260519-153012`
- `QA Auto Part 20260519-153012`
- `QA Auto Part Work 20260519-153012`

Cleanup order:

- Work-order part usage: delete QA work order first, then delete QA part.
- Public QR request: delete QA request from manager/admin Requests view.
- Issue report: set to resolved unless a delete path exists and is intentionally approved.
- Invite: cancel pending invite if one was created.

## Every Change Vs Before Release

Run on every meaningful app/package change:

- Required script/resource load check.
- App shell load.
- Signed-in session restore, once session strategy is approved.
- Active location persistence, once session strategy is approved.

Run before release or after touched workflow:

- Manager/admin Quick Fix work-order lifecycle.
- Public QR request submit and manager visibility.
- Parts work-order usage RPC.
- Issue report submit/update.
- Team/role visibility.

Run manually before major pilot expansion:

- Technician assignment guardrail.
- Password recovery email round trip.
- Invite acceptance/default-location onboarding.
- Photo/file upload.
- Mobile Safari/Add-to-Home-Screen checks.

## What Should Not Be Automated Yet

Do not automate yet:

- Password reset email delivery and recovery-link retrieval.
- Technician guardrail without isolated technician session.
- File/photo upload.
- Invite email acceptance.
- Real employee account flows.
- Broad live data cleanup.
- Supabase SQL/RLS changes.
- Any test that requires service-role credentials in frontend automation.

## Recommended First Playwright Test File And Scope

Recommended first file:

- `tests/smoke/resource-load.spec.js`

Scope:

- No login.
- No Supabase mutation.
- No app data dependency.
- Live GitHub Pages resource validation.
- Assert required hosted files return HTTP 200.
- Assert `index.html` references the current expected scripts and `src` files.
- Optionally open the live app and assert it renders either the authenticated workspace or the login screen without missing-script errors.

Why this is first:

- It addresses a real deployment risk already encountered: upload packages missing `src`.
- It has the lowest cleanup risk.
- It gives fast confidence after GitHub Pages uploads.
- It does not require secrets, accounts, or user data.

Recommended second file after approval:

- `tests/smoke/session-location.spec.js`

Scope:

- Use QA manager/admin session strategy.
- Confirm session restore.
- Confirm Taylor Metal Products loads.
- Confirm Salem, OR remains active after reload.
- No data mutation.

Recommended third file after approval:

- `tests/smoke/work-order-lifecycle.spec.js`

Scope:

- QA manager/admin session.
- Create/open/delete one Quick Fix work order.
- Strict cleanup failure reporting.

## Approval Decision

Playwright implementation is still blocked.

Approved now:

- Automation planning.
- Future first automation target: resource-load smoke only.

Blocked until explicit approval:

- Adding Playwright dependencies/config.
- Creating automated test files.
- Using stored credentials/session files.
- Mutating live data from automation.
- Technician automation.
- Password recovery automation.

## Recommended Next Prompt

```text
Begin LFES Phase 7D Playwright resource-load smoke implementation only.

Do not change app behavior.
Do not refactor app.js.
Do not change Supabase SQL/RLS.
Do not automate login yet.
Do not mutate app data.

Create the smallest Playwright resource-load smoke test that verifies live GitHub Pages serves index.html, app.js, styles.css, supabase-config.js, all src/utils, all src/services, and src/render/displayHelpers.js with HTTP 200.

Run it locally.
Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
Stop after resource-load automation only.
```
