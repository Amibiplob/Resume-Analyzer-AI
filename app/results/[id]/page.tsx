import AtsGauge from "@/components/results/AtsGauge";
import SectionScores from "@/components/results/SectionScores";
import KeywordGaps from "@/components/results/KeywordGaps";
import SuggestionsList from "@/components/results/SuggestionsList";
import CoverLetterTab from "@/components/results/CoverLetterTab";
import type { Analysis } from "@/lib/types";
import { Sparkles, ShieldCheck, FileText, BrainCircuit } from "lucide-react";

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

  if (!analysis) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <FileText className="text-red-400" size={28} />
          </div>

          <h2 className="text-2xl font-bold">Analysis Not Found</h2>

          <p className="text-slate-400 text-sm">
            The requested resume analysis could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="relative overflow-hidden min-h-screen bg-white dark:bg-black transition-colors">
        {/* background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-75 w-75 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 md:py-7">
          {/* top header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
            {/* left */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-300 backdrop-blur">
                <Sparkles size={16} />
                Resume Analysis Complete
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Your Resume
                  <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                    Performance Report
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                  Analyze ATS compatibility, keyword optimization, resume
                  strength, and AI-generated improvement suggestions.
                </p>
              </div>
            </div>

            {/* right status card */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl p-6 min-w-[280px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Analysis Mode
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    {analysis.aiMode === "OpenRouter" ? (
                      <>
                        <BrainCircuit className="text-violet-500" size={18} />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          AI-Powered
                        </span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="text-cyan-500" size={18} />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Rule-Based
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <FileText className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* score section */}
          <section className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  ATS Score
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Measure how optimized your resume is for applicant tracking
                  systems.
                </p>
              </div>

              <AtsGauge score={analysis.atsScore} />
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Section Breakdown
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Performance across resume categories and formatting quality.
                </p>
              </div>

              <SectionScores scores={analysis.sectionScores} />
            </div>
          </section>

          {/* keyword gaps */}
          <section className="mt-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Keyword Optimization
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Compare detected keywords with missing ATS-targeted terms.
              </p>
            </div>

            <KeywordGaps
              found={analysis.keywords.found}
              missing={analysis.keywords.missing}
            />
          </section>

          {/* suggestions */}
          <section className="mt-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                AI Suggestions & Improvements
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Personalized recommendations to improve impact and ATS ranking.
              </p>
            </div>

            <SuggestionsList
              suggestions={analysis.suggestions}
              tone={analysis.tone}
              bulletStrength={analysis.bulletStrength}
            />
          </section>

          {/* cover letter */}
          <section className="mt-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                AI Cover Letter Generator
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Generate tailored cover letters instantly using your resume
                analysis.
              </p>
            </div>

            <CoverLetterTab
              resumeText={analysis.resumeText}
              analysisId={analysis._id!}
            />
          </section>
        </div>
      </main>
    </>
  );
}
