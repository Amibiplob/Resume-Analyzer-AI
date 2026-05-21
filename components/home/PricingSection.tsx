import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Rule-based analysis",
      "ATS score",
      "Keyword gaps",
      "5 analyses/day",
    ],
    cta: "Start Free",
    href: "/analyze",
  },
  {
    name: "Pro",
    price: "$0",
    features: [
      "OpenRouter AI analysis",
      "Cover letter generator",
      "Unlimited analyses",
      "Resume builder",
    ],
    cta: "Sign Up Free",
    href: "/register",
    featured: true,
  },
  {
    name: "Teams",
    price: "Soon",
    features: [
      "Everything in Pro",
      "Team dashboard",
      "Bulk analysis",
      "Priority support",
    ],
    cta: "Coming Soon",
    href: "#",
  },
];

export default function PricingSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-2">Pricing</h2>
        <p className="text-center text-muted-foreground mb-10 text-sm">
          All features free during beta.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`border rounded-lg p-6 ${p.featured ? "border-primary ring-1 ring-primary" : ""}`}
            >
              {p.featured && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded mb-3 inline-block">
                  Most Popular
                </span>
              )}
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-3xl font-bold my-2">{p.price}</p>
              <ul className="space-y-1.5 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground">
                    ✓ {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className={`block text-center py-2 rounded text-sm font-medium ${p.featured ? "bg-primary text-primary-foreground" : "border hover:bg-muted"}`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
