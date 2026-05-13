"use client";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import type { SectionScores as SS } from "@/lib/types";

export default function SectionScores({ scores }: { scores: SS }) {
  const data = Object.entries(scores).map(([key, val]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    value: val,
  }));
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-sm font-medium text-muted-foreground mb-4">
        Section Scores
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
          <Radar
            dataKey="value"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            stroke="hsl(var(--primary))"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
