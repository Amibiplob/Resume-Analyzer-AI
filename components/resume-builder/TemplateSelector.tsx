const templates = [
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
    desc: "Bold headings, ideal for leadership roles.",
  },
  {
    id: "creative",
    name: "Creative",
    desc: "Stylish layout for designers and creators.",
  },
  {
    id: "ats",
    name: "ATS Optimized",
    desc: "Keyword-focused layout for ATS systems.",
  },
] as const;

type Template = (typeof templates)[number]["id"];

export default function TemplateSelector({
  selected,
  onSelect,
}: {
  selected: Template;
  onSelect: (t: Template) => void;
}) {
  return (
    <div className="space-y-4">
      {/* header */}
      <div>
        <h2 className="text-lg font-semibold">Choose a template</h2>
        <p className="text-sm text-muted-foreground">
          Select a resume style that matches your goal
        </p>
      </div>

      {/* grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => {
          const active = selected === t.id;

          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`group relative rounded-xl border p-4 text-left transition ${
                active
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "hover:border-primary/40"
              }`}
            >
              {/* preview box */}
              <div className="h-24 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground group-hover:bg-muted/70 transition">
                Preview — {t.name}
              </div>

              {/* title */}
              <p className="mt-3 font-medium text-sm">{t.name}</p>

              {/* desc */}
              <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>

              {/* active indicator */}
              {active && (
                <div className="absolute top-2 right-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
