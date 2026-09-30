# Request Photo Link Renewal

## Scope

Request photo links were signed for ten minutes when requests loaded. The Open
photo anchor reused that URL indefinitely, producing an InvalidJWT expiration
error after an idle session. Conversion does not cause this failure.

Open photo now signs the saved path on demand using the current authenticated
client. It reserves an isolated tab during the click for Safari compatibility.
Failed thumbnails get one automatic signing retry per rendered image. Requests
in flight are deduplicated; there is no polling, reload, or full workspace redraw.

Signing is cancelled at the presentation boundary when the user/company/facility,
record identity, photo path, or mounted card changes. Errors close the temporary
tab and leave an accessible retry message. No SQL, storage policy, expiry limit,
upload, conversion, or work-order completion behavior changes.

Copied storage URLs still expire. The renewal applies to controls inside the app,
not to old links pasted into email or bookmarks. Other attachment surfaces are
outside this fix.

## Evidence - September 30, 2026

- Request photo render assertions cover escaped fields, missing URLs, and the
  absence of an expiring href or obsolete SQL-setup warning.
- Eighteen browser cases cover desktop/mobile opening, keyboard activation,
  expiry recovery, bounded retries, errors/timeouts, blocked popups, scope/record
  changes, missing identity/path, deduplication, and preserved unsaved text.
- The signed-in QA test creates a disposable private photo, issues a one-second
  link, confirms Storage returns 400 after expiry, and then verifies the real app
  re-signs the thumbnail and opens the photo. The mounted card and database record
  remain unchanged. This passed in Chromium and WebKit.
- The first QA fixture attempt correctly failed RLS because its requester differed
  from the signed-in creator. The fixture was corrected; no policy was changed.
- The reported production request and storage metadata were checked read-only.
  All mutations and cleanup were confined to the allowlisted QA project.
- Private live evidence: `LFES/private/request-photo-proof-20260930/`.
- Initial compressed payload increased by 834 bytes. The aggregate limit rose
  from 176 to 177 KiB; all individual bundle limits remain unchanged.

Run focused tests with:

```sh
node tests/smoke/request-photo-display-smoke.js
npx playwright test tests/smoke/request-photo-expiry-browser.spec.js --workers=1
npx playwright test tests/smoke/request-photo-expiry-browser.spec.js --browser=webkit --workers=1
```

The live suite requires the existing isolated-QA environment and a local server
configured for that project. Never substitute production credentials or a
production base URL. Full automated LFES includes the render and browser tests;
signed-in proof runs separately.
