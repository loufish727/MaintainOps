# Public Request Intake Hardening

This document tracks the production-readiness posture for public QR/link request intake.

## Current Model

- Public QR/link users do not get app access.
- Anonymous access is limited to scoped RPC paths.
- Direct anonymous table access is not part of the intended model.
- Each public request link is company/location scoped.
- Admin/manager users create, disable, reactivate, or regenerate request links from Settings.
- Request photos use the `maintenance-request-photos` storage bucket and the approved public attachment path.

## Current Verified Security Posture

- RLS is enabled across app-used tables.
- Anonymous direct table reads are denied.
- Anonymous RPC execute is restricted to approved public QR/photo paths.
- Public request-link role denial was verified against a QA Facility location.
- Storage buckets are private with explicit policies.

See:

- `docs/LFES/audits/RLS_LIVE_CHECKPOINT_2026-05-27.md`
- `docs/SUPABASE_SETUP.md`

## Current App Boundary

- `app.js` still owns public request-link creation, disable, reactivate, regenerate, token generation, RPC updates, and public intake submit.
- `src/utils/workspacePublicRequestLinkCopyEvents.js` owns copy-button binding only.
- `src/utils/workspacePublicRequestLinkAdminEvents.js` owns admin button binding only.
- Public intake submit must remain behind scoped RPC behavior.

## Production Hardening Checklist

Before broad external rollout:

1. Confirm public request links use only HTTPS public app URLs.
2. Confirm localhost, file paths, and private network URLs are rejected for posted QR links.
3. Confirm disabled links stop accepting requests.
4. Confirm regenerated links invalidate old printed/shared QR codes.
5. Confirm invalid/expired tokens show a clear nonblank error page.
6. Confirm anonymous users cannot read app tables directly.
7. Confirm anonymous users can only execute approved public intake/photo RPCs.
8. Confirm request photo upload cannot write outside the intended bucket/path policy.
9. Confirm manager/admin users can moderate or remove inappropriate submitted requests.
10. Define abuse/rate-limit posture before public posting at scale.
11. Define support path for posted QR code replacement.
12. Decide whether public intake should use a custom domain before real external signage.

## Recommended Smokes

- Public link opens without authentication.
- Public request submit creates a request under the expected company/location.
- Manager/admin can see the submitted request in the expected location.
- Disabled link rejects intake.
- Regenerated old token rejects intake and new token accepts intake.
- Invalid token shows a stable error state.

## Current Gaps

- Abuse/rate-limit posture is not yet fully documented.
- Custom-domain routing is not finalized.
- Public-facing support/replacement process for posted QR signs is not finalized.
- Broader automated e2e coverage for disabled/regenerated/invalid public links is still needed.
