export const templates = [
  {
    id: "modern",
    name: "Modern",
    desc: "Clean two-column layout, great for tech roles.",
  },
  {
    id: "classic",
    name: "Classic",
    desc: "Traditional single-column, suits all industries.",
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Ultra-simple, maximum readability.",
  },
  {
    id: "executive",
    name: "Executive",
    desc: "Professional, corporate style.",
  },
  {
    id: "creative",
    name: "Creative",
    desc: "Colorful and modern, ideal for creative fields.",
  },
  { id: "ats", name: "ATS", desc: "Optimized for applicant tracking systems." },
] as const;

// Global Template type
export type Template = (typeof templates)[number]["id"];
