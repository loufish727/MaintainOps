# MaintainOps Project Overview

MaintainOps is an original internal maintenance operations app for company maintenance teams. The app is built around real shop-floor use: a technician should be able to create a useful record quickly, update it from a phone, and keep moving.

## Current Product Shape

The core workflow is:

1. A user signs in with Supabase email/password auth.
2. The user selects a company and active location.
3. The user creates work through Quick Fix, full Work Order, PM generation, or request conversion.
4. Work orders can collect equipment, procedure checklist results, comments, photos, parts used, assignment, safety check acknowledgement, and completion data.
5. Managers can review work by location, team member, status, priority, overdue state, and search.

## Core Principle

Quick Fix is the primary workflow. It should stay fast enough that a technician can log an issue in under 10 seconds, while still creating a valid work order tied to `company_id`, `location_id`, and the current user.

## Current Name And Tagline

Name: `MaintainOps`

Current tagline: `Maintenance work, clearly tracked.`

Remove all references to MaintenanceX or Maintenance X. The app must remain original.

## App Entry Points

- Main app: `index.html`
- Main orchestration: `app.js`
- Extracted modules: `src/`
- Styling: `styles.css`
- Supabase config example: `supabase-config.example.js`
- Local Supabase config: `supabase-config.js`

## Current Local Testing

Use a cache-bust query when testing after changes:

`http://127.0.0.1:<port>/?qa_bust=<unique-token>`

The live app is hosted at:

`https://loufish727.github.io/MaintainOps/`

## Current Important UX Decisions

- Desktop uses a left navigation rail.
- Mobile uses larger tile-style navigation.
- Top company banner includes logo, active location, Quick Fix, and More.
- Location switching is visible in the top banner.
- Location switching is locked for regular technicians unless they enable `Mobile tech` in Team.
- Managers/admins can switch locations by default.
- Work order gauges are clickable filters.
- Completed work is not shown by default; it is accessed through filters/gauges and paged results.
- Parts are compact tiles that open into detail cards.
- Warning states should be visually strong. `Critical` and `Overdue` badges should be obvious.

## Current QA Data

The current hosted app has seeded company/location data used for development and smoke testing.

Example location set used during testing:

- Salem, OR
- Riverside, CA
- Spokane, WA
- Sacramento, CA
- Auburn, WA

Do not assume production-grade real personnel data yet; the project has QA data and stress-test records intentionally left in the database.
