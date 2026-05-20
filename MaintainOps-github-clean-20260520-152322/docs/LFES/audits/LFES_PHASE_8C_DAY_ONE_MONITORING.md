# LFES Phase 8C Day-One Pilot Monitoring

Monitoring and triage only. No app architecture, `app.js` refactor, helper extraction, Supabase SQL/RLS, tests, workflow logic, or broader rollout changes were made in this phase.

## Pilot Context

- Company: Taylor Metal Products.
- Primary location: Salem, OR.
- Usage model: supervised manager/admin pilot.
- QR intake: controlled Salem request intake.
- Work orders and parts: supervised use only.
- Live URL monitored: `https://loufish727.github.io/MaintainOps/`
- Cache-bust used: `?qa_bust=phase8c-monitor-20260519`
- Latest observed deploy/repo hash: `4b6185e`
- Latest observed GitHub Actions result:
  - workflow: `Resource Load Smoke`
  - run: `Document resource smoke workflow verification #5`
  - job: `Hosted resource-load smoke`
  - result: PASS / succeeded

## Monitoring Summary

Pilot confidence: IMPROVED SLIGHTLY.

No Critical, High, or Medium defects were discovered in this Phase 8C monitoring pass. The live app restored the signed-in session, kept Salem active, loaded the required pilot areas, opened the public Salem QR request form, and exposed the Report Issue surface.

The pilot should continue under the Phase 8B supervised limits.

## Required Monitoring Checks

TEST:
Day-one live pilot smoke

STEPS:
1. Opened live GitHub Pages app with `?qa_bust=phase8c-monitor-20260519`.
2. Waited for signed-in workspace load.
3. Confirmed Taylor Metal Products loaded.
4. Confirmed Salem, OR was selected.
5. Opened Work Orders.
6. Opened Requests.
7. Opened Equipment.
8. Opened Parts.
9. Opened Team.
10. Opened Settings.
11. Opened Admin Setup.
12. Opened Report Issue modal and then canceled without submitting.
13. Opened Salem public QR request page with `?request=...&qa_bust=phase8c-pilot-qr-20260519`.
14. Checked visible app state and warning/error logs available through the browser connection.

EXPECTED:
The app restores session, Salem remains active, pilot pages load, QR request page loads, Report Issue is visible, no missing scripts appear, and no visible app errors appear.

RESULT:
PASS

NOTES:
No pilot records were created, edited, or deleted during this monitoring pass. Parts RPC usage was not re-mutated because this pass was monitoring-only and the Parts page currently showed `0 shown`. Prior Phase 6D and Phase 7B evidence still supports the Work Order Detail part-usage RPC path.

## Check Results

| Check | Result | Notes |
| --- | --- | --- |
| Daily live smoke run | PASS | Live app opened and loaded authenticated workspace. |
| GitHub Actions Resource Load Smoke | PASS | `Resource Load Smoke #5` / `Hosted resource-load smoke` succeeded. |
| Session restore | PASS | Workspace loaded after `Checking team access...`. |
| Salem persistence | PASS | Location selector showed Salem, OR; Settings listed Salem as active location. |
| Work Orders load | PASS | Work Orders loaded for Salem, OR. |
| Equipment load | PASS | Equipment loaded. |
| Parts load | PASS | Parts Inventory loaded and showed `0 shown`. |
| Team load | PASS | Team loaded and role guide/member list were visible. |
| Settings load | PASS | Company Settings loaded. |
| Admin Setup load | PASS | Admin Setup loaded and showed readiness area. |
| QR request path | PASS | Salem public request form loaded after the initial loading state. |
| Parts RPC usage path | NOT RE-MUTATED | Prior RPC evidence remains valid; no new part usage was created in this monitoring-only pass. |
| Issue report visibility | PASS | Report App Issue modal opened and was canceled without submitting. |
| Missing scripts/resources | PASS | No visible missing-script failures; GitHub Actions resource smoke is green. |
| Actionable console/browser errors | PASS | No warning/error logs were captured through the browser connection during the monitoring pass. |

## Triage Table

