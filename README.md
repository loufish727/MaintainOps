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

Start with [docs/10-step-process.md](docs/10-step-process.md), then see:

- [docs/step-01-product-foundation.md](docs/step-01-product-foundation.md)
- [docs/step-02-technical-foundation.md](docs/step-02-technical-foundation.md)
- [docs/step-03-work-orders-mvp.md](docs/step-03-work-orders-mvp.md)
- [docs/step-04-assets-and-locations.md](docs/step-04-assets-and-locations.md)
- [docs/step-05-procedures-and-inspections.md](docs/step-05-procedures-and-inspections.md)
- [docs/supabase-architecture.md](docs/supabase-architecture.md)
