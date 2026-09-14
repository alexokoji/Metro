import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Deposit from "@/models/Deposit";
import User from "@/models/User";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  await dbConnect();

  const deposit = await Deposit.findById(id);
  if (!deposit) return NextResponse.json({ error: "Deposit not found" }, { status: 404 });

  deposit.status = "approved";
  await deposit.save();

  const user = await User.findById(deposit.user);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  user.balance += deposit.amount;
  await user.save();

  return NextResponse.json({ message: "Approved" });
}
