"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import type { SectionScores as SS } from "@/lib/types";
import { BarChart3 } from "lucide-react";

export default function SectionScores({ scores }: { scores: SS }) {
  const data = Object.entries(scores).map(([key, val]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    value: val,
    fullMark: 100,
  }));

  const average = Math.round(
    data.reduce((acc, item) => acc + item.value, 0) / data.length,
  );

  return (
    <div className="relative overflow-hidden">
      {/* glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* top section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Resume Breakdown
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            Section Performance
          </h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg">
          <BarChart3 className="text-white" size={22} />
        </div>
      </div>

      {/* radar chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="75%" data={data}>
            <defs>
              <linearGradient
                id="radarGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            <PolarGrid stroke="rgba(148,163,184,0.2)" radialLines={true} />

            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
                fontWeight: 500,
              }}
            />

            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{
                fill: "#64748b",
                fontSize: 10,
              }}
            />

            <Radar
              name="Score"
              dataKey="value"
              stroke="url(#radarGradient)"
              fill="url(#radarGradient)"
              fillOpacity={0.35}
              strokeWidth={3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {item.subject}
            </p>

            <div className="mt-2 flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {item.value}
              </span>

              <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                /100
              </span>
            </div>

            {/* progress line */}
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-700"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* footer insight */}
      <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Overall Average
            </p>

            <h3 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
              {average}%
            </h3>
          </div>

          <div className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            Strong Resume
          </div>
        </div>
      </div>
    </div>
  );
}
