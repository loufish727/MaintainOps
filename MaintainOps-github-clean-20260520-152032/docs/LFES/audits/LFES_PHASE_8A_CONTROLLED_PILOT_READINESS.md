# LFES Phase 8A Controlled Pilot Readiness Review

Planning/review only. No app code, Supabase SQL/RLS, tests, workflows, or business logic changed in this phase.

## Decision

Controlled pilot readiness: CONDITIONAL YES.

MaintainOps is ready for a small, controlled live pilot with manager/admin supervision, limited user count, clear support paths, and daily smoke checks. It is not ready for broad rollout, unsupervised multi-company onboarding, automated technician guardrail reliance, or treating all inventory data as fully authoritative.

## Evidence Reviewed

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`
- `docs/SMOKE_TESTS.md`
- `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Latest GitHub Actions Resource Load Smoke result
- Known blockers and risks from LFES Phases 6A-7F

Latest automation evidence:

- Workflow: `Resource Load Smoke`
- Latest observed run: `Resource Load Smoke #5`
- Commit: `4b6185e`
- Result: PASS / Success
- Job: `Hosted resource-load smoke`
- CI errors: none observed

## What Is Now Proven

- GitHub Pages serves required local app files through the automated Resource Load Smoke workflow.
- The resource smoke runs in GitHub Actions on push / pull request / manual dispatch with no secrets.
- The resource smoke does not log in, mutate Supabase, or create records.
- Manual live smoke proved manager/admin signed-in session restore.
- Manual live smoke proved Salem, OR active location persistence.
- Manual live smoke proved manager/admin Quick Fix work-order create/open/delete.
- Manual live smoke proved public QR request submit, Salem routing, manager visibility, and request cleanup.
- Manual live smoke proved Work Order Detail part usage through `public.record_work_order_part_usage`.
- Manual live smoke proved issue report submit and status update.
- Manual live smoke proved Team/role/invite visibility under manager/admin session.
- Manual smoke cleanup succeeded for QA work orders, QA part, and QA public request.
- Password recovery app handling exists after the prior recovery-link fix.
- The Taylor default-location issue was identified and fixed through data-only default-location update.
- The work-order part usage transaction gap was identified and closed with an RPC for the work-order usage path.

## What Is Still Not Proven

- Technician assignment guardrail was not rerun in the Phase 7B suite with an isolated technician session.
- DB-layer technician assignment enforcement still needs a focused, current, real technician-role verification before relying on it broadly.
- Full password reset email delivery and recovery-link round trip were not reverified after the rate-limit event.
- Invite email acceptance and default-location onboarding for a real second user still need focused QA.
- Photo/file upload paths need additional live desktop and mobile checks.
- Mobile Safari and Add-to-Home-Screen behavior need continued real-device verification.
- Parts-screen Restock and inventory-only Use are still client-side operations and are not yet transaction-safe like work-order part usage.
- Broad multi-company onboarding is not verified.
- Automated credentialed tests are not in place.

## Risks Acceptable For A Controlled Pilot

These are acceptable only because the pilot is controlled, supervised, and reversible:

- Manager/admin users can run core workflows while monitoring for wrong-location issues.
- Public QR requests can be used at a small number of known locations, with managers reviewing the request queue.
- Work orders can be created, opened, updated, and deleted by manager/admin users.
- Work Order Detail part usage can be tested with real or low-risk inventory after users understand the current inventory limitations.
- Issue reports can be used as a live support channel.
- Manual smoke checks can cover gaps while automation remains limited to resource loading.

## Risks That Block Broader Rollout

- Technician guardrail must be reverified with an isolated real technician session.
- Invite/default-location onboarding must be verified for real second-user acceptance.
- Password recovery full email round trip must be verified when rate limits are clear.
- File/photo upload must be verified across desktop and mobile.
- Mobile field workflow needs more real-device evidence.
- Inventory should not be presented as fully authoritative until restock and inventory-only Use transaction safety is addressed or clearly documented.
- Automated credentialed smoke tests need a safe session/secrets strategy before they can replace manual checks.
- Multi-company onboarding and tenant-isolation behavior should get deeper review before adding outside companies.

## Roles Safe To Participate

Safe for pilot:

- Owner/admin.
- Manager/admin-capable Taylor users who understand this is a controlled pilot.
- A very small number of trusted technicians after focused technician-role verification is completed or with manager oversight.
- External QR request submitters, because they only submit public requests and do not access the authenticated app.

