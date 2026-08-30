import React,{useState} from "react";

const specs=[
{name:"Engineering Constitution",tier:"T0",deps:[]},
{name:"Feature Delivery",tier:"T1",deps:["Engineering Constitution"]},
{name:"Testing Strategy",tier:"T1",deps:["Engineering Constitution"]},
{name:"Security Playbook",tier:"T2",deps:["Engineering Constitution"]},
{name:"Production Readiness",tier:"T4",deps:["Feature Delivery","Testing Strategy","Security Playbook"]}
];

export default function SpecDependencyGraph(){
 const [selected,setSelected]=useState(specs[0]);
 return <div style={{padding:24}}>
  <h1>Spec Dependency Graph</h1>
  <p>Visualize relationships between tiers, specifications, agents and workflows.</p>
  <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:20}}>
   <div>
    {specs.map(s=><div key={s.name} onClick={()=>setSelected(s)} style={{cursor:'pointer',border:'1px solid #ddd',borderRadius:10,padding:12,marginBottom:8}}>
      <strong>{s.name}</strong><br/>Tier: {s.tier}
    </div>)}
   </div>
   <div>
    <h2>{selected.name}</h2>
    <p><b>Tier:</b> {selected.tier}</p>
    <h3>Dependencies</h3>
    <ul>{selected.deps.length?selected.deps.map(d=><li key={d}>{d}</li>):<li>None</li>}</ul>
    <h3>Affected Workflows</h3>
    <ul><li>Feature Delivery</li><li>Code Review</li><li>Release Validation</li></ul>
    <h3>Suggested Agents</h3>
    <ul><li>Architect</li><li>Implementer</li><li>Reviewer</li></ul>
    <h3>Relationship View</h3>
    <pre>{selected.name + ' -> ' + (selected.deps.join(' -> ') || 'Root Spec')}</pre>
   </div>
  </div>
 </div>
}
