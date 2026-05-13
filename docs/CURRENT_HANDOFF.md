# Current Handoff

Use this file first when starting a new chat.

## Current Goal

Pause feature expansion and preserve project memory so future work can start from docs instead of relying on one long chat thread.

## Current App State

The app is a working Supabase-backed MaintainOps prototype with:

- Auth
- Companies
- Locations
- Team roles
- Quick Fix
- Work Orders
- Equipment
- Parts
- PM
- Procedures
- Requests
- Messages
- Photos
- Comments
- History
- Mobile and desktop layouts
- Large-data stress test improvements

## Most Recent Change

QA data cleanup process was formalized, the first app-delete cleanup pass was run, and the missing cleanup paths were added:

- Added `docs/QA_DATA_PROCESS.md` with required QA naming, cleanup, and post-delete debug rules.
- User clarified cleanup should go through the app, not SQL, so the SQL cleanup artifact was removed.
- The app-delete process targets QA/debug/test records only and avoids broad deletes.
- Parts/equipment should be left in place if the app reports linked history.
- Updated `docs/DEBUG_PROCESS.md` so future debug runs include QA data lifecycle discipline.
- Through the hosted app, QA active work orders were deleted via the real `Delete Work Order` -> `Permanently Delete` path across locations.
- Salem active Work Orders now show only Lee's real `Hydralic Leak`; Auburn, Riverside, Sacramento, and Spokane show no visible active QA work orders.
- Created and deleted `QA delete smoke 20260513 app path` through the same app workflow to verify create/delete after cleanup.
- Deleted 13 QA parts through the app; Parts now shows `0 shown`.
- Added manager/admin app delete controls for Requests, PM schedules, and Procedure templates.
- Added `supabase/step-next-cleanup-delete-paths.sql` with exact delete grants and RLS policies for those app delete paths.
- Final hosted cleanup was completed after the SQL and GitHub Pages upload:
  - Requests are clean across all locations.
  - PM schedules are clean across all locations.
  - Procedures are clean.
  - Equipment has no visible QA headings across all locations.
  - Parts has no visible QA headings.
  - Quick Fix create/delete smoke passed after cleanup.
  - No MaintainOps console errors were captured.
- Ran full hosted debug after cleanup:
  - navigation passed for all main sections,
  - location switching passed all five locations,
  - Work Orders active queues stayed clean with only live `Hydralic Leak` in Salem,
  - Quick Fix create/delete, Part create/delete, and Equipment create/delete smokes passed,
  - Requests, PM, Procedures, and linked QA Equipment remain the cleanup blockers,
  - no hosted MaintainOps console errors were captured.

## Prior Recent Change

Active location persistence was hardened:

- Location selection is now stored per signed-in user and company with a scoped localStorage key.
- The old `maintainops.activeLocationId` key is still written/read as a compatibility fallback.
- Startup now prefers the saved location for the loaded company when that location still exists.
- Switching companies no longer wipes the saved location for that company before locations are loaded.
- `index.html` now points to `app.js?v=location-persist-1`.
- Updated the debug/feature processes so location changes must be verified after app reload/reopen.
- Static checks passed and the local HTTP app loaded to the login screen with no `127.0.0.1:4182` console errors. Browser automation could not complete signed-in local location switching because the local/file origins did not have the current auth session and `file://` inspection is blocked by browser policy.

## Prior Recent Change

Supabase Data API grant hardening for the 2026 public-schema change:

- Added `supabase/step-next-explicit-data-api-grants.sql`.
- Updated process/setup/architecture docs so future public tables require explicit grants plus RLS policies.
- Kept public QR access on scoped RPCs, not direct anonymous table grants.
- Ran focused service-role table and RPC grant passes in Supabase after the first all-in-one run stalled in the dashboard.
- Verified the important grants returned `true`: authenticated schema usage, service_role schema usage, authenticated work order select/update, service_role app issue report delete, service_role work order delete, anon public request RPC execute, and service_role public request RPC execute.
- Ran hosted debug after the grants and Lee correction:
  - static checks passed,
  - hosted app loaded,
  - main navigation passed,
  - location switching passed Salem/Auburn/Salem,
  - `Hydralic Leak` and `New thalmann` verified in Salem,
  - Auburn search showed zero result cards for `Hydralic Leak`,
  - Quick Fix, Quick Update, comment, internal request submit, and request conversion passed in Salem.
