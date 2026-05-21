# LFES Scalability Standard

Scalability for MaintainOps means the app stays usable as work orders, requests, equipment, parts, procedures, and history grow.

## LFES-SCL-001: Use Paging And Filtering

Large lists should stay paged at 12 unless the user explicitly changes that rule. Avoid loading thousands of rows into the browser.

## LFES-SCL-002: Avoid Unnecessary Full-Table Reads

Queries should scope by company, location, status, search term, or relationship where possible. Count queries can support dashboards without fetching all rows.

## LFES-SCL-003: Preserve Search Limits

Search should be useful without dumping huge result sets. Future "view all matching work orders" work should keep server-side paging.

## LFES-SCL-004: Watch Cascading Dependencies

Deletes and refactors must consider relationships that may not be loaded in the current page. Equipment and procedure delete guards already use live count checks because paged data can hide linked history.

## LFES-SCL-005: Mobile Performance Matters

Mobile layouts and field workflows must avoid heavy renders, oversized images, unbounded lists, and unclear retry states.

## Scaling Assumption Traceability

When a performance choice is made, record what scale it was tested against and what assumption remains. Example: work-order stress tests reached 10,000 records, but future global search expansion still needs a paged path.
