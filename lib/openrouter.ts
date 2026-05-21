const BASE = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openrouter/free"; // or any model you prefer

async function callOpenRouter(prompt: string): Promise<string> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  return data.choices?.[0]?.message?.content ?? "";
}

export async function analyzeResumeOpenRouter(
  text: string,
  jobDescription?: string,
) {
  const prompt = `Analyze this resume. Return ONLY valid JSON, no markdown:
{
  "atsScore": <0-100>,
  "sectionScores": {"summary":<0-100>,"skills":<0-100>,"experience":<0-100>,"education":<0-100>,"formatting":<0-100>},
  "keywords": {"found":["..."],"missing":["..."]},
  "suggestions": ["..."],
  "tone": "Professional|Casual|Mixed",
  "bulletStrength": <0-100>
}
Resume:
${text}
${jobDescription ? `\nJob Description:\n${jobDescription}` : ""}`;

  const raw = await callOpenRouter(prompt);
  try {
    return JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch (err) {
    console.error("OpenRouter JSON Error:", raw);
    return {
      atsScore: 0,
      sectionScores: {
        summary: 0,
        skills: 0,
        experience: 0,
        education: 0,
        formatting: 0,
      },
      keywords: { found: [], missing: [] },
      suggestions: ["AI response parsing failed"],
      tone: "Mixed",
      bulletStrength: 0,
    };
  }
}

export async function generateCoverLetterOpenRouter(
  resumeText: string,
  jobTitle: string,
  company: string,
  jobDescription?: string,
): Promise<string> {
  const prompt = `Write a professional cover letter for ${jobTitle} at ${company}.
Under 300 words. No placeholders. Professional tone.
Resume: ${resumeText}
${jobDescription ? `Job Description: ${jobDescription}` : ""}`;
  return callOpenRouter(prompt);
}
