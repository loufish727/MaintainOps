# Referenced Standards Concepts

LFES references engineering concepts only when they solve MaintainOps problems. This file does not claim compliance or certification.

| Concept | MaintainOps Problem Solved | Relevant LFES Area |
|---|---|---|
| Least privilege | Avoid overbroad table/RPC/storage access | Security, Database |
| Defense in depth | UI gating alone is insufficient for role-sensitive mutations | Security |
| Explicit trust boundaries | Public QR and company membership boundaries must be understandable | Security, Reviewability |
| Change control | SQL and deployment changes need traceability | Deployment, Database |
| Incident learning | Real failures reveal hidden assumptions and visibility gaps | LFES Evolution |
| Operational observability | Live testing needs visible failures and recovery paths | Reliability |
| Separation of concerns | `app.js` concentration increases review and refactor risk | Maintainability |
| Bounded resource use | Large datasets require paging and count queries | Scalability |
| Assumption management | Location, mobile, and invite assumptions can drift | Traceability |

Do not reference external standards for prestige. A standards concept belongs in LFES only when it improves traceability, explainability, maintainability, operational continuity, controlled evolution, reviewability, or verification visibility.
