# LFES Scoring Model

LFES Gold score is weighted to match MaintainOps' risk profile.

| Category | Weight |
|---|---:|
| Security | 30 |
| Database Integrity | 20 |
| Reliability | 15 |
| Maintainability | 15 |
| Scalability | 10 |
| Reviewability | 10 |

## Score Bands

- 90-100 Exceptional
- 80-89 Strong
- 70-79 Acceptable
- 60-69 Needs Improvement
- Below 60 High Risk

## Scoring Guidance

Security and database integrity carry the highest weight because MaintainOps is multi-company and Supabase-backed. A system with weak tenant isolation cannot be considered strong even if the UI works well.

Maintainability, reliability, scalability, and reviewability should be scored based on evidence: current docs, QA coverage, code concentration, paging behavior, error handling, and deployment clarity.
