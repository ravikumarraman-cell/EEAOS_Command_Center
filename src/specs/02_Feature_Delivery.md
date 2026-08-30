---
id: EEAOS-SPEC-002
title: Feature Delivery
version: 1.0.0
last_updated: "2026-08-30"
category: Execution
tier: T1
audience: [Humans, AI Agents]
machine_directives:
  commit_convention: "Conventional Commits 1.0.0"
  enforce_branch_naming: true
  branch_pattern: "^(feat|fix|docs|refactor|perf|test)/[a-zA-Z0-9-_]+$"
  requires_jira_id: true
  reviewers_count: 2
---

# Feature Delivery Specification
## Enterprise Specification (EEAOS-SPEC-002)

### 1. Feature Lifecycle & Decomposition
To maintain visual and technical cohesion, all feature delivery pipelines **MUST** separate decomposition, implementation, and roll-out phases.

*   **Epic Decomposition**: No epic may exceed 3 sprint cycles.
*   **Story Breakdown**: Stories must represent complete, independent, testable segments of functionality with detailed Gherkin-format `Given/When/Then` Acceptance Criteria.
*   **PR Containment**: Each PR must address exactly one story. Massive "kitchen sink" pull requests are strictly blocked.

### 2. Commit & Branch Management
To automate the generation of interactive changelogs, branches and commits **MUST** follow:

*   **Branch Naming**: `<type>/<ticket-id>-<description>` (e.g., `feat/EEAOS-102-command-telemetry`).
*   **Commit Format**:
    ```text
    <type>(<scope>): <subject>

    [optional body]

    [optional footer(s)]
    ```
    *Allowed types*: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
