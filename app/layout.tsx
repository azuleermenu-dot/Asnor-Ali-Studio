import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Asnor Studio — Design Collaboration", description: "Explore visual directions, customize website preferences, and collaborate before development begins." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
