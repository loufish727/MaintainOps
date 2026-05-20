# Real-World Failure Patterns And LFES

LFES learns from real engineering failures by extracting patterns relevant to MaintainOps. These examples do not imply MaintainOps has the same scale, domain, or certification obligations.

## Knight Capital

- Pattern: deployment inconsistency, stale code paths, weak operational controls.
- LFES helps: deployment traceability, rollback awareness, verification visibility.
- LFES does not primarily solve: market-system correctness or trading-domain controls.

## Ariane 5

- Pattern: reused assumptions became invalid in a new operating context.
- LFES helps: assumption traceability and revalidation before major evolution.
- LFES does not primarily solve: low-level runtime or aerospace validation.

## Mars Climate Orbiter

- Pattern: interface/units mismatch and insufficient cross-team verification.
- LFES helps: dependency visibility and verification-scope documentation.
- LFES does not primarily solve: physics-model correctness.

## Therac-25

- Pattern: hidden failure modes, poor operational visibility, unsafe control assumptions.
- LFES helps: failure-state visibility and high-risk workflow verification.
- LFES does not primarily solve: medical device safety certification.

## Challenger

- Pattern: risk signals existed but were not operationally acted on.
- LFES helps: known-risk preservation and escalation visibility.
- LFES does not primarily solve: material engineering.

## Meta Outage

- Pattern: network/dependency changes caused cascading operational failure.
- LFES helps: dependency visibility, rollback planning, deployment-state traceability.
- LFES does not primarily solve: global network control-plane correctness.

## Northeast Blackout

- Pattern: observability and cascading dependency failures.
- LFES helps: operational observability, abnormal-condition visibility, recovery-path clarity.
- LFES does not primarily solve: grid physics or power-system operations.

## Equifax

- Pattern: unpatched known vulnerability and poor asset/ownership visibility.
- LFES helps: dependency awareness, risk register discipline, evidence-based follow-up.
- LFES does not primarily solve: vendor patch management by itself.

## Healthcare.gov

- Pattern: integration complexity, late end-to-end testing, unclear operational readiness.
- LFES helps: controlled release readiness, verification boundaries, dependency mapping.
- LFES does not primarily solve: procurement or cross-organization governance.

## Operational ERP Entropy

- Pattern: business systems accumulate hidden rules until no one can safely change them.
- LFES helps: engineering memory preservation and controlled evolution.
- LFES does not primarily solve: organizational process ownership.

## AI Verification Debt

- Pattern: AI-assisted changes can pass local syntax but miss hidden business or security assumptions.
- LFES helps: context preservation, reviewer tags, explicit verification boundaries.
- LFES does not primarily solve: full automated correctness.

## Continuity Vs Correctness

LFES primarily addresses engineering continuity failures: hidden assumptions, lost rationale, unclear dependencies, unsafe evolution, and missing verification evidence. It does not replace domain-specific correctness engineering for low-level, safety-critical, physical, or formally verified systems.
