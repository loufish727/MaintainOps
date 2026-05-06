# MaintainOps Next Steps

This is the recommended restart point for the next session.

## Immediate Next Step

Finish QA for the Mobile tech location lock.

Test:

1. Manager account can switch locations.
2. Technician account cannot switch locations with Mobile tech off.
3. Technician can enable Mobile tech in Team.
4. Technician can then switch locations.
5. Quick Fix lands in the selected location.
6. Technician can turn Mobile tech off and location switch locks again.

## Then Build

After the Mobile tech flow passes, build invite default location.

Desired behavior:

1. Manager opens Team.
2. Manager invites a teammate.
3. Invite form includes Role and Default location.
4. New user signs up with invited email.
5. App accepts invite.
6. New member starts in the invite's default location.

Simple schema direction:

- Add `location_id` or `default_location_id` to `team_invites`.
- Add `default_location_id` to `company_members`.
- During invite acceptance, copy invite location to member default.
- During company load, if no active location is set, choose member default location first.

Do not add per-location permission restrictions unless explicitly requested.

## After That

Recommended QA work:

- Re-run role matrix: admin, manager, technician.
- Re-run location matrix: Salem, Riverside, Spokane.
- Re-run work creation matrix across Quick Fix, full work order, PM, and request conversion.
- Re-run procedure checklist matrix.
- Re-run comments/photos/parts/history matrix.

## Short-Term Improvements

- Keep polishing mobile layout based on actual phone screenshots.
- Improve large search result navigation with a "view all matching work orders" path.
- Add clearer empty states where a filtered location has no work.
- Make invite status clearer.
- Review app startup if memberships timeout again.

## Bigger Future Work

- Split `app.js` into modules.
- Add automated browser smoke tests.
- Add seed/test scripts for predictable QA data.
- Add formal deployment checklist.
- Add production hosting path and QR request routing.
- Add backup/export strategy.

## Current Stop Point

Last active development topic before handoff:

Location switching was made intentional with `profiles.mobile_tech`. User suggested the setting belongs in Team, not Settings. The UI was adjusted so Team profile owns Mobile tech, while manager/admin Company Settings stay separate.

Required SQL for that change:

```sql
alter table public.profiles
add column if not exists mobile_tech boolean not null default false;

notify pgrst, 'reload schema';
```
