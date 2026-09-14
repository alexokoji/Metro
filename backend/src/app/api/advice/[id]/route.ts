import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import AdviceRequest from "@/models/AdviceRequest";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    const { status, adminResponse } = await req.json();
    await dbConnect();
    const adviceRequest = await AdviceRequest.findById(id);
    if (!adviceRequest) {
      return NextResponse.json({ message: "Advice request not found" }, { status: 404 });
    }

    if (status) adviceRequest.status = status;
    if (adminResponse) {
      adviceRequest.adminResponse = adminResponse;
      adviceRequest.respondedBy = auth._id;
    }

    await adviceRequest.save();
    return NextResponse.json({ message: "Advice request updated", adviceRequest });
  } catch (error) {
    return NextResponse.json({ message: "Error updating advice request", error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    await dbConnect();
    const adviceRequest = await AdviceRequest.findByIdAndDelete(id);
    if (!adviceRequest) {
      return NextResponse.json({ message: "Advice request not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Advice request deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting advice request", error }, { status: 500 });
  }
}
