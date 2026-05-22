import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

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

/* ✅ ADD THIS */
export async function GET() {
  try {
    const db = await getDb();

    const contacts = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        items: contacts,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact GET API Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 },
    );
  }
}
