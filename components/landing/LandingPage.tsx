"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";

type LandingPageProps = { onGetStarted: () => void };

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <main className="landing">
      <Navbar onGetStarted={onGetStarted} />
      <Hero onGetStarted={onGetStarted} />
      <HowItWorks />
      <footer>
        <span className="brand"><span className="mark">A</span> ASNOR STUDIO</span>
        <span>Design together. Build with clarity.</span>
      </footer>
    </main>
  );
}