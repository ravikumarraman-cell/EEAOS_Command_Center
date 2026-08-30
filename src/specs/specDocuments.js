export const specDocuments = [
    {
        id: "EEAOS-SPEC-001",
        title: "Engineering Constitution",
        version: "1.0.0",
        lastUpdated: "2026-08-30",
        category: "Governance",
        tier: "T0",
        audience: ["Humans", "AI Agents"],
        machineDirectives: {
            "execution_priority": "strict_hierarchy",
            "strict_mode": true,
            "agent_self_approval_allowed": false,
            "required_gates": ["Architecture", "Security", "QA"]
        },
        markdown: `# EEAOS Engineering Constitution
## Enterprise Specification (EEAOS-SPEC-001)

### Executive Summary & Scope
The Engineering Constitution is the supreme authority governing all design, implementation, and operation within the Engineering Operating System (EEAOS). All subsequent specifications, automated pipelines, and operational actions are subordinated to this document.

### Decision-Making Hierarchy
When executing under constraints or resolve conflict, engineers and autonomous agents **MUST** prioritize according to the following strict order:
1. **User Safety & Data Protection** - Prevent harm, physical risk, or data compromise.
2. **Security & Cryptography** - Ensure defense-in-depth and strict compliance.
3. **Correctness & Verification** - Ensure absolute correctness before speed.
4. **Reliability & Resilience** - Maintain system uptime and recovery guarantees.
5. **Business Value** - Focus on outcomes aligned with commercial requirements.
6. **Performance & Latency** - Optimize execution speeds and bandwidth bounds.
7. **Developer Convenience** - Eradicate tedious work without sacrificing the steps above.

---

### Constitutional Directives for Autonomous Agents
All LLM-based agents, review pipelines, and coding units **MUST** comply with:
- **Rule 1.1**: Load and parse this constitution before editing any source code.
- **Rule 1.2**: Never approve your own pull requests or generate mock validation stubs.
- **Rule 1.3**: When encountering missing system dependencies or breaking changes, escalate rather than speculate.`
    },
    {
        id: "EEAOS-SPEC-002",
        title: "Feature Delivery",
        version: "1.0.0",
        lastUpdated: "2026-08-30",
        category: "Execution",
        tier: "T1",
        audience: ["Humans", "AI Agents"],
        machineDirectives: {
            "commit_convention": "Conventional Commits 1.0.0",
            "enforce_branch_naming": true,
            "branch_pattern": "^(feat|fix|docs|refactor|perf|test)/[a-zA-Z0-9-_]+$",
            "requires_jira_id": true,
            "reviewers_count": 2
        },
        markdown: `# Feature Delivery Specification
## Enterprise Specification (EEAOS-SPEC-002)

### 1. Feature Lifecycle & Decomposition
To maintain visual and technical cohesion, all feature delivery pipelines **MUST** separate decomposition, implementation, and roll-out phases.

*   **Epic Decomposition**: No epic may exceed 3 sprint cycles.
*   **Story Breakdown**: Stories must represent complete, independent, testable segments of functionality with detailed Gherkin-format \`Given/When/Then\` Acceptance Criteria.
*   **PR Containment**: Each PR must address exactly one story. Massive "kitchen sink" pull requests are strictly blocked.

### 2. Commit & Branch Management
To automate the generation of interactive changelogs, branches and commits **MUST** follow:

*   **Branch Naming**: \`<type>/<ticket-id>-<description>\` (e.g., \`feat/EEAOS-102-command-telemetry\`).
*   **Commit Format**:
    \`\`\`text
    <type>(<scope>): <subject>

    [optional body]

    [optional footer(s)]
    \`\`\`
    *Allowed types*: \`feat\`, \`fix\`, \`docs\`, \`style\`, \`refactor\`, \`perf\`, \`test\`, \`chore\`.`
    },
    {
        id: "EEAOS-SPEC-003",
        title: "Testing Strategy",
        version: "1.0.0",
        lastUpdated: "2026-08-30",
        category: "Quality",
        tier: "T1",
        audience: ["Humans", "AI Agents"],
        machineDirectives: {
            "min_coverage": {
                "statements": 85,
                "branches": 80,
                "functions": 90,
                "lines": 85
            },
            "strict_no_alert": true,
            "require_regression_tests_for_fixes": true
        },
        markdown: `# Testing Strategy Specification
## Enterprise Specification (EEAOS-SPEC-003)

### 1. The EEAOS Test Pyramid
Quality guarantees are established using a multi-tiered verification framework:

*   **Unit Tests (70%)**: Focus on isolated pure functions, utilities, and lightweight logic. Executed instantly without external network or DB mocking overhead.
*   **Integration Tests (20%)**: Validate boundaries between distinct modules, database connections, and third-party contract points.
*   **End-to-End Tests (10%)**: Exercise complete flows from UI triggers through state layers down to data persistence.

### 2. Coverage Gates & Assertions
All automated pull-request checks **MUST** enforce the following gates:
- **No Mock Stubs in Production**: Production code must never contain bypass parameters like \`?skipVerify=true\`.
- **Regression Protection**: Every bugfix **MUST** be accompanied by a regression test asserting the failure case before applying the patch.`
    },
    {
        id: "EEAOS-SPEC-004",
        title: "Bug RCA",
        version: "1.0.0",
        lastUpdated: "2026-08-30",
        category: "Execution",
        tier: "T0",
        audience: ["Humans", "AI Agents"],
        machineDirectives: {
            "rca_method": "5 Whys Framework",
            "required_sections": ["Symptom", "Root Cause", "5 Whys Chain", "Remediation", "Regression Proof"],
            "automatic_postmortem_generation": true
        },
        markdown: `# Bug Root Cause Analysis (RCA) Specification
## Enterprise Specification (EEAOS-SPEC-004)

### 1. Incident Remediation Process
When a regression is detected within active deployments, engineers and agents **MUST** execute the standard response chain:
1.  **Isolate & Triage**: Apply an immediate feature-flag cutoff or rollover before debugging.
2.  **Verify via Test**: Write a failing regression test replicating the issue first.
3.  **Resolve & Fix**: Code the solution that satisfies the failing regression test.
4.  **Perform Root Cause Analysis (RCA)**: Document the exact chain of failure using the 5 Whys Framework.

### 2. The 5 Whys Structure
Every RCA document **MUST** outline:
- Why did the symptom occur?
- Why did the underlying component fail?
- Why was this failure state not covered by existing integration tests?
- Why was the original design vulnerable to this issue?
- Why did our processes permit this vulnerability to pass review?`
    },
    {
        id: "EEAOS-SPEC-005",
        title: "API Governance",
        version: "1.0.0",
        lastUpdated: "2026-08-30",
        category: "Governance",
        tier: "T1",
        audience: ["Humans", "AI Agents"],
        machineDirectives: {
            "standard": "RESTful JSON / OpenAPI 3.1.0",
            "version_scheme": "URI path matching /v[0-9]+/",
            "idempotency_required": ["POST", "PUT", "DELETE"],
            "allow_breaking_without_major": false
        },
        markdown: `# API Governance Specification
## Enterprise Specification (EEAOS-SPEC-005)

### 1. Architectural Integrity
All API design within EEAOS **MUST** adhere to strict contract-first principles:

*   **OpenAPI Compliance**: All interfaces must be fully defined in an OpenAPI v3.1 spec file before code generation starts.
*   **URI Conventions**: Resource names must be plural nouns (e.g., \`/api/v1/scenarios\`, not \`/api/v1/getScenario\`).
*   **Idempotency Guidelines**: Safe HTTP verbs (\`GET\`, \`HEAD\`, \`OPTIONS\`) must never modify backend state. Write transactions (\`POST\`, \`PUT\`, \`DELETE\`) must support idempotency headers for safe retry behavior.

### 2. Standardized JSON Responses
Success envelopes **MUST** conform to:
\`\`\`json
{
  "success": true,
  "data": {}
}
\`\`\`
Error envelopes **MUST** include standard error code families:
\`\`\`json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "Required parameter 'id' is missing.",
    "details": []
  }
}
\`\`\``
    },
    {
        id: "EEAOS-SPEC-006",
        title: "Security Playbook",
        version: "1.0.0",
        lastUpdated: "2026-08-30",
        category: "Security",
        tier: "T2",
        audience: ["Humans", "AI Agents"],
        machineDirectives: {
            "owasp_compliance": true,
            "secrets_blocker": true,
            "token_validation": "JWT / ES256",
            "required_sanitization": ["html_escape", "sql_parameters"]
        },
        markdown: `# Security Playbook Specification
## Enterprise Specification (EEAOS-SPEC-006)

### 1. Mandatory Defense Layers
Any codebase operating in EEAOS **MUST** incorporate defense-in-depth principles:

*   **Input Sanitization**: Zero Trust input validation. All user-supplied parameters must be checked against structural patterns (regex, schemas) before logic evaluation.
*   **Parameterization**: Raw string concatenation in SQL, Redis commands, or system scripts is **STRICTLY PROHIBITED**. Use parameterized statements.
*   **Cross-Site Scripting (XSS)**: All rendering outputs in UI templates must be escaped. Use JSX/TSX sanitization features natively.

### 2. Secrets Management
- Under no circumstances may active API keys, tokens, or credentials be committed to git repositories.
- Use environment variable mappings from securely injected vaults (e.g., GCP Secret Manager).`
    },
    {
        id: "EEAOS-SPEC-007",
        title: "Database Governance",
        version: "1.0.0",
        lastUpdated: "2026-08-30",
        category: "Governance",
        tier: "T0",
        audience: ["Humans", "AI Agents"],
        machineDirectives: {
            "db_engine": "PostgreSQL / Cloud SQL",
            "orm": "Drizzle ORM",
            "indexing_policy": "mandatory_foreign_keys",
            "require_analytical_indices": true
        },
        markdown: `# Database Governance Specification
## Enterprise Specification (EEAOS-SPEC-007)

### 1. Data Integrity & Normalization
To prevent anomalies, relational storage schemas **MUST** preserve functional dependency rules:

*   **Foreign Key Integrity**: All relational models must define explicit referential integrity constraints (\`ON DELETE CASCADE/RESTRICT\`).
*   **Index Optimization**: Every search query must be supported by indices. Composite keys must order fields from high-to-low cardinality.
*   **Isolation Levels**: Default database sessions must execute under \`READ COMMITTED\` or higher. Use explicit transactions for atomic, multi-step actions.

### 2. Audit Trails
All tables tracking operational state (incidents, releases, scenarios) **MUST** include:
- \`created_at\` (Timestamp)
- \`updated_at\` (Timestamp)
- \`updated_by\` (User/Agent Identifier)`
    },
    {
        id: "EEAOS-SPEC-008",
        title: "Migration Playbook",
        version: "1.0.0",
        lastUpdated: "2026-08-30",
        category: "Planning",
        tier: "T2",
        audience: ["Humans", "AI Agents"],
        machineDirectives: {
            "zero_downtime": true,
            "rollback_script_required": true,
            "verification_tests": ["Data integrity assertions", "Post-migration smoke tests"]
        },
        markdown: `# Migration Playbook Specification
## Enterprise Specification (EEAOS-SPEC-008)

### 1. Zero-Downtime Schema Evolution
All database structural modifications **MUST** follow the Expand-Contract Pattern to avoid service disruption:

*   **Step 1 (Expand)**: Add new columns, fields, or tables without removing old configurations. Deploy the update.
*   **Step 2 (Dual Write)**: Write data to both old and new columns simultaneously to build parity.
*   **Step 3 (Backfill)**: Run background jobs to migrate historical data from the old structure to the new one.
*   **Step 4 (Contract)**: Cut off reads from old structures, confirm zero errors, then drop old columns safely.

### 2. Rollback Verification
Every migration pipeline **MUST** contain a verified, automated rollback script to return the database state to the exact preceding version without data loss.`
    },
    {
        id: "EEAOS-SPEC-009",
        title: "Performance Handbook",
        version: "1.0.0",
        lastUpdated: "2026-08-30",
        category: "Quality",
        tier: "T0",
        audience: ["Humans", "AI Agents"],
        machineDirectives: {
            "max_ttfb_ms": 100,
            "max_fcp_ms": 1200,
            "max_bundle_size_kb": 250,
            "caching_ttl_sec": 3600
        },
        markdown: `# Performance Handbook Specification
## Enterprise Specification (EEAOS-SPEC-009)

### 1. Frontend Performance Boundaries
Ensuring instantaneous, lightning-fast rendering is critical for user satisfaction. The following limits are enforced:
- **First Contentful Paint (FCP)**: Must stay below \`1.2s\` under standard 3G emulation.
- **Vite Bundle Limits**: Code chunk sizes must be controlled via dynamic code splitting (\`React.lazy\`).

### 2. Caching Strategy
- Leverage Edge cache controls with appropriate \`Cache-Control\` headers for static resources.
- Database access layers must implement transient caching for read-heavy resources, utilizing memory key-value stores with strict TTL boundaries.`
    },
    {
        id: "EEAOS-SPEC-010",
        title: "Production Readiness",
        version: "1.0.0",
        lastUpdated: "2026-08-30",
        category: "Release",
        tier: "T4",
        audience: ["Humans", "AI Agents"],
        machineDirectives: {
            "ready_percentage_gate": 100,
            "checklist": [
                "Load testing report successfully submitted",
                "Security audit signed off",
                "Disaster recovery runbook complete",
                "Structured logging validation passed"
            ]
        },
        markdown: `# Production Readiness Specification
## Enterprise Specification (EEAOS-SPEC-010)

### 1. Launch Gate Requirements
Before a software component is released to active live containers, it **MUST** satisfy the launch checklist:

*   **Health Check Endpoints**: Implement \`/api/health/live\` and \`/api/health/ready\` reporting container diagnostic metrics.
*   **Logging Standard**: Output structured JSON logs matching the global schema: \`{"timestamp", "level", "message", "traceId"}\`.
*   **Disaster Recovery**: Provide automated recovery scripts and validated runbooks for manual overrides.

### 2. Final Sign-off Gate
All changes entering production require dual sign-off from both QA agents and security review structures.`
    }
];
