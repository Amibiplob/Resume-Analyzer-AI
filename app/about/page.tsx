import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16 space-y-8">
        <h1 className="text-3xl font-semibold">About ResumeAI</h1>
        <p className="text-muted-foreground leading-relaxed">
          ResumeAI helps job seekers analyze their resumes against ATS
          (Applicant Tracking Systems), identify missing keywords, and generate
          tailored cover letters — all for free.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["Rule-Based", "Instant offline analysis, no account needed."],
            ["OpenRouter AI", "Deeper AI analysis for logged-in users."],
            ["Resume Builder", "Create and download professional resumes."],
          ].map(([title, desc]) => (
            <div key={title} className="border rounded-lg p-4">
              <h3 className="font-medium mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
