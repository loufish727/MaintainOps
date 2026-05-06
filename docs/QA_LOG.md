# MaintainOps QA Log

This file summarizes important QA passes and remaining test priorities.

## Stress Tests Completed

The app has been stress tested with large work-order counts:

- 100 work order matrix
- 500 work order load
- 1,000 work order load
- 2,500 work order paging verification
- 5,000 work order verification
- 10,000 work order verification

Outcome:

- The app moved toward server-paged work orders.
- Work queues remain usable with 12 visible cards per page.
- Search was expanded to pull related matches without rendering thousands at once.

## Relationship Stress Tests

Relationship tests have covered:

- Work order to equipment.
- Work order to procedures.
- Work order to parts used.
- Work order to comments.
- Work order to photos.
- Work order to history/events.
- Work order to messages.
- Assignment and reassignment.
- Status changes across generated and manual work orders.

Important finding:

- Procedure checklist logic had issues on some work-order variation types and was patched.
- Any new work-order creation path should be retested against procedure checklist behavior.

## Role And Permission QA

Test user:

`louie@taylormetal.com`

Known last tested role:

`manager`

Validated behavior:

- Technician can create Quick Fix.
- Technician can update assigned work.
- Technician can comment.
- Technician cannot use admin-only delete paths.
- Manager sees Team role controls.
- Manager sees Admin Setup and Settings.
- Role update from Supabase reflects in app after sign out/in.

## Location QA

Validated:

- Switching locations reloads work queues.
- Location A data and Riverside data do not show together in default location-scoped work views.

Recent change needing fresh QA:

- Topbar location switcher.
- Mobile tech lock.
- Team profile Mobile tech setting.

2026-05-06 update:

- Manager session confirmed topbar location switcher is unlocked.
- Manager switched Salem, OR to Riverside, CA; work counts/cards reloaded to Riverside-scoped data.
- Found and fixed a blocker: profile loading did not select `profiles.mobile_tech`, so the Team checkbox could save but would reload as off and technicians would remain locked.
- Verified Mobile tech checkbox now persists checked after save/re-render, then restored the current manager profile back to off.
- Created QA Quick Fix `QA mobile location lock quick fix 1778099147702` while Riverside, CA was selected.
- Confirmed that Quick Fix appeared in Riverside, CA and did not appear after switching to Salem, OR.
- Still needs a real technician-account pass for disabled switcher/unlock/re-lock behavior when a technician login is available.

## Public Request QR QA

2026-05-06 update:

- Manager opened Company Settings and created an active Riverside, CA public request QR link.
- With Public MaintainOps URL set to local test server `http://127.0.0.1:4173/index.html`, the QR page loaded anonymously and showed Riverside, CA / Taylor Metal Products.
- Anonymous request form loaded without company login from `?request=...`.
- Submitted external QA request `QA outside QR request 1778099491452`.
- Public form showed `Request Sent`.
- Manager reloaded MaintainOps and confirmed the request appears under Riverside, CA Requests with outside requester name/contact and Convert/Quick Fix actions.
- Before printing real QR codes, set Public MaintainOps URL to the deployed MaintainOps URL rather than the local test URL.

Current next QA sequence:

1. Manager account:
   - Confirm topbar location switcher is unlocked.
   - Switch Salem, Riverside, Spokane.
   - Confirm work orders/equipment/parts are scoped to selected location.

2. Technician with Mobile tech off:
   - Confirm topbar location switcher is visible but disabled.
   - Confirm helper text says to enable Mobile tech in Team.
   - Confirm Quick Fix lands in current/default location.

3. Technician enables Mobile tech:
   - Go to Team.
   - Check Mobile tech.
   - Save My Settings.
   - Confirm location dropdown unlocks.
   - Switch location.
   - Create Quick Fix.
   - Confirm it lands in selected location.

4. Technician disables Mobile tech:
   - Confirm location dropdown locks again.
   - Confirm existing work remains intact.

## Known Browser Notes

- Firefox had login/session issues during earlier testing.
- Edge worked when Firefox stalled on membership load.
- Hard refresh/cache-busting often needed due local `file://` testing.

## Manual QA Checklist

Run this before larger feature work:

- Login/logout.
- Company load.
- Location switch.
- Quick Fix create.
- Quick Fix complete with no equipment.
- Quick Fix complete with equipment and safety check.
- Full work order create.
- Work order edit.
- Work order status changes.
- Work order assignment/reassignment.
- Add comment.
- Upload photo.
- Add/use/restock part.
- Attach part document.
- Delete part.
- Add/edit/delete equipment.
- PM schedule create.
- Generate work from PM.
- Procedure create.
- Add steps.
- Attach procedure to work order.
- Complete checklist.
- Message direct/company/location.
- Link message to work order.
- Search work, equipment, parts, people.
- CSV export.
- Role change.
- Invite flow.

## Remaining Risk Areas

- Large `app.js` is hard to reason about and easy to regress.
- Optional schema fallbacks still exist in parts of the codebase; these can hide missing migrations.
- No automated test harness yet.
- Public QR/request flow needs final hosted URL validation.
- Invite default location is not implemented yet.
