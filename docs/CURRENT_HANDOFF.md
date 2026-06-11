# Current Handoff

This public repo file is a privacy-safe pointer, not the full internal LFES handoff.

MaintainOps uses local/private handoff files for detailed continuity, catch logs, phase history, credentials context, live-beta notes, and LFES operating detail. Those files are intentionally not committed to the public repository.

## Current Public State

- Live beta is active with real users.
- Public request email notifications use the request-emailer path only.
- Team invites and join links do not send email automatically.
- The Team screen supports single-use join links after `supabase/step-next-invite-links.sql` is applied.
- `app.js` is an intentional shell/coordinator, not an extraction target by line count alone.

## Before Work Starts

1. Read `docs/FEATURE_STATUS.md`.
2. Read `docs/APP_JS_AUTHORITY_MAP.md`.
3. Read `docs/ENGINEERING_PROCESS.md`.
4. Check `git status --short`.
5. If a private/local handoff is available, treat it as the detailed source of truth for active LFES continuity.

## Hard Stop Language

If direction, credentials, live data, database state, deployment verification, or rollback path is unclear, stop and report `ACTION NEEDED`.
