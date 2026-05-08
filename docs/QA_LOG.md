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

2026-05-07 role model update:

- Removed the unused `member` role from the app UI. The working role model is now Technician, Manager, Admin.
- Fixed role-save redraw behavior: after `update_company_member_role` succeeds, the app reloads `company_members` before rendering Team again.
- Added `supabase/step-next-role-model-technician-manager-admin.sql` to convert legacy `member` rows/invites to `technician`, tighten database role checks, and update role/invite RPC validation.
- Still needs Supabase SQL application and a live Team role-change QA pass.

2026-05-07 technician assignment guardrails:

- Added the agreed technician rule: technicians can create work orders, convert requests to work orders, and claim unassigned work for themselves.
- Technicians cannot assign work to other users, assign outside vendors, clear assignments, or reassign work already assigned to someone else.
- Managers/admins keep full assignment controls.
- Added `supabase/step-next-technician-assignment-guardrails.sql` for database enforcement.
- Supabase SQL was applied, then debug protocol was run with fresh local token `1778195748451`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Startup passed with Taylor Metal Products loaded and no MaintainOps console errors.
- Main navigation passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings.
- Manager location switching loaded cleanly across the first three configured locations.
- Team role UI showed only Technician, Manager, Admin. Member was absent from role guide, invite role selector, and editable role selectors.
- Created Quick Fix `QA assignment guard quick fix 1778195839716`; verified it opened/saved successfully with no Quick Fix error.
- Submitted internal request `QA assignment guard request 1778195863991`; converted it to a work order and verified Work Order Detail opened.
- Claimed the converted unassigned work through Assign to me, then saved Quick Update with `Assignment guard update 1778195899595`.
- Submitted public QR request `QA assignment public request 1778195925580`; anonymous submit showed Request sent and manager search found it under the QR location.
- No MaintainOps console errors were observed. Browser-use Statsig telemetry warnings were ignored.
- Still needs live technician-account QA to prove the database trigger blocks forbidden technician assignment paths under a true technician session.
- Protocol improvement from this pass: `docs/DEBUG_PROCESS.md` and `docs/FEATURE_CHANGE_PROCESS.md` now require true restricted-role denied-path checks for role/security changes, durable Team reload verification after role saves, and exact QR-location verification for public request visibility.

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
- GitHub Pages URL confirmed as `https://loufish727.github.io/MaintainOps/`.
- Local `supabase-config.js` now sets `window.PUBLIC_APP_URL` to the GitHub Pages URL for QR generation after upload.
- Direct GitHub asset check confirmed hosted `app.js` contains the public request flow and public URL guard.
- Anonymous Supabase intake RPC confirmed Riverside, CA / Taylor Metal Products for the active Riverside token.

2026-05-07 request photo update:

- Added optional photo inputs to internal Requests and public QR request intake.
- Request photos reuse the existing work-order photo optimization behavior: image uploads are resized to a 2400px max dimension and encoded as JPEG quality 0.88 when supported.
- Added `supabase/step-next-maintenance-request-photos.sql` for `maintenance_requests.photo_*` metadata, the private `maintenance-request-photos` bucket, storage policies, and `attach_maintenance_request_photo`.
- Request cards now show the attached request photo thumbnail, optimized size metadata, and an authenticated signed link for managers/team members.
- Conversion and Quick Fix from a request preserve a text note on the created work order when the original request has a photo.
- Verified the provided test image `C:\Users\louie\Downloads\logo.png` is a PNG, 3052x1171, 145,981 bytes; it is larger than 2400px wide, so the browser optimizer should resize it before request-photo upload.
- Static checks passed after the code change: `node --check app.js` and `node --check supabase-config.js`.
- Fresh local UI verification used `request-photos-ui-1778193600000`.
- Verified internal Request form shows one optional photo input and the 2400px optimization copy.
- Verified public QR form shows one optional photo input and the 2400px optimization copy.
- Verified public QR submit without a photo still shows `Request Sent`.
- Verified internal request submit without a photo still appears in manager Requests.
- Full photo upload QA still requires running `supabase/step-next-maintenance-request-photos.sql` in Supabase, then selecting a file in the browser file picker on desktop/mobile.

