import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
const items = [
    { name: "Engineering Constitution", tier: "T0", category: "Governance", summary: "Core principles and DoD" },
    { name: "Feature Decomposition", tier: "T2", category: "Planning", summary: "Epics, stories, acceptance criteria" },
    { name: "Feature Delivery", tier: "T1", category: "Execution", summary: "Implementation workflow" },
    { name: "Security Playbook", tier: "T2", category: "Security", summary: "Threats and mitigations" },
    { name: "Testing Strategy", tier: "T1", category: "Quality", summary: "Unit, integration, regression" },
    { name: "Production Readiness", tier: "T4", category: "Release", summary: "Go-live checklist" }
];
export default function PlaybookLibrary() {
    const [q, setQ] = useState('');
    const [tier, setTier] = useState('All');
    const filtered = useMemo(() => items.filter(i => (tier === 'All' || i.tier === tier) && JSON.stringify(i).toLowerCase().includes(q.toLowerCase())), [q, tier]);
    return _jsxs("div", { style: { padding: 20 }, children: [_jsx("h2", { children: "Playbook & Spec Library" }), _jsx("input", { placeholder: 'Search playbooks...', value: q, onChange: e => setQ(e.target.value), style: { padding: 8, width: 300 } }), _jsxs("select", { value: tier, onChange: e => setTier(e.target.value), style: { marginLeft: 10, padding: 8 }, children: [_jsx("option", { children: "All" }), _jsx("option", { children: "T0" }), _jsx("option", { children: "T1" }), _jsx("option", { children: "T2" }), _jsx("option", { children: "T4" })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16, marginTop: 20 }, children: filtered.map(p => _jsxs("div", { style: { border: '1px solid #ddd', borderRadius: 12, padding: 16 }, children: [_jsx("h3", { children: p.name }), _jsxs("p", { children: [_jsx("b", { children: p.tier }), " \u2022 ", p.category] }), _jsx("p", { children: p.summary })] }, p.name)) })] });
}
