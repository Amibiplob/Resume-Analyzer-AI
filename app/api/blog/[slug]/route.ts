import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  const db = await getDb();
  const post = await db
    .collection("blogs")
    .findOne({ slug: params.slug, published: true });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(JSON.parse(JSON.stringify(post)));
}