2026-05-07 request photo SQL applied QA:

- After the request-photo SQL was applied, submitted public QR request `QA request photo upload 1778194123496` and attached `C:\Users\louie\Downloads\logo.png`.
- Verified the anonymous request record, private storage upload, and `attach_maintenance_request_photo` RPC all completed.
- Verified manager Requests screen showed the request card with `logo.png`, thumbnail image, size metadata, and an `Open photo` link.
- Verified no MaintainOps console errors during manager-side request photo rendering.
- Tested conversion behavior and kept the reliable behavior scoped: converted work orders include a note that the original request has an attached photo. Automatic copying into `work_order_photos` was attempted but not left enabled because it did not reliably render in the work order Photos section.

2026-05-07 connectivity smoke update:

- Re-ran desktop app with fresh cache bust against live Supabase config.
- Verified all main navigation buttons open without console errors: My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, Settings.
- Verified manager location switching for Riverside, Salem, and Spokane reloads cleanly.
- Created Quick Fix `QA smoke connectivity 1778190977622`; confirmed it opened as a work order.
- Updated the smoke work order to In Progress, saved due date/resolution, and added a comment.
- Created part `QA smoke part 1778191046361`; verified Use and Restock inventory actions.
- Created equipment `QA smoke equipment 1778191132519`, found equipment card open navigation was missing, and fixed equipment cards so click/Enter/Space open Equipment Detail.
- Saved equipment detail name update to `QA smoke equipment 1778191132519 saved`.
- Found and fixed a section navigation leak where leaving a detail view could keep the old detail panel visible while another nav item was active.
- Submitted internal request `QA smoke request 1778191273133` and converted it to a work order.
- Created procedure `QA smoke procedure 1778191311036` and added step `QA smoke required step 1778191318813`.
- Created PM schedule `QA smoke PM 1778191339236` and generated a preventive work order from it.
- Submitted public QR request `QA public smoke request 1778191377621` through the anonymous Riverside request URL and verified it appeared in Riverside Requests.
- Submitted app issue report `QA smoke app report 1778191406745`.
- No browser console errors were observed during the smoke pass.

## Process QA

2026-05-07 update:

- Added `docs/DEBUG_PROCESS.md` as the repeatable debug/smoke workflow.
- Added `docs/FEATURE_CHANGE_PROCESS.md` as the feature gate process for scoping, risk classification, targeted QA, Supabase gate, GitHub package gate, GitHub Pages QA, and final response format.
- Linked both process docs from `docs/CURRENT_HANDOFF.md`, `docs/NEXT_STEPS.md`, and this QA log so future feature work starts from the same process.

2026-05-07 process test:

- Ran the debug process against the live local app with fresh cache bust `debug-process-test-1778191792707`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Startup passed for Taylor Metal Products with no browser console errors.
- Main navigation smoke passed; the process found a false-negative where `Settings` opens the `Company Settings` heading, so `docs/DEBUG_PROCESS.md` now notes that nav labels and headings can differ.
- Location switching passed for Salem, Riverside, Spokane, and back to Salem.
- Stale-detail checks passed for Work Order Detail to Requests, Equipment Detail to PM, and Part Detail to Equipment.
- The first stale-detail automation attempt used a broad `article` selector that hit hidden DOM; `docs/DEBUG_PROCESS.md` now requires visible, section-scoped selectors and known QA records.
- Created Quick Fix `QA process test 1778191897000 quick fix`; verified it appeared in Salem Work Orders.
- Submitted internal request `QA process test 1778191897000 request`; verified it appeared in Salem Requests.
- Submitted public QR request `QA process public request 1778191936240`; verified the public form showed `Request Sent` and the request appeared in Riverside Requests.
- Updated `docs/DEBUG_PROCESS.md` and `docs/FEATURE_CHANGE_PROCESS.md` to require durable write verification from lists/details rather than relying only on immediate post-click screen text.

2026-05-07 process repeat:

