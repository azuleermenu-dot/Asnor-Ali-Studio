import { ArrowRight } from "lucide-react";

type NavbarProps = {
  onGetStarted: () => void;
};

export default function Navbar({ onGetStarted }: NavbarProps) {
  return (
    <nav className="nav">
      <div className="brand"><span className="mark">A</span> ASNOR STUDIO</div>
      <div className="navlinks">
        <a href="#features">Features</a>
        <a href="#how">How it works</a>
        <a href="#pricing">Pricing</a>
      </div>
      <button className="pill" onClick={onGetStarted}>
        Get Started <ArrowRight size={15} />
      </button>
    </nav>
  );
}