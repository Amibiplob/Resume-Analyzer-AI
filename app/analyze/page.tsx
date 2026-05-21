import Navbar from "@/components/layout/Navbar";
import DropZone from "@/components/analyze/DropZone";

export default function AnalyzePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-2">Analyze Your Resume</h1>
        <p className="text-muted-foreground mb-8">
          Upload a PDF or paste your resume text. Logged-in users get AI-powered
          analysis (OpenRouter AI). Guests get instant rule-based analysis — no
          login required.
        </p>
        <DropZone />
      </main>
    </>
  );
}
