import { Routes, Route, NavLink, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Scenarios from "./pages/Scenarios";
import TierExplorer from "./components/tier-explorer/TierExplorer";
import ScenarioExplorer from "./components/scenario-explorer/ScenarioExplorer";
import RecommendationEngine from "./components/recommendation-engine/RecommendationEngine";
import ArchitectureReviewCenter from "./components/architecture-review/ArchitectureReviewCenter";
import AgentWorkflowVisualizer from "./components/agent-workflow/AgentWorkflowVisualizer";
import PlaybookLibrary from "./components/playbook-library/PlaybookLibrary";
import GovernanceDashboard from "./components/governance-dashboard/GovernanceDashboard";
import ExecutiveCommandCenter from "./components/executive-command-center/ExecutiveCommandCenter";
import SecurityReviewCenter from "./components/security-review/SecurityReviewCenter";
import ProductionReadinessCenter from "./components/production-readiness/ProductionReadinessCenter";
import AIAgentStudio from "./components/ai-agent-studio/AIAgentStudio";
import PortfolioManagement from "./components/portfolio-management/PortfolioManagement";
import EngineeringIntelligence from "./components/engineering-intelligence/EngineeringIntelligence";
import SpecDependencyGraph from "./components/spec-dependency-graph/SpecDependencyGraph";
import ReleaseControlCenter from "./components/release-control/ReleaseControlCenter";
import { 
  LayoutDashboard, 
  Globe, 
  Compass, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Workflow, 
  Activity, 
  TrendingUp, 
  PieChart, 
  GitBranch, 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  Terminal, 
  Search, 
  ChevronDown,
  Settings 
} from "lucide-react";

const navigation = [
  { label: "Overview", items: [["/", "Command Center"], ["/governance", "Governance"]] },
  { label: "Design & plan", items: [["/scenario-explorer", "Scenario Explorer"], ["/tier-explorer", "Tier Explorer"], ["/recommendations", "Recommendations"], ["/playbooks", "Playbook Library"]] },
  { label: "AI delivery", items: [["/ai-agent-studio", "AI Agent Studio"], ["/agent-workflow", "Agent Workflow"]] },
  { label: "Intelligence", items: [["/executive", "Executive Command"], ["/engineering-intelligence", "Engineering Intelligence"], ["/portfolio", "Portfolio Management"], ["/spec-dependencies", "Spec Dependencies"]] },
  { label: "Review & ship", items: [["/architecture-review", "Architecture Review"], ["/security-review", "Security Review"], ["/production-readiness", "Production Readiness"], ["/release-control", "Release Control"]] },
] as const;

function getLinkIcon(path: string) {
  const sizeClass = "w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity";
  switch (path) {
    case "/": return <LayoutDashboard className={sizeClass} />;
    case "/governance": return <Globe className={sizeClass} />;
    case "/scenario-explorer": return <Compass className={sizeClass} />;
    case "/tier-explorer": return <Layers className={sizeClass} />;
    case "/recommendations": return <Sparkles className={sizeClass} />;
    case "/playbooks": return <BookOpen className={sizeClass} />;
    case "/ai-agent-studio": return <Cpu className={sizeClass} />;
    case "/agent-workflow": return <Workflow className={sizeClass} />;
    case "/executive": return <Activity className={sizeClass} />;
    case "/engineering-intelligence": return <TrendingUp className={sizeClass} />;
    case "/portfolio": return <PieChart className={sizeClass} />;
    case "/spec-dependencies": return <GitBranch className={sizeClass} />;
    case "/architecture-review": return <ShieldCheck className={sizeClass} />;
    case "/security-review": return <Lock className={sizeClass} />;
    case "/production-readiness": return <CheckCircle className={sizeClass} />;
    case "/release-control": return <Terminal className={sizeClass} />;
    default: return <Settings className={sizeClass} />;
  }
}

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/">
          <span className="brand-mark">E</span>
          <div className="brand-info">
            <strong>EEAOS</strong>
            <small>Command Center</small>
          </div>
        </Link>
        <div className="workspace-chip">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="status-dot" /> 
            <span style={{ marginLeft: "4px" }}>Delivery workspace</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </div>
        <nav aria-label="Primary navigation" className="sidebar-nav">
          {navigation.map((section) => <div className="nav-section" key={section.label}>
            <p className="nav-label">{section.label}</p>
            {section.items.map(([path, label]) => <NavLink key={path} to={path} end={path === "/"} className={({ isActive }) => isActive ? "nav-link active group" : "nav-link group"}>
              <span className="nav-glyph" aria-hidden="true">{getLinkIcon(path)}</span>
              {label}
            </NavLink>)}
          </div>)}
        </nav>
        <div className="sidebar-footer">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="status-dot green" /> 
            <span style={{ marginLeft: "4px" }}>System healthy</span>
          </div>
          <span>v0.1</span>
        </div>
      </aside>
      <div className="app-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Engineering operating system</p>
            <p className="breadcrumb">Workspace / <strong>Command Center</strong></p>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" type="button" aria-label="Search">
              <Search className="w-4 h-4 text-zinc-500" />
            </button>
            <button className="avatar" type="button" aria-label="Open profile">RK</button>
          </div>
        </header>
        <main className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/scenario-explorer" element={<ScenarioExplorer />} />
          <Route path="/tier-explorer" element={<TierExplorer />} />
          <Route path="/recommendations" element={<RecommendationEngine />} />
          <Route path="/architecture-review" element={<ArchitectureReviewCenter />} />
          <Route path="/agent-workflow" element={<AgentWorkflowVisualizer />} />
          <Route path="/playbooks" element={<PlaybookLibrary />} />
          <Route path="/governance" element={<GovernanceDashboard />} />
          <Route path="/executive" element={<ExecutiveCommandCenter />} />
          <Route path="/security-review" element={<SecurityReviewCenter />} />
          <Route path="/production-readiness" element={<ProductionReadinessCenter />} />
          <Route path="/ai-agent-studio" element={<AIAgentStudio />} />
          <Route path="/engineering-intelligence" element={<EngineeringIntelligence />} />
          <Route path="/portfolio" element={<PortfolioManagement />} />
          <Route path="/spec-dependencies" element={<SpecDependencyGraph />} />
          <Route path="/release-control" element={<ReleaseControlCenter />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
        </main>
      </div>
    </div>
  );
}

