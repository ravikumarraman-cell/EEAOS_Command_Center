import React, { useState } from "react";

const findings=[
 {id:'SEC-001',severity:'High',title:'Missing Authorization Check'},
 {id:'SEC-002',severity:'Medium',title:'Sensitive Data in Logs'},
 {id:'SEC-003',severity:'Low',title:'Security Headers Review'}
];

export default function SecurityReviewCenter(){
 const [selected,setSelected]=useState(findings[0]);
 return (
 <div style={{padding:24}}>
  <h2>Security Review Center</h2>

  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
   <div style={{padding:12,border:'1px solid #ddd',borderRadius:10}}>Critical: 0</div>
   <div style={{padding:12,border:'1px solid #ddd',borderRadius:10}}>High: 1</div>
   <div style={{padding:12,border:'1px solid #ddd',borderRadius:10}}>Medium: 1</div>
   <div style={{padding:12,border:'1px solid #ddd',borderRadius:10}}>Low: 1</div>
  </div>

  <h3 style={{marginTop:20}}>OWASP Review Checklist</h3>
  <ul>
   <li>Authentication Review</li>
   <li>Authorization Review</li>
   <li>Input Validation</li>
   <li>Secrets Management</li>
   <li>Dependency Scanning</li>
   <li>Logging & Audit Review</li>
  </ul>

  <div style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:16}}>
   <div>
    {findings.map(f=>(<div key={f.id} onClick={()=>setSelected(f)} style={{cursor:'pointer',border:'1px solid #ddd',padding:12,marginBottom:8,borderRadius:10}}>{f.id} - {f.title}</div>))}
   </div>
   <div style={{border:'1px solid #ddd',padding:16,borderRadius:10}}>
    <h4>{selected.id}</h4>
    <p>{selected.title}</p>
    <p>Severity: {selected.severity}</p>
    <h4>Mitigation</h4>
    <p>Document remediation steps, validation evidence, and verification status.</p>
   </div>
  </div>

  <h3>Security Approval Workflow</h3>
    <pre>{"Assessment -> Findings -> Remediation -> Verification -> Approval"}</pre>
 </div>
 )
}
