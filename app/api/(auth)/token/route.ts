// /app/api/auth/token/route.ts

import { cookies } from "next/headers"; // next.js provides cookies module
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies(); // Get the cookies from request
  const token = (await cookieStore).get("token"); // Get the token cookie

  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  return NextResponse.json({ token: token.value }, { status: 200 });
}
