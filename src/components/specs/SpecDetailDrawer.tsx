import React, { useState, useEffect } from "react";
import { 
  X, 
  Copy, 
  Check, 
  Cpu, 
  Eye, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  Zap, 
  BookOpen, 
  Lock, 
  Gauge, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Info
} from "lucide-react";
import { Specification } from "../../specs/specDocuments";

// High-fidelity inline formatter
function parseInlines(text: string): React.ReactNode {
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const splitParts = text.split(regex);
  
  return splitParts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-zinc-900 tracking-tight">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="bg-zinc-100 text-red-600 px-1.5 py-0.5 rounded text-xs font-mono border border-zinc-200/50">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// Cognitive Header Categories
function getCategoryIcon(category: string) {
  const c = "w-5 h-5";
  switch (category) {
    case "Governance": return <Scale className={`${c} text-amber-500`} />;
    case "Execution": return <Zap className={`${c} text-emerald-500`} />;
    case "Quality": return <BookOpen className={`${c} text-blue-500`} />;
    case "Security": return <Lock className={`${c} text-rose-500`} />;
    default: return <Info className={`${c} text-zinc-500`} />;
  }
}

// Generate human-friendly descriptions for machine directive parameters
function formatDirectiveKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Premium visual render of custom Markdown to make it clean, card-structured, and zero cognitive load
export function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let currentSection: React.ReactNode[] = [];
  let sectionIndex = 0;

  const flushSection = (key: number) => {
    if (currentSection.length > 0) {
      elements.push(
        <div key={`section-${key}`} className="bg-white border border-zinc-200/60 rounded-2xl p-6 md:p-8 shadow-xs hover:border-zinc-300 transition-all space-y-4 mb-6">
          {[...currentSection]}
        </div>
      );
      currentSection = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        currentSection.push(
          <div key={`code-${i}`} className="relative group my-4 rounded-xl overflow-hidden border border-zinc-800">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-[10px] text-zinc-400 font-mono">
              <span>Code Snippet</span>
            </div>
            <pre className="bg-zinc-950 text-zinc-100 p-5 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
              {codeBlockLines.join("\n")}
            </pre>
          </div>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
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
      currentSection.push(
        <h2 key={i} className="font-serif text-lg md:text-xl font-medium text-zinc-900 border-b border-zinc-100 pb-3 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#d94625] rounded-full inline-block" />
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      currentSection.push(
        <h3 key={i} className="font-sans text-sm font-bold text-zinc-800 uppercase tracking-wider mt-4">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      currentSection.push(
        <div key={i} className="flex items-start gap-3 text-zinc-600 text-sm leading-relaxed my-2 pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d94625] shrink-0 mt-2" />
          <div className="flex-1">{parseInlines(line.slice(2))}</div>
        </div>
      );
    } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ") || line.startsWith("6. ") || line.startsWith("7. ")) {
      // Numerical lists get nice premium step pill treatment
      const dotIndex = line.indexOf(". ");
      const num = line.slice(0, dotIndex);
      const content = line.slice(dotIndex + 2);
      currentSection.push(
        <div key={i} className="flex items-start gap-4 p-3.5 bg-zinc-50/50 border border-zinc-200/50 rounded-xl hover:bg-zinc-50 transition-colors my-2.5">
          <span className="w-6 h-6 rounded-lg bg-[#d94625]/10 text-[#d94625] font-mono text-xs font-bold flex items-center justify-center shrink-0">
            {num}
          </span>
          <p className="text-zinc-700 text-sm leading-relaxed flex-1">
            {parseInlines(content)}
          </p>
        </div>
      );
    } else if (line.trim() === "---") {
      flushSection(sectionIndex++);
    } else if (line.trim() === "") {
      // Ignore double empty spaces
    } else {
      currentSection.push(
        <p key={i} className="text-zinc-600 text-sm leading-relaxed mb-3">
          {parseInlines(line)}
        </p>
      );
    }
  }

  flushSection(sectionIndex);

  return <div className="space-y-4">{elements}</div>;
}

interface SpecDetailDrawerProps {
  spec: Specification | null;
  onClose: () => void;
}

export default function SpecDetailDrawer({ spec, onClose }: SpecDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<"human" | "machine" | "assessment">("human");
  const [copied, setCopied] = useState(false);
  
  // Custom checklist assessment states
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Parse checklist from spec definition
  const checklistItems = React.useMemo(() => {
    if (!spec) return [];
    
    // Explicit list
    if (spec.machineDirectives.checklist && Array.isArray(spec.machineDirectives.checklist)) {
      return spec.machineDirectives.checklist;
    }
    
    // Fallback based on directives
    const fallbackList: string[] = [];
    Object.entries(spec.machineDirectives).forEach(([key, val]) => {
      if (typeof val === "boolean") {
        fallbackList.push(`${formatDirectiveKey(key)} is enabled/compliant`);
      } else if (typeof val === "string" || typeof val === "number") {
        fallbackList.push(`Assert ${formatDirectiveKey(key)} matches value: ${val}`);
      } else if (typeof val === "object" && val !== null) {
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

  if (!spec) return null;

  const totalChecks = checklistItems.length;
  const completedChecks = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;

  // Grade calculator
  const getGrade = (pct: number) => {
    if (pct === 100) return { label: "Class A Elite", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (pct >= 75) return { label: "Ready to Ship", color: "text-blue-600 bg-blue-50 border-blue-200" };
    if (pct >= 50) return { label: "Caution / Warning", color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { label: "Non-Compliant", color: "text-rose-600 bg-rose-50 border-rose-200" };
  };

  const currentGrade = getGrade(progressPercent);

  const copyToClipboard = () => {
    let textToCopy = "";
    if (activeTab === "human") {
      textToCopy = spec.markdown;
    } else if (activeTab === "machine") {
      textToCopy = JSON.stringify(spec.machineDirectives, null, 2);
    } else {
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

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Dynamic Glass Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-zinc-950/25 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Slide-over panel: Premium container with border accent */}
      <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-[#fafafa] shadow-2xl h-full flex flex-col border-l border-zinc-200/80 z-10 animate-in slide-in-from-right duration-300">
        
        {/* Upper Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#d94625] via-amber-500 to-emerald-500" />

        {/* Header Block: Highly organized, clean, zero cognitive load */}
        <div className="p-6 md:p-8 border-b border-zinc-200/80 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-zinc-500 bg-zinc-100 border border-zinc-200/50 px-2 py-0.5 rounded-sm">
                  {spec.id}
                </span>
                <span className="font-mono text-[10px] font-bold text-[#d94625] bg-[#d94625]/5 border border-[#d94625]/10 px-2 py-0.5 rounded-sm">
                  Tier {spec.tier}
                </span>
                <span className="font-mono text-[10px] font-bold text-zinc-400 bg-zinc-50 border border-zinc-200/40 px-2 py-0.5 rounded-sm">
                  v{spec.version}
                </span>
              </div>
              
              <h2 id="slide-over-title" className="font-serif text-2xl md:text-3xl font-normal text-zinc-950 tracking-tight leading-tight">
                {spec.title}
              </h2>
              
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-xs text-zinc-500 font-medium">
                  {getCategoryIcon(spec.category)}
                  <span className="text-zinc-700">{spec.category} Specification</span>
                </div>
                <span className="text-zinc-300">•</span>
                <span className="text-xs text-zinc-400">Updated: {spec.lastUpdated}</span>
              </div>
            </div>

            <button 
              type="button" 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-800 transition-colors shrink-0 border border-transparent hover:border-zinc-200 bg-zinc-50"
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cognitive Brief: Explains the objective of the spec immediately */}
          <div className="mt-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200/40 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              <strong>Supreme Directive:</strong> This standard ensures architectural alignment across human engineering circles and autonomous AI agents prior to codebase deployments.
            </p>
          </div>

          {/* Custom Tabs with Slider Look */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-2">
            <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200/50 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab("human")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "human"
                    ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/20"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Human Spec (SOP)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("machine")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "machine"
                    ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/20"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Machine JSON
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("assessment")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  activeTab === "assessment"
                    ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/20"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                Interactive Audit
                {progressPercent > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors w-full sm:w-auto"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>
                    {activeTab === "human" ? "Copy Markdown" : activeTab === "machine" ? "Copy Directives" : "Copy Audit Log"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Spec Content Area with comfortable scroll */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {activeTab === "human" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
              {renderMarkdown(spec.markdown)}
            </div>
          )}

          {activeTab === "machine" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
              
              {/* Dynamic Key Metadata Cards */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(spec.machineDirectives)
                  .filter(([k, v]) => typeof v !== "object")
                  .map(([key, val]) => (
                    <div key={key} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs">
                      <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">
                        {formatDirectiveKey(key)}
                      </span>
                      <span className="font-mono text-xs text-zinc-900 break-words font-semibold">
                        {String(val)}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Code Panel */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-5 py-3 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#d94625]" />
                    <span className="font-mono text-[11px] font-bold text-zinc-300">
                      INTEGRATION_PAYLOAD.json
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Read-Only View</span>
                </div>
                <div className="p-5 overflow-x-auto">
                  <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
                    {JSON.stringify(spec.machineDirectives, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Command box */}
              <div className="bg-blue-50/50 border border-blue-200/60 rounded-2xl p-5 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h4 className="font-bold text-xs text-blue-900 uppercase tracking-wider">
                    Agent Verification Command
                  </h4>
                </div>
                <p className="text-xs text-blue-700/80 leading-relaxed mb-4">
                  Run this terminal instruction in your pipelines to enforce automated gate checks against the EEAOS Engine.
                </p>
                <div className="flex items-center bg-blue-900/5 border border-blue-900/10 rounded-xl overflow-hidden pl-3.5 pr-2 py-2">
                  <code className="text-blue-950 font-mono text-xs flex-1 truncate">
                    npx eeaos-agent-gate validate --spec-id={spec.id}
                  </code>
                </div>
              </div>
            </div>
          )}

          {activeTab === "assessment" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
              
              {/* Compliance score widget */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Interactive Compliance Audit
                  </span>
                  <h3 className="font-serif text-xl font-normal text-zinc-950">
                    Your readiness score
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                    Perform a manual audit check by marking items completed. This logs compliance telemetry for code promotion.
                  </p>
                </div>

                {/* Score Dial */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="relative w-28 h-28 flex items-center justify-center rounded-full border border-zinc-100 bg-zinc-50/50">
                    
                    {/* SVG progress circle */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="46" 
                        className="stroke-zinc-100 fill-transparent" 
                        strokeWidth="8"
                      />
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="46" 
                        className="stroke-emerald-500 fill-transparent transition-all duration-500 ease-out" 
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 46}
                        strokeDashoffset={2 * Math.PI * 46 * (1 - progressPercent / 100)}
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="text-center">
                      <span className="block text-2xl font-bold text-zinc-900 font-mono">
                        {progressPercent}%
                      </span>
                      <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                        Audit Rate
                      </span>
                    </div>
                  </div>
                  
                  {/* Readiness tag */}
                  <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${currentGrade.color}`}>
                    {currentGrade.label}
                  </div>
                </div>
              </div>

              {/* Checklist Group */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider px-1">
                  Compliance Criteria Requirements ({completedChecks}/{totalChecks})
                </h4>
                
                <div className="space-y-2.5">
                  {checklistItems.map((item, idx) => {
                    const isChecked = !!checkedItems[idx];
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleCheck(idx)}
                        className={`w-full flex items-start gap-3.5 p-4 rounded-xl text-left border transition-all duration-200 group ${
                          isChecked 
                            ? "bg-emerald-50/20 border-emerald-500/20 text-zinc-800" 
                            : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-zinc-300 group-hover:border-zinc-500 bg-white transition-colors" />
                          )}
                        </div>
                        <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                          {item}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Unified elegant footer with telemetry stats */}
        <div className="p-4 bg-white border-t border-zinc-200/80 text-center text-[10px] text-zinc-400 font-mono flex items-center justify-between px-6">
          <span>EEAOS Engine v1.0</span>
          <span>Verified Secure Link</span>
          <span>SHA-256 Verified</span>
        </div>
      </div>
    </div>
  );
}
