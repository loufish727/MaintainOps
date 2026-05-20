# Engineering Decisions

## Keep Debug Protocol Separate From LFES

Decision: LFES does not replace `docs/DEBUG_PROCESS.md`.

Reason: The Debug Protocol proves behavior still works. LFES preserves reasoning, traceability, and safe evolution above that functional proof.

## Treat Company Membership As The Tenant Boundary

Decision: `private.is_company_member(company_id)` remains the critical company isolation mechanism.

Reason: MaintainOps is multi-company. Weakening this helper or bypassing it in RLS would undermine the SaaS direction.

## Keep Location Switching Simple But Intentional

Decision: Managers/admins can switch locations; technicians can switch only with Mobile tech enabled.

Reason: Field users need flexibility, but accidental location changes caused real routing confusion.

## Preserve Equipment-Driven Location Routing With Warning

Decision: If selected equipment belongs to another location, the record can route to that equipment's location, but the user gets an intentional warning.

Reason: Equipment location is operationally meaningful, but cross-location saves must not be silent.

## Use Scoped Public QR RPCs

Decision: Anonymous request intake should use scoped RPCs and tokens, not direct table access.

Reason: QR codes must work for outsiders while preserving company/location boundaries.

## Modularize app.js Only By Plan

Decision: Do not refactor `app.js` until an extraction plan, rollback strategy, and Debug Protocol checkpoints exist.

Reason: `app.js` is large but working. Unplanned decomposition could break operational workflows.
