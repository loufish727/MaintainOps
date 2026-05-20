# Step 2: Technical Foundation

## Decision

Start with a dependency-free browser prototype using plain HTML, CSS, and JavaScript.

This is intentionally lightweight. The goal is to validate the core CMMS product shape before committing to a larger stack, auth system, database schema, or deployment path.

## Current Prototype

- `index.html`: app shell, navigation, dialog, and detail panel.
- `styles.css`: responsive operational UI styling.
- `app.js`: seeded data, rendering, filters, work order creation, and checklist interactions.

## Included Views

- Dashboard with open, overdue, completed, and critical metrics.
- Priority queue for active work orders.
- Work order list with filters and search.
- Work order detail panel with status, asset context, checklist, time, and parts.
- Asset list with location, model, status, and criticality.
- Procedure template list with checklist steps.

## Why This Stack First

- No install step.
- Easy to inspect and change.
- Works from a local file.
- Keeps attention on workflows, data shape, and screen density.

## Next Technical Decision

When the prototype feels directionally right, move to:

- React and TypeScript for component structure.
- Local storage or IndexedDB for early persistence.
- A real database-backed API after the workflow stops moving around.
- Authentication and organizations once the role model is proven.
