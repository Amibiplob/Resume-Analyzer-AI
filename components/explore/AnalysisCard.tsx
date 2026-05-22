import Link from "next/link";
import { formatDate, scoreBg } from "@/lib/utils";
import type { Analysis } from "@/lib/types";

export default function AnalysisCard({ item }: { item: Analysis }) {
  return (
    <div className="group relative h-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* TOP BADGES */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${scoreBg(
            item.atsScore,
          )}`}
        >
          ATS {item.atsScore}
        </span>

        <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          {item.aiMode === "OpenRouter" ? "AI" : "RB"}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug">
        {item.jobTitle || "General Resume Analysis"}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
        {item.suggestions?.[0] ||
          "AI analyzed this resume and generated improvement suggestions."}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          {formatDate(item.createdAt)}
        </span>

        <Link
          href={`/results/${item._id}`}
          className="text-xs font-medium text-black dark:text-white hover:opacity-70 transition"
        >
          View details →
        </Link>
      </div>

      {/* HOVER GLOW EFFECT */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-black/5 to-transparent dark:from-white/5" />
    </div>
  );
}
