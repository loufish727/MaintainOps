# Debug Process

This public file documents safe debugging principles without exposing the full internal LFES playbook.

## Standard Debug Shape

1. Reproduce or observe the reported behavior.
2. Identify the smallest likely owning module.
3. Check whether the issue is UI, workflow, data, auth, storage, RLS, or deployment/cache.
4. Make the narrowest fix that addresses the observed failure.
5. Run syntax checks and targeted smoke tests.
6. Deploy only after local verification passes.
7. Verify hosted resources and, when relevant, live behavior.
8. Document any new regression class as a rule or catch in the private handoff.

## Recurring Catch Classes

- Role-gated controls need manager/admin-session smoke.
- UI placement and scroll/focus behavior need browser or Playwright checks.
- Resource-load smokes do not prove interaction behavior.
- Cache tags must move with changed script files.
- Successful async groups must not be treated as warning objects.
- Display filters must not shrink operational selector option sets.
- Related equipment history should load by relationship, not by current board slice.

## Hard Stop

Use `ACTION NEEDED` when the rollback path, live data target, credential context, or expected security behavior is unclear.
