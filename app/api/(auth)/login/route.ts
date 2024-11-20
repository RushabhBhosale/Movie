import connectDB from "@/lib/db";
import User, { LoginInterface } from "@/models/user";
import { generateToken } from "@/utils/generateToken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  try {
    // Access the request body using req.json() in the App Router
    const body = await req.json();
    const { username, password }: LoginInterface = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json({
        message: "Please enter a username and password",
        status: 400,
      });
    }

    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 400 });
    }

    // Compare the provided password with the stored hash
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return NextResponse.json({ message: "Invalid credentials", status: 400 });
    }

    // Generate the token
    const token = generateToken({
      id: String(user._id),
      username: user.username,
    });

    // Return a success response with the token and user data
    return NextResponse.json({
      message: "Login successfully",
      data: {
        token,
        user: {
          username,
          email: user.email,
        },
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error logging user:", error);
    return NextResponse.json({ message: "Server error", status: 500 });
  }
}
