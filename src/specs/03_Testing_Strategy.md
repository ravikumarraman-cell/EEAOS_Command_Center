---
id: EEAOS-SPEC-003
title: Testing Strategy
version: 1.0.0
last_updated: "2026-08-30"
category: Quality
tier: T1
audience: [Humans, AI Agents]
machine_directives:
  min_coverage:
    statements: 85
    branches: 80
    functions: 90
    lines: 85
  strict_no_alert: true
  require_regression_tests_for_fixes: true
---

# Testing Strategy Specification
## Enterprise Specification (EEAOS-SPEC-003)

### 1. The EEAOS Test Pyramid
Quality guarantees are established using a multi-tiered verification framework:

*   **Unit Tests (70%)**: Focus on isolated pure functions, utilities, and lightweight logic. Executed instantly without external network or DB mocking overhead.
*   **Integration Tests (20%)**: Validate boundaries between distinct modules, database connections, and third-party contract points.
*   **End-to-End Tests (10%)**: Exercise complete flows from UI triggers through state layers down to data persistence.

### 2. Coverage Gates & Assertions
All automated pull-request checks **MUST** enforce the following gates:
- **No Mock Stubs in Production**: Production code must never contain bypass parameters like `?skipVerify=true`.
- **Regression Protection**: Every bugfix **MUST** be accompanied by a regression test asserting the failure case before applying the patch.
