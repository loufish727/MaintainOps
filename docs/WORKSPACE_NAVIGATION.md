# Workspace Navigation

The workspace menu has six top-level choices. Requests and Parts open directly;
Work, Equipment, Team and Settings expand without navigating.

| Group | Destinations (subject to existing permissions) |
| --- | --- |
| Work | My Work, Work Orders, Planning |
| Requests | Requests |
| Equipment | Equipment, PM, Procedure Checklist, Financial |
| Parts | Parts |
| Team | Team, Messages, Conversions, Manager |
| Settings | Settings, Admin Setup, App Performance |

`visibleNavItems()` remains the permission authority. The renderer receives only
authorized destinations. A technician's Settings group therefore contains App
Performance, not the restricted Settings or Admin Setup pages. Financial and
Manager retain their existing role contracts. Nothing changes in database access.

## Behavior

- One group can be open at a time; all groups can be collapsed.
- The active destination has `aria-current="page"`; its parent stays highlighted.
- Navigating to a different section opens its group, including from shortcuts.
- Ordinary rerenders preserve the chosen disclosure state. A user/company change
  resets it to the current page's group. Nothing is stored as a cross-user preference.
- Disclosure uses native keyboard-accessible details/summary controls. It never
  rerenders the workspace, fetches data, resets a form, or calls scroll helpers.
  Opening and closing groups is synchronous; queued native toggle events cannot
  leave a previous group open long enough to hide the user's next choice.
- Team shows the same unread conversation/work-alert count as Messages while closed.
  Live badge updates reach both. No overlapping work counts are added together.
- Group headings and child destinations have a minimum 48px touch target. At phone
  widths, expanded groups occupy a full row and their children use two columns
  (one below 360px). Tablet navigation uses three columns instead of squeezing
  six headings into a horizontal strip. Children keep their section colors.
- Group headings use faceted, textured metal faces, illuminated icon housings and
  recessed plus/minus controls. Child destinations remain connected rows. The
  surface treatment never clips the actual hit area or focus outline. Plus/minus
  transitions respect reduced motion and never animate layout height.

## Ownership And Verification

`src/render/workspaceNavigationDisplay.js` owns presentation and disclosure state;
`workspaceSectionNavigationEvents.js` still owns destination actions. The new module
is in the existing runtime bundle, with no new dependency or script request.

Compared with the section-color baseline, grouped navigation and visual polish add
8,991 decoded / 2,112 gzip bytes across runtime, app shell and shared CSS. The total
JS/CSS startup budget remains 780 KiB decoded / 175 KiB gzip; actual startup is
759,324 / 177,492 bytes. The CSS allowance is 195 KiB decoded / 35 KiB gzip.
The shared material is a separate 4,904-byte WebP, bounded below 6 KiB in browser
tests. It is referenced only by visible top-level navigation, with a plain dark
fallback if unavailable. Text, icons, focus outlines and hit areas are real UI,
not baked into the image. No new dependency or rendering engine is introduced.

Node and browser navigation tests cover permissions-filtered destinations, active
state, escaping, nine viewport widths, keyboard, touch, draft preservation, and
zero requests on disclosure. They run in the existing LFES checks. Live tests use
`tests/helpers/workspace-navigation.js` to expand groups through real UI clicks,
never forced clicks on hidden destinations. Signed-in regression evidence must
identify the tested backend and roles; no local test is a production-release claim.
