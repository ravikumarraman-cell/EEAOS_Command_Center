import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
export default function RecommendationEngine() {
    const [task, setTask] = useState("Feature Development");
    const [risk, setRisk] = useState("Medium");
    const [criticality, setCriticality] = useState("Medium");
    const rec = useMemo(() => {
        const base = { tiers: ["Tier 0"], specs: ["Engineering Constitution"], agents: ["Planner"] };
        if (task === "Feature Development") {
            base.tiers.push("Tier 1", "Tier 2");
            base.specs.push("Feature Delivery", "Story Mapping", "Testing Strategy");
            base.agents.push("Architect", "Implementer", "QA");
        }
        if (task === "Bug Fix") {
            base.specs.push("Bug RCA", "Testing Strategy");
            base.agents.push("Implementer", "QA");
        }
        if (task === "Security Review") {
            base.specs.push("Security Playbook");
            base.agents.push("Security Reviewer");
        }
        if (risk === "High" || criticality === "High") {
            base.tiers.push("Tier 3 Review");
            base.agents.push("Release Approver");
        }
        return base;
    }, [task, risk, criticality]);
    return _jsxs("div", { children: [_jsx("h2", { children: "Spec Recommendation Engine" }), _jsxs("label", { children: ["Task ", _jsxs("select", { "aria-label": "Task", value: task, onChange: e => setTask(e.target.value), children: [_jsx("option", { children: "Feature Development" }), _jsx("option", { children: "Bug Fix" }), _jsx("option", { children: "Security Review" })] })] }), _jsxs("label", { children: ["Risk ", _jsxs("select", { "aria-label": "Risk", value: risk, onChange: e => setRisk(e.target.value), children: [_jsx("option", { children: "Low" }), _jsx("option", { children: "Medium" }), _jsx("option", { children: "High" })] })] }), _jsxs("label", { children: ["Criticality ", _jsxs("select", { "aria-label": "Criticality", value: criticality, onChange: e => setCriticality(e.target.value), children: [_jsx("option", { children: "Low" }), _jsx("option", { children: "Medium" }), _jsx("option", { children: "High" })] })] }), _jsx("h3", { children: "Recommended Tiers" }), _jsx("ul", { children: rec.tiers.map(x => _jsx("li", { children: x }, x)) }), _jsx("h3", { children: "Required Specs" }), _jsx("ul", { children: rec.specs.map(x => _jsx("li", { children: x }, x)) }), _jsx("h3", { children: "Recommended Agents" }), _jsx("ul", { children: rec.agents.map(x => _jsx("li", { children: x }, x)) })] });
}
