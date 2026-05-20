# LFES Phase 8D Pilot Issue Review And Limited Cleanup Decision

Review and cleanup decision only. No app architecture, `app.js` refactor, helper extraction, Supabase SQL/RLS, tests, workflow logic, data cleanup, or broader rollout changes were made in this phase.

## Pilot Context

- Company: Taylor Metal Products.
- Primary location: Salem, OR.
- Usage model: supervised manager/admin pilot.
- Live URL reviewed: `https://loufish727.github.io/MaintainOps/`
- Cache-bust/session observed: `?qa_bust=phase8c-monitor-20260519`
- Latest observed deploy/repo hash: `4b6185e`
- Latest observed GitHub Actions result:
  - workflow: `Resource Load Smoke`
  - run: `Document resource smoke workflow verification #5`
  - job: `Hosted resource-load smoke`
  - result: PASS / succeeded

## Pilot Cleanliness Result

Pilot cleanliness result: NEEDS LIMITED CLEANUP DECISION BEFORE USERS TREAT QUEUES AS LIVE-ONLY.

The app is operationally stable enough to continue the controlled pilot, but the Salem active Work Orders queue and Admin Setup issue-report list contain records that could confuse pilot users.

No app defect was found. The issue is operational data cleanliness and queue trust.

## Light Live Smoke

TEST:
Pilot operational cleanliness

STEPS:
1. Restored signed-in session in the live GitHub Pages app.
2. Verified Taylor Metal Products loaded.
3. Verified Salem, OR remained active.
4. Loaded Work Orders.
5. Opened `Test 1` Work Order Detail for read-only inspection.
6. Loaded Requests.
7. Loaded Parts.
8. Loaded Team.
9. Loaded Settings.
10. Loaded Admin Setup.
11. Verified public QR links were visible in Settings.
12. Inspected for stale QA/demo data.
13. Checked warning/error logs available through the browser connection.

EXPECTED:
No obvious stale QA pollution, no missing scripts, no visible app errors, and pilot queues understandable to pilot users.

RESULT:
PASS WITH CLEANUP CANDIDATES

NOTES:
The app loaded normally and Salem stayed active. No missing-script or visible app errors were observed. However, `Test 1` is visible in active Salem Work Orders and appears to be setup/demo or leftover test data. Admin Setup shows historical QA issue reports. These are cleanup candidates, not code defects.

## 1. Current Active Work Orders

Result: CLEAN ENOUGH TO FUNCTION, BUT NOT CLEAN ENOUGH TO TREAT AS LIVE-ONLY.

Visible active Salem work orders:

1. `Test 1`
   - status: New
   - priority: Medium
   - type: Corrective
   - owner: Louie Fisher
   - due date: unset
   - equipment: `Test 1`
   - detail text: `Test 1`
   - safety: required
   - classification: setup/demo or leftover test data, unless the owner confirms it is intentional live pilot work.
   - recommendation: cleanup candidate through normal app delete flow only after owner approval.
2. `Hydralic Leak`
   - status: In Progress
   - priority: High
   - type: Reactive
   - due date: 2026-05-12
   - equipment: `New thalmann`
   - assignee/owner visible: Lee Gaede
   - classification: likely real operational work based on prior Lee correction history and specific issue description.
   - recommendation: keep visible unless the business owner says otherwise.

Determination for `Test 1`:

- Real pilot work: unlikely based on generic title, generic detail, and matching `Test 1` equipment.
- Setup/demo data: likely.
- Leftover QA data: possible, despite not using a `QA` prefix.
- Should remain visible: no, not unless the owner confirms it is intentional.
- Cleanup needed: recommended before pilot users treat the queue as live-only.
- Cleanup method: normal app flow only, after explicit owner approval.

## 2. Current Active Requests

Result: PASS.

Visible Requests state:

- Active: 0
- Converted: 0
- All: 0
- message: `No active requests waiting for review.`

Pilot impact:

- This is a clean starting state for controlled QR intake.
- New QR requests should be easy for managers to spot.

## 3. Current Parts State

Result: PASS WITH LIMITATION.

Visible Parts state:

- Parts Inventory: `0 shown`
- All Parts: 0
- Low Stock: 0
- message: `No parts added yet.`

Pilot impact:

- No stale QA parts are visible.
- Parts RPC path was not re-tested during this review because no safe part/work-order part usage was created.
- If parts are part of the pilot, real/approved parts should be added intentionally and inventory should remain supervised/non-authoritative.

## 4. Current Issue Reports State

Result: FUNCTIONAL BUT CLUTTERED WITH HISTORICAL QA REPORTS.

Admin Setup showed:

- Reported App Issues: 9 captured.
- Visible reports are historical QA/smoke records, including:
  - `QA Phase7B Issue Report 20260519-7B-1779225564137`
  - `LFES Phase 2I live wrapper smoke 1779139666427`
  - `LFES Phase 2I wrapper smoke 1779139232957`
  - `QA full debug app report 20260513-full-debug`
  - `QA debug rerun app report 177827-rerun`
  - `QA auth full app report 177827-authfull-d`
  - `QA full debug app report 1778196110830`
  - `QA smoke app report 1778191406745`
  - `Sweep App Issue 1778108281251`

