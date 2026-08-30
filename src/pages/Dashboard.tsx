import { Link } from "react-router-dom";
import { 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Compass, 
  FileText, 
  Sparkles, 
  Cpu, 
  Workflow, 
  Activity, 
  ChevronRight, 
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";

const workspaces = [
  { to: "/scenario-explorer", eyebrow: "01 / Discover", title: "Scenario Explorer", text: "Start with the kind of work you need to deliver.", icon: <Compass className="w-5 h-5 text-zinc-400 group-hover:text-red-500 transition-colors" /> },
  { to: "/recommendations", eyebrow: "02 / Plan", title: "Recommendation Engine", text: "Turn risk and criticality into a tailored spec plan.", icon: <Sparkles className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500 transition-colors" /> },
  { to: "/ai-agent-studio", eyebrow: "03 / Configure", title: "AI Agent Studio", text: "Shape the role, guardrails, and prompt package for the work.", icon: <Cpu className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 transition-colors" /> },
  { to: "/agent-workflow", eyebrow: "04 / Execute", title: "Agent Workflow", text: "See the roles and handoffs that move work forward.", icon: <Workflow className="w-5 h-5 text-zinc-400 group-hover:text-violet-500 transition-colors" /> },
  { to: "/production-readiness", eyebrow: "05 / Ship", title: "Production Readiness", text: "Check the evidence before you make the go decision.", icon: <CheckCircle2 className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 transition-colors" /> },
];

export default function Dashboard() {
  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <div className="hero-row">
        <div>
          <p className="eyebrow accent" style={{ fontWeight: 800, fontSize: "11px", letterSpacing: "0.12em" }}>
            Monday, August 28, 2026
          </p>
          <h1 id="dashboard-title">Build with intent.</h1>
          <p className="hero-copy">A clear path from idea to governed release.</p>
        </div>
        <Link className="primary-button" to="/scenario-explorer" style={{ borderRadius: "8px", padding: "12px 20px" }}>
          <Plus className="w-4 h-4" /> Start a new scenario
        </Link>
      </div>

      <div className="signal-grid" aria-label="Workspace signals" style={{ borderRadius: "12px", border: "1px solid #eaeaeb", overflow: "hidden" }}>
        <div className="signal">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
            <span>Active scenarios</span>
            <Compass className="w-4 h-4 text-zinc-400" />
          </div>
          <strong>12</strong>
          <small className="positive" style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <TrendingUp className="w-3.5 h-3.5" /> ↑ 18% this month
          </small>
        </div>
        <div className="signal">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
            <span>Release readiness</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <strong>94%</strong>
          <small className="positive" style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <TrendingUp className="w-3.5 h-3.5" /> ↑ 6 points
          </small>
        </div>
        <div className="signal">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
            <span>Open review items</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <strong>07</strong>
          <small className="warning" style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <ShieldAlert className="w-3.5 h-3.5" /> 2 need attention
          </small>
        </div>
        <div className="signal">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
            <span>System health</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <strong className="health-value" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            ● Good
          </strong>
          <small style={{ color: "#71717a" }}>Last checked 2m ago</small>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">Your operating flow</p>
          <h2>Move from question to outcome</h2>
        </div>
        <Link to="/governance">
          View governance <ArrowRight className="w-4 h-4" style={{ marginLeft: "4px", display: "inline" }} />
        </Link>
      </div>

      <div className="workspace-grid">
        {workspaces.map((workspace, index) => (
          <Link className={`workspace-card card-${(index % 4) + 1} group`} to={workspace.to} key={workspace.to}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <span className="card-number">{workspace.eyebrow}</span>
              {workspace.icon}
            </div>
            <h3>{workspace.title}</h3>
            <p>{workspace.text}</p>
            <span className="card-arrow"><ArrowUpRight className="w-4 h-4" /></span>
          </Link>
        ))}
      </div>

      <div className="dashboard-lower">
        <div className="activity-panel">
          <div className="panel-heading" style={{ marginBottom: "20px" }}>
            <div>
              <p className="eyebrow">Live pulse</p>
              <h2>What is moving</h2>
            </div>
            <Link to="/governance">
              See all <ChevronRight className="w-4 h-4" style={{ marginLeft: "2px", display: "inline" }} />
            </Link>
          </div>
          <div className="activity-row">
            <span className="activity-icon blue"><ArrowUpRight className="w-3.5 h-3.5" /></span>
            <div>
              <strong>Feature Development</strong>
              <p>Architecture review approved</p>
            </div>
            <time>12m</time>
          </div>
          <div className="activity-row">
            <span className="activity-icon orange"><AlertCircle className="w-3.5 h-3.5" /></span>
            <div>
              <strong>Production Release</strong>
              <p>Performance validation pending</p>
            </div>
            <time>1h</time>
          </div>
          <div className="activity-row">
            <span className="activity-icon green"><CheckCircle2 className="w-3.5 h-3.5" /></span>
            <div>
              <strong>Security Review</strong>
              <p>All high-severity findings resolved</p>
            </div>
            <time>3h</time>
          </div>
        </div>
        <div className="quote-panel">
          <span className="quote-mark">“</span>
          <p>Good governance is how speed becomes repeatable.</p>
          <small>EEAOS operating principle</small>
        </div>
      </div>
    </section>
  );
}