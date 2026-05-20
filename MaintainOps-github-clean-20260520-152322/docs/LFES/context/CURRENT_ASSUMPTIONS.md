# Current Assumptions

These assumptions must be revisited as MaintainOps evolves.

## Product Assumptions

- Quick Fix remains the core field workflow.
- Completed work does not show by default unless explicitly filtered.
- Work queues are location-scoped by default.
- Large lists stay paged at 12.
- Warning states such as Critical, Overdue, and safety checks must be obvious.

## Security Assumptions

- RLS is enabled on shared tables.
- `private.is_company_member(company_id)` is the critical tenant isolation helper.
- Public QR request flow uses scoped RPCs.
- Frontend never contains service-role secrets.

## Operational Assumptions

- GitHub Pages remains the current mobile/live testing deployment path.
- Supabase is the operational backend.
- Location switching should be simple and intentional.
- App cleanup should go through the app where possible so delete functions are tested.

## Verification Assumptions

- Static checks are necessary but not sufficient.
- Manager-session QA does not prove restricted technician behavior.
- Public QR success requires both anonymous submission and manager-side visibility under the exact QR location.
- Mobile file picker/photo behavior needs real device testing.

## Architecture Assumptions

- `app.js` is allowed to remain monolithic until modularization can be performed safely.
- Future modularization should preserve behavior first and architecture purity second.
