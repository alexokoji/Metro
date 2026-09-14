import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import AdviceRequest from "@/models/AdviceRequest";

export async function GET(req: NextRequest) {
  const auth = await getAuthUser(req);
  if (auth instanceof NextResponse) return auth;

  try {
    await dbConnect();
    const adviceRequests = await AdviceRequest.find({ userId: auth._id }).sort({ createdAt: -1 });
    return NextResponse.json(adviceRequests);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching advice requests", error }, { status: 500 });
  }
}
