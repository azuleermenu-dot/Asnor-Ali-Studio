"use client";

import { useState } from "react";
import LandingPage from "@/components/landing/LandingPage";
import StudioApp from "@/components/studio/StudioApp";

export default function HomePage() {
  const [studioOpen, setStudioOpen] = useState(false);

  if (studioOpen) {
    return <StudioApp />;
  }

  return <LandingPage onGetStarted={() => setStudioOpen(true)} />;
}
