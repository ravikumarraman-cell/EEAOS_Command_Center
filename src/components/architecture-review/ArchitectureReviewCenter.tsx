import React, { useState } from "react";

const adrs = [
 {id:'ADR-001', title:'Adopt Microservice Boundary', status:'Approved'},
 {id:'ADR-002', title:'API Gateway Standardization', status:'Review'},
 {id:'ADR-003', title:'Event-Driven Integration', status:'Proposed'}
];

export default function ArchitectureReviewCenter(){
 const [selected,setSelected]=useState(adrs[0]);
 return (
  <div style={{padding:24}}>
   <h2>Architecture Review Center</h2>

   <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12}}>
    {[
      ['Architecture Fitness','92%'],
      ['Scalability','89%'],
      ['Reliability','94%'],
      ['Security','91%'],
      ['Technical Debt','18%']
    ].map(([n,v]) => (
      <div key={n} style={{border:'1px solid #ddd',borderRadius:12,padding:12}}>
        <div>{n}</div><strong>{v}</strong>
      </div>
    ))}
   </div>

   <h3 style={{marginTop:20}}>Architecture Decision Records</h3>
   <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:16}}>
     <div>
       {adrs.map(a => (
        <div key={a.id} onClick={()=>setSelected(a)} style={{cursor:'pointer',padding:12,border:'1px solid #ddd',marginBottom:8,borderRadius:10}}>
          <strong>{a.id}</strong><br/>{a.title}
        </div>
       ))}
     </div>
     <div style={{border:'1px solid #ddd',borderRadius:10,padding:16}}>
       <h4>{selected.id}</h4>
       <p>{selected.title}</p>
       <p>Status: {selected.status}</p>
       <h4>Review Scorecard</h4>
       <ul>
        <li>Boundary Alignment: 5/5</li>
        <li>Scalability: 4/5</li>
        <li>Reliability: 5/5</li>
        <li>Maintainability: 4/5</li>
       </ul>
     </div>
   </div>

   <h3>Reference Architecture</h3>
  <pre>{"Frontend -> API Gateway -> Services -> Database"}</pre>
  </div>
 );
}
