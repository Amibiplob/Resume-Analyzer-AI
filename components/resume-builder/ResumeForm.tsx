"use client";
import { type ResumeData } from "@/lib/types";
import { useState } from "react";

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
        { company: "", title: "", startDate: "", endDate: "", description: "" },
      ],
    });
  const addEdu = () =>
    onChange({
      ...data,
      education: [
        ...data.education,
        { school: "", degree: "", field: "", startDate: "", endDate: "" },
      ],
    });
  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      onChange({ ...data, skills: [...data.skills, e.currentTarget.value] });
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <section>
        <h2 className="font-medium mb-3">Personal Information</h2>
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
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              className="border rounded px-3 py-2 text-sm"
            />
          ))}
        </div>
      </section>

      {/* Summary */}
      <section>
        <h2 className="font-medium mb-3">Professional Summary</h2>
        <textarea
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          rows={4}
          placeholder="Write a brief professional summary..."
          className="w-full border rounded px-3 py-2 text-sm resize-none"
        />
      </section>

      {/* Experience */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium">Experience</h2>
          <button
            onClick={addExp}
            className="text-xs text-primary hover:underline"
          >
            + Add
          </button>
        </div>
        {data.experience.map((exp, i) => (
          <div key={i} className="border rounded p-4 mb-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                value={exp.company}
                onChange={(e) => {
                  const d = [...data.experience];
                  d[i].company = e.target.value;
                  onChange({ ...data, experience: d });
                }}
                placeholder="Company"
                className="border rounded px-2 py-1.5 text-sm"
              />
              <input
                value={exp.title}
                onChange={(e) => {
                  const d = [...data.experience];
                  d[i].title = e.target.value;
                  onChange({ ...data, experience: d });
                }}
                placeholder="Job title"
                className="border rounded px-2 py-1.5 text-sm"
              />
              <input
                value={exp.startDate}
                onChange={(e) => {
                  const d = [...data.experience];
                  d[i].startDate = e.target.value;
                  onChange({ ...data, experience: d });
                }}
                placeholder="Start (e.g. Jan 2022)"
                className="border rounded px-2 py-1.5 text-sm"
              />
              <input
                value={exp.endDate}
                onChange={(e) => {
                  const d = [...data.experience];
                  d[i].endDate = e.target.value;
                  onChange({ ...data, experience: d });
                }}
                placeholder="End (or Present)"
                className="border rounded px-2 py-1.5 text-sm"
              />
            </div>
            <textarea
              value={exp.description}
              onChange={(e) => {
                const d = [...data.experience];
                d[i].description = e.target.value;
                onChange({ ...data, experience: d });
              }}
              placeholder="• Led team of 5 developers..."
              rows={3}
              className="w-full border rounded px-2 py-1.5 text-sm resize-none"
            />
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium">Education</h2>
          <button
            onClick={addEdu}
            className="text-xs text-primary hover:underline"
          >
            + Add
          </button>
        </div>
        {data.education.map((edu, i) => (
          <div
            key={i}
            className="border rounded p-4 mb-3 grid grid-cols-2 gap-2"
          >
            <input
              value={edu.school}
              onChange={(e) => {
                const d = [...data.education];
                d[i].school = e.target.value;
                onChange({ ...data, education: d });
              }}
              placeholder="School"
              className="border rounded px-2 py-1.5 text-sm"
            />
            <input
              value={edu.degree}
              onChange={(e) => {
                const d = [...data.education];
                d[i].degree = e.target.value;
                onChange({ ...data, education: d });
              }}
              placeholder="Degree"
              className="border rounded px-2 py-1.5 text-sm"
            />
            <input
              value={edu.field}
              onChange={(e) => {
                const d = [...data.education];
                d[i].field = e.target.value;
                onChange({ ...data, education: d });
              }}
              placeholder="Field of study"
              className="border rounded px-2 py-1.5 text-sm"
            />
            <div className="flex gap-2">
              <input
                value={edu.startDate}
                onChange={(e) => {
                  const d = [...data.education];
                  d[i].startDate = e.target.value;
                  onChange({ ...data, education: d });
                }}
                placeholder="Start"
                className="border rounded px-2 py-1.5 text-sm w-full"
              />
              <input
                value={edu.endDate}
                onChange={(e) => {
                  const d = [...data.education];
                  d[i].endDate = e.target.value;
                  onChange({ ...data, education: d });
                }}
                placeholder="End"
                className="border rounded px-2 py-1.5 text-sm w-full"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <h2 className="font-medium mb-3">Skills</h2>
        <input
          onKeyDown={addSkill}
          placeholder="Type a skill and press Enter"
          className="border rounded px-3 py-2 text-sm w-full mb-2"
        />
        <div className="flex flex-wrap gap-1.5">
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
                className="hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </section>

      <button
        onClick={onNext}
        className="bg-primary text-primary-foreground px-6 py-2 rounded font-medium"
      >
        Preview Resume →
      </button>
    </div>
  );
}
