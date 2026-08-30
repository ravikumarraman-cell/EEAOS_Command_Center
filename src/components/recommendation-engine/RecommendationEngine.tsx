import React, { useMemo, useState } from "react";

export default function RecommendationEngine(){
 const [task,setTask]=useState("Feature Development");
 const [risk,setRisk]=useState("Medium");
 const [criticality,setCriticality]=useState("Medium");
 const rec=useMemo(()=>{
  const base={tiers:["Tier 0"],specs:["Engineering Constitution"],agents:["Planner"]};
  if(task==="Feature Development"){base.tiers.push("Tier 1","Tier 2");base.specs.push("Feature Delivery","Story Mapping","Testing Strategy");base.agents.push("Architect","Implementer","QA");}
  if(task==="Bug Fix"){base.specs.push("Bug RCA","Testing Strategy");base.agents.push("Implementer","QA");}
  if(task==="Security Review"){base.specs.push("Security Playbook");base.agents.push("Security Reviewer");}
  if(risk==="High"||criticality==="High"){base.tiers.push("Tier 3 Review");base.agents.push("Release Approver");}
  return base;
 },[task,risk,criticality]);
 return <div><h2>Spec Recommendation Engine</h2>
 <label>Task <select aria-label="Task" value={task} onChange={e=>setTask(e.target.value)}><option>Feature Development</option><option>Bug Fix</option><option>Security Review</option></select></label>
 <label>Risk <select aria-label="Risk" value={risk} onChange={e=>setRisk(e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
 <label>Criticality <select aria-label="Criticality" value={criticality} onChange={e=>setCriticality(e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
 <h3>Recommended Tiers</h3><ul>{rec.tiers.map(x=><li key={x}>{x}</li>)}</ul>
 <h3>Required Specs</h3><ul>{rec.specs.map(x=><li key={x}>{x}</li>)}</ul>
 <h3>Recommended Agents</h3><ul>{rec.agents.map(x=><li key={x}>{x}</li>)}</ul>
 </div>
}
