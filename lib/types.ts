export type DesignSettings = {
  style: string;
  palette: number;
  heading: string;
  businessName: string;
  projectName: string;
  mobilePreview: boolean;
};

export type ToolName =
  | "Visual Style"
  | "Colors"
  | "Typography"
  | "Layout"
  | "Components"
  | "Effects";