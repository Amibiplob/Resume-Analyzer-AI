import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { getDb } from "@/lib/db";
import { generateCoverLetterOpenRouter } from "@/lib/openrouter";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions); // ← changed
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resumeText, jobTitle, company, jobDescription, analysisId } =
    await req.json();
  const content = await generateCoverLetterOpenRouter(
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
