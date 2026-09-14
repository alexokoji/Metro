import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import Deposit from "@/models/Deposit";

// Vercel serverless functions cap the request body around ~4.5MB, so keep some headroom.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const auth = await getAuthUser(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const formData = await req.formData();
    const amount = formData.get("amount");
    const file = formData.get("proof");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Proof file is required" }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "Proof file is too large (max 4MB)" }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const proof = `data:${file.type || "application/octet-stream"};base64,${buffer.toString("base64")}`;

    await dbConnect();
    const deposit = new Deposit({
      user: auth._id,
      amount,
      proof,
    });
    await deposit.save();
    return NextResponse.json({ message: "Proof uploaded" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
