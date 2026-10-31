"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  businessName: string;
  setBusinessName: (value: string) => void;
  heading: string;
  setHeading: (value: string) => void;
  onClose: () => void;
};

export default function InspectorPanel(props: Props) {
  const [tab, setTab] = useState("Content");

  return (
    <aside className="inspector">
      <div className="panelHead">
        <b>Selected: Hero section</b>
        <button onClick={props.onClose} aria-label="Close inspector"><X size={15} /></button>
      </div>
      <div className="tabs">
        {["Style", "Content", "Layout"].map(item => (
          <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>
        ))}
      </div>
      {tab === "Content" && (
        <>
          <label>Business name<input value={props.businessName} onChange={event => props.setBusinessName(event.target.value)} /></label>
          <label>Hero headline<textarea value={props.heading} onChange={event => props.setHeading(event.target.value)} /></label>
          <p className="muted">You can also click the headline in the canvas to edit it.</p>
        </>
      )}
      {tab === "Style" && (
        <>
          <label>Background<select defaultValue="Warm"><option>Warm</option><option>Dark</option><option>Light</option></select></label>
          <label>Overlay strength<input type="range" defaultValue="40" /></label>
        </>
      )}
      {tab === "Layout" && (
        <>
          <label>Text alignment<select defaultValue="Left"><option>Left</option><option>Center</option><option>Right</option></select></label>
          <label>Section spacing<input type="range" defaultValue="50" /></label>
        </>
      )}
    </aside>
  );
}