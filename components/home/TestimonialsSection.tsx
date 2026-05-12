const items = [
  { name: "Arif H.", role: "Frontend Developer", text: "Got my score from 48 to 82 after following the suggestions. Landed 3 interviews the next week." },
  { name: "Priya M.", role: "Data Analyst", text: "The keyword gap feature showed exactly what I was missing. Super useful for tailoring to each job." },
  { name: "James O.", role: "Backend Engineer", text: "The cover letter generator saved me hours. It actually sounded like me, not a template." },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-10">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map(t => (
            <div key={t.name} className="border rounded-lg p-5">
              <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
              <p className="font-medium text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}