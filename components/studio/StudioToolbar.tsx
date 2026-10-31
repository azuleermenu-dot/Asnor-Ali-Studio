import { Download, Monitor, Smartphone, Undo2, Redo2, ChevronDown } from "lucide-react";

type Props = {
  projectName: string; setProjectName: (value: string) => void;
  mobilePreview: boolean; setMobilePreview: (value: boolean) => void;
  saved: boolean; onExport: () => void; onReset: () => void;
  onUndo: () => void; onRedo: () => void; canUndo: boolean; canRedo: boolean;
  onPreset: (name: string) => void;
};

export default function StudioToolbar(props: Props) {
  return <header className="toolbar">
    <div className="brand"><span className="mark">A</span> ASNOR STUDIO</div>
    <div className="projectName"><input value={props.projectName} onChange={e => props.setProjectName(e.target.value)} aria-label="Project name" /></div>
    <div className="history">
      <button title="Undo" onClick={props.onUndo} disabled={!props.canUndo} aria-label="Undo"><Undo2 /></button>
      <button title="Redo" onClick={props.onRedo} disabled={!props.canRedo} aria-label="Redo"><Redo2 /></button>
      <button title="Reset changes" onClick={props.onReset} aria-label="Reset changes">↺</button>
    </div>
    <label className="presetPicker" title="Start from a design preset">
      <span>Presets <ChevronDown size={12}/></span>
      <select aria-label="Design presets" defaultValue="" onChange={e => { if (e.target.value) props.onPreset(e.target.value); e.target.value = ""; }}>
        <option value="" disabled>Choose preset</option>
        <option>Coffee Editorial</option><option>Luxury Studio</option><option>Tech Launch</option><option>Organic Wellness</option>
      </select>
    </label>
    <div className="devices">
      <button className={!props.mobilePreview ? "active" : ""} onClick={() => props.setMobilePreview(false)} aria-label="Desktop preview"><Monitor /></button>
      <button className={props.mobilePreview ? "active" : ""} onClick={() => props.setMobilePreview(true)} aria-label="Mobile preview"><Smartphone /></button>
    </div>
    <span className="saveState"><i />{props.saved ? "Autosaved" : "Saving…"}</span>
    <button className="exportBtn" onClick={props.onExport}><Download size={15} /> Export</button>
  </header>;
}