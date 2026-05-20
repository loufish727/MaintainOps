# LFES Security Standard

Security in MaintainOps is centered on authentication, authorization, tenant isolation, scoped public intake, and avoiding secret exposure.

## LFES-SEC-001: Company Isolation Is A Critical Boundary

MaintainOps is multi-tenant. Company data must not cross between companies. The database helper `private.is_company_member(company_id)` is a critical security boundary and must not be weakened for convenience.

Relevant areas:

- Work orders.
- Assets/equipment.
- Parts.
- Locations.
- Requests.
- PM schedules.
- Procedures.
- Comments, photos, history, and messages.

## LFES-SEC-002: Authorization Must Not Rely On UI Only

Buttons may be hidden for technicians or non-admins, but that is not the security boundary. Sensitive mutations must be enforced by RLS, RPC validation, triggers, or database-side checks.

Examples:

- Team role changes.
- Invite creation and cancellation.
- Work assignment guardrails.
- Public request link management.
- Delete paths.

## LFES-SEC-003: No Frontend Service Role Key

The frontend must never include a Supabase service-role key. `supabase-config.js` may include the anon key used by the browser client, but secrets that bypass RLS belong outside the public app.

## LFES-SEC-004: Public Request Intake Must Be Scoped

Anonymous QR request flows should use scoped RPCs and tokens, not direct anonymous table access. The token should resolve only to the intended company/location request intake.

## LFES-SEC-005: Sensitive Errors Should Be Useful But Not Leaky

Errors should help the user recover without exposing sensitive implementation details, tokens, credentials, or cross-company record existence.

## Security Traceability Requirements

For security-sensitive changes, record:

- Boundary being changed.
- Tables/RPCs/policies involved.
- Who is allowed.
- Who is denied.
- Verification evidence.
- Remaining unproven role/session tests.

## Security Concepts Used

LFES borrows the principle of least privilege, defense in depth, and explicit trust boundaries because they directly map to MaintainOps' tenant isolation and public intake risks. This does not claim compliance with any external framework.
