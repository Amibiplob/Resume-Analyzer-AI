import type { Analysis } from "./types";

const ACTION_VERBS = [
  "led",
  "built",
  "designed",
  "developed",
  "created",
  "managed",
  "improved",
  "increased",
  "reduced",
  "implemented",
  "launched",
  "delivered",
  "optimized",
  "achieved",
  "collaborated",
  "spearheaded",
  "drove",
  "scaled",
  "mentored",
];

const TECH_KEYWORDS = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node.js",
  "express",
  "mongodb",
  "postgresql",
  "mysql",
  "sql",
  "rest api",
  "graphql",
  "git",
  "docker",
  "aws",
  "python",
  "java",
  "css",
  "html",
  "tailwind",
  "redux",
  "vue",
  "angular",
  "firebase",
  "prisma",
  "jest",
  "ci/cd",
  "linux",
];

const SECTION_PATTERNS = {
  summary: /summary|objective|profile|about me/i,
  skills: /skills|technologies|tech stack|competencies/i,
  experience: /experience|work history|employment/i,
  education: /education|degree|university|college/i,
};

export function analyzeResume(
  text: string,
  jobDescription?: string,
): Omit<
  Analysis,
  | "_id"
  | "userId"
  | "resumeText"
  | "jobDescription"
  | "jobTitle"
  | "isPublic"
  | "aiMode"
  | "createdAt"
> {
  const lower = text.toLowerCase();

  const sections = {
    summary: SECTION_PATTERNS.summary.test(text),
    skills: SECTION_PATTERNS.skills.test(text),
    experience: SECTION_PATTERNS.experience.test(text),
    education: SECTION_PATTERNS.education.test(text),
  };

  const bullets = (text.match(/^[\•\-\*›].+/gm) || []).length;
  const verbsFound = ACTION_VERBS.filter((v) => lower.includes(v));

  const sectionScores = {
    summary: sections.summary
      ? Math.min(60 + (text.match(/summary|profile/gi)?.length ?? 0) * 5, 100)
      : 20,
    skills: sections.skills
      ? Math.min(
          50 + TECH_KEYWORDS.filter((k) => lower.includes(k)).length * 3,
          100,
        )
      : 15,
    experience: sections.experience ? Math.min(55 + bullets * 2, 100) : 20,
    education: sections.education ? 80 : 30,
    formatting: calcFormattingScore(text, bullets),
  };

  const pool = jobDescription
    ? TECH_KEYWORDS.filter((k) => jobDescription.toLowerCase().includes(k))
    : TECH_KEYWORDS.slice(0, 15);

  const found = pool.filter((k) => lower.includes(k));
  const missing = pool.filter((k) => !lower.includes(k)).slice(0, 8);

  const bulletStrength = Math.min(
    Math.round((verbsFound.length / 8) * 100),
    100,
  );
  const keywordScore = pool.length ? (found.length / pool.length) * 100 : 0;
  const sectionAvg =
    Object.values(sectionScores).reduce((a, b) => a + b, 0) / 5;
  const atsScore = Math.round(
    sectionAvg * 0.5 + keywordScore * 0.3 + bulletStrength * 0.2,
  );

  return {
    atsScore,
    sectionScores,
    keywords: { found, missing },
    suggestions: buildSuggestions(sections, missing, verbsFound, bullets, text),
    tone: detectTone(text),
    bulletStrength,
  };
}

function calcFormattingScore(text: string, bullets: number): number {
  let s = 50;
  if (text.length > 300 && text.length < 3000) s += 15;
  if (bullets > 4) s += 20;
  if (text.split("\n").length > 20) s += 15;
  return Math.min(s, 100);
}

function detectTone(text: string): string {
  const professional =
    /managed|led|delivered|achieved|developed|spearheaded/i.test(text);
  const casual = /\bworked on\b|\bhelped\b|\bdid\b/i.test(text);
  if (professional && !casual) return "Professional";
  if (casual && !professional) return "Casual";
  return "Mixed";
}

function buildSuggestions(
  sections: Record<string, boolean>,
  missing: string[],
  verbs: string[],
  bullets: number,
  text: string,
): string[] {
  const s: string[] = [];
  if (!sections.summary) s.push("Add a professional summary section.");
  if (!sections.skills) s.push("Add a dedicated skills section.");
  if (!sections.experience) s.push("Add a work experience section.");
  if (!sections.education) s.push("Include your education details.");
  if (missing.length > 2)
    s.push(`Consider adding keywords: ${missing.slice(0, 3).join(", ")}.`);
  if (verbs.length < 3) s.push("Use more action verbs (led, built, improved).");
  if (bullets < 5) s.push("Use bullet points for experience descriptions.");
  if (text.length > 3000) s.push("Consider trimming to 1 page.");
  return s.slice(0, 5);
}
