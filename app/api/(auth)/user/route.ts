import { verifyToken } from "@/utils/generateToken";
import { NextRequest, NextResponse } from "next/server";

interface TokenPayload {
  id: string;
  username: string;
}

export async function GET(req: NextRequest) {
  try {
    const token: string | null = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({
        status: 400,
        message: "Token is required",
      });
    }

    const decoded: TokenPayload | null = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({
        status: 401,
        message: "Invalid or expired token",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Token verified successfully",
      data: {
        id: decoded.id,
        username: decoded.username,
      },
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({
      status: 500,
      message: "Server error",
    });
  }
}
