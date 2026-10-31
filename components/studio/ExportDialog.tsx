"use client";
import { useState } from "react";
import { Check, X, FileJson, FileCode2, Link2 } from "lucide-react";

type Design = { style:string; palette:number; projectName:string; businessName:string; heading:string; layout:string; headingFont:string; bodyFont:string; buttonStyle:string; motion:string; mobilePreview:boolean };
type Props = { onClose:()=>void; style:string; palette:number; projectName:string; setProjectName:(value:string)=>void; onSave:()=>void; design:Design };

const palettes = [["#10131d","#f4f1eb","#8b7cff"],["#20140f","#f6e8d5","#c47b4e"],["#10201d","#e9f1eb","#7fc9ad"],["#171717","#f5f5f5","#a6b9ff"]];
function downloadFile(name:string, content:string, type:string) {
  const blob = new Blob([content], {type}); const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=name; a.click(); URL.revokeObjectURL(url);
}
export default function ExportDialog({onClose,style,palette,projectName,setProjectName,onSave,design}:Props) {
  const [clientName,setClientName]=useState(""); const [clientEmail,setClientEmail]=useState(""); const [notice,setNotice]=useState("");
  const colors=palettes[design.palette]??palettes[0];
  const safe=(s:string)=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]??c));
  const exportJson=()=>downloadFile((projectName||"design").toLowerCase().replace(/[^a-z0-9]+/g,"-")+".json",JSON.stringify({version:1,clientName,clientEmail,design},null,2),"application/json");
  const exportHtml=()=> {
    const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${safe(design.businessName)}</title><style>*{box-sizing:border-box}body{margin:0;background:${colors[0]};color:${colors[1]};font-family:${safe(design.bodyFont)},Arial,sans-serif}.nav{padding:24px 7%;display:flex;justify-content:space-between;border-bottom:1px solid #ffffff22}.hero{min-height:75vh;display:flex;align-items:center;gap:8%;padding:8%}.copy{max-width:650px}h1{font-family:${safe(design.headingFont)},Georgia,serif;font-size:clamp(42px,8vw,100px);line-height:1.02;white-space:pre-line}p{line-height:1.7;color:${colors[1]}bb}a{display:inline-block;background:${colors[2]};color:white;padding:14px 22px;border-radius:${design.buttonStyle==="Pill"?"999px":design.buttonStyle==="Square"?"5px":"14px"};text-decoration:none}@media(max-width:600px){.hero{padding:10%;min-height:80vh}}</style><nav class="nav"><b>${safe(design.businessName)}</b><span>Home · About · Contact</span></nav><main class="hero"><div class="copy"><small>${safe(design.style.toUpperCase())} DESIGN</small><h1>${safe(design.heading)}</h1><p>A thoughtfully designed digital experience for your brand.</p><a href="#contact">Explore</a></div></main></html>`;
    downloadFile((projectName||"website").toLowerCase().replace(/[^a-z0-9]+/g,"-")+".html",html,"text/html");
  };
  async function shareLink(){
    try { const url=new URL(window.location.href); url.hash="design="+btoa(unescape(encodeURIComponent(JSON.stringify(design)))); await navigator.clipboard.writeText(url.toString()); setNotice("Design link copied. Anyone with the link can view the encoded design settings."); }
    catch { setNotice("Could not copy link on this browser. Export the JSON file instead."); }
  }
  return <div className="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="export-title">
    <div className="exportModal">
      <div className="panelHead"><b id="export-title">Export & share project</b><button onClick={onClose} aria-label="Close"><X /></button></div>
      <p>Save your project, share its settings, or download a starter website file.</p>
      <label>Client name<input value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="Client name" /></label>
      <label>Client email<input type="email" value={clientEmail} onChange={e=>setClientEmail(e.target.value)} placeholder="client@example.com" /></label>
      <label>Project name<input value={projectName} onChange={e=>setProjectName(e.target.value)} /></label>
      <div className="summary"><span>Visual style <b>{style}</b></span><span>Palette <b>Palette {palette+1}</b></span><span>Layout <b>{design.layout}</b></span><span>Typography <b>{design.headingFont} / {design.bodyFont}</b></span></div>
      <div className="exportActions">
        <button className="primary" onClick={onSave}><Check size={15}/> Save project</button>
        <button onClick={exportJson}><FileJson size={15}/> Export JSON</button>
        <button onClick={exportHtml}><FileCode2 size={15}/> Download HTML</button>
        <button onClick={shareLink}><Link2 size={15}/> Copy share link</button>
      </div>
      {notice&&<p className="exportNotice" role="status">{notice}</p>}
      <small className="muted">HTML export is a starter landing page. The project JSON preserves the full editor settings.</small>
    </div>
  </div>;
}