"use client";

import { templates, type Template } from "@/lib/templates";

interface Props {
  selected: Template;
  onSelect: (t: Template) => void;
}

export default function TemplateSelector({ selected, onSelect }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Choose a template</h2>
        <p className="text-sm text-muted-foreground">
          Select a resume style that matches your goal
        </p>
      </div>

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
              <div className="h-24 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground group-hover:bg-muted/70 transition">
                Preview — {t.name}
              </div>
              <p className="mt-3 font-medium text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
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
