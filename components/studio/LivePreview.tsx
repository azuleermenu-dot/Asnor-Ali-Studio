"use client";
import { useState } from "react";
import { MousePointer2, WandSparkles, ArrowUpRight } from "lucide-react";
import { colorPalettes } from "@/lib/design-presets";

type Props = {
  mobilePreview:boolean; palette:number; businessName:string; setBusinessName:(v:string)=>void; heading:string; setHeading:(v:string)=>void;
  style:string; layout:string; headingFont:string; bodyFont:string; buttonStyle:string;
  tagline:string; setTagline:(v:string)=>void; bodyCopy:string; setBodyCopy:(v:string)=>void;
  cta:string; setCta:(v:string)=>void; features:string[]; setFeature:(i:number,v:string)=>void;
};
export default function LivePreview(p:Props) {
  const colors=colorPalettes[p.palette]??colorPalettes[0];
  const [activeSection,setActiveSection]=useState("home");
  const [ctaClicked,setCtaClicked]=useState(false);
  const radius=p.buttonStyle==="Pill"?"999px":p.buttonStyle==="Square"?"5px":"14px";
  const editable=(value:string,onChange:(v:string)=>void,extra:any={})=>({contentEditable:true,suppressContentEditableWarning:true,role:"textbox" as const,"aria-label":"Edit text",onBlur:(e:any)=>{const next=e.currentTarget.innerText;if(next!==value)onChange(next)},...extra});
  const jump=(id:string)=>{setActiveSection(id);const frame=document.querySelector(".previewDeviceShell .previewFrame");const target=document.getElementById("site-"+id);if(frame&&target){frame.scrollTo({top:target.offsetTop-frame.getBoundingClientRect().top+frame.scrollTop,behavior:"smooth"});}};
  return <section className="canvasArea">
    <div className="canvasTop"><span><MousePointer2 size={14}/> Interactive website preview</span><span>{p.mobilePreview?"Mobile · 390px":"Desktop · 100%"} <span className="previewLiveDot"/></span></div>
    <div className={`previewDeviceShell ${p.mobilePreview?"phone":""}`}>
      {p.mobilePreview&&<div className="phoneNotch"/>}
      <div className={`previewFrame ${p.mobilePreview?"phone":""} layout-${p.layout.toLowerCase().replace(/[^a-z]+/g,"-")}`} style={{background:colors[0],color:colors[1],fontFamily:p.bodyFont}}>
        <nav className="previewNav">
          <b {...editable(p.businessName,p.setBusinessName)}>{p.businessName.toUpperCase()}</b>
          <div className="previewNavLinks">{["Home","Menu","About","Contact"].map((x,i)=><button key={x} className={activeSection===x.toLowerCase()?"navActive":""} onClick={()=>jump(x.toLowerCase())}>{x}</button>)}</div>
          <button className="previewCart" aria-label="Open menu" onClick={()=>jump("menu")}>☰</button>
        </nav>
        <section className="previewHero" id="site-home">
          <div className="previewCopy">
            <small {...editable(p.tagline,p.setTagline)}>{p.tagline}</small>
            <h1 style={{fontFamily:p.headingFont}} {...editable(p.heading,p.setHeading)}>{p.heading}</h1>
            <p {...editable(p.bodyCopy,p.setBodyCopy)}>{p.bodyCopy}</p>
            <button className="previewCta" style={{background:colors[2],borderRadius:radius}} onClick={()=>{setCtaClicked(true);jump("menu")}}>{p.cta} <ArrowUpRight size={15}/></button>
            {ctaClicked&&<span className="previewToast">Menu section opened ↓</span>}
          </div>
          <div className="coffeeArt" aria-hidden="true"><div className="coffeeOrbit"/><div className="cup">☕</div><span className="artLabel">FRESHLY BREWED<br/>WITH INTENTION</span></div>
        </section>
        <div className="previewFeatures">{p.features.map((f,i)=><span key={i} {...editable(f,v=>p.setFeature(i,v))}>{["✧","☼","⌂"][i]} {f}</span>)}</div>
        <section className="previewContentSection" id="site-menu"><div className="previewSectionEyebrow">THE GOOD STUFF</div><h2>Made for your<br/><em>everyday ritual.</em></h2><div className="previewMenuCards">{[["01","Signature latte","Espresso · silky milk"],["02","Slow bar coffee","Single-origin · hand brewed"],["03","Something sweet","Freshly baked daily"]].map((item,i)=><article key={i}><span>{item[0]}</span><div><b>{item[1]}</b><small>{item[2]}</small></div><strong>↗</strong></article>)}</div></section>
        <section className="previewAboutSection" id="site-about"><div><small>OUR LITTLE CORNER</small><h2>Good coffee.<br/>Better <em>company.</em></h2></div><p>A neighborhood space built around thoughtful coffee, creative people, and the small moments that make a day feel special.</p></section>
        <section className="previewContactSection" id="site-contact"><div><small>COME SAY HELLO</small><h2>Your table<br/>is <em>waiting.</em></h2></div><button onClick={()=>setCtaClicked(true)}>Get in touch ↗</button></section>
        <footer className="previewFooter"><b>{p.businessName}</b><span>Made with care · Your neighborhood coffee spot</span></footer>
      </div>
    </div>
    <div className="canvasHint"><WandSparkles size={14}/> Click navigation and buttons to test the site. Click any highlighted text to edit it inline.</div>
  </section>;
}
