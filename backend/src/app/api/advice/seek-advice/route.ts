import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import AdviceRequest from "@/models/AdviceRequest";

export async function POST(req: NextRequest) {
  try {
    const { wallet, request, email, name, phone } = await req.json();

    if (!wallet || !request) {
      return NextResponse.json({ message: "Wallet and request are required" }, { status: 400 });
    }

    await dbConnect();
    const adviceRequest = new AdviceRequest({
      wallet,
      request,
      email: email || "",
      name: name || "",
      phone: phone || "",
    });
    await adviceRequest.save();

    return NextResponse.json(
      { message: "Advice request submitted successfully", adviceRequest },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error submitting advice request";
    return NextResponse.json({ message: "Error submitting advice request", error: message }, { status: 500 });
  }
}
