"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

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
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-black py-10 transition-colors">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-75 w-75 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-600 dark:text-violet-300 backdrop-blur">
            FAQs
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Questions? <br />
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
              We’ve got answers.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Everything you need to know about ResumeAI, ATS scoring, AI-powered
            resume analysis, and building better applications.
          </p>
        </div>

        {/* faq list */}
        <div className="space-y-5">
          {faqs.map((faq, i) => {
            const active = open === i;

            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                  active
                    ? "border-violet-500/40 bg-white dark:bg-slate-900 shadow-2xl shadow-violet-500/10"
                    : "border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-violet-400/30"
                } backdrop-blur-xl`}
              >
                {/* glow hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5" />

                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="relative flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-6 text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                      active
                        ? "rotate-180 border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-300"
                        : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    active
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-5" />

                      <p className="text-sm md:text-base leading-7 text-slate-600 dark:text-slate-400">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* bottom card */}
        <div className="mt-14 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-8 text-center shadow-xl">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Still have questions?
          </h3>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Contact our support team and we’ll help you get started.
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:shadow-violet-500/40"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
