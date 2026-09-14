import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "./db";
import User from "../models/User";

export interface AuthUser {
  _id: string;
  email?: string;
  isAdmin: boolean;
}

type TokenPayload = jwt.JwtPayload & { id: string; isAdmin?: boolean; email?: string };

function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

/** Mirrors the old middleware/authenticate.js: verifies the Bearer token and
 * either returns the admin-token payload directly, or loads the User from DB. */
export async function getAuthUser(req: NextRequest): Promise<AuthUser | NextResponse> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return unauthorized("No authorization header");
  const token = authHeader.split(" ")[1];
  if (!token) return unauthorized("No token provided");

  let payload: TokenPayload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
  } catch {
    return unauthorized("Invalid token");
  }

  if (payload.isAdmin) {
    return { _id: payload.id, email: payload.email, isAdmin: true };
  }

  await dbConnect();
  const user = await User.findById(payload.id).select("-password -wallets.mnemonic");
  if (!user) return unauthorized("User not found");
  return user.toObject() as AuthUser;
}

/** Mirrors middleware/authenticate.js + middleware/isAdmin.js chained together. */
export async function requireAdmin(req: NextRequest): Promise<AuthUser | NextResponse> {
  const auth = await getAuthUser(req);
  if (auth instanceof NextResponse) return auth;
  if (!auth.isAdmin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  return auth;
}
