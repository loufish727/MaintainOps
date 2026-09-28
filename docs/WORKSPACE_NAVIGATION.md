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
  (one below 360px). Children keep their individual section colors.

## Ownership And Verification

`src/render/workspaceNavigationDisplay.js` owns presentation and disclosure state;
`workspaceSectionNavigationEvents.js` still owns destination actions. The new module
is in the existing runtime bundle, with no new dependency or network request.

Compared with the section-color baseline, grouped navigation adds 4,034 decoded /
1,049 gzip bytes across runtime, app shell and shared CSS. The total startup budget
remains 780 KiB decoded / 175 KiB gzip. CSS alone adds 1,849 / 318 bytes; its component
allowance is raised by 2 KiB decoded / 512 gzip bytes to accommodate this feature.

Node and browser navigation tests cover permissions-filtered destinations, active
state, escaping, five viewport widths, keyboard, touch, draft preservation, and
zero requests on disclosure. They run in the existing LFES checks. Live tests use
`tests/helpers/workspace-navigation.js` to expand groups through real UI clicks,
never forced clicks on hidden destinations. Signed-in regression evidence must
identify the tested backend and roles; no local test is a production-release claim.
