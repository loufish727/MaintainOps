# LFES Phase 15L Setup Status Display Readiness

Date: 2026-05-20

## Classification

MEDIUM RISK.

Risk: the setup status list is read-only but broad, and an incorrect helper could misreport operational readiness.

## Approved Scope

Move only `setupItems` from `app.js` into `src/render/setupStatusDisplay.js`.

## Required Injection

- Supabase URL/key accessors
- active company accessor
- readiness flag accessors for requests, public request links, schedules, procedures, parts, app issue reports, messages, outcomes, safety checks, admin delete SQL, and photos

## Explicit Non-Scope

Do not move:

- setup rendering
- setup button/event behavior
- Supabase config loading
- SQL/readiness mutation paths
- public request flow
- delete behavior
- `renderWorkspace()`
- `bindWorkspaceEvents()`

## Verification Plan

- `node --check app.js`
- `node --check src/render/setupStatusDisplay.js`
- direct helper-output smoke for ready/blocked status items and admin delete action metadata
- local resource smoke for `index.html`, `app.js`, and `src/render/setupStatusDisplay.js`
- no package/upload unless local checks pass
- hosted resource checks and signed-in live smoke after package/upload
