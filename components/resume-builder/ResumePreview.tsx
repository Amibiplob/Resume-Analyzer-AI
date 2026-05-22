"use client";

import type { ResumeData } from "@/lib/types";
import type { Template } from "@/lib/templates";

interface Props {
  data: ResumeData;
  template: Template;
  onBack: () => void;
}

export default function ResumePreview({ data, template, onBack }: Props) {
  const { personalInfo: p, summary, experience, education, skills } = data;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm text-primary hover:underline"
        >
          ← Edit
        </button>
        <button
          onClick={() => window.print()}
          className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm"
        >
          Download / Print PDF
        </button>
      </div>

      <div
        id="resume-preview"
        className={`bg-white text-black p-8 max-w-2xl mx-auto border shadow-sm print:shadow-none print:border-none
          ${
            template === "modern"
              ? "font-sans"
              : template === "classic"
                ? "font-serif"
                : "font-mono text-sm"
          }`}
        style={{
          fontFamily: template === "classic" ? "Georgia, serif" : undefined,
        }}
      >
        <div
          className={`mb-6 ${template === "modern" ? "border-b-2 border-black pb-4" : "text-center mb-6"}`}
        >
          <h1 className="text-2xl font-bold">{p.name || "Your Name"}</h1>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-600 mt-1">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.location && <span>{p.location}</span>}
            {p.website && <span>{p.website}</span>}
            {p.linkedin && <span>{p.linkedin}</span>}
          </div>
        </div>

        {summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 border-b pb-0.5">
              Summary
            </h2>
            <p className="text-sm leading-relaxed">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 border-b pb-0.5">
              Experience
            </h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <p className="font-semibold text-sm">
                    {exp.title}
                    {exp.company && ` — ${exp.company}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {exp.startDate}
                    {exp.endDate && ` – ${exp.endDate}`}
                  </p>
                </div>
                <p className="text-xs mt-1 whitespace-pre-line text-gray-700">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 border-b pb-0.5">
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-2 flex justify-between text-sm">
                <p>
                  <span className="font-semibold">
                    {edu.degree} {edu.field}
                  </span>
                  {edu.school && ` — ${edu.school}`}
                </p>
                <p className="text-xs text-gray-500">
                  {edu.startDate}
                  {edu.endDate && ` – ${edu.endDate}`}
                </p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 border-b pb-0.5">
              Skills
            </h2>
            <p className="text-xs">{skills.join(" · ")}</p>
          </section>
        )}
      </div>
    </div>
  );
}
