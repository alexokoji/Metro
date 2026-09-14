import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import Deposit from "@/models/Deposit";

export async function GET(req: NextRequest) {
  const auth = await getAuthUser(req);
  if (auth instanceof NextResponse) return auth;

  await dbConnect();
  const deposits = await Deposit.find({ user: auth._id });
  return NextResponse.json(deposits);
}
