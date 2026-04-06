import { db } from "@/app/db/index"; // Check your path to db/index.js
import { users } from "@/app/db/schema";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();

    // 1. Hash the password (DO NOT store plain text!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Insert into your local Postgres
    await db.insert(users).values({
      email,
      password: hashedPassword,
      name: name || "New User",
    });

    return NextResponse.json({ message: "User registered!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "User already exists or DB error" },
      { status: 400 },
    );
  }
}
