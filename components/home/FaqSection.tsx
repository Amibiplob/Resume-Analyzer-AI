"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No. Guests get instant rule-based analysis. Create a free account for Gemini AI-powered analysis and cover letter generation.",
  },
  {
    q: "What is an ATS score?",
    a: "ATS (Applicant Tracking System) score measures how well your resume is parsed and ranked by automated hiring software.",
  },
  {
    q: "How is my data used?",
    a: "Your resume text is only used for analysis. Public analyses can be seen on the Explore page — you control this setting.",
  },
  {
    q: "What is the difference between rule-based and AI?",
    a: "Rule-based uses keyword matching and formatting heuristics. Gemini AI uses a large language model for deeper contextual analysis.",
  },
  {
    q: "Can I build a resume from scratch?",
    a: "Yes — logged-in users can use the Resume Builder in their dashboard with 3 professional templates.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-4 py-3 text-sm font-medium flex justify-between items-center hover:bg-muted"
              >
                {f.q}
                <span>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p className="px-4 pb-4 text-sm text-muted-foreground">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
