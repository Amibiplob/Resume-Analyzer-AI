import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions); // ← changed
  if ((session?.user as any)?.role !== "admin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const db = await getDb();
  const [users, analyses, coverLetters] = await Promise.all([
    db.collection("users").countDocuments(),
    db.collection("analyses").countDocuments(),
    db.collection("coverLetters").countDocuments(),
  ]);
  const scoreAgg = await db
    .collection("analyses")
    .aggregate([{ $group: { _id: null, avg: { $avg: "$atsScore" } } }])
    .toArray();
  const avgScore = Math.round(scoreAgg[0]?.avg ?? 0);

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const daily = await db
    .collection("analyses")
    .aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])
    .toArray();

  return NextResponse.json({ users, analyses, coverLetters, avgScore, daily });
}
