import { Download, Monitor, Smartphone, Undo2, Redo2 } from "lucide-react";

type Props = {
  projectName: string;
  setProjectName: (value: string) => void;
  mobilePreview: boolean;
  setMobilePreview: (value: boolean) => void;
  saved: boolean;
  onExport: () => void;
  onReset: () => void;
};

export default function StudioToolbar(props: Props) {
  return (
    <header className="toolbar">
      <div className="brand"><span className="mark">A</span> ASNOR STUDIO</div>
      <div className="projectName"><input value={props.projectName} onChange={e => props.setProjectName(e.target.value)} aria-label="Project name" /></div>
      <div className="history">
        <button title="Undo" disabled><Undo2 /></button><button title="Redo" disabled><Redo2 /></button>
        <button title="Reset changes" onClick={props.onReset}>↺</button>
      </div>
      <div className="devices">
        <button className={!props.mobilePreview ? "active" : ""} onClick={() => props.setMobilePreview(false)} aria-label="Desktop preview"><Monitor /></button>
        <button className={props.mobilePreview ? "active" : ""} onClick={() => props.setMobilePreview(true)} aria-label="Mobile preview"><Smartphone /></button>
      </div>
      <span className="saveState"><i />{props.saved ? "Saved locally" : "Unsaved changes"}</span>
      <button className="exportBtn" onClick={props.onExport}><Download size={15} /> Export</button>
    </header>
  );
}