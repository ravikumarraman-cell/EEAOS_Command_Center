import React, { useMemo, useState } from "react";
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  SlidersHorizontal, 
  ChevronRight,
  Eye, 
  Cpu, 
  ShieldAlert, 
  Zap, 
  Scale,
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react";
import { specDocuments, Specification } from "../../specs/specDocuments";
import SpecDetailDrawer from "../specs/SpecDetailDrawer";

export default function PlaybookLibrary() {
  const [q, setQ] = useState("");
  const [selectedTier, setSelectedTier] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSpec, setSelectedSpec] = useState<Specification | null>(null);

  // Derive simple statistics for the user to reduce cognitive load instantly
  const stats = useMemo(() => {
    const total = specDocuments.length;
    const t0 = specDocuments.filter((s) => s.tier === "T0").length;
    const t1 = specDocuments.filter((s) => s.tier === "T1").length;
    const t2 = specDocuments.filter((s) => s.tier === "T2" || s.tier === "T4").length;
    return { total, t0, t1, t2 };
  }, []);

  const categories = useMemo(() => {
    const list = new Set(specDocuments.map((s) => s.category));
    return ["All", ...Array.from(list)];
  }, []);

  const filtered = useMemo(() => {
    return specDocuments.filter((i) => {
      const matchTier = selectedTier === "All" || i.tier === selectedTier;
      const matchCategory = selectedCategory === "All" || i.category === selectedCategory;
      const query = q.toLowerCase();
      const matchText = 
        i.title.toLowerCase().includes(query) ||
        i.id.toLowerCase().includes(query) ||
        i.category.toLowerCase().includes(query) ||
        i.markdown.toLowerCase().includes(query);
      
      return matchTier && matchCategory && matchText;
    });
  }, [q, selectedTier, selectedCategory]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "T0": return "text-[#d94625] bg-[#d94625]/5 border-[#d94625]/15";
      case "T1": return "text-emerald-700 bg-emerald-50 border-emerald-100";
      case "T2": return "text-blue-700 bg-blue-50 border-blue-100";
      case "T4": return "text-amber-700 bg-amber-50 border-amber-100";
      default: return "text-zinc-600 bg-zinc-100 border-zinc-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    const c = "w-4 h-4";
    switch (category) {
      case "Governance": return <Scale className={`${c} text-amber-500`} />;
      case "Execution": return <Zap className={`${c} text-emerald-500`} />;
      case "Quality": return <BookOpen className={`${c} text-blue-500`} />;
      case "Security": return <ShieldAlert className={`${c} text-rose-500`} />;
      default: return <BookOpen className={`${c} text-zinc-500`} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Premium Display Title Block */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-zinc-200/50 pb-6">
        <div>
          <p className="eyebrow accent" style={{ fontWeight: 800, fontSize: "11px", letterSpacing: "0.12em" }}>
            Supreme Engineering Standards
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-zinc-950 mt-1 tracking-tight">
            Playbook & Spec Library
          </h1>
          <p className="text-zinc-500 text-sm mt-2 max-w-2xl leading-relaxed">
            The canonical repository of organization-wide compliance benchmarks, machine execution parameters, and automated gates guarding code quality.
          </p>
        </div>

        {/* Cognitive Micro-Stats Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-zinc-50 border border-zinc-200/60 rounded-2xl p-4 shrink-0 shadow-xs">
          <div className="px-2">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Standards</span>
            <span className="block text-xl font-bold font-mono text-zinc-900 mt-0.5">{stats.total}</span>
          </div>
          <div className="px-2 border-l border-zinc-200/60">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Core T0</span>
            <span className="block text-xl font-bold font-mono text-[#d94625] mt-0.5">{stats.t0}</span>
          </div>
          <div className="px-2 border-l border-zinc-200/60">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Execution T1</span>
            <span className="block text-xl font-bold font-mono text-emerald-600 mt-0.5">{stats.t1}</span>
          </div>
          <div className="px-2 border-l border-zinc-200/60">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Planning T2+</span>
            <span className="block text-xl font-bold font-mono text-blue-600 mt-0.5">{stats.t2}</span>
          </div>
        </div>
      </div>

      {/* Modern High-End Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 bg-white border border-zinc-200 p-4 rounded-2xl shadow-xs justify-between items-stretch lg:items-center">
        
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search specifications, guidelines, or machine-readable tags..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#fcfbfa] border border-zinc-200 rounded-xl text-sm placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#d94625]/20 focus:border-[#d94625] transition-all"
          />
        </div>

        {/* Refined Quick Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-1 text-zinc-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Filters</span>
          </div>
          
          {/* Tier Selector Dropdown */}
          <div className="flex items-center gap-2 bg-[#fcfbfa] border border-zinc-200 hover:border-zinc-300 px-3 py-2.5 rounded-xl transition-colors">
            <span className="text-[11px] font-semibold text-zinc-400">Tier:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="text-xs bg-transparent border-none font-bold text-zinc-800 focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Tiers</option>
              <option value="T0">T0 - Core Governance</option>
              <option value="T1">T1 - Execution Quality</option>
              <option value="T2">T2 - Strategic Planning</option>
              <option value="T4">T4 - Deployment Gates</option>
            </select>
          </div>

          {/* Category Selector Dropdown */}
          <div className="flex items-center gap-2 bg-[#fcfbfa] border border-zinc-200 hover:border-zinc-300 px-3 py-2.5 rounded-xl transition-colors">
            <span className="text-[11px] font-semibold text-zinc-400">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs bg-transparent border-none font-bold text-zinc-800 focus:outline-hidden cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Ultra-Premium Spec Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedSpec(p)}
            className="group flex flex-col text-left bg-white border border-zinc-200/80 hover:border-zinc-300/90 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Row: Meta tags */}
            <div className="flex items-center justify-between w-full mb-4">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${getTierColor(p.tier)}`}>
                Tier {p.tier}
              </span>
              <span className="font-mono text-[11px] text-zinc-400 font-semibold bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded-sm">
                {p.id}
              </span>
            </div>

            {/* Spec Title: Elegant serif display */}
            <h3 className="font-serif text-xl font-normal text-zinc-950 group-hover:text-[#d94625] transition-colors line-clamp-1 leading-snug">
              {p.title}
            </h3>

            {/* Sub-label Category */}
            <div className="flex items-center gap-1.5 mt-2.5 text-xs text-zinc-500 font-medium">
              {getCategoryIcon(p.category)}
              <span>{p.category} Category</span>
            </div>

            {/* Brief introductory text for cognitive ease */}
            <p className="text-zinc-500 text-xs leading-relaxed mt-4 line-clamp-3 flex-1">
              Governs key engineering criteria with machine-readable integration schemas and custom verification routines for fully autonomous QA agents.
            </p>

            {/* Divider line */}
            <hr className="my-4 border-zinc-100 w-full" />

            {/* Micro-capabilities list tags (No clutter, highly intuitive) */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {Object.keys(p.machineDirectives).slice(0, 3).map((dk) => (
                <span key={dk} className="text-[9px] font-mono font-bold text-zinc-400 bg-zinc-50 border border-zinc-200/40 px-2 py-0.5 rounded-sm">
                  {dk.replace(/_/g, " ")}
                </span>
              ))}
            </div>

            {/* Bottom Row Actions with slick arrows */}
            <div className="flex items-center justify-between w-full text-zinc-400 pt-1 border-t border-dashed border-zinc-100">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                  <Eye className="w-3.5 h-3.5" />
                  SOP
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                  <Cpu className="w-3.5 h-3.5" />
                  Directives
                </span>
              </div>
              
              <span className="flex items-center gap-1 text-xs font-bold text-[#d94625] opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all">
                Audit Standard
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        ))}

        {/* Not Found illustration state */}
        {filtered.length === 0 && (
          <div className="col-span-full p-12 text-center bg-white border border-dashed border-zinc-200 rounded-3xl">
            <HelpCircle className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="font-semibold text-zinc-800 text-sm">No Specifications Found</h3>
            <p className="text-zinc-500 text-xs mt-1 max-w-sm mx-auto">
              No standards match your filter criteria or search keyword. Try broadening your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Comprehensive Spec Overlay Drawer */}
      <SpecDetailDrawer
        spec={selectedSpec}
        onClose={() => setSelectedSpec(null)}
      />

    </div>
  );
}
