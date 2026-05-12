import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });

  const db = await getDb();
  const existing = await db.collection("users").findOne({ email });
  if (existing)
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 },
    );

  const hashed = await bcrypt.hash(password, 10);
  await db.collection("users").insertOne({
    name,
    email,
    password: hashed,
    role: "user",
    createdAt: new Date(),
  });
  return NextResponse.json({ ok: true });
}
