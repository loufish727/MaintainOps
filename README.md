# Maintenance Operations App

This project is an early build plan for MaintainOps, an original maintenance operations app for internal work order, asset, parts, and technician workflows.

The first target is a focused MVP for small maintenance teams:

- Create, assign, and complete work orders
- Track assets and locations
- Run preventive maintenance schedules
- Capture inspection checklist results
- Record technician notes, photos, time, and parts used
- Give managers a clear dashboard of overdue work, downtime, and completion trends

Open [index.html](index.html) in a browser to run the current prototype.

The current app is Supabase-backed. Before running it, execute [supabase/schema.sql](supabase/schema.sql), then the current `supabase/step-next-*.sql` files in order, and add your project credentials to [supabase-config.js](supabase-config.js). The current setup order is listed in [docs/supabase-architecture.md](docs/supabase-architecture.md).

For current project handoff, start with:

- [docs/CURRENT_HANDOFF.md](docs/CURRENT_HANDOFF.md)
- [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/FEATURE_STATUS.md](docs/FEATURE_STATUS.md)
- [docs/QA_LOG.md](docs/QA_LOG.md)
- [docs/NEXT_STEPS.md](docs/NEXT_STEPS.md)
- [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)

Original planning docs:

- [docs/step-01-product-foundation.md](docs/step-01-product-foundation.md)
- [docs/step-02-technical-foundation.md](docs/step-02-technical-foundation.md)
- [docs/step-03-work-orders-mvp.md](docs/step-03-work-orders-mvp.md)
- [docs/step-04-assets-and-locations.md](docs/step-04-assets-and-locations.md)
- [docs/step-05-procedures-and-inspections.md](docs/step-05-procedures-and-inspections.md)
- [docs/supabase-architecture.md](docs/supabase-architecture.md)
