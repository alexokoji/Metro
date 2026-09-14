import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import User from "@/models/User";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    const { amount, mode } = await req.json(); // mode: 'add' or 'set'
    await dbConnect();
    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (mode === "set") {
      user.balance = Number(amount) || 0;
    } else {
      user.balance = (user.balance || 0) + Number(amount || 0);
    }
    await user.save();
    return NextResponse.json({ success: true, balance: user.balance });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update balance";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
