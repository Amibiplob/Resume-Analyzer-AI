import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const items = await db
    .collection("coverLetters")
    .find({ userId: (session.user as any).id })
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(JSON.parse(JSON.stringify(items)));
}
