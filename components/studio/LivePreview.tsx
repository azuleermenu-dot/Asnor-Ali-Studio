import { MousePointer2, WandSparkles } from "lucide-react";
import { colorPalettes } from "@/lib/design-presets";

type Props = {
  mobilePreview: boolean;
  palette: number;
  businessName: string;
  heading: string;
  setHeading: (value: string) => void;
  style: string;
  layout: string;
  headingFont: string;
  buttonStyle: string;
};

export default function LivePreview(props: Props) {
  const colors = colorPalettes[props.palette] ?? colorPalettes[0];
  const layoutClass = props.layout.toLowerCase().replace(/[^a-z]+/g, "-");
  const radius = props.buttonStyle === "Pill" ? "999px" : props.buttonStyle === "Square" ? "5px" : "14px";

  return (
    <section className="canvasArea">
      <div className="canvasTop">
        <span><MousePointer2 size={14} /> Live website preview</span>
        <span>{props.mobilePreview ? "Mobile viewport" : "Desktop viewport"}</span>
      </div>
      <div
        className={`previewFrame ${props.mobilePreview ? "phone" : ""} layout-${layoutClass}`}
        style={{ background: colors[0], color: colors[1] }}
      >
        <div className="previewNav">
          <b>{props.businessName.toUpperCase()}</b>
          <span>Home　 Menu　 About　 Contact</span>
          <span>⌕</span>
        </div>
        <div className="previewHero">
          <div className="previewCopy">
            <small>GOOD COFFEE. REAL PEOPLE.</small>
            <h1
              style={{ fontFamily: props.headingFont }}
              contentEditable
              suppressContentEditableWarning
              role="textbox"
              aria-label="Edit hero headline"
              onInput={event => props.setHeading(event.currentTarget.innerText)}
            >
              {props.heading}
            </h1>
            <p>A cozy space for great coffee, good conversations,<br />and a stronger community.</p>
            <button style={{ background: colors[2], borderRadius: radius }}>Explore Menu　↗</button>
          </div>
          <div className="coffeeArt" aria-hidden="true"><div className="cup">☕</div></div>
        </div>
        <div className="previewFeatures"><span>✧ Quality Beans</span><span>☼ Cozy Atmosphere</span><span>⌂ Local Community</span></div>
      </div>
      <div className="canvasHint"><WandSparkles size={14} /> Select a tool to customize. Edit the headline directly in the preview.</div>
    </section>
  );
}