# MaintainOps System Overview For LFES

MaintainOps is a vanilla HTML/CSS/JavaScript maintenance operations app backed by Supabase. It is currently deployed/tested through GitHub Pages and local file/HTTP URLs.

## Core Domains

- Companies and company members.
- Locations.
- Work orders.
- Assets/equipment.
- Parts and part documents.
- Preventive maintenance schedules.
- Procedure templates and steps.
- Maintenance requests from internal users and public QR links.
- Comments.
- Photos.
- Work order events/history.
- Messages.
- App issue reports.

## Current Architecture

- `index.html`: loads dependencies and cache-busted app files.
- `app.js`: owns most app behavior.
- `styles.css`: desktop/mobile styling.
- `supabase-config.js`: browser Supabase config.
- `supabase/*.sql`: schema and migration/RLS/RPC history.
- `docs/*`: handoff, QA, debug, feature process, architecture, GitHub process.

## Critical Boundaries

- Supabase auth/session controls workspace access.
- RLS controls shared table access.
- `private.is_company_member(company_id)` is a critical tenant boundary.
- Public QR request access is scoped through tokens and RPCs.
- Location switching is intentional and role/profile-gated.
- Delete paths preserve traceability through linked-count blockers.

## Current Stage

The app is functional and live-tested. It is past core feature-building and is now mostly in QA, polish, controlled improvement, and engineering continuity hardening.
