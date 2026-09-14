import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    await dbConnect();
    const users = await User.find().select("-password -wallets.mnemonic");
    return NextResponse.json(users);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list users";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
