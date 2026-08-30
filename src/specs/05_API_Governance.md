---
id: EEAOS-SPEC-005
title: API Governance
version: 1.0.0
last_updated: "2026-08-30"
category: Governance
tier: T1
audience: [Humans, AI Agents]
machine_directives:
  standard: "RESTful JSON / OpenAPI 3.1.0"
  version_scheme: "URI path matching /v[0-9]+/"
  idempotency_required: [POST, PUT, DELETE]
  allow_breaking_without_major: false
---

# API Governance Specification
## Enterprise Specification (EEAOS-SPEC-005)

### 1. Architectural Integrity
All API design within EEAOS **MUST** adhere to strict contract-first principles:

*   **OpenAPI Compliance**: All interfaces must be fully defined in an OpenAPI v3.1 spec file before code generation starts.
*   **URI Conventions**: Resource names must be plural nouns (e.g., `/api/v1/scenarios`, not `/api/v1/getScenario`).
*   **Idempotency Guidelines**: Safe HTTP verbs (`GET`, `HEAD`, `OPTIONS`) must never modify backend state. Write transactions (`POST`, `PUT`, `DELETE`) must support idempotency headers for safe retry behavior.

### 2. Standardized JSON Responses
Success envelopes **MUST** conform to:
```json
{
  "success": true,
  "data": {}
}
```
Error envelopes **MUST** include standard error code families:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "Required parameter 'id' is missing.",
    "details": []
  }
}
```