Not yet safe for broad participation:

- Unsupervised technicians across all locations.
- New companies.
- Real production users who need password recovery as a guaranteed support path without support backup.
- Users relying on inventory as accounting-grade truth.

## Workflows Safe To Pilot

Safe with supervision:

- Sign in / session restore for known users.
- Salem-first active location workflows.
- Location switching by manager/admin users who understand the location lock.
- Quick Fix work creation.
- Work Orders list/detail.
- Manager/admin work-order create/open/delete.
- Public QR request submit and manager/admin request review.
- Request cleanup and conversion only with manager/admin review.
- Work-order part usage through the RPC-backed path.
- Issue report submit/update.
- Team visibility and role display review without broad invite rollout.

## Workflows To Keep Limited Or Manual

- Technician assignment guardrail.
- Technician self-claim and assignment behavior.
- Password recovery.
- Invite acceptance.
- Photo/file upload.
- PM generation and procedure/checklist workflows beyond focused QA.
- Parts Restock and inventory-only Use for high-value inventory.
- Mobile Safari/Add-to-Home-Screen workflows until real-device evidence is stronger.

## Data Not Yet Authoritative

Do not treat these as final operational truth yet:

- Parts inventory quantities for accounting or purchasing decisions.
- Historical QA issue reports.
- Old QA/test work-order history if any remains.
- Technician assignment audit conclusions until focused technician verification is rerun.
- Photo/document storage completeness until upload cleanup and retrieval are verified.
- Password recovery reliability until email round trip is tested after rate limits are clear.

## Support And Rollback Process During Pilot

Pilot support should be explicit:

- Keep pilot users small and named.
- Use `Report Issue` for app issues.
- Keep a daily manual smoke checklist during pilot.
- Run GitHub Actions Resource Load Smoke after pushes/uploads.
- Keep a visible list of known limitations for pilot users.
- If wrong-location work appears, stop new work entry and correct the location before continuing.
- If a workflow fails, capture:
  - user,
  - role,
  - location,
  - exact action,
  - work/request/part title,
  - screenshot if possible,
  - whether cleanup is needed.
- Rollback for app deploy problems:
  - use the last known good GitHub commit/package.
  - rerun Resource Load Smoke after rollback.
  - run focused manual smoke for session, location, Work Orders, Requests, and Parts.
- Rollback for data problems:
  - avoid broad SQL cleanup.
  - use app UI cleanup where safe.
  - use exact targeted SQL only after review and with copy/paste SQL documented.

## Pre-Pilot Checklist

Complete before inviting more pilot users:

- Confirm latest GitHub Actions Resource Load Smoke is green.
- Run live signed-in session restore.
- Confirm Salem, OR stays active after reload.
- Create/open/delete one QA work order.
- Submit one public QR request and verify manager visibility, then delete it.
- Create one QA part and one QA work order, record work-order part usage, verify stock decrement, then clean up.
- Submit/update one app issue report or confirm existing issue reporting remains visible.
- Confirm Team screen role visibility for manager/admin.
- Rerun technician guardrail with a real isolated technician session before broad technician participation.
- Verify password recovery end to end when email rate limits are clear.
- Verify invite acceptance with a test user before inviting multiple real users.
- Verify photo upload on desktop and mobile before depending on request/work-order photos.
- Tell pilot users which workflows are safe and which are still limited.

## Recommended Pilot Scope

Start with:

- 1 company: Taylor Metal Products.
- 1 primary location: Salem, OR.
- 1-2 manager/admin users.
- Optional 1 trusted technician only after focused technician verification.
- External QR request submitters for Salem QR only.
- Daily smoke checks.
- Weekly or per-change GitHub Actions resource smoke review.

Avoid in pilot:

- onboarding outside companies.
- high-volume invite rollout.
- treating inventory as final purchasing/accounting source.
- unsupervised technician assignment testing.
- relying on password reset as the only recovery/support mechanism.

## Recommended Next Phase

Recommended next phase: LFES Phase 8B pilot launch checklist execution.

Phase 8B should be verification only unless a real defect is found:

- run the pre-pilot checklist,
- document PASS / FAIL / NOT VERIFIED results,
- keep cleanup through app UI,
- do not change code or SQL without separate approval.

Alternative next phase:

- LFES Phase 7G session/auth automation strategy planning only, if the priority is automation rather than pilot launch.
