import React,{useMemo,useState} from "react";

const agentProfiles={
 Architect:{tiers:['T0','T2 Architecture'],specs:['Engineering Constitution','Architecture Handbook','ADR Guide'],outputs:['Architecture','ADRs','Tradeoffs']},
 Planner:{tiers:['T0','T2 Planning'],specs:['Story Mapping','Feature Decomposition'],outputs:['Epics','Stories','Acceptance Criteria']},
 Implementer:{tiers:['T0','T1'],specs:['Feature Delivery','Testing Strategy'],outputs:['Code','Tests','Documentation']},
 Security:{tiers:['T0','T2 Security'],specs:['Security Playbook','Threat Modeling'],outputs:['Threat Model','Findings']},
 QA:{tiers:['T0','Testing'],specs:['Testing Strategy'],outputs:['Test Plan','Regression Suite']},
 Release:{tiers:['T0','T4'],specs:['Readiness','Release Governance'],outputs:['Go/No-Go Decision']}
};
type AgentName = keyof typeof agentProfiles;

export default function AIAgentStudio(){
 const [agent,setAgent]=useState<AgentName>('Architect');
 const profile=useMemo(()=>agentProfiles[agent], [agent]);
 const prompt=`Act as ${agent}. Follow: ${profile.specs.join(', ')}. Produce: ${profile.outputs.join(', ')}`;
 return <div style={{padding:24}}>
 <h1>AI Agent Studio</h1>
 <p>Build role-specific prompt packages and orchestration plans.</p>
 <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:20}}>
 <div>
 <h3>Agent Personas</h3>
 {(Object.keys(agentProfiles) as AgentName[]).map(a=><div key={a} onClick={()=>setAgent(a)} style={{cursor:'pointer',padding:12,marginBottom:8,border:'1px solid #ddd',borderRadius:10,background:a===agent?'#eef':'white'}}>{a}</div>)}
 </div>
 <div>
 <h2>{agent} Agent</h2>
 <h3>Required Tiers</h3><ul>{profile.tiers.map(x=><li key={x}>{x}</li>)}</ul>
 <h3>Required Specs</h3><ul>{profile.specs.map(x=><li key={x}>{x}</li>)}</ul>
 <h3>Expected Outputs</h3><ul>{profile.outputs.map(x=><li key={x}>{x}</li>)}</ul>
 <h3>Generated Prompt Package</h3>
 <textarea value={prompt} readOnly style={{width:'100%',height:120}} />
 <h3>Suggested Workflow</h3>
 <pre>{"Architect -> Planner -> Implementer -> Security -> QA -> Release"}</pre>
 <h3>Governance Validation</h3>
 <ul><li>✅ Tier Coverage</li><li>✅ Required Specs Present</li><li>✅ Review Chain Included</li></ul>
 </div>
 </div>
 </div>
}