- Re-ran the debug process after the first process test to make sure the process itself was not missing failures.
- Found a real internal request submit bug: the document-level submit listener passed `document` as `event.currentTarget`, so the request save path could read the wrong object instead of the submitted form.
- Fixed internal request submit to use `event.target` and removed the temporary click-submit workaround so the normal form submit path owns request creation.
- Bumped the app script cache tag to `app.js?v=request-submit-form-target-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Fresh local verification used `request-submit-form-target-1778192864000`.
- Main navigation passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings / Company Settings.
- Manager location switching passed for Salem, OR, Riverside, CA, Spokane, WA, and back to Salem, OR.
- Submitted internal request `QA request native submit 1778192839053`; verified it appeared with no request-title error and no app console errors.
- Created Quick Fix `QA process final 1778192963192 quick fix`; verified it opened as Work Order Detail.
- Verified stale detail clearing from Work Order Detail to Requests, Equipment Detail to PM, and Part Detail to Equipment.
- Submitted internal request `QA process final 1778192963192 request`; verified it appeared under Requests.
- Created part `QA process final 1778193011833 part`; verified through part search, opened Part Detail, used one, restocked one, and confirmed the detail panel cleared when navigating to Equipment.
- Submitted public QR request `QA public process 1778193085730`; verified anonymous `Request Sent` and confirmed it appeared in manager Requests.
- The repeat run also improved the process docs: automation must scope visible desktop/mobile duplicate controls, Quick Fix smoke should use the actual Quick Fix fields, and Parts smoke should use `[data-open-part]` plus Part Detail inventory controls.
- No app console errors were observed. One Statsig/browser-use network message from the automation tooling appeared outside the app and was not treated as a MaintainOps console error.

2026-05-07 clean process finish:

- Re-ran the tightened process with fresh local cache bust `debug-process-clean-1778193196466`.
- Static checks still passed and `index.html` still points to `app.js?v=request-submit-form-target-1`.
- Startup, navigation, and manager location switching passed again.
- Created Quick Fix `QA clean process 1778193200167 quick fix`; verified Work Order Detail opened and stale detail cleared when navigating to Requests.
- Submitted internal request `QA clean process 1778193200167 request`; verified it appeared without the title-required error.
- Created part `QA clean process 1778193200167 part`; Add Part opened the new Part Detail, then Use and Restock both worked and stale detail cleared when navigating to Equipment.
- Submitted public QR request `QA clean public 1778193266182`; anonymous submit showed `Request Sent` and the manager Requests screen showed the request.
- Final corrected pass did not uncover a new app issue. The only remaining refinement was documenting that Add Part can verify by opening Part Detail immediately after save.
- No MaintainOps console errors were observed.

2026-05-07 full debug after technician assignment guardrails:

- Ran the full debug process with fresh local cache bust `full-debug-1778196110830`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Confirmed cache tags: `styles.css?v=request-photos-1` and `app.js?v=tech-assignment-guardrails-1`.
- Startup passed for Taylor Metal Products with no MaintainOps console errors.
- Main navigation and manager location switching had already passed in this full-debug run before the write-path sweep: My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, Settings, and all five locations.
- Created Quick Fix `QA full debug quick fix 1778196210920`; saved Quick Update to In Progress with due date `2026-05-20`; added comment `Full debug comment 1778196110830`.
- Created part `QA full debug part 1778196110830`; opened Part Detail; verified Use reduced stock from 5 to 4 and Restock raised it to 6.
- Created equipment `QA full debug equipment 1778196110830`; opened Equipment Detail; saved it as `QA full debug equipment 1778196110830 saved` with Watch status.
- Submitted internal request `QA full debug request 1778196110830`; converted it to a Work Order Detail.
- Created procedure `QA full debug procedure 1778196110830`; added required checklist step `QA full debug required step 1778196110830`.
- Created PM schedule `QA full debug PM retry 1778196110830`; generated a preventive work order from it.
- Submitted app issue report `QA full debug app report 1778196110830`.
- Submitted anonymous Spokane QR request `QA full debug public request retry 1778196110830`; public form showed `Request Sent`, then manager app was reopened and the request was visible in Spokane Requests.
- Team role UI showed only Technician, Manager, Admin; Member was absent from the role guide, invite role selector, and editable role selectors. Mobile tech setting was visible.
- No MaintainOps console errors were observed. Browser-use Statsig telemetry warnings were ignored.
- Protocol improvements from this pass: open collapsed Comments before automating `#comment-form`; verify PM title fill before submit and verify refreshed DOM after PM saves; reopen manager app after anonymous QR testing if the in-app browser replaces the manager tab.
- Still needs live technician-account QA to prove forbidden assignment paths and mobile-tech location lock under a true technician session.

