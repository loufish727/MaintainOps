# LFES Failure Map

| Case | Root Breakdown | LFES-Relevant Problem | What LFES Helps | What LFES Does Not Primarily Solve |
|---|---|---|---|---|
| Knight Capital | Stale deployment path activated | Deployment-state traceability | Release checks, rollback visibility | Trading system controls |
| Ariane 5 | Reused assumptions invalid in new context | Assumption drift | Assumption reevaluation | Aerospace runtime validation |
| Mars Climate Orbiter | Interface mismatch | Dependency and verification visibility | Interface assumptions | Physics/unit formal assurance |
| Therac-25 | Hidden unsafe states | Failure-state explainability | Visible abnormal conditions | Medical device certification |
| Challenger | Known risk not acted on | Risk preservation and escalation | Known-risk logs | Material engineering |
| Meta outage | Cascading dependency failure | Dependency visibility | Rollback and dependency mapping | Global network correctness |
| Northeast blackout | Observability breakdown | Operational visibility | Abnormal-state visibility | Power grid operations |
| Deepwater Horizon | Risk signals and operational controls failed | Operational continuity and escalation | Risk traceability | Physical process safety |
| Fukushima | Extreme condition assumptions failed | Environmental assumption traceability | Assumption reevaluation | Disaster engineering |
| Equifax | Known patch/asset gap | Ownership and dependency visibility | Risk register, follow-up | Enterprise patch execution |
| ERP entropy | Hidden business rules accumulate | Engineering memory decay | Decision logs, controlled evolution | Organizational process design |
| AI verification debt | Changes lack durable context | AI assumption drift | Context docs, reviewer tags, verification scope | Full automated correctness |

Use this map to refine LFES only when a pattern is structurally relevant to MaintainOps.