| Severity | Area | Observation | Mitigation / Next Action |
| --- | --- | --- | --- |
| Observation | Work Orders | Salem currently shows 2 active work orders, including `Test 1` and `Hydralic Leak`. | Confirm whether `Test 1` is intentional live/pilot data or leftover setup/test data before pilot users treat the queue as live-only. Do not bulk-delete without owner confirmation. |
| Observation | Parts | Parts Inventory currently shows `0 shown`, so a fresh non-mutating parts RPC verification was not possible. | Keep parts usage supervised. If parts will be used during pilot, create real/approved pilot parts intentionally or run a separate QA part smoke with cleanup. |
| Observation | Requests | Requests loaded with `0 active`, `0 converted`, and `0 all`. | Good starting state for controlled QR intake. Continue checking that new QR requests route to Salem before conversion. |
| Observation | Admin Setup | Admin Setup showed `15/16 ready`. | Not a pilot blocker in this pass, but should be reviewed separately before broader rollout if the missing readiness item matters operationally. |

## Pilot Issues Discovered

No confirmed app defects were discovered.

## User Confusion Points

Potential confusion:

- Users may assume all visible active work is live pilot data. `Test 1` should be confirmed before the pilot queue is treated as clean.
- Inventory users may assume Parts quantities are final purchasing/accounting truth. Pilot rules should continue to say inventory is supervised and not accounting-grade yet.

## Workflow Friction

No new workflow friction was observed during the non-mutating smoke.

Known friction remains:

- Technician assignment verification still requires an isolated technician rerun.
- Password recovery round trip still depends on email availability/rate limits.
- Invite acceptance/default location still needs a focused second-user test.

## Wrong-Location Risks

Current result: no wrong-location regression observed.

Evidence:

- Salem, OR remained active.
- Work Orders header showed Salem, OR.
- Settings listed Salem as the active location.
- Salem QR request page loaded for Taylor Metal Products / Salem, OR.

Continue monitoring:

- Any new pilot work/request should be checked for location before conversion or assignment.

## QR Request Behavior

Current result: PASS for form load.

Evidence:

- Public Salem QR route initially showed `Loading request form...`.
- It then loaded the Taylor Metal Products / Salem, OR maintenance request form.
- Form showed request fields, photo input, and urgency options.

No new request was submitted in this monitoring pass.

## Parts / Inventory Behavior

Current result: no new mutation performed.

Evidence:

- Parts page loaded.
- Parts page showed `0 shown`.
- Work Order Detail RPC path was not re-tested because this was a non-mutating monitoring pass.

Pilot limitation:

- Work-order part usage has RPC evidence from Phase 6D / 7B.
- Inventory-only Use and Restock remain supervised and non-authoritative.

## Session / Auth Anomalies

No new session/auth anomalies were observed.

The app restored the existing session and loaded Taylor Metal Products after the normal `Checking team access...` state.

## Password Recovery Observations

Not verified in this pass.

Password recovery remains limited until the full email/recovery-link round trip is verified after Supabase email rate limits are clear.

## Mobile / Browser Quirks

No new mobile/browser quirk was observed in this desktop browser monitoring pass.

Mobile Safari/Add-to-Home-Screen remains a separate real-device verification item.

## Cleanup / Rollback Issues

No cleanup was required because no records were created, edited, or deleted.

Rollback process remains the Phase 8B process:

- restore last known good commit/package for deploy issues,
- rerun Resource Load Smoke,
- run focused manual smoke,
- use app UI cleanup before SQL for data issues.

## Missing Operational Visibility

Current visibility gaps:

- There is no automated credentialed smoke for session/location/workflows yet.
- There is no non-mutating way to prove parts RPC usage if no safe QA part/work order exists.
- There is no latest-pass confirmation of full password recovery, invite acceptance, photo upload, or mobile Safari behavior.

## Smoke-Test Failures Or Instability

None observed in this pass.

## LFES Real-World Catch Tracking

No new confirmed LFES real-world catch was added in this phase.

Reason:

- The monitoring pass found observations and known limitations, but no confirmed new defect, hidden assumption failure, mutation-boundary failure, deployment issue, or operational continuity problem requiring a new `LFES_REAL_WORLD_CATCHES.md` entry.

## Recommended Next LFES Phase

Recommended next phase: LFES Phase 8D pilot issue-review and limited cleanup decision.

Phase 8D should:

- confirm whether `Test 1` is real pilot data or leftover setup/test data,
- review any new Report Issue entries,
- review QR request submissions if pilot users have started,
- run the daily smoke again,
- keep code and SQL unchanged unless a real defect is separately approved.
