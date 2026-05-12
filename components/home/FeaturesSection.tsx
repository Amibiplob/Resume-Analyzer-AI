const features = [
  {
    title: "ATS Score",
    desc: "Know exactly how your resume scores against applicant tracking systems.",
  },
  {
    title: "Keyword Analysis",
    desc: "See which keywords are present and which are missing for your target role.",
  },
  {
    title: "Section Feedback",
    desc: "Get per-section scores for summary, skills, experience, and education.",
  },
  {
    title: "Cover Letter Gen",
    desc: "AI generates a tailored cover letter from your resume and job description.",
  },
  {
    title: "Resume Builder",
    desc: "Build a professional resume from scratch using our guided form + templates.",
  },
  {
    title: "No Login Needed",
    desc: "Get instant rule-based analysis without creating an account.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-10">Features</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="border rounded-lg p-5">
              <h3 className="font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
