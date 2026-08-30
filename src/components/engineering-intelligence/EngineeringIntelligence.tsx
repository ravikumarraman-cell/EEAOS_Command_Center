import React from "react";
export default function EngineeringIntelligence(){
 const dora=[['Deployment Frequency','23/mo'],['Lead Time','2.1 days'],['Change Failure Rate','4%'],['MTTR','38 min']];
 return <div style={{padding:24}}>
 <h1>Engineering Intelligence Platform</h1>
 <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px'}}>
 {dora.map(d=><div key={d[0]} style={{border:'1px solid #ddd',padding:12,borderRadius:10}}><strong>{d[0]}</strong><div>{d[1]}</div></div>)}
 </div>
 <h2>Engineering Health</h2>
 <ul><li>Architecture Fitness: 89%</li><li>Security Readiness: 95%</li><li>Reliability: 91%</li></ul>
 <h2>Risk Forecasting</h2>
 <ul><li>Release Risk: Low</li><li>Defect Risk: Medium</li><li>Technical Debt Risk: Medium</li></ul>
 <h2>AI Agent Analytics</h2>
 <ul><li>Architect Agent: 92%</li><li>Planner Agent: 88%</li><li>Security Agent: 95%</li></ul>
 <h2>Executive Summary</h2>
 <p>Organization trending positively with strong readiness and manageable risk.</p>
 </div>
}
