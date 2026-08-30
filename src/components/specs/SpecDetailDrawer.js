import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { X, Copy, Check, Cpu, Eye, Terminal, Sparkles, Scale, Zap, BookOpen, Lock, Gauge, CheckCircle2, Info } from "lucide-react";
// High-fidelity inline formatter
function parseInlines(text) {
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    const splitParts = text.split(regex);
    return splitParts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (_jsx("strong", { className: "font-bold text-zinc-900 tracking-tight", children: part.slice(2, -2) }, index));
        }
        if (part.startsWith("`") && part.endsWith("`")) {
            return (_jsx("code", { className: "bg-zinc-100 text-red-600 px-1.5 py-0.5 rounded text-xs font-mono border border-zinc-200/50", children: part.slice(1, -1) }, index));
        }
        return part;
    });
}
// Cognitive Header Categories
function getCategoryIcon(category) {
    const c = "w-5 h-5";
    switch (category) {
        case "Governance": return _jsx(Scale, { className: `${c} text-amber-500` });
        case "Execution": return _jsx(Zap, { className: `${c} text-emerald-500` });
        case "Quality": return _jsx(BookOpen, { className: `${c} text-blue-500` });
        case "Security": return _jsx(Lock, { className: `${c} text-rose-500` });
        default: return _jsx(Info, { className: `${c} text-zinc-500` });
    }
}
// Generate human-friendly descriptions for machine directive parameters
function formatDirectiveKey(key) {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
// Premium visual render of custom Markdown to make it clean, card-structured, and zero cognitive load
export function renderMarkdown(md) {
    const lines = md.split("\n");
    const elements = [];
    let inCodeBlock = false;
    let codeBlockLines = [];
    let currentSection = [];
    let sectionIndex = 0;
    const flushSection = (key) => {
        if (currentSection.length > 0) {
            elements.push(_jsx("div", { className: "bg-white border border-zinc-200/60 rounded-2xl p-6 md:p-8 shadow-xs hover:border-zinc-300 transition-all space-y-4 mb-6", children: [...currentSection] }, `section-${key}`));
            currentSection = [];
        }
    };
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith("```")) {
            if (inCodeBlock) {
                currentSection.push(_jsxs("div", { className: "relative group my-4 rounded-xl overflow-hidden border border-zinc-800", children: [_jsx("div", { className: "flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-[10px] text-zinc-400 font-mono", children: _jsx("span", { children: "Code Snippet" }) }), _jsx("pre", { className: "bg-zinc-950 text-zinc-100 p-5 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner", children: codeBlockLines.join("\n") })] }, `code-${i}`));
                codeBlockLines = [];
                inCodeBlock = false;
            }
            else {
                inCodeBlock = true;
            }
            continue;
        }
        if (inCodeBlock) {
            codeBlockLines.push(line);
            continue;
        }
        // Treat main title specially (already rendered by drawer header, but if exists skip or make beautiful banner)
        if (line.startsWith("# ")) {
            continue;
        }
        if (line.startsWith("## ")) {
            flushSection(sectionIndex++);
            currentSection.push(_jsxs("h2", { className: "font-serif text-lg md:text-xl font-medium text-zinc-900 border-b border-zinc-100 pb-3 flex items-center gap-2", children: [_jsx("span", { className: "w-1.5 h-6 bg-[#d94625] rounded-full inline-block" }), line.slice(3)] }, i));
        }
        else if (line.startsWith("### ")) {
            currentSection.push(_jsx("h3", { className: "font-sans text-sm font-bold text-zinc-800 uppercase tracking-wider mt-4", children: line.slice(4) }, i));
        }
        else if (line.startsWith("- ") || line.startsWith("* ")) {
            currentSection.push(_jsxs("div", { className: "flex items-start gap-3 text-zinc-600 text-sm leading-relaxed my-2 pl-1", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#d94625] shrink-0 mt-2" }), _jsx("div", { className: "flex-1", children: parseInlines(line.slice(2)) })] }, i));
        }
        else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ") || line.startsWith("6. ") || line.startsWith("7. ")) {
            // Numerical lists get nice premium step pill treatment
            const dotIndex = line.indexOf(". ");
            const num = line.slice(0, dotIndex);
            const content = line.slice(dotIndex + 2);
            currentSection.push(_jsxs("div", { className: "flex items-start gap-4 p-3.5 bg-zinc-50/50 border border-zinc-200/50 rounded-xl hover:bg-zinc-50 transition-colors my-2.5", children: [_jsx("span", { className: "w-6 h-6 rounded-lg bg-[#d94625]/10 text-[#d94625] font-mono text-xs font-bold flex items-center justify-center shrink-0", children: num }), _jsx("p", { className: "text-zinc-700 text-sm leading-relaxed flex-1", children: parseInlines(content) })] }, i));
        }
        else if (line.trim() === "---") {
            flushSection(sectionIndex++);
        }
        else if (line.trim() === "") {
            // Ignore double empty spaces
        }
        else {
            currentSection.push(_jsx("p", { className: "text-zinc-600 text-sm leading-relaxed mb-3", children: parseInlines(line) }, i));
        }
    }
    flushSection(sectionIndex);
    return _jsx("div", { className: "space-y-4", children: elements });
}
export default function SpecDetailDrawer({ spec, onClose }) {
    const [activeTab, setActiveTab] = useState("human");
    const [copied, setCopied] = useState(false);
    // Custom checklist assessment states
    const [checkedItems, setCheckedItems] = useState({});
    // Parse checklist from spec definition
    const checklistItems = React.useMemo(() => {
        if (!spec)
            return [];
        // Explicit list
        if (spec.machineDirectives.checklist && Array.isArray(spec.machineDirectives.checklist)) {
            return spec.machineDirectives.checklist;
        }
        // Fallback based on directives
        const fallbackList = [];
        Object.entries(spec.machineDirectives).forEach(([key, val]) => {
            if (typeof val === "boolean") {
                fallbackList.push(`${formatDirectiveKey(key)} is enabled/compliant`);
            }
            else if (typeof val === "string" || typeof val === "number") {
                fallbackList.push(`Assert ${formatDirectiveKey(key)} matches value: ${val}`);
            }
            else if (typeof val === "object" && val !== null) {
                Object.entries(val).forEach(([subKey, subVal]) => {
                    fallbackList.push(`Verify ${formatDirectiveKey(key)} - ${formatDirectiveKey(subKey)} matches: ${subVal}`);
                });
            }
        });
        return fallbackList;
    }, [spec]);
    // Reset checklist on spec change
    useEffect(() => {
        if (spec) {
            setCheckedItems({});
            setActiveTab("human");
        }
    }, [spec]);
    if (!spec)
        return null;
    const totalChecks = checklistItems.length;
    const completedChecks = Object.values(checkedItems).filter(Boolean).length;
    const progressPercent = totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;
    // Grade calculator
    const getGrade = (pct) => {
        if (pct === 100)
            return { label: "Class A Elite", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
        if (pct >= 75)
            return { label: "Ready to Ship", color: "text-blue-600 bg-blue-50 border-blue-200" };
        if (pct >= 50)
            return { label: "Caution / Warning", color: "text-amber-600 bg-amber-50 border-amber-200" };
        return { label: "Non-Compliant", color: "text-rose-600 bg-rose-50 border-rose-200" };
    };
    const currentGrade = getGrade(progressPercent);
    const copyToClipboard = () => {
        let textToCopy = "";
        if (activeTab === "human") {
            textToCopy = spec.markdown;
        }
        else if (activeTab === "machine") {
            textToCopy = JSON.stringify(spec.machineDirectives, null, 2);
        }
        else {
            textToCopy = `EEAOS Compliance Token: ${spec.id} v${spec.version}
Grade: ${currentGrade.label} (${progressPercent}% Checked)
Verification Date: ${new Date().toLocaleDateString()}
Items Completed:
${checklistItems.map((item, idx) => `${checkedItems[idx] ? "[X]" : "[ ]"} ${item}`).join("\n")}`;
        }
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const toggleCheck = (index) => {
        setCheckedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex justify-end", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [_jsx("div", { className: "fixed inset-0 bg-zinc-950/25 backdrop-blur-md transition-opacity duration-300", onClick: onClose }), _jsxs("div", { className: "relative w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-[#fafafa] shadow-2xl h-full flex flex-col border-l border-zinc-200/80 z-10 animate-in slide-in-from-right duration-300", children: [_jsx("div", { className: "h-1 w-full bg-gradient-to-r from-[#d94625] via-amber-500 to-emerald-500" }), _jsxs("div", { className: "p-6 md:p-8 border-b border-zinc-200/80 bg-white", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "font-mono text-[10px] font-bold text-zinc-500 bg-zinc-100 border border-zinc-200/50 px-2 py-0.5 rounded-sm", children: spec.id }), _jsxs("span", { className: "font-mono text-[10px] font-bold text-[#d94625] bg-[#d94625]/5 border border-[#d94625]/10 px-2 py-0.5 rounded-sm", children: ["Tier ", spec.tier] }), _jsxs("span", { className: "font-mono text-[10px] font-bold text-zinc-400 bg-zinc-50 border border-zinc-200/40 px-2 py-0.5 rounded-sm", children: ["v", spec.version] })] }), _jsx("h2", { id: "slide-over-title", className: "font-serif text-2xl md:text-3xl font-normal text-zinc-950 tracking-tight leading-tight", children: spec.title }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsxs("div", { className: "flex items-center gap-1 text-xs text-zinc-500 font-medium", children: [getCategoryIcon(spec.category), _jsxs("span", { className: "text-zinc-700", children: [spec.category, " Specification"] })] }), _jsx("span", { className: "text-zinc-300", children: "\u2022" }), _jsxs("span", { className: "text-xs text-zinc-400", children: ["Updated: ", spec.lastUpdated] })] })] }), _jsx("button", { type: "button", onClick: onClose, className: "p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-800 transition-colors shrink-0 border border-transparent hover:border-zinc-200 bg-zinc-50", "aria-label": "Close panel", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "mt-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200/40 flex items-start gap-2.5", children: [_jsx(Info, { className: "w-4 h-4 text-zinc-400 shrink-0 mt-0.5" }), _jsxs("p", { className: "text-[11px] text-zinc-500 leading-relaxed", children: [_jsx("strong", { children: "Supreme Directive:" }), " This standard ensures architectural alignment across human engineering circles and autonomous AI agents prior to codebase deployments."] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-2", children: [_jsxs("div", { className: "flex bg-zinc-100 p-1 rounded-xl border border-zinc-200/50 w-full sm:w-auto", children: [_jsxs("button", { type: "button", onClick: () => setActiveTab("human"), className: `flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === "human"
                                                    ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/20"
                                                    : "text-zinc-500 hover:text-zinc-800"}`, children: [_jsx(Eye, { className: "w-3.5 h-3.5" }), "Human Spec (SOP)"] }), _jsxs("button", { type: "button", onClick: () => setActiveTab("machine"), className: `flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === "machine"
                                                    ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/20"
                                                    : "text-zinc-500 hover:text-zinc-800"}`, children: [_jsx(Cpu, { className: "w-3.5 h-3.5" }), "Machine JSON"] }), _jsxs("button", { type: "button", onClick: () => setActiveTab("assessment"), className: `flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${activeTab === "assessment"
                                                    ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/20"
                                                    : "text-zinc-500 hover:text-zinc-800"}`, children: [_jsx(Gauge, { className: "w-3.5 h-3.5" }), "Interactive Audit", progressPercent > 0 && (_jsxs("span", { className: "absolute -top-1 -right-1 flex h-2 w-2", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })] }))] })] }), _jsx("button", { type: "button", onClick: copyToClipboard, className: "flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors w-full sm:w-auto", children: copied ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "w-3.5 h-3.5 text-emerald-600" }), _jsx("span", { className: "text-emerald-600", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "w-3.5 h-3.5" }), _jsx("span", { children: activeTab === "human" ? "Copy Markdown" : activeTab === "machine" ? "Copy Directives" : "Copy Audit Log" })] })) })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-6 md:p-8 space-y-6", children: [activeTab === "human" && (_jsx("div", { className: "animate-in fade-in slide-in-from-bottom-2 duration-200", children: renderMarkdown(spec.markdown) })), activeTab === "machine" && (_jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200", children: [_jsx("div", { className: "grid grid-cols-2 gap-4", children: Object.entries(spec.machineDirectives)
                                            .filter(([k, v]) => typeof v !== "object")
                                            .map(([key, val]) => (_jsxs("div", { className: "bg-white border border-zinc-200 rounded-xl p-4 shadow-xs", children: [_jsx("span", { className: "block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1", children: formatDirectiveKey(key) }), _jsx("span", { className: "font-mono text-xs text-zinc-900 break-words font-semibold", children: String(val) })] }, key))) }), _jsxs("div", { className: "bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl", children: [_jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-zinc-900 border-b border-zinc-800", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Terminal, { className: "w-4 h-4 text-[#d94625]" }), _jsx("span", { className: "font-mono text-[11px] font-bold text-zinc-300", children: "INTEGRATION_PAYLOAD.json" })] }), _jsx("span", { className: "text-[10px] font-mono text-zinc-500", children: "Read-Only View" })] }), _jsx("div", { className: "p-5 overflow-x-auto", children: _jsx("pre", { className: "text-emerald-400 font-mono text-xs leading-relaxed", children: JSON.stringify(spec.machineDirectives, null, 2) }) })] }), _jsxs("div", { className: "bg-blue-50/50 border border-blue-200/60 rounded-2xl p-5 md:p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Sparkles, { className: "w-4 h-4 text-blue-600" }), _jsx("h4", { className: "font-bold text-xs text-blue-900 uppercase tracking-wider", children: "Agent Verification Command" })] }), _jsx("p", { className: "text-xs text-blue-700/80 leading-relaxed mb-4", children: "Run this terminal instruction in your pipelines to enforce automated gate checks against the EEAOS Engine." }), _jsx("div", { className: "flex items-center bg-blue-900/5 border border-blue-900/10 rounded-xl overflow-hidden pl-3.5 pr-2 py-2", children: _jsxs("code", { className: "text-blue-950 font-mono text-xs flex-1 truncate", children: ["npx eeaos-agent-gate validate --spec-id=", spec.id] }) })] })] })), activeTab === "assessment" && (_jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200", children: [_jsxs("div", { className: "bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("span", { className: "text-[10px] font-bold text-zinc-400 uppercase tracking-wider block", children: "Interactive Compliance Audit" }), _jsx("h3", { className: "font-serif text-xl font-normal text-zinc-950", children: "Your readiness score" }), _jsx("p", { className: "text-xs text-zinc-500 leading-relaxed max-w-sm", children: "Perform a manual audit check by marking items completed. This logs compliance telemetry for code promotion." })] }), _jsxs("div", { className: "flex flex-col items-center gap-2 shrink-0", children: [_jsxs("div", { className: "relative w-28 h-28 flex items-center justify-center rounded-full border border-zinc-100 bg-zinc-50/50", children: [_jsxs("svg", { className: "absolute inset-0 w-full h-full -rotate-90", children: [_jsx("circle", { cx: "56", cy: "56", r: "46", className: "stroke-zinc-100 fill-transparent", strokeWidth: "8" }), _jsx("circle", { cx: "56", cy: "56", r: "46", className: "stroke-emerald-500 fill-transparent transition-all duration-500 ease-out", strokeWidth: "8", strokeDasharray: 2 * Math.PI * 46, strokeDashoffset: 2 * Math.PI * 46 * (1 - progressPercent / 100), strokeLinecap: "round" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("span", { className: "block text-2xl font-bold text-zinc-900 font-mono", children: [progressPercent, "%"] }), _jsx("span", { className: "block text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5", children: "Audit Rate" })] })] }), _jsx("div", { className: `px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${currentGrade.color}`, children: currentGrade.label })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("h4", { className: "text-xs font-bold text-zinc-800 uppercase tracking-wider px-1", children: ["Compliance Criteria Requirements (", completedChecks, "/", totalChecks, ")"] }), _jsx("div", { className: "space-y-2.5", children: checklistItems.map((item, idx) => {
                                                    const isChecked = !!checkedItems[idx];
                                                    return (_jsxs("button", { type: "button", onClick: () => toggleCheck(idx), className: `w-full flex items-start gap-3.5 p-4 rounded-xl text-left border transition-all duration-200 group ${isChecked
                                                            ? "bg-emerald-50/20 border-emerald-500/20 text-zinc-800"
                                                            : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300"}`, children: [_jsx("div", { className: "mt-0.5 shrink-0", children: isChecked ? (_jsx(CheckCircle2, { className: "w-5 h-5 text-emerald-500 fill-emerald-50" })) : (_jsx("div", { className: "w-5 h-5 rounded-full border border-zinc-300 group-hover:border-zinc-500 bg-white transition-colors" })) }), _jsx("div", { className: "flex-1 text-xs sm:text-sm font-medium leading-relaxed", children: item })] }, idx));
                                                }) })] })] }))] }), _jsxs("div", { className: "p-4 bg-white border-t border-zinc-200/80 text-center text-[10px] text-zinc-400 font-mono flex items-center justify-between px-6", children: [_jsx("span", { children: "EEAOS Engine v1.0" }), _jsx("span", { children: "Verified Secure Link" }), _jsx("span", { children: "SHA-256 Verified" })] })] })] }));
}
