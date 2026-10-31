"use client";

import { useEffect, useState } from "react";
import type { ToolName } from "@/lib/types";
import StudioToolbar from "./StudioToolbar";
import ToolSidebar from "./ToolSidebar";
import DesignControls from "./DesignControls";
import LivePreview from "./LivePreview";
import InspectorPanel from "./InspectorPanel";
import ExportDialog from "./ExportDialog";

const STORAGE_KEY = "asnor-studio-design";
const initialDesign = {
  style: "Modern",
  palette: 0,
  mobilePreview: false,
  projectName: "Coffee Shop Website",
  heading: "More Than\nJust Coffee",
  businessName: "Wicked Coffee",
  layout: "Editorial",
  headingFont: "Playfair Display",
  bodyFont: "Inter",
  buttonStyle: "Pill",
  motion: "Subtle",
};

type DesignState = typeof initialDesign;

export default function StudioApp() {
  const [activeTool, setActiveTool] = useState<ToolName>("Visual Style");
  const [design, setDesign] = useState<DesignState>(initialDesign);
  const [exportOpen, setExportOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setDesign({ ...initialDesign, ...JSON.parse(stored) });
    } catch {
      // Keep the default design if saved data is invalid.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setSaved(false);
  }, [design, hydrated]);

  function updateDesign<K extends keyof DesignState>(key: K, value: DesignState[K]) {
    setDesign(current => ({ ...current, [key]: value }));
  }

  function resetDesign() {
    setDesign(initialDesign);
    setSaved(false);
  }

  function saveDesign() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(design));
      setSaved(true);
      setExportOpen(false);
    } catch {
      setSaved(false);
    }
  }

  return (
    <main className="studio">
      <StudioToolbar
        projectName={design.projectName}
        setProjectName={value => updateDesign("projectName", value)}
        mobilePreview={design.mobilePreview}
        setMobilePreview={value => updateDesign("mobilePreview", value)}
        saved={saved}
        onExport={() => setExportOpen(true)}
        onReset={resetDesign}
      />
      <div className="workspace">
        <ToolSidebar activeTool={activeTool} onSelect={setActiveTool} />
        <DesignControls
          activeTool={activeTool}
          style={design.style}
          setStyle={value => updateDesign("style", value)}
          palette={design.palette}
          setPalette={value => updateDesign("palette", value)}
          layout={design.layout}
          setLayout={value => updateDesign("layout", value)}
          headingFont={design.headingFont}
          setHeadingFont={value => updateDesign("headingFont", value)}
          bodyFont={design.bodyFont}
          setBodyFont={value => updateDesign("bodyFont", value)}
          buttonStyle={design.buttonStyle}
          setButtonStyle={value => updateDesign("buttonStyle", value)}
          motion={design.motion}
          setMotion={value => updateDesign("motion", value)}
        />
        <LivePreview
          mobilePreview={design.mobilePreview}
          palette={design.palette}
          businessName={design.businessName}
          heading={design.heading}
          setHeading={value => updateDesign("heading", value)}
          style={design.style}
          layout={design.layout}
          headingFont={design.headingFont}
          buttonStyle={design.buttonStyle}
        />
        {inspectorOpen && (
          <InspectorPanel
            businessName={design.businessName}
            setBusinessName={value => updateDesign("businessName", value)}
            heading={design.heading}
            setHeading={value => updateDesign("heading", value)}
            onClose={() => setInspectorOpen(false)}
          />
        )}
      </div>
      {!inspectorOpen && (
        <button className="reopenInspector" onClick={() => setInspectorOpen(true)}>
          Show inspector
        </button>
      )}
      {exportOpen && (
        <ExportDialog
          onClose={() => setExportOpen(false)}
          style={design.style}
          palette={design.palette}
          projectName={design.projectName}
          setProjectName={value => updateDesign("projectName", value)}
          onSave={saveDesign}
        />
      )}
    </main>
  );
}