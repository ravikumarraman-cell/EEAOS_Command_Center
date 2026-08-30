import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
const tiers = [
    { id: "T0", title: "Constitution", desc: "Engineering Charter, DoD, Risk Framework", color: "#2563eb" },
    { id: "T1", title: "Execution", desc: "Feature Delivery, Testing, Observability", color: "#059669" },
    { id: "T2", title: "Specialization", desc: "Feature, API, DB, Security, Performance", color: "#7c3aed" },
    { id: "T3", title: "Review", desc: "Security, Architecture, Performance Reviews", color: "#ea580c" },
    { id: "T4", title: "Release", desc: "Readiness and Governance", color: "#dc2626" }
];
export default function TierExplorer() {
    const [selected, setSelected] = useState(tiers[0]);
    return (_jsxs("div", { style: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }, children: [_jsx("div", { children: tiers.map(t => (_jsxs("div", { onClick: () => setSelected(t), style: { cursor: 'pointer', padding: '16px', marginBottom: '12px', borderRadius: '16px', background: selected.id === t.id ? t.color : '#1f2937', color: 'white' }, children: [_jsxs("h3", { children: [t.id, ": ", t.title] }), _jsx("p", { children: t.desc })] }, t.id))) }), _jsxs("div", { style: { padding: '24px', border: '1px solid #e5e7eb', borderRadius: '16px' }, children: [_jsxs("h2", { children: [selected.id, " - ", selected.title] }), _jsx("p", { children: selected.desc }), _jsx("h3", { children: "Expected Outputs" }), _jsxs("ul", { children: [_jsx("li", { children: "Governance guidance" }), _jsx("li", { children: "Required specifications" }), _jsx("li", { children: "Agent responsibilities" }), _jsx("li", { children: "Approval requirements" })] })] })] }));
}
