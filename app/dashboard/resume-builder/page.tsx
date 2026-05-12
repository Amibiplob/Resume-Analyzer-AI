"use client";
import { useState } from "react";
import TemplateSelector from "@/components/resume-builder/TemplateSelector";
import ResumeForm from "@/components/resume-builder/ResumeForm";
import ResumePreview from "@/components/resume-builder/ResumePreview";
import { EMPTY_RESUME, type ResumeData } from "@/lib/types";

export default function ResumeBuilderPage() {
  const [template, setTemplate] = useState<"modern" | "classic" | "minimal">(
    "modern",
  );
  const [data, setData] = useState<ResumeData>(EMPTY_RESUME);
  const [step, setStep] = useState<"template" | "form" | "preview">("template");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Resume Builder</h1>
        <div className="flex gap-2 text-sm">
          {(["template", "form", "preview"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`px-3 py-1 rounded capitalize ${step === s ? "bg-primary text-primary-foreground" : "border"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {step === "template" && (
        <TemplateSelector
          selected={template}
          onSelect={(t) => {
            setTemplate(t);
            setStep("form");
          }}
        />
      )}
      {step === "form" && (
        <ResumeForm
          data={data}
          onChange={setData}
          onNext={() => setStep("preview")}
        />
      )}
      {step === "preview" && (
        <ResumePreview
          data={data}
          template={template}
          onBack={() => setStep("form")}
        />
      )}
    </div>
  );
}
