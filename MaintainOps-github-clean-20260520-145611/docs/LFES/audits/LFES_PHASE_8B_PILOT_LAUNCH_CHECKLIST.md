# LFES Phase 8B Controlled Pilot Launch Checklist

Checklist execution only. No app architecture, `app.js` refactor, helper extraction, Supabase SQL/RLS, tests, workflow logic, or broader rollout changes were made in this phase.

## Pilot Decision

Pilot readiness result: READY FOR CONTROLLED PILOT WITH LIMITS.

MaintainOps is ready to begin a small supervised Taylor Metal Products pilot centered on Salem, OR. This is not approval for broad rollout, unsupervised technician rollout, outside-company onboarding, or treating inventory as accounting-grade truth.

## Pilot Scope

Approved controlled scope:

- Company: Taylor Metal Products.
- Primary location: Salem, OR.
- Users: 1-2 manager/admin users to start.
- QR intake: controlled Salem QR request use.
- Workflows: supervised Quick Fix, Work Orders, Requests, issue reports, and work-order part usage.
- Verification cadence: daily smoke verification during pilot and resource smoke after pushes/uploads.

Still limited:

- Technician assignment behavior until isolated technician verification is rerun.
- Password reset email/recovery-link round trip until email rate limits are clear.
- Invite acceptance/default-location onboarding until a real second-user pass is complete.
- Photo/file upload until desktop and mobile checks pass.
- Inventory quantities as accounting, purchasing, or final stock truth.
- Broad multi-company rollout.

## 1. Deployment Readiness

Status: PASS.

Evidence:

- Current live URL: `https://loufish727.github.io/MaintainOps/`
- Latest observed GitHub deploy/repo hash: `4b6185e`
- Commit title: `Document resource smoke workflow verification`
- Latest Resource Load Smoke workflow:
  - run: `Resource Load Smoke #5`
  - job: `Hosted resource-load smoke`
  - result: PASS / succeeded
  - duration observed: 10s
  - commands verified in workflow:
    - `npm ci`
    - `npm run test:smoke:resources`
- The workflow requires no secrets, no login, and no Supabase mutation.

Current package/deploy process:

- Use the clean GitHub Pages package process when building upload packages.
- Upload/push only the intended app files and current docs.
- GitHub Pages serves the repository content from `main`.
- After upload/push, verify the Resource Load Smoke workflow passes.
- Then run the signed-in manual smoke subset for the touched area.

## 2. Session/Auth Readiness

Status: PASS for known signed-in manager/admin session; LIMITED for password recovery and broader account lifecycle.

Evidence:

- Live signed-in session restored during Phase 8B smoke.
- Taylor Metal Products loaded.
- No visible login loop appeared.

Still limited:

- Password reset full email/recovery-link round trip remains not verified after the earlier Supabase email rate-limit event.
- Invite acceptance for a real second user remains not verified in the latest pilot-readiness run.

## 3. Location Persistence Readiness

Status: PASS for Salem active location persistence in the signed-in pilot session.

Evidence:

- Live app showed Taylor Metal Products.
- Location selector showed Salem, OR selected.
- Settings listed Salem, OR as the active location.
- App did not fall back to Auburn during the Phase 8B smoke.

Pilot rule:

- Pilot work should start in Salem, OR.
- If a user sees the wrong location, stop creating work and switch back before continuing.

## 4. Work-Order Workflow Readiness

Status: PASS for supervised manager/admin pilot use based on Phase 7B and Phase 8B evidence.

Evidence:

- Phase 7B passed manager/admin Quick Fix work-order create/open/delete.
- Phase 8B light smoke loaded Work Orders with no visible app errors.

Still limited:

- Technician self-claim/assignment behavior must remain supervised until the isolated technician guardrail rerun is complete.
- Broad work-order automation remains blocked.

## 5. QR Request Readiness

Status: PASS for controlled Salem QR request page load and prior end-to-end submit/visibility evidence.

Evidence:

- Phase 7B passed public QR request submit, Salem manager visibility, and request cleanup.
- Phase 8B opened the Salem public request page:
  - URL pattern: `https://loufish727.github.io/MaintainOps/?request=...`
  - visible company: Taylor Metal Products
  - visible location: Salem, OR maintenance request
  - form fields loaded, including photo input and urgency options.
- No QR page console errors were captured during the light smoke.

Pilot rule:

- Use only the known Salem QR for pilot intake unless a manager intentionally tests another location.
- Managers should review requests before conversion.

## 6. Parts RPC Readiness

Status: PASS for Work Order Detail part usage through the RPC-backed path; LIMITED for restock and inventory-only Use.

Evidence:

