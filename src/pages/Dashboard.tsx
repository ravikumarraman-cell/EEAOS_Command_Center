import { Link } from "react-router-dom";

const workspaces = [
	{ to: "/scenario-explorer", eyebrow: "01 / Discover", title: "Scenario Explorer", text: "Start with the kind of work you need to deliver." },
	{ to: "/recommendations", eyebrow: "02 / Plan", title: "Recommendation Engine", text: "Turn risk and criticality into a tailored spec plan." },
	{ to: "/ai-agent-studio", eyebrow: "03 / Configure", title: "AI Agent Studio", text: "Shape the role, guardrails, and prompt package for the work." },
	{ to: "/agent-workflow", eyebrow: "04 / Execute", title: "Agent Workflow", text: "See the roles and handoffs that move work forward." },
	{ to: "/production-readiness", eyebrow: "05 / Ship", title: "Production Readiness", text: "Check the evidence before you make the go decision." },
];

export default function Dashboard() {
	return (
		<section className="dashboard" aria-labelledby="dashboard-title">
			<div className="hero-row"><div><p className="eyebrow accent">Monday, August 28, 2026</p><h1 id="dashboard-title">Build with intent.</h1><p className="hero-copy">A clear path from idea to governed release.</p></div><Link className="primary-button" to="/scenario-explorer"><span>＋</span> Start a new scenario</Link></div>
			<div className="signal-grid" aria-label="Workspace signals">
				<div className="signal"><span>Active scenarios</span><strong>12</strong><small className="positive">↑ 18% this month</small></div>
				<div className="signal"><span>Release readiness</span><strong>94%</strong><small className="positive">↑ 6 points</small></div>
				<div className="signal"><span>Open review items</span><strong>07</strong><small className="warning">2 need attention</small></div>
				<div className="signal"><span>System health</span><strong className="health-value">● Good</strong><small>Last checked 2m ago</small></div>
			</div>
			<div className="section-heading"><div><p className="eyebrow">Your operating flow</p><h2>Move from question to outcome</h2></div><Link to="/governance">View governance <span>→</span></Link></div>
			<div className="workspace-grid">{workspaces.map((workspace, index) => <Link className={`workspace-card card-${(index % 4) + 1}`} to={workspace.to} key={workspace.to}><span className="card-number">{workspace.eyebrow}</span><h3>{workspace.title}</h3><p>{workspace.text}</p><span className="card-arrow">↗</span></Link>)}</div>
			<div className="dashboard-lower"><div className="activity-panel"><div className="panel-heading"><div><p className="eyebrow">Live pulse</p><h2>What is moving</h2></div><Link to="/governance">See all</Link></div><div className="activity-row"><span className="activity-icon blue">↗</span><div><strong>Feature Development</strong><p>Architecture review approved</p></div><time>12m</time></div><div className="activity-row"><span className="activity-icon orange">!</span><div><strong>Production Release</strong><p>Performance validation pending</p></div><time>1h</time></div><div className="activity-row"><span className="activity-icon green">✓</span><div><strong>Security Review</strong><p>All high-severity findings resolved</p></div><time>3h</time></div></div><div className="quote-panel"><span className="quote-mark">“</span><p>Good governance is how speed becomes repeatable.</p><small>EEAOS operating principle</small></div></div>
		</section>
	);
}