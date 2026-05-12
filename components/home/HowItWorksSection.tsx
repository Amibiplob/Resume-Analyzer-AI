const steps = [
  {
    n: "1",
    title: "Upload or Paste",
    desc: "Upload your PDF resume or paste the text directly. No account needed.",
  },
  {
    n: "2",
    title: "Get Analyzed",
    desc: "Our engine checks ATS compatibility, keywords, structure, and tone.",
  },
  {
    n: "3",
    title: "Improve",
    desc: "Follow specific suggestions to boost your score and land more interviews.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-10">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mx-auto mb-3">
                {s.n}
              </div>
              <h3 className="font-medium mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
