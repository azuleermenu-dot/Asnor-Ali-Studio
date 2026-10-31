import { ArrowRight, Eye, Layers, Monitor, Palette } from "lucide-react";

type HeroProps = { onGetStarted: () => void };

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="hero">
      <div className="heroCopy">
        <div className="eyebrow">WEBSITE DESIGN COLLABORATION PLATFORM</div>
        <h1>Turn Ideas Into<br /><em>Beautiful</em> Websites</h1>
        <p>Explore design preferences, customize visual styles, and collaborate on the perfect website — before development begins.</p>
        <div className="actions">
          <button className="primary" onClick={onGetStarted}>Get Started <ArrowRight size={16} /></button>
          <a className="secondary" href="#how"><Eye size={15} /> How It Works</a>
        </div>
        <div className="featureRow">
          <span><Palette />Visual customization<small>No coding needed</small></span>
          <span><Monitor />Live preview<small>See changes instantly</small></span>
          <span><Layers />Better communication<small>Fewer misunderstandings</small></span>
        </div>
      </div>
      <div className="heroVisual" aria-label="Preview of the design studio">
        <div className="glow" />
        <div className="mockWindow">
          <div className="windowBar"><i /><i /><i /><span>asnor.studio / preview</span></div>
          <div className="mockSite">
            <div className="mockNav">A <small>STUDIO</small><span>Home　 About　 Services</span></div>
            <div className="mockText">
              <small>GOOD COFFEE. REAL PEOPLE.</small>
              <h2>Modern Websites<br />for Modern Brands</h2>
              <p>Clean. Fast. Focused on your goals.</p>
              <button onClick={onGetStarted}>Explore preview ↗</button>
            </div>
            <div className="mountain" />
          </div>
        </div>
        <div className="floatingPanel"><b>Visual Style</b><div>Minimalist</div><div className="chosen">Modern</div><div>Luxury</div><div>Editorial</div><div>Cinematic</div></div>
        <div className="palettePanel"><b>Color Palette</b><div className="dots"><i /><i /><i /><i /></div></div>
      </div>
    </section>
  );
}