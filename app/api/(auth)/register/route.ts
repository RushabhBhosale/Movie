import connectDB from "@/lib/db";
import User, { UserInterface } from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  try {
    // Parse the request body only once
    const { username, email, password } = (await req.json()) as UserInterface;

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json({
        message: "Please fill in all required fields",
        status: 200,
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        status: 400,
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user: UserInterface = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "User created successfully",
      data: {
        user: {
          username,
          email,
        },
      },
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      message: "Server error",
      status: 500,
    });
  }
}
