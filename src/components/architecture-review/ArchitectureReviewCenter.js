import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const adrs = [
    { id: 'ADR-001', title: 'Adopt Microservice Boundary', status: 'Approved' },
    { id: 'ADR-002', title: 'API Gateway Standardization', status: 'Review' },
    { id: 'ADR-003', title: 'Event-Driven Integration', status: 'Proposed' }
];
export default function ArchitectureReviewCenter() {
    const [selected, setSelected] = useState(adrs[0]);
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsx("h2", { children: "Architecture Review Center" }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }, children: [
                    ['Architecture Fitness', '92%'],
                    ['Scalability', '89%'],
                    ['Reliability', '94%'],
                    ['Security', '91%'],
                    ['Technical Debt', '18%']
                ].map(([n, v]) => (_jsxs("div", { style: { border: '1px solid #ddd', borderRadius: 12, padding: 12 }, children: [_jsx("div", { children: n }), _jsx("strong", { children: v })] }, n))) }), _jsx("h3", { style: { marginTop: 20 }, children: "Architecture Decision Records" }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }, children: [_jsx("div", { children: adrs.map(a => (_jsxs("div", { onClick: () => setSelected(a), style: { cursor: 'pointer', padding: 12, border: '1px solid #ddd', marginBottom: 8, borderRadius: 10 }, children: [_jsx("strong", { children: a.id }), _jsx("br", {}), a.title] }, a.id))) }), _jsxs("div", { style: { border: '1px solid #ddd', borderRadius: 10, padding: 16 }, children: [_jsx("h4", { children: selected.id }), _jsx("p", { children: selected.title }), _jsxs("p", { children: ["Status: ", selected.status] }), _jsx("h4", { children: "Review Scorecard" }), _jsxs("ul", { children: [_jsx("li", { children: "Boundary Alignment: 5/5" }), _jsx("li", { children: "Scalability: 4/5" }), _jsx("li", { children: "Reliability: 5/5" }), _jsx("li", { children: "Maintainability: 4/5" })] })] })] }), _jsx("h3", { children: "Reference Architecture" }), _jsx("pre", { children: "Frontend -> API Gateway -> Services -> Database" })] }));
}
