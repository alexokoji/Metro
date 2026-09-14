import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  const auth = await getAuthUser(req);
  if (auth instanceof NextResponse) return auth;

  await dbConnect();
  const user = await User.findById(auth._id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(user.wallets);
}
