import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Plan from "@/models/Plan";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    await dbConnect();
    const plans = await Plan.find();
    return NextResponse.json(plans);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list plans";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await req.json();
    await dbConnect();
    const plan = new Plan(body);
    await plan.save();
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create plan";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
