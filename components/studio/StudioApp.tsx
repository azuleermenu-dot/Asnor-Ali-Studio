"use client";

import { useEffect, useRef, useState } from "react";
import type { ToolName } from "@/lib/types";
import StudioToolbar from "./StudioToolbar";
import ToolSidebar from "./ToolSidebar";
import DesignControls from "./DesignControls";
import LivePreview from "./LivePreview";
import InspectorPanel from "./InspectorPanel";
import ExportDialog from "./ExportDialog";

const STORAGE_KEY = "asnor-studio-design";
const initialDesign = {
  style: "Modern", palette: 0, mobilePreview: false,
  projectName: "Coffee Shop Website", heading: "More Than\nJust Coffee", tagline: "GOOD COFFEE. REAL PEOPLE.", bodyCopy: "A cozy space for great coffee, good conversations, and a stronger community.", cta: "Explore Menu", features: ["Quality Beans", "Cozy Atmosphere", "Local Community"],
  businessName: "Wicked Coffee", layout: "Editorial",
  headingFont: "Playfair Display", bodyFont: "Inter",
  buttonStyle: "Pill", motion: "Subtle",
};
type DesignState = typeof initialDesign;

export default function StudioApp() {
  const [activeTool, setActiveTool] = useState<ToolName>("Visual Style");
  const [design, setDesign] = useState<DesignState>(initialDesign);
  const [exportOpen, setExportOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const undoStack = useRef<DesignState[]>([]);
  const redoStack = useRef<DesignState[]>([]);
  const currentRef = useRef<DesignState>(initialDesign);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const restored = { ...initialDesign, ...JSON.parse(stored) };
        setDesign(restored); currentRef.current = restored;
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setSaved(false);
    const timer = window.setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(design)); setSaved(true); } catch {}
    }, 500);
    return () => window.clearTimeout(timer);
  }, [design, hydrated]);

  function updateDesign<K extends keyof DesignState>(key: K, value: DesignState[K]) {
    setDesign(current => {
      if (current[key] === value) return current;
      undoStack.current = [...undoStack.current.slice(-39), current];
      redoStack.current = [];
      const next = { ...current, [key]: value };
      currentRef.current = next;
      return next;
    });
  }
  function undo() {
    const previous = undoStack.current.pop();
    if (!previous) return;
    redoStack.current.push(currentRef.current);
    currentRef.current = previous; setDesign(previous);
  }
  function redo() {
    const next = redoStack.current.pop();
    if (!next) return;
    undoStack.current.push(currentRef.current);
    currentRef.current = next; setDesign(next);
  }
  function resetDesign() {
    undoStack.current.push(currentRef.current); redoStack.current = [];
    currentRef.current = initialDesign; setDesign(initialDesign);
  }
  function saveDesign() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(design)); setSaved(true); setExportOpen(false); } catch { setSaved(false); }
  }
  function applyPreset(name: string) {
    const presets: Record<string, Partial<DesignState>> = {
      "Coffee Editorial": { style:"Editorial", palette:1, layout:"Editorial", headingFont:"Playfair Display", buttonStyle:"Pill", businessName:"Wicked Coffee", heading:"More Than\nJust Coffee" },
      "Luxury Studio": { style:"Luxury", palette:0, layout:"Minimal", headingFont:"Georgia", buttonStyle:"Rounded" },
      "Tech Launch": { style:"Futuristic", palette:3, layout:"Grid", headingFont:"Inter", buttonStyle:"Square" },
      "Organic Wellness": { style:"Organic", palette:2, layout:"Asymmetric", headingFont:"DM Sans", buttonStyle:"Rounded" },
    };
    setDesign(current => {
      undoStack.current = [...undoStack.current.slice(-39), current]; redoStack.current = [];
      const next = { ...current, ...(presets[name] ?? {}) }; currentRef.current = next; return next;
    });
  }

  return <main className="studio">
    <StudioToolbar projectName={design.projectName} setProjectName={value => updateDesign("projectName", value)}
      mobilePreview={design.mobilePreview} setMobilePreview={value => updateDesign("mobilePreview", value)}
      saved={saved} onExport={() => setExportOpen(true)} onReset={resetDesign}
      onUndo={undo} onRedo={redo} canUndo={undoStack.current.length > 0} canRedo={redoStack.current.length > 0}
      onPreset={applyPreset} />
    <div className="workspace">
      <ToolSidebar activeTool={activeTool} onSelect={setActiveTool} />
      <DesignControls activeTool={activeTool} style={design.style} setStyle={value => updateDesign("style", value)}
        palette={design.palette} setPalette={value => updateDesign("palette", value)} layout={design.layout}
        setLayout={value => updateDesign("layout", value)} headingFont={design.headingFont}
        setHeadingFont={value => updateDesign("headingFont", value)} bodyFont={design.bodyFont}
        setBodyFont={value => updateDesign("bodyFont", value)} buttonStyle={design.buttonStyle}
        setButtonStyle={value => updateDesign("buttonStyle", value)} motion={design.motion}
        setMotion={value => updateDesign("motion", value)} />
      <LivePreview mobilePreview={design.mobilePreview} palette={design.palette} businessName={design.businessName} setBusinessName={value => updateDesign("businessName", value)}
        heading={design.heading} setHeading={value => updateDesign("heading", value)} style={design.style}
        layout={design.layout} headingFont={design.headingFont} bodyFont={design.bodyFont} buttonStyle={design.buttonStyle}
        tagline={design.tagline} setTagline={value => updateDesign("tagline", value)} bodyCopy={design.bodyCopy} setBodyCopy={value => updateDesign("bodyCopy", value)}
        cta={design.cta} setCta={value => updateDesign("cta", value)} features={design.features} setFeature={(index, value) => updateDesign("features", design.features.map((item, i) => i === index ? value : item))} />
      {inspectorOpen && <InspectorPanel businessName={design.businessName}
        setBusinessName={value => updateDesign("businessName", value)} heading={design.heading}
        setHeading={value => updateDesign("heading", value)} tagline={design.tagline} setTagline={value => updateDesign("tagline", value)} bodyCopy={design.bodyCopy} setBodyCopy={value => updateDesign("bodyCopy", value)} cta={design.cta} setCta={value => updateDesign("cta", value)} onClose={() => setInspectorOpen(false)} />}
    </div>
    {!inspectorOpen && <button className="reopenInspector" onClick={() => setInspectorOpen(true)}>Show inspector</button>}
    {exportOpen && <ExportDialog onClose={() => setExportOpen(false)} style={design.style} palette={design.palette}
      projectName={design.projectName} setProjectName={value => updateDesign("projectName", value)}
      onSave={saveDesign} design={design} />}
  </main>;
}
