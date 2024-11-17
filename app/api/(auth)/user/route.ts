import { verifyToken } from "@/utils/generateToken";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";

interface TokenPayload {
  id: string;
  username: string;
}

export async function GET(req: NextRequest) {
  try {
    const token: string | null = req.nextUrl.searchParams.get("token");

    if (!token) {
      return errorResponse({
        status: 400,
        message: "Token parameter is required",
      });
    }

    const decoded: TokenPayload | null = verifyToken(token);

    if (!decoded) {
      return errorResponse({
        status: 401,
        message: "Invalid token",
      });
    }

    return successResponse({
      status: 200,
      message: "Token verified successfully",
      body: {
        id: decoded.id,
        username: decoded.username,
      },
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
