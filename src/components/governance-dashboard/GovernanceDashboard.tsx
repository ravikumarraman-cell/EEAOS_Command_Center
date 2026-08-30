import React from "react";

const metrics=[
 {name:"Engineering Maturity",score:88,color:"#2563eb"},
 {name:"Security Readiness",score:92,color:"#dc2626"},
 {name:"Reliability Readiness",score:85,color:"#059669"},
 {name:"Architecture Fitness",score:90,color:"#7c3aed"},
 {name:"Production Readiness",score:94,color:"#ea580c"}
];

export default function GovernanceDashboard(){
 return (
 <div style={{padding:24}}>
  <h2>Governance Dashboard</h2>
  <p>Executive overview of engineering health and governance posture.</p>
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:16}}>
   {metrics.map(m=>(
    <div key={m.name} style={{border:'1px solid #ddd',borderRadius:16,padding:16}}>
      <h3>{m.name}</h3>
      <div style={{fontSize:32,fontWeight:'bold',color:m.color}}>{m.score}%</div>
    </div>
   ))}
  </div>

  <h3 style={{marginTop:24}}>Quality Gates</h3>
  <ul>
   <li>✅ Architecture Review</li>
   <li>✅ Security Review</li>
   <li>✅ Reliability Review</li>
   <li>⚠️ Performance Validation</li>
   <li>✅ Testing Validation</li>
  </ul>

  <h3>Risk Matrix</h3>
  <div style={{border:'1px solid #ddd',padding:16,borderRadius:12}}>
   Critical: 0 | High: 2 | Medium: 5 | Low: 12
  </div>

  <h3>Executive Actions</h3>
  <ul>
   <li>Review High Risks</li>
   <li>Approve Release Readiness</li>
   <li>Monitor Reliability Trends</li>
  </ul>
 </div>
 )
}
