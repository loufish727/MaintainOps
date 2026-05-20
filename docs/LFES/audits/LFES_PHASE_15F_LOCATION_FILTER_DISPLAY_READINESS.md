# LFES Phase 15F Location Filter Display Readiness

Date: 2026-05-20

## Classification

MEDIUM RISK.

Risk: active-location filtering is read-only but broad, and incorrect behavior would show or hide records across locations.

## Approved Scope

Move only these helpers from `app.js` into `src/render/locationFilterDisplay.js`:

- `recordLocationId`
- `matchesActiveLocation`

## Required Injection

- `getLocationsReady`
- `getActiveLocationId`

## Explicit Non-Scope

Do not move:

- `activeLocationDatabaseId`
- `locationIdForAsset`
- `assetLocationMismatch`
- `assetLocationRoutingMessage`
- `confirmAssetLocationRouting`
- `updateAssetLocationWarning`
- location switching
- mutation payload logic
- event handlers
- `renderWorkspace()`
- `bindWorkspaceEvents()`

## Verification Plan

- `node --check app.js`
- `node --check src/render/locationFilterDisplay.js`
- direct helper-output smoke for ready/unready location filtering and nested asset location fallback
- local resource smoke for `index.html`, `app.js`, and `src/render/locationFilterDisplay.js`
- no package/upload unless local checks pass
- hosted resource checks and signed-in live smoke after package/upload
