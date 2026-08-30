import React, { useState } from "react";
import { 
  ArrowRight, 
  FileText, 
  User, 
  CheckCircle2, 
  Cpu, 
  HelpCircle,
  Search,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Play,
  Terminal,
  Clock,
  Layers,
  Wrench,
  Sparkles
} from "lucide-react";
import { specDocuments, Specification } from "../../specs/specDocuments";
import SpecDetailDrawer from "../specs/SpecDetailDrawer";

interface Scenario {
  name: string;
  tiers: string;
  agents: {
    role: string;
    description: string;
    tools: string[];
  }[];
  specs: string[];
  outputs: string[];
  color: string;
  desc: string;
  slaHours: number;
  criticality: "High" | "Medium" | "Critical";
}

const scenarios: Scenario[] = [
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
  const [selected, setSelected] = useState<Scenario>(scenarios[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpec, setSelectedSpec] = useState<Specification | null>(null);

  const filteredScenarios = scenarios.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tiers.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openSpecByName = (name: string) => {
    const matched = specDocuments.find(
      (doc) => doc.title.toLowerCase() === name.toLowerCase()
    );
    if (matched) {
      setSelectedSpec(matched);
    } else {
      const fuzzyMatched = specDocuments.find((doc) =>
        doc.title.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(doc.title.toLowerCase())
      );
      if (fuzzyMatched) {
        setSelectedSpec(fuzzyMatched);
      }
    }
  };

  const getCriticalityBadge = (level: string) => {
    switch (level) {
      case "Critical": return "bg-rose-50 text-rose-700 border-rose-200/60";
      case "High": return "bg-amber-50 text-amber-700 border-amber-200/60";
      default: return "bg-blue-50 text-blue-700 border-blue-200/60";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Visual Title Header */}
      <div className="border-b border-zinc-200/60 pb-6">
        <p className="eyebrow accent" style={{ fontWeight: 800, fontSize: "11px", letterSpacing: "0.14em" }}>
          AI Agent Studio
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-normal text-zinc-950 mt-1 tracking-tight">
          Scenario Explorer
        </h1>
        <p className="text-zinc-500 text-sm mt-2 max-w-2xl leading-relaxed">
          Select an engineering scenario to see the governing playbooks, assigned autonomous agents, and expected deliverables mapped out like an AI Agent Studio workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Minimalist Scenario Selector (AI Agent Studio Style) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search engineering scenarios..."
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
                      ? "bg-zinc-900 border-transparent text-white shadow-md shadow-zinc-900/10"
                      : "bg-white border-zinc-200/80 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d94625]" />
                  )}
                  
                  <div className="pr-4 space-y-1">
                    <strong className="block text-xs font-bold tracking-tight uppercase tracking-wider">{s.name}</strong>
                    <span className={`inline-block text-[9px] px-2 py-0.5 rounded-sm border font-mono font-medium ${
                      isSelected 
                        ? "bg-zinc-800 text-zinc-300 border-zinc-700" 
                        : "bg-zinc-100 text-zinc-500 border-zinc-200"
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
                <p className="text-zinc-500 text-xs font-semibold">No matching scenarios found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Agent Studio Workspace View */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Visual Profile */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-8">
            
            {/* Header Block */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-100 pb-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-sm border ${getCriticalityBadge(selected.criticality)}`}>
                    {selected.criticality} Priority
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs text-zinc-500 font-mono">SLA: {selected.slaHours} Hours</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-normal text-zinc-950">
                  {selected.name}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xl">
                  {selected.desc}
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-2 text-xs text-zinc-500 font-mono self-start sm:self-auto shrink-0">
                <span className="text-zinc-400">Tiers:</span>
                <span className="font-bold text-zinc-800">{selected.tiers}</span>
              </div>
            </div>

            {/* Two-Column Workspace Layout (AI Agent Studio Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-100">
              
              {/* Column 1: AI Agent Roster */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-800 pb-1">
                  <Cpu className="w-4 h-4 text-[#d94625]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Assigned Autonomous AI Agents
                  </h4>
                </div>
                
                <div className="space-y-4">
                  {selected.agents.map((agent) => (
                    <div key={agent.role} className="border border-zinc-200 bg-[#fcfcfc] rounded-xl p-4 flex flex-col justify-between space-y-4 hover:border-zinc-300 transition-colors">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-zinc-950 uppercase tracking-tight">{agent.role}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          {agent.description}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2.5 border-t border-zinc-100">
                        <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Assigned Tools:</span>
                        <div className="flex flex-wrap gap-1">
                          {agent.tools.map((t) => (
                            <span key={t} className="text-[9px] font-mono font-medium text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded-sm">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Governing Playbooks & Mandated Deliverables */}
              <div className="space-y-6">
                
                {/* Governing Playbooks */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-zinc-800">
                    <FileText className="w-4 h-4 text-[#d94625]" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Governing Playbooks
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Standards linked to this scenario. Click to open and audit:
                  </p>
                  
                  <div className="space-y-2.5">
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
                          className="group w-full flex items-start gap-3 p-3.5 text-left border border-zinc-200/80 hover:border-[#d94625] rounded-xl hover:bg-zinc-50 bg-white transition-all"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#d94625]/5 text-[#d94625] flex items-center justify-center font-serif text-xs font-bold group-hover:bg-[#d94625] group-hover:text-white transition-all shrink-0">
                            {specObj ? specObj.tier : "T1"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block text-xs font-bold text-zinc-900 group-hover:text-[#d94625] transition-colors truncate">
                              {specName}
                            </span>
                            <span className="block text-[9px] text-zinc-400 font-mono mt-0.5">
                              {specObj ? specObj.id : "EEAOS-SPEC-XXX"}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#d94625] group-hover:translate-x-1 transition-all self-center shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mandated Deliverables */}
                <div className="space-y-3 pt-5 border-t border-zinc-100">
                  <div className="flex items-center gap-2 text-zinc-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Mandated Deliverables
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {selected.outputs.map((output) => (
                      <div key={output} className="flex items-center gap-3 p-3.5 border border-emerald-100 bg-emerald-50/10 rounded-xl hover:border-emerald-200 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="text-xs font-semibold text-zinc-800 leading-tight">{output}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Comprehensive Dual-View Spec Drawer */}
      <SpecDetailDrawer
        spec={selectedSpec}
        onClose={() => setSelectedSpec(null)}
      />

    </div>
  );
}
