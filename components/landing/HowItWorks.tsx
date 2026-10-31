export default function HowItWorks() {
  const steps = [
    ["01", "Explore", "Clients explore styles, colors, typography, and layout options."],
    ["02", "Customize", "Every change appears instantly in an interactive website preview."],
    ["03", "Share", "Export a clear design brief to guide the development process."],
  ];
  return (
    <section className="how" id="how">
      <div><span className="eyebrow">A BETTER WAY TO COLLABORATE</span><h2>From first idea<br />to shared vision.</h2></div>
      <div className="steps">
        {steps.map(([number, title, description]) => (
          <article key={number}><b>{number}</b><h3>{title}</h3><p>{description}</p></article>
        ))}
      </div>
    </section>
  );
}