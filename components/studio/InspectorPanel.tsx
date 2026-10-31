import { X } from "lucide-react";

type Props = {
  businessName: string;
  setBusinessName: (value: string) => void;
  heading: string;
  setHeading: (value: string) => void;
};

export default function InspectorPanel({ businessName, setBusinessName, heading, setHeading }: Props) {
  return (
    <aside className="inspector">
      <div className="panelHead"><b>Hero Section</b><button aria-label="Close inspector"><X size={15} /></button></div>
      <div className="tabs"><button className="active">Style</button><button>Content</button><button>Layout</button></div>
      <label>Business name<input value={businessName} onChange={event => setBusinessName(event.target.value)} /></label>
      <label>Hero headline<textarea value={heading} onChange={event => setHeading(event.target.value)} /></label>
      <label>Background style<select><option>Warm café photo</option><option>Solid color</option><option>Gradient</option></select></label>
      <label>Overlay<input type="range" /></label>
      <label>Text alignment<select><option>Left</option><option>Center</option></select></label>
    </aside>
  );
}