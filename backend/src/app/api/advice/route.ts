import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import AdviceRequest from "@/models/AdviceRequest";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    await dbConnect();
    const adviceRequests = await AdviceRequest.find()
      .populate("userId", "email name")
      .populate("respondedBy", "email name")
      .sort({ createdAt: -1 });
    return NextResponse.json(adviceRequests);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching advice requests", error }, { status: 500 });
  }
}
