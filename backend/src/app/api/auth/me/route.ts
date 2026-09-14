import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const auth = await getAuthUser(req);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json(auth);
}
