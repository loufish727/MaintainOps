# Engineering Process

MaintainOps is developed with a conservative change process because it is an operational app with authentication, tenant isolation, role-based workflows, and mutation-heavy maintenance records.

Publicly visible process principles:

- Keep changes scoped.
- Verify behavior before deployment.
- Use targeted smoke tests for touched workflows.
- Treat auth, RLS, storage, public intake, deletes, and workflow mutations as higher-risk areas.
- Prefer incremental modularization over broad rewrites.
- Preserve production behavior while reducing `app.js` authority over time.
- Document public-facing maturity honestly.
- Leave a brief trace for meaningful UI/workflow changes: what changed, why, what was verified, and any intentional limitation.

CSS and UI changes also need a small visual safety check:

- Preserve readable contrast for all changed text, values, controls, and state labels.
- Preserve the active theme surface system; do not spread hardcoded light or dark backgrounds across a page unless the component is intentionally isolated.
- Check default, open/active, selected, disabled, warning, error, and empty states when touched.
- Verify both desktop and mobile layouts for changed cards, tables, panels, and forms.
- Treat hidden content, accidental overflow, clipped values, unreadable result fields, or theme-breaking background drift as a failed smoke.
- Prefer a targeted browser or computed-style check when a change depends on color, layout, or responsive behavior.

Event and navigation changes need path-owned verification:

- Wire behavior hooks into the event module that owns the actual user path, not an adjacent command or similar-looking control.
- If a change depends on post-render focus, scroll position, section changes, or selected-record landing position, add a targeted smoke that opens the record through the same selector a user clicks.
- Resource-load checks do not prove interaction placement, scroll anchoring, or post-render landing behavior.

Operational selectors must not inherit display filters:

- Board, card, search, status, type, area, and pagination filters are display concerns.
- Work order, Quick Fix, request, PM, and edit forms that attach equipment or parts must source selector options from the authoritative active-location data set unless the workflow explicitly requires a narrower list.
- When a display filter changes around equipment, parts, procedures, or people, add a targeted smoke proving related operational selectors still include valid attachable records and submit the selected id into the mutation payload.

Browser smoke fallback:

- The in-app browser is useful but not required for release verification.
- If in-app browser control is unavailable, use CLI Playwright smokes for the touched browser interaction before deploy.
- For equipment attachment regressions, run `npm run test:smoke:work-attach`; this combines selector-source, mutation-payload, and browser DOM checks.

Strict LFES command:

- Before pushing meaningful app, security, storage, role, or workflow changes, run `npm run test:lfes:strict`.
- The strict command runs security static checks, security boundary probes, the broad Node smoke sweep, work-attachment smokes, targeted browser regression smokes, and local resource-load verification against a local static server.
- After pushing, run `npm run test:lfes:hosted` to verify hosted GitHub Pages resources and the latest GitHub Actions resource-load smoke.
- A targeted smoke may still be required for a touched path that is not covered by the strict command.

Unsaved form input must survive background system events:

- Background auth/session events, cache refreshes, read-only reloads, and polling-style updates must not rebuild active create/edit forms unless the user explicitly navigated, submitted, or signed out.
- Same-user token refresh should update session state without calling the full workspace render.
- If a touched path can re-render while a user is typing in a work order, Quick Fix, request, PM, procedure, equipment, message, or part form, add a targeted smoke or policy check proving active input will not be wiped.

Workspace data loads must fail by area, not as one opaque block:

- Do not put many Supabase startup reads behind one unnamed timeout.
- Each workspace startup read should have a named timeout or isolated fallback so one slow optional area does not block the whole app.
- A startup warning should name the slow area whenever possible.

Related record panels must not depend on the current board slice:

- Equipment detail sections for open work, completed history, linked parts, and parts-used history should be collapsed by default when the related data can grow.
- Expanding a related section should load the needed relationship data for that equipment instead of assuming the current paged work-order queue contains the complete history.
- Related lists should follow the same 12-item paging pattern used elsewhere in the app when the result set can grow.

Internal operating details, phase logs, and procedural playbooks are intentionally kept outside the public repository.
