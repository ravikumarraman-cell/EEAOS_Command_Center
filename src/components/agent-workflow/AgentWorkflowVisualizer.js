import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
const workflows = {
    Feature: ["Planner", "Architect", "Implementer", "QA", "Release"],
    Enterprise: ["Planner", "Architect", "Implementer", "Security", "Performance", "QA", "Release"],
    Bug: ["Planner", "Implementer", "QA"]
};
export default function AgentWorkflowVisualizer() {
    const [type, setType] = useState("Enterprise");
    const steps = workflows[type];
    return _jsxs("div", { style: { padding: 20 }, children: [_jsx("h2", { children: "Agent Workflow Visualizer" }), _jsxs("select", { value: type, onChange: e => setType(e.target.value), children: [_jsx("option", { children: "Enterprise" }), _jsx("option", { children: "Feature" }), _jsx("option", { children: "Bug" })] }), _jsx("div", { style: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }, children: steps.map((s, i) => _jsxs(React.Fragment, { children: [_jsx("div", { style: { padding: 16, borderRadius: 12, background: '#2563eb', color: '#fff' }, children: s }), i < steps.length - 1 && _jsx("div", { style: { alignSelf: 'center' }, children: "\u2192" })] }, s)) }), _jsx("h3", { children: "Expected Inputs" }), _jsxs("ul", { children: [_jsx("li", { children: "Requirements" }), _jsx("li", { children: "Selected tiers" }), _jsx("li", { children: "Applicable specs" })] }), _jsx("h3", { children: "Expected Outputs" }), _jsxs("ul", { children: [_jsx("li", { children: "Implementation plan" }), _jsx("li", { children: "Review findings" }), _jsx("li", { children: "Release recommendation" })] })] });
}
