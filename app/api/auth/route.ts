import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    //  Load credentials from environment variables
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;

    // Simple validation check
    if (!ADMIN_USER || !ADMIN_PASS) {
      console.error("❌ Missing admin credentials in .env file");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    //  Compare entered credentials with environment values
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return NextResponse.json({ token: "admin-token" });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    console.error("Auth API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

