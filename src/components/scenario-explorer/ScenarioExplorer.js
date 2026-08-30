import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
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
    return (_jsxs("div", { style: { display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }, children: [_jsx("div", { children: scenarios.map((s) => (_jsx("div", { onClick: () => setSelected(s), style: {
                        cursor: "pointer",
                        padding: 16,
                        marginBottom: 10,
                        border: "1px solid #ddd",
                        borderRadius: 12,
                    }, children: _jsx("strong", { children: s.name }) }, s.name))) }), _jsxs("div", { children: [_jsx("h2", { children: selected.name }), _jsxs("p", { children: [_jsx("b", { children: "Tiers:" }), " ", selected.tiers] }), _jsx("h3", { children: "Specs" }), _jsx("ul", { children: selected.specs.map((x) => (_jsx("li", { children: x }, x))) }), _jsx("h3", { children: "Agents" }), _jsx("ul", { children: selected.agents.map((x) => (_jsx("li", { children: x }, x))) }), _jsx("h3", { children: "Expected Outputs" }), _jsx("ul", { children: selected.outputs.map((x) => (_jsx("li", { children: x }, x))) })] })] }));
}
