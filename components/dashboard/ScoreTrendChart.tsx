"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDate } from "@/lib/utils";
import type { Analysis } from "@/lib/types";

export default function ScoreTrendChart({ data }: { data: Analysis[] }) {
  const chartData = data
    .slice()
    .reverse()
    .map((a) => ({
      date: formatDate(a.createdAt),
      score: a.atsScore,
    }));
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-sm font-medium mb-4">Score Trend</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
