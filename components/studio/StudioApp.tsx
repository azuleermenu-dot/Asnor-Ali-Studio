"use client";

import { useState } from "react";
import type { ToolName } from "@/lib/types";
import StudioToolbar from "./StudioToolbar";
import ToolSidebar from "./ToolSidebar";
import DesignControls from "./DesignControls";
import LivePreview from "./LivePreview";
import InspectorPanel from "./InspectorPanel";
import ExportDialog from "./ExportDialog";

const initialHeading = "More Than\nJust Coffee";

export default function StudioApp() {
  const [activeTool, setActiveTool] = useState<ToolName>("Visual Style");
  const [style, setStyle] = useState("Modern");
  const [palette, setPalette] = useState(0);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [projectName, setProjectName] = useState("Coffee Shop Website");
  const [heading, setHeading] = useState(initialHeading);
  const [businessName, setBusinessName] = useState("Wicked Coffee");

  function resetDesign() {
    setStyle("Modern");
    setPalette(0);
    setHeading(initialHeading);
    setBusinessName("Wicked Coffee");
    setSaved(false);
  }

  function saveDesign() {
    const config = { style, palette, heading, businessName, projectName };
    try {
      localStorage.setItem("asnor-studio-design", JSON.stringify(config));
      setSaved(true);
      setExportOpen(false);
    } catch {
      setSaved(false);
    }
  }

  return (
    <main className="studio">
      <StudioToolbar projectName={projectName} setProjectName={setProjectName} mobilePreview={mobilePreview} setMobilePreview={setMobilePreview} saved={saved} onExport={() => setExportOpen(true)} onReset={resetDesign} />
      <div className="workspace">
        <ToolSidebar activeTool={activeTool} onSelect={setActiveTool} />
        <DesignControls activeTool={activeTool} style={style} setStyle={value => { setStyle(value); setSaved(false); }} palette={palette} setPalette={value => { setPalette(value); setSaved(false); }} />
        <LivePreview mobilePreview={mobilePreview} palette={palette} businessName={businessName} heading={heading} setHeading={value => { setHeading(value); setSaved(false); }} />
        <InspectorPanel businessName={businessName} setBusinessName={value => { setBusinessName(value); setSaved(false); }} heading={heading} setHeading={value => { setHeading(value); setSaved(false); }} />
      </div>
      {exportOpen && <ExportDialog onClose={() => setExportOpen(false)} style={style} palette={palette} projectName={projectName} setProjectName={setProjectName} onSave={saveDesign} />}
    </main>
  );
}