import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Deposit from "@/models/Deposit";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    await dbConnect();
    const deposits = await Deposit.find().populate("user", "email");
    return NextResponse.json(deposits);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list deposits";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