- Ran full hosted debug afterward:
  - main navigation passed cleanly after clearing persisted global search state,
  - location switching passed Salem, Riverside, Spokane, Auburn, Salem,
  - Quick Fix, Quick Update, comments, parts Use/Restock, equipment create, procedure/step create, PM create/generate, internal request submit/convert, app issue report, Team role surface, and public Salem QR request all passed,
  - no MaintainOps console errors were found,
  - protocol note: click a search result to clear a persisted global search state if direct automation fill does not clear the controlled search input.

## Prior Recent Change

Live correction for Lee Gaede's `Hydralic Leak` work order:

- Found work order `8a19166f-c653-4da6-a5db-01bc5b96491a` had landed in Auburn, WA.
- The linked equipment `New thalmann` (`fdab0981-bb5e-4335-92ce-f0b4667b1692`) was also in Auburn, WA.
- App logic uses selected equipment location when equipment is attached, so this was likely equipment/location routing rather than a random save failure.
- Ran a targeted Supabase correction to move the work order and linked equipment to Salem, OR.
- Verification showed the work order now at Salem, OR.
- Follow-up remains: build invite/default location and finish true technician mobile-tech lock QA so users do not fall back to the first alphabetical location.

## Earlier Recent Change

Requests flow was cleaned up so converted requests do not clutter the active request queue.

Implementation:

- Requests now default to an Active filter for submitted, unconverted requests.
- Added Active, Converted, and All request filters.
- Work Orders request gauge/queue stays focused on Active requests.
- Converted request cards are visually quieter and no longer show conversion actions.
- Mobile request card layout was tightened.
- Local password login QA has a timeout fallback that retries through Supabase's auth token endpoint and sets the returned session.
- Request loading has a safe no-join fallback for `maintenance_requests` so the Requests panel can still load if relationship metadata is unavailable in a test origin.
- Internal request submit now returns the Requests screen to Active page 1 so newly submitted requests are immediately visible even if the user was reviewing Converted history.
- Bumped `index.html` to `styles.css?v=request-flow-clean-1` and `app.js?v=request-flow-clean-auth-3`.

Verified:

- Static checks passed.
- Public QR request smoke passed with `QA request flow public 1778270000000`.
- Authenticated localhost app loaded after login fallback with Taylor Metal Products visible.
- Requests panel loaded without setup-needed warning.
- Active / Converted / All request filters worked; Active excluded converted cards and Converted removed conversion actions.
- Submitted `QA request active reset 177827-active-reset` while viewing Converted; the app returned to Active and showed the new request.
- Converted `QA request active reset 177827-active-reset` to a work order; Work Order Detail opened, Active no longer showed it, and Converted showed it as converted.
- Main navigation passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings.
- Manager location switching passed across all five configured locations.
- No MaintainOps console errors were observed in the final request, navigation, and location checks.

## Prior Recent Change

Technician assignment guardrails were added.

Implementation:

- Technicians can still create work orders and convert maintenance requests into work orders.
- Technicians can claim unassigned work for themselves.
- Technicians cannot assign work to other users, assign outside vendors, clear assignments, or reassign work already assigned to someone else.
- Managers/admins keep full assignment and reassignment controls.
- Assignment dropdowns now show manager-level choices only to managers/admins.
- Added `supabase/step-next-technician-assignment-guardrails.sql` with a work-order trigger and tightened work-order insert/update policies.
- Bumped `index.html` to `app.js?v=tech-assignment-guardrails-1`.

Still needs:

- Re-test with a real technician login to prove forbidden technician assignment paths are blocked under a true technician session.
- If preparing GitHub, include the updated `app.js`, `index.html`, docs, and `supabase/step-next-technician-assignment-guardrails.sql`.

Verified:

- Supabase assignment guardrail SQL was applied by the user.
- Debug protocol ran with fresh local token `1778195748451`.
- Static checks passed.
- Main navigation and manager location switching passed.
- Team role UI shows only Technician, Manager, Admin.
- Quick Fix save passed with `QA assignment guard quick fix 1778195839716`.
- Internal request conversion passed with `QA assignment guard request 1778195863991`.
- Assign to me and Quick Update passed on the converted work order.
- Public QR request submit passed with `QA assignment public request 1778195925580`.
- No MaintainOps console errors were observed.

Most recent full debug:

- Full debug ran with fresh local token `1778196110830`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Verified Quick Fix, Quick Update, comments, parts Use/Restock, equipment create/save, internal request conversion, procedure step creation, PM schedule generation, app issue report, public Spokane QR request, and Team role UI.
- Team still shows only Technician, Manager, Admin; Member is absent.
- No MaintainOps console errors were observed.
- `docs/DEBUG_PROCESS.md` was updated with lessons from this run: open collapsed Comments before targeting `#comment-form`, verify PM title fill/refreshed DOM, and reopen the manager app after anonymous QR tests if the in-app browser replaces the manager tab.
- `docs/QA_LOG.md` has the full record names and token details.

