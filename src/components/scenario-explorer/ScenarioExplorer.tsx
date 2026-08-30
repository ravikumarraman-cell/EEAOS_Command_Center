import React, { useState } from "react";

const scenarios = [
  {
    name: "Feature Development",
    tiers: "T0+T1+Feature Delivery",
    agents: ["Architect", "Implementer", "QA"],
    specs: ["Engineering Constitution", "Feature Delivery", "Testing Strategy"],
    outputs: ["Code", "Tests", "Documentation"],
  },
  {
    name: "Bug Fix",
    tiers: "T0+RCA",
    agents: ["Implementer", "QA"],
    specs: ["Bug RCA", "Testing Strategy"],
    outputs: ["Root Cause", "Fix", "Regression Tests"],
  },
  {
    name: "API Development",
    tiers: "T0+T1+API",
    agents: ["Architect", "Implementer", "Security Reviewer"],
    specs: ["API Governance", "Security Playbook"],
    outputs: ["API", "Contract Tests"],
  },
  {
    name: "Database Migration",
    tiers: "T0+DB",
    agents: ["Architect", "Implementer"],
    specs: ["Database Governance", "Migration Playbook"],
    outputs: ["Migration", "Rollback Plan"],
  },
  {
    name: "Security Review",
    tiers: "T0+Security",
    agents: ["Security Reviewer"],
    specs: ["Security Playbook"],
    outputs: ["Findings", "Mitigations"],
  },
  {
    name: "Performance Optimization",
    tiers: "T0+Performance",
    agents: ["Performance Reviewer"],
    specs: ["Performance Handbook"],
    outputs: ["Benchmark Report", "Optimization Plan"],
  },
  {
    name: "Production Release",
    tiers: "T0+Release",
    agents: ["Release Approver"],
    specs: ["Production Readiness"],
    outputs: ["Go/No-Go Decision"],
  },
];

export default function ScenarioExplorer() {
  const [selected, setSelected] = useState(scenarios[0]);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
      <div>
        {scenarios.map((s) => (
          <div
            key={s.name}
            onClick={() => setSelected(s)}
            style={{
              cursor: "pointer",
              padding: 16,
              marginBottom: 10,
              border: "1px solid #ddd",
              borderRadius: 12,
            }}
          >
            <strong>{s.name}</strong>
          </div>
        ))}
      </div>
      <div>
        <h2>{selected.name}</h2>
        <p>
          <b>Tiers:</b> {selected.tiers}
        </p>
        <h3>Specs</h3>
        <ul>
          {selected.specs.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <h3>Agents</h3>
        <ul>
          {selected.agents.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <h3>Expected Outputs</h3>
        <ul>
          {selected.outputs.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
