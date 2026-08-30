import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
];
export default function App() {
    return (_jsxs("div", { className: "app-shell", children: [_jsxs("aside", { className: "sidebar", children: [_jsxs(Link, { className: "brand", to: "/", children: [_jsx("span", { className: "brand-mark", children: "E" }), _jsxs("span", { children: [_jsx("strong", { children: "EEAOS" }), _jsx("small", { children: "Command Center" })] })] }), _jsxs("div", { className: "workspace-chip", children: [_jsx("span", { className: "status-dot" }), " Delivery workspace ", _jsx("span", { className: "chevron", children: "\u2304" })] }), _jsx("nav", { "aria-label": "Primary navigation", className: "sidebar-nav", children: navigation.map((section) => _jsxs("div", { className: "nav-section", children: [_jsx("p", { className: "nav-label", children: section.label }), section.items.map(([path, label]) => _jsxs(NavLink, { to: path, end: path === "/", className: ({ isActive }) => isActive ? "nav-link active" : "nav-link", children: [_jsx("span", { className: "nav-glyph", "aria-hidden": "true", children: label.charAt(0) }), label] }, path))] }, section.label)) }), _jsxs("div", { className: "sidebar-footer", children: [_jsx("span", { className: "status-dot green" }), " System healthy ", _jsx("span", { children: "v0.1" })] })] }), _jsxs("div", { className: "app-content", children: [_jsxs("header", { className: "topbar", children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Engineering operating system" }), _jsxs("p", { className: "breadcrumb", children: ["Workspace / ", _jsx("strong", { children: "Command Center" })] })] }), _jsxs("div", { className: "topbar-actions", children: [_jsx("button", { className: "icon-button", type: "button", "aria-label": "Search", children: "\u2315" }), _jsx("button", { className: "avatar", type: "button", "aria-label": "Open profile", children: "RK" })] })] }), _jsx("main", { className: "page-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/scenarios", element: _jsx(Scenarios, {}) }), _jsx(Route, { path: "/scenario-explorer", element: _jsx(ScenarioExplorer, {}) }), _jsx(Route, { path: "/tier-explorer", element: _jsx(TierExplorer, {}) }), _jsx(Route, { path: "/recommendations", element: _jsx(RecommendationEngine, {}) }), _jsx(Route, { path: "/architecture-review", element: _jsx(ArchitectureReviewCenter, {}) }), _jsx(Route, { path: "/agent-workflow", element: _jsx(AgentWorkflowVisualizer, {}) }), _jsx(Route, { path: "/playbooks", element: _jsx(PlaybookLibrary, {}) }), _jsx(Route, { path: "/governance", element: _jsx(GovernanceDashboard, {}) }), _jsx(Route, { path: "/executive", element: _jsx(ExecutiveCommandCenter, {}) }), _jsx(Route, { path: "/security-review", element: _jsx(SecurityReviewCenter, {}) }), _jsx(Route, { path: "/production-readiness", element: _jsx(ProductionReadinessCenter, {}) }), _jsx(Route, { path: "/ai-agent-studio", element: _jsx(AIAgentStudio, {}) }), _jsx(Route, { path: "/engineering-intelligence", element: _jsx(EngineeringIntelligence, {}) }), _jsx(Route, { path: "/portfolio", element: _jsx(PortfolioManagement, {}) }), _jsx(Route, { path: "/spec-dependencies", element: _jsx(SpecDependencyGraph, {}) }), _jsx(Route, { path: "/release-control", element: _jsx(ReleaseControlCenter, {}) }), _jsx(Route, { path: "*", element: _jsx(Dashboard, {}) })] }) })] })] }));
}
