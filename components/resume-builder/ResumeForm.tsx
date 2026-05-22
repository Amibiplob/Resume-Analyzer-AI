"use client";

import { type ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
  onNext: () => void;
}

export default function ResumeForm({ data, onChange, onNext }: Props) {
  const set = (path: string, value: any) => {
    const keys = path.split(".");
    const newData = structuredClone(data);

    let obj: any = newData;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];

    obj[keys[keys.length - 1]] = value;
    onChange(newData);
  };

  const addExp = () =>
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

  const addEdu = () =>
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

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
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
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
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
                  const d = [...data.experience];
                  d[i].company = e.target.value;
                  onChange({ ...data, experience: d });
                }}
                placeholder="Company"
                className="border rounded px-3 py-2 text-sm"
              />

              <input
                value={exp.title}
                onChange={(e) => {
                  const d = [...data.experience];
                  d[i].title = e.target.value;
                  onChange({ ...data, experience: d });
                }}
                placeholder="Title"
                className="border rounded px-3 py-2 text-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-2">
              <input
                value={exp.startDate}
                onChange={(e) => {
                  const d = [...data.experience];
                  d[i].startDate = e.target.value;
                  onChange({ ...data, experience: d });
                }}
                placeholder="Start date"
                className="border rounded px-3 py-2 text-sm"
              />

              <input
                value={exp.endDate}
                onChange={(e) => {
                  const d = [...data.experience];
                  d[i].endDate = e.target.value;
                  onChange({ ...data, experience: d });
                }}
                placeholder="End date"
                className="border rounded px-3 py-2 text-sm"
              />
            </div>

            <textarea
              value={exp.description}
              onChange={(e) => {
                const d = [...data.experience];
                d[i].description = e.target.value;
                onChange({ ...data, experience: d });
              }}
              rows={3}
              placeholder="Describe your work..."
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        ))}
      </section>

      {/* EDUCATION */}
      <section className="rounded-xl border p-5 space-y-4">
        <div className="flex justify-between">
          <h2 className="font-semibold">Education</h2>
          <button
            onClick={addEdu}
            className="text-sm text-primary hover:underline"
          >
            + Add
          </button>
        </div>

        {data.education.map((edu, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 grid md:grid-cols-2 gap-2"
          >
            <input
              value={edu.school}
              onChange={(e) => {
                const d = [...data.education];
                d[i].school = e.target.value;
                onChange({ ...data, education: d });
              }}
              placeholder="School"
              className="border rounded px-3 py-2 text-sm"
            />

            <input
              value={edu.degree}
              onChange={(e) => {
                const d = [...data.education];
                d[i].degree = e.target.value;
                onChange({ ...data, education: d });
              }}
              placeholder="Degree"
              className="border rounded px-3 py-2 text-sm"
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

      {/* ACTION */}
      <div className="sticky bottom-0 bg-background pt-4">
        <button
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium"
        >
          Preview Resume →
        </button>
      </div>
    </div>
  );
}
