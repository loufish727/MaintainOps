# Request Email Links

Local release candidate, 2026-10-02. Frontend and email function publication are
separate release steps; no database migration or recipient changes are needed.

## Behavior

- Request notification email links use `?request_id=<request UUID>`. Existing
  emails with this format also work once the frontend is published.
- Signed-out recipients log in first, then land on the specific request. This
  is not a public request viewer and grants no access by itself.
- The signed-in client resolves the record under existing RLS and company
  membership. Managers/admins and mobile-enabled users can open another
  facility; other users stay within their current/default facility.
- The workspace header reflects the destination company and facility. Only the
  requested card is shown, regardless of its age, status or queue page.
- Converted requests offer Open Work Order, using the existing detail loader.
  Back to Requests returns to the paged list. Navigation away clears the link;
  landing scrolls to the request once. Background rendering does not reopen it
  or force scrolling afterward.
- Missing or inaccessible records display an unavailable message. Malformed
  links and network failures are handled without exposing record content.
- Ordinary startup and public-intake QR links add no request-lookup calls.
- The email CTA is Open request in both HTML and plain text, for both existing
  sender providers. No Google Apps Script deployment change is required.

## Verification

- `node tests/smoke/request-email-link-smoke.js`: routing, no-session/no-link
  calls, permissions, stale response rejection, target queries, schema fallback
  and execution of the actual email template without sending mail.
- `node tests/smoke/request-display-smoke.js`: converted work-order link and
  unchanged accounting read-only controls.
- `tests/smoke/request-email-link-live.spec.js`: isolated QA real sign-in,
  older-than-page-one request, conversion, work-order navigation, Back,
  facility selection, denial, accounting and mobile layout. Run in Chromium
  and WebKit with the guarded app-wide QA credentials and local QA backend.
- Run the standard Release Gate / Full Strict checks before publication.

The live spec creates only disposable isolated-test-platform fixtures, with
delivery suppressed. Production emails are not replayed or sent by these tests.
