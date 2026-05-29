# Engineering Process

MaintainOps is developed with a conservative change process because it is an operational app with authentication, tenant isolation, role-based workflows, and mutation-heavy maintenance records.

Publicly visible process principles:

- Keep changes scoped.
- Verify behavior before deployment.
- Use targeted smoke tests for touched workflows.
- Treat auth, RLS, storage, public intake, deletes, and workflow mutations as higher-risk areas.
- Prefer incremental modularization over broad rewrites.
- Preserve production behavior while reducing `app.js` authority over time.
- Document public-facing maturity honestly.
- Leave a brief trace for meaningful UI/workflow changes: what changed, why, what was verified, and any intentional limitation.

Internal operating details, phase logs, and procedural playbooks are intentionally kept outside the public repository.
