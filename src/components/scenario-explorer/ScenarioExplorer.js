import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowRight, FileText, User, CheckCircle, Cpu, HelpCircle, Search, ChevronRight, ShieldCheck } from "lucide-react";
import { specDocuments } from "../../specs/specDocuments";
import SpecDetailDrawer from "../specs/SpecDetailDrawer";
const scenarios = [
    {
        name: "Feature Development",
        tiers: "T0+T1+Feature Delivery",
        agents: ["Architect", "Implementer", "QA"],
        specs: ["Engineering Constitution", "Feature Delivery", "Testing Strategy"],
        outputs: ["Code", "Tests", "Documentation"],
        color: "emerald",
        desc: "Deploy new incremental product functions under standard QA and CI/CD gate checks.",
    },
    {
        name: "Bug Fix",
        tiers: "T0+RCA",
        agents: ["Implementer", "QA"],
        specs: ["Bug RCA", "Testing Strategy"],
        outputs: ["Root Cause", "Fix", "Regression Tests"],
        color: "rose",
        desc: "Remediation and validation check loops following production incidents.",
    },
    {
        name: "API Development",
        tiers: "T0+T1+API",
        agents: ["Architect", "Implementer", "Security Reviewer"],
        specs: ["API Governance", "Security Playbook"],
        outputs: ["API Contract", "Contract Tests"],
        color: "blue",
        desc: "Rigorous interface and contract-first designs conforming to system standards.",
    },
    {
        name: "Database Migration",
        tiers: "T0+DB",
        agents: ["Architect", "Implementer"],
        specs: ["Database Governance", "Migration Playbook"],
        outputs: ["Migration Scripts", "Rollback Plan"],
        color: "violet",
        desc: "Zero-downtime expand-contract schemas with fully validated rollback pathways.",
    },
    {
        name: "Security Review",
        tiers: "T0+Security",
        agents: ["Security Reviewer"],
        specs: ["Security Playbook"],
        outputs: ["Findings Log", "Mitigations Code"],
        color: "indigo",
        desc: "OWASP vulnerability scans and static/dynamic threat analysis cycles.",
    },
    {
        name: "Performance Optimization",
        tiers: "T0+Performance",
        agents: ["Performance Reviewer"],
        specs: ["Performance Handbook"],
        outputs: ["Benchmark Report", "Optimization Plan"],
        color: "amber",
        desc: "Frontend load testing, cache tuning, and bundle size constraint gates.",
    },
    {
        name: "Production Release",
        tiers: "T0+Release",
        agents: ["Release Approver"],
        specs: ["Production Readiness"],
        outputs: ["Live Telemetry Verification", "Go/No-Go Approval"],
        color: "red",
        desc: "Pre-flight live checks, structured logging scans, and disaster recovery signoffs.",
    },
];
export default function ScenarioExplorer() {
    const [selected, setSelected] = useState(scenarios[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpec, setSelectedSpec] = useState(null);
    const filteredScenarios = scenarios.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const openSpecByName = (name) => {
        const matched = specDocuments.find((doc) => doc.title.toLowerCase() === name.toLowerCase());
        if (matched) {
            setSelectedSpec(matched);
        }
        else {
            // Fallback matching
            const fuzzyMatched = specDocuments.find((doc) => doc.title.toLowerCase().includes(name.toLowerCase()) ||
                name.toLowerCase().includes(doc.title.toLowerCase()));
            if (fuzzyMatched) {
                setSelectedSpec(fuzzyMatched);
            }
        }
    };
    const getBadgeColor = (color) => {
        switch (color) {
            case "emerald": return "bg-emerald-50 text-emerald-700 border-emerald-100";
            case "rose": return "bg-rose-50 text-rose-700 border-rose-100";
            case "blue": return "bg-blue-50 text-blue-700 border-blue-100";
            case "violet": return "bg-[#8b5cf6]/5 text-[#8b5cf6] border-[#8b5cf6]/10";
            case "indigo": return "bg-indigo-50 text-indigo-700 border-indigo-100";
            case "amber": return "bg-amber-50 text-amber-700 border-amber-100";
            case "red": return "bg-red-50 text-red-700 border-red-100";
            default: return "bg-zinc-50 text-zinc-700 border-zinc-100";
        }
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300", children: [_jsxs("div", { className: "border-b border-zinc-200/50 pb-6", children: [_jsx("p", { className: "eyebrow accent", style: { fontWeight: 800, fontSize: "11px", letterSpacing: "0.12em" }, children: "Interactive Governance Modeling" }), _jsx("h1", { className: "font-serif text-4xl md:text-5xl font-normal text-zinc-950 mt-1 tracking-tight", children: "Scenario Explorer" }), _jsx("p", { className: "text-zinc-500 text-sm mt-2 max-w-2xl leading-relaxed", children: "Select or filter specific engineering workloads to view how quality gates, playbooks, AI agent roles, and delivery artifacts connect seamlessly." })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [_jsxs("div", { className: "lg:col-span-4 space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" }), _jsx("input", { type: "text", placeholder: "Filter engineering scenarios...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#d94625]/20 focus:border-[#d94625] transition-all" })] }), _jsxs("div", { className: "space-y-2.5", children: [filteredScenarios.map((s) => {
                                        const isSelected = selected.name === s.name;
                                        return (_jsxs("button", { onClick: () => setSelected(s), className: `w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group relative overflow-hidden ${isSelected
                                                ? "bg-zinc-900 border-transparent text-white shadow-lg shadow-zinc-900/10"
                                                : "bg-white border-zinc-200/80 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50"}`, children: [isSelected && (_jsx("div", { className: "absolute left-0 top-0 bottom-0 w-1 bg-[#d94625]" })), _jsxs("div", { className: "pr-4", children: [_jsx("strong", { className: "block text-sm font-semibold tracking-tight", children: s.name }), _jsx("span", { className: `inline-block text-[10px] px-2 py-0.5 rounded-sm border font-mono mt-1.5 font-medium ${isSelected
                                                                ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                                                                : "bg-zinc-100 text-zinc-600 border-zinc-200"}`, children: s.tiers })] }), _jsx(ArrowRight, { className: `w-4 h-4 shrink-0 transition-all duration-300 ${isSelected
                                                        ? "text-[#d94625] translate-x-0"
                                                        : "text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-1"}` })] }, s.name));
                                    }), filteredScenarios.length === 0 && (_jsxs("div", { className: "p-8 text-center bg-white border border-dashed border-zinc-200 rounded-2xl", children: [_jsx(HelpCircle, { className: "w-8 h-8 text-zinc-300 mx-auto mb-2" }), _jsx("p", { className: "text-zinc-500 text-xs", children: "No matching scenarios found." })] }))] })] }), _jsx("div", { className: "lg:col-span-8 space-y-6", children: _jsxs("div", { className: "bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-xs", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-5 mb-6", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: `inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${getBadgeColor(selected.color)}`, children: "Active Workflow Blueprints" }), _jsx("h2", { className: "font-serif text-2xl md:text-3xl font-normal text-zinc-950 mt-2", children: selected.name }), _jsx("p", { className: "text-xs text-zinc-400 font-medium", children: selected.desc })] }), _jsxs("div", { className: "flex items-center gap-1.5 bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-2 text-xs text-zinc-500 font-mono", children: [_jsx("span", { className: "text-zinc-400", children: "Sequence Code:" }), _jsx("span", { className: "font-bold text-zinc-800", children: selected.tiers })] })] }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-[#d94625]", children: [_jsx(FileText, { className: "w-4 h-4" }), _jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-zinc-800", children: "Governing Compliance Playbooks (Linked Docs)" })] }), _jsx("p", { className: "text-xs text-zinc-500 leading-relaxed pl-1", children: "Click any standard below to instantly slide open its live, dual-view criteria, interactive audit checkboxes, and machine compliance validation directives:" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1", children: selected.specs.map((specName) => {
                                                        const specObj = specDocuments.find((doc) => doc.title.toLowerCase() === specName.toLowerCase() ||
                                                            doc.title.toLowerCase().includes(specName.toLowerCase()) ||
                                                            specName.toLowerCase().includes(doc.title.toLowerCase()));
                                                        return (_jsxs("button", { type: "button", onClick: () => openSpecByName(specName), className: "group flex items-start gap-4 p-4 text-left border border-zinc-200 hover:border-[#d94625] rounded-xl hover:bg-[#faf9f8] transition-all bg-white hover:shadow-xs", children: [_jsx("div", { className: "w-9 h-9 rounded-lg bg-[#d94625]/5 text-[#d94625] flex items-center justify-center font-serif text-sm font-bold group-hover:bg-[#d94625] group-hover:text-white transition-all", children: specObj ? specObj.tier : "T1" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("span", { className: "block text-xs font-bold text-zinc-900 group-hover:text-[#d94625] transition-colors truncate", children: specName }), _jsxs("span", { className: "block text-[10px] text-zinc-400 font-mono mt-0.5", children: [specObj ? specObj.id : "EEAOS-SPEC-XXX", " \u2022 Click to Audit"] })] }), _jsx(ChevronRight, { className: "w-4 h-4 text-zinc-300 group-hover:text-[#d94625] group-hover:translate-x-1 transition-all self-center" })] }, specName));
                                                    }) })] }), _jsxs("div", { className: "space-y-3 pt-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-blue-500", children: [_jsx(Cpu, { className: "w-4 h-4" }), _jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-zinc-800", children: "Assigned Autonomous AI Engineering Agents" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: selected.agents.map((agent) => (_jsxs("div", { className: "flex items-center gap-3 p-3.5 bg-zinc-50/50 border border-zinc-200/60 rounded-xl hover:bg-zinc-50 transition-all", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100", children: _jsx(User, { className: "w-3.5 h-3.5" }) }), _jsxs("div", { children: [_jsxs("span", { className: "block text-xs font-bold text-zinc-800", children: [agent, " Agent"] }), _jsx("span", { className: "block text-[10px] text-zinc-400 font-mono", children: "Telemetry: Online" })] })] }, agent))) })] }), _jsxs("div", { className: "space-y-3 pt-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-emerald-500", children: [_jsx(CheckCircle, { className: "w-4 h-4" }), _jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-zinc-800", children: "Mandated Artifact Package & Verification Evidence" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: selected.outputs.map((output) => (_jsxs("div", { className: "flex items-center gap-3 p-3.5 border border-emerald-100 bg-emerald-50/10 rounded-xl", children: [_jsx(ShieldCheck, { className: "w-4 h-4 text-emerald-500 shrink-0" }), _jsx("span", { className: "text-xs font-semibold text-zinc-800 leading-snug", children: output })] }, output))) })] })] })] }) })] }), _jsx(SpecDetailDrawer, { spec: selectedSpec, onClose: () => setSelectedSpec(null) })] }));
}
