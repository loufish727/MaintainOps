# Step 1: Product Foundation

## Working Product Name

MaintainOps

This is the working product name for the prototype. Before launch, confirm the final brand is distinctive and clear for the intended market.

## Product Thesis

Maintenance teams need a fast, practical system for turning requests, inspections, and preventive schedules into completed work. The app should feel built for technicians first, while still giving managers useful control over priorities, labor, downtime, compliance, and parts.

## Primary Users

- Technician: sees assigned work, follows procedures, records notes/photos/time/parts, completes work.
- Maintenance manager: triages requests, assigns work, reviews overdue items, monitors team load and performance.
- Requester: submits maintenance requests and tracks request status.
- Admin: manages users, assets, locations, procedures, parts, and organization settings.

## MVP Workflows

1. A requester submits a maintenance request for an asset or location.
2. A manager reviews the request and turns it into a work order.
3. The manager assigns a technician, priority, due date, and optional checklist.
4. The technician opens their queue, completes steps, adds notes, records time and parts, and marks the work order done.
5. The asset history updates automatically.
6. The manager sees open, overdue, completed, and blocked work on a dashboard.

## MVP Feature Scope

### Must Have

- User roles: admin, manager, technician, requester.
- Work order list, detail, creation, assignment, status changes, due dates, priorities, categories, and comments.
- Asset and location records linked to work orders.
- Simple procedure/checklist templates.
- Preventive maintenance schedule records that can generate future work orders.
- Parts catalog and parts-used tracking on a work order.
- Dashboard with open work, overdue work, completion count, and priority breakdown.

### Should Have

- Photo attachment metadata on work orders.
- Downtime tracking.
- Basic team workload view.
- Activity timeline per work order.
- CSV import for assets and parts.

### Later

- Offline sync.
- QR scanning.
- Native mobile camera and voice-note capture.
- Meter-based triggers.
- AI-generated summaries or procedure suggestions.
- ERP/accounting integrations.
- Multi-site enterprise permissions.

## First Data Model

### Organization

- id
- name
- timezone
- createdAt

### User

- id
- organizationId
- name
- email
- role
- status

### Location

- id
- organizationId
- name
- parentLocationId
- description

### Asset

- id
- organizationId
- locationId
- name
- assetCode
- status
- manufacturer
- model
- serialNumber
- criticality

### WorkOrder

- id
- organizationId
- title
- description
- type: reactive, preventive, inspection, corrective
- status: requested, open, in_progress, blocked, completed, canceled
- priority: low, medium, high, critical
- assetId
- locationId
- requesterId
- assigneeId
- dueAt
- completedAt
- estimatedMinutes
- actualMinutes

### WorkOrderComment

- id
- workOrderId
- authorId
- body
- createdAt

### ProcedureTemplate

- id
- organizationId
- name
- description
- assetCategory

### ProcedureStep

- id
- procedureTemplateId
- position
- prompt
- responseType: checkbox, pass_fail, number, text
- required

### WorkOrderStepResult

- id
- workOrderId
- procedureStepId
- value
- note
- completedById
- completedAt

### PreventiveSchedule

- id
- organizationId
- assetId
- procedureTemplateId
- title
- frequencyType: daily, weekly, monthly, meter
- frequencyInterval
- nextDueAt
- active

### Part

- id
- organizationId
- name
- sku
- quantityOnHand
- reorderPoint
- unitCost

### WorkOrderPart

- id
- workOrderId
- partId
- quantityUsed

## First Build Slice

The first runnable version should be a browser app with seeded data and no external services:

- Dashboard
- Work order list
- Work order detail drawer or page
- Create work order form
- Asset list
- Basic procedure checklist attached to a work order

## Design Direction

The app should feel operational and field-ready: dense enough for daily use, calm enough for scanning under pressure, and optimized around the technician queue. Avoid a marketing-site feel. Use clear status chips, compact tables, strong filters, and a mobile-first technician detail screen.

## Open Decisions

- Stack: likely React/TypeScript with a local mock data layer first, then database-backed API.
- Product name: temporary.
- First customer segment: facilities, manufacturing, hospitality, or property maintenance.
- Deployment target: local prototype first, hosted app later.
