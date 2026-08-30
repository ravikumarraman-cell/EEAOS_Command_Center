import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const specs = [
    { name: "Engineering Constitution", tier: "T0", deps: [] },
    { name: "Feature Delivery", tier: "T1", deps: ["Engineering Constitution"] },
    { name: "Testing Strategy", tier: "T1", deps: ["Engineering Constitution"] },
    { name: "Security Playbook", tier: "T2", deps: ["Engineering Constitution"] },
    { name: "Production Readiness", tier: "T4", deps: ["Feature Delivery", "Testing Strategy", "Security Playbook"] }
];
export default function SpecDependencyGraph() {
    const [selected, setSelected] = useState(specs[0]);
    return _jsxs("div", { style: { padding: 24 }, children: [_jsx("h1", { children: "Spec Dependency Graph" }), _jsx("p", { children: "Visualize relationships between tiers, specifications, agents and workflows." }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }, children: [_jsx("div", { children: specs.map(s => _jsxs("div", { onClick: () => setSelected(s), style: { cursor: 'pointer', border: '1px solid #ddd', borderRadius: 10, padding: 12, marginBottom: 8 }, children: [_jsx("strong", { children: s.name }), _jsx("br", {}), "Tier: ", s.tier] }, s.name)) }), _jsxs("div", { children: [_jsx("h2", { children: selected.name }), _jsxs("p", { children: [_jsx("b", { children: "Tier:" }), " ", selected.tier] }), _jsx("h3", { children: "Dependencies" }), _jsx("ul", { children: selected.deps.length ? selected.deps.map(d => _jsx("li", { children: d }, d)) : _jsx("li", { children: "None" }) }), _jsx("h3", { children: "Affected Workflows" }), _jsxs("ul", { children: [_jsx("li", { children: "Feature Delivery" }), _jsx("li", { children: "Code Review" }), _jsx("li", { children: "Release Validation" })] }), _jsx("h3", { children: "Suggested Agents" }), _jsxs("ul", { children: [_jsx("li", { children: "Architect" }), _jsx("li", { children: "Implementer" }), _jsx("li", { children: "Reviewer" })] }), _jsx("h3", { children: "Relationship View" }), _jsx("pre", { children: selected.name + ' -> ' + (selected.deps.join(' -> ') || 'Root Spec') })] })] })] });
}
