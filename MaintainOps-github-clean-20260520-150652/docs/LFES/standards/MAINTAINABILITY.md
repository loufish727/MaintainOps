# LFES Maintainability Standard

Maintainability means a future engineer can change MaintainOps without rediscovering every dependency by accident.

## LFES-MNT-001: Reduce Responsibility Concentration Over Time

`app.js` currently owns auth, state, rendering, event binding, data access, workflow mutation, utilities, and QA-sensitive logic. This works today but is the main long-term maintainability risk.

Do not split it casually. Extract gradually with a plan, Debug Protocol checkpoints, and rollback paths.

## LFES-MNT-002: Prefer Understandable Code Over Trendy Architecture

New abstractions must reduce real complexity or match an established pattern. Avoid architecture that makes field-maintenance workflows harder to reason about.

## LFES-MNT-003: Move Repeated Logic Into Helpers

Repeated data access, formatting, permission, routing, and file handling logic should move into helpers or services when it reduces duplication and hidden coupling.

## LFES-MNT-004: Use Comments Sparingly

Add short comments only near important boundaries where future maintainers need to know why the code is shaped that way.

## LFES-MNT-005: Preserve Naming Consistency

Keep business language clear:

- UI says Equipment/Machine where useful.
- Database may still use `assets`.
- Work order status `open` may display as `New`.
- Legacy `member` maps to `technician`.

## Maintainability Evidence

Important architecture decisions should be written in `docs/LFES/context/ENGINEERING_DECISIONS.md` and current handoff docs when they affect future work.
