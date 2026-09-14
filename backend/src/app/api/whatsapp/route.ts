import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import WhatsappSettings from "@/models/WhatsappSettings";

export async function GET() {
  try {
    await dbConnect();
    let settings = await WhatsappSettings.findOne();
    if (!settings) {
      settings = new WhatsappSettings();
      await settings.save();
    }
    return NextResponse.json(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load WhatsApp settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const { phoneNumber, message, enabled } = await req.json();
    await dbConnect();

    let settings = await WhatsappSettings.findOne();
    if (!settings) {
      settings = new WhatsappSettings();
    }

    if (phoneNumber) settings.phoneNumber = phoneNumber;
    if (message) settings.message = message;
    if (typeof enabled === "boolean") settings.enabled = enabled;

    await settings.save();
    return NextResponse.json(settings);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Failed to update WhatsApp settings";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
