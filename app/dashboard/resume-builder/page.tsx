"use client";

import { useState } from "react";
import TemplateSelector from "@/components/resume-builder/TemplateSelector";
import ResumeForm from "@/components/resume-builder/ResumeForm";
import ResumePreview from "@/components/resume-builder/ResumePreview";
import { EMPTY_RESUME, type ResumeData } from "@/lib/types";

const steps = ["template", "form", "preview"] as const;

export default function ResumeBuilderPage() {
  const [template, setTemplate] = useState<
    "modern" | "classic" | "minimal"
  >("modern");

  const [data, setData] = useState<ResumeData>(EMPTY_RESUME);
  const [step, setStep] =
    useState<(typeof steps)[number]>("template");

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Resume Builder
          </h1>
          <p className="text-sm text-muted-foreground">
            Build your resume step by step
          </p>
        </div>
      </div>

      {/* step indicator */}
      <div className="flex gap-2 text-sm">
        {steps.map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`px-3 py-1 rounded-full border transition ${
              step === s
                ? "bg-primary text-primary-foreground border-transparent"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* content */}
      <div className="rounded-xl border p-4">
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
    </div>
  );
}