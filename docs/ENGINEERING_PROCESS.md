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

LFES verification tiers:

- Every executable pull request must pass `npm run test:release:gate`. This fast required check recursively inspects SQL, fail-closes on unreviewed first-party `innerHTML` assignment sites, probes live anonymous boundaries, compiles the baseline and dated migrations in isolated PostgreSQL, verifies seeded RLS role boundaries, checks generated bundles are committed, runs the broad Node smoke sweep and targeted browser regressions, and verifies local resources.
- Run `npm run test:lfes:strict` before major releases or new work cycles and after security, database, authentication, permissions, storage, or Performance/3D changes. It adds the serial desktop/mobile Performance interaction to all Release Gate coverage.
- Machine-readable evidence is written to `lfes-evidence/` and retained by GitHub for 30 days.
- The manual `Full Strict LFES` workflow runs the full local proof and then the protected authenticated testing-platform proof. `Authenticated LFES Proof` can also be dispatched independently. Both authenticated paths fail when any required QA credential or fixture is absent. The authenticated proof runs all four roles in Chromium, an admin path in WebKit, and enforces a 35-request initial workspace budget with exactly-once core-loader assertions.
- After pushing, run `npm run test:lfes:hosted` to verify hosted GitHub Pages resources and the latest GitHub Actions resource-load smoke.
- The scheduled `Performance Monitor` workflow adds a separate read-only synthetic check for deployed response time, payload size, and resource availability. It supports release evidence but does not replace authenticated testing, browser telemetry, or an uptime service.
- `npm run release:verify` now sequences hashed bundle generation, strict LFES, and hosted LFES in one command. Set `MAINTAINOPS_RELEASE_SKIP_HOSTED=1` when you need the local portion before push.
- A targeted smoke may still be required for a touched path that is not covered by the strict command.
- See `docs/LFES/PROOF_MODEL.md` for the boundary between the required Release Gate, Full Strict LFES, authenticated testing-platform proof, and the human LFES Gold audit.

Unsaved form input must survive background system events:

- Background auth/session events, cache refreshes, read-only reloads, and polling-style updates must not rebuild active create/edit forms unless the user explicitly navigated, submitted, or signed out.
- Same-user token refresh should update session state without calling the full workspace render.
- Do not render an editable login form before the initial Supabase session lookup settles; a later startup render can erase credentials already being typed on slower browsers.
- If a touched path can re-render while a user is typing in a work order, Quick Fix, request, PM, procedure, equipment, message, or part form, add a targeted smoke or policy check proving active input will not be wiped.

Workspace data loads must fail by area, not as one opaque block:

- Do not put many Supabase startup reads behind one unnamed timeout.
- Each workspace startup read should have a named timeout or isolated fallback so one slow optional area does not block the whole app.
- A startup warning should name the slow area whenever possible.
- Same-session auth events must share one in-flight workspace bootstrap.
- New dashboard totals should use a scoped aggregate query/RPC instead of adding one count request per card.
- Changes to startup loading must keep the authenticated request-budget evidence green or deliberately revise the budget with measured justification.

Related record panels must not depend on the current board slice:

- Equipment detail sections for open work, completed history, linked parts, and parts-used history should be collapsed by default when the related data can grow.
- Expanding a related section should load the needed relationship data for that equipment instead of assuming the current paged work-order queue contains the complete history.
- Related lists should follow the same 12-item paging pattern used elsewhere in the app when the result set can grow.

Internal operating details, phase logs, and procedural playbooks are intentionally kept outside the public repository.
