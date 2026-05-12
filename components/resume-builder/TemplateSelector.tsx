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
    <div className="space-y-3">
      <h2 className="font-medium">Choose a template</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`border rounded-lg p-5 text-left transition-colors ${selected === t.id ? "border-primary ring-1 ring-primary bg-primary/5" : "hover:border-primary/50"}`}
          >
            <div className="h-20 bg-muted rounded mb-3 flex items-center justify-center text-xs text-muted-foreground">
              Preview — {t.name}
            </div>
            <p className="font-medium text-sm">{t.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
