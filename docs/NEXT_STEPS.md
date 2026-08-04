# Next Steps

This file records public, non-proprietary priorities. Detailed LFES sequencing stays in private/local handoff notes.

## Highest Priority

1. Schedule the existing storage-object mirror and complete a stored-file restore drill. The database Restore to a New Project drill passed on 2026-06-11.
2. Continue moving new database changes into dated migrations and add remote schema-drift comparison when its operational complexity is justified.
3. Keep the five-role authenticated LFES fixture current and refresh role/security probes after membership or invite changes.
4. Keep live data hygiene tight: duplicate companies, stale invites, and missing default locations should be cleaned through exact-company-id paths.

## Product Direction

- Keep Team invite/join-link behavior manual-copy unless a deliberate email-provider decision is made.
- Continue Manager dashboard work only while it remains admin-gated until the dashboard is ready for broader manager release.
- Keep public request intake simple, monitored, and location-scoped.
- Prefer app features and production hardening over further `app.js` extraction unless ownership clarity improves.

## Engineering Direction

- Use targeted smoke tests for touched workflows.
- Add or update smoke coverage when a regression class recurs.
- Avoid committing internal LFES playbooks or detailed procedural methods to the public repo.