2026-05-08 request flow cleanup:

- Cleaned up the Requests screen so converted requests no longer sit mixed into the default active request queue.
- Requests now default to an Active filter showing only submitted, unconverted requests for the active location.
- Added request filters: Active, Converted, All. Converted requests are still available intentionally, but no longer clutter the working request queue.
- Work Orders request gauge/queue now stays focused on Active requests and notes that converted requests are kept out of that queue.
- Converted request cards are visually quieter and show `Converted to work order` instead of conversion actions.
- Mobile request cards were tightened with a stable main content column and cleaner converted-state styling.
- Bumped cache tags to `styles.css?v=request-flow-clean-1` and `app.js?v=request-flow-clean-1`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Public QR request smoke passed through local server with `QA request flow public 1778270000000`; public form loaded for Spokane, WA and showed `Request Sent` with no MaintainOps console errors.
- Authenticated full debug could not be completed in the browser automation session because direct `file://` navigation was blocked and the local test server opened a separate origin without the existing signed-in session. Needs signed-in local file refresh verification from the user's current browser session.
- Retried against the user's current signed-in `file://` tab after request. Browser automation still reported the local file URL as blocked by policy before DOM inspection or clicks. Static checks and cache-tag verification still passed.
- After Node approval, localhost browser smoke was retried in a new tab. App loaded to the login screen on `http://127.0.0.1:4182`, proving the changed files load without a startup error on a browser-safe origin.
- Public QR request smoke passed again with `QA request flow retry 177827`; form loaded and showed `Request Sent` with no MaintainOps console errors.
- Added login resilience for local browser QA: normal Supabase password sign-in still runs first, and a timed-out password login retries through the Supabase auth token endpoint before setting the session.
- Added a safe `maintenance_requests` read fallback without joined relations so Requests can still load when relationship metadata is unavailable in a test origin.
- Authenticated localhost QA then loaded Taylor Metal Products on `http://127.0.0.1:4182` with no MaintainOps console errors.
- Verified Requests no longer shows the setup-needed message on localhost.
- Verified Active / Converted / All filters on authenticated localhost. Active showed submitted unconverted requests only; Converted showed converted history only.
- Full navigation smoke passed after the cleanup: My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Company Settings.
- Manager location switching passed across all five configured locations using the visible location selector.
- Created Quick Fix `QA auth full quick fix 177827-authfull-b`, saved Quick Update, and added comment `Auth full comment 177827-authfull-b`.
- Verified existing part `QA full debug part 1778196110830` could still be opened, used, and restocked. Browser automation could not type into numeric inputs reliably, so the new-part path was not counted as an app failure in this pass.
- Created or verified equipment detail save on `QA auth full equipment 177827-authfull-d saved`.
- Created procedure `QA auth full procedure 177827-authfull-d` and step `QA auth full step 177827-authfull-d`.
- Created PM `QA auth full PM 177827-authfull-d` and generated a preventive work order.
- Submitted app issue report `QA auth full app report 177827-authfull-d`.
- The debug pass found one cleanup wrinkle: if an internal request was submitted while the user was viewing Converted, the save succeeded but the new active request was not immediately visible until Active was clicked.
- Fixed that by returning Requests to Active page 1 after an internal request submit. Bumped `index.html` to `app.js?v=request-flow-clean-auth-3`.
- Verified the fix by submitting `QA request active reset 177827-active-reset` while viewing Converted. The app returned to Active, showed the new request, and did not show converted cards in Active.
- Converted `QA request active reset 177827-active-reset` to a work order. Work Order Detail opened, then Requests Active no longer showed that converted request; Converted showed it with `Converted to work order` and no conversion buttons.
- Static checks passed after the final fix: `node --check app.js` and `node --check supabase-config.js`.
- No MaintainOps console errors were observed in the final request, navigation, and location checks.
- Protocol improvements from this pass: request cleanup checks now require submit-from-any-filter verification, Active-vs-Converted action verification, and visible scoping for duplicate desktop/mobile location selectors.

