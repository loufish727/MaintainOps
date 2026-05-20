# Known LFES Risks

## High

- True technician-session QA remains incomplete for Mobile tech lock and assignment denied paths.
- `app.js` concentrates too many responsibilities and is difficult to review safely.
- Optional schema fallback paths can hide missing migrations if not tracked carefully.

## Medium

- Invite default location still needs real second-user acceptance QA.
- Public QR links require hosted URL validation before printed/field deployment.
- Mobile photo file picker behavior needs real desktop/mobile manual testing.
- GitHub Pages cache and upload packages can cause old app versions if packaging is not controlled.
- Live location routing depends on equipment/location assumptions that must stay visible.

## Low

- README is improving but still relies heavily on docs for current state.
- LFES itself is new and needs future refinement from real project lessons.

## Operational Continuity Risks

- Project knowledge can decay if new fixes are not logged.
- Supabase SQL editor usage can overwrite named queries unless fresh tabs or files are used.
- Broad cleanup SQL can remove more than QA records; app-path cleanup is preferred when feasible.
