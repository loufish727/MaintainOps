# LFES Authority Map - renderWorkspace and bindWorkspaceEvents

Date: 2026-05-21

Current `app.js` line count: 9,122.

This map marks the shift from safe line reduction to controlled authority reduction. The goal is no longer a large line-count drop. The goal is to reduce concentrated operational authority without changing behavior.

## Current Authority Centers

### renderWorkspace()

Current role:

- owns whole-app workspace shell rendering.
- validates active section against `visibleNavItems()`.
- mutates page state when page indexes exceed available pages.
- computes visible/paged collections for work, requests, assets, PM, procedures, members, and parts.
- owns topbar/sidebar command markup.
- owns section composition for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Messages, Team, Parts, Settings, and Admin Setup.
- calls `bindWorkspaceEvents()` after replacing DOM.

Authority risk:

- high concentration of render state, active-section gating, responsive duplicate controls, form-bearing panels, mutation-adjacent buttons, delete controls, and pagination.
- extracting broad panels would risk hidden behavior changes because many panels contain forms or controls owned by `bindWorkspaceEvents()`.

Immediate safe strategy:

- do not move `renderWorkspace()` as a whole.
- do not move form-bearing panels yet.
- first isolate render-state calculation or section shell data only if the output is covered by signed-in smoke.
- keep any render segmentation one panel family at a time.

Rejected broad moves:

- full workspace shell.
- full Work Orders/My Work panel.
- full Equipment panel.
- full Parts panel.
- full Settings/Admin Setup panel.
- any panel that includes mutation forms, delete controls, upload controls, QR controls, or request conversion controls.

### bindWorkspaceEvents()

Current role:

- owns company/location switching.
- owns section navigation.
- owns command routing: Quick Fix, New Work Order, Submit Request, Report Issue, Export CSV.
- owns app issue report actions.
- owns Admin Setup SQL-applied acknowledgement.
- owns message navigation, composer state, replies, search, and quick replies.
- owns global search input, exact work search, result routing, card/detail openers.
- owns Work Order status filters, queue filters, sort, pagination, status mutation, assignment mutation, delete request/confirm flows, downtime copy.
- owns form submission routing across work, requests, assets, PM, procedures, team, parts, settings, logo, locations, public app URL.
- owns storage/upload form routing.

Authority risk:

- extreme concentration of event authority.
- combines read-only navigation, local UI state, read reloads, mutations, delete confirmations, uploads, form submissions, and auth.
- broad extraction would risk silent event contract drift.

Immediate safe strategy:

- split by event authority class, not by visual section.
- first target navigation/read-only state events that already have visible smokes.
- keep mutations, form submissions, delete confirmations, storage/upload, auth, and Quick Fix blocked until individually planned.

## Event Authority Classes

### A. Navigation And Read-Only State

Examples:

- `[data-section]`
- `.workspace-search-input`
- `[data-view-work-search]`
- `[data-close-work-search]`
- `.work-card`
- `.asset-card`
- `[data-open-asset]`
- `[data-asset-id]`
- `[data-mini-work-order]`
- `[data-view-member-work]`
- `[data-open-part]`
- `[data-close-part-detail]`
- `[data-part-inventory-filter]`
- `[data-asset-status-filter]`
- pagination buttons that only page local lists or reload read queues.

Risk:

- medium.
- These events mutate local UI state and may reload read queues, but do not submit writes.

Smoke requirement:

- signed-in nav smoke across My Work, Work Orders, Planning, Requests, Equipment, Parts, Team.
- visible DOM targeting for responsive duplicates.
- one search smoke proving exact work search can open and close.
- one detail opener smoke for work/equipment/part where feasible.

Rollback:

- restore original listener blocks in `bindWorkspaceEvents()`.
- remove new event module and script tag.

Recommended first boundary:

- workspace search input plus exact work-search open/close events.

Why first:

