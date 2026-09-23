# Automatic Attachments Verification

Verified 2026-09-23 against executable commit
`dd790795917f687e94d33b5454450fb74e19d6dd` on
`codex/automatic-attachments-20260923`. Local preview and isolated QA only.
Nothing in this packet has been pushed or applied to production.

## Results

| Verification | Result |
| --- | --- |
| Full Strict LFES, clean worktree | PASS, 13/13 stages |
| Authenticated LFES | PASS, 7/7 stages, five roles |
| Chromium attachment/media scenarios | PASS, 5/5 |
| WebKit attachment/media scenarios | PASS, 5/5 |
| ZIP generated-fixture groups | PASS, 26 with native compression streams and with streams disabled |
| Workflow recovery regressions | PASS, 32 |
| Isolated document schema, RLS, storage policies, history | PASS |
| Dependency audit | 0 vulnerabilities |

Browser scenarios cover desktop and mobile-width mixed ZIP review, photo
optimization, document retention, retry without duplication, 12-item paging,
download, deletion/history, accounting denial, Equipment/Part classification,
new work orders, Quick Fix, and existing public-request photo uploads.

The authenticated run completed at 17:59:01 UTC. Startup used 30-35 measured
data requests per role, within the unchanged 35-request budget. The attachment
feature was absent from startup bundles. Initial JS/CSS gzip is 176,420 bytes
against the unchanged 179,200-byte cap; the attachment feature is lazy-loaded.

Strict evidence is archived locally at
`LFES/private/proof/1790185169265/lfes-strict-summary.json`.
Authenticated evidence is archived at
`LFES/private/proof/1790186341536/lfes-authenticated-summary.json`.
Per-run browser fixtures and cleanup records are in ignored
`LFES/private/appwide-fixtures/`.

## Data and Release Boundaries

All 33 attachment/media test companies were removed after their storage
objects were verified absent. The final authenticated denial-test request
was also removed. Existing business companies and production files were not
modified. QA security-advisor counts are unchanged from the pre-change
baseline; this does not mean that baseline has no warnings.

Production release still requires the consolidated migration documented in
`APPLIED_MIGRATIONS.md` before publishing the frontend. GitHub CI and hosted
production verification have not run for this unpushed branch.

## Limits of Proof

These finite checks do not prove every possible file or device. Physical
phone/camera and HEIC decoding are not covered by desktop browser engines.
ZIP validation is not malware scanning. Pending file payloads do not survive
a reload; ambiguous network outcomes retain files conservatively. PostgreSQL
and object storage do not share a transaction. See `AUTOMATIC_ATTACHMENTS.md`
for supported types, bounded extraction, and recovery behavior.
