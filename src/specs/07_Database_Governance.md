---
id: EEAOS-SPEC-007
title: Database Governance
version: 1.0.0
last_updated: "2026-08-30"
category: Governance
tier: T0
audience: [Humans, AI Agents]
machine_directives:
  db_engine: "PostgreSQL / Cloud SQL"
  orm: "Drizzle ORM"
  indexing_policy: mandatory_foreign_keys
  require_analytical_indices: true
---

# Database Governance Specification
## Enterprise Specification (EEAOS-SPEC-007)

### 1. Data Integrity & Normalization
To prevent anomalies, relational storage schemas **MUST** preserve functional dependency rules:

*   **Foreign Key Integrity**: All relational models must define explicit referential integrity constraints (`ON DELETE CASCADE/RESTRICT`).
*   **Index Optimization**: Every search query must be supported by indices. Composite keys must order fields from high-to-low cardinality.
*   **Isolation Levels**: Default database sessions must execute under `READ COMMITTED` or higher. Use explicit transactions for atomic, multi-step actions.

### 2. Audit Trails
All tables tracking operational state (incidents, releases, scenarios) **MUST** include:
- `created_at` (Timestamp)
- `updated_at` (Timestamp)
- `updated_by` (User/Agent Identifier)
