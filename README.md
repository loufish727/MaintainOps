# MaintainOps

MaintainOps is a Supabase-backed maintenance operations app for work orders, equipment, requests, parts, preventive maintenance, team workflows, and field operations.

Live app: [loufish727.github.io/MaintainOps](https://loufish727.github.io/MaintainOps/)

Public front door: [loufish727.github.io](https://loufish727.github.io/)

## Product Scope

MaintainOps is being built for small maintenance teams that need to:

- Create, assign, and complete work orders
- Track assets and locations
- Run preventive maintenance schedules
- Capture inspection checklist results
- Record technician notes, photos, time, and parts used
- Give managers a clear dashboard of overdue work, downtime, and completion trends

## Local Setup

The current app is Supabase-backed. Before running it locally, execute [supabase/schema.sql](supabase/schema.sql), then the current `supabase/step-next-*.sql` files in order, and add your project credentials to [supabase-config.js](supabase-config.js). The current setup order is listed in [docs/supabase-architecture.md](docs/supabase-architecture.md).

Open [index.html](index.html) in a browser or serve the repo with a local web server.

## Reviewer Starting Points

For current project handoff, start with:

- [docs/APP_REVIEW_PACKET.md](docs/APP_REVIEW_PACKET.md)
- [docs/CURRENT_HANDOFF.md](docs/CURRENT_HANDOFF.md)
- [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/FEATURE_STATUS.md](docs/FEATURE_STATUS.md)
- [docs/QA_LOG.md](docs/QA_LOG.md)
- [docs/NEXT_STEPS.md](docs/NEXT_STEPS.md)
- [docs/DEBUG_PROCESS.md](docs/DEBUG_PROCESS.md)
- [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)

## Engineering Notes

MaintainOps is being hardened with a controlled engineering process: scoped changes, smoke checks, live verification where needed, and documented handoff notes.

Detailed internal process notes are kept in the project docs for continuity, but the public README stays focused on the product, setup path, and reviewer entry points.

Original planning docs:

- [docs/step-01-product-foundation.md](docs/step-01-product-foundation.md)
- [docs/step-02-technical-foundation.md](docs/step-02-technical-foundation.md)
- [docs/step-03-work-orders-mvp.md](docs/step-03-work-orders-mvp.md)
- [docs/step-04-assets-and-locations.md](docs/step-04-assets-and-locations.md)
- [docs/step-05-procedures-and-inspections.md](docs/step-05-procedures-and-inspections.md)
- [docs/supabase-architecture.md](docs/supabase-architecture.md)
