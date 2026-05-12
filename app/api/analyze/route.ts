export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { analyzeResume } from "@/lib/analyzer";
import { analyzeResumeGemini } from "@/lib/gemini";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  const formData = await req.formData();
  const session = await auth();

  let resumeText = formData.get("text") as string | null;

  const file = formData.get("file") as File | null;

  const jobDesc = (formData.get("jobDescription") as string) || undefined;

  const jobTitle = (formData.get("jobTitle") as string) || undefined;

  const isPublic = formData.get("isPublic") === "true";

  // PDF extraction
  if (file && !resumeText) {
    const buffer = Buffer.from(await file.arrayBuffer());

    try {
      const pdfParseModule = await import("pdf-parse");

      const pdfParse = (pdfParseModule as any).default || pdfParseModule;

      const result = await pdfParse(buffer);

      resumeText = result.text;
    } catch (error) {
      console.error("PDF parse error:", error);
      resumeText = "";
    }
  }

  if (!resumeText) {
    return NextResponse.json({ error: "No resume content" }, { status: 400 });
  }

  const isLoggedIn = !!session?.user;

  let result: any;

  if (isLoggedIn && process.env.GEMINI_API_KEY) {
    result = await analyzeResumeGemini(resumeText, jobDesc);

    result.aiMode = "gemini";
  } else {
    result = analyzeResume(resumeText, jobDesc);

    result.aiMode = "rule-based";
  }

  const doc = {
    userId: isLoggedIn ? (session!.user as any).id : null,

    resumeText,

    jobDescription: jobDesc || null,

    jobTitle: jobTitle || null,

    isPublic,

    createdAt: new Date(),

    ...result,
  };

  const db = await getDb();

  const { insertedId } = await db.collection("analyses").insertOne(doc);

  return NextResponse.json({
    id: insertedId.toString(),
    ...result,
  });
}
