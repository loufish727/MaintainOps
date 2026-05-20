# LFES Phase 12P Part Setup Message Display Readiness

Date: 2026-05-20

## Candidate

Move only the part setup warning text helper:

- `partSetupMessage`

## Why This Is Safe

This helper formats read-only setup warning text from existing readiness flags. It does not create parts, save part costs, edit source names, move inventory, upload documents, delete parts, call Supabase, or change schema readiness handling.

## Dependencies To Inject

- `getPartCostsReady`
- `getPartSuppliersReady`

## Must Not Move

Do not move part create/edit behavior, source rename behavior, Use/Restock behavior, document upload behavior, delete guards, schema error handling, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
