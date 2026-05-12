import { scoreColor, scoreLabel } from "@/lib/utils";

export default function AtsGauge({ score }: { score: number }) {
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const pct = (score / 100) * 100;
  return (
    <div className="border rounded-lg p-6 text-center">
      <h2 className="text-sm font-medium text-muted-foreground mb-4">
        ATS Score
      </h2>
      <div className="relative w-32 h-32 mx-auto">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-muted"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${pct * 3.14} 314`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{score}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <p className={`mt-3 font-medium ${scoreColor(score)}`}>
        {scoreLabel(score)}
      </p>
    </div>
  );
}
