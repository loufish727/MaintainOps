# Current Handoff

Use this file first when starting a new chat.

## Current Goal

Pause feature expansion and preserve project memory so future work can start from docs instead of relying on one long chat thread.

## Current App State

The app is a working Supabase-backed MaintainOps prototype with:

- Auth
- Companies
- Locations
- Team roles
- Quick Fix
- Work Orders
- Equipment
- Parts
- PM
- Procedures
- Requests
- Messages
- Photos
- Comments
- History
- Mobile and desktop layouts
- Large-data stress test improvements

## Most Recent Change

Location switching was made intentional.

Implementation:

- Top banner has a location dropdown.
- Managers/admins can switch.
- Regular technicians cannot switch unless they enable `Mobile tech`.
- `Mobile tech` is set in Team under My Profile.
- Required SQL adds `profiles.mobile_tech`.

## Next Action

Run QA on the Mobile tech location lock flow.

See `docs/QA_LOG.md` and `docs/NEXT_STEPS.md`.

## Important User Preferences

- Always provide Supabase copy-paste SQL when Supabase changes are required.
- Do not overbuild location permissions.
- Keep location switching simple but intentional.
- Keep Quick Fix central.
- Prefer practical shop-floor use over accounting/billing depth.
- Mobile matters heavily, but do not break desktop.
- Completed work should not clutter default screens.
- Warnings should be visually obvious.

## Project Docs

Read these in order:

1. `docs/PROJECT_OVERVIEW.md`
2. `docs/ARCHITECTURE.md`
3. `docs/FEATURE_STATUS.md`
4. `docs/QA_LOG.md`
5. `docs/NEXT_STEPS.md`
6. `docs/SUPABASE_SETUP.md`
