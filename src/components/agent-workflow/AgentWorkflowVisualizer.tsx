import React,{useState} from "react";
const workflows={
 Feature:["Planner","Architect","Implementer","QA","Release"],
 Enterprise:["Planner","Architect","Implementer","Security","Performance","QA","Release"],
 Bug:["Planner","Implementer","QA"]
};
export default function AgentWorkflowVisualizer(){
 const [type,setType]=useState("Enterprise");
 const steps=workflows[type as keyof typeof workflows];
 return <div style={{padding:20}}><h2>Agent Workflow Visualizer</h2>
 <select value={type} onChange={e=>setType(e.target.value)}>
 <option>Enterprise</option><option>Feature</option><option>Bug</option></select>
 <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:20}}>
 {steps.map((s,i)=><React.Fragment key={s}><div style={{padding:16,borderRadius:12,background:'#2563eb',color:'#fff'}}>{s}</div>{i<steps.length-1&&<div style={{alignSelf:'center'}}>→</div>}</React.Fragment>)}
 </div>
 <h3>Expected Inputs</h3><ul><li>Requirements</li><li>Selected tiers</li><li>Applicable specs</li></ul>
 <h3>Expected Outputs</h3><ul><li>Implementation plan</li><li>Review findings</li><li>Release recommendation</li></ul>
 </div>
}