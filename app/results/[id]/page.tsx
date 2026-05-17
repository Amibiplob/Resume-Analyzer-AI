import Navbar from "@/components/layout/Navbar";
import AtsGauge from "@/components/results/AtsGauge";
import SectionScores from "@/components/results/SectionScores";
import KeywordGaps from "@/components/results/KeywordGaps";
import SuggestionsList from "@/components/results/SuggestionsList";
import CoverLetterTab from "@/components/results/CoverLetterTab";
import type { Analysis } from "@/lib/types";

async function getAnalysis(id: string): Promise<Analysis | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/analyses/${id}`, {
      cache: "no-store",
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const analysis = await getAnalysis(id);
  if (!analysis) return <p className="p-8 text-center">Analysis not found.</p>;

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Resume Analysis Results</h1>
          <span className="text-xs bg-muted px-2 py-1 rounded">
            {analysis.aiMode === "gemini" ? "AI-Powered" : "Rule-Based"}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AtsGauge score={analysis.atsScore} />
          <SectionScores scores={analysis.sectionScores} />
        </div>

        <KeywordGaps
          found={analysis.keywords.found}
          missing={analysis.keywords.missing}
        />
        <SuggestionsList
          suggestions={analysis.suggestions}
          tone={analysis.tone}
          bulletStrength={analysis.bulletStrength}
        />
        <CoverLetterTab
          resumeText={analysis.resumeText}
          analysisId={analysis._id!}
        />
      </main>
    </>
  );
}
