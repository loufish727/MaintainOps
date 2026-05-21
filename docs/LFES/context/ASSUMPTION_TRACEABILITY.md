# Assumption Traceability

Assumptions become risky when they stop being visible. LFES requires important assumptions to be documented and reevaluated during system evolution.

## Assumption Types

- Original assumptions: why a feature or boundary was created.
- Operational assumptions: how users are expected to work.
- Verification assumptions: what tests actually prove.
- Environmental assumptions: browser, mobile, GitHub Pages, Supabase, network, storage.
- Deployment assumptions: package contents, cache tags, public URLs.
- Scaling assumptions: expected row counts, paging limits, search behavior.

## MaintainOps Examples

- Location switching is simple but intentional.
- Equipment location can route work when confirmed.
- Public QR links allow outsiders to submit requests only through scoped tokens.
- Work queues are one active location at a time.
- Completed work is hidden by default.
- Manager-session QA does not prove technician restrictions.
- Mobile photo upload needs real device testing.

## Reevaluation Triggers

Reevaluate assumptions when:

- A workflow gains a new entry point.
- A role/RLS rule changes.
- A public or anonymous path changes.
- A list grows beyond current tested scale.
- A deployment target changes.
- Mobile/app store preparation begins.
- `app.js` code is extracted into modules.

## Documentation Locations

- Current state: `docs/CURRENT_HANDOFF.md`
- Near-term plan: `docs/NEXT_STEPS.md`
- System model: `docs/ARCHITECTURE.md`
- QA evidence: `docs/QA_LOG.md`
- LFES assumptions: this file and `CURRENT_ASSUMPTIONS.md`
