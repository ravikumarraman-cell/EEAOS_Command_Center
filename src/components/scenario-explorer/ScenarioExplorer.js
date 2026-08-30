import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowRight, FileText, User, CheckCircle2, Cpu, HelpCircle, Search, ChevronRight, ShieldCheck } from "lucide-react";
import { specDocuments } from "../../specs/specDocuments";
import SpecDetailDrawer from "../specs/SpecDetailDrawer";
const scenarios = [
    {
        name: "Feature Development",
        tiers: "T0 + T1 + Feature Delivery",
        desc: "Deploy new incremental product functions under standard QA and CI/CD gate checks.",
        slaHours: 4,
        criticality: "High",
        color: "emerald",
        specs: ["Engineering Constitution", "Feature Delivery", "Testing Strategy"],
        agents: [
            {
                role: "Lead Architect",
                description: "Validates specifications and aligns design goals.",
                tools: ["Spec Analyzer", "UML Generator"]
            },
            {
                role: "Code Implementer",
                description: "Generates robust code changes matching target directives.",
                tools: ["Typescript Compiler", "Template Injector"]
            },
            {
                role: "QA Verifier",
                description: "Scans compliance coverage and evaluates code quality.",
                tools: ["Linter", "Jest Test Runner"]
            }
        ],
        outputs: ["Verified Code Change", "Automated Coverage Suite", "Changelog Manifest"]
    },
    {
        name: "Bug RCA & Incident Fix",
        tiers: "T0 + RCA",
        desc: "Trace regressions, write target isolation proofs, and implement zero-regression remedies following incidents.",
        slaHours: 2,
        criticality: "Critical",
        color: "rose",
        specs: ["Bug RCA", "Testing Strategy"],
        agents: [
            {
                role: "Code Implementer",
                description: "Creates failing regression tests and implements hotfixes.",
                tools: ["Debugger", "Git Cherrypick"]
            },
            {
                role: "QA Verifier",
                description: "Verifies incident resolution and signs off on the 5-Whys analysis.",
                tools: ["Regression Suite", "Postmortem Logger"]
            }
        ],
        outputs: ["Failing Regression Test", "Targeted Hotfix Patch", "5 Whys Postmortem"]
    },
    {
        name: "API Service Design",
        tiers: "T0 + T1 + API",
        desc: "Construct highly consistent, versioned, contract-first service endpoints with structured payload handlers.",
        slaHours: 8,
        criticality: "High",
        color: "blue",
        specs: ["API Governance", "Security Playbook"],
        agents: [
            {
                role: "Lead Architect",
                description: "Designs versioned API interfaces and validates JSON structures.",
                tools: ["OpenAPI Parser", "Schema Validator"]
            },
            {
                role: "Code Implementer",
                description: "Builds service handlers and integrates idempotency mechanisms.",
                tools: ["Express Router", "Mock Request Tester"]
            },
            {
                role: "Security Reviewer",
                description: "Performs interface vulnerability checks and payload auditing.",
                tools: ["OWASP Scanner", "SQL Injection Tester"]
            }
        ],
        outputs: ["OpenAPI Contract", "Idempotency Proof Tests", "JSON Schema Envelopes"]
    },
    {
        name: "Database Schema Migration",
        tiers: "T0 + DB",
        desc: "Migrate structural relational tables using live zero-downtime double-write procedures safely.",
        slaHours: 6,
        criticality: "Critical",
        color: "violet",
        specs: ["Database Governance", "Migration Playbook"],
        agents: [
            {
                role: "Lead Architect",
                description: "Validates schema changes against strict backward compatibility rules.",
                tools: ["Drizzle Schema Visualizer", "Dependency Checker"]
            },
            {
                role: "Code Implementer",
                description: "Writes expand-contract SQL scripts and safe migration controls.",
                tools: ["SQL Migration Generator", "Rollback Driver"]
            }
        ],
        outputs: ["Expand-Contract SQL Scripts", "Pre-Flight Rollback Script", "Data Integrity Parity Tests"]
    },
    {
        name: "Security Review Audit",
        tiers: "T0 + Security",
        desc: "Perform extensive static analysis scans and OWASP threat modeling prior to code promotion.",
        slaHours: 3,
        criticality: "Critical",
        color: "indigo",
        specs: ["Security Playbook"],
        agents: [
            {
                role: "Security Reviewer",
                description: "Audits target entrypoints, scans secrets, and mitigates OWASP vulnerabilities.",
                tools: ["Static Security Scanner", "Secret Leak Detector", "Container Vulnerability Tool"]
            }
        ],
        outputs: ["Vulnerability Findings Log", "Input Sanitization Proofs", "Signed Cryptographic Audit Token"]
    },
    {
        name: "Performance Tune & Caching",
        tiers: "T0 + Performance",
        desc: "Verify bundle footprints, optimize First Contentful Paint times, and configure cache levels.",
        slaHours: 4,
        criticality: "Medium",
        color: "amber",
        specs: ["Performance Handbook"],
        agents: [
            {
                role: "Performance Reviewer",
                description: "Measures latency benchmarks, bundle splits, and edge caching configurations.",
                tools: ["Synthetic Benchmark Simulator", "Lighthouse Auditor", "Cache Control mapper"]
            }
        ],
        outputs: ["Synthetic Latency Benchmark", "Edge Cache Control Maps", "Dynamic Code-Splitting Audit"]
    },
    {
        name: "Production Release Gate",
        tiers: "T0 + Release",
        desc: "Final checkpoint evaluating diagnostic probes, structured logs, and structural signoffs.",
        slaHours: 1,
        criticality: "Critical",
        color: "red",
        specs: ["Production Readiness"],
        agents: [
            {
                role: "Release Approver",
                description: "Executes pre-flight live checks, analyzes telemetry, and issues Go/No-Go tokens.",
                tools: ["Live Probe Evaluator", "Log Analyzer", "Release Approval Gate"]
            }
        ],
        outputs: ["Container Diagnostic Log", "Disaster Recovery Rollback Signoff", "Live Production Verification Token"]
    }
];
export default function ScenarioExplorer() {
    const [selected, setSelected] = useState(scenarios[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpec, setSelectedSpec] = useState(null);
    const filteredScenarios = scenarios.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tiers.toLowerCase().includes(searchQuery.toLowerCase()));
    const openSpecByName = (name) => {
        const matched = specDocuments.find((doc) => doc.title.toLowerCase() === name.toLowerCase());
        if (matched) {
            setSelectedSpec(matched);
        }
        else {
            const fuzzyMatched = specDocuments.find((doc) => doc.title.toLowerCase().includes(name.toLowerCase()) ||
                name.toLowerCase().includes(doc.title.toLowerCase()));
            if (fuzzyMatched) {
                setSelectedSpec(fuzzyMatched);
            }
        }
    };
    const getCriticalityBadge = (level) => {
        switch (level) {
            case "Critical": return "bg-rose-50 text-rose-700 border-rose-200/60";
            case "High": return "bg-amber-50 text-amber-700 border-amber-200/60";
            default: return "bg-blue-50 text-blue-700 border-blue-200/60";
        }
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300", children: [_jsxs("div", { className: "border-b border-zinc-200/60 pb-6", children: [_jsx("p", { className: "eyebrow accent", style: { fontWeight: 800, fontSize: "11px", letterSpacing: "0.14em" }, children: "AI Agent Studio" }), _jsx("h1", { className: "font-serif text-4xl md:text-5xl font-normal text-zinc-950 mt-1 tracking-tight", children: "Scenario Explorer" }), _jsx("p", { className: "text-zinc-500 text-sm mt-2 max-w-2xl leading-relaxed", children: "Select an engineering scenario to see the governing playbooks, assigned autonomous agents, and expected deliverables mapped out like an AI Agent Studio workspace." })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [_jsxs("div", { className: "lg:col-span-4 space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" }), _jsx("input", { type: "text", placeholder: "Search engineering scenarios...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#d94625]/20 focus:border-[#d94625] transition-all" })] }), _jsxs("div", { className: "space-y-2.5", children: [filteredScenarios.map((s) => {
                                        const isSelected = selected.name === s.name;
                                        return (_jsxs("button", { onClick: () => setSelected(s), className: `w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group relative overflow-hidden ${isSelected
                                                ? "bg-zinc-900 border-transparent text-white shadow-md shadow-zinc-900/10"
                                                : "bg-white border-zinc-200/80 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50"}`, children: [isSelected && (_jsx("div", { className: "absolute left-0 top-0 bottom-0 w-1 bg-[#d94625]" })), _jsxs("div", { className: "pr-4 space-y-1", children: [_jsx("strong", { className: "block text-xs font-bold tracking-tight uppercase tracking-wider", children: s.name }), _jsx("span", { className: `inline-block text-[9px] px-2 py-0.5 rounded-sm border font-mono font-medium ${isSelected
                                                                ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                                                                : "bg-zinc-100 text-zinc-500 border-zinc-200"}`, children: s.tiers })] }), _jsx(ArrowRight, { className: `w-4 h-4 shrink-0 transition-all duration-300 ${isSelected
                                                        ? "text-[#d94625] translate-x-0"
                                                        : "text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-1"}` })] }, s.name));
                                    }), filteredScenarios.length === 0 && (_jsxs("div", { className: "p-8 text-center bg-white border border-dashed border-zinc-200 rounded-2xl", children: [_jsx(HelpCircle, { className: "w-8 h-8 text-zinc-300 mx-auto mb-2" }), _jsx("p", { className: "text-zinc-500 text-xs font-semibold", children: "No matching scenarios found." })] }))] })] }), _jsx("div", { className: "lg:col-span-8 space-y-6", children: _jsxs("div", { className: "bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-100 pb-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: `inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-sm border ${getCriticalityBadge(selected.criticality)}`, children: [selected.criticality, " Priority"] }), _jsx("span", { className: "text-zinc-300", children: "\u2022" }), _jsxs("span", { className: "text-xs text-zinc-500 font-mono", children: ["SLA: ", selected.slaHours, " Hours"] })] }), _jsx("h2", { className: "font-serif text-2xl md:text-3xl font-normal text-zinc-950", children: selected.name }), _jsx("p", { className: "text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xl", children: selected.desc })] }), _jsxs("div", { className: "flex items-center gap-1.5 bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-2 text-xs text-zinc-500 font-mono self-start sm:self-auto shrink-0", children: [_jsx("span", { className: "text-zinc-400", children: "Tiers:" }), _jsx("span", { className: "font-bold text-zinc-800", children: selected.tiers })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-zinc-800", children: [_jsx(FileText, { className: "w-4 h-4 text-[#d94625]" }), _jsx("h4", { className: "text-xs font-bold uppercase tracking-wider", children: "Governing Compliance Playbooks" })] }), _jsx("p", { className: "text-xs text-zinc-400", children: "These playbooks are linked to this scenario. Click a standard to audit its criteria and interactive checklists:" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: selected.specs.map((specName) => {
                                                const specObj = specDocuments.find((doc) => doc.title.toLowerCase() === specName.toLowerCase() ||
                                                    doc.title.toLowerCase().includes(specName.toLowerCase()) ||
                                                    specName.toLowerCase().includes(doc.title.toLowerCase()));
                                                return (_jsxs("button", { type: "button", onClick: () => openSpecByName(specName), className: "group flex items-start gap-4 p-4 text-left border border-zinc-200/80 hover:border-[#d94625] rounded-xl hover:bg-zinc-50 bg-white transition-all", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[#d94625]/5 text-[#d94625] flex items-center justify-center font-serif text-sm font-bold group-hover:bg-[#d94625] group-hover:text-white transition-all", children: specObj ? specObj.tier : "T1" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("span", { className: "block text-xs font-bold text-zinc-900 group-hover:text-[#d94625] transition-colors truncate", children: specName }), _jsxs("span", { className: "block text-[10px] text-zinc-400 font-mono mt-0.5", children: [specObj ? specObj.id : "EEAOS-SPEC-XXX", " \u2022 Click to Open"] })] }), _jsx(ChevronRight, { className: "w-4 h-4 text-zinc-300 group-hover:text-[#d94625] group-hover:translate-x-1 transition-all self-center" })] }, specName));
                                            }) })] }), _jsxs("div", { className: "space-y-4 pt-2 border-t border-zinc-100", children: [_jsxs("div", { className: "flex items-center gap-2 text-zinc-800", children: [_jsx(Cpu, { className: "w-4 h-4 text-[#d94625]" }), _jsx("h4", { className: "text-xs font-bold uppercase tracking-wider", children: "Assigned Autonomous AI Agents" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: selected.agents.map((agent) => (_jsxs("div", { className: "border border-zinc-200 bg-[#fcfcfc] rounded-xl p-4 flex flex-col justify-between space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center", children: _jsx(User, { className: "w-3.5 h-3.5" }) }), _jsx("span", { className: "text-xs font-bold text-zinc-950 uppercase tracking-tight", children: agent.role })] }), _jsx("p", { className: "text-[11px] text-zinc-500 leading-relaxed", children: agent.description })] }), _jsxs("div", { className: "space-y-1.5 pt-2.5 border-t border-zinc-100", children: [_jsx("span", { className: "block text-[9px] font-bold text-zinc-400 uppercase tracking-wider", children: "Assigned Tools:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: agent.tools.map((t) => (_jsx("span", { className: "text-[9px] font-mono font-medium text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded-sm", children: t }, t))) })] })] }, agent.role))) })] }), _jsxs("div", { className: "space-y-4 pt-2 border-t border-zinc-100", children: [_jsxs("div", { className: "flex items-center gap-2 text-zinc-800", children: [_jsx(ShieldCheck, { className: "w-4 h-4 text-emerald-600" }), _jsx("h4", { className: "text-xs font-bold uppercase tracking-wider", children: "Mandated Deliverables & Output Packages" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: selected.outputs.map((output) => (_jsxs("div", { className: "flex items-center gap-3 p-4 border border-emerald-100 bg-emerald-50/10 rounded-xl hover:border-emerald-200 transition-colors", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500 shrink-0" }), _jsx("span", { className: "text-xs font-semibold text-zinc-800 leading-tight", children: output })] }, output))) })] })] }) })] }), _jsx(SpecDetailDrawer, { spec: selectedSpec, onClose: () => setSelectedSpec(null) })] }));
}
