import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = "admin@metro-cracks.com";
const ADMIN_PASSWORD = "MetroCracks2025";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { id: "admin", email: ADMIN_EMAIL, isAdmin: true },
        process.env.JWT_SECRET as string
      );
      return NextResponse.json({ token, email: ADMIN_EMAIL });
    }
    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Admin login failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
