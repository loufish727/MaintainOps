# Future AI/Codex Integration

LFES should make future AI-assisted MaintainOps work safer and more context-aware.

## What LFES Preserves For AI

- Engineering intent.
- Architecture rationale.
- Dependency visibility.
- Operational assumptions.
- Security and tenant boundaries.
- Safe evolution paths.
- Verification boundaries.
- Known risks and unproven tests.

## How AI Should Use LFES

Before changing code, AI-assisted work should read:

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/ARCHITECTURE.md`
- `docs/QA_LOG.md`
- `docs/DEBUG_PROCESS.md`
- `docs/LFES/OVERVIEW.md`
- The relevant LFES standard or audit file.

## AI Failure Modes LFES Reduces

- Assuming a manager-session test proves technician restrictions.
- Refactoring `app.js` without knowing hidden workflow dependencies.
- Treating public QR as normal unauthenticated table access.
- Weakening RLS for convenience.
- Dropping schema fallback behavior without noting migration state.
- Changing location routing without preserving operational reasoning.
- Producing large documentation that is not tied to real MaintainOps risks.

## Safe AI Evolution Pattern

1. Read docs.
2. Identify boundary and risk level.
3. Make the smallest useful change.
4. Preserve behavior unless explicitly changing it.
5. Run static checks.
6. Run Debug Protocol for changed and adjacent paths.
7. Update QA and LFES docs when assumptions or risks change.
