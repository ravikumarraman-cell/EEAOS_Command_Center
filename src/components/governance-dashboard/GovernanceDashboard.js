import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const metrics = [
    { name: "Engineering Maturity", score: 88, color: "#2563eb" },
    { name: "Security Readiness", score: 92, color: "#dc2626" },
    { name: "Reliability Readiness", score: 85, color: "#059669" },
    { name: "Architecture Fitness", score: 90, color: "#7c3aed" },
    { name: "Production Readiness", score: 94, color: "#ea580c" }
];
export default function GovernanceDashboard() {
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsx("h2", { children: "Governance Dashboard" }), _jsx("p", { children: "Executive overview of engineering health and governance posture." }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }, children: metrics.map(m => (_jsxs("div", { style: { border: '1px solid #ddd', borderRadius: 16, padding: 16 }, children: [_jsx("h3", { children: m.name }), _jsxs("div", { style: { fontSize: 32, fontWeight: 'bold', color: m.color }, children: [m.score, "%"] })] }, m.name))) }), _jsx("h3", { style: { marginTop: 24 }, children: "Quality Gates" }), _jsxs("ul", { children: [_jsx("li", { children: "\u2705 Architecture Review" }), _jsx("li", { children: "\u2705 Security Review" }), _jsx("li", { children: "\u2705 Reliability Review" }), _jsx("li", { children: "\u26A0\uFE0F Performance Validation" }), _jsx("li", { children: "\u2705 Testing Validation" })] }), _jsx("h3", { children: "Risk Matrix" }), _jsx("div", { style: { border: '1px solid #ddd', padding: 16, borderRadius: 12 }, children: "Critical: 0 | High: 2 | Medium: 5 | Low: 12" }), _jsx("h3", { children: "Executive Actions" }), _jsxs("ul", { children: [_jsx("li", { children: "Review High Risks" }), _jsx("li", { children: "Approve Release Readiness" }), _jsx("li", { children: "Monitor Reliability Trends" })] })] }));
}
