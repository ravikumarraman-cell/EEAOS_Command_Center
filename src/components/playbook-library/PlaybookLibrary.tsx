import React,{useMemo,useState} from "react";
const items=[
{name:"Engineering Constitution",tier:"T0",category:"Governance",summary:"Core principles and DoD"},
{name:"Feature Decomposition",tier:"T2",category:"Planning",summary:"Epics, stories, acceptance criteria"},
{name:"Feature Delivery",tier:"T1",category:"Execution",summary:"Implementation workflow"},
{name:"Security Playbook",tier:"T2",category:"Security",summary:"Threats and mitigations"},
{name:"Testing Strategy",tier:"T1",category:"Quality",summary:"Unit, integration, regression"},
{name:"Production Readiness",tier:"T4",category:"Release",summary:"Go-live checklist"}
];
export default function PlaybookLibrary(){
 const [q,setQ]=useState('');
 const [tier,setTier]=useState('All');
 const filtered=useMemo(()=>items.filter(i=>(tier==='All'||i.tier===tier)&&JSON.stringify(i).toLowerCase().includes(q.toLowerCase())),[q,tier]);
 return <div style={{padding:20}}>
 <h2>Playbook & Spec Library</h2>
 <input placeholder='Search playbooks...' value={q} onChange={e=>setQ(e.target.value)} style={{padding:8,width:300}} />
 <select value={tier} onChange={e=>setTier(e.target.value)} style={{marginLeft:10,padding:8}}>
 <option>All</option><option>T0</option><option>T1</option><option>T2</option><option>T4</option></select>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16,marginTop:20}}>
 {filtered.map(p=><div key={p.name} style={{border:'1px solid #ddd',borderRadius:12,padding:16}}><h3>{p.name}</h3><p><b>{p.tier}</b> • {p.category}</p><p>{p.summary}</p></div>)}
 </div></div>
}