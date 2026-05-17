export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { analyzeResume } from "@/lib/analyzer";
import { analyzeResumeGemini } from "@/lib/gemini";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const session = await getServerSession(authOptions);

    let resumeText = formData.get("text") as string | null;
    const file = formData.get("file") as File | null;

    const jobDesc = formData.get("jobDescription") as string | undefined;
    const jobTitle = formData.get("jobTitle") as string | undefined;

    const isPublic = formData.get("isPublic") === "true";

    // =========================
    // PDF Parsing
    // =========================
    if (file && !resumeText) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());

        const pdfParseModule = await import("pdf-parse");

        // Works with your current package version
        const pdfParse = (pdfParseModule as any).default || pdfParseModule;

        const parsed = await pdfParse(buffer);

        resumeText = parsed.text?.trim() || "";
      } catch (err) {
        console.error("PDF Parse Error:", err);

        return NextResponse.json(
          {
            error:
              "Failed to parse PDF file. Please upload a valid resume PDF.",
          },
          { status: 400 },
        );
      }
    }

    // =========================
    // Validation
    // =========================
    if (!resumeText || resumeText.trim().length < 20) {
      return NextResponse.json(
        {
          error: "No resume content found",
        },
        { status: 400 },
      );
    }

    const isLoggedIn = !!session?.user;

    let result: any;

    // =========================
    // AI Analysis
    // =========================
    try {
      if (isLoggedIn && process.env.GEMINI_API_KEY) {
        result = await analyzeResumeGemini(resumeText, jobDesc);

        result.aiMode = "gemini";
      } else {
        result = analyzeResume(resumeText, jobDesc);

        result.aiMode = "rule-based";
      }
    } catch (err) {
      console.error("Resume Analysis Error:", err);

      return NextResponse.json(
        {
          error: "Resume analysis failed",
        },
        { status: 500 },
      );
    }

    // =========================
    // MongoDB Save
    // =========================
    try {
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

      return NextResponse.json({
        id: insertedId.toString(),
        ...result,
      });
    } catch (err) {
      console.error("Mongo Error:", err);

      // Return analysis even if DB fails
      return NextResponse.json({
        id: "local-analysis",
        saved: false,
        ...result,
      });
    }
  } catch (err) {
    console.error("API Error:", err);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
