import Link from "next/link";
import { formatDate, scoreBg } from "@/lib/utils";
import type { Analysis } from "@/lib/types";

export default function AnalysisCard({ item }: { item: Analysis }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-start justify-between mb-2">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded ${scoreBg(item.atsScore)}`}
        >
          ATS {item.atsScore}
        </span>
        <span className="text-xs text-muted-foreground">
          {item.aiMode === "OpenRouter" ? "AI" : "RB"}
        </span>
      </div>
      <h3 className="font-medium text-sm flex-1">
        {item.jobTitle || "General Resume"}
      </h3>
      <p className="text-xs text-muted-foreground mt-1 mb-3 line-clamp-2">
        {item.suggestions?.[0] || "Analyzed resume"}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-muted-foreground">
          {formatDate(item.createdAt)}
        </span>
        <Link
          href={`/results/${item._id}`}
          className="text-xs text-primary hover:underline"
        >
          View →
        </Link>
      </div>
    </div>
  );
}