2026-05-08 full debug rerun after request cleanup:

- Re-ran the debug protocol on `http://127.0.0.1:4182/index.html?qa_bust=full-debug-rerun-177827`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Confirmed cache tags: `styles.css?v=request-flow-clean-1` and `app.js?v=request-flow-clean-auth-3`.
- Startup passed for Taylor Metal Products with no MaintainOps console errors.
- Main navigation passed: My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Company Settings.
- Manager location switching passed across Auburn, Riverside, Sacramento, Salem, and Spokane using the visible location selector.
- Created Quick Fix `QA debug rerun quick fix 177827-rerun`; Work Order Detail opened.
- Saved Quick Update on that work order with `Debug rerun quick update 177827-rerun`.
- Added comment `Debug rerun comment 177827-rerun`.
- Request cleanup path passed again: submitted `QA debug rerun request 177827-rerun` while viewing Converted, verified it returned to Active, then converted it to a work order. Active no longer showed it; Converted showed it with no conversion action.
- Opened an existing part detail and verified Use and Restock controls still work.
- Created equipment `QA debug rerun equipment 177827-rerun`, opened Equipment Detail, and saved it as `QA debug rerun equipment 177827-rerun saved`.
- Created procedure `QA debug rerun procedure 177827-rerun` and added step `QA debug rerun step 177827-rerun`.
- Created PM schedule `QA debug rerun PM 177827-rerun` using the newly saved equipment and generated a preventive work order from it.
- Submitted app issue report `QA debug rerun app report 177827-rerun`.
- Submitted anonymous Spokane QR request `QA debug rerun public request 177827-rerun`; public form showed Request Sent and manager Requests showed the request after reopening the manager app.
- Team role UI still shows Technician, Manager, Admin; Member is absent. Mobile tech remains visible.
- No MaintainOps console errors were observed in the final pass.
- No new app bug was found. Protocol improvements from this pass: Quick Fix submit is `Log Quick Fix`, PM creation must fill equipment and due date before submit, and public QR verification should look for company/location text rather than a generic heading.

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

## Request Photo Debug Protocol Pass - 2026-05-07

Token refs:

- `1778194529477` initial full protocol pass
- `1778194725490` Quick Fix re-test after fix
- `1778194798152` request photo subset
- `1778194843081` public QR request verification

Result:

- Debug protocol was run after adding QR/internal request photos.
- The protocol caught a real regression: Quick Fix failed with `sourceRequest is not defined`.
- Root cause was the request-photo conversion note logic referencing a request variable inside Quick Fix save without defining it in that function.
- Fixed by resolving `sourceRequest` inside `createQuickFix()` before building the work order description.

Verified after fix:

- `node --check app.js` passed.
- `node --check supabase-config.js` passed.
- Quick Fix opened, saved `QA qf fixed 1778194725490`, and Work Order Detail showed the created work order.
- Internal request form still has exactly one optional photo input.
- Internal request without a photo saved as `QA protocol internal request 1778194798152`.
- Previously uploaded request photo `logo.png` still displayed on request cards with thumbnails.
- Public request form from QR token still has exactly one optional photo input.
- Public request without a photo submitted as `QA protocol public request 1778194843081`.
- Manager-side verification found the public request after switching/searching in the QR link's location, Auburn, WA.
- No MaintainOps console errors were observed. Browser-use Statsig warnings were ignored as tool telemetry noise.

Still manual:

- Real browser file-picker selection should be tested on desktop and mobile because automation verified storage with `logo.png`, but did not physically click a user file picker.

## Manual QA Checklist

Run this before larger feature work:

Use `docs/FEATURE_CHANGE_PROCESS.md` for feature gates and `docs/DEBUG_PROCESS.md` as the repeatable debug workflow. This checklist remains the broad manual coverage list.

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