Pilot impact:

- Report Issue works and reports are visible.
- The list is not clean for pilot operators/admins because historical QA reports could hide real pilot issues or reduce trust in the issue queue.

Recommendation:

- Do not delete automatically in this phase.
- Decide whether to keep historical QA reports as evidence, mark them resolved/archived, or delete them through app/admin paths if that workflow exists and the owner approves.
- For pilot operations, real pilot issues should use clear titles and be reviewed daily.

## 5. Current Team / Invite State

Result: FUNCTIONAL WITH ONE PENDING INVITE CLEANUP CANDIDATE.

Visible Team state:

- Team: 5 shown.
- Pending Invites: 1.
- Pending invite:
  - `jeffrey.kinkaid@taylormetal.com`
  - sent: 5/6/2026, 4:17:24 PM
  - default location: `first available`
  - role: Manager

Pilot impact:

- Team loads.
- Role guide/member list are visible.
- The pending invite may be intentional, but `Default location: first available` conflicts with the current Salem-first pilot rule and should be reviewed before the recipient accepts.

Recommendation:

- Confirm whether the pending invite is still intended.
- If not intended, cancel through normal Team UI after owner approval.
- If intended, consider reissuing with explicit Salem, OR default location before pilot onboarding.

## 6. Current Pilot QR Requests

Result: PASS.

Current Requests queue:

- 0 active
- 0 converted
- 0 all

Settings / QR links:

- Salem, OR public request link is active.
- Salem last-used timestamp visible: 5/19/2026, 2:27:24 PM.
- Other location links are also active, but pilot scope should stay Salem unless a manager intentionally tests another location.

Pilot impact:

- QR intake is ready for controlled Salem use.
- Managers should keep reviewing that new QR submissions route to Salem before conversion.

## 7. Leftover QA / Test Records

Confirmed or likely cleanup candidates:

- `Test 1` active work order.
- `Test 1` equipment shown in Equipment and Request equipment choices.
- Historical QA/smoke app issue reports in Admin Setup.

Not cleanup candidates without owner confirmation:

- `Hydralic Leak`, because it appears to be real operational work.
- `New thalmann`, because it is linked to real operational work.

## 8. Stale Setup / Demo Records

Likely stale setup/demo records:

- `Test 1` work order.
- `Test 1` equipment.

Pending invite to review:

- `jeffrey.kinkaid@taylormetal.com`, because it is older and defaults to `first available`.

## 9. Operational Ambiguity

Main ambiguity:

- Pilot users may not know whether `Test 1` is real work, a demo, or leftover QA.
- The active Work Orders queue is not clean enough for pilot users to treat every visible item as live operational truth.
- Admins may not know whether historical QA issue reports require action.
- A pending invite with `first available` default location may contradict the Salem-first pilot rule.

Severity:

- Medium for pilot trust if users begin using the app without cleanup/context.
- Low if the pilot owner reviews and cleans/labels the records before wider pilot use.

## 10. Admin Setup Readiness Warnings

Result: OBSERVATION.

Admin Setup showed:

- `15/16 ready`
- missing readiness item:
  - `Admin delete protection`
  - message: `Run step-next-admin-delete-work-orders.sql, then mark it applied`

Pilot impact:

- Not a blocker for this review because work-order delete behavior has been exercised in prior smoke passes.
- Should be reconciled before broader rollout so Admin Setup readiness accurately reflects the current backend state.

## Cleanup Decision

Cleanup recommended: YES, but not performed in this phase.

Cleanup should happen through normal app flows only, after explicit owner approval.

Recommended cleanup candidates:

1. `Test 1` active work order.
2. `Test 1` equipment, only after linked work/dependency checks allow it.
3. Pending invite `jeffrey.kinkaid@taylormetal.com`, if no longer intended.
4. Historical QA issue reports, if the app provides an approved admin cleanup/archive path or the owner approves a separate targeted cleanup plan.

Do not clean:

- `Hydralic Leak`
- `New thalmann`
- Any real pilot/live work
- Any record with unclear ownership until confirmed

## LFES Real-World Catch Tracking

A new LFES catch was added for pilot queue trust risk caused by stale setup/QA data appearing in live pilot surfaces.

## Final Phase 8D Result

Pilot cleanliness result: PASS WITH CLEANUP CANDIDATES.

Pilot confidence: MIXED.

- Improved because app surfaces loaded cleanly, Requests and Parts are clean, QR links are visible, and no app errors appeared.
- Decreased slightly because active Work Orders and Admin Setup contain ambiguous setup/QA records that could confuse pilot users.

Recommended next LFES phase: LFES Phase 8E approved pilot cleanup pass.

Phase 8E should:

- ask for explicit approval before deleting or canceling anything,
- use normal app UI paths only unless a separate SQL fix is approved,
- cleanup `Test 1` work order if approved,
- cleanup `Test 1` equipment only if safe after dependency checks,
- review/cancel stale pending invite if approved,
- review historical QA issue reports and decide whether to leave as evidence, mark resolved, archive, or clean through approved app/admin path,
- rerun the light pilot smoke after cleanup.
