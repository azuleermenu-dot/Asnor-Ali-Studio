import { MousePointer2, WandSparkles } from "lucide-react";
import { colorPalettes } from "@/lib/design-presets";

type Props = {
  mobilePreview: boolean;
  palette: number;
  businessName: string;
  heading: string;
  setHeading: (value: string) => void;
};

export default function LivePreview({ mobilePreview, palette, businessName, heading, setHeading }: Props) {
  const colors = colorPalettes[palette];
  return (
    <section className="canvasArea">
      <div className="canvasTop"><span><MousePointer2 size={14} /> Live website preview</span><span>{mobilePreview ? "Mobile" : "100%"}</span></div>
      <div className={`previewFrame ${mobilePreview ? "phone" : ""}`} style={{ background: colors[0] }}>
        <div className="previewNav"><b>{businessName.toUpperCase()}</b><span>Home　 Menu　 About　 Contact</span><span>⌕</span></div>
        <div className="previewHero">
          <div>
            <small>GOOD COFFEE. REAL PEOPLE.</small>
            <h1 contentEditable suppressContentEditableWarning onInput={event => setHeading(event.currentTarget.innerText)}>{heading}</h1>
            <p>A cozy space for great coffee, good conversations,<br />and a stronger community.</p>
            <button style={{ background: colors[2] }}>Explore Menu　↗</button>
          </div>
          <div className="coffeeArt"><div className="cup">☕</div></div>
        </div>
        <div className="previewFeatures"><span>✧ Quality Beans</span><span>☼ Cozy Atmosphere</span><span>⌂ Local Community</span></div>
      </div>
      <div className="canvasHint"><WandSparkles size={14} /> Changes update in the preview as you customize</div>
    </section>
  );
}