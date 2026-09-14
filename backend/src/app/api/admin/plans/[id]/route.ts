import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Plan from "@/models/Plan";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    const body = await req.json();
    await dbConnect();
    const plan = await Plan.findByIdAndUpdate(id, body, { new: true });
    if (!plan) return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    return NextResponse.json(plan);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update plan";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    await dbConnect();
    await Plan.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete plan";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
