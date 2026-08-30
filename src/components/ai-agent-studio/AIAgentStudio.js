import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
const agentProfiles = {
    Architect: { tiers: ['T0', 'T2 Architecture'], specs: ['Engineering Constitution', 'Architecture Handbook', 'ADR Guide'], outputs: ['Architecture', 'ADRs', 'Tradeoffs'] },
    Planner: { tiers: ['T0', 'T2 Planning'], specs: ['Story Mapping', 'Feature Decomposition'], outputs: ['Epics', 'Stories', 'Acceptance Criteria'] },
    Implementer: { tiers: ['T0', 'T1'], specs: ['Feature Delivery', 'Testing Strategy'], outputs: ['Code', 'Tests', 'Documentation'] },
    Security: { tiers: ['T0', 'T2 Security'], specs: ['Security Playbook', 'Threat Modeling'], outputs: ['Threat Model', 'Findings'] },
    QA: { tiers: ['T0', 'Testing'], specs: ['Testing Strategy'], outputs: ['Test Plan', 'Regression Suite'] },
    Release: { tiers: ['T0', 'T4'], specs: ['Readiness', 'Release Governance'], outputs: ['Go/No-Go Decision'] }
};
export default function AIAgentStudio() {
    const [agent, setAgent] = useState('Architect');
    const profile = useMemo(() => agentProfiles[agent], [agent]);
    const prompt = `Act as ${agent}. Follow: ${profile.specs.join(', ')}. Produce: ${profile.outputs.join(', ')}`;
    return _jsxs("div", { style: { padding: 24 }, children: [_jsx("h1", { children: "AI Agent Studio" }), _jsx("p", { children: "Build role-specific prompt packages and orchestration plans." }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }, children: [_jsxs("div", { children: [_jsx("h3", { children: "Agent Personas" }), Object.keys(agentProfiles).map(a => _jsx("div", { onClick: () => setAgent(a), style: { cursor: 'pointer', padding: 12, marginBottom: 8, border: '1px solid #ddd', borderRadius: 10, background: a === agent ? '#eef' : 'white' }, children: a }, a))] }), _jsxs("div", { children: [_jsxs("h2", { children: [agent, " Agent"] }), _jsx("h3", { children: "Required Tiers" }), _jsx("ul", { children: profile.tiers.map(x => _jsx("li", { children: x }, x)) }), _jsx("h3", { children: "Required Specs" }), _jsx("ul", { children: profile.specs.map(x => _jsx("li", { children: x }, x)) }), _jsx("h3", { children: "Expected Outputs" }), _jsx("ul", { children: profile.outputs.map(x => _jsx("li", { children: x }, x)) }), _jsx("h3", { children: "Generated Prompt Package" }), _jsx("textarea", { value: prompt, readOnly: true, style: { width: '100%', height: 120 } }), _jsx("h3", { children: "Suggested Workflow" }), _jsx("pre", { children: "Architect -> Planner -> Implementer -> Security -> QA -> Release" }), _jsx("h3", { children: "Governance Validation" }), _jsxs("ul", { children: [_jsx("li", { children: "\u2705 Tier Coverage" }), _jsx("li", { children: "\u2705 Required Specs Present" }), _jsx("li", { children: "\u2705 Review Chain Included" })] })] })] })] });
}
