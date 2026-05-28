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

For a concise external review, start with:

- [docs/REVIEW_PACKET.md](docs/REVIEW_PACKET.md)
- [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/APP_JS_AUTHORITY_MAP.md](docs/APP_JS_AUTHORITY_MAP.md)
- [docs/FEATURE_STATUS.md](docs/FEATURE_STATUS.md)
- [docs/SECURITY_VERIFICATION.md](docs/SECURITY_VERIFICATION.md)
- [docs/ENGINEERING_PROCESS.md](docs/ENGINEERING_PROCESS.md)
- [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)

## Engineering Notes

MaintainOps is being hardened with scoped changes, smoke checks, live verification where needed, and documented public checkpoints. Detailed internal process notes are kept outside the public repository.

Original planning docs:

- [docs/step-01-product-foundation.md](docs/step-01-product-foundation.md)
- [docs/step-02-technical-foundation.md](docs/step-02-technical-foundation.md)
- [docs/step-03-work-orders-mvp.md](docs/step-03-work-orders-mvp.md)
- [docs/step-04-assets-and-locations.md](docs/step-04-assets-and-locations.md)
- [docs/step-05-procedures-and-inspections.md](docs/step-05-procedures-and-inspections.md)
- [docs/supabase-architecture.md](docs/supabase-architecture.md)
