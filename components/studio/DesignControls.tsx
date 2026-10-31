import { Check } from "lucide-react";
import { colorPalettes, visualStyles } from "@/lib/design-presets";
import type { ToolName } from "@/lib/types";

type Props = {
  activeTool: ToolName;
  style: string;
  setStyle: (value: string) => void;
  palette: number;
  setPalette: (value: number) => void;
};

export default function DesignControls({ activeTool, style, setStyle, palette, setPalette }: Props) {
  return (
    <aside className="controls">
      <div className="panelHead"><b>{activeTool}</b></div>
      {activeTool === "Visual Style" && <>
        <p className="muted">Choose a direction</p>
        {visualStyles.map(item => (
          <button key={item} className={`styleOption ${style === item ? "on" : ""}`} onClick={() => setStyle(item)}>
            <span className="styleThumb">{item.slice(0, 1)}</span>{item}
            {style === item && <Check size={14} />}
          </button>
        ))}
      </>}
      {activeTool === "Colors" && <>
        <p className="muted">Preset palettes</p>
        <div className="paletteGrid">
          {colorPalettes.map((colors, index) => (
            <button key={index} className={palette === index ? "palOn" : ""} onClick={() => setPalette(index)} aria-label={`Palette ${index + 1}`}>
              {colors.map(color => <i key={color} style={{ background: color }} />)}
            </button>
          ))}
        </div>
      </>}
      {activeTool === "Typography" && <>
        <label>Heading font<select><option>Playfair Display</option><option>Inter</option><option>DM Sans</option></select></label>
        <label>Body font<select><option>Inter</option><option>DM Sans</option></select></label>
        <label>Heading scale<input type="range" min="1" max="5" /></label>
      </>}
      {activeTool === "Layout" && ["Minimal", "Editorial", "Grid", "Asymmetric", "Card-based"].map(item => <button className="styleOption" key={item}>{item}</button>)}
      {activeTool === "Components" && ["Navigation", "Buttons", "Cards", "Hero section", "Footer"].map(item => <button className="styleOption" key={item}>{item}</button>)}
      {activeTool === "Effects" && <>
        <label>Glass intensity<input type="range" /></label>
        <label>Corner radius<input type="range" /></label>
        <label>Motion<select><option>Subtle</option><option>Playful</option><option>None</option></select></label>
      </>}
    </aside>
  );
}