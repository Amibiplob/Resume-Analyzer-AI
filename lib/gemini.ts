const BASE =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(`${BASE}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

export async function analyzeResumeGemini(
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

  const raw = await callGemini(prompt);
  try {
    return JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch (err) {
    console.error("Gemini JSON Error:", raw);

    return {
      atsScore: 0,
      sectionScores: {
        summary: 0,
        skills: 0,
        experience: 0,
        education: 0,
        formatting: 0,
      },
      keywords: {
        found: [],
        missing: [],
      },
      suggestions: ["AI response parsing failed"],
      tone: "Mixed",
      bulletStrength: 0,
    };
  }
}

export async function generateCoverLetterGemini(
  resumeText: string,
  jobTitle: string,
  company: string,
  jobDescription?: string,
): Promise<string> {
  const prompt = `Write a professional cover letter for ${jobTitle} at ${company}.
Under 300 words. No placeholders. Professional tone.
Resume: ${resumeText}
${jobDescription ? `Job Description: ${jobDescription}` : ""}`;
  return callGemini(prompt);
}
