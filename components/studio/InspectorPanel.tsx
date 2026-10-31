"use client";
import { useState } from "react";
import { X, Type, MousePointer2 } from "lucide-react";
type Props={businessName:string;setBusinessName:(v:string)=>void;heading:string;setHeading:(v:string)=>void;tagline:string;setTagline:(v:string)=>void;bodyCopy:string;setBodyCopy:(v:string)=>void;cta:string;setCta:(v:string)=>void;onClose:()=>void};
export default function InspectorPanel(p:Props){
 const [tab,setTab]=useState("Content");
 return <aside className="inspector">
  <div className="panelHead"><b>Inspector <span className="inspectorBadge">HERO</span></b><button onClick={p.onClose} aria-label="Close inspector"><X size={15}/></button></div>
  <div className="tabs">{["Content","Style","Layout"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}</button>)}</div>
  {tab==="Content"&&<div className="inspectorFields">
   <div className="inspectorNote"><Type size={14}/> Edit content here or directly on the canvas.</div>
   <label>Business name<input value={p.businessName} onChange={e=>p.setBusinessName(e.target.value)}/></label>
   <label>Eyebrow text<input value={p.tagline} onChange={e=>p.setTagline(e.target.value)}/></label>
   <label>Hero headline<textarea rows={3} value={p.heading} onChange={e=>p.setHeading(e.target.value)}/></label>
   <label>Supporting text<textarea rows={4} value={p.bodyCopy} onChange={e=>p.setBodyCopy(e.target.value)}/></label>
   <label>Button label<input value={p.cta} onChange={e=>p.setCta(e.target.value)}/></label>
  </div>}
  {tab==="Style"&&<div className="inspectorFields"><div className="inspectorNote"><MousePointer2 size={14}/> Use the left-side tools to change global colors, typography, and components.</div><p className="muted">Changes update the live canvas immediately and are saved to your project.</p></div>}
  {tab==="Layout"&&<div className="inspectorFields"><p className="muted">Use the Layout tool to switch between editorial, minimal, grid, asymmetric, and card-based structures. Use the device controls to preview responsive behavior.</p></div>}
 </aside>;
}