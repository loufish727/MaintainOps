# Automatic Attachments

Candidate date: 2026-09-23. Local frontend and isolated QA only; not released.

## Behavior

- Work-order detail, new work orders, Quick Fix, Equipment, and Parts use one multiple-file picker. Equipment/Part uploads no longer require a document-type selection.
- ZIPs unpack locally into a review list. JPEG, PNG, WebP, GIF, HEIC/HEIF, PDF, Word, Excel, CSV, and text are recognized. Image conversion depends on browser decoding support; the existing bounded original-image fallback is retained when decoding fails.
- Photos use the existing optimization: work-order photos up to 768px with a target near 256 KB; Equipment/Part images target near 1 MB. Documents retain their bytes. Existing stored files are not resized or reclassified.
- A new work order is saved before attachment review. Cancelling that review does not cancel the saved work order.
- Corrupt/encrypted ZIPs may offer an explicit original-archive attachment when bounded inspection permits it. Unsafe archives are not silently accepted. Unsupported/nested files are reported and omissions require acknowledgment.
- Documents and ZIP inputs have a 25 MiB limit; photos have a 100 MiB input processing bound. A batch allows 50 resulting files/fallback choices, 200 ZIP directory entries, and 100 MiB expanded ZIP data. Nested ZIPs are not unpacked.
- Request intake remains photo-only. Messaging attachments and company logos are unchanged.

## Ownership and Recovery

`attachmentFiles.mjs` owns recognition and bounded ZIP parsing. `attachmentWorkflow.mjs` owns review, upload reconciliation, document paging, download, and cleanup. These and the existing media workflow load only when needed through `attachmentFeature`; no document query is added to startup.

Stable IDs and paths prevent retries from duplicating successful attachments. In-flight requests must settle before retry or cleanup. Work-order document upload/delete history is transactional. Photo-history failures are reported separately from attachment success.

Unfinished reviews can survive navigation within the current page, but file payloads are not persisted across a reload. Unknown server outcomes preserve files rather than assuming failure. A confirmed work-order deletion precedes storage cleanup; cleanup failures produce a warning and require storage reconciliation. There is no cross-service transaction between PostgreSQL and object storage.

## Security and Release

Apply `supabase/migrations/20260923170451_automatic_work_order_attachments.sql` before the frontend. Work-order documents have private storage, company/role policies, uploader ownership, safe paths, immutable content, and size/MIME binding to the stored object's metadata. Accounting is view-only. Actual object bytes feed storage usage totals. Existing financial-retention and photo policies are unchanged.

ZIP validation checks paths, symlinks, local/central directory agreement, overlapping data, CRC, declared/actual sizes, entry counts, and bounded extraction. This is not malware scanning; opaque encrypted originals are explicitly unverified. The byte bound is not a total browser-memory bound. Real-device camera/HEIC verification remains separate from browser automation.

## Verification

Local commands are included in the broad Strict LFES Node sweep:

```text
node tests/smoke/attachment-files-smoke.js
node tests/smoke/attachment-workflow-smoke.js
node tests/smoke/work-order-documents-sql-smoke.js
node tests/smoke/work-order-delete-attachments-smoke.js
npm run test:lfes:strict
```

Isolated signed-in proof: `appwide-attachments-live.spec.js` and `appwide-media-live.spec.js`, Chromium and WebKit, with the existing QA credential loader and explicit `LFES_APPWIDE_MUTATIONS=1`. These tests reject production endpoints, use per-run QA companies, suppress email delivery, and record fixture/storage cleanup manifests. They cover mixed ZIP extraction, 768px photo output, one-shot failure/retry, 12-item document paging, downloads, history, accounting denial, deletion, automatic Equipment/Part classification, and initial create/Quick Fix attachments. Authenticated LFES separately checks startup and all configured role contracts. Results reside in ignored `lfes-evidence` and private QA manifests, not in this specification.
