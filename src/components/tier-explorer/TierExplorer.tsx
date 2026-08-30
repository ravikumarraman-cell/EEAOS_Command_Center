import React, { useState } from "react";

const tiers = [
  { id: "T0", title: "Constitution", desc: "Engineering Charter, DoD, Risk Framework", color: "#2563eb" },
  { id: "T1", title: "Execution", desc: "Feature Delivery, Testing, Observability", color: "#059669" },
  { id: "T2", title: "Specialization", desc: "Feature, API, DB, Security, Performance", color: "#7c3aed" },
  { id: "T3", title: "Review", desc: "Security, Architecture, Performance Reviews", color: "#ea580c" },
  { id: "T4", title: "Release", desc: "Readiness and Governance", color: "#dc2626" }
];

export default function TierExplorer() {
  const [selected, setSelected] = useState(tiers[0]);
  return (
    <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:'24px'}}>
      <div>
        {tiers.map(t => (
          <div key={t.id} onClick={() => setSelected(t)} style={{cursor:'pointer',padding:'16px',marginBottom:'12px',borderRadius:'16px',background:selected.id===t.id?t.color:'#1f2937',color:'white'}}>
            <h3>{t.id}: {t.title}</h3>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>
      <div style={{padding:'24px',border:'1px solid #e5e7eb',borderRadius:'16px'}}>
        <h2>{selected.id} - {selected.title}</h2>
        <p>{selected.desc}</p>
        <h3>Expected Outputs</h3>
        <ul>
          <li>Governance guidance</li>
          <li>Required specifications</li>
          <li>Agent responsibilities</li>
          <li>Approval requirements</li>
        </ul>
      </div>
    </div>
  );
}
