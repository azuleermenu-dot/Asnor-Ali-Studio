import { Check } from "lucide-react";
import { colorPalettes, visualStyles } from "@/lib/design-presets";
import type { ToolName } from "@/lib/types";

type Props = {
  activeTool: ToolName;
  style: string;
  setStyle: (value: string) => void;
  palette: number;
  setPalette: (value: number) => void;
  layout: string;
  setLayout: (value: string) => void;
  headingFont: string;
  setHeadingFont: (value: string) => void;
  bodyFont: string;
  setBodyFont: (value: string) => void;
  buttonStyle: string;
  setButtonStyle: (value: string) => void;
  motion: string;
  setMotion: (value: string) => void;
};

const layoutOptions = ["Editorial", "Minimal", "Grid", "Asymmetric", "Card-based"];

export default function DesignControls(props: Props) {
  const { activeTool } = props;

  return (
    <aside className="controls">
      <div className="panelHead"><b>{activeTool}</b></div>

      {activeTool === "Visual Style" && (
        <>
          <p className="muted">Choose a visual direction</p>
          {visualStyles.map(item => (
            <button
              key={item}
              className={`styleOption ${props.style === item ? "on" : ""}`}
              onClick={() => props.setStyle(item)}
            >
              <span className="styleThumb">{item.slice(0, 1)}</span>
              {item}
              {props.style === item && <Check size={14} />}
            </button>
          ))}
        </>
      )}

      {activeTool === "Colors" && (
        <>
          <p className="muted">Choose a palette</p>
          <div className="paletteGrid">
            {colorPalettes.map((colors, index) => (
              <button
                key={index}
                className={props.palette === index ? "palOn" : ""}
                onClick={() => props.setPalette(index)}
                aria-label={`Palette ${index + 1}`}
                aria-pressed={props.palette === index}
              >
                {colors.map(color => <i key={color} style={{ background: color }} />)}
              </button>
            ))}
          </div>
        </>
      )}

      {activeTool === "Typography" && (
        <>
          <label>Heading font
            <select value={props.headingFont} onChange={event => props.setHeadingFont(event.target.value)}>
              <option>Playfair Display</option><option>Inter</option><option>DM Sans</option><option>Georgia</option>
            </select>
          </label>
          <label>Body font
            <select value={props.bodyFont} onChange={event => props.setBodyFont(event.target.value)}>
              <option>Inter</option><option>DM Sans</option><option>Arial</option>
            </select>
          </label>
        </>
      )}

      {activeTool === "Layout" && layoutOptions.map(item => (
        <button key={item} className={`styleOption ${props.layout === item ? "on" : ""}`} onClick={() => props.setLayout(item)}>
          {item}{props.layout === item && <Check size={14} />}
        </button>
      ))}

      {activeTool === "Components" && (
        <>
          <p className="muted">Button appearance</p>
          {["Pill", "Rounded", "Square"].map(item => (
            <button key={item} className={`styleOption ${props.buttonStyle === item ? "on" : ""}`} onClick={() => props.setButtonStyle(item)}>
              {item}{props.buttonStyle === item && <Check size={14} />}
            </button>
          ))}
        </>
      )}

      {activeTool === "Effects" && (
        <>
          <label>Motion preference
            <select value={props.motion} onChange={event => props.setMotion(event.target.value)}>
              <option>Subtle</option><option>Playful</option><option>None</option>
            </select>
          </label>
          <p className="muted">Motion setting is saved with your design brief.</p>
        </>
      )}
    </aside>
  );
}