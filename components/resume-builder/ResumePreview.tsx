"use client";

import type { ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
  template: "modern" | "classic" | "minimal";
  onBack: () => void;
}

export default function ResumePreview({ data, template, onBack }: Props) {
  const { personalInfo: p, summary, experience, education, skills } = data;

  return (
    <div className="space-y-4">
      {/* actions */}
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
          Download PDF
        </button>
      </div>

      {/* resume */}
      <div
        id="resume-preview"
        className={`
          bg-white text-black p-8 mx-auto max-w-2xl border shadow-sm
          print:shadow-none print:border-none print:p-6
          ${template === "minimal" ? "text-sm" : ""}
        `}
        style={{
          fontFamily:
            template === "classic" ? "Georgia, serif" : "Inter, sans-serif",
        }}
      >
        {/* HEADER */}
        <header
          className={`mb-6 ${
            template === "modern" ? "border-b pb-4" : "text-center"
          }`}
        >
          <h1 className="text-2xl font-bold tracking-tight">
            {p.name || "Your Name"}
          </h1>

          <div className="mt-1 text-xs text-gray-600 flex flex-wrap gap-x-3 justify-center">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.location && <span>{p.location}</span>}
            {p.website && <span>{p.website}</span>}
            {p.linkedin && <span>{p.linkedin}</span>}
          </div>
        </header>

        {/* SUMMARY */}
        {summary && (
          <section className="mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-2">
              Summary
            </h2>
            <p className="text-sm leading-relaxed text-gray-800">{summary}</p>
          </section>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 border-b pb-1">
              Experience
            </h2>

            {experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold">{exp.title}</p>
                    <p className="text-xs text-gray-700">{exp.company}</p>
                  </div>

                  <p className="text-xs text-gray-500">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </p>
                </div>

                <p className="text-xs mt-1 text-gray-700 whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 border-b pb-1">
              Education
            </h2>

            {education.map((edu, i) => (
              <div key={i} className="flex justify-between text-sm mb-2">
                <div>
                  <p className="font-medium">
                    {edu.degree} {edu.field}
                  </p>
                  <p className="text-xs text-gray-700">{edu.school}</p>
                </div>

                <p className="text-xs text-gray-500">
                  {edu.startDate} – {edu.endDate}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 border-b pb-1">
              Skills
            </h2>

            <p className="text-xs text-gray-800">{skills.join(" • ")}</p>
          </section>
        )}
      </div>
    </div>
  );
}
