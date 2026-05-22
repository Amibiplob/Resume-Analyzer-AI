"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

import {
  Sparkles,
  Copy,
  Wand2,
  Lock,
  FileText,
  Building2,
  Briefcase,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function CoverLetterTab({
  resumeText,
  analysisId,
}: {
  resumeText: string;
  analysisId: string;
}) {
  const { data: session } = useSession();

  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  // not logged in
  if (!session) {
    return (
      <div className="relative overflow-hidden">
        {/* glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-xl">
            <Lock className="text-white" size={36} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
            Unlock AI Cover Letters
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            Create personalized AI-generated cover letters tailored to your
            resume, job title, and company in seconds.
          </p>

          {/* features */}
          <div className="mt-8 grid gap-4 text-left">
            {[
              "Tailored for specific job roles",
              "Professional recruiter-friendly formatting",
              "Optimized using your ATS analysis",
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4"
              >
                <CheckCircle2 className="text-green-500 shrink-0" size={20} />

                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02]"
          >
            <Sparkles size={18} />
            Create Free Account
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/cover-letter", {
        resumeText,
        analysisId,
        jobTitle: data.jobTitle,
        company: data.company,
        jobDescription: data.jobDescription,
      });

      setLetter(res.data.content);

      toast.success("Cover letter generated!");
    } catch {
      toast.error("Failed. Check your OpenRouter API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* header */}
      <div className="border-b border-slate-200 dark:border-slate-800 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              AI Writing Assistant
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
              Cover Letter Generator
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Generate personalized, ATS-optimized cover letters instantly using
              your resume analysis and job details.
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-xl">
            <Wand2 className="text-white" size={30} />
          </div>
        </div>
      </div>

      {/* content */}
      <div className="grid lg:grid-cols-[420px_1fr]">
        {/* form */}
        <div className="border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* job title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Job Title
              </label>

              <div className="relative">
                <Briefcase
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  {...register("jobTitle")}
                  placeholder="Frontend Developer"
                  required
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-12 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* company */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Company Name
              </label>

              <div className="relative">
                <Building2
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  {...register("company")}
                  placeholder="Google"
                  required
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-12 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Job Description
              </label>

              <textarea
                {...register("jobDescription")}
                placeholder="Paste the job description here to generate a more targeted cover letter..."
                rows={7}
                className="w-full resize-none rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            {/* button */}
            <button
              disabled={loading}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating Cover Letter...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Cover Letter
                </>
              )}
            </button>
          </form>
        </div>

        {/* output */}
        <div className="p-8">
          {!letter ? (
            <div className="flex h-full min-h-[500px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-500/10">
                <FileText className="text-violet-500" size={36} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                Your Cover Letter Will Appear Here
              </h3>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Fill out the form and generate a professional AI-powered cover
                letter tailored to your resume and target role.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden">
              {/* top bar */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Generated Cover Letter
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    AI-generated personalized draft
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigator.clipboard
                      .writeText(letter)
                      .then(() => toast.success("Copied to clipboard!"))
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:border-violet-500 hover:text-violet-500"
                >
                  <Copy size={16} />
                  Copy
                </button>
              </div>

              {/* content */}
              <div className="max-h-[650px] overflow-y-auto px-6 py-6">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-700 dark:text-slate-300">
                  {letter}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
