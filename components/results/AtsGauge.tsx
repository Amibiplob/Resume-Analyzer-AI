"use client";

import { motion } from "framer-motion";
import { scoreColor, scoreLabel } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export default function AtsGauge({ score }: { score: number }) {
  const percentage = Math.min(Math.max(score, 0), 100);

  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  const getGradient = () => {
    if (score >= 75)
      return {
        from: "#8b5cf6",
        to: "#06b6d4",
      };

    if (score >= 50)
      return {
        from: "#f59e0b",
        to: "#f97316",
      };

    return {
      from: "#ef4444",
      to: "#f43f5e",
    };
  };

  const gradient = getGradient();

  return (
    <div className="relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-48 w-48 -translate-x-1/2" />
      </div>

      {/* top */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            ATS Compatibility
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            Resume Score
          </h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg">
          <Sparkles className="text-white" size={22} />
        </div>
      </div>

      {/* gauge */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 140 140"
          className="w-64 h-64 -rotate-90"
        >
          {/* gradient */}
          <defs>
            <linearGradient
              id="scoreGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={gradient.from} />
              <stop offset="100%" stopColor={gradient.to} />
            </linearGradient>
          </defs>

          {/* bg ring */}
          <circle
            cx="70"
            cy="70"
            r="52"
            strokeWidth="12"
            fill="none"
            className="stroke-slate-200 dark:stroke-slate-800"
          />

          {/* animated ring */}
          <motion.circle
            cx="70"
            cy="70"
            r="52"
            strokeWidth="12"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          />

          {/* glow ring */}
          <motion.circle
            cx="70"
            cy="70"
            r="52"
            strokeWidth="18"
            fill="none"
            stroke="url(#scoreGradient)"
            opacity={0.15}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          />
        </svg>

        {/* center content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black tracking-tight text-slate-900 dark:text-white"
          >
            {score}
          </motion.span>

          <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            out of 100
          </span>

          <div
            className={`mt-4 rounded-full px-4 py-1.5 text-sm font-semibold ${scoreColor(
              score
            )} bg-opacity-10`}
          >
            {scoreLabel(score)}
          </div>
        </div>
      </div>

      {/* bottom stats */}
      <div className="mt-10 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Parsing
          </p>

          <h4 className="mt-1 font-bold text-slate-900 dark:text-white">
            Strong
          </h4>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Keywords
          </p>

          <h4 className="mt-1 font-bold text-slate-900 dark:text-white">
            Optimized
          </h4>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ranking
          </p>

          <h4 className="mt-1 font-bold text-slate-900 dark:text-white">
            High
          </h4>
        </div>
      </div>
    </div>
  );
}