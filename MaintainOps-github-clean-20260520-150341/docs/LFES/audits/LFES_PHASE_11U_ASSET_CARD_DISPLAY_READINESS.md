# LFES Phase 11U Asset Card Display Readiness

Date: 2026-05-20

## Candidate

Move only the equipment list card display helper:

- `renderAssetCard`

## Why This Is Safe

This helper renders one equipment card from already-loaded asset and work-order state. It does not open equipment details, bind card clicks, save equipment, create Quick Fix work, mutate hierarchy, delete equipment, call Supabase, or change pagination/search behavior.

## Dependencies To Inject

- `escapeHtml`
- `assetTypeLabel`
- `getWorkOrders`
- `getActiveAssetId`
- `parentAssetFor`
- `childAssetsFor`

## Must Not Move

Do not move equipment detail rendering, equipment create/edit forms, Quick Fix actions, hierarchy mutation logic, delete guards, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
