# LFES Phase 13V - Part Inventory Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helpers are read-only inventory display/filter calculations, but a mistake could change low-stock filtering.

## Candidate

- `isLowStockPart`
- `lowStockParts`

## Safe Boundary

- Move only low-stock calculations.
- Keep part create/edit/use/restock/delete flows, Supabase writes, source management, document handling, and part detail rendering in `app.js`.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the new render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
