import React,{useState} from "react";
export default function ReleaseControlCenter(){
 const releases=["2026.09","2026.10","2026.11"];
 const [r,setR]=useState(releases[0]);
 return <div style={{padding:24}}><h1>Release Control Center</h1>
 <label>Release <select aria-label="Release" value={r} onChange={e=>setR(e.target.value)}>{releases.map(x=><option key={x}>{x}</option>)}</select></label>
 <h3>Go / No-Go Engine</h3><ul><li>Architecture ✅</li><li>Security ✅</li><li>QA ✅</li><li>Performance ⚠️</li></ul>
 <h3>Release Train</h3><p>{r}</p>
 <h3>Deployment Window</h3><p>Approved Window Active</p>
 <h3>Rollback Coordination</h3><p>Rollback Plan Verified</p>
 <h3>Risk Heatmap</h3><p>High:1 Medium:3 Low:10</p>
 <h3>CAB Workflow</h3><pre>{"Request -> Review -> Approval -> Deploy -> Verify"}</pre></div>
}