import { Layers, Palette, Type, Layout, Component, Sparkles } from "lucide-react";
import type { ToolName } from "@/lib/types";

const tools = [
  { name: "Visual Style" as ToolName, icon: Layers },
  { name: "Colors" as ToolName, icon: Palette },
  { name: "Typography" as ToolName, icon: Type },
  { name: "Layout" as ToolName, icon: Layout },
  { name: "Components" as ToolName, icon: Component },
  { name: "Effects" as ToolName, icon: Sparkles },
];

type Props = { activeTool: ToolName; onSelect: (tool: ToolName) => void };

export default function ToolSidebar({ activeTool, onSelect }: Props) {
  return (
    <aside className="toolRail" aria-label="Design tools">
      {tools.map(({ name, icon: Icon }) => (
        <button key={name} className={activeTool === name ? "selected" : ""} onClick={() => onSelect(name)}>
          <Icon /><span>{name}</span>
        </button>
      ))}
    </aside>
  );
}