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

Internal operating details, phase logs, and procedural playbooks are intentionally kept outside the public repository.
