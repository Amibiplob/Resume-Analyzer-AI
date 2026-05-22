"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PIE_COLORS = ["#6366f1", "#22c55e"];

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/admin/stats").then((r) => setStats(r.data));
  }, []);

  if (!stats) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  const modeData = [
    { name: "Rule-based", value: 60 },
    { name: "AI (OpenRouter)", value: 40 },
  ];

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Usage trends and AI distribution
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* line chart */}
        <div className="rounded-xl border p-4">
          <h2 className="text-sm font-medium mb-4">Daily Analyses</h2>

          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.daily}>
                <XAxis
                  dataKey="_id"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* pie chart */}
        <div className="rounded-xl border p-4">
          <h2 className="text-sm font-medium mb-4">AI Mode Split</h2>

          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                >
                  {modeData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
