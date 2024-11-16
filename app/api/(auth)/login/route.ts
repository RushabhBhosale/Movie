import connectDB from "@/lib/db";
import User, { LoginInterface } from "@/models/user";
import { generateToken } from "@/utils/generateToken";
import { errorResponse, successResponse } from "@/utils/response";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { username, password }: LoginInterface = body;

    if (!username || !password) {
      return errorResponse({
        status: 400,
        message: "Please fill all required fields",
      });
    }

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return errorResponse({
        status: 400,
        message: "User not found",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return errorResponse({
        status: 401,
        message: "Invalid password",
      });
    }

    const token = generateToken({
      id: String(user._id),
      username: user.username,
    });

    // Create the response object
    const response = NextResponse.json({
      message: "Login successfully",
      body: {
        token,
        user: {
          username,
          email: user.email,
        },
      },
    });

    // Set the token in HTTP-only cookies
    response.cookies.set("token", token, {
      httpOnly: true, // Secure against XSS
      secure: process.env.NODE_ENV === "production", // Use only in HTTPS in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/", // Accessible to all routes
    });

    return response;
  } catch (error) {
    console.error("Error logging user:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
