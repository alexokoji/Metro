import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  const auth = await getAuthUser(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const { mnemonic } = await req.json();
    const wallet = ethers.Wallet.fromPhrase(mnemonic);

    await dbConnect();
    const user = await User.findById(auth._id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    user.wallets.push({ address: wallet.address, mnemonic });
    await user.save();
    return NextResponse.json({ address: wallet.address });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to connect wallet";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
