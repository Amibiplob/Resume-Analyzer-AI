"use client";

import { CheckCircle2, XCircle, SearchCheck, TrendingUp } from "lucide-react";

export default function KeywordGaps({
  found,
  missing,
}: {
  found: string[];
  missing: string[];
}) {
  const total = found.length + missing.length;

  const optimizationScore =
    total > 0 ? Math.round((found.length / total) * 100) : 0;

  return (
    <div className="relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
      </div>

      {/* top section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            ATS Keyword Matching
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            Keyword Analysis
          </h2>

          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Discover which important resume keywords were detected and which
            terms are missing for stronger ATS optimization.
          </p>
        </div>

        {/* score card */}
        <div className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6 min-w-[220px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Optimization
              </p>

              <h3 className="mt-1 text-4xl font-black text-slate-900 dark:text-white">
                {optimizationScore}%
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10">
              <CheckCircle2 className="text-green-500" size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Keywords Found
              </p>

              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                {found.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10">
              <XCircle className="text-red-500" size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Missing Keywords
              </p>

              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                {missing.length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* keyword sections */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* found keywords */}
        <div className="rounded-3xl border border-green-500/20 bg-gradient-to-b from-green-500/5 to-transparent p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/10">
              <CheckCircle2 className="text-green-500" size={22} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Found Keywords
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Successfully detected ATS keywords
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {found.length > 0 ? (
              found.map((keyword) => (
                <div
                  key={keyword}
                  className="group relative overflow-hidden rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300 transition-all hover:scale-[1.03]"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-green-500/10 to-emerald-500/10" />

                  <span className="relative flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    {keyword}
                  </span>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center w-full">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No matching keywords detected.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* missing keywords */}
        <div className="rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-500/5 to-transparent p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10">
              <SearchCheck className="text-red-500" size={22} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Missing Keywords
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Recommended terms to improve ATS ranking
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {missing.length > 0 ? (
              missing.map((keyword) => (
                <div
                  key={keyword}
                  className="group relative overflow-hidden rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 transition-all hover:scale-[1.03]"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-red-500/10 to-rose-500/10" />

                  <span className="relative flex items-center gap-2">
                    <XCircle size={14} />
                    {keyword}
                  </span>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center w-full">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Excellent — no major keyword gaps detected.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
