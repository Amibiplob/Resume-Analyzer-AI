"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No. Guests get instant rule-based analysis. Create a free account for OpenRouter AI-powered analysis and cover letter generation.",
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
    a: "Rule-based uses keyword matching and formatting heuristics. OpenRouter AI uses a large language model for deeper contextual analysis.",
  },
  {
    q: "Can I build a resume from scratch?",
    a: "Yes — logged-in users can use the Resume Builder in their dashboard with 3 professional templates.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-3xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
            Everything you need to know about ResumeAI.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-slate-900 dark:text-white text-sm md:text-base">
                  {f.q}
                </span>

                <span
                  className={`text-xl transition-transform duration-300 text-slate-500 dark:text-slate-400 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.a}
                </p>
              </div>

              {/* hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-b from-transparent via-transparent to-slate-100/40 dark:to-slate-800/30 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