## Prior Recent Change

Team roles were simplified to the real working model: Technician, Manager, Admin.

Implementation:

- Removed Member from role selectors, invite role selector, and the role guide.
- Legacy `member` values are normalized as Technician in the app.
- Role save now reloads `company_members` after the Supabase RPC succeeds, so a changed role does not redraw from stale in-memory data.
- Added `supabase/step-next-role-model-technician-manager-admin.sql` to convert existing `member` rows/invites to `technician`, tighten role checks, and update role/invite RPC validation.
- Bumped `index.html` to `app.js?v=roles-three-role-model-1`.

Still needs:

- Run the new role-model SQL in Supabase.
- Re-test role change from Team after SQL is applied.

## Prior Recent Change

QR and internal maintenance requests now have an optional photo field.

Implementation:

- Public QR request form and internal Request form include a photo upload input.
- Request photos reuse the same `optimizePhoto()` behavior as work-order photos: 2400px max dimension, JPEG quality 0.88 for supported image types.
- `supabase/step-next-maintenance-request-photos.sql` adds request photo metadata columns, a private `maintenance-request-photos` bucket, storage policies, and the attach RPC.
- Request cards show the attached photo thumbnail and signed authenticated open link after SQL is applied.

Verified:

- Syntax checks passed.
- Internal and public request forms show the photo input and optimization copy.
- Public and internal request submit still work without a photo.
- After SQL was applied, a QR request with `logo.png` attached showed a manager-side thumbnail and `Open photo` link.
- The post-feature debug protocol caught and fixed a Quick Fix regression (`sourceRequest is not defined`).
- Quick Fix was re-tested after the fix and saved `QA qf fixed 1778194725490` successfully.
- Public QR request submit was re-tested after the fix and manager-side verification found `QA protocol public request 1778194843081` under the QR link's Auburn, WA location.

Still needs:

- Re-test with a real selected file from the browser file picker on desktop and mobile.

## Prior Recent Change

The repeatable debug process was tested against the live local app until it stopped finding new misses in the tested areas.

Implementation:

- `docs/DEBUG_PROCESS.md` and `docs/FEATURE_CHANGE_PROCESS.md` now include visible/scoped selector rules for desktop/mobile duplicate controls.
- Internal request submit now uses the submitted form (`event.target`) from the document-level submit listener.
- The temporary click-submit workaround was removed so the native form submit path owns request creation.
- The cache tag was bumped to `app.js?v=request-submit-form-target-1`.

Verified:

- Navigation smoke.
- Manager location switching.
- Quick Fix create.
- Internal request submit.
- Equipment and part detail stale-panel clearing.
- Part create, search, Use, and Restock.
- Public QR anonymous submit and manager-side visibility.

## Prior Recent Change

Location switching was made intentional.

Implementation:

- Top banner has a location dropdown.
- Managers/admins can switch.
- Regular technicians cannot switch unless they enable `Mobile tech`.
- `Mobile tech` is set in Team under My Profile.
- Required SQL adds `profiles.mobile_tech`.

## Next Action

Run QA on the Mobile tech location lock flow.

Before and after any new feature or fix, use `docs/FEATURE_CHANGE_PROCESS.md` and `docs/DEBUG_PROCESS.md` so changes are scoped, tested, documented, and packaged the same way every time.

See `docs/QA_LOG.md`, `docs/NEXT_STEPS.md`, `docs/FEATURE_CHANGE_PROCESS.md`, and `docs/DEBUG_PROCESS.md`.

## Important User Preferences

- Always provide Supabase copy-paste SQL when Supabase changes are required.
- Do not overbuild location permissions.
- Keep location switching simple but intentional.
- Keep Quick Fix central.
- Prefer practical shop-floor use over accounting/billing depth.
- Mobile matters heavily, but do not break desktop.
- Completed work should not clutter default screens.
- Warnings should be visually obvious.

## Project Docs

Read these in order:

1. `docs/PROJECT_OVERVIEW.md`
2. `docs/ARCHITECTURE.md`
3. `docs/FEATURE_STATUS.md`
4. `docs/QA_LOG.md`
5. `docs/NEXT_STEPS.md`
6. `docs/FEATURE_CHANGE_PROCESS.md`
7. `docs/DEBUG_PROCESS.md`
8. `docs/SUPABASE_SETUP.md`
