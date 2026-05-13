import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET() {
  const db = await getDb();
  const posts = await db
    .collection("blogs")
    .find({ published: true })
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(JSON.parse(JSON.stringify(posts)));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions); // ← changed
  if ((session?.user as any)?.role !== "admin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const data = await req.json();
  const db = await getDb();
  await db
    .collection("blogs")
    .insertOne({ ...data, slug: slugify(data.title), createdAt: new Date() });
  return NextResponse.json({ ok: true });
}
