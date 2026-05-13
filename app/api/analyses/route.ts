import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const minScore = parseInt(searchParams.get("minScore") || "0");
  const maxScore = parseInt(searchParams.get("maxScore") || "100");
  const sort = searchParams.get("sort") || "createdAt";

  const db = await getDb();
  const query: any = {
    isPublic: true,
    atsScore: { $gte: minScore, $lte: maxScore },
  };
  if (search) query.jobTitle = { $regex: search, $options: "i" };
  if (category) query.jobTitle = { $regex: category, $options: "i" };

  const [items, total] = await Promise.all([
    db
      .collection("analyses")
      .find(query)
      .sort({ [sort]: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray(),
    db.collection("analyses").countDocuments(query),
  ]);

  return NextResponse.json({
    items: JSON.parse(JSON.stringify(items)),
    total,
    page,
    limit,
  });
}
