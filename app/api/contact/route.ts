import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const db = await getDb();

    const result = await db.collection("contacts").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        insertedId: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
