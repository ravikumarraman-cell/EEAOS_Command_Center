import React,{useState} from "react";
const programs=["Platform Modernization","AI Transformation","Security Hardening"];
export default function PortfolioManagement(){
 const [program,setProgram]=useState(programs[0]);
 return <div style={{padding:24}}>
 <h1>Portfolio Management Suite</h1>
 <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
 <div>Programs: 3</div><div>Epics: 18</div><div>Features: 74</div><div>Roadmap Health: 91%</div>
 </div>
 <h3>Program Tracking</h3>
 <label>Program <select aria-label="Program" value={program} onChange={e=>setProgram(e.target.value)}>{programs.map(p=><option key={p}>{p}</option>)}</select></label>
 <p>Selected Program: {program}</p>
 <h3>Delivery Forecast</h3>
 <ul><li>On Track: 12</li><li>At Risk: 4</li><li>Blocked: 2</li></ul>
 <h3>Capacity Planning</h3>
 <p>Teams Utilized: 82%</p>
 <h3>Dependency Overview</h3>
 <pre>{"Program -> Epic -> Feature -> Story"}</pre>
 <h3>Roadmap</h3>
 <p>Q1 | Q2 | Q3 | Q4</p>
 </div>
}