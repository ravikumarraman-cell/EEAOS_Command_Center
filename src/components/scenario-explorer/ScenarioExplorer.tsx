import React, { useState } from "react";
import { 
  Compass, 
  ArrowRight, 
  FileText, 
  User, 
  Settings, 
  CheckCircle, 
  Sparkles, 
  Cpu, 
  Workflow, 
  Activity, 
  AlertCircle,
  HelpCircle,
  Search,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { specDocuments, Specification } from "../../specs/specDocuments";
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
  const [selectedSpec, setSelectedSpec] = useState<Specification | null>(null);

  const filteredScenarios = scenarios.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openSpecByName = (name: string) => {
    const matched = specDocuments.find(
      (doc) => doc.title.toLowerCase() === name.toLowerCase()
    );
    if (matched) {
      setSelectedSpec(matched);
    } else {
      // Fallback matching
      const fuzzyMatched = specDocuments.find((doc) =>
        doc.title.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(doc.title.toLowerCase())
      );
      if (fuzzyMatched) {
        setSelectedSpec(fuzzyMatched);
      }
    }
  };

  const getBadgeColor = (color: string) => {
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

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Visual Title Header */}
      <div className="border-b border-zinc-200/50 pb-6">
        <p className="eyebrow accent" style={{ fontWeight: 800, fontSize: "11px", letterSpacing: "0.12em" }}>
          Interactive Governance Modeling
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-normal text-zinc-950 mt-1 tracking-tight">
          Scenario Explorer
        </h1>
        <p className="text-zinc-500 text-sm mt-2 max-w-2xl leading-relaxed">
          Select or filter specific engineering workloads to view how quality gates, playbooks, AI agent roles, and delivery artifacts connect seamlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Scenario Trigger List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Filter engineering scenarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#d94625]/20 focus:border-[#d94625] transition-all"
            />
          </div>

          <div className="space-y-2.5">
            {filteredScenarios.map((s) => {
              const isSelected = selected.name === s.name;
              return (
                <button
                  key={s.name}
                  onClick={() => setSelected(s)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group relative overflow-hidden ${
                    isSelected
                      ? "bg-zinc-900 border-transparent text-white shadow-lg shadow-zinc-900/10"
                      : "bg-white border-zinc-200/80 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d94625]" />
                  )}
                  
                  <div className="pr-4">
                    <strong className="block text-sm font-semibold tracking-tight">{s.name}</strong>
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-sm border font-mono mt-1.5 font-medium ${
                      isSelected 
                        ? "bg-zinc-800 text-zinc-300 border-zinc-700" 
                        : "bg-zinc-100 text-zinc-600 border-zinc-200"
                    }`}>
                      {s.tiers}
                    </span>
                  </div>

                  <ArrowRight 
                    className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                      isSelected 
                        ? "text-[#d94625] translate-x-0" 
                        : "text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-1"
                    }`} 
                  />
                </button>
              );
            })}
            
            {filteredScenarios.length === 0 && (
              <div className="p-8 text-center bg-white border border-dashed border-zinc-200 rounded-2xl">
                <HelpCircle className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <p className="text-zinc-500 text-xs">No matching scenarios found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Flowchart Panel */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Visual Block */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-xs">
            
            {/* Header Description */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-5 mb-6">
              <div className="space-y-1">
                <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${getBadgeColor(selected.color)}`}>
                  Active Workflow Blueprints
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-normal text-zinc-950 mt-2">
                  {selected.name}
                </h2>
                <p className="text-xs text-zinc-400 font-medium">
                  {selected.desc}
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-2 text-xs text-zinc-500 font-mono">
                <span className="text-zinc-400">Sequence Code:</span>
                <span className="font-bold text-zinc-800">{selected.tiers}</span>
              </div>
            </div>

            {/* Logical Connection Diagram (Zero Cognitive Load) */}
            <div className="space-y-8">
              
              {/* Box 1: Compliance Standards (Interactive Checklists link) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#d94625]">
                  <FileText className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                    Governing Compliance Playbooks (Linked Docs)
                  </h4>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed pl-1">
                  Click any standard below to instantly slide open its live, dual-view criteria, interactive audit checkboxes, and machine compliance validation directives:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {selected.specs.map((specName) => {
                    const specObj = specDocuments.find(
                      (doc) => doc.title.toLowerCase() === specName.toLowerCase() ||
                      doc.title.toLowerCase().includes(specName.toLowerCase()) ||
                      specName.toLowerCase().includes(doc.title.toLowerCase())
                    );
                    
                    return (
                      <button
                        key={specName}
                        type="button"
                        onClick={() => openSpecByName(specName)}
                        className="group flex items-start gap-4 p-4 text-left border border-zinc-200 hover:border-[#d94625] rounded-xl hover:bg-[#faf9f8] transition-all bg-white hover:shadow-xs"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#d94625]/5 text-[#d94625] flex items-center justify-center font-serif text-sm font-bold group-hover:bg-[#d94625] group-hover:text-white transition-all">
                          {specObj ? specObj.tier : "T1"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-xs font-bold text-zinc-900 group-hover:text-[#d94625] transition-colors truncate">
                            {specName}
                          </span>
                          <span className="block text-[10px] text-zinc-400 font-mono mt-0.5">
                            {specObj ? specObj.id : "EEAOS-SPEC-XXX"} • Click to Audit
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#d94625] group-hover:translate-x-1 transition-all self-center" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Box 2: Roster */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-blue-500">
                  <Cpu className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                    Assigned Autonomous AI Engineering Agents
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selected.agents.map((agent) => (
                    <div key={agent} className="flex items-center gap-3 p-3.5 bg-zinc-50/50 border border-zinc-200/60 rounded-xl hover:bg-zinc-50 transition-all">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-zinc-800">{agent} Agent</span>
                        <span className="block text-[10px] text-zinc-400 font-mono">Telemetry: Online</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 3: Deliverables */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-emerald-500">
                  <CheckCircle className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                    Mandated Artifact Package & Verification Evidence
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selected.outputs.map((output) => (
                    <div key={output} className="flex items-center gap-3 p-3.5 border border-emerald-100 bg-emerald-50/10 rounded-xl">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs font-semibold text-zinc-800 leading-snug">{output}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Slide-over Drawer for Specifications detail checks */}
      <SpecDetailDrawer
        spec={selectedSpec}
        onClose={() => setSelectedSpec(null)}
      />

    </div>
  );
}
