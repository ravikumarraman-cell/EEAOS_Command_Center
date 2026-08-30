---
id: EEAOS-SPEC-004
title: Bug RCA
version: 1.0.0
last_updated: "2026-08-30"
category: Execution
tier: T0
audience: [Humans, AI Agents]
machine_directives:
  rca_method: "5 Whys Framework"
  required_sections: [Symptom, Root Cause, 5 Whys Chain, Remediation, Regression Proof]
  automatic_postmortem_generation: true
---

# Bug Root Cause Analysis (RCA) Specification
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
- Why did our processes permit this vulnerability to pass review?
