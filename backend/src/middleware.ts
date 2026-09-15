import { NextRequest, NextResponse } from "next/server";

const HARDCODED_ALLOWED_ORIGINS = [
  "https://metrocracks.netlify.app",
  "https://primedigital-solutions.com",
  "https://primedigital-solutions.netlify.app",
  "http://localhost:3000",
  "http://localhost:5173",
];

function getAllowedOrigins(): string[] {
  const envOrigins = process.env.FRONTEND_ORIGIN
    ? process.env.FRONTEND_ORIGIN.split(",").map((o) => o.trim())
    : [];
  return [...envOrigins, ...HARDCODED_ALLOWED_ORIGINS];
}

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true;
  if (getAllowedOrigins().includes(origin)) return true;
  // Match the old server's permissive behavior outside production.
  return process.env.NODE_ENV !== "production";
}

function applyCorsHeaders(res: NextResponse, origin: string | null): NextResponse {
  if (isOriginAllowed(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin || "*");
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  }
  return res;
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return applyCorsHeaders(new NextResponse(null, { status: 204 }), origin);
  }

  return applyCorsHeaders(NextResponse.next(), origin);
}

export const config = {
  matcher: "/api/:path*",
};
