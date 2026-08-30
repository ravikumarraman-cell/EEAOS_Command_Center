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

const navigation = [
  { label: "Overview", items: [["/", "Command Center"], ["/governance", "Governance"]] },
  { label: "Design & plan", items: [["/scenario-explorer", "Scenario Explorer"], ["/tier-explorer", "Tier Explorer"], ["/recommendations", "Recommendations"], ["/playbooks", "Playbook Library"]] },
  { label: "AI delivery", items: [["/ai-agent-studio", "AI Agent Studio"], ["/agent-workflow", "Agent Workflow"]] },
  { label: "Intelligence", items: [["/executive", "Executive Command"], ["/engineering-intelligence", "Engineering Intelligence"], ["/portfolio", "Portfolio Management"], ["/spec-dependencies", "Spec Dependencies"]] },
  { label: "Review & ship", items: [["/architecture-review", "Architecture Review"], ["/security-review", "Security Review"], ["/production-readiness", "Production Readiness"], ["/release-control", "Release Control"]] },
] as const;

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/">
          <span className="brand-mark">E</span>
          <span><strong>EEAOS</strong><small>Command Center</small></span>
        </Link>
        <div className="workspace-chip"><span className="status-dot" /> Delivery workspace <span className="chevron">⌄</span></div>
        <nav aria-label="Primary navigation" className="sidebar-nav">
          {navigation.map((section) => <div className="nav-section" key={section.label}>
            <p className="nav-label">{section.label}</p>
            {section.items.map(([path, label]) => <NavLink key={path} to={path} end={path === "/"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="nav-glyph" aria-hidden="true">{label.charAt(0)}</span>{label}
            </NavLink>)}
          </div>)}
        </nav>
        <div className="sidebar-footer"><span className="status-dot green" /> System healthy <span>v0.1</span></div>
      </aside>
      <div className="app-content">
        <header className="topbar">
          <div><p className="eyebrow">Engineering operating system</p><p className="breadcrumb">Workspace / <strong>Command Center</strong></p></div>
          <div className="topbar-actions"><button className="icon-button" type="button" aria-label="Search">⌕</button><button className="avatar" type="button" aria-label="Open profile">RK</button></div>
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

