import { Check, X } from "lucide-react";

type Props = { onClose: () => void; style: string; palette: number; projectName: string; setProjectName: (value: string) => void; onSave: () => void };

export default function ExportDialog({ onClose, style, palette, projectName, setProjectName, onSave }: Props) {
  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="export-title">
      <div className="exportModal">
        <div className="panelHead"><b id="export-title">Export Design Brief</b><button onClick={onClose} aria-label="Close"><X /></button></div>
        <p>Review your design preferences before exporting.</p>
        <label>Client name<input placeholder="Client name" /></label>
        <label>Client email<input type="email" placeholder="client@example.com" /></label>
        <label>Project name<input value={projectName} onChange={event => setProjectName(event.target.value)} /></label>
        <div className="summary"><span>Visual style <b>{style}</b></span><span>Palette <b>Palette {palette + 1}</b></span><span>Preview <b>Interactive design</b></span></div>
        <button className="primary" onClick={onSave}>Save Design Brief <Check size={15} /></button>
        <small className="muted">Prototype only: PDF, email, and share-link services are not connected yet.</small>
      </div>
    </div>
  );
}