- Phase 6D live smoke proved Work Order Detail part usage succeeded through `public.record_work_order_part_usage`.
- Phase 7B smoke also passed parts restock/use/work-order part usage and cleanup.

Still limited:

- Parts-screen Restock and inventory-only Use are still not the same transaction boundary as work-order part usage.
- Inventory should not be treated as purchasing/accounting-grade truth during pilot.

Pilot rule:

- Work-order part usage can be piloted with supervision.
- High-value inventory decisions should still be cross-checked outside the app.

## 7. Smoke-Test Readiness

Status: PASS.

Current smoke assets:

- Manual smoke playbook: `docs/SMOKE_TESTS.md`
- Latest live manual smoke baseline: Phase 7B in `docs/QA_LOG.md`
- Automated non-mutating resource smoke:
  - `tests/smoke/resource-load.spec.js`
  - command: `npm run test:smoke:resources`
  - GitHub Actions workflow: `.github/workflows/resource-load-smoke.yml`

Current QA smoke cadence:

- Run daily pilot smoke while live testing is active.
- Run Resource Load Smoke after every push/upload.
- Run focused manual smoke after any app, Supabase, role, location, QR, work-order, or parts change.

## 8. Rollback/Support Readiness

Status: PASS for controlled pilot support expectations.

Support process:

- Pilot users should report issues through `Report Issue` or directly to the pilot owner.
- Each issue should capture:
  - user,
  - role,
  - location,
  - exact action,
  - work/request/part title,
  - screenshot if available,
  - whether cleanup is needed.

Rollback process:

- For deploy problems:
  - revert or restore the last known good GitHub commit/package.
  - rerun GitHub Actions Resource Load Smoke.
  - run focused manual smoke for session restore, Salem location, Work Orders, Requests, and Parts.
- For data problems:
  - prefer app UI cleanup.
  - avoid broad SQL cleanup.
  - use exact targeted SQL only after review and with full copy/paste SQL documented.

## 9. Known Limitations Acknowledged

Status: PASS.

The pilot must explicitly acknowledge:

- Technician assignment guardrail needs an isolated rerun before broad technician use.
- Password recovery end-to-end is not fully reverified.
- Invite acceptance/default-location onboarding is not fully reverified.
- Photo/file upload is not fully reverified across desktop and mobile.
- Parts inventory is operationally useful but not accounting-grade authoritative.
- Mobile Safari/Add-to-Home-Screen needs continued real-device evidence.
- Credentialed and mutating Playwright automation remains blocked.

## 10. Pilot Monitoring Expectations

Status: PASS.

During the pilot:

- Keep the pilot group small.
- Start with Salem, OR.
- Check Resource Load Smoke after pushes/uploads.
- Run daily manual smoke.
- Review QR requests before conversion.
- Watch for wrong-location work.
- Keep QA/live test records clearly named.
- Clean up QA records through normal app paths.
- Stop broadening the pilot if location, auth, role, QR, or inventory trust issues appear.

## Light Live Smoke Checkpoint

TEST:
Pilot readiness sanity

STEPS:
1. Opened the live GitHub Pages app with `?qa_bust=phase8b-pilot-20260519`.
2. Confirmed signed-in session restored.
3. Confirmed Taylor Metal Products loaded.
4. Confirmed Salem, OR was selected.
5. Loaded Work Orders.
6. Loaded Equipment.
7. Loaded Parts.
8. Loaded Team.
9. Loaded Settings.
10. Opened the Salem public QR request page with `?request=...&qa_bust=phase8b-pilot-qr-20260519`.
11. Checked for visible app errors and browser warning/error logs available through the current browser connection.

EXPECTED:
The app behaves normally, required areas load, Salem remains active, the public QR request page loads, no missing scripts appear, and no visible app errors appear.

RESULT:
PASS

NOTES:
Work Orders, Equipment, Parts, Team, and Settings loaded without visible app errors. Settings showed Salem, OR as active. The Salem public QR page initially showed `Loading request form...`, then loaded the Taylor Metal Products / Salem, OR maintenance request form. No warning/error logs were captured through the browser connection during the light smoke. This smoke did not create or delete pilot data.

## Final Phase 8B Result

Controlled pilot launch checklist result: PASS WITH SUPERVISED LIMITS.

MaintainOps can begin the controlled Taylor Metal Products / Salem pilot under the operating rules above.

Recommended next LFES phase: LFES Phase 8C pilot day-one monitoring and issue triage.

Phase 8C should:

- run the daily pilot smoke,
- review any Report Issue entries,
- review QR request behavior,
- confirm no wrong-location work appeared,
- document pilot observations,
- avoid code or SQL changes unless a real defect is separately approved.
