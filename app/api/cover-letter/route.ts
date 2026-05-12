import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateCoverLetterGemini } from "@/lib/gemini";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resumeText, jobTitle, company, jobDescription, analysisId } =
    await req.json();
  const content = await generateCoverLetterGemini(
    resumeText,
    jobTitle,
    company,
    jobDescription,
  );

  const db = await getDb();
  const { insertedId } = await db.collection("coverLetters").insertOne({
    userId: (session.user as any).id,
    analysisId: analysisId || null,
    jobTitle,
    company,
    content,
    createdAt: new Date(),
  });

  return NextResponse.json({ id: insertedId.toString(), content });
}