- it is operationally meaningful.
- it is already behavior-smoked from prior reductions.
- it is non-mutating.
- it reduces concentrated event authority without touching form submissions.

### B. Command Routing

Examples:

- Quick Fix command.
- New Work Order command.
- Submit Request command.
- Report Issue command.
- Export CSV command.

Risk:

- medium/high.
- Quick Fix and New Work Order enter form-bearing workflow states.
- Report Issue is admin issue workflow.
- Export CSV is side-effectful browser download.

Smoke requirement:

- command smoke must verify exact visible mode switch and no accidental submit.
- export requires download handling.

Current status:

- not first.
- can be planned after read-only navigation extraction succeeds.

### C. Message Center Events

Examples:

- message thread open.
- message filter.
- open linked work order.
- start/open work message thread.
- clear linked work.
- message search.
- composer type sync.
- reply form.
- quick replies.

Risk:

- medium/high.
- Some events are read/navigation, but others mark read or submit messages.

Current status:

- split later into read/navigation vs send/mutation.
- do not move as one cluster.

### D. Work Order Mutations

Examples:

- quick status.
- assign to me.
- card assignment.
- edit work order.
- quick update.
- completion.
- checklist save.
- comments.
- photos.
- delete work order.

Risk:

- high.

Current status:

- blocked until mutation ownership map exists.
- one mutation family only per phase.

### E. Request Workflow

Examples:

- request submit.
- Quick Fix from request.
- convert request.
- request delete.

Risk:

- high.

Current status:

- blocked.

### F. Asset, PM, Procedure, Parts, Team, Settings, Storage

Examples:

- create/update/delete equipment.
- create/generate/delete PM.
- create/delete procedures and steps.
- create/restock/use/update/delete parts.
- part documents.
- team invite/role/profile.
- company settings/logo/location/public app URL.

Risk:

- high.

Current status:

- blocked pending individual workflow maps.

## First Medium-Risk Boundary Proposal

Boundary:

- workspace search and exact work-search read-only events from `bindWorkspaceEvents()`.

Candidate event contracts:

- `.workspace-search-input`
- `[data-view-work-search]`
- `[data-close-work-search]`

Operational risk:

- medium.
- The boundary changes local search state, clears active detail modes, resets pages, invalidates exact search cache, reloads Work Order and Request read queues, restores focus/cursor, and toggles exact work-search mode.

Expected behavior:

- typing in visible workspace search updates persisted search text.
- typing a non-empty query clears active detail/form modes.
- Work Order and Request read queues reload after search input.
- focus returns to the same visible search input with cursor at the end.
- "Page through all matching work orders" switches to Work Orders exact-search mode.
- "Back to search preview" exits exact-search mode and keeps search preview available.
- no work order/request/asset/part mutation occurs.

Required smoke before merge:

- static JS checks.
- targeted mock-DOM event smoke proving state setters, storage writes, cache invalidation, page resets, read reload calls, and focus restoration.
- local resource smoke.
- local browser boot smoke.
- signed-in live smoke:
  - search `Hydralic`.
  - verify global search result appears.
  - click "Page through all matching work orders".
  - verify exact work-search mode shows `Hydralic Leak`.
  - click Back to search preview.
  - verify global search preview returns and no visible error appears.
- hosted resource smoke.

Rollback path:

- remove the new search-events module and script tag.
- restore the original `.workspace-search-input`, `[data-view-work-search]`, and `[data-close-work-search]` listener blocks inside `bindWorkspaceEvents()`.
- restore previous app cache tag.

Stop conditions:

- search input smoke fails.
- read reload sequencing becomes unclear.
- focus restoration cannot be preserved.
- exact search mode behavior changes.
- any mutation/form/delete/storage/auth code becomes necessary.

## Next Phase Recommendation

Proceed with only the proposed workspace-search event boundary if approved by the current LFES controls. Do not combine it with command routing, card openers, part filters, pagination, or message events in the same implementation phase.
