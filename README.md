# Maintenance Operations App

This project is an early build plan for a maintenance operations app inspired by modern CMMS tools such as MaintainX, without copying their branding or proprietary interface.

The first target is a focused MVP for small maintenance teams:

- Create, assign, and complete work orders
- Track assets and locations
- Run preventive maintenance schedules
- Capture inspection checklist results
- Record technician notes, photos, time, and parts used
- Give managers a clear dashboard of overdue work, downtime, and completion trends

Open [index.html](index.html) in a browser to run the current prototype.

The current app is now Supabase-backed. Before running it, execute [supabase/schema.sql](supabase/schema.sql) in Supabase and add your project credentials to [supabase-config.js](supabase-config.js).

Start with [docs/10-step-process.md](docs/10-step-process.md), then see:

- [docs/step-01-product-foundation.md](docs/step-01-product-foundation.md)
- [docs/step-02-technical-foundation.md](docs/step-02-technical-foundation.md)
- [docs/step-03-work-orders-mvp.md](docs/step-03-work-orders-mvp.md)
- [docs/step-04-assets-and-locations.md](docs/step-04-assets-and-locations.md)
- [docs/step-05-procedures-and-inspections.md](docs/step-05-procedures-and-inspections.md)
- [docs/supabase-architecture.md](docs/supabase-architecture.md)
