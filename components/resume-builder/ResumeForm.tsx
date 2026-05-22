"use client";

import type { KeyboardEvent } from "react";
import type { ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
  onNext: () => void;
}

export default function ResumeForm({ data, onChange, onNext }: Props) {
  const set = (path: string, value: unknown) => {
    const keys = path.split(".");

    const newData = structuredClone(data);

    let obj: any = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }

    obj[keys[keys.length - 1]] = value;

    onChange(newData);
  };

  const addExp = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          company: "",
          title: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const addEdu = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          school: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const addSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();

      onChange({
        ...data,
        skills: [...data.skills, e.currentTarget.value],
      });

      e.currentTarget.value = "";
    }
  };

  return (
    <div className="space-y-8">
      {/* PERSONAL INFO */}
      <section className="p-5 space-y-4">
        <h2 className="font-semibold">Personal Information</h2>

        <div className="grid md:grid-cols-2 gap-3">
          {(
            [
              "name",
              "email",
              "phone",
              "location",
              "website",
              "linkedin",
            ] as const
          ).map((f) => (
            <input
              key={f}
              value={data.personalInfo[f] || ""}
              onChange={(e) => set(`personalInfo.${f}`, e.target.value)}
              placeholder={f}
              className="border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          ))}
        </div>
      </section>

      {/* SUMMARY */}
      <section className="border-t p-5 space-y-3">
        <h2 className="font-semibold">Summary</h2>

        <textarea
          value={data.summary}
          onChange={(e) =>
            onChange({
              ...data,
              summary: e.target.value,
            })
          }
          rows={4}
          placeholder="Short professional summary..."
          className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </section>

      {/* EXPERIENCE */}
      <section className="rounded-xl border p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Experience</h2>

          <button
            type="button"
            onClick={addExp}
            className="text-sm text-primary hover:underline"
          >
            + Add
          </button>
        </div>

        {data.experience.map((exp, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="grid md:grid-cols-2 gap-2">
              <input
                value={exp.company}
                onChange={(e) => {
                  const d = data.experience.map((item, idx) =>
                    idx === i
                      ? {
                          ...item,
                          company: e.target.value,
                        }
                      : item,
                  );

                  onChange({
                    ...data,
                    experience: d,
                  });
                }}
                placeholder="Company"
                className="border rounded px-3 py-2 text-sm"
              />

              <input
                value={exp.title}
                onChange={(e) => {
                  const d = data.experience.map((item, idx) =>
                    idx === i
                      ? {
                          ...item,
                          title: e.target.value,
                        }
                      : item,
                  );

                  onChange({
                    ...data,
                    experience: d,
                  });
                }}
                placeholder="Title"
                className="border rounded px-3 py-2 text-sm"
              />
            </div>

            <textarea
              value={exp.description}
              onChange={(e) => {
                const d = data.experience.map((item, idx) =>
                  idx === i
                    ? {
                        ...item,
                        description: e.target.value,
                      }
                    : item,
                );

                onChange({
                  ...data,
                  experience: d,
                });
              }}
              rows={3}
              placeholder="Describe your work..."
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        ))}
      </section>

      {/* SKILLS */}
      <section className="rounded-xl border p-5 space-y-3">
        <h2 className="font-semibold">Skills</h2>

        <input
          onKeyDown={addSkill}
          placeholder="Type skill and press Enter"
          className="w-full border rounded px-3 py-2 text-sm"
        />

        <div className="flex flex-wrap gap-2">
          {data.skills.map((s, i) => (
            <span
              key={i}
              className="text-xs bg-muted px-2 py-1 rounded flex items-center gap-1"
            >
              {s}

              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...data,
                    skills: data.skills.filter((_, j) => j !== i),
                  })
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </section>

      <div className="sticky bottom-0 bg-background pt-4">
        <button
          type="button"
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium"
        >
          Preview Resume →
        </button>
      </div>
    </div>
  );
}
