"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    axios.get("/api/admin/stats").then((r) => setStats(r.data));
  }, []);
  if (!stats) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["Total Users", stats.users],
          ["Analyses", stats.analyses],
          ["Cover Letters", stats.coverLetters],
          ["Avg ATS Score", stats.avgScore],
        ].map(([label, val]) => (
          <div key={label as string} className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold mt-1">{val}</p>
          </div>
        ))}
      </div>
      <div className="border rounded-lg p-4">
        <h2 className="text-sm font-medium mb-4">Analyses last 7 days</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={stats.daily}>
            <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
