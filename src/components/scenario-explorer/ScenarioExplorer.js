import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FileText, User, CheckCircle2, Activity, HelpCircle, Search, ChevronRight, ShieldCheck, Play, RotateCcw, Terminal, Sliders } from "lucide-react";
import { specDocuments } from "../../specs/specDocuments";
import SpecDetailDrawer from "../specs/SpecDetailDrawer";
const scenarios = [
    {
        name: "Feature Development",
        tiers: "T0+T1+Feature Delivery",
        agents: ["Architect", "Implementer", "QA"],
        specs: ["Engineering Constitution", "Feature Delivery", "Testing Strategy"],
        outputs: ["Verified Code Change", "Automated Coverage Suite", "Changelog Manifest"],
        color: "emerald",
        desc: "Incorporate new modular, robust functionality under standard high-intent compliance guidelines.",
        slaHours: 4,
        criticality: "High",
        riskScore: 35,
    },
    {
        name: "Bug RCA & Incident Fix",
        tiers: "T0+RCA",
        agents: ["Implementer", "QA"],
        specs: ["Bug RCA", "Testing Strategy"],
        outputs: ["Failing Regression Test", "Targeted Hotfix Patch", "5 Whys Postmortem Document"],
        color: "rose",
        desc: "Trace regressions, write target isolation proofs, and implement zero-regression remedies following incidents.",
        slaHours: 2,
        criticality: "Critical",
        riskScore: 78,
    },
    {
        name: "API Service Design",
        tiers: "T0+T1+API",
        agents: ["Architect", "Implementer", "Security Reviewer"],
        specs: ["API Governance", "Security Playbook"],
        outputs: ["Validated OpenAPI Contract", "Idempotency Proof Tests", "JSON Schema Envelopes"],
        color: "blue",
        desc: "Construct highly consistent, versioned, contract-first service endpoints with structured payload handlers.",
        slaHours: 8,
        criticality: "High",
        riskScore: 42,
    },
    {
        name: "Database Schema Migration",
        tiers: "T0+DB",
        agents: ["Architect", "Implementer"],
        specs: ["Database Governance", "Migration Playbook"],
        outputs: ["Expand-Contract Migration Scripts", "Pre-Flight Rollback Script", "Data Integrity Parity Tests"],
        color: "violet",
        desc: "Migrate structural relational tables using live zero-downtime double-write procedures safely.",
        slaHours: 6,
        criticality: "Critical",
        riskScore: 85,
    },
    {
        name: "Security Review Audit",
        tiers: "T0+Security",
        agents: ["Security Reviewer"],
        specs: ["Security Playbook"],
        outputs: ["Vulnerability Findings Log", "Injected Input Sanitization Proofs", "Signed Cryptographic Audit Token"],
        color: "indigo",
        desc: "Perform extensive static analysis scans and OWASP threat modeling prior to code promotion.",
        slaHours: 3,
        criticality: "Critical",
        riskScore: 92,
    },
    {
        name: "Performance Tune & Caching",
        tiers: "T0+Performance",
        agents: ["Performance Reviewer"],
        specs: ["Performance Handbook"],
        outputs: ["Synthetic Latency Benchmark", "Edge Cache Control Maps", "Dynamic Code-Splitting Audit"],
        color: "amber",
        desc: "Verify bundle footprints, optimize First Contentful Paint times, and configure cache levels.",
        slaHours: 4,
        criticality: "Medium",
        riskScore: 28,
    },
    {
        name: "Production Release Gate",
        tiers: "T0+Release",
        agents: ["Release Approver"],
        specs: ["Production Readiness"],
        outputs: ["Active Container Diagnostic Log", "Disaster Recovery Rollback Signoff", "Live Production Verification Token"],
        color: "red",
        desc: "Final checkpoint evaluating diagnostic probes, structured logs, and structural signoffs.",
        slaHours: 1,
        criticality: "Critical",
        riskScore: 95,
    },
];
export default function ScenarioExplorer() {
    const [selected, setSelected] = useState(scenarios[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpec, setSelectedSpec] = useState(null);
    // Simulation Playground State
    const [isSimulating, setIsSimulating] = useState(false);
    const [simStep, setSimStep] = useState(0); // 0: Idle, 1: Architect, 2: Implementer, 3: QA/Security, 4: Done
    const [simLogs, setSimLogs] = useState([]);
    // Custom interactive parameters
    const [strictMode, setStrictMode] = useState(true);
    const [forceFailUnitTests, setForceFailUnitTests] = useState(false);
    // Reset simulation when scenario changes
    useEffect(() => {
        setIsSimulating(false);
        setSimStep(0);
        setSimLogs([]);
    }, [selected]);
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
    // Run visual simulator step loop
    const handleStartSimulation = () => {
        setIsSimulating(true);
        setSimStep(1);
        setSimLogs([`[09:00:00] INITIALIZING pipeline: "${selected.name}"`, `[09:00:01] Strict Compliance Mode is: ${strictMode ? "ENABLED (100% Gate requirement)" : "DISABLED (Relaxed warnings)"}`]);
        // Step 1: Architect
        setTimeout(() => {
            setSimStep(2);
            setSimLogs(prev => [
                ...prev,
                `[09:00:03] ARCHITECT agent online: Fetching EEAOS standards.`,
                `[09:00:04] Checked Playbooks: ${selected.specs.join(", ")}`,
                `[09:00:05] Architecture blueprint approved. Handing off to implementer.`
            ]);
        }, 1800);
        // Step 2: Implementer
        setTimeout(() => {
            setSimStep(3);
            setSimLogs(prev => [
                ...prev,
                `[09:00:08] IMPLEMENTER agent online: Applying structural templates.`,
                `[09:00:09] Injecting machine-directives directly into workspace.`,
                `[09:00:10] Code generation completed successfully. Preparing QA and regression validation checks.`
            ]);
        }, 3600);
        // Step 3: Verification (QA / Security)
        setTimeout(() => {
            if (forceFailUnitTests) {
                setSimStep(4);
                setSimLogs(prev => [
                    ...prev,
                    `[09:00:12] SYSTEM FAILURE: Coverage evaluation failed!`,
                    `[09:00:13] ERROR: Coverage fell below 85% statement threshold.`,
                    `[09:00:14] WORKFLOW REJECTED: Compliance standards not met.`
                ]);
                setIsSimulating(false);
            }
            else {
                setSimStep(4);
                setSimLogs(prev => [
                    ...prev,
                    `[09:00:12] VERIFIER agent online: Scanning compliance criteria...`,
                    `[09:00:13] Audit matches all machine criteria specifications.`,
                    `[09:00:14] Artifacts verified: ${selected.outputs.join(", ")}`,
                    `[09:00:15] WORKFLOW SUCCESS: Spec compliant. Ready for production promotion.`
                ]);
                setIsSimulating(false);
            }
        }, 5400);
    };
    const resetSimulation = () => {
        setIsSimulating(false);
        setSimStep(0);
        setSimLogs([]);
    };
    const getCriticalityBadge = (level) => {
        switch (level) {
            case "Critical": return "bg-red-50 text-red-700 border-red-200/60";
            case "High": return "bg-amber-50 text-amber-700 border-amber-200/60";
            default: return "bg-blue-50 text-blue-700 border-blue-200/60";
        }
    };
    const getAccentColor = (color) => {
        switch (color) {
            case "emerald": return "text-emerald-500 bg-emerald-50 border-emerald-200";
            case "rose": return "text-rose-500 bg-rose-50 border-rose-200";
            case "blue": return "text-blue-500 bg-blue-50 border-blue-200";
            case "violet": return "text-[#8b5cf6] bg-[#8b5cf6]/5 border-[#8b5cf6]/10";
            case "indigo": return "text-indigo-500 bg-indigo-50 border-indigo-200";
            case "amber": return "text-amber-500 bg-amber-50 border-amber-200";
            case "red": return "text-red-500 bg-red-50 border-red-200";
            default: return "text-zinc-500 bg-zinc-50 border-zinc-200";
        }
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-zinc-200/60 pb-6", children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow accent", style: { fontWeight: 800, fontSize: "11px", letterSpacing: "0.14em" }, children: "Autonomous Life-Cycle Modeling" }), _jsx("h1", { className: "font-serif text-4xl md:text-5xl font-normal text-zinc-950 mt-1 tracking-tight", children: "Scenario Workspace" }), _jsx("p", { className: "text-zinc-500 text-sm mt-2 max-w-2xl leading-relaxed", children: "Trace the operational blueprint of engineering flows. Simulate agent pipelines, evaluate risks, and audit compliance gates interactively." })] }), _jsxs("div", { className: "flex items-center gap-3 bg-white border border-zinc-200 p-3 rounded-2xl shadow-xs self-start md:self-auto", children: [_jsx(Activity, { className: "w-4 h-4 text-[#d94625] animate-pulse" }), _jsxs("div", { className: "text-left", children: [_jsx("span", { className: "block text-[9px] font-bold text-zinc-400 uppercase tracking-widest", children: "Active Simulator State" }), _jsx("span", { className: "block text-xs font-bold text-zinc-800", children: isSimulating ? `Running Step ${simStep}/3` : simStep === 4 ? "Simulation Complete" : "Ready to Simulate" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [_jsxs("div", { className: "lg:col-span-4 space-y-6", children: [_jsxs("div", { className: "space-y-3 bg-white border border-zinc-200 rounded-2xl p-4 shadow-xs", children: [_jsx("span", { className: "text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-1 block", children: "Search & Filters" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" }), _jsx("input", { type: "text", placeholder: "Filter scenarios, playbooks...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-11 pr-4 py-3 bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200 rounded-xl text-sm placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#d94625]/15 focus:border-[#d94625] transition-all" })] })] }), _jsxs("div", { className: "space-y-3", children: [filteredScenarios.map((s) => {
                                        const isSelected = selected.name === s.name;
                                        return (_jsxs("button", { onClick: () => setSelected(s), className: `w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${isSelected
                                                ? "bg-zinc-950 border-transparent text-white shadow-lg shadow-zinc-950/15"
                                                : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50"}`, children: [isSelected && (_jsx("div", { className: "absolute left-0 top-0 bottom-0 w-1 bg-[#d94625]" })), _jsxs("div", { className: "pr-4 space-y-1.5", children: [_jsx("strong", { className: "block text-sm font-bold tracking-tight", children: s.name }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: `inline-block text-[9px] px-2 py-0.5 rounded-md border font-mono font-bold ${isSelected
                                                                        ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                                                                        : "bg-zinc-50 text-zinc-500 border-zinc-200"}`, children: s.tiers }), _jsxs("span", { className: `text-[9px] font-semibold ${isSelected ? "text-zinc-400" : "text-zinc-500"}`, children: ["Risk: ", s.riskScore, "%"] })] })] }), _jsx("div", { className: `p-2 rounded-xl transition-all ${isSelected ? "bg-zinc-800 text-[#d94625]" : "bg-zinc-50 text-zinc-400 group-hover:text-zinc-800 group-hover:bg-zinc-100"}`, children: _jsx(ChevronRight, { className: "w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" }) })] }, s.name));
                                    }), filteredScenarios.length === 0 && (_jsxs("div", { className: "p-8 text-center bg-white border border-dashed border-zinc-200 rounded-3xl", children: [_jsx(HelpCircle, { className: "w-8 h-8 text-zinc-300 mx-auto mb-2" }), _jsx("p", { className: "text-zinc-500 text-xs font-semibold", children: "No scenarios found." })] }))] }), _jsxs("div", { className: "bg-white border border-zinc-200 rounded-3xl p-5 shadow-xs space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 border-b border-zinc-100 pb-3", children: [_jsx(Sliders, { className: "w-4 h-4 text-zinc-500" }), _jsx("h4", { className: "text-xs font-bold text-zinc-800 uppercase tracking-wider", children: "Simulation Parameters" })] }), _jsxs("div", { className: "space-y-3.5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("span", { className: "block text-xs font-bold text-zinc-800", children: "Strict Compliance Mode" }), _jsx("span", { className: "block text-[10px] text-zinc-400", children: "Enforces standard 100% checks" })] }), _jsx("button", { type: "button", onClick: () => setStrictMode(!strictMode), className: `w-10 h-6 rounded-full transition-colors relative ${strictMode ? "bg-[#d94625]" : "bg-zinc-200"}`, children: _jsx("span", { className: `absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${strictMode ? "translate-x-4" : ""}` }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("span", { className: "block text-xs font-bold text-zinc-800", children: "Simulate QA Failure" }), _jsx("span", { className: "block text-[10px] text-zinc-400", children: "Simulates failed unit tests" })] }), _jsx("button", { type: "button", onClick: () => setForceFailUnitTests(!forceFailUnitTests), className: `w-10 h-6 rounded-full transition-colors relative ${forceFailUnitTests ? "bg-red-500" : "bg-zinc-200"}`, children: _jsx("span", { className: `absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${forceFailUnitTests ? "translate-x-4" : ""}` }) })] })] })] })] }), _jsx("div", { className: "lg:col-span-8 space-y-6", children: _jsxs("div", { className: "bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-xs space-y-8 relative overflow-hidden", children: [_jsxs("div", { className: "absolute right-6 top-6 flex gap-1 opacity-20", children: [_jsx("span", { className: "w-1.5 h-1.5 bg-[#d94625] rounded-full" }), _jsx("span", { className: "w-1.5 h-1.5 bg-[#d94625] rounded-full" }), _jsx("span", { className: "w-1.5 h-1.5 bg-[#d94625] rounded-full" })] }), _jsxs("div", { className: "flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-zinc-100 pb-5", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: `inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md border ${getCriticalityBadge(selected.criticality)}`, children: [selected.criticality, " Level"] }), _jsx("span", { className: "text-zinc-300", children: "\u2022" }), _jsxs("span", { className: "text-xs text-zinc-500 font-mono", children: ["SLA Code: ", selected.slaHours, " Hours"] })] }), _jsx("h2", { className: "font-serif text-2xl md:text-3xl font-normal text-zinc-950 mt-1", children: selected.name }), _jsx("p", { className: "text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xl", children: selected.desc })] }), _jsxs("div", { className: "bg-zinc-50 border border-zinc-200/50 rounded-2xl p-4 text-center shrink-0 w-32 shadow-inner", children: [_jsx("span", { className: "block text-[9px] font-bold text-zinc-400 uppercase tracking-wider", children: "Risk Index" }), _jsxs("span", { className: "block text-2xl font-bold font-mono text-zinc-900 mt-0.5", children: [selected.riskScore, "%"] }), _jsx("span", { className: "block text-[9px] text-zinc-500 font-semibold mt-1", children: selected.riskScore > 70 ? "High Rigor" : "Standard Control" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-xs font-bold text-zinc-800 uppercase tracking-wider px-1", children: "Connected Workspace Pipeline Nodes" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch relative", children: [_jsx("div", { className: "hidden md:block absolute top-12 left-[28%] w-[15%] h-0.5 border-t border-dashed border-zinc-300 z-0" }), _jsx("div", { className: "hidden md:block absolute top-12 left-[62%] w-[15%] h-0.5 border-t border-dashed border-zinc-300 z-0" }), _jsxs("div", { className: `border rounded-2xl p-5 transition-all duration-300 relative z-10 flex flex-col justify-between ${simStep >= 1 ? "bg-zinc-900 border-zinc-800 text-white shadow-md" : "bg-white border-zinc-200 text-zinc-700"}`, children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[10px] font-mono font-bold uppercase tracking-wider text-[#d94625]", children: "Phase 01" }), simStep > 1 ? (_jsx(CheckCircle2, { className: "w-4 h-4 text-[#d94625]" })) : simStep === 1 ? (_jsxs("span", { className: "flex h-2 w-2 relative", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d94625] opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-[#d94625]" })] })) : null] }), _jsxs("div", { className: "space-y-1", children: [_jsx("h5", { className: "text-sm font-bold tracking-tight", children: "System Architecture" }), _jsx("p", { className: `text-[11px] leading-relaxed ${simStep >= 1 ? "text-zinc-400" : "text-zinc-500"}`, children: "Validates design against EEAOS rules before writing any code." })] })] }), _jsxs("div", { className: "mt-4 pt-3 border-t border-dashed border-zinc-200/10 flex items-center gap-1.5 text-[10px] font-mono", children: [_jsx(User, { className: "w-3 h-3 text-[#d94625]" }), _jsx("span", { children: "Architect Agent" })] })] }), _jsxs("div", { className: `border rounded-2xl p-5 transition-all duration-300 relative z-10 flex flex-col justify-between ${simStep >= 2 ? "bg-zinc-900 border-zinc-800 text-white shadow-md" : "bg-white border-zinc-200 text-zinc-700"}`, children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-500", children: "Phase 02" }), simStep > 2 ? (_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" })) : simStep === 2 ? (_jsxs("span", { className: "flex h-2 w-2 relative", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })] })) : null] }), _jsxs("div", { className: "space-y-1", children: [_jsx("h5", { className: "text-sm font-bold tracking-tight", children: "Engineering Run" }), _jsx("p", { className: `text-[11px] leading-relaxed ${simStep >= 2 ? "text-zinc-400" : "text-zinc-500"}`, children: "Decomposes and generates compliant functional pull requests." })] })] }), _jsxs("div", { className: "mt-4 pt-3 border-t border-dashed border-zinc-200/10 flex items-center gap-1.5 text-[10px] font-mono", children: [_jsx(User, { className: "w-3 h-3 text-emerald-500" }), _jsx("span", { children: "Implementer Agent" })] })] }), _jsxs("div", { className: `border rounded-2xl p-5 transition-all duration-300 relative z-10 flex flex-col justify-between ${simStep >= 3 ? "bg-zinc-900 border-zinc-800 text-white shadow-md" : "bg-white border-zinc-200 text-zinc-700"}`, children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[10px] font-mono font-bold uppercase tracking-wider text-blue-500", children: "Phase 03" }), simStep > 3 ? (_jsx(CheckCircle2, { className: `w-4 h-4 ${forceFailUnitTests ? "text-red-500" : "text-blue-500"}` })) : simStep === 3 ? (_jsxs("span", { className: "flex h-2 w-2 relative", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-blue-500" })] })) : null] }), _jsxs("div", { className: "space-y-1", children: [_jsx("h5", { className: "text-sm font-bold tracking-tight", children: "Audit & Verification" }), _jsx("p", { className: `text-[11px] leading-relaxed ${simStep >= 3 ? "text-zinc-400" : "text-zinc-500"}`, children: "Enforces regression tests and strict security checklist controls." })] })] }), _jsxs("div", { className: "mt-4 pt-3 border-t border-dashed border-zinc-200/10 flex items-center gap-1.5 text-[10px] font-mono", children: [_jsx(User, { className: "w-3 h-3 text-blue-500" }), _jsx("span", { children: "QA / Security Agents" })] })] })] })] }), _jsxs("div", { className: "bg-[#faf9f8] border border-zinc-200 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-xs font-bold text-zinc-800 block", children: "Interactive Pipeline Engine" }), _jsx("p", { className: "text-[11px] text-zinc-500 leading-relaxed", children: "Initiate a dry-run simulator session of the EEAOS engine matching your parameter selection." })] }), _jsxs("div", { className: "flex items-center gap-2.5 self-end sm:self-auto", children: [simStep > 0 && (_jsxs("button", { type: "button", onClick: resetSimulation, className: "flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100 text-xs font-bold text-zinc-700 transition-colors", children: [_jsx(RotateCcw, { className: "w-3.5 h-3.5" }), "Reset"] })), _jsxs("button", { type: "button", onClick: handleStartSimulation, disabled: isSimulating, className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md active:scale-95", children: [_jsx(Play, { className: "w-3.5 h-3.5 fill-white text-white" }), isSimulating ? "Simulating..." : simStep > 0 ? "Simulate Again" : "Run Simulator"] })] })] }), simLogs.length > 0 && (_jsxs("div", { className: "bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300", children: [_jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-zinc-900 border-b border-zinc-800", children: [_jsxs("div", { className: "flex items-center gap-2 text-[#d94625]", children: [_jsx(Terminal, { className: "w-4 h-4" }), _jsx("span", { className: "font-mono text-[10px] font-bold tracking-wider uppercase text-zinc-300", children: "Telemetry_Live_Console.log" })] }), _jsxs("span", { className: "flex h-2 w-2 relative shrink-0", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })] })] }), _jsx("div", { className: "p-5 font-mono text-xs space-y-2 max-h-52 overflow-y-auto leading-relaxed", children: simLogs.map((log, index) => {
                                                const isErr = log.includes("FAILURE") || log.includes("ERROR") || log.includes("REJECTED");
                                                const isSucc = log.includes("SUCCESS") || log.includes("approved") || log.includes("compliant");
                                                return (_jsx("div", { className: `font-mono text-left ${isErr ? "text-rose-400" : isSucc ? "text-emerald-400" : "text-zinc-300"}`, children: log }, index));
                                            }) })] })), _jsxs("div", { className: "space-y-4 pt-2 border-t border-zinc-100", children: [_jsxs("div", { className: "flex items-center gap-2 text-zinc-800", children: [_jsx(FileText, { className: "w-4 h-4 text-[#d94625]" }), _jsx("h4", { className: "text-xs font-bold uppercase tracking-wider", children: "Associated Engineering Specifications (Linked)" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: selected.specs.map((specName) => {
                                                const specObj = specDocuments.find((doc) => doc.title.toLowerCase() === specName.toLowerCase() ||
                                                    doc.title.toLowerCase().includes(specName.toLowerCase()) ||
                                                    specName.toLowerCase().includes(doc.title.toLowerCase()));
                                                return (_jsxs("button", { type: "button", onClick: () => openSpecByName(specName), className: "group flex items-start gap-4 p-4 text-left border border-zinc-200/80 hover:border-[#d94625] rounded-xl hover:bg-zinc-50 bg-white transition-all hover:shadow-xs", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[#d94625]/5 text-[#d94625] flex items-center justify-center font-serif text-sm font-bold group-hover:bg-[#d94625] group-hover:text-white transition-all", children: specObj ? specObj.tier : "T1" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("span", { className: "block text-xs font-bold text-zinc-900 group-hover:text-[#d94625] transition-colors truncate", children: specName }), _jsxs("span", { className: "block text-[10px] text-zinc-400 font-mono mt-0.5", children: [specObj ? specObj.id : "EEAOS-SPEC-XXX", " \u2022 Click to View"] })] }), _jsx(ChevronRight, { className: "w-4 h-4 text-zinc-300 group-hover:text-[#d94625] group-hover:translate-x-1 transition-all self-center shrink-0" })] }, specName));
                                            }) })] }), _jsxs("div", { className: "space-y-4 pt-2 border-t border-zinc-100", children: [_jsxs("div", { className: "flex items-center gap-2 text-zinc-800", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }), _jsx("h4", { className: "text-xs font-bold uppercase tracking-wider", children: "Expected Deliverables & Artifact Package" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: selected.outputs.map((output) => (_jsxs("div", { className: "flex items-center gap-3 p-4 border border-emerald-100 bg-emerald-50/10 rounded-2xl hover:border-emerald-200 transition-colors", children: [_jsx(ShieldCheck, { className: "w-4.5 h-4.5 text-emerald-500 shrink-0" }), _jsx("span", { className: "text-xs font-semibold text-zinc-800 leading-tight", children: output })] }, output))) })] })] }) })] }), _jsx(SpecDetailDrawer, { spec: selectedSpec, onClose: () => setSelectedSpec(null) })] }));
}
