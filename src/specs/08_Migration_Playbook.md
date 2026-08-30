---
id: EEAOS-SPEC-008
title: Migration Playbook
version: 1.0.0
last_updated: "2026-08-30"
category: Planning
tier: T2
audience: [Humans, AI Agents]
machine_directives:
  zero_downtime: true
  rollback_script_required: true
  verification_tests: ["Data integrity assertions", "Post-migration smoke tests"]
---

# Migration Playbook Specification
## Enterprise Specification (EEAOS-SPEC-008)

### 1. Zero-Downtime Schema Evolution
All database structural modifications **MUST** follow the Expand-Contract Pattern to avoid service disruption:

*   **Step 1 (Expand)**: Add new columns, fields, or tables without removing old configurations. Deploy the update.
*   **Step 2 (Dual Write)**: Write data to both old and new columns simultaneously to build parity.
*   **Step 3 (Backfill)**: Run background jobs to migrate historical data from the old structure to the new one.
*   **Step 4 (Contract)**: Cut off reads from old structures, confirm zero errors, then drop old columns safely.

### 2. Rollback Verification
Every migration pipeline **MUST** contain a verified, automated rollback script to return the database state to the exact preceding version without data loss.
