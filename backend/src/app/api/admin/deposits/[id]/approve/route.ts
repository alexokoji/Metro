import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Deposit from "@/models/Deposit";
import User from "@/models/User";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    await dbConnect();
    const deposit = await Deposit.findById(id);
    if (!deposit) return NextResponse.json({ error: "Deposit not found" }, { status: 404 });
    if (deposit.status === "approved") {
      return NextResponse.json({ error: "Already approved" }, { status: 400 });
    }

    const user = await User.findById(deposit.user);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    user.balance = (user.balance || 0) + Number(deposit.amount || 0);
    deposit.status = "approved";
    await user.save();
    await deposit.save();

    return NextResponse.json({ success: true, userId: user._id, newBalance: user.balance });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve deposit";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
