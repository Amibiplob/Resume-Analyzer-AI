"use client";

import {
  Sparkles,
  PenTool,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Brain,
} from "lucide-react";

export default function SuggestionsList({
  suggestions,
  tone,
  bulletStrength,
}: {
  suggestions: string[];
  tone: string;
  bulletStrength: number;
}) {
  const strengthColor =
    bulletStrength >= 75
      ? "from-green-500 to-emerald-500"
      : bulletStrength >= 50
        ? "from-amber-500 to-orange-500"
        : "from-red-500 to-rose-500";

  const strengthLabel =
    bulletStrength >= 75
      ? "Excellent"
      : bulletStrength >= 50
        ? "Moderate"
        : "Needs Improvement";

  return (
    <div className="relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* top header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Resume Intelligence
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            Suggestions & Improvements
          </h2>

          <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            AI-powered insights to improve readability, ATS performance,
            professionalism, and recruiter impact.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg">
          <Brain className="text-white" size={30} />
        </div>
      </div>

      {/* insight cards */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {/* tone card */}
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 transition-all hover:shadow-lg">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-violet-500/5 to-cyan-500/5" />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Resume Tone
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white capitalize">
                {tone}
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Communication style detected in your resume.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">
              <PenTool className="text-violet-500" size={22} />
            </div>
          </div>
        </div>

        {/* bullet strength */}
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 transition-all hover:shadow-lg">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-violet-500/5 to-cyan-500/5" />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Bullet Strength
              </p>

              <div className="mt-2 flex items-end gap-2">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                  {bulletStrength}
                </h3>

                <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  /100
                </span>
              </div>

              <div
                className={`mt-3 inline-flex rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${strengthColor}`}
              >
                {strengthLabel}
              </div>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
              <TrendingUp className="text-cyan-500" size={22} />
            </div>
          </div>

          {/* progress */}
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${strengthColor}`}
              style={{ width: `${bulletStrength}%` }}
            />
          </div>
        </div>
      </div>

      {/* suggestions list */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg">
            <Sparkles className="text-white" size={22} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Recommended Improvements
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Personalized actions to improve resume quality
            </p>
          </div>
        </div>

        {suggestions.length === 0 ? (
          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
                <CheckCircle2 className="text-green-500" size={28} />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Excellent Resume Quality
                </h4>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Great job! No major issues were detected in your resume.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 transition-all hover:scale-[1.01] hover:shadow-md"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-amber-500/5 to-orange-500/5" />

                <div className="relative flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <AlertTriangle className="text-amber-500" size={20} />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Improvement Suggestion
                    </h4>

                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {suggestion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
