export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // ← changed
import { authOptions } from "@/lib/auth"; // ← changed
import { analyzeResume } from "@/lib/analyzer";
import { analyzeResumeGemini } from "@/lib/gemini";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  const formData = await req.formData();
  const session = await getServerSession(authOptions); // ← changed

  let resumeText = formData.get("text") as string | null;
  const file = formData.get("file") as File | null;
  const jobDesc = formData.get("jobDescription") as string | undefined;
  const jobTitle = formData.get("jobTitle") as string | undefined;
  const isPublic = formData.get("isPublic") === "true";

  if (file && !resumeText) {
    const buffer = Buffer.from(await file.arrayBuffer());
    try {
      const pdfParse = (await import("pdf-parse")).default;
      resumeText = (await pdfParse(buffer)).text;
    } catch {
      resumeText = "";
    }
  }

  if (!resumeText)
    return NextResponse.json({ error: "No resume content" }, { status: 400 });

  const isLoggedIn = !!session?.user;
  let result: any;

  if (isLoggedIn && process.env.GEMINI_API_KEY) {
    result = await analyzeResumeGemini(resumeText, jobDesc);
    result.aiMode = "gemini";
  } else {
    result = analyzeResume(resumeText, jobDesc);
    result.aiMode = "rule-based";
  }

  const db = await getDb();
  const { insertedId } = await db.collection("analyses").insertOne({
    userId: isLoggedIn ? (session!.user as any).id : null,
    resumeText,
    jobDescription: jobDesc || null,
    jobTitle: jobTitle || null,
    isPublic,
    createdAt: new Date(),
    ...result,
  });

  return NextResponse.json({ id: insertedId.toString(), ...result });
}
