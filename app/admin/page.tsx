"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Users,
  FileSearch,
  FileText,
  TrendingUp,
  Activity,
  Sparkles,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/admin/stats").then((r) => setStats(r.data));
  }, []);

  if (!stats) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />

          <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
            Loading admin analytics...
          </p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: "Total Users",
      value: stats.users,
      icon: Users,
      gradient: "from-violet-500 to-fuchsia-500",
      bg: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      label: "Resume Analyses",
      value: stats.analyses,
      icon: FileSearch,
      gradient: "from-cyan-500 to-blue-500",
      bg: "bg-cyan-500/10",
      iconColor: "text-cyan-500",
    },
    {
      label: "Cover Letters",
      value: stats.coverLetters,
      icon: FileText,
      gradient: "from-emerald-500 to-green-500",
      bg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      label: "Avg ATS Score",
      value: `${stats.avgScore}%`,
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="space-y-8">
        {/* top header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-300">
              <Sparkles size={16} />
              Admin Dashboard
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Analytics Overview
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Monitor platform growth, resume analyses, ATS trends, and cover
              letter generation performance.
            </p>
          </div>

          {/* status card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl p-6 min-w-[280px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Platform Status
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  Active
                </h3>

                <p className="mt-1 text-sm text-green-500">
                  All systems operational
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg">
                <Activity className="text-white" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* hover glow */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${card.gradient} blur-3xl`}
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {card.label}
                    </p>

                    <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                      {card.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
                  >
                    <Icon className={card.iconColor} size={28} />
                  </div>
                </div>

                {/* bottom line */}
                <div
                  className={`mt-6 h-1 rounded-full bg-gradient-to-r ${card.gradient}`}
                />
              </div>
            );
          })}
        </div>

        {/* analytics chart */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl p-8">
          {/* chart header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Weekly Activity
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                Resume Analyses (Last 7 Days)
              </h2>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 px-5 py-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Weekly Analyses
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {stats.daily.reduce(
                  (acc: number, item: any) => acc + item.count,
                  0,
                )}
              </h3>
            </div>
          </div>

          {/* chart */}
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.daily}
                margin={{
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="barGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148,163,184,0.15)"
                  vertical={false}
                />

                <XAxis
                  dataKey="_id"
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(139,92,246,0.08)",
                  }}
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(148,163,184,0.2)",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />

                <Bar
                  dataKey="count"
                  fill="url(#barGradient)"
                  radius={[12, 12, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
